import {
  AmbientLight,
  DirectionalLight,
  Group,
  PerspectiveCamera,
  Scene,
  sRGBEncoding,
  WebGLRenderer,
} from "three"
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import ponyModelUrl from "./models/pony.glb"
import ponyDracoModelUrl from "./models/pony-draco.glb"
import monsterModelUrl from "./models/monster.glb"
import monsterDracoModelUrl from "./models/monster-draco.glb"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

async function loadModel(url: string): Promise<GLTF> {
  const loader = new GLTFLoader()
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath("/draco/gltf/")
  loader.setDRACOLoader(dracoLoader)
  return new Promise((resolve, reject) => {
    loader.load(url, (model) => {
      resolve(model)
    },
    undefined,
    (e) => {
      reject(e)
    })
  })
}

export class Renderer {

  #renderer: WebGLRenderer
  #camera: PerspectiveCamera
  #scene: Scene
  #controls: OrbitControls

  constructor(width: number, height: number) {
    const mainRenderer = new WebGLRenderer({
      antialias: true,
    })
    mainRenderer.outputEncoding = sRGBEncoding
    mainRenderer.setPixelRatio(window.devicePixelRatio)
    mainRenderer.setClearAlpha(0)
    mainRenderer.setSize(width, height)

    const scene = new Scene()
    const angle = 45
    const aspect = width / height
    const camera = new PerspectiveCamera(angle, aspect, 1, 10000)
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0)

    const mainLight = new DirectionalLight(0xffffff, 1)
    mainLight.position.set(0, 1, 1)
    mainLight.lookAt(0, 0, 0)
    scene.add(mainLight)

    this.#controls = new OrbitControls(camera, mainRenderer.domElement)

    const amb = new AmbientLight(0xffffff, 2)
    scene.add(amb)

    this.#renderer = mainRenderer
    this.#camera = camera
    this.#scene = scene
  }

  render() {
    this.#renderer.render(this.#scene, this.#camera)
  }

  async loadModel(draco: boolean) {
    const gltf = await loadModel((draco ? monsterDracoModelUrl : monsterModelUrl) + "?random=" + Math.random())
    const container = new Group()
    container.add(gltf.scene)
    this.#scene.add(container)
  }

  getCanvas() {
    return this.#renderer.domElement
  }
}