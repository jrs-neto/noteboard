import type { Card as CardType } from "../../types/Card";

interface CardProps {
  data: CardType;
  onDelete: (id: string) => void;
}

function Card({ data, onDelete }: CardProps) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h3>{data.title}</h3>
      <p>{data.content}</p>
      <button onClick={() => onDelete(data.id)}>Delete</button>
    </div>
  );
}

export default Card;