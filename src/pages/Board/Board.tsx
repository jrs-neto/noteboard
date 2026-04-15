import { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import CardForm from "../../components/CardForm/CardForm";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import type { Card as CardType, Category } from "../../types/Card";
import { DragDropContext, Draggable, Droppable, type DropResult } from "@hello-pangea/dnd";
import "./Board.css";

function Board() {
  // Estado dos Filtros/Categorias
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem("categories");
    // Se não tiver nada, esses exemplos serão apresentados
    return saved ? JSON.parse(saved) : [{ id: 'cat-1', name: 'Programação' }, { id: 'cat-2', name: 'Ideias' }];
  });
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  // Estado dos Cards
  const [cards, setCards] = useState<CardType[]>(() => {
    const saved = localStorage.getItem("cards");
    return saved ? JSON.parse(saved) : [];
  });

  const [editingCard, setEditingCard] = useState<CardType | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Salvando as alterações
  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  // Filtro visual
  const filteredCards = activeCategoryId
    ? cards.filter(c => c.categoryId === activeCategoryId)
    : cards;

  // Lógica das Categorias
  function addCategory(name: string) {
    const newCategory = { id: `cat-${Date.now()}`, name };
    setCategories(prev => [...prev, newCategory]);
    setActiveCategoryId(newCategory.id);
  }

  // Lógica dos Cards
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
        card.id === id ? { ...card, priority: !card.priority } : card
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

    // Pegando a lista que está na tela (os cards filtrados ou não)
    const items = Array.from(filteredCards);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCards((prevCards) => {
      // Pega todos os cards que não estavam nesse filtro atual
      const otherCards = prevCards.filter(c =>
        activeCategoryId ? c.categoryId !== activeCategoryId : false
      );
      // Junta: os cards que foram reordenados com os que não estavam sendo vistos
      return [...items, ...otherCards];
    });
  };

  return (
    <div className="layout">
      <Sidebar
        categories={categories}
        activeCategoryId={activeCategoryId}
        onSelectCategory={setActiveCategoryId}
        onAddCategory={addCategory}
      />
      <main className="main-content">
        <Navbar onNewCard={() => setIsFormOpen(true)} />

        <div className="board-container">
          {/* Mostra para o usuário qual filtro ele tá olhando */}
          <h2 style={{ marginTop: 0, paddingBottom: '10px', fontSize: '1.2rem', color: '#666' }}>
            {activeCategoryId
              ? `Explorando: ${categories.find(c => c.id === activeCategoryId)?.name}`
              : 'Mostrando Tudo'}
          </h2>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="board" direction="horizontal">
              {(provided) => (
                <div className="board-grid"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {filteredCards.length === 0 && (
                    <p style={{ color: '#999' }}>Nenhuma nota encontrada por aqui.</p>
                  )}
                  {filteredCards.map((card, index) => (
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
              categories={categories}
              activeCategoryId={activeCategoryId}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Board;
