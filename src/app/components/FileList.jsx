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
    <div className="mt-10 bg-gray-950 p-3 rounded-xl min-w-[800px] min-h-[400px]">
      {files.length === 0 ? (
        <p className="text-xl text-gray-100 my-5">No files uploaded</p>
      ) : (
        <ul className="flex flex-col ">
          {files.map((file, index) => (
            <li
              key={index}
              className="flex items-center gap-[15px] my-1 text-xl text-gray-100 p-2 border-b"
            >
              <a
                href={`/api/files/${file.name}`}
                download
                className="flex-grow text-blue-500 underline"
              >
                {file.name}
              </a>
              <button onClick={() => onRename(file)} className="p-1">
                <PencilIcon className="h-6 w-6 text-gray-100" />
              </button>
              <button onClick={() => onDelete(file)} className="p-1">
                <TrashIcon className="h-6 w-6 text-red-600" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
