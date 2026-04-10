import { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import CardForm from "../../components/CardForm/CardForm";
import type { Card as CardType } from "../../types/Card";

type CardExtended = CardType & { color?: string };

function Board() {
  const mockCards: CardExtended[] = [
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

  const [cards, setCards] = useState<CardExtended[]>(() => {
    const saved = localStorage.getItem("cards");
    return saved ? JSON.parse(saved) : mockCards;
  });

  const [editingCard, setEditingCard] = useState<CardExtended | null>(null);

  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);

  function addCard(newCard: CardExtended) {
    setCards((prev) => [...prev, newCard]);
  }

  function deleteCard(id: string) {
    setCards((prev) => prev.filter((card) => card.id !== id));
  }

  function updateCard(updatedCard: CardExtended) {
    setCards((prev) =>
      prev.map((card) =>
        card.id === updatedCard.id ? updatedCard : card
      )
    );
    setEditingCard(null); // Saída do modo de edição
  }

  return (
    <div>
      <h1>Board</h1>

      <CardForm
        onAddCard={addCard}
        onUpdateCard={updateCard}
        editingCard={editingCard}
      />

      {cards.map((card) => (
        <Card
          key={card.id}
          data={card}
          color={card.color}
          onDelete={deleteCard}
          onEdit={(cardToEdit) => setEditingCard(cardToEdit as CardExtended)}
        />
      ))}
    </div>
  );
}

export default Board;