import { QRCodeCanvas } from "qrcode.react";
import RoundedBall from "./RoundedBall";

export const QRCard: React.FC<{
  Numéro_magasin: string;
  name: string;
  postCode: string;
}> = (props) => {
  const logo =
    process.env.QR_LOGO ||
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjpYm11UolM_ZZU_hC_KtNY_eIDU9bl1pVcrB67Ha-2azztnZ4G8BdRtNHxVx0Te6n2-g&usqp=CAU";
  const color = process.env.TEXT_COLOR || "#4A235A";
  const bgcolor = process.env.BG_COLOR || "#F9F7FA";
  const url = process.env.QR_URL || "https://talent.lavieenrose.com";

  return (
    <div className="relative flex justify-center flex-col items-center rounded-md gap-4 h-[32rem] w-72 bg-[#F9F7FA] border-[1px] border-gray-300 overflow-hidden">
      <h1 className="text-md font-bold text-gray-100 z-500 mb-6">
        {props.name}
      </h1>

      <div className="absolute left-[-180px] bg-[#7A4B68] top-20 z-80">
        <RoundedBall />
      </div>

      <div className="absolute right-[60px] -top-20 z-40">
        <RoundedBall bgColor="bg-[#7A4B68]" />
      </div>

      <div className="absolute right-[-200px] bottom-52 z-50">
        <RoundedBall height="h-96" width="w-96" bgColor="bg-[#7A4B68]" />
      </div>

      <div className="backdrop-blur-xl bg-white/60 py-14 rounded-md px-6 z-100 shadow-lg">
        <div className="flex gap-5 flex-col items-center p-2 bg-white rounded shadow">
          <QRCodeCanvas
            value={url}
            size={150}
            level="L"
            fgColor={color}
            bgColor={bgcolor}
            imageSettings={{
              src: logo,
              height: 40,
              width: 40,
              excavate: true,
            }}
          />
        </div>
        <h2 className="text-white font-bold text-center py-1 bg-[#7A4B68] p-2 mt-8 rounded-md shadow-md">
          Scannez-moi
        </h2>
      </div>
    </div>
  );
};
