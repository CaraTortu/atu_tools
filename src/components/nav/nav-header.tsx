"use client"

import { PencilRulerIcon } from "lucide-react"
import * as React from "react"

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "~/components/ui/sidebar"
import { ThemeSwitch } from "../theme/theme-switch"
import Link from "next/link"

export function NavHeader() {
    const { isMobile, setOpenMobile } = useSidebar()

    const closeIfMobile = () => {
        if (isMobile) {
            setOpenMobile(false)
        }
    }
    return (
        <SidebarMenu>
            <SidebarMenuItem className="flex flex-row items-center p-1 gap-3" onClick={() => closeIfMobile()}>
                <Link href="/" className="flex-1">
                    <SidebarMenuButton
                        className="items-center gap-4 flex flex-row"
                        size="lg"
                    >
                        <div className="flex aspect-square size-8 group-data-[state=collapsed]:size-6 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                            <PencilRulerIcon size={14} />
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <p className="font-semibold">Toolbox</p>
                        </div>

                    </SidebarMenuButton>
                </Link>
                <div className="group-data-[state=collapsed]:hidden">
                    <ThemeSwitch />
                </div>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

