import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import axios from "axios";
import { Copy } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export const TokensDialog = () => {
  const { data: session } = useSession();
  const { data, error, isLoading, mutate } = useSWR(
    // @ts-ignore
    ["/tenants/api-key", session?.accessToken],
    fetcher
  );

  const generateNewKey = async () => {
    const response = await axios.post(
      "/tenants/api-key",
      {},
      {
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
          // @ts-ignore
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    await mutate();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">API Keys</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>API Tokens</DialogTitle>
          <DialogDescription>
            These tokens are used to authenticate your requests to the API.
          </DialogDescription>
        </DialogHeader>

        {isLoading && <p>Loading...</p>}
        {error && <p>Something went wrong...</p>}
        {data && data.data.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[100px]">API Key</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.map((apiKeyData) => (
                <TableRow key={apiKeyData.id}>
                  <TableCell className="flex items-center gap-x-2 min-w-[100px]">
                    <p>{apiKeyData.apiKey}</p>
                    <Copy
                      size={16}
                      onClick={() => {
                        navigator.clipboard.writeText(apiKeyData.apiKey);
                        toast({
                          title: "Copied to clipboard",
                        });
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={apiKeyData.isActive ? "default" : "destructive"}
                    >
                      {" "}
                      {apiKeyData.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>{apiKeyData.createdAt}</TableCell>
                  <TableCell>
                    <Button variant="destructive">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No API keys found.</p>
        )}
        <Button variant="outline" onClick={generateNewKey}>
          Generate New Key
        </Button>
      </DialogContent>
    </Dialog>
  );
};
