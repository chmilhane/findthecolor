import { useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import useWindowDimensions from "../hooks/useWindowDimensions";

import { setMenu } from "../features/menuSlice";
import { reset, nextDifficulty, submitGuess, setHasSubmitted, setRandomColor } from "../features/gameSlice";

import Arrow from "../assets/RightArrow.svg";
import EmptyArrow from "../assets/EmptyArrow.svg";

const DIFFICULTY_MAP = {
  0: "EASY",
  1: "MEDIUM",
  2: "HARD"
}

function GuessInterface() {
  const dispatch = useDispatch();

  const refR = useRef(null);
  const refG = useRef(null);
  const refB = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();

    const r = parseInt(refR.current.value || 0);
    const g = parseInt(refG.current.value || 0);
    const b = parseInt(refB.current.value || 0);

    // console.log(r, g, b);

    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
      alert("Please enter a valid RGB value.");
      return;
    }

    dispatch(submitGuess({r, g, b}));
  }

  return (
    <div className="flex flex-col w-full mx-4 sm:mx-0 sm:w-96 h-max p-6 sm:p-8 bg-transparent-30 rounded-lg shadow-xl">
      <h1 className="font-bold text-2xl mb-2">Find The Color!</h1>
      <div className="flex space-x-3">
        <div className="relative h-11 w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none bg-red shadow-sm rounded-l-lg"></div>
          <input ref={refR} type="number" max={255} min={0} defaultValue={0} className="bg-transparent-white border-0 w-full h-11 text-white text-xl outline-none font-normal rounded-lg pl-5 p-4" />
          <div className="absolute inset-y-0 right-2 flex justify-center items-center">
            <div className="flex flex-col space-y-1">
              <button onClick={() => {
                refR.current.value = Math.max(0, Math.min(255, parseInt(refR.current.value || 0) + 1));
              }} type="button" className="px-1">
                <img src={EmptyArrow} alt="Arrow" className="h-4 -rotate-90" />
              </button>
              <button onClick={() => {
                refR.current.value = Math.max(0, Math.min(255, parseInt(refR.current.value || 0) - 1));
              }} type="button" className="px-1">
                <img src={EmptyArrow} alt="Arrow" className="h-4 rotate-90" />
              </button>
            </div>
          </div>
        </div>
        <div className="relative h-11 w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none bg-green shadow-sm rounded-l-lg"></div>
          <input ref={refG} type="number" max={255} min={0} defaultValue={0} className="bg-transparent-white border-0 w-full h-11 text-white text-xl outline-none font-normal rounded-lg pl-5 p-4" />
          <div className="absolute inset-y-0 right-2 flex justify-center items-center">
            <div className="flex flex-col space-y-1">
              <button onClick={() => {
                refG.current.value = Math.max(0, Math.min(255, parseInt(refG.current.value || 0) + 1));
              }} type="button" className="px-1">
                <img src={EmptyArrow} alt="Arrow" className="h-4 -rotate-90" />
              </button>
              <button onClick={() => {
                refG.current.value = Math.max(0, Math.min(255, parseInt(refG.current.value || 0) - 1));
              }} type="button" className="px-1">
                <img src={EmptyArrow} alt="Arrow" className="h-4 rotate-90" />
              </button>
            </div>
          </div>
        </div>
        <div className="relative h-11 w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none bg-blue shadow-sm rounded-l-lg"></div>
          <input ref={refB} type="number" max={255} min={0} defaultValue={0} className="bg-transparent-white border-0 w-full h-11 text-white text-xl outline-none font-normal rounded-lg pl-5 p-4" />
          <div className="absolute inset-y-0 right-2 flex justify-center items-center">
            <div className="flex flex-col space-y-1">
              <button onClick={() => {
                refB.current.value = Math.max(0, Math.min(255, parseInt(refB.current.value || 0) + 1));
              }} type="button" className="px-1">
                <img src={EmptyArrow} alt="Arrow" className="h-4 -rotate-90" />
              </button>
              <button onClick={() => {
                refB.current.value = Math.max(0, Math.min(255, parseInt(refB.current.value || 0) - 1));
              }} type="button" className="px-1">
                <img src={EmptyArrow} alt="Arrow" className="h-4 rotate-90" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <button onClick={handleClick} type="submit" className="bg-white shadow-md rounded-md py-2 text-black flex mt-8 items-center justify-center">
        <h1 className="font-bold text-2xl">SUBMIT</h1>
      </button>
    </div>
  );
}

function ColorRevealInterface() {
  const dispatch = useDispatch();
  const game = useSelector(state => state.game);

  const handleClick = (e) => {
    e.preventDefault();

    dispatch(setHasSubmitted(false));
    dispatch(setRandomColor());
  }

  return (
    <div className="flex flex-col w-full mx-4 sm:mx-0 sm:w-96 h-max p-6 sm:p-8 bg-transparent-30 rounded-lg shadow-xl">
      <h1 className="font-regular text-2xl">You were <span className="font-bold">{Math.round(game.percentage)}%</span> right!</h1>
      <div className="flex justify-between items-center mt-6">
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm bg-red"></div>
            <h2 className="font-regular text-xl">{game.currentColor.r}/255</h2>
          </div>
          <div className="flex space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm bg-green"></div>
            <h2 className="font-regular text-xl">{game.currentColor.g}/255</h2>
          </div>
          <div className="flex space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm bg-blue"></div>
            <h2 className="font-regular text-xl">{game.currentColor.b}/255</h2>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm bg-red"></div>
            <h2 className="font-regular text-xl">{game.submittedColor.r}/255</h2>
          </div>
          <div className="flex space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm bg-green"></div>
            <h2 className="font-regular text-xl">{game.submittedColor.g}/255</h2>
          </div>
          <div className="flex space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm bg-blue"></div>
            <h2 className="font-regular text-xl">{game.submittedColor.b}/255</h2>
          </div>
        </div>
      </div>
      <button onClick={handleClick} type="submit" className="bg-white shadow-md rounded-md py-2 text-black flex mt-8 items-center justify-center">
        <h1 className="font-bold text-2xl">NEXT</h1>
      </button>
    </div>
  );
}

function Game() {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  const game = useSelector(state => state.game);

  const quit = () => {
    dispatch(setMenu(0));
    dispatch(reset());
  }

  return (
    <div style={{
      background: `linear-gradient(
        to right,
        rgb(${game.currentColor.r}, ${game.currentColor.g}, ${game.currentColor.b}),
        rgb(${game.currentColor.r}, ${game.currentColor.g}, ${game.currentColor.b}),
        rgb(${game.hasSubmitted ? game.submittedColor.r : game.currentColor.r}, ${game.hasSubmitted ? game.submittedColor.g : game.currentColor.g}, ${game.hasSubmitted ? game.submittedColor.b : game.currentColor.b}),
        rgb(${game.hasSubmitted ? game.submittedColor.r : game.currentColor.r}, ${game.hasSubmitted ? game.submittedColor.g : game.currentColor.g}, ${game.hasSubmitted ? game.submittedColor.b : game.currentColor.b})
        )`,
    }} className="flex items-center justify-center w-screen h-screen">
      <div className="absolute top-4 left-0 flex items-center justify-between w-full h-16 p-4">
        <h1 className="font-bold text-2xl text-white shadow-md px-4 sm:px-6 p-2 bg-transparent-30 rounded-md ">Score : {game.score}</h1>
        { width > 640 ? (
          <div className="flex space-x-4">
            <button onClick={() => dispatch(nextDifficulty())} className="bg-white shadow-md space-x-4 rounded-md px-6 py-2 text-black flex items-center justify-center">
              <h1 className="font-bold text-2xl">{ DIFFICULTY_MAP[game.difficulty] }</h1>
              <div className={"p-3 shadow-md border-2 rounded-full " + (game.difficulty === 0 ? "bg-green" : game.difficulty === 1 ? "bg-yellow" : "bg-red")}></div>
            </button>
            <button onClick={() => quit()} className="bg-white shadow-md space-x-4 rounded-md px-6 py-2 text-black flex items-center justify-center">
              <h1 className="font-bold text-2xl">QUIT</h1>
              <img src={Arrow} alt="Arrow" className="transition h-5" />
            </button>
          </div>
        ) : (
          <button onClick={() => dispatch(nextDifficulty())} className="bg-white shadow-md space-x-4 rounded-md px-4 sm:px-6 py-2 text-black flex items-center justify-center">
            { width > 350 && (
              <h1 className="font-bold text-2xl">{ DIFFICULTY_MAP[game.difficulty] }</h1>
            ) }
            <div className={"p-3 shadow-md border-2 rounded-full " + (game.difficulty === 0 ? "bg-green" : game.difficulty === 1 ? "bg-yellow" : "bg-red")}></div>
        </button>
        ) }
      </div>
      { game.hasSubmitted ? <ColorRevealInterface /> : <GuessInterface /> }
    </div>
  );
}

export default Game;