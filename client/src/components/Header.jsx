import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link className="site-name" to="/">City Events</Link>
        <nav aria-label="Main navigation">
          <Link to="/">Home</Link>
          <Link to="/all-events">All Events</Link>
        </nav>
      </div>
    </header>
  );
}
