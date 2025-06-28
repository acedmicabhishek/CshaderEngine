// src/shader_utils.h

#pragma once
#include <GL/glew.h>
#include <string>
#include <iostream>

// compileShader(type, source)

inline GLuint compileShader(GLenum type, const char* source) {
    GLuint shader = glCreateShader(type);
    glShaderSource(shader, 1, &source, nullptr);
    glCompileShader(shader);
    GLint success;
    glGetShaderiv(shader, GL_COMPILE_STATUS, &success);
    if (!success) {
        char infoLog[512];
        glGetShaderInfoLog(shader, 512, nullptr, infoLog);
        std::cerr << "Shader Compilation Error:\n" << infoLog << std::endl;
    }
    return shader;
}

// createShaderProgram(vshSRC, fshSRC)

inline GLuint createShaderProgram(const char* vShaderSrc, const char* fShaderSrc) {
    GLuint vertexShader = compileShader(GL_VERTEX_SHADER, vShaderSrc);
    GLuint fragmentShader = compileShader(GL_FRAGMENT_SHADER, fShaderSrc);
    GLuint program = glCreateProgram();
    glAttachShader(program, vertexShader);
    glAttachShader(program, fragmentShader);
    glLinkProgram(program);
    glDeleteShader(vertexShader);
    glDeleteShader(fragmentShader);
    return program;
}
