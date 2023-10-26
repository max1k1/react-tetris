import { useEffect, useState, useCallback } from 'react';
import './game.css';
import { changeBoxId } from './utils/changingBoxIdOnGridHelper';
import { useInterval } from './hooks/useInterval';

const Game = () => {
  const [activeBox, setActiveBox] = useState(['0.2', '0.3', '0.4', '1.3']);
  const width = 12;
  const height = 5;
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
  const gameAreaElement = gameAreaArray.map((rowElement, i) => {
    return (
      <div key={i}>
        {rowElement.map((a) => {
          for (let j = activeBoxJ; j <= activeBox.length; j++) {
            if (a === activeBox[j]) {
              activeBoxJ++;
              return (
                <span key={a} className="pixel active">
                  *
                </span>
              );
              // {`[${boxId}]`}
            } else {
              return (
                <span key={a} className="pixel">
                  *{/* {a} */}
                </span>
              );
            }
          }
        })}
      </div>
    );
  });

  const keypressHandler = useCallback(
    (event) => {
      // if (event.code === 'KeyW') {
      //   changeBoxId(boxId, 'y', -1, width, height, setBoxId);
      // }
      // if (event.code === 'KeyA') {
      //   changeBoxId(boxId, 'x', -1, width, height, setBoxId);
      // }
      // if (event.code === 'KeyS') {
      //   changeBoxId(boxId, 'y', 1, width, height, setBoxId);
      // }
      // if (event.code === 'KeyD') {
      //   changeBoxId(boxId, 'x', 1, width, height, setBoxId);
      // }
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
