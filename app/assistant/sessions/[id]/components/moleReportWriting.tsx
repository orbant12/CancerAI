import { SpotData } from "@/utils/types"


type Answers = {
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

type AnswerTypes = "asymmetry" | "border" | "color" | "diameter" | "evolution"

export const ReportWriting = ({selectedOrderForReview}:{selectedOrderForReview:SpotData | null}) => {

    const [answer, setAnswer] = useState<Answers>({
        asymmetry: {
            answer: "",
            description: ""
        },
        border: {
            answer: "",
            description: ""
        },
        color: {
            answer: "",
            description: ""
        },
        diameter: {
            answer: "",
            description: ""
        },
        evolution: {
            answer: "",
            description: ""
        },
    
    });

    return(
        <>
        {selectedOrderForReview ?
        <div>
            <ReportComponent 
                data={selectedOrderForReview}
                answer={answer}
                setAnswer={setAnswer}
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

const ReportComponent = ({data,answer,setAnswer}:{ data:SpotData, answer:Answers, setAnswer:(answer:any) => void; }) => {
    return(
        <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <h3>Report Writing</h3>
            <h4 style={{padding:15, background:"rgba(0,255,0,0.3)",borderRadius:10,fontWeight:"500",opacity:0.7,fontSize:14,marginTop:10,maxWidth:"80%"}}>Answer the following questions about the mole. Your answers will fill out the PDF template shown below...</h4>
            <h3 style={{marginTop:30}}>ABCDE</h3>
            <div style={{display:"flex",flexDirection:"column",marginTop:20,alignItems:"center",width:"80%",border:"3px solid black",padding:20}}>
                    <h3 style={{alignSelf:"flex-start"}}>1 | Asymmetry</h3>

                    <QuestionBox 
                        answer={answer.asymmetry}
                        question={() => 
                            <h4 style={{fontWeight:"600",marginTop:10,maxWidth:"60%"}}>
                                Is one half of the mole or lesion <span style={{fontWeight:"800",color:"magenta"}}>significantly different</span> in <span style={{color:"magenta"}}>shape or color</span> from the other half?
                            </h4>
                        }
                        setAnswer={(ans:string) => setAnswer({...answer,asymmetry:{...answer.asymmetry,answer:ans}})}
                        setDesc={(desc:string) => setAnswer({...answer,asymmetry:{...answer.asymmetry,description:desc}})}
                        type="asymmetry"
                    />
            </div>
            <div style={{display:"flex",flexDirection:"column",marginTop:50,alignItems:"center",width:"80%",border:"3px solid black",padding:20}}>
                    <h3 style={{alignSelf:"flex-start"}}>2 | Border</h3>

                    <QuestionBox 
                        answer={answer.border}
                        question={() => 
                            <h4 style={{fontWeight:"600",marginTop:10,maxWidth:"60%"}}>
                                Are the <span style={{fontWeight:"800",color:"magenta"}}>edges</span> of the mole or lesion <span style={{color:"magenta"}}>irregular, ragged, notched, or blurred</span> ?
                            </h4>
                        }
                        setAnswer={(ans:string) => setAnswer({...answer,border:{...answer.border,answer:ans}})}
                        setDesc={(desc:string) => setAnswer({...answer,border:{...answer.border,description:desc}})}
                        type="border"
                    />
            </div>
            <div style={{display:"flex",flexDirection:"column",marginTop:50,alignItems:"center",width:"80%",border:"3px solid black",padding:20}}>
                    <h3 style={{alignSelf:"flex-start"}}>3 | Color</h3>

                    <QuestionBox 
                        answer={answer.color}
                        question={() => 
                            <h4 style={{fontWeight:"600",marginTop:10,maxWidth:"60%"}}>
                                Does the mole or lesion have <span style={{fontWeight:"800",color:"magenta"}}>multiple colors</span> (such as shades of brown, black, blue, white, or red) or an <span style={{color:"magenta"}}>uneven distribution</span> of color ?
                            </h4>
                        }
                        setAnswer={(ans:string) => setAnswer({...answer,color:{...answer.color,answer:ans}})}
                        setDesc={(desc:string) => setAnswer({...answer,color:{...answer.color,description:desc}})}
                        type="color"
                    />
            </div>
            <div style={{display:"flex",flexDirection:"column",marginTop:50,alignItems:"center",width:"80%",border:"3px solid black",padding:20}}>
                    <h3 style={{alignSelf:"flex-start"}}>4 | Diameter</h3>

                    <QuestionBox 
                        answer={answer.diameter}
                        question={() => 
                            <h4 style={{fontWeight:"600",marginTop:10,maxWidth:"60%"}}>
                                Is the diameter of the mole or lesion larger than <span style={{fontWeight:"800",color:"magenta"}}>6 millimeters</span> ?
                            </h4>
                        }
                        setAnswer={(ans:string) => setAnswer({...answer,diameter:{...answer.diameter,answer:ans}})}
                        setDesc={(desc:string) => setAnswer({...answer,diameter:{...answer.diameter,description:desc}})}
                        type="diameter"
                    />
            </div>
            <div style={{display:"flex",flexDirection:"column",marginTop:50,alignItems:"center",width:"80%",border:"3px solid black",padding:20}}>
                    <h3 style={{alignSelf:"flex-start"}}>5 | Evolving</h3>

                    <QuestionBox 
                        answer={answer.evolution}
                        question={() => 
                            <div style={{display:"flex",flexDirection:"column",width:"60%"}}>
                                <h4 style={{fontWeight:"600",marginTop:10,maxWidth:"100%"}}>
                                    Has the mole or lesion changed in <span style={{fontWeight:"800",color:"magenta"}}>size, shape, color, or elevation</span> ?
                                </h4>
                                <h6 style={{marginTop:5,opacity:0.5}}>You can see the older versions of the mole in the Mole Inspection</h6>
                            </div>
                        }
                        setAnswer={(ans:string) => setAnswer({...answer,evolution:{...answer.evolution,answer:ans}})}
                        setDesc={(desc:string) => setAnswer({...answer,evolution:{...answer.evolution,description:desc}})}
                        type="evolution"
                    />
            </div>
            <h3 style={{marginTop:30}}>Client Feedback</h3>
        </div>
    )
}



import React, { useState } from 'react';

const QuestionBox = ({
    answer,
    setAnswer,
    setDesc,
    question,
    type
}:{
    answer:Answers["asymmetry"];
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
            onClick={(e:any) => setAnswer(e.target.value)}
          />
          <label style={{fontWeight:"800",marginLeft:5}}>Yes</label>
        </div>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
          <input
            type="radio"
            name={type}
            value="no"
            checked={answer.answer === 'no'}
            onClick={(e:any) => setAnswer(e.target.value)}
          />
          <label style={{fontWeight:"800",marginLeft:5}}>No</label>
        </div>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
          <input
            type="radio"
            name={type}
            value="unable"
            checked={answer.answer === 'unable'}
            onClick={(e:any) => setAnswer(e.target.value)}
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

export default QuestionBox;

