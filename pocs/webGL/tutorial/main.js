const vertexShaderSource = `#version 300 es
#pragma vscode_glsllint_stage: vert

// variáveis enviadas do JavaScript para o shader
uniform float uPointSize; // tamanho do ponto em px
uniform vec2 uPosition; // vetor 2d com a posição do ponto

void main() // funcao principal
{
    gl_PointSize = uPointSize; // define o tamanho do ponto
    gl_Position = vec4(uPosition, 0.0, 1.0); // (x, y, z, w)
    // define a posição final como vetor 4D (x, y, z, w)
    // Converte a posição 2D para 4D adicionando z=0.0 e w=1.0
}`;

const fragmentShaderSource = `#version 300 es
#pragma vscode_glsllint_stage: frag

precision mediump float; // Define precisão média para números float

out vec4 fragColor; // Variável de saída que define a cor final do pixel

void main()
{
    fragColor = vec4(1.0, 0.0, 0.0, .5); // Define a cor como vermelho sólido (R=1.0, G=0.0, B=0.0, A=1.0)
}`;

const canvas = document.querySelector('canvas'); // pega o evemento do dom
const gl = canvas.getContext('webgl2'); // cria um context webgl2
const program = gl.createProgram(); // cria um programa

const vertexShader = gl.createShader(gl.VERTEX_SHADER); // cria um objeto vertex shader
gl.shaderSource(vertexShader, vertexShaderSource); // atribui o codigo fonte do shader ao objeto
gl.compileShader(vertexShader); // combila o shader using the CPU
gl.attachShader(program, vertexShader); // Anexa o shader compilado ao programa

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER); 
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);
gl.attachShader(program, fragmentShader);

gl.linkProgram(program);
gl.useProgram(program);

// get the variables from the memory
const uPositionLoc = gl.getUniformLocation(program, 'uPosition');
const uPointSizeLoc = gl.getUniformLocation(program, 'uPointSize');

gl.uniform1f(uPointSizeLoc, 100); // Define tamanho do ponto: 100 pixels
gl.uniform2f(uPositionLoc, 0, 0); // centro horizontal, centro vertical

gl.drawArrays(gl.POINTS, 0, 1); // Here use the GPU