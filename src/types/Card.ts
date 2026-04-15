export interface Card {
  id: string;
  title: string;
  content: string;
  color?: string;
  priority?: 'low' | 'medium' | 'high' | null;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
}
