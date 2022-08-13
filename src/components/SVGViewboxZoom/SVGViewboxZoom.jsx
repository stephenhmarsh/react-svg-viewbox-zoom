import React, { useRef, useState, useEffect } from "react";
import { useGesture } from '@use-gesture/react'

const preventDefault = (e) => e.preventDefault()

const handleMounting = () => {
	document.addEventListener('gesturestart', preventDefault)
	document.addEventListener('gesturechange', preventDefault)
	return () => {
		document.removeEventListener('gesturestart', preventDefault)
		document.removeEventListener('gesturechange', preventDefault)
	}
}

const SVGViewboxZoom = ({ SVG, initivalViewboxValues = [0, 0, 0, 0] }) => {
	const [viewboxValues, setViewboxValues] = useState(initivalViewboxValues)
	const [lastSetViewboxValues, setLastSetViewboxValues] = useState(viewboxValues);

	const handlePinch = ({ intentional, pinching, offset, last }) => {
		if (pinching && intentional) {
			const scaleFactor = offset[0]
			const results = [
				viewboxValues[0],
				viewboxValues[1],
				lastSetViewboxValues[2] / scaleFactor,
				lastSetViewboxValues[3] / scaleFactor
			]
			setViewboxValues(results)
			if (last) {
				setLastSetViewboxValues(results)
			}
		}
	}

	const handleDrag = ({ dragging, intentional, offset, last }) => {
		if (dragging && intentional) {
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

	useEffect(handleMounting, [])

	return <div style={{ touchAction: "none" }} ref={target} >
		<SVG viewBox={viewboxValues.join(" ")} />
	</div>
}

export default SVGViewboxZoom
