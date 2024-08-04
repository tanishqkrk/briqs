"use client";

import { db } from "@/firebase";
import { UserDataInterface } from "@/interfaces/UserDataInterface";
import DefaultTheme from "@/themes/default/DefaultTheme";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
export default function Page({ params }: { params: { user: string } }) {
  const userId = params.user;

  const [data, setData] = useState<UserDataInterface | null>(null);

  async function fetchUserData() {
    const response = await getDoc(doc(db, "data", userId));
    // @ts-ignore
    setData(response.data());
  }

  useEffect(() => {
    fetchUserData();
  }, []);
  console.log(data);

  return (
    <div>
      {data?.theme === "Default" ? (
        <DefaultTheme setData={setData} data={data} />
      ) : (
        <div></div>
      )}
    </div>
  );
}
