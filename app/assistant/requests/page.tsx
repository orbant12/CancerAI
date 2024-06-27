"use client"

import { useAuth } from '@/Context/UserAuthContext';
import { fetchRequests } from '@/services/api';
import { SessionType } from "@/utils/types";
import * as React from 'react';
import EnhancedTable from '../sessions/[id]/components/table';


type RequestTableType = {
    id: number;
    session_id: string;
    date: string;
    order: string;
}


const RequestPage = () => {

    const { currentuser } = useAuth()

    const [rows, setRows] = React.useState<RequestTableType[]>([])

    const fetchCurrentRequests = async () => {
        if (!currentuser) return
        const response: SessionType[] = await fetchRequests({
            userId: currentuser.uid
        })
        const data_preprocess = response.map((item:SessionType,index) => {
            return {
                id: index,
                session_id: item.id,
                date:  item.date,
                order: `${item.purchase.item.length} Mole Check`,
            }
        })
        const fake_datas = [
            {
                id: 2,
                session_id: "session_321312423",
                date: "2021-12-12",
                order: "2 Mole Check",
            },
            {
                id: 3,
                session_id: "session_321312423",
                date: "2021-12-12",
                order: "2 Mole Check",
            },
            {
                id: 4,
                session_id: "session_321312423",
                date: "2021-12-12",
                order: "2 Mole Check",
            },
            {
                id: 5,
                session_id: "session_321312423",
                date: "2021-12-12",
                order: "2 Mole Check",
            },
            {
                id: 6,
                session_id: "session_321312423",
                date: "2021-12-12",
                order: "2 Mole Check",
            },
            {
                id: 7,
                session_id: "session_321312423",
                date: "2021-12-12",
                order: "2 Mole Check",
            },
            {
                id: 8,
                session_id: "session_321312423",
                date: "2021-12-12",
                order: "2 Mole Check",
            },
            {
                id: 9,
                session_id: "session_321312423",
                date: "2021-12-12",
                order: "2 Mole Check",
            },
            {
                id: 10,
                session_id: "session_321312423",
                date: "2021-12-12",
                order: "2 Mole Check",
            },
            {
                id: 11,
                session_id: "session_321312423",
                date: "2021-12-12",
                order: "2 Mole Check",
            },
        ]
        setRows([...data_preprocess,...fake_datas])

    }

    React.useEffect(() => {
        fetchCurrentRequests()
    },[currentuser])



    return (
        <div style={{width:"100%",height:"100vh",display:"flex",flexDirection:"column"}}>
            <EnhancedTable 
                rows={rows}
            />
        </div>
    )
}

export default RequestPage








