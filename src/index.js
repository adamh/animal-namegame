import React from 'react';
import ReactDOM from 'react-dom';
import Game from './App';
import $ from "jquery";
import './index.css';

var animals = []
var winner = 0

// =========

var render = function () {
    ReactDOM.render(
        <Game animals={animals} winner={winner}/>,
        document.getElementById('root')
    );
};

$.get('http://adamh.io/spca-api/animals/random').then(function(data) {
  console.log(data)
  animals = data;
  winner = Math.round(Math.random()*5)
  animals.forEach(function(obj) { obj.isClicked = false; });
  animals.forEach(function(obj, index) { 
  	obj.isWinner = index === winner ? true : false; });
  render()
});