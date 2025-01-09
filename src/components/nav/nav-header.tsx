"use client"

import { PencilRulerIcon } from "lucide-react"
import * as React from "react"

import {
    SidebarMenu,
    SidebarMenuItem,
} from "~/components/ui/sidebar"
import { ThemeSwitch } from "../theme/theme-switch"

export function NavHeader() {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <div
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground p-2 group-data-[state=collapsed]:p-1 items-center gap-4 flex flex-row"
                >
                    <div className="flex aspect-square size-8 group-data-[state=collapsed]:size-6 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                        <PencilRulerIcon size={14} />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                            Tools
                        </span>
                    </div>
                    <div className="group-data-[state=collapsed]:hidden">
                        <ThemeSwitch />
                    </div>
                </div>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
