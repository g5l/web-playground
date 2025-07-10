import * as THREE from 'three';

export class Slide2 {
    constructor(presentationManager) {
        this.presentationManager = presentationManager;
        this.title = "How Does It Work?";
        this.description = `
            <div>
                <ul>
                    <li>Application Layer</li>
                    <li>WebGL API Layer</li>
                    <li>Native Graphics API</li>
                    <li>GPU Driver</li>
                    <li>GPU Hardware</li>
                    <li>Display Layer</li>
                </ul>
            </div>
        `;
        
        this.mesh = null;
        this.shaderMaterial = null;
        this.wireframeMaterial = null;
        this.time = 0;
    }

    init() {
        this.presentationManager.clearScene();
        this.presentationManager.createLighting();
        
        this.createPipelineDemonstration();
        this.setupAnimations();
    }

    createPipelineDemonstration() {
        // Create a simple mesh for demonstration
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        
        // Wireframe material (left side - before shaders)
        this.wireframeMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: true,
            transparent: true,
            opacity: 0.8
        });
        
        // Custom shader material (right side - after shaders)
        this.shaderMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color: { value: new THREE.Color(0x00ff00) },
                lightPosition: { value: new THREE.Vector3(5, 5, 5) },
                displacement: { value: 0.2 }
            },
            vertexShader: `
                uniform float time;
                uniform float displacement;
                
                varying vec3 vNormal;
                varying vec3 vPosition;
                
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    vPosition = position;
                    
                    // Add displacement based on time
                    vec3 newPosition = position + normal * sin(time * 2.0 + position.x * 3.0) * displacement;
                    
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 color;
                uniform vec3 lightPosition;
                uniform float time;
                
                varying vec3 vNormal;
                varying vec3 vPosition;
                
                void main() {
                    // Calculate lighting
                    vec3 lightDir = normalize(lightPosition - vPosition);
                    float diff = max(dot(vNormal, lightDir), 0.0);
                    
                    // Add some animation to the color
                    vec3 animatedColor = color + vec3(sin(time * 0.5) * 0.2, cos(time * 0.3) * 0.2, sin(time * 0.7) * 0.2);
                    
                    // Final color with lighting
                    vec3 finalColor = animatedColor * (0.3 + 0.7 * diff);
                    
                    gl_FragColor = vec4(finalColor, 1.0);
                }
            `
        });
        
        // Create two meshes - one for each side
        this.wireframeMesh = new THREE.Mesh(geometry, this.wireframeMaterial);
        this.wireframeMesh.position.x = -2;
        this.presentationManager.addObject(this.wireframeMesh);
        
        this.shaderMesh = new THREE.Mesh(geometry, this.shaderMaterial);
        this.shaderMesh.position.x = 2;
        this.presentationManager.addObject(this.shaderMesh);
        
        // Create pipeline arrows
        this.createPipelineArrows();
        
        // Create data flow particles
        this.createDataFlowParticles();
    }

    createPipelineArrows() {
        // Create arrows showing data flow
        const arrowGeometry = new THREE.ConeGeometry(0.1, 0.3, 8);
        const arrowMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        
        // Arrow from wireframe to shader
        const arrow1 = new THREE.Mesh(arrowGeometry, arrowMaterial);
        arrow1.position.set(0, 1, 0);
        arrow1.rotation.z = -Math.PI / 2;
        this.presentationManager.addObject(arrow1);
        
        // Arrow from shader to final result
        const arrow2 = new THREE.Mesh(arrowGeometry, arrowMaterial);
        arrow2.position.set(4, 1, 0);
        arrow2.rotation.z = -Math.PI / 2;
        this.presentationManager.addObject(arrow2);
        
        // Add labels
        this.createLabels();
    }

    createLabels() {
        // Create simple text labels using sprites
        const createLabel = (text, position, color) => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = 256;
            canvas.height = 64;
            
            context.fillStyle = 'rgba(0, 0, 0, 0.8)';
            context.fillRect(0, 0, canvas.width, canvas.height);
            
            context.fillStyle = color;
            context.font = '24px Arial';
            context.textAlign = 'center';
            context.fillText(text, canvas.width / 2, canvas.height / 2 + 8);
            
            const texture = new THREE.CanvasTexture(canvas);
            const material = new THREE.SpriteMaterial({ map: texture });
            const sprite = new THREE.Sprite(material);
            sprite.position.copy(position);
            sprite.scale.set(2, 0.5, 1);
            
            this.presentationManager.addObject(sprite);
        };
        
        createLabel('Vertices', new THREE.Vector3(-2, -2, 0), '#00ff00');
        createLabel('Vertex Shader', new THREE.Vector3(0, -2, 0), '#ffff00');
        createLabel('Fragment Shader', new THREE.Vector3(2, -2, 0), '#ff00ff');
        createLabel('Pixels', new THREE.Vector3(4, -2, 0), '#ffffff');
    }

    createDataFlowParticles() {
        // Create particles flowing through the pipeline
        const particleCount = 30;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount; i++) {
            // Start positions around the wireframe mesh
            positions[i * 3] = -2 + (Math.random() - 0.5) * 0.5;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
            
            // Velocities moving towards the shader mesh
            velocities[i * 3] = 0.02 + Math.random() * 0.01;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
            
            // Colors changing as they move through pipeline
            const progress = Math.random();
            if (progress < 0.25) {
                colors[i * 3] = 1;     // Red for vertices
                colors[i * 3 + 1] = 0;
                colors[i * 3 + 2] = 0;
            } else if (progress < 0.5) {
                colors[i * 3] = 1;     // Yellow for vertex shader
                colors[i * 3 + 1] = 1;
                colors[i * 3 + 2] = 0;
            } else if (progress < 0.75) {
                colors[i * 3] = 1;     // Magenta for fragment shader
                colors[i * 3 + 1] = 0;
                colors[i * 3 + 2] = 1;
            } else {
                colors[i * 3] = 1;     // White for final pixels
                colors[i * 3 + 1] = 1;
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
        
        this.pipelineParticles = {
            geometry: geometry,
            velocities: velocities,
            positions: positions
        };
    }

    setupAnimations() {
        // Mesh rotation animation
        const meshRotation = {
            update: (time) => {
                this.wireframeMesh.rotation.y += 0.01;
                this.shaderMesh.rotation.y += 0.01;
            }
        };
        this.presentationManager.addAnimation(meshRotation);
        
        // Shader uniform updates
        const shaderUpdate = {
            update: (time) => {
                this.time = time * 0.001;
                this.shaderMaterial.uniforms.time.value = this.time;
                
                // Animate color
                const hue = (this.time * 0.1) % 1;
                const color = new THREE.Color().setHSL(hue, 0.8, 0.5);
                this.shaderMaterial.uniforms.color.value = color;
                
                // Animate displacement
                this.shaderMaterial.uniforms.displacement.value = 0.2 + Math.sin(this.time * 0.5) * 0.1;
            }
        };
        this.presentationManager.addAnimation(shaderUpdate);
        
        // Pipeline particle animation
        const particleFlow = {
            update: (time) => {
                const positions = this.pipelineParticles.geometry.attributes.position.array;
                
                for (let i = 0; i < positions.length; i += 3) {
                    // Update positions
                    positions[i] += this.pipelineParticles.velocities[i];
                    positions[i + 1] += this.pipelineParticles.velocities[i + 1];
                    positions[i + 2] += this.pipelineParticles.velocities[i + 2];
                    
                    // Reset particles that reach the end
                    if (positions[i] > 4) {
                        positions[i] = -2;
                        positions[i + 1] = (Math.random() - 0.5) * 0.5;
                        positions[i + 2] = (Math.random() - 0.5) * 0.5;
                    }
                    
                    // Add some wave motion
                    positions[i + 1] += Math.sin(time * 0.001 + i * 0.1) * 0.001;
                }
                
                this.pipelineParticles.geometry.attributes.position.needsUpdate = true;
            }
        };
        this.presentationManager.addAnimation(particleFlow);
    }

    update() {
        // Additional slide-specific updates
    }

    cleanup() {
        // Cleanup is handled by the presentation manager
        this.mesh = null;
        this.shaderMaterial = null;
        this.wireframeMaterial = null;
        this.pipelineParticles = null;
    }
} 