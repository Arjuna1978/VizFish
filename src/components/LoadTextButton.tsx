import React, { useRef, useState } from "react";
import Editor, { type Monaco } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import initializeMermaidLanguage from "monaco-mermaid";
import "../App.css";
import mermaid from "mermaid";


interface LoadTextButtonProps {
  SvgImage?: string;
  label?: string;
  fileName: string;
  def: string;
  StopImage?: string;
  PlayImage?: string;
  onDefinitionLoaded: (options: { definition: string; fileName: string }) => void;
}

export function LoadTextButton({
  SvgImage,
  PlayImage,
  StopImage,
  onDefinitionLoaded,
  fileName,
  label,
  def
}: LoadTextButtonProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  function handleEditorDidMount(
    _editor: monaco.editor.IStandaloneCodeEditor, 
    monacoInstance: Monaco
  ) {
    try {
      monacoInstance.editor.defineTheme("transparent-theme", {
        base: "vs",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#d0ca2523",
          "editorGutter.background": "#11110ee6"
        }
      });
      
      initializeMermaidLanguage(monacoInstance);
    } catch (error) {
      console.warn("Mermaid language configuration already initialized:", error);
    }
  }

const originalDef = useRef<string>(def);

const validateAndSaveDefinition = async (value: string) => {
if (!value.trim()) return;
    try {
      await mermaid.parse(value);
      onDefinitionLoaded({
        definition: value,
        fileName: fileName,
      });
    } catch {
      return;
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    const newValue = value ?? "";
    validateAndSaveDefinition(newValue);
  };

  const handlePlay = () => {
    setIsOpen(false);
  };

  function handleCancel() {
    validateAndSaveDefinition(originalDef.current);
    setIsOpen(false);
  }

  return (
    <div className="code-block-wrapper">
      <button 
        className="panel-button code-panel-toggle" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {SvgImage && <img src={SvgImage} alt="" width="24px" height="24px" />}
        {label || "Code"}
      </button>

      {isOpen && (
        <div className="code-block-overlay">
          <div className="editor-controls-bar">
            <button 
              onClick={handlePlay} 
              className="panel-button" 
            >
              {PlayImage && <img src={PlayImage} alt="Load" width="24px" height="24px" />}
            </button>
            <button onClick={handleCancel} className="panel-button">
              {StopImage && <img src={StopImage} alt="Stop" width="24px" height="24px" />}
            </button>
          </div>

          <div className="monaco-editor-frame">
            <Editor
              height="600px"
              width="800px"
              language="mermaid"
              theme= 'transparent-theme'
              value={def}
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
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