import { Renderer } from "./Renderer"
import "./style.scss"

async function test(numRenders: number, draco: boolean) {
  const start = performance.now()
  const { clientHeight, clientWidth } = document.body
  const renderer = new Renderer(clientWidth, clientHeight)
  document.body.appendChild(renderer.getCanvas())
  await renderer.loadModel(draco)

  const loaded = performance.now()

  await (new Promise<void>((resolve) => {
    let count = 0
    function loop() {
      if (count >= numRenders) {
        resolve()
        return
      }
      renderer.render()
      count += 1
      requestAnimationFrame(loop)
    }
    requestAnimationFrame(loop)
  }))
  const end = performance.now()
  document.body.removeChild(renderer.getCanvas())
  return {
    load: loaded - start,
    render: end - loaded,
  }
}

;(async () => {
  const runs = 5
  const numRenders = 100
  // Change here to switch between draco and non-draco
  const draco = false

  let load = 0
  let render = 0
  for (let i = 0; i < runs; i++) {
    const result = await test(numRenders, draco)
    load += result.load
    render += result.render
  }
  alert(`Load: ${(load / runs).toFixed(1)}ms\nRender: ${(render / runs / numRenders).toFixed(1)}ms`)
})()