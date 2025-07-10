"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"
import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Job Offers",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Popular",
          url: "#",
        },
        {
          title: "Recent",
          url: "#",
        },
        {
          title: "Stared",
          url: "#",
        },
      ],
    },
    {
      title: "Activity",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "My claims",
          url: "#",
        },
        {
          title: "Recomandations",
          url: "#",
        },
        {
          title: "History",
          url: "#",
        },
      ],
    },
    {
      title: "Companies",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Popular",
          url: "#",
        },
        {
          title: "Recently joined",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Review Claims",
      url: "#",
      icon: Frame,
    },
    {
      name: "Statistics",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Look for Employee",
      url: "#",
      icon: Map,
    },
  ],
}
export interface AppUser {
  id: number
  name?: string | null
  email: string
  avatar?: string | null
  // add any other fields you use in UI
}
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  currentUser: AppUser
}
export function AppSidebar({currentUser, ...props }: AppSidebarProps) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader className="bg-primary text-secondary">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Apply Path</span>
                  {/* <span className="truncate text-xs"></span> */}
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain}/>
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="bg-black text-secondary hover:cursor-pointer">
        <NavUser currentUser={currentUser}/>
      </SidebarFooter>
    </Sidebar>
  )
}
