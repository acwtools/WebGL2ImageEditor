/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (Compiler);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (ImageManipulator);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
 * File Upload Handling
 *
 * @module file
 * @exports initFileListener
 */

/**
 * The supplied callback function for later invocation.
 * @type {function}
 */
let callbackFunction = null;

/**
 * List of supported file types
 * @type {string[]}
 */
const IMAGE_TYPES = ['image/png', 'image/jpeg'];

/**
 * Event listener
 * @param {event} event An event
 * @return {undefined} No return value
 */
function uploadListener(event) {
  if (event.target.files.length && IMAGE_TYPES.indexOf(event.target.files[0].type) !== -1) {
    const file = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.addEventListener('load', () => {
      const img = new Image();
      img.addEventListener('load', () => {
        callbackFunction.call(callbackFunction, img);
      });

      img.src = fileReader.result;
    }, false);

    fileReader.readAsDataURL(file);
  }
}

/**
 * Entry Point:
 * Takes an HTML file input element and a callback function. When an image file is added, the
 * callback function is invoked.
 * @param {Element} input File input element
 * @param {function} callback Callback function
 * @return {undefined} No return value
 */
function initFileListener(input, callback) {
  callbackFunction = callback;
  input.addEventListener('change', uploadListener);
}

/* harmony default export */ __webpack_exports__["a"] = (initFileListener);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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


const fragmentShaderSource = `#version 300 es
precision mediump float;

in vec2 v_texCoord;
out vec4 outColor;

uniform sampler2D u_image;
uniform float u_brightness;
uniform float u_contrast;
uniform float u_vibrance;
uniform vec4 u_color;
 
void main() {
   vec4 color = texture(u_image, v_texCoord);
   color.rgb += u_brightness;
   if (u_contrast > 0.0) {
       color.rgb = (color.rgb - 0.5) / (1.0 - u_contrast) + 0.5;
   } else {
       color.rgb = (color.rgb - 0.5) * (1.0 + u_contrast) + 0.5;
   }
   if (u_vibrance != 0.0) {
      float average = (color.r + color.g + color.b) / 3.0;
      float mx = max(color.r, max(color.g, color.b));
      float amt = (mx - average) * (-u_vibrance * 3.0);
      color.rgb = mix(color.rgb, vec3(mx), amt);
   }
   outColor = color * u_color;
}
`;

/* harmony default export */ __webpack_exports__["a"] = (fragmentShaderSource);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

const vertexShaderSource = `#version 300 es
// This vertex shader just passes all values to the fragment shader 
in vec4 a_position;
in vec2 a_texCoord;
out vec2 v_texCoord;

void main() {
  gl_Position = a_position;
  v_texCoord = a_texCoord;
}
`;

/* harmony default export */ __webpack_exports__["a"] = (vertexShaderSource);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Compiler__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ImageManipulator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__file__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shader_vertex__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shader_fragment__ = __webpack_require__(3);
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
 * Helper function, set the value of the modified property on the ImageManipulator instance
 * @param {Element} target Event Target Element
 * @param {ImageManipulator} imageManipulator ImageManipulator instance
 * @return {undefined} does not return anything
 */
function setValue(target, imageManipulator) {
  const func = `set${target.name}`;
  if (typeof imageManipulator[func] === 'function') {
    imageManipulator[func](target.value);
  }
}

/**
 * Helper function, binds event handlers to range and number inputs
 * @param {Element[]} sliders List of input[type=range] Elements
 * @param {Element[]} numbers List of input[type=number] Elements
 * @param {ImageManipulator} imageManipulator ImageManipulator instance
 * @param {number} index slider index
 * @return {undefined} does not return anything
 */
function addSliderBinding(sliders, numbers, imageManipulator, index) {
  sliders[index].addEventListener('change', (event) => {
    numbers[index].value = sliders[index].value; // eslint-disable-line no-param-reassign
    setValue(event.target, imageManipulator);
    imageManipulator.render();
  });
  numbers[index].addEventListener('change', () => {
    sliders[index].value = numbers[index].value; // eslint-disable-line no-param-reassign
    setValue(event.target, imageManipulator);
    imageManipulator.render();
  });
}

/**
 * Create a basic setup
 */
window.addEventListener('load', () => {
  const upLoadInput = document.querySelector('input[type="file"]');
  const canvas = document.getElementById('c');
  const sliders = document.querySelectorAll('input[type="range"]');
  const numbers = document.querySelectorAll('input[type="number"]');

  const gl = canvas.getContext('webgl2');
  const compiler = new __WEBPACK_IMPORTED_MODULE_0__Compiler__["a" /* default */](gl);
  const program = compiler.compile(__WEBPACK_IMPORTED_MODULE_3__shader_vertex__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__shader_fragment__["a" /* default */]);
  const imageManipulator = new __WEBPACK_IMPORTED_MODULE_1__ImageManipulator__["a" /* default */]();

  imageManipulator.setCanvas(canvas).setGL(gl).setProgram(program);
  imageManipulator.setUpRenderingContext();

  for (let i = 0, iLen = sliders.length; i < iLen; i++) {
    addSliderBinding(sliders, numbers, imageManipulator, i);
  }

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__file__["a" /* default */])(upLoadInput, (file) => {
    imageManipulator.setImage(file);
    imageManipulator.render();
  });
});


/***/ })
/******/ ]);