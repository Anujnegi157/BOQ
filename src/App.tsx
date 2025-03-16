import { useState } from "react";
import InputForm from "./Input";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <main className="flex flex-col items-center gap-8 py-16 max-w-[1280px] mx-auto">
      <InputForm></InputForm>
    </main>
  );
}

export default App;
