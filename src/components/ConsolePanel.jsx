import React, { useEffect, useRef, useState } from "react";

export default function ConsolePanel({ logs }) {
  const [isVisible, setIsVisible] = useState(true);
  const bottomRef = useRef(null);

  // Scroll to latest log
  useEffect(() => {
    if (isVisible) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs, isVisible]);

    // helper: turns URLs in text into clickable <a> tags
  const formatMessage = (message) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = message.split(urlRegex);

    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#00bfff", textDecoration: "underline" }}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible((prev) => !prev)}
        style={{
          background: "#222",
          color: "#fff",
          borderRadius: "6px",
          cursor: "pointer",
          padding: "6px 12px",
          fontSize: "14px",
          alignSelf: "flex-end",
          marginBottom: "8px",
        }}
      >
        {isVisible ? "Hide Console" : "Show Console"}
      </button>

      {/* Console Area */}
      {isVisible && (
        <div
        className="console-container"
        style={{
            background: "#111",
            color: "#eee",
            padding: "10px",
            fontFamily: "monospace",
            fontSize: "14px",
            height: "250px",
            overflowY: "auto",
            overflowX: "auto",
            border: "1px solid #333",
            borderRadius: "8px",
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",       
            overflowWrap: "anywhere",     
            boxSizing: "border-box",
        }}
        >
          {logs.length === 0 ? (
            <div style={{ color: "#777" }}>No logs yet...</div>
          ) : (
            logs.map((log, i) => (
              <div
                key={i}
                style={{
                  color:
                    log.type === "error"
                      ? "#ff5555"
                      : log.type === "warn"
                      ? "#ffaa00"
                      : "#88ff88",
                }}
              >
                [{log.type}] {formatMessage(log.message)}
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
}
