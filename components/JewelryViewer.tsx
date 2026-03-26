"use client";
import dynamic from "next/dynamic";
import type { ViewerApp } from "webgi";

const ViewerComponent = dynamic(
  () => import("@ijewel3d/mini-viewer").then((mod) => mod.ViewerComponent),
  { ssr: false }
);

interface JewelryViewerProps {
  modelId: string;
  className?: string;
}

export default function JewelryViewer({ modelId, className }: JewelryViewerProps) {
  const handleViewerReady = (viewer: ViewerApp) => {
    // Optional: customize scene, background color, etc.
    // viewer.scene.backgroundColor = new Color("#f5f5f5");
  };

  const handleError = (err: Error) => {
    console.error("iJewel viewer error:", err);
  };

  return (
    <div className={className} style={{ width: "100%", height: "500px" }}>
      <ViewerComponent
        modelId={modelId}
        basename="drive"
        onViewerReady={handleViewerReady}
        onError={handleError}
        viewerOptions={{
          showCard: true,
          showLogo: true,
        }}
      />
    </div>
  );
}
