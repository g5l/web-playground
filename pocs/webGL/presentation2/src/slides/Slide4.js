import * as THREE from 'three';

export class Slide4 {
    constructor(presentationManager) {
        this.presentationManager = presentationManager;
        this.title = "Advantages and Limitations";
        this.description = `
            <div>
                <br/>
                <ul>
                    <li>Hardware acceleration(Performance)</li>
                    <li>Cross-browser compatibility</li>
                    <br/>
                    <li>Learning curve</li>
                    <li>Resource consumption</li>
                </ul>
            </div>
        `;
        
        this.optimizedScene = null;
        this.complexScene = null;
        this.fpsCounter = 0;
        this.lastTime = 0;
        this.complexity = 1;
    }

    init() {
        this.presentationManager.clearScene();
        this.presentationManager.createLighting();
        
        this.createPerformanceComparison();
        this.setupAnimations();
        this.setupPerformanceMonitoring();
    }

    createPerformanceComparison() {
        // Create split scene - left side optimized, right side complex
        this.createOptimizedScene();
        this.createComplexScene();
        this.createPerformanceIndicators();
    }

    createOptimizedScene() {
        this.optimizedScene = new THREE.Group();
        this.optimizedScene.position.x = -3;
        
        // Simple, optimized objects
        const optimizedGeometry = new THREE.SphereGeometry(1, 16, 16);
        const optimizedMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x00ff00,
            shininess: 30
        });
        
        // Create a few optimized objects
        for (let i = 0; i < 5; i++) {
            const mesh = new THREE.Mesh(optimizedGeometry, optimizedMaterial);
            mesh.position.set(
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2
            );
            this.optimizedScene.add(mesh);
        }
        
        // Add smooth rotation animation
        const optimizedAnimation = {
            object: this.optimizedScene,
            update: (time) => {
                this.optimizedScene.rotation.y += 0.01;
                this.optimizedScene.rotation.x += 0.005;
            }
        };
        this.presentationManager.addAnimation(optimizedAnimation);
        
        this.presentationManager.addObject(this.optimizedScene);
    }

    createComplexScene() {
        this.complexScene = new THREE.Group();
        this.complexScene.position.x = 3;
        
        // Complex, resource-heavy objects
        const complexGeometry = new THREE.SphereGeometry(1, 64, 64);
        const complexMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xff0000,
            shininess: 100,
            transparent: true,
            opacity: 0.8
        });
        
        // Create many complex objects
        for (let i = 0; i < 20; i++) {
            const mesh = new THREE.Mesh(complexGeometry, complexMaterial);
            mesh.position.set(
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4
            );
            mesh.scale.setScalar(Math.random() * 0.5 + 0.5);
            this.complexScene.add(mesh);
        }
        
        // Add particle effects
        this.createComplexParticles();
        
        // Add complex animation
        const complexAnimation = {
            object: this.complexScene,
            update: (time) => {
                this.complexScene.rotation.y += 0.02;
                this.complexScene.rotation.x += 0.01;
                
                // Animate individual objects
                this.complexScene.children.forEach((child, index) => {
                    if (child instanceof THREE.Mesh) {
                        child.rotation.x += 0.01 * (index % 3 + 1);
                        child.rotation.y += 0.01 * (index % 2 + 1);
                        child.scale.x = 0.5 + Math.sin(time * 0.001 + index) * 0.2;
                        child.scale.y = 0.5 + Math.cos(time * 0.001 + index) * 0.2;
                        child.scale.z = 0.5 + Math.sin(time * 0.001 + index * 0.5) * 0.2;
                    }
                });
            }
        };
        this.presentationManager.addAnimation(complexAnimation);
        
        this.presentationManager.addObject(this.complexScene);
    }

    createComplexParticles() {
        const particleCount = 100;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 6;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
            
            velocities[i * 3] = (Math.random() - 0.5) * 0.02;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
            
            colors[i * 3] = 1;
            colors[i * 3 + 1] = 0.5;
            colors[i * 3 + 2] = 0;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.6
        });
        
        const particles = new THREE.Points(geometry, material);
        this.complexScene.add(particles);
        
        // Add particle animation
        const particleAnimation = {
            object: particles,
            update: (time) => {
                const positions = geometry.attributes.position.array;
                for (let i = 0; i < positions.length; i += 3) {
                    positions[i] += velocities[i];
                    positions[i + 1] += velocities[i + 1];
                    positions[i + 2] += velocities[i + 2];
                    
                    // Bounce off boundaries
                    if (Math.abs(positions[i]) > 3) velocities[i] *= -1;
                    if (Math.abs(positions[i + 1]) > 3) velocities[i + 1] *= -1;
                    if (Math.abs(positions[i + 2]) > 3) velocities[i + 2] *= -1;
                }
                geometry.attributes.position.needsUpdate = true;
            }
        };
        this.presentationManager.addAnimation(particleAnimation);
    }

    createPerformanceIndicators() {
        // Create visual performance indicators
        this.createFPSMeter();
        this.createComplexitySlider();
        this.createDeviceCompatibility();
    }

    createFPSMeter() {
        // Create a visual FPS meter using sprites
        const createFPSSprite = (text, position, color) => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = 200;
            canvas.height = 50;
            
            context.fillStyle = 'rgba(0, 0, 0, 0.8)';
            context.fillRect(0, 0, canvas.width, canvas.height);
            
            context.fillStyle = color;
            context.font = '16px Arial';
            context.textAlign = 'left';
            context.fillText(text, 10, 30);
            
            const texture = new THREE.CanvasTexture(canvas);
            const material = new THREE.SpriteMaterial({ map: texture });
            const sprite = new THREE.Sprite(material);
            sprite.position.copy(position);
            sprite.scale.set(2, 0.5, 1);
            
            this.presentationManager.addObject(sprite);
            return sprite;
        };
        
        this.fpsSprite = createFPSSprite('FPS: 60', new THREE.Vector3(-3, 3, 0), '#00ff00');
        this.complexFpsSprite = createFPSSprite('FPS: 30', new THREE.Vector3(3, 3, 0), '#ff0000');
    }

    createComplexitySlider() {
        // Create a visual complexity indicator
        const createComplexityBar = (position, color) => {
            const barGeometry = new THREE.BoxGeometry(2, 0.1, 0.1);
            const barMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
            const bar = new THREE.Mesh(barGeometry, barMaterial);
            bar.position.copy(position);
            
            const fillGeometry = new THREE.BoxGeometry(1, 0.08, 0.08);
            const fillMaterial = new THREE.MeshBasicMaterial({ color: color });
            const fill = new THREE.Mesh(fillGeometry, fillMaterial);
            fill.position.copy(position);
            fill.position.x -= 0.5;
            
            this.presentationManager.addObject(bar);
            this.presentationManager.addObject(fill);
            
            return { bar, fill };
        };
        
        this.optimizedBar = createComplexityBar(new THREE.Vector3(-3, -3, 0), 0x00ff00);
        this.complexBar = createComplexityBar(new THREE.Vector3(3, -3, 0), 0xff0000);
    }

    createDeviceCompatibility() {
        // Create device compatibility indicators
        const createCompatibilityIndicator = (text, position, isCompatible) => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = 150;
            canvas.height = 40;
            
            context.fillStyle = 'rgba(0, 0, 0, 0.8)';
            context.fillRect(0, 0, canvas.width, canvas.height);
            
            context.fillStyle = isCompatible ? '#00ff00' : '#ff0000';
            context.font = '14px Arial';
            context.textAlign = 'center';
            context.fillText(text, canvas.width / 2, canvas.height / 2 + 5);
            
            const texture = new THREE.CanvasTexture(canvas);
            const material = new THREE.SpriteMaterial({ map: texture });
            const sprite = new THREE.Sprite(material);
            sprite.position.copy(position);
            sprite.scale.set(1.5, 0.4, 1);
            
            this.presentationManager.addObject(sprite);
            return sprite;
        };
        
        this.mobileIndicator = createCompatibilityIndicator('Mobile: ✓', new THREE.Vector3(-3, 2, 0), true);
        this.desktopIndicator = createCompatibilityIndicator('Desktop: ✓', new THREE.Vector3(3, 2, 0), true);
    }

    setupAnimations() {
        // Performance simulation animation
        const performanceSimulation = {
            update: (time) => {
                // Simulate performance differences
                const optimizedFPS = 60;
                const complexFPS = 30 + Math.sin(time * 0.001) * 10;
                
                // Update FPS displays
                this.updateFPSDisplay(this.fpsSprite, Math.round(optimizedFPS), '#00ff00');
                this.updateFPSDisplay(this.complexFpsSprite, Math.round(complexFPS), '#ff0000');
                
                // Update complexity bars
                this.updateComplexityBar(this.optimizedBar, 0.3);
                this.updateComplexityBar(this.complexBar, 0.8);
            }
        };
        this.presentationManager.addAnimation(performanceSimulation);
    }

    setupPerformanceMonitoring() {
        // Monitor actual FPS
        this.lastTime = performance.now();
        this.fpsCounter = 0;
    }

    updateFPSDisplay(sprite, fps, color) {
        const canvas = sprite.material.map.image;
        const context = canvas.getContext('2d');
        
        context.fillStyle = 'rgba(0, 0, 0, 0.8)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        context.fillStyle = color;
        context.font = '16px Arial';
        context.textAlign = 'left';
        context.fillText(`FPS: ${fps}`, 10, 30);
        
        sprite.material.map.needsUpdate = true;
    }

    updateComplexityBar(bar, complexity) {
        bar.fill.scale.x = complexity;
        bar.fill.position.x = bar.bar.position.x - 1 + complexity;
    }

    update() {
        // Calculate actual FPS
        this.fpsCounter++;
        const currentTime = performance.now();
        
        if (currentTime - this.lastTime >= 1000) {
            const actualFPS = this.fpsCounter;
            this.fpsCounter = 0;
            this.lastTime = currentTime;
            
            // Update with actual FPS if available
            if (this.fpsSprite) {
                this.updateFPSDisplay(this.fpsSprite, actualFPS, '#00ff00');
            }
        }
    }

    cleanup() {
        // Cleanup is handled by the presentation manager
        this.optimizedScene = null;
        this.complexScene = null;
        this.fpsSprite = null;
        this.complexFpsSprite = null;
        this.optimizedBar = null;
        this.complexBar = null;
        this.mobileIndicator = null;
        this.desktopIndicator = null;
    }
} 