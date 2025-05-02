import React, { useRef } from "react";
import {
    MenuButtonBold,
    MenuButtonItalic,
    LinkBubbleMenu,
    LinkBubbleMenuHandler,
    MenuButtonHighlightColor,
    MenuButtonStrikethrough,
    MenuButtonEditLink,
    MenuButtonOrderedList,
    MenuButtonBulletedList,
    MenuControlsContainer,
    MenuDivider,
    MenuSelectHeading,
    RichTextEditor,
} from "mui-tiptap";
import StarterKit from "@tiptap/starter-kit";
import Highlight from '@tiptap/extension-highlight'
import {Link } from "@tiptap/extension-link";
import { makeStyles } from '@mui/material';


const useStyles = makeStyles(() => ({
    editor: {

        "& .ProseMirror": {
            minHeight: '200px',
            maxHeight: '400px',
            overflow: 'scroll',
            overflowX: 'hidden',
            width:'100%',


        }
    },

}));

export default function TextEditor({
    content = "", 
    name = 'editor', 
    handleEditor, 
    editable = true,
}) 
{
  const rteRef = useRef(null);
  const classes = useStyles();
  const handleChange = () => {
   const text =  rteRef.current?.editor?.getHTML();
   console.log(text)
   handleEditor(text);
  }

  return (
    <section>
      <RichTextEditor
        ref={rteRef}
        className={classes.editor}
        name={name}
        onUpdate={handleChange}
        extensions={
            [
            StarterKit,
            LinkBubbleMenuHandler, 
            Link,
            Highlight.configure({ multicolor: true }),
            ]
        } // Or any Tiptap extensions you wish!
        content={content} // Initial content for the editor
        editable={editable}
        // Optionally include `renderControls` for a menu-bar atop the editor:
        renderControls={() => (
          <MenuControlsContainer>
            <MenuSelectHeading />
            <MenuButtonEditLink />
            <MenuDivider />
            <MenuButtonBold />
            <MenuButtonItalic />
            <MenuButtonStrikethrough />
            <MenuDivider />
            <MenuButtonOrderedList />
            <MenuButtonBulletedList />
            <MenuButtonHighlightColor
                swatchColors={[
                { value: "#595959", label: "Dark grey" },
                { value: "#dddddd", label: "Light grey" },
                { value: "#ffa6a6", label: "Light red" },
                { value: "#ffd699", label: "Light orange" },
                // Plain yellow matches the browser default `mark` like when using Cmd+Shift+H
                { value: "#ffff00", label: "Yellow" },
                { value: "#99cc99", label: "Light green" },
                { value: "#90c6ff", label: "Light blue" },
                { value: "#8085e9", label: "Light purple" },
                ]}
            />
            {/* Add more controls of your choosing here */}
          </MenuControlsContainer>
        )}
      >
        {() => (
            <>
              <LinkBubbleMenu />
            </>
          )}
      </RichTextEditor>
    </section>
  );
}