import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Editor from "@monaco-editor/react";
import { Output } from "./output";

export function File() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  async function runCode() {
    const url = "https://ce.judge0.com/submissions/?base64_encoded=false&wait=true";

    const payload = {
      language_id: 74,
      source_code: code,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Key": "YOUR_KEY_HERE"
      },
      body: JSON.stringify(payload),
    };

    try {
      const res = await fetch(url, options);
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
        <button
          className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-all duration-200 cursor-pointer"
          onClick={runCode}
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
          value={code}
          onChange={(value) => setCode(value || "")}
        />
      </div>
      <Output output={output}/>
    </div>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<File />);
}