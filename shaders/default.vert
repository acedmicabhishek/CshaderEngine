#version 330 core
layout (location = 0) in vec3 aPos;
layout (location = 1) in vec2 aTexCoord;

out vec2 TexCoord;

uniform mat4 model;
uniform mat4 camMatrix;
uniform float time; // Add time uniform
uniform float rotationSpeed; // New uniform for rotation speed
uniform float scaleSpeed;    // New uniform for pulse speed
uniform float scaleAmount;   // New uniform for pulse magnitude
out float yPos; // Pass y-coordinate to fragment shader

void main() {
    gl_Position = camMatrix * model * vec4(aPos, 1.0);
    TexCoord = aTexCoord;
    yPos = aPos.y; // Pass original y-coordinate
}