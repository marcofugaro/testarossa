import * as THREE from 'three'
import OBJLoader from 'three-obj-loader'

// let's add the mothod OBJLoader to THREE
OBJLoader(THREE)

// a promisified Three.js OBJLoader
export function loadObj(url) {
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
export function loadImg(url) {
  return new Promise((resolve, reject) => {
    const loader = new THREE.ImageLoader()
    loader.load(url, (obj) => {
      resolve(obj)
    },
    () => {},
    () => reject(new Error('Failed to load Image')))
  })
}
