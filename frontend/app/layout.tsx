import type { Metadata } from "next";
import "../styles/globals.css";
import { inter } from "@/utils/fonts";
import { ThemeProvider } from "@/provider/theme-provider";

export const metadata: Metadata = {
  title: "Chatify",
  description: "Real-Time Chat - Chatify",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`$${inter.className} antialiased dark:bg-neutral-800 min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
