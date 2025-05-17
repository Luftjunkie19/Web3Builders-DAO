import { Request, Response } from "express";
import { supabaseConfig } from "../config/supabase";

export const getMembers = async (req:Request, res:Response) => {
try{
const {data} = await supabaseConfig.from('dao_members').select('*').order('created_at', { ascending: true });

if(!data){
    res.status(404).json({message:"error", data:null, error:"Members not found", status:404 });
}else{
    res.status(200).json({message:"success", data, error:null, status:200 });
}
}catch(err){
res.status(500).json({message:"error", data:null, error:err, status:500 });
}
};