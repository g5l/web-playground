import * as THREE from 'three';
import { PresentationManager } from './PresentationManager.js';
import { Slide1 } from './slides/Slide1.js';
import { Slide2 } from './slides/Slide2.js';
import { Slide3 } from './slides/Slide3.js';
import { Slide4 } from './slides/Slide4.js';
import { SlideProblemWebGL } from './slides/SlideProblemWebGL.js';
import { Slide5 } from './slides/Slide5.js';
import { SlideCodeDemo } from './slides/SlideCodeDemo.js';

class WebGLPresentation {
    constructor() {
        this.container = document.getElementById('canvas-container');
        this.currentSlide = 0;
        this.slides = [];
        this.presentationManager = null;
        
        this.init();
    }

    init() {
        // Initialize Three.js scene
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x0a0a0a);
        this.container.appendChild(this.renderer.domElement);

        // Set up camera
        this.camera.position.z = 5;

        // Initialize presentation manager
        this.presentationManager = new PresentationManager(this.scene, this.camera, this.renderer);
        
        // Initialize slides
        this.slides = [
            new Slide1(this.presentationManager),
            new SlideProblemWebGL(this.presentationManager),
            // new Slide2(this.presentationManager),
            new Slide3(this.presentationManager),
            new SlideCodeDemo(this.presentationManager),
            new Slide4(this.presentationManager),
            new Slide5(this.presentationManager)
        ];

        // Set up event listeners
        this.setupEventListeners();
        
        // Start with first slide
        this.showSlide(0);
        
        // Start animation loop
        this.animate();
    }

    setupEventListeners() {
        // Keyboard navigation
        document.addEventListener('keydown', (event) => {
            switch(event.key) {
                case 'ArrowLeft':
                    this.previousSlide();
                    break;
                case 'ArrowRight':
                    this.nextSlide();
                    break;
            }
        });

        // Button navigation
        document.getElementById('prev-btn').addEventListener('click', () => this.previousSlide());
        document.getElementById('next-btn').addEventListener('click', () => this.nextSlide());

        // Window resize
        window.addEventListener('resize', () => this.onWindowResize());

        // Slide indicators
        this.createSlideIndicators();
    }

    createSlideIndicators() {
        const indicator = document.getElementById('slide-indicator');
        indicator.innerHTML = '';
        
        for (let i = 0; i < this.slides.length; i++) {
            const dot = document.createElement('div');
            dot.className = 'indicator-dot';
            dot.addEventListener('click', () => this.showSlide(i));
            indicator.appendChild(dot);
        }
    }

    showSlide(index) {
        if (index < 0 || index >= this.slides.length) return;
        
        console.log(`Transitioning from slide ${this.currentSlide} to slide ${index}`);
        
        try {
            // Clean up current slide
            if (this.slides[this.currentSlide]) {
                this.slides[this.currentSlide].cleanup();
            }
            
            this.currentSlide = index;
            
            // Initialize new slide
            this.slides[this.currentSlide].init();
            
            // Update UI
            this.updateUI();
            
            console.log(`Now on slide ${this.currentSlide}: ${this.slides[this.currentSlide].title}`);
        } catch (error) {
            console.error('Error during slide transition:', error);
        }
    }

    updateUI() {
        const slide = this.slides[this.currentSlide];
        
        console.log('Updating UI for slide:', slide.title);
        
        // Update title and description
        document.getElementById('slide-title').textContent = slide.title;
        document.getElementById('slide-description').innerHTML = slide.description;
        document.getElementById('slide-number').textContent = `${this.currentSlide + 1} / ${this.slides.length}`;
        
        // Update indicators
        const dots = document.querySelectorAll('.indicator-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
        
        // Update button states
        document.getElementById('prev-btn').disabled = this.currentSlide === 0;
        document.getElementById('next-btn').disabled = this.currentSlide === this.slides.length - 1;
        
        console.log('UI updated');
    }

    nextSlide() {
        if (this.currentSlide < this.slides.length - 1) {
            this.showSlide(this.currentSlide + 1);
        }
    }

    previousSlide() {
        if (this.currentSlide > 0) {
            this.showSlide(this.currentSlide - 1);
        }
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Update presentation manager (controls and animations)
        if (this.presentationManager) {
            this.presentationManager.update();
        }
        
        // Update current slide
        if (this.slides[this.currentSlide]) {
            this.slides[this.currentSlide].update();
        }
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize the presentation when the page loads
window.addEventListener('DOMContentLoaded', () => {
    new WebGLPresentation();
}); 