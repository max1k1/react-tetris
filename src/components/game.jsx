import { useEffect, useState, useCallback } from 'react';
import './game.css';
import { changeBoxId } from './utils/changingBoxIdOnGridHelper';
import { useInterval } from './hooks/useInterval';

const Game = () => {
  const [activeBox, setActiveBox] = useState(['0.2', '0.3', '0.4', '1.3',]);
  const width = 12;
  const height = 18;
  let pixelNumber;
  let gameAreaArray = [];
  for (let i = 0; i <= height; i++) {
    gameAreaArray.push([]);
    for (let j = 1; j <= width; j++) {
      pixelNumber = i + '.' + j;
      gameAreaArray[i].push(pixelNumber);
    }
  }
  let activeBoxJ = 0;
  // try to make this function to be IIFE 
  const gameAreaElement = gameAreaArray.map((rowElement, i) => {
    return (
      <div key={i}>
        {rowElement.map((a) => {
          let isActive = false;
          for (let j = activeBoxJ; j < activeBox.length; j++) {
            if (a === activeBox[j]) {
              isActive = true;
              activeBoxJ++;
              break;
            }
          }
          return (
            <span key={a} className={`pixel ${isActive ? 'active' : ''}`}>
              *
            </span>
          );
        })}
      </div>
    );
  });

  const keypressHandler = useCallback(
    (event) => {
      if (event.code === 'KeyW') {
        changeBoxId(activeBox, 'y', -1, width, height, setActiveBox);
      }
      if (event.code === 'KeyA') {
        changeBoxId(activeBox, 'x', -1, width, height, setActiveBox);
      }
      if (event.code === 'KeyS') {
        changeBoxId(activeBox, 'y', 1, width, height, setActiveBox);
      }
      if (event.code === 'KeyD') {
        changeBoxId(activeBox, 'x', 1, width, height, setActiveBox);
      }
    },
    [activeBox],
  );

  useEffect(() => {
    window.addEventListener('keypress', keypressHandler, false);
    return () => {
      window.removeEventListener('keypress', keypressHandler);
    };
  }, [keypressHandler, activeBox]);

  useInterval(() => {
    changeBoxId(activeBox, 'y', 1, width, height, setActiveBox);
  }, 1000);

  return (
    <div>
      Game <div className="gameBlock">{gameAreaElement}</div>
    </div>
  );
};

export default Game;
