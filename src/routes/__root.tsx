import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/animate-ui/components/radix/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { Separator } from "@/components/ui/separator";
import { ThemeProvider } from "@/providers/theme-provider";
import "@excalidraw/excalidraw/index.css";
import { createRootRoute, Outlet } from "@tanstack/react-router";

// import { wi } from "@tauri-apps/api/window";

// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => (
	<div className="overscroll-y-auto overflow-y-scroll">
		<ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
			<SidebarProvider>
				<AppSidebar />

				<SidebarInset>
					<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
						<div className="flex items-center gap-2 px-4">
							<SidebarTrigger className="-ml-1" />
							<Separator orientation="vertical" className="mr-2 h-4" />
						</div>
					</header>
					<div className="w-full h-full p-4 pt-0 dark:text-white">
						{/* <Excalidraw /> */}
						<Outlet />
						{/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
							<div className="aspect-video rounded-xl bg-muted/50" />
							<div className="aspect-video rounded-xl bg-muted/50" />
							<div className="aspect-video rounded-xl bg-muted/50" />
						</div>
						<div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
					</div>
				</SidebarInset>
			</SidebarProvider>
		</ThemeProvider>
		{/* <TanStackRouterDevtools /> */}
	</div>
);

export const Route = createRootRoute({ component: RootLayout });
