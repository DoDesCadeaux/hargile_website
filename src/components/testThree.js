"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function TestThree() {
    return (
        <Canvas style={{ width: "100vw", height: "50vh" }}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="hotpink" />
            </mesh>
            <OrbitControls />
        </Canvas>
    );
}
