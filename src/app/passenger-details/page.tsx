"use client";
import {useState,useEffect} from "react";
import { useSearchParams,useRouter } from "next/navigation";



export default function PassengerDetails() {
  const searchParams = useSearchParams();
  const router = useRouter();
    const [trainData,setTrainData]=useState<any>(null);
    const [passengers,setPassengers]=useState([{
        name:"",
        age:"",
        gender:"",
        berthPreference:"",
    },
])

const [contact, setContact] = useState({
  mobile: "",
  email: "",
});
//add passenger function...
const addPassenger = () => {
  if (passengers.length >= 6) {
    alert("You can add a maximum of 6 passengers.");
    return;
  }

  setPassengers([
    ...passengers,
    {
      name: "",
      age: "",
      gender: "",
      berthPreference: "",
    },
  ]);
};

//remove passenger function
const removePassenger = (indexToRemove: number) => {
  // Minimum 1 passenger rehna chahiye
  if (passengers.length === 1) {
    return;
  }

  const updatedPassengers = passengers.filter(
    (_, index) => index !== indexToRemove
  );

  setPassengers(updatedPassengers);
};

//handle passenger change function
const handlePassengerChange = (
  index: number,
  field: string,
  value: string
) => {
  const updatedPassengers = [...passengers];

  updatedPassengers[index] = {
    ...updatedPassengers[index],
    [field]: value,
  };

  setPassengers(updatedPassengers);
};

useEffect(()=>{
    const saved = localStorage.getItem("selectedTrainData")

    if(saved){
        try{
            const parsedData = JSON.parse(saved);
            setTrainData(parsedData);
        }catch(err){
            console.error("Error parsing train data:",err);
        }
    }
},[])



 const trainNumber = searchParams.get("trainNumber");
  const classType = searchParams.get("classType");
  const date = searchParams.get("date");
  const quota = searchParams.get("quota");

  console.log({trainNumber,classType,date,quota});

  const handleContinue=()=>{

    for (const passenger of passengers) {
  if (
    !passenger.name ||
    !passenger.age ||
    !passenger.gender
  ) {
    alert("Please fill all passenger details.");
    return;
  }
}
//for passenger age validation
for (const passenger of passengers) {
  const age = Number(passenger.age);

  if (age < 1 || age > 120) {
    alert("Please enter valid age.");
    return;
  }
}
//for passenger contact validation
if (!/^\d{10}$/.test(contact.mobile)) {
  alert("Please enter valid mobile number.");
  return;
}

//final booking object

const bookingData = {
  journey: {
    trainNumber,
    classType,
    date,
    quota,
  },

  train: trainData,

  passengers,

  contact,

  bookingDate: new Date().toISOString(),
};
//set to local storage...
localStorage.setItem(
  "bookingData",
  JSON.stringify(bookingData)
);

//routing...
router.push("review-booking")
  }

 const handleBack = () => {
  router.push(
    `/seats-availability-details?trainNumber=${trainNumber}&classType=${classType}&date=${date}&quota=${quota}`
  );
};

return (
  <div className="min-h-screen bg-black text-white p-4">
    <div className="max-w-4xl mx-auto">

      {/* Heading */}
      <h1 className="text-3xl font-bold text-orange-500 mb-6">
        Passenger Details
      </h1>

      {/* Journey Details */}
      <div className="bg-zinc-900 border border-orange-500 rounded-2xl p-5 mb-6">
        <h2 className="text-xl font-semibold text-orange-400 mb-4">
          Journey Details
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Train No.</p>
            <p>{trainNumber}</p>
          </div>

          <div>
            <p className="text-gray-400">Class</p>
            <p>{classType}</p>
          </div>

          <div>
            <p className="text-gray-400">Date</p>
            <p>{date}</p>
          </div>

          <div>
            <p className="text-gray-400">Quota</p>
            <p>{quota}</p>
          </div>
        </div>
      </div>

      {/* Train Details */}
      {trainData && (
        <div className="bg-zinc-900 border border-orange-500 rounded-2xl p-5 mb-6">
          <h2 className="text-xl font-semibold text-orange-400 mb-4">
            Selected Train
          </h2>

          <div className="space-y-2">
            <p>
              <span className="text-gray-400">Train Name:</span>{" "}
              {trainData.trainName}
            </p>

            <p>
              <span className="text-gray-400">Train Number:</span>{" "}
              {trainData.trainNumber}
            </p>
          </div>
        </div>
      )}

      {/* Passenger Form */}
      <div className="bg-zinc-900 border border-orange-500 rounded-2xl p-5">
        <h2 className="text-xl font-semibold text-orange-400 mb-5">
          Passenger Information
        </h2>

       {passengers.map((passenger, index) => (
  <div
    key={index}
    className="border border-orange-500 rounded-2xl p-5 mb-5"
  >
    <div className="flex justify-between items-center mb-4">
  <h3 className="text-lg font-semibold text-orange-400">
    Passenger {index + 1}
  </h3>

  {index > 0 && (
    <button
      type="button"
      onClick={() => removePassenger(index)}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
    >
      Remove
    </button>
  )}
</div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

      {/* Name */}
     <input
  type="text"
  placeholder="Full Name"
  value={passenger.name}
  onChange={(e) =>
    handlePassengerChange(index, "name", e.target.value)
  }
  className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3"
/>
      {/* Age */}
     <input
  type="number"
  placeholder="Age"
  value={passenger.age}
  onChange={(e) =>
    handlePassengerChange(index, "age", e.target.value)
  }
  className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3"
/>

      {/* Gender */}
      <select
  value={passenger.gender}
  onChange={(e) =>
    handlePassengerChange(index, "gender", e.target.value)
  }
  className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3"
>
  <option value="">Select Gender</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Other">Other</option>
</select>

      {/* Birth Preference */}
      <select
  value={passenger.berthPreference}
  onChange={(e) =>
    handlePassengerChange(index, "berthPreference", e.target.value)
  }
  className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3"
>
  <option value="">No Preference</option>
  <option value="LB">Lower Berth</option>
  <option value="MB">Middle Berth</option>
  <option value="UB">Upper Berth</option>
  <option value="SL">Side Lower</option>
  <option value="SU">Side Upper</option>
</select>

    </div>
  </div>
))}

{/* 👇 YAHAN Add Passenger Button lagana hai */}
  <button
    type="button"
    onClick={addPassenger}
    className="bg-orange-500 hover:bg-orange-600 text-black font-semibold px-5 py-3 rounded-xl mb-5"
  >
    + Add Passenger
  </button>

        {/* Contact Details */}
        <div className="grid md:grid-cols-2 gap-4 mt-5">

          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Mobile Number
            </label>

        <input
  type="tel"
  placeholder="Enter Mobile Number"
  value={contact.mobile}
  onChange={(e) =>
    setContact({
      ...contact,
      mobile: e.target.value,
    })
  }
  className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500"
/>
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Email
            </label>

           <input
  type="email"
  placeholder="Enter Email"
  value={contact.email}
  onChange={(e) =>
    setContact({
      ...contact,
      email: e.target.value,
    })
  }
  className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500"
/>
          </div>

        </div>

        {/* Continue Button */}
      <div className="flex justify-between items-center mt-8">
  <button
    type="button"
    onClick={handleBack}
    className="bg-gray-700 hover:bg-gray-600 transition px-8 py-3 rounded-xl font-semibold text-white"
  >
    ← Back
  </button>

  <button
    type="button"
    onClick={handleContinue}
    className="bg-orange-500 hover:bg-orange-600 transition px-8 py-3 rounded-xl font-semibold text-black"
  >
    Continue to Review →
  </button>
</div>
      </div>

    </div>
  </div>
);
}