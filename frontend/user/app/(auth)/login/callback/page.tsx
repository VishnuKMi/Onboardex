"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginCallback() {
  const params = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // @ts-ignore
  useEffect(async () => {
    const token = params.get("token");
    if (token) {
      const signInResponse = await signIn("credentials", {
        redirect: false,
        email: "",
        password: token,
        callbackUrl: "/",
      });
      if (!signInResponse.error) {
        router.push("/");
      } else {
        // router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <div className="m-auto px-6 py-8 w-[500px] text-white">
      {loading && <Loader2 className="h-24 w-24 animate-spin" />}
    </div>
  );
}
