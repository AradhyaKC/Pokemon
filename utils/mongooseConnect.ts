import mongoose, { ConnectOptions, MongooseOptions } from 'mongoose';

var mongooseConnectionString:any = process.env.MONGOOSE_CONNECTION_STRING;
// const options:ConnectOptions = {useNewUrlParser:true, useUnifiedTopology:true};

// mongoose.set(MongooseOptions.useUnifiedTopology, true);
//@ts-ignore
mongoose.connect(mongooseConnectionString);

mongoose.set('strictQuery', true);
const db = mongoose.connection;
db.on('error',()=>{
  console.error('mongodb connection error');
});
db.on('open',()=>{
  console.log('mongoose connections successful');
})