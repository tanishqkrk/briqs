"use client";

import { Button } from "@/components/ui/button";
import useAuth from "@/context/AuthContext";
import { db } from "@/firebase";
import { UserDataInterface } from "@/interfaces/UserDataInterface";
import DefaultTheme from "@/themes/default/DefaultTheme";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Eye, Link, Plus, SwatchBook, User, Users } from "lucide-react";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function Page({ params }: { params: { user: string } }) {
  const userId = params.user;
  const { user } = useAuth()!;
  const [data, setData] = useState<UserDataInterface>({
    id: "",
    userId: "",
    email: "",
    theme: "Default",
    profileImage: "",
    name: "",
    bio: "",
    subtitle: "",
  });

  const [dashboard, setDashboard] = useState(false);

  async function fetchUserData() {
    const response = await getDoc(doc(db, "data", userId));
    // @ts-ignore
    setData(response.data());
  }

  useEffect(() => {
    fetchUserData();
  }, []);
  let path = usePathname().split("").splice(1).join("");

  async function checkAdmin() {
    const response = await getDoc(doc(db, "users", user?.uid));
    const data = await getDoc(doc(db, "data", response.data()!.userId));
    if (response.data()!.userId === path) setDashboard(true);
    console.log(response.data()!.userId, path);
  }

  useEffect(() => {
    if (user) checkAdmin();
  }, [user]);

  return (
    <div>
      {dashboard && (
        <div className="toolbar fixed bottom-10 left-1/2 -translate-x-1/2 rounded-md p-2 shadow-xl bg-slate-100 flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2">
              <User size={20}></User> {data?.userId}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {/* <DropdownMenuSeparator /> */}
              <DropdownMenuItem>Change ID</DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div>
            <Button className="bg-transparent p-[7px]" variant={"secondary"}>
              <Eye></Eye>
            </Button>
            <Button className="bg-transparent p-[7px]" variant={"secondary"}>
              <SwatchBook></SwatchBook>
            </Button>
          </div>
          <div>
            <Dialog>
              <DialogTrigger>
                <Link size={16}></Link>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Enter URL</DialogTitle>
                  <DialogDescription className="flex justify-center items-center gap-3">
                    <Input placeholder="https://www.instagram.com/tanishqkrk/"></Input>{" "}
                    <Button>Add</Button>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div className="space-x-3">
            <Button className="bg-green-500 font-semibold">
              Share my Briq
            </Button>
            <Button
              onClick={async () => {
                const response = setDoc(
                  // @ts-ignore
                  doc(db, "data", data?.userId),
                  data
                );
              }}
              className="font-semibold"
            >
              Save
            </Button>
          </div>
        </div>
      )}
      {data?.theme === "Default" ? (
        <DefaultTheme dashboard={dashboard} setData={setData} data={data} />
      ) : (
        <div></div>
      )}
    </div>
  );
}
1;
