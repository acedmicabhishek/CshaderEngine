#version 330 core
layout (location = 0) in vec3 aPos;
layout (location = 1) in vec2 aTexCoord;

out vec2 TexCoord;

uniform float time;

void main() {
    float scale = (sin(time) + 1.0) / 2.0 * 0.5 + 0.75;
    gl_Position = vec4(aPos.x * scale, -aPos.y * scale, aPos.z * scale, 1.0);
    TexCoord = aTexCoord;
}