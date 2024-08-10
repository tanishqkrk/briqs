"use client";

import {
  ContentTypeInterface,
  SocialType,
  UserDataInterface,
} from "@/interfaces/UserDataInterface";
import { forwardRef, useState } from "react";
import { usePathname } from "next/navigation";
import useAuth from "@/context/AuthContext";
import { useEffect } from "react";
import {
  Grid,
  Grid2X2,
  Image,
  LayoutGrid,
  LoaderCircle,
  Plus,
  PlusCircle,
  RectangleEllipsis,
  RectangleHorizontal,
  Rows,
  Square,
  Table,
  Trash,
} from "lucide-react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import ToastComponent from "@/components/Toast";
import { DialogClose } from "@radix-ui/react-dialog";
import { ReactSortable } from "react-sortablejs";

export default function DefaultTheme({
  data,
  setData,
  dashboard,
}: {
  data: UserDataInterface;
  setData: React.Dispatch<React.SetStateAction<UserDataInterface>>;
  dashboard: boolean;
}) {
  async function updateProfilePhoto(file: any) {
    if (dashboard) {
      const id = crypto.randomUUID();
      const photoRef = ref(storage, "/profilePhotos/" + id);
      const response = await uploadBytes(photoRef, file);
      const url = await getDownloadURL(photoRef);
      setData((org) => ({
        ...org!,
        profileImage: url,
      }));
    }
  }

  return (
    <div className="p-16 flex">
      <div className="z-[99999999999]">
        <ToastComponent></ToastComponent>
      </div>
      <div className="w-1/3 flex flex-col gap-6 items-start">
        <motion.div
          initial={{
            y: "30%",
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          <input
            disabled={!dashboard}
            id="pfp"
            onChange={async (e) => {
              const response = await updateProfilePhoto(e.target.files![0]);
            }}
            type="file"
            className="hidden"
          />
          {data!.profileImage ? (
            <label htmlFor="pfp">
              {data?.profileImage && (
                <motion.img
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.6,
                  }}
                  className="w-48 h-48 object-cover rounded-full border-grey-300 border-2"
                  src={data!.profileImage}
                  alt=""
                />
              )}
            </label>
          ) : (
            <label htmlFor="pfp">
              <div className="w-48 aspect-square rounded-full border-gray-400  border-dashed relative  border-2">
                <Image
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  size={50}
                  color="grey"
                ></Image>
              </div>
            </label>
          )}
        </motion.div>
        <div className="space-y-4 flex flex-col ">
          <div>
            <input
              disabled={!dashboard}
              className="text-4xl font-bold focus-within:outline-none bg-transparent h-full"
              onChange={(e) => {
                if (dashboard)
                  setData((org) => ({
                    ...org!,
                    name: e.target.value,
                  }));
              }}
              value={data?.name || ""}
              type="text"
              placeholder="Your name"
            />
            <input
              disabled={!dashboard}
              className="text-sm italic focus-within:outline-none bg-transparent"
              onChange={(e) => {
                if (dashboard)
                  setData((org) => ({
                    ...org!,
                    subtitle: e.target.value,
                  }));
              }}
              value={data?.subtitle || ""}
              type="text"
              placeholder="Role"
            />
          </div>
          <textarea
            disabled={!dashboard}
            className="text-lg  focus-within:outline-none resize-none h-64 bg-transparent"
            onChange={(e) => {
              if (dashboard)
                setData((org) => ({
                  ...org!,
                  bio: e.target.value,
                }));
            }}
            value={data?.bio || ""}
            placeholder="Your bio..."
          />
        </div>
      </div>
      <div className="w-2/3 flex flex-col gap-3">
        {data.content &&
          data.content
            .sort((a, b) => a.order - b.order)
            .map((item) => {
              if (item.type === "heading") {
                return (
                  <input
                    disabled={!dashboard}
                    className="text-4xl font-bold focus-within:outline-none bg-transparent "
                    style={{
                      fontSize: item.heading?.fontSize + "px",
                    }}
                    value={item.heading?.title}
                    onChange={(e) => {
                      if (dashboard)
                        setData((org) => ({
                          ...org,
                          content: [
                            ...org.content.filter((x) => x.id !== item.id),
                            {
                              ...item,
                              heading: {
                                ...item.heading,
                                title: e.target.value,
                              },
                            },
                          ],
                        }));
                    }}
                  ></input>
                );
              }
              if (item.type === "socials") {
                return (
                  <div className="relative ">
                    {dashboard && (
                      <div className="bg-foreground w-44  text-background flex justify-between items-center p-1 px-3 rounded-lg opacity-80 absolute left-1/2 -translate-x-1/2 -top-12 z-[999999]">
                        <div className="">
                          <button
                            onClick={() => {
                              setData((org) => ({
                                ...org,
                                content: [
                                  ...org.content.filter(
                                    (x) => x.id !== item.id
                                  ),
                                  {
                                    ...item,
                                    gridType: 4,
                                  },
                                ],
                              }));
                            }}
                            className={`${
                              item.gridType === 4
                                ? "bg-background text-foreground"
                                : "bg-foreground text-background"
                            } p-1 rounded-lg duration-200`}
                          >
                            <LayoutGrid></LayoutGrid>
                          </button>
                          <button
                            className={`${
                              item.gridType === 2
                                ? "bg-background text-foreground"
                                : "bg-foreground text-background"
                            } p-1 rounded-lg duration-200`}
                            onClick={() => {
                              setData((org) => ({
                                ...org,
                                content: [
                                  ...org.content.filter(
                                    (x) => x.id !== item.id
                                  ),
                                  {
                                    ...item,
                                    gridType: 2,
                                  },
                                ],
                              }));
                            }}
                          >
                            <Table></Table>
                          </button>
                          <button
                            className={`${
                              item.gridType === 1
                                ? "bg-background text-foreground"
                                : "bg-foreground text-background"
                            } p-1 rounded-lg duration-200`}
                            onClick={() => {
                              setData((org) => ({
                                ...org,
                                content: [
                                  ...org.content.filter(
                                    (x) => x.id !== item.id
                                  ),
                                  {
                                    ...item,
                                    gridType: 1,
                                  },
                                ],
                              }));
                            }}
                          >
                            <Rows></Rows>
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            setData((org) => ({
                              ...org,
                              content: [
                                ...org.content.filter((x) => x.id !== item.id),
                              ],
                            }));
                          }}
                          className="bg-red-100 p-1 rounded-lg"
                        >
                          <Trash size={20} color="red"></Trash>
                        </button>
                      </div>
                    )}
                    <SocialsGrid
                      updateData={setData}
                      list={item}
                      dashboard={dashboard}
                    />
                  </div>
                );
              }
            })}
      </div>
    </div>
  );
}

function SocialsGrid({
  list,
  dashboard,
  updateData,
}: {
  list: ContentTypeInterface;
  dashboard: boolean;
  updateData: React.Dispatch<React.SetStateAction<UserDataInterface>>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("https://www.youtube.com/watch?v=VNwjNNBFRmY");

  const [data, setData] = useState(list.socials);
  const socialList = [
    "youtube",
    "instagram",
    "facebook",
    "snapchat",
    "twitter",
    "github",
    "whatsapp",
    "dribble",
    "linkedin",
    "reddit",
    "behance",
  ];

  function returnStyles(site: string) {
    switch (site) {
      case "youtube":
        return {
          main: "#CD201F",
          background: "#ffd3d3",
          icon: "/icons/youtube.svg",
        };
      case "instagram":
        return {
          main: "#E4405F",
          background: "#ffced7",
          icon: "/icons/instagram.svg",
        };
      case "snapchat":
        return {
          main: "#FFFC00",
          background: "#ffffde",
          icon: "/icons/snapchat.svg",
        };
      case "facebook":
        return {
          main: "#1877F2",
          background: "#d3e5ff",
          icon: "/icons/facebook.svg",
        };

      case "twitter":
        return {
          main: "#ffffff10",
          background: "#00000020",
          icon: "",
        };
      case "github":
        return {
          main: "#fff",
          background: "#000",
          icon: "/icons/github.svg",
        };
      case "whatsapp":
        return {
          main: "#25D366",
          background: "#c4ffda",
          icon: "/icons/whatsapp.svg",
        };
      case "dribble":
        return {
          main: "#EA4C89",
          background: "#ffc8dd",
          icon: "/icons/dribble.svg",
        };
      case "linkedin":
        return {
          main: "#0A66C2",
          background: "#cbe4fe",
          icon: "/icons/linkedin.svg",
        };
      case "reddit":
        return {
          main: "#FF5700",
          background: "#ffcbb0",
          icon: "/icons/reddit.svg",
        };
      case "behance":
        return {
          main: "#fff",
          background: "#cbeefe",
          icon: "/icons/behance.svg",
        };
      case "":
        return {
          main: "#d8d8d8",
          background: "#ededed",
          icon: "",
        };
    }
  }

  async function fetchYouTubeData(url: string) {
    try {
      if (url.includes("youtube.com/channel/")) {
        const channelId = url.split("").splice(32).join("");
        const response = await fetch(
          `https://youtube-v31.p.rapidapi.com/channels?part=snippet%2Cstatistics&id=${channelId}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-key":
                "834f9f0f0dmsh7855af479e4d60bp1d97f4jsne51872208059",
              "x-rapidapi-host": "youtube-v31.p.rapidapi.com",
            },
          }
        );
        const result = await response.json();
        const channelResult = result.items.filter(
          (x: any) => x.id.kind === "youtube#channel"
        );
        console.log(result.items[0].snippet);
        // const data = await result.items[0].snippet;
        return {
          ...result.items[0].snippet,
          type: "channel",
        };
      } else if (url.includes("@")) {
        const channelId = url.split("").splice(25).join("");
        const response = await fetch(
          `https://youtube-v31.p.rapidapi.com/search?q=${channelId}&part=snippet%2Cid&maxResults=100`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-key":
                "834f9f0f0dmsh7855af479e4d60bp1d97f4jsne51872208059",
              "x-rapidapi-host": "youtube-v31.p.rapidapi.com",
            },
          }
        );
        const result = await response.json();
        const channelResult = result.items.filter(
          (x: any) => x.id.kind === "youtube#channel"
        );
        // console.log(hehe);
        // const data = await result.items[0].snippet;
        return {
          ...channelResult[0].snippet,
          type: "channel",
        };
      } else {
        const response = await fetch(
          `https://youtube-v31.p.rapidapi.com/search?q=${url}&part=snippet%2Cid`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-key":
                "834f9f0f0dmsh7855af479e4d60bp1d97f4jsne51872208059",
              "x-rapidapi-host": "youtube-v31.p.rapidapi.com",
            },
          }
        );
        const result = await response.json();
        const data = await result.items[0].snippet;
        return {
          ...data,
          type: "video",
        };
      }
      // return result;
    } catch (error) {
      console.error(error);
    }
  }
  function capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  // console.log(list);
  useEffect(() => {
    updateData((org) => ({
      ...org,
      content: [
        ...org.content.filter((x) => x.id !== list.id),
        {
          ...list,
          socials: data,
        },
      ],
    }));
  }, [data]);
  console.log(list.gridType);
  const size = "1fr";
  // if (list.socials[0])
  return (
    <div className="space-y-4">
      <ReactSortable
        tag={"div"}
        style={{
          display: "grid",
          // gridTemplateColumns: `${size.repeat(list.gridType!).toString()}`,
          gridTemplateColumns:
            list.gridType === 4
              ? "1fr 1fr 1fr 1fr"
              : list.gridType === 2
              ? "1fr 1fr"
              : list.gridType === 1
              ? "1fr"
              : "",
        }}
        className="gap-8 duration-200"
        list={data}
        setList={setData}
        disabled={!dashboard}
      >
        {data
          // ?.sort((a, b) => a.order - b.order)
          .map((social) => {
            // console.log(social);
            // @ts-ignore
            const { main, background, icon } = returnStyles(social.site);
            return (
              <div
                key={social.order}
                style={{
                  background,
                  border: "2px solid" + main + "20",
                }}
                className="h-48  w-full aspect-square rounded-3xl p-3 hover:shadow-xl transition-all duration-150 group relative "
              >
                {dashboard && (
                  <Button
                    onClick={() => {
                      if (dashboard)
                        setData((prev) => {
                          return [...prev.filter((x) => x.id !== social.id)];
                        });
                    }}
                    variant={"secondary"}
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300 absolute -top-1 -left-4 bg-white p-2 rounded-full shadow-xl shadow-zinc-400 pointer-events-none  group-hover:pointer-events-auto cursor-pointer"
                  >
                    <Trash></Trash>
                  </Button>
                )}
                <div className="flex justify-between items-center gap-3">
                  <div
                    style={{
                      width: list.gridType === 4 ? "100%" : "",
                    }}
                    className="w-2/4 h-48"
                  >
                    <img
                      className={`w-14  `}
                      src={
                        socialList.includes(social.site)
                          ? icon
                          : `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${social.link}/&size=256`
                      }
                      alt=""
                    />
                    <textarea
                      disabled={!dashboard}
                      onChange={(e) => {
                        setData((org) => [
                          ...org.map((x) => {
                            if (x.id !== social.id) {
                              return x;
                            } else {
                              return {
                                ...social,
                                title: e.target.value,
                              };
                            }
                          }),
                        ]);
                      }}
                      value={social.title}
                      className={`${
                        dashboard && "hover:bg-opacity-50 hover:bg-zinc-400"
                      } p-1 text-base  text-zinc-700 focus-within:outline-none bg-transparent ${
                        list.gridType === 4
                          ? "w-full"
                          : list.gridType === 2
                          ? "w-full"
                          : list.gridType === 1
                          ? "w-full"
                          : "w-full"
                      } mt-2  resize-none  rounded-xl duration-200`}
                    ></textarea>
                    <div className="hidden truncate text-ellipsis  text-sm  text-zinc-700">
                      {social.link
                        .split("")
                        .splice(social.link.includes("https") ? 12 : 11)
                        .join("")}
                    </div>
                  </div>
                  {social.site === "youtube" && (
                    <>
                      {(list.gridType === 2 || list.gridType === 1) && (
                        <div className="w-2/4 h-48">
                          <img
                            className={`h-40 aspect-square object-cover ${
                              social.otherData.channel
                                ? "rounded-full w-40"
                                : "rounded-xl w-full"
                            }`}
                            src={social.otherData.thumbnail}
                            alt=""
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
      </ReactSortable>
      {dashboard && (
        <Dialog>
          <DialogTrigger className="w-fit">
            <Button
              className={`w-48 h-48 aspect-square rounded-3xl bg-background text-foreground ${
                isLoading && "bg-background"
              } hover:bg-secondary hover:text-secondary-foreground  border-[1px] border-foreground`}
            >
              {isLoading ? (
                <LoaderCircle size={40} className="rotate text-blue-600" />
              ) : (
                <PlusCircle size={40}></PlusCircle>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add link</DialogTitle>
              <DialogDescription className="flex flex-col gap-3 items-center">
                <Input
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                  }}
                  placeholder="(Use full link for ex:https://www.youtube.com/@ThePrimeagen)"
                ></Input>
                <DialogClose asChild>
                  <Button
                    disabled={isLoading}
                    onClick={async () => {
                      setIsLoading(true);
                      if (url.includes("http")) {
                        const site = url.includes("youtube")
                          ? "youtube"
                          : url.includes("instagram.com")
                          ? "instagram"
                          : url.includes("facebook.com")
                          ? "facebook"
                          : url.includes("twitter.com")
                          ? "twitter"
                          : url.includes("wa.me")
                          ? "whatsapp"
                          : url.includes("snapchat.com")
                          ? "snapchat"
                          : url.includes("dribble.com")
                          ? "dribble"
                          : url.includes("github.com")
                          ? "github"
                          : url.includes("linkedin.com")
                          ? "linkedin"
                          : url.includes("reddit.com")
                          ? "reddit"
                          : url.includes("behance.com")
                          ? "behance"
                          : "";
                        const youtubeResponse = await fetchYouTubeData(url);
                        const title = youtubeResponse.title;
                        const thumbnail =
                          youtubeResponse.thumbnails.high.url || "";
                        const channel = youtubeResponse.type === "channel";
                        console.log(channel);
                        setData((org) => [
                          ...data,
                          {
                            id: crypto.randomUUID(),
                            timestamp: Date.now(),
                            order: data.length,
                            site,
                            link: url,
                            title:
                              site === "youtube"
                                ? title
                                : capitalizeFirstLetter(site || "title"),
                            otherData: {
                              thumbnail,
                              channel,
                            },
                          },
                        ]);
                      } else {
                        toast.error("Invalid Link!", {
                          position: "bottom-center",
                          autoClose: 5000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "colored",
                        });
                      }
                      setIsLoading(false);
                      setUrl("");
                    }}
                  >
                    Save
                  </Button>
                </DialogClose>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
