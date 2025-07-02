import * as THREE from 'three';

export class Slide5 {
    constructor(presentationManager) {
        this.presentationManager = presentationManager;
        this.title = "";
        this.description = "";
        this.interactiveHint = "";
        this.objects = {};
        this.animations = [];
    }

    init() {
        this.presentationManager.clearScene();
        this.presentationManager.createLighting();
        this.createThankYouText();
        this.createConfetti();
        this.setupAnimations();
    }

    createThankYouText() {
        // Create floating 'Thank You!' text using a plane with canvas texture
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = 'bold 100px Arial';
        ctx.fillStyle = '#00c3ff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Thank You!', canvas.width / 2, canvas.height / 2);
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
        const plane = new THREE.Mesh(new THREE.PlaneGeometry(4, 1), material);
        plane.position.set(0, 0.5, 0);
        this.presentationManager.addObject(plane);
        this.objects.text = plane;
    }

    createConfetti() {
        // Create simple confetti particles
        const confettiCount = 80;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(confettiCount * 3);
        const colors = new Float32Array(confettiCount * 3);
        for (let i = 0; i < confettiCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 6;
            positions[i * 3 + 1] = Math.random() * 2 + 1;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
            const color = new THREE.Color().setHSL(Math.random(), 0.8, 0.6);
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        const material = new THREE.PointsMaterial({ size: 0.12, vertexColors: true, transparent: true, opacity: 0.85 });
        const points = new THREE.Points(geometry, material);
        this.presentationManager.addObject(points);
        this.objects.confetti = points;
    }

    setupAnimations() {
        const text = this.objects.text;
        const confetti = this.objects.confetti;
        let t = 0;
        const animation = {
            update: () => {
                t += 0.01;
                // Floating text animation
                text.position.y = 0.5 + Math.sin(t) * 0.1;
                text.rotation.y = Math.sin(t * 0.5) * 0.1;
                // Confetti falling and respawning
                const positions = confetti.geometry.attributes.position.array;
                for (let i = 0; i < positions.length; i += 3) {
                    positions[i + 1] -= 0.025 + Math.random() * 0.01;
                    if (positions[i + 1] < -1.2) {
                        positions[i + 1] = Math.random() * 2 + 1;
                        positions[i] = (Math.random() - 0.5) * 6;
                        positions[i + 2] = (Math.random() - 0.5) * 2;
                    }
                }
                confetti.geometry.attributes.position.needsUpdate = true;
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
