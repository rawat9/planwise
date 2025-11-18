import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(finance)/emi/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/finance/emi/" !!!</div>;
}
