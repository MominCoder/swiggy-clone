import "./blank_card.css";

export default function BlankCards() {
  return (
    <section className="inner">
      <div className="row">
        <ul className="flex empty_cards">
          {Array(10)
            .fill("")
            .map((blank, i) => (
              <li key={i} className="empty_card"></li>
            ))}
        </ul>
      </div>
    </section>
  );
}
