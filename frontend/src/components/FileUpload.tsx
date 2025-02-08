// src/components/FileUpload.tsx
import React, { useState, useRef } from "react";
import axios from "axios";
import { UploadCloud, Loader2, CheckCircle, XCircle } from "lucide-react";
import { CreditReport } from "../types";

interface FileUploadProps {
  onUploadSuccess: (reportData: CreditReport) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setStatus("idle");
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setStatus("idle");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post<{ creditReport: CreditReport }>(
        "http://localhost:3000/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setStatus("success");
      onUploadSuccess(response.data.creditReport);
    } catch (err) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      setStatus("idle");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-200">
      <div
        className="border-2 border-dashed border-blue-400 rounded-lg p-6 cursor-pointer hover:bg-blue-50 transition"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <UploadCloud className="mx-auto w-12 h-12 text-blue-500 mb-2" />
        <p className="text-gray-600">Drag & Drop your XML file here</p>
        <p className="text-sm text-gray-400">or click to browse</p>
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>

      {file && (
        <div className="mt-4 flex items-center justify-between bg-gray-100 p-3 rounded-lg">
          <p className="text-gray-700">{file.name}</p>
          {loading ? (
            <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
          ) : status === "success" ? (
            <CheckCircle className="w-6 h-6 text-green-500" />
          ) : status === "error" ? (
            <XCircle className="w-6 h-6 text-red-500" />
          ) : (
            <button
              onClick={handleUpload}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Upload
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
