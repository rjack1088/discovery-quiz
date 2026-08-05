// Renders a box's "what's inside" flyer: a title/logo header plus a grid of item
// photos + names. `size="card"` fits the in-app results card; `size="export"` is a
// fixed 1080x1080 canvas meant to be rasterized to a downloadable PNG.
export default function BoxFlyer({ box, items, size = 'card' }) {
  const isExport = size === 'export';

  return (
    <div
      className={
        isExport
          ? 'w-[1080px] h-[1080px] bg-slate-900 text-white flex flex-col p-14 border-b-[10px] border-orange-500 box-border'
          : 'bg-slate-900 text-white rounded-2xl overflow-hidden border-b-4 border-orange-500 shadow-xl'
      }
    >
      <div className={isExport ? 'flex items-center justify-between mb-8' : 'flex items-center justify-between p-3 pb-2'}>
        <div>
          <p className={isExport ? 'text-orange-400 font-black uppercase tracking-widest text-xl' : 'text-orange-400 font-black uppercase tracking-widest text-[9px]'}>
            RL FIT
          </p>
          <h2 className={isExport ? 'text-5xl font-black uppercase tracking-tight leading-none mt-2' : 'text-sm font-black uppercase tracking-tight leading-none mt-0.5'}>
            {box.name}
          </h2>
        </div>
        <img
          src="/images/rlfit-logo.png"
          alt="RL FIT"
          className={isExport ? 'w-20 h-20 rounded-2xl' : 'w-8 h-8 rounded-lg'}
        />
      </div>

      <p className={isExport ? 'text-slate-400 text-lg font-bold mb-10 leading-snug' : 'text-slate-400 text-[8px] font-bold px-3 mb-2 leading-relaxed'}>
        {box.description}
      </p>

      <div className={isExport ? 'flex flex-wrap content-start justify-center gap-6 flex-1' : 'flex flex-wrap content-start justify-center gap-1.5 px-3 pb-3'}>
        {items.map((item, idx) => (
          <div
            key={idx}
            className={isExport ? 'w-[calc(33.333%-16px)] bg-white rounded-2xl p-5 flex flex-col items-center text-center justify-center' : 'w-[calc(50%-3px)] bg-white rounded-lg p-1.5 flex flex-col items-center text-center'}
          >
            <img
              src={item.image}
              alt={item.name}
              className={isExport ? 'w-full h-40 object-contain mb-3' : 'w-full h-14 object-contain mb-1'}
            />
            <span className={isExport ? 'text-slate-900 font-bold text-sm leading-tight' : 'text-slate-900 font-bold text-[7px] leading-tight'}>
              {item.name}
            </span>
          </div>
        ))}
      </div>

      <p className={isExport ? 'text-center text-slate-500 text-sm font-black uppercase tracking-[0.3em] mt-10' : 'text-center text-slate-500 text-[7px] font-black uppercase tracking-[0.3em] py-2'}>
        Est. 2018 • Catonsville, MD
      </p>
    </div>
  );
}
