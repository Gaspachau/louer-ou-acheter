import { Link } from "react-router-dom";
import TopBar from "../TopBar";
import Footer from "../Footer";

export default function SimLayout({ children, title, description, icon, backLabel = "← Tous les simulateurs" }) {
  return (
    <div className="page">
      <TopBar />
      <main className="sim-page">
        <nav className="sim-breadcrumb" aria-label="Navigation">
          <Link to="/simulateurs">{backLabel}</Link>
        </nav>
        <div className="sim-hero">
          <div className="sim-hero-icon-wrap" aria-hidden="true">
            <span className="sim-hero-icon">{icon}</span>
          </div>
          <div>
            <h1 className="sim-hero-title">{title}</h1>
            {description && <p className="sim-hero-desc">{description}</p>}
          </div>
        </div>
        {children}
      </main>
      <Footer />
    </div>
  );
}
