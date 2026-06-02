import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  const searchParams = req.nextUrl.searchParams; // searchParams ka kaam h ,url m jo query data aa raha h usko nikalna, ye url k query parameters ko access krta h."?query=del"

  const query = searchParams.get("query"); // yaha query naam ka parameters nikal rhe ho query="del"

  //external API yaha call ki h maine paytm wali
  const res = await fetch(`https://travel.paytm.com/api/trains/v3/station/${query}?isH5=true&client=web&deviceIdentifier=Mozilla%20Firefox-148.0.0.0`)
  
  const result = await res.json()
  console.log("your result is:",result)

  const stations = result.body[0].stations; //result.body:body ek array h,result.body[0]:array ka pehla item,result.body[0].stations:ab us object k ander se station nikal rhe ho,stations array nikal rhe ho...
  console.log("your station is",stations[0]) // array ka pehla station print hoga.

  return NextResponse.json(stations);

}