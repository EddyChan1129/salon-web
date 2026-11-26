"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function afterPagePaint(setup: () => void) {
  // Give Next's streamed components time to hydrate before GSAP sets inline styles.
  let animationFrame = 0;
  const schedule = () => {
    animationFrame = requestAnimationFrame(() => {
      animationFrame = requestAnimationFrame(setup);
    });
  };
  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });

  return () => {
    window.removeEventListener("load", schedule);
    cancelAnimationFrame(animationFrame);
  };
}

export function SiteMotion() {
  const pathname = usePathname();
  const opening = useRef<HTMLDialogElement>(null);
  const firstPath = useRef(pathname);
  const played = useRef(false);

  useEffect(() => {
    const dialog = opening.current;
    if (!dialog || firstPath.current !== "/" || window.location.hash) return;
    const motion = gsap.matchMedia();
    const cancelPaint = afterPagePaint(() => {
      motion.add("(prefers-reduced-motion: no-preference)", () => {
        if (played.current || window.location.pathname !== "/" || window.location.hash || document.querySelector("dialog[open]")) return;
        const hero = document.querySelector(".hero");
        if (!hero) return;
        const elements = document.querySelectorAll("[data-hero-enter]");
        const photo = hero.querySelector("[data-hero-image]");

        const finish = () => {
          played.current = true;
          if (dialog.open) dialog.close();
        };

        dialog.showModal();
        gsap.set(elements, { autoAlpha: 0, y: 21 });
        gsap.set(photo, { clipPath: "inset(0 0 0 9%)", autoAlpha: 0 });

        const timeline = gsap.timeline({ onComplete: finish })
          .fromTo(".opening-type", { autoAlpha: 0, xPercent: 8 }, { autoAlpha: 1, xPercent: -11, duration: 2.45, ease: "none" }, 0.4)
          .fromTo(".opening-statement", { y: 17, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.72, ease: "power3.out" }, 0.85)
          .to(".opening-statement, .opening-type", { autoAlpha: 0, duration: 0.4, ease: "power2.in" }, 2.78)
          .to(dialog, { autoAlpha: 0, duration: 0.43, ease: "power3.inOut" }, 3.02)
          .call(finish, [], 3.38)
          .to(photo, { autoAlpha: 1, clipPath: "inset(0 0 0 0%)", duration: 0.78, ease: "expo.out", clearProps: "all" }, 3.2)
          .to(elements, { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.07, ease: "power3.out", clearProps: "all" }, 3.34);

        const skip = (event: Event) => {
          event.preventDefault();
          timeline.progress(1);
          document.getElementById("main")?.focus({ preventScroll: true });
        };
        const skipButton = dialog.querySelector("button");
        dialog.addEventListener("cancel", skip);
        skipButton?.addEventListener("click", skip);

        return () => {
          if (dialog.open) dialog.close();
          dialog.removeEventListener("cancel", skip);
          skipButton?.removeEventListener("click", skip);
        };
      });
    });
    return () => {
      cancelPaint();
      motion.revert();
    };
  }, []);

  useEffect(() => {
    if (pathname === "/booking" || pathname === "/studio") return;
    const motion = gsap.matchMedia();
    const cancelPaint = afterPagePaint(() => {
      motion.add("(prefers-reduced-motion: no-preference)", () => {
        if (pathname !== "/") {
          gsap.from(".page-heading", { opacity: 0, y: 9, duration: 0.38, ease: "power2.out", clearProps: "opacity,transform" });
        }

        const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        reveals.forEach((element) => {
          if (element.getBoundingClientRect().top < window.innerHeight * 0.85 || window.location.hash) return;
          const type = element.dataset.reveal;
          const scrollTrigger = { trigger: element, start: "top 92%", once: true };
          if (type === "text") {
            gsap.from(element, { y: 24, clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: "power3.out", scrollTrigger, clearProps: "all" });
          } else if (type === "image") {
            gsap.from(element, { clipPath: "inset(0 0 0 100%)", duration: 1.08, ease: "power3.out", scrollTrigger, clearProps: "all" });
          } else {
            const position = Array.from(element.parentElement?.children ?? []).indexOf(element);
            gsap.from(element, { opacity: 0, y: 15, duration: 0.62, delay: type === "shape" ? position * 0.055 : 0.14, ease: "power3.out", scrollTrigger, clearProps: "all" });
          }
        });

        const heroImage = document.querySelector(".hero-photo img");
        if (heroImage) {
          gsap.to(heroImage, {
            yPercent: 5,
            scale: 1.11,
            ease: "none",
            scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
          });
        }

        const discover = document.querySelector(".discover");
        if (discover) {
          gsap.fromTo(discover, { backgroundColor: "#f8f5ee" }, {
            backgroundColor: "#f0eae0",
            ease: "none",
            scrollTrigger: { trigger: discover, start: "top 96%", end: "top 36%", scrub: true },
          });
        }

        const atelierImage = document.querySelector(".atelier-photo img, .about-image img");
        if (atelierImage) {
          gsap.fromTo(atelierImage, { yPercent: -3, scale: 1.09 }, {
            yPercent: 3,
            ease: "none",
            scrollTrigger: { trigger: atelierImage.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          });
        }
      });
    });
    return () => {
      cancelPaint();
      motion.revert();
    };
  }, [pathname]);

  return (
    <dialog className="opening" ref={opening} aria-label="Nagi opening animation">
      <div className="opening-type" aria-hidden="true">Welcome to Nagi</div>
      <p className="opening-statement">Beauty begins <em>with you.</em></p>
      <button className="text-link opening-skip" type="button">Skip intro</button>
    </dialog>
  );
}
