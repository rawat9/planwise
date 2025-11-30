"use client";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/animate-ui/components/radix/dropdown-menu";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarRail,
} from "@/components/animate-ui/components/radix/sidebar";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/animate-ui/primitives/radix/collapsible";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "@tanstack/react-router";
import {
	AudioWaveform,
	ChevronRight,
	ChevronsUpDown,
	Command,
	Folder,
	Forward,
	Frame,
	GalleryVerticalEnd,
	MoreHorizontal,
	PieChart,
	Plus,
	Settings,
	SquareTerminal,
	Trash2,
} from "lucide-react";
import * as React from "react";
import { Button } from "./ui/button";
import { ThemeSwitcher } from "./ui/theme-switcher";

const DATA = {
	user: {
		name: "Anurag",
		email: "anurag@example.com",
		avatar: "",
	},
	teams: [
		{
			name: "Acme Inc",
			logo: GalleryVerticalEnd,
			plan: "Enterprise",
		},
		{
			name: "Acme Corp.",
			logo: AudioWaveform,
			plan: "Startup",
		},
		{
			name: "Evil Corp.",
			logo: Command,
			plan: "Free",
		},
	],
	navMain: [
		{
			title: "Boards",
			url: "/boards",
			icon: SquareTerminal,
			isActive: true,
			items: [
				{
					title: "test",
					url: "/test-1",
				},
			],
		},
		// {
		// 	title: "EMI",
		// 	url: "/emi",
		// 	icon: SquareTerminal,
		// 	isActive: true,
		// 	items: [
		// 		{
		// 			title: "Simple EMI",
		// 			url: "/emi/simple",
		// 		},
		// 		{
		// 			title: "Compare loans",
		// 			url: "/emi/compare-loans",
		// 		},
		// 		{
		// 			title: "Tax",
		// 			url: "/emi/tax",
		// 		},
		// 		{
		// 			title: "Tenure",
		// 			url: "/emi/tenure",
		// 		},
		// 	],
		// },
		// {
		// 	title: "Loan",
		// 	url: "#",
		// 	icon: Bot,
		// 	items: [
		// 		{
		// 			title: "Loan profile",
		// 			url: "#",
		// 		},
		// 		{
		// 			title: "Eligibility check",
		// 			url: "#",
		// 		},
		// 	],
		// },
		// {
		// 	title: "Banking",
		// 	url: "#",
		// 	icon: Settings2,
		// 	items: [
		// 		{
		// 			title: "FD calculator",
		// 			url: "#",
		// 		},
		// 		{
		// 			title: "RD calculator",
		// 			url: "#",
		// 		},
		// 		{
		// 			title: "PPF calculator",
		// 			url: "#",
		// 		},
		// 		{
		// 			title: "Simple and compound",
		// 			url: "#",
		// 		},
		// 	],
		// },
	],
	projects: [
		{
			name: "Note 1",
			url: "/notes",
			icon: Frame,
		},
		{
			name: "Sales & Marketing",
			url: "#",
			icon: PieChart,
		},
	],
};

export const AppSidebar = () => {
	const isMobile = useIsMobile();
	const [activeTeam, setActiveTeam] = React.useState(DATA.teams[0]);

	if (!activeTeam) return null;

	return (
		<Sidebar collapsible="offcanvas" variant="inset">
			<SidebarHeader>
				{/* Team Switcher */}
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton
									size="lg"
									className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground w-full"
								>
									<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
										<activeTeam.logo className="size-4" />
									</div>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-semibold">
											{activeTeam.name}
										</span>
										<span className="truncate text-xs">{activeTeam.plan}</span>
									</div>
									<ChevronsUpDown className="ml-auto" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
								align="start"
								side={"bottom"}
								sideOffset={4}
							>
								{/* <MenuGroupLabel className="text-xs text-muted-foreground">
									Teams
								</MenuGroupLabel> */}
								{DATA.teams.map((team, index) => (
									<DropdownMenuItem
										key={team.name}
										onClick={() => setActiveTeam(team)}
										className="gap-2 p-2"
									>
										<div className="flex size-6 items-center justify-center rounded-sm border">
											<team.logo className="size-4 shrink-0" />
										</div>
										{team.name}
										<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
									</DropdownMenuItem>
								))}
								<DropdownMenuSeparator />
								<DropdownMenuItem className="gap-2 p-2">
									<div className="flex size-6 items-center justify-center rounded-md border bg-background">
										<Plus className="size-4" />
									</div>
									<div className="font-medium text-muted-foreground">
										Add team
									</div>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
				{/* Team Switcher */}
			</SidebarHeader>

			<SidebarContent>
				{/* Nav Main */}
				<SidebarGroup>
					<SidebarGroupLabel>Boards</SidebarGroupLabel>
					<SidebarMenu>
						{DATA.navMain.map((item) => (
							<Collapsible
								key={item.title}
								asChild
								defaultOpen={item.isActive}
								className="group/collapsible"
							>
								<SidebarMenuItem>
									<CollapsibleTrigger asChild>
										<SidebarMenuButton tooltip={item.title}>
											{item.icon && <item.icon />}
											<span>{item.title}</span>
											<ChevronRight className="ml-auto transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90" />
										</SidebarMenuButton>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<SidebarMenuSub>
											{item.items?.map((subItem) => (
												<SidebarMenuSubItem key={subItem.title}>
													<SidebarMenuSubButton asChild>
														<Link to={subItem.url}>
															<span>{subItem.title}</span>
														</Link>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											))}
										</SidebarMenuSub>
									</CollapsibleContent>
								</SidebarMenuItem>
							</Collapsible>
						))}
					</SidebarMenu>
				</SidebarGroup>
				{/* Nav Main */}

				{/* Nav Project */}
				<SidebarGroup className="group-data-[collapsible=icon]:hidden">
					<SidebarGroupLabel>Productivity</SidebarGroupLabel>
					<SidebarMenu>
						{DATA.projects.map((item) => (
							<SidebarMenuItem key={item.name}>
								<SidebarMenuButton asChild>
									<Link to={item.url}>
										<item.icon />
										<span>{item.name}</span>
									</Link>
								</SidebarMenuButton>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<SidebarMenuAction showOnHover>
											<MoreHorizontal />
											<span className="sr-only">More</span>
										</SidebarMenuAction>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										className="w-48 rounded-lg"
										side={isMobile ? "bottom" : "right"}
										align={isMobile ? "end" : "start"}
									>
										<DropdownMenuItem>
											<Folder className="text-muted-foreground" />
											<span>View Project</span>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Forward className="text-muted-foreground" />
											<span>Share Project</span>
										</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem>
											<Trash2 className="text-muted-foreground" />
											<span>Delete Project</span>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</SidebarMenuItem>
						))}
						<SidebarMenuItem>
							<SidebarMenuButton className="text-sidebar-foreground/70">
								<MoreHorizontal className="text-sidebar-foreground/70" />
								<span>More</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>
				{/* Nav Project */}
			</SidebarContent>
			<SidebarFooter>
				<div className="flex items-baseline justify-between">
					<Button size="icon" variant="ghost">
						<Settings className="size-5 text-sidebar-foreground/70" />
					</Button>
					<ThemeSwitcher />
				</div>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
};
