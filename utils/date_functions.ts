import { Timestamp } from "firebase/firestore";




export const timestampToString = (timestamp: any) => {
    //YYYY-MM-DD
    const date = new Date(timestamp.toDate())
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}.${month}.${day}`
}


export const timestampBirtDate_Age_Calculator_FromToday = (timestamp: any) => {
    //YYYY-MM-DD
    const date = new Date(timestamp.toDate())
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const today = new Date()
    const todayYear = today.getFullYear()
    const todayMonth = today.getMonth() + 1
    const todayDay = today.getDate()

    const age = todayYear - year

    return `${age}`
}