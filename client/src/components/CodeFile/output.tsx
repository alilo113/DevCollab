import React from "react";

export function Output({ output }: { output: string }){
    return (
        <div className="p-4">
            <div className="bg-black text-green-400 font-mono p-2 h-40 rounded overflow-y-auto">
                Hello world
                {output}
            </div>
        </div>
    )
}