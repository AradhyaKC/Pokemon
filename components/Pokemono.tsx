'use client';

import Image from "next/image";
import {ImCross} from 'react-icons/im';
import pikachu  from "../public/pikachu.png";
import { MouseEvent } from "react";


export default function Pokemono(){
    const onDelete=(e:MouseEvent)=>{
        
    }

    return (
    <span style={{display:'inline-block',position:'relative'}} className='m-1 bg-white rounded-lg drop-shadow-2xl p-1 flex flex-col'>
        <div onClick={onDelete} className="cursor-pointer absolute top-0.5 right-0.5 w-4 h-4 sm:w-7 sm:h-7 bg-red-500 flex justify-center items-center">
            <ImCross style={{width:'90%',height:'90%'}}/>
        </div>
        <Image  src={pikachu} alt='pikachu' className="w-12 h-12 sm:w-24 sm:h-24"/>
        <div className="text-black font-thin text-sm sm:text-lg">Pikachu</div>
    </span>
    )
}