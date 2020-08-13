import { useMemo, useEffect } from 'react'
import { useLoader, useThree, useFrame } from 'react-three-fiber'
import {
  SMAAImageLoader,
  BlendFunction,
  KernelSize,
  BloomEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
  SMAAEffect,
  GammaCorrectionEffect,
  BokehEffect
} from 'postprocessing'

// Fix smaa loader signature
// Will not be neccessary next version: https://github.com/vanruesc/postprocessing/commit/f05bb85fc9548458ee5e4a24026f308f0a8b72d4
const _load = SMAAImageLoader.prototype.load
SMAAImageLoader.prototype.load = function(_, set) {
  return _load.bind(this)(set)
}

export default function Effects() {
  const { gl, scene, camera, size } = useThree()
  const composer = useMemo(() => {
    const composer = new EffectComposer(gl)
    composer.addPass(new RenderPass(scene, camera))
    const bloom = new BloomEffect({
      blendFunction: BlendFunction.ADD,
      kernelSize: KernelSize.MEDIUM,
      luminanceThreshold: 0.1,
      height: 100
    })
    bloom.blendMode.opacity.value = 2
    const bokehEffect = new BokehEffect({
      focus: 0.8,
      dof: 0.10,
      aperture: 0.2,
      maxBlur: 0.0075
    })
    composer.addPass(new EffectPass(camera,bokehEffect))
    const effectPass = new EffectPass(camera, bloom)
    effectPass.renderToScreen = true
    composer.addPass(effectPass)
    return composer
  }, [])
  useEffect(() => void composer.setSize(size.width, size.height), [size])
  return useFrame((_, delta) => composer.render(delta), 1)
}
