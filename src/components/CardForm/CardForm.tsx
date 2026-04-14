import { useState, useEffect } from "react";
import type { Card as CardType } from "../../types/Card";

interface CardFormProps {
  onAddCard: (card: CardType) => void;
  onUpdateCard?: (card: CardType) => void;
  editingCard?: CardType | null;
  onCancelEdit: () => void;
}

function CardForm({ onAddCard, onUpdateCard, editingCard, onCancelEdit }: CardFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState('#fff');

  // Esse hook serve para preencher os campos se você estiver editando
  useEffect(() => {
    if (editingCard) {
      setTitle(editingCard.title);
      setContent(editingCard.content);
      setColor(editingCard.color || '#fff');
    }
  }, [editingCard]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    if (editingCard && onUpdateCard) {
      onUpdateCard({
        ...editingCard,
        title,
        content,
        color,
      });
      onCancelEdit();
    } else {
      onAddCard({
        id: Date.now().toString(),
        title,
        content,
        color,
      });
    }

    setTitle('');
    setContent('');
    setColor('#fff');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button type="submit">{editingCard ? "Update Card" : "Add Card"}</button>
    </form>
  );
}

export default CardForm;