import { Suspense } from "react";
import VerifyOtpContent from "./VerifyOtpContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpContent />
    </Suspense>
  );
}