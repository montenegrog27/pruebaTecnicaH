"use client";
import { useState } from "react";

export default function Modal({ onClose, onSave, initialName }) {
  const [newName, setNewName] = useState(initialName || "");

  const handleSave = () => {
    if (newName) {
      onSave(newName);
    }
  };

  return (
    <div className="fixed inset-0  flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-gray-500 w-[50%] p-10 rounded shadow-lg">
        <h2 className="text-2xl mb-4 ">Rename File</h2>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border p-2 mb-4 w-full text-black text-2xl"
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
