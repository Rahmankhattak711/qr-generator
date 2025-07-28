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
    form: string;
  };
  canGenerate: boolean;
}

export default function FormQr({ data, columns, canGenerate }: Props) {
  return (
    <div>
      <div className=" w-full flex flex-col py-4 ">
        {canGenerate &&
          data.map((row, index) => {
            const name = "forme spontanée";
            const mg = row[columns.Numéro_magasin];
            const Code_postal = row[columns.Code_postal];
            const form = "form";
            const url = `https://talent.lavieenrose.com/${mg}/${Code_postal}/${form}`;

            return (
              <div key={index} className="h-screen flex ">
                <QRCard
                  key={index}
                  name={name}
                  Numéro_magasin={mg}
                  Code_postal={Code_postal}
                  url={url}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
