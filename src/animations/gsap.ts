import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsapTimeline(callback: (tl: gsap.core.Timeline, ctx: gsap.Context) => void, deps: unknown[] = []) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context((self) => {
      const tl = gsap.timeline();
      callback(tl, self);
    }, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

export function useGsapReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  y?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  start?: string;
}) {
  const ref = useRef<T>(null);
  const { y = 40, duration = 0.7, stagger = 0.12, delay = 0, start = 'top 85%' } = options || {};

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const items = ref.current!.querySelectorAll('[data-reveal]');
      if (items.length === 0) return;
      gsap.from(items, {
        y,
        opacity: 0,
        duration,
        stagger,
        delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start },
      });
    }, ref);
    return () => ctx.revert();
  }, [y, duration, stagger, delay, start]);

  return ref;
}

export function useGsapCounter(target: number, options?: { duration?: number; start?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { duration = 2, start = 'top 80%', suffix = '' } = options || {};

  useEffect(() => {
    if (!ref.current) return;
    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: target,
        duration,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start },
        onUpdate: () => {
          if (ref.current) ref.current.textContent = Math.round(obj.val).toLocaleString() + suffix;
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [target, duration, start, suffix]);

  return ref;
}

export { gsap, ScrollTrigger };
