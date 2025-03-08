import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provide";

export const metadata = {
  title: "Nilesh Blog",
  description:
    "NileshBlog.Tech - Software Development Learning & Problem Solving",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className="bg-[#F5EFFF] dark:bg-[#030712] min-h-[100vh]"
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {" "}
          <div>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
