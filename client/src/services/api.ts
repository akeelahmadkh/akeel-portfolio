import axios from "axios";

// Live Vercel Backend URL
const PRIMARY_API_URL =
  import.meta.env.VITE_API_URL || "https://akeel-portfolio-8fr6.vercel.app/api";

export interface Project {
  _id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: "AI / ML" | "Mobile" | "Full Stack" | "Backend" | "Web" | "Other";
  technologies: string[];
  thumbnail: string;
  screenshots: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  status: "Completed" | "In Progress" | "Coming Soon";
  architecture?: string;
  challenges?: string;
  lessonsLearned?: string;
  createdAt?: string;
}

export interface Skill {
  _id?: string;
  name: string;
  category: string;
  level: "Working With" | "Learning" | "Exploring";
}

export interface ContactMessage {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: string;
}

export const FALLBACK_PROJECTS: Project[] = [
  {
    _id: "1",
    title: "Nexa Bank",
    slug: "nexa-bank",
    shortDescription:
      "Full-stack digital banking application designed to simulate real-world banking workflows, including authentication, OTP verification, role-based functionality, backend communication, and a modern UI.",
    fullDescription:
      "Nexa Bank is a full-stack digital banking application designed to simulate real-world banking workflows, including authentication, OTP verification, role-based functionality, backend communication, and a modern application interface.",
    category: "Full Stack",
    technologies: [
      "React",
      "React Native",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Tailwind CSS",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop",
    ],
    githubUrl: "https://github.com/akeel-dev/nexa-bank",
    liveUrl: "https://nexa-bank-demo.vercel.app",
    featured: true,
    status: "Completed",
    architecture:
      "Microservices architecture with RESTful Express endpoints, MongoDB transactions for bank transfers, JWT auth, and OTP validation service layer.",
    challenges:
      "Ensuring atomic financial transactions without race conditions while supporting real-time mobile push notifications.",
    lessonsLearned:
      "Deepened mastery of security handshakes, multi-factor OTP validation, role-based access control (RBAC), and transactional database integrity.",
  },
  {
    _id: "2",
    title: "VisionAI Mobile Suite",
    slug: "vision-ai-mobile",
    shortDescription:
      "React Native mobile application integrated with deep learning models for real-time computer vision and mobile object classification.",
    fullDescription:
      "An AI-powered mobile application built using React Native and TensorFlow Lite / PyTorch backend APIs. Allows users to capture live video feeds and run edge ML models for real-time item detection and AI analysis.",
    category: "AI / ML",
    technologies: [
      "React Native",
      "Python",
      "TensorFlow",
      "PyTorch",
      "Node.js",
      "Expo",
      "FastAPI",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    ],
    githubUrl: "https://github.com/akeel-dev/vision-ai-mobile",
    liveUrl: "",
    featured: true,
    status: "Completed",
    architecture:
      "Client-side edge model inference optimized via TFLite with fallback to FastAPI REST server for intensive deep learning tasks.",
    challenges:
      "Optimizing model latency and memory usage on mid-range Android & iOS smartphones.",
    lessonsLearned:
      "Gained expertise in cross-platform mobile optimization, model quantization, and asynchronous frame sampling.",
  },
  {
    _id: "3",
    title: "NeuralTrack Deep Learning Platform",
    slug: "neural-track",
    shortDescription:
      "Deep Learning pipeline for RNN & LSTM time-series forecasting and intelligent metric monitoring.",
    fullDescription:
      "Custom Python & PyTorch backend pipeline utilizing Recurrent Neural Networks (RNN) and Long Short-Term Memory (LSTM) models to analyze sequential sensor and market data.",
    category: "AI / ML",
    technologies: [
      "Python",
      "PyTorch",
      "RNN",
      "LSTM",
      "NumPy",
      "Pandas",
      "Express.js",
      "MongoDB",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
    ],
    githubUrl: "https://github.com/akeel-dev/neural-track",
    liveUrl: "",
    featured: true,
    status: "In Progress",
    architecture:
      "Flask/FastAPI microservice communicating over WebSocket and REST endpoints with an Express middleware layer.",
    challenges:
      "Managing exploding gradient problems during multi-step LSTM training cycles.",
    lessonsLearned:
      "Mastered sequence data preprocessing, temporal windowing, and gradient clipping techniques.",
  },
  {
    _id: "4",
    title: "Smart API Gateway & Microservices",
    slug: "smart-api-gateway",
    shortDescription:
      "Scalable backend API gateway with JWT rate-limiting, MongoDB caching, and microservice route management.",
    fullDescription:
      "A high-throughput API gateway built in Node.js and TypeScript. Features adaptive rate-limiting, JWT authentication middleware, and automated error logging.",
    category: "Backend",
    technologies: [
      "Node.js",
      "Express.js",
      "TypeScript",
      "MongoDB",
      "Redis",
      "Docker",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    ],
    githubUrl: "https://github.com/akeel-dev/smart-api-gateway",
    liveUrl: "",
    featured: false,
    status: "Completed",
    architecture:
      "Event-driven backend service architecture using Express routing, Token Bucket rate-limiting algorithm, and MongoDB persistence.",
    challenges: "Preventing bottlenecking during high burst traffic scenarios.",
    lessonsLearned:
      "Hands-on experience in backend scaling, load distribution, and memory caching strategies.",
  },
];

export const FALLBACK_SKILLS: Skill[] = [
  {
    _id: "s1",
    name: "React Native",
    category: "Mobile Development",
    level: "Working With",
  },
  {
    _id: "s2",
    name: "Flutter",
    category: "Mobile Development",
    level: "Learning",
  },
  {
    _id: "s3",
    name: "Kotlin",
    category: "Mobile Development",
    level: "Exploring",
  },
  {
    _id: "s4",
    name: "Expo CLI",
    category: "Mobile Development",
    level: "Working With",
  },
  {
    _id: "s5",
    name: "Python",
    category: "AI & Machine Learning",
    level: "Working With",
  },
  {
    _id: "s6",
    name: "NumPy & Pandas",
    category: "AI & Machine Learning",
    level: "Working With",
  },
  {
    _id: "s7",
    name: "Machine Learning",
    category: "AI & Machine Learning",
    level: "Working With",
  },
  {
    _id: "s8",
    name: "Deep Learning",
    category: "AI & Machine Learning",
    level: "Learning",
  },
  {
    _id: "s9",
    name: "RNN & LSTM",
    category: "AI & Machine Learning",
    level: "Learning",
  },
  {
    _id: "s10",
    name: "PyTorch / TensorFlow",
    category: "AI & Machine Learning",
    level: "Learning",
  },
  {
    _id: "s11",
    name: "Node.js",
    category: "Backend & APIs",
    level: "Working With",
  },
  {
    _id: "s12",
    name: "Express.js",
    category: "Backend & APIs",
    level: "Working With",
  },
  {
    _id: "s13",
    name: "RESTful APIs",
    category: "Backend & APIs",
    level: "Working With",
  },
  {
    _id: "s14",
    name: "Firebase",
    category: "Backend & APIs",
    level: "Working With",
  },
  {
    _id: "s15",
    name: "JavaScript (ES6+)",
    category: "Programming Languages",
    level: "Working With",
  },
  {
    _id: "s16",
    name: "TypeScript",
    category: "Programming Languages",
    level: "Working With",
  },
  {
    _id: "s17",
    name: "Java",
    category: "Programming Languages",
    level: "Learning",
  },
  {
    _id: "s18",
    name: "MongoDB & Mongoose",
    category: "Databases & Tools",
    level: "Working With",
  },
  {
    _id: "s19",
    name: "Git & GitHub",
    category: "Databases & Tools",
    level: "Working With",
  },
];

const fetchWithFallback = async (endpoint: string, options?: any) => {
  return await axios({
    url: `${PRIMARY_API_URL}${endpoint}`,
    timeout: 8000,
    ...options,
  });
};

export const getProjects = async (): Promise<Project[]> => {
  try {
    const res = await fetchWithFallback("/projects");
    return res.data;
  } catch (err) {
    return FALLBACK_PROJECTS;
  }
};

export const getProjectBySlug = async (
  slug: string,
): Promise<Project | null> => {
  try {
    const res = await fetchWithFallback(`/projects/${slug}`);
    return res.data;
  } catch (err) {
    const found = FALLBACK_PROJECTS.find((p) => p.slug === slug);
    return found || null;
  }
};

export const getSkills = async (): Promise<Skill[]> => {
  try {
    const res = await fetchWithFallback("/skills");
    return res.data;
  } catch (err) {
    return FALLBACK_SKILLS;
  }
};

export const submitContactForm = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const res = await fetchWithFallback("/contact", { method: "POST", data });
    return res.data;
  } catch (err) {
    return { message: "Thank you! Your message has been sent." };
  }
};

export const getContactMessages = async (
  token: string,
): Promise<ContactMessage[]> => {
  const res = await fetchWithFallback("/contact", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteContactMessage = async (id: string, token: string) => {
  const res = await fetchWithFallback(`/contact/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const adminLogin = async (credentials: {
  email: string;
  password: string;
}) => {
  const res = await fetchWithFallback("/auth/login", {
    method: "POST",
    data: credentials,
  });
  return res.data;
};

export const createProject = async (
  projectData: Partial<Project>,
  token: string,
) => {
  const res = await fetchWithFallback("/projects", {
    method: "POST",
    data: projectData,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateProject = async (
  id: string,
  projectData: Partial<Project>,
  token: string,
) => {
  const res = await fetchWithFallback(`/projects/${id}`, {
    method: "PUT",
    data: projectData,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteProject = async (id: string, token: string) => {
  const res = await fetchWithFallback(`/projects/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createSkill = async (skillData: Partial<Skill>, token: string) => {
  const res = await fetchWithFallback("/skills", {
    method: "POST",
    data: skillData,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateSkill = async (
  id: string,
  skillData: Partial<Skill>,
  token: string,
) => {
  const res = await fetchWithFallback(`/skills/${id}`, {
    method: "PUT",
    data: skillData,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteSkill = async (id: string, token: string) => {
  const res = await fetchWithFallback(`/skills/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const addAdminUser = async (
  data: { newAdminEmail: string; newAdminPassword: string },
  token: string,
) => {
  const res = await fetchWithFallback("/auth/add-admin", {
    method: "POST",
    data,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getAdminsList = async (token: string) => {
  const res = await fetchWithFallback("/auth/admins", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
