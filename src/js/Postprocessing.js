import * as THREE from 'three'
import { RenderPass, FilmPass, EffectComposer, ShaderPass, FXAAShader, CopyShader } from 'three-addons'
import Scene from './Scene'

const Postprocessing = {
  noiseIntensity: 0.8,
  scanlinesIntensity: 0.05,
  scanlinesCount: 256,


  init() {

    const Composer = new EffectComposer(Scene.Renderer)

    const renderPass = new RenderPass(Scene.Scene, Scene.Camera)
    Composer.addPass(renderPass)

    const shaderFxaa = new ShaderPass(FXAAShader)
    shaderFxaa.uniforms.resolution.value.set(window.innerWidth, window.innerHeight)
    // shaderFxaa.renderToScreen = true
    Composer.addPass(shaderFxaa)

    const effectFilm = new FilmPass(this.noiseIntensity, this.scanlinesIntensity, this.scanlinesCount, false)
    effectFilm.renderToScreen = true
    Composer.addPass(effectFilm)

    // const copyPass = new ShaderPass(CopyShader)
    // copyPass.renderToScreen = true
    // Composer.addPass(copyPass)

    return Composer
  },
}

export default Postprocessing
