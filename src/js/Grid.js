import * as THREE from 'three'
import Color from 'color'


const Grid = {
  depthMap: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  colorsMap: [
    ['#ff0000', '#0000ff'],
    ['#000000', '#ffff00'],
  ],
  spacingFactor: 15,
  depthFactor: 5,


  init() {
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      opacity: 1,
      linewidth: 2,
      vertexColors: THREE.VertexColors,
    })


    // transform the colorsMap into Colors objects, and reverse it all because the grid is reversed
    this.colorsMapNormalized = this.colorsMap.map(row => row.map(hex => Color(hex)).reverse()).reverse()

    // save depthMap into a variable
    const depthMap = this.depthMap


    const grid = new THREE.Group()

    // good old matrix loop from the C days!!!
    // LOOP TO CREATE THE HORIZONTAL LINES
    for (let i = 0; i < depthMap.length; i++) {
      const lineGeometry = new THREE.Geometry()


      for (let j = 0; j < depthMap[i].length; j++) {
        // if the depth value is different from the previous or next, we put a vector here
        if (depthMap[i][j] !== depthMap[i][j-1] || depthMap[i][j] !== depthMap[i][j+1]) {
          lineGeometry.vertices.push(this.getSpacedoutVector(j, depthMap[i][j], i))
          lineGeometry.colors.push(this.getCoordinatesColor(j, i))
        }
      }


      const line = new THREE.Line(lineGeometry, lineMaterial)
      grid.add(line)
    }

    // LOOP TO CREATE THE VERTICAL LINES
    for (let i = 0; i < depthMap[0].length; i++) {
      const lineGeometry = new THREE.Geometry()

      for (let j = 0; j < depthMap.length; j++) {
        // depthMap[j-1][i] (at start or end) becomes undefined[i] which throws an error, so we put a vertex anyway there
        // better this than looping excluding the first and last, and then putting the vertexes by hand...
        try {
          if (depthMap[j][i] !== depthMap[j-1][i] || depthMap[j][i] !== depthMap[j+1][i]) {
            lineGeometry.vertices.push(this.getSpacedoutVector(i, depthMap[j][i], j))
            lineGeometry.colors.push(this.getCoordinatesColor(i, j))
          }
        } catch (e) {
          lineGeometry.vertices.push(this.getSpacedoutVector(i, depthMap[j][i], j))
          lineGeometry.colors.push(this.getCoordinatesColor(i, j))
        }

      }

      const line = new THREE.Line(lineGeometry, lineMaterial)
      grid.add(line)
    }



    // let's center the geometry
    const gridHorizontalCenter = (depthMap[0].length - 1) / 2 * this.spacingFactor
    const gridVerticalCenter = (depthMap.length - 1) / 2 * this.spacingFactor
    grid.children.forEach(line => line.geometry.translate(- gridHorizontalCenter, 0, - gridVerticalCenter))


    return grid
  },


  // return a vector but with the vertices spaced out by the spaingFactors
  getSpacedoutVector(x, y, z) {
    return new THREE.Vector3(x * this.spacingFactor, y * this.depthFactor, z * this.spacingFactor)
  },


  // return a calculated color from the colorsMap with the coordinates, x is horizontal and y is vertical
  getCoordinatesColor(x, y) {

    // the value from 0 to 1 of the coordinates
    const factorX = x / (this.depthMap[0].length - 1)
    const factorY = y / (this.depthMap.length - 1)

    // we first calculate the horizontal color based on x for both top and bottom
    const colorTopX = this.colorsMapNormalized[0][0].mix(this.colorsMapNormalized[0][1], factorX)
    const colorBottomX = this.colorsMapNormalized[1][0].mix(this.colorsMapNormalized[1][1], factorX)

    // then we mix the top and bottom colors, based on y
    const color = colorTopX.mix(colorBottomX, factorY)

    // now we transform it in a valid three js color
    return new THREE.Color().setRGB(...color.array().map(rgb => rgb / 255))
  },


}

export default Grid