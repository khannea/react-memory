import PropTypes from 'prop-types'
import React, { Component } from 'react'

import './HighScoreInput.css'

import { saveHOFEntry } from './HallOfFame'

class HighScoreInput extends Component {
  state = { winner: '' }

  handleWinnerUpdate = (event) => {
    this.setState({ winner: event.target.value.toUpperCase() })
  }

  // Arrow fx for binding
  persistWinner = (event) => {
    event.preventDefault()
    const newEntry = { guesses: this.props.guesses, nom: this.state.winner }
    this.props.onStored(newEntry)
  }

  render() {
    return (
      <form className="highScoreInput" onSubmit={this.persistWinner}>
        <p>
          <label>
            Bravo ! Entre ton prénom :
            <input autoComplete="given-name"
                    type="text"
                    onChange={this.handleWinnerUpdate}
                    value={this.state.winner} />
          </label>
          <button type="submit">J’ai gagné !</button>
        </p>
      </form>
    )
  }
}

HighScoreInput.propTypes = {
  guesses: PropTypes.number.isRequired,
  onStored: PropTypes.func.isRequired,
}

export default HighScoreInput
