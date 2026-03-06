import React, {useEffect} from 'react'
import * as THREE from 'three'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, useTexture, useAnimations } from '@react-three/drei'
import { log } from 'three'

const Dog = () => {

    const model = useGLTF("/models/dog.drc.glb")
    
    useThree(({camera,scene,gl})=> {
        console.log(camera.position)
        camera.position.z = 0.55,
        gl.toneMapping = THREE.ReinhardToneMapping,
        gl.outputColorSpace = THREE.SRGBColorSpace
    })


   const {actions} =  useAnimations(model.animations, model.scene)   
   
  useEffect(() => {
  const action = Object.values(actions || {})[0]
  action?.play()
}, [actions])

    // const texture = useTexture({
    //     normalMap:"/dog_normals.jpg",
    //     sampleMatcap:"/matcap/mat-2.png"
    // })


    const [
        normalMap,
        sampleMatcap    
    ] = useTexture([
        "/dog_normals.jpg",
        "/matcap/mat-2.png"
    ]).map((texture) => {
        texture.flipY = false
        texture.colorSpace = THREE.SRGBColorSpace
        return texture
    })


      
    const dogMaterial = new THREE.MeshMatcapMaterial({
                normalMap: normalMap,
                // color: 0xff00ff,
                matcap: sampleMatcap
            })

  
    model.scene.traverse((child) => {
        if(child.name.includes("DOG")) {
            child.material = dogMaterial
                
        }
        
    })

  return (
      <>
         <primitive object={model.scene} position={[0.25, -0.6, 0]} rotation={[0, Math.PI/3.9, 0]} />
         <directionalLight position={[0,5,5]} color={0xffffff} intensity={10} />
        <OrbitControls/>
      </>
  )
}

export default Dog







