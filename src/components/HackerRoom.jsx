import { useGLTF, useTexture } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';

export function HackerRoom(props) {
  const { scene: hackerScene, materials } = useGLTF('/models/computer_and_laptop.glb');
  const { scene: sampleScene } = useGLTF('/models/sample.glb');
  
  // Load all textures
  const textures = useTexture({
    texture1: '/textures/book-cover.jpg', // Current texture
    texture2: '/textures/screen.png',    // Add your image paths here
    texture3: '/textures/yosemite_screen.jpg',
    texture4: '/textures/berkeleyscreen.jpg',
    texture5: '/textures/sf.jpg',
  });

  useEffect(() => {
    if (!hackerScene || !materials) {
      console.error('Scene or materials not loaded from GLB');
      return;
    }

    const materialList = Object.values(materials);
    
    // Define texture mappings - material index to texture
    const textureMappings = [
      { index: 19, texture: textures.texture1 },
      { index: 13, texture: textures.texture4 },
      { index: 26, texture: textures.texture3 },
      { index: 11, texture: textures.texture3 },
      { index: 12, texture: textures.texture5 }
    ];
    
    // Apply all textures
    textureMappings.forEach(({ index, texture }) => {
      const targetMaterial = materialList[index];
      if (targetMaterial) {
        // Configure texture
        texture.encoding = THREE.sRGBEncoding;
        texture.needsUpdate = true;
        
        // Apply texture to material
        targetMaterial.map = texture;
        
        // Adjust brightness properties
        if (index === 11) { // For CV texture specifically
          targetMaterial.toneMapped = true;
          targetMaterial.emissive = new THREE.Color(0x000000);
          targetMaterial.emissiveIntensity = 0;
        }
        
        targetMaterial.needsUpdate = true;
      } else {
        console.warn(`Material at index ${index} not found`);
      }
    });

  }, [hackerScene, materials, textures]);

  return (
    <group {...props}>
      {/* Global ambient light */}
      <ambientLight intensity={1} />


      {/* Light focused on sampleScene */}
      {/* <spotLight
        position={[70, 80, -50]} // above and in front of sample model
        angle={0.5}
        penumbra={0.5}
        intensity={200}
        target-position={[70, 42, -90]}
        castShadow
      /> */}

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
