"use client"
import { PanelControl } from "./components";
import { useRouter } from "next/navigation";
import nookies from "nookies";
import { useEffect } from "react";


export default function PanelPage() {

  const router = useRouter();

  useEffect(() => {
    const cookies = nookies.get();
    const token = cookies.token;

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
   <PanelControl />
  )
}

