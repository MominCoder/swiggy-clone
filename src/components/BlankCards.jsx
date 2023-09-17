export default function BlankCards() {
  return (
    <section className="inner">
      <div className="row">
        <ul>
          {Array(10)
            .fill("")
            .map((blank) => (
              <li className="empty_card"></li>
            ))}
        </ul>
      </div>
    </section>
  );
}
