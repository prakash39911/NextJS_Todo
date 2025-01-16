"use client";

import { NextUIProvider } from "@nextui-org/react";
import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

const contextClass = {
  success: "bg-gray-800",
  error: "bg-red-600",
  info: "bg-gray-600",
  warning: "bg-orange-400",
  default: "bg-indigo-600",
  dark: "bg-white-600 font-gray-300",
};

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <NextUIProvider>
      <ToastContainer
        toastClassName={(context) =>
          contextClass[context?.type || "default"] +
          " relative flex p-1 min-h-10 rounded-lg justify-between overflow-hidden cursor-pointer"
        }
        position="bottom-right"
        autoClose={3000}
      />
      {children}
    </NextUIProvider>
  );
}
