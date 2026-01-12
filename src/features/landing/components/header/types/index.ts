export interface NavItem {
    label: string;
    href: string;
}

export interface NavItemProps {
  item: NavItem;
  isActive: boolean;
  className?: string;
  variant?: "desktop" | "mobile";
  onClick?: () => void; 
}

export interface HeaderProps {
    className?: string;
}

export interface DesktopNavProps {
    navItems: NavItem[];
    pathname: string;
}

export interface MobileMenuProps {
    mobileOpen: boolean;
    setMobileOpen: (open: boolean) => void;
    navItems: NavItem[];
    pathname: string;
}

export interface LogoProps {
    isScrolled?: boolean;
}
