import { useEffect, useState, useCallback } from 'react';
import './game.css';
import { changeBoxId } from './utils/changingBoxIdOnGridHelper';
import { useInterval } from './hooks/useInterval';

const Game = () => {
  const [activeBox, setActiveBox] = useState(['0.2', '0.3', '0.4', '1.3']);
  const [placedBoxes, setPlacedBoxes] = useState(['18.2', '18.3']);
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

  const gameAreaElement = gameAreaArray.map((rowElement, i) => {
    return (
      <div key={i}>
        {rowElement.map((e) => {
          let isActive = false;
          for (let j = 0; j < activeBox.length + placedBoxes.length; j++) {
            if (e === activeBox[j] || e === placedBoxes[j]) {
              isActive = true;
              break;
            }
          }
          return (
            <span key={e} className={`pixel ${isActive ? 'active' : ''}`}>
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
        changeBoxId(activeBox, placedBoxes, 'y', -1, width, height, setActiveBox, setPlacedBoxes);
      }
      if (event.code === 'KeyA') {
        changeBoxId(activeBox, placedBoxes, 'x', -1, width, height, setActiveBox, setPlacedBoxes);
      }
      if (event.code === 'KeyS') {
        changeBoxId(activeBox, placedBoxes, 'y', 1, width, height, setActiveBox, setPlacedBoxes);
      }
      if (event.code === 'KeyD') {
        changeBoxId(activeBox, placedBoxes, 'x', 1, width, height, setActiveBox, setPlacedBoxes);
      }
    },
    [activeBox, placedBoxes],
  );

  useInterval(() => {
    changeBoxId(activeBox, placedBoxes, 'y', 1, width, height, setActiveBox, setPlacedBoxes);
  }, 1000);

  useEffect(() => {
    window.addEventListener('keypress', keypressHandler, false);
    return () => {
      window.removeEventListener('keypress', keypressHandler);
    };
  }, [keypressHandler, activeBox]);

  return (
    <div>
      Game <div className="gameBlock">{gameAreaElement}</div>
    </div>
  );
};

export default Game;
