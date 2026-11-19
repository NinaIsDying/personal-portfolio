import { useEffect, useRef, useState } from "react";

const assetPath = `${import.meta.env.BASE_URL}assets`;

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

const appScreens = [
  { file: "primera-1.png", label: "Primera app screen 1" },
  { file: "primera-2.png", label: "Primera app screen 2" },
  { file: "primera-3.png", label: "Primera app screen 3" },
  { file: "login.png", label: "Primera login screen" },
];
const websiteScreens = [
  { file: "stunotes-1.png", label: "StuNotes website screen 1" },
  { file: "stunotes-2.png", label: "StuNotes website screen 2" },
  { file: "stunotes-3.png", label: "StuNotes website screen 3" },
  { file: "collegia-2.png", label: "Collegia website screen" },
];

const contactLinks = [
  { label: "Email", href: "mailto:ninaisabelle.tupas@gmail.com", icon: "email", external: false },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ni%C3%B1a-isabelle-tupas-084847291/",
    icon: "linkedin",
    external: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/NinaIsDying",
    icon: "github",
    external: true,
  },
] as const;
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
  const [showBookmarkNav, setShowBookmarkNav] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ src: string; label: string } | null>(null);
  const appCarouselRef = useRef<HTMLDivElement>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateBookmarkNav = () => setShowBookmarkNav(window.scrollY > 180);

    updateBookmarkNav();
    window.addEventListener("scroll", updateBookmarkNav, { passive: true });
    return () => window.removeEventListener("scroll", updateBookmarkNav);
  }, []);

  useEffect(() => {
    if (!selectedImage) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImage(null);
    };

    window.addEventListener("keydown", closeOnEscape);
    lightboxCloseRef.current?.focus();
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selectedImage]);

  const handleSectionNavigate = (target: string) => {
    setActiveSection(target);
    scrollTo(target);
  };

  const scrollAppCarousel = (direction: -1 | 1) => {
    const carousel = appCarouselRef.current;
    const track = carousel?.firstElementChild;
    const slide = track?.firstElementChild;
    if (!carousel || !track || !slide) return;

    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    carousel.scrollBy({
      left: direction * (slide.getBoundingClientRect().width + gap),
      behavior: "smooth",
    });
  };

  const handleContact = (label: string) => {
    setMessage(`${label} details will be added soon.`);
    window.setTimeout(() => setMessage(""), 2200);
  };

  return (
    <>
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-panel">
            <div className="hero-copy">
              <p className="eyebrow">Web Developer | UI/UX Designer | Mobile Developer</p>
              <img className="hero-rule" aria-hidden="true" src={`${assetPath}/41d4e.svg`} />
              <h1 id="hero-title">Welcome to my Portfolio</h1>
            </div>
            <div className="hero-emblem" aria-hidden="true">
              <img className="hero-circle" src={`${assetPath}/fe31b.svg`} />
              <img className="hero-lettermark" src={`${assetPath}/lettermark.png`} alt="" />
            </div>
          </div>

          <nav className="section-nav" aria-label="Portfolio sections">
            {navItems.map((item) => (
              <button key={item.target} onClick={() => handleSectionNavigate(item.target)}>
                {item.label}
              </button>
            ))}
          </nav>
        </section>

        <nav
          className={`bookmark-nav ${showBookmarkNav ? "is-visible" : ""}`}
          aria-label="Bookmark section navigation"
          aria-hidden={!showBookmarkNav}
        >
          {navItems.map((item) => (
            <button
              key={item.target}
              className={activeSection === item.target ? "is-active" : ""}
              aria-pressed={activeSection === item.target}
              tabIndex={showBookmarkNav ? 0 : -1}
              onClick={() => handleSectionNavigate(item.target)}
            >
              <svg className="bookmark-outline" viewBox="0 0 100 90" aria-hidden="true">
                <path d="M8 1.5h84q6.5 0 6.5 6.5v70q0 8-8 8L54 70q-4-2-8 0L9.5 86q-8 0-8-8V8Q1.5 1.5 8 1.5Z" />
              </svg>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <section className="about dotted-edge" id="about" aria-labelledby="about-title">
          <div className="about-copy">
            <SectionTitle>About Me</SectionTitle>
            <div className="bio">
              <p>
                Hi! I’m Niña, an Information Technology student passionate about software
                development and creative design.
              </p>
              <p>
                I like working on projects that challenge me to think creatively, solve problems,
                and step outside my comfort zone.
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
          <div className="app-carousel">
            <div
              className="app-carousel-viewport"
              ref={appCarouselRef}
              role="region"
              aria-label="Primera app screens"
              aria-roledescription="carousel"
            >
              <div className="app-carousel-track">
                {appScreens.map((screen, index) => (
                  <div
                    className="app-carousel-slide"
                    key={screen.file}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${index + 1} of ${appScreens.length}: ${screen.label}`}
                  >
                    <button
                      className="project-card app-card"
                      aria-label={`View ${screen.label} full size`}
                      onClick={() =>
                        setSelectedImage({
                          src: `${assetPath}/${screen.file}`,
                          label: screen.label,
                        })
                      }
                    >
                      <img
                        className="project-image"
                        src={`${assetPath}/${screen.file}`}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="app-carousel-controls" aria-label="Carousel controls">
              <button aria-label="Previous app screen" onClick={() => scrollAppCarousel(-1)}>
                ‹
              </button>
              <button aria-label="Next app screen" onClick={() => scrollAppCarousel(1)}>
                ›
              </button>
            </div>
          </div>
        </section>

        <section className="websites" id="websites" aria-labelledby="websites-title">
          <div className="vertical-title">
            <h2 id="websites-title">Websites</h2>
            <span className="vertical-title-rule" aria-hidden="true" />
          </div>
          <div className="website-grid" aria-label="Website projects">
            {websiteScreens.map((screen) => (
              <button
                className="project-card"
                key={screen.file}
                aria-label={`View ${screen.label} full size`}
                onClick={() =>
                  setSelectedImage({ src: `${assetPath}/${screen.file}`, label: screen.label })
                }
              >
                <img
                  className="project-image"
                  src={`${assetPath}/${screen.file}`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </button>
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
              {contactLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                >
                  <svg
                    className="contact-icon"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    {item.icon === "email" && (
                      <path
                        d="M3 5.5h18v13H3zM3.5 6l8.5 7 8.5-7"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    )}
                    {item.icon === "linkedin" && (
                      <path d="M5 3.5A1.5 1.5 0 1 0 5 6.5a1.5 1.5 0 0 0 0-3ZM3.7 8h2.6v12H3.7zm4.5 0h2.5v1.6h.1c.4-.8 1.5-1.9 3.5-1.9 3.7 0 4.4 2.4 4.4 5.5V20h-2.7v-6c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V20H8.2z" />
                    )}
                    {item.icon === "github" && (
                      <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.31-3.76-1.31-.51-1.29-1.24-1.63-1.24-1.63-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1.78 2.26 4.41 1.59v-1.22c-2.51-.29-5.15-1.27-5.15-5.59 0-1.24.45-2.24 1.19-3.03-.12-.29-.52-1.45.12-3.02 0 0 .97-.31 3.16 1.16a10.94 10.94 0 0 1 5.75 0c2.2-1.47 3.16-1.16 3.16-1.16.64 1.57.24 2.73.12 3.02.74.79 1.19 1.79 1.19 3.03 0 4.33-2.65 5.29-5.17 5.58v1.53c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z" />
                    )}
                  </svg>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </footer>
        </section>

        <div className={`toast ${message ? "is-visible" : ""}`} role="status">
          {message}
        </div>
      </main>
      {selectedImage && (
        <div
          className="image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Full-size ${selectedImage.label}`}
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelectedImage(null);
          }}
        >
          <button
            className="lightbox-close"
            ref={lightboxCloseRef}
            aria-label="Close full-size image"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <img src={selectedImage.src} alt={selectedImage.label} />
        </div>
      )}
    </>
  );
}
