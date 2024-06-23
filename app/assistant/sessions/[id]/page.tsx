"use client"
import { BackIcon } from '../page';
import {useParams,useRouter} from 'next/navigation'
import "../../assistant.css"
import { SlBubble, SlMagnifier, SlMagnifierAdd,SlClose,SlCheck, SlCamera, SlPaperPlane } from "react-icons/sl";
import { useState,useRef, useEffect } from 'react';
import { useMouseOverZoom } from "./hook"
import imageKep from "../../../../public/ISIC_0477738.jpg"
import { useAuth } from '@/Context/UserAuthContext';
import { fetchSession_Single,fetchChat,realTimeUpdateChat } from '@/services/api';
import { messageStateChange } from '@/utils/assist/messageStateChanger';


type SessionType = {
    clientData:{
        id:string
    }

}

type ChatLogType = {
    user:string,
    message:string,
    sent:boolean,
    date: Date
    inline_answer:boolean
}


export default function SessionPage(){
    const router = useRouter();
    const { id } = useParams()
    const { currentuser } = useAuth()
    const [ selectedStage, setSelectedStage ] = useState(0)
    const [ isChatOpen, setIsChatOpen] = useState(false)
    const [ sessionData, setSessionData] = useState<SessionType>({clientData:{id:""}});
    const [ chatLog, setChatLog] = useState<ChatLogType[]>([])
    const [ inputValue, setInputValue] = useState("")
    const scrollableDivRef = useRef<HTMLDivElement>(null);

    const fetchSessionChat = async (clientId:string) => {
        const response = await fetchChat({
            clientId:clientId,
            sessionId:String(id)
        })
        console.log(response)
        setChatLog(response)
    }

    const fetchSession = async() => {
        if( currentuser ){
        const response = await fetchSession_Single({
            sessionId:String(id),
            userId : currentuser.uid
        })
        setSessionData(response)
        fetchSessionChat(response.clientData.id)
    }
    }

    const updateChatLog = async (chatState: any[]) => {
        if ( currentuser ) {
        const updatedChatState = await messageStateChange(chatState)
        const response = await realTimeUpdateChat({
            userId: sessionData.clientData.id,
            sessionId: String(id),
            chat: updatedChatState
        })
        console.log(response)
        return response
        }
    }

    const handleSubmit = async () => {
        if ( currentuser ) {
            const message = {user:`${currentuser.uid}`,message:inputValue,sent:false,date: new Date(),inline_answer: chatLog[chatLog.length -1 ].user == currentuser.uid};
            const chatState = [...chatLog,message]
            setChatLog(chatState)
            setInputValue("")
            try {
                const response = await updateChatLog(chatState);
                if (response === true) {
                    const updatedChatState = await messageStateChange(chatState)
                    setChatLog(updatedChatState);
                } else {
                    console.error('Failed to update chat log');
                }
            } catch (error) {
                console.error('Error updating chat log:', error);
            }
        }
    }

    const scrollToBottom = () => {
        if (scrollableDivRef.current) {
            scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
        }
    };


    useEffect(() => {
        fetchSession()
        scrollToBottom()
    },[currentuser])

    //WEB SOCKET
    useEffect(() => {
        if( sessionData.clientData.id != ""){
            fetchSessionChat(sessionData.clientData.id);
        }

        if( sessionData.clientData.id != ""){
            // Set up interval to fetch data every 5 seconds
            const intervalId = setInterval(() => fetchSessionChat(sessionData.clientData.id), 4000);
            return () => clearInterval(intervalId);
        }
    }, [sessionData])


    useEffect(() => {
        scrollToBottom()
    }, [chatLog,isChatOpen]);

    return(
        <div style={{width:"100%",flexDirection:"column",padding:0,display:"flex",minHeight:"130%"}}>
            <div style={{display:"flex",flexDirection:"row",alignItems:"center",background:"white",justifyContent:"space-between",padding:2,borderRadius:100,margin:20}}>
                <Bubble 
                    title='Mole Inspection'
                    selectedStage={selectedStage}
                    setSelectedStage={setSelectedStage}
                    index={0}
                />
                <Bubble 
                    title='Report Writing'
                    selectedStage={selectedStage}
                    setSelectedStage={setSelectedStage}
                    index={1}
                />
                <Bubble 
                    title='Closing Session'
                    selectedStage={selectedStage}
                    setSelectedStage={setSelectedStage}
                    index={2}
                />
            </div>
            <InspectionComponent />
            {!isChatOpen ? 
                <div onClick={() => setIsChatOpen(!isChatOpen)} style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",background:"black",padding:15,borderRadius:100,position:"absolute",bottom:20,right:20,boxShadow:"0px 1px 10px 1px black",cursor:"pointer"}}>
                    <SlBubble color='white' size={25} />
                </div>
                :
                <ChatSheet
                    handleClose={() => setIsChatOpen(!isChatOpen)}
                    me={currentuser != null ? currentuser.uid : ""}
                    end={sessionData.clientData.id}
                    chatLog={chatLog}
                    profileUrl=''
                    setInputValue={setInputValue}
                    inputValue={inputValue}
                    handleSubmit={handleSubmit}
                    scrollableDivRef={scrollableDivRef}
                />
            }
      
        </div>
    )
}

const Bubble = ({title, selectedStage, index, setSelectedStage}:{title:string; selectedStage:number; index:number; setSelectedStage:(selectedStage:number) => void}) => {
    return(
        <div onClick={() => setSelectedStage(index)} className={selectedStage == index ? 'bubble active' : 'bubble'} >
            <h4>{title}</h4>
        </div>
    )
}

const InspectionComponent = () => {

    const source = useRef<HTMLImageElement>(null); 
    const target = useRef<HTMLCanvasElement>(null); 
    const cursor = useRef<HTMLDivElement>(null); 
    const [ activeZoom, setActiveZoom ] = useState("")

    const zoom = activeZoom == "1x" ? 100 : 20
    
    useMouseOverZoom(source, target, cursor, zoom);

    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });


    const handleMouseDown = (e: any) => {
        setIsDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    const handleMouseMove = (e: any) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - offset.x,
                y: e.clientY - offset.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return(
        <div style={{display:"flex",flexDirection:"column",width:"100%",marginTop:10,alignItems:"center"}}>
        <div style={{display:"flex",flexDirection:"row",width:"100%",alignItems:"center",justifyContent:"space-between",padding:30}}>
          
        </div>
            <div className='editor-stage'>
            {activeZoom != "" &&
                <div className='zoomerBox'
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp} // Ensure it stops dragging if the mouse leaves the box
                    style={{ left: `${position.x}px`, top: `${position.y}px` }}
                >
                    <div style={{flexDirection:"row",width:"100%",justifyContent:"space-between",alignItems:"center",display:"flex"}}>
                    <h4>{activeZoom} Zoom</h4>
                    <h6 style={{opacity:0.3}}>You can move this by grabbing !</h6>
                    </div>
                    <canvas ref={target} className="element" />
                </div>
            }
            <ImageEditor 
                activeZoom={activeZoom}
                source={source}
                setActiveZoom={setActiveZoom}
                cursor={cursor}
            />
            </div>
        </div>
    )
}

function DataBar(){
    return(
        <div style={{width:200,padding:10,flexDirection:"row",display:"flex",border:"1px solid black"}}>
            <img src="" alt="mole" style={{width:70,height:70, border:"1px solid black"}} />
            <h4>Mole ID</h4>
            <h5>AI analised risk: 0.6</h5>
            <h5>Body part: 0.6</h5>
        </div>
    )
}

function ImageEditor({
    activeZoom,
    source,
    setActiveZoom,
    cursor
}:{
    activeZoom: "" | "1x" | "2x" | string;
    source: any,
    setActiveZoom: (activeZoom:"" | "1x" | "2x") => void;
    cursor:any;
}) {
    return(
        <div className='image-editor'>
            <img src={imageKep.src} className='image-edit' width={500} ref={source} style={{width:"500px", height:"500px", border:"1px solid black"}} />
            {/* <div ref={cursor} className="cursor-element" /> */}
            
            <div style={{width:80,display:"flex",flexDirection:"column",background:"black",padding:20,height:500, borderTopRightRadius:30,borderBottomRightRadius:30,alignItems:"center"}}>
                <div onClick={() => activeZoom == "1x" ? setActiveZoom("") : setActiveZoom("1x")} className='tool-btn' style={activeZoom == "1x" ? {backgroundColor:"rgb(255, 148, 243)"}:{}}>
                    <SlMagnifier color='black' size={20} />    
                </div>
                <div onClick={() => activeZoom == "2x" ? setActiveZoom("") : setActiveZoom("2x")} className='tool-btn' style={activeZoom == "2x" ? {backgroundColor:"rgb(255, 148, 243)"}:{}}>
                    <SlMagnifierAdd color='black' size={20} />    
                </div>
            </div>
        </div>
    )
}

const ChatSheet = ({
    handleClose,
    me,
    end,
    profileUrl,
    chatLog,
    setInputValue,
    inputValue,
    handleSubmit,
    scrollableDivRef
}:{
    handleClose: () => void;
    me:string,
    end:string,
    profileUrl:string,
    chatLog: any[],
    setInputValue: (inputValue:string) => void;
    inputValue:string;
    handleSubmit:() => void;
    scrollableDivRef: any;
}) => {

    return(
        <div style={{height:"100%",width:"100%",backgroundColor:"rgba(0,0,0,0.9)",position:"absolute",zIndex:100,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                    <div style={{width:"70%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:10,backgroundColor:"black",position:"absolute",zIndex:100,marginRight:180,top:10,borderTopRightRadius:30,borderTopLeftRadius:30}}>
                    <h5 style={{color:"white"}}>Chat</h5>
                    <SlClose color='red' size={25} style={{position:"absolute",right:10,cursor:"pointer"}} onClick={() => handleClose()} />
                    </div>
            <div ref={scrollableDivRef} style={{height:"80%",width:"70%",background:"white",borderRadius:10,position:"absolute",marginRight:180,marginBottom:100}}>
                <div    style={{display: "flex", flexDirection: "column",overflow:"hidden" }}>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center",overflow:"hidden"}}>
                        {
                            chatLog.map((message,index) => (
                                <ChatMessage 
                                    message={message}
                                    key={index} 
                                    me={me != undefined ? me : ""} 
                                    end={end} 
                                    isLast={index === chatLog.length - 1} 
                                    profileUrl={profileUrl}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
            <ChatInput 
                setInputValue={setInputValue}
                inputValue={inputValue}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}


const ChatMessage = ({ message, me, end, isLast,profileUrl }:{message:{user:string,inline_answer:boolean,sent:boolean,message:string},me:string,end:string,isLast:boolean,profileUrl:string}) => {
    return(
    <div  
    style={{
        flexDirection: "row",
        width: "60%",
        borderWidth: 0,
        alignSelf:message.user == me ? "end" : "start",
        padding: 10,
        paddingTop: 1,
        paddingBottom: 1,
        overflowY:"hidden",
        ...(message.user === me && { backgroundColor: "rgba(0,0,0,0)", flexDirection: "row-reverse",alignSelf:"end" }),
        ...(!message.inline_answer && message.sent && { marginTop: 30 }),
        ...(isLast && message.user === me && { marginBottom: 20 })
    }}
        >
        {message.user == end &&
            (
            !message.inline_answer ?
            <img
                src={profileUrl}
                style={{width:50,height:50,borderRadius:10,marginRight:5,overflowY:"hidden"}}
            />
            :
            <div style={{width:40,height:40,marginRight:5}} />
            )
        }
        {message.user == end ? (
            <div style={{
                alignItems:"start",
                paddingTop:8,
                paddingBottom:8,                
                paddingRight:10,
                paddingLeft:10,
                backgroundColor:"rgba(0,0,255,0.4)",
                borderRadius:10,
                borderTopLeftRadius:0,
                borderBottomLeftRadius:2,
                marginBottom:0,
                ...(isLast && { marginBottom: 10 })
            }}>
                <p style={{
                    maxWidth:290,
                    color:"black",
                    fontWeight:"500"
                }}>
                    {message.message}
                </p>
            </div>
        ):(
            
            <div style={{
                alignItems:"start",
                padding:"8px 10px", 
                backgroundColor:"rgba(0,0,255,0.4)",
                borderRadius:10,
                borderTopRightRadius:0,
                borderBottomRightRadius:2,
                marginBottom:0,
                ...(isLast && {marginBottom:10})
                }}>
                <p style={{
                    maxWidth:290,
                    color:"black",
                    fontWeight:"500"
                    }}>
                    {message.message}
                </p>
            </div>
        )
        }
        {message.sent ? (
            isLast && message.user == me ? (
            <div style={{flexDirection:"row",alignItems:"center",position:"absolute",bottom:-3,right:10}}>
                <SlCheck 

                    size={13}
                />
            </div>
        
            ): null
        ):(
            <div style={{flexDirection:"row",alignItems:"center",position:"absolute",bottom:-10,right:15}}>
                <div style={{borderColor:"blue",borderWidth:1,borderRadius:100,height:10,width:10}} />
                <p style={{fontSize:9,opacity:0.5}}> Sending ...</p>
            </div>
        )
        }
    </div>
    )
    };
    

const ChatInput = ({setInputValue,inputValue,handleSubmit}:{setInputValue:(inputValue:string) => void;inputValue:string;handleSubmit:() => void;}) => {
    return(
        <div style={{width:"70%",padding:"5px 20px",backgroundColor:"rgba(255,255,255,0.9)",position:"absolute",bottom:20,marginRight:180,borderRadius:5,display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{padding:10,backgroundColor:"blue",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:40,borderRadius:100}}>
                <SlCamera color='white' />
            </div>
            <textarea value={inputValue} onChange={(e) => setInputValue(e.target.value)} draggable={false}  style={{width:"80%",marginRight:10,marginLeft:10,padding:5,minHeight:50,maxHeight:90,maxWidth:"80%",minWidth:"60%",height:60,borderWidth:1,padding:"10px",borderRadius:5}} />
            <h6 style={{position:"absolute",right:"16%",bottom:10,fontSize:8,opacity:0.4}}>You can adjust the height here -></h6>
            <div onClick={handleSubmit} style={{padding:10,backgroundColor:"blue",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:100,borderRadius:100,minWidth:50}}>
                <SlPaperPlane color='white' />
            </div>
        </div>
    )
}