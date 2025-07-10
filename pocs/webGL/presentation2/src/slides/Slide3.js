import * as THREE from 'three';

export class Slide3 {
    constructor(presentationManager) {
        this.presentationManager = presentationManager;
        this.title = "Understanding Shaders";
        this.description = `
            <div>
                <div>Shaders are small programs that run on the (GPU), allowing developers to control how graphics are rendered. They are fundamental to modern 3D graphics, enabling complex visual effects and realistic rendering.</div>
                <br/>
                <ul>
                    <li>GPU-Accelerated</li>
                    <li>Programmable Pipeline</li>
                    <li>Two Main Types:
                        <ul class="sublist">
                            <li>Vertex Shaders</li>
                            <li>Fragment Shaders</li>
                        </ul>
                    </li>
                </ul>
            </div>
        `;
        this.interactiveHint = "Watch how vertex and fragment shaders work in real time";
        this.objects = {};
        this.animations = [];
    }

    init() {
        this.presentationManager.clearScene();
        this.presentationManager.createLighting();
        this.createShaderPipelineVisualization();
        this.setupAnimations();
    }

    createShaderPipelineVisualization() {
        // 1. Vertex Grid (left)
        const gridSize = 4;
        const spacing = 0.5;
        const vertexGroup = new THREE.Group();
        const vertexSpheres = [];
        const vertexLines = [];
        for (let x = 0; x < gridSize; x++) {
            for (let y = 0; y < gridSize; y++) {
                const sphere = new THREE.Mesh(
                    new THREE.SphereGeometry(0.06, 12, 12),
                    new THREE.MeshPhongMaterial({ color: 0x00c3ff })
                );
                sphere.position.set(
                    (x - (gridSize - 1) / 2) * spacing - 2.5,
                    (y - (gridSize - 1) / 2) * spacing,
                    0
                );
                vertexGroup.add(sphere);
                vertexSpheres.push(sphere);
            }
        }
        // Connect lines (wireframe)
        for (let x = 0; x < gridSize; x++) {
            for (let y = 0; y < gridSize; y++) {
                if (x < gridSize - 1) {
                    const line = this.createLine(
                        vertexSpheres[y + x * gridSize].position,
                        vertexSpheres[y + (x + 1) * gridSize].position,
                        0x00c3ff
                    );
                    vertexGroup.add(line);
                    vertexLines.push(line);
                }
                if (y < gridSize - 1) {
                    const line = this.createLine(
                        vertexSpheres[y + x * gridSize].position,
                        vertexSpheres[y + 1 + x * gridSize].position,
                        0x00c3ff
                    );
                    vertexGroup.add(line);
                    vertexLines.push(line);
                }
            }
        }
        this.presentationManager.addObject(vertexGroup);
        this.objects.vertexGroup = vertexGroup;
        this.objects.vertexSpheres = vertexSpheres;
        this.objects.vertexLines = vertexLines;

        // 2. Vertex Shader Portal (glowing ring)
        const vertexPortal = this.createPortal(0x00c3ff);
        vertexPortal.position.set(-0.7, 0, 0);
        this.presentationManager.addObject(vertexPortal);
        this.objects.vertexPortal = vertexPortal;
        // Label
        const vertexLabel = this.createTextSprite('Vertex Shader', '#00c3ff');
        vertexLabel.position.set(-0.7, 0.7, 0);
        this.presentationManager.addObject(vertexLabel);
        this.objects.vertexLabel = vertexLabel;

        // 3. Morphing Mesh (center, after portal)
        const geometry = new THREE.SphereGeometry(0.9, 32, 32);
        this.shaderMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color: { value: new THREE.Color(0x00ff99) }
            },
            vertexShader: `
                uniform float time;
                varying vec3 vNormal;
                void main() {
                    vNormal = normal;
                    float twist = sin(position.y * 2.0 + time) * 0.5;
                    vec3 newPosition = position;
                    newPosition.xz = mat2(cos(twist), -sin(twist), sin(twist), cos(twist)) * newPosition.xz;
                    newPosition += normal * sin(time * 2.0 + position.x * 3.0) * 0.12;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 color;
                uniform float time;
                varying vec3 vNormal;
                void main() {
                    float lighting = dot(normalize(vNormal), vec3(0.5, 0.5, 1.0));
                    vec3 baseColor = color + vec3(sin(time) * 0.2, cos(time * 0.7) * 0.2, 0.0);
                    gl_FragColor = vec4(baseColor * (0.5 + 0.5 * lighting), 1.0);
                }
            `
        });
        const mesh = new THREE.Mesh(geometry, this.shaderMaterial);
        mesh.position.set(1, 0, 0);
        this.presentationManager.addObject(mesh);
        this.objects.mesh = mesh;

        // 4. Fragment Shader Portal (glowing ring)
        const fragPortal = this.createPortal(0xffc300);
        fragPortal.position.set(2.5, 0, 0);
        this.presentationManager.addObject(fragPortal);
        this.objects.fragPortal = fragPortal;
        // Label
        const fragLabel = this.createTextSprite('Fragment Shader', '#ffc300');
        fragLabel.position.set(2.5, 0.7, 0);
        this.presentationManager.addObject(fragLabel);
        this.objects.fragLabel = fragLabel;

        // 5. Output Plane (screen)
        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(1.8, 1.2),
            new THREE.MeshPhongMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 })
        );
        plane.position.set(4.2, 0, 0);
        this.presentationManager.addObject(plane);
        this.objects.plane = plane;
        // Label
        const outLabel = this.createTextSprite('Pixels (Screen)', '#333');
        outLabel.position.set(4.2, -0.9, 0);
        this.presentationManager.addObject(outLabel);
        this.objects.outLabel = outLabel;

        // 6. Animated Flow Arrows/Particles
        this.objects.flowParticles = this.createFlowParticles();
        this.presentationManager.addObject(this.objects.flowParticles);
    }

    createLine(start, end, color) {
        const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
        const material = new THREE.LineBasicMaterial({ color });
        return new THREE.Line(geometry, material);
    }

    createPortal(color) {
        const geometry = new THREE.TorusGeometry(0.35, 0.07, 24, 48);
        const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5 });
        const mesh = new THREE.Mesh(geometry, material);
        return mesh;
    }

    createTextSprite(text, color) {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgba(255,255,255,0.0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = 'bold 28px Arial';
        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(material);
        sprite.scale.set(1.6, 0.4, 1);
        return sprite;
    }

    createFlowParticles() {
        // Create a set of particles that flow from left to right through the pipeline
        const particleCount = 30;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = -2.5 + Math.random() * 7; // from left to right
            positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
            positions[i * 3 + 2] = 0.05;
            colors[i * 3] = 1.0;
            colors[i * 3 + 1] = 0.8;
            colors[i * 3 + 2] = 0.2;
        }
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        const material = new THREE.PointsMaterial({ size: 0.08, vertexColors: true, transparent: true, opacity: 0.7 });
        return new THREE.Points(geometry, material);
    }

    setupAnimations() {
        // Animate everything
        const vertexSpheres = this.objects.vertexSpheres;
        const vertexLines = this.objects.vertexLines;
        const mesh = this.objects.mesh;
        const shaderMaterial = this.shaderMaterial;
        const vertexPortal = this.objects.vertexPortal;
        const fragPortal = this.objects.fragPortal;
        const plane = this.objects.plane;
        const flowParticles = this.objects.flowParticles;
        let t = 0;
        const animation = {
            update: (time) => {
                t += 0.01;
                // Animate vertex grid (subtle up/down motion)
                vertexSpheres.forEach((sphere, i) => {
                    sphere.position.y += Math.sin(t + i) * 0.002;
                });
                // Animate mesh (vertex/fragment shader effect)
                shaderMaterial.uniforms.time.value = t;
                mesh.rotation.y = Math.sin(t * 0.5) * 0.3;
                // Animate portals (glow/pulse)
                vertexPortal.material.opacity = 0.5 + Math.sin(t * 2) * 0.2;
                fragPortal.material.opacity = 0.5 + Math.cos(t * 2) * 0.2;
                // Animate output plane (pulse)
                plane.material.opacity = 0.8 + Math.sin(t * 1.5) * 0.1;
                // Animate flow particles
                const positions = flowParticles.geometry.attributes.position.array;
                for (let i = 0; i < positions.length; i += 3) {
                    positions[i] += 0.03 * (0.7 + Math.sin(t + i));
                    if (positions[i] > 4.2) positions[i] = -2.5;
                }
                flowParticles.geometry.attributes.position.needsUpdate = true;
            }
        };
        this.presentationManager.addAnimation(animation);
        this.animations.push(animation);
    }

    update() {}

    cleanup() {
        this.animations.forEach(anim => this.presentationManager.removeAnimation(anim));
        this.animations = [];
        this.objects = {};
    }
} 