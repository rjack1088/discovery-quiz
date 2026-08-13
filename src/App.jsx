import React, { useState } from 'react';
import { boxes, getBoxItems } from './data/boxes';
import BoxFlyer from './components/BoxFlyer';

// Main paths based on your categories
const paths = [
  { id: 'fitness', label: 'Performance & Fitness', icon: '⚡' },
  { id: 'health', label: 'Optimal Health & Immunity', icon: '🌿' },
  { id: 'routine', label: 'The Daily Routine Sampler', icon: '🏠' },
  { id: 'moms', label: 'Specifically for Moms', icon: '💖' }
];

// Branching questions
const questions = {
  routine: [
    {
      text: "Are you primarily looking to test...",
      options: [
        { text: "A boost in energy, protein, and hydration", weight: 'discovery' },
        { text: "A complete sampler of home, personal care, and health products", weight: 'sample' }
      ]
    }
  ],
  moms: [
    {
      text: "What’s your biggest focus right now?",
      options: [
        { text: "A quick pick-me-up and self-care reset", weight: 'fuel' },
        { text: "Comprehensive health, beauty, and oral care support", weight: 'super' }
      ]
    }
  ]
};

export default function App() {
  const [path, setPath] = useState(null);
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');

  const handleAnswer = (weight) => {
    if (path === 'routine' || path === 'moms') {
      setScores(prev => ({ ...prev, [weight]: (prev[weight] || 0) + 1 }));
    }
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (step === 0) setPath(null);
    else setStep(prev => prev - 1);
  };

  const handleRestart = () => {
    setPath(null);
    setStep(0);
    setScores({});
    setSubmitted(false);
    setName('');
    setContact('');
  };

  let winningBoxKey;
  if (path === 'fitness') winningBoxKey = 'fitness';
  else if (path === 'health') winningBoxKey = 'health';
  else if (path === 'routine') winningBoxKey = scores['discovery'] ? 'discovery' : 'sample';
  else if (path === 'moms') winningBoxKey = scores['fuel'] ? 'fuel' : 'super';

  const resolvedBoxKey = boxes[winningBoxKey] ? winningBoxKey : 'discovery';
  const winningBox = boxes[resolvedBoxKey];
  const winningItems = getBoxItems(resolvedBoxKey);

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("recommendedBox", winningBox.name);
    
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => setSubmitted(true))
      .catch((error) => alert("Submission error: " + error));
  };

  return (
    /* Changed back to min-h-screen so mobile keyboards can scroll normally when open */
    <div className="min-h-screen w-full bg-slate-900 flex flex-col items-center justify-center p-3 font-sans text-white">
      
      {/* Top banner sits neatly right above the card now */}
      <div className="mb-2.5 bg-orange-500/20 px-3.5 py-1 rounded-full border border-orange-500/30 text-[9px] font-black uppercase tracking-widest text-orange-400">
        📍 Free local delivery within 25 mi of Catonsville
      </div>

      {/* REMOVED 'my-auto' so it doesn't shove the banner to the ceiling on mobile screens */}
      <div className="max-w-sm w-full bg-white rounded-[2rem] shadow-2xl p-4 text-slate-900 relative">
        {!path ? (
          /* Step 0: Initial Selection */
          <div className="animate-in fade-in zoom-in text-center">
            <h2 className="text-xl font-black mb-0.5 italic">RL FIT</h2>
            <div className="h-1 w-8 bg-orange-500 mx-auto mb-3 rounded-full"></div>
            
            <h3 className="text-sm font-extrabold text-slate-800 leading-tight mb-3 px-2">
              Choose a priority to find your perfect box:
            </h3>
            
            <div className="space-y-1.5 text-left">
              {paths.map(p => (
                <button key={p.id} onClick={() => setPath(p.id)} className="w-full py-2.5 px-3.5 rounded-xl border-2 border-slate-100 hover:border-orange-500 hover:bg-orange-50 transition-all flex items-center group shadow-sm active:scale-[0.98]">
                  <div className="text-base mr-3 group-hover:scale-110 transition-transform">{p.icon}</div>
                  <span className="font-bold text-xs text-slate-700 group-hover:text-orange-600">{p.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : questions[path] && step < questions[path].length ? (
          /* Step 1: Branching Questions */
          <div className="animate-in slide-in-from-right-4">
            <button onClick={handleBack} className="mb-3 text-slate-400 text-[9px] font-black uppercase tracking-widest">← Back</button>
            <h2 className="text-base font-black mb-4 leading-tight">{questions[path][step].text}</h2>
            <div className="space-y-2">
              {questions[path][step].options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(opt.weight)} className="w-full py-2.5 px-3.5 rounded-xl border-2 border-slate-100 hover:border-orange-500 hover:bg-orange-50 transition-all font-bold text-slate-700 text-left text-xs">
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Step 2: Results Display */
          <div className="text-center animate-in zoom-in max-h-[75vh] overflow-y-auto px-1">
            <h2 className="text-xl font-black mb-1 tracking-tighter uppercase leading-none">Your Match</h2>

            <div className="mb-4">
              <BoxFlyer box={winningBox} items={winningItems} size="card" />
            </div>

            <button onClick={handleRestart} className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-3">
              Discover more box options — retake the quiz
            </button>

            {!submitted ? (
              /* Lead Capture Form */
              <form name="discovery-leads" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleFinalSubmit} className="space-y-2 px-1">
                <input type="hidden" name="form-name" value="discovery-leads" />
                <input type="hidden" name="recommendedBox" value={winningBox.name} />
                <p className="hidden">
                  <label>
                    Don't fill this out if you're human: <input name="bot-field" />
                  </label>
                </p>
                
                <p className="text-[9px] text-slate-500 font-bold leading-relaxed mb-2">
                  Ready to order? Enter your info below and Ryan or Lena will reach out to coordinate your local delivery!
                </p>
                
                <input 
                  type="text" name="name" required placeholder="Your Name"
                  value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-lg border-2 border-slate-100 outline-none focus:border-orange-500 font-medium text-center text-xs"
                />

                <input 
                  type="text" name="contact" required placeholder="Email or Phone Number"
                  value={contact} onChange={(e) => setContact(e.target.value)}
                  className="w-full p-2.5 rounded-lg border-2 border-slate-100 outline-none focus:border-orange-500 font-medium text-center text-xs"
                />
                
                <button type="submit" className="w-full bg-orange-500 text-white py-2.5 rounded-xl font-black text-xs shadow-lg hover:bg-orange-600 transition-all active:scale-95 mt-1">
                  I’m Interested!
                </button>
              </form>
            ) : (
              /* Success Window */
              <div className="py-4 animate-in fade-in text-center">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl">✓</span>
                </div>
                <h2 className="text-lg font-black mb-1 tracking-tighter">SUCCESS!</h2>
                <p className="text-xs text-slate-600 font-bold px-2 leading-relaxed">
                  Thanks, <span className="text-slate-900">{name}</span>! <br/>
                  <span className="text-orange-600">Ryan or Lena</span> will be in touch with you shortly to finalize your order.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <p className="mt-3 text-white/40 text-[9px] font-black uppercase tracking-[0.4em]">Est. 2018 • Catonsville, MD</p>
    </div>
  );
}