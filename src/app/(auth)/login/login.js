"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [clicked, setClicked] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    
    setClicked(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (!res?.error) {
        router.push("/dashboard"); // Redirect to home if login is successful
      } else {
        setClicked(false);
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setClicked(false);
      setError("Something went wrong. Please try again.");
      console.error("Login error:", err);
    }
  };

  const handleGoogleLogin = async () => {
		try {
      await signIn("google");
    } catch (error) {
      setError(error.message)
    }
	};

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form
        className="border border-black/5 dark:border-white/10 p-6 rounded shadow-md w-full max-w-sm"
        onSubmit={(e)=>{e.preventDefault();}}
      >
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            Email / Username
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {error && <p className="text-red-600 text-sm my-2">{error}</p>}
        <div className='flex flex-col'>
        

        <button
  onClick={handleLogin}              className={`flex flex-col justify-beween items-center bg-transparent backdrop-blur-sm border border-blue-400  font-bold py-2 px-6 rounded-lg shadow transition-all duration-300 focus:outline-none focus:shadow-outline hover:ring-2 hover:ring-blue-400`}
            >
              <span className="relative z-10 ">Login</span>
              <span
                className={`rounded-md absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 transform ${clicked ? 'scale-x-100' : 'scale-x-0'} transition-transform duration-[500ms] origin-left`}
              />
            </button>

            <p className="mt-4 text-sm">Or sign up with:</p>
            <button 
					onClick={handleGoogleLogin}
					className=" mt-4 flex items-center justify-center  bg-transparent  border border-gray-400 rounded p-2 shadow w-full"
				>
					<img src="/google-logo.png" alt="Google logo" className="w-6 h-6 mr-2" />
					<span>Sign in with Google</span>
				</button>
                
                </div>
      </form>
    
    </div>
  );
};

export default Login;
