"use client"

import * as React from "react"
import {
    type LucideIcon,
    SquareTerminal,
} from "lucide-react"

import { NavMain } from "~/components/nav/nav-main"
import { NavHeader } from "~/components/nav/nav-header"
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarRail,
} from "~/components/ui/sidebar"

export type Data = {
    title: string,
    icon: LucideIcon,
    isActive?: boolean,
    items?: {
        title: string,
        url: string,
    }[],
}[]

// This is sample data.
const data: Data = [
    {
        title: "Calculators",
        icon: SquareTerminal,
        isActive: true,
        items: [
            {
                title: "GPA",
                url: "/calculators/gpa",
            },
        ],
    },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <NavHeader />
            </SidebarHeader>
            <SidebarRail />
            <SidebarContent>
                <NavMain items={data} />
            </SidebarContent>
        </Sidebar>
    )
}
