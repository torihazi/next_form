import { useEffect } from "react";

const Edit = () => {
  useEffect(() => {
    // import("@editorjs/editorjs").then((EditorJS) => {
    //   const editor = new EditorJS.default();
    // });
    const EditorJS = require("@editorjs/editorjs");
    const editor = new EditorJS.default();
  }, []);

  return <div id="editorjs"></div>;
};

export default Edit;
