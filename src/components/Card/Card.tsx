import type { Card as CardType } from "../../types/Card";

interface CardProps {
  data: CardType;
  onDelete: (id: string) => void;
  onEdit: (card: CardType) => void;
  onTogglePriority: (id: string) => void;
}

function Card({ data, onDelete, onEdit, onTogglePriority }: CardProps) {
  return (
    <div style={
      {
        border: data.priority ? "2px solid #ff4757" : "1px solid #ccc",
        padding: "10px",
        margin: "10px",
        backgroundColor: data.color || '#fff',
        borderRadius: '8px',
        boxShadow: data.priority ? '0 4px 12px rgba(255, 71, 87, 0.2)' : 'none'
      }}>
      <h3>{data.title} {data.priority && "⭐"}</h3>
      <p>{data.content}</p>
      <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
        <button onClick={() => onDelete(data.id)}>Delete</button>
        <button onClick={() => onEdit(data)}>Edit</button>
        <button onClick={() => onTogglePriority(data.id)}>
          {data.priority ? "⭐" : "☆"}
        </button>
      </div>
    </div>
  );
}

export default Card;