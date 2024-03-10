import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { pdfjs } from "react-pdf";

const workerSrc = `https://unpkg.com/pdfjs-dist@2.10.377/build/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export const DocumentPreview = ({ selectedFile }) => {
  if (!selectedFile) {
    return null;
  }

  return (
    <div>
      <p>Preview:</p>
      <Worker workerUrl={workerSrc}>
        <Viewer fileUrl={selectedFile} />
      </Worker>
    </div>
  );
};
