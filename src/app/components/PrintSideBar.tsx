"use client";
import React from "react";
import { QRCard } from "./QRCard";

interface Props {
  data: any[];
  columns: {
    name: string;
    Code_postal: string;
    Numéro_magasin: string;
    url?: string;
  };
  canGenerate: boolean;
}

export default function PrintSideBar({ data, columns, canGenerate }: Props) {
  return (
    <div className="w-full flex flex-col py-6 gap-6">
      {canGenerate &&
        data.map((row, index) => {
          const name = row[columns.name];
          const mg = row[columns.Numéro_magasin];
          const Code_postal = row[columns.Code_postal];
          const url = `https://talent.lavieenrose.com/${mg}/${Code_postal}`;

          return (
            <div key={index} className="w-full flex justify-center">
              <QRCard
                key={index}
                name={name}
                Numéro_magasain={mg}
                Code_postal={Code_postal}
                url={url}
              />
            </div>
          );
        })}
    </div>
  );
}
