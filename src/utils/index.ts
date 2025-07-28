import * as XLSX from "xlsx";

export const handleFileUpload = ({ e, setData, setFileUploaded }: any) => {
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
