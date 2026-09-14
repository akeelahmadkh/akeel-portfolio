import React, { useState } from 'react';
import { submitContactForm } from '../services/api';
import { Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await submitContactForm(formData);
      setStatusMessage({ type: 'success', text: res.message || 'Thank you! Your message was submitted successfully.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.response?.data?.error || 'Failed to submit contact message.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <p className="font-mono text-xs text-[#D4AF37] uppercase tracking-widest mb-2">
          GET IN TOUCH
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#F5F5F7] mb-4">
          Let's Build Something Useful
        </h1>
        <p className="text-neutral-400 text-sm leading-relaxed">
          If you have a project idea, internship opportunity, collaboration, or simply want to connect, feel free to reach out.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Contact Information */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-8 rounded-2xl border border-amber-500/20 bg-[#121212]/95">
            <h2 className="font-serif text-2xl text-[#F5F5F7] mb-6">
              Connect With Akeel
            </h2>

            <div className="space-y-6 text-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-amber-500/30 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-mono text-xs text-neutral-400 uppercase">Direct Email</h4>
                  <a href="mailto:akeel@developer.com" className="text-white hover:text-[#D4AF37] font-semibold text-sm transition-colors">
                    akeel@developer.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-amber-500/30 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-mono text-xs text-neutral-400 uppercase">GitHub Profile</h4>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#D4AF37] font-semibold text-sm transition-colors">
                    github.com/akeel-dev
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-amber-500/30 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <LinkedinIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-mono text-xs text-neutral-400 uppercase">LinkedIn Profile</h4>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#D4AF37] font-semibold text-sm transition-colors">
                    linkedin.com/in/akeel-dev
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-8 rounded-2xl border border-amber-500/20 bg-[#121212]/95">
            <h2 className="font-serif text-2xl text-[#F5F5F7] mb-6">
              Send a Direct Message
            </h2>

            {statusMessage && (
              <div
                className={`p-4 rounded-lg mb-6 flex items-center gap-3 text-xs font-mono border ${
                  statusMessage.type === 'success'
                    ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                    : 'bg-red-950/80 border-red-500/40 text-red-300'
                }`}
              >
                {statusMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                )}
                <span>{statusMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Internship / Collaboration / Project Inquiry"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1">Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can Akeel assist your software project?"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-black font-semibold text-xs font-mono uppercase tracking-wider hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
              >
                {loading ? 'Submitting...' : 'Send Message'}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
};
