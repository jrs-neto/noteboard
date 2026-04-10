import { useState, useEffect } from "react";
import type { Card as CardType } from "../../types/Card";

interface CardFormProps {
  onAddCard: (card: CardType & { color?: string }) => void;
  onUpdateCard?: (card: CardType & { color?: string }) => void;
  editingCard?: (CardType & { color?: string }) | null;
}

function CardForm({ onAddCard, onUpdateCard, editingCard }: CardFormProps) {
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