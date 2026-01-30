import React from "react";
import { Download, Printer } from "lucide-react";
import { colors } from "../../Constants/colors";

interface QRCodePageProps {
  storeName: string;
  storeAddress: string;
}

const QRCodePage: React.FC<QRCodePageProps> = ({
  storeName,
  storeAddress,
}) => {
  const handleDownload = () => {
    console.log("Download QR Code:", storeName);
  };

  const handlePrint = () => {
    console.log("Print QR Code:", storeName);
  };

  // Mock QR code pattern (simple grid)
  const mockQRPattern = Array(21).fill(null).map(() => 
    Array(21).fill(null).map(() => Math.random() > 0.5)
  );

  return (
    <div className="w-full px-0">
      {/* QR Code Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6 mt-6">
        {/* Store Info */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">{storeName}</h1>
          <p className="text-sm text-gray-600 leading-relaxed">{storeAddress}</p>
        </div>

        {/* Mock QR Code Display */}
        <div className="flex justify-center bg-gray-50 rounded-lg p-6">
          <img className="w-64 h-64 object-contain " src="https://hexdocs.pm/qr_code/2.2.1/docs/qrcode.svg" alt="" />
          <h1></h1>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 mt-6">
        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="w-full py-3 px-4 rounded-full font-semibold text-white flex items-center justify-center gap-2 transition hover:opacity-90"
          style={{ backgroundColor: colors.primary }}
        >
          <Download size={20} />
          Download QR Code
        </button>

        {/* Print Button */}
        <button
          onClick={handlePrint}
          className="w-full py-3 px-4 rounded-full font-semibold flex items-center justify-center gap-2 transition border-2"
          style={{
            borderColor: colors.primary,
            color: colors.primary,
          }}
        >
          <Printer size={20} />
          Print QR Code
        </button>
      </div>
    </div>
  );
};

export default QRCodePage;