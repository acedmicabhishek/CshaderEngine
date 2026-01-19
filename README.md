# (CshaderEngine)

Code editor for Graphics

![Preview](gif/1752440852523.gif)

## Stack

- **Graphics API**: OpenGL 3.3+ (Core Profile)
- **Windowing & Input**: [GLFW](https://www.glfw.org/)
- **OpenGL Loading**: [GLAD](https://glad.dav1d.de/)
- **Mathematics**: [GLM](https://github.com/g-truc/glm)
- **Image Loading**: [stb_image](https://github.com/nothings/stb)
- **Build System**: CMake


## Controls

### Camera Interaction
- **Left Click**: Enable rotation/movement (Captures mouse)
- **Escape**: Release cursor
- **W / A / S / D**: Move Forward / Left / Backward / Right
- **Space**: Move Up
- **Left Control**: Move Down
- **Left Shift**: Boost speed (Sprint)
- **Mouse**: Look around

## Shader Uniforms

There are **5 active uniforms** available

| Uniform | Type | Description |
| :--- | :--- | :--- |
| `iResolution` | `vec2` | Window resolution (width, height) |
| `iTime` | `float` | Time since program start (seconds) |
| `iMouse` | `vec2` | Mouse cursor position |
| `camPos` | `vec3` | Current camera position in world space |
| `camMatrix` | `mat4` | Combined View-Projection matrix |

## Build and Run

### Dependencies

Ensure you have the following installed on your system:
- **CMake** (3.10+)
- **OpenGL**
- **GLFW3**
- **GLEW**

### Compilation

You can use the provided `run.sh` script to build and launch the engine automatically:

```bash
chmod +x run.sh
./run.sh
```

Alternatively, manual build:

```bash
mkdir build && cd build
cmake ..
make
./CshaderEngine
```
