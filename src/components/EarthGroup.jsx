import { useFrame, useLoader } from '@react-three/fiber'
import React from 'react'
import { useRef } from 'react';
import { TextureLoader } from 'three'

const EarthGroup = ({isPaused, elapsed, onSelect}) => {
    const earthTexture = useLoader(TextureLoader, '/textures/earth.png');
    const moonTexture = useLoader(TextureLoader, '/textures/moon.png');

    const earthGroupRef = useRef();
    const moonGroupRef = useRef();
    const earthMeshRef = useRef();

    useFrame((state, delta) => {
        if(isPaused) return;

        // Earth orbits around the sun
        const earthOrbitAngle = elapsed * 1.0;
        earthGroupRef.current.position.x = Math.cos(earthOrbitAngle) * 6;
        earthGroupRef.current.position.z = Math.sin(earthOrbitAngle) * 6;
        earthMeshRef.current.rotation.y += delta * 0.8;

        // Moon orbits around Earth
        const moonOrbitAngle = elapsed * 3.0;
        moonGroupRef.current.rotation.y = moonOrbitAngle;
    })

  return (
    <group ref={earthGroupRef}>
        <mesh 
            onClick={(e) => {
                console.log("Earth mesh clicked!");
                e.stopPropagation();
                onSelect("Earth")
            }} 
            ref={earthMeshRef}
            castShadow={true}
            receiveShadow={true}
        >
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial map={earthTexture} />
        </mesh>

        {/* Moon orbit group */}
        <group ref={moonGroupRef}>
            <mesh 
                position={[1.2, 0, 0]}  // Dist earth and moon: 1.2
                onClick={(e) => {
                    console.log("Moon mesh clicked!");
                    e.stopPropagation();
                    onSelect("Moon")
                }}
                castShadow={true}
                receiveShadow={true}
            >
                <sphereGeometry args={[0.1, 32, 32]} />
                <meshStandardMaterial map={moonTexture} />
            </mesh>
        </group>
    </group>
  )
}

export default EarthGroup;