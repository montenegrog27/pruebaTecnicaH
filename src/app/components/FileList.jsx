"use client";
import { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import SkeletonLoader from "./SkeletonLoader";

export default function FileList({ files, onRename, onDelete }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // SIMULATION CHARGE FILE
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="mt-5 bg-gray-950 p-3 rounded-xl min-w-[600px] min-h-[300px]">
      {files.length === 0 ? (
        <p className="text-xl text-gray-100 my-3">No files uploaded</p>
      ) : (
        <ul className="flex flex-col ">
          {files.map((file, index) => (
            <li
              key={index}
              className="flex items-center gap-[10px] my-1 text-lg text-gray-100 p-1 border-b"
            >
              <a
                href={`/api/files/${file.name}`}
                download
                className="flex-grow text-blue-500 underline"
              >
                {file.name}
              </a>
              <button onClick={() => onRename(file)} className="p-1">
                <PencilIcon className="h-5 w-5 text-gray-100" />
              </button>
              <button onClick={() => onDelete(file)} className="p-1">
                <TrashIcon className="h-5 w-5 text-red-600" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
