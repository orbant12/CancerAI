import { collection, doc,getDocs, getDoc } from "firebase/firestore";
import { db } from "./firebase";


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

export const fetchSingleAssistantData = async ({ userId }: { userId: string }) => {
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
