
import "../../css/globals.css";
import SideBar from "../../components/sidebar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}
>) {
  return (

      <div style={{flexDirection:"column",display:"flex",height:"100%"}}>
        <main style={{display:"flex",flexDirection:"row",width:"100%",height:"100%"}} >
            <SideBar />
            {children}
        </main>
      </div>

  );
}
