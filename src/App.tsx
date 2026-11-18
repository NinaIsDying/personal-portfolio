import { useState } from "react";

const assetPath = "/assets";

const skills = [
  "Full-Stack Development",
  "Prototyping",
  "Frontend Development",
  "Wireframing",
  "Mobile Development",
];

const navItems = [
  { label: "About Me", target: "about" },
  { label: "Apps", target: "apps" },
  { label: "Websites", target: "websites" },
  { label: "Contact", target: "contact" },
];

function scrollTo(target: string) {
  document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
}

function SectionTitle({ children }: { children: string }) {
  return (
    <div className="section-title">
      <h2>{children}</h2>
      <img aria-hidden="true" src={`${assetPath}/6e45b.svg`} />
    </div>
  );
}

function NoteCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="note-card">
      <h3>{title}</h3>
      {children}
    </article>
  );
}

export default function App() {
  const [message, setMessage] = useState("");

  const handleContact = (label: string) => {
    setMessage(`${label} details will be added soon.`);
    window.setTimeout(() => setMessage(""), 2200);
  };

  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-panel">
          <div className="hero-copy">
            <p className="eyebrow">Web Developer | UI/UX Designer | Mobile Developer</p>
            <img className="hero-rule" aria-hidden="true" src={`${assetPath}/41d4e.svg`} />
            <h1 id="hero-title">Welcome to my Portfolio</h1>
          </div>
          <img className="hero-circle" aria-hidden="true" src={`${assetPath}/fe31b.svg`} />
        </div>

        <nav className="section-nav" aria-label="Portfolio sections">
          {navItems.map((item) => (
            <button key={item.target} onClick={() => scrollTo(item.target)}>
              {item.label}
            </button>
          ))}
        </nav>
      </section>

      <section className="about dotted-edge" id="about" aria-labelledby="about-title">
        <div className="about-copy">
          <SectionTitle>About Me</SectionTitle>
          <div className="bio">
            <p>
              Hi! I’m Niña, an Information Technology student passionate about software development
              and creative design.
            </p>
            <p>
              I like working on projects that challenge me to think creatively, solve problems, and
              step outside my comfort zone.
            </p>
          </div>
          <div className="skill-list" aria-label="Areas of expertise">
            {skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>

        <div className="notes">
          <NoteCard title="TOOLS">
            <div className="tool-columns narrow">
              <p>
                FIGMA
                <br />
                CANVA
                <br />
                ANDROID STUDIO
              </p>
              <p>
                VS CODE
                <br />
                GIT
                <br />
                GITHUB
              </p>
            </div>
          </NoteCard>
          <NoteCard title="Coding Skills">
            <p className="knowledge">Advanced Knowledge on:</p>
            <div className="coding-columns narrow">
              <p>
                HTML
                <br />
                CSS
                <br />
                JS
              </p>
              <p>
                REACT
                <br />
                DJANGO
                <br />
                PYTHON
              </p>
              <p>JAVA</p>
            </div>
          </NoteCard>
        </div>
      </section>

      <section className="apps" id="apps" aria-labelledby="apps-title">
        <SectionTitle>Apps</SectionTitle>
        <div className="app-grid" aria-label="Application projects">
          {[1, 2, 3, 4].map((project) => (
            <button
              className="project-card app-card"
              key={project}
              aria-label={`Application project ${project}`}
              onClick={() => setMessage("Project details coming soon.")}
            />
          ))}
        </div>
      </section>

      <section className="websites" id="websites" aria-labelledby="websites-title">
        <div className="vertical-title">
          <h2 id="websites-title">Websites</h2>
          <img aria-hidden="true" src={`${assetPath}/05bea.svg`} />
        </div>
        <div className="website-grid" aria-label="Website projects">
          {[1, 2, 3, 4].map((project) => (
            <button
              className="project-card"
              key={project}
              aria-label={`Website project ${project}`}
              onClick={() => setMessage("Project details coming soon.")}
            />
          ))}
        </div>
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-title">
        <div className="contact-banner">
          <h2 id="contact-title">
            Have a project in mind?
            <br />
            Let’s work together.
          </h2>
        </div>

        <footer>
          <div className="identity">
            <h3>Niña Isabelle Tupas</h3>
            <img aria-hidden="true" src={`${assetPath}/6e45b.svg`} />
            <p>Web Developer | UI/UX Designer | Mobile Developer</p>
            <small>@ 2026 Nina Isabelle Tupas. All Rights Reserved</small>
          </div>
          <div className="contact-links" aria-label="Contact methods">
            {["email", "linkedin", "github"].map((label) => (
              <button key={label} onClick={() => handleContact(label)}>
                {label}
              </button>
            ))}
          </div>
        </footer>
      </section>

      <div className={`toast ${message ? "is-visible" : ""}`} role="status">
        {message}
      </div>
    </main>
  );
}
