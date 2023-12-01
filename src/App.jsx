import {
  ContactShadows,
  OrbitControls,
  PerspectiveCamera,
  RenderTexture,
  Text,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

function Cube() {
  const textRef = useRef();
  useFrame(
    (state) =>
      (textRef.current.position.x = Math.sin(state.clock.elapsedTime) * 2)
  );
  return (
    <mesh>
      <boxGeometry />
      <meshStandardMaterial>
        <RenderTexture attach="map" anisotropy={16}>
          <PerspectiveCamera
            makeDefault
            manual
            aspect={1 / 1}
            position={[0, 0, 5]}
          />
          <color attach="background" args={["orange"]} />
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 5]} />
          <Text fontSize={4} ref={textRef} color={"Black"}>
            8008
          </Text>
          <Dodecahedron />
        </RenderTexture>
      </meshStandardMaterial>
    </mesh>
  );
}

function Dodecahedron(props) {
  const meshRef = useRef();
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  useFrame(
    (state) =>
      (meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime) * 2)
  );
  return (
    <group {...props}>
      <mesh
        ref={meshRef}
        scale={clicked ? 2.5 : 1}
        onClick={() => click(!clicked)}
        onPointerOver={() => {
          hover(true);
        }}
        onPointerOut={() => {
          hover(false);
        }}
      >
        <dodecahedronGeometry args={[0.75]} />
        <meshStandardMaterial color={hovered ? "Hotpink" : "skyblue"} />
      </mesh>
    </group>
  );
}

function App() {
  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 25 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
      <Cube />
      <Dodecahedron position={[0, 1, 0]} scale={0.2} />
      <Dodecahedron position={[0, -1, 0]} scale={0.1} />
      <Dodecahedron position={[-1, 0, 0]} scale={0.1} />
      <Dodecahedron position={[1, 0, 0]} scale={0.1} />
      <ContactShadows
        frames={1}
        position={[0, -0.5, 0]}
        blur={1}
        opacity={0.75}
      />
      <ContactShadows
        frames={1}
        position={[0, -0.5, 0]}
        blur={3}
        color={"orange"}
      />
      <OrbitControls enableRotate dampingFactor={0.05} enableZoom /> {/*enableRotate:Hold and click to rotate object dampingFactor is Friction to Stop the rotation  */}
      
    </Canvas>
  );
}

export default App;
