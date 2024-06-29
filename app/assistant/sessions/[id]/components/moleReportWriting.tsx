import { SessionType, SpotData} from "@/utils/types"
import { SlCheck,SlClose } from "react-icons/sl";
import React, { useState } from 'react';
import { Answer, MoleAnswers, Result, ResultAnswers } from "../page";
import { PDF_Modal } from "./pdfModal";
import { timestampBirtDate_Age_Calculator_FromToday, timestampToString } from "@/utils/date_functions";

export type AnswerTypes = "asymmetry" | "border" | "color" | "diameter" | "evolution"

export type Answers = {
    asymmetry: {
        answer: string,
        description: string
    },
    border: {
        answer: string,
        description: string
    },
    color: {
        answer: string,
        description: string
    },
    diameter: {
        answer: string,
        description: string
    },
    evolution: {
        answer: string,
        description: string
    },

}

export const ReportWriting = (
    {
        selectedOrderForReview,
        sessionData,
        answerSheetForMole,
        setAnswerSheetForMoles,
        resultSheetForMole,
        setResultSheetForMole
    }:{
        selectedOrderForReview:SpotData | null;
        sessionData:SessionType | null;
        answerSheetForMole:Record<string, MoleAnswers>;
        setAnswerSheetForMoles:(arg:Record<string, MoleAnswers>) => void;
        resultSheetForMole:Record<string, ResultAnswers>;
        setResultSheetForMole:(arg:Record<string, ResultAnswers>) => void;
    }) => {
    

    const [isPDFVisible, setIsPDFVisible] = useState(false)

    return(
        <>
        {selectedOrderForReview && sessionData ?
            <div>
                {isPDFVisible ?
                    <PDF_Modal
                        setIsPDFVisible={setIsPDFVisible}
                        isPDFVisible={isPDFVisible}
                        selectedOrderForReview={selectedOrderForReview}
                        sessionData={sessionData}
                        answers={answerSheetForMole}
                        results={resultSheetForMole}
                    />
                    :
                    <div onClick={() => setIsPDFVisible(!isPDFVisible)} style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",background:"black",padding:15,borderRadius:100,position:"fixed",bottom:95,right:20,boxShadow:"0px 1px 10px 1px black",cursor:"pointer"}}>
                        <h5 style={{color:"white"}}>PDF</h5>
                    </div>
                }
                <ReportComponent 
                    data={selectedOrderForReview}
                    answer={answerSheetForMole}
                    setAnswer={setAnswerSheetForMoles}
                    sessionData={sessionData}
                    results={resultSheetForMole}
                    setResults={setResultSheetForMole}
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

const ReportComponent = (
    {
        data,
        answer,
        setAnswer,
        sessionData,
        setResults,
        results
    }:{ 
        data:SpotData,
        answer:Record<string, MoleAnswers>,
        setAnswer:(arg:Record<string, MoleAnswers>) => void;
        sessionData:SessionType | null;
        setResults:(arg:Record<string, ResultAnswers>) => void;
        results:Record<string, ResultAnswers>;
    }) => {
    return(
        <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <h3 style={{fontSize:40}}>Report Writing</h3>
            <h4 style={{padding:15, background:"rgba(0,255,0,0.3)",borderRadius:10,fontWeight:"500",opacity:0.7,fontSize:14,marginTop:10,maxWidth:"80%"}}>Answer the following questions about the mole. Your answers will fill out the PDF template shown below...</h4>
            <ABCDE_Component 
                answer={answer}
                setAnswer={setAnswer}
                data={data}
            />
            <CrucialInformation_Component 
                data={data}
                sessionData={sessionData}
            />
            <Result_Component 
                data={data}
                answer={answer}
                results={results}
                setResults={setResults}
            />
        </div>
    )
}

const ABCDE_Component = ({
    answer,
    setAnswer,
    data
}:{
    answer:Record<string, MoleAnswers>;
    setAnswer:(arg:Record<string, MoleAnswers>) => void;
    data:SpotData;
}) => {
    return(
        <div style={{width:"100%",flexDirection:"column",display:"flex",alignItems:"center"}}>
        <div style={{width:"80%",display:"flex",flexDirection:"column",alignItems:"center",background:"white",padding:20,border:"3px solid black",marginTop:30,borderBottom:0,boxShadow:"2px 5px 3px 2px black",borderTopRightRadius:30,borderTopLeftRadius:30}}>  
            <h1 style={{}}>ABCDE</h1>
            <div style={{width:"70%",display:"flex",flexDirection:"row",justifyContent:"space-between",margin:5,marginTop:30}}>
                <div>
                    {answer?.[data.melanomaId].asymmetry.answer != "" ? <h2 style={{color:"lightgreen"}}>A</h2> :<h2 style={{color:"red"}}>A</h2>}
                    {answer?.[data.melanomaId].asymmetry.answer != "" ? <SlCheck color="lightgreen" /> : <SlClose color="red" />}
                </div>
                <div>
                    {answer?.[data.melanomaId].border.answer != "" ? <h2 style={{color:"lightgreen"}}>B</h2> :<h2 style={{color:"red"}}>B</h2>}
                    {answer?.[data.melanomaId].border.answer != "" ? <SlCheck color="lightgreen" /> : <SlClose color="red" />}
                </div>
                <div>
                    {answer?.[data.melanomaId].color.answer != "" ? <h2 style={{color:"lightgreen"}}>C</h2> :<h2 style={{color:"red"}}>C</h2>}
                    {answer?.[data.melanomaId].color.answer != "" ? <SlCheck color="lightgreen" /> : <SlClose color="red" />}
                </div>
                <div>
                    {answer?.[data.melanomaId].diameter.answer != "" ? <h2 style={{color:"lightgreen"}}>D</h2> :<h2 style={{color:"red"}}>D</h2>}
                    {answer?.[data.melanomaId].diameter.answer != "" ? <SlCheck color="lightgreen" /> : <SlClose color="red" />}
                </div>
                <div>
                    {answer?.[data.melanomaId].evolution.answer != "" ? <h2 style={{color:"lightgreen"}}>E</h2> :<h2 style={{color:"red"}}>E</h2>}
                    {answer?.[data.melanomaId].evolution.answer != "" ? <SlCheck color="lightgreen" /> : <SlClose color="red" />}
                </div>
            </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",marginTop:50,alignItems:"center",width:"80%",border:"3px solid black",padding:20,background:"white",boxShadow:"0px 0px 3px 0px black"}}>
                <h3 style={{alignSelf:"flex-start"}}>1 | Asymmetry</h3>

                <QuestionBox 
                    answer={answer?.[data.melanomaId].asymmetry}
                    question={() => 
                        <h4 style={{fontWeight:"600",marginTop:10,maxWidth:"60%"}}>
                            Is one half of the mole or lesion <span style={{fontWeight:"800",color:"magenta"}}>significantly different</span> in <span style={{color:"magenta"}}>shape or color</span> from the other half?
                        </h4>
                    }
                    setAnswer={(ans:string) => setAnswer({...answer,[data.melanomaId]:{...answer[data.melanomaId],asymmetry:{...answer[data.melanomaId].asymmetry,answer:ans}}})}
                    setDesc={(desc:string) => setAnswer({...answer,[data.melanomaId]:{...answer[data.melanomaId],asymmetry:{...answer[data.melanomaId].asymmetry,description:desc}}})}
                    type="asymmetry"
                />
        </div>
        <div style={{display:"flex",flexDirection:"column",marginTop:50,alignItems:"center",width:"80%",border:"3px solid black",padding:20,background:"white",borderBlock:2,boxShadow:"0px 0px 3px 0px black"}}>
                <h3 style={{alignSelf:"flex-start"}}>2 | Border</h3>

                <QuestionBox 
                    answer={answer?.[data.melanomaId].border}
                    question={() => 
                        <h4 style={{fontWeight:"600",marginTop:10,maxWidth:"60%"}}>
                            Are the <span style={{fontWeight:"800",color:"magenta"}}>edges</span> of the mole or lesion <span style={{color:"magenta"}}>irregular, ragged, notched, or blurred</span> ?
                        </h4>
                    }
                    setAnswer={(ans:string) => setAnswer({...answer,[data.melanomaId]:{...answer[data.melanomaId],border:{...answer[data.melanomaId].border,answer:ans}}})}
                    setDesc={(desc:string) => setAnswer({...answer,[data.melanomaId]:{...answer[data.melanomaId],border:{...answer[data.melanomaId].border,description:desc}}})}
                    type="border"
                />
        </div>
        <div style={{display:"flex",flexDirection:"column",marginTop:50,alignItems:"center",width:"80%",border:"3px solid black",padding:20,background:"white",borderBlock:2,boxShadow:"0px 0px 3px 0px black"}}>
                <h3 style={{alignSelf:"flex-start"}}>3 | Color</h3>

                <QuestionBox 
                    answer={answer?.[data.melanomaId].color}
                    question={() => 
                        <h4 style={{fontWeight:"600",marginTop:10,maxWidth:"60%"}}>
                            Does the mole or lesion have <span style={{fontWeight:"800",color:"magenta"}}>multiple colors</span> (such as shades of brown, black, blue, white, or red) or an <span style={{color:"magenta"}}>uneven distribution</span> of color ?
                        </h4>
                    }
                    setAnswer={(ans:string) => setAnswer({...answer,[data.melanomaId]:{...answer[data.melanomaId],color:{...answer[data.melanomaId].color,answer:ans}}})}
                    setDesc={(desc:string) => setAnswer({...answer,[data.melanomaId]:{...answer[data.melanomaId],color:{...answer[data.melanomaId].color,description:desc}}})}
                    type="color"
                />
        </div>
        <div style={{display:"flex",flexDirection:"column",marginTop:50,alignItems:"center",width:"80%",border:"3px solid black",padding:20,background:"white",borderBlock:2,boxShadow:"0px 0px 3px 0px black"}}>
                <h3 style={{alignSelf:"flex-start"}}>4 | Diameter</h3>

                <QuestionBox 
                    answer={answer?.[data.melanomaId].diameter}
                    question={() => 
                        <h4 style={{fontWeight:"600",marginTop:10,maxWidth:"60%"}}>
                            Is the diameter of the mole or lesion larger than <span style={{fontWeight:"800",color:"magenta"}}>6 millimeters</span> ?
                        </h4>
                    }
                    setAnswer={(ans:string) => setAnswer({...answer,[data.melanomaId]:{...answer[data.melanomaId],diameter:{...answer[data.melanomaId].diameter,answer:ans}}})}
                    setDesc={(desc:string) => setAnswer({...answer,[data.melanomaId]:{...answer[data.melanomaId],diameter:{...answer[data.melanomaId].diameter,description:desc}}})}
                    type="diameter"
                />
        </div>
        <div style={{display:"flex",flexDirection:"column",marginTop:50,alignItems:"center",width:"80%",border:"3px solid black",padding:20,background:"white",borderTop:2,boxShadow:"0px 0px 3px 0px black"}}>
                <h3 style={{alignSelf:"flex-start"}}>5 | Evolving</h3>

                <QuestionBox 
                    answer={answer?.[data.melanomaId].evolution}
                    question={() => 
                        <div style={{display:"flex",flexDirection:"column",width:"60%"}}>
                            <h4 style={{fontWeight:"600",marginTop:10,maxWidth:"100%"}}>
                                Has the mole or lesion changed in <span style={{fontWeight:"800",color:"magenta"}}>size, shape, color, or elevation</span> ?
                            </h4>
                            <h6 style={{marginTop:5,opacity:0.5}}>You can see the older versions of the mole in the Mole Inspection</h6>
                        </div>
                    }
                    setAnswer={(ans:string) => setAnswer({...answer,[data.melanomaId]:{...answer[data.melanomaId],evolution:{...answer[data.melanomaId].evolution,answer:ans}}})}
                    setDesc={(desc:string) => setAnswer({...answer,[data.melanomaId]:{...answer[data.melanomaId],evolution:{...answer[data.melanomaId].evolution,description:desc}}})}
                    type="evolution"
                />
        </div>
    </div>
    )
}

const CrucialInformation_Component = ({
    data,
    sessionData
}:{
    data:SpotData;
    sessionData:SessionType | null;
}) => {
    return(
        <div style={{width:"80%",alignItems:"center",display:"flex",flexDirection:"column",border:"3px solid black",background:"white",marginTop:100,borderRadius:30,boxShadow:"0px 0px 3px 0px black"}}>
        <h3 style={{marginTop:30,fontSize:30}}>Crucial Information</h3>
        <div style={{width:"90%",padding:30,display:"flex",flexDirection:"column"}}>
            <h3>Presonal Information</h3>
            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10,width:"90%",alignSelf:"center",background:"rgba(0,0,0,0.1)",padding:15,borderRadius:10}}>
                <h4>Fullname:</h4>
                <h4>{sessionData?.clientData.fullname}</h4>
            </div>
            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10,width:"90%",alignSelf:"center",background:"rgba(0,0,0,0.2)",padding:15,borderRadius:10}}>
                <h4>Gender:</h4>
                <h4>{data.gender}</h4>
            </div>
            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10,width:"90%",alignSelf:"center",background:"rgba(0,0,0,0.1)",padding:15,borderRadius:10}}>
                <h4>Age:</h4>
                <h4> {timestampBirtDate_Age_Calculator_FromToday(sessionData?.clientData.birth_date)} years old</h4>
            </div>
            <h3 style={{marginTop:30}}>Mole Infotmation</h3>
            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10,width:"90%",alignSelf:"center",background:"rgba(0,0,0,0.2)",padding:15,borderRadius:10}}>
                <h4>Mole ID:</h4>
                <h4>{data.melanomaId}</h4>
            </div>

            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10,width:"90%",alignSelf:"center",background:"rgba(0,0,0,0.1)",padding:15,borderRadius:10}}>
                <h4>Location:</h4>
                <h4>{data.melanomaDoc.spot[0].slug}</h4>
            </div>
            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10,width:"90%",alignSelf:"center",background:"rgba(0,0,0,0.2)",padding:15,borderRadius:10}}>
                <h4>Itching:</h4>
                <h4>{"s"}</h4>
            </div>
            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10,width:"90%",alignSelf:"center",background:"rgba(0,0,0,0.1)",padding:15,borderRadius:10}}>
                <h4>Bleeding:</h4>
                <h4>{"s"}</h4>
            </div>
            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10,width:"90%",alignSelf:"center",background:"rgba(0,0,0,0.2)",padding:15,borderRadius:10}}>
                <h4>Sun exposure:</h4>
                <h4>{"s"}</h4>
            </div>
            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10,width:"90%",alignSelf:"center",background:"rgba(0,0,0,0.2)",padding:15,borderRadius:10}}>
                <h4>Family:</h4>
                <h4>{"s"}</h4>
            </div>
            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10,width:"90%",alignSelf:"center",background:"rgba(0,0,0,0.2)",padding:15,borderRadius:10}}>
                <h4>Skin Type:</h4>
                <h4>{"s"}</h4>
            </div>
        </div>
    </div>
    )
}

const Result_Component = ({
    data,
    answer,
    results,
    setResults
}:{
    data:SpotData;
    answer:Record<string, MoleAnswers>;
    results:Record<string, ResultAnswers>;
    setResults:(arg:Record <string, ResultAnswers>) => void;
}) => {
    return(
        <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div style={{width:"80%",display:"flex",flexDirection:"column",alignItems:"center",background:"white",padding:20,border:"3px solid black",marginTop:100,borderBottom:0,boxShadow:"2px 5px 3px 2px black",borderTopRightRadius:30,borderTopLeftRadius:30}}>  
            <h3 style={{fontSize:30}}>Results</h3>
            <div style={{width:"70%",display:"flex",flexDirection:"row",justifyContent:"space-between",margin:5,marginTop:30}}>
                <div>
                    {answer?.[data.melanomaId].asymmetry.answer != "" ? <h2 style={{color:"lightgreen"}}>A</h2> :<h2 style={{color:"red"}}>A</h2>}
                    {answer?.[data.melanomaId].asymmetry.answer != "" ? <SlCheck color="lightgreen" /> : <SlClose color="red" />}
                </div>
                <div>
                    {answer?.[data.melanomaId].border.answer != "" ? <h2 style={{color:"lightgreen"}}>B</h2> :<h2 style={{color:"red"}}>B</h2>}
                    {answer?.[data.melanomaId].border.answer != "" ? <SlCheck color="lightgreen" /> : <SlClose color="red" />}
                </div>
                <div>
                    {answer?.[data.melanomaId].color.answer != "" ? <h2 style={{color:"lightgreen"}}>C</h2> :<h2 style={{color:"red"}}>C</h2>}
                    {answer?.[data.melanomaId].color.answer != "" ? <SlCheck color="lightgreen" /> : <SlClose color="red" />}
                </div>
                <div>
                    {answer?.[data.melanomaId].diameter.answer != "" ? <h2 style={{color:"lightgreen"}}>D</h2> :<h2 style={{color:"red"}}>D</h2>}
                    {answer?.[data.melanomaId].diameter.answer != "" ? <SlCheck color="lightgreen" /> : <SlClose color="red" />}
                </div>
                <div>
                    {answer?.[data.melanomaId].evolution.answer != "" ? <h2 style={{color:"lightgreen"}}>E</h2> :<h2 style={{color:"red"}}>E</h2>}
                    {answer?.[data.melanomaId].evolution.answer != "" ? <SlCheck color="lightgreen" /> : <SlClose color="red" />}
                </div>
            </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",marginTop:50,alignItems:"center",width:"80%",border:"3px solid black",padding:20,background:"white",boxShadow:"0px 0px 3px 0px black"}}>
                <h3 style={{alignSelf:"flex-start"}}>1 | Chance of <span style={{color:"magenta",opacity:0.5}}>{data.melanomaId}</span> being <span style={{color:"magenta"}}>malignant</span>:</h3>

                <ResultBox 
                    results={results?.[data.melanomaId].mole_malignant_chance}
                    setResults={(ans: 0 | 1 | 2 | 3 | 4 | 5) => {
                        setResults({
                            ...results,
                            [data.melanomaId]: {
                                ...results[data.melanomaId],
                                mole_malignant_chance: {
                                    answer: ans,
                                    description: results?.[data.melanomaId]?.mole_malignant_chance?.description || ''
                                }
                            }
                        });
                    }}
                    setDesc={(desc: string) => {
                        setResults({
                            ...results,
                            [data.melanomaId]: {
                                ...results[data.melanomaId],
                                mole_malignant_chance: {
                                    ...results[data.melanomaId].mole_malignant_chance,
                                    description: desc
                                }
                            }
                        });
                    }}
                />

        </div>
        <div style={{display:"flex",flexDirection:"column",marginTop:50,alignItems:"center",width:"80%",border:"3px solid black",padding:20,background:"white",boxShadow:"0px 0px 3px 0px black"}}>
                <h3 style={{alignSelf:"flex-start"}}>2 | Chance of <span style={{color:"magenta",opacity:0.5}}>{data.melanomaId}</span> evolving into <span style={{color:"magenta"}}>cancer</span>:</h3>
                <div style={{width:"90%",display:"flex",flexDirection:"column",alignItems:"center",padding:10,background:"rgba(0,0,0,0.05)",margin:20,borderRadius:10,opacity:0.8,boxShadow:"inset 0px 0px 1px 0px black",}}>
                    <h4 style={{alignSelf:"flex-start",opacity:0.8,margin:10}}>Useful Information:</h4>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:0,width:"90%",alignSelf:"center",background:"rgba(0,0,0,0.2)",padding:15,borderRadius:10}}>
                        <h4>Itching:</h4>
                        <h4>{"s"}</h4>
                    </div>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10,width:"90%",alignSelf:"center",background:"rgba(0,0,0,0.2)",padding:15,borderRadius:10}}>
                        <h4>Had melanoma before ?</h4>
                        <h4>{"no"}</h4>
                    </div>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10,width:"90%",alignSelf:"center",background:"rgba(0,0,0,0.1)",padding:15,borderRadius:10}}>
                        <h4>Bleeding:</h4>
                        <h4>{"s"}</h4>
                    </div>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10,width:"90%",alignSelf:"center",background:"rgba(0,0,0,0.2)",padding:15,borderRadius:10}}>
                        <h4>Sun exposure:</h4>
                        <h4>{"s"}</h4>
                    </div>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10,width:"90%",alignSelf:"center",background:"rgba(0,0,0,0.2)",padding:15,borderRadius:10}}>
                        <h4>Skin Type:</h4>
                        <h4>{"s"}</h4>
                    </div>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10,width:"90%",alignSelf:"center",background:"rgba(0,0,0,0.2)",padding:15,borderRadius:10,marginBottom:10}}>
                        <h4>Family:</h4>
                        <h4>{"s"}</h4>
                    </div>
                </div>

                <ResultBox 
                    results={results?.[data.melanomaId].mole_evolution_chance}
                    setResults={(ans: 0 | 1 | 2 | 3 | 4 | 5) => {
                        setResults({
                            ...results,
                            [data.melanomaId]: {
                                ...results[data.melanomaId],
                                mole_evolution_chance: {
                                    answer: ans,
                                    description: results?.[data.melanomaId]?.mole_evolution_chance?.description || ''
                                }
                            }
                        });
                    }}
                    setDesc={(desc: string) => {
                        setResults({
                            ...results,
                            [data.melanomaId]: {
                                ...results[data.melanomaId],
                                mole_evolution_chance: {
                                    ...results[data.melanomaId].mole_evolution_chance,
                                    description: desc
                                }
                            }
                        });
                    }}
                />

        </div>
        <div style={{display:"flex",flexDirection:"column",marginTop:50,alignItems:"center",width:"80%",border:"3px solid black",padding:20,background:"white",boxShadow:"0px 0px 3px 0px black"}}>
                <h3 style={{alignSelf:"flex-start"}}>3 | Advice </h3>
                <div style={{width:"90%",display:"flex",flexDirection:"column",alignItems:"center",padding:10,background:"rgba(0,0,0,0.05)",margin:20,borderRadius:10,opacity:0.8,boxShadow:"inset 0px 0px 1px 0px black",}}>
                    <h4 style={{alignSelf:"flex-start",opacity:0.8,margin:10}}>Useful Information:</h4>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10,width:"90%",alignSelf:"center",background:"rgba(0,0,0,0.1)",padding:15,borderRadius:10}}>
                        <h4>Location:</h4>
                        <h4>{data.melanomaDoc.spot[0].slug}</h4>
                    </div>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10,width:"90%",alignSelf:"center",background:"rgba(0,0,0,0.2)",padding:15,borderRadius:10}}>
                        <h4>Had melanoma before ?</h4>
                        <h4>{"no"}</h4>
                    </div>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10,width:"90%",alignSelf:"center",background:"rgba(0,0,0,0.2)",padding:15,borderRadius:10}}>
                        <h4>Itching:</h4>
                        <h4>{"s"}</h4>
                    </div>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10,width:"90%",alignSelf:"center",background:"rgba(0,0,0,0.1)",padding:15,borderRadius:10}}>
                        <h4>Bleeding:</h4>
                        <h4>{"s"}</h4>
                    </div>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10,width:"90%",alignSelf:"center",background:"rgba(0,0,0,0.2)",padding:15,borderRadius:10}}>
                        <h4>Sun exposure:</h4>
                        <h4>{"s"}</h4>
                    </div>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10,width:"90%",alignSelf:"center",background:"rgba(0,0,0,0.2)",padding:15,borderRadius:10}}>
                        <h4>Skin Type:</h4>
                        <h4>{"s"}</h4>
                    </div>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10,width:"90%",alignSelf:"center",background:"rgba(0,0,0,0.2)",padding:15,borderRadius:10,marginBottom:10}}>
                        <h4>Family:</h4>
                        <h4>{"s"}</h4>
                    </div>
                </div>

                <> 
                    <h6 style={{opacity:0.5,alignSelf:"flex-start",fontWeight:"800",marginBottom:-6}}>Optional</h6>
                    <textarea  value={results?.[data.melanomaId].mole_advice} onChange={(e:any) => setResults({
                            ...results,
                            [data.melanomaId]: {
                                ...results[data.melanomaId],
                                mole_advice: e.target.value
                            }
                        })} style={{width:"100%",height:100,marginTop:10,border:"1px solid black",borderRadius:5,padding:10,maxWidth:"100%",minWidth:"100%"}} placeholder={"Share your experiences and concerns with useful advice..."} />
                </>

        </div>
        <div style={{display:"flex",flexDirection:"column",marginTop:50,alignItems:"center",width:"80%",border:"3px solid black",padding:20,background:"white",boxShadow:"0px 0px 3px 0px black"}}>
                <h3 style={{alignSelf:"flex-start"}}>4 | Chance of developing <span style={{color:"magenta"}}>skin cancer</span> based on medical information in the future</h3>
                <div style={{width:"90%",display:"flex",flexDirection:"column",alignItems:"center",padding:10,background:"rgba(0,0,0,0.05)",margin:20,borderRadius:10,opacity:0.8,boxShadow:"inset 0px 0px 1px 0px black",}}>
                    <h4 style={{alignSelf:"flex-start",opacity:0.8,margin:10}}>Useful Information:</h4>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10,width:"90%",alignSelf:"center",background:"rgba(0,0,0,0.1)",padding:15,borderRadius:10}}>
                        <h4>Location:</h4>
                        <h4>{data.melanomaDoc.spot[0].slug}</h4>
                    </div>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10,width:"90%",alignSelf:"center",background:"rgba(0,0,0,0.2)",padding:15,borderRadius:10}}>
                        <h4>Had melanoma before ?</h4>
                        <h4>{"no"}</h4>
                    </div>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10,width:"90%",alignSelf:"center",background:"rgba(0,0,0,0.2)",padding:15,borderRadius:10}}>
                        <h4>Itching:</h4>
                        <h4>{"s"}</h4>
                    </div>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10,width:"90%",alignSelf:"center",background:"rgba(0,0,0,0.1)",padding:15,borderRadius:10}}>
                        <h4>Bleeding:</h4>
                        <h4>{"s"}</h4>
                    </div>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10,width:"90%",alignSelf:"center",background:"rgba(0,0,0,0.2)",padding:15,borderRadius:10}}>
                        <h4>Sun exposure:</h4>
                        <h4>{"s"}</h4>
                    </div>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10,width:"90%",alignSelf:"center",background:"rgba(0,0,0,0.2)",padding:15,borderRadius:10}}>
                        <h4>Skin Type:</h4>
                        <h4>{"s"}</h4>
                    </div>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10,width:"90%",alignSelf:"center",background:"rgba(0,0,0,0.2)",padding:15,borderRadius:10,marginBottom:10}}>
                        <h4>Family:</h4>
                        <h4>{"s"}</h4>
                    </div>
                </div>

                <ResultBox 
                    results={results?.[data.melanomaId].mole_evolution_chance}
                    setResults={(ans: 0 | 1 | 2 | 3 | 4 | 5) => {
                        setResults({
                            ...results,
                            [data.melanomaId]: {
                                ...results[data.melanomaId],
                                mole_evolution_chance: {
                                    answer: ans,
                                    description: results?.[data.melanomaId]?.mole_evolution_chance?.description || ''
                                }
                            }
                        });
                    }}
                    setDesc={(desc: string) => {
                        setResults({
                            ...results,
                            [data.melanomaId]: {
                                ...results[data.melanomaId],
                                mole_evolution_chance: {
                                    ...results[data.melanomaId].mole_evolution_chance,
                                    description: desc
                                }
                            }
                        });
                    }}
                />

        </div>
    </div>
    )
}

const QuestionBox = ({
    answer,
    setAnswer,
    setDesc,
    question,
    type
}:{
    answer:Answer;
    setAnswer:(answer:any) => void;
    setDesc:(desc:string) => void;
    type: AnswerTypes;
    question:() => JSX.Element;
}) => {
  

  return (
    <>
    <div style={{width:"100%",display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
    {question()}
      <div className="feedbackRow" >
        <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
          <input
            type="radio"
            name={type}
            value="yes"
            checked={answer.answer === 'yes'}
            onClick={(e:any) => answer.answer === "yes" ? setAnswer("") : setAnswer(e.target.value)}
          />
          <label style={{fontWeight:"800",marginLeft:5}}>Yes</label>
        </div>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
          <input
            type="radio"
            name={type}
            value="no"
            checked={answer.answer === 'no'}
            onClick={(e:any) => answer.answer === "no" ? setAnswer("") : setAnswer(e.target.value)}
          />
          <label style={{fontWeight:"800",marginLeft:5}}>No</label>
        </div>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
          <input
            type="radio"
            name={type}
            value="unable"
            onClick={(e:any) => answer.answer === "unable" ? setAnswer("") : setAnswer(e.target.value)}
          />
          <label style={{fontWeight:"800",marginLeft:5}}>Unable to tell</label>
        </div>
      </div>
    </div>
    {answer.answer == "yes" && <textarea value={answer.description} onChange={(e:any) => setDesc(e.target.value)} style={{width:"100%",height:100,marginTop:10,border:"1px solid black",borderRadius:5,padding:10}} placeholder={`Please describe the mole ${type} ...`} />}
    {answer.answer == "unable" && <textarea value={answer.description} onChange={(e:any) => setDesc(e.target.value)} style={{width:"100%",height:100,marginTop:10,border:"1px solid black",borderRadius:5,padding:10}} placeholder={`Please describe why the ${type} is unable to tell ...`} />}
    </>
  );
};

const ResultBox = ({
    results,
    setResults,
    setDesc
}:{
    results:Result;
    setResults:(ans:0 | 1 | 2 | 3 | 4 | 5) => void;
    setDesc:(desc:string) => void;
}) => {
  return (
    <>
    <div style={{width:"100%",display:"flex",flexDirection:"row",justifyContent:"space-between",flexWrap:"wrap",alignItems:"center",marginTop:15}}>
        <h3 onClick={() => results.answer == 1 ? setResults(0) : setResults(1)} style={results.answer == 1 ? {fontWeight:"600",opacity:1,cursor:"pointer",margin:20} : {fontWeight:"600",opacity:0.3,cursor:"pointer",margin:20}}>Very Low</h3>
        <h3 onClick={() => results.answer == 2 ? setResults(0) : setResults(2)} style={results.answer == 2 ? {fontWeight:"600",opacity:1,cursor:"pointer",margin:20} : {fontWeight:"600",opacity:0.3,cursor:"pointer",margin:20} }>Low</h3>
        <h3 onClick={() => results.answer == 3 ? setResults(0) : setResults(3)} style={results.answer == 3 ? {fontWeight:"600",opacity:1,cursor:"pointer",margin:20} : {fontWeight:"600",opacity:0.3,cursor:"pointer",margin:20} }>Medium</h3>
        <h3 onClick={() => results.answer == 4 ? setResults(0) : setResults(4)} style={results.answer == 4 ? {fontWeight:"600",opacity:1,cursor:"pointer",margin:20} : {fontWeight:"600",opacity:0.3,cursor:"pointer",margin:20} }>High</h3>
        <h3 onClick={() => results.answer == 5 ? setResults(0) : setResults(5)} style={results.answer == 5 ? {fontWeight:"600",opacity:1,cursor:"pointer",margin:20} : {fontWeight:"600",opacity:0.3,cursor:"pointer",margin:20} }>Extreme</h3>
    </div>
    {results.answer != 0 &&
    <> 
        <h6 style={{opacity:0.5,alignSelf:"flex-start",fontWeight:"800",marginBottom:-6}}>Optional</h6>
        <textarea  value={results.description} onChange={(e:any) => setDesc(e.target.value)} style={{width:"100%",height:100,marginTop:10,border:"1px solid black",borderRadius:5,padding:10}} placeholder={"If you have a notable reason please describe"} />
    </>
    }
    </>
  );
};


export default QuestionBox;






