import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const events = [
  {
    date: "2026-08-13",
    title: "Grand Inspired Mug Show",
    location: "Grand Inspired Gallery | Stoughton, WI",
    link: "https://grandinspired.com/event/mug-show/",
  },
  {
    date: "2026-04-17",
    title: "Spring Studio Sale",
    location: "Midwest Clay Project | Madison, WI",
    link: "https://www.midwestclayproject.com/2026-annual-spring-pottery-sale/",
  },
  {
    date: "2025-04-18",
    title: "Spring Studio Sale",
    location: "Midwest Clay Project | Madison, WI",
    link: "https://www.midwestclayproject.com/2025-annual-spring-pottery-sale/",
  },
  {
    date: "2024-04-19",
    title: "Spring Studio Sale",
    location: "Midwest Clay Project | Madison, WI",
    link: null,
  },
];

const galleryItems = [
  {
    src: "/images/wavyBlackMug.jpg",
    alt: "Wavy black and white porcelain mug with tape resist.",
    caption: "Wavy black and white porcelain mug with tape resist.",
  },
  {
    src: "/images/glacierMug.jpg",
    alt: "Faceted porcelain mug in glacial blue and white.",
    caption: "Faceted porcelain mug in glacial blue and white.",
  },
  {
    src: "/images/geomWhiteMug.jpg",
    alt: "Geometric color block porcelain mug with white trim.",
    caption: "Geometric color block porcelain mug with white trim.",
  },
  {
    src: "/images/geomBlackMug.jpg",
    alt: "Geometric color block porcelain mug with black trim.",
    caption: "Geometric color block porcelain mug with black trim.",
  },
  {
    src: "/images/wavyWhiteMug.jpg",
    alt: "White porcelain mug with tape resist wave design",
    caption: "White porcelain mug with tape resist wave design.",
  },
  {
    src: "/images/crawlMug.jpg",
    alt: "Blue and green crackle glaze on a white porcelain mug.",
    caption: "Blue and green crackle glaze on a white porcelain mug.",
  },
];

function ImageCard({ item, index, onOpen }) {
  const [missing, setMissing] = useState(false);

  return (
    <button
      className="gallery-card"
      type="button"
      onClick={() => !missing && onOpen(index)}
      aria-label={`View ${item.caption}`}
    >
      {!missing ? (
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          onError={() => setMissing(true)}
        />
      ) : (
        <div className="photo-placeholder" aria-hidden="true">
          <span>photo {String(index + 1).padStart(2, "0")}</span>
          <small>Add {item.src.replace("/images/", "")}</small>
        </div>
      )}
      {/* <span className="gallery-caption">{item.caption}</span> */}
    </button>
  );
}

function Lightbox({ item, onClose, onPrevious, onNext }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrevious();
      if (event.key === "ArrowRight") onNext();
    };
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, onPrevious, onNext]);

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
      onMouseDown={onClose}
    >
      <div
        className="lightbox-inner"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          className="lightbox-close"
          type="button"
          onClick={onClose}
          aria-label="Close image"
        >
          ×
        </button>
        <button
          className="lightbox-nav previous"
          type="button"
          onClick={onPrevious}
          aria-label="Previous image"
        >
          ←
        </button>
        <img src={item.src} alt={item.alt} />
        <button
          className="lightbox-nav next"
          type="button"
          onClick={onNext}
          aria-label="Next image"
        >
          →
        </button>
        <p>{item.caption}</p>
      </div>
    </div>
  );
}

function App() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const activeItem = activeIndex === null ? null : galleryItems[activeIndex];

  const previous = () =>
    setActiveIndex(
      (activeIndex - 1 + galleryItems.length) % galleryItems.length,
    );
  const next = () => setActiveIndex((activeIndex + 1) % galleryItems.length);

  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  return (
    <>
      <header className="site-header">
        <a
          className="brand"
          href="#top"
          aria-label="Weeknight Ceramics home"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src="/weeknightceramics_logo_blue.svg"
            alt="Weeknight Ceramics logo"
          />
          <span className="brand-name">
            <span className="wee">Wee</span>knight Ceramics
          </span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="main-navigation"
          className={`main-nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>

          <a href="#gallery" onClick={() => setMenuOpen(false)}>
            Gallery
          </a>

          <a href="#events" onClick={() => setMenuOpen(false)}>
            Events
          </a>

          <a
            href="https://www.instagram.com/weeknight.ceramics/"
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            Instagram ↗
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" id="about">
          <div className="hero-mark">
            <img src="/weeknightceramics_logo_blue.svg" alt="" />
          </div>
          <div className="hero-copy">
            <p className="eyebrow">Handmade in Madison, Wisconsin</p>
            <h1>Modern functional ceramics.</h1>
            <div className="bio">
              <p>
                Seth Gorelik is a potter based in Madison, Wisconsin, and the
                maker behind <span className="wee">Wee</span>knight Ceramics. By
                day, he works as a geospatial scientist using satellite imagery
                to study forests around the world. During weeknights and
                weekends, he trades computer screens for clay and the hands-on
                process of making functional pottery.
              </p>
              <p>
                Using tape-resist techniques, Seth builds colorful pieces that
                sometimes evoke landscapes and sunsets, while other pieces
                simply play with geometric form. He enjoys experimenting with
                mug shapes, sizes, handles, and glaze palettes that tie each
                collection together.
              </p>
              <p>
                Whether it holds a first cup of coffee or an evening tea, Seth
                hopes each mug becomes an everyday companion that brings a
                little more color and joy to an ordinary moment.
              </p>
            </div>
            <a
              className="instagram-link"
              href="https://www.instagram.com/weeknight.ceramics/"
              target="_blank"
              rel="noreferrer"
            >
              Follow @weeknight.ceramics <span>↗</span>
            </a>
          </div>
        </section>

        <section className="gallery" id="gallery">
          <div className="section-heading">
            <p className="eyebrow">Gallery</p>
            {/* <h2>Colorful pottery, thoughtfully made.</h2> */}
          </div>
          <div className="gallery-grid">
            {galleryItems.map((item, index) => (
              <ImageCard
                key={item.src}
                item={item}
                index={index}
                onOpen={setActiveIndex}
              />
            ))}
          </div>
        </section>

        <section className="events" id="events">
          <div className="section-heading">
            <p className="eyebrow">Events</p>
          </div>

          <div className="events-list">
            {sortedEvents.map((event) => {
              const isPast = new Date(event.date) < new Date();

              return (
                <article
                  className={`event-item ${isPast ? "past" : "upcoming"}`}
                  key={`${event.date}-${event.title}`}
                >
                  <time dateTime={event.date}>
                    {new Date(`${event.date}T12:00:00`).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                  </time>

                  <div className="event-details">
                    <h3>
                      {event.link ? (
                        <a href={event.link} target="_blank" rel="noreferrer">
                          {event.title}
                          <span aria-hidden="true">&nbsp;&#8599;</span>
                        </a>
                      ) : (
                        event.title
                      )}
                    </h3>

                    <p>{event.location}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <footer>
        <span>
          <span className="wee">Wee</span>knight Ceramics
        </span>
        <a
          href="https://www.instagram.com/weeknight.ceramics/"
          target="_blank"
          rel="noreferrer"
        >
          @weeknight.ceramics
        </a>
        <div className="copyright">
          © {new Date().getFullYear()} Seth Gorelik. All rights reserved.
        </div>
      </footer>

      {activeItem && (
        <Lightbox
          item={activeItem}
          onClose={() => setActiveIndex(null)}
          onPrevious={previous}
          onNext={next}
        />
      )}
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
