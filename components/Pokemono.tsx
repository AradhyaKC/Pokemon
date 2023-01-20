'use client';

import Image from "next/image";
import {ImCross} from 'react-icons/im';
import pikachu  from "../public/pikachu.jpg";
import { MouseEvent, useEffect, useState } from "react";
import { trpc } from "@/utils/trpc";
import { useQueryClient, useMutation, useQuery } from "react-query";

export default function Pokemono(props:any){
    
    console.assert(props._id!=undefined);
    const queryClient = useQueryClient();
    const getPokemon=async()=>{
        var pokemon = await trpc.getPokemon.query({_id:props._id});
        pokemon=pokemon.pokemon;
        return pokemon;
    }

    const {status,error,data}=useQuery({
        queryKey:['pokemon',props._id],
        queryFn:getPokemon,
    });

    const onDelete=async()=>{
        var response = await trpc.deletePokemon.mutate({_id:props._id});
        return {_id:props._id};    
    }

    const deleteResult=useMutation({
        mutationFn:onDelete,
        onSuccess:(idObj)=>{
            queryClient.removeQueries(['pokemon',idObj._id],{exact:true});
            queryClient.invalidateQueries('pokemons');
        }
    })


    

    return (
    <span style={{display:'inline-block',position:'relative'}} className='m-1 bg-white rounded-lg drop-shadow-2xl p-1 flex flex-col'>
        {data!=undefined && <div onClick={()=>{deleteResult.mutate();}} className="cursor-pointer absolute top-0.5 right-0.5 w-4 h-4 sm:w-7 sm:h-7 bg-red-500 flex justify-center items-center">
            <ImCross style={{width:'90%',height:'90%'}}/>
        </div>}
        {data!=undefined && <Image src={{src:data.pokemonImg,width:1377,height:1477}} alt='pikachu' className="m-1 w-12 h-12 sm:w-24 sm:h-24"/>}
        {data!=undefined && <div className="text-black font-thin text-sm sm:text-lg">{data.name}</div>}
        { status=='loading' && <div className="animate-pulse bg-slate-400 w-12 h-12 sm:w-24 sm:h-24 rounded-full m-1"></div>}
        {status=='loading' && <div className="animate-pulse bg-slate-400 w-full h-6"> </div>}
    </span>
    )
}