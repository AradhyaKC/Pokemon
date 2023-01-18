import mongoose, { ConnectOptions } from 'mongoose';

var mongooseConnectionString:any = process.env.MONGOOSE_CONNECTION_STRING;
// const options:ConnectOptions = {useNewUrlParser:true, useUnifiedTopology:true};
mongoose.connect(mongooseConnectionString,);

console.log('mongoose connect called');
mongoose.set('strictQuery', true)
const db = mongoose.connection;
db.on('error',()=>{
  console.error('mongodb connection error');
});