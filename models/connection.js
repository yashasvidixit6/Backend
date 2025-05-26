import mongoose from 'mongoose';
const url="mongodb+srv://yashasvidixit6:NeW11a14vvHPvCP9@cluster1.wtzoxk8.mongodb.net/tenderdb?retryWrites=true&w=majority&appName=Cluster1";
mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopolgy:true,
    serverSelectionTimeoutMS:5000
});

console.log("Successfully connected to mongodb database...");
