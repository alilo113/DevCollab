import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Editor from "@monaco-editor/react";

export function File() {
  return (
    <div className="flex flex-col h-screen">
      <div className="bg-black text-white px-6 py-4 flex items-center justify-between shadow-md">
        <h1 className="text-xl font-semibold">Name of the Room</h1>
      </div>
      {/* Monaco Editor */}
      <div className="flex-grow">
        <Editor
          height="100%"
          width="50%"
          language="javascript"
          theme="vs-dark"
        />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<File />);
}