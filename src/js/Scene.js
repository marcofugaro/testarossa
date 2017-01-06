import * as THREE from 'three'
import OBJLoader from 'three-obj-loader'
import { TweenLite } from 'gsap'

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
    this.getInputPosition = this.getInputPosition.bind(this)

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
    this.Camera.position.set(0, 3, -27)
    this.Camera.lookAt(new THREE.Vector3(0, 0, 0))

    // let's add the lights
    const hemisphereLight = new THREE.HemisphereLight(0xffffff)
    const pointLight = new THREE.PointLight(0xffffff, 1, 100)
    pointLight.position.set(10, 10, 10)
    this.Scene.add(hemisphereLight)
    this.Scene.add(pointLight)

    // add the resize listener
    window.addEventListener('resize', this.fitRendererToElement.bind(this, this.container))



    this.loadTestarossa() // maybe use async constructor?
      .then((obj) => {
        this.testarossa = obj

        // attach the interaction events
        this.addEventListeners()

        // let's start the render loop
        requestAnimationFrame(this.render)
      })
  }


  addEventListeners() {
    document.addEventListener('mousemove', this.getInputPosition)
  }


  // get the position either of the mouse or of the accelerometer
  getInputPosition(e) {
    const mouseX = e.pageX

    this.posX = - (mouseX - this.horizontalCenter) * this.STREET_FACTOR
  }


  // the render loop
  render() {
    // this.testarossa.rotation.y += 0.05

    // calculate the car left and right position
    // (screw basic lerping, let's use tweenmax!)
    // this.testarossa.position.x += (this.posX - this.testarossa.position.x) / 20
    TweenLite.to(this.testarossa.position, this.SPEED, {
      x: this.posX,
      ease: Power1.easeOut,
    })


    // calculate the car rotation when driving
    this.rotationY = (this.posX - this.testarossa.position.x) * 0.1
    // (screw basic lerping, let's use tweenmax!)
    // this.testarossa.rotation.y += (this.rotationY - this.testarossa.rotation.y) / 20
    TweenLite.to(this.testarossa.rotation, this.SPEED, {
      y: this.rotationY,
      ease: Power1.easeOut,
    })

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
      () => reject(new Error('Failed to load Object')))
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
    mesh.geometry.translate(-1, -1, 4)


    // let's flip it 180
    mesh.geometry.rotateY(Math.PI)


    // let's make it bigger
    obj.scale.set(4, 4, 4)

    this.Scene.add(obj)
    return obj
  }
}


export default new Scene()
