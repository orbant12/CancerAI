"use client";

import React, { ReactNode, Ref, useRef, useState } from 'react';
import { SlMenu } from "react-icons/sl";
import { SlLogout } from "react-icons/sl";
import { MdAbc } from 'react-icons/md';
import { SlArrowRight,SlArrowLeft,SlEnvolopeLetter,SlBubble } from "react-icons/sl";
import { signOut } from 'firebase/auth';
import "../app/assistant/assistant.css"
import { auth } from '@/services/firebase';
import { useSidebar } from '@/Context/SidebarContext';

const SideBar = ({setPassActive}:{setPassActive:(active: boolean) => void}) => {
  const navRef = useRef<HTMLElement | null>(null);

  const [ active, setActive ] = useState(false);

  const handleLogOut = () => {
    signOut(auth)
    window.location.pathname = "/"
  }


  return (
        <LoggedOn_Navbar 
        navRef={navRef}
        active={active}
        setActive={setActive}
        handleLogOut={handleLogOut}
        setPassActive={setPassActive}
        />
  );
};

export default SideBar;


const LoggedOn_Navbar = ({
  navRef,
  active,
  setActive,
  handleLogOut,
  setPassActive
}:{
  navRef: Ref<any>;
  active: boolean;
  setActive: (active: boolean) => void;
  handleLogOut:() => void;
  setPassActive: (active: boolean) => void

}) => {
  return(
    <>
    {active ? (
    <nav ref={navRef} className='sidebar active'>
      <div style={{display:"flex",flexDirection:"column",width:"100%",justifyContent:"space-between",height:"100%",alignItems:"center"}}>
        <span style={{width:"100%",flexDirection:"column",display:"flex",justifyContent:"center"}}>
          <a style={{textDecoration:"none",fontWeight:500,color:"black",fontSize:20,textAlign:"center"}} href="/">Pocket Protect</a>
          <div onClick={() => {setActive(!active),setPassActive(!active)}} style={{zIndex:100,backgroundColor:"black",marginLeft:10,borderRadius:5,padding:9,position:"absolute",left:130,flexDirection:"column",display:"flex"}}>
            <SlArrowLeft size={13} color='white' />
          </div>
        </span>

        <div style={{flexDirection:"column",width:"100%",display:"flex"}}>
          <NavItem 
            title='Job Requests'
            icon={() => <SlEnvolopeLetter  size={22} color='white' opacity={0.7} />  }
          />
          <NavItem 
            title='Active Sessions'
            icon={() => <SlBubble size={22} color='white' opacity={0.7}  />  }
          /> 
        </div>

        <div style={{flexDirection:"column",display:"flex",width:"100%"}}>
          <div className="nav-more">
            <SlMenu />
            <a href="/auth/login">Settings</a>
          </div>
          <div className="nav-more" style={{background:"black",width:"100%",marginTop:10}}>
            <SlLogout color='white' />
            <a href="/auth/login" style={{color:"white",fontWeight:400}} >Logoff</a>
          </div>
        </div>
      </div>
    </nav>
    ) : (
      <nav ref={navRef} className='sidebar'>
          <div onClick={() => {setActive(!active),setPassActive(!active)}} style={{zIndex:100,backgroundColor:"black",marginLeft:10,borderRadius:5,padding:9,position:"absolute",left:72,flexDirection:"column",display:"flex"}}>
            <SlArrowRight size={13} color='white' />
          </div>
      <div style={{display:"flex",flexDirection:"column",width:"100%",justifyContent:"space-between",height:"100%"}}>
        <span style={{width:"100%",padding:0,fontSize:20,fontWeight:500,color:"black",textDecoration:"none",flexDirection:"row",display:"flex"}}>
          <a style={{textDecoration:"none",fontWeight:500,color:"black"}} href="/">Logo</a>
      
        </span>

        <div style={{flexDirection:"column",width:"100%",display:"flex",alignItems:"center"}}>
          <div style={{display:"flex",flexDirection:"column",justifyContent:"center",padding:10,background:"black",marginBottom:10,width:"100%",alignItems:"center",borderRadius:5}}>
            <SlEnvolopeLetter size={22} color='white' />
          </div>
          <div style={{display:"flex",flexDirection:"column",justifyContent:"center",padding:10,background:"black",marginBottom:10,width:"100%",alignItems:"center",borderRadius:5}}>
            <SlBubble size={22} color='white' />
          </div>
        </div>
        

        <div style={{flexDirection:"column",display:"flex"}}>
          <div className="nav-more">
            <SlMenu />
          </div>
          <div onClick={handleLogOut} style={{background:"black",marginTop:10,padding:10,display:"flex",justifyContent:"center",alignItems:"center",borderRadius:5,cursor:"pointer"}}>
            <SlLogout style={{marginRight:5}} size={20} color='white' />            
          </div>
        </div>
      </div>
    </nav>
    )
  }
  </>
  )
}

const NavItem = ({
  icon,
  title 
}:
{
  icon:() => ReactNode;
  title: string;
}) => {
  return(
    <div style={{flexDirection:"row",width:"100%",display:"flex",alignItems:"center",marginBottom:10,backgroundColor:"rgba(0,0,0,1)",padding:10,borderRadius:5}}>
    {icon()}
    <h5 style={{marginLeft:15,fontSize:17,color:"white",opacity:0.6,fontWeight:"400"}}>{title}</h5>
  </div>
  )
}