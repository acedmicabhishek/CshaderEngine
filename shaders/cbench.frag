#version 330 core
out vec4 FragColor;

in vec3 FragPos;

uniform vec3 cameraPos;

#define MAX_ITER 256
#define BAILOUT 4

void main() {
    // Convert fragment position to complex number
    vec2 c = vec2(FragPos.x, FragPos.y);
    vec2 z = vec2(0.0, 0.0);
    int i;
    for (i = 0; i < MAX_ITER; i++) {
        float x = (z.x * z.x - z.y * z.y) + c.x;
        float y = (2.0 * z.x * z.y) + c.y;
        z.x = x;
        z.y = y;
        if (dot(z, z) > BAILOUT)
            break;
    }

    float color = float(i) / float(MAX_ITER);
    FragColor = vec4(color, color, color, 1.0);
}