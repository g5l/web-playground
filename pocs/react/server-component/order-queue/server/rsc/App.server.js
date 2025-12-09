import React from "react";
import { getMenu, getQueueWithETAs } from "../store.js";

export default function App() {
  const menu = getMenu();
  const queue = getQueueWithETAs();

  return React.createElement(
    "div",
    { className: "shell" },
    React.createElement(
      "header",
      null,
      React.createElement("h1", null, "Restaurant Queue"),
      React.createElement("p", null, "Simple server-driven queue with ETAs.")
    ),
    React.createElement(
      "section",
      { className: "new-order" },
      React.createElement("h2", null, "New Order"),
      React.createElement(
        "form",
        { method: "POST", action: "/order" },
        React.createElement(
          "label",
          null,
          "Dish",
          React.createElement(
            "select",
            { name: "dish", required: true, defaultValue: "" },
            React.createElement(
              "option",
              { value: "", disabled: true },
              "Select a dish"
            ),
            ...menu.map((m) =>
              React.createElement(
                "option",
                { key: m.id, value: m.id },
                `${m.name} (${m.minutes} min)`
              )
            )
          )
        ),
        React.createElement(
          "button",
          { type: "submit" },
          "Add to Queue"
        )
      )
    ),
    React.createElement(
      "section",
      { className: "queue" },
      React.createElement("h2", null, "Queue"),
      queue.tasks.length === 0
        ? React.createElement("p", null, "No orders pending.")
        : React.createElement(
            "table",
            null,
            React.createElement(
              "thead",
              null,
              React.createElement(
                "tr",
                null,
                React.createElement("th", null, "#"),
                React.createElement("th", null, "Dish"),
                React.createElement("th", null, "Prep"),
                React.createElement("th", null, "ETA")
              )
            ),
            React.createElement(
              "tbody",
              null,
              ...queue.tasks.map((t) =>
                React.createElement(
                  "tr",
                  { key: t.orderId },
                  React.createElement("td", null, t.position),
                  React.createElement("td", null, t.dishName),
                  React.createElement("td", null, `${t.prepMinutes} min`),
                  React.createElement(
                    "td",
                    null,
                    t.readyInMinutes,
                    React.createElement("small", null, " min")
                  )
                )
              )
            )
          ),
      React.createElement(
        "p",
        { className: "summary" },
        "Total backlog: ",
        React.createElement(
          "strong",
          null,
          `${queue.totalBacklogMinutes} min`
        )
      )
    ),
    React.createElement(
      "footer",
      null,
      React.createElement(
        "form",
        { method: "POST", action: "/clear" },
        React.createElement(
          "button",
          { type: "submit", className: "link" },
          "Clear queue"
        )
      )
    )
  );
}
