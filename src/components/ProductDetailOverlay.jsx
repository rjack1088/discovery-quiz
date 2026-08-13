import { createPortal } from 'react-dom';

// Full-viewport overlay showing a product's highlights at a readable size —
// used on touch devices instead of the tiny flip-card back face, which was
// too small to read on mobile. Rendered via a portal to document.body so it
// always sits above everything regardless of where it's mounted in the tree.
export default function ProductDetailOverlay({ item, onClose }) {
  if (!item) return null;

  const highlights = item.highlights || [];

  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-5 max-w-xs w-full text-center relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-slate-100 text-slate-500 text-base font-bold flex items-center justify-center"
        >
          ×
        </button>
        <img src={item.image} alt={item.name} className="w-full h-32 object-contain mb-3" />
        <p className="text-slate-900 font-black text-sm mb-3">{item.name}</p>
        <ul className="text-left space-y-1.5">
          {highlights.map((point, i) => (
            <li key={i} className="text-slate-600 text-xs font-medium flex items-start">
              <span className="text-orange-500 mr-1.5">•</span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body
  );
}
