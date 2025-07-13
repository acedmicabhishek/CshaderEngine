#version 330 core
out vec4 FragColor;

uniform vec2 iResolution;
uniform float iTime;
uniform vec3 camPos;
uniform mat4 camMatrix;

// Mandelbulb parameters
const int MAX_ITERATIONS = 100;
const float BAILOUT = 2.0;
const float POWER = 8.0;

vec3 palette(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);
    return a + b * cos(6.28318 * (c * t + d));
}

vec2 mandelbulb(vec3 pos) {
    vec3 z = pos;
    float dr = 1.0;
    float r = 0.0;
    for (int i = 0; i < MAX_ITERATIONS; i++) {
        r = length(z);
        if (r > BAILOUT) break;

        // Convert to spherical coordinates
        float theta = acos(z.y / r);
        float phi = atan(z.x, z.z);
        float r_pow = pow(r, POWER);

        // Apply power and convert back to Cartesian
        theta = theta * POWER;
        phi = phi * POWER;
        dr = pow(r, POWER - 1.0) * POWER * dr + 1.0;

        z = r_pow * vec3(sin(theta) * sin(phi), cos(theta), sin(theta) * cos(phi)) + pos;
    }
    return vec2(r, float(MAX_ITERATIONS));
}

float map(vec3 p) {
    vec2 m = mandelbulb(p);
    return 0.5 * log(m.x) * m.x / m.y;
}

vec3 getNormal(vec3 p) {
    float d = map(p);
    vec2 e = vec2(0.001, 0.0);
    vec3 n = d - vec3(
        map(p - e.xyy),
        map(p - e.yxy),
        map(p - e.yyx)
    );
    return normalize(n);
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;

    vec3 rayOrigin = camPos;
    vec3 rayDirection = normalize(vec3(uv.x, uv.y, -1.0)); // Simple camera direction

    // Apply camera matrix to ray direction
    rayDirection = mat3(camMatrix) * rayDirection;

    float totalDistance = 0.0;
    vec3 p = rayOrigin;
    for (int i = 0; i < MAX_ITERATIONS; i++) {
        float d = map(p);
        totalDistance += d;
        p += rayDirection * d;
        if (d < 0.001 || totalDistance > 10.0) break;
    }

    if (totalDistance > 10.0) {
        FragColor = vec4(0.0, 0.0, 0.0, 1.0); // Background color
    } else {
        vec3 normal = getNormal(p);
        vec3 lightDir = normalize(vec3(0.5, 0.5, 0.5)); // Example light direction
        float diff = max(0.0, dot(normal, lightDir));
        vec3 col = palette(totalDistance * 0.1); // Color based on distance
        FragColor = vec4(col * diff, 1.0);
    }
}