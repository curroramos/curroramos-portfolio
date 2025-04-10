import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

const Developer = (props) => {
  const group = useRef();
  const { scene } = useGLTF('/models/animations/developer.glb');

  return <primitive ref={group} object={scene} {...props} />;
};

useGLTF.preload('/models/animations/developer.glb');

export default Developer;
