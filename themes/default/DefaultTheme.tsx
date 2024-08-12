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
import { returnStyles } from "@/utils/ReturnStyles";
import SocialCard from "@/components/SocialCard";

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
                  <div className="relative group">
                    {dashboard && (
                      <div className="bg-foreground w-44  text-background flex justify-between items-center p-1 px-3 rounded-lg  absolute left-1/2 -translate-x-1/2 -top-12 z-[999999] opacity-0 group-hover:opacity-80 duration-300">
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
export const socialList = [
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
  const [url, setUrl] = useState("https://www.youtube.com/@bogxd");

  const [data, setData] = useState(list.socials);

  const config = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "834f9f0f0dmsh7855af479e4d60bp1d97f4jsne51872208059",
      "x-rapidapi-host": "youtube-v31.p.rapidapi.com",
    },
  };

  async function fetchYouTubeData(url: string) {
    try {
      if (url.includes("youtube.com/channel/")) {
        const channelId = url.split("").splice(32).join("");
        const response = await fetch(
          `https://youtube-v31.p.rapidapi.com/channels?part=snippet%2Cstatistics&id=${channelId}`,
          config
        );
        const result = await response.json();
        return {
          ...result.items[0].snippet,
          type: "channel",
          channel: true,
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

        const channelOrgId = channelResult[0].snippet.channelId;

        const channelData = await (
          await fetch(
            `https://youtube-v31.p.rapidapi.com/channels?part=snippet%2Cstatistics&id=${channelOrgId}`,
            config
          )
        ).json();
        return {
          ...channelResult[0].snippet,
          ...channelData.items[0].statistics,
          type: "channel",
          channel: true,
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
  const size = "1fr";
  return (
    <div className="space-y-4">
      <ReactSortable
        tag={"div"}
        style={{
          display: "grid",
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
        {data.map((social) => {
          return (
            <SocialCard
              social={social}
              list={list}
              dashboard={dashboard}
              data={data}
              setData={setData}
            />
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
                        const site = url.includes("youtube.com")
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

                        const socialCard = {
                          id: crypto.randomUUID(),
                          timestamp: Date.now(),
                          order: data.length,
                          site,
                          link: url,
                          title: "YouTube",
                          otherData: {},
                        };

                        if (site === "youtube") {
                          const fetchData = await fetchYouTubeData(url);
                          setData((org) => [
                            ...data,
                            {
                              ...socialCard,
                              title: fetchData.title,
                              otherData: {
                                ...fetchData,
                                thumbnail: fetchData.thumbnails.high.url,
                              },
                            },
                          ]);
                        }

                        if (site === "instagram") {
                        }
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
                      // setUrl("");
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
