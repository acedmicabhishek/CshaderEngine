#version 330 core
out vec4 FragColor;

uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;

const int MAX_ITERATIONS = 256;

vec3 palette(float t) {
    return 0.5 + 0.5 * cos(6.28318 * (vec3(0.8, 0.5, 0.4) * t + vec3(0.0, 0.15, 0.20)));
}

void main()
{
    vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;

    // Zoom and pan based on mouse input
    float zoom = 1.0;
    vec2 pan = vec2(0.0);

    if (iMouse.x > 0.0 || iMouse.y > 0.0) {
        zoom = mix(1.0, 0.001, iMouse.y / iResolution.y);
        pan = mix(vec2(0.0), vec2(-0.75, 0.0), iMouse.x / iResolution.x);
    }

    vec2 c = uv / zoom + pan;
    c.x -= 0.5; // Center the fractal

    vec2 z = vec2(0.0);
    float iter = 0.0;

    for (int i = 0; i < MAX_ITERATIONS; i++) {
        z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
        if (dot(z, z) > 4.0) {
            iter = float(i);
            break;
        }
    }

    vec3 color = vec3(0.0);
    if (iter > 0.0) {
        color = palette(iter / float(MAX_ITERATIONS) + iTime * 0.05);
    }

    FragColor = vec4(color, 1.0);
}
