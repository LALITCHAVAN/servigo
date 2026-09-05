import Notification from "../models/Notification.js";
export const getNotifications = async (req,res,next)=>{try{res.json({success:true,notifications:await Notification.find({user:req.user._id}).sort({createdAt:-1}).lean()});}catch(e){next(e);}};
export const markRead = async (req,res,next)=>{try{const n=await Notification.findOneAndUpdate({_id:req.params.id,user:req.user._id},{read:true},{new:true});if(!n)return res.status(404).json({success:false,message:"Notification not found"});res.json({success:true,notification:n});}catch(e){next(e);}};
