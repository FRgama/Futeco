import {ReactNode} from 'react';
import { Inter } from "next/font/google";
import './globals.css';

const inter = Inter({
  subsets: ["latin"],
});
type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return(
<html>
  <body className={`${inter.className} bg-[#fefefe] text-[#393e4b]`}>
    <h1>
      FUTECO JOGO
    </h1>
    <hr/>
    <div>
        {children}
      </div>
  </body>
</html>
);}

export default Layout;