import type { Card as CardType } from "../../types/Card";
import "./Card.css";

interface CardProps {
  data: CardType;
  onDelete: (id: string) => void;
  onDoubleClick: () => void;
  onTogglePriority: (id: string) => void;
}

function Card({ data, onDelete, onDoubleClick, onTogglePriority }: CardProps) {
  return (
    <div
      className={`card ${data.priority ? 'priority' : ''}`}
      style={{ backgroundColor: data.color || '#93c5fd' }}
      onDoubleClick={onDoubleClick} // <-- Agora ao clicar 2x ele entra em modo de edição
    >
      <div className="card-body">
        <h3 className="card-title">{data.title}</h3>
        <p className="card-content">{data.content}</p>

        {data.priority && (
          <div className="priority-badge">
            Prioridade: Alta 🟢
          </div>
        )}
      </div>

      <div className="card-footer">
        <div className="footer-left">
          <button title="Excluir" onClick={() => onDelete(data.id)}>Excluir</button>
        </div>
        <div className="footer-right">
          <button
            title="Marcar/Desmarcar Prioridade"
            onClick={(e) => { e.stopPropagation(); onTogglePriority(data.id) }}
          >
            {data.priority ? "⭐" : "☆"} Prioridade
          </button>
          <span className="drag-icon">☩</span>
        </div>
      </div>
    </div>
  );
}

export default Card;