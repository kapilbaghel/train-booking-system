"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {ArrowLeft} from "lucide-react";
import { useRouter } from "next/navigation";

export default function PassengerDetailsPage() {
    const router = useRouter();
  const searchParams = useSearchParams();
    const trainNumber = searchParams.get("trainNumber");
    const trainName = searchParams.get("trainName");
    const source = searchParams.get("source");
    const destination = searchParams.get("destination");
    const classType = searchParams.get("classType");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [berthPreference, setBerthPreference] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          trainNumber,
          trainName,
          source,
          destination,
          classType,

          name,
          age: Number(age),
          gender,
          phone: Number(phone),
          email,
          berthPreference,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Passenger Details Saved Successfully");

        setName("");
        setAge("");
        setGender("");
        setPhone("");
        setEmail("");
        setBerthPreference("");
      } else {
        alert("Failed to save details");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="relative min-h-screen bg-black text-white flex items-center justify-center p-4 sm:p-6">

  {/* Back Button */}
  <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 px-3 py-2 sm:px-4 rounded-xl bg-zinc-900 border border-orange-500/30 text-orange-500 hover:bg-orange-500 hover:text-black transition"
    >
      <ArrowLeft size={18} />
      <span>Back</span>
    </button>
  </div>

  {/* Main Card */}
  <div className="w-full max-w-2xl bg-zinc-900 border border-orange-500/20 rounded-2xl p-5 sm:p-8 shadow-xl mt-16 sm:mt-0">
        <h1 className="text-3xl font-bold text-center mb-8">
          Passenger Details
        </h1>

<div className="mb-6 bg-zinc-800 border border-orange-500/20 rounded-xl p-5">
  <h2 className="text-xl font-bold text-orange-500">
    {trainName}
  </h2>

  <p className="text-zinc-400 mt-1">
    Train No: {trainNumber}
  </p>

  <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
  <div>
    <p className="text-zinc-500 text-sm">From</p>
    <p>{source}</p>
  </div>

  <div>
    <p className="text-zinc-500 text-sm">To</p>
    <p>{destination}</p>
  </div>

  <div>
    <p className="text-zinc-500 text-sm">Class</p>
    <p>{classType}</p>
  </div>
</div>
</div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="block mb-2 text-sm text-zinc-300">
              Passenger Name
            </label>

            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-zinc-300">
              Age
            </label>

            <input
              type="number"
              required
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-zinc-300">
              Gender
            </label>

            <select
              required
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 focus:outline-none focus:border-orange-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm text-zinc-300">
              Phone Number
            </label>

            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-zinc-300">
              Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-zinc-300">
              Berth Preference
            </label>

            <select
              value={berthPreference}
              onChange={(e) =>
                setBerthPreference(e.target.value)
              }
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 focus:outline-none focus:border-orange-500"
            >
              <option value="">No Preference</option>
              <option value="LB">Lower Berth</option>
              <option value="MB">Middle Berth</option>
              <option value="UB">Upper Berth</option>
              <option value="SL">Side Lower</option>
              <option value="SU">Side Upper</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 transition py-3 rounded-xl font-semibold"
          >
            {loading ? "Saving..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}