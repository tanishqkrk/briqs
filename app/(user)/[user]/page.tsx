"use client";

import { Button } from "@/components/ui/button";
import useAuth from "@/context/AuthContext";
import { auth, db } from "@/firebase";
import { UserDataInterface } from "@/interfaces/UserDataInterface";
import DefaultTheme from "@/themes/default/DefaultTheme";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  Eye,
  Link,
  LoaderCircle,
  LogOut,
  Monitor,
  Pencil,
  Plus,
  PlusCircle,
  Smartphone,
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
import { DeviceComponent } from "react-simple-device-emulator";

import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";

export default function Page({ params }: { params: { user: string } }) {
  useEffect(() => {
    console.log("LOAD");
    (async function () {
      // @ts-ignore
      const LS = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LS();
      console.log(locomotiveScroll);
    })();
  }, []);

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

  const url = usePathname();

  async function checkAdmin() {
    if (window)
      if (!window.location.href.includes("preview")) {
        const response = await getDoc(doc(db, "users", user?.uid));
        const data = await getDoc(doc(db, "data", response.data()!.userId));
        if (response.data()!.userId === path) setDashboard(true);
      }
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

  const [previewMobile, setPreviewMobile] = useState(false);
  // console.log(window.location.href + "?preview");
  return (
    <div id="page" className="relative">
      {dashboard && previewMobile && (
        <div
          onClick={() => {
            setPreviewMobile(false);
          }}
          className="h-full w-screen bg-black absolute top-0 left-0 opacity-60 z-[9999999999] max-md:hidden"
        ></div>
      )}
      {dashboard && previewMobile && (
        <div className="scale-75 emu fixed bottom-0 z-[99999999999] left-1/2 -translate-x-1/2  max-md:hidden">
          <DeviceComponent
            deviceType={"mobile"}
            deviceWidth={400}
            deviceHeight={800}
            scaleDesktop={1}
            scaleTablet={0.6}
            scaleMobile={0.8}
            mobileBreakPoint={450}
            tabletBreakPoint={768}
            desktopBreakPoint={1024}
          >
            <iframe
              src={window.location.href + "?preview"}
              height="100%"
              width="100%"
              // title="Iframe Example"
            ></iframe>
          </DeviceComponent>
        </div>
      )}
      {dashboard && (
        <div className="toolbar fixed bottom-4 left-1/2 -translate-x-1/2 rounded-xl p-2 shadow-2xl bg-[#ffffff60] backdrop-blur-md text-black shadow-black flex items-center gap-6 max-lg:justify-center max-lg:items-center max-lg:bottom-0 max-lg:shadow-black max-lg:gap-3 z-[999999999999999]">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2">
              <User className="" size={20}></User>{" "}
              <div className="max-lg:hidden">{data?.userId}</div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="-translate-y-3">
              <DropdownMenuItem>
                <Pencil className="mr-2"></Pencil> Change ID
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">
                <button
                  className="w-full flex items-center"
                  onClick={async () => {
                    await signOut(auth);
                  }}
                >
                  <LogOut className="mr-2"></LogOut> Logout
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            style={{}}
            className="max-md:hidden bg-transparent border-none"
            variant={"outline"}
            onClick={() => {
              setPreviewMobile((x) => !x);
            }}
            value="mobile"
          >
            <Smartphone></Smartphone>
          </Button>
          <div className="max-lg:flex">
            <Button className="p-[7px]" variant={"secondary"}>
              <SwatchBook></SwatchBook>
            </Button>
          </div>
          <div className="max-lg:flex">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <PlusCircle></PlusCircle>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="-translate-y-3">
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
                                mobileGrid: 2,
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
          <div className="space-x-3 max-lg:flex">
            {/* <Button className="bg-green-500 font-semibold">
              Share my Briq
            </Button> */}
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
