"use client";

import * as THREE from "three";
import {useEffect} from "react";
import {canvas} from "framer-motion/m";

// Fonction utilitaire pour créer un objet (Cube, Sphere, Cones, Cylindres, etc...)
export function createObject(scene, geometry, color, positionX) {
    const material = new THREE.MeshPhongMaterial({ color, wireframe: true });
    const object = new THREE.Mesh(geometry, material);
    object.position.x = positionX;
    scene.add(object);
    return object;
}

// Fonction utilitaire pour configurer la lumière
export function createLight(scene) {
    const light_color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(light_color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
}

//Fonction utilitaire pour resize le canva dynamiquement
function resizeRendereToDisplaySize(actualWidth, actualHeight, renderer) {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    const needResize = actualWidth !== newWidth || actualHeight !== newHeight;
    if (needResize) {
        renderer.setSize(newWidth, newHeight);
    }

    return needResize;
}

export default function TestThree() {
    useEffect(() => {
        const scene = new THREE.Scene();
        let userWidth = window.innerWidth;
        let userHeight = window.innerHeight;
        const camera = new THREE.PerspectiveCamera(75, userWidth /
            userHeight, 0.1, 1000);
        const canvas = document.querySelector('#planet');
        const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        //Initialiser la lumière
        createLight(scene);

        //Créer les objets
        const geometry = new THREE.SphereGeometry(1, 50, 50);
        const objects = [
            createObject(scene, geometry, 0x882233, 0),
        ]

        //Ajouter un groupe pour notre objet Terre
        const earthGroup = new THREE.Group();
        earthGroup.add(objects[0]);
        scene.add(earthGroup);

        //Incliner l'axe du groupe
        earthGroup.rotation.z = THREE.MathUtils.degToRad(23.5);
        camera.position.z = 4;

        //Animation des objets
        function animate() {
            requestAnimationFrame(animate);

            if (resizeRendereToDisplaySize(userWidth, userHeight, renderer)) {
                const newUserWidth = window.innerWidth;
                const newUserHeight = window.innerHeight;
                camera.aspect = newUserWidth / newUserHeight;
                camera.updateProjectionMatrix();
            }

            objects.forEach((object, ndx) => {
                object.rotation.y += 0.005;
            })
            renderer.render(scene, camera);
        }

        animate();

    }, [])

    return (
        <div>
            <canvas id={'planet'}></canvas>

        </div>
    );
}
