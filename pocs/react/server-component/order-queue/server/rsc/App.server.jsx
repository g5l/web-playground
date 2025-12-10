import React from "react";
import { getMenu, getQueueWithETAs } from "../store.js";

export default function App() {
  const menu = getMenu();
  const queue = getQueueWithETAs();

  return (
    <div className="shell">
      <header>
        <h1>Restaurant Queue</h1>
        <p>Simple server-driven queue with ETAs.</p>
      </header>

      <section className="new-order">
        <h2>New Order</h2>
        <form method="POST" action="/order">
          <label>
            Dish
            <select name="dish" required defaultValue="">
              <option value="" disabled>
                Select a dish
              </option>
              {menu.map((m) => (
                <option key={m.id} value={m.id}>{`${m.name} (${m.minutes} min)`}</option>
              ))}
            </select>
          </label>
          <button type="submit">Add to Queue</button>
        </form>
      </section>

      <section className="queue">
        <h2>Queue</h2>
        {queue.tasks.length === 0 ? (
          <p>No orders pending.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Dish</th>
                <th>Prep</th>
                <th>ETA</th>
              </tr>
            </thead>
            <tbody>
              {queue.tasks.map((t) => (
                <tr key={t.orderId}>
                  <td>{t.position}</td>
                  <td>{t.dishName}</td>
                  <td>{`${t.prepMinutes} min`}</td>
                  <td>
                    {t.readyInMinutes}
                    <small> min</small>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <p className="summary">
          Total backlog: <strong>{`${queue.totalBacklogMinutes} min`}</strong>
        </p>
      </section>

      <footer>
        <form method="POST" action="/clear">
          <button type="submit" className="link">
            Clear queue
          </button>
        </form>
      </footer>
    </div>
  );
}

