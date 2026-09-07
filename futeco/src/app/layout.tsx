import { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "../components/Header";

const inter = Inter({
  subsets: ["latin"],
});

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-[#fefefe] text-[#393e4b]`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default Layout;