"use client"
import { BackIcon } from '../page';
import {useParams,useRouter} from 'next/navigation'
import "../../assistant.css"
import { SlBubble, SlMagnifier, SlMagnifierAdd } from "react-icons/sl";
import { useState,useRef } from 'react';
import { useMouseOverZoom } from "./hook"
import imageKep from "../../../../public/ISIC_0477738.jpg"
export default function SessionPage(){
    const router = useRouter();
    const { id } = useParams()

    const [ selectedStage, setSelectedStage ] = useState(0)

    return(
        <div style={{width:"100%",flexDirection:"column",padding:0,display:"flex",overflowY:"scroll",minHeight:"130%"}}>
            <div style={{flexDirection:"row",display:"flex",width:"80%",alignItems:"center",justifyContent:"space-between",alignSelf:"center",marginTop:20}}>
                <BackIcon 
                    handleBack={() => router.back()}
                />
            </div>
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
    const [ activeZoom, setActiveZoom ] = useState("")

    const zoom = activeZoom == "1x" ? 100 : 20
    
    useMouseOverZoom(source, target, cursor, zoom);

    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });


    const handleMouseDown = (e) => {
        setIsDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    const handleMouseMove = (e) => {
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
            <div style={{flexDirection:"column",margin:10,padding:10}}>
                <DataBar />
            </div>
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