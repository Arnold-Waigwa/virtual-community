export default function EventCard({ event }) {
  return (
    <article className="event-card">
      <img
        className="event-image"
        src={event.image || "/images/riverfront.jpg"}
        alt=""
        loading="lazy"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/images/riverfront.jpg";
        }}
      />
      <div className="event-details">
        <h2>{event.name}</h2>
        <p>{event.venue_name}</p>
        <p>{event.location}</p>
        <p className="event-date">
          {new Date(event.date).toLocaleString([], {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
        </p>
      </div>
    </article>
  );
}
