import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/components/animate-ui/components/radix/dropdown-menu";
import { Card } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
	InputGroupText,
} from "@/components/ui/input-group";
import { useForm, useStore } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

export const Route = createFileRoute("/(finance)/emi/simple/")({
	component: RouteComponent,
});

const calculateEMI = (
	principal: number,
	annualInterestRate: number,
	tenureInMonths: number,
): number => {
	const monthlyInterestRate = annualInterestRate / 12 / 100;
	return (
		(principal * monthlyInterestRate) /
		(1 - Math.pow(1 + monthlyInterestRate, -tenureInMonths))
	);
};

const formSchema = z.object({
	principalAmount: z.number().min(1, "Principal amount is required."),
	interestRate: z.number().min(0.1, "Interest rate is required."),
	loanTenure: z.number().min(1, "Loan tenure is required."),
});

function RouteComponent() {
	const [position, setPosition] = useState("Years");

	const form = useForm({
		defaultValues: {
			principalAmount: 1000000,
			interestRate: 6.5,
			loanTenure: 5,
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			console.log(value);
		},
	});

	const emi = useStore(form.store, (state) =>
		calculateEMI(
			state.values.principalAmount,
			state.values.interestRate,
			position === "Years"
				? state.values.loanTenure * 12
				: state.values.loanTenure,
		).toFixed(2),
	);

	return (
		<>
			<div className="grid w-full max-w-sm gap-2">
				<form
					className="w-full"
					id="bug-report-form"
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<FieldGroup>
						<form.Field
							name="principalAmount"
							children={(field) => (
								<Field>
									<FieldLabel htmlFor="principal_amount">
										Principal Amount
									</FieldLabel>
									<InputGroup>
										<InputGroupAddon>
											<InputGroupText>$</InputGroupText>
										</InputGroupAddon>
										<InputGroupInput
											id="principal_amount"
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(+e.target.value)}
											step={0.1}
											placeholder="0.00"
										/>
										<InputGroupAddon align="inline-end">
											<InputGroupText>USD</InputGroupText>
										</InputGroupAddon>
									</InputGroup>
								</Field>
							)}
						/>

						<form.Field
							name="interestRate"
							children={(field) => (
								<Field>
									<FieldLabel htmlFor="interest_rate">Interest Rate</FieldLabel>
									<InputGroup>
										<InputGroupInput
											id="interest_rate"
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(+e.target.value)}
											type="number"
											max={30}
											placeholder="4.5"
										/>
										<InputGroupAddon align="inline-end">
											<InputGroupText>%</InputGroupText>
										</InputGroupAddon>
									</InputGroup>
								</Field>
							)}
						/>

						<form.Field
							name="loanTenure"
							children={(field) => (
								<Field>
									<FieldLabel htmlFor="loan_tenure">Loan Tenure</FieldLabel>
									<InputGroup>
										<InputGroupInput
											id="loan_tenure"
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(+e.target.value)}
											type="number"
											placeholder="12"
										/>
										<InputGroupAddon align="inline-end">
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<InputGroupButton
														variant="ghost"
														className="pr-1.5! text-xs"
													>
														{position}
														<ChevronDownIcon className="size-3" />
													</InputGroupButton>
												</DropdownMenuTrigger>
												<DropdownMenuContent align={"end"}>
													<DropdownMenuRadioGroup
														value={position}
														onValueChange={setPosition}
													>
														<DropdownMenuRadioItem value="Years">
															Years
														</DropdownMenuRadioItem>
														<DropdownMenuRadioItem value="Months">
															Months
														</DropdownMenuRadioItem>
													</DropdownMenuRadioGroup>
												</DropdownMenuContent>
											</DropdownMenu>
										</InputGroupAddon>
									</InputGroup>
								</Field>
							)}
						/>
					</FieldGroup>
				</form>
			</div>
			<Card className="shadow-none bg-accent mt-8 max-w-sm p-2">
				<table className="w-full">
					<tbody>
						<tr>
							<td className="py-2">Monthly EMI</td>
							<td className="py-2 text-right font-medium">${emi}</td>
						</tr>
						<tr>
							<td className="py-2">Principal amount</td>
							<td className="py-2 text-right font-medium">$0.00</td>
						</tr>
						<tr>
							<td className="py-2">Total interest</td>
							<td className="py-2 text-right font-medium">$0.00</td>
						</tr>
						<tr>
							<td className="py-2">Total payment</td>
							<td className="py-2 text-right font-medium">$0.00</td>
						</tr>
					</tbody>
				</table>
			</Card>
		</>
	);
}
