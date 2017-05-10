import React, { Component } from 'react';
import './App.css';

function Animal(props) {
  let buttonClass;
  if (props.value.isClicked ) {
    if (props.value.isWinner) {
      buttonClass = "right";
    } else {
      buttonClass = "wrong";
    }
  } else {
    buttonClass = "unknown";
  }
  return (
    <button className={buttonClass + " animal"} onClick={props.onClick}>
      <img className="animal-image" src={props.value.img} alt="Animal pic"/>
      <div className={"isClicked-" + props.value.isClicked}>
        <a href={props.value.link} target="_blank">
          <h2>Adopt Me 
          {!props.value.isWinner ? " Anyway" : <span></span>} 
            !</h2>
        </a>
      </div>
    </button>
    )
}

class Board extends Component {

  renderAnimal(i) {
    return (
      <Animal
        value={this.props.animals[i]}
        onClick={() => {
          this.props.onClick(i)
        }}
      />
      )
  }

  render() {
    return (
      <div>
        <div className="status">{status}</div>
        <table className="board-table">
        <tbody>
          <tr className="board-row-1">
            <td className="row-1-cell">{this.renderAnimal(0)}</td>
            <td className="row-1-cell">{this.renderAnimal(1)}</td>
            <td className="row-1-cell">{this.renderAnimal(2)}</td>
          </tr>
          <tr className="board-row-2">
            <td className="row-2-cell">{this.renderAnimal(3)}</td>
            <td className="row-2-cell">{this.renderAnimal(4)}</td>
            <td className="row-2-cell">{this.renderAnimal(5)}</td>
          </tr>
          </tbody>
        </table>
      </div>
      )
  }
}

class Game extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      animals: props.animals,
      hasWon: false
    };
  }

  handleClick(i) {
    const newAnimals = this.state.animals.slice();
    let hasWon = newAnimals[i].isWinner || this.state.hasWon;
    newAnimals[i].isClicked = true;
    this.setState({
      animals: newAnimals,
      hasWon: hasWon
    });
  }

  handleReset() {
    location.reload(true);
  }

  render() {
    let buttonClass = this.state.hasWon ? "show" : "hidden";
    return (
      <div className="game">
        <div className="game-header">
          <h2>Who is {this.state.animals[this.props.winner].name}?</h2>
          <button className={buttonClass + " play-again"} onClick={() => this.handleReset()}>
            Play again
          </button>
        </div>
        <Board
          animals={this.state.animals}
          onClick={i => this.handleClick(i)}
        />
      </div>
    );
  }
}

export default Game;




