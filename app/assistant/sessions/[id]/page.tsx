"use client"
import { BackIcon } from '../page';
import {useParams,useRouter} from 'next/navigation'
import "../../assistant.css"
import { SlBubble } from "react-icons/sl";
import { useState,useRef, useEffect } from 'react';

import imageKep from "../../../../public/ISIC_0477738.jpg"
import { useAuth } from '@/Context/UserAuthContext';
import { fetchSession_Single,fetchChat,realTimeUpdateChat } from '@/services/api';
import { messageStateChange } from '@/utils/assist/messageStateChanger';
import { SessionType } from '@/utils/types';
import { MoleInspectionPanel } from './components/moleInspection';
import { ChatModal } from './components/chat';
import { OrdersPanel } from './components/oredersPanel';



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
    const [ sessionData, setSessionData] = useState<SessionType | null>(null)
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
        if (response != null) {
            setSessionData(response)
            fetchSessionChat(response.clientData.id)
        }
    }
    }

    const updateChatLog = async (chatState: any[]) => {
        if ( currentuser && sessionData ) {
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
                    scrollToBottom()
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
        if( sessionData ){
            fetchSessionChat(sessionData.clientData.id);
        }

        if( sessionData ){
            // Set up interval to fetch data every 5 seconds
            const intervalId = setInterval(() => fetchSessionChat(sessionData.clientData.id), 4000);
            return () => clearInterval(intervalId);
        }
    }, [sessionData])


    useEffect(() => {
        scrollToBottom()
    }, [isChatOpen]);

    return(
        <div style={{width:"100%",flexDirection:"column",padding:0,display:"flex",minHeight:"130%"}}>
            <div style={{display:"flex",flexDirection:"row",alignItems:"center",background:"white",justifyContent:"space-between",padding:2,borderRadius:100,margin:20}}>
                <Bubble 
                    title='Orders'
                    selectedStage={selectedStage}
                    setSelectedStage={setSelectedStage}
                    index={0}
                />
                <Bubble 
                    title='Mole Inspection'
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
            {selectedStage == 0 && <OrdersPanel  orders={sessionData?.purchase.item} />}
            {selectedStage == 1 &&  <MoleInspectionPanel />}            
            <ChatModal 
                visible={isChatOpen}
                sessionData={sessionData}
                chatLog={chatLog}
                setInputValue={setInputValue}
                inputValue={inputValue}
                handleSubmit={handleSubmit}
                setIsChatOpen={setIsChatOpen}
                currentuser={currentuser}
                scrollableDivRef={scrollableDivRef}
            />
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

