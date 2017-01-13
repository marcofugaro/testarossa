import * as THREE from 'three'
import Testarossa from './testarossa'
import Grid from './grid'

class Scene {
  FIELDOFVIEW = 60
  NEAR = 0.1
  FAR = 5000

  // the factor which determines how much space the car can take up
  STREET_FACTOR = 0.003

  container = document.getElementById('scene')

  posX = 0
  rotationY = 0


  constructor() {

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
    this.Scene.add(Grid.init())

    // TODO fire this shit before on constructor
    Testarossa.load() // GODDAMIT constructor why can't you be async??
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
    // TweenLite.to(this.testarossa.position, 3, {
    //   x: this.posX,
    //   ease: Power1.easeOut,
    // })


    // calculate the car rotation when driving
    this.rotationY = (this.posX - this.testarossa.position.x) * 0.1
    this.testarossa.rotation.y += (this.rotationY - this.testarossa.rotation.y) / 30
    // could be done also with tweenmax:
    // TweenLite.to(this.testarossa.rotation, 3, {
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

}


export default new Scene()
