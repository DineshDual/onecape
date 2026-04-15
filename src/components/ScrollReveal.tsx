"use client";

import { useEffect, useRef, useCallback } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: "fade-up" | "fade-left" | "fade-right" | "scale-up" | "blur-in";
  stagger?: boolean;
  className?: string;
}

export default function ScrollReveal({
  children,
  variant = "fade-up",
  stagger = false,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const variantClass = {
    "fade-up": "reveal",
    "fade-left": "reveal-left",
    "fade-right": "reveal-right",
    "scale-up": "reveal-scale",
    "blur-in": "reveal-blur",
  }[variant];

  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Clean up will-change after animation
        setTimeout(() => {
          entry.target.classList.add("done");
        }, 1000);
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.05,
      rootMargin: "0px 0px -30px 0px",
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [handleIntersect]);

  return (
    <div
      ref={ref}
      className={`${variantClass} ${stagger ? "stagger-children" : ""} will-animate ${className}`}
    >
      {children}
    </div>
  );
}