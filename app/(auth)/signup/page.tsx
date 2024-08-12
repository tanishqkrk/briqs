"use client";

import ToastComponent from "@/components/Toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuth from "@/context/AuthContext";
import { auth, db } from "@/firebase";
import useDebounce from "@/hooks/useDebounce";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { CircleCheck, CircleX, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
// import {toast}
import { toast } from "react-toastify";

export default function Signup() {
  const { user } = useAuth()!;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const [window, setwindow] = useState(0);
  const [loading, setLoading] = useState(false);

  const [available, setAvailable] = useState(false);

  const [reason, setReason] = useState("");
  let checkSlug = useDebounce(async (slug: string) => {
    setLoading(true);
    try {
      const response = await getDoc(doc(db, "data", slug.trim()));
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
    <div className="flex flex-col justify-center items-center h-full gap-8 w-full">
      <ToastComponent></ToastComponent>
      <div className="flex items-center gap-3">
        <img className="w-16" src="/logo.svg" alt="" />
        <div className="text-3xl text-theme font-semibold">BRIQS</div>
      </div>
      <div className="space-y-2 text-center">
        <div className="text-4xl text-theme font-semibold">Signup</div>
        <div className="text-xl text-black ">Get your own link now</div>
      </div>
      <div className="w-2/3 flex flex-col  gap-6">
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            try {
              const response = await createUserWithEmailAndPassword(
                auth,
                email,
                password
              );
              const userUpload = await setDoc(
                doc(db, "users", response.user.uid),
                {
                  id: response.user.uid,
                  userId: name,
                }
              );
              const dataUpload = await setDoc(doc(db, "data", name), {
                id: response.user.uid,
                userId: name,
                email,
                theme: "Default",
                profileImage: "",
                name: "",
                bio: "",
                subtitle: "",
                content: [],
              });
              toast.success("Account created!", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              router.push("/" + name);
            } catch (err) {
              console.log(err);
            }
          }}
          className=" space-y-3"
        >
          <Input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            className=""
            placeholder="Enter your email"
          ></Input>
          <Input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            className=""
            placeholder="Create a password"
          ></Input>
          <div className="relative ">
            <div className="absolute top-1/2 left-2 -translate-y-1/2">
              briqs.site/
            </div>
            <Input
              value={name}
              onKeyUp={(e) => {
                if (e.key === " ") setName((prev) => prev.replaceAll(" ", "-"));
              }}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="w-full pl-20"
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
          <Button className="w-full">Next</Button>
        </form>
        {/* <div className="text-center">or</div> */}
        {/* <Button
          type="submit"
          className="bg-white text-black hover:bg-slate-200"
          variant={"default"}
        >
          <img src="/google.svg" alt="" />
          <div>Signup with Google</div>
        </Button> */}
      </div>
    </div>
  );
}
