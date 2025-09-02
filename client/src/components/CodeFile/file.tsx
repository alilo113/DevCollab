import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Editor from "@monaco-editor/react";
import { Output } from "./output";
import io from "socket.io-client";

const socket = io("http://localhost:3000", { path: "/socket" });

export function File() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    // Receive updates from server
    socket.on("updateCode", (newCode) => setCode(newCode));
    socket.on("codeSaved", (savedCode) => console.log("Code saved:", savedCode));

    return () => {
      socket.off("updateCode");
      socket.off("codeSaved");
    };
  }, []);

  const handleEditorChange = (value: any) => {
    setCode(value || "");
    socket.emit("codeChange", value || "");
  };

  const saveCode = () => {
    const name = prompt("Enter a name for this code snippet:");
    if (name) socket.emit("saveCode", { name });
  };

  async function runCode() {
    const url = "https://ce.judge0.com/submissions/?base64_encoded=false&wait=true";
    const payload = { language_id: 74, source_code: code };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setOutput(data.stdout || data.stderr || data.compile_output || "No output");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-black text-white px-6 py-4 flex items-center justify-between shadow-md">
        <h1 className="text-lg font-semibold tracking-wide">DevCollab</h1>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mr-2"
            onClick={saveCode}
          >
            Save
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            onClick={runCode}
          >
            Run
          </button>
        </div>
      </div>

      <div className="flex-grow">
        <Editor
          height="100%"
          width="100%"
          language="javascript"
          theme="vs-dark"
          value={code}
          onChange={handleEditorChange}
        />
      </div>
      <Output output={output} />
    </div>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<File />);
}