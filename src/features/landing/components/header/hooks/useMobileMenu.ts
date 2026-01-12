// components/Header/hooks/useMobileMenu.ts
import { useState, useEffect } from "react";

export const useMobileMenu = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  const openMenu = () => setMobileOpen(true);
  const closeMenu = () => setMobileOpen(false);
  const toggleMenu = () => setMobileOpen(prev => !prev);

  return { 
    mobileOpen, 
    setMobileOpen,
    openMenu,
    closeMenu,
    toggleMenu
  };
};