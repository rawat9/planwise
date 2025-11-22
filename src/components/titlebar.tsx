import { useTheme } from "@/providers/theme-provider";
import { SidebarTrigger } from "./animate-ui/components/radix/sidebar";
import { Button } from "./ui/button";

export const Titlebar = () => {
	const { setTheme } = useTheme();

	return (
		<div>
			<div
				className="absolute top-0 h-10 select-none w-full dark:bg-slate-600"
				data-tauri-drag-region
			></div>
			<div className="px-16 flex h-10 items-center absolute top-0 left-20 dark:text-white">
				<SidebarTrigger />
				<Button variant="ghost" onClick={() => setTheme("light")}>
					Toggle Theme
				</Button>
			</div>
		</div>
	);
};
