"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import useData from "@/context/DataContext";
import { db } from "@/firebase";
import useDebounce from "@/hooks/useDebounce";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import {
  AreaChart,
  BriefcaseBusiness,
  CircleCheck,
  CircleX,
  GlobeIcon,
  HandMetal,
  Loader,
  LoaderCircle,
  UserRound,
} from "lucide-react";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Home() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const [available, setAvailable] = useState(false);

  const [reason, setReason] = useState("");

  let checkSlug = useDebounce(async (slug: string) => {
    setLoading(true);
    try {
      const response = await getDoc(doc(db, "users", slug.trim()));
      const data = response.data();
      setLoading(false);
      if (data) {
        setAvailable(false);
        setReason("Already taken");
      }
      if (!data) setAvailable(true);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  });

  useEffect(() => {
    checkSlug(name);
  }, [name]);

  return (
    <main>
      <section className="hero flex justify-center flex-col items-center h-screen space-y-10">
        <div className="absolute top-[20%] left-[10%] -rotate-3 rounded-lg bg-theme p-2 shadow-xl">
          <GlobeIcon color="white" size={40} />
        </div>

        <div className="absolute top-[18%] left-[45%] -rotate-3 rounded-lg bg-theme p-2 shadow-xl">
          <UserRound color="white" size={40} />
        </div>

        <div className="absolute top-[40%] left-[90%] -rotate-3 rounded-lg bg-theme p-2 shadow-xl">
          <BriefcaseBusiness color="white" size={40} />
        </div>

        <div className="absolute top-[70%] left-[20%] -rotate-3 rounded-lg bg-theme p-2 shadow-xl">
          <AreaChart color="white" size={40} />
        </div>

        <div className="absolute top-[60%] left-[70%] -rotate-3 rounded-lg bg-theme p-2 shadow-xl">
          <HandMetal color="white" size={40} />
        </div>

        <div className="text-6xl text-zinc-800 text-center w-2/3">
          From blank page to brag page, <br /> let&apos;s create a{" "}
          <span
            style={{
              textDecoration: "blue wavy underline",
            }}
            className="underline"
          >
            portfolio
          </span>{" "}
          that wows.
        </div>
        <div className=" text-center text-zinc-600">
          A link-tree page is for all your links, a web portfolio is your
          digital resume. <br /> Why not have everything, EVERYTHING, in one
          place?
        </div>
        <div className="flex items-center justify-center gap-3">
          <div>
            <div className="relative">
              <div className="absolute top-1/2 left-2 -translate-y-1/2">
                briqs.site/
              </div>
              <Input
                value={name}
                onKeyUp={(e) => {
                  if (e.key === " ")
                    setName((prev) => prev.replaceAll(" ", "-"));
                }}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="w-fit pl-20"
                placeholder="your-name"
              ></Input>
              {loading && (
                <div className="absolute top-1/2 right-2 -translate-y-1/2">
                  <LoaderCircle className="rotate" color="blue" />
                </div>
              )}
              {!loading && (
                <div className="absolute top-1/2 right-2 -translate-y-1/2">
                  {available ? (
                    <CircleCheck color="green" />
                  ) : (
                    <CircleX color="red" />
                  )}
                </div>
              )}
            </div>
            {!available && (
              <div className="absolute text-center text-red-500 left-1/2 -translate-x-1/2">
                {reason}
              </div>
            )}
          </div>

          <Button
            onClick={async () => {
              // await setDoc(doc(db, "users", name.trim()), {
              //   id: name.trim(),
              // });
            }}
            disabled={!available}
            variant={"default"}
          >
            <Link href="/signup">Get your link now!</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
