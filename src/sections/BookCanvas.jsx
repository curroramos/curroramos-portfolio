// BookCanvas.jsx
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import { Suspense } from 'react';
import { Experience } from './Experience';
import { UI } from './UI';

const BookCanvas = () => {
  return (
    <>
      <UI />
      <Loader />
      <Canvas
        shadows
        camera={{
          position: [-0.5, 1, window.innerWidth > 800 ? 4 : 9],
          fov: 45,
        }}
        style={{ height: '100vh', width: '100%' }}
      >
        <group position-y={0}>
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </group>
      </Canvas>
    </>
  );
};

export default BookCanvas;
