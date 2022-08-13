import ExampleSVG from './components/ExampleSVG/exampleSVG';
import SVGViewboxZoom from './components/SVGViewboxZoom/SVGViewboxZoom';

function App() {
	return (
		<div className="App">
			<SVGViewboxZoom initivalViewboxValues={[0, 0, 2370, 626,]}
				SVG={ExampleSVG}
			/>
		</div>
	);
}

export default App;
