import { useGLTF, useTexture } from '@react-three/drei';
import { useEffect } from 'react';

export function HackerRoom(props) {
  const { scene: hackerScene, materials } = useGLTF('/models/computer_and_laptop.glb');
  const { scene: sampleScene } = useGLTF('/models/sample.glb');
  const newTexture = useTexture('/textures/Francisco.jpg');

  useEffect(() => {
    if (!hackerScene || !materials) {
      console.error('Scene or materials not loaded from GLB');
      return;
    }

    const materialList = Object.values(materials);
    const targetMaterial = materialList[19];

    if (targetMaterial) {
      targetMaterial.map = newTexture;
      targetMaterial.needsUpdate = true;
    } else {
      console.warn('Material at index 19 not found');
    }
  }, [hackerScene, materials, newTexture]);

  return (
<group {...props}>
  {/* Global ambient light */}
  <ambientLight intensity={2} />

  {/* Light for hackerScene */}
  <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

  {/* Light focused on sampleScene */}
  <spotLight
    position={[70, 80, -50]} // above and in front of sample model
    angle={0.5}
    penumbra={0.5}
    intensity={200}
    target-position={[70, 42, -90]}
    castShadow
  />

  {/* Main model */}
  <primitive
    object={hackerScene}
    position={[0, 30, 0]}
    scale={[2.5, 2.5, 2.5]}
    rotation={[0, Math.PI / 0.2, 0]}
  />

  {/* Additional model */}
  <primitive
    object={sampleScene}
    position={[40, 42, -60]}
    scale={[25, 25, 25]}
    rotation={[0, 10, 0]}
  />
</group>

  );
}

useGLTF.preload('/models/computer_and_laptop.glb');
useGLTF.preload('/models/sample.glb');
