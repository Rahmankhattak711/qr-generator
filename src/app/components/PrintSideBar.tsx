"use client";
import React, { useState } from "react";
import { QRCard } from "./QRCard";
import "../globals.css";

export default function PrintSideBar({
  data,
  columns,
  canGenerate,
  contentRef,
  reactToPrintFn,
}: any) {
  return (
    <div className="bg-gray-700 h-screen">
      <div className="flex flex-col h-auto gap-4 bg-gray-700 p-4">
        {canGenerate ? (
          <button
            onClick={reactToPrintFn}
            className="border-black w-44 rounded-md bg-gray-600 p-2"
          >
            Print QR Codes
          </button>
        ) : null}

        <div
          className=" w-full flex gap-2 flex-wrap items-center justify-center py-4 "
          ref={contentRef}
        >
          {canGenerate
            ? data.map((row: any, index: number) => {
                return (
                  <div key={index} className="h-screen flex print ">
                    <QRCard
                      // logo={row[columns.logo]}
                      key={index}
                      name={row[columns.name]}
                      Numéro_magasin={row[columns.Numéro_magasin]}
                      postCode={row[columns.postalCode]}
                    />
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}
