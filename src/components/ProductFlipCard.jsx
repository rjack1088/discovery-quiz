import { useState } from 'react';

// A product tile showing highlight bullets. On devices with a mouse (matchMedia
// checked once via lazy state init), hovering flips the tile in place. On touch
// devices, tapping opens a larger centered overlay instead — the flipped tile's
// back face is too small to read comfortably on mobile. Only used for BoxFlyer's
// "card" size — the static export tiles never need this since neither
// interaction makes sense on a downloaded PNG.
export default function ProductFlipCard({ item, onOpen }) {
  const [flipped, setFlipped] = useState(false);
  const [canHover] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches);

  const highlights = item.highlights || [];

  return (
    <div
      className="w-[calc(50%-3px)] h-24 [perspective:600px]"
      onMouseEnter={() => canHover && setFlipped(true)}
      onMouseLeave={() => canHover && setFlipped(false)}
      onClick={() => !canHover && onOpen(item)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d]"
        style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* Front */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-white rounded-lg p-1.5 flex flex-col items-center text-center">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-14 object-contain mb-1"
          />
          <span className="text-slate-900 font-bold text-[7px] leading-tight">
            {item.name}
          </span>
        </div>

        {/* Back (desktop hover only — touch uses ProductDetailOverlay instead) */}
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
