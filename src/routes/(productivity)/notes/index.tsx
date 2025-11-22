import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(productivity)/notes/")({
	component: Notes,
});

function Notes() {
	return <Excalidraw />;
	// return <Editor />;
}
