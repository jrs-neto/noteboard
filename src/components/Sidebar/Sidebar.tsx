import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span>NOTEBOARD</span>
      </div>

      <div className="sidebar-section">
        <h3>Categorias</h3>
        <ul>
          <li>Programação</li>
          <li>Ideias Criativas</li>
          <li>Trabalho</li>
          <li>Pessoal</li>
          <li>Projetos</li>
        </ul>
        <button>+ Adicionar Categoria</button>
      </div>

      <div className="sidebar-section">
        <h3>Pastas</h3>
        <ul>
          <li>Arquivos Importantes</li>
          <li>Documentos</li>
        </ul>
        <button className="add-btn">+ Adicionar Categoria</button>
      </div>
    </aside>
  )
}

export default Sidebar;