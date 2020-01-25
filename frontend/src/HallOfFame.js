import React from "react";
import PropTypes from "prop-types";

import "./HallOfFame.css";

const HallOfFame = ({ entries }) => (
  <table className="hallOfFame">
    <tbody>
      {entries.map(({ name, guesses, id }) => (
        <tr key={id}>
          <td className="name">{name}</td>
          <td className="guesses">{guesses}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default HallOfFame;

HallOfFame.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      guesses: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      nom: PropTypes.string.isRequired
    })
  ).isRequired
};

const HOF_KEY = "::Memory::HallofFame";
const HOF_MAX_SIZE = 10;

export function saveHOFEntry(entry, onStored) {
  entry.date = new Date().toLocaleDateString();
  entry.id = Date.now();

  const entries = JSON.parse(localStorage.getItem(HOF_KEY) || "[]");
  const insertionPoint = entries.findIndex(
    ({ guesses }) => guesses >= entry.guesses
  );

  if (insertionPoint === -1) {
    entries.push(entry);
  } else {
    entries.splice(insertionPoint, 0, entry);
  }
  if (entries.length > HOF_MAX_SIZE) {
    entries.splice(HOF_MAX_SIZE, entries.length);
  }

  localStorage.setItem(HOF_KEY, JSON.stringify(entries));
  onStored(entries);
}
