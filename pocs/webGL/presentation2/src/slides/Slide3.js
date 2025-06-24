import * as THREE from 'three';

export class Slide3 {
    constructor(presentationManager) {
        this.presentationManager = presentationManager;
        this.title = "Practical Use Cases";
        this.description = "WebGL powers web games, data visualization, education, e-commerce, and digital art. Examples: Google Earth, Figma, interactive 3D maps.";
        this.interactiveHint = "Drag to rotate carousel • Hover over platforms • Watch different use cases";
        
        this.carousel = null;
        this.platforms = [];
        this.currentPlatform = 0;
        this.targetRotation = 0;
    }

    init() {
        this.presentationManager.clearScene();
        this.presentationManager.createLighting();
        
        this.createShowcaseCarousel();
        this.setupAnimations();
    }

    createShowcaseCarousel() {
        this.carousel = new THREE.Group();
        
        // Create 4 platforms for different use cases
        const useCases = [
            { name: 'Gaming', color: 0xe74c3c, createContent: () => this.createGameScene() },
            { name: 'Data Viz', color: 0x3498db, createContent: () => this.createDataVisualization() },
            { name: 'E-commerce', color: 0xf39c12, createContent: () => this.createProductViewer() },
            { name: 'Digital Art', color: 0x9b59b6, createContent: () => this.createArtInstallation() }
        ];
        
        useCases.forEach((useCase, index) => {
            const platform = this.createPlatform(useCase, index);
            this.platforms.push(platform);
            this.carousel.add(platform);
        });
        
        this.presentationManager.addObject(this.carousel);
    }

    createPlatform(useCase, index) {
        const platform = new THREE.Group();
        
        // Platform base
        const baseGeometry = new THREE.CylinderGeometry(1.5, 1.5, 0.2, 8);
        const baseMaterial = new THREE.MeshPhongMaterial({ 
            color: useCase.color,
            shininess: 50
        });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        platform.add(base);
        
        // Position platform in a circle
        const angle = (index / 4) * Math.PI * 2;
        const radius = 4;
        platform.position.set(
            Math.cos(angle) * radius,
            0,
            Math.sin(angle) * radius
        );
        
        // Add content to platform
        const content = useCase.createContent();
        content.position.y = 0.5;
        platform.add(content);
        
        // Add label
        const label = this.createLabel(useCase.name, useCase.color);
        label.position.y = 1.5;
        platform.add(label);
        
        return platform;
    }

    createGameScene() {
        const gameScene = new THREE.Group();
        
        // Simple character (cube)
        const characterGeometry = new THREE.BoxGeometry(0.3, 0.6, 0.3);
        const characterMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        const character = new THREE.Mesh(characterGeometry, characterMaterial);
        character.position.y = 0.3;
        gameScene.add(character);
        
        // Environment elements
        const groundGeometry = new THREE.PlaneGeometry(2, 2);
        const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x2ecc71 });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.1;
        gameScene.add(ground);
        
        // Obstacles
        for (let i = 0; i < 3; i++) {
            const obstacleGeometry = new THREE.BoxGeometry(0.2, 0.4, 0.2);
            const obstacleMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
            const obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
            obstacle.position.set(
                (Math.random() - 0.5) * 1.5,
                0.2,
                (Math.random() - 0.5) * 1.5
            );
            gameScene.add(obstacle);
        }
        
        // Add animation to character
        const characterAnimation = {
            object: character,
            update: (time) => {
                character.rotation.y += 0.02;
                character.position.y = 0.3 + Math.sin(time * 0.003) * 0.1;
            }
        };
        this.presentationManager.addAnimation(characterAnimation);
        
        return gameScene;
    }

    createDataVisualization() {
        const dataViz = new THREE.Group();
        
        // Create animated bar chart
        const barCount = 5;
        const barData = [0.3, 0.7, 0.5, 0.9, 0.4];
        
        for (let i = 0; i < barCount; i++) {
            const height = barData[i];
            const barGeometry = new THREE.BoxGeometry(0.2, height, 0.2);
            const barMaterial = new THREE.MeshPhongMaterial({ 
                color: new THREE.Color().setHSL(i / barCount, 0.8, 0.5)
            });
            const bar = new THREE.Mesh(barGeometry, barMaterial);
            
            bar.position.set(
                (i - 2) * 0.3,
                height / 2,
                0
            );
            
            dataViz.add(bar);
            
            // Add animation to bars
            const barAnimation = {
                object: bar,
                update: (time) => {
                    const targetHeight = barData[i];
                    const currentHeight = bar.scale.y;
                    bar.scale.y += (targetHeight - currentHeight) * 0.05;
                    bar.position.y = bar.scale.y / 2;
                }
            };
            this.presentationManager.addAnimation(barAnimation);
        }
        
        return dataViz;
    }

    createProductViewer() {
        const productViewer = new THREE.Group();
        
        // Create a simple phone model
        const phoneGeometry = new THREE.BoxGeometry(0.4, 0.8, 0.05);
        const phoneMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x333333,
            shininess: 100
        });
        const phone = new THREE.Mesh(phoneGeometry, phoneMaterial);
        productViewer.add(phone);
        
        // Screen
        const screenGeometry = new THREE.PlaneGeometry(0.35, 0.7);
        const screenMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.position.z = 0.03;
        phone.add(screen);
        
        // Add rotation animation
        const phoneAnimation = {
            object: phone,
            update: (time) => {
                phone.rotation.y += 0.01;
            }
        };
        this.presentationManager.addAnimation(phoneAnimation);
        
        return productViewer;
    }

    createArtInstallation() {
        const artInstallation = new THREE.Group();
        
        // Create particle system for artistic effect
        const particleCount = 100;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        
        for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2;
            const radius = 1 + Math.random() * 0.5;
            
            positions[i * 3] = Math.cos(angle) * radius;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
            positions[i * 3 + 2] = Math.sin(angle) * radius;
            
            // Rainbow colors
            const hue = (i / particleCount);
            const color = new THREE.Color().setHSL(hue, 1, 0.5);
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
            
            sizes[i] = Math.random() * 0.1 + 0.05;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        const material = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });
        
        const particles = new THREE.Points(geometry, material);
        artInstallation.add(particles);
        
        // Add particle animation
        const particleAnimation = {
            object: particles,
            update: (time) => {
                const positions = geometry.attributes.position.array;
                for (let i = 0; i < positions.length; i += 3) {
                    positions[i + 1] += Math.sin(time * 0.001 + i * 0.1) * 0.001;
                }
                geometry.attributes.position.needsUpdate = true;
            }
        };
        this.presentationManager.addAnimation(particleAnimation);
        
        return artInstallation;
    }

    createLabel(text, color) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 64;
        
        context.fillStyle = 'rgba(0, 0, 0, 0.8)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        context.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
        context.font = '20px Arial';
        context.textAlign = 'center';
        context.fillText(text, canvas.width / 2, canvas.height / 2 + 8);
        
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(material);
        sprite.scale.set(1.5, 0.4, 1);
        
        return sprite;
    }

    setupAnimations() {
        // Carousel rotation animation
        const carouselRotation = {
            update: (time) => {
                this.targetRotation += 0.002;
                this.carousel.rotation.y += (this.targetRotation - this.carousel.rotation.y) * 0.05;
            }
        };
        this.presentationManager.addAnimation(carouselRotation);
        
        // Platform hover effects
        const platformHover = {
            update: (time) => {
                this.platforms.forEach((platform, index) => {
                    const hover = Math.sin(time * 0.002 + index * 0.5) * 0.1 + 1;
                    platform.scale.setScalar(hover);
                });
            }
        };
        this.presentationManager.addAnimation(platformHover);
    }

    update() {
        // Additional slide-specific updates
    }

    cleanup() {
        // Cleanup is handled by the presentation manager
        this.carousel = null;
        this.platforms = [];
    }
} 