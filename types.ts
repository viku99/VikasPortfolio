
export interface BreakdownStep {
  title: string;
  description?: string;
  media: {
    type: 'image' | 'video';
    src: string;
  };
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
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
  };
  challenge?: string;
  solution?: string;
  gallery?: {
    type: 'image' | 'video';
    src: string;
  }[];
  breakdown?: BreakdownStep[];
}