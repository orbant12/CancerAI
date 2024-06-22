
import "../../css/globals.css";
import SideBar from "../../components/sidebar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}
>) {
  return (

      <div style={{flexDirection:"row",display:"flex",height:"100%",width:"100%"}}>
          <SideBar />
        <main style={{display:"flex",flexDirection:"row",width:"100%",minHeight:"100%"}} >
            {children}
        </main>
      </div>

  );
}
