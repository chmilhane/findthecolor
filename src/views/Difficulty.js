import { useDispatch } from 'react-redux';

import { setMenu } from "../features/menuSlice";
import { setDifficulty, setRandomColor } from "../features/gameSlice";

import Arrow from "../assets/RightArrow.svg";

function ButtonContent(props) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex space-x-2">
        <h1 className="font-bold text-2xl">{ props.text }</h1>
        <h2 className="font-light text-2xl">{ props.percent }%</h2>
      </div>
      <img src={Arrow} alt="Arrow" className="h-5" />
    </div>
  );
}

function Difficulty() {
  const dispatch = useDispatch();

  const SelectDifficulty = (difficulty) => {
    dispatch(setMenu(2));
    dispatch(setDifficulty(difficulty));
    dispatch(setRandomColor());
  };

  return (
    <div className="flex flex-col w-96 h-max p-8 bg-transparent-30 rounded-lg shadow-xl">
      <h1 className="font-bold text-2xl">Choose your difficulty</h1>
      <div className="flex flex-col mt-6 space-y-4">
        <button onClick={() => SelectDifficulty(0)} className="transition opacity-50 hover:opacity-100 bg-white hover:bg-green shadow-md rounded-lg px-6 py-2 text-black">
          <ButtonContent text="EASY" percent="30" />
        </button>
        <button onClick={() => SelectDifficulty(1)} className="transition opacity-50 hover:opacity-100 bg-white hover:bg-yellow shadow-md rounded-lg px-6 py-2 text-black">
          <ButtonContent text="MEDIUM" percent="50" />
        </button>
        <button onClick={() => SelectDifficulty(2)} className="transition opacity-50 hover:opacity-100 bg-white hover:bg-red shadow-md rounded-lg px-6 py-2 text-black">
          <ButtonContent text="HARD" percent="70" />
        </button>
      </div>
      <p className="mt-6 text-gray">The percentage indicates the level of accuracy you need to achieve to earn points.</p>
    </div>
  );
}

export default Difficulty;