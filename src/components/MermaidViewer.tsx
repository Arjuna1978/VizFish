import { forwardRef, useImperativeHandle, useState, useId, useRef, useEffect, useLayoutEffect } from "react";
import mermaid from "mermaid";
import svgPanZoom from "svg-pan-zoom";

mermaid.initialize({
  startOnLoad: false,
  securityLevel: "strict",
  theme: "default",
});

export interface MermaidViewerHandle {
  importDefinition: (definition: string) => Promise<void>;
  exportSVG: (fileName: string) => Promise<string | undefined>;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
}

interface MermaidViewerProps {
  onError?: (errorMessage: string | null) => void;
}

export const MermaidViewer = forwardRef<MermaidViewerHandle, MermaidViewerProps>(
  ({ onError }, ref) => {
    const safeIdToken = useId().replace(/[^a-zA-SU-Z0-9]/g, ""); 
    const containerRef = useRef<HTMLDivElement>(null);
    const [svgContent, setSvgContent] = useState<string>("");
    const panZoomInstanceRef = useRef<SvgPanZoom.Instance | null>(null);
    const containerId = `vizflo-canvas-${safeIdToken}`;

    const destroyPanZoomInstance = () => {
      if (panZoomInstanceRef.current) {
        panZoomInstanceRef.current.destroy();
        panZoomInstanceRef.current = null;
      }
    };

    //Graceful shutdown
    useEffect(() => {
      return () => destroyPanZoomInstance();
    }, []);

    useLayoutEffect(() => {
      if (!svgContent || !containerRef.current) return;
      const svgElement = containerRef.current.querySelector("svg") as SVGElement | null;
      if (!svgElement) return;
      destroyPanZoomInstance();
      svgElement.style.width = "100%";
      svgElement.style.height = "100%";
      svgElement.style.maxWidth = "none";
      svgElement.style.minHeight = "100%";

  if (!svgElement.getAttribute("viewBox")) {
  const svgGraphics = svgElement as unknown as SVGSVGElement;
  if (typeof svgGraphics.getBBox === "function") {
    const bbox = svgGraphics.getBBox();
    if (bbox && bbox.width > 0 && bbox.height > 0) {
      svgElement.setAttribute("viewBox", `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
    }
  }
}

      try {
        panZoomInstanceRef.current = svgPanZoom(svgElement, {
          zoomEnabled: true,
          controlIconsEnabled: false, // Disables conflicting native library button elements
          fit: true,
          center: true,
          minZoom: 0.05,
          maxZoom: 20,
          mouseWheelZoomEnabled: true,
          dblClickZoomEnabled: true,
          preventMouseEventsDefault: true // Prevents browser scroll jumping during diagram interactions
        });
      } catch (e) {
        console.error("Pan-zoom initialization skipped: ", e);
      }
    }, [svgContent]); // Re-fires instantly whenever a fresh graph description string is updated

    useImperativeHandle(ref, () => ({
      clearCanvas: () => {
        destroyPanZoomInstance();
        setSvgContent("");
        if (onError) onError(null);
      },
      zoomIn: () => {
        if (panZoomInstanceRef.current) panZoomInstanceRef.current.zoomIn();
      },
      zoomOut: () => {
        if (panZoomInstanceRef.current) panZoomInstanceRef.current.zoomOut();
      },
      resetZoom: () => {
        if (panZoomInstanceRef.current) {
          panZoomInstanceRef.current.reset();
          panZoomInstanceRef.current.fit();
          panZoomInstanceRef.current.center();
        }
      },
      importDefinition: async (definition: string) => {
        if (!definition.trim()) {
          destroyPanZoomInstance();
          setSvgContent("");
          if (onError) onError(null);
          return;
        }

        try {
          if (onError) onError(null);

          const parseResult = await mermaid.parse(definition, { suppressErrors: true });
          if (parseResult === false) {
            throw new Error("Syntax error: Please check your diagram syntax.");
          }

          // Render the updated diagram layout structure
          const result = await mermaid.render(containerId, definition);
          setSvgContent(result.svg);

          // Interactive bindings mapping configuration handler block
          setTimeout(() => {
            if (!containerRef.current) return;
            const svgElement = containerRef.current.querySelector("svg");
            if (result.bindFunctions && svgElement) {
              result.bindFunctions(svgElement);
            }
          }, 0);

        } catch (err) {
          const message = err instanceof Error ? err.message : "Unknown parsing error";
          if (onError) onError(message);
        }
      },

      exportSVG: async (fileName: string): Promise<string | undefined> => {
        if (!svgContent) return undefined;

        const baseName = fileName.replace(/\.[^/.]+$/, "");
        const exportName = `${baseName}.svg`;

        const blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement("a");
        link.href = url;
        link.download = exportName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        return exportName;
      }
    }));

    return (
      <div 
        ref={containerRef} 
        className="mermaid-viewer-canvas"
        style={{ width: "100%", height: "100%", overflow: "hidden" }}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    );
  }
);

MermaidViewer.displayName = "MermaidViewer";