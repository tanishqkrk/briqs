"use client";

import Link from "next/link";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <header className="p-3 px-40 flex justify-between items-center fixed w-full top-0">
      <div className="flex items-center space-x-4 w-1/6">
        <div>
          <img className="w-16" src="/logo.svg" alt="" />
        </div>
        <div className="text-theme text-xl font-semibold">BRIQS</div>
      </div>
      <div className="flex items-cener justify-center gap-12">
        <div>
          <Link className="header_link" href={"/"}>
            Homepage
          </Link>
        </div>
        <div>
          <Link className="header_link" href={"/"}>
            About us
          </Link>
        </div>
        <div>
          <Link className="header_link" href={"/"}>
            Features
          </Link>
        </div>
        <div>
          <Link className="header_link" href={"/"}>
            Blog
          </Link>
        </div>
        <div>
          <Link className="header_link" href={"/"}>
            Contact us
          </Link>
        </div>
      </div>
      <div className="flex gap-6 items-center">
        <Button variant={"outline"}>Watch Demo</Button>
        <Button variant={"default"}>Get your link now!</Button>
      </div>
    </header>
  );
}
