import * as THREE from 'three'
import { loadObj, loadImg } from './loaders'

const Testarossa = {

  // let's load the testarossa object
  async load() {
    // let's load the resources
    const [ obj, image ] = await Promise.all([
      loadObj('testarossa.obj'),
      loadImg('images/no-textures.jpg'),
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


    // let's make it bigger
    mesh.geometry.scale(4, 4, 4)

    return obj
  }
}

export default Testarossa