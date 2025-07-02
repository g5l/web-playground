import * as THREE from 'three';

export class SlideProblemWebGL {
    constructor(presentationManager) {
        this.presentationManager = presentationManager;
        this.title = "What Problem Does WebGL Solve?";
        this.description = `
            <div>
                <div>Before WebGL, displaying rich graphics—especially 3D—in the browser was extremely limited.</div>
                <br/>
                <ul>
                    <li>Need to use <b>plugins</b> like <b>Flash</b> or <b>Java Applets</b>, which:
                        <ul>
                            <li>Were insecure and platform-dependent</li>
                            <li>Didn't run well on mobile</li>
                            <li>Were not supported natively by browsers</li>
                        </ul>
                    </li>
                </ul>
                <br/><br/>
                <ul>
                    <li>Real-time <b>3D graphics</b> and <b>games</b></li>
                    <li>Interactive <b>data visualizations</b></li>
                    <li>Cross-platform (desktop & mobile)</li>
                    <li>Pixel-level control</li>
                </ul>
            </div>
        `;
        this.groups = {};
        this.animations = [];
    }

    init() {
        this.presentationManager.clearScene();
        this.presentationManager.createLighting();
        this.createPluginEra();
        this.createStaticEra();
        this.createWebGLEra();
        this.setupAnimations();
    }

    createPluginEra() {
        // Represent plugins as gray cubes with plugin logos (Flash, Java)
        const group = new THREE.Group();
        for (let i = 0; i < 2; i++) {
            const cube = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshPhongMaterial({ color: 0x888888 })
            );
            cube.position.x = -4 + i * 2;
            group.add(cube);

            // Add a simple text sprite for logo
            const logo = this.createTextSprite(i === 0 ? 'Flash' : 'Java', i === 0 ? '#e44d26' : '#5382a1');
            logo.position.set(cube.position.x, 0.8, 0);
            group.add(logo);
        }
        this.presentationManager.addObject(group);
        this.groups.plugin = group;
    }

    createStaticEra() {
        // Represent static images as flat planes (like photos)
        const group = new THREE.Group();
        for (let i = 0; i < 2; i++) {
            const plane = new THREE.Mesh(
                new THREE.PlaneGeometry(1.2, 0.8),
                new THREE.MeshPhongMaterial({ color: 0xcccccc, side: THREE.DoubleSide })
            );
            plane.position.x = -1 + i * 2;
            group.add(plane);

            // Add a text sprite for 'GIF' or 'IMG'
            const label = this.createTextSprite(i === 0 ? 'GIF' : 'IMG', '#333');
            label.position.set(plane.position.x, 0.6, 0);
            group.add(label);
        }
        this.presentationManager.addObject(group);
        this.groups.static = group;
    }

    createWebGLEra() {
        // Represent WebGL as a colorful animated 3D object (cube + sphere + particles)
        const group = new THREE.Group();
        // Animated cube
        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshPhongMaterial({ color: 0x00c3ff, shininess: 100 })
        );
        cube.position.x = 3;
        group.add(cube);
        this.cube = cube;
        // Animated sphere
        const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(0.6, 32, 32),
            new THREE.MeshPhongMaterial({ color: 0x00ff99, shininess: 100 })
        );
        sphere.position.set(5, 0, 0);
        group.add(sphere);
        this.sphere = sphere;
        // Particle system for interactivity
        const particles = this.presentationManager.createParticleSystem(40, new THREE.Color(0xffc300), 0.08);
        particles.position.set(4, 0.5, 0);
        group.add(particles);
        this.particles = particles;
        this.presentationManager.addObject(group);
        this.groups.webgl = group;
    }

    createTextSprite(text, color) {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgba(255,255,255,0.0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = 'bold 32px Arial';
        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(material);
        sprite.scale.set(1.2, 0.3, 1);
        return sprite;
    }

    setupAnimations() {
        // Animate plugin cubes fading out and shaking
        const pluginGroup = this.groups.plugin;
        const staticGroup = this.groups.static;
        const webglGroup = this.groups.webgl;
        const cube = this.cube;
        const sphere = this.sphere;
        const particles = this.particles;
        let t = 0;
        const animation = {
            update: (time) => {
                t += 0.01;
                // Plugin cubes shake and fade
                pluginGroup.children.forEach((obj, i) => {
                    if (obj instanceof THREE.Mesh) {
                        obj.position.y = Math.sin(t * 3 + i) * 0.1;
                        obj.material.opacity = Math.max(0.2, 1 - t * 0.2);
                        obj.material.transparent = true;
                    }
                });
                // Static planes fade in, then fade out
                staticGroup.children.forEach((obj, i) => {
                    if (obj instanceof THREE.Mesh) {
                        obj.material.opacity = Math.max(0.2, Math.sin(t + i) * 0.5 + 0.5);
                        obj.material.transparent = true;
                    }
                });
                // WebGL objects animate in
                cube.rotation.x += 0.02;
                cube.rotation.y += 0.03;
                sphere.position.y = Math.sin(t * 2) * 0.3;
                // Particles pulse
                particles.material.size = 0.08 + Math.sin(t * 3) * 0.03;
            }
        };
        this.presentationManager.addAnimation(animation);
        this.animations.push(animation);
    }

    update() {
        // Additional per-frame logic if needed
    }

    cleanup() {
        // Remove references for GC
        this.groups = {};
        this.animations.forEach(anim => this.presentationManager.removeAnimation(anim));
        this.animations = [];
    }
} 