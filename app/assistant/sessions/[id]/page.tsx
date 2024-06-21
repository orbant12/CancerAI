"use client"
import { BackIcon } from '../page';
import {useParams,useRouter} from 'next/navigation'

export default function SessionPage(){
    const router = useRouter();
    const { id } = useParams()

    return(
        <div style={{width:"100%",height:"100%",flexDirection:"column",padding:0}}>
            <BackIcon handleBack={() => router.back()} />
        <h2>{id}</h2>
        </div>
    )
}

