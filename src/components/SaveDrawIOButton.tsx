import React from "react";
import "../App.css";
import { convert } from "@whitebite/diagram-converter";

interface SaveDrawIOButton {
  label?: string;
  SvgImage?: string;
  definition: string;
  fileName: string;
}

export function SaveDrawIOButton({
  label,
  SvgImage,
  definition,
  fileName,
}: SaveDrawIOButton): React.JSX.Element {
  async function handleSaveMmd() {
    if (!definition.trim()) return;
    const drawIoXml = await convert(definition, {
      from: "mermaid",
      to: "drawio",
    });

    // Ensure the file has a .mmd extension instead of .svg
    const baseName = fileName.replace(/\.[^/.]+$/, "");
    const exportName = `${baseName}.drawio`;

    // Create a blob with plain text formatting
    const blob = new Blob([drawIoXml.output], {
      type: "application/xml;charset=utf-8",
    });
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
