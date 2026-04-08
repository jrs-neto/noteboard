import Card from "../../components/Card/Card";

function Board() {
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

  return (
    <div>
      <h1>Board</h1>

      {mockCards.map((card) => (
        <Card key={card.id} data={card} />
      ))}
    </div>
  );
}

export default Board;