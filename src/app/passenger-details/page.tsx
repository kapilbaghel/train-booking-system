import { Suspense } from "react"
import PassengerDetailsContent from "./PassengerDetailsContent"
export default function Page(){
  return(
<Suspense fallback={<div>Loading...</div>}>
  <PassengerDetailsContent/>
</Suspense>
  )
}