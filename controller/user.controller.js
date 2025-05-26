//import url from 'url';
import jwt from 'jsonwebtoken';
import rs from 'randomstring';
import '../models/connection.js';
import UserSchemaModel from '../models/user.model.js';
import sendMailAPI from './email.controller.js';

export var save=async(req,res,next)=>{
 var userList=await UserSchemaModel.find();
 var l=userList.length;
 var _id=l==0?1:userList[l-1]._id+1;
 var userDetails={...req.body,"_id":_id,"status":0,"role":"user","info":Date()};
 try{
  await UserSchemaModel.create(userDetails);
  sendMailAPI(req.body.email,req.body.password);
  res.status(201).json({"response":true});
 }
 catch(e){
  //console.log(e.errors._id.properties.message);
  //console.log(e.errors.email.properties.message);  
  res.status(500).json({"response":false,"error":e});   
 }
};

export var fetch=async(req,res,next)=>{
 var condition_obj = req.query.condition_obj;
 var userDetails=await UserSchemaModel.find(condition_obj);    
 if(userDetails.length!=0)
  res.status(200).json({"response":true,"response_content":userDetails});
 else
  res.status(404).json({"response":false});
};

export var deleteUser=async(req,res,next)=>{
  var condition_obj=req.body.condition_obj;
  var userDetails=await UserSchemaModel.find(condition_obj);    
  if(userDetails.length!=0)
  {
   let user=await UserSchemaModel.deleteMany(condition_obj); 
   if(user)
    res.status(200).json({"response":true});
   else
    res.status(500).json({"response":false});
  }
  else
   res.status(404).json({"response":false});
 };

 export var update=async(req,res)=>{
  let userDetails = await UserSchemaModel.findOne(req.body.condition_obj);
  if(userDetails){
      let user=await UserSchemaModel.updateMany(req.body.condition_obj,{$set: req.body.content_obj});   
      if(user)
        res.status(200).json({"response":true});
      else
        res.status(500).json({"response":false});
  }
  else
    res.status(404).json({"response":false});       
}; 


export var login=async(req,res,next)=>{
 var userDetails={...req.body,"status":1};
 var user=await UserSchemaModel.findOne(userDetails);
 if(user)
 {
  var payload={"subject":user.email};
  var key=rs.generate();
  var token=jwt.sign(payload,key);     
  res.status(200).json({"response":true,"token":token,"user":user}); 
 }
 else
  res.status(404).json({"response":false,"token":"error"});
};

