module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1718964479967, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = require("@jimp/utils");
/**
 * Creates a circle out of an image.
 * @param {function(Error, Jimp)} options (optional)
 * opacity - opacity of the shadow between 0 and 1
 * size,- of the shadow
 * blur - how blurry the shadow is
 * x- x position of shadow
 * y - y position of shadow
 * @param {function(Error, Jimp)} cb (optional) a callback for when complete
 * @returns {Jimp} this for chaining of methods
 */
var _default = () => ({
  shadow() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let cb = arguments.length > 1 ? arguments[1] : undefined;
    if (typeof options === "function") {
      cb = options;
      options = {};
    }
    const {
      opacity = 0.7,
      size = 1.1,
      x = -25,
      y = 25,
      blur = 5
    } = options;

    // clone the image
    const orig = this.clone();
    const shadow = this.clone();

    // turn all it's pixels black
    shadow.scan(0, 0, shadow.bitmap.width, shadow.bitmap.height, (x, y, idx) => {
      shadow.bitmap.data[idx] = 0x00;
      shadow.bitmap.data[idx + 1] = 0x00;
      shadow.bitmap.data[idx + 2] = 0x00;
      // up the opacity a little,
      shadow.bitmap.data[idx + 3] = shadow.constructor.limit255(shadow.bitmap.data[idx + 3] * opacity);
      this.bitmap.data[idx] = 0x00;
      this.bitmap.data[idx + 1] = 0x00;
      this.bitmap.data[idx + 2] = 0x00;
      this.bitmap.data[idx + 3] = 0x00;
    });

    // enlarge it. This creates a "shadow".
    shadow.resize(shadow.bitmap.width * size, shadow.bitmap.height * size).blur(blur);

    // Then blit the "shadow" onto the background and the image on top of that.
    this.composite(shadow, x, y);
    this.composite(orig, 0, 0);
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
return __REQUIRE__(1718964479967);
})()
//miniprogram-npm-outsideDeps=["@jimp/utils"]
//# sourceMappingURL=index.js.map