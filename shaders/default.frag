#version 330 core
out vec4 FragColor;

in vec2 TexCoord;
in float yPos; // Receive y-coordinate from vertex shader

uniform sampler2D ourTexture;
uniform float time; // Add time uniform
uniform float rainbowSpeed; // New uniform for rainbow speed
uniform float rainbowDensity; // New uniform for rainbow density

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
    // Rainbow waterfall effect based on y-position and time
    float hue = fract(yPos * rainbowDensity + time * rainbowSpeed);
    vec3 rainbowColor = hsv2rgb(vec3(hue, 1.0, 1.0)); // Full saturation and value

    // Combine texture color with rainbow effect
    vec4 texColor = texture(ourTexture, TexCoord);
    FragColor = vec4(rainbowColor * texColor.rgb, texColor.a);
}