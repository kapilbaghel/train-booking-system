import { Suspense } from "react"
import SeatsAvailabilityContent from "./SeatsAvailabilityContent"
export default function Page(){
  return(
<Suspense fallback={<div>Loading...</div>}>
  <SeatsAvailabilityContent/>
</Suspense>
  )
}