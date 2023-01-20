import mongoose from "mongoose";

const pokemonSchema = new mongoose.Schema({
    name:{type:String, required:true}
});

// @ts-ignore
mongoose.models = {};

export default mongoose.model('Pokemon',pokemonSchema);;