import mongoose from "mongoose";

const pokemon = new mongoose.Schema({
    name:{type:String, required:true}
});