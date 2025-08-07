import React from "react";
import ReactDOM from 'react-dom/client';
import Editor from "@monaco-editor/react";
import { useState } from "react";

export function File(){
    const [language, setLanguage] = useState("javaScript")
    
    return (
        <div className="flex flex-col h-screen">
          {/* Header */}
          <div className="bg-black text-white px-6 py-4 flex items-center justify-between shadow-md">
            <h1 className="text-xl font-semibold">Name of the Room</h1>
            
            {/* Room Settings */}
            <div className="flex items-center gap-3">
              <label htmlFor="languages" className="text-sm text-gray-300">Language:</label>
              <select
                name="languages"
                id="languages"
                className="bg-[#27A3F5] text-white px-3 py-1 rounded focus:outline-none hover:bg-[#07609C] cursor-pointer"
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="javascript">JavaScript</option>
                <option value="c">C</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="lua">Lua</option>
              </select>
            </div>
          </div>
    
          {/* Monaco Editor */}
          <div className="flex-grow">
            <Editor
              height="100%"
              width={`50%`}
              language={language}
              defaultValue="// Start coding here..."
              theme="vs-dark"
            />
          </div>
        </div>
    )
}

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<File/>);