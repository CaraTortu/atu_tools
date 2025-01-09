"use client"

import * as React from "react"
import { NavMain } from "~/components/nav/nav-main"
import { NavHeader } from "~/components/nav/nav-header"
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarRail,
} from "~/components/ui/sidebar"
import { url_data } from "~/constants"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <NavHeader />
            </SidebarHeader>
            <SidebarRail />
            <SidebarContent>
                <NavMain items={url_data} />
            </SidebarContent>
        </Sidebar>
    )
}
