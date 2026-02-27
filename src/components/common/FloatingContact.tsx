"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageCircle,
    Phone,
    Send,
    Facebook,
    X,
    MessageSquareText
} from "lucide-react";
import { cn } from "@/core/utils/cn";
import Image from "next/image"; // Nếu muốn dùng icon ảnh (Zalo logo gốc)

// --- PHẦN CẤU HÌNH (DỄ SỬA) ---
const CONTACT_CONFIG = [
    {
        id: "zalo",
        label: "Chat Zalo",
        // Link Zalo chuẩn: https://zalo.me/SỐ_ĐIỆN_THOẠI
        href: "https://zalo.me/0999999999",
        color: "bg-blue-600 hover:bg-blue-700",
        // Bạn có thể dùng Icon của Lucide hoặc ảnh SVG riêng
        icon: <MessageCircle className="w-5 h-5 text-white" />,
        // Nếu muốn dùng ảnh logo Zalo thật thì uncomment dòng dưới và comment dòng icon trên:
        // icon: <Image src="/icons/zalo.svg" width={20} height={20} alt="Zalo" />,
    },
    {
        id: "telegram",
        label: "Telegram",
        href: "https://t.me/username_cua_ban",
        color: "bg-sky-500 hover:bg-sky-600",
        icon: <Send className="w-5 h-5 text-white" />,
    },
    {
        id: "messenger",
        label: "Messenger",
        href: "https://m.me/fanpage_id",
        color: "bg-indigo-600 hover:bg-indigo-700",
        icon: <Facebook className="w-5 h-5 text-white" />,
    },
    {
        id: "phone",
        label: "0999.999.999",
        href: "tel:0999999999",
        color: "bg-green-600 hover:bg-green-700",
        icon: <Phone className="w-5 h-5 text-white" />,
    },
];

// --- LOGIC COMPONENT ---
export const FloatingContact = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // 1. Logic ẩn khỏi trang Admin
    // Nếu đường dẫn bắt đầu bằng /admin hoặc /dashboard thì không render gì cả
    if (pathname?.startsWith("/admin") || pathname?.startsWith("/dashboard")) {
        return null;
    }

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

            {/* Các nút con (Zalo, Tele...) */}
            <AnimatePresence>
                {isOpen && (
                    <div className="flex flex-col items-end gap-3 mb-2">
                        {CONTACT_CONFIG.map((item, index) => (
                            <motion.a
                                key={item.id}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                                transition={{ duration: 0.2, delay: index * 0.05 }}
                                className="flex items-center gap-3 group"
                            >
                                {/* Tooltip Label (Hiện khi hover hoặc luôn hiện tùy ý) */}
                                <span className="bg-white text-jet/80 px-3 py-1.5 rounded-lg shadow-md text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                    {item.label}
                                </span>

                                {/* Button Icon */}
                                <div className={cn(
                                    "w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110",
                                    item.color
                                )}>
                                    {item.icon}
                                </div>
                            </motion.a>
                        ))}
                    </div>
                )}
            </AnimatePresence>

            {/* Nút chính (Toggle) */}
            <button
                onClick={toggleOpen}
                className={cn(
                    "relative w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300",
                    "bg-gradient-to-r from-terracotta to-orange-600 hover:scale-105 active:scale-95",
                    // Hiệu ứng Ring khi chưa mở để thu hút sự chú ý
                    !isOpen && "animate-pulse-ring"
                )}
            >
                <div className="relative z-10">
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                            >
                                <X className="text-white w-7 h-7" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="open"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                            >
                                <MessageSquareText className="text-white w-7 h-7" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Hiệu ứng sóng lan tỏa (Ping) nếu chưa mở */}
                {!isOpen && (
                    <span className="absolute inline-flex h-full w-full rounded-full bg-terracotta opacity-75 animate-ping"></span>
                )}
            </button>
        </div>
    );
};