import { useFrame, useLoader } from '@react-three/fiber'
import React from 'react'
import { useRef } from 'react';
import { TextureLoader } from 'three'

const Planet = ({name, radius, distance, speed, elapsed, isPaused, onSelect}) => {
    const texture = useLoader(
        TextureLoader,
        `textures/new/${name.toLowerCase()}.webp`
    );
    const meshRef = useRef();

    useFrame((state, delta) => {
        if(isPaused) return;

        
        const angle = elapsed * speed;
        
        meshRef.current.position.x = Math.cos(angle) * distance;
        meshRef.current.position.z = Math.sin(angle) * distance;
        meshRef.current.rotation.y += delta * 0.8;
    })

  return (
        <mesh 
            onClick={() => onSelect(name)} 
            ref={meshRef} 
            position={[distance, 0, 0]}
            castShadow={true}
            receiveShadow={true}
        >
            <sphereGeometry args={[radius, 32, 32]} />
            <meshStandardMaterial map={texture} />
        </mesh>
    );
};

export default Planet