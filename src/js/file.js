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

export default initFileListener;
