// src/main.cpp
#include <glad/glad.h>

#include <GLFW/glfw3.h>
#include <iostream>
#include <cmath>
#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/gtc/type_ptr.hpp>
#include "Shader.h"
#include "Camera.h"
#include "VAO.h"
#include "VBO.h"
#include "EBO.h"
#include "Texture.h"
#define STB_IMAGE_IMPLEMENTATION
#include "stb/stb_image.h"

#include "Shader.h"

int main() {
    // Initialize GLFW
    if (!glfwInit()) {
        std::cerr << "Failed to initialize GLFW\n";
        return -1;
    }

    GLFWwindow* window = glfwCreateWindow(1920, 1080, "CshaderEngine", nullptr, nullptr);
    if (!window) {
        std::cerr << "Failed to create GLFW window\n";
        glfwTerminate();
        return -1;
    }

    // Tell GLFW to capture our mouse
    glfwSetInputMode(window, GLFW_CURSOR, GLFW_CURSOR_DISABLED);

    glfwMakeContextCurrent(window);

    // glad: load all OpenGL function pointers
    // ---------------------------------------
    if (!gladLoadGLLoader((GLADloadproc)glfwGetProcAddress))
    {
        std::cerr << "Failed to initialize GLAD\n";
        return -1;
    }

    // Triangle vertices with texture coordinates
    // Vertices coordinates

    GLfloat quadVertices[] = {
        // Positions   // TexCoords
        -1.0f,  1.0f,  0.0f, 1.0f,
        -1.0f, -1.0f,  0.0f, 0.0f,
         1.0f, -1.0f,  1.0f, 0.0f,

        -1.0f,  1.0f,  0.0f, 1.0f,
         1.0f, -1.0f,  1.0f, 0.0f,
         1.0f,  1.0f,  1.0f, 1.0f
    };

    // Setup quad VAO and VBO
    VAO quadVAO;
    quadVAO.Bind();
    VBO quadVBO(quadVertices, sizeof(quadVertices));
    quadVAO.LinkAttrib(quadVBO, 0, 2, GL_FLOAT, 4 * sizeof(float), (void*)0);
    quadVAO.LinkAttrib(quadVBO, 1, 2, GL_FLOAT, 4 * sizeof(float), (void*)(2 * sizeof(float)));
    quadVAO.Unbind();
    quadVBO.Unbind();

    Shader mainShader("../shaders/main.vert", "../shaders/main.frag");

    // Enables the Depth Buffer
    glEnable(GL_DEPTH_TEST);

    // Creates camera object
    Camera camera(800, 600, glm::vec3(0.0f, 0.0f, 2.0f));

    // Main while loop
    while (!glfwWindowShouldClose(window))
    {
        // Specify the color of the background
        glClearColor(0.07f, 0.13f, 0.17f, 1.0f);
        // Clean the back buffer and depth buffer
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

        // Handles camera inputs
        camera.Inputs(window);

        mainShader.use();
        glUniform2f(glGetUniformLocation(mainShader.ID, "iResolution"), 800.0f, 600.0f);
        glUniform1f(glGetUniformLocation(mainShader.ID, "iTime"), glfwGetTime());
        double mouseX, mouseY;
        glfwGetCursorPos(window, &mouseX, &mouseY);
        glUniform2f(glGetUniformLocation(mainShader.ID, "iMouse"), (float)mouseX, (float)mouseY);
        glUniform3f(glGetUniformLocation(mainShader.ID, "camPos"), camera.Position.x, camera.Position.y, camera.Position.z);
        camera.Matrix(45.0f, 0.1f, 100.0f, mainShader, "camMatrix");

        quadVAO.Bind();
        glDrawArrays(GL_TRIANGLES, 0, 6);

        // Swap the back buffer with the front buffer
        glfwSwapBuffers(window);
        // Take care of all GLFW events
        glfwPollEvents();
    }

    // Delete all the objects we've created
    quadVAO.Delete();
    quadVBO.Delete();
    mainShader.Delete();

    glfwDestroyWindow(window);
    glfwTerminate();
    return 0;
}
