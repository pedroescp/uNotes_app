import { useCallback, useEffect } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import { io } from "socket.io-client";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  /* [{ script: "sub" }, {script: "super"}], */
  /* [{ aling: [] }], */
  ["image", "code-block"],
  /* ["clean"], */
];

function TextEditor() {
  useEffect(() => {
    const socket = io("https://localhost:3001");

    return () => {
      socket.disconnect()
    }
  }, []);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    new Quill(editor, { theme: "snow", modules: { toolbar: TOOLBAR_OPTIONS } });
  }, []);

  return (
    <div className="flex items-center justify-center py-56">
      <div className="gap-7 flex items-center justify-center flex-col rounded-md border w-auto shadow-default border-default">
        <div
          className="default-container container"
          id="container"
          ref={wrapperRef}
        ></div>
      </div>
    </div>
  );
}

export default TextEditor;
