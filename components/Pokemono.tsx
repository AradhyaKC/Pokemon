'use client';

import Image from "next/image";
import {ImCross} from 'react-icons/im';
import pikachu  from "../public/pikachu.jpg";
import { MouseEvent, useEffect, useState } from "react";
import { trpc } from "@/utils/trpc";
import { useQueryClient, useMutation, useQuery } from "react-query";

export default function Pokemono(props:any){
    
    // var newImage ={height:1477,width:1377,src:"data:image/png;base64,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"}
    // const [displayImg,setDisplayImg] = useState(pikachu);
    
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

    if(status=='loading') return <div>loading</div>;

    

    return (data!=undefined &&
    <span style={{display:'inline-block',position:'relative'}} className='m-1 bg-white rounded-lg drop-shadow-2xl p-1 flex flex-col'>
        <div onClick={()=>{deleteResult.mutate();}} className="cursor-pointer absolute top-0.5 right-0.5 w-4 h-4 sm:w-7 sm:h-7 bg-red-500 flex justify-center items-center">
            <ImCross style={{width:'90%',height:'90%'}}/>
        </div>
        <Image src={{src:data.pokemonImg,width:1377,height:1477}} alt='pikachu' className="w-12 h-12 sm:w-24 sm:h-24"/>
        <div className="text-black font-thin text-sm sm:text-lg">{data.name}</div>
    </span>
    )
}