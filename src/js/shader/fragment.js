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

export default fragmentShaderSource;
