import url from 'url';
import path from 'path';
import rs from 'randomstring';

import '../models/connection.js';
import CategorySchemaModel from '../models/category.model.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export var save=async(req,res,next)=>{
 var cList=await CategorySchemaModel.find();
 var l=cList.length;
 var _id=l==0?1:cList[l-1]._id+1;
 var catnm=req.body.catnm;
 var caticon=req.files.caticon;
 var caticonnm=Date.now()+"-"+rs.generate()+"-"+caticon.name;
 var upload_path=path.join(__dirname,"../../UI/public/assets/uploads/caticons",caticonnm); 
 var cDetails={"_id":_id,"catnm":catnm,"caticonnm":caticonnm};
 try{
  await CategorySchemaModel.create(cDetails);
  caticon.mv(upload_path);
  res.status(201).json({"response":true});
 }
 catch(e){
  res.status(500).json({"response":false,"error":e});   
 }
};

export var fetch=async(req,res,next)=>{
 var condition_obj = req.query.condition_obj;
 var cDetails=await CategorySchemaModel.find(condition_obj);    
 if(cDetails.length!=0)
  res.status(200).json({"response":true,"response_content":cDetails});
 else
  res.status(404).json({"response":false});   
};

export var deleteUser=async(req,res,next)=>{
  var condition_obj=req.body.condition_obj;
  if(condition_obj!=undefined)
    condition_obj=JSON.parse(req.body.condition_obj);   
  
  var cDetails=await CategorySchemaModel.find(condition_obj);    
  if(cDetails.length!=0)
  {
   let c=await CategorySchemaModel.deleteMany(condition_obj); 
   if(c)
    res.status(200).json({"response":true});
   else
    res.status(500).json({"response":false});
  }
  else
   res.status(404).json({"response":false});
 };

export var update=async(req,res)=>{
  let cDetails = await CategorySchemaModel.findOne(JSON.parse(req.body.condition_obj));
  if(cDetails){
      let c=await CategorySchemaModel.updateMany(JSON.parse(req.body.condition_obj),{$set: JSON.parse(req.body.content_obj)});   
      if(c)
        res.status(200).json({"response":true});
      else
        res.status(500).json({"response":false});
  }
  else
    res.status(404).json({"response":false});       
}; 

