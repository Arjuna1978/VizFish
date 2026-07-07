import React, { useEffect, useState } from "react";
import Editor, { type Monaco } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import initializeMermaidLanguage from "monaco-mermaid";
import "../App.css";

interface LoadTextButtonProps {
  SvgImage?: string;
  label?: string;
  initialDefinition?: string;
  StopImage?: string;
  PlayImage?: string;
  onDefinitionLoaded: (options: { definition: string; fileName: string }) => void;
}

export function LoadTextButton({
  SvgImage,
  PlayImage,
  StopImage,
  onDefinitionLoaded,
  label,
  initialDefinition = ""
}: LoadTextButtonProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [codeValue, setCodeValue] = useState<string>(initialDefinition);

  useEffect(() => {
    setCodeValue(initialDefinition);
  }, [initialDefinition]);
  
  function handleEditorDidMount(
    _editor: monaco.editor.IStandaloneCodeEditor, 
    monacoInstance: Monaco
  ) {
    try {
      monacoInstance.editor.defineTheme("transparent-theme", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#cececeaf",
          "editorGutter.background": "#00000000"
        }
      });
      
      initializeMermaidLanguage(monacoInstance);
    } catch (error) {
      console.warn("Mermaid language configuration already initialized:", error);
    }
  }

  function handleEditorChange(value: string | undefined) {
    setCodeValue(value || "");
  }

  function handleLoad() {
    if (!codeValue.trim()) return;
    const definition = codeValue
    onDefinitionLoaded({
      definition,
      fileName: "pasted-diagram.mmd"
    });
    setIsOpen(false);
  }

  function handleCancel() {
    setCodeValue(initialDefinition)
    const definition = initialDefinition 
    onDefinitionLoaded({
       definition,
      fileName: "pasted-diagram.mmd"
    });
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
              onClick={handleLoad} 
              className="panel-button" 
              disabled={!codeValue.trim()}
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
              value={codeValue}
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