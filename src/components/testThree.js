import * as THREE from "three";
import { useEffect, useState, useRef } from "react";
import Loading from "@/components/Loading";

export default function TestThree() {
    const [loading, setLoading] = useState(true);
    const [texturesLoaded, setTexturesLoaded] = useState(false);
    const canvasRef = useRef(null);
    const rendererRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const animationRef = useRef(null);

    const loadingManager = new THREE.LoadingManager();

    // Fonction pour déterminer la qualité en fonction de l'appareil
    const getDeviceQuality = () => {
        // Vérifier si le dispositif est mobile
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        );

        // Vérifier les capacités GPU via le nombre de pixels max
        const pixelRatio = window.devicePixelRatio || 1;
        const screenWidth = window.screen.width * pixelRatio;
        const screenHeight = window.screen.height * pixelRatio;
        const totalPixels = screenWidth * screenHeight;

        // Déterminer la qualité
        if (isMobile || totalPixels < 1000000) {
            return "low";
        } else if (totalPixels < 4000000) {
            return "medium";
        } else {
            return "high";
        }
    };

    useEffect(() => {
        // Déterminer la qualité de l'appareil
        const deviceQuality = getDeviceQuality();

        // Configurer les paramètres de qualité
        const qualitySettings = {
            low: {
                segments: 32,
                textureScale: 0.25,
                pixelRatio: 1
            },
            medium: {
                segments: 48,
                textureScale: 0.5,
                pixelRatio: 1
            },
            high: {
                segments: 64,
                textureScale: 1,
                pixelRatio: window.devicePixelRatio || 1
            }
        };

        const quality = qualitySettings[deviceQuality];

        // Scène & Caméra
        sceneRef.current = new THREE.Scene();
        cameraRef.current = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        cameraRef.current.position.z = 3;

        // Renderer avec optimisations
        rendererRef.current = new THREE.WebGLRenderer({
            antialias: deviceQuality !== "low",
            powerPreference: "high-performance",
            precision: deviceQuality === "low" ? "lowp" : "mediump"
        });

        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
        rendererRef.current.setPixelRatio(quality.pixelRatio);

        // Optimisations du renderer
        rendererRef.current.sortObjects = false;

        // Lumière
        const light = new THREE.DirectionalLight(0xFFFFFF, 1);
        light.position.set(-4, 2, 4);
        sceneRef.current.add(light);

        // Loading Manager
        loadingManager.onLoad = () => {
            setTexturesLoaded(true);
        };

        // Charger les textures avec redimensionnement selon la qualité
        const textureLoader = new THREE.TextureLoader(loadingManager);
        const loadTexture = (url) => {
            const texture = textureLoader.load(url);
            if (quality.textureScale < 1) {
                texture.minFilter = THREE.LinearFilter;
                texture.generateMipmaps = false;
            }
            return texture;
        };

        const dayTexture = loadTexture("/textures/earth/textures/2_no_clouds_16k.jpeg");
        const nightTexture = loadTexture("/textures/earth/textures/NIGHT.jpg");
        const cloudsTexture = loadTexture("/textures/earth/textures/fair_clouds_8k.jpeg");

        // Matériau de la Terre
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

        // Planète avec géométrie adaptée à la qualité
        const earthGeometry = new THREE.SphereGeometry(1, quality.segments, quality.segments);
        const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
        sceneRef.current.add(earthMesh);

        // Matériau des Nuages
        const cloudsMaterial = new THREE.ShaderMaterial({
            uniforms: {
                cloudTexture: { value: cloudsTexture },
                lightDirection: { value: light.position.clone().normalize() },
                transitionThreshold: { value: 0.3 },
                fixedOpacity: { value: 0.5 },
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
                    cloudColor.a = fixedOpacity * transition;
                    gl_FragColor = cloudColor;
                }
            `,
            transparent: true,
        });

        // Mesh des nuages avec géométrie adaptée à la qualité
        const cloudsGeometry = new THREE.SphereGeometry(1.01, quality.segments, quality.segments);
        const cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
        sceneRef.current.add(cloudsMesh);

        // Inclinaison de la Terre
        const earthGroup = new THREE.Group();
        earthGroup.add(earthMesh);
        earthGroup.add(cloudsMesh);
        sceneRef.current.add(earthGroup);
        earthGroup.rotation.z = THREE.MathUtils.degToRad(23.5);

        // Animation avec requestAnimationFrame optimisé
        function animate() {
            animationRef.current = requestAnimationFrame(animate);
            earthMesh.rotation.y += 0.0003;
            cloudsMesh.rotation.y += 0.0004;
            rendererRef.current.render(sceneRef.current, cameraRef.current);
        }

        // Gestion du redimensionnement de la fenêtre
        const handleResize = () => {
            if (cameraRef.current && rendererRef.current) {
                cameraRef.current.aspect = window.innerWidth / window.innerHeight;
                cameraRef.current.updateProjectionMatrix();
                rendererRef.current.setSize(window.innerWidth, window.innerHeight);
            }
        };

        window.addEventListener('resize', handleResize);

        // Démarrer l'animation seulement après le chargement
        if (texturesLoaded) {
            animate();
            setLoading(false);
        }

        // Nettoyage
        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }

            if (rendererRef.current && rendererRef.current.domElement && rendererRef.current.domElement.parentNode) {
                rendererRef.current.domElement.parentNode.removeChild(rendererRef.current.domElement);
            }

            // Libérer la mémoire
            if (earthGeometry) earthGeometry.dispose();
            if (cloudsGeometry) cloudsGeometry.dispose();
            if (earthMaterial) earthMaterial.dispose();
            if (cloudsMaterial) cloudsMaterial.dispose();
            if (dayTexture) dayTexture.dispose();
            if (nightTexture) nightTexture.dispose();
            if (cloudsTexture) cloudsTexture.dispose();
            if (rendererRef.current) rendererRef.current.dispose();
        };
    }, [texturesLoaded]);

    // Une fois le chargement terminé, attacher le renderer au vrai DOM
    useEffect(() => {
        if (!loading && canvasRef.current && rendererRef.current) {
            canvasRef.current.appendChild(rendererRef.current.domElement);
        }
    }, [loading]);

    return (
        <div>
            {loading ? <Loading loadingManager={loadingManager} /> : <div ref={canvasRef} id="planet" />}
        </div>
    );
}