# react-svg-viewbox-zoom
A React library to pan and zoom SVGs using their viewbox, like nature intended

## Motivation
A lot of React pan and zoom libraries use CSS transforms, which are great, except when the element is a `<svg>`, in which case we already have the `viewbox` attr to do this for us, we just need to tell it some values.
