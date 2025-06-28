#version 330 core
out vec4 FragColor;
uniform float scale;
void main() {
    FragColor = vec4(1.0 - (0.2 * scale), 1.0 - (0.8 * scale), 1.0 - (0.3 * scale), 1.0);
}