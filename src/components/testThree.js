import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { useEffect, useState, useRef } from "react";
import Loading from "@/components/Loading";

export default function TestThree() {
    const [loading, setLoading] = useState(true);
    const [texturesLoaded, setTexturesLoaded] = useState(false);
    const canvasRef = useRef(null);
    const rendererRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const controlsRef = useRef(null);
    const animationRef = useRef(null);
    const statsRef = useRef(null);

    const loadingManager = new THREE.LoadingManager();

    // Fonction pour déterminer la qualité en fonction de l'appareil
    const getDeviceQuality = () => {
        // Vérifier si le dispositif est mobile
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        );

        // Vérifier les capacités GPU via le nombre de pixels max
        const pixelRatio = window.devicePixelRatio || 1;
        const screenWidth = window.innerWidth * pixelRatio;
        const screenHeight = window.innerHeight * pixelRatio;
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

        // Initialisation des contrôles de caméra pour la rotation et le zoom
        controlsRef.current = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
        controlsRef.current.enableDamping = true; // Pour un mouvement plus fluide
        controlsRef.current.dampingFactor = 0.05;
        controlsRef.current.rotateSpeed = 0.5; // Vitesse de rotation
        controlsRef.current.zoomSpeed = 0.7; // Vitesse de zoom

        // Limites de zoom
        controlsRef.current.minDistance = 1.5; // Zoom max (plus proche)
        controlsRef.current.maxDistance = 10; // Zoom min (plus loin)

        // Désactiver la translation et inverser les contrôles si nécessaire
        controlsRef.current.enablePan = false; // Désactiver la translation (déplacement latéral)
        controlsRef.current.autoRotate = false; // Désactiver la rotation automatique

        // Initialisation du moniteur de performance (FPS)
        statsRef.current = new Stats();
        statsRef.current.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        statsRef.current.dom.style.position = 'absolute';
        statsRef.current.dom.style.top = '0px';
        statsRef.current.dom.style.left = '0px';
        statsRef.current.dom.style.zIndex = '100';

        // Lumière
        const light = new THREE.DirectionalLight(0xFFFFFF, 1);
        light.position.set(-5, 2, 2);
        sceneRef.current.add(light);

        // Loading Manager
        loadingManager.onLoad = () => {
            setTexturesLoaded(true);
        };

        // Revenir aux paramètres originaux pour les textures
        const textureLoader = new THREE.TextureLoader(loadingManager);

        // Chargement simple sans modifications des paramètres par défaut de Three.js
        const dayTexture = textureLoader.load("/textures/earth/textures/2_no_clouds_16k.jpeg");
        const nightTexture = textureLoader.load("/textures/earth/textures/NIGHT.jpg");
        const cloudsTexture = textureLoader.load("/textures/earth/textures/fair_clouds_8k.jpeg");

        // Définir les paramètres après le chargement pour stabiliser les textures
        nightTexture.minFilter = THREE.LinearFilter;
        nightTexture.magFilter = THREE.LinearFilter;
        nightTexture.generateMipmaps = false;

        // Matériau de la Terre
        // Revenir à une approche plus simple du matériau pour éviter les clignotements
        const earthMaterial = new THREE.ShaderMaterial({
            uniforms: {
                dayTexture: { value: dayTexture },
                nightTexture: { value: nightTexture },
                lightDirection: { value: light.position.clone().normalize() },
                nightIntensity: { value: 1.2 }, // Valeur plus conservative
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
                varying vec3 vNormal;
                varying vec3 vPosition;
                varying vec2 vUv;
                void main() {
                    // Calcul de l'intensité lumineuse basée sur l'angle avec la source de lumière
                    float intensity = dot(vNormal, lightDirection);
                    
                    // Transition avec des valeurs fixes comme dans la version originale
                    float transition = smoothstep(0.0, 0.4, intensity);
                    
                    // Échantillonnage des textures
                    vec4 dayColor = texture2D(dayTexture, vUv);
                    vec4 nightColor = texture2D(nightTexture, vUv) * nightIntensity;
                    
                    // Mélange des textures jour/nuit
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
                transitionThreshold: { value: 0.03 },
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

        // Animation avec vitesse de rotation ralentie et rendu stable
        let lastTime = 0;
        function animate(time) {
            animationRef.current = requestAnimationFrame(animate);

            // Mise à jour des statistiques FPS
            if (statsRef.current) {
                statsRef.current.begin();
            }

            // Calcul du delta pour une animation indépendante du taux de rafraîchissement
            const delta = lastTime ? (time - lastTime) / 1000 : 0;
            lastTime = time;

            // Utilisation d'un delta fixe pour éviter les fluctuations qui pourraient causer des clignotements
            const fixedDelta = Math.min(delta, 0.016); // Max 60fps équivalent

            // Rotation des objets (uniquement si les contrôles ne sont pas actifs)
            if (!controlsRef.current.enabled) {
                earthMesh.rotation.y += 0.0001 * fixedDelta * 60;
                cloudsMesh.rotation.y += 0.00015 * fixedDelta * 60;
            } else {
                // Si nous utilisons les contrôles, nous maintenons les nuages en rotation
                cloudsMesh.rotation.y += 0.00005 * fixedDelta * 60;
            }

            // Mettre à jour les contrôles de caméra
            controlsRef.current.update();

            rendererRef.current.render(sceneRef.current, cameraRef.current);

            // Finaliser la mesure de performance
            if (statsRef.current) {
                statsRef.current.end();
            }
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

            // Disposer les contrôles
            if (controlsRef.current) {
                controlsRef.current.dispose();
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
            // Ajouter le canvas de rendu Three.js
            canvasRef.current.appendChild(rendererRef.current.domElement);

            // Ajouter l'indicateur de FPS
            if (statsRef.current) {
                document.body.appendChild(statsRef.current.dom);
            }

            // Ajouter un écouteur d'événements pour activer/désactiver la rotation automatique
            const canvas = rendererRef.current.domElement;
            canvas.addEventListener('mousedown', () => {
                if (controlsRef.current) controlsRef.current.enabled = true;
            });

            // Nettoyer les écouteurs lors du démontage
            return () => {
                canvas.removeEventListener('mousedown', () => {
                    if (controlsRef.current) controlsRef.current.enabled = true;
                });

                // Nettoyer l'indicateur de FPS
                if (statsRef.current && statsRef.current.dom && statsRef.current.dom.parentNode) {
                    statsRef.current.dom.parentNode.removeChild(statsRef.current.dom);
                }
            };
        }
    }, [loading]);

    return (
        <div>
            {loading ? <Loading loadingManager={loadingManager} /> : <div ref={canvasRef} id="planet" />}
        </div>
    );
}