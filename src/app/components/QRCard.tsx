import { QRCodeCanvas } from "qrcode.react";

export const QRCard: React.FC<{
  name: string;
  email: string;
  url: string;
}> = (props) => {
  const qrImage = process.env.QRIMAGE || "none";
  const color = process.env.TEXTCOLOR || "#000000";
  const bgcolor = process.env.BGCOLOR || "#ffffff";

  console.log("QRImage:", props);

  return (
    <div className="flex gap-5 flex-col items-center p-4 bg-white shadow">
      <QRCodeCanvas
        value={props.url}
        size={256}
        level="L"
        fgColor={color}
        bgColor={bgcolor}
        imageSettings={{
          src: qrImage,
          height: 70,
          width: 70,
          excavate: true,
        }}
      />
      <h2 className="text-red-500">{props.name}</h2>
    </div>
  );
};
