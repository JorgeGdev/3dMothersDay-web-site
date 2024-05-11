import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Suspense, useRef, useState } from "react"
import { Text, useGLTF, Environment, SpotLight } from "@react-three/drei"
import { EffectComposer, DepthOfField } from "@react-three/postprocessing"


function Flower({ z }){

    const boxRef = useRef()
    const { nodes, materials } = useGLTF('/lily.glb')
    const { viewport, camera } = useThree()
    const { width, height } = viewport.getCurrentViewport(camera, [ 0, 0, z]) 

    const [data] = useState({
        x:THREE.MathUtils.randFloatSpread(2),
        y:THREE.MathUtils.randFloatSpread(height),
        rX:Math.random() * Math.PI,
        rY:Math.random() * Math.PI,
        rZ:Math.random() * Math.PI,

    })
    

    useFrame((state)=>
        {

            boxRef.current.rotation.set((data.rX += 0.001), (data.rY += 0.002), (data.rZ += 0.001))
            boxRef.current.position.set(data.x * width, (data.y += 0.025), z)

            if(data.y > height)
                {
                    data.y = -height
                }
            
            
        })

    return <>
    

    <mesh
        castShadow
        receiveShadow
        ref={boxRef}
        scale={0.030}
        geometry={nodes['Cone009_Material_#26_0'].geometry}
        material={materials.Material_26}
        position={[41.59, 39.844, -21.08]}
        rotation={[-Math.PI / 2, 0, 0]}
      />

    </>

} 




export default function App({count = 100, depth = 80})
{

    return <Canvas gl={{alpha:false}} camera={{near:0.01, far:110, fov: 30 }} >
        <color args={["#020202"]} attach="background" />
        
        
        <SpotLight position={[10, 10, 10]} intensity={1} />
        <Suspense fallback={null}>
        
        <Environment preset="studio" />
        {Array.from({length: count}, (_, i)=>(<Flower key={i} z={(-i / count ) * depth - 20} />))}
        <EffectComposer>
            <DepthOfField target={[0, 0, depth / 2]} focalLength={0.5} bokehScale={5} height={700} />
        </EffectComposer>
        </Suspense>
    </Canvas>
}