"use client";

import { cn } from "@/lib/utils";
import { ChevronUp, Menu, X } from "lucide-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import React, { useRef, useState } from "react";

export interface DockItem {
  title: string;
  icon: React.ReactNode;
  href: string;
  onClick?: () => void;
  target?: string;
  isActive?: boolean;
}

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
  orientation = "vertical",
  isLiquidGlass = false,
}: {
  items: DockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
  orientation?: "horizontal" | "vertical";
  isLiquidGlass?: boolean;
}) => {
  return (
    <>
      <FloatingDockDesktop
        items={items}
        className={desktopClassName}
        orientation={orientation}
        isLiquidGlass={isLiquidGlass}
      />
      <FloatingDockMobile
        items={items}
        className={mobileClassName}
        isLiquidGlass={isLiquidGlass}
      />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
  isLiquidGlass,
}: {
  items: DockItem[];
  className?: string;
  isLiquidGlass?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden z-50", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute bottom-full mb-3 flex flex-col gap-2.5 items-center"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  scale: 0.8,
                  transition: {
                    delay: idx * 0.04,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.04 }}
              >
                {item.onClick ? (
                  <button
                    onClick={() => {
                      item.onClick?.();
                      setOpen(false);
                    }}
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg transition-all",
                      isLiquidGlass
                        ? "bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_4px_20px_rgba(255,45,120,0.3)] hover:bg-[#ff2d78]/80"
                        : "bg-[#12121a] border border-white/10 hover:bg-[#ff2d78]/80",
                      item.isActive && "bg-[#ff2d78] ring-2 ring-[#ff6b9d]"
                    )}
                    title={item.title}
                  >
                    <div className="h-5 w-5 flex items-center justify-center">
                      {item.icon}
                    </div>
                  </button>
                ) : (
                  <a
                    href={item.href}
                    target={item.target}
                    rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg transition-all",
                      isLiquidGlass
                        ? "bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_4px_20px_rgba(255,45,120,0.3)] hover:bg-[#ff2d78]/80"
                        : "bg-[#12121a] border border-white/10 hover:bg-[#ff2d78]/80",
                      item.isActive && "bg-[#ff2d78] ring-2 ring-[#ff6b9d]"
                    )}
                    title={item.title}
                  >
                    <div className="h-5 w-5 flex items-center justify-center">
                      {item.icon}
                    </div>
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full text-white shadow-2xl transition-transform active:scale-95",
          isLiquidGlass
            ? "bg-white/15 backdrop-blur-2xl border border-white/30 shadow-[0_8px_32px_rgba(255,45,120,0.4)]"
            : "bg-[#ff2d78] shadow-[0_4px_20px_rgba(255,45,120,0.5)]"
        )}
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
  orientation = "vertical",
  isLiquidGlass = false,
}: {
  items: DockItem[];
  className?: string;
  orientation?: "horizontal" | "vertical";
  isLiquidGlass?: boolean;
}) => {
  const mousePos = useMotionValue(Infinity);
  const isVertical = orientation === "vertical";

  return (
    <motion.div
      onMouseMove={(e) => mousePos.set(isVertical ? e.pageY : e.pageX)}
      onMouseLeave={() => mousePos.set(Infinity)}
      className={cn(
        "hidden md:flex items-center gap-3 rounded-2xl px-3 py-3 transition-all duration-300 pointer-events-auto",
        isVertical ? "flex-col w-fit" : "flex-row h-fit mx-auto",
        isLiquidGlass
          ? "bg-white/[0.07] backdrop-blur-2xl border border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_25px_rgba(255,45,120,0.25),inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.5)]"
          : "bg-[#12121a]/90 backdrop-blur-xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_15px_rgba(255,107,157,0.2)]",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer
          mousePos={mousePos}
          key={item.title}
          item={item}
          isVertical={isVertical}
          isLiquidGlass={isLiquidGlass}
        />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mousePos,
  item,
  isVertical,
  isLiquidGlass,
}: {
  mousePos: MotionValue;
  item: DockItem;
  isVertical: boolean;
  isLiquidGlass: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mousePos, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const scrollX = typeof window !== "undefined" ? window.scrollX : 0;
    if (isVertical) {
      const elementCenterY = bounds.y + scrollY + bounds.height / 2;
      return val - elementCenterY;
    } else {
      const elementCenterX = bounds.x + scrollX + bounds.width / 2;
      return val - elementCenterX;
    }
  });

  const widthTransform = useTransform(distance, [-140, 0, 140], [42, 64, 42]);
  const heightTransform = useTransform(distance, [-140, 0, 140], [42, 64, 42]);

  const widthTransformIcon = useTransform(distance, [-140, 0, 140], [20, 30, 20]);
  const heightTransformIcon = useTransform(distance, [-140, 0, 140], [20, 30, 20]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 170,
    damping: 14,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 170,
    damping: 14,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 170,
    damping: 14,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 170,
    damping: 14,
  });

  const [hovered, setHovered] = useState(false);

  const contentNode = (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex aspect-square items-center justify-center rounded-xl transition-all cursor-pointer group",
        isLiquidGlass
          ? "bg-white/10 hover:bg-[#ff2d78] text-white border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_0_20px_rgba(255,45,120,0.8)]"
          : "bg-white/5 hover:bg-[#ff6b9d]/80 text-white/80 hover:text-white border border-white/10",
        item.isActive &&
          (isLiquidGlass
            ? "bg-[#ff2d78] text-white border-white/40 shadow-[0_0_20px_rgba(255,45,120,0.7)]"
            : "bg-[#ff2d78] text-white border-white/20")
      )}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: isVertical ? 0 : 8, x: isVertical ? 8 : "-50%" }}
            animate={{ opacity: 1, y: 0, x: isVertical ? 14 : "-50%" }}
            exit={{ opacity: 0, y: isVertical ? 0 : 4, x: isVertical ? 8 : "-50%" }}
            className={cn(
              "absolute w-fit rounded-lg px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-white z-50 pointer-events-none shadow-xl border border-white/20",
              isVertical
                ? "left-full top-1/2 -translate-y-1/2 bg-[#12121a]/95 backdrop-blur-md"
                : "-top-9 left-1/2 bg-[#12121a]/95 backdrop-blur-md"
            )}
          >
            {item.title}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        style={{ width: widthIcon, height: heightIcon }}
        className="flex items-center justify-center"
      >
        {item.icon}
      </motion.div>
    </motion.div>
  );

  if (item.onClick) {
    return <button onClick={item.onClick} aria-label={item.title}>{contentNode}</button>;
  }

  return (
    <a
      href={item.href}
      target={item.target}
      rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
      aria-label={item.title}
    >
      {contentNode}
    </a>
  );
}
