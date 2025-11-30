import { createFileRoute } from "@tanstack/react-router";
import { Tasks } from "./(productivity)/tasks";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	return (
		<div className="p-2">
			<Tasks />
		</div>
	);
}
