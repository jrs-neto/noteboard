import "./Navbar.css";

interface NavbarProps {
  onNewCard: () => void;
}

function Navbar({ onNewCard }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="navbar-title">Dashboard</h2>
      </div>

      <div className="navbar-right">
        <div className="search-bar">
          <span>🔍</span>
        </div>
        <button className="new-card-btn" onClick={onNewCard}>
          + Novo Flashcard
        </button>
        <button className="share-btn">
          🔗 Compartilhar
        </button>
        <div className="user-profile">
          <div className="avatar">👩🏻‍💻</div>
          <span>Link a Google ⏷</span>
        </div>
      </div>

    </nav>
  )
}

export default Navbar;