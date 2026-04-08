import { useState } from "react";
import Card from "../../components/Card/Card";
import CardForm from "../../components/CardForm/CardForm";

function Board() {

  function addCard(newCard) {
    setCards((prev) => [...prev, newCard]);
  }

  const mockCards = [
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
  const [cards, setCards] = useState([mockCards]);


  return (
    <div>
      <h1>Board</h1>

      <CardForm onAddCard={addCard} />

      {cards.map((card) => (
        <Card key={card.id} data={card} />
      ))}
    </div>
  );
}

export default Board;