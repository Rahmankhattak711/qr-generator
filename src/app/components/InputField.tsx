import React from "react";

export default function InputField({ ...props }:any) {
  return (
    <div>
      {" "}
      <input
        className=" w-full border-none bg-gray-600 text-white rounded-md p-2"
        {...props}
      />
    </div>
  );
}
