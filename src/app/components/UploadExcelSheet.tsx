"use client";
import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import InputField from "./InputField";
import PrintSideBar from "./PrintSideBar";
import FormQr from "./FormQr";
import Form from "./Form";
import { handleFileUpload } from "@/utils";
import '../globals.css';

export default function UploadExcelSheet() {
  const [data, setData] = useState<any>("");
  const [columns, setColumns] = useState<Record<string, string>>({
    name: "",
    Numéro_magasin: "Numéro_magasin",
    Code_postal: "Code_postal",
    form: "form",
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    generateQR();
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white flex flex-col md:flex-row gap-8 p-6 md:p-10">
      {/* QR Code Display Section */}
      <div ref={contentRef} className="w-full md:w-1/2 flex flex-col items-center justify-start gap-6">
        <FormQr
          data={data}
          columns={{
            appName: "Candidature spontanée",
            name: columns.name,
            Code_postal: columns.Code_postal,
            Numéro_magasin: columns.Numéro_magasin,
            form: columns.form,
          }}
          canGenerate={canGenerate}
        />
      </div>

      {/* Sticky Sidebar */}
      <div className="w-full md:w-[400px] lg:w-[500px] sticky top-0 h-fit md:h-screen flex flex-col items-center py-8 bg-gray-800 shadow-lg">
        <div className="w-[85%] flex flex-col gap-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">QR Code Generator</h1>
            <p className="text-sm text-gray-300">Total Rows: {data.length || 0}</p>
          </div>

          <InputField
            className="cursor-pointer p-3 rounded-lg w-full bg-gray-700 text-white text-center hover:bg-gray-600 transition duration-200"
            type="file"
            accept=".xlsx, .xls"
            placeholder="Upload Excel Sheet"
            onChange={(e: any) =>
              handleFileUpload({ e, setData, setFileUploaded })
            }
          />

          {fileUploaded && (
            <Form
              {...{
                data,
                columns,
                setColumns,
                generateQR,
                handleSubmit,
                canGenerate,
                reactToPrintFn,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
