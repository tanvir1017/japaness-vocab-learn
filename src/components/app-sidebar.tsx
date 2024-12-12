"use client";

import {
  AudioWaveform,
  BookOpenCheck,
  Command,
  GalleryVerticalEnd,
  Users,
  Video,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";

// This is sample data.
export const navigationData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
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
      title: "Lesson Management",
      url: "#",
      icon: BookOpenCheck,
      isActive: true,
      items: [
        {
          title: "Add Lessons",
          url: "/dashboard/add-lessons",
        },
        {
          title: "View All Lessons",
          url: "/dashboard/view-all-lessons",
        },
        ,
        {
          title: "Add Vocabularies",
          url: "/dashboard/add-vocabularies",
        },
        {
          title: "View All Vocabularies",
          url: "/dashboard/vocabulary-management",
        },
      ],
    },
    {
      title: "Tutorials Management",
      url: "#",
      icon: Video,
      items: [
        {
          title: "Add Tutorial",
          url: "/dashboard/add-tutorial",
        },
        {
          title: "View All Tutorials",
          url: "/dashboard/view-all-tutorials",
        },
      ],
    },
    {
      title: "User Management",
      url: "#",
      icon: Users,
      items: [
        {
          title: "View All Users",
          url: "/dashboard/view-all-users",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={navigationData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navigationData.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
