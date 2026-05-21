import { useRef, useEffect, useState } from "react";
import "./App.css";

import defaultMmd from "./assets/default.mmd?raw";
import { MermaidViewer, type MermaidViewerHandle } from "./components/MermaidViewer";
import { LoadButton } from "./components/LoadButton";
import { SaveSVGButton } from "./components/SaveSVGButton";
import { SaveButton } from  "./components/SaveButton"
import { LoadTextButton } from "./components/LoadTextButton"

import logo from "./resources/logo.svg";
import downImage from "./resources/down.svg"; // Reuse or change icon asset if preferred
import upImage from "./resources/up.svg";
import txtImage from "./resources/codePad.svg";
import playImage from "./resources/play.svg";
import stopImage from "./resources/cancel.svg";

function App() {
  const viewerRef = useRef<MermaidViewerHandle>(null);
  const [fileName, setFileName] = useState<string>("my-diagram.mmd");
  const [def, setDef] = useState<string>('');
  const [syntaxError, setSyntaxError] = useState<string | null>(null);

  // Synchronise initial default diagram once on mount
  useEffect(() => {
    const initTimeout = setTimeout(() => {
      if (viewerRef.current && defaultMmd) {
        viewerRef.current.importDefinition(defaultMmd);
        setDef(defaultMmd); // Ensure default state matches initial paint tracking
      }
    }, 50);
    return () => clearTimeout(initTimeout);
  }, []);

  function handleLoadDefinition({ definition, fileName }: { definition: string; fileName: string }) {
    setFileName(fileName);
    setDef(definition); // Accurately registers updates to the master string reference
    return viewerRef.current?.importDefinition(definition);
  }

  async function handleExportSVG() {
    const savedFileName = await viewerRef.current?.exportSVG(fileName);
    if (savedFileName) {
      setFileName(savedFileName);
    }
  }

  return (
    <div className="app">
      <header className="floating-header">
        <img src={logo} alt="Logo" width="50px" />
        <h1 className="app-title">VizFish</h1>
      </header>

      <main className="app-main">
        <div className="button-panel">
          <LoadButton 
            label="MMD" 
            SvgImage={upImage} 
            onDefinitionLoaded={handleLoadDefinition} 
          />
          <LoadTextButton 
          key={fileName}
            label="Code" 
            initialDefinition={def}
            PlayImage={playImage} 
            StopImage={stopImage} 
            SvgImage={txtImage} 
            onDefinitionLoaded={handleLoadDefinition} 
          />
          
          {/* 2. Added the Save MMD Button option into the panel track */}
          <SaveButton
            label="MMD"
            SvgImage={downImage}
            definition={def}
            fileName={fileName}
          />

          <SaveSVGButton 
            label="SVG" 
            SvgImage={downImage} 
            onExport={handleExportSVG} 
          />
        </div>

        {syntaxError && (
          <div className="syntax-error-banner">
            <strong>Parser Syntax Error:</strong> {syntaxError}
          </div>
        )}

        <div className="canvas-control-panel">
          <button className="panel-button" onClick={() => viewerRef.current?.zoomIn()}>+</button>
          <button className="panel-button reset-btn" onClick={() => viewerRef.current?.zoomOut()}>RESET</button>
          <button className="panel-button" onClick={() => viewerRef.current?.zoomOut()}>-</button>
        </div>

        <div className="canvas-container">
          <MermaidViewer ref={viewerRef} onError={setSyntaxError} />
        </div>
      </main>
    </div>
  );
}

export default App;