import { useState, useCallback } from "react";
import Code from "@theme/CodeInline";
import BrowserOnly from "@docusaurus/BrowserOnly";

// https://www.xaymar.com/articles/2020/12/08/fastest-uint8array-to-hex-string-conversion-in-javascript/
function toHex(buffer) {
  return Array.prototype.map
    .call(buffer, (x) => ("00" + x.toString(16)).slice(-2))
    .join("");
}

export const genRandomKey = (): String => {
  const array = new Uint8Array(32);
  self.crypto.getRandomValues(array);
  return toHex(array);
};

export default function RandomKey() {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => {
        const [key, setKey] = useState<String>(genRandomKey());
        const genRandomKeyCb = useCallback(() => {
          setKey(genRandomKey());
        });
        return (
          <span>
            <Code>{key}</Code>
            <span style={{ marginLeft: "0.25rem", marginRight: "0.25rem" }} />
            <button
              onClick={() => {
                genRandomKeyCb();
              }}
            >
              ♻️
            </button>
          </span>
        );
      }}
    </BrowserOnly>
  );
}
