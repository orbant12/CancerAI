import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../css/globals.css";
import NavBar from "../components/navbar";
import UserAuthContextProvider from "../Context/UserAuthContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Healthcare App",
  description: "Generated by create next app",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}
>) {
  return (
    <html lang="en">
      <body className="font-serif">
      
      <UserAuthContextProvider>
        <NavBar  />
        {/*Body*/}
        <main style={{width:"100%",display:"flex",flexDirection:"column",height:"100%"}} >
          {children}
        </main>
        </UserAuthContextProvider>
        
      </body>
    </html>
  );
}
