
import { Project } from './types';

// ============================================================================
// SITE CONFIGURATION
// ============================================================================

export const SOCIAL_LINKS = [
  { name: 'LinkedIn', href: "https://www.linkedin.com/in/vikasbala19" },
  { name: 'Behance', href: "https://www.behance.net/vikasbala" },
  { name: 'Github', href: "https://github.com/viku99" },
  { name: 'Instagram', href: "https://www.instagram.com/zorox.x_" },
];

export const SITE_INFO = {
  name: "VIKAS",
  role: "Motion-First Visual Storyteller",
  tagline: "Designing attention through movement.",
  showreelId: "CPnMek8iU1U"
};


// ============================================================================
// PROJECT DATA
// ============================================================================

export const PROJECTS: Project[] = [
  {
    id: 'the-vision-series',
    title: 'The Vision Series: Product Motion',
    category: 'Product & Brand Editorial',
    description: 'A comprehensive study in rhythmic product editing for a luxury eyewear brand. This collection explores eight distinct visual narratives, focusing on sub-frame beat synchronization, dynamic speed ramping, and minimalist aesthetic control.',
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2080&auto=format&fit=crop',
    isSeries: true,
    cardPreviewVideo: {
      type: 'youtube',
      src: 'bCnWijdu36Q',
    },
    heroVideo: {
      type: 'youtube',
      src: 'bCnWijdu36Q',
    },
    details: {
      role: 'Creative Director & Motion Editor',
      techStack: ['After Effects', 'Graph Editor', 'Sound Design'],
      year: 2025,
      techniques: [
        'Dynamic Speed Ramping',
        'Frame-Data Analysis',
        'Kinetic Typography',
        'Sub-frame Beat Matching',
        'Luxury Color Grading'
      ],
      analysis: 'The goal was to create a cohesive visual language across eight different product variants without becoming repetitive. By utilizing a "modular rhythm" workflow, I was able to maintain a high-energy pace while tailoring the motion curves of each video to match specific sonic transients in the soundtrack.'
    },
    challenge: 'Showcasing a large volume of high-energy product edits without diluting the brand identity or overwhelming the viewer.',
    solution: 'Developed a unified kinetic framework that uses sharp masking and aggressive time-remapping to create a consistent "snap" across all assets, presented as a curated rhythmic collection.',
    gallery: [
      { type: 'youtube', src: 'bCnWijdu36Q', label: 'Optic A: Speed Study' },
      { type: 'youtube', src: '2lB3fNeKpY8', label: 'Optic B: Depth Reveal' },
      { type: 'youtube', src: 'VMVR4tbL3Zc', label: 'Optic C: Silhouette' },
      { type: 'youtube', src: 'm38z7e-SF9Q', label: 'Optic D: Minimalist' },
      { type: 'youtube', src: 'f6iuy43bH_c', label: 'Optic E: High Velocity' },
      { type: 'youtube', src: 'rs6GKOwx3Nk', label: 'Optic F: Texture' },
      { type: 'youtube', src: 'IQgDgnhNAGc', label: 'Optic G: Rhythm Edit' },
      { type: 'youtube', src: '4ZBInDJCYxw', label: 'Optic H: Final Cut' },
    ]
  },
  {
    id: 'the-talent-blueprint',
    title: 'The Talent Blueprint: AI Innovation',
    category: 'Recruitment & Corporate Motion',
    description: 'A recruitment campaign for a leading AI Innovation company. These edits were designed to disrupt traditional corporate narratives, using high-intensity motion graphics to attract the next generation of engineers and thinkers.',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop',
    isSeries: true,
    cardPreviewVideo: {
      type: 'youtube',
      src: 'CQD95UN_uhU',
    },
    heroVideo: {
      type: 'youtube',
      src: 'CQD95UN_uhU',
    },
    details: {
      role: 'Lead Motion Designer',
      techStack: ['After Effects', 'Sound Design', 'AI Synthesis'],
      year: 2025,
      techniques: [
        'Glitch Aesthetics',
        'Cyber-Editorial Pacing',
        'Dynamic Text Animation',
        'Sound-Driven Transitions'
      ],
      analysis: 'Recruitment videos often suffer from being too "safe." For this AI firm, we went the opposite direction. We used a visual language that mirrors the complexity and speed of neural networks—fast cuts, high-frequency glitch effects, and a sonic landscape that feels futuristic.'
    },
    challenge: 'Transforming a standard internship announcement into a high-energy, aspirational "tech-event" feel.',
    solution: 'Implemented a high-contrast visual style with aggressive motion curves, ensuring every frame felt alive and aligned with the cutting-edge nature of AI development.',
    gallery: [
      { type: 'youtube', src: 'CQD95UN_uhU', label: 'Phase 01: The Vision' },
      { type: 'youtube', src: 'LIrZ-KDaWpo', label: 'Phase 02: The Opportunity' },
    ]
  },
  {
    id: 'gaza-briefing',
    title: 'The Social Talks: Gaza Briefing',
    category: 'Editorial & News Media',
    description: 'A rapid-response digital newsroom workflow for @TheSocialTalks. This project demonstrates how high-end motion design can be applied to breaking news environments, maintaining cinematic quality under extreme deadlines.',
    imageUrl: 'https://i.postimg.cc/XqFnSLJp/THUMBNAIL-P1.jpg',
    cardPreviewVideo: {
      type: 'youtube',
      src: 'oOVN2OKMAe4',
    },
    heroVideo: {
      type: 'youtube',
      src: 'oOVN2OKMAe4',
    },
    details: {
      role: 'Motion Director & Editor',
      techStack: ['After Effects', 'Premiere Pro', 'Adobe Audition'],
      year: 2025,
      techniques: [
        'Dynamic Lower Thirds', 
        'Expression-based Animation', 
        'Luma Matte Transitions', 
        'Multi-cam News Sync',
        'Kinetic Typography'
      ],
      analysis: 'The primary challenge was the 2-hour window from raw footage to final export. I built a modular AE project file where data is fed into a main composition through a CSV controller, allowing the editorial team to update text without opening complex nested compositions. The color palette was strictly controlled to maintain editorial authority while keeping the motion fluid and attention-grabbing.'
    },
    challenge: 'The news cycle demands near-instant turnarounds. We needed to develop a workflow that allowed for high-quality motion graphics and sound design within a 2-hour window.',
    solution: 'Every scene was pre-composed in After Effects using dynamic link workflows. I utilized expressions to automate text animations, allowing for rapid content replacement while keeping the high-end editorial feel.',
  },
  {
    id: 'precision-time-remap',
    title: 'Precision Time-Remap: Gameplay Study',
    category: 'Motion & Rhythm Edit',
    description: 'A study in absolute control over pacing and frame-data. This edit focuses on manual time-remapping and speed ramping to create a perfect marriage between gameplay visuals and audio transients.',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
    cardPreviewVideo: {
      type: 'youtube',
      src: 'T8U9eM2M0tg',
    },
    heroVideo: {
      type: 'youtube',
      src: 'T8U9eM2M0tg',
    },
    details: {
      role: 'Lead Motion Designer',
      techStack: ['After Effects'],
      year: 2024,
      techniques: [
        'Manual Time Remapping', 
        'Graph Editor Velocity Control', 
        'Optical Flow Frame Blending', 
        'Sub-frame Audio Alignment',
        'Impact Shake Physics'
      ],
      analysis: 'To achieve the characteristic "snap" on every beat, I manually keyed the timeremap value using the Value Graph in AE. By creating extreme "S-curves", I was able to accelerate into the impact and linger on the follow-through, creating a much higher sense of kinetic energy than simple linear speed ramping. The audio was processed in Audition to isolate transients, which were then used as reference points for every single keyframe.'
    },
    challenge: 'Achieving perfect synchronization without automated plugins. Every hit needed to feel impactful through visual physics rather than just filters.',
    solution: 'This was edited entirely within After Effects. I used the Graph Editor for manual time-remapping, ensuring that speed curves aligned precisely with the audio waveform peaks. No "beat-sync" plugins were used; every frame was curated for maximum impact.',
  }
];
