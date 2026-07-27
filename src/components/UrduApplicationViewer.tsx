import React from "react";
interface UrduApplicationViewerProps {
  generatedApplication: string;
}
/** * UrduApplicationViewer Component * Renders Urdu text using the 'Jameel Noori Nastaleeq Kasheeda' font * with proper RTL direction, line spacing, and padding. */ export const UrduApplicationViewer: React.FC<
  UrduApplicationViewerProps
> = ({ generatedApplication }) => {
  return (
    <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-8 shadow-sm">
      {" "}
      <div className="urdu-text text-gray-900 whitespace-pre-wrap selection:bg-[#8B735B]/20">
        {" "}
        {generatedApplication}{" "}
      </div>{" "}
    </div>
  );
};
export default UrduApplicationViewer;
