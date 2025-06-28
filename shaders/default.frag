#version 330 core
out vec4 FragColor;
uniform float time;
void main() {
    vec3 color = 0.5 * (sin(time) + 1.0) * vec3(0.5, 0.2, 0.8) + vec3(0.2, 0.3, 0.5);
    FragColor = vec4(color, 1.0);
}