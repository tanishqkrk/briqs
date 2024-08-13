"use client";

import { Button } from "@/components/ui/button";
import useAuth from "@/context/AuthContext";
import { db } from "@/firebase";
import { UserDataInterface } from "@/interfaces/UserDataInterface";
import DefaultTheme from "@/themes/default/DefaultTheme";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  Eye,
  Link,
  LoaderCircle,
  Plus,
  PlusCircle,
  SwatchBook,
  User,
  Users,
} from "lucide-react";
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
import { toast } from "react-toastify";

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
    content: [],
  });

  const [dashboard, setDashboard] = useState(false);

  async function fetchUserData() {
    const response = await getDoc(doc(db, "data", userId));
    // @ts-ignore
    setData(response.data());
  }

  const [saving, setSaving] = useState(false);

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

  const [availableSections, setAvailableSections] = useState<string[]>([
    "heading",
    "socials",
    "work",
    "projects",
    "blogs",
    "gallery",
  ]);

  return (
    <div>
      {dashboard && (
        <div className="toolbar fixed bottom-1 left-1/2 -translate-x-1/2 rounded-md p-2 shadow-xl bg-background flex items-center gap-6 z-[9999999999]">
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
            <DropdownMenu>
              <DropdownMenuTrigger>
                <PlusCircle></PlusCircle>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Add section</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {availableSections.map((section) => {
                  return (
                    <DropdownMenuItem
                      key={section}
                      className="capitalize"
                      onClick={() => {
                        if (section === "heading") {
                          setData((org) => ({
                            ...org,
                            content: [
                              ...org.content,
                              {
                                id: crypto.randomUUID(),
                                type: section,
                                heading: {
                                  title: "Heading",
                                  fontSize: 28,
                                },
                                socials: [],
                                timestamp: Date.now(),
                                order: org.content.length,
                              },
                            ],
                          }));
                        }
                        if (section === "socials") {
                          setData((org) => ({
                            ...org,
                            content: [
                              ...org.content,
                              {
                                id: crypto.randomUUID(),
                                type: section,
                                heading: {
                                  title: "Heading",
                                  fontSize: 28,
                                },
                                socials: [],
                                timestamp: Date.now(),
                                order: org.content.length,
                                gridType: 4,
                              },
                            ],
                          }));
                        }
                        // if (section !== "heading")
                        // setAvailableSections((prev) =>
                        //   prev.filter((x) => x !== section)
                        // );
                      }}
                    >
                      {section}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="space-x-3">
            <Button className="bg-green-500 font-semibold">
              Share my Briq
            </Button>
            <Button
              style={{
                transform: saving ? "translateY(15%)" : "",
              }}
              onClick={async () => {
                setSaving(true);
                try {
                  const response = await setDoc(
                    // @ts-ignore
                    doc(db, "data", data?.userId),
                    data
                  );
                  toast.success("Updated", {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                } catch (err) {
                  toast.error("Failed", {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                }
                setSaving(false);
              }}
              className="font-semibold"
              disabled={saving}
            >
              {saving ? <LoaderCircle className="rotate" /> : "Save"}
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
