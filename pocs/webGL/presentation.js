// Initialize Three.js scene and setup
let camera, scene, renderer;
let currentSlide = 0;
const totalSlides = 5;

// Slide content
const slides = [
  {
    title: "Introduction to WebGL",
    content: `
            <h1>Introduction to WebGL</h1>
            <p>WebGL (Web Graphics Library) is a JavaScript API for rendering 3D graphics within any compatible web browser without the use of plug-ins.</p>
            <p>WebGL is based on OpenGL ES, bringing hardware-accelerated 3D graphics to the web.</p>
        `,
    setup: setupIntroScene
  },
  {
    title: "WebGL Pipeline",
    content: `
            <h1>WebGL Rendering Pipeline</h1>
            <p>WebGL uses a rendering pipeline that processes data through several stages:</p>
            <ul>
                <li>Vertex Processing: Transforms 3D coordinates into 2D</li>
                <li>Primitive Assembly: Connects vertices to form primitives</li>
                <li>Rasterization: Converts primitives to fragments (pixels)</li>
                <li>Fragment Processing: Determines final color of each pixel</li>
            </ul>
        `,
    setup: setupPipelineScene
  },
  {
    title: "Shaders in WebGL",
    content: `
            <h1>WebGL Shaders</h1>
            <p>Shaders are small programs that run on the GPU:</p>
            <ul>
                <li><strong>Vertex Shaders:</strong> Process vertex data, position elements in space</li>
                <li><strong>Fragment Shaders:</strong> Process each pixel, determine final colors</li>
            </ul>
            <p>Shaders are written in GLSL (OpenGL Shading Language)</p>
        `,
    setup: setupShaderScene
  },
  {
    title: "WebGL Advantages",
    content: `
            <h1>Advantages of WebGL</h1>
            <ul>
                <li>Hardware acceleration for better performance</li>
                <li>Cross-platform compatibility</li>
                <li>No plugins required (built into modern browsers)</li>
                <li>Integration with other web technologies</li>
                <li>Wide range of applications: games, data visualization, 3D modeling, simulations</li>
            </ul>
        `,
    setup: setupAdvantagesScene
  },
  {
    title: "Getting Started with WebGL",
    content: `
            <h1>Getting Started with WebGL</h1>
            <p>To start using WebGL, you need:</p>
            <ul>
                <li>HTML5 Canvas element</li>
                <li>JavaScript to initialize WebGL context</li>
                <li>Understanding of 3D mathematics</li>
                <li>GLSL for writing shaders</li>
            </ul>
            <p>Libraries like Three.js can simplify development</p>
        `,
    setup: setupFinalScene
  }
];

// Initialize the presentation
init();
animate();

function init() {
  // Create renderer
  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('webgl-canvas'),
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x111111);

  // Create scene
  scene = new THREE.Scene();

  // Create camera
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // Setup first slide
  updateSlide(0);

  // Add event listeners
  document.getElementById('next-slide').addEventListener('click', nextSlide);
  document.getElementById('prev-slide').addEventListener('click', prevSlide);
  window.addEventListener('resize', onWindowResize);
  window.addEventListener('keydown', onKeyDown);
}

function updateSlide(index) {
  // Update slide counter
  document.getElementById('slide-counter').textContent = `Slide ${index + 1} / ${totalSlides}`;

  // Update slide content
  document.getElementById('slide-content').innerHTML = slides[index].content;

  // Clear previous objects
  clearScene();

  // Setup new scene for this slide
  slides[index].setup();
}

function clearScene() {
  // Remove all meshes from the scene
  scene.children.forEach(child => {
    if (child instanceof THREE.Mesh || child instanceof THREE.Group) {
      if (child !== camera) {
        scene.remove(child);
      }
    }
  });

  // Keep only lights and camera
  const lights = scene.children.filter(child =>
    child instanceof THREE.AmbientLight ||
    child instanceof THREE.DirectionalLight
  );

  scene.children = [...lights];
  scene.add(camera);
}

function nextSlide() {
  if (currentSlide < totalSlides - 1) {
    currentSlide++;
    updateSlide(currentSlide);
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    updateSlide(currentSlide);
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onKeyDown(event) {
  if (event.key === 'ArrowRight' || event.key === ' ') {
    nextSlide();
  } else if (event.key === 'ArrowLeft') {
    prevSlide();
  }
}

function animate() {
  requestAnimationFrame(animate);

  // Rotate all visible meshes
  scene.children.forEach(child => {
    if (child instanceof THREE.Mesh) {
      child.rotation.x += 0.005;
      child.rotation.y += 0.01;
    }
  });

  renderer.render(scene, camera);
}

// Scene setup functions for each slide
function setupIntroScene() {
  // Create a rotating cube
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.MeshPhongMaterial({
    color: 0x4dabf7,
    wireframe: false,
    transparent: true,
    opacity: 0.8
  });

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Add wireframe overlay
  const wireframe = new THREE.LineSegments(
    new THREE.EdgesGeometry(geometry),
    new THREE.LineBasicMaterial({ color: 0xffffff })
  );
  cube.add(wireframe);

  // Animation
  gsap.to(cube.rotation, {
    y: Math.PI * 2,
    duration: 10,
    repeat: -1,
    ease: "none"
  });
}

function setupPipelineScene() {
  // Create a pipeline visualization with flowing particles
  const pipelineGroup = new THREE.Group();
  scene.add(pipelineGroup);

  // Create pipeline tubes
  const pipeGeometry = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3, 2, 0),
      new THREE.Vector3(-1, 1, 0),
      new THREE.Vector3(1, -1, 0),
      new THREE.Vector3(3, -2, 0)
    ]),
    64,
    0.2,
    8,
    false
  );

  const pipeMaterial = new THREE.MeshPhongMaterial({
    color: 0x69db7c,
    transparent: true,
    opacity: 0.5
  });

  const pipe = new THREE.Mesh(pipeGeometry, pipeMaterial);
  pipelineGroup.add(pipe);

  // Add particles flowing through the pipeline
  const particleCount = 20;
  for (let i = 0; i < particleCount; i++) {
    const particleGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const particleMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.5
    });

    const particle = new THREE.Mesh(particleGeometry, particleMaterial);
    pipelineGroup.add(particle);

    // Animate the particle along the pipeline
    gsap.fromTo(
      particle.position,
      { x: -3, y: 2, z: 0 },
      {
        motionPath: {
          path: [
            { x: -3, y: 2, z: 0 },
            { x: -1, y: 1, z: 0 },
            { x: 1, y: -1, z: 0 },
            { x: 3, y: -2, z: 0 }
          ],
          curviness: 1
        },
        duration: 5,
        delay: i * 0.25,
        repeat: -1,
        ease: "power1.inOut"
      }
    );
  }

  // Rotate the entire pipeline slowly
  gsap.to(pipelineGroup.rotation, {
    y: Math.PI * 2,
    duration: 30,
    repeat: -1,
    ease: "none"
  });
}

function setupShaderScene() {
  // Create a shader demo with colorful icosahedron
  const geometry = new THREE.IcosahedronGeometry(1.5, 1);

  // Use ShaderMaterial to demonstrate shaders
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0.0 }
    },
    vertexShader: `
            varying vec2 vUv;
            varying vec3 vPosition;
            
            void main() {
                vUv = uv;
                vPosition = position;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
    fragmentShader: `
            uniform float time;
            varying vec2 vUv;
            varying vec3 vPosition;
            
            void main() {
                vec3 color = 0.5 + 0.5 * cos(time + vPosition.xzy + vec3(0, 2, 4));
                gl_FragColor = vec4(color, 1.0);
            }
        `,
    wireframe: true
  });

  const icosahedron = new THREE.Mesh(geometry, material);
  scene.add(icosahedron);

  // Animation for time uniform
  const clock = new THREE.Clock();
  scene.userData.clock = clock;

  // Update time uniform in animation loop
  const originalAnimate = animate;
  animate = function() {
    requestAnimationFrame(animate);

    if (currentSlide === 2) { // Shader slide
      material.uniforms.time.value = clock.getElapsedTime();
    }

    scene.children.forEach(child => {
      if (child instanceof THREE.Mesh) {
        child.rotation.x += 0.005;
        child.rotation.y += 0.01;
      }
    });

    renderer.render(scene, camera);
  };
}

function setupAdvantagesScene() {
  // Create multiple geometric shapes to showcase variety
  const shapes = [];

  // Create a torus
  const torusGeometry = new THREE.TorusGeometry(1, 0.3, 16, 50);
  const torusMaterial = new THREE.MeshPhongMaterial({
    color: 0x4dabf7,
    shininess: 100
  });
  const torus = new THREE.Mesh(torusGeometry, torusMaterial);
  torus.position.x = -2;
  scene.add(torus);
  shapes.push(torus);

  // Create an octahedron
  const octaGeometry = new THREE.OctahedronGeometry(1);
  const octaMaterial = new THREE.MeshPhongMaterial({
    color: 0xffa8a8,
    shininess: 100
  });
  const octahedron = new THREE.Mesh(octaGeometry, octaMaterial);
  octahedron.position.x = 2;
  scene.add(octahedron);
  shapes.push(octahedron);

  // Create a dodecahedron
  const dodecaGeometry = new THREE.DodecahedronGeometry(1);
  const dodecaMaterial = new THREE.MeshPhongMaterial({
    color: 0xffe066,
    shininess: 100
  });
  const dodecahedron = new THREE.Mesh(dodecaGeometry, dodecaMaterial);
  dodecahedron.position.y = -2;
  scene.add(dodecahedron);
  shapes.push(dodecahedron);

  // Create a tetrahedron
  const tetraGeometry = new THREE.TetrahedronGeometry(1);
  const tetraMaterial = new THREE.MeshPhongMaterial({
    color: 0x69db7c,
    shininess: 100
  });
  const tetrahedron = new THREE.Mesh(tetraGeometry, tetraMaterial);
  tetrahedron.position.y = 2;
  scene.add(tetrahedron);
  shapes.push(tetrahedron);

  // Animate all shapes
  shapes.forEach((shape, index) => {
    gsap.to(shape.rotation, {
      x: Math.PI * 2,
      y: Math.PI * 2,
      duration: 5 + index,
      repeat: -1,
      ease: "none"
    });
  });
}

function setupFinalScene() {
  // Create a code block visualization
  const group = new THREE.Group();
  scene.add(group);

  // Create a canvas with code
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext('2d');

  // Fill background
  context.fillStyle = '#222';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Write code
  context.font = '22px monospace';
  context.fillStyle = '#fff';

  const code = [
    "// Initialize WebGL",
    "const canvas = document.querySelector('#canvas');",
    "const gl = canvas.getContext('webgl');",
    "",
    "// Create shaders",
    "const vertexShader = gl.createShader(gl.VERTEX_SHADER);",
    "const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);",
    "",
    "// Compile and link shaders",
    "gl.compileShader(vertexShader);",
    "gl.compileShader(fragmentShader);",
    "",
    "// Create program",
    "const program = gl.createProgram();",
    "gl.attachShader(program, vertexShader);",
    "gl.attachShader(program, fragmentShader);",
    "gl.linkProgram(program);",
    "gl.useProgram(program);"
  ];

  // Add syntax highlighting by coloring different parts
  code.forEach((line, i) => {
    // Add line numbers
    context.fillStyle = '#666';
    context.fillText(`${i + 1}`, 10, 30 + i * 28);

    // Add actual code with basic syntax highlighting
    if (line.includes('//')) {
      // Comments in green
      context.fillStyle = '#69db7c';
      context.fillText(line, 40, 30 + i * 28);
    } else {
      // Highlight keywords in different colors
      let remainingLine = line;
      let xPos = 40;

      // Constants and variables in blue
      const constants = ['const', 'let', 'var'];
      constants.forEach(keyword => {
        if (remainingLine.includes(keyword + ' ')) {
          const parts = remainingLine.split(keyword + ' ');

          // Draw the keyword
          context.fillStyle = '#4dabf7';
          context.fillText(keyword + ' ', xPos, 30 + i * 28);
          xPos += context.measureText(keyword + ' ').width;

          remainingLine = parts[1];
        }
      });

      // Functions in orange
      const functions = ['createShader', 'querySelector', 'getContext', 'compileShader', 'createProgram', 'attachShader', 'linkProgram', 'useProgram'];
      functions.forEach(func => {
        if (remainingLine.includes(func)) {
          const parts = remainingLine.split(func);

          // Draw the part before function
          context.fillStyle = '#fff';
          context.fillText(parts[0], xPos, 30 + i * 28);
          xPos += context.measureText(parts[0]).width;

          // Draw the function
          context.fillStyle = '#ffa8a8';
          context.fillText(func, xPos, 30 + i * 28);
          xPos += context.measureText(func).width;

          remainingLine = parts[1];
        }
      });

      // Draw the rest of the line
      context.fillStyle = '#fff';
      context.fillText(remainingLine, xPos, 30 + i * 28);
    }
  });

  // Use the canvas as a texture
  const texture = new THREE.CanvasTexture(canvas);

  // Create a plane with the code texture
  const planeGeometry = new THREE.PlaneGeometry(4, 4);
  const planeMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide
  });

  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  group.add(plane);

  // Add floating cubes around the code
  for (let i = 0; i < 20; i++) {
    const size = 0.1 + Math.random() * 0.2;
    const cubeGeometry = new THREE.BoxGeometry(size, size, size);
    const cubeMaterial = new THREE.MeshPhongMaterial({
      color: new THREE.Color().setHSL(Math.random(), 0.7, 0.5),
      transparent: true,
      opacity: 0.7
    });

    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    // Position cubes in a sphere around the plane
    const radius = 3;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;

    cube.position.x = radius * Math.sin(phi) * Math.cos(theta);
    cube.position.y = radius * Math.sin(phi) * Math.sin(theta);
    cube.position.z = radius * Math.cos(phi);

    // Add animation to cubes
    gsap.to(cube.position, {
      x: cube.position.x * 0.8,
      y: cube.position.y * 0.8,
      z: cube.position.z * 0.8,
      duration: 2 + Math.random() * 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    group.add(cube);
  }

  // Rotate the entire group
  gsap.to(group.rotation, {
    y: Math.PI * 2,
    duration: 30,
    repeat: -1,
    ease: "none"
  });
}