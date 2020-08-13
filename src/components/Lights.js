import React, { useRef } from 'react'
import { useFrame } from 'react-three-fiber'
import Shadow from './Shadow'

export default function Lights() {
  const ref = useRef()
  useFrame(() => (ref.current.rotation.y += 0.02))
  return (
    <>
      <pointLight position={[0, 10, -10]} intensity={2} />
      <group ref={ref}>
        <pointLight intensity={1} position={[0, 10, 10]} />
      </group>
    </>
  )
}
