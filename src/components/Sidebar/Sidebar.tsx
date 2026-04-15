import { useState } from "react";
import { LayoutList, FolderOpen, Folder, Lightbulb, Briefcase, User, BookMarked, Hash, Plus, FileText } from "lucide-react";
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

  const getCategoryIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('programação')) return <BookMarked size={18} />;
    if (lower.includes('ideias')) return <Lightbulb size={18} />;
    if (lower.includes('trabalho') || lower.includes('marketing')) return <Briefcase size={18} />;
    if (lower.includes('pessoal') || lower.includes('estudos')) return <User size={18} />;
    if (lower.includes('projetos')) return <Folder size={18} />;
    return <Hash size={18} />;
  }

  // Folders mock (visuais) conforme a referência
  const mockFolders = [
    { id: 'f-1', name: 'Arquivos Importantes', icon: <FolderOpen size={18} /> },
    { id: 'f-2', name: 'Documentos', icon: <FileText size={18} /> }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">📘</span>
        <h2>NOTEBOARD</h2>
      </div>

      <div className="sidebar-section">
        <h3 className="section-title">Categorias</h3>
        <ul>
          <li
            className={activeCategoryId === null ? 'active' : ''}
            onClick={() => onSelectCategory(null)}
          >
            <LayoutList size={18} /> Todas as Notas
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
              {getCategoryIcon(cat.name)} {cat.name}
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
            <Plus size={16} /> Adicionar Categoria
          </button>
        )}
      </div>

      <div className="sidebar-section">
        <h3 className="section-title">Pastas</h3>
        <ul>
          {mockFolders.map(folder => (
            <li key={folder.id}>
              {folder.icon} {folder.name}
            </li>
          ))}
        </ul>
        <button className="add-btn" onClick={() => {}}>
          <Plus size={16} /> Adicionar Pasta
        </button>
      </div>

      {/* Um espaço vazio flexível para empurrar conteúdo se necessário */}
      <div style={{ flex: 1 }}></div>
    </aside>
  );
}

export default Sidebar;
