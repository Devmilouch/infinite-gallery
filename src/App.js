import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import InfiniteScroll from "./Components/InfiniteScroll/InfiniteScroll";



function App() {
  useEffect(() => {
    Aos.init({});
  }, []);

  return (
    <div>
      <InfiniteScroll />
    </div>
  );
}

export default App;
