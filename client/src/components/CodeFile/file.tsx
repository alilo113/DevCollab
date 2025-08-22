import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Editor from "@monaco-editor/react";
import { Output } from "./output";

export function File() {
  return (
    <div className="flex flex-col h-screen">
      <div className="bg-black text-white px-6 py-4 flex items-center justify-between shadow-md">
        <h1 className="text-lg font-semibold tracking-wide">Name of the Room</h1>
        <button
          className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-all duration-200 cursor-pointer"
        >
          Run
        </button>
      </div>
      <div className="flex-grow">
      <Editor
      height="100%"
      width="100%"
      language="javascript"
      theme="vs-dark"
      defaultValue="// Start coding here..."
      />
      </div>
      <Output/>
    </div>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<File />);
}