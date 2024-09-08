import { BlockToolConstructable } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import {
  IconH1,
  IconH2,
  IconH3,
  IconH4,
  IconH5,
  IconH6,
  IconHeading,
} from "@codexteam/icons";
import { useEffect } from "react";

const Edit = () => {
  useEffect(() => {
    const initializeEditor = async () => {
      const EditorJS = (await import("@editorjs/editorjs")).default;

      const editor = new EditorJS({
        holder: "editorjs",
        tools: {
          header: {
            class: Header as unknown as BlockToolConstructable,
            shortcut: "CMD+SHIFT+H",
            inlineToolbar: true,
            config: {
              placeholder: "Enter a header",
              levels: [1, 2, 3, 4, 5, 6],
              defaultLevel: 1,
            },
            toolbox: [
              {
                icon: IconH1, // H1のアイコン
                title: "Heading 1",
                data: { level: 1 },
              },
              {
                icon: IconH2, // H2のアイコン
                title: "Heading 2",
                data: { level: 2 },
              },
              {
                icon: IconH3, // H3のアイコン
                title: "Heading 3",
                data: { level: 3 },
              },
              {
                icon: IconH4, // H4のアイコン
                title: "Heading 4",
                data: { level: 4 },
              },
              {
                icon: IconH5, // H5のアイコン
                title: "Heading 5",
                data: { level: 5 },
              },
              {
                icon: IconH6, // H6のアイコン
                title: "Heading 6",
                data: { level: 6 },
              },
            ],
          },
        },
      });
    };

    initializeEditor();
  }, []);

  return <div id="editorjs"></div>;
};

export default Edit;
