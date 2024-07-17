module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1718964479942, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _omggif = _interopRequireDefault(require("omggif"));
var _gifwrap = require("gifwrap");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MIME_TYPE = "image/gif";
var _default = () => ({
  mime: {
    [MIME_TYPE]: ["gif"]
  },
  constants: {
    MIME_GIF: MIME_TYPE
  },
  decoders: {
    [MIME_TYPE]: data => {
      const gifObj = new _omggif.default.GifReader(data);
      const gifData = Buffer.alloc(gifObj.width * gifObj.height * 4);
      gifObj.decodeAndBlitFrameRGBA(0, gifData);
      return {
        data: gifData,
        width: gifObj.width,
        height: gifObj.height
      };
    }
  },
  encoders: {
    [MIME_TYPE]: data => {
      const bitmap = new _gifwrap.BitmapImage(data.bitmap);
      _gifwrap.GifUtil.quantizeDekker(bitmap, 256);
      const newFrame = new _gifwrap.GifFrame(bitmap);
      const gifCodec = new _gifwrap.GifCodec();
      return gifCodec.encodeGif([newFrame], {}).then(newGif => {
        return newGif.buffer;
      });
    }
  }
});
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
//# sourceMappingURL=index.js.map
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1718964479942);
})()
//miniprogram-npm-outsideDeps=["omggif","gifwrap"]
//# sourceMappingURL=index.js.map