import React, { Component } from "react";
import shuffle from "lodash.shuffle";

import "./App.css";

import Card from "./Card";
import GuessCount from "./GuessCount";
import HallOfFame from "./HallOfFame";
import HighScoreInput from "./HighScoreInput";

const SIDE = 4;
const SYMBOLS = "😀🎉💖🎩🐶🐱🦄🐬"
const VISUAL_PAUSE_MSECS = 750;

class App extends Component {
  state = {
    data: null,
    cards: this.generateCards(),
    currentPair: [],
    guesses: 0,
    hallOfFame: null,
    matchedCardIndices: [],
    dataSaved: null
  };

  componentDidMount() {
    this.getDataFromDb();
  }

  getDataFromDb = () => {
    const req = new Request("/ap2/gagnants", {
      method: "GET",
      cache: "default"
    });
    fetch(req)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          data: data
        });
      });
  };

  addDataFromDb = data => {
    fetch("/ap2/add", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(this.getDataFromDb);
  };

  // Arrow fx for binding
  displayHallOfFame = data => {
    this.addDataFromDb(data);
    this.setState({ dataSaved: true });
  };

  generateCards() {
    const result = [];
    const size = SIDE * SIDE;
    const candidates = shuffle(SYMBOLS);
    while (result.length < size) {
      const card = candidates.pop();
      result.push(card, card);
    }
    return shuffle(result);
  }

  getFeedbackForCard(index) {
    const { currentPair, matchedCardIndices } = this.state
    const indexMatched = matchedCardIndices.includes(index)
  
    if (currentPair.length < 2) {
      return indexMatched || index === currentPair[0] ? 'visible' : 'hidden'
    }
  
    if (currentPair.includes(index)) {
      return indexMatched ? 'justMatched' : 'justMismatched'
    }
  
    return indexMatched ? 'visible' : 'hidden'
  }

  // Arrow fx for binding
  handleCardClick = index => {
    const { currentPair } = this.state
  
    if (currentPair.length === 2) {
      return
    }
  
    if (currentPair.length === 0) {
      this.setState({ currentPair: [index] })
      return
    }
    this.handleNewPairClosedBy(index)
  }

  handleNewPairClosedBy(index) {
    const { cards, currentPair, guesses, matchedCardIndices } = this.state;
    const newPair = [currentPair[0], index];
    const newGuesses = guesses + 1;
    const matched =
      cards[newPair[0]] === cards[newPair[1]] && newPair[0] !== newPair[1];
    this.setState({ currentPair: newPair, guesses: newGuesses });
    if (matched) {
      this.setState({
        matchedCardIndices: [...matchedCardIndices, ...newPair]
      });
    }
    setTimeout(() => this.setState({ currentPair: [] }), VISUAL_PAUSE_MSECS);
  }

  render() {
    const {
      cards,
      guesses,
      hallOfFame,
      matchedCardIndices,
      data,
      dataSaved
    } = this.state;
    const won = matchedCardIndices.length === cards.length;

    return (
      <div className="memory">
        <GuessCount guesses={guesses} />
        {cards.map((card, index) => (
          <Card
            card={card}
            feedback={this.getFeedbackForCard(index)}
            index={index}
            key={index}
            onClick={this.handleCardClick}
          />
        ))}
        {won && dataSaved && <HallOfFame entries={data} />}
        {won && data && !dataSaved && (
          <HighScoreInput
            guesses={guesses}
            onStored={this.displayHallOfFame}
            id={guesses}
          />
        )}
      </div>
    );
  }
}

export default App;
