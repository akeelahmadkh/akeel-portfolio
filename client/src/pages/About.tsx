import React from 'react';
import { Smartphone, Cpu, Database, Terminal } from 'lucide-react';

export const About: React.FC = () => {
  const timelineSteps = [
    { title: 'Computer Science', desc: 'Core CS fundamentals, data structures, algorithms, and object-oriented programming.' },
    { title: 'Programming & Web Architecture', desc: 'Full-stack development using JavaScript, TypeScript, Node.js, and REST APIs.' },
    { title: 'Mobile Application Development', desc: 'Cross-platform mobile architecture with React Native, Expo, and native device integrations.' },
    { title: 'Machine Learning & Deep Learning', desc: 'Python, PyTorch, TensorFlow, RNNs, and LSTMs for predictive models.' },
    { title: 'Full AI + Mobile Integration', desc: 'Combining intelligent AI models with seamless mobile interfaces and production backends.' },
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <p className="font-mono text-xs text-[#D4AF37] uppercase tracking-widest mb-2">
          BIOGRAPHY & TECHNICAL VISION
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#F5F5F7] mb-4">
          About Akeel
        </h1>
        <p className="text-neutral-400 text-sm leading-relaxed">
          Computer Science student and aspiring AI + Mobile Application Developer committed to engineering useful software products.
        </p>
      </div>

      {/* Main Bio Card */}
      <div className="glass-panel p-8 md:p-12 rounded-2xl border border-amber-500/20 bg-[#121212]/95 mb-16">
        <h2 className="font-serif text-2xl text-[#F5F5F7] mb-6 flex items-center gap-2">
          <Terminal className="w-6 h-6 text-[#D4AF37]" /> Engineering Focus
        </h2>

        <div className="space-y-4 text-neutral-300 text-sm leading-relaxed mb-8">
          <p>
            My name is <strong>Akeel</strong>. I am a computer science student dedicated to mastering modern application development. Rather than focusing on a single isolated technology, my goal is to bridge the gap between intelligent algorithms and user-centric mobile applications.
          </p>
          <p>
            My development path integrates <strong className="text-white">Mobile Application Development (React Native)</strong>, <strong className="text-white">Artificial Intelligence & Deep Learning (RNN/LSTM)</strong>, and <strong className="text-white">Backend Systems (Node.js, Express, MongoDB)</strong>.
          </p>
          <p>
            My long-term ambition is to independently take any real-world problem from initial problem formulation → model design → backend architecture → database scaling → mobile client deployment.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-neutral-800">
          <div className="p-4 rounded-lg bg-neutral-900/80 border border-neutral-800">
            <Smartphone className="w-6 h-6 text-[#D4AF37] mb-2" />
            <h3 className="font-serif font-semibold text-white text-sm">Mobile Engineering</h3>
            <p className="text-[11px] text-neutral-400 mt-1">Cross-platform React Native apps</p>
          </div>
          <div className="p-4 rounded-lg bg-neutral-900/80 border border-neutral-800">
            <Cpu className="w-6 h-6 text-blue-400 mb-2" />
            <h3 className="font-serif font-semibold text-white text-sm">Artificial Intelligence</h3>
            <p className="text-[11px] text-neutral-400 mt-1">Machine Learning & Deep Learning</p>
          </div>
          <div className="p-4 rounded-lg bg-neutral-900/80 border border-neutral-800">
            <Database className="w-6 h-6 text-emerald-400 mb-2" />
            <h3 className="font-serif font-semibold text-white text-sm">Backend Architecture</h3>
            <p className="text-[11px] text-neutral-400 mt-1">Node.js Express REST APIs & MongoDB</p>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="glass-panel p-8 md:p-12 rounded-2xl border border-amber-500/20 bg-[#121212]/95">
        <h2 className="font-serif text-2xl text-[#F5F5F7] mb-8">
          Development Journey Timeline
        </h2>

        <div className="relative border-l border-amber-500/20 ml-4 space-y-8">
          {timelineSteps.map((step, idx) => (
            <div key={idx} className="relative pl-8">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#0A0A0A] border border-[#D4AF37] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              </div>
              <h3 className="font-serif font-bold text-base text-white">
                {step.title}
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
