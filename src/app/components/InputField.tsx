"use client";
import React from "react";

export default function InputField({ ...props }: any) {
  return (
    <div>
      <input
        className="w-full border-none bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        {...props}
      />
    </div>
  );
}
