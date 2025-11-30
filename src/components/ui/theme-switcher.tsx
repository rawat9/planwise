import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/theme-provider";
import { cva } from "class-variance-authority";
import { Airplay, Moon, Sun } from "lucide-react";
import * as React from "react";

const itemVariants = cva("size-6.5 rounded-full p-1.5 text-muted-foreground", {
	variants: {
		active: {
			true: "bg-accent text-accent-foreground",
			false: "text-muted-foreground",
		},
	},
});

const full = [
	["light", Sun] as const,
	["dark", Moon] as const,
	["system", Airplay] as const,
];

export function ThemeSwitcher({
	className,
	mode = "light-dark",
	...props
}: React.ComponentProps<"div"> & {
	mode?: "light-dark" | "light-dark-system";
}) {
	const { setTheme, theme } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	const container = cn(
		"inline-flex items-center rounded-full border p-0.5",
		className,
	);

	if (mode === "light-dark") {
		const value = mounted ? theme : null;

		return (
			<button
				type="button"
				className={container}
				aria-label={`Toggle Theme`}
				onClick={() => setTheme(value === "light" ? "dark" : "light")}
				data-theme-toggle=""
			>
				{full.map(([key, Icon]) => {
					if (key === "system") return;

					return (
						<Icon
							key={key}
							fill="currentColor"
							className={cn(itemVariants({ active: value === key }))}
						/>
					);
				})}
			</button>
		);
	}

	const value = mounted ? theme : null;

	return (
		<div className={container} data-theme-toggle="" {...props}>
			{full.map(([key, Icon]) => (
				<button
					type="button"
					key={key}
					aria-label={key}
					className={cn(itemVariants({ active: value === key }))}
					onClick={() => setTheme(key)}
				>
					<Icon className="size-full" fill="currentColor" />
				</button>
			))}
		</div>
	);
}
