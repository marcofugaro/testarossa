import * as THREE from 'three'
import OBJLoader from 'three-obj-loader'
import Color from 'color'
// import { TweenLite } from 'gsap'

class Scene {
  FIELDOFVIEW = 60
  NEAR = 0.1
  FAR = 5000

  // the time the car takes to reach the mouse (s)
  SPEED = 3
  // the factor which determines how much space the car can take up
  STREET_FACTOR = 0.003

  container = document.getElementById('scene')

  posX = 0
  rotationY = 0


  constructor() {
    // let's add the mothod OBJLoader to THREE
    OBJLoader(THREE)

    // let's bind the methods to the class
    this.render = this.render.bind(this)
    this.fitRendererToElement = this.fitRendererToElement.bind(this)
    this.getPositionFromMouse = this.getPositionFromMouse.bind(this)
    this.getPositionFromAccelerometer = this.getPositionFromAccelerometer.bind(this)

    // let's create the scene, camera and renderer
    this.Scene = new THREE.Scene()
    this.Camera = new THREE.PerspectiveCamera(this.FIELDOFVIEW, 1, this.NEAR, this.FAR)
    this.Renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })

    // let's resize the renderer so it fits its parent
    this.fitRendererToElement(this.container)

    // let's add it to the DOM
    this.container.appendChild(this.Renderer.domElement)

    // position camera
    this.Camera.position.set(0, 7, -30)
    // this.Camera.position.set(0, 300, -1)
    this.Camera.lookAt(new THREE.Vector3(0, 0, 0))

    // let's add the lights
    const hemisphereLight = new THREE.HemisphereLight(0xffffff)
    const pointLight = new THREE.PointLight(0xffffff, 1, 100)
    pointLight.position.set(10, 10, 10)
    this.Scene.add(hemisphereLight)
    this.Scene.add(pointLight)

    // add the resize listener
    window.addEventListener('resize', this.fitRendererToElement.bind(this, this.container))

    // let's add the grid
    this.Scene.add(this.createGrid())

    // TODO fire this shit before on constructor
    this.loadTestarossa() // GODDAMIT constructor why can't you be async??
      .then((obj) => {
        this.testarossa = obj
        this.Scene.add(this.testarossa)

        // attach the interaction events
        this.addEventListeners()

        // let's start the render loop
        requestAnimationFrame(this.render)
      })
  }


  addEventListeners() {
    // if it's touch and it's shorter than 1024px (fucking touch laptops!!)
    if ('ontouchstart' in window && window.matchMedia('(max-width: 1024px)').matches) {
      window.addEventListener('deviceorientation', this.getPositionFromAccelerometer, { useCapture: true })
    } else {
      document.addEventListener('mousemove', this.getPositionFromMouse)
    }
  }


  // get the left/right position from the mouse
  getPositionFromMouse(e) {
    const mouseX = e.pageX

    this.posX = - (mouseX - this.horizontalCenter) * this.STREET_FACTOR
  }

  // get the left/right position from the accelerometer
  getPositionFromAccelerometer(e) {
    const orientationY = e.gamma

    this.posX = - (orientationY * 30) * this.STREET_FACTOR
  }


  // the render loop
  render() {
    // this.testarossa.rotation.y += 0.05

    // calculate the car left and right position
    this.testarossa.position.x += (this.posX - this.testarossa.position.x) / 30
    // could be done also with tweenmax:
    // TweenLite.to(this.testarossa.position, this.SPEED, {
    //   x: this.posX,
    //   ease: Power1.easeOut,
    // })


    // calculate the car rotation when driving
    this.rotationY = (this.posX - this.testarossa.position.x) * 0.1
    this.testarossa.rotation.y += (this.rotationY - this.testarossa.rotation.y) / 30
    // could be done also with tweenmax:
    // TweenLite.to(this.testarossa.rotation, this.SPEED, {
    //   y: this.rotationY,
    //   ease: Power1.easeOut,
    // })

    // let's rerender and recall this function
    this.Renderer.render(this.Scene, this.Camera)
    requestAnimationFrame(this.render)
  }

  /**
   * fit the renderer to the object we pass as an argument
   * @param  {node} el - the container to which we'll fit the canvas
   */
  fitRendererToElement(el) {
    const width = el.innerWidth || el.offsetWidth
    const height = el.innerHeight || el.offsetHeight
    const ratio = width / height

    this.Renderer.setSize(width, height)

    this.Camera.aspect = ratio
    this.Camera.updateProjectionMatrix()

    this.horizontalCenter = window.innerWidth / 2
  }

  // a promisified Three.js OBJLoader
  loadObj(url) {
    return new Promise((resolve, reject) => {
      const loader = new THREE.OBJLoader()
      loader.load(url, (obj) => {
        resolve(obj)
      },
      () => {},
      () => reject(new Error('Failed to load Object')))
    })
  }

  // a promisified Three.js ImageLoader
  loadImg(url) {
    return new Promise((resolve, reject) => {
      const loader = new THREE.ImageLoader()
      loader.load(url, (obj) => {
        resolve(obj)
      },
      () => {},
      () => reject(new Error('Failed to load Image')))
    })
  }

  // let's load the testarossa object
  async loadTestarossa() {
    // let's load the resources
    const [ obj, image ] = await Promise.all([
      this.loadObj('testarossa.obj'),
      this.loadImg('images/no-textures.jpg'),
    ])

    const mesh = obj.children[0]

    // let's apply the texture with the image
    const texture = new THREE.Texture()
    texture.image = image
    texture.needsUpdate = true
    mesh.material.map = texture

    // let's center the car
    // mesh.geometry.computeBoundingBox()
    // console.log(mesh.geometry.boundingBox)
    mesh.geometry.translate(-1, 0, 4)


    // let's flip it 180
    mesh.geometry.rotateY(Math.PI)


    // let's make it bigger
    mesh.geometry.scale(4, 4, 4)

    return obj
  }


  // create the bottom grid
  createGrid() {
    const depthMap = [
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
    ]
    const spacingFactor = 15
    const depthFactor = 5
    const colorsMap = [
      ['#ff0000', '#0000ff'],
      ['#000000', '#ffff00'],
    ]

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      opacity: 1,
      linewidth: 2,
      vertexColors: THREE.VertexColors,
    })


    // return a vector but with the vertices spaced out by the spaingFactors
    const getSpacedoutVector = (x, y, z) => new THREE.Vector3(x * spacingFactor, y * depthFactor, z * spacingFactor)

    // transform the colorsMap into Colors objects, and reverse it all because the grid is reversed
    const colorsMapNormalized = colorsMap.map(row => row.map(hex => Color(hex)).reverse()).reverse()

    // return a calculated color from the colorsMap with the coordinates, x is horizontal and y is vertical
    const getCoordinatesColor = (x, y) => {

      // the value from 0 to 1 of the coordinates
      const factorX = x / (depthMap[0].length - 1)
      const factorY = y / (depthMap.length - 1)

      // we first calculate the horizontal color based on x for both top and bottom
      const colorTopX = colorsMapNormalized[0][0].mix(colorsMapNormalized[0][1], factorX)
      const colorBottomX = colorsMapNormalized[1][0].mix(colorsMapNormalized[1][1], factorX)

      // then we mix the top and bottom colors, based on y
      const color = colorTopX.mix(colorBottomX, factorY)

      // now we transform it in a valid three js color
      return new THREE.Color().setRGB(...color.array().map(rgb => rgb / 255))
    }


    const grid = new THREE.Group()

    // good old matrix loop from the C days!!!
    // LOOP TO CREATE THE HORIZONTAL LINES
    for (let i = 0; i < depthMap.length; i++) {
      const lineGeometry = new THREE.Geometry()


      for (let j = 0; j < depthMap[i].length; j++) {
        // if the depth value is different from the previous or next, we put a vector here
        if (depthMap[i][j] !== depthMap[i][j-1] || depthMap[i][j] !== depthMap[i][j+1]) {
          lineGeometry.vertices.push(getSpacedoutVector(j, depthMap[i][j], i))
          lineGeometry.colors.push(getCoordinatesColor(j, i))
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
            lineGeometry.vertices.push(getSpacedoutVector(i, depthMap[j][i], j))
            lineGeometry.colors.push(getCoordinatesColor(i, j))
          }
        } catch (e) {
          lineGeometry.vertices.push(getSpacedoutVector(i, depthMap[j][i], j))
          lineGeometry.colors.push(getCoordinatesColor(i, j))
        }

      }

      const line = new THREE.Line(lineGeometry, lineMaterial)
      grid.add(line)
    }



    // let's center the geometry
    const gridHorizontalCenter = (depthMap[0].length - 1) / 2 * spacingFactor
    const gridVerticalCenter = (depthMap.length - 1) / 2 * spacingFactor
    grid.children.forEach(line => line.geometry.translate(- gridHorizontalCenter, 0, - gridVerticalCenter))


    // let's flip it 180
    grid.children.forEach(line => line.geometry.rotateY(Math.PI))


    return grid
  }
}


export default new Scene()
