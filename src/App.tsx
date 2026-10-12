import { useRef, useEffect, useState } from "react";
import "./App.css";

import defaultMmd from "./assets/default.mmd?raw";
import { MermaidViewer, type MermaidViewerHandle } from "./components/MermaidViewer";
import { LoadButton } from "./components/LoadButton";
import { SaveSVGButton } from "./components/SaveSVGButton";
import { SaveButton } from  "./components/SaveButton";
import { SaveDrawIOButton } from "./components/SaveDrawIOButton";
import { LoadTextButton } from "./components/LoadTextButton";

import logo from "./resources/logo.svg";
import downImage from "./resources/down.svg";
import upImage from "./resources/up.svg";
import txtImage from "./resources/codePad.svg";
import playImage from "./resources/play.svg";
import stopImage from "./resources/cancel.svg";

function App() {
  const viewerRef = useRef<MermaidViewerHandle>(null);
  const [fileName, setFileName] = useState<string>("my-diagram.mmd");
  const [def, setDef] = useState<string>('');
  const [lastValidDef, setLastValidDef] = useState<string>('');
  const [syntaxError, setSyntaxError] = useState<string | null>(null);

  // Synchronise initial default diagram once on mount
  useEffect(() => {
    const initTimeout = setTimeout(() => {
      if (viewerRef.current && defaultMmd) {
        viewerRef.current.importDefinition(defaultMmd);
        setDef(defaultMmd);
        setLastValidDef(defaultMmd);
      }
    }, 50);
    return () => clearTimeout(initTimeout);
  }, []);

  function handleLoadDefinition({ definition, fileName }: { definition: string; fileName: string }) {
    setFileName(fileName);
    setSyntaxError(null); // Clear previous errors on new load attempt
    
    try {
      viewerRef.current?.importDefinition(definition);
      setDef(definition);
      setLastValidDef(definition);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to parse definition";
      viewerRef.current?.importDefinition(lastValidDef);
      setSyntaxError(message);
    }
  }

  // Rollback handler to restore the last working diagram definition
  const handleRollback = () => {
    if (lastValidDef) {
      setDef(lastValidDef);
      setSyntaxError(null);
      viewerRef.current?.importDefinition(lastValidDef);
    }
  };

  async function handleExportSVG() {
    const savedFileName = await viewerRef.current?.exportSVG(fileName);
    if (savedFileName) {
      setFileName(savedFileName);
    }
  }

  return (
    <div className="app">
      <header className="floating-header">
        <img className="app-logo" src={logo} alt="Logo" />
        <h1 className="app-title">VizFish</h1>
      </header>

      <main>
        <div className="button-panel">
          <LoadButton 
            label="MMD" 
            SvgImage={upImage} 
            onDefinitionLoaded={handleLoadDefinition} 
          />
          <LoadTextButton 
            label="Code" 
            initialDefinition={lastValidDef}
            PlayImage={playImage} 
            StopImage={stopImage} 
            SvgImage={txtImage} 
            fileName={fileName}
            defaultDef={defaultMmd}
            onDefinitionLoaded={handleLoadDefinition} 
          />
          
          <SaveButton
            label="MMD"
            SvgImage={downImage}
            definition={def}
            fileName={fileName}
          />
          <SaveDrawIOButton
            label="Draw.io"
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
          <div className="syntax-error-banner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <strong>Parser Syntax Error:</strong> {syntaxError}
            </div>
            <button 
              type="button" 
              className="panel-button" 
              onClick={handleRollback}
              style={{ marginLeft: "1rem", padding: "4px 8px", fontSize: "0.85rem" }}
            >
              Rollback to Last Valid Version
            </button>
          </div>
        )}

        <div className="canvas-control-panel">
          <button className="panel-button" onClick={() => viewerRef.current?.zoomIn()}>+</button>
          <button className="panel-button reset-btn" onClick={() => viewerRef.current?.zoomOut()}>RESET</button>
          <button className="panel-button" onClick={() => viewerRef.current?.zoomOut()}>-</button>
        </div>

        <div className="canvas-container">
          <MermaidViewer 
            ref={viewerRef} 
            onError={(err) => {
              setSyntaxError(err);
            }} 
          />
        </div>
      </main>
    </div>
  );
}

export default App;