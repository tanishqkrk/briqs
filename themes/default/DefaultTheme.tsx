"use client";

import { UserDataInterface } from "@/interfaces/UserDataInterface";
import { useState } from "react";
import { usePathname } from "next/navigation";
import useAuth from "@/context/AuthContext";
import { useEffect } from "react";
import { Image, Plus } from "lucide-react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
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

  // console.log(data);

  return (
    <div className="p-16 flex">
      <div className="w-1/3 flex flex-col gap-8 items-start">
        <div>
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
              <img
                className="w-48 h-48 object-cover rounded-full"
                src={data!.profileImage}
                alt=""
              />
            </label>
          ) : (
            <label htmlFor="pfp">
              <div className="w-48 aspect-square rounded-full border-black bg-gray-200 border-2 border-dashed relative">
                <Image
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  size={50}
                  color="grey"
                ></Image>
              </div>
            </label>
          )}
        </div>
        <div className="space-y-4 flex flex-col ">
          <div>
            <input
              disabled={!dashboard}
              className="text-4xl font-bold focus-within:outline-none bg-transparent"
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
      <div className="w-2/3"></div>
    </div>
  );
}
