"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollTrigger, deferScrollTriggers } from "@/app/lib/anim";
import { useHydratedReducedMotion } from "@/app/lib/motion";
import { navLinks, hero } from "@/app/lib/content";
import { scrollToId } from "@/app/lib/scroll";

type LenisApi = {
  stop: () => void;
  start: () => void;
  scrollTo: (target: number | HTMLElement, options?: object) => void;
};

function getLenis(): LenisApi | undefined {
  return (window as unknown as { __lenis?: LenisApi }).__lenis;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const reduceMotion = useHydratedReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) > 40 || (y === 0 && last !== 0)) {
        setScrolled(y > 80);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* active-section tracking */
  useEffect(() => {
    let alive = true;
    let triggers: ScrollTrigger[] = [];
    deferScrollTriggers().then(() => {
      if (!alive) return;
      const sections = navLinks
        .map((l) => document.querySelector(l.href))
        .filter(Boolean) as HTMLElement[];
      const update = () => {
        const probe = window.scrollY + window.innerHeight * 0.45;
        let current = "";
        for (const el of sections) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (probe >= top) current = el.id;
          else break;
        }
        setActive(current);
      };
      update();
      triggers = sections.map((el) =>
        ScrollTrigger.create({
          trigger: el,
          start: () =>
            el.getBoundingClientRect().top +
            window.scrollY -
            window.innerHeight * 0.45,
          end: () =>
            el.getBoundingClientRect().top +
            window.scrollY +
            el.offsetHeight -
            window.innerHeight * 0.45,
          onToggle: update,
          onRefresh: update,
        }),
      );
    });
    return () => {
      alive = false;
      triggers.forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    const toggle = toggleRef.current;
    if (!menu || !toggle) return;

    const previousOverflow = document.body.style.overflow;
    const backgroundElements = [
      document.getElementById("main"),
      document.querySelector("footer"),
    ].filter((element): element is HTMLElement => element instanceof HTMLElement);
    const inertState = backgroundElements.map((element) => [
      element,
      element.hasAttribute("inert"),
    ] as const);

    getLenis()?.stop();
    document.body.style.overflow = "hidden";
    backgroundElements.forEach((element) => element.setAttribute("inert", ""));

    const focusableSelector =
      'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';
    const focusFirst = window.setTimeout(() => {
      menu.querySelector<HTMLElement>(focusableSelector)?.focus();
    }, reduceMotion ? 0 : 120);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = Array.from(
        menu.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === last || !menu.contains(document.activeElement))
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(focusFirst);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      getLenis()?.start();
      inertState.forEach(([element, wasInert]) => {
        if (!wasInert) element.removeAttribute("inert");
      });
      if (menu.contains(document.activeElement)) toggle.focus();
    };
  }, [open, reduceMotion]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  const closeAndGo = (href: string) => {
    setOpen(false);
    setTimeout(() => scrollToId(href), 80);
  };

  const toggle = () => setOpen((current) => !current);

  const toTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const overlayVariants = {
    hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: -18 },
    visible: { opacity: 1, y: 0 },
    exit: reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 },
  };
  const itemVariants = {
    hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 },
  };
  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };
  const menuTransition = reduceMotion
    ? { duration: 0.12, ease: [0.2, 0, 0, 1] as [number, number, number, number] }
    : { duration: 0.34, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

  return (
    <>
      <div
        className={`fixed inset-x-0 z-[250] px-4 transition-all duration-500 md:px-6 ${
          scrolled ? "translate-y-2" : "translate-y-0"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1200px] items-center justify-between transition-all duration-500 will-change-[background-color,border-color,transform,opacity] ${
            scrolled
              ? "mt-1 max-w-[1120px] rounded-full border border-slate-border/25 bg-onyx-canvas/85 py-2 pl-5 pr-2 backdrop-blur-xl md:pl-6"
              : "bg-transparent py-6"
          }`}
        >
          <div className="flex min-w-0 items-center gap-4 md:gap-6">
            <button
              onClick={toTop}
              className="group flex shrink-0 items-center gap-3"
              aria-label="Agung Nitya — kembali ke atas"
            >
              <span className="relative flex h-4 w-4 items-center justify-center">
                <span className="absolute inset-0 rotate-45 border border-trust-blue transition-transform duration-500 group-hover:rotate-[135deg]" />
                <span className="h-1 w-1 rounded-full bg-trust-blue" />
              </span>
              <span className="font-display text-sm font-medium tracking-[0.18em] text-ivory-text uppercase">
                Agung Nitya
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2 md:gap-5">
            <div className="hidden items-center gap-2 md:flex">
              <span className="text-[12px] tracking-[0.2em] text-ash-text">
                SIMRS
              </span>
            </div>

            <nav
              className="hidden items-center gap-1 lg:flex"
              aria-label="Navigasi utama"
            >
              {navLinks.map((link) => {
                const isActive = active === link.href.slice(1);
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollToId(link.href)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative rounded-[40px] px-4 py-1.5 text-[15px] leading-none text-ivory-text transition-colors duration-300 ${
                      isActive ? "bg-obsidian-button" : "hover:bg-obsidian-button/40"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-[3px] left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-trust-blue transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </button>
                );
              })}
            </nav>

            <motion.button
              type="button"
              onClick={() => scrollToId("#kontak")}
              whileHover={reduceMotion ? undefined : { scale: 1.03, y: -1 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              transition={{
                duration: 0.28,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
              className="hidden shrink-0 rounded-[32px] bg-healthcare-blue px-5 py-2 text-[15px] text-pure-white transition-colors duration-300 hover:bg-[#6d8aff] lg:inline-flex"
            >
              {hero.ctaPrimary}
            </motion.button>

            <button
              ref={toggleRef}
              type="button"
              onClick={toggle}
              className="-mx-3 flex min-h-[44px] items-center gap-3 rounded-[40px] px-3 lg:hidden"
              aria-label={open ? "Tutup menu" : "Buka menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <span className="text-[14px] text-ivory-text">
                {open ? "Tutup" : "Menu"}
              </span>
              <span className="relative flex h-6 w-6 items-center justify-center">
                <span
                  className={`absolute h-px w-5 bg-ivory-text transition-all duration-500 ${
                    open ? "rotate-45" : "-translate-y-[3px]"
                  }`}
                />
                <span
                  className={`absolute h-px w-5 bg-ivory-text transition-all duration-500 ${
                    open ? "-rotate-45" : "translate-y-[3px]"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* mobile menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`fixed inset-0 z-[240] lg:hidden ${
          open ? "pointer-events-auto bg-onyx-canvas" : "pointer-events-none"
        }`}
        aria-hidden={!open}
        aria-label="Menu navigasi"
        aria-modal={open ? true : undefined}
        role="dialog"
        inert={!open ? true : undefined}
      >
        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              key="mobile-menu-content"
              className="absolute inset-0 flex flex-col"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={menuTransition}
            >
              <div className="relative flex flex-1 flex-col justify-center gap-1 px-7 pt-20">
                {navLinks.map((link, i) => {
                  const isActive = active === link.href.slice(1);
                  return (
                    <motion.div
                      key={link.href}
                      className="overflow-hidden py-1"
                      variants={itemVariants}
                      transition={menuTransition}
                    >
                      <button
                        type="button"
                        onClick={() => closeAndGo(link.href)}
                        className={`flex items-baseline gap-4 font-display text-[clamp(2rem,9vw,3rem)] font-medium uppercase leading-[1.05] tracking-tight transition-colors duration-300 ${
                          isActive ? "text-ivory-text" : "text-ash-text"
                        }`}
                      >
                        <span className="text-[12px] tracking-[0.14em] text-slate-border">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {link.label}
                        {isActive ? (
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-trust-blue" />
                        ) : null}
                      </button>
                    </motion.div>
                  );
                })}
                <motion.div
                  className="mt-9 overflow-hidden"
                  variants={itemVariants}
                  transition={menuTransition}
                >
                  <motion.button
                    type="button"
                    onClick={() => closeAndGo("#kontak")}
                    whileHover={reduceMotion ? undefined : { scale: 1.03, y: -1 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    transition={{
                      duration: 0.28,
                      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                    }}
                    className="rounded-[32px] bg-trust-blue px-7 py-3.5 text-[15px] text-pure-white"
                  >
                    {hero.ctaPrimary}
                  </motion.button>
                </motion.div>
              </div>
              <div className="relative flex items-end justify-between px-7 pb-10">
                <motion.span
                  variants={fadeVariants}
                  transition={menuTransition}
                  className="text-[13px] text-ash-text"
                >
                  PT. Agung Wijaya Nitya
                </motion.span>
                <motion.span
                  variants={fadeVariants}
                  transition={menuTransition}
                  className="text-[13px] text-ash-text/80"
                >
                  Sistem aktif
                </motion.span>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
}
