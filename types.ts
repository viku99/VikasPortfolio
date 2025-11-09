
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
}
