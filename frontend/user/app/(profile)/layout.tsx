import "@/styles/globals.css";
import { ubuntu, roboto } from "@/fonts";
import { SideBar, Header } from "@/modules/common/components";
import AuthProvider from "@/lib/context/AuthProvider";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Onboardex",
  description: "A Minoid Product",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${ubuntu.variable} ${roboto.variable} h-full`}>
      <body className="overflow-x-hidden  h-full">
        <AuthProvider>
          <main>
            <Navbar />
            <div className="flex w-full">
              <SideBar />
              <div className="mt-12 w-full">{children}</div>
            </div>
          </main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
