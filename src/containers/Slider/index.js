import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Tri des événements par date ASC (plus ancien → plus récent)
  const byDateAsc = data?.focus
    ? [...data.focus].sort(
        (evtA, evtB) => new Date(evtA.date) - new Date(evtB.date)
      )
    : [];

  // Gestion du défilement automatique
  useEffect(() => {
    if (!byDateAsc.length) {
      return () => {}; // cleanup vide → évite l'erreur ESLint
    }

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % byDateAsc.length);
    }, 5000);

    return () => clearInterval(id);
  }, [byDateAsc.length]);
  return (
    <div className="SlideCardList">
      {byDateAsc.map((event, idx) => (
        <>
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateAsc.map((_, radioIdx) => (
                <input
                  key={`pagination-${event.title}`}
                  type="radio"
                  name="radio-button"
                  aria-label={`Aller au slide ${radioIdx + 1}`}
                  checked={index === radioIdx}
                  onChange={() => setIndex(radioIdx)}
                />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;
