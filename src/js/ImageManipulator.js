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
 * @typedef {Element} Canvas HTMLCanvasElement
 * @typedef {Object} WebGLVertexArrayObject Vertex Array Object
 * @typedef {Number} GLint
 */

/**
 * ImageManipulator
 */
class ImageManipulator {
  /**
   *
   */
  constructor() {
    /**
     *
     * @type {Canvas}
     */
    this.canvas = null;

    /**
     *
     * @type {WebGLRenderingContext}
     */
    this.gl = null;

    /**
     *
     * @type {WebGLVertexArrayObject}
     */
    this.vao = null;

    /**
     *
     * @type {WebGLProgram}
     */
    this.program = null;

    /**
     *
     * @type {GLint}
     */
    this.brightnessLocation = null;

    /**
     *
     * @type {GLint}
     */
    this.contrastLocation = null;

    /**
     *
     * @type {GLint}
     */
    this.vibranceLocation = null;

    /**
     *
     * @type {GLint}
     */
    this.colorLocation = null;

    /**
     *
     * @type {GLint}
     */
    this.imageLocation = null;
    /**
     *
     * @type {null}
     */
    this.texture = null;
    /**
     *
     * @type {number}
     */
    this.brightness = 0.0;

    /**
     *
     * @type {number}
     */
    this.contrast = 0.0;

    /**
     *
     * @type {number}
     */
    this.vibrance = 0.0;

    /**
     *
     * @type {number}
     */
    this.red = 1.0;

    /**
     *
     * @type {number}
     */
    this.green = 1.0;

    /**
     *
     * @type {number}
     */
    this.blue = 1.0;
  }

  /**
   * @return {undefined} No return value
   */
  setUpRenderingContext() {
    if (!this.canvas) {
      throw Error('Dependency canvas not set!');
    }
    if (!this.gl) {
      throw Error('Dependency gl not set!');
    }
    if (!this.program) {
      throw Error('Dependency program not set - create a shader program!');
    }

    this.positionAttributeLocation = this.gl.getAttribLocation(this.program, 'a_position');
    this.texCoordAttributeLocation = this.gl.getAttribLocation(this.program, 'a_texCoord');
    this.imageLocation = this.gl.getUniformLocation(this.program, 'u_image');
    this.colorLocation = this.gl.getUniformLocation(this.program, 'u_color');
    this.brightnessLocation = this.gl.getUniformLocation(this.program, 'u_brightness');
    this.contrastLocation = this.gl.getUniformLocation(this.program, 'u_contrast');
    this.vibranceLocation = this.gl.getUniformLocation(this.program, 'u_vibrance');

    this.vao = this.gl.createVertexArray();
    this.texture = this.gl.createTexture();

    // Set Positions of the image rectangle, these are never changing since we adjust the canvas
    // size for a new image

    this.gl.bindVertexArray(this.vao);

    const positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([-1.0, 1.0,
      1.0, 1.0,
      -1.0, -1.0,
      -1.0, -1.0,
      1.0, 1.0,
      1.0, -1.0]), this.gl.STATIC_DRAW);
    // Set a random color.

    this.gl.enableVertexAttribArray(this.positionAttributeLocation);

    this.gl.vertexAttribPointer(
      this.positionAttributeLocation, 2, this.gl.FLOAT, false, 0, 0);

    // provide texture coordinates for the rectangle.
    const texCoordBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, texCoordBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
      0.0, 0.0,
      1.0, 0.0,
      0.0, 1.0,
      0.0, 1.0,
      1.0, 0.0,
      1.0, 1.0]), this.gl.STATIC_DRAW);
    this.gl.enableVertexAttribArray(this.texCoordAttributeLocation);

    this.gl.vertexAttribPointer(
      this.texCoordAttributeLocation, 2, this.gl.FLOAT, false, 0, 0);

    // TODO remove these two
    // resize(gl.canvas);
    // Set canvas size
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

    // Clear the canvas
    this.gl.clearColor(0, 0, 0, 0);
  }

  /**
   * @return {undefined} No return value
   */
  render() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)
    this.gl.useProgram(this.program);

    // Bind the attribute/buffer set we want.
    this.gl.bindVertexArray(this.vao);

    this.gl.uniform1f(this.brightnessLocation, this.brightness);
    this.gl.uniform1f(this.contrastLocation, this.contrast);
    this.gl.uniform1f(this.vibranceLocation, this.vibrance);
    this.gl.uniform4f(this.colorLocation, this.red, this.green, this.blue, 1);

    // Tell the shader to get the texture from texture unit 0
    this.gl.uniform1i(this.imageLocation, 0);

    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
  }


  /**
   *
   * @param {Canvas} canvas HTMLCanvas Element
   * @return {ImageManipulator} ImageManipulator instance
   */
  setCanvas(canvas) {
    this.canvas = canvas;
    return this;
  }

  /**
   *
   * @param {WebGLRenderingContext} gl GL Context
   * @return {ImageManipulator} ImageManipulator instance
   */
  setGL(gl) {
    this.gl = gl;
    return this;
  }

  /**
   *
   * @param {WebGLProgram} program WebGL shader program
   * @return {ImageManipulator} ImageManipulator instance
   */
  setProgram(program) {
    this.program = program;
    return this;
  }

  /**
   *
   * @param {Number} brightness Brightness value
   * @return {ImageManipulator} ImageManipulator instance
   */
  setBrightness(brightness) {
    this.brightness = brightness;
    return this;
  }

  /**
   *
   * @param {Number} contrast Contrast value
   * @return {ImageManipulator} ImageManipulator instance
   */
  setContrast(contrast) {
    this.contrast = contrast;
    return this;
  }

  /**
   *
   * @param {Number} vibrance Vibrance factor
   * @return {ImageManipulator} ImageManipulator instance
   */
  setVibrance(vibrance) {
    this.vibrance = vibrance;
    return this;
  }

  /**
   *
   * @param {Number} red Red channel factor
   * @return {ImageManipulator} ImageManipulator instance
   */
  setRed(red) {
    this.red = red;
    return this;
  }

  /**
   *
   * @param {Number} green Green channel factor
   * @return {ImageManipulator} ImageManipulator instance
   */
  setGreen(green) {
    this.green = green;
    return this;
  }

  /**
   *
   * @param {Number} blue Blue channel factor
   * @return {ImageManipulator} ImageManipulator instance
   */
  setBlue(blue) {
    this.blue = blue;
    return this;
  }

  /**
   *
   * @param {Image} image HTMLImage Element
   * @return {ImageManipulator} ImageManipulator instance
   */
  setImage(image) {
    // adjust canvas size to image size
    this.canvas.width = image.width;
    this.canvas.height = image.height;
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

    // make unit 0 the active texture uint
    this.gl.activeTexture(this.gl.TEXTURE0 + 0);

    // Bind it to texture unit 0' 2D bind point
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);

    // Set the parameters so we don't need mips and so we're not filtering
    // and we don't repeat
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);

    // Upload the image into the texture.
    this.gl.texImage2D(this.gl.TEXTURE_2D,
      0,
      this.gl.RGBA,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      image);
    return this;
  }
}

export default ImageManipulator;
