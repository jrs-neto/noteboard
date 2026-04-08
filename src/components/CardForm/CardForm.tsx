import { useState } from "react";

function CardForm({ onAddCard }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onAddCard({
      id: Date.now().toString(),
      title,
      content,
    })

    setTitle('');
    setContent('');

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

      <button type="submit">Add Card</button>
    </form>
  );
}

export default CardForm;