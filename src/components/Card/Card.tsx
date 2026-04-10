import type { Card as CardType } from "../../types/Card";

interface CardProps {
  data: CardType;
  onDelete: (id: string) => void;
  color?: string;
  onEdit: (card: CardType) => void;
}

function Card({ data, onDelete, color, onEdit }: CardProps) {
  return (
    <div style={
      {
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px",
        backgroundColor: color || '#fff',
      }}>
      <h3>{data.title}</h3>
      <p>{data.content}</p>
      <button onClick={() => onDelete(data.id)}>Delete</button>
      <button onClick={() => onEdit(data)}>Edit</button>
    </div>
  );
}

export default Card;