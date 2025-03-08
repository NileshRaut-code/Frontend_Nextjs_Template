"use client";

import { useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [clicked, setClicked] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setClicked(true);

    if (!name || !email || !username || !password) {
    //  //toast.error("All fields are required.");
      setClicked(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/user/signup",
        { name, email, username, password },
        { withCredentials: true }
      );

      //toast.success("Signup successful! Redirecting...");
      setTimeout(() => router.push("/verify"), 1000);
    } catch (err) {
      //toast.error(err.response?.data?.message || "Signup failed. Try again.");
      setClicked(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen mt-10">
      <h1 className="text-2xl font-bold mb-4">Signup</h1>
      <form
        className="border border-black/5 dark:border-white/10 p-6 rounded shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow border rounded w-full py-2 px-3 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow border rounded w-full py-2 px-3 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow border rounded w-full py-2 px-3 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow border rounded w-full py-2 px-3 focus:outline-none"
          />
        </div>
        <div className='flex flex-col'>     <button
          type="submit"
          className="relative flex flex-col items-center bg-transparent dark:bg-opacity-10 bg-opacity-20 border border-purple-400 font-bold py-2 px-6 rounded-lg shadow transition-all duration-300 hover:ring-2 hover:ring-purple-400"
        >
          <span className="relative z-10">Signup</span>
          <span
            className={`rounded-md absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 transform ${
              clicked ? "scale-x-100" : "scale-x-0"
            } transition-transform duration-[6s] origin-left`}
          />
        </button>
         {/* <p className="mt-4 text-sm">Or sign up with:</p>
      <button
        onClick={() => signIn("google")}
        className="mt-2 px-4 py-2 border rounded "
      >
        Sign up with Google
      </button> */}
</div>
     
      </form>

     
    </div>
  );
};

export default Signup;
