module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1718964479941, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configure;
var _core = _interopRequireWildcard(require("@jimp/core"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function configure(configuration) {
  let jimpInstance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _core.default;
  const jimpConfig = {
    hasAlpha: {},
    encoders: {},
    decoders: {},
    class: {},
    constants: {}
  };
  function addToConfig(newConfig) {
    Object.entries(newConfig).forEach(_ref => {
      let [key, value] = _ref;
      jimpConfig[key] = {
        ...jimpConfig[key],
        ...value
      };
    });
  }
  function addImageType(typeModule) {
    const type = typeModule();
    if (Array.isArray(type.mime)) {
      (0, _core.addType)(...type.mime);
    } else {
      Object.entries(type.mime).forEach(mimeType => (0, _core.addType)(...mimeType));
    }
    delete type.mime;
    addToConfig(type);
  }
  function addPlugin(pluginModule) {
    const plugin = pluginModule(_core.jimpEvChange) || {};
    if (!plugin.class && !plugin.constants) {
      // Default to class function
      addToConfig({
        class: plugin
      });
    } else {
      addToConfig(plugin);
    }
  }
  if (configuration.types) {
    configuration.types.forEach(addImageType);
    jimpInstance.decoders = {
      ...jimpInstance.decoders,
      ...jimpConfig.decoders
    };
    jimpInstance.encoders = {
      ...jimpInstance.encoders,
      ...jimpConfig.encoders
    };
    jimpInstance.hasAlpha = {
      ...jimpInstance.hasAlpha,
      ...jimpConfig.hasAlpha
    };
  }
  if (configuration.plugins) {
    configuration.plugins.forEach(addPlugin);
  }
  (0, _core.addJimpMethods)(jimpConfig.class, jimpInstance);
  (0, _core.addConstants)(jimpConfig.constants, jimpInstance);
  return _core.default;
}
module.exports = exports.default;
module.exports.default = exports.default;
//# sourceMappingURL=index.js.map
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1718964479941);
})()
//miniprogram-npm-outsideDeps=["@jimp/core"]
//# sourceMappingURL=index.js.map