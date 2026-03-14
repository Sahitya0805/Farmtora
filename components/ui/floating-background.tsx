'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, type MotionValue } from 'framer-motion';
import { Leaf, Sprout, Sun, Droplets, CloudRain, Tractor, Wheat, Flower2, TreePine, Cloud } from 'lucide-react';

const FloatingBackground = () => {
    const [isMounted, setIsMounted] = useState(false);
    const mouseX = useMotionValue<number>(0);
    const mouseY = useMotionValue<number>(0);

    useEffect(() => {
        setIsMounted(true);
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            mouseX.set(clientX);
            mouseY.set(clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Use useMemo to prevent re-calculating initial random states on every render
    const elements = useMemo(() => {
        const icons = [
            <Leaf className="text-farm-emerald/20" />,
            <Sprout className="text-farm-green/20" />,
            <Sun className="text-farm-sun/20" />,
            <Droplets className="text-farm-sky/20" />,
            <CloudRain className="text-farm-sky/20" />,
            <Tractor className="text-farm-soil/15" />,
            <Wheat className="text-farm-sun/15" />,
            <Flower2 className="text-rose-400/15" />,
            <TreePine className="text-farm-green/15" />,
            <Cloud className="text-slate-300/20" />,
        ];

        return Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            icon: icons[i % icons.length],
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 20 + Math.random() * 60,
            duration: 15 + Math.random() * 25,
            delay: Math.random() * 10,
            parallaxFactor: 0.05 + Math.random() * 0.1,
        }));
    }, []);

    if (!isMounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
            {elements.map((el) => (
                <ParallaxElement key={el.id} element={el} mouseX={mouseX} mouseY={mouseY} />
            ))}
        </div>
    );
};

const ParallaxElement = ({ element, mouseX, mouseY }: { element: any, mouseX: MotionValue<number>, mouseY: MotionValue<number> }) => {
    const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });

    const x = useTransform(springX, (val: number) => (val * (element.parallaxFactor as number)));
    const y = useTransform(springY, (val: number) => (val * (element.parallaxFactor as number)));

    return (
        <motion.div
            style={{
                position: 'absolute',
                top: `${element.y}%`,
                left: `${element.x}%`,
                width: element.size,
                height: element.size,
                x,
                y,
            } as any}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
                opacity: 1,
                scale: 1,
                y: [0, -40, 0],
                rotate: [0, 15, -15, 0]
            }}
            transition={{
                opacity: { duration: 2 },
                scale: { duration: 1.5 },
                y: { duration: element.duration, repeat: Infinity, ease: "easeInOut", delay: element.delay },
                rotate: { duration: element.duration * 1.2, repeat: Infinity, ease: "easeInOut", delay: element.delay }
            }}
        >
            {React.cloneElement(element.icon as React.ReactElement<any>, { size: element.size })}
        </motion.div>
    );
};

export default FloatingBackground;
