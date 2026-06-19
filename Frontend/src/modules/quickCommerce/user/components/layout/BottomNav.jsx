import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, ShoppingBag, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
    getQuickCategoriesPath,
    getQuickHomePath,
    getQuickOrdersPath,
    getQuickProfilePath,
} from '../../utils/routes';
import DraggableModuleSwitcher from "../../../../common/components/DraggableModuleSwitcher";

const BottomNav = () => {
    const location = useLocation();
    const isSharedQuickProfileRoute =
        location.pathname === '/profile' &&
        new URLSearchParams(location.search).get('from') === 'quick';
    const navItems = [
        { label: 'Home', icon: Home, path: getQuickHomePath(location.pathname) },
        { label: 'Category', icon: LayoutGrid, path: getQuickCategoriesPath() },
        { label: 'Orders', icon: ShoppingBag, path: getQuickOrdersPath() },
        { label: 'Profile', icon: User, path: getQuickProfilePath() },
    ];
    const isActivePath = (targetPath) => {
        if (targetPath === getQuickProfilePath() && isSharedQuickProfileRoute) {
            return true;
        }
        if (targetPath === getQuickHomePath(location.pathname)) {
            return location.pathname === targetPath;
        }
        return location.pathname === targetPath || location.pathname.startsWith(`${targetPath}/`);
    };

    return (
        <div className="fixed bottom-4 left-4 right-4 z-[500] md:hidden transition-all duration-300">
            <DraggableModuleSwitcher />
            <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 dark:border-neutral-800/80 flex items-center justify-around py-1.5 px-2 gap-1">
                {navItems.map((item) => {
                    const isActive = isActivePath(item.path);

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex-1 flex flex-col items-center justify-center gap-0.5 py-1.5 px-2.5 rounded-full transition-all duration-200 relative group",
                                isActive ? "bg-[#FE730E]/10" : ""
                            )}
                        >
                            <motion.div
                                animate={{
                                    scale: isActive ? 1.05 : 1
                                }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                className="flex items-center justify-center"
                            >
                                <item.icon
                                    size={20}
                                    strokeWidth={isActive ? 2.5 : 2}
                                    className={cn(
                                        "transition-colors duration-300",
                                        isActive ? "text-[#FE730E]" : "text-gray-500 dark:text-gray-400"
                                    )}
                                />
                            </motion.div>

                            <span
                                className={cn(
                                    "text-[9px] font-black tracking-wider uppercase transition-colors duration-300",
                                    isActive ? "text-[#FE730E]" : "text-gray-500 dark:text-gray-400"
                                )}
                            >
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default BottomNav;
