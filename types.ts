
export interface SlideData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  accent: string;
}

export enum CarouselDirection {
  NEXT = 1,
  PREV = -1
}
