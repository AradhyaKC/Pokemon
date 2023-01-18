'use client';

import ModalComponent from "@/components/ModalComponent";
import Pokemono from "@/components/Pokemono";
import {useEffect} from 'react';
import { useQuery } from "react-query";

export default function Pokemon(props:any){   
    
    const fetchFunc =async()=>{
        var response = await fetch('http://localhost:3000/api/trpc/greeting',{
            method:'GET',mode:'cors'
        });
        response = await response.json();
        console.log(response);
    }

    var {data,status} = useQuery('hello',fetchFunc);
    console.log(data);
    return (
    <div className="min-h-[100vh] flex flex-col bg-gradient-to-br from-cyan-500 to-blue-800 items-center justify-center p-4">
        {/* Pokemon container  */}
        <div className="text-center bg-slate-200 text-white p-4 border border-white rounded-lg drop-shadow-2xl w-[95%] 
        sm:w-[80%] min-w-[260px] flex flex-col items-center">
            <div className="text-blue-700 text-2xl sm:text-4xl font-thin">
                Existing Pokemon
            </div>
            <div className="bg-transparent mt-4"> 
                <Pokemono/>
                <Pokemono/>
                <Pokemono/>
                <Pokemono/>
                <Pokemono/>
                <Pokemono/>
                <Pokemono/>
                <Pokemono/>
                <Pokemono/>
                <Pokemono/>
                <Pokemono/>
                <Pokemono/>
                <Pokemono/>
                <Pokemono/>
                <Pokemono/>
                <Pokemono/>
                <Pokemono/>
                <Pokemono/>
                <Pokemono/>
            </div>
            <ModalComponent label='Add Pokemon'/>
        </div>
    </div>);
}
