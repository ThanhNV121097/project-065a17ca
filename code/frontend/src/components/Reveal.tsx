import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * The site's one reveal: a rise of 16px and a fade as the element enters,
 * about 0.6s on the design's own easing. `delay` staggers a row of them.
 *
 * With prefers-reduced-motion the element is simply there — no transform, no
 * opacity change, nothing to wait for.
 */
export default function Reveal({ children, delay = 0, as = "div", className = "" }: {
  children: ReactNode;
  delay?: number;
  as?: "div" | "li" | "section" | "header";
  className?: string;
}) {
  const still = useReducedMotion();
  const Tag = motion[as];
  if (still) return <Tag className={className}>{children}</Tag>;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </Tag>
  );
}
