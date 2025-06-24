import * as THREE from 'three';

export class PresentationManager {
    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.objects = [];
        this.animations = [];
        this.controls = null;
        
        this.setupControls();
    }

    setupControls() {
        // Simple orbit controls for mouse interaction
        let isMouseDown = false;
        let mouseX = 0;
        let mouseY = 0;
        let targetRotationX = 0;
        let targetRotationY = 0;
        let rotationX = 0;
        let rotationY = 0;

        const canvas = this.renderer.domElement;

        canvas.addEventListener('mousedown', (event) => {
            isMouseDown = true;
            mouseX = event.clientX;
            mouseY = event.clientY;
        });

        canvas.addEventListener('mousemove', (event) => {
            if (isMouseDown) {
                const deltaX = event.clientX - mouseX;
                const deltaY = event.clientY - mouseY;
                
                targetRotationY += deltaX * 0.01;
                targetRotationX += deltaY * 0.01;
                
                mouseX = event.clientX;
                mouseY = event.clientY;
            }
        });

        canvas.addEventListener('mouseup', () => {
            isMouseDown = false;
        });

        canvas.addEventListener('wheel', (event) => {
            const zoomSpeed = 0.1;
            const delta = event.deltaY > 0 ? 1 : -1;
            this.camera.position.z += delta * zoomSpeed;
            this.camera.position.z = Math.max(1, Math.min(20, this.camera.position.z));
        });

        // Store controls state
        this.controls = {
            rotationX: 0,
            rotationY: 0,
            targetRotationX: 0,
            targetRotationY: 0,
            update: () => {
                rotationX += (targetRotationX - rotationX) * 0.1;
                rotationY += (targetRotationY - rotationY) * 0.1;
                
                this.controls.rotationX = rotationX;
                this.controls.rotationY = rotationY;
            }
        };
    }

    addObject(object) {
        this.objects.push(object);
        this.scene.add(object);
        return object;
    }

    removeObject(object) {
        const index = this.objects.indexOf(object);
        if (index > -1) {
            this.objects.splice(index, 1);
            this.scene.remove(object);
        }
    }

    addAnimation(animation) {
        this.animations.push(animation);
    }

    removeAnimation(animation) {
        const index = this.animations.indexOf(animation);
        if (index > -1) {
            this.animations.splice(index, 1);
        }
    }

    clearScene() {
        // Remove all objects
        this.objects.forEach(obj => {
            this.scene.remove(obj);
        });
        this.objects = [];

        // Clear animations
        this.animations = [];

        // Reset camera
        this.camera.position.set(0, 0, 5);
        this.camera.lookAt(0, 0, 0);
    }

    createParticleSystem(count, color, size = 0.1) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;

            sizes[i] = Math.random() * size;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.PointsMaterial({
            size: size,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });

        const particles = new THREE.Points(geometry, material);
        return particles;
    }

    createWireframeBox(size = 1, color = 0xffffff) {
        const geometry = new THREE.BoxGeometry(size, size, size);
        const material = new THREE.MeshBasicMaterial({
            color: color,
            wireframe: true
        });
        return new THREE.Mesh(geometry, material);
    }

    createAnimatedCube(size = 1, color = 0x00ff00) {
        const geometry = new THREE.BoxGeometry(size, size, size);
        const material = new THREE.MeshPhongMaterial({ color: color });
        const cube = new THREE.Mesh(geometry, material);
        
        // Add rotation animation
        const animation = {
            object: cube,
            update: (time) => {
                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;
            }
        };
        
        this.addAnimation(animation);
        return cube;
    }

    createLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);

        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);

        // Point light
        const pointLight = new THREE.PointLight(0xffffff, 1, 100);
        pointLight.position.set(-5, 5, 5);
        this.scene.add(pointLight);

        return { ambientLight, directionalLight, pointLight };
    }

    update() {
        // Update controls
        if (this.controls) {
            this.controls.update();
        }

        // Update animations
        this.animations.forEach(animation => {
            if (animation.update) {
                animation.update(Date.now());
            }
        });
    }

    // Utility method to create smooth transitions
    createTransition(duration = 1000) {
        return new Promise((resolve) => {
            const startTime = Date.now();
            
            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function (ease-in-out)
                const eased = progress < 0.5 
                    ? 2 * progress * progress 
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            };
            
            animate();
        });
    }
} 