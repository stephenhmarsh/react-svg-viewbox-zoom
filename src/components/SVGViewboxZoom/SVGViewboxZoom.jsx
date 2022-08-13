import React, { useRef, useState, useEffect } from "react";
import { useGesture } from '@use-gesture/react'

const preventDefault = (e) => e.preventDefault()

const SVGViewboxZoom = ({ SVG, initivalViewboxValues = [0, 0, 0, 0] }) => {
	const [viewboxValues, setViewboxValues] = useState(initivalViewboxValues)
	const [lastSetViewboxValues, setLastSetViewboxValues] = useState(viewboxValues);

	const handlePinch = ({ pinching, offset }) => {
		if (pinching) {
			const scaleFactor = offset[0]
			const results = [
				viewboxValues[0],
				viewboxValues[1],
				lastSetViewboxValues[2] / scaleFactor,
				lastSetViewboxValues[3] / scaleFactor
			]
			setViewboxValues(results)
		}
	}

	const handleDrag = ({ dragging, offset, last }) => {
		if (dragging) {
			const results = [
				lastSetViewboxValues[0] - offset[0],
				lastSetViewboxValues[1] - offset[1],
				viewboxValues[2],
				viewboxValues[3]
			]
			setViewboxValues(results)
			if (last) {
				setLastSetViewboxValues(results)
			}
		}
	}

	const target = useRef();

	useGesture({
		onDrag: handleDrag,
		onPinch: handlePinch,
	}, {
		target,
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
