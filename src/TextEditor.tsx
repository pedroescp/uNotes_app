import { useCallback, useEffect, useState } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import { io } from "socket.io-client";

//header of the lib
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6] }],
  /*   [{ font: [] }], */
   [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  /* [{ color: [] }, { background: [] }], */
  /* ["image", "code-block"], */
];

function TextEditor() {
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();

  //receive the socket in another location and write in
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };

    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  //send request to socket
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };

    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  //the connection
  useEffect(() => {
    const s = io("http://localhost:3001");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  //configure the lib and the wrapper the content in
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
      placeholder: "Escrever uma nota",
    });
    setQuill(q);
  }, []);

  return (
    <>
      <div className="flex justify-between pt-5 pl-5 pr-5">
        <div
          contentEditable="true"
          aria-multiline="true"
          role="textbox"
          className="focus:outline-none color h-20 w-"
          dir="ltr"
          tabIndex={0}
          spellCheck="true"
        >
          Coisas para fazer nas ferias
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
          />
        </svg>
      </div>
      <div className="container" id="container" ref={wrapperRef}></div>
    </>
  );
}

export default TextEditor;
