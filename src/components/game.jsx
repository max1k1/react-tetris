import { useEffect, useState, useCallback } from 'react';
import './game.css';
import { changeBoxId } from './utils/changingBoxIdOnGridHelper';
import {useInterval} from './hooks/useInterval';


const Game = () => {
  const [boxId, setBoxId] = useState('0.3');
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
  const gameAreaElement = gameAreaArray.map((e, i) => {
    return (
      <div key={i}>
        {e.map((a) => {
          if (a !== boxId) {
            return (
              <span key={a} className="pixel">
                *{/* {a} */}
              </span>
            );
          } else {
            return (
              <span key={a} className="pixel active">
                *
              </span>
            );
            // {`[${boxId}]`}
          }
        })}
      </div>
    );
  });

  const keypressHandler = useCallback(
    (event) => {
      if (event.code === 'KeyW') {
        changeBoxId(boxId, 'y', -1, width, height, setBoxId);
      }
      if (event.code === 'KeyA') {
        changeBoxId(boxId, 'x', -1, width, height, setBoxId);
      }
      if (event.code === 'KeyS') {
        changeBoxId(boxId, 'y', 1, width, height, setBoxId);
      }
      if (event.code === 'KeyD') {
        changeBoxId(boxId, 'x', 1, width, height, setBoxId);
      }
    },
    [boxId],
  );

  useEffect(() => {
    window.addEventListener('keypress', keypressHandler, false);
    return () => {
      window.removeEventListener('keypress', keypressHandler);
    };
  }, [keypressHandler, boxId]);

  useInterval(() => {
    changeBoxId(boxId, 'y', 1, width, height, setBoxId);
  }, 1000);

  return (
    <div>
      Game <div className="gameBlock">{gameAreaElement}</div>
    </div>
  );
};

export default Game;
