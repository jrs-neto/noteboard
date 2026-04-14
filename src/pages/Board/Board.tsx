import { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import CardForm from "../../components/CardForm/CardForm";
import type { Card as CardType } from "../../types/Card";
import { DragDropContext, Draggable, Droppable, type DropResult } from "@hello-pangea/dnd";
import "./Board.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

function Board() {
  const [cards, setCards] = useState<CardType[]>(() => {
    const saved = localStorage.getItem("cards");
    return saved ? JSON.parse(saved) : [];
  });

  const [editingCard, setEditingCard] = useState<CardType | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);

  function addCard(newCard: CardType) {
    setCards((prev) => [newCard, ...prev]);
    setIsFormOpen(false);
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
    setEditingCard(null);
    setIsFormOpen(false);
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

  function openEdit(card: CardType) {
    setEditingCard(card);
    setIsFormOpen(true);
  }

  function closeForm() {
    setEditingCard(null);
    setIsFormOpen(false);
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(cards);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem)
    setCards(items);
  };

  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        <Navbar onNewCard={() => setIsFormOpen(true)} />

        <div className="board-container">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="board" direction="horizontal">
              {(provided) => (
                <div className="board-grip"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {cards.map((card, index) => (
                    <Draggable key={card.id} draggableId={card.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card
                            data={card}
                            onDelete={deleteCard}
                            onDoubleClick={() => openEdit(card)}
                            onTogglePriority={togglePriority}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </main>

      {isFormOpen && (
        <div className="modal-overlay" onMouseDown={closeForm}>
          <div className="modal-content" onMouseDown={(e) => e.stopPropagation()}>
            <CardForm
              onAddCard={addCard}
              onUpdateCard={updateCard}
              editingCard={editingCard}
              onCancelEdit={closeForm}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Board;
