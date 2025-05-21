import type { Metadata } from "next";
import "../styles/globals.css";
import { inter } from "@/utils/fonts";
import { ThemeProvider } from "@/provider/theme-provider";
import Header from "@/components/Header/Header";
import ToggleTheme from "@/components/toggle-theme";

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
        className={`${inter.className} antialiased dark:bg-neutral-800 min-h-screen px-5`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main>{children}</main>
          <ToggleTheme />
        </ThemeProvider>
      </body>
    </html>
  );
}
