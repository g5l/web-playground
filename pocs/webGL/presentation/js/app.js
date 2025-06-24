class Presentation {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.slides = [];
        this.currentSlide = 0;
        
        this.init();
        this.createSlides();
        this.animate();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        
        // Add ambient light
        const light = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(light);
        
        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);
        
        // Set initial camera position
        this.camera.position.z = 5;
        
        // Add event listeners for keyboard navigation
        window.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (event.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    createSlides() {
        // Slide 1: WebGL GPU Architecture
        const slide1 = new THREE.Group();
        
        // Create GPU model
        const gpuGeometry = new THREE.BoxGeometry(2, 1, 0.5);
        const gpuMaterial = new THREE.MeshPhongMaterial({ color: 0x4444ff });
        const gpuMesh = new THREE.Mesh(gpuGeometry, gpuMaterial);
        gpuMesh.position.y = 0.5;
        slide1.add(gpuMesh);
        
        // Add spinning cores
        const coreGeometry = new THREE.SphereGeometry(0.1, 32, 32);
        const coreMaterial = new THREE.MeshPhongMaterial({ color: 0xffaa00 });
        for (let i = 0; i < 4; i++) {
            const core = new THREE.Mesh(coreGeometry, coreMaterial);
            core.position.set(
                Math.cos(i * Math.PI / 2) * 1.5,
                Math.sin(i * Math.PI / 2) * 1.5,
                0
            );
            slide1.add(core);
        }
        
        // Add text
        const loader = new THREE.FontLoader();
        loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
            const textGeometry = new THREE.TextGeometry('WebGL', {
                font: font,
                size: 0.3,
                height: 0.1
            });
            const textMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            textMesh.position.set(0, -1, 0);
            slide1.add(textMesh);
        });
        
        this.slides.push(slide1);
        this.scene.add(slide1);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Animate current slide
        if (this.slides[this.currentSlide]) {
            this.slides[this.currentSlide].children.forEach((child) => {
                if (child.type === 'Mesh' && child.name === 'core') {
                    child.rotation.y += 0.01;
                }
            });
        }
        
        this.renderer.render(this.scene, this.camera);
    }

    nextSlide() {
        if (this.currentSlide < this.slides.length - 1) {
            this.currentSlide++;
            this.updateSlide();
        }
    }

    prevSlide() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
            this.updateSlide();
        }
    }

    updateSlide() {
        // Hide all slides
        this.slides.forEach(slide => slide.visible = false);
        
        // Show current slide
        this.slides[this.currentSlide].visible = true;
    }
}

// Initialize the presentation
window.addEventListener('load', () => {
    new Presentation();
});
