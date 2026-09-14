import React, { useEffect, useState } from 'react';
import {
  adminLogin,
  createProject,
  updateProject,
  deleteProject,
  getProjects,
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  addAdminUser,
  getAdminsList,
  getContactMessages,
  deleteContactMessage,
} from '../services/api';
import type { Project, Skill, ContactMessage } from '../services/api';
import {
  Lock,
  ShieldCheck,
  Plus,
  LogOut,
  AlertCircle,
  CheckCircle2,
  UserPlus,
  FolderPlus,
  Trash2,
  Users,
  Code2,
  Edit3,
  Mail,
  Inbox,
} from 'lucide-react';

export const Admin: React.FC = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));
  const [email, setEmail] = useState('akeelahmadkh@gmail.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [admins, setAdmins] = useState<{ email: string; role: string }[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'messages' | 'admins'>('projects');

  // Form states for New / Edit Project
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    title: '',
    slug: '',
    shortDescription: '',
    fullDescription: '',
    category: 'AI / ML',
    technologies: ['React Native', 'Node.js', 'MongoDB'],
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    githubUrl: '',
    liveUrl: '',
    status: 'Completed',
    featured: false,
  });

  // Form states for New / Edit Skill
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [skillForm, setSkillForm] = useState<Partial<Skill>>({
    name: '',
    category: 'Mobile Development',
    level: 'Working With',
  });

  // Form states for New Admin
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');

  const loadAdminData = () => {
    getProjects().then(setProjects);
    getSkills().then(setSkills);
    if (token) {
      getAdminsList(token).then(setAdmins).catch(() => {});
      getContactMessages(token).then(setMessages).catch(() => {});
    }
  };

  useEffect(() => {
    if (token) {
      loadAdminData();
    }
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const res = await adminLogin({ email, password });
      if (res.token) {
        localStorage.setItem('adminToken', res.token);
        setToken(res.token);
        setSuccess('Login successful! Welcome Akeel.');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid admin login credentials.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
  };

  // --- Project Operations ---
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setError(null);
    setSuccess(null);

    try {
      const payload = {
        ...projectForm,
        slug: projectForm.slug || projectForm.title?.toLowerCase().replace(/\s+/g, '-'),
        technologies: typeof projectForm.technologies === 'string'
          ? (projectForm.technologies as string).split(',').map((t) => t.trim())
          : projectForm.technologies,
      };

      if (editingProjectId) {
        await updateProject(editingProjectId, payload, token);
        setSuccess(`Project "${projectForm.title}" updated successfully!`);
      } else {
        await createProject(payload, token);
        setSuccess(`Project "${projectForm.title}" created in MongoDB Atlas!`);
      }

      setShowProjectForm(false);
      setEditingProjectId(null);
      loadAdminData();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to save project.');
    }
  };

  const startEditProject = (p: Project) => {
    setEditingProjectId(p._id || null);
    setProjectForm(p);
    setShowProjectForm(true);
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (!token || !window.confirm(`Delete project "${title}"?`)) return;
    try {
      await deleteProject(id, token);
      setSuccess(`Deleted project "${title}".`);
      loadAdminData();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete project.');
    }
  };

  // --- Skill Operations ---
  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setError(null);
    setSuccess(null);

    try {
      if (editingSkillId) {
        await updateSkill(editingSkillId, skillForm, token);
        setSuccess(`Skill "${skillForm.name}" updated!`);
      } else {
        await createSkill(skillForm, token);
        setSuccess(`Skill "${skillForm.name}" added to skills matrix!`);
      }

      setShowSkillForm(false);
      setEditingSkillId(null);
      setSkillForm({ name: '', category: 'Mobile Development', level: 'Working With' });
      loadAdminData();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to save skill.');
    }
  };

  const startEditSkill = (s: Skill) => {
    setEditingSkillId(s._id || null);
    setSkillForm(s);
    setShowSkillForm(true);
  };

  const handleDeleteSkill = async (id: string, name: string) => {
    if (!token || !window.confirm(`Delete skill "${name}"?`)) return;
    try {
      await deleteSkill(id, token);
      setSuccess(`Deleted skill "${name}".`);
      loadAdminData();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete skill.');
    }
  };

  // --- Message Operations ---
  const handleDeleteMessage = async (id: string) => {
    if (!token || !window.confirm('Delete this message?')) return;
    try {
      await deleteContactMessage(id, token);
      setSuccess('Contact message deleted.');
      loadAdminData();
    } catch (err: any) {
      setError('Failed to delete message.');
    }
  };

  // --- Admin User Operations ---
  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setError(null);
    setSuccess(null);

    try {
      const res = await addAdminUser({ newAdminEmail, newAdminPassword }, token);
      setSuccess(res.message || `Added new admin user: ${newAdminEmail}`);
      setNewAdminEmail('');
      setNewAdminPassword('');
      setShowAdminForm(false);
      loadAdminData();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add new admin user.');
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen py-20 px-4 flex items-center justify-center relative z-10">
        <div className="glass-panel p-8 rounded-2xl border border-amber-500/20 bg-[#121212]/95 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-neutral-900 border border-amber-500/30 flex items-center justify-center text-[#D4AF37] mx-auto mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-2xl text-[#F5F5F7]">Akeel Admin Portal</h1>
            <p className="text-neutral-400 text-xs mt-1 font-mono">
              MongoDB Atlas CMS & Portfolio Management
            </p>
          </div>

          {error && (
            <div className="p-3 rounded bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-mono mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-neutral-300 mb-1">Admin Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="akeelahmadkh@gmail.com"
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-300 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-black font-semibold text-xs font-mono uppercase tracking-wider hover:opacity-90 transition-all shadow-md shadow-amber-500/20"
            >
              Sign In to Management Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-4 border-b border-amber-500/20 gap-4">
        <div>
          <span className="font-mono text-xs text-emerald-400 flex items-center gap-1.5 mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Authenticated Administrator (akeelahmadkh@gmail.com)
          </span>
          <h1 className="font-serif text-3xl text-white">Full Access Admin Dashboard</h1>
        </div>

        <button
          onClick={handleLogout}
          className="px-3.5 py-2 rounded-lg glass-panel border border-neutral-800 text-xs font-mono text-neutral-300 hover:text-red-400 transition-colors flex items-center gap-1.5"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      {/* Notifications */}
      {error && (
        <div className="p-4 rounded-lg bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-mono mb-6 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="p-4 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono mb-6 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-3 border-b border-neutral-800 pb-4 mb-8">
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 rounded-lg text-xs font-mono flex items-center gap-2 ${
            activeTab === 'projects'
              ? 'bg-amber-500/20 text-[#D4AF37] border border-amber-500/50 font-bold'
              : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
          }`}
        >
          <FolderPlus className="w-4 h-4" /> Manage Projects ({projects.length})
        </button>

        <button
          onClick={() => setActiveTab('skills')}
          className={`px-4 py-2 rounded-lg text-xs font-mono flex items-center gap-2 ${
            activeTab === 'skills'
              ? 'bg-amber-500/20 text-[#D4AF37] border border-amber-500/50 font-bold'
              : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
          }`}
        >
          <Code2 className="w-4 h-4" /> Manage Skills ({skills.length})
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`px-4 py-2 rounded-lg text-xs font-mono flex items-center gap-2 relative ${
            activeTab === 'messages'
              ? 'bg-amber-500/20 text-[#D4AF37] border border-amber-500/50 font-bold'
              : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
          }`}
        >
          <Mail className="w-4 h-4" /> Visitor Messages
          {messages.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-black text-[10px] font-bold">
              {messages.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('admins')}
          className={`px-4 py-2 rounded-lg text-xs font-mono flex items-center gap-2 ${
            activeTab === 'admins'
              ? 'bg-amber-500/20 text-[#D4AF37] border border-amber-500/50 font-bold'
              : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
          }`}
        >
          <Users className="w-4 h-4" /> Manage Admins ({admins.length || 1})
        </button>
      </div>

      {/* 1. PROJECTS TAB */}
      {activeTab === 'projects' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-xl text-white">Portfolio Projects Matrix</h2>
            <button
              onClick={() => {
                setEditingProjectId(null);
                setProjectForm({
                  title: '',
                  slug: '',
                  shortDescription: '',
                  fullDescription: '',
                  category: 'AI / ML',
                  technologies: ['React Native', 'Node.js', 'MongoDB'],
                  thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
                  githubUrl: '',
                  liveUrl: '',
                  status: 'Completed',
                  featured: false,
                });
                setShowProjectForm(!showProjectForm);
              }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-black font-semibold text-xs font-mono uppercase flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add New Project
            </button>
          </div>

          {showProjectForm && (
            <div className="glass-panel p-6 rounded-2xl border border-amber-500/30 bg-[#121212]/95 mb-8">
              <h2 className="font-serif text-xl text-white mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#D4AF37]" /> {editingProjectId ? 'Edit Project' : 'Create New Portfolio Project'}
              </h2>
              <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-neutral-300 mb-1">Project Title</label>
                    <input
                      type="text"
                      required
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      placeholder="e.g. AI Vision Mobile App"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-neutral-300 mb-1">Category</label>
                    <select
                      value={projectForm.category}
                      onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as any })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white"
                    >
                      <option value="AI / ML">AI / ML</option>
                      <option value="Mobile">Mobile</option>
                      <option value="Full Stack">Full Stack</option>
                      <option value="Backend">Backend</option>
                      <option value="Web">Web</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-neutral-300 mb-1">Short Description</label>
                  <input
                    type="text"
                    required
                    value={projectForm.shortDescription}
                    onChange={(e) => setProjectForm({ ...projectForm, shortDescription: e.target.value })}
                    placeholder="Brief summary..."
                    className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block font-mono text-neutral-300 mb-1">Full Technical Overview</label>
                  <textarea
                    rows={4}
                    required
                    value={projectForm.fullDescription}
                    onChange={(e) => setProjectForm({ ...projectForm, fullDescription: e.target.value })}
                    placeholder="Detailed technical explanation..."
                    className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-mono text-neutral-300 mb-1">Technologies (Comma Separated)</label>
                    <input
                      type="text"
                      value={typeof projectForm.technologies === 'string' ? projectForm.technologies : projectForm.technologies?.join(', ')}
                      onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value as any })}
                      placeholder="React Native, PyTorch, Node.js"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-neutral-300 mb-1">GitHub URL</label>
                    <input
                      type="text"
                      value={projectForm.githubUrl}
                      onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                      placeholder="https://github.com/akeel-dev/..."
                      className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-neutral-300 mb-1">Live Demo URL</label>
                    <input
                      type="text"
                      value={projectForm.liveUrl}
                      onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                      placeholder="https://app-demo.vercel.app"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowProjectForm(false)}
                    className="px-4 py-2 rounded bg-neutral-800 text-neutral-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-black font-semibold font-mono"
                  >
                    {editingProjectId ? 'Save Changes' : 'Publish Project'}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="space-y-4">
            {projects.map((p) => (
              <div
                key={p._id || p.slug}
                className="glass-panel p-4 rounded-xl border border-neutral-800 bg-[#121212]/90 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img src={p.thumbnail} alt={p.title} className="w-16 h-12 object-cover rounded" />
                  <div>
                    <h3 className="font-serif text-sm font-bold text-white flex items-center gap-2">
                      {p.title}
                      {p.slug === 'nexa-bank' && (
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono">
                          Flagship
                        </span>
                      )}
                    </h3>
                    <span className="text-[11px] font-mono text-neutral-400">
                      Category: {p.category} | Status: {p.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => startEditProject(p)}
                    className="p-2 rounded bg-neutral-800 text-amber-400 hover:bg-neutral-700"
                    title="Edit Project"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  {p._id && p.slug !== 'nexa-bank' && (
                    <button
                      onClick={() => handleDeleteProject(p._id!, p.title)}
                      className="p-2 rounded bg-red-950/60 text-red-400 hover:bg-red-900/80"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. SKILLS TAB */}
      {activeTab === 'skills' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-xl text-white">Skills Matrix Management</h2>
            <button
              onClick={() => {
                setEditingSkillId(null);
                setSkillForm({ name: '', category: 'Mobile Development', level: 'Working With' });
                setShowSkillForm(!showSkillForm);
              }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-black font-semibold text-xs font-mono uppercase flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add New Skill
            </button>
          </div>

          {showSkillForm && (
            <div className="glass-panel p-6 rounded-2xl border border-amber-500/30 bg-[#121212]/95 mb-8">
              <h2 className="font-serif text-xl text-white mb-4 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[#D4AF37]" /> {editingSkillId ? 'Edit Skill' : 'Create New Skill'}
              </h2>
              <form onSubmit={handleSaveSkill} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-mono text-neutral-300 mb-1">Skill Name</label>
                  <input
                    type="text"
                    required
                    value={skillForm.name}
                    onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                    placeholder="e.g. PyTorch / React Native"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block font-mono text-neutral-300 mb-1">Category</label>
                  <select
                    value={skillForm.category}
                    onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white"
                  >
                    <option value="Mobile Development">Mobile Development</option>
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                    <option value="Backend & APIs">Backend & APIs</option>
                    <option value="Programming Languages">Programming Languages</option>
                    <option value="Databases & Tools">Databases & Tools</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-neutral-300 mb-1">Proficiency Level</label>
                  <select
                    value={skillForm.level}
                    onChange={(e) => setSkillForm({ ...skillForm, level: e.target.value as any })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white"
                  >
                    <option value="Working With">Working With</option>
                    <option value="Learning">Learning</option>
                    <option value="Exploring">Exploring</option>
                  </select>
                </div>
                <div className="sm:col-span-3 flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSkillForm(false)}
                    className="px-4 py-2 rounded bg-neutral-800 text-neutral-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-black font-semibold font-mono"
                  >
                    {editingSkillId ? 'Save Changes' : 'Add Skill'}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((s) => (
              <div
                key={s._id || s.name}
                className="glass-panel p-4 rounded-xl border border-neutral-800 bg-[#121212]/90 flex items-center justify-between"
              >
                <div>
                  <h4 className="font-semibold text-white text-sm">{s.name}</h4>
                  <p className="text-[11px] font-mono text-neutral-400">
                    Category: {s.category} | Level: <span className="text-amber-400">{s.level}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => startEditSkill(s)}
                    className="p-1.5 rounded bg-neutral-800 text-amber-400 hover:bg-neutral-700"
                    title="Edit Skill"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  {s._id && (
                    <button
                      onClick={() => handleDeleteSkill(s._id!, s.name)}
                      className="p-1.5 rounded bg-red-950/60 text-red-400 hover:bg-red-900/80"
                      title="Delete Skill"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. MESSAGES TAB (Visitor Contact Form Inquiries) */}
      {activeTab === 'messages' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-xl text-white">Visitor Contact Messages ({messages.length})</h2>
            <button
              onClick={loadAdminData}
              className="px-3 py-1.5 rounded bg-neutral-800 text-xs font-mono text-amber-400 hover:bg-neutral-700"
            >
              Refresh Inbox
            </button>
          </div>

          {messages.length === 0 ? (
            <div className="glass-panel p-12 rounded-2xl border border-neutral-800 text-center text-neutral-400">
              <Inbox className="w-12 h-12 mx-auto mb-3 text-neutral-600" />
              <p className="text-sm font-mono">No contact messages received yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={msg._id || idx}
                  className="glass-panel p-6 rounded-2xl border border-amber-500/20 bg-[#121212]/95 flex flex-col justify-between"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-neutral-800 mb-3 gap-2">
                    <div>
                      <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
                        {msg.name}
                        <a
                          href={`mailto:${msg.email}`}
                          className="text-xs font-mono text-[#D4AF37] hover:underline font-normal"
                        >
                          ({msg.email})
                        </a>
                      </h3>
                      <p className="text-xs font-mono text-amber-400 mt-0.5">Subject: {msg.subject}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-neutral-500">
                        {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : 'Just now'}
                      </span>
                      {msg._id && (
                        <button
                          onClick={() => handleDeleteMessage(msg._id!)}
                          className="p-1.5 rounded bg-red-950/60 text-red-400 hover:bg-red-900/80"
                          title="Delete Message"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed bg-neutral-950/60 p-4 rounded-lg border border-neutral-900 whitespace-pre-wrap font-sans">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. ADMINS TAB */}
      {activeTab === 'admins' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-xl text-white">Administrator Accounts</h2>
            <button
              onClick={() => setShowAdminForm(!showAdminForm)}
              className="px-4 py-2 rounded-lg bg-blue-900/60 border border-blue-500/40 text-xs font-mono text-blue-300 hover:bg-blue-800/80 flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" /> Add Admin Account
            </button>
          </div>

          {showAdminForm && (
            <div className="glass-panel p-6 rounded-2xl border border-blue-500/30 bg-[#121212]/95 mb-8">
              <h2 className="font-serif text-xl text-white mb-4 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-blue-400" /> Create Admin Account
              </h2>
              <form onSubmit={handleAddAdmin} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-mono text-neutral-300 mb-1">New Admin Email</label>
                  <input
                    type="email"
                    required
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    placeholder="colleague@domain.com"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block font-mono text-neutral-300 mb-1">New Admin Password</label>
                  <input
                    type="password"
                    required
                    value={newAdminPassword}
                    onChange={(e) => setNewAdminPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-mono font-semibold"
                  >
                    Create Account
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="space-y-3">
            {admins.map((adm, idx) => (
              <div
                key={idx}
                className="glass-panel p-4 rounded-xl border border-neutral-800 bg-[#121212]/90 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <div>
                    <h4 className="font-semibold text-white text-sm">{adm.email}</h4>
                    <p className="text-[11px] font-mono text-neutral-400">Role: {adm.role}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono">
                  Active Admin
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
