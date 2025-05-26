import '../models/connection.js';
import url from 'url';
import path from 'path';
import rs from 'randomstring';

//import CategorySchemaModel from '../models/category.model.js';

import SubCategorySchemaModel from '../models/subcategory.model.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export var save=async(req,res,next)=>{
 var scList=await SubCategorySchemaModel.find();
 var l=scList.length;
 var _id=l==0?1:scList[l-1]._id+1;
 var catnm=req.body.catnm;
 var subcatnm=req.body.subcatnm;
 var subcaticon=req.files.caticon;
 var subcaticonnm=Date.now()+"-"+rs.generate()+"-"+subcaticon.name;
 var upload_path=path.join(__dirname,"../../UI/public/assets/uploads/subcaticons",subcaticonnm); 
 var scDetails={"_id":_id,"catnm":catnm,"subcatnm":subcatnm,"subcaticonnm":subcaticonnm};
 try{
  await SubCategorySchemaModel.create(scDetails);
  subcaticon.mv(upload_path);
  res.status(201).json({"response":true});
 }
 catch(e){
  res.status(500).json({"response":false,"error":e});   
 }
};


export var fetch=async(req,res)=>{
    var condition_obj=url.parse(req.url,true).query;    
    var scList=await SubCategorySchemaModel.find(condition_obj);
    if(scList.length!=0)
     res.status(200).json(scList);
    else
     res.status(404).json({"status":"Resource not found"});
   };


   
     /*
   export var update=async(req,res)=>{
       let scDetails = await SubCategorySchemaModel.findOne(req.body.condition_obj);
       if(scDetails){
           let user=await SubCategorySchemaModel.updateOne(req.body.condition_obj,{$set:req.body.content_obj});   
           if(user)
             res.status(200).json({"status":"success"});
           else
             res.status(500).json({"status": "Server Error"});
       }
       else
         res.status(404).json({"status":"Requested resource not available"});       
   };
   
   export var deleteSubCategory=async(req,res)=>{
       let scDetails = await SubCategorySchemaModel.findOne(req.body.condition_obj);
       if(scDetails){
           let sc=await SubCategorySchemaModel.deleteOne(req.body.condition_obj);   
           if(sc)
             res.status(200).json({"status":"success"});
           else
             res.status(500).json({"status": "Server Error"});
       }
       else
         res.status(404).json({"status":"Requested resource not available"});     
   };   */