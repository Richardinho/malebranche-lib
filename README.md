# Malebranche Lib

Node library for converting clip path coordinates from decimal to fractional values.

Commonly, SVG coordinates are in user space: that is to say, an `x` coordinate of value `100` refers to 100px from the edge of the container of the SVG.
SVG allows you to express coordinates as fractions of this user space - i.e., a number between 0 and 1. This is useful as it allows the SVG to scale with the container itself. Mostly, SVGs that are produced by graphics applications use the user space coordinates. The purpose of this tool is to convert user space coordinates to fractional coordinates.

See this StackOverflow question for more detail on this problem: https://stackoverflow.com/questions/25901569/svg-scaling-and-clip-path/33316402#33316402

## Usage
```

```

## Run Tests

```
npm test
```
