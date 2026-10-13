import React, { useState } from "react";
import Editor, { type Monaco } from "@monaco-editor/react";
import initializeMermaidLanguage from "monaco-mermaid";
import "../App.css";

interface LoadTextButtonProps {
  SvgImage?: string;
  label?: string;
  initialDefinition: string;
  StopImage?: string;
  PlayImage?: string;
  fileName?: string;
  defaultDef?: string;
  onDefinitionLoaded: (options: {
    definition: string;
    fileName: string;
  }) => void;
}

export function LoadTextButton({
  SvgImage,
  PlayImage,
  StopImage,
  fileName = "pasted-data.mmd",
  onDefinitionLoaded,
  label = "Code",
  initialDefinition,
  defaultDef = "",
}: LoadTextButtonProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [codeValue, setCodeValue] = useState<string>(() => initialDefinition || defaultDef);
  const [savedDefinition, setSavedDefinition] = useState<string>(() => initialDefinition || defaultDef);

  const handleBeforeMount = (monacoInstance: Monaco) => {
    try {
      monacoInstance.editor.defineTheme("transparent-theme", {
        base: "vs",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#eaee9c7b",
          "editorGutter.background": "#91946655",
        },
      });
      initializeMermaidLanguage(monacoInstance);
    } catch (error) {
      console.warn("Mermaid language configuration initialization warning:", error);
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    setCodeValue(value ?? "");
  };

  const handleLoad = () => {
    if (!codeValue.trim()) return;
    setSavedDefinition(codeValue);
    onDefinitionLoaded({
      definition: codeValue,
      fileName,
    });
    setIsOpen(false);
  };

  const handleOpenClick = () => {
    if (initialDefinition?.trim() && initialDefinition !== savedDefinition) {
      setCodeValue(initialDefinition);
    } else {
      setCodeValue(savedDefinition || defaultDef);
    }
    setIsOpen(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <div className="code-block-wrapper">
      <button
        type="button"
        className="panel-button code-panel-toggle"
        onClick={handleOpenClick}
      >
        {SvgImage && <img src={SvgImage} alt="" width="24" height="24" />}
        {label}
      </button>

      {isOpen && (
        <div className="code-block-overlay">
          <div className="editor-controls-bar">
            <button
              type="button"
              onClick={handleLoad}
              className="panel-button"
              disabled={!codeValue.trim()}
            >
              {PlayImage && <img src={PlayImage} alt="Load" width="24" height="24" />}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="panel-button"
            >
              {StopImage && <img src={StopImage} alt="Stop" width="24" height="24" />}
            </button>
          </div>

          <div className="monaco-editor-frame">
            <Editor
              key={fileName}
              height="600px"
              width="800px"
              language="mermaid"
              theme="transparent-theme"
              value={codeValue}
              onChange={handleEditorChange}
              beforeMount={handleBeforeMount}
              options={{
                automaticLayout: true,
                minimap: { enabled: true },
                fontSize: 17,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                tabSize: 2,
                folding: true,
                wordWrap: "on",
                renderLineHighlight: "none",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}