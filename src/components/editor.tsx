import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import "./editor.css";

const Editor = () => {
	const editor = useEditor({
		extensions: [StarterKit], // define your extension array
		content: "<p>Hello World!</p>", // initial content
		editorProps: {
			attributes: {
				autocomplete: "off",
				autocorrect: "off",
				autocapitalize: "off",
				"aria-label": "Main content area, start typing to enter text.",
				class: "pw-editor",
			},
		},
	});

	return (
		<div className="h-screen">
			<EditorContext.Provider value={{ editor }}>
				<EditorContent
					role="presentation"
					className="pw-editor-content"
					editor={editor}
				/>
			</EditorContext.Provider>
		</div>
	);
};

export default Editor;
