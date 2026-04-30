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
      { text: "Oral & Personal Care", weight: "personal" },
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
  energy: "XS™ Energy Drinks (16 different flavors!)",
  protein: "XS™ Protein Bars (Peanut Butter & Chocolate Berry)",
  cleaning: "Amway Home™ L.O.C.™ Multi-Purpose Wipes",
  personal: "Glister™ Multi-Action Toothpaste & G&H Body Care",
  skincare: "Artistry Studio™ Skincare Essentials",
  hydration: "XS™ CocoWater Hydration Drink Mix"
};

export default function App() {
  const [path, setPath] = useState(null);
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({});
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (weight) => {
    setScores(prev => ({ ...prev, [weight]: (prev[weight] || 0) + 1 }));
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (step === 0) setPath(null);
    else setStep(prev => prev - 1);
  };

  const winner = Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b), 'energy');
  const matchResult = productMap[winner];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => setSubmitted(true))
      .catch((error) => alert("Submission error: " + error));
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 font-sans text-white">
      <div className="mb-4 bg-orange-500/20 px-3 py-1 rounded-full border border-orange-500/30 text-[10px] font-black uppercase tracking-widest text-orange-400">
        📍 Free local delivery within 25 mi of Catonsville
      </div>

      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-8 text-slate-900 relative">
        {!path ? (
          <div className="animate-in fade-in zoom-in text-center">
            <h2 className="text-3xl font-black mb-2 italic">RL FIT</h2>
            <div className="h-1.5 w-10 bg-orange-500 mx-auto mb-6 rounded-full"></div>
            <h3 className="text-xl font-extrabold text-slate-800 leading-tight mb-8">
              Which area of your life would you like to improve today?
            </h3>
            <div className="space-y-3 text-left">
              {paths.map(p => (
                <button key={p.id} onClick={() => setPath(p.id)} className="w-full py-5 px-6 rounded-2xl border-2 border-slate-100 hover:border-orange-500 hover:bg-orange-50 transition-all flex items-center group shadow-sm active:scale-[0.98]">
                  <div className="text-2xl mr-4">{p.icon}</div>
                  <span className="font-bold text-lg text-slate-700">{p.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : step < questions[path].length ? (
          <div className="animate-in slide-in-from-right-4">
            <button onClick={handleBack} className="mb-6 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-slate-600 transition-colors">
              ← Back
            </button>
            <h2 className="text-2xl font-black mb-8 leading-tight">{questions[path][step].text}</h2>
            <div className="space-y-3">
              {questions[path][step].options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(opt.weight)} className="w-full py-5 px-6 rounded-2xl border-2 border-slate-100 hover:border-orange-500 hover:bg-orange-50 transition-all font-bold text-slate-700">
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center animate-in zoom-in">
            {!submitted ? (
              <>
                <h2 className="text-3xl font-black mb-2 uppercase">Your Match</h2>
                <div className="bg-slate-900 text-white p-6 rounded-3xl mb-8 border-b-4 border-orange-500">
                  <p className="font-black text-xl text-orange-400 uppercase leading-tight">{matchResult}</p>
                  <p className="text-[10px] text-slate-400 mt-3 uppercase font-bold tracking-widest">1 of 14 experiences in your box</p>
                </div>

                <form 
                  name="discovery-leads" 
                  method="POST" 
                  data-netlify="true" 
                  onSubmit={handleSubmit}
                  className="space-y-4 px-2"
                >
                  <input type="hidden" name="form-name" value="discovery-leads" />
                  <input type="hidden" name="quiz-match" value={matchResult} />
                  <input type="hidden" name="category" value={path} />

                  <p className="text-sm text-slate-500 font-bold leading-relaxed mb-6">
                    Enter your name below to submit your results, and Ryan or Lena will be in touch with you shortly!
                  </p>
                  
                  <input 
                    type="text" 
                    name="name"
                    required
                    placeholder="Your Name"
                    className="w-full p-4 rounded-xl border-2 border-slate-100 outline-none focus:border-orange-500 font-medium text-center"
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                  />

                  <input 
                    type="email" 
                    name="email"
                    placeholder="Email (Optional)"
                    className="w-full p-4 rounded-xl border-2 border-slate-100 outline-none focus:border-orange-500 font-medium text-center"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  
                  <button 
                    type="submit"
                    className="w-full bg-orange-500 text-white py-4 rounded-2xl font-black text-lg shadow-lg hover:bg-orange-600 transition-all"
                  >
                    Send My Results
                  </button>
                </form>
              </>
            ) : (
              <div className="py-12 animate-in fade-in">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">✓</span>
                </div>
                <h2 className="text-2xl font-black mb-4 tracking-tighter">SUCCESS!</h2>
                <p className="text-slate-600 font-bold px-4 leading-relaxed">
                  Thanks, <span className="text-slate-900">{name}</span>! <br/>
                  <span className="text-orange-600">Ryan or Lena</span> will be in touch with you shortly based on your results!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <p className="mt-8 text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">Est. 2018 • Catonsville, MD</p>
    </div>
  );
}