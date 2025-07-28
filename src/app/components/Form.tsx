import React from "react";
import InputField from "./InputField";

export default function Form({
  data,
  columns,
  setColumns,
  canGenerate,
  handleSubmit,
  generateQR,
  reactToPrintFn
}: any) {
  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name Column</label>
          <InputField
            type="text"
            placeholder="name"
            onChange={(e: any) =>
              setColumns((prev:any) => {
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
              setColumns((prev:any) => {
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
              setColumns((prev:any) => {
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
          className="border-black disabled:bg-gray-300 cursor-pointer w-full rounded-md bg-gray-600 p-2"
        >
          Generate QR Codes
        </button>

        <div>
          {canGenerate && (
            <div className="mb-6">
              <button
                onClick={reactToPrintFn}
                className="w-full rounded-md bg-[#633654] cursor-pointer text-white p-2 "
              >
                Print QR Codes
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
