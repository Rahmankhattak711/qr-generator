"use client";
import { useState } from "react";
import * as XLSX from "xlsx";
import { QRCard } from "./QRCard";

export default function UploadExcelSheet() {
  const [data, setData] = useState<any>([]);
  const [qrValue, setQrValue] = useState("");
  const [userId, setUserId] = useState("");

  const [columns, setColumns] = useState<Record<string, string>>({
    name: "",
    email: "",
    url: "",
  });

  const [canGenerate, setCanGenerate] = useState(false);

  const generateQR = () => {
    const _canGenerate = Object.keys(columns).every((key) => {
      if (columns[key] === "") {
        return false;
      }
      return true;
    });

    setCanGenerate(_canGenerate);
  };

  const qrUrl = `https://github.com/${qrValue}`;
  console.log("QR:", qrUrl);

  const handleFileUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const binaryStr = evt.target?.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const sheetData: any[][] = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      });
      console.log("Sheet Data:", sheetData);
      const headers = sheetData[0];
      const rows = sheetData.slice(1);
      const dataAsObjects = rows.map((row) =>
        headers.reduce((obj, header, index) => {
          obj[header] = row[index];
          return obj;
        }, {} as { [key: string]: any })
      );
      console.log("Data as Objects:", dataAsObjects);
      setData(dataAsObjects);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="w-full bg-gray-800 min-h-screen py-10 text-white">
      <div className="flex  items-center justify-center flex-col w-full h-auto py-10">
        <input
          className="p-2 w-[60%] bg-gray-600 rounded-md mb-6"
          type="file"
          accept=".xlsx, .xls"
          placeholder="Upload Excel Sheet"
          onChange={handleFileUpload}
        />

        <form
          className="mt-6 flex flex-col gap-4 w-[60%]"
          onSubmit={(e) => {
            e.preventDefault();
            generateQR();
          }}
        >
          <input
            className="flex-1 border-none bg-gray-600 text-white rounded-md p-2"
            type="text"
            placeholder="name column"
            onChange={(e) =>
              setColumns((prev) => ({ ...prev, name: e.target.value }))
            }
            value={columns.name}
          />
          <input
            className="flex-1 border-none bg-gray-600 text-white rounded-md p-2"
            type="text"
            placeholder="email column"
            onChange={(e) =>
              setColumns((prev) => ({ ...prev, email: e.target.value }))
            }
            value={columns.email}
          />
          <input
            className="flex-1 border-none bg-gray-600 text-white rounded-md p-2"
            type="text"
            placeholder="url column"
            onChange={(e) =>
              setColumns((prev) => ({ ...prev, url: e.target.value }))
            }
            value={columns.url}
          />
          <button
            type="submit"
            className="border-black rounded-md bg-gray-600 p-2"
          >
            Generate QR
          </button>
        </form>

        {canGenerate
          ? data.map((row, index) => {
              console.log("Row:", row);
              return (
               <div className="flex gap-2">
                 <QRCard
                  key={index}
                  name={row[columns.name]}
                  email={row[columns.email]}
                  url={row[columns.url]}
                />
               </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
