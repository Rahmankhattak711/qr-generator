"use client";
import { useState } from "react";
import * as XLSX from "xlsx";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import InputField from "./InputField";
import PrintSideBar from "./PrintSideBar";

export default function UploadExcelSheet() {
  const [data, setData] = useState<any>('');
  const [columns, setColumns] = useState<Record<string, string>>({
    name: "",
    Numéro_magasin: "Numéro_magasin",
    Code_postal: "Code_postal",
  });
  const [canGenerate, setCanGenerate] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const generateQR = () => {
    const _canGenerate =
      Object.keys(columns).every((key) => columns[key] !== "") && fileUploaded;

    setCanGenerate(_canGenerate);
  };

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

      const headers = sheetData[0];
      const rows = sheetData.slice(1);
      const dataAsObjects = rows.map((row) =>
        headers.reduce((obj, header, index) => {
          obj[header] = row[index];
          return obj;
        }, {} as { [key: string]: any })
      );

      setData(dataAsObjects);
      setFileUploaded(true);
    };
    reader.readAsBinaryString(file);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    generateQR();
  };

  return (
    <div className="w-full flex text-white">
      <div className="w-full">
        <PrintSideBar
          data={data}
          columns={
            columns as {
              name: string;
              Code_postal: string;
              Numéro_magasin: string;
              url?: string;
            }
          }
          canGenerate={canGenerate}
          contentRef={contentRef as React.RefObject<HTMLDivElement>}
          reactToPrintFn={reactToPrintFn}
        />
      </div>
      <div className="flex w-[450px] relative items-center flex-col h-screen py-10">
        <div className="sticky top-20 mt-6 w-[80%]">
          <p className="text-sm">Total Rows: {data.length || 0}</p>
          <h1 className="text-3xl my-6">QR Code Generator</h1>

          <InputField
            className="cursor-pointer p-2 rounded-md w-full bg-gray-700 text-center"
            type="file"
            accept=".xlsx, .xls"
            placeholder="Upload Excel Sheet"
            onChange={handleFileUpload}
          />

          {fileUploaded && (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Name Column</label>
                <InputField
                  type="text"
                  placeholder="name"
                  onChange={(e: any) =>
                    setColumns((prev) => {
                      const updated = { ...prev, name: e.target.value };
                      generateQR();
                      return updated;
                    })
                  }
                  value={columns.name}
                />

                <label htmlFor="Code_postal">Code_postal Column</label>
                <InputField
                  type="text"
                  placeholder="Code_postal"
                  onChange={(e: any) =>
                    setColumns((prev) => {
                      const updated = { ...prev, Code_postal: e.target.value };
                      generateQR();
                      return updated;
                    })
                  }
                  value={columns.Code_postal}
                />

                <label htmlFor="Numéro_magasin">Numéro_magasin Column</label>
                <InputField
                  type="text"
                  placeholder="Numéro_magasin"
                  onChange={(e: any) =>
                    setColumns((prev) => {
                      const updated = {
                        ...prev,
                        Numéro_magasin: e.target.value,
                      };
                      generateQR();
                      return updated;
                    })
                  }
                  value={columns.Numéro_magasin}
                />
              </div>

              <button
                type="submit"
                disabled={!canGenerate}
                className="border-black disabled:bg-gray-300 w-full rounded-md bg-gray-600 p-2"
              >
                Generate
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
