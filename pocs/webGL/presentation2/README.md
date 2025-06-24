# WebGL Presentation - Interactive Three.js Slides

An interactive presentation about WebGL built with Three.js, featuring animated 3D visualizations and interactive elements for each slide.

## Features

### 🎯 **Interactive Slides**
- **Slide 1**: What is WebGL? - Rotating GPU architecture with animated data flow
- **Slide 2**: How Does It Work? - Live shader pipeline demonstration with wireframe vs shader comparison
- **Slide 3**: Practical Use Cases - Mini-showcase carousel with gaming, data viz, e-commerce, and digital art examples
- **Slide 4**: Advantages and Limitations - Performance comparison scene with FPS monitoring

### 🎮 **Interactive Elements**
- **Mouse Controls**: Drag to rotate, scroll to zoom
- **Keyboard Navigation**: Arrow keys to navigate between slides
- **Visual Indicators**: Slide dots, navigation buttons, interactive hints
- **Real-time Animations**: GPU components, particle systems, shader effects

### 🎨 **Visual Effects**
- **Particle Systems**: Data flow visualization, artistic effects
- **Custom Shaders**: Animated materials with GLSL
- **3D Models**: GPU architecture, game scenes, product viewers
- **Performance Monitoring**: Real-time FPS display and complexity indicators

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   cd webgl-presentation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

### Building for Production

```bash
npm run build
npm run preview
```

## How to Use

### Navigation
- **Arrow Keys**: Left/Right to navigate between slides
- **Mouse**: Click and drag to rotate the 3D scene
- **Scroll Wheel**: Zoom in/out
- **Buttons**: Click "Previous" or "Next" buttons
- **Dots**: Click the indicator dots at the top to jump to specific slides

### Interactive Features

#### Slide 1: GPU Architecture
- Watch the GPU model rotate with spinning cores
- Observe color-coded data particles flowing between components
- See pulsing animations on different GPU parts

#### Slide 2: Shader Pipeline
- Compare wireframe vs shader-rendered objects
- Watch particles flow through the rendering pipeline
- See real-time shader animations with displacement and color changes

#### Slide 3: Use Cases Carousel
- Rotate the carousel to see different WebGL applications
- Hover over platforms to see scaling effects
- Watch animated examples of gaming, data visualization, e-commerce, and digital art

#### Slide 4: Performance Comparison
- Compare optimized vs complex scenes side by side
- Monitor real-time FPS counters
- See complexity indicators and device compatibility

## Project Structure

```
webgl-presentation/
├── index.html              # Main HTML file
├── package.json            # Dependencies and scripts
├── README.md              # This file
└── src/
    ├── main.js            # Main application entry point
    ├── PresentationManager.js  # Core presentation management
    └── slides/
        ├── Slide1.js      # What is WebGL?
        ├── Slide2.js      # How Does It Work?
        ├── Slide3.js      # Practical Use Cases
        └── Slide4.js      # Advantages and Limitations
```

## Technical Details

### Technologies Used
- **Three.js**: 3D graphics library
- **Vite**: Build tool and development server
- **ES6 Modules**: Modern JavaScript module system
- **WebGL**: Hardware-accelerated graphics

### Key Components

#### PresentationManager
- Manages Three.js scene, camera, and renderer
- Handles mouse controls and animations
- Provides utility methods for creating common 3D objects
- Manages object lifecycle and cleanup

#### Slide Classes
Each slide extends the base functionality with:
- Custom 3D scenes and animations
- Interactive elements specific to the content
- Performance optimizations
- Cleanup methods

### Performance Features
- Efficient object pooling and cleanup
- Optimized particle systems
- Adaptive complexity based on device capabilities
- Real-time FPS monitoring

## Customization

### Adding New Slides
1. Create a new slide class in `src/slides/`
2. Implement the required methods: `init()`, `update()`, `cleanup()`
3. Add the slide to the slides array in `main.js`
4. Update the slide count in the UI

### Modifying Animations
- Edit the `setupAnimations()` method in each slide
- Adjust timing and easing functions
- Add new particle systems or 3D objects

### Styling
- Modify CSS in `index.html` for UI changes
- Adjust Three.js materials and lighting for visual changes
- Update colors and themes in individual slide files

## Browser Compatibility

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **WebGL Support**: Required for 3D graphics
- **ES6 Support**: Required for module system

## Troubleshooting

### Common Issues

**"WebGL not supported"**
- Update your graphics drivers
- Try a different browser
- Check if hardware acceleration is enabled

**Low FPS**
- Close other browser tabs
- Reduce browser window size
- Check if your device supports WebGL

**Build errors**
- Ensure Node.js version is 14+
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

## License

MIT License - feel free to use this project for educational or commercial purposes.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Enjoy exploring WebGL through this interactive presentation!** 🚀 