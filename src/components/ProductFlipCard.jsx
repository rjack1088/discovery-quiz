import { useEffect, useRef, useState } from 'react';

// A product tile that flips to reveal highlight bullets. Uses real hover on
// devices with a mouse (matchMedia check done once on mount); falls back to
// tap-to-toggle on touch devices, since CSS-only :hover behaves inconsistently
// there. Only used for BoxFlyer's "card" size — the static export tiles never
// need this since a flip interaction is meaningless on a downloaded PNG.
export default function ProductFlipCard({ item }) {
  const [flipped, setFlipped] = useState(false);
  const canHover = useRef(false);

  useEffect(() => {
    canHover.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  }, []);

  const highlights = item.highlights || [];

  return (
    <div
      className="w-[calc(50%-3px)] h-24 [perspective:600px]"
      onMouseEnter={() => canHover.current && setFlipped(true)}
      onMouseLeave={() => canHover.current && setFlipped(false)}
      onClick={() => !canHover.current && setFlipped((f) => !f)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d]"
        style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* Front */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-white rounded-lg p-1.5 flex flex-col items-center text-center">
          <span className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-orange-500 text-white text-[6px] leading-3 text-center flip-hint-badge">
            i
          </span>
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-14 object-contain mb-1"
          />
          <span className="text-slate-900 font-bold text-[7px] leading-tight">
            {item.name}
          </span>
        </div>

        {/* Back */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-slate-800 rounded-lg p-1.5 flex flex-col items-center justify-center text-center overflow-hidden">
          <ul className="space-y-0.5">
            {highlights.slice(0, 4).map((point, i) => (
              <li key={i} className="text-white text-[6px] leading-tight">
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
