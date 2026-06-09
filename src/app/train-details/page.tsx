import { Suspense } from "react";
import TrainDetailsContent from "./TrainDetailsContent";
export default function Page(){
    return(
        <Suspense fallback={<div>Loading...</div>}>
            <TrainDetailsContent />
        </Suspense>
    );
}