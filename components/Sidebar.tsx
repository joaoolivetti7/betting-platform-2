"use client";

import Image from "next/image"; // Para lidar com imagens
import SoccerIcon from "@/icons/soccer.png";
import BasketballIcon from "@/icons/basketball.png";
import TennisIcon from "@/icons/tennis.png";
import BaseballIcon from "@/icons/baseball.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { StaticImageData } from "next/image";
import Link from "next/link";

type IconType =
  | StaticImageData
  | React.ComponentType<React.SVGProps<SVGSVGElement>>;

const items: { title: string; url: string; icon: IconType }[] = [
  {
    title: "Futebol",
    url: "/soccer",
    icon: SoccerIcon,
  },
  {
    title: "Basquete",
    url: "/basketball",
    icon: BasketballIcon,
  },
  {
    title: "Tênis",
    url: "/tennis",
    icon: TennisIcon,
  },
  {
    title: "Beisebol",
    url: "/baseball",
    icon: BaseballIcon,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="w-48">
      <SidebarContent className="bg-gradient-to-b from-blue-950  to-blue-800 text-white">
        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-center text-white">
            Categorias
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="text-white hover:bg-blue-900 hover:text-white">
                    <Link
                      href={item.url}
                      className="flex items-center space-x-2 "
                    >
                      {"src" in item.icon ? (
                        <Image
                          src={item.icon}
                          alt={item.title}
                          width={16}
                          height={16}

                        />
                      ) : (
                        <item.icon className="w-6 h-6" />
                      )}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
