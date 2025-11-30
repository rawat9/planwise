import { useTheme } from "@/providers/theme-provider";
import { Excalidraw } from "@excalidraw/excalidraw";
import type { OrderedExcalidrawElement } from "@excalidraw/excalidraw/element/types";
import "@excalidraw/excalidraw/index.css";
import type { AppState, BinaryFiles } from "@excalidraw/excalidraw/types";
import { createFileRoute } from "@tanstack/react-router";
import { BaseDirectory, writeTextFile } from "@tauri-apps/plugin-fs";
import "./excalidraw.css";

export const Route = createFileRoute("/(productivity)/notes/")({
	component: Notes,
	loader: async () => {
		// const entries = await writeTextFile(
		// 	"Planwise/new.json",
		// 	JSON.stringify(sampleData),
		// 	{
		// 		baseDir: BaseDirectory.Document,
		// 	},
		// );
		// console.log("ENTRIES", entries);
	},
});

function Notes() {
	const { theme } = useTheme();

	async function handleChange(
		elements: readonly OrderedExcalidrawElement[],
		appState: AppState,
		files: BinaryFiles,
	) {
		await writeTextFile(
			`Planwise/${appState.name}.json`,
			JSON.stringify({
				type: "excalidraw",
				version: 2,
				source: "https://excalidraw.com",
				elements: elements,
				appState: appState,
				files: files,
			}),
			{
				baseDir: BaseDirectory.Document,
			},
		);
	}

	return (
		<div className="h-full w-full custom-styles">
			<Excalidraw
				theme={theme === "dark" ? "dark" : "light"}
				onChange={handleChange}
			/>
		</div>
	);
}
