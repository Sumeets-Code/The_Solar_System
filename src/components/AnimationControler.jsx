import { useFrame } from '@react-three/fiber'
import React from 'react'

const AnimationControler = ({isPuased, setElapsed}) => {
    useFrame((state, delta) => {
        if(!isPuased) {
            setElapsed((elapsed) => elapsed + delta);
        }
    });

  return null;
};

export default AnimationControler