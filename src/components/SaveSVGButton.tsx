import React from "react";
import "../App.css";

interface ExportButtonProps {
  label?: string;
  SvgImage?: string;
  onExport: () => void;
}

export function SaveSVGButton({
  SvgImage,
  label,
  onExport,
}: ExportButtonProps): React.JSX.Element {
  return (
    <button className="panel-button"  onClick={onExport}>
      {SvgImage && (
        <img src={SvgImage} alt="" style={{ width: "20px", height: "20px" }} />
      )}
      
      {label || "Save"}
    </button>
  );
}
