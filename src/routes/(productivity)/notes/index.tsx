import Editor from "@/components/editor";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(productivity)/notes/")({
	component: Notes,
});

function Notes() {
	return <Editor />;
}
