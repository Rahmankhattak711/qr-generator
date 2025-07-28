"use client";
import React from "react";
import { QRCard } from "./QRCard";
import "../globals.css";

interface Props {
  data: any[];
  columns: {
    name: string;
    Code_postal: string;
    Numéro_magasin: string;
    url?: string;
  };
  canGenerate: boolean;
  contentRef: React.RefObject<HTMLDivElement>;
  reactToPrintFn: () => void;
}

export default function PrintSideBar({
  data,
  columns,
  canGenerate,
  contentRef,
  reactToPrintFn,
}: Props) {
  return (
    <div className="bg-gray-700 min-h-screen w-full overflow-auto p-4">
      {/* Print Button */}
      {canGenerate && (
        <div className="mb-6">
          <button
            onClick={reactToPrintFn}
            className="w-44 rounded-md bg-[#7A4B68] text-white p-2 shadow hover:bg-[#633654]"
          >
            Print QR Codes
          </button>
        </div>
      )}

      {/* QR Code Cards */}
      <div
        ref={contentRef}
        className="grid grid-cols-1 gap-6 justify-items-center"
      >
        {canGenerate &&
          data.map((row, index) => {
            const name = row[columns.name];
            const mg = row[columns.Numéro_magasin];
            const Code_postal = row[columns.Code_postal];
            const url = `https://talent.lavieenrose.com/${mg}/${Code_postal}`;

            return (
              <QRCard
                key={index}
                name={name}
                Numéro_magasin={mg}
                Code_postal={Code_postal}
                url={url}
              />
            );
          })}
      </div>
    </div>
  );
}
