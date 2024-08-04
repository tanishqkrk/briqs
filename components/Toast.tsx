"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ToastComponent() {
  return (
    <div className="fixed">
      <ToastContainer />
    </div>
  );
}
