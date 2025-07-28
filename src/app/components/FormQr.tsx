"use client";
import React from "react";
import { QRCard } from "./QRCard";
import '../globals.css';

interface Props {
  data: any[];
  columns: {
    name: string;
    appName: string;
    Code_postal: string;
    Numéro_magasin: string;
    url?: string;
    form: string;
  };
  canGenerate: boolean;
}

export default function FormQr({ data, columns, canGenerate }: Props) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-6 gap-6">
      {canGenerate &&
        data.map((row, index) => {
          const appName = "Candidature spontanée";
          const name = row[columns.name];
          const mg = row[columns.Numéro_magasin];
          const Code_postal = row[columns.Code_postal];
          const form = "form";
          const url = `https://talent.lavieenrose.com/${mg}/${Code_postal}/${form}`;

          return (
            <div key={index} className="w-full flex justify-center print">
              <QRCard
                name={name}
                appName={appName}
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
