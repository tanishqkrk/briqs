"use client";

import {
  ContentTypeInterface,
  SocialType,
  UserDataInterface,
} from "@/interfaces/UserDataInterface";
import { returnStyles } from "@/utils/ReturnStyles";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
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
  // @ts-ignore
  const { main, background, icon } = returnStyles(social.site);
  //   console.log(social.otherData.);

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

          {!social.otherData.channel && (
            <div className="truncate text-ellipsis  text-sm  text-zinc-700">
              {social.link
                .split("")
                .splice(social.link.includes("https") ? 12 : 11)
                .join("")}
            </div>
          )}
          {social.otherData.channel && (
            <div className={`flex items-center justify-start gap-3 `}>
              <div className="text-white font-semibold bg-red-600 w-fit rounded-xl p-2 flex  gap-2 text-sm ">
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
        </div>
        {social.site === "youtube" && (
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
}
