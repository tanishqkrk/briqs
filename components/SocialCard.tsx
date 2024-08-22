"use client";

import {
  ContentTypeInterface,
  SocialType,
  UserDataInterface,
} from "@/interfaces/UserDataInterface";
import { returnStyles } from "@/utils/ReturnStyles";
import { Button } from "./ui/button";
import { Divide, Trash } from "lucide-react";
import { socialList } from "@/themes/default/DefaultTheme";
import { numberFormatter } from "@/utils/numberFormatter";

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
  console.log(social);
  // @ts-ignore
  const { main, background, icon, text } = returnStyles(social.site);
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
      className="h-48 cursor-grab  w-full aspect-square rounded-3xl p-3 hover:shadow-xl transition-all duration-300 group relative "
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
      <div className="flex justify-between items-start ">
        <div
          style={{
            width: list.gridType === 4 ? "100%" : "",
          }}
          className="w-2/4 h-40  flex flex-col justify-between "
        >
          <div className="space-y-1">
            <img
              className={`w-12 `}
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
                <p className="text-white">{social.otherData.followers}</p>
              </div>
              {list.gridType !== 4 && (
                <div className="w-fit text-black flex items-center gap-1 text-sm">
                  <p className="">{social.otherData.posts}</p>
                  Post(s)
                </div>
              )}
            </div>
          )}
          {social.site === "twitter" && (
            <div className={`flex items-center justify-start gap-3 `}>
              <div className="text-white font-semibold bg-blue-500 w-fit rounded-lg p-2 flex  gap-2 text-sm ">
                Follow{" "}
                <p className="text-white">{social.otherData.sub_count}</p>
              </div>
              {/* {list.gridType !== 4 && (
                <div className="w-fit text-black flex items-center gap-1 text-sm">
                  <p className="">{social.otherData.posts}</p>
                  Post(s)
                </div>
              )} */}
            </div>
          )}
          {social.site === "spotify" && social.otherData.type === "user" && (
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
              social.otherData.type === "track") && (
              <div className={`flex items-center justify-start gap-3 `}>
                <div className="text-white font-semibold bg-green-500 w-fit rounded-lg p-2 flex  gap-2 text-sm ">
                  Listen{" "}
                  {/* <p className="text-white">
                  {
                    // @ts-ignore
                    social?.otherData?.followers?.total
                  }
                </p> */}
                </div>
              </div>
            )}
          {social.site === "spotify" && social.otherData.type === "artist" && (
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
        {social.site === "youtube" ? (
          <>
            {(list.gridType === 2 || list.gridType === 1) && (
              <div
                style={{
                  width: list.gridType === 1 ? "50%" : "",
                  display: "flex",
                  justifyContent: list.gridType === 1 ? "flex-end" : "",
                }}
                className="w-fit h-48"
              >
                <img
                  className={`h-40 object-cover ${
                    social.otherData.channel
                      ? "rounded-full w-40"
                      : "rounded-xl w-full"
                  }`}
                  src={
                    social.otherData.thumbnail ||
                    "/banners/" + social.site + ".png"
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
                  width: list.gridType === 1 ? "50%" : "",
                  display: "flex",
                  justifyContent: list.gridType === 1 ? "flex-end" : "",
                }}
                className="w-fit h-48"
              >
                <img
                  className={`h-40 object-cover ${
                    social.otherData.type === "user"
                      ? "rounded-full w-40"
                      : "rounded-xl w-full"
                  }`}
                  src={
                    social.otherData.thumbnail ||
                    "/banners/" + social.site + ".png"
                  }
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
                  width: list.gridType === 1 ? "50%" : "",
                  display: "flex",
                  justifyContent: list.gridType === 1 ? "flex-end" : "",
                }}
                className="w-fit h-48"
              >
                <img
                  className={` object-cover   ${
                    social.otherData.thumbnail
                      ? "w-40 h-40 rounded-full"
                      : "w-52 h-40 rounded-lg"
                  }`}
                  src={
                    social.otherData.thumbnail ||
                    "/banners/" + social.site + ".png"
                  }
                  alt=""
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
