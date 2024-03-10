import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { pdfjs } from "react-pdf";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const workerSrc = `https://unpkg.com/pdfjs-dist@2.10.377/build/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showFileAlert, setShowFileAlert] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const [showFile, setShowFile] = useState(false);
  // const [loading, setLoading] = useState(false);

  const submit = () => {
    setShowFileAlert(selectedFile === null);
    // console.log(selectedFile);
    if (selectedFile !== null) {
      setShowFileAlert(false);
      setShowFile(true);
      // setSelectedFile(URL.createObjectURL( selectedFile))
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      setFilePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          background: "white",
          border: 1,
          borderRadius: 5,
          width: "35%",
          fontSize: "16px",
          py: 5,
          mx: 5,
          mt: "8%",
        }}
      >
        <Button
          component="label"
          variant="contained"
          sx={{ display: "flex", margin: "auto", mt: 5, width: "fit-content" }}
        >
          {filePreview ? (
            <img
              src={filePreview}
              alt={selectedFile.name}
              style={{
                maxWidth: "100%",
                maxHeight: "200px",
                marginTop: "10px",
              }}
            />
          ) : (
            <Box>
              <CloudUploadIcon sx={{ mx: 1 }} /> Upload file
            </Box>
          )}
          <VisuallyHiddenInput type="file" onChange={handleFileChange} />
        </Button>

        {!filePreview && showFileAlert && (
          <span
            style={{
              color: "red",
              display: "flex",
              justifyContent: "center",
              marginTop: 3,
            }}
          >
            Upload file
          </span>
        )}
        <Button
          onClick={submit}
          variant="contained"
          sx={{ display: "flex", m: "auto", my: 4 }}
        >
          Upload
        </Button>

        {/* {loading && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress size={20} sx={{ mr: 2, mb: 2 }} />
          <span>Uploading...</span>
        </Box>
      )} */}
      </Box>

      {showFile && (
        <Box
          sx={{
            background: "white",
            border: 1,
            borderRadius: 5,
            width: "35%",
            fontSize: "16px",
            py: 5,
            mx: 5,
            mt: "8%",
          }}
        >
          <Worker workerUrl={workerSrc}>
            <Viewer fileUrl={filePreview} />
          </Worker>
        </Box>
      )}
    </div>
  );
};
