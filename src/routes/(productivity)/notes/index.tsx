import { Excalidraw } from "@excalidraw/excalidraw";
import { createFileRoute } from "@tanstack/react-router";
import "./excalidraw.css";

export const Route = createFileRoute("/(productivity)/notes/")({
	component: Notes,
});

function Notes() {
	return (
		<div className="h-full w-full custom-styles">
			<Excalidraw />
		</div>
	);
}
