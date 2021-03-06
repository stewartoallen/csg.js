const { EPS } = require('../../math/constants')

const measureBounds = require('../measurements/measureBounds')

/**
 * Determine if the given geometries overlap by comparing min and max bounds.
 * NOTE: This is used in union for performace gains.
 * @param {geom3} geometry1 - geometry for comparision
 * @param {geom3} geometry2 - geometry for comparision
 * @returns {boolean} true if the geometries overlap
 */
const mayOverlap = (geometry1, geometry2) => {
  // FIXME accessing the data structure of the geometry should not be allowed
  if ((geometry1.polygons.length === 0) || (geometry2.polygons.length === 0)) {
    return false
  }

  let bounds1 = measureBounds(geometry1)
  let min1 = bounds1[0]
  let max1 = bounds1[1]

  let bounds2 = measureBounds(geometry2)
  let min2 = bounds2[0]
  let max2 = bounds2[1]

  if ((min2[0] - max1[0]) > EPS) return false
  if ((min1[0] - max2[0]) > EPS) return false
  if ((min2[1] - max1[1]) > EPS) return false
  if ((min1[1] - max2[1]) > EPS) return false
  if ((min2[2] - max1[2]) > EPS) return false
  if ((min1[2] - max2[2]) > EPS) return false
  return true
}

module.exports = mayOverlap
