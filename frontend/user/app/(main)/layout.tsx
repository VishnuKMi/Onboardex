import "@/styles/globals.css";
import { ubuntu, poppins } from "@/fonts";
import { Navbar } from "@/components/Navbar";
import AuthProvider from "@/lib/context/AuthProvider";

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
    <html lang="en" className={`${ubuntu.variable} ${poppins.variable} h-full`}>
      <AuthProvider>
        <body className="overflow-x-hidden  h-full">
          <main>
            <Navbar />
            {children}
          </main>
        </body>
      </AuthProvider>
    </html>
  );
}
