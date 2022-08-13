import React, { useRef, useState, useEffect } from "react";
import { useGesture } from '@use-gesture/react'
import { throttle } from "underscore";

const preventDefault = (e) => e.preventDefault()

const SVGViewboxZoom = ({ SVG, initivalViewboxValues = [0, 0, 0, 0] }) => {
	const [viewboxValues, setViewboxValues] = useState(initivalViewboxValues)
	const [lastSetViewboxValues, setLastSetViewboxValues] = useState(viewboxValues);

	const handlePinch = (state) => {
		// console.log(state)
		console.log("handlePinch", state);

		const scaleFactor = state.movement[0]

		const results = [
			viewboxValues[0],
			viewboxValues[1],
			lastSetViewboxValues[2] / scaleFactor,
			lastSetViewboxValues[3] / scaleFactor
		]

		if (state.pinching) {
			setViewboxValues(results)
		}
		if (state.last) {
			setLastSetViewboxValues(results)
			// setLastRunTimeStamp(state.timeStamp)
		}

	}

	const handleDrag = (state) => {
		console.log(state)
		if (state.dragging) {
			setViewboxValues(
				[
					viewboxValues[0] - ((state.distance[0] * state.direction[0]) / 4),
					viewboxValues[1] - ((state.distance[1] * state.direction[1] / 4)),
					viewboxValues[2],
					viewboxValues[3]
				]
			)
		}
	}

	const throttledPinch = throttle(handlePinch, 200, { trailing: false })

	const target = useRef();

	useGesture({
		onDrag: handleDrag,
		onPinch: throttledPinch
	}, {
		target,
		// rubberband: false,
		drag: { rubberband: false },
		pinch: { rubberband: false }
	})


	useEffect(() => {
		console.log("ran")
		document.addEventListener('gesturestart', preventDefault)
		document.addEventListener('gesturechange', preventDefault)
		return () => {
			console.log("cleaning up")
			document.removeEventListener('gesturestart', preventDefault)
			document.removeEventListener('gesturechange', preventDefault)
		}
	}, [])


	return <div style={{ width: "100vw", overflow: "scroll", border: "1px solid red", touchAction: "none" }} ref={target} >
		<SVG viewBox={viewboxValues.join(" ")} />
	</div>
}

export default SVGViewboxZoom
