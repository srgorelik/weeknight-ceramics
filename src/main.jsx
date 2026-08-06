import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const galleryItems = [
  {
    src: "/images/wavyBlackMug.jpg",
    alt: "Color-block ceramic mug",
    caption: "Color-block mug",
  },
  {
    src: "/images/glacierMug.jpg",
    alt: "Tape-resist ceramic mug",
    caption: "Tape-resist mug",
  },
  {
    src: "/images/geomWhiteMug.jpg",
    alt: "Geometric ceramic mug",
    caption: "Geometric mug",
  },
  {
    src: "/images/geomBlackMug.jpg",
    alt: "Handmade ceramic mug",
    caption: "Everyday mug",
  },
  {
    src: "/images/wavyWhiteMug.jpg",
    alt: "Sunset-inspired ceramic mug",
    caption: "Sunset palette",
  },
  {
    src: "/images/crawlMug.jpg",
    alt: "Collection of handmade mugs",
    caption: "Recent collection",
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
  const activeItem = activeIndex === null ? null : galleryItems[activeIndex];

  const previous = () =>
    setActiveIndex(
      (activeIndex - 1 + galleryItems.length) % galleryItems.length,
    );
  const next = () => setActiveIndex((activeIndex + 1) % galleryItems.length);

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Weeknight Ceramics home">
          <img
            src="/weeknightceramics_logo_blue.svg"
            alt="Weeknight Ceramics logo"
          />
          <span className="brand-name">
            <span className="wee">Wee</span>knight Ceramics
          </span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a
            href="https://www.instagram.com/weeknight.ceramics/"
            target="_blank"
            rel="noreferrer"
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

        <section className="work" id="work">
          <div className="section-heading">
            <p className="eyebrow">Selected work</p>
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
