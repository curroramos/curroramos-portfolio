import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { easing } from 'maath';
import { Vector3 } from 'three';

const HeroCamera = ({ isMobile, focusComputer, children }) => {
  const group = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const { gl } = useThree();
  
  // Define fixed camera positions and rotations
  const defaultPosition = new Vector3(0, 0, 20);
  const computerPosition = new Vector3(0, -1.0, 3.0); // Adjust as needed

  // Set up click and drag event listeners
  useEffect(() => {
    if (focusComputer) {
      const handleMouseDown = (e) => {
        setIsDragging(true);
        setPreviousMousePosition({ x: e.clientX, y: e.clientY });
      };

      const handleMouseMove = (e) => {
        if (isDragging) {
          const deltaX = (e.clientX - previousMousePosition.x) * 0.005;
          // Only use horizontal movement (ignore deltaY)
          
          setRotation({
            x: 0, // Keep x rotation at 0 - no vertical rotation
            y: rotation.y + deltaX, // Only update y rotation (horizontal)
          });
          
          setPreviousMousePosition({ x: e.clientX, y: e.clientY });
        }
      };

      const handleMouseUp = () => {
        setIsDragging(false);
      };

      const canvas = gl.domElement;
      canvas.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      return () => {
        canvas.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [focusComputer, isDragging, previousMousePosition, rotation, gl]);
  
  useFrame((state, delta) => {
    // Get camera
    const camera = state.camera;
    
    if (focusComputer) {
      // Direct camera control when focusing on computer
      easing.damp3(camera.position, [computerPosition.x, computerPosition.y, computerPosition.z], 0.25, delta);
      
      // Fixed target for computer view
      camera.lookAt(0, 0, 0);
      
      // Apply only horizontal rotation when in computer view
      if (group.current) {
        easing.dampE(
          group.current.rotation,
          [0, rotation.y, 0], // Force x rotation to 0
          0.5,
          delta
        );
      }
    } else {
      // Reset to default position
      easing.damp3(camera.position, [defaultPosition.x, defaultPosition.y, defaultPosition.z], 0.25, delta);
      
      // Default lookAt (center of scene)
      camera.lookAt(0, 0, 0);
      
      // Apply mouse movement in default view only
      if (!isMobile && group.current) {
        const targetRotationX = -state.pointer.y / 3;
        const targetRotationY = state.pointer.x / 5;
        
        // Apply rotation to group, not camera
        easing.dampE(group.current.rotation, [targetRotationX, targetRotationY, 0], 0.25, delta);
      }
    }
  });

  return <group ref={group}>{children}</group>;
};

export default HeroCamera;