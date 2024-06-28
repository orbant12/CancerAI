import React, { useRef, useState } from 'react';
import imageKep from "../../../../../public/ISIC_0477738.jpg"
import {SlMagnifier, SlMagnifierAdd } from "react-icons/sl";
import { useMouseOverZoom } from "../hook"
import { SpotData } from '@/utils/types';


export const MoleInspectionPanel = ({
    selectedOrderForReview
}:{
    selectedOrderForReview:SpotData | null
}) => {
    return(
        <>
        {selectedOrderForReview ?
        <div>
            <InspectionComponent 
                data={selectedOrderForReview}
            />
        </div>
        :
        <div style={{width:"100%",height:"100%",flexDirection:"column",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <h4>You need to select an order first !</h4>
        </div>
        }
        </>
    )
}


const InspectionComponent = ({
    data
}:{
    data:SpotData
}) => {

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
                data={data}
            />
            </div>
        </div>
    )
}

function ImageEditor({
    activeZoom,
    source,
    setActiveZoom,
    cursor,
    data
}:{
    activeZoom: "" | "1x" | "2x" | string;
    source: any,
    setActiveZoom: (activeZoom:"" | "1x" | "2x") => void;
    cursor:any;
    data:SpotData
}) {
    return(
        <div className='image-editor'>
            <img src={data.melanomaPictureUrl} className='image-edit' width={500} ref={source} style={{width:"500px", height:"500px", border:"1px solid black"}} />
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
