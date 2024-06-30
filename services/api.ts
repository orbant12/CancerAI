import { collection, doc,getDocs, getDoc,updateDoc,deleteDoc,setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { SessionType } from "@/utils/types";

interface FetchingProps{
    userId: string;
}



export const fetchAllAssistantIDs = async () => {
    try {
        const ref = collection(db, "assistants");
        const snapshot = await getDocs(ref);
        let assistantIDs: string[] = [];
        snapshot.forEach((doc) => {
            assistantIDs.push(doc.id);
        });

        return assistantIDs;
    } catch (err) {
        console.error("Error fetching assistant IDs:", err);
        return [];
    }
};

export const fetchSingleAssistantData = async ({ userId }:FetchingProps) => {
    try {
        const ref = doc(db, "assistants", userId);
        const snapshot = await getDoc(ref);
        if (snapshot.exists()) {
            return snapshot.data();
        } else {
            console.error(`Assistant with ID ${userId} does not exist.`);
            return [];
        }
    } catch (err) {
        console.error("Error fetching assistant data:", err);
        return [];
    }
};


export const fetchSessions_All = async ({ userId }:FetchingProps) => {
    try{
        const ref = collection(db, "assistants",userId,"Sessions");
        const snapshot = await getDocs(ref);
        let assistantSession: any[] = [];
        snapshot.forEach((doc) => {
            assistantSession.push(doc.data());
        });
        console.log(assistantSession)
        return assistantSession;
    } catch(err) {
        console.log(err)
        return [{err}]
    }
}

export const fetchSession_Single = async ({sessionId,userId} : {sessionId:string,userId:string}):Promise <SessionType | null> => {
    try{
        const ref = doc(db, "assistants",userId,"Sessions",sessionId)
        const snapshot = await getDoc(ref)
        if (snapshot.exists()) {
            return snapshot.data() as SessionType;
        } else {
            console.error(`Assistant with ID ${userId} does not exist.`);
            return null;
        }
    } catch {
        return null
    }
}

export const fetchChat = async({sessionId,clientId}:{sessionId:string,clientId:string}) => {
    try{
        const ref = doc(db,"users",clientId,"Assist_Panel",sessionId)
        const snapshot = await getDoc(ref)
        if (snapshot.exists()) {
            return snapshot.data().chat;
        } else {
            return [];
        }
    } catch {
        return []
    }
}


export const realTimeUpdateChat = async ({
    userId,
    sessionId,
    chat
}:{
    userId:string;
    sessionId:string;
    chat: any[];
}) => {
    try{
        const ref = doc(db, "users", userId, "Assist_Panel", sessionId) 
        await updateDoc(ref,{chat:[...chat]})
        return true
     } catch(Err) {
        console.log(Err)
        return Err
     }
}

export const fetchRequests = async ({userId}:{userId:string}) => {
    try{
        const ref = collection(db,"assistants",userId,"Requests")
        const snapshot = await getDocs(ref)
        let requests: any[] = [];
        snapshot.forEach((doc) => {
            requests.push(doc.data());
        });
        return requests;
    } catch(err) {
        console.log(err)
        return [{err}]
    }
}

export const handleRequestAccept = async ({sessionData}:{sessionData:SessionType}) => {
    try{
        const ref = doc(db,"assistants",sessionData.assistantData.id,"Sessions",sessionData.id)
        const reqRef = doc(db,"assistants",sessionData.assistantData.id,"Requests",sessionData.id)
        await deleteDoc(reqRef)
        await setDoc(ref,sessionData)
        return true
    } catch(err) {
        const reqRef = doc(db,"assistants",sessionData.assistantData.id,"Requests",sessionData.id)
        await setDoc(reqRef,sessionData)
        console.log(err)
        return false
    }
}

export const fetchMoleHistory = async ({moleId,userId}:{moleId:string,userId:string}) => {
    try{
        const ref = collection(db,"users",userId,"Melanoma",moleId,"History")
        const snapshot = await getDocs(ref)
        let history: any[] = [];
        snapshot.forEach((doc) => {
            history.push(doc.data());
        })
        return history;
    } catch {
        return null
    }
}