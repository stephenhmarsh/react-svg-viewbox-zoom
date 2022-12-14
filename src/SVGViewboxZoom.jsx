import React, { useRef, useState, useEffect } from 'react'
import { useGesture } from '@use-gesture/react'
import handleMounting from './HandleMounting'

const SVGViewboxZoom = ({ SVG, initivalViewboxValues = [0, 0, 0, 0] }) => {
	const [viewboxValues, setViewboxValues] = useState(initivalViewboxValues)
	const [lastSetViewboxValues, setLastSetViewboxValues] =
		useState(viewboxValues)

	const handleDrag = ({
		cancel,
		dragging,
		intentional,
		last,
		offset,
		pinching
	}) => {
		if (pinching) return cancel()
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

	const target = useRef()

	useGesture(
		{
			onDrag: handleDrag,
			onPinch: handlePinch
		},
		{
			target,
			drag: { passive: false, rubberband: false },
			pinch: { passive: false, rubberband: false }
		}
	)

	useEffect(handleMounting, [])

	return (
		<div style={{ touchAction: 'none' }} ref={target}>
			<SVG viewBox={viewboxValues.join(' ')} />
		</div>
	)
}

export default SVGViewboxZoom
