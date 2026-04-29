import React, { useState } from 'react';

const paths = [
  { id: 'performance', label: 'Energy & Performance', icon: '⚡' },
  { id: 'home', label: 'Home Essentials', icon: '🏠' },
  { id: 'beauty', label: 'Skincare & Glow', icon: '✨' }
];

const questions = {
  performance: [
    { text: "What's your biggest hurdle today?", options: [
      { text: "Mental Fog / Focus", weight: "focus" },
      { text: "Physical Fatigue", weight: "energy" }
    ]},
    { text: "How do you prefer to refuel?", options: [
      { text: "Refreshing Drink", weight: "energy" },
      { text: "Quick Protein Snack", weight: "protein" }
    ]}
  ],
  home: [
    { text: "What's your top priority for your home?", options: [
      { text: "Family-Safe Ingredients", weight: "cleaning" },
      { text: "Professional Results", weight: "cleaning" }
    ]},
    { text: "Which daily routine needs an upgrade?", options: [
      { text: "Personal Care (Body/Oral)", weight: "personal" },
      { text: "Household Cleaning", weight: "cleaning" }
    ]}
  ],
  beauty: [
    { text: "What is your skin's primary need?", options: [
      { text: "Instant Glow / Brightness", weight: "skincare" },
      { text: "Deep Hydration", weight: "hydration" }
    ]},
    { text: "How much time do you have for a routine?", options: [
      { text: "5 Minutes - Quick Glow", weight: "skincare" },
      { text: "15 Minutes - The Full Works", weight: "skincare" }
    ]}
  ]
};

const productMap = {
  focus: "Nutrilite™ Ultra Focus + Energy Packs",
  energy: "XS™ Energy Drinks (Cranberry-Grape & Citrus)",
  protein: "XS™ Protein Bars (Peanut Butter & Berry)",
  cleaning: "Amway Home™ L.O.C. Multi-Purpose Cleaner",
  personal: "Glister™ Multi-Action & G&H Body Care",
  skincare: "Artistry Studio™ Skincare Essentials",
  hydration: "XS™ CocoWater Hydration Drink Mix"
};

export default function App() {
  const [path, setPath] = useState(null);
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({});

  const handleAnswer = (weight) => {
    setScores(prev => ({ ...prev, [weight]: (prev[weight] || 0) + 1 }));
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (step === 0) setPath(null);
    else setStep(prev => prev - 1);
  };

  const winner = Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b), 'energy');

  // Pre-filled SMS messages based on their results
  const smsBody = `Hey Ryan! I just finished your Discovery Quiz for ${path === 'performance' ? 'Energy' : path === 'home' ? 'Home' : 'Beauty'}. My result was ${productMap[winner]}. I'd love to chat about grabbing a box!`;

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 font-sans text-white">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-8 text-slate-900">
        {!path ? (
          <div className="animate-in fade-in zoom-in duration-500">
            <h2 className="text-3xl font-black mb-2 tracking-tighter italic">RL FIT</h2>
            <p className="text-slate-500 mb-8 text-sm font-medium italic">Personalized Discovery Boxes</p>
            <div className="space-y-3">
              {paths.map(p => (
                <button key={p.id} onClick={() => setPath(p.id)} className="w-full py-5 px-6 text-left rounded-2xl border-2 border-slate-100 hover:border-orange-500 hover:bg-orange-50 transition-all flex items-center">
                  <span className="text-2xl mr-4">{p.icon}</span>
                  <span className="font-bold text-lg text-slate-700">{p.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : step < questions[path].length ? (
          <div className="animate-in slide-in-from-right-4">
            <button onClick={handleBack} className="mb-6 text-slate-400 text-[10px] font-black uppercase tracking-widest">← Back</button>
            <h2 className="text-2xl font-black mb-8 leading-tight">{questions[path][step].text}</h2>
            <div className="space-y-3">
              {questions[path][step].options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(opt.weight)} className="w-full py-5 px-6 text-left rounded-2xl border-2 border-slate-100 hover:border-orange-500 hover:bg-orange-50 transition-all font-bold text-slate-700">
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center animate-in zoom-in">
            <h2 className="text-3xl font-black mb-2 tracking-tighter">YOUR ROUTINE</h2>
            <div className="bg-slate-900 text-white p-6 rounded-3xl mb-8 border-b-4 border-orange-500">
              <p className="font-black text-xl text-orange-400 uppercase tracking-wide leading-tight">{productMap[winner]}</p>
              <p className="text-[10px] text-slate-400 mt-3 uppercase font-bold tracking-widest">1 of 14 experiences in your box</p>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-slate-500 font-bold px-4">I'd love to help you build a routine that actually works. Send me a quick text to chat about this box!</p>
              <a 
                href={`sms:+1[4106525825]?body=${encodeURIComponent(smsBody)}`} 
                className="block w-full bg-orange-500 text-white py-5 rounded-2xl font-black text-xl shadow-lg hover:bg-orange-600 transition-all active:scale-95"
              >
                Chat with Ryan
              </a>
            </div>
          </div>
        )}
      </div>
      <p className="mt-8 text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">RLFit</p>
    </div>
  );
}