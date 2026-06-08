import { Suspense } from "react";
import TrainsContent from "./TrainsContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading trains...</div>}>
      <TrainsContent />
    </Suspense>
  );
}
