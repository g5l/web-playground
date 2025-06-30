import * as THREE from 'three';

export class Slide1 {
    constructor(presentationManager) {
        this.presentationManager = presentationManager;
        this.title = "What is WebGL?";
        this.description = `
            <div>
                <div>WebGL (Web Graphics Library) is a JavaScript API that enables rendering high-performance 2D and 3D graphics directly in the browser, without the need for plugins.</div>
                <br/><br/>
                <ul>
                    <li>Runs on the GPU through the canvas element</li>
                    <li>Use GLSL as a shader programming language</li>
                    <li>Based on OpenGL ES 3.0</li>
                    <li>Supported in all modern browsers</li>
                    <li>No plugins required</li>
                    <li>Enables real-time interactive visualizations</li>
                </ul>
            </div>
        `;
        this.gpuComponents = [];
        this.dataParticles = [];
        this.startTime = Date.now();
    }

    init() {
        this.presentationManager.clearScene();
        this.presentationManager.createLighting();
        
        this.createGPUArchitecture();
        this.createDataFlowParticles();
        this.setupAnimations();
    }

    createGPUArchitecture() {
        // Main GPU housing
        const gpuHousing = new THREE.Group();
        
        // GPU base (main chip)
        const baseGeometry = new THREE.BoxGeometry(3, 0.5, 2);
        const baseMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x2c3e50,
            shininess: 100
        });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.y = -0.5;
        gpuHousing.add(base);
        
        // GPU cores (vertex processors)
        for (let i = 0; i < 8; i++) {
            const coreGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
            const coreMaterial = new THREE.MeshPhongMaterial({ 
                color: 0xe74c3c,
                emissive: 0x330000,
                shininess: 50
            });
            const core = new THREE.Mesh(coreGeometry, coreMaterial);
            
            const row = Math.floor(i / 4);
            const col = i % 4;
            core.position.set(
                (col - 1.5) * 0.4,
                0.2,
                (row - 0.5) * 0.4
            );
            
            gpuHousing.add(core);
            this.gpuComponents.push(core);
        }
        
        // Memory modules
        for (let i = 0; i < 4; i++) {
            const memoryGeometry = new THREE.BoxGeometry(0.2, 0.8, 0.1);
            const memoryMaterial = new THREE.MeshPhongMaterial({ 
                color: 0x3498db,
                emissive: 0x003366,
                shininess: 80
            });
            const memory = new THREE.Mesh(memoryGeometry, memoryMaterial);
            
            memory.position.set(
                -1.5 + i * 0.8,
                0.5,
                0.8
            );
            
            gpuHousing.add(memory);
            this.gpuComponents.push(memory);
        }
        
        // Fragment processors
        for (let i = 0; i < 6; i++) {
            const fragmentGeometry = new THREE.BoxGeometry(0.25, 0.25, 0.25);
            const fragmentMaterial = new THREE.MeshPhongMaterial({ 
                color: 0xf39c12,
                emissive: 0x332200,
                shininess: 60
            });
            const fragment = new THREE.Mesh(fragmentGeometry, fragmentMaterial);
            
            const row = Math.floor(i / 3);
            const col = i % 3;
            fragment.position.set(
                (col - 1) * 0.35,
                -0.2,
                (row - 0.5) * 0.35
            );
            
            gpuHousing.add(fragment);
            this.gpuComponents.push(fragment);
        }
        
        // Cooling fan
        const fanGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.1, 8);
        const fanMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x95a5a6,
            shininess: 30
        });
        const fan = new THREE.Mesh(fanGeometry, fanMaterial);
        fan.position.set(0, 1, 0);
        fan.rotation.x = Math.PI / 2;
        gpuHousing.add(fan);
        this.gpuComponents.push(fan);
        
        // Add to scene
        this.presentationManager.addObject(gpuHousing);
        this.gpuGroup = gpuHousing;
    }

    createDataFlowParticles() {
        // Create particle system for data flow
        const particleCount = 50;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount; i++) {
            // Random starting positions around the GPU
            positions[i * 3] = (Math.random() - 0.5) * 6;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
            
            // Random velocities towards GPU components
            velocities[i * 3] = (Math.random() - 0.5) * 0.02;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
            
            // Colors based on data type
            const colorType = Math.random();
            if (colorType < 0.33) {
                colors[i * 3] = 1;     // Red for vertex data
                colors[i * 3 + 1] = 0;
                colors[i * 3 + 2] = 0;
            } else if (colorType < 0.66) {
                colors[i * 3] = 0;     // Green for fragment data
                colors[i * 3 + 1] = 1;
                colors[i * 3 + 2] = 0;
            } else {
                colors[i * 3] = 0;     // Blue for memory data
                colors[i * 3 + 1] = 0;
                colors[i * 3 + 2] = 1;
            }
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });
        
        const particles = new THREE.Points(geometry, material);
        this.presentationManager.addObject(particles);
        
        this.dataParticles = {
            geometry: geometry,
            velocities: velocities,
            positions: positions
        };
    }

    setupAnimations() {
        // GPU rotation animation
        const gpuRotation = {
            object: this.gpuGroup,
            update: (time) => {
                this.gpuGroup.rotation.y += 0.005;
            }
        };
        this.presentationManager.addAnimation(gpuRotation);
        
        // Component pulsing animation
        const componentPulse = {
            update: (time) => {
                this.gpuComponents.forEach((component, index) => {
                    const pulse = Math.sin(time * 0.003 + index * 0.5) * 0.1 + 1;
                    component.scale.setScalar(pulse);
                });
            }
        };
        this.presentationManager.addAnimation(componentPulse);
        
        // Data flow animation
        const dataFlow = {
            update: (time) => {
                const positions = this.dataParticles.geometry.attributes.position.array;
                
                for (let i = 0; i < positions.length; i += 3) {
                    // Update positions based on velocities
                    positions[i] += this.dataParticles.velocities[i];
                    positions[i + 1] += this.dataParticles.velocities[i + 1];
                    positions[i + 2] += this.dataParticles.velocities[i + 2];
                    
                    // Bounce off boundaries
                    if (Math.abs(positions[i]) > 3) {
                        this.dataParticles.velocities[i] *= -1;
                    }
                    if (Math.abs(positions[i + 1]) > 2) {
                        this.dataParticles.velocities[i + 1] *= -1;
                    }
                    if (Math.abs(positions[i + 2]) > 2) {
                        this.dataParticles.velocities[i + 2] *= -1;
                    }
                    
                    // Add some randomness to simulate data flow
                    this.dataParticles.velocities[i] += (Math.random() - 0.5) * 0.001;
                    this.dataParticles.velocities[i + 1] += (Math.random() - 0.5) * 0.001;
                    this.dataParticles.velocities[i + 2] += (Math.random() - 0.5) * 0.001;
                }
                
                this.dataParticles.geometry.attributes.position.needsUpdate = true;
            }
        };
        this.presentationManager.addAnimation(dataFlow);
    }

    update() {
        // Additional slide-specific updates can go here
    }

    cleanup() {
        // Cleanup is handled by the presentation manager
        this.gpuComponents = [];
        this.dataParticles = [];
    }
} 