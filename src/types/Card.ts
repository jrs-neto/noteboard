export interface Card {
  id: string;
  title: string;
  content: string;
  color?: string;
  priority?: boolean;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
}
