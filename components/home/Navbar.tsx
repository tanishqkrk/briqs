"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
export default function Navbar() {
  return (
    <motion.header
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay: 0.5,
      }}
      className="p-3 px-40 flex justify-between items-center fixed w-full top-0 max-lg:px-10 max-md:px-6"
    >
      <div className="flex items-center space-x-4 w-1/6">
        <div>
          <img className="w-12 max-w-12" src="/logo.svg" alt="" />
        </div>
        <div className="text-theme text-xl font-semibold">BRIQS</div>
      </div>

      <div className="flex gap-6 items-center">
        <Button className="max-md:hidden" variant={"outline"}>
          View Examples
        </Button>
        <Button className="" variant={"default"}>
          <Link href={"/signup"}>Get your link now!</Link>
        </Button>
      </div>
    </motion.header>
  );
}
