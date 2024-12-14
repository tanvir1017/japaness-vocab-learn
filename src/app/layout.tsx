import Footer from "@/components/shared/footer";
import NavigationCenter from "@/components/shared/navbar/nav-bar";
import { ThemeProvider } from "@/components/theme-provider";
import { auth } from "auth";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
const space_Grotesk = Space_Grotesk({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = {
  title: "Learn Japanese",
  description: "One way to learn Japanese",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const isLoggedIn = session?.user;
  return (
    <html lang="en">
      <body className={`${space_Grotesk.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NavigationCenter isLoggedIn={isLoggedIn} />
          <main className="-mt-20">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
