import React, { useCallback } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";

const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false]}],
    [{ font: [] }],
    [{ list: "ordered"}, { list: "bullet"}],
    ["bold", "italic", "underline"],
    [{ color: [] }, {background: [] }],
    /* [{ script: "sub" }, {script: "super"}], */
    /* [{ aling: [] }], */
    ["image", "code-block"],
    /* ["clean"], */
]

function TextEditor() {
  const wrapperRef = useCallback(wrapper => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    new Quill(editor, { theme: "snow", modules: { toolbar: TOOLBAR_OPTIONS} });
  }, []);

  return <div className="default-container container" id="container" ref={wrapperRef}></div>;
}

export default TextEditor;
