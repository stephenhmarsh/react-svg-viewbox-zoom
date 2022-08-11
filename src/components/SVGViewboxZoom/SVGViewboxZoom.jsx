import React, { useRef, useState } from "react";
import { usePinch } from '@use-gesture/react'

// for more efficient tree-shaking than direct import
// const useGesture = createUseGesture([dragAction, pinchAction])

const SVGViewboxZoom = ({ SVG, initivalViewboxValues = [0, 0, 0, 0] }) => {
	const [viewboxValues, setViewboxValues] = useState(initivalViewboxValues)
	const target = useRef();

	const handlePinch = (e) => {
		// console.log("handlePinch", e.origin[0]);
		// const sign = e.direction[0];
		const results = [
			(viewboxValues[0] * 1),
			(viewboxValues[1] * 1),
			Math.min(viewboxValues[2] / e.da[0], initivalViewboxValues[2]),
			Math.min(viewboxValues[3] / e.da[0], initivalViewboxValues[3])
		]

		console.log("setting", results[2], results[3])
		setViewboxValues(
			results
		)
	}

	usePinch(
		handlePinch,
		{
			// "Because React doesn't support proprietary Webkit GestureEvents, you will need to attach the gesture using a ref, with the target option."
			// https://use-gesture.netlify.app/docs/gestures/#about-the-pinch-gesture
			// https://use-gesture.netlify.app/docs/options/#target
			target
		}
	)

	return <div style={{ width: "100%", border: "1px solid red" }} ref={target}>< SVG viewBox={viewboxValues.join(" ")} /></div>
}

export default SVGViewboxZoom
