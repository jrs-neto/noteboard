import { Search, Plus, ChevronDown } from "lucide-react";
import "./Navbar.css";

interface NavbarProps {
  onNewCard: () => void;
}

function Navbar({ onNewCard }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="navbar-title">Dashboard</h2>
        <div className="search-bar">
          <Search className="search-icon" size={18} />
          <input type="text" placeholder="Pesquisar notas..." />
        </div>
      </div>

      <div className="navbar-right">
        <button className="new-card-btn" onClick={onNewCard}>
          <Plus size={18} strokeWidth={2.5} />
          Novo Flashcard
        </button>
        
        <div className="user-profile">
          <img src="https://i.pravatar.cc/150?img=47" alt="User" className="avatar" />
          <span className="profile-name">
            Olá, José <ChevronDown size={14} />
          </span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;