import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link className="site-name" to="/">City Events</Link>
        <nav aria-label="Main navigation">
          <Link to="/">Home</Link>
        </nav>
      </div>
    </header>
  );
}
