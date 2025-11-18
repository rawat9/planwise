import { Input } from "@/components/ui/input";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(finance)/emi/compare-loans/")({
	component: CompareComponent,
});

function CompareComponent() {
	return (
		<div className="grid gap-4 grid-cols-2">
			<Input placeholder="Compare Loans Component" />
			<Input placeholder="Compare Loans Component" />
		</div>
	);
}
