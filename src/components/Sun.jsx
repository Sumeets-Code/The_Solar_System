import React from 'react'
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const Sun = ({onSelect}) => {
    const sunTexture = useLoader(TextureLoader, 'textures/new/sun.webp');

  return (
    <mesh onClick={(e) => {
      e.stopPropagation();
      onSelect("Sun")
    }}>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshBasicMaterial map={sunTexture} />
    </mesh>
  )
}

export default Sun