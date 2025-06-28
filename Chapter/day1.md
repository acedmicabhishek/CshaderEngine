# Calcium3D Project: Working Process and Functionality (Chapter/Day 1)

The `Calcium3D` project is a C++ application designed for 3D graphics rendering using OpenGL. Its current state demonstrates fundamental OpenGL concepts, building upon the initial window creation and basic triangle rendering.

## Working Process

The project's workflow is managed through a `run.sh` script and configured by `CMakeLists.txt`.

1.  **Build Configuration (`CMakeLists.txt`)**:
    *   Specifies the project name (`calcium3d`) and sets the C++ standard to C++17.
    *   Defines include directories for source files and external libraries.
    *   Locates and links essential OpenGL-related libraries: `OpenGL`, `GLFW` (for windowing and input), and `GLEW` (for managing OpenGL extensions).
    *   Creates an executable named `calcium3d` from the source files.
    *   Includes necessary compiler flags, such as `-Wall -Wextra -pedantic` for robust warning checks.

2.  **Build and Run Script (`run.sh`)**:
    *   This shell script automates the compilation and execution process.
    *   It first cleans any previous build artifacts by removing the `build` directory.
    *   A new `build` directory is created, and the script navigates into it.
    *   `cmake ..` is executed to configure the project based on `CMakeLists.txt`, generating platform-specific build files (e.g., Makefiles).
    *   `make` is then run to compile the source code and link the libraries, producing the `calcium3d` executable.
    *   Finally, `./calcium3d` executes the compiled application.

## How it Works (`src/main.cpp`)

The core functionality of the `Calcium3D` application resides in `src/main.cpp`, which orchestrates the OpenGL rendering pipeline:

1.  **Initialization**:
    *   **GLFW (Graphics Library Framework)**: Initialized to handle window creation, user input (keyboard, mouse), and context management.
    *   **GLEW (OpenGL Extension Wrangler Library)**: Initialized to provide access to modern OpenGL functions, as OpenGL is primarily a specification, and specific functions need to be loaded at runtime.

2.  **Window Creation**:
    *   A graphical window of 800x600 pixels is created with the title "Calcium3D Triangle". This window serves as the canvas for all rendering operations.
    *   The OpenGL context is made current for this window, meaning all subsequent OpenGL commands will operate on this context.

3.  **Shader Definition and Management**:
    *   **Vertex Shader**: A simple GLSL (OpenGL Shading Language) vertex shader is defined. Its primary role is to process the 3D coordinates of vertices (`aPos`) and transform them into clip-space coordinates (`gl_Position`).
    *   **Fragment Shader**: A basic GLSL fragment shader is defined. This shader determines the final color of each pixel (fragment) that makes up the rendered geometry. In this case, it outputs a fixed green color (`vec4(0.2, 0.8, 0.3, 1.0)`).
    *   **Shader Program**: Both shaders are compiled and then linked together into a single OpenGL Shader Program using a utility function (`createShaderProgram` from `shader_utils.h`). This program is then used by the GPU to render objects.

4.  **Vertex Data and Buffer Objects**:
    *   **Vertex Data**: An array of floating-point numbers (`vertices[]`) defines the 3D coordinates of a single triangle.
    *   **Vertex Array Object (VAO)**: A VAO is generated and bound. It acts as a container for all the state needed to render a specific object, including vertex buffer objects and vertex attribute configurations.
    *   **Vertex Buffer Object (VBO)**: A VBO is generated, bound, and populated with the `vertices` data. The VBO stores the actual vertex data on the GPU's memory.
    *   **Vertex Attributes**: The `glVertexAttribPointer` and `glEnableVertexAttribArray` functions configure how the data in the VBO should be interpreted and linked to the `aPos` input attribute in the vertex shader.

5.  **Main Rendering Loop**:
    *   The application enters a continuous loop that runs as long as the GLFW window is open.
    *   **Clear Screen**: `glClearColor` sets the background color (a dark gray/blue), and `glClear(GL_COLOR_BUFFER_BIT)` clears the entire color buffer with this color, preparing for a new frame.
    *   **Use Shader Program**: `glUseProgram(shaderProgram)` activates the compiled shader program, ensuring that subsequent drawing commands use these shaders.
    *   **Bind VAO**: `glBindVertexArray(VAO)` binds the VAO, which automatically configures all the vertex attribute pointers and VBO bindings associated with it.
    *   **Draw Call**: `glDrawArrays(GL_TRIANGLES, 0, 3)` issues the command to draw a triangle using the currently bound VAO and active shader program. `GL_TRIANGLES` specifies the primitive type, `0` is the starting index, and `3` is the number of vertices to draw.
    *   **Swap Buffers**: `glfwSwapBuffers(window)` swaps the front and back buffers. OpenGL typically renders to a back buffer, and once rendering is complete, it's swapped with the front buffer (which is currently displayed on the screen) to prevent flickering.
    *   **Poll Events**: `glfwPollEvents()` processes any pending GLFW events, such as window resizing, keyboard input, or mouse movement.

6.  **Cleanup**:
    *   Upon exiting the main loop (when the window is closed), all allocated OpenGL objects (VAO, VBO, shader program) are deleted to free up GPU memory.
    *   The GLFW window is destroyed, and GLFW itself is terminated, releasing all its resources.

