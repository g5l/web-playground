const vertexShaderSource = `#version 300 es
#pragma vscode_glsllint_stage: vert

uniform float uPointSize;
uniform vec2 uPosition;

void main()
{
    gl_PointSize = uPointSize;
    gl_Position = vec4(uPosition, 0.0, 1.0);
}`;

const fragmentShaderSource = `#version 300 es
#pragma vscode_glsllint_stage: frag

precision mediump float;

out vec4 fragColor;

void main()
{
    fragColor = vec4(1.0, 0.0, 0.0, .5);
}`;

const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl2');
const program = gl.createProgram();

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);
gl.attachShader(program, vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER); 
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);
gl.attachShader(program, fragmentShader);

gl.linkProgram(program);
gl.useProgram(program);

// get the variables from the memory
const uPositionLoc = gl.getUniformLocation(program, 'uPosition');
const uPointSizeLoc = gl.getUniformLocation(program, 'uPointSize');

gl.uniform1f(uPointSizeLoc, 100);
gl.uniform2f(uPositionLoc, 0, 0);

gl.drawArrays(gl.POINTS, 0, 1);