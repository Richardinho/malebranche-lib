1. handle <g> tags
2. add clipPathUnits="objectBoundingBox" automatically
3. add width="0" height="0" to svg tag
4. reduce decimal figures to something saner
5. bleed option for when it's important for edges of clippath not to be inside the element
const bleed = 0.001
value = (value * (bleed * 2 + 1)) - bleed
