import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { boxes, getBoxItems } from '../data/boxes';
import BoxFlyer from './BoxFlyer';

function FlyerCard({ boxKey, box }) {
  const exportRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const items = getBoxItems(boxKey);

  const handleDownload = async () => {
    if (!exportRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(exportRef.current, { pixelRatio: 1 });
      const link = document.createElement('a');
      link.download = `${boxKey}-flyer.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      alert('Download failed: ' + error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 w-72">
      <BoxFlyer box={box} items={items} size="card" />
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-black text-xs uppercase tracking-widest py-2 px-4 rounded-lg transition-all"
      >
        {downloading ? 'Preparing…' : 'Download PNG'}
      </button>

      {/* Full-resolution 1080x1080 flyer, rendered off-screen and only used to capture the PNG. */}
      <div className="fixed top-0 -left-[9999px]" aria-hidden="true">
        <div ref={exportRef}>
          <BoxFlyer box={box} items={items} size="export" />
        </div>
      </div>
    </div>
  );
}

export default function FlyerGallery() {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-white p-8">
      <h1 className="text-2xl font-black uppercase tracking-tight mb-6">RL FIT — Box Flyers</h1>
      <div className="flex flex-wrap gap-8">
        {Object.entries(boxes).map(([boxKey, box]) => (
          <FlyerCard key={boxKey} boxKey={boxKey} box={box} />
        ))}
      </div>
    </div>
  );
}
