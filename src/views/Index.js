import { useDispatch } from 'react-redux';
import { setMenu } from "../features/menuSlice";

function Index() {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col w-full mx-4 sm:mx-0 sm:w-96 h-max p-6 sm:p-8 bg-transparent-30 rounded-lg shadow-xl">
      <h1 className="font-bold text-2xl">Find The Color!</h1>
      <p className="text-gray mt-2">
        A color will appear on the screen, you will have to find the amount of red, green and blue.
      </p>
      <button onClick={() => dispatch(setMenu(1))} className="bg-white shadow-md rounded-md py-2 text-black flex mt-8 items-center justify-center">
        <h1 className="font-bold text-2xl">START</h1>
      </button>
    </div>
  );
}

export default Index;