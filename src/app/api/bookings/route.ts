import { NextResponse } from "next/server";
import  Booking  from "@/models/Booking";
import {ConnectDB} from "@/lib/db";
export async function POST(req:Request){
    try{
        await ConnectDB();
        const body = await req.json();
        const booking = await Booking.create(body);
        return NextResponse.json({
            success:true,
            booking,
        })

    }catch(err){
        return NextResponse.json({
            success:false,
        },{status:500})
    }
} 