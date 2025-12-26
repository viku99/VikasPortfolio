
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
  role: "Motion Director & Creative Technologist",
  tagline: "A motion-first developer crafting cinematic digital experiences.",
  showreelId: "CPnMek8iU1U"
};


// ============================================================================
// PROJECT DATA
// ============================================================================

export const PROJECTS: Project[] = [
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
      year: 2024,
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
  },
];
