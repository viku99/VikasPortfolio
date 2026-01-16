
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  isSeries?: boolean; // Flag to identify multi-video collections
  cardPreviewVideo: {
    type: 'local' | 'youtube';
    src: string;
  };
  heroVideo: {
    type: 'local' | 'youtube';
    src: string;
  };
  details: {
    role: string;
    techStack: string[];
    year: number;
    liveUrl?: string;
    techniques?: string[];
    analysis?: string;
  };
  challenge?: string;
  solution?: string;
  gallery?: {
    type: 'image' | 'video' | 'youtube';
    src: string;
    label?: string;
  }[];
}
