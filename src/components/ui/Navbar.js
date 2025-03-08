import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/auth";
import ThemeToggle from "./theme-toggle";
export default async function Navbar() {
  // Fetch session on the server
  const session = await getServerSession(authOptions);
  console.log(session)
    return (
      <nav className="sticky relative mx-8 md:mx-16 p-3 bg-transparent backdrop-blur-3xl flex justify-between items-center rounded-full shadow-md dark:shadow-lg fixed top-5 left-0 right-0 z-50 mx-auto max-w-7xl px-6 border border-black/5 dark:border-white/10">
        <div className="flex items-center gap-2">
          <img
            src="https://nileshblog.tech/wp-content/uploads/2023/12/NileshBlog.Tech-Software-Development-Learning-Problem-Solving-Platform.svg"
            alt="DevStudio Logo"
            className="w-32 h-8 dark:invert transition-transform duration-200 transform hover:scale-105"
          />
        </div>
  
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          <Link href="/" className="text-gray-700 dark:text-gray-300 px-6 py-2 rounded-full hover:ring-2 hover:ring-black/5 dark:hover:ring-white/10 transition-transform duration-200 transform hover:scale-105">
            Home
          </Link>
          <Link href="#" className="text-gray-700 dark:text-gray-300 px-6 py-2 rounded-full hover:ring-2 hover:ring-black/5 dark:hover:ring-white/10 transition-transform duration-200 transform hover:scale-105">
            Home 2
          </Link>
          <Link href="#" className="text-gray-700 dark:text-gray-300 px-6 py-2 rounded-full hover:ring-2 hover:ring-black/5 dark:hover:ring-white/10 transition-transform duration-200 transform hover:scale-105">
            Home 3
          </Link>
        </div>
  
        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          {!session ? (
            <>
              <Link href="/login" className="bg-black text-white dark:bg-white dark:text-black px-6 py-2 rounded-full font-semibold hover:ring-2 hover:ring-black/5 dark:hover:ring-white/10 transition-transform duration-200 transform hover:scale-105">
                Login
              </Link>
              <Link href="/signup" className="bg-black text-white dark:bg-white dark:text-black px-6 py-2 rounded-full font-semibold hover:ring-2 hover:ring-black/5 dark:hover:ring-white/10 transition-transform duration-200 transform hover:scale-105">
                SignUp
              </Link>
            </>
          ) : (
            <Link href="/dashboard" className="bg-black text-white dark:bg-white dark:text-black px-6 py-2 rounded-full font-semibold hover:ring-2 hover:ring-black/5 dark:hover:ring-white/10 transition-transform duration-200 transform hover:scale-105">
              Dashboard
            </Link>
          )}
          <ThemeToggle /> {/* Using client-side theme toggle */}
        </div>
  
        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-2">
          <button className="p-2 focus:outline-none">
            <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <ThemeToggle /> {/* Client-side toggle */}
        </div>
      </nav>
  
  );
}
