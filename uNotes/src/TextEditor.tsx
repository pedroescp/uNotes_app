import { useCallback, useEffect, useState } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import { io } from "socket.io-client";

//header of the lib
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  ["image", "code-block"],
];

function TextEditor() {
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();

  //receive the socket in another location and write in
  useEffect(() => {
    if (socket == null || quill == null) return 

    const handler = delta => {
      quill.updateContents(delta);
    };

    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  //send request to socket
  useEffect(() => {
    if (socket == null || quill == null) return 

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
    });
    setQuill(q);
  }, []);

  return (
    <div className="flex items-center justify-center py-56 default-container max-w-2xl">
      <div className="gap-7 flex items-center justify-center flex-col rounded-md border w-auto shadow-default border-default">
        <div
          className="container text-black"
          id="container"
          ref={wrapperRef}
        ></div>
      </div>
    </div>
  );
}

export default TextEditor;
