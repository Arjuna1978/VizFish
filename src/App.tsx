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
  const [def, setDef] = useState<string>(defaultMmd);

  // Synchronise initial default diagram once on mount
  useEffect(() => {
    const initTimeout = setTimeout(() => {
      if (viewerRef.current && defaultMmd) {
        viewerRef.current.importDefinition(defaultMmd);
        setDef(defaultMmd);
      }
    }, 50);
    return () => clearTimeout(initTimeout);
  }, []);

  function handleLoadDefinition({ definition, fileName="na"}: { definition: string; fileName: string }) {
console.info("load def");
    console.info(definition);
    
    setDef(definition);
    
    if (fileName && fileName !== "na") {
      setFileName(fileName);
    }
    
    if (viewerRef.current && definition) {
      viewerRef.current.importDefinition(definition);
    }
  }

  // Rollback handler to restore the last working diagram definition
 

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
            initialDefinition={def}
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


        <div className="canvas-control-panel">
          <button className="panel-button" onClick={() => viewerRef.current?.zoomIn()}>+</button>
          <button className="panel-button reset-btn" onClick={() => viewerRef.current?.zoomOut()}>RESET</button>
          <button className="panel-button" onClick={() => viewerRef.current?.zoomOut()}>-</button>
        </div>

        <div className="canvas-container">
          <MermaidViewer 
            ref={viewerRef} 

          />
        </div>
      </main>
    </div>
  );
}

export default App;