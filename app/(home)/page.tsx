import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  AreaChart,
  BriefcaseBusiness,
  GlobeIcon,
  HandMetal,
  UserRound,
} from "lucide-react";

export default function Home() {
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
            className="underline "
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
          <div className="relative">
            <div className="absolute top-1/2 left-2 -translate-y-1/2">
              briqs.site/
            </div>
            <Input className="w-fit pl-20" placeholder="your-name"></Input>
          </div>
          <Button variant={"default"}>Get your link now!</Button>
        </div>
      </section>
    </main>
  );
}
