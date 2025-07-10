let gl;
let program;
let positionBuffer;
let colorBuffer;
let rotation = 0;
let animating = false;

// Vertex shader source code
const vertexShaderSource = `
    attribute vec4 a_position;
    attribute vec4 a_color;
    varying vec4 v_color;
    uniform float u_rotation;
    
    void main() {
        float cos_r = cos(u_rotation);
        float sin_r = sin(u_rotation);
        
        mat2 rotationMatrix = mat2(cos_r, -sin_r, sin_r, cos_r);
        vec2 rotated = rotationMatrix * a_position.xy;
        
        gl_Position = vec4(rotated, 0.0, 1.0);
        v_color = a_color;
    }
`;

// Fragment shader source code
const fragmentShaderSource = `
    precision mediump float;
    varying vec4 v_color;
    
    void main() {
        gl_FragColor = v_color;
    }
`;

function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    
    return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program linking error:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }
    
    return program;
}

function initWebGL() {
    const canvas = document.getElementById('webgl-canvas');
    gl = canvas.getContext('webgl');
    
    if (!gl) {
        alert('WebGL not supported');
        return;
    }

    // Create shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    // Create program
    program = createProgram(gl, vertexShader, fragmentShader);
    
    // Set up triangle vertices (x, y coordinates)
    const positions = [
         0.0,  0.5,  // Top vertex
        -0.5, -0.5,  // Bottom left
         0.5, -0.5   // Bottom right
    ];
    
    // Set up colors for each vertex (R, G, B, A)
    const colors = [
        1.0, 0.0, 0.0, 1.0,  // Red
        0.0, 1.0, 0.0, 1.0,  // Green
        0.0, 0.0, 1.0, 1.0   // Blue
    ];
    
    // Create and bind position buffer
    positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    
    // Create and bind color buffer
    colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    
    // Set viewport
    gl.viewport(0, 0, canvas.width, canvas.height);
    
    // Clear color
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    
    render();
}

function render() {
    // Clear the canvas
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    // Use our shader program
    gl.useProgram(program);
    
    // Set up position attribute
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    
    // Set up color attribute
    const colorLocation = gl.getAttribLocation(program, 'a_color');
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.enableVertexAttribArray(colorLocation);
    gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 0, 0);
    
    // Set rotation uniform
    const rotationLocation = gl.getUniformLocation(program, 'u_rotation');
    gl.uniform1f(rotationLocation, rotation);
    
    // Draw the triangle
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    
    if (animating) {
        rotation += 0.02;
        requestAnimationFrame(render);
    }
}

function changeColors() {
    const newColors = [
        Math.random(), Math.random(), Math.random(), 1.0,
        Math.random(), Math.random(), Math.random(), 1.0,
        Math.random(), Math.random(), Math.random(), 1.0
    ];
    
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(newColors), gl.STATIC_DRAW);
    render();
}

function rotateTriangle() {
    animating = !animating;
    if (animating) {
        render();
    }
}

function resetTriangle() {
    animating = false;
    rotation = 0;
    
    // Reset to original colors
    const originalColors = [
        1.0, 0.0, 0.0, 1.0,  // Red
        0.0, 1.0, 0.0, 1.0,  // Green
        0.0, 0.0, 1.0, 1.0   // Blue
    ];
    
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(originalColors), gl.STATIC_DRAW);
    render();
}

// Initialize WebGL when the page loads
window.onload = initWebGL;