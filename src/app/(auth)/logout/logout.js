"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import axiosInstance from "@/lib/axiosInstance";
export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        await axiosInstance("/user/logout")
      } catch (error) {
        console.error("Backend logout error:", error.message);
      } finally {
        // signOut will clear the NextAuth session and redirect to the callbackUrl
        await signOut({ redirect: true, callbackUrl: "/" });
      }
    };

    logout();
  }, [router]);

  return null;
}
