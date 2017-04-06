# WebGL2ImageManipulator

An image editor based on WebGL2

## How to use

Open index.html in a browser from hard drive or served by a web server, both will work – there are no issues with CORS.

## Notes

Currently all Browsers that support WebGL2 also implement all ECMAScript2015 features, so there is no need to transpile to ES5.
At time of writing, supported Browsers are:

* Chrome 56+
* Opera 44+
* Firefox 52+ (There are some strange issues, especially on MacOS Notebooks, see https://wiki.mozilla.org/Blocklisting/Blocked_Graphics_Drivers)

## Features

Manipulate images directly from users hdd, without uploading images to the server first.
After editing, images can be saved on hdd or sent to a server via AJAX/POST.
