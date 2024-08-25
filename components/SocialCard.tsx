"use client";

import {
  ContentTypeInterface,
  SocialType,
  UserDataInterface,
} from "@/interfaces/UserDataInterface";
import { returnStyles } from "@/utils/ReturnStyles";
import { Button } from "./ui/button";
import { Divide, Image, Play, PlayCircle, Trash } from "lucide-react";
import { socialList } from "@/themes/default/DefaultTheme";
import { numberFormatter } from "@/utils/numberFormatter";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase";

export default function SocialCard({
  data,
  setData,
  list,
  social,
  dashboard,
  setSelectedCard,
  selected,
  selectedCard,
}: {
  setData: React.Dispatch<React.SetStateAction<SocialType[]>>;
  social: SocialType;
  dashboard: boolean;
  list: ContentTypeInterface;
  data: SocialType[];
  setSelectedCard: React.Dispatch<React.SetStateAction<string>>;
  selected: boolean;
  selectedCard: string;
}) {
  // @ts-ignore
  const { main, background, icon, text } = returnStyles(social.site);
  const [banner, setBanner] = useState("");
  useEffect(() => {
    (async function () {
      if (!social.otherData.thumbnail) {
        const res = await fetch("/banners/" + social.site + ".png");
        if (res.status === 200) {
          setBanner("/banners/" + social.site + ".png");
        } else {
          setBanner("/icons/" + social.site + ".svg");
        }
      }
    })();
  }, []);

  async function uploadThumbnail(file: any) {
    console.log("UGNABUGNA");
    if (dashboard) {
      const id = crypto.randomUUID();
      const photoRef = ref(storage, "/profilePhotos/" + id);
      const response = await uploadBytes(photoRef, file);
      const url = await getDownloadURL(photoRef);

      setData((org) => [
        ...org.map((x) => {
          if (x.id !== social.id) {
            return x;
          } else {
            return {
              ...social,
              otherData: {
                ...social.otherData,
                thumbnail: url,
              },
            };
          }
        }),
      ]);
    }
    console.log(social);
  }

  return (
    <div
      onClick={() => {
        if (!dashboard) window.open(social.link, "_blank");
      }}
      onDrag={(e) => {
        if (dashboard) setSelectedCard(social.id);
      }}
      onDrop={() => {
        if (dashboard) setSelectedCard("");
      }}
      key={social.order}
      style={{
        background,
        border: "2px solid" + main + "20",
        opacity: selectedCard === social.id ? "0%" : "100%",
        // transform:
        // selectedCard === social.id ? "rotate(30deg)" : "rotate(0deg)",
        // animation: selected ? "shake .2s infinite" : "",
      }}
      className={` cursor-grab  w-full aspect-square rounded-3xl p-3 hover:shadow-xl transition-all duration-300 group relative ${
        list.gridType === 1 ? "h-24" : "h-48"
      }`}
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
          className="opacity-0 group-hover:opacity-100 transition-all duration-300 absolute -top-1 -left-4 bg-white p-2 rounded-full shadow-xl shadow-zinc-400 pointer-events-none  group-hover:pointer-events-auto cursor-pointer z-[999999]"
        >
          <Trash></Trash>
        </Button>
      )}
      <div className="flex justify-between items-start ">
        <div
          style={{
            width: list.gridType === 4 ? "100%" : "",
          }}
          className={`w-2/4 flex flex-col justify-between ${
            list.gridType === 1 ? "h-28" : "h-40"
          }`}
        >
          <div
            className={`space-y-1 relative ${
              list.gridType === 1 && "flex items-center justify-center gap-6"
            }`}
          >
            <img
              className={`w-12 rounded-lg`}
              src={
                socialList.includes(social.site)
                  ? icon
                  : `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${social.link}/&size=256`
              }
              alt=""
            />
            {dashboard ? (
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
                style={{
                  color: text || "#000",
                }}
                className={`${
                  dashboard && "hover:bg-opacity-50 hover:bg-zinc-400"
                } p-1 text-xl font-bold  text-zinc-700 focus-within:outline-none bg-transparent  ${
                  list.gridType === 4
                    ? "w-full"
                    : list.gridType === 2
                    ? "w-full"
                    : list.gridType === 1
                    ? "w-full"
                    : "w-full"
                }   resize-none rounded-xl duration-200 h-fit`}
              ></textarea>
            ) : (
              <div
                style={{
                  color: text,
                }}
                className={`${
                  dashboard && "hover:bg-opacity-50 hover:bg-zinc-400"
                } p-1 text-xl font-bold  text-zinc-700 focus-within:outline-none bg-transparent  ${
                  list.gridType === 4
                    ? "w-full"
                    : list.gridType === 2
                    ? "w-full"
                    : list.gridType === 1
                    ? "w-full"
                    : "w-full"
                }   resize-none rounded-xl duration-200  line-clamp-2 h-fit  hover:text-clip`}
              >
                {social.title}
              </div>
            )}
          </div>

          {list.gridType !== 1 && (
            <div className="">
              {social.otherData.channel && (
                <div className={`flex items-center justify-start gap-3 `}>
                  <div className="text-white font-semibold bg-red-600 w-fit rounded-lg p-2 flex  gap-2 text-sm ">
                    Subscribe{" "}
                    <p className="text-red-200">
                      {numberFormatter(social.otherData.subscriberCount)}
                    </p>
                  </div>
                  {list.gridType !== 4 && (
                    <div className="w-fit text-black flex items-center gap-2 text-sm">
                      <p className="">
                        {numberFormatter(social.otherData.videoCount)}
                      </p>
                      Videos
                    </div>
                  )}
                </div>
              )}
              {/* //! BUTTON CONDITIONING */}
              {social.site === "instagram" && (
                <div className={`flex items-center justify-start gap-3 `}>
                  <div className="text-white font-semibold bg-blue-500 w-fit rounded-lg p-2 flex  gap-2 text-sm ">
                    Follow{" "}
                    <p className="text-white">
                      {numberFormatter(social.otherData.followers)}
                    </p>
                  </div>
                  {list.gridType !== 4 && (
                    <div className="w-fit text-black flex items-center gap-1 text-sm">
                      <p className="">
                        {numberFormatter(social.otherData.posts)}
                      </p>
                      Post(s)
                    </div>
                  )}
                </div>
              )}
              {social.site === "twitter" && (
                <div className={`flex items-center justify-start gap-3 `}>
                  <div className="text-white font-semibold bg-blue-500 w-fit rounded-lg p-2 flex  gap-2 text-sm ">
                    Follow{" "}
                    <p className="text-white">
                      {numberFormatter(social.otherData.sub_count)}
                    </p>
                  </div>
                  {/* {list.gridType !== 4 && (
                  <div className="w-fit text-black flex items-center gap-1 text-sm">
                    <p className="">{social.otherData.posts}</p>
                    Post(s)
                  </div>
                )} */}
                </div>
              )}
              {social.site === "spotify" &&
                social.otherData.type === "user" && (
                  <div className={`flex items-center justify-start gap-3 `}>
                    <div className="text-white font-semibold bg-green-500 w-fit rounded-lg p-2 flex  gap-2 text-sm ">
                      Follow{" "}
                      <p className="text-white">
                        {
                          // @ts-ignore
                          social?.otherData?.followers?.total
                        }
                      </p>
                    </div>
                  </div>
                )}
              {social.site === "spotify" &&
                (social.otherData.type === "album" ||
                  social.otherData.type === "track" ||
                  social.otherData.type === "playlist") && (
                  <div className={`flex items-center justify-start gap-3 `}>
                    <div className="text-white font-semibold bg-green-500 w-fit rounded-lg p-2 flex  gap-2 text-sm ">
                      <PlayCircle></PlayCircle> Listen{" "}
                      {/* <p className="text-white">
                    {
                      // @ts-ignore
                      social?.otherData?.followers?.total
                    }
                  </p> */}
                    </div>
                  </div>
                )}
              {social.site === "spotify" &&
                social.otherData.type === "artist" && (
                  <div className={`flex items-center justify-start gap-3 `}>
                    <div className="text-white font-semibold bg-green-500 w-fit rounded-lg p-2 flex  gap-2 text-sm ">
                      Listen{" "}
                      <p className="text-white">
                        {
                          // @ts-ignore
                          numberFormatter(social?.otherData?.followers?.total)
                        }
                      </p>
                    </div>
                  </div>
                )}
              {social.site === "github" && social.otherData.type === "User" && (
                <div className={`flex items-center justify-start gap-3 `}>
                  <div className="text-white font-semibold bg-black w-fit rounded-lg p-2 flex  gap-2 text-sm ">
                    Follow{" "}
                    <p className="text-white">{social.otherData.followers}</p>
                  </div>
                  {list.gridType !== 4 && (
                    <div className="w-fit text-black flex items-center gap-1 text-sm">
                      <p className="">{social.otherData.public_repos}</p>
                      Repositories
                    </div>
                  )}
                </div>
              )}
              {social.site === "github" && social.otherData.type === "Repo" && (
                <div className={`flex items-center justify-start gap-3 `}>
                  <div className="text-white font-semibold bg-black w-fit rounded-lg p-2 flex  gap-2 text-sm ">
                    Star{" "}
                    <p className="text-white">
                      {social.otherData.stargazers_count}
                    </p>
                  </div>
                  {list.gridType !== 4 && (
                    <div className="w-fit text-black flex items-center gap-1 text-sm">
                      <p className="">
                        {social.otherData.homepage && (
                          <a
                            target="_blank"
                            className="bg-blue-400 p-2 text-white font-semibold rounded-md"
                            href={social.otherData.homepage}
                          >
                            Visit
                          </a>
                        )}
                      </p>
                    </div>
                  )}
                </div>
              )}
              {/* //! BUTTON CONDITIONING ENDS */}
            </div>
          )}
        </div>
        <input
          disabled={!dashboard}
          onChange={async (e) => {
            if (dashboard) {
              const response = await uploadThumbnail(e.target.files![0]);
            }
          }}
          id={social.id}
          className="hidden"
          type="file"
        />
        {social.otherData.thumbnail || social.site ? (
          <label
            htmlFor={social.id}
            className={`${
              dashboard && "hover:brightness-75 duration-150"
            } relative group `}
          >
            {social.site === "youtube" ? (
              <>
                {(list.gridType === 2 || list.gridType === 1) && (
                  <div
                    style={{
                      // width: list.gridType === 1 ? "50%" : "",
                      display: "flex",
                      justifyContent: list.gridType === 1 ? "flex-end" : "",
                    }}
                    className="w-full h-48"
                  >
                    <img
                      className={` object-cover ${
                        social.otherData.channel
                          ? "rounded-full w-40"
                          : "rounded-xl w-full"
                      }
                      ${list.gridType === 1 ? "h-16 w-fit" : "h-40"}
                      `}
                      src={
                        // fetch("/banners/" + social.site + ".png")
                        social.otherData.thumbnail || banner
                      }
                      alt=""
                    />
                  </div>
                )}
              </>
            ) : social.site === "spotify" ? (
              <>
                {(list.gridType === 2 || list.gridType === 1) && (
                  <div
                    style={{
                      // width: list.gridType === 1 ? "50%" : "",
                      display: "flex",
                      justifyContent: list.gridType === 1 ? "flex-end" : "",
                    }}
                    className="w-full h-48"
                  >
                    <img
                      className={`h-40 object-cover ${
                        social.otherData.type === "user"
                          ? "rounded-full w-40"
                          : "rounded-xl w-full"
                      }
                      ${list.gridType === 1 ? "h-16 w-fit" : "h-40"}`}
                      src={social.otherData.thumbnail || banner}
                      alt=""
                    />
                  </div>
                )}
              </>
            ) : social.site === "instagram" ? (
              <>
                {(list.gridType === 2 || list.gridType === 1) && (
                  <div
                    style={{
                      // width: list.gridType === 1 ? "50%" : "",
                      display: "flex",
                      justifyContent: list.gridType === 1 ? "flex-end" : "",
                    }}
                    className="w-full h-48"
                  >
                    <img
                      className={`h-40 object-cover rounded-full w-40 
                      ${list.gridType === 1 ? "h-16 w-fit" : "h-40"}
                      `}
                      src={social.otherData.thumbnail || banner}
                      alt=""
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                {(list.gridType === 2 || list.gridType === 1) && (
                  <div
                    style={{
                      // width: list.gridType === 1 ? "50%" : "",
                      display: "flex",
                      justifyContent: list.gridType === 1 ? "flex-end" : "",
                    }}
                    className="w-full h-48"
                  >
                    <img
                      className={` object-cover w-40    ${
                        // ""
                        social?.site !== "" && social.otherData.thumbnail
                          ? "w-40 h-40 rounded-full"
                          : "w-52 h-40 rounded-lg"
                      }
                      ${
                        list.gridType === 1
                          ? "h-16 w-fit aspect-square"
                          : "h-40"
                      }`}
                      src={social.otherData.thumbnail || banner}
                      alt=""
                    />
                  </div>
                )}
              </>
            )}
          </label>
        ) : (
          <label
            htmlFor={social.id}
            className={`${
              dashboard && "hover:brightness-75 duration-150"
            } relative group `}
          >
            <>
              {(list.gridType === 2 || list.gridType === 1) && (
                <div
                  style={{
                    // width: list.gridType === 1 ? "50%" : "",
                    display: "flex",
                    justifyContent: list.gridType === 1 ? "flex-end" : "",
                  }}
                  className="w-full h-48"
                >
                  <div
                    className={`  bg-zinc-100 w-48 h-40 rounded-lg flex justify-center items-center text-center text-sm font-bold text-zinc-400
                    ${list.gridType === 1 ? "h-16 w-fit px-3" : "h-40"}
                    `}
                  >
                    {dashboard ? "No thumbnail" : ""}{" "}
                  </div>
                </div>
              )}
            </>
          </label>
        )}
      </div>
    </div>
  );
}
