// import "@excalidraw/excalidraw/index.css";
import { Excalidraw } from "@excalidraw/excalidraw";
import { createFileRoute } from "@tanstack/react-router";
import "./excalidraw.css";

export const Route = createFileRoute("/(productivity)/notes/")({
	component: Notes,
});

function Notes() {
	// return <div className="p-8 text-2xl">Notes coming soon...</div>;
	return (
		<div className="h-full w-full rounded-md custom-styles">
			<Excalidraw />
		</div>
	);
}
