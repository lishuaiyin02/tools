module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1718964479949, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = require("@jimp/utils");
/**
 * Scale the image to the given width and height keeping the aspect ratio. Some parts of the image may be letter boxed.
 * @param {number} w the width to resize the image to
 * @param {number} h the height to resize the image to
 * @param {number} alignBits (optional) A bitmask for horizontal and vertical alignment
 * @param {string} mode (optional) a scaling method (e.g. Jimp.RESIZE_BEZIER)
 * @param {function(Error, Jimp)} cb (optional) a callback for when complete
 * @returns {Jimp} this for chaining of methods
 */
var _default = () => ({
  contain(w, h, alignBits, mode, cb) {
    if (typeof w !== "number" || typeof h !== "number") {
      return _utils.throwError.call(this, "w and h must be numbers", cb);
    }

    // permit any sort of optional parameters combination
    if (typeof alignBits === "string") {
      if (typeof mode === "function" && typeof cb === "undefined") cb = mode;
      mode = alignBits;
      alignBits = null;
    }
    if (typeof alignBits === "function") {
      if (typeof cb === "undefined") cb = alignBits;
      mode = null;
      alignBits = null;
    }
    if (typeof mode === "function" && typeof cb === "undefined") {
      cb = mode;
      mode = null;
    }
    alignBits = alignBits || this.constructor.HORIZONTAL_ALIGN_CENTER | this.constructor.VERTICAL_ALIGN_MIDDLE;
    const hbits = alignBits & (1 << 3) - 1;
    const vbits = alignBits >> 3;

    // check if more flags than one is in the bit sets
    if (!(hbits !== 0 && !(hbits & hbits - 1) || vbits !== 0 && !(vbits & vbits - 1))) {
      return _utils.throwError.call(this, "only use one flag per alignment direction", cb);
    }
    const alignH = hbits >> 1; // 0, 1, 2
    const alignV = vbits >> 1; // 0, 1, 2

    const f = w / h > this.bitmap.width / this.bitmap.height ? h / this.bitmap.height : w / this.bitmap.width;
    const c = this.cloneQuiet().scale(f, mode);
    this.resize(w, h, mode);
    this.scanQuiet(0, 0, this.bitmap.width, this.bitmap.height, function (x, y, idx) {
      this.bitmap.data.writeUInt32BE(this._background, idx);
    });
    this.blit(c, (this.bitmap.width - c.bitmap.width) / 2 * alignH, (this.bitmap.height - c.bitmap.height) / 2 * alignV);
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
return __REQUIRE__(1718964479949);
})()
//miniprogram-npm-outsideDeps=["@jimp/utils"]
//# sourceMappingURL=index.js.map