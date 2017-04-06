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

import Compiler from './Compiler';
import ImageManipulator from './ImageManipulator';
import fileListener from './file';

import vertexShaderSource from './shader/vertex';
import fragmentShaderSource from './shader/fragment';

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
  const compiler = new Compiler(gl);
  const program = compiler.compile(vertexShaderSource, fragmentShaderSource);
  const imageManipulator = new ImageManipulator();

  imageManipulator.setCanvas(canvas).setGL(gl).setProgram(program);
  imageManipulator.setUpRenderingContext();

  for (let i = 0, iLen = sliders.length; i < iLen; i++) {
    addSliderBinding(sliders, numbers, imageManipulator, i);
  }

  fileListener(upLoadInput, (file) => {
    imageManipulator.setImage(file);
    imageManipulator.render();
  });
});
