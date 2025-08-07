// Terminal.jsx
import React, { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";

export function TerminalComponent() {
  const terminalRef = useRef(null);
  const termRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      const term = new Terminal({
        cursorBlink: true,
        fontSize: 14,
        theme: {
          background: "#1e1e1e",
        },
      });

      term.open(terminalRef.current);
      term.write("Welcome to DevCollab Terminal\r\n");

      // Optional: Handle user input
      term.onData((data) => {
        if (data === "\r") {
          term.write("\r\n$ "); // simulate prompt
        } else {
          term.write(data);
        }
      });

      termRef.current = term;
    }
  }, []);

  return (
    <div
      ref={terminalRef}
      className="w-full h-screen bg-black text-white"
    />
  );
}