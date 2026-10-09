---
name: framer-motion
description: Best practices, layout animations, scroll triggers, gesture controls, and performance optimizations for Framer Motion and Motion in Next.js / React applications.
---

# Framer Motion & Motion Skill Guide

This skill provides comprehensive patterns, best practices, and guidelines for building fluid 2D and 3D UI animations using **Framer Motion** (and `motion/react`) within Next.js (App Router) and React applications.

---

## 1. Setup & Import Conventions

### Next.js App Router ("use client")
Framer Motion components access browser APIs and state. All component files utilizing `motion` primitives or hooks must include `"use client"` at the top of the file.

```tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
// Or when using the unified Motion package:
// import { motion, AnimatePresence } from "motion/react";
```

---

## 2. Fundamental Animation Patterns

### Standard Component Animation (`initial`, `animate`, `exit`)
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
>
  Content
</motion.div>
```

### Staggered Children Animations (Variants)
Use variants to clean up inline styles and stagger container children automatically.

```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export function StaggerList({ items }: { items: string[] }) {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-2"
    >
      {items.map((item, idx) => (
        <motion.li key={idx} variants={itemVariants}>
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
}
```

---

## 3. Scroll-Driven Animations

### Viewport Triggers (`whileInView`)
Trigger animations when elements scroll into the viewport cleanly without manual event listeners.

```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  Scroll-triggered Card
</motion.div>
```

### Scroll Progress (`useScroll` & `useTransform`)
```tsx
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ScrollHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={ref} className="relative h-screen overflow-hidden">
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <h1>Cinematic Title</h1>
      </motion.div>
    </div>
  );
}
```

---

## 4. Interactive Gestures (Hover, Tap, Drag)

```tsx
<motion.button
  whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3)" }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: "spring", stiffness: 400, damping: 25 }}
  className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium"
>
  Interactive Button
</motion.button>
```

---

## 5. Shared Layout Animations (`layoutId`)

Seamless morphing between different components or tabs without calculating bounding boxes.

```tsx
import { useState } from "react";
import { motion } from "framer-motion";

const tabs = ["Overview", "Features", "Pricing"];

export function TabNav() {
  const [active, setActive] = useState(tabs[0]);

  return (
    <div className="flex gap-2 bg-neutral-900 p-1 rounded-xl">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className="relative px-4 py-2 text-sm font-medium transition-colors text-white"
        >
          {active === tab && (
            <motion.div
              layoutId="active-tab"
              className="absolute inset-0 bg-neutral-800 rounded-lg"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}
          <span className="relative z-10">{tab}</span>
        </button>
      ))}
    </div>
  );
}
```

---

## 6. Performance Best Practices

1. **Transform & Opacity**: Animate `transform` (`x`, `y`, `scale`, `rotate`) and `opacity` whenever possible to leverage GPU accelerated compositing. Avoid animating `width`, `height`, `top`, or `margin` directly unless using `layout`.
2. **Reduced Motion Support**: Always respect `prefers-reduced-motion` settings for accessibility.
   ```tsx
   import { useReducedMotion } from "framer-motion";
   const shouldReduceMotion = useReducedMotion();
   const animate = shouldReduceMotion ? {} : { opacity: 1, y: 0 };
   ```
3. **`willChange` optimization**: Framer Motion automatically applies GPU hints, but for heavy continuous transitions, target specific properties.
