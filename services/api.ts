import { collection, doc,getDocs, getDoc } from "firebase/firestore";
import { db } from "./firebase";

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