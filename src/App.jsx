import React, { useState } from 'react';

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

// Box details with updated .jpeg extensions and object-fit logic
const boxDetails = {
  fitness: {
    name: "Jump Start Fitness Box",
    image: "/images/fitness.jpeg",
    description: "Built for the performance-driven. Clean fuel for your workouts and recovery.",
    features: ["XS™ Whey Protein Powder", "XS™ Muscle Multiplier", "XS™ Energy Drink (Cranberry-Grape)"]
  },
  health: {
    name: "Jump Start Health Box",
    image: "/images/jshealth.jpeg",
    description: "A solid foundation for optimal wellness, focusing on vitamins, nutrients, and antioxidant support.",
    features: ["Nutrilite™ Perfect Pack", "Nutrilite™ Concentrated Fruits & Veggies", "Nutrilite™ Twist Tubes (Immunity)"]
  },
  discovery: {
    name: "The Core Discovery Box",
    image: "/images/core.png",
    description: "The essential 14 experiences across energy, immunity, protein, and electrolytes.",
    features: ["Nutrilite™ Ultra Focus + Energy Packs", "XS™ Energy Drinks (Citrus & Cranberry-Grape)", "XS™ Protein Bars (Peanut Butter & Berry)", "XS™ CocoWater Hydration Drink Mix"]
  },
  sample: {
    name: "The Complete Health & Home Sample Box",
    image: "/images/health.png",
    description: "A perfect sampler to upgrade your daily routine from skincare to a sparkling clean home.",
    features: ["Nutrilite™ Supplements", "XS™ Energy", "Artistry™ Skincare", "Glister™ Oral Care", "g&h™ Body Care", "Amway Home™ Multi-Purpose Cleaner"]
  },
  fuel: {
    name: "The Mom Fuel Bundle",
    image: "/images/mom-fuel.png",
    description: "Quick, effective support for on-the-go energy and a simple self-care reset.",
    features: ["XS™ Energy Drink", "Nutrilite™ supplements", "Artistry™ essential skincare", "g&h™ body care"]
  },
  super: {
    name: "The Supermom Bundle",
    image: "/images/supermom.png",
    description: "Comprehensive coverage for health, beauty, oral, and body care. Your upgraded standard.",
    features: ["Extensive Nutrilite™ health packs", "Artistry™ skincare routine", "g&h™ body care", "Glister™ multi-action oral care", "Nutrilite™ Twist Tubes"]
  }
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

  let winningBoxKey;
  if (path === 'fitness') winningBoxKey = 'fitness';
  else if (path === 'health') winningBoxKey = 'health';
  else if (path === 'routine') winningBoxKey = scores['discovery'] ? 'discovery' : 'sample';
  else if (path === 'moms') winningBoxKey = scores['fuel'] ? 'fuel' : 'super';

  const winningBox = boxDetails[winningBoxKey] || boxDetails['discovery'];

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
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 font-sans text-white overflow-y-auto">
      {/* Reduced bottom margin on the delivery banner */}
      <div className="mb-2 bg-orange-500/20 px-3 py-1 rounded-full border border-orange-500/30 text-[10px] font-black uppercase tracking-widest text-orange-400">
        📍 Free local delivery within 25 mi of Catonsville
      </div>

      {/* Tighter padding (p-5) and absolute vertical centering (my-auto) */}
      <div className="max-w-sm w-full bg-white rounded-[2.5rem] shadow-2xl p-5 text-slate-900 relative my-auto">
        {!path ? (
          /* Step 0: Initial Selection */
          <div className="animate-in fade-in zoom-in text-center">
            <h2 className="text-2xl font-black mb-1 italic">RL FIT</h2>
            <div className="h-1 w-10 bg-orange-500 mx-auto mb-4 rounded-full"></div>
            <h3 className="text-base font-extrabold text-slate-800 leading-tight mb-4 px-2">
              Choose a priority to find your perfect box:
            </h3>
            <div className="space-y-2 text-left">
              {paths.map(p => (
                /* Tightened button vertical padding (py-3) */
                <button key={p.id} onClick={() => setPath(p.id)} className="w-full py-3 px-4 rounded-xl border-2 border-slate-100 hover:border-orange-500 hover:bg-orange-50 transition-all flex items-center group shadow-sm active:scale-[0.98]">
                  <div className="text-lg mr-3 group-hover:scale-110 transition-transform">{p.icon}</div>
                  <span className="font-bold text-sm text-slate-700 group-hover:text-orange-600">{p.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : questions[path] && step < questions[path].length ? (
          /* Step 1: Branching Questions */
          <div className="animate-in slide-in-from-right-4">
            <button onClick={handleBack} className="mb-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">← Back</button>
            <h2 className="text-lg font-black mb-5 leading-tight">{questions[path][step].text}</h2>
            <div className="space-y-2">
              {questions[path][step].options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(opt.weight)} className="w-full py-3 px-4 rounded-xl border-2 border-slate-100 hover:border-orange-500 hover:bg-orange-50 transition-all font-bold text-slate-700 text-left text-sm">
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Step 2: Results Display with Image Rendering */
          <div className="text-center animate-in zoom-in">
            <h2 className="text-2xl font-black mb-1 tracking-tighter uppercase leading-none">Your Match</h2>
            
            <div className="bg-slate-900 text-white overflow-hidden rounded-3xl mb-4 border-b-4 border-orange-500 shadow-xl">
              <div className="bg-white p-2">
                {/* Max height adjusted down to 350px to fit short screen layouts */}
                <img 
                  src={winningBox.image} 
                  alt={winningBox.name} 
                  className="w-full max-h-[350px] object-contain mx-auto" 
                />
              </div>
              
              <div className="p-4">
                <p className="font-black text-base text-orange-400 uppercase leading-tight">{winningBox.name}</p>
                <p className="text-[9px] text-slate-400 mt-1 uppercase font-bold tracking-widest px-2">
                  {winningBox.description}
                </p>
              </div>
            </div>

            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2 text-left px-2">Inside the Box:</h4>
            <div className="text-left space-y-1.5 mb-6">
              {winningBox.features.map((feature, idx) => (
                <div key={idx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center">
                  <div className="h-4 w-4 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mr-2.5 font-bold text-[9px]">✓</div>
                  <span className="font-bold text-slate-800 text-xs">{feature}</span>
                </div>
              ))}
            </div>

            {!submitted ? (
              /* Lead Capture Form */
              <form name="discovery-leads" method="POST" data-netlify="true" onSubmit={handleFinalSubmit} className="space-y-2.5 px-1">
                <input type="hidden" name="form-name" value="discovery-leads" />
                <input type="hidden" name="recommendedBox" value={winningBox.name} />
                
                <p className="text-[10px] text-slate-500 font-bold leading-relaxed mb-3">
                  Ready to order? Enter your info below and Ryan or Lena will reach out to coordinate your local delivery!
                </p>
                
                <input 
                  type="text" name="name" required placeholder="Your Name"
                  value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-xl border-2 border-slate-100 outline-none focus:border-orange-500 font-medium text-center text-xs"
                />

                <input 
                  type="text" name="contact" required placeholder="Email or Phone Number"
                  value={contact} onChange={(e) => setContact(e.target.value)}
                  className="w-full p-3 rounded-xl border-2 border-slate-100 outline-none focus:border-orange-500 font-medium text-center text-xs"
                />
                
                <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-xl font-black text-sm shadow-lg hover:bg-orange-600 transition-all active:scale-95 mt-1">
                  I’m Interested!
                </button>
              </form>
            ) : (
              /* Success Window */
              <div className="py-6 animate-in fade-in text-center">
                <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">✓</span>
                </div>
                <h2 className="text-xl font-black mb-2 tracking-tighter">SUCCESS!</h2>
                <p className="text-xs text-slate-600 font-bold px-4 leading-relaxed">
                  Thanks, <span className="text-slate-900">{name}</span>! <br/>
                  <span className="text-orange-600">Ryan or Lena</span> will be in touch with you shortly to finalize your order.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Footer */}
      <p className="mt-4 text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">Est. 2018 • Catonsville, MD</p>
    </div>
  );
}