'use client';

import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import pikachu  from "../public/pikachu.jpg";
import { trpc } from "@/utils/trpc";
import { useMutation, useQueryClient } from "react-query";

export default function ModalComponent(props:any){
    const [show,setShow]=useState(()=>{ return false;});
    const [displayImageUrl, setDisplayImageUrl] = useState(pikachu.src);
    const queryClient = useQueryClient();
    
    const createPokemon=async()=>{
        var formData = new FormData(document.getElementById('pokemon-form') as HTMLFormElement);
        var pokemon = await trpc.createPokemon.mutate({name:formData.get('name')as string,pokemonImg:displayImageUrl});
        // console.log(pokemon);
        //@ts-ignore
        return pokemon.pokemon;
    }


    const {status ,error, mutate} = useMutation({
        mutationFn:createPokemon,
        onSuccess:newPokemon=>{
            queryClient.setQueryData(['pokemon',newPokemon._id],newPokemon);
            queryClient.invalidateQueries('pokemons');
            setShow(false);
        }
    });


    const onChangeProfilePic =(e:any)=>{
        e.preventDefault();
        console.log('workd');
        var reader =new FileReader();
        reader.addEventListener('load',()=>{
            const uploaded_image:string = reader.result as string;
            setDisplayImageUrl(uploaded_image);
        });
        const files = e.target.files as FileList;
        reader.readAsDataURL(files[0]);
    }


    const toggleShow=(e:MouseEvent)=>{
        // e.preventDefault();
        e.stopPropagation();
        setShow(!show);
    }
    const onPokemonSubmit=async(e:MouseEvent)=>{
        await mutate();
        // e.target.value='';
    }

    
    return (
    <div>
        <div className=" cursor-pointer bg-transparent border border-white hover:bg-white text-white hover:text-blue-700
            w-fit self-center mt-2 text-lg sm:text-2xl p-2 rounded-md" onClick={toggleShow}>
                {props.label}
        </div>
        <div className={`flex justify-center fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full ${!show?'hidden':''}`}
        id="my-modal" onClick={toggleShow}>
            <div onClick={e=>{e.stopPropagation()}} className={`flex flex-col items-center transition-transform duration-300 delay-100 self-center p-4 rounded-xl bg-white ${!show?'scale-0':'scale-100'}`}>
                
                <form id="pokemon-form" encType="multipart/form-data">
                    <div className="text-2xl sm:text-4xl text-black font-thin mb-4 "> Enter Pokemon Details </div>
                    <div className="flex items-center justify-center">
                        <img className="w-40 h-40 " src ={displayImageUrl} alt='pokemon image'/>
                    </div>
                    <TextField className="w-full mt-4" variant="outlined" id="name" label='Name' name="name"/>
                    <TextField onChange={onChangeProfilePic} type='file' className="w-full mt-4" variant="outlined" id="pokemonImg" name="pokemonImg"/>
                    {/* <input className="w-full mt-2 p-2 bg-transparent border border-blue-700 hover:bg-blue-700 text-blue-700 hover:text-white " 
                    type='file' accept='image/png'/> */}
                </form>

                <div className="bg-transparent border border-blue-700 hover:bg-blue-700 text-blue-700 hover:text-white
                w-fit self-center mt-4 text-lg sm:text-2xl p-1 rounded-md" onClick={onPokemonSubmit}>
                    {status=='loading' && <>Submitting</>}
                    {status!="loading" && <>Submit</>}
                </div>
            </div>
        </div>
    </div>)
}
