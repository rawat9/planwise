import "./titlebar.css";

import { getCurrentWindow } from "@tauri-apps/api/window";
import { useState } from "react";
import { SidebarTrigger } from "./animate-ui/components/radix/sidebar";

const appWindow = getCurrentWindow();

export const Titlebar = () => {
	const [isFocused, setFocused] = useState(true);
	const [isFullscreen, setFullscreen] = useState(false);

	appWindow.onFocusChanged(({ payload: isFocused }) => {
		setFocused(isFocused);
	});

	appWindow.onResized(async () => {
		const isFullscreenValue = await appWindow.isFullscreen();
		setFullscreen(isFullscreenValue);
	});

	return (
		<div>
			<div className="absolute top-0 w-full h-10" data-tauri-drag-region />
			<div
				className="px-4 absolute top-0 flex items-center justify-between h-10 w-(--sidebar-width)"
				data-tauri-drag-region
			>
				{!isFullscreen ? (
					<div className={isFocused ? "focus" : ""}>
						<div className="traffic-lights">
							<button
								type="button"
								className="traffic-light traffic-light-close"
								id="close"
								onClick={() => appWindow.unmaximize()}
							></button>
							<button
								type="button"
								className="traffic-light traffic-light-minimize"
								id="minimize"
								onClick={() => appWindow.minimize()}
							></button>
							<button
								type="button"
								className="traffic-light traffic-light-maximize"
								id="maximize"
								onClick={() => appWindow.setFullscreen(true)}
							></button>
						</div>
					</div>
				) : null}
				<SidebarTrigger />
			</div>
		</div>
	);
};
