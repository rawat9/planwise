import {
	SidebarInset,
	SidebarProvider,
} from "@/components/animate-ui/components/radix/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { Titlebar } from "@/components/titlebar";
import { ThemeProvider } from "@/providers/theme-provider";
import "@excalidraw/excalidraw/index.css";
import { createRootRoute, Outlet } from "@tanstack/react-router";

const RootLayout = () => (
	<div className="overscroll-y-auto overflow-y-scroll bg-sidebar">
		<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
			<SidebarProvider>
				<Titlebar />
				<AppSidebar />

				<SidebarInset>
					<Outlet />
				</SidebarInset>
			</SidebarProvider>
		</ThemeProvider>
	</div>
);

export const Route = createRootRoute({ component: RootLayout });
