import { useRef, useEffect } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const DemoComputer = (props) => {
  const group = useRef();
  const { scene, materials } = useGLTF('/models/computer.glb');
  const newTexture = useTexture('/textures/DSC00680.jpg');

  useEffect(() => {
    const screenMaterial = materials.screen;

    if (screenMaterial) {
      // Ensure texture uses correct color encoding
      newTexture.encoding = THREE.sRGBEncoding;
      newTexture.center.set(0.5, 0.5);
      newTexture.rotation = Math.PI / 2;

      // Apply to base color only
      screenMaterial.map = newTexture;
      screenMaterial.emissiveMap = null;
      screenMaterial.emissive.set(0x000000);
      screenMaterial.emissiveIntensity = 0;

      screenMaterial.needsUpdate = true;
      console.log('✅ Texture applied without emissive, using real color');
    }
  }, [materials, newTexture]);

  return (
    <primitive
      ref={group}
      object={scene}
      scale={[3, 3, 3]}
      position={[0, 0.5, 0]}
      rotation={[0, 0, 0]}
      {...props}
    />
  );
};

useGLTF.preload('/models/computer.glb');
useTexture.preload('/textures/DSC00680.jpg');

export default DemoComputer;
