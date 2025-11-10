import { Project } from './types';

// ============================================================================
// SITE CONFIGURATION
// ============================================================================
// Here you can edit the core information for your portfolio site.

/**
 * SOCIAL MEDIA LINKS
 * ------------------
 * Add or edit your social media links here.
 * - name: The display name of the social media platform.
 * - href: The full URL to your profile.
 */
export const SOCIAL_LINKS = [
  { name: 'LinkedIn', href: "https://www.linkedin.com/in/vikasbala19" },
  { name: 'Behance', href: "https://www.behance.net/vikasbala" },
  { name: 'Github', href: "https://github.com/viku99" },
  { name: 'Instagram', href: "https://www.instagram.com/zorox.x_" },
];


// ============================================================================
// PROJECT DATA
// ============================================================================
// This is where you manage all the projects showcased in your portfolio.
// To add a new project, simply copy one of the existing project objects and
// modify its content.

/**
 * PROJECT STRUCTURE GUIDE
 * -----------------------
 * Here's a breakdown of what each field in a project object means:
 *
 * - id: A unique identifier for the project. Use a URL-friendly slug
 *       (e.g., 'my-awesome-project'). This is used for the project's page link.
 *
 * - title: The main title of your project.
 *
 * - category: A short description of the project's type (e.g., 'Interactive Web Experience').
 *
 * - description: A more detailed summary of the project. This appears on the project
 *                detail page.
 *
 * - imageUrl: The URL for the static image shown on the portfolio grid card
 *             before a user hovers over it. Can be a link or a local path like '/images/my-image.jpg'.
 *
 * - cardPreviewVideo: The video that plays when a user hovers over the project
 *                     card in the portfolio grid.
 *   - type: Can be 'local' or 'youtube'.
 *           'local': Use for video files stored in your public/videos folder.
 *           'youtube': Use for videos hosted on YouTube.
 *   - src: If type is 'local', this is the path to the video (e.g., '/videos/preview1.mp4').
 *          If type is 'youtube', this is the YouTube Video ID (e.g., 'LDU_Txk06tM').
 *
 * - heroVideo: The main, large video displayed at the top of the project detail page.
 *   - type: 'local' or 'youtube'.
 *   - src: Path or YouTube Video ID.
 *
 * - details: An object containing specific project metadata.
 *   - role: Your role on the project (e.g., 'Lead Frontend Developer').
 *   - techStack: A list of technologies, software, or skills used.
 *   - year: The year the project was completed.
 *   - liveUrl: (Optional) A link to the live version of the project. If you don't
 *              have one, you can remove this line.
 *
 * - challenge: (Optional) Describe the primary challenge of the project.
 *              Remove this line if not needed.
 *
 * - solution: (Optional) Describe how you solved the challenge.
 *             Remove this line if not needed.
 * 
 * - breakdown: (Optional) An array of steps detailing the project's construction.
 *   - title: The name of the breakdown step (e.g., "Raw Plate").
 *   - description: (Optional) A short explanation of this step.
 *   - media: The visual for this step.
 *     - type: 'image' or 'video'.
 *     - src: The URL or path to the media file.
 *
 * - gallery: (Optional) A list of additional images or videos for the project page.
 *            Remove this section if the project doesn't have a gallery.
 *   - type: 'image' or 'video'.
 *   - src: The URL or path to the media file.
 */
export const PROJECTS: Project[] = [
  {
    id: 'project-cyberscape',
    title: 'Project Cyberscape',
    category: 'Interactive Web Experience',
    description: 'A deep dive into a dystopian future, this WebGL experience combines narrative storytelling with interactive 3D environments. Built with React Three Fiber, it pushes the boundaries of web-based graphics.',
    imageUrl: 'https://picsum.photos/seed/cyberscape/800/600',
    cardPreviewVideo: {
      type: 'local',
      src: '/videos/preview1.mp4',
    },
    heroVideo: {
      type: 'local',
      src: '/videos/hero1.mp4',
    },
    details: {
      role: 'Lead Frontend & WebGL Developer',
      techStack: ['Blender', 'Unreal Engine'],
      year: 2023,
      liveUrl: '#',
    },
    challenge: 'The primary challenge was to create a highly detailed, real-time 3D environment that could run smoothly in a web browser without sacrificing visual fidelity. We needed to optimize complex models and lighting while maintaining an interactive frame rate across various devices.',
    solution: 'We leveraged Drei and custom shaders within React Three Fiber to build an efficient rendering pipeline. By baking lighting, using Level of Detail (LOD) for models, and implementing a custom asset loading strategy, we achieved a cinematic, high-performance experience directly on the web.',
    breakdown: [
      {
        title: 'Initial Concept Art',
        description: 'Establishing the mood and color palette. This phase defined the cyberpunk aesthetic and architectural style.',
        media: { type: 'image', src: 'https://picsum.photos/seed/cs-break-1/1280/720' },
      },
      {
        title: '3D Environment Blockout',
        description: 'Creating the foundational geometry in Blender. This step focused on scale, composition, and layout before adding detail.',
        media: { type: 'image', src: 'https://picsum.photos/seed/cs-break-2/1280/720' },
      },
      {
        title: 'Lighting & Texturing Pass',
        description: 'Applying textures and setting up the core lighting in Unreal Engine to create the signature neon-drenched atmosphere.',
        media: { type: 'image', src: 'https://picsum.photos/seed/cs-break-3/1280/720' },
      },
      {
        title: 'Final Composite in Browser',
        description: 'The final real-time render running in the browser, with post-processing effects like bloom and chromatic aberration applied via shaders.',
        media: { type: 'image', src: 'https://picsum.photos/seed/cs-break-4/1280/720' },
      },
    ],
    gallery: [
      { type: 'image', src: 'https://picsum.photos/seed/cyberscape-g1/1280/720' },
      { type: 'image', src: 'https://picsum.photos/seed/cyberscape-g2/1280/720' },
      { type: 'image', src: 'https://picsum.photos/seed/cyberscape-g3/720/1280' },
      { type: 'image', src: 'https://picsum.photos/seed/cyberscape-g4/1280/720' },
    ],
  },
  {
    id: 'data-vista',
    title: 'Data Vista',
    category: 'Data Visualization Platform',
    description: 'An enterprise-level dashboard that visualizes complex market data in real-time. Features custom D3.js charts and a highly performant, responsive interface for traders and analysts.',
    imageUrl: 'https://picsum.photos/seed/datavista/800/600',
    cardPreviewVideo: {
      type: 'youtube',
      src: 'LDU_Txk06tM',
    },
    heroVideo: {
      type: 'youtube',
      src: 'LDU_Txk06tM',
    },
    details: {
      role: 'Senior Frontend Engineer',
      techStack: [],
      year: 2022,
    },
  },
  {
    id: 'kinetic-ecom',
    title: 'Kinetic E-Commerce',
    category: 'Motion-First E-Commerce',
    description: 'A proof-of-concept e-commerce site where product presentation is driven by video and micro-interactions. The goal was to create a more engaging and tactile shopping experience.',
    imageUrl: 'https://picsum.photos/seed/kineticecom/800/600',
    cardPreviewVideo: {
      type: 'local',
      src: '/videos/preview2.mp4',
    },
    heroVideo: {
      type: 'local',
      src: '/videos/hero2.mp4',
    },
    details: {
      role: 'UI/UX Designer & Developer',
      techStack: [],
      year: 2023,
      liveUrl: '#',
    },
  },
  {
    id: 'audio-odyssey',
    title: 'Audio Odyssey',
    category: 'Generative Music App',
    description: 'A web application that generates ambient soundscapes based on user input and weather data. It uses the Web Audio API to create a unique and relaxing auditory experience.',
    imageUrl: 'https://picsum.photos/seed/audio/800/600',
    cardPreviewVideo: {
      type: 'youtube',
      src: 'hHW1oY2ir_M',
    },
    heroVideo: {
      type: 'youtube',
      src: 'hHW1oY2ir_M',
    },
    details: {
      role: 'Creator & Sole Developer',
      techStack: [],
      year: 2021,
    },
  },
  {
    id: 'aetherium-genesis',
    title: 'Aetherium Genesis',
    category: 'Generative Art Platform',
    description: 'A blockchain-integrated platform where users can create, explore, and mint unique pieces of generative art as NFTs. Features a custom shader-based art engine.',
    imageUrl: 'https://picsum.photos/seed/aetherium/800/600',
    cardPreviewVideo: {
      type: 'youtube',
      src: 'G_p94jVug1Y',
    },
    heroVideo: {
      type: 'youtube',
      src: 'G_p94jVug1Y',
    },
    details: {
      role: 'Full Stack & Blockchain Developer',
      techStack: ['Blender', 'Houdini'],
      year: 2023,
      liveUrl: '#',
    },
  },
  {
    id: 'momentum-app',
    title: 'Momentum',
    category: 'Fitness & Wellness App',
    description: 'A sleek, motion-heavy mobile and web app for tracking workouts and wellness goals. The UI is designed to be fluid and encouraging, with custom data visualizations.',
    imageUrl: 'https://picsum.photos/seed/momentum/800/600',
    cardPreviewVideo: {
      type: 'youtube',
      src: 'u_fKMdCZ_b0',
    },
    heroVideo: {
      type: 'youtube',
      src: 'u_fKMdCZ_b0',
    },
    details: {
      role: 'Lead UI/UX Engineer',
      techStack: [],
      year: 2022,
    },
  },
  {
    id: 'nomad-journal',
    title: 'Nomad',
    category: 'Immersive Travel Journal',
    description: 'A WebGL-powered digital journal that visualizes travel routes on an interactive 3D globe. Users can pin photos, videos, and notes to locations, creating a rich, narrative map of their journeys.',
    imageUrl: 'https://picsum.photos/seed/nomad/800/600',
    cardPreviewVideo: {
      type: 'youtube',
      src: 'yfqVLpcLp8k',
    },
    heroVideo: {
      type: 'youtube',
      src: 'yfqVLpcLp8k',
    },
    details: {
      role: 'Creative Developer',
      techStack: [],
      year: 2021,
    },
  },
  {
    id: 'synapse-ai',
    title: 'Synapse',
    category: 'AI Code Assistant UI',
    description: 'A conceptual UI for an AI-powered code assistant. The design focuses on a futuristic, "glitch art" aesthetic, with dynamic text effects and a non-traditional layout to rethink the developer experience.',
    imageUrl: 'https://picsum.photos/seed/synapse/800/600',
    cardPreviewVideo: {
      type: 'youtube',
      src: '28-QzTSkX-g',
    },
    heroVideo: {
      type: 'youtube',
      src: '28-QzTSkX-g',
    },
    details: {
      role: 'UI/UX Prototyper',
      techStack: [],
      year: 2023,
    },
  },
  {
    id: 'suitcase-motion-film',
    title: 'Suitcase Motion Film',
    category: 'Cinematic Short',
    description: 'A short emotional film exploring the memories people carry through their luggage.',
    imageUrl: 'https://picsum.photos/seed/suitcase-motion-film/800/600',
    cardPreviewVideo: { type: 'youtube', src: 'k53_S-f0q_8' },
    heroVideo: { type: 'youtube', src: 'k53_S-f0q_8' },
    details: {
      role: 'Director & Motion Designer',
      techStack: ['After Effects', 'Premiere Pro'],
      year: 2024,
    },
  },
  {
    id: 'her-signal',
    title: 'Her Signal',
    category: 'Cinematic Short',
    description: 'A sci-fi visual narrative based on a lost transmission from deep space.',
    imageUrl: 'https://picsum.photos/seed/her-signal/800/600',
    cardPreviewVideo: { type: 'youtube', src: 'xX_0s034S3A' },
    heroVideo: { type: 'youtube', src: 'xX_0s034S3A' },
    details: {
      role: 'Creative Director',
      techStack: ['Blender', 'After Effects', 'DaVinci Resolve', 'Unreal Engine', 'Substance Painter'],
      year: 2023,
    },
    challenge: 'The film required a unique visual language to represent an alien signal. The core task was to blend abstract, ethereal visuals with a cohesive narrative structure, ensuring the audience could feel the story emotionally without traditional dialogue.',
    solution: 'We developed a custom pipeline using Blender for procedural geometry and Unreal Engine for real-time rendering of volumetric clouds and particle systems. This allowed for rapid iteration on the signal\'s appearance. The final composite in After Effects integrated these elements with a cinematic color grade to evoke a sense of mystery and wonder.',
    breakdown: [
      {
        title: 'Raw Plate Footage',
        description: 'The original, ungraded shot that served as the canvas for all visual effects.',
        media: { type: 'image', src: 'https://picsum.photos/seed/hs-break-1/1280/720' },
      },
      {
        title: 'Procedural Geometry Pass',
        description: 'Abstract shapes and signal forms generated in Blender, rendered as a separate layer.',
        media: { type: 'image', src: 'https://picsum.photos/seed/hs-break-2/1280/720' },
      },
      {
        title: 'Particle & Volumetric Pass',
        description: 'Atmospheric elements like fog, dust, and energy particles rendered in real-time from Unreal Engine.',
        media: { type: 'image', src: 'https://picsum.photos/seed/hs-break-3/1280/720' },
      },
      {
        title: 'Final Color Grade',
        description: 'All layers composited in After Effects, with the final cinematic color grade applied in DaVinci Resolve to unify the shot.',
        media: { type: 'image', src: 'https://picsum.photos/seed/hs-break-4/1280/720' },
      },
    ],
    gallery: [
      { type: 'image', src: 'https://picsum.photos/seed/her-signal-g1/1920/1080' },
      { type: 'image', src: 'https://picsum.photos/seed/her-signal-g2/1920/1080' },
    ],
  },
  {
    id: 'artifacts-signal',
    title: 'Artifacts Signal',
    category: 'Concept Story',
    description: 'Visual world-building project combining motion, storytelling, and design.',
    imageUrl: 'https://picsum.photos/seed/artifacts-signal/800/600',
    cardPreviewVideo: { type: 'youtube', src: '3h0_v9_4M4A' },
    heroVideo: { type: 'youtube', src: '3h0_v9_4M4A' },
    details: {
      role: 'Visual Artist',
      techStack: ['Blender', 'Photoshop'],
      year: 2023,
    },
  },
  {
    id: 'the-sound-of-travel',
    title: 'The Sound of Travel',
    category: 'Motion Experiment',
    description: 'A motion experiment visualizing travel emotions through sound waves.',
    imageUrl: 'https://picsum.photos/seed/the-sound-of-travel/800/600',
    cardPreviewVideo: { type: 'youtube', src: '_SO2Cgt5j4A' },
    heroVideo: { type: 'youtube', src: '_SO2Cgt5j4A' },
    details: {
      role: 'Motion Designer',
      techStack: ['After Effects'],
      year: 2022,
    },
  },
  {
    id: 'rewind-identity-film',
    title: 'Rewind Identity Film',
    category: 'Brand Film',
    description: 'A time-reversal themed motion video symbolizing nostalgia and memory.',
    imageUrl: 'https://picsum.photos/seed/rewind-identity-film/800/600',
    cardPreviewVideo: { type: 'youtube', src: 'u_fKMdCZ_b0' },
    heroVideo: { type: 'youtube', src: 'u_fKMdCZ_b0' },
    details: {
      role: 'Motion Graphics Artist',
      techStack: ['After Effects'],
      year: 2024,
    },
  },
  {
    id: 'visual-rhythm-study',
    title: 'Visual Rhythm Study',
    category: 'Motion Experiment',
    description: 'Motion typography and shape-based experiment synced to beats.',
    imageUrl: 'https://picsum.photos/seed/visual-rhythm-study/800/600',
    cardPreviewVideo: { type: 'youtube', src: 'ojCYw502D_8' },
    heroVideo: { type: 'youtube', src: 'ojCYw502D_8' },
    details: {
      role: 'Creative Developer',
      techStack: [],
      year: 2021,
    },
  },
  {
    id: 'color-emotion-study',
    title: 'Color Emotion Study',
    category: 'Visual Exploration',
    description: 'Visual exploration showing how different hues evoke emotional reactions.',
    imageUrl: 'https://picsum.photos/seed/color-emotion-study/800/600',
    cardPreviewVideo: { type: 'youtube', src: 'G_p94jVug1Y' },
    heroVideo: { type: 'youtube', src: 'G_p94jVug1Y' },
    details: {
      role: 'UI/UX Designer & Developer',
      techStack: ['Illustrator'],
      year: 2022,
    },
  },
  {
    id: 'cinematic-title-design',
    title: 'Cinematic Title Design',
    category: 'Title Sequence',
    description: 'A stylized title animation inspired by Hollywood intro sequences.',
    imageUrl: 'https://picsum.photos/seed/cinematic-title-design/800/600',
    cardPreviewVideo: { type: 'youtube', src: 'B6BfV6_6_2M' },
    heroVideo: { type: 'youtube', src: 'B6BfV6_6_2M' },
    details: {
      role: 'Title Designer',
      techStack: ['After Effects', 'Blender'],
      year: 2023,
    },
  },
  {
    id: 'dream-sequence',
    title: 'Dream Sequence',
    category: 'Abstract Animation',
    description: 'Abstract motion loop exploring surreal dream visuals and transitions.',
    imageUrl: 'https://picsum.photos/seed/dream-sequence/800/600',
    cardPreviewVideo: { type: 'youtube', src: 'LDU_Txk06tM' },
    heroVideo: { type: 'youtube', src: 'LDU_Txk06tM' },
    details: {
      role: 'Visual Artist',
      techStack: ['Houdini', 'Maya'],
      year: 2021,
    },
  },
  {
    id: 'beyond-static',
    title: 'Beyond Static',
    category: 'Motion Poster',
    description: 'A motion poster experiment converting still designs into moving expressions.',
    imageUrl: 'https://picsum.photos/seed/beyond-static/800/600',
    cardPreviewVideo: { type: 'youtube', src: 'yfqVLpcLp8k' },
    heroVideo: { type: 'youtube', src: 'yfqVLpcLp8k' },
    details: {
      role: 'Designer & Animator',
      techStack: ['Photoshop', 'After Effects'],
      year: 2022,
    },
  },
  {
    id: 'the-unknown-frequency',
    title: 'The Unknown Frequency',
    category: 'Audio-Reactive Design',
    description: 'Audio-reactive motion design inspired by alien communication signals.',
    imageUrl: 'https://picsum.photos/seed/the-unknown-frequency/800/600',
    cardPreviewVideo: { type: 'youtube', src: 'hHW1oY2ir_M' },
    heroVideo: { type: 'youtube', src: 'hHW1oY2ir_M' },
    details: {
      role: 'Creative Coder',
      techStack: ['Houdini'],
      year: 2023,
    },
  },
  {
    id: 'fragments-of-memory',
    title: 'Fragments of Memory',
    category: 'Visual Poem',
    description: 'A poetic visual montage mixing human emotion and texture-based animation.',
    imageUrl: 'https://picsum.photos/seed/fragments-of-memory/800/600',
    cardPreviewVideo: { type: 'youtube', src: 'k53_S-f0q_8' },
    heroVideo: { type: 'youtube', src: 'k53_S-f0q_8' },
    details: {
      role: 'Filmmaker & Editor',
      techStack: ['Premiere Pro', 'After Effects'],
      year: 2022,
    },
  },
  {
    id: 'echoes-of-the-city',
    title: 'Echoes of the City',
    category: 'Urban Motion Short',
    description: 'Urban motion short showcasing light reflections and ambient city sounds.',
    imageUrl: 'https://picsum.photos/seed/echoes-of-the-city/800/600',
    cardPreviewVideo: { type: 'youtube', src: '28-QzTSkX-g' },
    heroVideo: { type: 'youtube', src: '28-QzTSkX-g' },
    details: {
      role: 'Cinematographer',
      techStack: ['DaVinci Resolve'],
      year: 2021,
    },
  },
  {
    id: 'the-loop-project',
    title: 'The Loop Project',
    category: 'Looping Animation',
    description: 'Continuous looping animation focused on balance and flow in motion.',
    imageUrl: 'https://picsum.photos/seed/the-loop-project/800/600',
    cardPreviewVideo: { type: 'local', src: '/videos/preview1.mp4' },
    heroVideo: { type: 'local', src: '/videos/hero1.mp4' },
    details: {
      role: 'Animator',
      techStack: ['After Effects'],
      year: 2023,
    },
  },
  {
    id: 'typography-in-motion',
    title: 'Typography in Motion',
    category: 'Kinetic Typography',
    description: 'Experimental sequence exploring type movement and energy.',
    imageUrl: 'https://picsum.photos/seed/typography-in-motion/800/600',
    cardPreviewVideo: { type: 'youtube', src: 'B6BfV6_6_2M' },
    heroVideo: { type: 'youtube', src: 'B6BfV6_6_2M' },
    details: {
      role: 'Typographer & Motion Designer',
      techStack: ['After Effects'],
      year: 2022,
    },
  },
  {
    id: 'human-machine',
    title: 'Human Machine',
    category: 'Visual Study',
    description: 'Conceptual film showing the emotional merge of human and AI visuals.',
    imageUrl: 'https://picsum.photos/seed/human-machine/800/600',
    cardPreviewVideo: { type: 'youtube', src: 'xX_0s034S3A' },
    heroVideo: { type: 'youtube', src: 'xX_0s034S3A' },
    details: {
      role: 'Creative Director',
      techStack: ['After Effects', 'Houdini'],
      year: 2024,
    },
  },
  {
    id: 'monsoon-abstracts',
    title: 'Monsoon Abstracts',
    category: 'Atmospheric Visuals',
    description: 'Atmospheric visuals inspired by the rhythm and texture of rainfall.',
    imageUrl: 'https://picsum.photos/seed/monsoon-abstracts/800/600',
    cardPreviewVideo: { type: 'local', src: '/videos/preview2.mp4' },
    heroVideo: { type: 'local', src: '/videos/hero2.mp4' },
    details: {
      role: 'Visual Artist',
      techStack: ['Houdini', 'After Effects'],
      year: 2021,
    },
  },
  {
    id: 'soul-in-pixels',
    title: 'Soul in Pixels',
    category: 'Glitch Art',
    description: 'Visual exploration blending portrait motion and glitch design.',
    imageUrl: 'https://picsum.photos/seed/soul-in-pixels/800/600',
    cardPreviewVideo: { type: 'youtube', src: 'aWzlQ2N62_E' },
    heroVideo: { type: 'youtube', src: 'aWzlQ2N62_E' },
    details: {
      role: 'Digital Artist',
      techStack: ['After Effects'],
      year: 2022,
    },
  },
  {
    id: 'perception-test',
    title: 'Perception Test',
    category: 'Design Experiment',
    description: 'A design experiment challenging visual illusions and human focus.',
    imageUrl: 'https://picsum.photos/seed/perception-test/800/600',
    cardPreviewVideo: { type: 'youtube', src: '3h0_v9_4M4A' },
    heroVideo: { type: 'youtube', src: '3h0_v9_4M4A' },
    details: {
      role: 'UI/UX Prototyper',
      techStack: [],
      year: 2023,
    },
  },
  {
    id: 'timeless-motion-reel',
    title: 'Timeless Motion Reel',
    category: 'Showreel',
    description: 'Your final showreel combining best clips from your projects in one cinematic cut.',
    imageUrl: 'https://picsum.photos/seed/timeless-motion-reel/800/600',
    cardPreviewVideo: { type: 'youtube', src: 'CPnMek8iU1U' },
    heroVideo: { type: 'youtube', src: 'CPnMek8iU1U' },
    details: {
      role: 'Editor & Motion Designer',
      techStack: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
      year: 2024,
    },
  },
];