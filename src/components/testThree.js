import * as THREE from "three";
import { useEffect } from "react";

export default function TestThree() {
    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const canvas = document.querySelector('#planet');
        const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Lumière
        const light = new THREE.DirectionalLight(0xFFFFFF, 1);
        light.position.set(-4, 2, 4);
        scene.add(light);

        // Charger les textures
        const textureLoader = new THREE.TextureLoader();
        const dayTexture = textureLoader.load("/textures/earth/textures/2_no_clouds_16k.jpeg");
        const nightTexture = textureLoader.load("/textures/earth/textures/NIGHT.jpg");
        const bumpMap = textureLoader.load("/textures/earth/textures/elev_bump.jpeg");
        const cloudsTexture = textureLoader.load("/textures/earth/textures/fair_clouds_8k.jpeg");

        // Terre avec shader personnalisé
        const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
        const earthMaterial = new THREE.ShaderMaterial({
            uniforms: {
                dayTexture: { value: dayTexture },
                nightTexture: { value: nightTexture },
                lightDirection: { value: light.position.clone().normalize() },
                nightIntensity: { value: 3 },
                transitionThreshold: { value: 0.3 },
            },
            vertexShader: `
                varying vec3 vNormal;
                varying vec3 vPosition;
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    vNormal = normalize(normalMatrix * normal);
                    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
                    gl_Position = projectionMatrix * vec4(vPosition, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D dayTexture;
                uniform sampler2D nightTexture;
                uniform vec3 lightDirection;
                uniform float nightIntensity;
                uniform float transitionThreshold;
                varying vec3 vNormal;
                varying vec3 vPosition;
                varying vec2 vUv;
                void main() {
                    float intensity = dot(vNormal, lightDirection);
                    float transition = smoothstep(transitionThreshold, transitionThreshold + 0.1, intensity);
                    vec4 dayColor = texture2D(dayTexture, vUv);
                    vec4 nightColor = texture2D(nightTexture, vUv) * nightIntensity;
                    gl_FragColor = mix(nightColor, dayColor, transition);
                }
            `,
        });
        const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
        scene.add(earthMesh);

        // Nuages avec opacité fixe
        const cloudsGeometry = new THREE.SphereGeometry(1.01, 64, 64);
        const cloudsMaterial = new THREE.ShaderMaterial({
            uniforms: {
                cloudTexture: { value: cloudsTexture },
                lightDirection: { value: light.position.clone().normalize() },
                transitionThreshold: { value: 0.3 },
                fixedOpacity: { value: 0.5 }, // Opacité fixe
            },
            vertexShader: `
                varying vec3 vNormal;
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    vNormal = normalize(normalMatrix * normal);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D cloudTexture;
                uniform vec3 lightDirection;
                uniform float transitionThreshold;
                uniform float fixedOpacity;
                varying vec3 vNormal;
                varying vec2 vUv;
                void main() {
                    float intensity = dot(vNormal, lightDirection);
                    float transition = smoothstep(transitionThreshold, transitionThreshold + 0.1, intensity);
                    vec4 cloudColor = texture2D(cloudTexture, vUv);
                    cloudColor.a = fixedOpacity * transition; // Utiliser une opacité fixe
                    gl_FragColor = cloudColor;
                }
            `,
            transparent: true,
        });

        const cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial);

        scene.add(cloudsMesh);

        // Inclinaison de la Terre
        const earthGroup = new THREE.Group();
        earthGroup.add(earthMesh);
        earthGroup.add(cloudsMesh);
        scene.add(earthGroup);
        earthGroup.rotation.z = THREE.MathUtils.degToRad(23.5);

        camera.position.z = 3;

        // Animation
        function animate() {
            requestAnimationFrame(animate);
            earthMesh.rotation.y += 0.0003;
            cloudsMesh.rotation.y += 0.0004;
            renderer.render(scene, camera);
        }

        animate();
    }, []);

    return <canvas id="planet"></canvas>;
}