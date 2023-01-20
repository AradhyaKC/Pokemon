import { initTRPC } from '@trpc/server';
import {z} from 'zod';
import * as trpcNext from '@trpc/server/adapters/next';    
import Pokemon from  '../../../models/pokemon';
import '../../../utils/mongooseConnect';
import { Input } from '@material-ui/core';

// import multer from 'multer';
// import { GridFsStorage } from 'multer-gridfs-storage';
// import path from 'path';
const crypto =require('crypto');
 
const t = initTRPC.create();
 
const router = t.router;

 
// const storage = new GridFsStorage({
//     url: process.env.MONGOOSE_CONNECTION_STRING as string,
//     file: (req, file) => {
//         return new Promise((resolve, reject) => {
//             crypto.randomBytes(16, (err:any, buf:any) => {
//                 if (err) {
//                     return reject(err);
//                 }
//                 const filename = buf.toString('hex') + path.extname(file.originalname);
//                 const fileInfo = {
//                     filename: filename,
//                     bucketName: 'pokemonUploads'
//                 };
//                 resolve(fileInfo);
//             });
//         });
//     }
//   });
  
//   const upload = multer({ storage }).single('pokemonImg');

export const appRouter = router({
    createPokemon:t.procedure
    .input(z.object({name:z.string(),pokemonImg:z.string()}))
    .mutation(async(req)=>{
        try{
            var pokemon = new Pokemon({name:req.input.name,pokemonImg:req.input.pokemonImg});
            console.log(req);
            let temp =await pokemon.save();
            return {pokemon};
        }catch(err){
            console.log(err);
            return {error:err};
        }
    }),
    getPokemon:t.procedure
    .input(z.object({_id:z.string()}))
    .query(async(req)=>{
        try{
            var pokemon=undefined;
            pokemon = await Pokemon.find({_id:req.input._id});
            // console.log(pokemon);
            if(pokemon.length!=0) return {pokemon:pokemon[0]};
            else{
                throw 'could not find pokemon with this _id';
                // return {};
            }
        }catch(err){
            console.log(err);
            return {error:err};
        }
    }),
    getAllPokemon:t.procedure
    .query(async(req)=>{
        try{
            var AllPokemon=await Pokemon.find({},).limit(10);
            return AllPokemon;
        }catch(err){
            console.log(err);
            return {error:err};
        }
    }),
    getAllPokemonId:t.procedure
    .query(async(req)=>{
        try{
            var AllPokemon=await Pokemon.find({},{pokemonImg:0,name:0}).limit(10);
            return AllPokemon;
        }catch(err){
            console.log(err);
            return {error:err};
        }
    }),
    deletePokemon:t.procedure
    .input(z.object({_id:z.string()}))
    .mutation(async(req)=>{
        try{
            await Pokemon.deleteOne({_id:req.input._id});
            return {};
        }catch(err){
            console.log(err);
            return {error:err};
        }
    })
});
 
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
    router:appRouter,
    createContext:()=>({}),
});