import { useState } from "react";
import type { Category } from "../../types/Card";
import "./Sidebar.css";

interface SidebarProps {
  categories: Category[];
  activeCategoryId: string | null;
  onSelectCategory: (id: string | null) => void;
  onAddCategory: (name: string) => void;
}

function Sidebar({ categories, activeCategoryId, onSelectCategory, onAddCategory }: SidebarProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newCatName, setNewCatName] = useState("");

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCatName.trim()) {
      onAddCategory(newCatName.trim());
      setNewCatName("");
      setIsAdding(false);
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">📘</span>
        <h2>NOTEBOARD</h2>
      </div>

      <div className="sidebar-section">
        <h3>Menu Principal</h3>
        <ul>
          <li
            className={activeCategoryId === null ? 'active' : ''}
            onClick={() => onSelectCategory(null)}
          >
            Todas as Notas
          </li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h3>Suas Categorias</h3>
        <ul>
          {categories.map(cat => (
            <li
              key={cat.id}
              className={activeCategoryId === cat.id ? 'active' : ''}
              onClick={() => onSelectCategory(cat.id)}
            >
              {cat.name}
            </li>
          ))}
        </ul>

        {isAdding ? (
          <form onSubmit={handleAddSubmit} className="add-cat-form">
            <input
              autoFocus
              type="text"
              placeholder="Nome da categoria..."
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              onBlur={() => setIsAdding(false)}
            />
          </form>
        ) : (
          <button className="add-btn" onClick={() => setIsAdding(true)}>
            + Adicionar Categoria
          </button>
        )}
      </div>

      {/* Um espaço vazio flexível para empurrar conteúdo se necessário */}
      <div style={{ flex: 1 }}></div>
    </aside>
  );
}

export default Sidebar;
