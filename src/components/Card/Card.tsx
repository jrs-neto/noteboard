import type { Card as CardType } from "../../types/Card";

interface CardProps {
  data: CardType;
}

function Card({ data }: CardProps) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h3>{data.title}</h3>
      <p>{data.content}</p>
    </div>
  );
}

export default Card;