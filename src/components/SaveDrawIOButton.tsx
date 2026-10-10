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
    
    // 1. Convert Mermaid to raw draw.io XML
    const drawIoXml = await convert(definition, {
      from: "mermaid",
      to: "drawio",
    });

    // 2. Parse XML for DOM manipulation
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(drawIoXml.output, "text/xml");

    // ----------------------------------------------------
    // STEP A: Unstack Nodes by Updating Layout Coordinates
    // ----------------------------------------------------
    const vertices = xmlDoc.querySelectorAll('mxCell[vertex="1"]');
    let currentY = 100;
    const yGap = 100; // Spacing between each node

    vertices.forEach((vertex) => {
      const geo = vertex.querySelector("mxGeometry");
      if (geo) {
        geo.setAttribute("x", "200");
        geo.setAttribute("y", currentY.toString());
        currentY += yGap;
      }
    });

    // ----------------------------------------------------
    // STEP B: Deduplicate & Normalize Edge Styles
    // ----------------------------------------------------
    const edges = xmlDoc.querySelectorAll('mxCell[edge="1"]');
    edges.forEach((edge) => {
      const currentStyle = edge.getAttribute("style") || "";
      
      const styleMap = new Map<string, string>();
      currentStyle.split(";").forEach((pair) => {
        if (!pair.trim()) return;
        const [key, val] = pair.split("=");
        styleMap.set(key.trim(), val ? val.trim() : "");
      });

      // Enforce edge formatting
      styleMap.set("edgeStyle", "orthogonalEdgeStyle");
      styleMap.set("rounded", "1");
      styleMap.set("orthogonalLoop", "1");
      styleMap.set("jettySize", "auto");
      styleMap.set("html", "1");
      styleMap.set("endArrow", "classic");

      const cleanStyle = Array.from(styleMap.entries())
        .map(([k, v]) => (v ? `${k}=${v}` : k))
        .join(";");

      edge.setAttribute("style", `${cleanStyle};`);
    });

    // 3. Serialize back to XML
    const serializer = new XMLSerializer();
    const modifiedXml = serializer.serializeToString(xmlDoc);

    // 4. Trigger File Download
    const baseName = fileName.replace(/\.[^/.]+$/, "");
    const exportName = `${baseName}.drawio`;

    const blob = new Blob([modifiedXml], {
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
      title="Save as Draw.io file"
    >
      {SvgImage && (
        <img src={SvgImage} alt="" style={{ width: "20px", height: "20px" }} />
      )}
      {label || "Save Draw.io"}
    </button>
  );
}