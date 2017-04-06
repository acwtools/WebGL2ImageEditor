/*
 * WebGL2ImageManipulator (C) 2017 by Gandalf Sievers
 * Created by Gandalf Sievers on 06.04.2017.
 *
 * MIT-License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @typedef {Object} WebGLRenderingContext GLContext
 * @typedef {Object} WebGLShader Shader
 * @typedef {Object} WebGLProgram Shader Program
 */

/**
 * Compiler,
 * Compiles shader sources and links them together to program
 */
class Compiler {
  /**
   *
   * @param {WebGLRenderingContext} gl GLContext
   */
  constructor(gl) {
    /**
     * @type {WebGLRenderingContext}
     */
    this.gl = gl;
  }

  /**
   * @param {number} type gl.SHADER_TYPE enum
   * @param {string} source Source Code of the shader to compile
   * @return {WebGLShader} A Compiled WebGlShader
   */
  createShader(type, source) {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    const success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }

    console.log(this.gl.getShaderInfoLog(shader));
    this.gl.deleteShader(shader);

    return false;
  }

  /**
   * @param {WebGLShader} vertexShader Compiled Vertex Shader
   * @param {WebGLShader} fragmentShader Compiled
   * @return {WebGLProgram} A linked WebGLProgram
   */
  createProgram(vertexShader, fragmentShader) {
    const program = this.gl.createProgram();
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);
    const success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
    if (success) {
      return program;
    }

    console.log(this.gl.getProgramInfoLog(program));
    this.gl.deleteProgram(program);

    return false;
  }

  /**
   * @param {string} vertexShaderSrc Textual source for the VertexShader
   * @param {string} fragmentShaderSrc Textual source for the FragmentShader
   * @return {WebGLProgram} A linked WebGLProgram
   */
  compile(vertexShaderSrc, fragmentShaderSrc) {
    const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexShaderSrc);

    if (!vertexShader) {
      return false;
    }

    const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentShaderSrc);

    if (!fragmentShader) {
      return false;
    }

    const program = this.createProgram(vertexShader, fragmentShader);
    if (!program) {
      return false;
    }

    return program;
  }

}

export default Compiler;
