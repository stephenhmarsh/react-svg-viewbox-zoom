// import logo from './logo.svg';
import SVGViewboxZoom from "react-svg-viewbox-zoom";
import ExampleSVG from "./ExampleSVG";

function App() {
  return (
    <SVGViewboxZoom
      SVG={ExampleSVG}
      initivalViewboxValues={[0, 0, 2370, 626]}
    />
  );
}

export default App;
