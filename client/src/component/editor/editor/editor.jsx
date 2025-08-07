import React, { useState } from "react";
import { File } from "../code file/file";
import { TerminalComponent } from "../terminal/terminal";

export function EditorTemplate() {
  return (
    <div className="">
      <File/>
      <TerminalComponent/>
    </div>
  )
}