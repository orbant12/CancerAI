"use client"
import { BackIcon } from '../page';
import {useParams,useRouter} from 'next/navigation'
import "../../assistant.css"
import { SlBubble, SlMagnifier } from "react-icons/sl";
import { useState,useRef } from 'react';
import { useMouseOverZoom } from "./hook"
import imageKep from "../../../../public/ISIC_0477738.jpg"
export default function SessionPage(){
    const router = useRouter();
    const { id } = useParams()

    const [ selectedStage, setSelectedStage ] = useState(0)

    return(
        <div style={{width:"100%",flexDirection:"column",padding:0,display:"flex"}}>
            <div style={{flexDirection:"row",display:"flex",width:"80%",alignItems:"center",justifyContent:"space-between",alignSelf:"center",marginTop:20}}>
                <BackIcon 
                    handleBack={() => router.back()}
                />
            </div>
            <div style={{display:"flex",flexDirection:"row",alignItems:"center",background:"white",justifyContent:"space-between",padding:0,borderRadius:100,margin:20}}>
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
            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",background:"black",padding:15,borderRadius:100,position:"absolute",bottom:20,right:20,boxShadow:"0px 1px 10px 1px black",cursor:"pointer"}}>
                <SlBubble color='white' size={25} />
            </div>
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
    const zoom = 20
    
    useMouseOverZoom(source, target, cursor, zoom);

    return(
        <div style={{display:"flex",flexDirection:"column",width:"100%",marginTop:10,alignItems:"center"}}>
        <div style={{display:"flex",flexDirection:"row",width:"100%",alignItems:"center",justifyContent:"space-between",padding:30}}>
            <div style={{flexDirection:"column",margin:10,padding:10}}>
                <DataBar />
            </div>

            <div style={{display:"flex",flexDirection:"row",height:"100%"}}>
            <div>
                <img src={imageKep.src} className='image-edit' ref={source} style={{width:500, height:500, border:"1px solid black"}} />
                <div ref={cursor} className="cursor-element" />
                <canvas ref={target} className="element" />
            </div>
       
            
        
            
            <div style={{width:80,display:"flex",flexDirection:"column",justifyContent:"space-between",background:"black",padding:20,height:"100%", borderTopRightRadius:30,borderBottomRightRadius:30,alignItems:"center"}}>
                <div className='tool-btn'>
                    <SlMagnifier color='black' size={20} />    
                </div>
            </div>
            </div>


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

