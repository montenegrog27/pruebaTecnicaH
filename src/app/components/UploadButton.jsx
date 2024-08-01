"use client";

import { useState, useEffect } from "react";
import Modal from "./Modal";
import FileList from "./FileList";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const FILES_PER_PAGE = 5;

export default function UploadButton() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [toastAlert, setToastAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [renameFile, setRenameFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [files]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file.size > MAX_FILE_SIZE) {
      setToastAlert(true);
      setTimeout(() => {
        setToastAlert(false);
      }, 2000);
      return;
    }

    // VERIFY IF FILE EXIST
    const isDuplicate = files.some((f) => f.name === file.name);
    if (isDuplicate) {
      setError(`A file with the name "${file.name}" already exists.`);
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    try {
      // NOTIF START
      const responseStart = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileName: file.name,
          }),
        }
      );

      if (!responseStart.ok) {
        throw new Error(
          `Failed to notify start of upload: ${responseStart.statusText}`
        );
      }

      // SIMULATE SUCCESS
      setFiles((prevFiles) => [...prevFiles, file]);
    } catch (err) {
      setError(`Upload failed: ${err.message}`);
      console.error("Error during file upload:", err);
    }
  };

  const handleRename = (file) => {
    setRenameFile(file);
    setShowModal(true);
  };

  const handleRenameSave = (newName) => {
    if (renameFile) {
      setFiles((prevFiles) =>
        prevFiles.map((file) =>
          file === renameFile ? { ...file, name: newName } : file
        )
      );
      setShowModal(false);
    }
  };

  const handleDelete = (file) => {
    const deletedFile = files.filter((f) => f.name !== file.name);
    setFiles(deletedFile);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(files.length / FILES_PER_PAGE);

  const currentFiles = files.slice(
    (currentPage - 1) * FILES_PER_PAGE,
    currentPage * FILES_PER_PAGE
  );

  return (
    <div className="bg-gray-600 p-3 rounded-xl">
      {toastAlert && (
        <div className="w-[50%] absolute flex justify-center items-center transition-opacity ">
          <Alert className="w-[50%] border-red-800 bg-red-500 text-gray-100 font-bold">
            <Terminal className="h-4 w-4 mt-[150px]" />
            <AlertTitle className="text-2xl">
              The file is very large!
            </AlertTitle>
            <AlertDescription>
              Try adding files smaller than 5Mb
            </AlertDescription>
          </Alert>
        </div>
      )}
      <div className="w-full max-w-sm items-center mt-5 justify-center">
        <Input
          className="bg-gray-400 py-2 text-md font-bold"
          type="file"
          onChange={handleFileChange}
        />
      </div>

      {error && (
        <div className="my-2 absolute border-red-500 border-1 bg-red-200 rounded px-2 text-red-700">
          {error}
        </div>
      )}

      <FileList
        files={currentFiles}
        onRename={handleRename}
        onDelete={handleDelete}
      />
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onSave={handleRenameSave}
          initialName={renameFile?.name}
        />
      )}
      <Pagination className={"mt-10 text-gray-100 text-lg min-w-[350px]"}>
        <PaginationContent
          className={
            "bg-gray-500 rounded px-10 py-2 flex justify-center items-center min-w-[450px]"
          }
        >
          <PaginationItem className={"bg-gray-800 rounded"}>
            <PaginationPrevious
              className={"bg-gray-800 rounded w-[100px]"}
              href="#"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem
              className=" flex justify-center items-center rounded"
              key={index}
            >
              <PaginationLink
                className={"bg-gray-800 rounded"}
                href="#"
                isActive={currentPage === index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              className={"bg-gray-800 rounded w-[100px]"}
              href="#"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
