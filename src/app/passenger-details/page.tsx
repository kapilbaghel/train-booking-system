import { Suspense } from "react";
import PassengerDetails from "./PassengerDetails";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PassengerDetails />
    </Suspense>
  );
}