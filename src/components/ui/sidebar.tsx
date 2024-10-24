'use client';

import React, { useState, useEffect } from 'react';
import { Nav } from './nav';
import {
  ChevronRight,
  HousePlus,
  LayoutDashboard,
  ShoppingCart,
  Mail
} from 'lucide-react';
import { Button } from './button';
import { useWindowWidth } from '@react-hook/window-size';

type Props = {};

export default function Sidebar({}: Props) {
  const [isClient, setIsClient] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Return null if not on client side

  return (
    <div className="relative min-w-[80px] border-r px-3 pb-10 pt-24">
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button variant="secondary" className="rounded-full p-2" onClick={toggleSidebar}>
            <ChevronRight />
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutDashboard,
            variant: 'default',
          },
          {
            title: 'Properties',
            href: '/dashboard/properties',
            icon: HousePlus,
            variant: 'ghost',
          },
          {
            title: 'Inquiries',
            href: '/dashboard/Inquiries',
            icon: Mail,
            variant: 'ghost',
          }
        ]}
      />
    </div>
  );
}
