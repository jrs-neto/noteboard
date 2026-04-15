import type { Card as CardType } from "../../types/Card";
import "./Card.css";

interface CardProps {
  data: CardType;
  onDelete: (id: string) => void;
  onDoubleClick: () => void;
  onTogglePriority: (id: string) => void;
}

function Card({ data, onDelete, onDoubleClick, onTogglePriority }: CardProps) {
  const priorityClass = data.priority ? `priority-${data.priority}` : '';

  return (
    <div
      className={`card ${priorityClass}`}
      style={{ backgroundColor: data.color || '#93c5fd' }}
      onDoubleClick={onDoubleClick}
    >
      <div className="card-body">
        <h3 className="card-title">{data.title}</h3>
        <p className="card-content">{data.content}</p>
      </div>

      <div className="card-footer">
        <div className="footer-left">
          <button title="Editar" onClick={(e) => { e.stopPropagation(); onDoubleClick() }}>✏️</button>
          <button title="Excluir" onClick={(e) => { e.stopPropagation(); onDelete(data.id) }}>🗑️</button>
        </div>
        <div className="footer-right">
          <button
            title="Alterar Prioridade"
            className="priority-btn"
            onClick={(e) => { e.stopPropagation(); onTogglePriority(data.id) }}
          >
            {data.priority === 'low' && 'Baixa 🟢'}
            {data.priority === 'medium' && 'Média 🟡'}
            {data.priority === 'high' && 'Alta 🔴'}
            {!data.priority && 'Prioridade ⚪'}
          </button>
          <span className="drag-icon">☩</span>
        </div>
      </div>
    </div>
  );
}

export default Card;