'use client';

import ModalComponent from "@/components/ModalComponent";
import Pokemono from "@/components/Pokemono";
import { trpc } from "@/utils/trpc";
import {useEffect} from 'react';
import { useQuery, UseQueryResult } from "react-query";
import {AiOutlineLoading} from 'react-icons/ai';

export default function Pokemon(props:any){   
    
    const getAllPokemonId=async()=>{
        var response =await trpc.getAllPokemonId.query();
        // console.log(response);
        //@ts-ignore
        return response;
    }
    const {status,error,data}:UseQueryResult = useQuery({
        queryKey:'pokemons',
        queryFn:getAllPokemonId,
    });

    // if(status!='loading') console.log(data);
    return (
    <div className="min-h-[100vh] flex flex-col bg-gradient-to-br from-cyan-500 to-blue-800 items-center justify-center p-4">
        {/* Pokemon container  */}
        <div className="text-center bg-slate-200 text-white p-4 border border-white rounded-lg drop-shadow-2xl w-[95%] 
        sm:w-[80%] min-w-[260px] flex flex-col items-center">
            <div className="text-blue-700 text-2xl sm:text-4xl font-thin">
                Existing Pokemon
            </div>
            <div className="bg-transparent mt-4"> 
                {/* @ts-ignore */}
                {status=='success' && data.map((element,index)=>{
                    return <Pokemono key={index} _id={element._id} />
                })}
                {status=='loading' && <div> <AiOutlineLoading className="w-8 h-8 animate-spin text-blue-700"/></div>}
                {/* <Pokemono _id='63ca2b136968e641309e00a2'/> */}
                {/* <Pokemono/>
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
                <Pokemono/> */}
            </div>
        </div>
            <ModalComponent label='Add Pokemon'/>
    </div>);
}
