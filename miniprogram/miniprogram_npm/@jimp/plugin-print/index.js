module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1718964479960, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _path = _interopRequireDefault(require("path"));
var _loadBmfont = _interopRequireDefault(require("load-bmfont"));
var _utils = require("@jimp/utils");
var _measureText = require("./measure-text");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function xOffsetBasedOnAlignment(constants, font, line, maxWidth, alignment) {
  if (alignment === constants.HORIZONTAL_ALIGN_LEFT) {
    return 0;
  }
  if (alignment === constants.HORIZONTAL_ALIGN_CENTER) {
    return (maxWidth - (0, _measureText.measureText)(font, line)) / 2;
  }
  return maxWidth - (0, _measureText.measureText)(font, line);
}
function drawCharacter(image, font, x, y, char) {
  if (char.width > 0 && char.height > 0) {
    const characterPage = font.pages[char.page];
    image.blit(characterPage, x + char.xoffset, y + char.yoffset, char.x, char.y, char.width, char.height);
  }
  return image;
}
function printText(font, x, y, text, defaultCharWidth) {
  for (let i = 0; i < text.length; i++) {
    let char;
    if (font.chars[text[i]]) {
      char = text[i];
    } else if (/\s/.test(text[i])) {
      char = "";
    } else {
      char = "?";
    }
    const fontChar = font.chars[char] || {};
    const fontKerning = font.kernings[char];
    drawCharacter(this, font, x, y, fontChar || {});
    const kerning = fontKerning && fontKerning[text[i + 1]] ? fontKerning[text[i + 1]] : 0;
    x += kerning + (fontChar.xadvance || defaultCharWidth);
  }
}
function loadPages(Jimp, dir, pages) {
  const newPages = pages.map(page => {
    return Jimp.read(dir + "/" + page);
  });
  return Promise.all(newPages);
}
const dir = process.env.DIRNAME || `${__dirname}/../`;
var _default = () => ({
  constants: {
    measureText: _measureText.measureText,
    measureTextHeight: _measureText.measureTextHeight,
    FONT_SANS_8_BLACK: _path.default.join(dir, "fonts/open-sans/open-sans-8-black/open-sans-8-black.fnt"),
    FONT_SANS_10_BLACK: _path.default.join(dir, "fonts/open-sans/open-sans-10-black/open-sans-10-black.fnt"),
    FONT_SANS_12_BLACK: _path.default.join(dir, "fonts/open-sans/open-sans-12-black/open-sans-12-black.fnt"),
    FONT_SANS_14_BLACK: _path.default.join(dir, "fonts/open-sans/open-sans-14-black/open-sans-14-black.fnt"),
    FONT_SANS_16_BLACK: _path.default.join(dir, "fonts/open-sans/open-sans-16-black/open-sans-16-black.fnt"),
    FONT_SANS_32_BLACK: _path.default.join(dir, "fonts/open-sans/open-sans-32-black/open-sans-32-black.fnt"),
    FONT_SANS_64_BLACK: _path.default.join(dir, "fonts/open-sans/open-sans-64-black/open-sans-64-black.fnt"),
    FONT_SANS_128_BLACK: _path.default.join(dir, "fonts/open-sans/open-sans-128-black/open-sans-128-black.fnt"),
    FONT_SANS_8_WHITE: _path.default.join(dir, "fonts/open-sans/open-sans-8-white/open-sans-8-white.fnt"),
    FONT_SANS_16_WHITE: _path.default.join(dir, "fonts/open-sans/open-sans-16-white/open-sans-16-white.fnt"),
    FONT_SANS_32_WHITE: _path.default.join(dir, "fonts/open-sans/open-sans-32-white/open-sans-32-white.fnt"),
    FONT_SANS_64_WHITE: _path.default.join(dir, "fonts/open-sans/open-sans-64-white/open-sans-64-white.fnt"),
    FONT_SANS_128_WHITE: _path.default.join(dir, "fonts/open-sans/open-sans-128-white/open-sans-128-white.fnt"),
    /**
     * Loads a bitmap font from a file
     * @param {string} file the file path of a .fnt file
     * @param {function(Error, Jimp)} cb (optional) a function to call when the font is loaded
     * @returns {Promise} a promise
     */
    loadFont(file, cb) {
      if (typeof file !== "string") return _utils.throwError.call(this, "file must be a string", cb);
      return new Promise((resolve, reject) => {
        cb = cb || function (err, font) {
          if (err) reject(err);else resolve(font);
        };
        (0, _loadBmfont.default)(file, (err, font) => {
          const chars = {};
          const kernings = {};
          if (err) {
            return _utils.throwError.call(this, err, cb);
          }
          for (let i = 0; i < font.chars.length; i++) {
            chars[String.fromCharCode(font.chars[i].id)] = font.chars[i];
          }
          for (let i = 0; i < font.kernings.length; i++) {
            const firstString = String.fromCharCode(font.kernings[i].first);
            kernings[firstString] = kernings[firstString] || {};
            kernings[firstString][String.fromCharCode(font.kernings[i].second)] = font.kernings[i].amount;
          }
          loadPages(this, _path.default.dirname(file), font.pages).then(pages => {
            cb(null, {
              chars,
              kernings,
              pages,
              common: font.common,
              info: font.info
            });
          });
        });
      });
    }
  },
  class: {
    /**
     * Draws a text on a image on a given boundary
     * @param {Jimp} font a bitmap font loaded from `Jimp.loadFont` command
     * @param {number} x the x position to start drawing the text
     * @param {number} y the y position to start drawing the text
     * @param {any} text the text to draw (string or object with `text`, `alignmentX`, and/or `alignmentY`)
     * @param {number} maxWidth (optional) the boundary width to draw in
     * @param {number} maxHeight (optional) the boundary height to draw in
     * @param {function(Error, Jimp)} cb (optional) a function to call when the text is written
     * @returns {Jimp} this for chaining of methods
     */
    print(font, x, y, text, maxWidth, maxHeight, cb) {
      if (typeof maxWidth === "function" && typeof cb === "undefined") {
        cb = maxWidth;
        maxWidth = Infinity;
      }
      if (typeof maxWidth === "undefined") {
        maxWidth = Infinity;
      }
      if (typeof maxHeight === "function" && typeof cb === "undefined") {
        cb = maxHeight;
        maxHeight = Infinity;
      }
      if (typeof maxHeight === "undefined") {
        maxHeight = Infinity;
      }
      if (typeof font !== "object") {
        return _utils.throwError.call(this, "font must be a Jimp loadFont", cb);
      }
      if (typeof x !== "number" || typeof y !== "number" || typeof maxWidth !== "number") {
        return _utils.throwError.call(this, "x, y and maxWidth must be numbers", cb);
      }
      if (typeof maxWidth !== "number") {
        return _utils.throwError.call(this, "maxWidth must be a number", cb);
      }
      if (typeof maxHeight !== "number") {
        return _utils.throwError.call(this, "maxHeight must be a number", cb);
      }
      let alignmentX;
      let alignmentY;
      if (typeof text === "object" && text.text !== null && text.text !== undefined) {
        alignmentX = text.alignmentX || this.constructor.HORIZONTAL_ALIGN_LEFT;
        alignmentY = text.alignmentY || this.constructor.VERTICAL_ALIGN_TOP;
        ({
          text
        } = text);
      } else {
        alignmentX = this.constructor.HORIZONTAL_ALIGN_LEFT;
        alignmentY = this.constructor.VERTICAL_ALIGN_TOP;
        text = text.toString();
      }
      if (maxHeight !== Infinity && alignmentY === this.constructor.VERTICAL_ALIGN_BOTTOM) {
        y += maxHeight - (0, _measureText.measureTextHeight)(font, text, maxWidth);
      } else if (maxHeight !== Infinity && alignmentY === this.constructor.VERTICAL_ALIGN_MIDDLE) {
        y += maxHeight / 2 - (0, _measureText.measureTextHeight)(font, text, maxWidth) / 2;
      }
      const defaultCharWidth = Object.entries(font.chars)[0][1].xadvance;
      const {
        lines,
        longestLine
      } = (0, _measureText.splitLines)(font, text, maxWidth);
      lines.forEach(line => {
        const lineString = line.join(" ");
        const alignmentWidth = xOffsetBasedOnAlignment(this.constructor, font, lineString, maxWidth, alignmentX);
        printText.call(this, font, x + alignmentWidth, y, lineString, defaultCharWidth);
        y += font.common.lineHeight;
      });
      if ((0, _utils.isNodePattern)(cb)) {
        cb.call(this, null, this, {
          x: x + longestLine,
          y
        });
      }
      return this;
    }
  }
});
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
//# sourceMappingURL=index.js.map
}, function(modId) {var map = {"./measure-text":1718964479961}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1718964479961, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.measureText = measureText;
exports.measureTextHeight = measureTextHeight;
exports.splitLines = splitLines;
function measureText(font, text) {
  let x = 0;
  for (let i = 0; i < text.length; i++) {
    if (font.chars[text[i]]) {
      const kerning = font.kernings[text[i]] && font.kernings[text[i]][text[i + 1]] ? font.kernings[text[i]][text[i + 1]] : 0;
      x += (font.chars[text[i]].xadvance || 0) + kerning;
    }
  }
  return x;
}
function splitLines(font, text, maxWidth) {
  const words = text.replace(/[\r\n]+/g, " \n").split(" ");
  const lines = [];
  let currentLine = [];
  let longestLine = 0;
  words.forEach(word => {
    const line = [...currentLine, word].join(" ");
    const length = measureText(font, line);
    if (length <= maxWidth && !word.includes("\n")) {
      if (length > longestLine) {
        longestLine = length;
      }
      currentLine.push(word);
    } else {
      lines.push(currentLine);
      currentLine = [word.replace("\n", "")];
    }
  });
  lines.push(currentLine);
  return {
    lines,
    longestLine
  };
}
function measureTextHeight(font, text, maxWidth) {
  const {
    lines
  } = splitLines(font, text, maxWidth);
  return lines.length * font.common.lineHeight;
}
//# sourceMappingURL=measure-text.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1718964479960);
})()
//miniprogram-npm-outsideDeps=["path","load-bmfont","@jimp/utils"]
//# sourceMappingURL=index.js.map