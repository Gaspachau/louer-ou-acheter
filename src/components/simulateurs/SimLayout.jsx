import { Link } from "react-router-dom";
import TopBar from "../TopBar";

export default function SimLayout({ children, title, description, icon, backLabel = "← Tous les simulateurs" }) {
  return (
    <div className="page">
      <TopBar />
      <main className="sim-page">
        <nav className="sim-breadcrumb">
          <Link to="/simulateurs">{backLabel}</Link>
        </nav>
        <div className="sim-hero">
          <span className="sim-hero-icon" aria-hidden="true">{icon}</span>
          <div>
            <h1 className="sim-hero-title">{title}</h1>
            {description && <p className="sim-hero-desc">{description}</p>}
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
