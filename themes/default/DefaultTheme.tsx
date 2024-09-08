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
  ALargeSmall,
  Globe,
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
  Text,
  Trash,
  WholeWord,
} from "lucide-react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";

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
import { fetchYouTubeData } from "@/utils/fetchYouTubeData";
import fetchInstagramData from "@/utils/fetchInstagramData";
import fetchGitHubData from "@/utils/fetchGitHubData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchTwitterData } from "@/utils/fetchTwitterData";
import fetchSpotifyData from "@/utils/fetchSpotifyData";

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
      <div className="w-1/3 flex flex-col gap-4 items-start sticky top-6 h-full">
        <motion.div
          initial={{
            y: "30%",
            opacity: 0,
          }}
          animate={{
            y: data?.userId ? 0 : "30%",
            opacity: data?.userId ? 1 : 0,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          <input
            disabled={!dashboard}
            id="pfp"
            onChange={async (e) => {
              if (dashboard) {
                const response = await updateProfilePhoto(e.target.files![0]);
              }
            }}
            type="file"
            className="hidden"
          />
          {data!.profileImage ? (
            <label htmlFor="pfp">
              {data?.profileImage && (
                <img
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
          <div className="flex flex-col">
            <motion.input
              initial={{
                y: "30%",
                opacity: 0,
              }}
              animate={{
                y: data?.userId ? 0 : "30%",
                opacity: data?.userId ? 1 : 0,
              }}
              transition={{
                duration: 0.5,
                delay: 0.2,
              }}
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
            <motion.input
              initial={{
                y: "30%",
                opacity: 0,
              }}
              animate={{
                y: data?.userId ? 0 : "30%",
                opacity: data?.userId ? 1 : 0,
              }}
              transition={{
                duration: 0.5,
                delay: 0.4,
              }}
              disabled={!dashboard}
              className="text-sm p-1 italic focus-within:outline-none bg-transparent"
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
          <motion.textarea
            initial={{
              y: "10%",
              opacity: 0,
            }}
            animate={{
              y: data?.userId ? 0 : "10%",
              opacity: data?.userId ? 1 : 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.6,
            }}
            disabled={!dashboard}
            className="text-base  focus-within:outline-none resize-none h-64 bg-transparent w-2/3 "
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
      <div className="w-2/3 flex flex-col gap-8">
        {data.content &&
          data.content
            .sort((a, b) => a.order - b.order)
            .map((item) => {
              if (item.type === "heading") {
                return (
                  <div className="relative group">
                    {dashboard && (
                      <div className="bg-foreground w-fit  text-background flex justify-between items-center p-1 px-3 rounded-lg  absolute left-1/2 -translate-x-1/2 -top-10 z-[999999] opacity-0 group-hover:opacity-80 duration-300">
                        {/* <div>
                          <button>
                            <ALargeSmall></ALargeSmall>
                          </button>
                        </div> */}
                        <DeleteContent
                          setData={setData}
                          item={item}
                          key={item.id}
                        />
                      </div>
                    )}
                    <input
                      disabled={!dashboard}
                      className="text-4xl font-bold focus-within:outline-none bg-transparent w-full"
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
                  </div>
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
                            } p-1 rounded-lg duration-200 `}
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
                        <DeleteContent
                          item={item}
                          setData={setData}
                          key={item.id}
                        />
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
  const [url, setUrl] = useState("");

  const [data, setData] = useState(list.socials);

  function capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  // const [site, setSite] = useState("new");

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

  const [selected, setSelected] = useState(false);
  const [selectedCard, setSelectedCard] = useState("");
  // console.log(selected);

  return (
    <div className="space-y-4">
      {/* <AnimatePresence>
      </AnimatePresence> */}
      <ReactSortable
        // onChoose={() => {
        //   setSelected(true);
        // }}
        // onEnd={() => {
        //   setSelected(false);
        // }}
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
        {data.map((social, i) => {
          return (
            <motion.div
              initial={{
                opacity: 0,
                y: "10%",
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: "10%",
              }}
              transition={{
                delay: i * 0.1,
                duration: 0.6,
              }}
            >
              <SocialCard
                social={social}
                list={list}
                dashboard={dashboard}
                data={data}
                setData={setData}
                setSelectedCard={setSelectedCard}
                selected={selected}
                selectedCard={selectedCard}
              />
            </motion.div>
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
              <DialogDescription className="flex  gap-3 items-center">
                <Input
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                  }}
                  placeholder={
                    // site === "youtube"
                    //   ? "(Use full link for ex:https://www.youtube.com/@ThePrimeagen)"
                    //   : "Enter your username"
                    "(Use full link for ex:https://www.youtube.com/@ThePrimeagen)"
                  }
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
                          : url.includes("x.com")
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
                          : url.includes("spotify.com")
                          ? "spotify"
                          : "";
                        // console.log(site);

                        // const siteTitle = await fetch(
                        //   "https://tanishqkrk.netlify.app/"
                        // );
                        // console.log(siteTitle);
                        const socialCard = {
                          id: crypto.randomUUID(),
                          timestamp: Date.now(),
                          order: data.length,
                          site,
                          link: url,
                          title:
                            capitalizeFirstLetter(site) ||
                            (url.includes("https")
                              ? url.split("").splice(8).join("").split("/")[0]
                              : url.split("").splice(7).join("").split("/")[0]),
                          otherData: {},
                        };

                        if (site === "youtube") {
                          const fetchData = await fetchYouTubeData(url);
                          setData((org) => [
                            ...org,
                            {
                              ...socialCard,
                              title: fetchData?.title || "YouTube",
                              otherData: {
                                ...fetchData,
                                thumbnail:
                                  fetchData?.thumbnails?.high?.url || "",
                              },
                            },
                          ]);
                        }

                        if (site === "instagram") {
                          setIsLoading(true);
                          const response = await fetchInstagramData(url);
                          console.log(response);
                          setData((org) => [
                            ...org,
                            {
                              ...socialCard,
                              title: response?.full_name || "Instagram",
                              otherData: {
                                // thumbnail: response?.profile_pic_url_hd || "",
                                thumbnail: "",
                                followers: response?.follower_count || 0,
                                following: response?.following_count || 0,
                                // pfp: response?.profile_pic_url_hd || "",
                                pfp: "",
                                posts: response?.media_count || 0,
                              },
                            },
                          ]);
                          // toast.error(
                          //   "Failed to fetch instagram data at the time.",
                          //   {
                          //     position: "bottom-center",
                          //     autoClose: 5000,
                          //     hideProgressBar: true,
                          //     closeOnClick: true,
                          //     pauseOnHover: true,
                          //     draggable: true,
                          //     progress: undefined,
                          //     theme: "colored",
                          //   }
                          // );
                        }
                        if (site === "github") {
                          const res = await fetchGitHubData(url);
                          console.log(res);
                          if (res) {
                            if (res?.type === "User") {
                              setData((org) => [
                                ...org,
                                {
                                  ...socialCard,
                                  title: res?.name || "Github",
                                  otherData: {
                                    ...res,
                                    thumbnail: res.avatar_url,
                                  },
                                },
                              ]);
                            } else if (res?.type === "Repo") {
                              setData((org) => [
                                ...org,
                                {
                                  ...socialCard,
                                  title: res?.full_name || "Github",
                                  otherData: {
                                    ...res,
                                    thumbnail: "",
                                    type: "Repo",
                                  },
                                },
                              ]);
                            } else {
                              toast.error("An error occured!", {
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
                          } else {
                            toast.error("An error occurred", {
                              position: "bottom-center",
                              autoClose: 5000,
                              hideProgressBar: true,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "colored",
                            });
                            setData((org) => [...org]);
                          }
                        }
                        if (site === "twitter") {
                          const res = await fetchTwitterData(url);
                          // const res = { name: "", header_image: "" };
                          try {
                            setData((org) => [
                              ...org,
                              {
                                ...socialCard,
                                title: res?.name || "X",
                                otherData: {
                                  ...res,
                                  thumbnail: res?.header_image || "",
                                },
                              },
                            ]);
                          } catch (err) {
                            toast.error("An error occurred", {
                              position: "bottom-center",
                              autoClose: 5000,
                              hideProgressBar: true,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "colored",
                            });
                            setData((org) => [...org]);
                          }
                        }
                        if (site === "spotify") {
                          const res = await fetchSpotifyData(url);
                          // console.log("RES:", res);
                          try {
                            if (res.type) {
                              setData((org) => [
                                ...org,
                                {
                                  ...socialCard,
                                  title:
                                    res?.display_name || res?.name || "Spotify",
                                  otherData: {
                                    ...res,
                                    thumbnail:
                                      res?.album?.images[0].url ||
                                      res?.images[0].url ||
                                      res?.images[0].url,
                                  },
                                },
                              ]);
                            } else {
                              setData((org) => [
                                ...org,
                                {
                                  ...socialCard,
                                  title: "Spotify",
                                  otherData: {
                                    ...res,
                                  },
                                },
                              ]);
                              // throw new Error();
                            }
                          } catch (err) {
                            toast.error("An error occurred", {
                              position: "bottom-center",
                              autoClose: 5000,
                              hideProgressBar: true,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "colored",
                            });
                            setData((org) => [...org]);
                          }
                        } else if (
                          site === "" ||
                          site === "snapchat" ||
                          site === "behance" ||
                          site === "dribble" ||
                          site === "facebook" ||
                          site === "linkedin" ||
                          site === "reddit" ||
                          site === "whatsapp"
                        ) {
                          setIsLoading(true);
                          setData((org) => [
                            ...org,
                            {
                              ...socialCard,
                              otherData: {
                                thumbnail: "",
                              },
                            },
                          ]);
                          setIsLoading(false);
                        }
                        setIsLoading(false);
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

function DeleteContent({
  setData,
  item,
}: {
  setData: React.Dispatch<React.SetStateAction<UserDataInterface>>;
  item: ContentTypeInterface;
}) {
  return (
    <button
      onClick={() => {
        setData((org) => ({
          ...org,
          content: [...org.content.filter((x) => x.id !== item.id)],
        }));
      }}
      className="bg-red-100 p-1 rounded-lg"
    >
      <Trash size={20} color="red"></Trash>
    </button>
  );
}
