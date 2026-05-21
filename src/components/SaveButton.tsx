import React from "react";
import "../App.css";

interface SaveMmdButtonProps {
  label?: string;
  SvgImage?: string;
  definition: string;
  fileName: string;
}

export function SaveButton({
  label,
  SvgImage,
  definition,
  fileName,
}: SaveMmdButtonProps): React.JSX.Element {
  
  function handleSaveMmd() {
    if (!definition.trim()) return;

    // Ensure the file has a .mmd extension instead of .svg
    const baseName = fileName.replace(/\.[^/.]+$/, "");
    const exportName = `${baseName}.mmd`;

    // Create a blob with plain text formatting
    const blob = new Blob([definition], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = exportName;
    document.body.appendChild(link);
    link.click();
    
    // Clean up memory
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <button 
      className="panel-button" 
      onClick={handleSaveMmd}
      disabled={!definition.trim()}
      title="Save as MMD file"
    >
      {SvgImage && (
        <img src={SvgImage} alt="" style={{ width: "20px", height: "20px" }} />
      )}
      {label || "Save MMD"}
    </button>
  );
}