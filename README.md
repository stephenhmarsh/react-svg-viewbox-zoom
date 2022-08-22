# react-svg-viewbox-zoom
A React library to pan and zoom SVGs using their viewbox, like nature intended

## Motivation
A lot of React pan and zoom libraries use CSS transforms, which are great, except when the element is a `<svg>`, in which case we already have the `viewbox` attr to do this for us, we just need to tell it some values.

## Demo 
[https://react-svg-viewbox-zoom.vercel.app](https://react-svg-viewbox-zoom.vercel.app)


## Install

```bash
npm install --save react-svg-viewbox-zoom
```

## Usage

* Create a component that takes a `viewBox` prop and returns your SVG with it.
* Create an array with four numbers corresponding to the initial `viewBox` values to start with.
* Pass both of those to `<SVGViewBoxZoom />`

```jsx
import React from "react"
import SVGViewBoxZoom from "react-svg-viewbox-zoom"

const MySVG = ({viewBox}) => {
	return (
		<svg height="100" width="100" viewBox={viewBox} >
			<circle cx="50" cy="50" r="40" stroke="black" stroke-width="1"/>
		</svg>
	)
}


const App = () => {
	return (
		<div>
			<SVGViewboxZoom
				initivalViewboxValues={[0, 0, 100, 100]}
				SVG={MySVG}
			/>
		</div>
	);
}

```


## License

MIT © [stephenhmarsh](https://github.com/stephenhmarsh)
