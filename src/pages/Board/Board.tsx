import { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import CardForm from "../../components/CardForm/CardForm";
import type { Card as CardType } from "../../types/Card";


function Board() {
  const mockCards: CardType[] = [
    {
      id: "1",
      title: "Study React",
      content: "Finish components module",
    },
    {
      id: "2",
      title: "Job Applications",
      content: "Apply to 3 positions today",
    },
  ];

  const [cards, setCards] = useState<CardType[]>(() => {
    const saved = localStorage.getItem("cards");
    return saved ? JSON.parse(saved) : mockCards;
  });

  const [editingCard, setEditingCard] = useState<CardType | null>(null);

  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);

  function addCard(newCard: CardType) {
    setCards((prev) => [...prev, newCard]);
  }

  function deleteCard(id: string) {
    setCards((prev) => prev.filter((card) => card.id !== id));
  }

  function updateCard(updatedCard: CardType) {
    setCards((prev) =>
      prev.map((card) =>
        card.id === updatedCard.id ? updatedCard : card
      )
    );
    setEditingCard(null); // Saída do modo de edição
  }

  function togglePriority(id: string) {
    setCards((prev) =>
      prev.map((card) =>
        card.id === id
          ? { ...card, priority: !card.priority }
          : card
      )
    );
  }

  return (
    <div>
      <h1>Board</h1>

      <CardForm
        onAddCard={addCard}
        onUpdateCard={updateCard}
        editingCard={editingCard}
        onCancelEdit={() => setEditingCard(null)}
      />

      {cards.map((card) => (
        <Card
          key={card.id}
          data={card}
          onDelete={deleteCard}
          onEdit={(cardToEdit) => setEditingCard(cardToEdit)}
          onTogglePriority={togglePriority}
        />
      ))}
    </div>
  );
}

export default Board;