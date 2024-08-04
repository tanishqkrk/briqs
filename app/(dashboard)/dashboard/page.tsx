"use client";

import { Button } from "@/components/ui/button";
import useAuth from "@/context/AuthContext";
import { db } from "@/firebase";
import { UserDataInterface } from "@/interfaces/UserDataInterface";
import DefaultTheme from "@/themes/default/DefaultTheme";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Eye, Plus, SwatchBook, User } from "lucide-react";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Dashboard() {
  const { user } = useAuth()!;

  const [userData, setUserData] = useState<UserDataInterface | null>(null);

  async function fetchUserData() {
    const response = await getDoc(doc(db, "users", user.uid));
    const data = await getDoc(doc(db, "data", response.data()?.userId || ""));
    // @ts-ignore
    setUserData(data.data());
  }
  useEffect(() => {
    if (user) fetchUserData();
  }, [user]);

  console.log(userData);
  return (
    <div>
      <div className="toolbar fixed bottom-10 left-1/2 -translate-x-1/2 rounded-md p-2 shadow-xl bg-slate-100 flex items-center gap-6">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2">
            <User size={20}></User> {userData?.userId}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem>Change ID</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div>
          <Button className="bg-transparent p-[7px]" variant={"outline"}>
            <Eye></Eye>
          </Button>
          <Button className="bg-transparent p-[7px]" variant={"outline"}>
            <SwatchBook></SwatchBook>
          </Button>
        </div>
        <div>
          <Button variant={"secondary"}>
            <Plus></Plus>
          </Button>
        </div>
        <div className="space-x-3">
          <Button className="bg-green-500 font-semibold">Share my Briq</Button>
          <Button
            onClick={async () => {
              const response = setDoc(
                // @ts-ignore
                doc(db, "data", userData?.userId),
                userData
              );
            }}
            className="font-semibold"
          >
            Save
          </Button>
        </div>
      </div>

      {userData?.theme === "Default" ? (
        <DefaultTheme data={userData} setData={setUserData} />
      ) : (
        <div></div>
      )}
    </div>
  );
}
