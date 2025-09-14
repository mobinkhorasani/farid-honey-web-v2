export interface TimelineItem {
  year: number;
  title: string;
}

export interface VideoProps {
  url: string;
  poster?: string;
}

export interface StoryProps {
  aboutText: string;
}

export interface TimelineProps {
  items: TimelineItem[];
}
