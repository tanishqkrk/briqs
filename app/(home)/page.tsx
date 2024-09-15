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
import Image from "next/image";

export default function Home() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const [available, setAvailable] = useState(false);

  const [reason, setReason] = useState("");

  let checkSlug = useDebounce(async (slug: string) => {
    console.log(!!name);
    setLoading(true);
    try {
      const response = await getDoc(doc(db, "data", slug.trim()));
      const data = response.data();
      setLoading(false);
      if (!name) {
        setAvailable(false);
        setReason("Enter a name");
      }
      if (data && name) {
        setAvailable(false);
        setReason("Already taken");
      }
      if (!data && name) setAvailable(true);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  });

  useEffect(() => {
    checkSlug(name);
  }, [name]);

  return (
    <main className="h-screen overflow-hidden relative pt-36 flex flex-col items-center justify-stretch gap-20">
      <section className="hero flex justify-center flex-col items-center  space-y-10 max-md:px-3 max-md:space-y-6 h-fit w-full">
        <motion.div
          initial={{
            opacity: 0,
            scale: 1.2,
            // rotate: 120,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          className="text-5xl text-zinc-800 text-center w-2/3 max-lg:text-4xl max-lg:w-3/4 max-md:text-2xl max-sm:w-full"
        >
          From blank page to brag page, <br className="max-md:hidden" />{" "}
          let&apos;s create a{" "}
          <span
            style={{
              textDecoration: "blue wavy underline",
            }}
            className="underline"
          >
            portfolio
          </span>{" "}
          that wows.
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            scale: 1.2,
            // rotate: 120,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 0.5,
          }}
          className=" text-center text-zinc-600 max-lg:text-sm"
        >
          A link-tree page is for all your links, a web portfolio is your
          digital resume. <br className="max-md:hidden" /> Why not have
          everything, EVERYTHING, in one place?
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            scale: 1.2,
            // rotate: 120,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 0.6,
          }}
          className="flex items-center justify-center gap-3 max-md:flex-col max-md:w-full"
        >
          <div className="max-md:w-full">
            <div className="relative max-md:w-full">
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
                className="w-fit pl-20 max-md:w-full"
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
            className="max-md:w-full"
          >
            <Link href="/signup">Get your link now!</Link>
          </Button>
        </motion.div>
      </section>
      <motion.img
        initial={{
          opacity: 0,
          y: 100,
          // rotate: 120,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.2,
        }}
        style={
          {
            // transform: "rotateX(-20deg)",
          }
        }
        className=" shadow-2xl shadow-[#00000060] w-3/5 max-lg:w-3/4 max-md:w-4/5  rounded-xl"
        alt="hero"
        src="/hero.png"
      ></motion.img>
      {/* <section className="w-3/4 ">
      </section> */}
    </main>
  );
}
