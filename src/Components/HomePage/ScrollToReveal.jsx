'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollWordReveal = ({
  text = `DiObral is a premium fashion brand committed to delivering high-quality, timeless clothing with a modern edge. Rooted in sophistication and minimalism, DiObral blends luxury with everyday wear, empowering individuals to express confidence through elegant, understated style. The brand celebrates craftsmanship, clean design, and detail-driven aesthetics — all reflected in its sleek, intuitive web experience built to match the identity of the label.`,
}) => {
  const containerRef = useRef(null);
  const words = text.split(' ');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const SCROLL_END = 0.65;

  return (
    <div className="max-w-7xl mx-auto px-4 py-32">
      <div
        ref={containerRef}
        className="relative max-w-3xl mx-auto text-[20px] lg:text-3xl font-semibold leading-relaxed"
      >
        {/* Gray background layer (static) */}
        <div className="absolute inset-0 flex flex-wrap justify-center text-gray-400 opacity-40 pointer-events-none select-none">
          {words.map((word, i) => (
            <span key={`gray-${i}`} className="whitespace-pre mr-1">
              {word}
            </span>
          ))}
        </div>

        {/* Animated foreground layer */}
        <div className="relative flex flex-wrap justify-center">
          {words.map((word, i) => {
            const start = (i / words.length) * SCROLL_END;
            const end = ((i + 1) / words.length) * SCROLL_END;

            const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
            const x = useTransform(scrollYProgress, [start, end], [-2, 0]);

            return (
              <motion.span
                key={`motion-${i}`}
                style={{ opacity, x }}
                className="inline-block text-center whitespace-pre mr-1 text-black"
              >
                {word}
              </motion.span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScrollWordReveal;
