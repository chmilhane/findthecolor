import Index from "./views/Index";
import Difficulty from "./views/Difficulty";
import Game from "./views/Game";

import { useSelector } from "react-redux";

export default function App() {
  const menu = useSelector(state => state.menu.value);

  return (
    <div className="App flex items-center justify-center">
      { menu === 0 ? <Index /> :
        menu === 1 ? <Difficulty /> : 
        menu === 2 ? <Game />
        : null }
    </div>
  )
}