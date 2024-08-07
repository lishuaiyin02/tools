module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1718964479944, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = require("@jimp/utils");
var _default = () => ({
  /**
   * Blits a source image on to this image
   * @param {Jimp} src the source Jimp instance
   * @param {number} x the x position to blit the image
   * @param {number} y the y position to blit the image
   * @param {number} srcx (optional) the x position from which to crop the source image
   * @param {number} srcy (optional) the y position from which to crop the source image
   * @param {number} srcw (optional) the width to which to crop the source image
   * @param {number} srch (optional) the height to which to crop the source image
   * @param {function(Error, Jimp)} cb (optional) a callback for when complete
   * @returns {Jimp} this for chaining of methods
   */
  blit(src, x, y, srcx, srcy, srcw, srch, cb) {
    if (!(src instanceof this.constructor)) {
      return _utils.throwError.call(this, "The source must be a Jimp image", cb);
    }
    if (typeof x !== "number" || typeof y !== "number") {
      return _utils.throwError.call(this, "x and y must be numbers", cb);
    }
    if (typeof srcx === "function") {
      cb = srcx;
      srcx = 0;
      srcy = 0;
      srcw = src.bitmap.width;
      srch = src.bitmap.height;
    } else if (typeof srcx === typeof srcy && typeof srcy === typeof srcw && typeof srcw === typeof srch) {
      srcx = srcx || 0;
      srcy = srcy || 0;
      srcw = srcw || src.bitmap.width;
      srch = srch || src.bitmap.height;
    } else {
      return _utils.throwError.call(this, "srcx, srcy, srcw, srch must be numbers", cb);
    }

    // round input
    x = Math.round(x);
    y = Math.round(y);

    // round input
    srcx = Math.round(srcx);
    srcy = Math.round(srcy);
    srcw = Math.round(srcw);
    srch = Math.round(srch);
    const maxWidth = this.bitmap.width;
    const maxHeight = this.bitmap.height;
    const baseImage = this;
    src.scanQuiet(srcx, srcy, srcw, srch, function (sx, sy, idx) {
      const xOffset = x + sx - srcx;
      const yOffset = y + sy - srcy;
      if (xOffset >= 0 && yOffset >= 0 && maxWidth - xOffset > 0 && maxHeight - yOffset > 0) {
        const dstIdx = baseImage.getPixelIndex(xOffset, yOffset);
        const src = {
          r: this.bitmap.data[idx],
          g: this.bitmap.data[idx + 1],
          b: this.bitmap.data[idx + 2],
          a: this.bitmap.data[idx + 3]
        };
        const dst = {
          r: baseImage.bitmap.data[dstIdx],
          g: baseImage.bitmap.data[dstIdx + 1],
          b: baseImage.bitmap.data[dstIdx + 2],
          a: baseImage.bitmap.data[dstIdx + 3]
        };
        baseImage.bitmap.data[dstIdx] = (src.a * (src.r - dst.r) - dst.r + 255 >> 8) + dst.r;
        baseImage.bitmap.data[dstIdx + 1] = (src.a * (src.g - dst.g) - dst.g + 255 >> 8) + dst.g;
        baseImage.bitmap.data[dstIdx + 2] = (src.a * (src.b - dst.b) - dst.b + 255 >> 8) + dst.b;
        baseImage.bitmap.data[dstIdx + 3] = this.constructor.limit255(dst.a + src.a);
      }
    });
    if ((0, _utils.isNodePattern)(cb)) {
      cb.call(this, null, this);
    }
    return this;
  }
});
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
//# sourceMappingURL=index.js.map
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1718964479944);
})()
//miniprogram-npm-outsideDeps=["@jimp/utils"]
//# sourceMappingURL=index.js.map