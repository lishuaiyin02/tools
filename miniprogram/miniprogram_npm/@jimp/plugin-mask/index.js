module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1718964479958, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = require("@jimp/utils");
/**
 * Masks a source image on to this image using average pixel colour. A completely black pixel on the mask will turn a pixel in the image completely transparent.
 * @param {Jimp} src the source Jimp instance
 * @param {number} x the horizontal position to blit the image
 * @param {number} y the vertical position to blit the image
 * @param {function(Error, Jimp)} cb (optional) a callback for when complete
 * @returns {Jimp} this for chaining of methods
 */
var _default = () => ({
  mask(src) {
    let x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    let y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    let cb = arguments.length > 3 ? arguments[3] : undefined;
    if (!(src instanceof this.constructor)) {
      return _utils.throwError.call(this, "The source must be a Jimp image", cb);
    }
    if (typeof x !== "number" || typeof y !== "number") {
      return _utils.throwError.call(this, "x and y must be numbers", cb);
    }

    // round input
    x = Math.round(x);
    y = Math.round(y);
    const w = this.bitmap.width;
    const h = this.bitmap.height;
    const baseImage = this;
    src.scanQuiet(0, 0, src.bitmap.width, src.bitmap.height, function (sx, sy, idx) {
      const destX = x + sx;
      const destY = y + sy;
      if (destX >= 0 && destY >= 0 && destX < w && destY < h) {
        const dstIdx = baseImage.getPixelIndex(destX, destY);
        const {
          data
        } = this.bitmap;
        const avg = (data[idx + 0] + data[idx + 1] + data[idx + 2]) / 3;
        baseImage.bitmap.data[dstIdx + 3] *= avg / 255;
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
return __REQUIRE__(1718964479958);
})()
//miniprogram-npm-outsideDeps=["@jimp/utils"]
//# sourceMappingURL=index.js.map