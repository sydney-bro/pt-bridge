// src/hooks/useConsoleCapture.js
import { useEffect, useState } from "react";

export default function useConsoleCapture() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const original = {
      log: console.log,
      error: console.error,
      warn: console.warn,
      info: console.info,
    };

    function captureLog(type, ...args) {
      setLogs((prev) => [...prev, { type, message: args.join(" ") }]);
      original[type](...args); // still print to the real console
    }

    console.log = (...args) => captureLog("log", ...args);
    console.error = (...args) => captureLog("error", ...args);
    console.warn = (...args) => captureLog("warn", ...args);
    console.info = (...args) => captureLog("info", ...args);

    return () => {
      console.log = original.log;
      console.error = original.error;
      console.warn = original.warn;
      console.info = original.info;
    };
  }, []);

  return logs;
}
