"use client";

import Featured from "@/components/Featured";
import Offer from "@/components/Offer";
import Slider from "@/components/Slider";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function Home() {
  // const [userEmail, setUserEmail] = useState<string | null>(null);

  // async function getUserSession() {
  //   const {
  //     data: { session },
  //   } = await supabase.auth.getSession();

  //   console.log("Session:", session);
  //   return session?.user?.email || null;
  // }

  // useEffect(() => {
  //   // Load session on mount
  //   const loadSession = async () => {
  //     const email = await getUserSession();
  //     setUserEmail(email);
  //   };

  //   loadSession();

  //   // Listen for auth changes
  //   const { data: listener } = supabase.auth.onAuthStateChange(
  //     (event, session) => {
  //       console.log("Auth event:", event);
  //       setUserEmail(session?.user?.email || null);
  //     },
  //   );

  //   return () => {
  //     listener.subscription.unsubscribe();
  //   };
  // }, []);

  return (
      <div>
        <Slider />
        <Featured />
        <Offer />
      </div>
  );
}