import * as THREE from 'three';

export class SlideCodeDemo {
    constructor(presentationManager) {
        this.presentationManager = presentationManager;
        this.title = "Code Demonstration";
        this.description = '';
        this.interactiveHint = "";
        this.objects = {};
        this.animations = [];
    }

    init() {
        this.presentationManager.clearScene();
        this.presentationManager.createLighting();
        this.createLaptop();
        this.setupAnimations();
    }

    createLaptop() {
        // Make the laptop bigger
        const baseGeometry = new THREE.BoxGeometry(3.2, 0.16, 2.0);
        const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x222222, shininess: 60 });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.set(0, -0.5, 0);
        this.presentationManager.addObject(base);
        this.objects.base = base;

        // Laptop screen with code editor texture
        const screenGeometry = new THREE.BoxGeometry(3.2, 1.8, 0.12);
        const screenTexture = this.createCodeEditorTexture();
        const screenMaterial = new THREE.MeshPhongMaterial({ map: screenTexture, shininess: 100, transparent: true, opacity: 0.98 });
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.position.set(0, 0.6, -1.0);
        screen.rotation.x = -Math.PI / 7;
        this.presentationManager.addObject(screen);
        this.objects.screen = screen;

        // Keyboard keys (simple cubes, scaled up)
        const keysGroup = new THREE.Group();
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 4; j++) {
                const key = new THREE.Mesh(
                    new THREE.BoxGeometry(0.28, 0.06, 0.22),
                    new THREE.MeshPhongMaterial({ color: 0x444444, shininess: 30 })
                );
                key.position.set(-1.2 + i * 0.28, -0.62, -0.8 + j * 0.27);
                keysGroup.add(key);
            }
        }
        this.presentationManager.addObject(keysGroup);
        this.objects.keys = keysGroup;
    }

    createCodeEditorTexture() {
        // Simulate a code editor (VSCode-like) with colored lines
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 576;
        const ctx = canvas.getContext('2d');
        // Background
        ctx.fillStyle = '#1e1e1e';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Top bar
        ctx.fillStyle = '#23272e';
        ctx.fillRect(0, 0, canvas.width, 48);
        // Circles (close/minimize/maximize)
        ctx.beginPath(); ctx.arc(28, 24, 10, 0, 2 * Math.PI); ctx.fillStyle = '#ff5f56'; ctx.fill();
        ctx.beginPath(); ctx.arc(58, 24, 10, 0, 2 * Math.PI); ctx.fillStyle = '#ffbd2e'; ctx.fill();
        ctx.beginPath(); ctx.arc(88, 24, 10, 0, 2 * Math.PI); ctx.fillStyle = '#27c93f'; ctx.fill();
        // File name
        ctx.font = 'bold 28px Arial';
        ctx.fillStyle = '#eee';
        ctx.fillText('App.js', 140, 34);
        // Code lines
        const code = [
            { text: 'function helloWorld() {', color: '#569cd6' },
            { text: '    console.log(', color: '#dcdcaa' },
            { text: '        "Hello, ', color: '#ce9178' },
            { text: '        World!"', color: '#ce9178' },
            { text: '    );', color: '#dcdcaa' },
            { text: '}', color: '#569cd6' },
        ];
        ctx.font = 'bold 32px Menlo, monospace';
        let y = 90;
        for (let i = 0; i < code.length; i++) {
            ctx.fillStyle = code[i].color;
            ctx.fillText(code[i].text, 60, y);
            y += 48;
        }
        // Line numbers
        ctx.font = '28px Menlo, monospace';
        ctx.fillStyle = '#858585';
        for (let i = 0; i < code.length; i++) {
            ctx.fillText((i + 1).toString(), 20, 90 + i * 48);
        }
        return new THREE.CanvasTexture(canvas);
    }

    setupAnimations() {
        const base = this.objects.base;
        const screen = this.objects.screen;
        const keys = this.objects.keys;
        let t = 0;
        const animation = {
            update: () => {
                t += 0.01;
                // Subtle floating animation
                base.position.y = -0.5 + Math.sin(t) * 0.07;
                screen.position.y = 0.6 + Math.sin(t + 1) * 0.07;
                screen.rotation.x = -Math.PI / 7 + Math.sin(t * 0.7) * 0.04;
                keys.position.y = -0.18 + Math.sin(t + 2) * 0.05;
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