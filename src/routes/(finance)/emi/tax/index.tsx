import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(finance)/emi/tax/")({
	component: TaxComponent,
});

function TaxComponent() {
	return <div>Hello "/(finance)/emi/tax"!</div>;
}
