import { useFrame, useLoader } from '@react-three/fiber'
import React from 'react'
import { useRef } from 'react';
import { TextureLoader } from 'three'

const SaturnGroup = ({onSelect, elapsed, isPaused}) => {
    const saturnTexture = useLoader(TextureLoader, 'textures/new/saturn.webp');

    const saturnRingTexture = useLoader(TextureLoader, 'textures/new/Saturn_ring.webp');

    const grpRef = useRef();

    useFrame((state, delta) => {
        if(isPaused) return;

        const angle = elapsed * 0.3;
        grpRef.current.position.x = Math.cos(angle) * 16;       // Distance from Sun
        grpRef.current.position.z = Math.sin(angle) * 16;
        grpRef.current.rotation.y += delta * 0.8;
    })
  return (
    <group ref={grpRef}>
        <mesh onClick={(e) => {
            e.stopPropagation();
            onSelect("Saturn")
            }}
            castShadow={true}
            receiveShadow={true}
        >
            <sphereGeometry args={[1.0, 32, 32]} />
            <meshStandardMaterial map={saturnTexture} />
        </mesh>

        <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.2, 2.0, 64]} />
            <meshStandardMaterial 
                map={saturnRingTexture} 
                side={2} 
                transparent={true} 
            />
        </mesh>
    </group>
  )
}

export default SaturnGroup