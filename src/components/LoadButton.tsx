import React, { useRef } from "react";

interface LoadButtonProps {
  label?: string;
  SvgImage?: string;
  onDefinitionLoaded: (options: { definition: string; fileName: string }) => void;
}

export function LoadButton({
  onDefinitionLoaded,
  label,
  SvgImage,
}: LoadButtonProps): React.JSX.Element {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e) {
      const definition = e.target?.result as string;
      onDefinitionLoaded({ definition, fileName: file.name });
      if (fileInputRef.current) fileInputRef.current.value = "";
    };

    reader.readAsText(file);
  }

  function handleClick() {
    fileInputRef.current?.click();
  }

  return (
    <>
      <button className="panel-button" role="button" onClick={handleClick}>
        {SvgImage && (
          <img src={SvgImage} alt="" style={{ width: "20px", height: "20px" }} />
        )}
        {label || "Load"}
      </button>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept=".mmd, .txt, .mermaid"
        onChange={handleFileChange}
      />
    </>
  );
}