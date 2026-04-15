import { useState, useEffect } from "react";
import type { Card as CardType, Category } from "../../types/Card";
import "./CardForm.css";

interface CardFormProps {
  onAddCard: (card: CardType) => void;
  onUpdateCard?: (card: CardType) => void;
  editingCard?: CardType | null;
  onCancelEdit: () => void;
  categories: Category[];
  activeCategoryId: string | null;
}

const COLORS = ['#93c5fd', '#fde047', '#86efac', '#fca5a5', '#fdba74', '#f9a8d4'];

function CardForm({ onAddCard, onUpdateCard, editingCard, onCancelEdit, categories, activeCategoryId }: CardFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState(COLORS[0]);
  const [categoryId, setCategoryId] = useState<string>(activeCategoryId || "");

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    if (editingCard) {
      setTitle(editingCard.title);
      setContent(editingCard.content);
      setColor(editingCard.color || COLORS[0]);
      setCategoryId(editingCard.categoryId || "");
    } else {
      setTitle("");
      setContent("");
      setColor(COLORS[0]);
      setCategoryId(activeCategoryId || "");
    }
  }, [editingCard, activeCategoryId]);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setColor(COLORS[0]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'Enter') {
      handleSubmit(e as unknown as React.FormEvent);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    if (editingCard && onUpdateCard) {
      onUpdateCard({
        ...editingCard,
        title,
        content,
        color,
        categoryId: categoryId || ""
      });
    } else {
      onAddCard({
        id: Date.now().toString(),
        title,
        content,
        color,
        categoryId: categoryId || ""
      });
    }
    resetForm();
  }

  return (
    <form className="card-form" onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
      <div className="form-inputs">
        <input
          type="text"
          placeholder="Título da nota..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="O que você está pensando? (Ctrl + Enter para salvar)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Novo Seletor de Categorias */}
        {categories.length > 0 && (
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="category-select"
          >
            <option value="">Nenhuma pasta (Geral)</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        )}
      </div>

      <div className="form-footer">
        <div className="color-picker">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              className={`color-btn ${color === c ? 'selected' : ''}`}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
        <div className="form-actions">
          {editingCard && (
            <button type="button" className="cancel-btn" onClick={() => { onCancelEdit(); resetForm(); }}>
              Cancelar
            </button>
          )}
          <button type="submit" className="submit-btn" disabled={!title.trim() || !content.trim()}>
            {editingCard ? "Atualizar" : "Salvar"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default CardForm;
