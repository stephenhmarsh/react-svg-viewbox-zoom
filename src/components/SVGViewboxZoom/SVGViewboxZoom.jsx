import React, { useRef, useState, useEffect } from "react";
import { useGesture, usePinch } from '@use-gesture/react'

const SVGViewboxZoom = ({ SVG, initivalViewboxValues = [0, 0, 0, 0] }) => {
	const [viewboxValues, setViewboxValues] = useState(initivalViewboxValues)
	const [lastSetViewboxValues, setLastSetViewboxValues] = useState(viewboxValues);
	const [lastRunTimeStamp, setLastRunTimeStamp] = useState(0);

	const target = useRef();

	useEffect(() => {
		document.addEventListener('gesturestart', (e) => e.preventDefault())
		document.addEventListener('gesturechange', (e) => e.preventDefault())
	})

	const handlePinch = (state) => {
		console.log(state.last, state.timeStamp, lastRunTimeStamp)
		console.log("handlePinch", state);


		if (state.first && state.timeStamp < (lastRunTimeStamp + 500)) {
			console.log("should cancel")
			state.cancel()
			return;
		}

		const scaleFactor = state.movement[0]
		const results = [
			0,
			0,
			lastSetViewboxValues[2] / scaleFactor,
			lastSetViewboxValues[3] / scaleFactor
		]

		if (state.pinching) {
			// console.log("setting", results[2], results[3])
			setViewboxValues(results)
		}
		if (state.last) {
			setLastSetViewboxValues(results)
			setLastRunTimeStamp(state.timeStamp)
		}
		// }
	}

	// const handlePinchEnd = (state) => {
	// 	console.log("handlePinchEnd", state);

	// }

	usePinch(handlePinch, {
		// "Because React doesn't support proprietary Webkit GestureEvents, you will need to attach the gesture using a ref, with the target option."
		// https://use-gesture.netlify.app/docs/gestures/#about-the-pinch-gesture
		// https://use-gesture.netlify.app/docs/options/#target
		target,
		// just to be sure elsaticity doesn't fire weird values/extra first/lasts
		rubberband: false,
	})

	// const bind = useGesture(
	// 	{ onPinchEnd: handlePinchEnd },
	// 	{ pinch: { target } }
	// )

	return <div style={{ width: "100%", border: "1px solid red" }} ref={target} >
		<SVG viewBox={viewboxValues.join(" ")} />
	</div>
}

export default SVGViewboxZoom
