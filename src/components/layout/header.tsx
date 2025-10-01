"use client";

import Link from 'next/link';
import { siteConfig, allNavItems } from '@/config/site';
import { ThemeToggle } from '@/components/theme-toggle';
import { CodeXml } from 'lucide-react';
import Image from 'next/image';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-2 md:px-8 flex h-14 max-w-screen-2xl items-center">

                <div className="mr-4 flex">
                  <Link href="/" className="mr-6 flex items-center space-x-2">
                    <Image src="/Images/logo.png" alt={`${siteConfig.name} logo`} width={32} height={32} className='h-auto w-16'/>
                    <span className="font-bold sm:inline-block">
                      {siteConfig.name}
                    </span>
                  </Link>
                </div>

        <div className="flex flex-1 items-center justify-center space-x-2">
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {allNavItems.map((item) => (
                <NavigationMenuItem key={item.path}>
                  <Link href={item.path} className={navigationMenuTriggerStyle()}>
                    {item.name}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center justify-end space-x-2">
           <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {allNavItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link href={item.path}>{item.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}