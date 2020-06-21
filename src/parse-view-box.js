
module.exports = function parseViewBox(viewBox) {

  let [minX, minY, width, height] = viewBox.split(/\s+/);

  minX = parseInt(minX, 10);
  minY = parseInt(minY, 10);
  width = parseInt(width, 10);
  height = parseInt(height, 10);

  return {
    minX,
    minY,
    width,
    height,
  }
}
