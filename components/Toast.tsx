"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Toast() {
  return (
    <div className="fixed">
      <ToastContainer />
    </div>
  );
}
