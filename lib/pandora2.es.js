var po = Object.defineProperty;
var mo = (e, k, oe) => k in e ? po(e, k, { enumerable: !0, configurable: !0, writable: !0, value: oe }) : e[k] = oe;
var fo = (e, k, oe) => (mo(e, typeof k != "symbol" ? k + "" : k, oe), oe);
import { unref, openBlock, createElementBlock, normalizeClass, createElementVNode, createTextVNode, toDisplayString, renderSlot, getCurrentScope, onScopeDispose, ref, watch, warn, computed, getCurrentInstance, inject, onMounted, toRef, onUnmounted, isRef, onBeforeUnmount, onBeforeMount, provide, defineComponent, mergeProps, useAttrs as useAttrs$2, useSlots, shallowRef, nextTick, onUpdated, withDirectives, createCommentVNode, Fragment, createBlock, withCtx, resolveDynamicComponent, withModifiers, createVNode, normalizeStyle, vShow, Transition, reactive, cloneVNode, Text, Comment, toRefs, resolveComponent, Teleport, readonly, onDeactivated, renderList, withKeys, createSlots, vModelCheckbox, vModelRadio, h as h$2, onBeforeUpdate, resolveDirective, vModelText, toRaw, triggerRef, watchEffect, isVNode, normalizeProps, guardReactiveProps } from "vue";
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
function isObject$4(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function isPlainObject$1(e) {
  var k, oe;
  return isObject$4(e) === !1 ? !1 : (k = e.constructor, k === void 0 ? !0 : (oe = k.prototype, !(isObject$4(oe) === !1 || oe.hasOwnProperty("isPrototypeOf") === !1)));
}
function t() {
  return t = Object.assign ? Object.assign.bind() : function(e) {
    for (var k = 1; k < arguments.length; k++) {
      var oe = arguments[k];
      for (var re in oe)
        Object.prototype.hasOwnProperty.call(oe, re) && (e[re] = oe[re]);
    }
    return e;
  }, t.apply(this, arguments);
}
function r(e, k) {
  if (e == null)
    return {};
  var oe, re, ae = {}, le = Object.keys(e);
  for (re = 0; re < le.length; re++)
    k.indexOf(oe = le[re]) >= 0 || (ae[oe] = e[oe]);
  return ae;
}
const n = { silent: !1, logLevel: "warn" }, i = ["validator"], o$1 = Object.prototype, a$1 = o$1.toString, s$1 = o$1.hasOwnProperty, u$1 = /^\s*function (\w+)/;
function l$1(e) {
  var k;
  const oe = (k = e == null ? void 0 : e.type) !== null && k !== void 0 ? k : e;
  if (oe) {
    const re = oe.toString().match(u$1);
    return re ? re[1] : "";
  }
  return "";
}
const c$1 = isPlainObject$1, f$1 = (e) => e;
let d$1 = f$1;
process.env.NODE_ENV !== "production" && (d$1 = typeof console < "u" ? function(k, oe = n.logLevel) {
  n.silent === !1 && console[oe](`[VueTypes warn]: ${k}`);
} : f$1);
const p$1 = (e, k) => s$1.call(e, k), y = Number.isInteger || function(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}, v$1 = Array.isArray || function(e) {
  return a$1.call(e) === "[object Array]";
}, h$1 = (e) => a$1.call(e) === "[object Function]", b$1 = (e) => c$1(e) && p$1(e, "_vueTypes_name"), g = (e) => c$1(e) && (p$1(e, "type") || ["_vueTypes_name", "validator", "default", "required"].some((k) => p$1(e, k)));
function O$1(e, k) {
  return Object.defineProperty(e.bind(k), "__original", { value: e });
}
function m$1(e, k, oe = !1) {
  let re, ae = !0, le = "";
  re = c$1(e) ? e : { type: e };
  const ie = b$1(re) ? re._vueTypes_name + " - " : "";
  if (g(re) && re.type !== null) {
    if (re.type === void 0 || re.type === !0 || !re.required && k === void 0)
      return ae;
    v$1(re.type) ? (ae = re.type.some((ue) => m$1(ue, k, !0) === !0), le = re.type.map((ue) => l$1(ue)).join(" or ")) : (le = l$1(re), ae = le === "Array" ? v$1(k) : le === "Object" ? c$1(k) : le === "String" || le === "Number" || le === "Boolean" || le === "Function" ? function(ue) {
      if (ue == null)
        return "";
      const de = ue.constructor.toString().match(u$1);
      return de ? de[1] : "";
    }(k) === le : k instanceof re.type);
  }
  if (!ae) {
    const ue = `${ie}value "${k}" should be of type "${le}"`;
    return oe === !1 ? (d$1(ue), !1) : ue;
  }
  if (p$1(re, "validator") && h$1(re.validator)) {
    const ue = d$1, de = [];
    if (d$1 = (pe) => {
      de.push(pe);
    }, ae = re.validator(k), d$1 = ue, !ae) {
      const pe = (de.length > 1 ? "* " : "") + de.join(`
* `);
      return de.length = 0, oe === !1 ? (d$1(pe), ae) : pe;
    }
  }
  return ae;
}
function j(e, k) {
  const oe = Object.defineProperties(k, { _vueTypes_name: { value: e, writable: !0 }, isRequired: { get() {
    return this.required = !0, this;
  } }, def: { value(ae) {
    return ae === void 0 ? (p$1(this, "default") && delete this.default, this) : h$1(ae) || m$1(this, ae, !0) === !0 ? (this.default = v$1(ae) ? () => [...ae] : c$1(ae) ? () => Object.assign({}, ae) : ae, this) : (d$1(`${this._vueTypes_name} - invalid default value: "${ae}"`), this);
  } } }), { validator: re } = oe;
  return h$1(re) && (oe.validator = O$1(re, oe)), oe;
}
function _$1(e, k) {
  const oe = j(e, k);
  return Object.defineProperty(oe, "validate", { value(re) {
    return h$1(this.validator) && d$1(`${this._vueTypes_name} - calling .validate() will overwrite the current custom validator function. Validator info:
${JSON.stringify(this)}`), this.validator = O$1(re, this), this;
  } });
}
function T$1(e, k, oe) {
  const re = function(de) {
    const pe = {};
    return Object.getOwnPropertyNames(de).forEach((Ce) => {
      pe[Ce] = Object.getOwnPropertyDescriptor(de, Ce);
    }), Object.defineProperties({}, pe);
  }(k);
  if (re._vueTypes_name = e, !c$1(oe))
    return re;
  const { validator: ae } = oe, le = r(oe, i);
  if (h$1(ae)) {
    let { validator: de } = re;
    de && (de = (ue = (ie = de).__original) !== null && ue !== void 0 ? ue : ie), re.validator = O$1(de ? function(pe) {
      return de.call(this, pe) && ae.call(this, pe);
    } : ae, re);
  }
  var ie, ue;
  return Object.assign(re, le);
}
function $(e) {
  return e.replace(/^(?!\s*$)/gm, "  ");
}
const w$1 = () => _$1("any", {}), P$2 = () => _$1("function", { type: Function }), x$1 = () => _$1("boolean", { type: Boolean }), E$2 = () => _$1("string", { type: String }), N$2 = () => _$1("number", { type: Number }), q$1 = () => _$1("array", { type: Array }), A$1 = () => _$1("object", { type: Object }), V = () => j("integer", { type: Number, validator: (e) => y(e) }), S$1 = () => j("symbol", { validator: (e) => typeof e == "symbol" });
function D$1(e, k = "custom validation failed") {
  if (typeof e != "function")
    throw new TypeError("[VueTypes error]: You must provide a function as argument");
  return j(e.name || "<<anonymous function>>", { type: null, validator(oe) {
    const re = e(oe);
    return re || d$1(`${this._vueTypes_name} - ${k}`), re;
  } });
}
function L(e) {
  if (!v$1(e))
    throw new TypeError("[VueTypes error]: You must provide an array as argument.");
  const k = `oneOf - value should be one of "${e.join('", "')}".`, oe = e.reduce((re, ae) => {
    if (ae != null) {
      const le = ae.constructor;
      re.indexOf(le) === -1 && re.push(le);
    }
    return re;
  }, []);
  return j("oneOf", { type: oe.length > 0 ? oe : void 0, validator(re) {
    const ae = e.indexOf(re) !== -1;
    return ae || d$1(k), ae;
  } });
}
function F$1(e) {
  if (!v$1(e))
    throw new TypeError("[VueTypes error]: You must provide an array as argument");
  let k = !1, oe = [];
  for (let ae = 0; ae < e.length; ae += 1) {
    const le = e[ae];
    if (g(le)) {
      if (b$1(le) && le._vueTypes_name === "oneOf" && le.type) {
        oe = oe.concat(le.type);
        continue;
      }
      if (h$1(le.validator) && (k = !0), le.type === !0 || !le.type) {
        d$1('oneOfType - invalid usage of "true" or "null" as types.');
        continue;
      }
      oe = oe.concat(le.type);
    } else
      oe.push(le);
  }
  oe = oe.filter((ae, le) => oe.indexOf(ae) === le);
  const re = oe.length > 0 ? oe : null;
  return j("oneOfType", k ? { type: re, validator(ae) {
    const le = [], ie = e.some((ue) => {
      const de = m$1(b$1(ue) && ue._vueTypes_name === "oneOf" ? ue.type || null : ue, ae, !0);
      return typeof de == "string" && le.push(de), de === !0;
    });
    return ie || d$1(`oneOfType - provided value does not match any of the ${le.length} passed-in validators:
${$(le.join(`
`))}`), ie;
  } } : { type: re });
}
function Y$1(e) {
  return j("arrayOf", { type: Array, validator(k) {
    let oe = "";
    const re = k.every((ae) => (oe = m$1(e, ae, !0), oe === !0));
    return re || d$1(`arrayOf - value validation error:
${$(oe)}`), re;
  } });
}
function B$1(e) {
  return j("instanceOf", { type: e });
}
function I$2(e) {
  return j("objectOf", { type: Object, validator(k) {
    let oe = "";
    const re = Object.keys(k).every((ae) => (oe = m$1(e, k[ae], !0), oe === !0));
    return re || d$1(`objectOf - value validation error:
${$(oe)}`), re;
  } });
}
function J$1(e) {
  const k = Object.keys(e), oe = k.filter((ae) => {
    var le;
    return !((le = e[ae]) === null || le === void 0 || !le.required);
  }), re = j("shape", { type: Object, validator(ae) {
    if (!c$1(ae))
      return !1;
    const le = Object.keys(ae);
    if (oe.length > 0 && oe.some((ie) => le.indexOf(ie) === -1)) {
      const ie = oe.filter((ue) => le.indexOf(ue) === -1);
      return d$1(ie.length === 1 ? `shape - required property "${ie[0]}" is not defined.` : `shape - required properties "${ie.join('", "')}" are not defined.`), !1;
    }
    return le.every((ie) => {
      if (k.indexOf(ie) === -1)
        return this._vueTypes_isLoose === !0 || (d$1(`shape - shape definition does not include a "${ie}" property. Allowed keys: "${k.join('", "')}".`), !1);
      const ue = m$1(e[ie], ae[ie], !0);
      return typeof ue == "string" && d$1(`shape - "${ie}" property validation error:
 ${$(ue)}`), ue === !0;
    });
  } });
  return Object.defineProperty(re, "_vueTypes_isLoose", { writable: !0, value: !1 }), Object.defineProperty(re, "loose", { get() {
    return this._vueTypes_isLoose = !0, this;
  } }), re;
}
const M$1 = ["name", "validate", "getter"], R$1 = /* @__PURE__ */ (() => {
  var e;
  return (e = class {
    static get any() {
      return w$1();
    }
    static get func() {
      return P$2().def(this.defaults.func);
    }
    static get bool() {
      return x$1().def(this.defaults.bool);
    }
    static get string() {
      return E$2().def(this.defaults.string);
    }
    static get number() {
      return N$2().def(this.defaults.number);
    }
    static get array() {
      return q$1().def(this.defaults.array);
    }
    static get object() {
      return A$1().def(this.defaults.object);
    }
    static get integer() {
      return V().def(this.defaults.integer);
    }
    static get symbol() {
      return S$1();
    }
    static get nullable() {
      return { type: null };
    }
    static extend(k) {
      if (v$1(k))
        return k.forEach((de) => this.extend(de)), this;
      const { name: oe, validate: re = !1, getter: ae = !1 } = k, le = r(k, M$1);
      if (p$1(this, oe))
        throw new TypeError(`[VueTypes error]: Type "${oe}" already defined`);
      const { type: ie } = le;
      if (b$1(ie))
        return delete le.type, Object.defineProperty(this, oe, ae ? { get: () => T$1(oe, ie, le) } : { value(...de) {
          const pe = T$1(oe, ie, le);
          return pe.validator && (pe.validator = pe.validator.bind(pe, ...de)), pe;
        } });
      let ue;
      return ue = ae ? { get() {
        const de = Object.assign({}, le);
        return re ? _$1(oe, de) : j(oe, de);
      }, enumerable: !0 } : { value(...de) {
        const pe = Object.assign({}, le);
        let Ce;
        return Ce = re ? _$1(oe, pe) : j(oe, pe), pe.validator && (Ce.validator = pe.validator.bind(Ce, ...de)), Ce;
      }, enumerable: !0 }, Object.defineProperty(this, oe, ue);
    }
  }).defaults = {}, e.sensibleDefaults = void 0, e.config = n, e.custom = D$1, e.oneOf = L, e.instanceOf = B$1, e.oneOfType = F$1, e.arrayOf = Y$1, e.objectOf = I$2, e.shape = J$1, e.utils = { validate: (k, oe) => m$1(oe, k, !0) === !0, toType: (k, oe, re = !1) => re ? _$1(k, oe) : j(k, oe) }, e;
})();
function z(e = { func: () => {
}, bool: !0, string: "", number: 0, array: () => [], object: () => ({}), integer: 0 }) {
  var k;
  return (k = class extends R$1 {
    static get sensibleDefaults() {
      return t({}, this.defaults);
    }
    static set sensibleDefaults(oe) {
      this.defaults = oe !== !1 ? t({}, oe !== !0 ? oe : e) : {};
    }
  }).defaults = t({}, e), k;
}
class C$1 extends z() {
}
const propTypes = z({
  func: void 0,
  bool: void 0,
  string: void 0,
  number: void 0,
  object: void 0,
  integer: void 0
});
propTypes.extend([
  {
    name: "style",
    getter: !0,
    type: [String, Object],
    default: void 0
  },
  {
    name: "VNodeChild",
    getter: !0,
    type: void 0
  }
]);
function withInstall$1(e) {
  return e.install = (k) => {
    const { name: oe } = e;
    k.component(oe, e);
  }, e;
}
const toString$1 = Object.prototype.toString;
function is(e, k) {
  return toString$1.call(e) === `[object ${k}]`;
}
function isDef(e) {
  return typeof e < "u";
}
function isUnDef(e) {
  return !isDef(e);
}
function isObject$3(e) {
  return e !== null && is(e, "Object");
}
function isNull(e) {
  return e === null;
}
function isNullOrUnDef(e) {
  return isUnDef(e) || isNull(e);
}
function isNumber$1(e) {
  return is(e, "Number");
}
function isString$2(e) {
  return is(e, "String");
}
function isFunction$2(e) {
  return typeof e == "function";
}
function isBoolean$1(e) {
  return is(e, "Boolean");
}
function isArray$3(e) {
  return e && Array.isArray(e);
}
function getDynamicProps(e) {
  const k = {};
  return Object.keys(e).map((oe) => {
    k[oe] = unref(e[oe]);
  }), k;
}
function deepMerge$1(e = {}, k = {}) {
  let oe;
  for (oe in k)
    e[oe] = isObject$3(e[oe]) ? deepMerge$1(e[oe], k[oe]) : e[oe] = k[oe];
  return e;
}
const projectName = "Pandora 2.0";
function error(e) {
  throw new Error(`[${projectName} error]:${e}`);
}
const _sfc_main$_ = {
  name: "PdContainer",
  props: {
    title: null,
    md: null
  },
  data() {
    return {
      isPC: !0
    };
  },
  mounted() {
  },
  methods: {
    getIsPc() {
      return !/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
    }
  }
}, index_vue_vue_type_style_index_0_lang$3 = "", index_vue_vue_type_style_index_1_scope_true_lang = "", _export_sfc$1 = (e, k) => {
  const oe = e.__vccOpts || e;
  for (const [re, ae] of k)
    oe[re] = ae;
  return oe;
}, _hoisted_1$w = { class: "title" }, _hoisted_2$m = /* @__PURE__ */ createElementVNode("span", { class: "border" }, null, -1);
function _sfc_render$i(e, k, oe, re, ae, le) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(ae.isPC ? "PandoraContainer" : "PandoraContainer-m")
  }, [
    createElementVNode("div", _hoisted_1$w, [
      createElementVNode("span", null, [
        createTextVNode(toDisplayString(oe.title), 1),
        _hoisted_2$m
      ]),
      renderSlot(e.$slots, "rightBox")
    ]),
    createElementVNode("div", {
      class: normalizeClass(oe.md ? "context_d" : "context")
    }, [
      renderSlot(e.$slots, "default")
    ], 2)
  ], 2);
}
const PandoraContainer = /* @__PURE__ */ _export_sfc$1(_sfc_main$_, [["render", _sfc_render$i]]), PdFContainer = withInstall$1(PandoraContainer);
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
const freeGlobal$1 = freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self, root = freeGlobal$1 || freeSelf || Function("return this")();
const root$1 = root;
var Symbol$1 = root$1.Symbol;
const Symbol$2 = Symbol$1;
var objectProto$f = Object.prototype, hasOwnProperty$d = objectProto$f.hasOwnProperty, nativeObjectToString$1 = objectProto$f.toString, symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
function getRawTag(e) {
  var k = hasOwnProperty$d.call(e, symToStringTag$1), oe = e[symToStringTag$1];
  try {
    e[symToStringTag$1] = void 0;
    var re = !0;
  } catch {
  }
  var ae = nativeObjectToString$1.call(e);
  return re && (k ? e[symToStringTag$1] = oe : delete e[symToStringTag$1]), ae;
}
var objectProto$e = Object.prototype, nativeObjectToString = objectProto$e.toString;
function objectToString$1(e) {
  return nativeObjectToString.call(e);
}
var nullTag = "[object Null]", undefinedTag = "[object Undefined]", symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
function baseGetTag(e) {
  return e == null ? e === void 0 ? undefinedTag : nullTag : symToStringTag && symToStringTag in Object(e) ? getRawTag(e) : objectToString$1(e);
}
function isObjectLike(e) {
  return e != null && typeof e == "object";
}
var symbolTag$3 = "[object Symbol]";
function isSymbol(e) {
  return typeof e == "symbol" || isObjectLike(e) && baseGetTag(e) == symbolTag$3;
}
function arrayMap(e, k) {
  for (var oe = -1, re = e == null ? 0 : e.length, ae = Array(re); ++oe < re; )
    ae[oe] = k(e[oe], oe, e);
  return ae;
}
var isArray$1 = Array.isArray;
const isArray$2 = isArray$1;
var INFINITY$3 = 1 / 0, symbolProto$2 = Symbol$2 ? Symbol$2.prototype : void 0, symbolToString = symbolProto$2 ? symbolProto$2.toString : void 0;
function baseToString(e) {
  if (typeof e == "string")
    return e;
  if (isArray$2(e))
    return arrayMap(e, baseToString) + "";
  if (isSymbol(e))
    return symbolToString ? symbolToString.call(e) : "";
  var k = e + "";
  return k == "0" && 1 / e == -INFINITY$3 ? "-0" : k;
}
var reWhitespace = /\s/;
function trimmedEndIndex(e) {
  for (var k = e.length; k-- && reWhitespace.test(e.charAt(k)); )
    ;
  return k;
}
var reTrimStart = /^\s+/;
function baseTrim(e) {
  return e && e.slice(0, trimmedEndIndex(e) + 1).replace(reTrimStart, "");
}
function isObject$2(e) {
  var k = typeof e;
  return e != null && (k == "object" || k == "function");
}
var NAN = 0 / 0, reIsBadHex = /^[-+]0x[0-9a-f]+$/i, reIsBinary = /^0b[01]+$/i, reIsOctal = /^0o[0-7]+$/i, freeParseInt = parseInt;
function toNumber(e) {
  if (typeof e == "number")
    return e;
  if (isSymbol(e))
    return NAN;
  if (isObject$2(e)) {
    var k = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = isObject$2(k) ? k + "" : k;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = baseTrim(e);
  var oe = reIsBinary.test(e);
  return oe || reIsOctal.test(e) ? freeParseInt(e.slice(2), oe ? 2 : 8) : reIsBadHex.test(e) ? NAN : +e;
}
function identity(e) {
  return e;
}
var asyncTag = "[object AsyncFunction]", funcTag$2 = "[object Function]", genTag$1 = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction$1(e) {
  if (!isObject$2(e))
    return !1;
  var k = baseGetTag(e);
  return k == funcTag$2 || k == genTag$1 || k == asyncTag || k == proxyTag;
}
var coreJsData = root$1["__core-js_shared__"];
const coreJsData$1 = coreJsData;
var maskSrcKey = function() {
  var e = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function isMasked(e) {
  return !!maskSrcKey && maskSrcKey in e;
}
var funcProto$2 = Function.prototype, funcToString$2 = funcProto$2.toString;
function toSource(e) {
  if (e != null) {
    try {
      return funcToString$2.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reIsHostCtor = /^\[object .+?Constructor\]$/, funcProto$1 = Function.prototype, objectProto$d = Object.prototype, funcToString$1 = funcProto$1.toString, hasOwnProperty$c = objectProto$d.hasOwnProperty, reIsNative = RegExp(
  "^" + funcToString$1.call(hasOwnProperty$c).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(e) {
  if (!isObject$2(e) || isMasked(e))
    return !1;
  var k = isFunction$1(e) ? reIsNative : reIsHostCtor;
  return k.test(toSource(e));
}
function getValue$1(e, k) {
  return e == null ? void 0 : e[k];
}
function getNative(e, k) {
  var oe = getValue$1(e, k);
  return baseIsNative(oe) ? oe : void 0;
}
var WeakMap = getNative(root$1, "WeakMap");
const WeakMap$1 = WeakMap;
var objectCreate = Object.create, baseCreate = function() {
  function e() {
  }
  return function(k) {
    if (!isObject$2(k))
      return {};
    if (objectCreate)
      return objectCreate(k);
    e.prototype = k;
    var oe = new e();
    return e.prototype = void 0, oe;
  };
}();
const baseCreate$1 = baseCreate;
function apply(e, k, oe) {
  switch (oe.length) {
    case 0:
      return e.call(k);
    case 1:
      return e.call(k, oe[0]);
    case 2:
      return e.call(k, oe[0], oe[1]);
    case 3:
      return e.call(k, oe[0], oe[1], oe[2]);
  }
  return e.apply(k, oe);
}
function noop$1() {
}
function copyArray(e, k) {
  var oe = -1, re = e.length;
  for (k || (k = Array(re)); ++oe < re; )
    k[oe] = e[oe];
  return k;
}
var HOT_COUNT = 800, HOT_SPAN = 16, nativeNow = Date.now;
function shortOut(e) {
  var k = 0, oe = 0;
  return function() {
    var re = nativeNow(), ae = HOT_SPAN - (re - oe);
    if (oe = re, ae > 0) {
      if (++k >= HOT_COUNT)
        return arguments[0];
    } else
      k = 0;
    return e.apply(void 0, arguments);
  };
}
function constant(e) {
  return function() {
    return e;
  };
}
var defineProperty = function() {
  try {
    var e = getNative(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}();
const defineProperty$1 = defineProperty;
var baseSetToString = defineProperty$1 ? function(e, k) {
  return defineProperty$1(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: constant(k),
    writable: !0
  });
} : identity;
const baseSetToString$1 = baseSetToString;
var setToString = shortOut(baseSetToString$1);
const setToString$1 = setToString;
function arrayEach(e, k) {
  for (var oe = -1, re = e == null ? 0 : e.length; ++oe < re && k(e[oe], oe, e) !== !1; )
    ;
  return e;
}
function baseFindIndex(e, k, oe, re) {
  for (var ae = e.length, le = oe + (re ? 1 : -1); re ? le-- : ++le < ae; )
    if (k(e[le], le, e))
      return le;
  return -1;
}
function baseIsNaN(e) {
  return e !== e;
}
function strictIndexOf(e, k, oe) {
  for (var re = oe - 1, ae = e.length; ++re < ae; )
    if (e[re] === k)
      return re;
  return -1;
}
function baseIndexOf(e, k, oe) {
  return k === k ? strictIndexOf(e, k, oe) : baseFindIndex(e, baseIsNaN, oe);
}
function arrayIncludes(e, k) {
  var oe = e == null ? 0 : e.length;
  return !!oe && baseIndexOf(e, k, 0) > -1;
}
var MAX_SAFE_INTEGER$1 = 9007199254740991, reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(e, k) {
  var oe = typeof e;
  return k = k == null ? MAX_SAFE_INTEGER$1 : k, !!k && (oe == "number" || oe != "symbol" && reIsUint.test(e)) && e > -1 && e % 1 == 0 && e < k;
}
function baseAssignValue(e, k, oe) {
  k == "__proto__" && defineProperty$1 ? defineProperty$1(e, k, {
    configurable: !0,
    enumerable: !0,
    value: oe,
    writable: !0
  }) : e[k] = oe;
}
function eq(e, k) {
  return e === k || e !== e && k !== k;
}
var objectProto$c = Object.prototype, hasOwnProperty$b = objectProto$c.hasOwnProperty;
function assignValue(e, k, oe) {
  var re = e[k];
  (!(hasOwnProperty$b.call(e, k) && eq(re, oe)) || oe === void 0 && !(k in e)) && baseAssignValue(e, k, oe);
}
function copyObject(e, k, oe, re) {
  var ae = !oe;
  oe || (oe = {});
  for (var le = -1, ie = k.length; ++le < ie; ) {
    var ue = k[le], de = re ? re(oe[ue], e[ue], ue, oe, e) : void 0;
    de === void 0 && (de = e[ue]), ae ? baseAssignValue(oe, ue, de) : assignValue(oe, ue, de);
  }
  return oe;
}
var nativeMax$1 = Math.max;
function overRest(e, k, oe) {
  return k = nativeMax$1(k === void 0 ? e.length - 1 : k, 0), function() {
    for (var re = arguments, ae = -1, le = nativeMax$1(re.length - k, 0), ie = Array(le); ++ae < le; )
      ie[ae] = re[k + ae];
    ae = -1;
    for (var ue = Array(k + 1); ++ae < k; )
      ue[ae] = re[ae];
    return ue[k] = oe(ie), apply(e, this, ue);
  };
}
function baseRest(e, k) {
  return setToString$1(overRest(e, k, identity), e + "");
}
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= MAX_SAFE_INTEGER;
}
function isArrayLike(e) {
  return e != null && isLength(e.length) && !isFunction$1(e);
}
var objectProto$b = Object.prototype;
function isPrototype(e) {
  var k = e && e.constructor, oe = typeof k == "function" && k.prototype || objectProto$b;
  return e === oe;
}
function baseTimes(e, k) {
  for (var oe = -1, re = Array(e); ++oe < e; )
    re[oe] = k(oe);
  return re;
}
var argsTag$3 = "[object Arguments]";
function baseIsArguments(e) {
  return isObjectLike(e) && baseGetTag(e) == argsTag$3;
}
var objectProto$a = Object.prototype, hasOwnProperty$a = objectProto$a.hasOwnProperty, propertyIsEnumerable$1 = objectProto$a.propertyIsEnumerable, isArguments = baseIsArguments(function() {
  return arguments;
}()) ? baseIsArguments : function(e) {
  return isObjectLike(e) && hasOwnProperty$a.call(e, "callee") && !propertyIsEnumerable$1.call(e, "callee");
};
const isArguments$1 = isArguments;
function stubFalse() {
  return !1;
}
var freeExports$2 = typeof exports == "object" && exports && !exports.nodeType && exports, freeModule$2 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module, moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2, Buffer$1 = moduleExports$2 ? root$1.Buffer : void 0, nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : void 0, isBuffer = nativeIsBuffer || stubFalse;
const isBuffer$1 = isBuffer;
var argsTag$2 = "[object Arguments]", arrayTag$2 = "[object Array]", boolTag$3 = "[object Boolean]", dateTag$3 = "[object Date]", errorTag$2 = "[object Error]", funcTag$1 = "[object Function]", mapTag$5 = "[object Map]", numberTag$3 = "[object Number]", objectTag$4 = "[object Object]", regexpTag$3 = "[object RegExp]", setTag$5 = "[object Set]", stringTag$3 = "[object String]", weakMapTag$2 = "[object WeakMap]", arrayBufferTag$3 = "[object ArrayBuffer]", dataViewTag$4 = "[object DataView]", float32Tag$2 = "[object Float32Array]", float64Tag$2 = "[object Float64Array]", int8Tag$2 = "[object Int8Array]", int16Tag$2 = "[object Int16Array]", int32Tag$2 = "[object Int32Array]", uint8Tag$2 = "[object Uint8Array]", uint8ClampedTag$2 = "[object Uint8ClampedArray]", uint16Tag$2 = "[object Uint16Array]", uint32Tag$2 = "[object Uint32Array]", typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = !0;
typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$2] = typedArrayTags[arrayBufferTag$3] = typedArrayTags[boolTag$3] = typedArrayTags[dataViewTag$4] = typedArrayTags[dateTag$3] = typedArrayTags[errorTag$2] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$5] = typedArrayTags[numberTag$3] = typedArrayTags[objectTag$4] = typedArrayTags[regexpTag$3] = typedArrayTags[setTag$5] = typedArrayTags[stringTag$3] = typedArrayTags[weakMapTag$2] = !1;
function baseIsTypedArray(e) {
  return isObjectLike(e) && isLength(e.length) && !!typedArrayTags[baseGetTag(e)];
}
function baseUnary(e) {
  return function(k) {
    return e(k);
  };
}
var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports, freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module, moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1, freeProcess = moduleExports$1 && freeGlobal$1.process, nodeUtil = function() {
  try {
    var e = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
    return e || freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch {
  }
}();
const nodeUtil$1 = nodeUtil;
var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray, isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
const isTypedArray$1 = isTypedArray;
var objectProto$9 = Object.prototype, hasOwnProperty$9 = objectProto$9.hasOwnProperty;
function arrayLikeKeys(e, k) {
  var oe = isArray$2(e), re = !oe && isArguments$1(e), ae = !oe && !re && isBuffer$1(e), le = !oe && !re && !ae && isTypedArray$1(e), ie = oe || re || ae || le, ue = ie ? baseTimes(e.length, String) : [], de = ue.length;
  for (var pe in e)
    (k || hasOwnProperty$9.call(e, pe)) && !(ie && (pe == "length" || ae && (pe == "offset" || pe == "parent") || le && (pe == "buffer" || pe == "byteLength" || pe == "byteOffset") || isIndex(pe, de))) && ue.push(pe);
  return ue;
}
function overArg(e, k) {
  return function(oe) {
    return e(k(oe));
  };
}
var nativeKeys = overArg(Object.keys, Object);
const nativeKeys$1 = nativeKeys;
var objectProto$8 = Object.prototype, hasOwnProperty$8 = objectProto$8.hasOwnProperty;
function baseKeys(e) {
  if (!isPrototype(e))
    return nativeKeys$1(e);
  var k = [];
  for (var oe in Object(e))
    hasOwnProperty$8.call(e, oe) && oe != "constructor" && k.push(oe);
  return k;
}
function keys(e) {
  return isArrayLike(e) ? arrayLikeKeys(e) : baseKeys(e);
}
function nativeKeysIn(e) {
  var k = [];
  if (e != null)
    for (var oe in Object(e))
      k.push(oe);
  return k;
}
var objectProto$7 = Object.prototype, hasOwnProperty$7 = objectProto$7.hasOwnProperty;
function baseKeysIn(e) {
  if (!isObject$2(e))
    return nativeKeysIn(e);
  var k = isPrototype(e), oe = [];
  for (var re in e)
    re == "constructor" && (k || !hasOwnProperty$7.call(e, re)) || oe.push(re);
  return oe;
}
function keysIn(e) {
  return isArrayLike(e) ? arrayLikeKeys(e, !0) : baseKeysIn(e);
}
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
function isKey(e, k) {
  if (isArray$2(e))
    return !1;
  var oe = typeof e;
  return oe == "number" || oe == "symbol" || oe == "boolean" || e == null || isSymbol(e) ? !0 : reIsPlainProp.test(e) || !reIsDeepProp.test(e) || k != null && e in Object(k);
}
var nativeCreate = getNative(Object, "create");
const nativeCreate$1 = nativeCreate;
function hashClear() {
  this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {}, this.size = 0;
}
function hashDelete(e) {
  var k = this.has(e) && delete this.__data__[e];
  return this.size -= k ? 1 : 0, k;
}
var HASH_UNDEFINED$2 = "__lodash_hash_undefined__", objectProto$6 = Object.prototype, hasOwnProperty$6 = objectProto$6.hasOwnProperty;
function hashGet(e) {
  var k = this.__data__;
  if (nativeCreate$1) {
    var oe = k[e];
    return oe === HASH_UNDEFINED$2 ? void 0 : oe;
  }
  return hasOwnProperty$6.call(k, e) ? k[e] : void 0;
}
var objectProto$5 = Object.prototype, hasOwnProperty$5 = objectProto$5.hasOwnProperty;
function hashHas(e) {
  var k = this.__data__;
  return nativeCreate$1 ? k[e] !== void 0 : hasOwnProperty$5.call(k, e);
}
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
function hashSet(e, k) {
  var oe = this.__data__;
  return this.size += this.has(e) ? 0 : 1, oe[e] = nativeCreate$1 && k === void 0 ? HASH_UNDEFINED$1 : k, this;
}
function Hash(e) {
  var k = -1, oe = e == null ? 0 : e.length;
  for (this.clear(); ++k < oe; ) {
    var re = e[k];
    this.set(re[0], re[1]);
  }
}
Hash.prototype.clear = hashClear;
Hash.prototype.delete = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
function listCacheClear() {
  this.__data__ = [], this.size = 0;
}
function assocIndexOf(e, k) {
  for (var oe = e.length; oe--; )
    if (eq(e[oe][0], k))
      return oe;
  return -1;
}
var arrayProto = Array.prototype, splice = arrayProto.splice;
function listCacheDelete(e) {
  var k = this.__data__, oe = assocIndexOf(k, e);
  if (oe < 0)
    return !1;
  var re = k.length - 1;
  return oe == re ? k.pop() : splice.call(k, oe, 1), --this.size, !0;
}
function listCacheGet(e) {
  var k = this.__data__, oe = assocIndexOf(k, e);
  return oe < 0 ? void 0 : k[oe][1];
}
function listCacheHas(e) {
  return assocIndexOf(this.__data__, e) > -1;
}
function listCacheSet(e, k) {
  var oe = this.__data__, re = assocIndexOf(oe, e);
  return re < 0 ? (++this.size, oe.push([e, k])) : oe[re][1] = k, this;
}
function ListCache(e) {
  var k = -1, oe = e == null ? 0 : e.length;
  for (this.clear(); ++k < oe; ) {
    var re = e[k];
    this.set(re[0], re[1]);
  }
}
ListCache.prototype.clear = listCacheClear;
ListCache.prototype.delete = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
var Map$1 = getNative(root$1, "Map");
const Map$2 = Map$1;
function mapCacheClear() {
  this.size = 0, this.__data__ = {
    hash: new Hash(),
    map: new (Map$2 || ListCache)(),
    string: new Hash()
  };
}
function isKeyable(e) {
  var k = typeof e;
  return k == "string" || k == "number" || k == "symbol" || k == "boolean" ? e !== "__proto__" : e === null;
}
function getMapData(e, k) {
  var oe = e.__data__;
  return isKeyable(k) ? oe[typeof k == "string" ? "string" : "hash"] : oe.map;
}
function mapCacheDelete(e) {
  var k = getMapData(this, e).delete(e);
  return this.size -= k ? 1 : 0, k;
}
function mapCacheGet(e) {
  return getMapData(this, e).get(e);
}
function mapCacheHas(e) {
  return getMapData(this, e).has(e);
}
function mapCacheSet(e, k) {
  var oe = getMapData(this, e), re = oe.size;
  return oe.set(e, k), this.size += oe.size == re ? 0 : 1, this;
}
function MapCache(e) {
  var k = -1, oe = e == null ? 0 : e.length;
  for (this.clear(); ++k < oe; ) {
    var re = e[k];
    this.set(re[0], re[1]);
  }
}
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype.delete = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
var FUNC_ERROR_TEXT$1 = "Expected a function";
function memoize(e, k) {
  if (typeof e != "function" || k != null && typeof k != "function")
    throw new TypeError(FUNC_ERROR_TEXT$1);
  var oe = function() {
    var re = arguments, ae = k ? k.apply(this, re) : re[0], le = oe.cache;
    if (le.has(ae))
      return le.get(ae);
    var ie = e.apply(this, re);
    return oe.cache = le.set(ae, ie) || le, ie;
  };
  return oe.cache = new (memoize.Cache || MapCache)(), oe;
}
memoize.Cache = MapCache;
var MAX_MEMOIZE_SIZE = 500;
function memoizeCapped(e) {
  var k = memoize(e, function(re) {
    return oe.size === MAX_MEMOIZE_SIZE && oe.clear(), re;
  }), oe = k.cache;
  return k;
}
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, reEscapeChar = /\\(\\)?/g, stringToPath = memoizeCapped(function(e) {
  var k = [];
  return e.charCodeAt(0) === 46 && k.push(""), e.replace(rePropName, function(oe, re, ae, le) {
    k.push(ae ? le.replace(reEscapeChar, "$1") : re || oe);
  }), k;
});
const stringToPath$1 = stringToPath;
function toString(e) {
  return e == null ? "" : baseToString(e);
}
function castPath(e, k) {
  return isArray$2(e) ? e : isKey(e, k) ? [e] : stringToPath$1(toString(e));
}
var INFINITY$2 = 1 / 0;
function toKey(e) {
  if (typeof e == "string" || isSymbol(e))
    return e;
  var k = e + "";
  return k == "0" && 1 / e == -INFINITY$2 ? "-0" : k;
}
function baseGet(e, k) {
  k = castPath(k, e);
  for (var oe = 0, re = k.length; e != null && oe < re; )
    e = e[toKey(k[oe++])];
  return oe && oe == re ? e : void 0;
}
function get(e, k, oe) {
  var re = e == null ? void 0 : baseGet(e, k);
  return re === void 0 ? oe : re;
}
function arrayPush(e, k) {
  for (var oe = -1, re = k.length, ae = e.length; ++oe < re; )
    e[ae + oe] = k[oe];
  return e;
}
var spreadableSymbol = Symbol$2 ? Symbol$2.isConcatSpreadable : void 0;
function isFlattenable(e) {
  return isArray$2(e) || isArguments$1(e) || !!(spreadableSymbol && e && e[spreadableSymbol]);
}
function baseFlatten(e, k, oe, re, ae) {
  var le = -1, ie = e.length;
  for (oe || (oe = isFlattenable), ae || (ae = []); ++le < ie; ) {
    var ue = e[le];
    k > 0 && oe(ue) ? k > 1 ? baseFlatten(ue, k - 1, oe, re, ae) : arrayPush(ae, ue) : re || (ae[ae.length] = ue);
  }
  return ae;
}
function flatten(e) {
  var k = e == null ? 0 : e.length;
  return k ? baseFlatten(e, 1) : [];
}
function flatRest(e) {
  return setToString$1(overRest(e, void 0, flatten), e + "");
}
var getPrototype = overArg(Object.getPrototypeOf, Object);
const getPrototype$1 = getPrototype;
var objectTag$3 = "[object Object]", funcProto = Function.prototype, objectProto$4 = Object.prototype, funcToString = funcProto.toString, hasOwnProperty$4 = objectProto$4.hasOwnProperty, objectCtorString = funcToString.call(Object);
function isPlainObject(e) {
  if (!isObjectLike(e) || baseGetTag(e) != objectTag$3)
    return !1;
  var k = getPrototype$1(e);
  if (k === null)
    return !0;
  var oe = hasOwnProperty$4.call(k, "constructor") && k.constructor;
  return typeof oe == "function" && oe instanceof oe && funcToString.call(oe) == objectCtorString;
}
function baseSlice(e, k, oe) {
  var re = -1, ae = e.length;
  k < 0 && (k = -k > ae ? 0 : ae + k), oe = oe > ae ? ae : oe, oe < 0 && (oe += ae), ae = k > oe ? 0 : oe - k >>> 0, k >>>= 0;
  for (var le = Array(ae); ++re < ae; )
    le[re] = e[re + k];
  return le;
}
function castSlice(e, k, oe) {
  var re = e.length;
  return oe = oe === void 0 ? re : oe, !k && oe >= re ? e : baseSlice(e, k, oe);
}
var rsAstralRange$1 = "\\ud800-\\udfff", rsComboMarksRange$1 = "\\u0300-\\u036f", reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$1 = "\\u20d0-\\u20ff", rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1, rsVarRange$1 = "\\ufe0e\\ufe0f", rsZWJ$1 = "\\u200d", reHasUnicode = RegExp("[" + rsZWJ$1 + rsAstralRange$1 + rsComboRange$1 + rsVarRange$1 + "]");
function hasUnicode(e) {
  return reHasUnicode.test(e);
}
function asciiToArray(e) {
  return e.split("");
}
var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsVarRange = "\\ufe0e\\ufe0f", rsAstral = "[" + rsAstralRange + "]", rsCombo = "[" + rsComboRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsZWJ = "\\u200d", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")", reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
function unicodeToArray(e) {
  return e.match(reUnicode) || [];
}
function stringToArray(e) {
  return hasUnicode(e) ? unicodeToArray(e) : asciiToArray(e);
}
function createCaseFirst(e) {
  return function(k) {
    k = toString(k);
    var oe = hasUnicode(k) ? stringToArray(k) : void 0, re = oe ? oe[0] : k.charAt(0), ae = oe ? castSlice(oe, 1).join("") : k.slice(1);
    return re[e]() + ae;
  };
}
var upperFirst = createCaseFirst("toUpperCase");
const upperFirst$1 = upperFirst;
function castArray$1() {
  if (!arguments.length)
    return [];
  var e = arguments[0];
  return isArray$2(e) ? e : [e];
}
function stackClear() {
  this.__data__ = new ListCache(), this.size = 0;
}
function stackDelete(e) {
  var k = this.__data__, oe = k.delete(e);
  return this.size = k.size, oe;
}
function stackGet(e) {
  return this.__data__.get(e);
}
function stackHas(e) {
  return this.__data__.has(e);
}
var LARGE_ARRAY_SIZE$1 = 200;
function stackSet(e, k) {
  var oe = this.__data__;
  if (oe instanceof ListCache) {
    var re = oe.__data__;
    if (!Map$2 || re.length < LARGE_ARRAY_SIZE$1 - 1)
      return re.push([e, k]), this.size = ++oe.size, this;
    oe = this.__data__ = new MapCache(re);
  }
  return oe.set(e, k), this.size = oe.size, this;
}
function Stack(e) {
  var k = this.__data__ = new ListCache(e);
  this.size = k.size;
}
Stack.prototype.clear = stackClear;
Stack.prototype.delete = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
function baseAssign(e, k) {
  return e && copyObject(k, keys(k), e);
}
function baseAssignIn(e, k) {
  return e && copyObject(k, keysIn(k), e);
}
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports, freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module, moduleExports = freeModule && freeModule.exports === freeExports, Buffer = moduleExports ? root$1.Buffer : void 0, allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
function cloneBuffer(e, k) {
  if (k)
    return e.slice();
  var oe = e.length, re = allocUnsafe ? allocUnsafe(oe) : new e.constructor(oe);
  return e.copy(re), re;
}
function arrayFilter(e, k) {
  for (var oe = -1, re = e == null ? 0 : e.length, ae = 0, le = []; ++oe < re; ) {
    var ie = e[oe];
    k(ie, oe, e) && (le[ae++] = ie);
  }
  return le;
}
function stubArray() {
  return [];
}
var objectProto$3 = Object.prototype, propertyIsEnumerable = objectProto$3.propertyIsEnumerable, nativeGetSymbols$1 = Object.getOwnPropertySymbols, getSymbols = nativeGetSymbols$1 ? function(e) {
  return e == null ? [] : (e = Object(e), arrayFilter(nativeGetSymbols$1(e), function(k) {
    return propertyIsEnumerable.call(e, k);
  }));
} : stubArray;
const getSymbols$1 = getSymbols;
function copySymbols(e, k) {
  return copyObject(e, getSymbols$1(e), k);
}
var nativeGetSymbols = Object.getOwnPropertySymbols, getSymbolsIn = nativeGetSymbols ? function(e) {
  for (var k = []; e; )
    arrayPush(k, getSymbols$1(e)), e = getPrototype$1(e);
  return k;
} : stubArray;
const getSymbolsIn$1 = getSymbolsIn;
function copySymbolsIn(e, k) {
  return copyObject(e, getSymbolsIn$1(e), k);
}
function baseGetAllKeys(e, k, oe) {
  var re = k(e);
  return isArray$2(e) ? re : arrayPush(re, oe(e));
}
function getAllKeys(e) {
  return baseGetAllKeys(e, keys, getSymbols$1);
}
function getAllKeysIn(e) {
  return baseGetAllKeys(e, keysIn, getSymbolsIn$1);
}
var DataView = getNative(root$1, "DataView");
const DataView$1 = DataView;
var Promise$1 = getNative(root$1, "Promise");
const Promise$2 = Promise$1;
var Set$1 = getNative(root$1, "Set");
const Set$2 = Set$1;
var mapTag$4 = "[object Map]", objectTag$2 = "[object Object]", promiseTag = "[object Promise]", setTag$4 = "[object Set]", weakMapTag$1 = "[object WeakMap]", dataViewTag$3 = "[object DataView]", dataViewCtorString = toSource(DataView$1), mapCtorString = toSource(Map$2), promiseCtorString = toSource(Promise$2), setCtorString = toSource(Set$2), weakMapCtorString = toSource(WeakMap$1), getTag = baseGetTag;
(DataView$1 && getTag(new DataView$1(new ArrayBuffer(1))) != dataViewTag$3 || Map$2 && getTag(new Map$2()) != mapTag$4 || Promise$2 && getTag(Promise$2.resolve()) != promiseTag || Set$2 && getTag(new Set$2()) != setTag$4 || WeakMap$1 && getTag(new WeakMap$1()) != weakMapTag$1) && (getTag = function(e) {
  var k = baseGetTag(e), oe = k == objectTag$2 ? e.constructor : void 0, re = oe ? toSource(oe) : "";
  if (re)
    switch (re) {
      case dataViewCtorString:
        return dataViewTag$3;
      case mapCtorString:
        return mapTag$4;
      case promiseCtorString:
        return promiseTag;
      case setCtorString:
        return setTag$4;
      case weakMapCtorString:
        return weakMapTag$1;
    }
  return k;
});
const getTag$1 = getTag;
var objectProto$2 = Object.prototype, hasOwnProperty$3 = objectProto$2.hasOwnProperty;
function initCloneArray(e) {
  var k = e.length, oe = new e.constructor(k);
  return k && typeof e[0] == "string" && hasOwnProperty$3.call(e, "index") && (oe.index = e.index, oe.input = e.input), oe;
}
var Uint8Array = root$1.Uint8Array;
const Uint8Array$1 = Uint8Array;
function cloneArrayBuffer(e) {
  var k = new e.constructor(e.byteLength);
  return new Uint8Array$1(k).set(new Uint8Array$1(e)), k;
}
function cloneDataView(e, k) {
  var oe = k ? cloneArrayBuffer(e.buffer) : e.buffer;
  return new e.constructor(oe, e.byteOffset, e.byteLength);
}
var reFlags = /\w*$/;
function cloneRegExp(e) {
  var k = new e.constructor(e.source, reFlags.exec(e));
  return k.lastIndex = e.lastIndex, k;
}
var symbolProto$1 = Symbol$2 ? Symbol$2.prototype : void 0, symbolValueOf$1 = symbolProto$1 ? symbolProto$1.valueOf : void 0;
function cloneSymbol(e) {
  return symbolValueOf$1 ? Object(symbolValueOf$1.call(e)) : {};
}
function cloneTypedArray(e, k) {
  var oe = k ? cloneArrayBuffer(e.buffer) : e.buffer;
  return new e.constructor(oe, e.byteOffset, e.length);
}
var boolTag$2 = "[object Boolean]", dateTag$2 = "[object Date]", mapTag$3 = "[object Map]", numberTag$2 = "[object Number]", regexpTag$2 = "[object RegExp]", setTag$3 = "[object Set]", stringTag$2 = "[object String]", symbolTag$2 = "[object Symbol]", arrayBufferTag$2 = "[object ArrayBuffer]", dataViewTag$2 = "[object DataView]", float32Tag$1 = "[object Float32Array]", float64Tag$1 = "[object Float64Array]", int8Tag$1 = "[object Int8Array]", int16Tag$1 = "[object Int16Array]", int32Tag$1 = "[object Int32Array]", uint8Tag$1 = "[object Uint8Array]", uint8ClampedTag$1 = "[object Uint8ClampedArray]", uint16Tag$1 = "[object Uint16Array]", uint32Tag$1 = "[object Uint32Array]";
function initCloneByTag(e, k, oe) {
  var re = e.constructor;
  switch (k) {
    case arrayBufferTag$2:
      return cloneArrayBuffer(e);
    case boolTag$2:
    case dateTag$2:
      return new re(+e);
    case dataViewTag$2:
      return cloneDataView(e, oe);
    case float32Tag$1:
    case float64Tag$1:
    case int8Tag$1:
    case int16Tag$1:
    case int32Tag$1:
    case uint8Tag$1:
    case uint8ClampedTag$1:
    case uint16Tag$1:
    case uint32Tag$1:
      return cloneTypedArray(e, oe);
    case mapTag$3:
      return new re();
    case numberTag$2:
    case stringTag$2:
      return new re(e);
    case regexpTag$2:
      return cloneRegExp(e);
    case setTag$3:
      return new re();
    case symbolTag$2:
      return cloneSymbol(e);
  }
}
function initCloneObject(e) {
  return typeof e.constructor == "function" && !isPrototype(e) ? baseCreate$1(getPrototype$1(e)) : {};
}
var mapTag$2 = "[object Map]";
function baseIsMap(e) {
  return isObjectLike(e) && getTag$1(e) == mapTag$2;
}
var nodeIsMap = nodeUtil$1 && nodeUtil$1.isMap, isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
const isMap$1 = isMap;
var setTag$2 = "[object Set]";
function baseIsSet(e) {
  return isObjectLike(e) && getTag$1(e) == setTag$2;
}
var nodeIsSet = nodeUtil$1 && nodeUtil$1.isSet, isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
const isSet$1 = isSet;
var CLONE_DEEP_FLAG$2 = 1, CLONE_FLAT_FLAG$1 = 2, CLONE_SYMBOLS_FLAG$3 = 4, argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", errorTag$1 = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag$1 = "[object Map]", numberTag$1 = "[object Number]", objectTag$1 = "[object Object]", regexpTag$1 = "[object RegExp]", setTag$1 = "[object Set]", stringTag$1 = "[object String]", symbolTag$1 = "[object Symbol]", weakMapTag = "[object WeakMap]", arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]", cloneableTags = {};
cloneableTags[argsTag$1] = cloneableTags[arrayTag$1] = cloneableTags[arrayBufferTag$1] = cloneableTags[dataViewTag$1] = cloneableTags[boolTag$1] = cloneableTags[dateTag$1] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag$1] = cloneableTags[numberTag$1] = cloneableTags[objectTag$1] = cloneableTags[regexpTag$1] = cloneableTags[setTag$1] = cloneableTags[stringTag$1] = cloneableTags[symbolTag$1] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = !0;
cloneableTags[errorTag$1] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = !1;
function baseClone(e, k, oe, re, ae, le) {
  var ie, ue = k & CLONE_DEEP_FLAG$2, de = k & CLONE_FLAT_FLAG$1, pe = k & CLONE_SYMBOLS_FLAG$3;
  if (oe && (ie = ae ? oe(e, re, ae, le) : oe(e)), ie !== void 0)
    return ie;
  if (!isObject$2(e))
    return e;
  var Ce = isArray$2(e);
  if (Ce) {
    if (ie = initCloneArray(e), !ue)
      return copyArray(e, ie);
  } else {
    var _e = getTag$1(e), $e = _e == funcTag || _e == genTag;
    if (isBuffer$1(e))
      return cloneBuffer(e, ue);
    if (_e == objectTag$1 || _e == argsTag$1 || $e && !ae) {
      if (ie = de || $e ? {} : initCloneObject(e), !ue)
        return de ? copySymbolsIn(e, baseAssignIn(ie, e)) : copySymbols(e, baseAssign(ie, e));
    } else {
      if (!cloneableTags[_e])
        return ae ? e : {};
      ie = initCloneByTag(e, _e, ue);
    }
  }
  le || (le = new Stack());
  var Ve = le.get(e);
  if (Ve)
    return Ve;
  le.set(e, ie), isSet$1(e) ? e.forEach(function(Oe) {
    ie.add(baseClone(Oe, k, oe, Oe, e, le));
  }) : isMap$1(e) && e.forEach(function(Oe, Ie) {
    ie.set(Ie, baseClone(Oe, k, oe, Ie, e, le));
  });
  var Ne = pe ? de ? getAllKeysIn : getAllKeys : de ? keysIn : keys, he = Ce ? void 0 : Ne(e);
  return arrayEach(he || e, function(Oe, Ie) {
    he && (Ie = Oe, Oe = e[Ie]), assignValue(ie, Ie, baseClone(Oe, k, oe, Ie, e, le));
  }), ie;
}
var CLONE_SYMBOLS_FLAG$2 = 4;
function clone(e) {
  return baseClone(e, CLONE_SYMBOLS_FLAG$2);
}
var CLONE_DEEP_FLAG$1 = 1, CLONE_SYMBOLS_FLAG$1 = 4;
function cloneDeep(e) {
  return baseClone(e, CLONE_DEEP_FLAG$1 | CLONE_SYMBOLS_FLAG$1);
}
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function setCacheAdd(e) {
  return this.__data__.set(e, HASH_UNDEFINED), this;
}
function setCacheHas(e) {
  return this.__data__.has(e);
}
function SetCache(e) {
  var k = -1, oe = e == null ? 0 : e.length;
  for (this.__data__ = new MapCache(); ++k < oe; )
    this.add(e[k]);
}
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;
function arraySome(e, k) {
  for (var oe = -1, re = e == null ? 0 : e.length; ++oe < re; )
    if (k(e[oe], oe, e))
      return !0;
  return !1;
}
function cacheHas(e, k) {
  return e.has(k);
}
var COMPARE_PARTIAL_FLAG$5 = 1, COMPARE_UNORDERED_FLAG$3 = 2;
function equalArrays(e, k, oe, re, ae, le) {
  var ie = oe & COMPARE_PARTIAL_FLAG$5, ue = e.length, de = k.length;
  if (ue != de && !(ie && de > ue))
    return !1;
  var pe = le.get(e), Ce = le.get(k);
  if (pe && Ce)
    return pe == k && Ce == e;
  var _e = -1, $e = !0, Ve = oe & COMPARE_UNORDERED_FLAG$3 ? new SetCache() : void 0;
  for (le.set(e, k), le.set(k, e); ++_e < ue; ) {
    var Ne = e[_e], he = k[_e];
    if (re)
      var Oe = ie ? re(he, Ne, _e, k, e, le) : re(Ne, he, _e, e, k, le);
    if (Oe !== void 0) {
      if (Oe)
        continue;
      $e = !1;
      break;
    }
    if (Ve) {
      if (!arraySome(k, function(Ie, qe) {
        if (!cacheHas(Ve, qe) && (Ne === Ie || ae(Ne, Ie, oe, re, le)))
          return Ve.push(qe);
      })) {
        $e = !1;
        break;
      }
    } else if (!(Ne === he || ae(Ne, he, oe, re, le))) {
      $e = !1;
      break;
    }
  }
  return le.delete(e), le.delete(k), $e;
}
function mapToArray(e) {
  var k = -1, oe = Array(e.size);
  return e.forEach(function(re, ae) {
    oe[++k] = [ae, re];
  }), oe;
}
function setToArray(e) {
  var k = -1, oe = Array(e.size);
  return e.forEach(function(re) {
    oe[++k] = re;
  }), oe;
}
var COMPARE_PARTIAL_FLAG$4 = 1, COMPARE_UNORDERED_FLAG$2 = 2, boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", mapTag = "[object Map]", numberTag = "[object Number]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", symbolProto = Symbol$2 ? Symbol$2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
function equalByTag(e, k, oe, re, ae, le, ie) {
  switch (oe) {
    case dataViewTag:
      if (e.byteLength != k.byteLength || e.byteOffset != k.byteOffset)
        return !1;
      e = e.buffer, k = k.buffer;
    case arrayBufferTag:
      return !(e.byteLength != k.byteLength || !le(new Uint8Array$1(e), new Uint8Array$1(k)));
    case boolTag:
    case dateTag:
    case numberTag:
      return eq(+e, +k);
    case errorTag:
      return e.name == k.name && e.message == k.message;
    case regexpTag:
    case stringTag:
      return e == k + "";
    case mapTag:
      var ue = mapToArray;
    case setTag:
      var de = re & COMPARE_PARTIAL_FLAG$4;
      if (ue || (ue = setToArray), e.size != k.size && !de)
        return !1;
      var pe = ie.get(e);
      if (pe)
        return pe == k;
      re |= COMPARE_UNORDERED_FLAG$2, ie.set(e, k);
      var Ce = equalArrays(ue(e), ue(k), re, ae, le, ie);
      return ie.delete(e), Ce;
    case symbolTag:
      if (symbolValueOf)
        return symbolValueOf.call(e) == symbolValueOf.call(k);
  }
  return !1;
}
var COMPARE_PARTIAL_FLAG$3 = 1, objectProto$1 = Object.prototype, hasOwnProperty$2 = objectProto$1.hasOwnProperty;
function equalObjects(e, k, oe, re, ae, le) {
  var ie = oe & COMPARE_PARTIAL_FLAG$3, ue = getAllKeys(e), de = ue.length, pe = getAllKeys(k), Ce = pe.length;
  if (de != Ce && !ie)
    return !1;
  for (var _e = de; _e--; ) {
    var $e = ue[_e];
    if (!(ie ? $e in k : hasOwnProperty$2.call(k, $e)))
      return !1;
  }
  var Ve = le.get(e), Ne = le.get(k);
  if (Ve && Ne)
    return Ve == k && Ne == e;
  var he = !0;
  le.set(e, k), le.set(k, e);
  for (var Oe = ie; ++_e < de; ) {
    $e = ue[_e];
    var Ie = e[$e], qe = k[$e];
    if (re)
      var xe = ie ? re(qe, Ie, $e, k, e, le) : re(Ie, qe, $e, e, k, le);
    if (!(xe === void 0 ? Ie === qe || ae(Ie, qe, oe, re, le) : xe)) {
      he = !1;
      break;
    }
    Oe || (Oe = $e == "constructor");
  }
  if (he && !Oe) {
    var ze = e.constructor, At = k.constructor;
    ze != At && "constructor" in e && "constructor" in k && !(typeof ze == "function" && ze instanceof ze && typeof At == "function" && At instanceof At) && (he = !1);
  }
  return le.delete(e), le.delete(k), he;
}
var COMPARE_PARTIAL_FLAG$2 = 1, argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]", objectProto = Object.prototype, hasOwnProperty$1 = objectProto.hasOwnProperty;
function baseIsEqualDeep(e, k, oe, re, ae, le) {
  var ie = isArray$2(e), ue = isArray$2(k), de = ie ? arrayTag : getTag$1(e), pe = ue ? arrayTag : getTag$1(k);
  de = de == argsTag ? objectTag : de, pe = pe == argsTag ? objectTag : pe;
  var Ce = de == objectTag, _e = pe == objectTag, $e = de == pe;
  if ($e && isBuffer$1(e)) {
    if (!isBuffer$1(k))
      return !1;
    ie = !0, Ce = !1;
  }
  if ($e && !Ce)
    return le || (le = new Stack()), ie || isTypedArray$1(e) ? equalArrays(e, k, oe, re, ae, le) : equalByTag(e, k, de, oe, re, ae, le);
  if (!(oe & COMPARE_PARTIAL_FLAG$2)) {
    var Ve = Ce && hasOwnProperty$1.call(e, "__wrapped__"), Ne = _e && hasOwnProperty$1.call(k, "__wrapped__");
    if (Ve || Ne) {
      var he = Ve ? e.value() : e, Oe = Ne ? k.value() : k;
      return le || (le = new Stack()), ae(he, Oe, oe, re, le);
    }
  }
  return $e ? (le || (le = new Stack()), equalObjects(e, k, oe, re, ae, le)) : !1;
}
function baseIsEqual(e, k, oe, re, ae) {
  return e === k ? !0 : e == null || k == null || !isObjectLike(e) && !isObjectLike(k) ? e !== e && k !== k : baseIsEqualDeep(e, k, oe, re, baseIsEqual, ae);
}
var COMPARE_PARTIAL_FLAG$1 = 1, COMPARE_UNORDERED_FLAG$1 = 2;
function baseIsMatch(e, k, oe, re) {
  var ae = oe.length, le = ae, ie = !re;
  if (e == null)
    return !le;
  for (e = Object(e); ae--; ) {
    var ue = oe[ae];
    if (ie && ue[2] ? ue[1] !== e[ue[0]] : !(ue[0] in e))
      return !1;
  }
  for (; ++ae < le; ) {
    ue = oe[ae];
    var de = ue[0], pe = e[de], Ce = ue[1];
    if (ie && ue[2]) {
      if (pe === void 0 && !(de in e))
        return !1;
    } else {
      var _e = new Stack();
      if (re)
        var $e = re(pe, Ce, de, e, k, _e);
      if (!($e === void 0 ? baseIsEqual(Ce, pe, COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1, re, _e) : $e))
        return !1;
    }
  }
  return !0;
}
function isStrictComparable(e) {
  return e === e && !isObject$2(e);
}
function getMatchData(e) {
  for (var k = keys(e), oe = k.length; oe--; ) {
    var re = k[oe], ae = e[re];
    k[oe] = [re, ae, isStrictComparable(ae)];
  }
  return k;
}
function matchesStrictComparable(e, k) {
  return function(oe) {
    return oe == null ? !1 : oe[e] === k && (k !== void 0 || e in Object(oe));
  };
}
function baseMatches(e) {
  var k = getMatchData(e);
  return k.length == 1 && k[0][2] ? matchesStrictComparable(k[0][0], k[0][1]) : function(oe) {
    return oe === e || baseIsMatch(oe, e, k);
  };
}
function baseHasIn(e, k) {
  return e != null && k in Object(e);
}
function hasPath(e, k, oe) {
  k = castPath(k, e);
  for (var re = -1, ae = k.length, le = !1; ++re < ae; ) {
    var ie = toKey(k[re]);
    if (!(le = e != null && oe(e, ie)))
      break;
    e = e[ie];
  }
  return le || ++re != ae ? le : (ae = e == null ? 0 : e.length, !!ae && isLength(ae) && isIndex(ie, ae) && (isArray$2(e) || isArguments$1(e)));
}
function hasIn(e, k) {
  return e != null && hasPath(e, k, baseHasIn);
}
var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
function baseMatchesProperty(e, k) {
  return isKey(e) && isStrictComparable(k) ? matchesStrictComparable(toKey(e), k) : function(oe) {
    var re = get(oe, e);
    return re === void 0 && re === k ? hasIn(oe, e) : baseIsEqual(k, re, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}
function baseProperty(e) {
  return function(k) {
    return k == null ? void 0 : k[e];
  };
}
function basePropertyDeep(e) {
  return function(k) {
    return baseGet(k, e);
  };
}
function property(e) {
  return isKey(e) ? baseProperty(toKey(e)) : basePropertyDeep(e);
}
function baseIteratee(e) {
  return typeof e == "function" ? e : e == null ? identity : typeof e == "object" ? isArray$2(e) ? baseMatchesProperty(e[0], e[1]) : baseMatches(e) : property(e);
}
var now = function() {
  return root$1.Date.now();
};
const now$1 = now;
var FUNC_ERROR_TEXT = "Expected a function", nativeMax = Math.max, nativeMin = Math.min;
function debounce(e, k, oe) {
  var re, ae, le, ie, ue, de, pe = 0, Ce = !1, _e = !1, $e = !0;
  if (typeof e != "function")
    throw new TypeError(FUNC_ERROR_TEXT);
  k = toNumber(k) || 0, isObject$2(oe) && (Ce = !!oe.leading, _e = "maxWait" in oe, le = _e ? nativeMax(toNumber(oe.maxWait) || 0, k) : le, $e = "trailing" in oe ? !!oe.trailing : $e);
  function Ve(Fe) {
    var Pt = re, vn = ae;
    return re = ae = void 0, pe = Fe, ie = e.apply(vn, Pt), ie;
  }
  function Ne(Fe) {
    return pe = Fe, ue = setTimeout(Ie, k), Ce ? Ve(Fe) : ie;
  }
  function he(Fe) {
    var Pt = Fe - de, vn = Fe - pe, En = k - Pt;
    return _e ? nativeMin(En, le - vn) : En;
  }
  function Oe(Fe) {
    var Pt = Fe - de, vn = Fe - pe;
    return de === void 0 || Pt >= k || Pt < 0 || _e && vn >= le;
  }
  function Ie() {
    var Fe = now$1();
    if (Oe(Fe))
      return qe(Fe);
    ue = setTimeout(Ie, he(Fe));
  }
  function qe(Fe) {
    return ue = void 0, $e && re ? Ve(Fe) : (re = ae = void 0, ie);
  }
  function xe() {
    ue !== void 0 && clearTimeout(ue), pe = 0, re = de = ae = ue = void 0;
  }
  function ze() {
    return ue === void 0 ? ie : qe(now$1());
  }
  function At() {
    var Fe = now$1(), Pt = Oe(Fe);
    if (re = arguments, ae = this, de = Fe, Pt) {
      if (ue === void 0)
        return Ne(de);
      if (_e)
        return clearTimeout(ue), ue = setTimeout(Ie, k), Ve(de);
    }
    return ue === void 0 && (ue = setTimeout(Ie, k)), ie;
  }
  return At.cancel = xe, At.flush = ze, At;
}
function isArrayLikeObject(e) {
  return isObjectLike(e) && isArrayLike(e);
}
function arrayIncludesWith(e, k, oe) {
  for (var re = -1, ae = e == null ? 0 : e.length; ++re < ae; )
    if (oe(k, e[re]))
      return !0;
  return !1;
}
function last(e) {
  var k = e == null ? 0 : e.length;
  return k ? e[k - 1] : void 0;
}
var INFINITY$1 = 1 / 0;
function flattenDeep(e) {
  var k = e == null ? 0 : e.length;
  return k ? baseFlatten(e, INFINITY$1) : [];
}
function fromPairs(e) {
  for (var k = -1, oe = e == null ? 0 : e.length, re = {}; ++k < oe; ) {
    var ae = e[k];
    re[ae[0]] = ae[1];
  }
  return re;
}
function parent(e, k) {
  return k.length < 2 ? e : baseGet(e, baseSlice(k, 0, -1));
}
function isEqual(e, k) {
  return baseIsEqual(e, k);
}
function isNil(e) {
  return e == null;
}
function baseUnset(e, k) {
  return k = castPath(k, e), e = parent(e, k), e == null || delete e[toKey(last(k))];
}
function customOmitClone(e) {
  return isPlainObject(e) ? void 0 : e;
}
var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4, omit = flatRest(function(e, k) {
  var oe = {};
  if (e == null)
    return oe;
  var re = !1;
  k = arrayMap(k, function(le) {
    return le = castPath(le, e), re || (re = le.length > 1), le;
  }), copyObject(e, getAllKeysIn(e), oe), re && (oe = baseClone(oe, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone));
  for (var ae = k.length; ae--; )
    baseUnset(oe, k[ae]);
  return oe;
});
const omit$1 = omit;
function baseSet(e, k, oe, re) {
  if (!isObject$2(e))
    return e;
  k = castPath(k, e);
  for (var ae = -1, le = k.length, ie = le - 1, ue = e; ue != null && ++ae < le; ) {
    var de = toKey(k[ae]), pe = oe;
    if (de === "__proto__" || de === "constructor" || de === "prototype")
      return e;
    if (ae != ie) {
      var Ce = ue[de];
      pe = re ? re(Ce, de, ue) : void 0, pe === void 0 && (pe = isObject$2(Ce) ? Ce : isIndex(k[ae + 1]) ? [] : {});
    }
    assignValue(ue, de, pe), ue = ue[de];
  }
  return e;
}
function set(e, k, oe) {
  return e == null ? e : baseSet(e, k, oe);
}
var INFINITY = 1 / 0, createSet = Set$2 && 1 / setToArray(new Set$2([, -0]))[1] == INFINITY ? function(e) {
  return new Set$2(e);
} : noop$1;
const createSet$1 = createSet;
var LARGE_ARRAY_SIZE = 200;
function baseUniq(e, k, oe) {
  var re = -1, ae = arrayIncludes, le = e.length, ie = !0, ue = [], de = ue;
  if (oe)
    ie = !1, ae = arrayIncludesWith;
  else if (le >= LARGE_ARRAY_SIZE) {
    var pe = k ? null : createSet$1(e);
    if (pe)
      return setToArray(pe);
    ie = !1, ae = cacheHas, de = new SetCache();
  } else
    de = k ? [] : ue;
  e:
    for (; ++re < le; ) {
      var Ce = e[re], _e = k ? k(Ce) : Ce;
      if (Ce = oe || Ce !== 0 ? Ce : 0, ie && _e === _e) {
        for (var $e = de.length; $e--; )
          if (de[$e] === _e)
            continue e;
        k && de.push(_e), ue.push(Ce);
      } else
        ae(de, _e, oe) || (de !== ue && de.push(_e), ue.push(Ce));
    }
  return ue;
}
var union = baseRest(function(e) {
  return baseUniq(baseFlatten(e, 1, isArrayLikeObject, !0));
});
const union$1 = union;
function uniqBy(e, k) {
  return e && e.length ? baseUniq(e, baseIteratee(k)) : [];
}
const isLeaf = (e) => !e.getAttribute("aria-owns"), getSibling = (e, k, oe) => {
  const { parentNode: re } = e;
  if (!re)
    return null;
  const ae = re.querySelectorAll(oe), le = Array.prototype.indexOf.call(ae, e);
  return ae[le + k] || null;
}, focusNode = (e) => {
  !e || (e.focus(), !isLeaf(e) && e.click());
}, composeEventHandlers = (e, k, { checkForDefaultPrevented: oe = !0 } = {}) => (ae) => {
  const le = e == null ? void 0 : e(ae);
  if (oe === !1 || !le)
    return k == null ? void 0 : k(ae);
};
var _a$1;
const isClient$1 = typeof window < "u", isBoolean = (e) => typeof e == "boolean", isNumber = (e) => typeof e == "number", isString$1 = (e) => typeof e == "string", noop = () => {
};
isClient$1 && ((_a$1 = window == null ? void 0 : window.navigator) == null ? void 0 : _a$1.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function createFilterWrapper$1(e, k) {
  function oe(...re) {
    e(() => k.apply(this, re), { fn: k, thisArg: this, args: re });
  }
  return oe;
}
function debounceFilter$1(e, k = {}) {
  let oe, re;
  return (le) => {
    const ie = unref(e), ue = unref(k.maxWait);
    if (oe && clearTimeout(oe), ie <= 0 || ue !== void 0 && ue <= 0)
      return re && (clearTimeout(re), re = null), le();
    ue && !re && (re = setTimeout(() => {
      oe && clearTimeout(oe), re = null, le();
    }, ue)), oe = setTimeout(() => {
      re && clearTimeout(re), re = null, le();
    }, ie);
  };
}
function tryOnScopeDispose(e) {
  return getCurrentScope() ? (onScopeDispose(e), !0) : !1;
}
function useDebounceFn$1(e, k = 200, oe = {}) {
  return createFilterWrapper$1(debounceFilter$1(k, oe), e);
}
function refDebounced(e, k = 200, oe = {}) {
  if (k <= 0)
    return e;
  const re = ref(e.value), ae = useDebounceFn$1(() => {
    re.value = e.value;
  }, k, oe);
  return watch(e, () => ae()), re;
}
function unrefElement(e) {
  var k;
  const oe = unref(e);
  return (k = oe == null ? void 0 : oe.$el) != null ? k : oe;
}
const defaultWindow = isClient$1 ? window : void 0;
isClient$1 && window.document;
isClient$1 && window.navigator;
isClient$1 && window.location;
function useEventListener(...e) {
  let k, oe, re, ae;
  if (isString$1(e[0]) ? ([oe, re, ae] = e, k = defaultWindow) : [k, oe, re, ae] = e, !k)
    return noop;
  let le = noop;
  const ie = watch(() => unrefElement(k), (de) => {
    le(), de && (de.addEventListener(oe, re, ae), le = () => {
      de.removeEventListener(oe, re, ae), le = noop;
    });
  }, { immediate: !0, flush: "post" }), ue = () => {
    ie(), le();
  };
  return tryOnScopeDispose(ue), ue;
}
function onClickOutside(e, k, oe = {}) {
  const { window: re = defaultWindow, ignore: ae, capture: le = !0, detectIframe: ie = !1 } = oe;
  if (!re)
    return;
  const ue = ref(!0);
  let de;
  const pe = ($e) => {
    re.clearTimeout(de);
    const Ve = unrefElement(e), Ne = $e.composedPath();
    !Ve || Ve === $e.target || Ne.includes(Ve) || !ue.value || ae && ae.length > 0 && ae.some((he) => {
      const Oe = unrefElement(he);
      return Oe && ($e.target === Oe || Ne.includes(Oe));
    }) || k($e);
  }, Ce = [
    useEventListener(re, "click", pe, { passive: !0, capture: le }),
    useEventListener(re, "pointerdown", ($e) => {
      const Ve = unrefElement(e);
      ue.value = !!Ve && !$e.composedPath().includes(Ve);
    }, { passive: !0 }),
    useEventListener(re, "pointerup", ($e) => {
      if ($e.button === 0) {
        const Ve = $e.composedPath();
        $e.composedPath = () => Ve, de = re.setTimeout(() => pe($e), 50);
      }
    }, { passive: !0 }),
    ie && useEventListener(re, "blur", ($e) => {
      var Ve;
      const Ne = unrefElement(e);
      ((Ve = document.activeElement) == null ? void 0 : Ve.tagName) === "IFRAME" && !(Ne != null && Ne.contains(document.activeElement)) && k($e);
    })
  ].filter(Boolean);
  return () => Ce.forEach(($e) => $e());
}
const _global = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, globalKey = "__vueuse_ssr_handlers__";
_global[globalKey] = _global[globalKey] || {};
_global[globalKey];
var __getOwnPropSymbols$e = Object.getOwnPropertySymbols, __hasOwnProp$e = Object.prototype.hasOwnProperty, __propIsEnum$e = Object.prototype.propertyIsEnumerable, __objRest$2 = (e, k) => {
  var oe = {};
  for (var re in e)
    __hasOwnProp$e.call(e, re) && k.indexOf(re) < 0 && (oe[re] = e[re]);
  if (e != null && __getOwnPropSymbols$e)
    for (var re of __getOwnPropSymbols$e(e))
      k.indexOf(re) < 0 && __propIsEnum$e.call(e, re) && (oe[re] = e[re]);
  return oe;
};
function useResizeObserver(e, k, oe = {}) {
  const re = oe, { window: ae = defaultWindow } = re, le = __objRest$2(re, ["window"]);
  let ie;
  const ue = ae && "ResizeObserver" in ae, de = () => {
    ie && (ie.disconnect(), ie = void 0);
  }, pe = watch(() => unrefElement(e), (_e) => {
    de(), ue && ae && _e && (ie = new ResizeObserver(k), ie.observe(_e, le));
  }, { immediate: !0, flush: "post" }), Ce = () => {
    de(), pe();
  };
  return tryOnScopeDispose(Ce), {
    isSupported: ue,
    stop: Ce
  };
}
var SwipeDirection;
(function(e) {
  e.UP = "UP", e.RIGHT = "RIGHT", e.DOWN = "DOWN", e.LEFT = "LEFT", e.NONE = "NONE";
})(SwipeDirection || (SwipeDirection = {}));
process.env.NODE_ENV !== "production" && Object.freeze({});
process.env.NODE_ENV !== "production" && Object.freeze([]);
const NOOP = () => {
}, hasOwnProperty = Object.prototype.hasOwnProperty, hasOwn = (e, k) => hasOwnProperty.call(e, k), isArray = Array.isArray, isDate = (e) => toTypeString(e) === "[object Date]", isFunction = (e) => typeof e == "function", isString = (e) => typeof e == "string", isObject$1 = (e) => e !== null && typeof e == "object", isPromise = (e) => isObject$1(e) && isFunction(e.then) && isFunction(e.catch), objectToString = Object.prototype.toString, toTypeString = (e) => objectToString.call(e), toRawType = (e) => toTypeString(e).slice(8, -1), cacheStringFunction = (e) => {
  const k = /* @__PURE__ */ Object.create(null);
  return (oe) => k[oe] || (k[oe] = e(oe));
}, camelizeRE = /-(\w)/g, camelize = cacheStringFunction((e) => e.replace(camelizeRE, (k, oe) => oe ? oe.toUpperCase() : "")), capitalize = cacheStringFunction((e) => e.charAt(0).toUpperCase() + e.slice(1)), isUndefined = (e) => e === void 0, isEmpty = (e) => !e && e !== 0 || isArray(e) && e.length === 0 || isObject$1(e) && !Object.keys(e).length, isElement = (e) => typeof Element > "u" ? !1 : e instanceof Element, escapeStringRegexp = (e = "") => e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d"), getProp = (e, k, oe) => ({
  get value() {
    return get(e, k, oe);
  },
  set value(re) {
    set(e, k, re);
  }
});
class ElementPlusError extends Error {
  constructor(k) {
    super(k), this.name = "ElementPlusError";
  }
}
function throwError(e, k) {
  throw new ElementPlusError(`[${e}] ${k}`);
}
function debugWarn(e, k) {
  if (process.env.NODE_ENV !== "production") {
    const oe = isString(e) ? new ElementPlusError(`[${e}] ${k}`) : e;
    console.warn(oe);
  }
}
const SCOPE$1 = "utils/dom/style", classNameToArray = (e = "") => e.split(" ").filter((k) => !!k.trim()), hasClass$1 = (e, k) => {
  if (!e || !k)
    return !1;
  if (k.includes(" "))
    throw new Error("className should not contain space.");
  return e.classList.contains(k);
}, addClass$1 = (e, k) => {
  !e || !k.trim() || e.classList.add(...classNameToArray(k));
}, removeClass$1 = (e, k) => {
  !e || !k.trim() || e.classList.remove(...classNameToArray(k));
}, getStyle = (e, k) => {
  var oe;
  if (!isClient$1 || !e || !k)
    return "";
  let re = camelize(k);
  re === "float" && (re = "cssFloat");
  try {
    const ae = e.style[re];
    if (ae)
      return ae;
    const le = (oe = document.defaultView) == null ? void 0 : oe.getComputedStyle(e, "");
    return le ? le[re] : "";
  } catch {
    return e.style[re];
  }
};
function addUnit(e, k = "px") {
  if (!e)
    return "";
  if (isString(e))
    return e;
  if (isNumber(e))
    return `${e}${k}`;
  debugWarn(SCOPE$1, "binding value must be a string or number");
}
function scrollIntoView(e, k) {
  if (!isClient$1)
    return;
  if (!k) {
    e.scrollTop = 0;
    return;
  }
  const oe = [];
  let re = k.offsetParent;
  for (; re !== null && e !== re && e.contains(re); )
    oe.push(re), re = re.offsetParent;
  const ae = k.offsetTop + oe.reduce((de, pe) => de + pe.offsetTop, 0), le = ae + k.offsetHeight, ie = e.scrollTop, ue = ie + e.clientHeight;
  ae < ie ? e.scrollTop = ae : le > ue && (e.scrollTop = le - e.clientHeight);
}
/*! Element Plus Icons Vue v2.0.6 */
var export_helper_default = (e, k) => {
  let oe = e.__vccOpts || e;
  for (let [re, ae] of k)
    oe[re] = ae;
  return oe;
}, _sfc_main6 = {
  name: "ArrowDown"
}, _hoisted_16 = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, _hoisted_26 = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
}, null, -1), _hoisted_36 = [
  _hoisted_26
];
function _sfc_render6(e, k, oe, re, ae, le) {
  return openBlock(), createElementBlock("svg", _hoisted_16, _hoisted_36);
}
var arrow_down_default = /* @__PURE__ */ export_helper_default(_sfc_main6, [["render", _sfc_render6], ["__file", "arrow-down.vue"]]), _sfc_main8 = {
  name: "ArrowLeft"
}, _hoisted_18 = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, _hoisted_28 = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"
}, null, -1), _hoisted_38 = [
  _hoisted_28
];
function _sfc_render8(e, k, oe, re, ae, le) {
  return openBlock(), createElementBlock("svg", _hoisted_18, _hoisted_38);
}
var arrow_left_default = /* @__PURE__ */ export_helper_default(_sfc_main8, [["render", _sfc_render8], ["__file", "arrow-left.vue"]]), _sfc_main10 = {
  name: "ArrowRight"
}, _hoisted_110 = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, _hoisted_210 = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
}, null, -1), _hoisted_310 = [
  _hoisted_210
];
function _sfc_render10(e, k, oe, re, ae, le) {
  return openBlock(), createElementBlock("svg", _hoisted_110, _hoisted_310);
}
var arrow_right_default = /* @__PURE__ */ export_helper_default(_sfc_main10, [["render", _sfc_render10], ["__file", "arrow-right.vue"]]), _sfc_main12 = {
  name: "ArrowUp"
}, _hoisted_112 = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, _hoisted_212 = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "m488.832 344.32-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0z"
}, null, -1), _hoisted_312 = [
  _hoisted_212
];
function _sfc_render12(e, k, oe, re, ae, le) {
  return openBlock(), createElementBlock("svg", _hoisted_112, _hoisted_312);
}
var arrow_up_default = /* @__PURE__ */ export_helper_default(_sfc_main12, [["render", _sfc_render12], ["__file", "arrow-up.vue"]]), _sfc_main29 = {
  name: "Calendar"
}, _hoisted_129 = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, _hoisted_229 = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M128 384v512h768V192H768v32a32 32 0 1 1-64 0v-32H320v32a32 32 0 0 1-64 0v-32H128v128h768v64H128zm192-256h384V96a32 32 0 1 1 64 0v32h160a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h160V96a32 32 0 0 1 64 0v32zm-32 384h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64z"
}, null, -1), _hoisted_328 = [
  _hoisted_229
];
function _sfc_render29(e, k, oe, re, ae, le) {
  return openBlock(), createElementBlock("svg", _hoisted_129, _hoisted_328);
}
var calendar_default = /* @__PURE__ */ export_helper_default(_sfc_main29, [["render", _sfc_render29], ["__file", "calendar.vue"]]), _sfc_main43 = {
  name: "Check"
}, _hoisted_143 = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, _hoisted_243 = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"
}, null, -1), _hoisted_342 = [
  _hoisted_243
];
function _sfc_render43(e, k, oe, re, ae, le) {
  return openBlock(), createElementBlock("svg", _hoisted_143, _hoisted_342);
}
var check_default = /* @__PURE__ */ export_helper_default(_sfc_main43, [["render", _sfc_render43], ["__file", "check.vue"]]), _sfc_main48 = {
  name: "CircleCheck"
}, _hoisted_148 = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, _hoisted_248 = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
}, null, -1), _hoisted_347 = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M745.344 361.344a32 32 0 0 1 45.312 45.312l-288 288a32 32 0 0 1-45.312 0l-160-160a32 32 0 1 1 45.312-45.312L480 626.752l265.344-265.408z"
}, null, -1), _hoisted_414 = [
  _hoisted_248,
  _hoisted_347
];
function _sfc_render48(e, k, oe, re, ae, le) {
  return openBlock(), createElementBlock("svg", _hoisted_148, _hoisted_414);
}
var circle_check_default = /* @__PURE__ */ export_helper_default(_sfc_main48, [["render", _sfc_render48], ["__file", "circle-check.vue"]]), _sfc_main50 = {
  name: "CircleClose"
}, _hoisted_150 = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, _hoisted_250 = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248L466.752 512z"
}, null, -1), _hoisted_349 = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
}, null, -1), _hoisted_415 = [
  _hoisted_250,
  _hoisted_349
];
function _sfc_render50(e, k, oe, re, ae, le) {
  return openBlock(), createElementBlock("svg", _hoisted_150, _hoisted_415);
}
var circle_close_default = /* @__PURE__ */ export_helper_default(_sfc_main50, [["render", _sfc_render50], ["__file", "circle-close.vue"]]), _sfc_main53 = {
  name: "Clock"
}, _hoisted_153 = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, _hoisted_253 = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
}, null, -1), _hoisted_352 = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M480 256a32 32 0 0 1 32 32v256a32 32 0 0 1-64 0V288a32 32 0 0 1 32-32z"
}, null, -1), _hoisted_417 = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M480 512h256q32 0 32 32t-32 32H480q-32 0-32-32t32-32z"
}, null, -1), _hoisted_55 = [
  _hoisted_253,
  _hoisted_352,
  _hoisted_417
];
function _sfc_render53(e, k, oe, re, ae, le) {
  return openBlock(), createElementBlock("svg", _hoisted_153, _hoisted_55);
}
var clock_default = /* @__PURE__ */ export_helper_default(_sfc_main53, [["render", _sfc_render53], ["__file", "clock.vue"]]), _sfc_main55 = {
  name: "Close"
}, _hoisted_155 = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, _hoisted_255 = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
}, null, -1), _hoisted_354 = [
  _hoisted_255
];
function _sfc_render55(e, k, oe, re, ae, le) {
  return openBlock(), createElementBlock("svg", _hoisted_155, _hoisted_354);
}
var close_default = /* @__PURE__ */ export_helper_default(_sfc_main55, [["render", _sfc_render55], ["__file", "close.vue"]]), _sfc_main71 = {
  name: "DArrowLeft"
}, _hoisted_171 = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, _hoisted_271 = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M529.408 149.376a29.12 29.12 0 0 1 41.728 0 30.592 30.592 0 0 1 0 42.688L259.264 511.936l311.872 319.936a30.592 30.592 0 0 1-.512 43.264 29.12 29.12 0 0 1-41.216-.512L197.76 534.272a32 32 0 0 1 0-44.672l331.648-340.224zm256 0a29.12 29.12 0 0 1 41.728 0 30.592 30.592 0 0 1 0 42.688L515.264 511.936l311.872 319.936a30.592 30.592 0 0 1-.512 43.264 29.12 29.12 0 0 1-41.216-.512L453.76 534.272a32 32 0 0 1 0-44.672l331.648-340.224z"
}, null, -1), _hoisted_370 = [
  _hoisted_271
];
function _sfc_render71(e, k, oe, re, ae, le) {
  return openBlock(), createElementBlock("svg", _hoisted_171, _hoisted_370);
}
var d_arrow_left_default = /* @__PURE__ */ export_helper_default(_sfc_main71, [["render", _sfc_render71], ["__file", "d-arrow-left.vue"]]), _sfc_main72 = {
  name: "DArrowRight"
}, _hoisted_172 = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, _hoisted_272 = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M452.864 149.312a29.12 29.12 0 0 1 41.728.064L826.24 489.664a32 32 0 0 1 0 44.672L494.592 874.624a29.12 29.12 0 0 1-41.728 0 30.592 30.592 0 0 1 0-42.752L764.736 512 452.864 192a30.592 30.592 0 0 1 0-42.688zm-256 0a29.12 29.12 0 0 1 41.728.064L570.24 489.664a32 32 0 0 1 0 44.672L238.592 874.624a29.12 29.12 0 0 1-41.728 0 30.592 30.592 0 0 1 0-42.752L508.736 512 196.864 192a30.592 30.592 0 0 1 0-42.688z"
}, null, -1), _hoisted_371 = [
  _hoisted_272
];
function _sfc_render72(e, k, oe, re, ae, le) {
  return openBlock(), createElementBlock("svg", _hoisted_172, _hoisted_371);
}
var d_arrow_right_default = /* @__PURE__ */ export_helper_default(_sfc_main72, [["render", _sfc_render72], ["__file", "d-arrow-right.vue"]]), _sfc_main130 = {
  name: "Hide"
}, _hoisted_1130 = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, _hoisted_2130 = /* @__PURE__ */ createElementVNode("path", {
  d: "M876.8 156.8c0-9.6-3.2-16-9.6-22.4-6.4-6.4-12.8-9.6-22.4-9.6-9.6 0-16 3.2-22.4 9.6L736 220.8c-64-32-137.6-51.2-224-60.8-160 16-288 73.6-377.6 176C44.8 438.4 0 496 0 512s48 73.6 134.4 176c22.4 25.6 44.8 48 73.6 67.2l-86.4 89.6c-6.4 6.4-9.6 12.8-9.6 22.4 0 9.6 3.2 16 9.6 22.4 6.4 6.4 12.8 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6l704-710.4c3.2-6.4 6.4-12.8 6.4-22.4Zm-646.4 528c-76.8-70.4-128-128-153.6-172.8 28.8-48 80-105.6 153.6-172.8C304 272 400 230.4 512 224c64 3.2 124.8 19.2 176 44.8l-54.4 54.4C598.4 300.8 560 288 512 288c-64 0-115.2 22.4-160 64s-64 96-64 160c0 48 12.8 89.6 35.2 124.8L256 707.2c-9.6-6.4-19.2-16-25.6-22.4Zm140.8-96c-12.8-22.4-19.2-48-19.2-76.8 0-44.8 16-83.2 48-112 32-28.8 67.2-48 112-48 28.8 0 54.4 6.4 73.6 19.2L371.2 588.8ZM889.599 336c-12.8-16-28.8-28.8-41.6-41.6l-48 48c73.6 67.2 124.8 124.8 150.4 169.6-28.8 48-80 105.6-153.6 172.8-73.6 67.2-172.8 108.8-284.8 115.2-51.2-3.2-99.2-12.8-140.8-28.8l-48 48c57.6 22.4 118.4 38.4 188.8 44.8 160-16 288-73.6 377.6-176C979.199 585.6 1024 528 1024 512s-48.001-73.6-134.401-176Z",
  fill: "currentColor"
}, null, -1), _hoisted_3129 = /* @__PURE__ */ createElementVNode("path", {
  d: "M511.998 672c-12.8 0-25.6-3.2-38.4-6.4l-51.2 51.2c28.8 12.8 57.6 19.2 89.6 19.2 64 0 115.2-22.4 160-64 41.6-41.6 64-96 64-160 0-32-6.4-64-19.2-89.6l-51.2 51.2c3.2 12.8 6.4 25.6 6.4 38.4 0 44.8-16 83.2-48 112-32 28.8-67.2 48-112 48Z",
  fill: "currentColor"
}, null, -1), _hoisted_436 = [
  _hoisted_2130,
  _hoisted_3129
];
function _sfc_render130(e, k, oe, re, ae, le) {
  return openBlock(), createElementBlock("svg", _hoisted_1130, _hoisted_436);
}
var hide_default = /* @__PURE__ */ export_helper_default(_sfc_main130, [["render", _sfc_render130], ["__file", "hide.vue"]]), _sfc_main147 = {
  name: "Loading"
}, _hoisted_1147 = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, _hoisted_2147 = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
}, null, -1), _hoisted_3146 = [
  _hoisted_2147
];
function _sfc_render147(e, k, oe, re, ae, le) {
  return openBlock(), createElementBlock("svg", _hoisted_1147, _hoisted_3146);
}
var loading_default = /* @__PURE__ */ export_helper_default(_sfc_main147, [["render", _sfc_render147], ["__file", "loading.vue"]]), _sfc_main165 = {
  name: "Minus"
}, _hoisted_1165 = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, _hoisted_2165 = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M128 544h768a32 32 0 1 0 0-64H128a32 32 0 0 0 0 64z"
}, null, -1), _hoisted_3164 = [
  _hoisted_2165
];
function _sfc_render165(e, k, oe, re, ae, le) {
  return openBlock(), createElementBlock("svg", _hoisted_1165, _hoisted_3164);
}
var minus_default = /* @__PURE__ */ export_helper_default(_sfc_main165, [["render", _sfc_render165], ["__file", "minus.vue"]]), _sfc_main197 = {
  name: "Plus"
}, _hoisted_1197 = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, _hoisted_2197 = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"
}, null, -1), _hoisted_3196 = [
  _hoisted_2197
];
function _sfc_render197(e, k, oe, re, ae, le) {
  return openBlock(), createElementBlock("svg", _hoisted_1197, _hoisted_3196);
}
var plus_default = /* @__PURE__ */ export_helper_default(_sfc_main197, [["render", _sfc_render197], ["__file", "plus.vue"]]), _sfc_main240 = {
  name: "StarFilled"
}, _hoisted_1240 = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, _hoisted_2240 = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M283.84 867.84 512 747.776l228.16 119.936a6.4 6.4 0 0 0 9.28-6.72l-43.52-254.08 184.512-179.904a6.4 6.4 0 0 0-3.52-10.88l-255.104-37.12L517.76 147.904a6.4 6.4 0 0 0-11.52 0L392.192 379.072l-255.104 37.12a6.4 6.4 0 0 0-3.52 10.88L318.08 606.976l-43.584 254.08a6.4 6.4 0 0 0 9.28 6.72z"
}, null, -1), _hoisted_3239 = [
  _hoisted_2240
];
function _sfc_render240(e, k, oe, re, ae, le) {
  return openBlock(), createElementBlock("svg", _hoisted_1240, _hoisted_3239);
}
var star_filled_default = /* @__PURE__ */ export_helper_default(_sfc_main240, [["render", _sfc_render240], ["__file", "star-filled.vue"]]), _sfc_main241 = {
  name: "Star"
}, _hoisted_1241 = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, _hoisted_2241 = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "m512 747.84 228.16 119.936a6.4 6.4 0 0 0 9.28-6.72l-43.52-254.08 184.512-179.904a6.4 6.4 0 0 0-3.52-10.88l-255.104-37.12L517.76 147.904a6.4 6.4 0 0 0-11.52 0L392.192 379.072l-255.104 37.12a6.4 6.4 0 0 0-3.52 10.88L318.08 606.976l-43.584 254.08a6.4 6.4 0 0 0 9.28 6.72L512 747.84zM313.6 924.48a70.4 70.4 0 0 1-102.144-74.24l37.888-220.928L88.96 472.96A70.4 70.4 0 0 1 128 352.896l221.76-32.256 99.2-200.96a70.4 70.4 0 0 1 126.208 0l99.2 200.96 221.824 32.256a70.4 70.4 0 0 1 39.04 120.064L774.72 629.376l37.888 220.928a70.4 70.4 0 0 1-102.144 74.24L512 820.096l-198.4 104.32z"
}, null, -1), _hoisted_3240 = [
  _hoisted_2241
];
function _sfc_render241(e, k, oe, re, ae, le) {
  return openBlock(), createElementBlock("svg", _hoisted_1241, _hoisted_3240);
}
var star_default = /* @__PURE__ */ export_helper_default(_sfc_main241, [["render", _sfc_render241], ["__file", "star.vue"]]), _sfc_main274 = {
  name: "View"
}, _hoisted_1274 = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, _hoisted_2274 = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"
}, null, -1), _hoisted_3273 = [
  _hoisted_2274
];
function _sfc_render274(e, k, oe, re, ae, le) {
  return openBlock(), createElementBlock("svg", _hoisted_1274, _hoisted_3273);
}
var view_default = /* @__PURE__ */ export_helper_default(_sfc_main274, [["render", _sfc_render274], ["__file", "view.vue"]]), _sfc_main278 = {
  name: "Warning"
}, _hoisted_1278 = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, _hoisted_2278 = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768zm48-176a48 48 0 1 1-96 0 48 48 0 0 1 96 0zm-48-464a32 32 0 0 1 32 32v288a32 32 0 0 1-64 0V288a32 32 0 0 1 32-32z"
}, null, -1), _hoisted_3277 = [
  _hoisted_2278
];
function _sfc_render278(e, k, oe, re, ae, le) {
  return openBlock(), createElementBlock("svg", _hoisted_1278, _hoisted_3277);
}
var warning_default = /* @__PURE__ */ export_helper_default(_sfc_main278, [["render", _sfc_render278], ["__file", "warning.vue"]]);
const epPropKey = "__epPropKey", definePropType = (e) => e, isEpProp = (e) => isObject$1(e) && !!e[epPropKey], buildProp = (e, k) => {
  if (!isObject$1(e) || isEpProp(e))
    return e;
  const { values: oe, required: re, default: ae, type: le, validator: ie } = e, de = {
    type: le,
    required: !!re,
    validator: oe || ie ? (pe) => {
      let Ce = !1, _e = [];
      if (oe && (_e = Array.from(oe), hasOwn(e, "default") && _e.push(ae), Ce || (Ce = _e.includes(pe))), ie && (Ce || (Ce = ie(pe))), !Ce && _e.length > 0) {
        const $e = [...new Set(_e)].map((Ve) => JSON.stringify(Ve)).join(", ");
        warn(`Invalid prop: validation failed${k ? ` for prop "${k}"` : ""}. Expected one of [${$e}], got value ${JSON.stringify(pe)}.`);
      }
      return Ce;
    } : void 0,
    [epPropKey]: !0
  };
  return hasOwn(e, "default") && (de.default = ae), de;
}, buildProps = (e) => fromPairs(Object.entries(e).map(([k, oe]) => [
  k,
  buildProp(oe, k)
])), iconPropType = definePropType([
  String,
  Object,
  Function
]), ValidateComponentsMap = {
  validating: loading_default,
  success: circle_check_default,
  error: circle_close_default
}, withInstall = (e, k) => {
  if (e.install = (oe) => {
    for (const re of [e, ...Object.values(k != null ? k : {})])
      oe.component(re.name, re);
  }, k)
    for (const [oe, re] of Object.entries(k))
      e[oe] = re;
  return e;
}, withNoopInstall = (e) => (e.install = NOOP, e), EVENT_CODE = {
  tab: "Tab",
  enter: "Enter",
  space: "Space",
  left: "ArrowLeft",
  up: "ArrowUp",
  right: "ArrowRight",
  down: "ArrowDown",
  esc: "Escape",
  delete: "Delete",
  backspace: "Backspace",
  numpadEnter: "NumpadEnter",
  pageUp: "PageUp",
  pageDown: "PageDown",
  home: "Home",
  end: "End"
}, datePickTypes = [
  "year",
  "month",
  "date",
  "dates",
  "week",
  "datetime",
  "datetimerange",
  "daterange",
  "monthrange"
], UPDATE_MODEL_EVENT = "update:modelValue", CHANGE_EVENT = "change", INPUT_EVENT = "input", componentSizes = ["", "default", "small", "large"], componentSizeMap = {
  large: 40,
  default: 32,
  small: 24
}, getComponentSize = (e) => componentSizeMap[e || "default"], isValidComponentSize = (e) => ["", ...componentSizes].includes(e), unique = (e) => [...new Set(e)], castArray = (e) => !e && e !== 0 ? [] : Array.isArray(e) ? e : [e], isKorean = (e) => /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi.test(e), generateId = () => Math.floor(Math.random() * 1e4), mutable = (e) => e, DEFAULT_EXCLUDE_KEYS$1 = ["class", "style"], LISTENER_PREFIX$1 = /^on[A-Z]/, useAttrs$1 = (e = {}) => {
  const { excludeListeners: k = !1, excludeKeys: oe } = e, re = computed(() => ((oe == null ? void 0 : oe.value) || []).concat(DEFAULT_EXCLUDE_KEYS$1)), ae = getCurrentInstance();
  return ae ? computed(() => {
    var le;
    return fromPairs(Object.entries((le = ae.proxy) == null ? void 0 : le.$attrs).filter(([ie]) => !re.value.includes(ie) && !(k && LISTENER_PREFIX$1.test(ie))));
  }) : (debugWarn("use-attrs", "getCurrentInstance() returned null. useAttrs() must be called at the top of a setup function"), computed(() => ({})));
}, buttonGroupContextKey = Symbol("buttonGroupContextKey"), configProviderContextKey = Symbol(), formContextKey = Symbol("formContextKey"), formItemContextKey = Symbol("formItemContextKey"), radioGroupKey = Symbol("radioGroupKey"), rowContextKey = Symbol("rowContextKey"), scrollbarContextKey = Symbol("scrollbarContextKey"), sliderContextKey = Symbol("sliderContextKey"), POPPER_INJECTION_KEY = Symbol("popper"), POPPER_CONTENT_INJECTION_KEY = Symbol("popperContent"), ROOT_PICKER_INJECTION_KEY = Symbol(), useProp = (e) => {
  const k = getCurrentInstance();
  return computed(() => {
    var oe, re;
    return (re = ((oe = k.proxy) == null ? void 0 : oe.$props)[e]) != null ? re : void 0;
  });
}, globalConfig = ref();
function useGlobalConfig(e, k = void 0) {
  const oe = getCurrentInstance() ? inject(configProviderContextKey, globalConfig) : globalConfig;
  return e ? computed(() => {
    var re, ae;
    return (ae = (re = oe.value) == null ? void 0 : re[e]) != null ? ae : k;
  }) : oe;
}
const useSizeProp = buildProp({
  type: String,
  values: componentSizes,
  required: !1
}), useSize = (e, k = {}) => {
  const oe = ref(void 0), re = k.prop ? oe : useProp("size"), ae = k.global ? oe : useGlobalConfig("size"), le = k.form ? { size: void 0 } : inject(formContextKey, void 0), ie = k.formItem ? { size: void 0 } : inject(formItemContextKey, void 0);
  return computed(() => re.value || unref(e) || (ie == null ? void 0 : ie.size) || (le == null ? void 0 : le.size) || ae.value || "");
}, useDisabled$1 = (e) => {
  const k = useProp("disabled"), oe = inject(formContextKey, void 0);
  return computed(() => k.value || unref(e) || (oe == null ? void 0 : oe.disabled) || !1);
}, useDeprecated = ({ from: e, replacement: k, scope: oe, version: re, ref: ae, type: le = "API" }, ie) => {
  watch(() => unref(ie), (ue) => {
    ue && debugWarn(oe, `[${le}] ${e} is about to be deprecated in version ${re}, please use ${k} instead.
For more detail, please visit: ${ae}
`);
  }, {
    immediate: !0
  });
}, useFocus = (e) => ({
  focus: () => {
    var k, oe;
    (oe = (k = e.value) == null ? void 0 : k.focus) == null || oe.call(k);
  }
}), defaultIdInjection = {
  prefix: Math.floor(Math.random() * 1e4),
  current: 0
}, ID_INJECTION_KEY = Symbol("elIdInjection"), useId = (e) => {
  const k = inject(ID_INJECTION_KEY, defaultIdInjection);
  return !isClient$1 && k === defaultIdInjection && debugWarn("IdInjection", `Looks like you are using server rendering, you must provide a id provider to ensure the hydration process to be succeed
usage: app.provide(ID_INJECTION_KEY, {
  prefix: number,
  current: number,
})`), computed(() => unref(e) || `el-id-${k.prefix}-${k.current++}`);
}, useFormItem = () => {
  const e = inject(formContextKey, void 0), k = inject(formItemContextKey, void 0);
  return {
    form: e,
    formItem: k
  };
}, useFormItemInputId = (e, {
  formItemContext: k,
  disableIdGeneration: oe,
  disableIdManagement: re
}) => {
  oe || (oe = ref(!1)), re || (re = ref(!1));
  const ae = ref();
  let le;
  const ie = computed(() => {
    var ue;
    return !!(!e.label && k && k.inputIds && ((ue = k.inputIds) == null ? void 0 : ue.length) <= 1);
  });
  return onMounted(() => {
    le = watch([toRef(e, "id"), oe], ([ue, de]) => {
      const pe = ue != null ? ue : de ? void 0 : useId().value;
      pe !== ae.value && (k != null && k.removeInputId && (ae.value && k.removeInputId(ae.value), !(re != null && re.value) && !de && pe && k.addInputId(pe)), ae.value = pe);
    }, { immediate: !0 });
  }), onUnmounted(() => {
    le && le(), k != null && k.removeInputId && ae.value && k.removeInputId(ae.value);
  }), {
    isLabeledByFormItem: ie,
    inputId: ae
  };
};
var English = {
  name: "en",
  el: {
    colorpicker: {
      confirm: "OK",
      clear: "Clear",
      defaultLabel: "color picker",
      description: "current color is {color}. press enter to select a new color."
    },
    datepicker: {
      now: "Now",
      today: "Today",
      cancel: "Cancel",
      clear: "Clear",
      confirm: "OK",
      dateTablePrompt: "Use the arrow keys and enter to select the day of the month",
      monthTablePrompt: "Use the arrow keys and enter to select the month",
      yearTablePrompt: "Use the arrow keys and enter to select the year",
      selectedDate: "Selected date",
      selectDate: "Select date",
      selectTime: "Select time",
      startDate: "Start Date",
      startTime: "Start Time",
      endDate: "End Date",
      endTime: "End Time",
      prevYear: "Previous Year",
      nextYear: "Next Year",
      prevMonth: "Previous Month",
      nextMonth: "Next Month",
      year: "",
      month1: "January",
      month2: "February",
      month3: "March",
      month4: "April",
      month5: "May",
      month6: "June",
      month7: "July",
      month8: "August",
      month9: "September",
      month10: "October",
      month11: "November",
      month12: "December",
      week: "week",
      weeks: {
        sun: "Sun",
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
        sat: "Sat"
      },
      weeksFull: {
        sun: "Sunday",
        mon: "Monday",
        tue: "Tuesday",
        wed: "Wednesday",
        thu: "Thursday",
        fri: "Friday",
        sat: "Saturday"
      },
      months: {
        jan: "Jan",
        feb: "Feb",
        mar: "Mar",
        apr: "Apr",
        may: "May",
        jun: "Jun",
        jul: "Jul",
        aug: "Aug",
        sep: "Sep",
        oct: "Oct",
        nov: "Nov",
        dec: "Dec"
      }
    },
    inputNumber: {
      decrease: "decrease number",
      increase: "increase number"
    },
    select: {
      loading: "Loading",
      noMatch: "No matching data",
      noData: "No data",
      placeholder: "Select"
    },
    dropdown: {
      toggleDropdown: "Toggle Dropdown"
    },
    cascader: {
      noMatch: "No matching data",
      loading: "Loading",
      placeholder: "Select",
      noData: "No data"
    },
    pagination: {
      goto: "Go to",
      pagesize: "/page",
      total: "Total {total}",
      pageClassifier: "",
      deprecationWarning: "Deprecated usages detected, please refer to the el-pagination documentation for more details"
    },
    dialog: {
      close: "Close this dialog"
    },
    drawer: {
      close: "Close this dialog"
    },
    messagebox: {
      title: "Message",
      confirm: "OK",
      cancel: "Cancel",
      error: "Illegal input",
      close: "Close this dialog"
    },
    upload: {
      deleteTip: "press delete to remove",
      delete: "Delete",
      preview: "Preview",
      continue: "Continue"
    },
    slider: {
      defaultLabel: "slider between {min} and {max}",
      defaultRangeStartLabel: "pick start value",
      defaultRangeEndLabel: "pick end value"
    },
    table: {
      emptyText: "No Data",
      confirmFilter: "Confirm",
      resetFilter: "Reset",
      clearFilter: "All",
      sumText: "Sum"
    },
    tree: {
      emptyText: "No Data"
    },
    transfer: {
      noMatch: "No matching data",
      noData: "No data",
      titles: ["List 1", "List 2"],
      filterPlaceholder: "Enter keyword",
      noCheckedFormat: "{total} items",
      hasCheckedFormat: "{checked}/{total} checked"
    },
    image: {
      error: "FAILED"
    },
    pageHeader: {
      title: "Back"
    },
    popconfirm: {
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }
  }
};
const buildTranslator = (e) => (k, oe) => translate(k, oe, unref(e)), translate = (e, k, oe) => get(oe, e, e).replace(/\{(\w+)\}/g, (re, ae) => {
  var le;
  return `${(le = k == null ? void 0 : k[ae]) != null ? le : `{${ae}}`}`;
}), buildLocaleContext = (e) => {
  const k = computed(() => unref(e).name), oe = isRef(e) ? e : ref(e);
  return {
    lang: k,
    locale: oe,
    t: buildTranslator(e)
  };
}, useLocale = () => {
  const e = useGlobalConfig("locale");
  return buildLocaleContext(computed(() => e.value || English));
}, defaultNamespace = "el", statePrefix = "is-", _bem = (e, k, oe, re, ae) => {
  let le = `${e}-${k}`;
  return oe && (le += `-${oe}`), re && (le += `__${re}`), ae && (le += `--${ae}`), le;
}, useNamespace = (e) => {
  const k = useGlobalConfig("namespace"), oe = computed(() => k.value || defaultNamespace);
  return {
    namespace: oe,
    b: (he = "") => _bem(unref(oe), e, he, "", ""),
    e: (he) => he ? _bem(unref(oe), e, "", he, "") : "",
    m: (he) => he ? _bem(unref(oe), e, "", "", he) : "",
    be: (he, Oe) => he && Oe ? _bem(unref(oe), e, he, Oe, "") : "",
    em: (he, Oe) => he && Oe ? _bem(unref(oe), e, "", he, Oe) : "",
    bm: (he, Oe) => he && Oe ? _bem(unref(oe), e, he, "", Oe) : "",
    bem: (he, Oe, Ie) => he && Oe && Ie ? _bem(unref(oe), e, he, Oe, Ie) : "",
    is: (he, ...Oe) => {
      const Ie = Oe.length >= 1 ? Oe[0] : !0;
      return he && Ie ? `${statePrefix}${he}` : "";
    },
    cssVar: (he) => {
      const Oe = {};
      for (const Ie in he)
        he[Ie] && (Oe[`--${oe.value}-${Ie}`] = he[Ie]);
      return Oe;
    },
    cssVarName: (he) => `--${oe.value}-${he}`,
    cssVarBlock: (he) => {
      const Oe = {};
      for (const Ie in he)
        he[Ie] && (Oe[`--${oe.value}-${e}-${Ie}`] = he[Ie]);
      return Oe;
    },
    cssVarBlockName: (he) => `--${oe.value}-${e}-${he}`
  };
}, _prop = buildProp({
  type: definePropType(Boolean),
  default: null
}), _event = buildProp({
  type: definePropType(Function)
}), createModelToggleComposable = (e) => {
  const k = `update:${e}`, oe = `onUpdate:${e}`, re = [k], ae = {
    [e]: _prop,
    [oe]: _event
  };
  return {
    useModelToggle: ({
      indicator: ie,
      toggleReason: ue,
      shouldHideWhenRouteChanges: de,
      shouldProceed: pe,
      onShow: Ce,
      onHide: _e
    }) => {
      const $e = getCurrentInstance(), { emit: Ve } = $e, Ne = $e.props, he = computed(() => isFunction(Ne[oe])), Oe = computed(() => Ne[e] === null), Ie = (Pt) => {
        ie.value !== !0 && (ie.value = !0, ue && (ue.value = Pt), isFunction(Ce) && Ce(Pt));
      }, qe = (Pt) => {
        ie.value !== !1 && (ie.value = !1, ue && (ue.value = Pt), isFunction(_e) && _e(Pt));
      }, xe = (Pt) => {
        if (Ne.disabled === !0 || isFunction(pe) && !pe())
          return;
        const vn = he.value && isClient$1;
        vn && Ve(k, !0), (Oe.value || !vn) && Ie(Pt);
      }, ze = (Pt) => {
        if (Ne.disabled === !0 || !isClient$1)
          return;
        const vn = he.value && isClient$1;
        vn && Ve(k, !1), (Oe.value || !vn) && qe(Pt);
      }, At = (Pt) => {
        !isBoolean(Pt) || (Ne.disabled && Pt ? he.value && Ve(k, !1) : ie.value !== Pt && (Pt ? Ie() : qe()));
      }, Fe = () => {
        ie.value ? ze() : xe();
      };
      return watch(() => Ne[e], At), de && $e.appContext.config.globalProperties.$route !== void 0 && watch(() => ({
        ...$e.proxy.$route
      }), () => {
        de.value && ie.value && ze();
      }), onMounted(() => {
        At(Ne[e]);
      }), {
        hide: ze,
        show: xe,
        toggle: Fe,
        hasUpdateHandler: he
      };
    },
    useModelToggleProps: ae,
    useModelToggleEmits: re
  };
};
function useTimeout() {
  let e;
  const k = (re, ae) => {
    oe(), e = window.setTimeout(re, ae);
  }, oe = () => window.clearTimeout(e);
  return tryOnScopeDispose(() => oe()), {
    registerTimeout: k,
    cancelTimeout: oe
  };
}
let registeredEscapeHandlers = [];
const cachedHandler = (e) => {
  const k = e;
  k.key === EVENT_CODE.esc && registeredEscapeHandlers.forEach((oe) => oe(k));
}, useEscapeKeydown = (e) => {
  onMounted(() => {
    registeredEscapeHandlers.length === 0 && document.addEventListener("keydown", cachedHandler), isClient$1 && registeredEscapeHandlers.push(e);
  }), onBeforeUnmount(() => {
    registeredEscapeHandlers = registeredEscapeHandlers.filter((k) => k !== e), registeredEscapeHandlers.length === 0 && isClient$1 && document.removeEventListener("keydown", cachedHandler);
  });
};
let cachedContainer;
const POPPER_CONTAINER_ID = `el-popper-container-${generateId()}`, POPPER_CONTAINER_SELECTOR = `#${POPPER_CONTAINER_ID}`, createContainer = () => {
  const e = document.createElement("div");
  return e.id = POPPER_CONTAINER_ID, document.body.appendChild(e), e;
}, usePopperContainer = () => {
  onBeforeMount(() => {
    !isClient$1 || (process.env.NODE_ENV === "test" || !cachedContainer || !document.body.querySelector(POPPER_CONTAINER_SELECTOR)) && (cachedContainer = createContainer());
  });
}, useDelayedToggleProps = buildProps({
  showAfter: {
    type: Number,
    default: 0
  },
  hideAfter: {
    type: Number,
    default: 200
  }
}), useDelayedToggle = ({
  showAfter: e,
  hideAfter: k,
  open: oe,
  close: re
}) => {
  const { registerTimeout: ae } = useTimeout();
  return {
    onOpen: (ue) => {
      ae(() => {
        oe(ue);
      }, unref(e));
    },
    onClose: (ue) => {
      ae(() => {
        re(ue);
      }, unref(k));
    }
  };
}, FORWARD_REF_INJECTION_KEY = Symbol("elForwardRef"), useForwardRef = (e) => {
  provide(FORWARD_REF_INJECTION_KEY, {
    setForwardRef: (oe) => {
      e.value = oe;
    }
  });
}, useForwardRefDirective = (e) => ({
  mounted(k) {
    e(k);
  },
  updated(k) {
    e(k);
  },
  unmounted() {
    e(null);
  }
}), zIndex = ref(0), useZIndex = () => {
  const e = useGlobalConfig("zIndex", 2e3), k = computed(() => e.value + zIndex.value);
  return {
    initialZIndex: e,
    currentZIndex: k,
    nextZIndex: () => (zIndex.value++, k.value)
  };
};
function useCursor(e) {
  const k = ref();
  function oe() {
    if (e.value == null)
      return;
    const { selectionStart: ae, selectionEnd: le, value: ie } = e.value;
    if (ae == null || le == null)
      return;
    const ue = ie.slice(0, Math.max(0, ae)), de = ie.slice(Math.max(0, le));
    k.value = {
      selectionStart: ae,
      selectionEnd: le,
      value: ie,
      beforeTxt: ue,
      afterTxt: de
    };
  }
  function re() {
    if (e.value == null || k.value == null)
      return;
    const { value: ae } = e.value, { beforeTxt: le, afterTxt: ie, selectionStart: ue } = k.value;
    if (le == null || ie == null || ue == null)
      return;
    let de = ae.length;
    if (ae.endsWith(ie))
      de = ae.length - ie.length;
    else if (ae.startsWith(le))
      de = le.length;
    else {
      const pe = le[ue - 1], Ce = ae.indexOf(pe, ue - 1);
      Ce !== -1 && (de = Ce + 1);
    }
    e.value.setSelectionRange(de, de);
  }
  return [oe, re];
}
var _export_sfc = (e, k) => {
  const oe = e.__vccOpts || e;
  for (const [re, ae] of k)
    oe[re] = ae;
  return oe;
};
const iconProps = buildProps({
  size: {
    type: definePropType([Number, String])
  },
  color: {
    type: String
  }
}), __default__$t = {
  name: "ElIcon",
  inheritAttrs: !1
}, _sfc_main$Z = /* @__PURE__ */ defineComponent({
  ...__default__$t,
  props: iconProps,
  setup(e) {
    const k = e, oe = useNamespace("icon"), re = computed(() => !k.size && !k.color ? {} : {
      fontSize: isUndefined(k.size) ? void 0 : addUnit(k.size),
      "--color": k.color
    });
    return (ae, le) => (openBlock(), createElementBlock("i", mergeProps({
      class: unref(oe).b(),
      style: unref(re)
    }, ae.$attrs), [
      renderSlot(ae.$slots, "default")
    ], 16));
  }
});
var Icon = /* @__PURE__ */ _export_sfc(_sfc_main$Z, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/icon/src/icon.vue"]]);
const ElIcon = withInstall(Icon);
let hiddenTextarea;
const HIDDEN_STYLE = `
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
`, CONTEXT_STYLE = [
  "letter-spacing",
  "line-height",
  "padding-top",
  "padding-bottom",
  "font-family",
  "font-weight",
  "font-size",
  "text-rendering",
  "text-transform",
  "width",
  "text-indent",
  "padding-left",
  "padding-right",
  "border-width",
  "box-sizing"
];
function calculateNodeStyling(e) {
  const k = window.getComputedStyle(e), oe = k.getPropertyValue("box-sizing"), re = Number.parseFloat(k.getPropertyValue("padding-bottom")) + Number.parseFloat(k.getPropertyValue("padding-top")), ae = Number.parseFloat(k.getPropertyValue("border-bottom-width")) + Number.parseFloat(k.getPropertyValue("border-top-width"));
  return { contextStyle: CONTEXT_STYLE.map((ie) => `${ie}:${k.getPropertyValue(ie)}`).join(";"), paddingSize: re, borderSize: ae, boxSizing: oe };
}
function calcTextareaHeight(e, k = 1, oe) {
  var re;
  hiddenTextarea || (hiddenTextarea = document.createElement("textarea"), document.body.appendChild(hiddenTextarea));
  const { paddingSize: ae, borderSize: le, boxSizing: ie, contextStyle: ue } = calculateNodeStyling(e);
  hiddenTextarea.setAttribute("style", `${ue};${HIDDEN_STYLE}`), hiddenTextarea.value = e.value || e.placeholder || "";
  let de = hiddenTextarea.scrollHeight;
  const pe = {};
  ie === "border-box" ? de = de + le : ie === "content-box" && (de = de - ae), hiddenTextarea.value = "";
  const Ce = hiddenTextarea.scrollHeight - ae;
  if (isNumber(k)) {
    let _e = Ce * k;
    ie === "border-box" && (_e = _e + ae + le), de = Math.max(_e, de), pe.minHeight = `${_e}px`;
  }
  if (isNumber(oe)) {
    let _e = Ce * oe;
    ie === "border-box" && (_e = _e + ae + le), de = Math.min(_e, de);
  }
  return pe.height = `${de}px`, (re = hiddenTextarea.parentNode) == null || re.removeChild(hiddenTextarea), hiddenTextarea = void 0, pe;
}
const inputProps = buildProps({
  id: {
    type: String,
    default: void 0
  },
  size: useSizeProp,
  disabled: Boolean,
  modelValue: {
    type: definePropType([
      String,
      Number,
      Object
    ]),
    default: ""
  },
  type: {
    type: String,
    default: "text"
  },
  resize: {
    type: String,
    values: ["none", "both", "horizontal", "vertical"]
  },
  autosize: {
    type: definePropType([Boolean, Object]),
    default: !1
  },
  autocomplete: {
    type: String,
    default: "off"
  },
  formatter: {
    type: Function
  },
  parser: {
    type: Function
  },
  placeholder: {
    type: String
  },
  form: {
    type: String,
    default: ""
  },
  readonly: {
    type: Boolean,
    default: !1
  },
  clearable: {
    type: Boolean,
    default: !1
  },
  showPassword: {
    type: Boolean,
    default: !1
  },
  showWordLimit: {
    type: Boolean,
    default: !1
  },
  suffixIcon: {
    type: iconPropType,
    default: ""
  },
  prefixIcon: {
    type: iconPropType,
    default: ""
  },
  containerRole: {
    type: String,
    default: void 0
  },
  label: {
    type: String,
    default: void 0
  },
  tabindex: {
    type: [String, Number],
    default: 0
  },
  validateEvent: {
    type: Boolean,
    default: !0
  },
  inputStyle: {
    type: definePropType([Object, Array, String]),
    default: () => mutable({})
  }
}), inputEmits = {
  [UPDATE_MODEL_EVENT]: (e) => isString(e),
  input: (e) => isString(e),
  change: (e) => isString(e),
  focus: (e) => e instanceof FocusEvent,
  blur: (e) => e instanceof FocusEvent,
  clear: () => !0,
  mouseleave: (e) => e instanceof MouseEvent,
  mouseenter: (e) => e instanceof MouseEvent,
  keydown: (e) => e instanceof Event,
  compositionstart: (e) => e instanceof CompositionEvent,
  compositionupdate: (e) => e instanceof CompositionEvent,
  compositionend: (e) => e instanceof CompositionEvent
}, _hoisted_1$v = ["role"], _hoisted_2$l = ["id", "type", "disabled", "formatter", "parser", "readonly", "autocomplete", "tabindex", "aria-label", "placeholder"], _hoisted_3$c = ["id", "tabindex", "disabled", "readonly", "autocomplete", "aria-label", "placeholder"], __default__$s = {
  name: "ElInput",
  inheritAttrs: !1
}, _sfc_main$Y = /* @__PURE__ */ defineComponent({
  ...__default__$s,
  props: inputProps,
  emits: inputEmits,
  setup(e, { expose: k, emit: oe }) {
    const re = e, ae = {
      suffix: "append",
      prefix: "prepend"
    }, le = getCurrentInstance(), ie = useAttrs$2(), ue = useSlots(), de = computed(() => {
      const In = {};
      return re.containerRole === "combobox" && (In["aria-haspopup"] = ie["aria-haspopup"], In["aria-owns"] = ie["aria-owns"], In["aria-expanded"] = ie["aria-expanded"]), In;
    }), pe = useAttrs$1({
      excludeKeys: computed(() => Object.keys(de.value))
    }), { form: Ce, formItem: _e } = useFormItem(), { inputId: $e } = useFormItemInputId(re, {
      formItemContext: _e
    }), Ve = useSize(), Ne = useDisabled$1(), he = useNamespace("input"), Oe = useNamespace("textarea"), Ie = shallowRef(), qe = shallowRef(), xe = ref(!1), ze = ref(!1), At = ref(!1), Fe = ref(!1), Pt = ref(), vn = shallowRef(re.inputStyle), En = computed(() => Ie.value || qe.value), Nn = computed(() => {
      var In;
      return (In = Ce == null ? void 0 : Ce.statusIcon) != null ? In : !1;
    }), Tn = computed(() => (_e == null ? void 0 : _e.validateState) || ""), wn = computed(() => Tn.value && ValidateComponentsMap[Tn.value]), Lt = computed(() => Fe.value ? view_default : hide_default), Dt = computed(() => [
      ie.style,
      re.inputStyle
    ]), Cn = computed(() => [
      re.inputStyle,
      vn.value,
      { resize: re.resize }
    ]), jt = computed(() => isNil(re.modelValue) ? "" : String(re.modelValue)), bn = computed(() => re.clearable && !Ne.value && !re.readonly && !!jt.value && (xe.value || ze.value)), kt = computed(() => re.showPassword && !Ne.value && !re.readonly && !!jt.value && (!!jt.value || xe.value)), Et = computed(() => re.showWordLimit && !!pe.value.maxlength && (re.type === "text" || re.type === "textarea") && !Ne.value && !re.readonly && !re.showPassword), _n = computed(() => Array.from(jt.value).length), Pn = computed(() => !!Et.value && _n.value > Number(pe.value.maxlength)), hn = computed(() => !!ue.suffix || !!re.suffixIcon || bn.value || re.showPassword || Et.value || !!Tn.value && Nn.value), [On, Dn] = useCursor(Ie);
    useResizeObserver(qe, (In) => {
      if (!Et.value || re.resize !== "both")
        return;
      const Jn = In[0], { width: Qn } = Jn.contentRect;
      Pt.value = {
        right: `calc(100% - ${Qn + 15 + 6}px)`
      };
    });
    const Rn = () => {
      const { type: In, autosize: Jn } = re;
      if (!(!isClient$1 || In !== "textarea"))
        if (Jn) {
          const Qn = isObject$1(Jn) ? Jn.minRows : void 0, ro = isObject$1(Jn) ? Jn.maxRows : void 0;
          vn.value = {
            ...calcTextareaHeight(qe.value, Qn, ro)
          };
        } else
          vn.value = {
            minHeight: calcTextareaHeight(qe.value).minHeight
          };
    }, Fn = () => {
      const In = En.value;
      !In || In.value === jt.value || (In.value = jt.value);
    }, kn = (In) => {
      const { el: Jn } = le.vnode;
      if (!Jn)
        return;
      const ro = Array.from(Jn.querySelectorAll(`.${he.e(In)}`)).find((Mn) => Mn.parentNode === Jn);
      if (!ro)
        return;
      const $n = ae[In];
      ue[$n] ? ro.style.transform = `translateX(${In === "suffix" ? "-" : ""}${Jn.querySelector(`.${he.be("group", $n)}`).offsetWidth}px)` : ro.removeAttribute("style");
    }, An = () => {
      kn("prefix"), kn("suffix");
    }, Vn = async (In) => {
      On();
      let { value: Jn } = In.target;
      re.formatter && (Jn = re.parser ? re.parser(Jn) : Jn, Jn = re.formatter(Jn)), !At.value && Jn !== jt.value && (oe(UPDATE_MODEL_EVENT, Jn), oe("input", Jn), await nextTick(), Fn(), Dn());
    }, Bn = (In) => {
      oe("change", In.target.value);
    }, Wn = (In) => {
      oe("compositionstart", In), At.value = !0;
    }, Yn = (In) => {
      var Jn;
      oe("compositionupdate", In);
      const Qn = (Jn = In.target) == null ? void 0 : Jn.value, ro = Qn[Qn.length - 1] || "";
      At.value = !isKorean(ro);
    }, Xn = (In) => {
      oe("compositionend", In), At.value && (At.value = !1, Vn(In));
    }, eo = () => {
      Fe.value = !Fe.value, Gn();
    }, Gn = async () => {
      var In;
      await nextTick(), (In = En.value) == null || In.focus();
    }, no = () => {
      var In;
      return (In = En.value) == null ? void 0 : In.blur();
    }, oo = (In) => {
      xe.value = !0, oe("focus", In);
    }, zn = (In) => {
      var Jn;
      xe.value = !1, oe("blur", In), re.validateEvent && ((Jn = _e == null ? void 0 : _e.validate) == null || Jn.call(_e, "blur").catch((Qn) => debugWarn(Qn)));
    }, Hn = (In) => {
      ze.value = !1, oe("mouseleave", In);
    }, qn = (In) => {
      ze.value = !0, oe("mouseenter", In);
    }, Zn = (In) => {
      oe("keydown", In);
    }, lo = () => {
      var In;
      (In = En.value) == null || In.select();
    }, ao = () => {
      oe(UPDATE_MODEL_EVENT, ""), oe("change", ""), oe("clear"), oe("input", "");
    };
    return watch(() => re.modelValue, () => {
      var In;
      nextTick(() => Rn()), re.validateEvent && ((In = _e == null ? void 0 : _e.validate) == null || In.call(_e, "change").catch((Jn) => debugWarn(Jn)));
    }), watch(jt, () => Fn()), watch(() => re.type, async () => {
      await nextTick(), Fn(), Rn(), An();
    }), onMounted(async () => {
      !re.formatter && re.parser && debugWarn("ElInput", "If you set the parser, you also need to set the formatter."), Fn(), An(), await nextTick(), Rn();
    }), onUpdated(async () => {
      await nextTick(), An();
    }), k({
      input: Ie,
      textarea: qe,
      ref: En,
      textareaStyle: Cn,
      autosize: toRef(re, "autosize"),
      focus: Gn,
      blur: no,
      select: lo,
      clear: ao,
      resizeTextarea: Rn
    }), (In, Jn) => withDirectives((openBlock(), createElementBlock("div", mergeProps(unref(de), {
      class: [
        In.type === "textarea" ? unref(Oe).b() : unref(he).b(),
        unref(he).m(unref(Ve)),
        unref(he).is("disabled", unref(Ne)),
        unref(he).is("exceed", unref(Pn)),
        {
          [unref(he).b("group")]: In.$slots.prepend || In.$slots.append,
          [unref(he).bm("group", "append")]: In.$slots.append,
          [unref(he).bm("group", "prepend")]: In.$slots.prepend,
          [unref(he).m("prefix")]: In.$slots.prefix || In.prefixIcon,
          [unref(he).m("suffix")]: In.$slots.suffix || In.suffixIcon || In.clearable || In.showPassword,
          [unref(he).bm("suffix", "password-clear")]: unref(bn) && unref(kt)
        },
        In.$attrs.class
      ],
      style: unref(Dt),
      role: In.containerRole,
      onMouseenter: qn,
      onMouseleave: Hn
    }), [
      createCommentVNode(" input "),
      In.type !== "textarea" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        createCommentVNode(" prepend slot "),
        In.$slots.prepend ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(he).be("group", "prepend"))
        }, [
          renderSlot(In.$slots, "prepend")
        ], 2)) : createCommentVNode("v-if", !0),
        createElementVNode("div", {
          class: normalizeClass([unref(he).e("wrapper"), unref(he).is("focus", xe.value)])
        }, [
          createCommentVNode(" prefix slot "),
          In.$slots.prefix || In.prefixIcon ? (openBlock(), createElementBlock("span", {
            key: 0,
            class: normalizeClass(unref(he).e("prefix"))
          }, [
            createElementVNode("span", {
              class: normalizeClass(unref(he).e("prefix-inner"))
            }, [
              renderSlot(In.$slots, "prefix"),
              In.prefixIcon ? (openBlock(), createBlock(unref(ElIcon), {
                key: 0,
                class: normalizeClass(unref(he).e("icon"))
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(resolveDynamicComponent(In.prefixIcon)))
                ]),
                _: 1
              }, 8, ["class"])) : createCommentVNode("v-if", !0)
            ], 2)
          ], 2)) : createCommentVNode("v-if", !0),
          createElementVNode("input", mergeProps({
            id: unref($e),
            ref_key: "input",
            ref: Ie,
            class: unref(he).e("inner")
          }, unref(pe), {
            type: In.showPassword ? Fe.value ? "text" : "password" : In.type,
            disabled: unref(Ne),
            formatter: In.formatter,
            parser: In.parser,
            readonly: In.readonly,
            autocomplete: In.autocomplete,
            tabindex: In.tabindex,
            "aria-label": In.label,
            placeholder: In.placeholder,
            style: In.inputStyle,
            onCompositionstart: Wn,
            onCompositionupdate: Yn,
            onCompositionend: Xn,
            onInput: Vn,
            onFocus: oo,
            onBlur: zn,
            onChange: Bn,
            onKeydown: Zn
          }), null, 16, _hoisted_2$l),
          createCommentVNode(" suffix slot "),
          unref(hn) ? (openBlock(), createElementBlock("span", {
            key: 1,
            class: normalizeClass(unref(he).e("suffix"))
          }, [
            createElementVNode("span", {
              class: normalizeClass(unref(he).e("suffix-inner"))
            }, [
              !unref(bn) || !unref(kt) || !unref(Et) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                renderSlot(In.$slots, "suffix"),
                In.suffixIcon ? (openBlock(), createBlock(unref(ElIcon), {
                  key: 0,
                  class: normalizeClass(unref(he).e("icon"))
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent(In.suffixIcon)))
                  ]),
                  _: 1
                }, 8, ["class"])) : createCommentVNode("v-if", !0)
              ], 64)) : createCommentVNode("v-if", !0),
              unref(bn) ? (openBlock(), createBlock(unref(ElIcon), {
                key: 1,
                class: normalizeClass([unref(he).e("icon"), unref(he).e("clear")]),
                onMousedown: withModifiers(unref(NOOP), ["prevent"]),
                onClick: ao
              }, {
                default: withCtx(() => [
                  createVNode(unref(circle_close_default))
                ]),
                _: 1
              }, 8, ["class", "onMousedown"])) : createCommentVNode("v-if", !0),
              unref(kt) ? (openBlock(), createBlock(unref(ElIcon), {
                key: 2,
                class: normalizeClass([unref(he).e("icon"), unref(he).e("password")]),
                onClick: eo
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(resolveDynamicComponent(unref(Lt))))
                ]),
                _: 1
              }, 8, ["class"])) : createCommentVNode("v-if", !0),
              unref(Et) ? (openBlock(), createElementBlock("span", {
                key: 3,
                class: normalizeClass(unref(he).e("count"))
              }, [
                createElementVNode("span", {
                  class: normalizeClass(unref(he).e("count-inner"))
                }, toDisplayString(unref(_n)) + " / " + toDisplayString(unref(pe).maxlength), 3)
              ], 2)) : createCommentVNode("v-if", !0),
              unref(Tn) && unref(wn) && unref(Nn) ? (openBlock(), createBlock(unref(ElIcon), {
                key: 4,
                class: normalizeClass([
                  unref(he).e("icon"),
                  unref(he).e("validateIcon"),
                  unref(he).is("loading", unref(Tn) === "validating")
                ])
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(resolveDynamicComponent(unref(wn))))
                ]),
                _: 1
              }, 8, ["class"])) : createCommentVNode("v-if", !0)
            ], 2)
          ], 2)) : createCommentVNode("v-if", !0)
        ], 2),
        createCommentVNode(" append slot "),
        In.$slots.append ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(unref(he).be("group", "append"))
        }, [
          renderSlot(In.$slots, "append")
        ], 2)) : createCommentVNode("v-if", !0)
      ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        createCommentVNode(" textarea "),
        createElementVNode("textarea", mergeProps({
          id: unref($e),
          ref_key: "textarea",
          ref: qe,
          class: unref(Oe).e("inner")
        }, unref(pe), {
          tabindex: In.tabindex,
          disabled: unref(Ne),
          readonly: In.readonly,
          autocomplete: In.autocomplete,
          style: unref(Cn),
          "aria-label": In.label,
          placeholder: In.placeholder,
          onCompositionstart: Wn,
          onCompositionupdate: Yn,
          onCompositionend: Xn,
          onInput: Vn,
          onFocus: oo,
          onBlur: zn,
          onChange: Bn,
          onKeydown: Zn
        }), null, 16, _hoisted_3$c),
        unref(Et) ? (openBlock(), createElementBlock("span", {
          key: 0,
          style: normalizeStyle(Pt.value),
          class: normalizeClass(unref(he).e("count"))
        }, toDisplayString(unref(_n)) + " / " + toDisplayString(unref(pe).maxlength), 7)) : createCommentVNode("v-if", !0)
      ], 64))
    ], 16, _hoisted_1$v)), [
      [vShow, In.type !== "hidden"]
    ]);
  }
});
var Input = /* @__PURE__ */ _export_sfc(_sfc_main$Y, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/input/src/input.vue"]]);
const ElInput = withInstall(Input), GAP = 4, BAR_MAP = {
  vertical: {
    offset: "offsetHeight",
    scroll: "scrollTop",
    scrollSize: "scrollHeight",
    size: "height",
    key: "vertical",
    axis: "Y",
    client: "clientY",
    direction: "top"
  },
  horizontal: {
    offset: "offsetWidth",
    scroll: "scrollLeft",
    scrollSize: "scrollWidth",
    size: "width",
    key: "horizontal",
    axis: "X",
    client: "clientX",
    direction: "left"
  }
}, renderThumbStyle = ({
  move: e,
  size: k,
  bar: oe
}) => ({
  [oe.size]: k,
  transform: `translate${oe.axis}(${e}%)`
}), thumbProps = buildProps({
  vertical: Boolean,
  size: String,
  move: Number,
  ratio: {
    type: Number,
    required: !0
  },
  always: Boolean
}), _sfc_main$X = /* @__PURE__ */ defineComponent({
  __name: "thumb",
  props: thumbProps,
  setup(e) {
    const k = e, oe = "Thumb", re = inject(scrollbarContextKey), ae = useNamespace("scrollbar");
    re || throwError(oe, "can not inject scrollbar context");
    const le = ref(), ie = ref(), ue = ref({}), de = ref(!1);
    let pe = !1, Ce = !1, _e = isClient$1 ? document.onselectstart : null;
    const $e = computed(() => BAR_MAP[k.vertical ? "vertical" : "horizontal"]), Ve = computed(() => renderThumbStyle({
      size: k.size,
      move: k.move,
      bar: $e.value
    })), Ne = computed(() => le.value[$e.value.offset] ** 2 / re.wrapElement[$e.value.scrollSize] / k.ratio / ie.value[$e.value.offset]), he = (Pt) => {
      var vn;
      if (Pt.stopPropagation(), Pt.ctrlKey || [1, 2].includes(Pt.button))
        return;
      (vn = window.getSelection()) == null || vn.removeAllRanges(), Ie(Pt);
      const En = Pt.currentTarget;
      !En || (ue.value[$e.value.axis] = En[$e.value.offset] - (Pt[$e.value.client] - En.getBoundingClientRect()[$e.value.direction]));
    }, Oe = (Pt) => {
      if (!ie.value || !le.value || !re.wrapElement)
        return;
      const vn = Math.abs(Pt.target.getBoundingClientRect()[$e.value.direction] - Pt[$e.value.client]), En = ie.value[$e.value.offset] / 2, Nn = (vn - En) * 100 * Ne.value / le.value[$e.value.offset];
      re.wrapElement[$e.value.scroll] = Nn * re.wrapElement[$e.value.scrollSize] / 100;
    }, Ie = (Pt) => {
      Pt.stopImmediatePropagation(), pe = !0, document.addEventListener("mousemove", qe), document.addEventListener("mouseup", xe), _e = document.onselectstart, document.onselectstart = () => !1;
    }, qe = (Pt) => {
      if (!le.value || !ie.value || pe === !1)
        return;
      const vn = ue.value[$e.value.axis];
      if (!vn)
        return;
      const En = (le.value.getBoundingClientRect()[$e.value.direction] - Pt[$e.value.client]) * -1, Nn = ie.value[$e.value.offset] - vn, Tn = (En - Nn) * 100 * Ne.value / le.value[$e.value.offset];
      re.wrapElement[$e.value.scroll] = Tn * re.wrapElement[$e.value.scrollSize] / 100;
    }, xe = () => {
      pe = !1, ue.value[$e.value.axis] = 0, document.removeEventListener("mousemove", qe), document.removeEventListener("mouseup", xe), Fe(), Ce && (de.value = !1);
    }, ze = () => {
      Ce = !1, de.value = !!k.size;
    }, At = () => {
      Ce = !0, de.value = pe;
    };
    onBeforeUnmount(() => {
      Fe(), document.removeEventListener("mouseup", xe);
    });
    const Fe = () => {
      document.onselectstart !== _e && (document.onselectstart = _e);
    };
    return useEventListener(toRef(re, "scrollbarElement"), "mousemove", ze), useEventListener(toRef(re, "scrollbarElement"), "mouseleave", At), (Pt, vn) => (openBlock(), createBlock(Transition, {
      name: unref(ae).b("fade"),
      persisted: ""
    }, {
      default: withCtx(() => [
        withDirectives(createElementVNode("div", {
          ref_key: "instance",
          ref: le,
          class: normalizeClass([unref(ae).e("bar"), unref(ae).is(unref($e).key)]),
          onMousedown: Oe
        }, [
          createElementVNode("div", {
            ref_key: "thumb",
            ref: ie,
            class: normalizeClass(unref(ae).e("thumb")),
            style: normalizeStyle(unref(Ve)),
            onMousedown: he
          }, null, 38)
        ], 34), [
          [vShow, Pt.always || de.value]
        ])
      ]),
      _: 1
    }, 8, ["name"]));
  }
});
var Thumb = /* @__PURE__ */ _export_sfc(_sfc_main$X, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/thumb.vue"]]);
const barProps = buildProps({
  always: {
    type: Boolean,
    default: !0
  },
  width: String,
  height: String,
  ratioX: {
    type: Number,
    default: 1
  },
  ratioY: {
    type: Number,
    default: 1
  }
}), _sfc_main$W = /* @__PURE__ */ defineComponent({
  __name: "bar",
  props: barProps,
  setup(e, { expose: k }) {
    const oe = e, re = ref(0), ae = ref(0);
    return k({
      handleScroll: (ie) => {
        if (ie) {
          const ue = ie.offsetHeight - GAP, de = ie.offsetWidth - GAP;
          ae.value = ie.scrollTop * 100 / ue * oe.ratioY, re.value = ie.scrollLeft * 100 / de * oe.ratioX;
        }
      }
    }), (ie, ue) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(Thumb, {
        move: re.value,
        ratio: ie.ratioX,
        size: ie.width,
        always: ie.always
      }, null, 8, ["move", "ratio", "size", "always"]),
      createVNode(Thumb, {
        move: ae.value,
        ratio: ie.ratioY,
        size: ie.height,
        vertical: "",
        always: ie.always
      }, null, 8, ["move", "ratio", "size", "always"])
    ], 64));
  }
});
var Bar = /* @__PURE__ */ _export_sfc(_sfc_main$W, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/bar.vue"]]);
const scrollbarProps = buildProps({
  height: {
    type: [String, Number],
    default: ""
  },
  maxHeight: {
    type: [String, Number],
    default: ""
  },
  native: Boolean,
  wrapStyle: {
    type: definePropType([String, Object, Array]),
    default: ""
  },
  wrapClass: {
    type: [String, Array],
    default: ""
  },
  viewClass: {
    type: [String, Array],
    default: ""
  },
  viewStyle: {
    type: [String, Array, Object],
    default: ""
  },
  noresize: Boolean,
  tag: {
    type: String,
    default: "div"
  },
  always: Boolean,
  minSize: {
    type: Number,
    default: 20
  }
}), scrollbarEmits = {
  scroll: ({
    scrollTop: e,
    scrollLeft: k
  }) => [e, k].every(isNumber)
}, __default__$r = {
  name: "ElScrollbar"
}, _sfc_main$V = /* @__PURE__ */ defineComponent({
  ...__default__$r,
  props: scrollbarProps,
  emits: scrollbarEmits,
  setup(e, { expose: k, emit: oe }) {
    const re = e, ae = useNamespace("scrollbar");
    let le, ie;
    const ue = ref(), de = ref(), pe = ref(), Ce = ref("0"), _e = ref("0"), $e = ref(), Ve = ref(1), Ne = ref(1), he = "ElScrollbar", Oe = computed(() => {
      const Fe = {};
      return re.height && (Fe.height = addUnit(re.height)), re.maxHeight && (Fe.maxHeight = addUnit(re.maxHeight)), [re.wrapStyle, Fe];
    }), Ie = () => {
      var Fe;
      de.value && ((Fe = $e.value) == null || Fe.handleScroll(de.value), oe("scroll", {
        scrollTop: de.value.scrollTop,
        scrollLeft: de.value.scrollLeft
      }));
    };
    function qe(Fe, Pt) {
      isObject$1(Fe) ? de.value.scrollTo(Fe) : isNumber(Fe) && isNumber(Pt) && de.value.scrollTo(Fe, Pt);
    }
    const xe = (Fe) => {
      if (!isNumber(Fe)) {
        debugWarn(he, "value must be a number");
        return;
      }
      de.value.scrollTop = Fe;
    }, ze = (Fe) => {
      if (!isNumber(Fe)) {
        debugWarn(he, "value must be a number");
        return;
      }
      de.value.scrollLeft = Fe;
    }, At = () => {
      if (!de.value)
        return;
      const Fe = de.value.offsetHeight - GAP, Pt = de.value.offsetWidth - GAP, vn = Fe ** 2 / de.value.scrollHeight, En = Pt ** 2 / de.value.scrollWidth, Nn = Math.max(vn, re.minSize), Tn = Math.max(En, re.minSize);
      Ve.value = vn / (Fe - vn) / (Nn / (Fe - Nn)), Ne.value = En / (Pt - En) / (Tn / (Pt - Tn)), _e.value = Nn + GAP < Fe ? `${Nn}px` : "", Ce.value = Tn + GAP < Pt ? `${Tn}px` : "";
    };
    return watch(() => re.noresize, (Fe) => {
      Fe ? (le == null || le(), ie == null || ie()) : ({ stop: le } = useResizeObserver(pe, At), ie = useEventListener("resize", At));
    }, { immediate: !0 }), watch(() => [re.maxHeight, re.height], () => {
      re.native || nextTick(() => {
        var Fe;
        At(), de.value && ((Fe = $e.value) == null || Fe.handleScroll(de.value));
      });
    }), provide(scrollbarContextKey, reactive({
      scrollbarElement: ue,
      wrapElement: de
    })), onMounted(() => {
      re.native || nextTick(() => {
        At();
      });
    }), onUpdated(() => At()), k({
      wrap$: de,
      update: At,
      scrollTo: qe,
      setScrollTop: xe,
      setScrollLeft: ze,
      handleScroll: Ie
    }), (Fe, Pt) => (openBlock(), createElementBlock("div", {
      ref_key: "scrollbar$",
      ref: ue,
      class: normalizeClass(unref(ae).b())
    }, [
      createElementVNode("div", {
        ref_key: "wrap$",
        ref: de,
        class: normalizeClass([
          Fe.wrapClass,
          unref(ae).e("wrap"),
          { [unref(ae).em("wrap", "hidden-default")]: !Fe.native }
        ]),
        style: normalizeStyle(unref(Oe)),
        onScroll: Ie
      }, [
        (openBlock(), createBlock(resolveDynamicComponent(Fe.tag), {
          ref_key: "resize$",
          ref: pe,
          class: normalizeClass([unref(ae).e("view"), Fe.viewClass]),
          style: normalizeStyle(Fe.viewStyle)
        }, {
          default: withCtx(() => [
            renderSlot(Fe.$slots, "default")
          ]),
          _: 3
        }, 8, ["class", "style"]))
      ], 38),
      Fe.native ? createCommentVNode("v-if", !0) : (openBlock(), createBlock(Bar, {
        key: 0,
        ref_key: "barRef",
        ref: $e,
        height: _e.value,
        width: Ce.value,
        always: Fe.always,
        "ratio-x": Ne.value,
        "ratio-y": Ve.value
      }, null, 8, ["height", "width", "always", "ratio-x", "ratio-y"]))
    ], 2));
  }
});
var Scrollbar = /* @__PURE__ */ _export_sfc(_sfc_main$V, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/scrollbar.vue"]]);
const ElScrollbar = withInstall(Scrollbar), usePopperProps = buildProps({
  role: {
    type: String,
    default: "tooltip"
  }
}), __default__$q = {
  name: "ElPopperRoot",
  inheritAttrs: !1
}, _sfc_main$U = /* @__PURE__ */ defineComponent({
  ...__default__$q,
  props: usePopperProps,
  setup(e, { expose: k }) {
    const oe = e, re = ref(), ae = ref(), le = ref(), ie = ref(), ue = computed(() => oe.role), de = {
      triggerRef: re,
      popperInstanceRef: ae,
      contentRef: le,
      referenceRef: ie,
      role: ue
    };
    return k(de), provide(POPPER_INJECTION_KEY, de), (pe, Ce) => renderSlot(pe.$slots, "default");
  }
});
var Popper = /* @__PURE__ */ _export_sfc(_sfc_main$U, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/popper.vue"]]);
const usePopperArrowProps = buildProps({
  arrowOffset: {
    type: Number,
    default: 5
  }
}), __default__$p = {
  name: "ElPopperArrow",
  inheritAttrs: !1
}, _sfc_main$T = /* @__PURE__ */ defineComponent({
  ...__default__$p,
  props: usePopperArrowProps,
  setup(e, { expose: k }) {
    const oe = e, re = useNamespace("popper"), { arrowOffset: ae, arrowRef: le } = inject(POPPER_CONTENT_INJECTION_KEY, void 0);
    return watch(() => oe.arrowOffset, (ie) => {
      ae.value = ie;
    }), onBeforeUnmount(() => {
      le.value = void 0;
    }), k({
      arrowRef: le
    }), (ie, ue) => (openBlock(), createElementBlock("span", {
      ref_key: "arrowRef",
      ref: le,
      class: normalizeClass(unref(re).e("arrow")),
      "data-popper-arrow": ""
    }, null, 2));
  }
});
var ElPopperArrow = /* @__PURE__ */ _export_sfc(_sfc_main$T, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/arrow.vue"]]);
const NAME = "ElOnlyChild", OnlyChild = defineComponent({
  name: NAME,
  setup(e, {
    slots: k,
    attrs: oe
  }) {
    var re;
    const ae = inject(FORWARD_REF_INJECTION_KEY), le = useForwardRefDirective((re = ae == null ? void 0 : ae.setForwardRef) != null ? re : NOOP);
    return () => {
      var ie;
      const ue = (ie = k.default) == null ? void 0 : ie.call(k, oe);
      if (!ue)
        return null;
      if (ue.length > 1)
        return debugWarn(NAME, "requires exact only one valid child."), null;
      const de = findFirstLegitChild(ue);
      return de ? withDirectives(cloneVNode(de, oe), [[le]]) : (debugWarn(NAME, "no valid child node found"), null);
    };
  }
});
function findFirstLegitChild(e) {
  if (!e)
    return null;
  const k = e;
  for (const oe of k) {
    if (isObject$1(oe))
      switch (oe.type) {
        case Comment:
          continue;
        case Text:
        case "svg":
          return wrapTextContent(oe);
        case Fragment:
          return findFirstLegitChild(oe.children);
        default:
          return oe;
      }
    return wrapTextContent(oe);
  }
  return null;
}
function wrapTextContent(e) {
  return createVNode("span", {
    class: "el-only-child__content"
  }, [e]);
}
const usePopperTriggerProps = buildProps({
  virtualRef: {
    type: definePropType(Object)
  },
  virtualTriggering: Boolean,
  onMouseenter: Function,
  onMouseleave: Function,
  onClick: Function,
  onKeydown: Function,
  onFocus: Function,
  onBlur: Function,
  onContextmenu: Function,
  id: String,
  open: Boolean
}), __default__$o = {
  name: "ElPopperTrigger",
  inheritAttrs: !1
}, _sfc_main$S = /* @__PURE__ */ defineComponent({
  ...__default__$o,
  props: usePopperTriggerProps,
  setup(e, { expose: k }) {
    const oe = e, { role: re, triggerRef: ae } = inject(POPPER_INJECTION_KEY, void 0);
    useForwardRef(ae);
    const le = computed(() => ue.value ? oe.id : void 0), ie = computed(() => {
      if (re && re.value === "tooltip")
        return oe.open && oe.id ? oe.id : void 0;
    }), ue = computed(() => {
      if (re && re.value !== "tooltip")
        return re.value;
    }), de = computed(() => ue.value ? `${oe.open}` : void 0);
    let pe;
    return onMounted(() => {
      watch(() => oe.virtualRef, (Ce) => {
        Ce && (ae.value = unrefElement(Ce));
      }, {
        immediate: !0
      }), watch(() => ae.value, (Ce, _e) => {
        pe == null || pe(), pe = void 0, isElement(Ce) && ([
          "onMouseenter",
          "onMouseleave",
          "onClick",
          "onKeydown",
          "onFocus",
          "onBlur",
          "onContextmenu"
        ].forEach(($e) => {
          var Ve;
          const Ne = oe[$e];
          Ne && (Ce.addEventListener($e.slice(2).toLowerCase(), Ne), (Ve = _e == null ? void 0 : _e.removeEventListener) == null || Ve.call(_e, $e.slice(2).toLowerCase(), Ne));
        }), pe = watch([le, ie, ue, de], ($e) => {
          [
            "aria-controls",
            "aria-describedby",
            "aria-haspopup",
            "aria-expanded"
          ].forEach((Ve, Ne) => {
            isNil($e[Ne]) ? Ce.removeAttribute(Ve) : Ce.setAttribute(Ve, $e[Ne]);
          });
        }, { immediate: !0 })), isElement(_e) && [
          "aria-controls",
          "aria-describedby",
          "aria-haspopup",
          "aria-expanded"
        ].forEach(($e) => _e.removeAttribute($e));
      }, {
        immediate: !0
      });
    }), onBeforeUnmount(() => {
      pe == null || pe(), pe = void 0;
    }), k({
      triggerRef: ae
    }), (Ce, _e) => Ce.virtualTriggering ? createCommentVNode("v-if", !0) : (openBlock(), createBlock(unref(OnlyChild), mergeProps({ key: 0 }, Ce.$attrs, {
      "aria-controls": unref(le),
      "aria-describedby": unref(ie),
      "aria-expanded": unref(de),
      "aria-haspopup": unref(ue)
    }), {
      default: withCtx(() => [
        renderSlot(Ce.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-controls", "aria-describedby", "aria-expanded", "aria-haspopup"]));
  }
});
var ElPopperTrigger = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/trigger.vue"]]), E$1 = "top", R = "bottom", W = "right", P$1 = "left", me = "auto", G = [E$1, R, W, P$1], U$1 = "start", J = "end", Xe = "clippingParents", je = "viewport", K = "popper", Ye = "reference", De = G.reduce(function(e, k) {
  return e.concat([k + "-" + U$1, k + "-" + J]);
}, []), Ee = [].concat(G, [me]).reduce(function(e, k) {
  return e.concat([k, k + "-" + U$1, k + "-" + J]);
}, []), Ge = "beforeRead", Je = "read", Ke = "afterRead", Qe = "beforeMain", Ze = "main", et = "afterMain", tt = "beforeWrite", nt = "write", rt = "afterWrite", ot = [Ge, Je, Ke, Qe, Ze, et, tt, nt, rt];
function C(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function H(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var k = e.ownerDocument;
    return k && k.defaultView || window;
  }
  return e;
}
function Q(e) {
  var k = H(e).Element;
  return e instanceof k || e instanceof Element;
}
function B(e) {
  var k = H(e).HTMLElement;
  return e instanceof k || e instanceof HTMLElement;
}
function Pe(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var k = H(e).ShadowRoot;
  return e instanceof k || e instanceof ShadowRoot;
}
function Mt(e) {
  var k = e.state;
  Object.keys(k.elements).forEach(function(oe) {
    var re = k.styles[oe] || {}, ae = k.attributes[oe] || {}, le = k.elements[oe];
    !B(le) || !C(le) || (Object.assign(le.style, re), Object.keys(ae).forEach(function(ie) {
      var ue = ae[ie];
      ue === !1 ? le.removeAttribute(ie) : le.setAttribute(ie, ue === !0 ? "" : ue);
    }));
  });
}
function Rt(e) {
  var k = e.state, oe = { popper: { position: k.options.strategy, left: "0", top: "0", margin: "0" }, arrow: { position: "absolute" }, reference: {} };
  return Object.assign(k.elements.popper.style, oe.popper), k.styles = oe, k.elements.arrow && Object.assign(k.elements.arrow.style, oe.arrow), function() {
    Object.keys(k.elements).forEach(function(re) {
      var ae = k.elements[re], le = k.attributes[re] || {}, ie = Object.keys(k.styles.hasOwnProperty(re) ? k.styles[re] : oe[re]), ue = ie.reduce(function(de, pe) {
        return de[pe] = "", de;
      }, {});
      !B(ae) || !C(ae) || (Object.assign(ae.style, ue), Object.keys(le).forEach(function(de) {
        ae.removeAttribute(de);
      }));
    });
  };
}
var Ae = { name: "applyStyles", enabled: !0, phase: "write", fn: Mt, effect: Rt, requires: ["computeStyles"] };
function q(e) {
  return e.split("-")[0];
}
var X$1 = Math.max, ve = Math.min, Z = Math.round;
function ee(e, k) {
  k === void 0 && (k = !1);
  var oe = e.getBoundingClientRect(), re = 1, ae = 1;
  if (B(e) && k) {
    var le = e.offsetHeight, ie = e.offsetWidth;
    ie > 0 && (re = Z(oe.width) / ie || 1), le > 0 && (ae = Z(oe.height) / le || 1);
  }
  return { width: oe.width / re, height: oe.height / ae, top: oe.top / ae, right: oe.right / re, bottom: oe.bottom / ae, left: oe.left / re, x: oe.left / re, y: oe.top / ae };
}
function ke(e) {
  var k = ee(e), oe = e.offsetWidth, re = e.offsetHeight;
  return Math.abs(k.width - oe) <= 1 && (oe = k.width), Math.abs(k.height - re) <= 1 && (re = k.height), { x: e.offsetLeft, y: e.offsetTop, width: oe, height: re };
}
function it(e, k) {
  var oe = k.getRootNode && k.getRootNode();
  if (e.contains(k))
    return !0;
  if (oe && Pe(oe)) {
    var re = k;
    do {
      if (re && e.isSameNode(re))
        return !0;
      re = re.parentNode || re.host;
    } while (re);
  }
  return !1;
}
function N$1(e) {
  return H(e).getComputedStyle(e);
}
function Wt(e) {
  return ["table", "td", "th"].indexOf(C(e)) >= 0;
}
function I$1(e) {
  return ((Q(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function ge(e) {
  return C(e) === "html" ? e : e.assignedSlot || e.parentNode || (Pe(e) ? e.host : null) || I$1(e);
}
function at(e) {
  return !B(e) || N$1(e).position === "fixed" ? null : e.offsetParent;
}
function Bt(e) {
  var k = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1, oe = navigator.userAgent.indexOf("Trident") !== -1;
  if (oe && B(e)) {
    var re = N$1(e);
    if (re.position === "fixed")
      return null;
  }
  var ae = ge(e);
  for (Pe(ae) && (ae = ae.host); B(ae) && ["html", "body"].indexOf(C(ae)) < 0; ) {
    var le = N$1(ae);
    if (le.transform !== "none" || le.perspective !== "none" || le.contain === "paint" || ["transform", "perspective"].indexOf(le.willChange) !== -1 || k && le.willChange === "filter" || k && le.filter && le.filter !== "none")
      return ae;
    ae = ae.parentNode;
  }
  return null;
}
function se(e) {
  for (var k = H(e), oe = at(e); oe && Wt(oe) && N$1(oe).position === "static"; )
    oe = at(oe);
  return oe && (C(oe) === "html" || C(oe) === "body" && N$1(oe).position === "static") ? k : oe || Bt(e) || k;
}
function Le(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function fe(e, k, oe) {
  return X$1(e, ve(k, oe));
}
function St(e, k, oe) {
  var re = fe(e, k, oe);
  return re > oe ? oe : re;
}
function st() {
  return { top: 0, right: 0, bottom: 0, left: 0 };
}
function ft(e) {
  return Object.assign({}, st(), e);
}
function ct(e, k) {
  return k.reduce(function(oe, re) {
    return oe[re] = e, oe;
  }, {});
}
var Tt = function(e, k) {
  return e = typeof e == "function" ? e(Object.assign({}, k.rects, { placement: k.placement })) : e, ft(typeof e != "number" ? e : ct(e, G));
};
function Ht(e) {
  var k, oe = e.state, re = e.name, ae = e.options, le = oe.elements.arrow, ie = oe.modifiersData.popperOffsets, ue = q(oe.placement), de = Le(ue), pe = [P$1, W].indexOf(ue) >= 0, Ce = pe ? "height" : "width";
  if (!(!le || !ie)) {
    var _e = Tt(ae.padding, oe), $e = ke(le), Ve = de === "y" ? E$1 : P$1, Ne = de === "y" ? R : W, he = oe.rects.reference[Ce] + oe.rects.reference[de] - ie[de] - oe.rects.popper[Ce], Oe = ie[de] - oe.rects.reference[de], Ie = se(le), qe = Ie ? de === "y" ? Ie.clientHeight || 0 : Ie.clientWidth || 0 : 0, xe = he / 2 - Oe / 2, ze = _e[Ve], At = qe - $e[Ce] - _e[Ne], Fe = qe / 2 - $e[Ce] / 2 + xe, Pt = fe(ze, Fe, At), vn = de;
    oe.modifiersData[re] = (k = {}, k[vn] = Pt, k.centerOffset = Pt - Fe, k);
  }
}
function Ct(e) {
  var k = e.state, oe = e.options, re = oe.element, ae = re === void 0 ? "[data-popper-arrow]" : re;
  ae != null && (typeof ae == "string" && (ae = k.elements.popper.querySelector(ae), !ae) || !it(k.elements.popper, ae) || (k.elements.arrow = ae));
}
var pt = { name: "arrow", enabled: !0, phase: "main", fn: Ht, effect: Ct, requires: ["popperOffsets"], requiresIfExists: ["preventOverflow"] };
function te(e) {
  return e.split("-")[1];
}
var qt = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
function Vt(e) {
  var k = e.x, oe = e.y, re = window, ae = re.devicePixelRatio || 1;
  return { x: Z(k * ae) / ae || 0, y: Z(oe * ae) / ae || 0 };
}
function ut(e) {
  var k, oe = e.popper, re = e.popperRect, ae = e.placement, le = e.variation, ie = e.offsets, ue = e.position, de = e.gpuAcceleration, pe = e.adaptive, Ce = e.roundOffsets, _e = e.isFixed, $e = ie.x, Ve = $e === void 0 ? 0 : $e, Ne = ie.y, he = Ne === void 0 ? 0 : Ne, Oe = typeof Ce == "function" ? Ce({ x: Ve, y: he }) : { x: Ve, y: he };
  Ve = Oe.x, he = Oe.y;
  var Ie = ie.hasOwnProperty("x"), qe = ie.hasOwnProperty("y"), xe = P$1, ze = E$1, At = window;
  if (pe) {
    var Fe = se(oe), Pt = "clientHeight", vn = "clientWidth";
    if (Fe === H(oe) && (Fe = I$1(oe), N$1(Fe).position !== "static" && ue === "absolute" && (Pt = "scrollHeight", vn = "scrollWidth")), Fe = Fe, ae === E$1 || (ae === P$1 || ae === W) && le === J) {
      ze = R;
      var En = _e && Fe === At && At.visualViewport ? At.visualViewport.height : Fe[Pt];
      he -= En - re.height, he *= de ? 1 : -1;
    }
    if (ae === P$1 || (ae === E$1 || ae === R) && le === J) {
      xe = W;
      var Nn = _e && Fe === At && At.visualViewport ? At.visualViewport.width : Fe[vn];
      Ve -= Nn - re.width, Ve *= de ? 1 : -1;
    }
  }
  var Tn = Object.assign({ position: ue }, pe && qt), wn = Ce === !0 ? Vt({ x: Ve, y: he }) : { x: Ve, y: he };
  if (Ve = wn.x, he = wn.y, de) {
    var Lt;
    return Object.assign({}, Tn, (Lt = {}, Lt[ze] = qe ? "0" : "", Lt[xe] = Ie ? "0" : "", Lt.transform = (At.devicePixelRatio || 1) <= 1 ? "translate(" + Ve + "px, " + he + "px)" : "translate3d(" + Ve + "px, " + he + "px, 0)", Lt));
  }
  return Object.assign({}, Tn, (k = {}, k[ze] = qe ? he + "px" : "", k[xe] = Ie ? Ve + "px" : "", k.transform = "", k));
}
function Nt(e) {
  var k = e.state, oe = e.options, re = oe.gpuAcceleration, ae = re === void 0 ? !0 : re, le = oe.adaptive, ie = le === void 0 ? !0 : le, ue = oe.roundOffsets, de = ue === void 0 ? !0 : ue, pe = { placement: q(k.placement), variation: te(k.placement), popper: k.elements.popper, popperRect: k.rects.popper, gpuAcceleration: ae, isFixed: k.options.strategy === "fixed" };
  k.modifiersData.popperOffsets != null && (k.styles.popper = Object.assign({}, k.styles.popper, ut(Object.assign({}, pe, { offsets: k.modifiersData.popperOffsets, position: k.options.strategy, adaptive: ie, roundOffsets: de })))), k.modifiersData.arrow != null && (k.styles.arrow = Object.assign({}, k.styles.arrow, ut(Object.assign({}, pe, { offsets: k.modifiersData.arrow, position: "absolute", adaptive: !1, roundOffsets: de })))), k.attributes.popper = Object.assign({}, k.attributes.popper, { "data-popper-placement": k.placement });
}
var Me = { name: "computeStyles", enabled: !0, phase: "beforeWrite", fn: Nt, data: {} }, ye = { passive: !0 };
function It(e) {
  var k = e.state, oe = e.instance, re = e.options, ae = re.scroll, le = ae === void 0 ? !0 : ae, ie = re.resize, ue = ie === void 0 ? !0 : ie, de = H(k.elements.popper), pe = [].concat(k.scrollParents.reference, k.scrollParents.popper);
  return le && pe.forEach(function(Ce) {
    Ce.addEventListener("scroll", oe.update, ye);
  }), ue && de.addEventListener("resize", oe.update, ye), function() {
    le && pe.forEach(function(Ce) {
      Ce.removeEventListener("scroll", oe.update, ye);
    }), ue && de.removeEventListener("resize", oe.update, ye);
  };
}
var Re = { name: "eventListeners", enabled: !0, phase: "write", fn: function() {
}, effect: It, data: {} }, _t = { left: "right", right: "left", bottom: "top", top: "bottom" };
function be(e) {
  return e.replace(/left|right|bottom|top/g, function(k) {
    return _t[k];
  });
}
var zt = { start: "end", end: "start" };
function lt(e) {
  return e.replace(/start|end/g, function(k) {
    return zt[k];
  });
}
function We(e) {
  var k = H(e), oe = k.pageXOffset, re = k.pageYOffset;
  return { scrollLeft: oe, scrollTop: re };
}
function Be(e) {
  return ee(I$1(e)).left + We(e).scrollLeft;
}
function Ft(e) {
  var k = H(e), oe = I$1(e), re = k.visualViewport, ae = oe.clientWidth, le = oe.clientHeight, ie = 0, ue = 0;
  return re && (ae = re.width, le = re.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (ie = re.offsetLeft, ue = re.offsetTop)), { width: ae, height: le, x: ie + Be(e), y: ue };
}
function Ut(e) {
  var k, oe = I$1(e), re = We(e), ae = (k = e.ownerDocument) == null ? void 0 : k.body, le = X$1(oe.scrollWidth, oe.clientWidth, ae ? ae.scrollWidth : 0, ae ? ae.clientWidth : 0), ie = X$1(oe.scrollHeight, oe.clientHeight, ae ? ae.scrollHeight : 0, ae ? ae.clientHeight : 0), ue = -re.scrollLeft + Be(e), de = -re.scrollTop;
  return N$1(ae || oe).direction === "rtl" && (ue += X$1(oe.clientWidth, ae ? ae.clientWidth : 0) - le), { width: le, height: ie, x: ue, y: de };
}
function Se(e) {
  var k = N$1(e), oe = k.overflow, re = k.overflowX, ae = k.overflowY;
  return /auto|scroll|overlay|hidden/.test(oe + ae + re);
}
function dt(e) {
  return ["html", "body", "#document"].indexOf(C(e)) >= 0 ? e.ownerDocument.body : B(e) && Se(e) ? e : dt(ge(e));
}
function ce(e, k) {
  var oe;
  k === void 0 && (k = []);
  var re = dt(e), ae = re === ((oe = e.ownerDocument) == null ? void 0 : oe.body), le = H(re), ie = ae ? [le].concat(le.visualViewport || [], Se(re) ? re : []) : re, ue = k.concat(ie);
  return ae ? ue : ue.concat(ce(ge(ie)));
}
function Te(e) {
  return Object.assign({}, e, { left: e.x, top: e.y, right: e.x + e.width, bottom: e.y + e.height });
}
function Xt(e) {
  var k = ee(e);
  return k.top = k.top + e.clientTop, k.left = k.left + e.clientLeft, k.bottom = k.top + e.clientHeight, k.right = k.left + e.clientWidth, k.width = e.clientWidth, k.height = e.clientHeight, k.x = k.left, k.y = k.top, k;
}
function ht(e, k) {
  return k === je ? Te(Ft(e)) : Q(k) ? Xt(k) : Te(Ut(I$1(e)));
}
function Yt(e) {
  var k = ce(ge(e)), oe = ["absolute", "fixed"].indexOf(N$1(e).position) >= 0, re = oe && B(e) ? se(e) : e;
  return Q(re) ? k.filter(function(ae) {
    return Q(ae) && it(ae, re) && C(ae) !== "body";
  }) : [];
}
function Gt(e, k, oe) {
  var re = k === "clippingParents" ? Yt(e) : [].concat(k), ae = [].concat(re, [oe]), le = ae[0], ie = ae.reduce(function(ue, de) {
    var pe = ht(e, de);
    return ue.top = X$1(pe.top, ue.top), ue.right = ve(pe.right, ue.right), ue.bottom = ve(pe.bottom, ue.bottom), ue.left = X$1(pe.left, ue.left), ue;
  }, ht(e, le));
  return ie.width = ie.right - ie.left, ie.height = ie.bottom - ie.top, ie.x = ie.left, ie.y = ie.top, ie;
}
function mt(e) {
  var k = e.reference, oe = e.element, re = e.placement, ae = re ? q(re) : null, le = re ? te(re) : null, ie = k.x + k.width / 2 - oe.width / 2, ue = k.y + k.height / 2 - oe.height / 2, de;
  switch (ae) {
    case E$1:
      de = { x: ie, y: k.y - oe.height };
      break;
    case R:
      de = { x: ie, y: k.y + k.height };
      break;
    case W:
      de = { x: k.x + k.width, y: ue };
      break;
    case P$1:
      de = { x: k.x - oe.width, y: ue };
      break;
    default:
      de = { x: k.x, y: k.y };
  }
  var pe = ae ? Le(ae) : null;
  if (pe != null) {
    var Ce = pe === "y" ? "height" : "width";
    switch (le) {
      case U$1:
        de[pe] = de[pe] - (k[Ce] / 2 - oe[Ce] / 2);
        break;
      case J:
        de[pe] = de[pe] + (k[Ce] / 2 - oe[Ce] / 2);
        break;
    }
  }
  return de;
}
function ne(e, k) {
  k === void 0 && (k = {});
  var oe = k, re = oe.placement, ae = re === void 0 ? e.placement : re, le = oe.boundary, ie = le === void 0 ? Xe : le, ue = oe.rootBoundary, de = ue === void 0 ? je : ue, pe = oe.elementContext, Ce = pe === void 0 ? K : pe, _e = oe.altBoundary, $e = _e === void 0 ? !1 : _e, Ve = oe.padding, Ne = Ve === void 0 ? 0 : Ve, he = ft(typeof Ne != "number" ? Ne : ct(Ne, G)), Oe = Ce === K ? Ye : K, Ie = e.rects.popper, qe = e.elements[$e ? Oe : Ce], xe = Gt(Q(qe) ? qe : qe.contextElement || I$1(e.elements.popper), ie, de), ze = ee(e.elements.reference), At = mt({ reference: ze, element: Ie, strategy: "absolute", placement: ae }), Fe = Te(Object.assign({}, Ie, At)), Pt = Ce === K ? Fe : ze, vn = { top: xe.top - Pt.top + he.top, bottom: Pt.bottom - xe.bottom + he.bottom, left: xe.left - Pt.left + he.left, right: Pt.right - xe.right + he.right }, En = e.modifiersData.offset;
  if (Ce === K && En) {
    var Nn = En[ae];
    Object.keys(vn).forEach(function(Tn) {
      var wn = [W, R].indexOf(Tn) >= 0 ? 1 : -1, Lt = [E$1, R].indexOf(Tn) >= 0 ? "y" : "x";
      vn[Tn] += Nn[Lt] * wn;
    });
  }
  return vn;
}
function Jt(e, k) {
  k === void 0 && (k = {});
  var oe = k, re = oe.placement, ae = oe.boundary, le = oe.rootBoundary, ie = oe.padding, ue = oe.flipVariations, de = oe.allowedAutoPlacements, pe = de === void 0 ? Ee : de, Ce = te(re), _e = Ce ? ue ? De : De.filter(function(Ne) {
    return te(Ne) === Ce;
  }) : G, $e = _e.filter(function(Ne) {
    return pe.indexOf(Ne) >= 0;
  });
  $e.length === 0 && ($e = _e);
  var Ve = $e.reduce(function(Ne, he) {
    return Ne[he] = ne(e, { placement: he, boundary: ae, rootBoundary: le, padding: ie })[q(he)], Ne;
  }, {});
  return Object.keys(Ve).sort(function(Ne, he) {
    return Ve[Ne] - Ve[he];
  });
}
function Kt(e) {
  if (q(e) === me)
    return [];
  var k = be(e);
  return [lt(e), k, lt(k)];
}
function Qt(e) {
  var k = e.state, oe = e.options, re = e.name;
  if (!k.modifiersData[re]._skip) {
    for (var ae = oe.mainAxis, le = ae === void 0 ? !0 : ae, ie = oe.altAxis, ue = ie === void 0 ? !0 : ie, de = oe.fallbackPlacements, pe = oe.padding, Ce = oe.boundary, _e = oe.rootBoundary, $e = oe.altBoundary, Ve = oe.flipVariations, Ne = Ve === void 0 ? !0 : Ve, he = oe.allowedAutoPlacements, Oe = k.options.placement, Ie = q(Oe), qe = Ie === Oe, xe = de || (qe || !Ne ? [be(Oe)] : Kt(Oe)), ze = [Oe].concat(xe).reduce(function(Dn, Rn) {
      return Dn.concat(q(Rn) === me ? Jt(k, { placement: Rn, boundary: Ce, rootBoundary: _e, padding: pe, flipVariations: Ne, allowedAutoPlacements: he }) : Rn);
    }, []), At = k.rects.reference, Fe = k.rects.popper, Pt = /* @__PURE__ */ new Map(), vn = !0, En = ze[0], Nn = 0; Nn < ze.length; Nn++) {
      var Tn = ze[Nn], wn = q(Tn), Lt = te(Tn) === U$1, Dt = [E$1, R].indexOf(wn) >= 0, Cn = Dt ? "width" : "height", jt = ne(k, { placement: Tn, boundary: Ce, rootBoundary: _e, altBoundary: $e, padding: pe }), bn = Dt ? Lt ? W : P$1 : Lt ? R : E$1;
      At[Cn] > Fe[Cn] && (bn = be(bn));
      var kt = be(bn), Et = [];
      if (le && Et.push(jt[wn] <= 0), ue && Et.push(jt[bn] <= 0, jt[kt] <= 0), Et.every(function(Dn) {
        return Dn;
      })) {
        En = Tn, vn = !1;
        break;
      }
      Pt.set(Tn, Et);
    }
    if (vn)
      for (var _n = Ne ? 3 : 1, Pn = function(Dn) {
        var Rn = ze.find(function(Fn) {
          var kn = Pt.get(Fn);
          if (kn)
            return kn.slice(0, Dn).every(function(An) {
              return An;
            });
        });
        if (Rn)
          return En = Rn, "break";
      }, hn = _n; hn > 0; hn--) {
        var On = Pn(hn);
        if (On === "break")
          break;
      }
    k.placement !== En && (k.modifiersData[re]._skip = !0, k.placement = En, k.reset = !0);
  }
}
var vt = { name: "flip", enabled: !0, phase: "main", fn: Qt, requiresIfExists: ["offset"], data: { _skip: !1 } };
function gt(e, k, oe) {
  return oe === void 0 && (oe = { x: 0, y: 0 }), { top: e.top - k.height - oe.y, right: e.right - k.width + oe.x, bottom: e.bottom - k.height + oe.y, left: e.left - k.width - oe.x };
}
function yt(e) {
  return [E$1, W, R, P$1].some(function(k) {
    return e[k] >= 0;
  });
}
function Zt(e) {
  var k = e.state, oe = e.name, re = k.rects.reference, ae = k.rects.popper, le = k.modifiersData.preventOverflow, ie = ne(k, { elementContext: "reference" }), ue = ne(k, { altBoundary: !0 }), de = gt(ie, re), pe = gt(ue, ae, le), Ce = yt(de), _e = yt(pe);
  k.modifiersData[oe] = { referenceClippingOffsets: de, popperEscapeOffsets: pe, isReferenceHidden: Ce, hasPopperEscaped: _e }, k.attributes.popper = Object.assign({}, k.attributes.popper, { "data-popper-reference-hidden": Ce, "data-popper-escaped": _e });
}
var bt = { name: "hide", enabled: !0, phase: "main", requiresIfExists: ["preventOverflow"], fn: Zt };
function en(e, k, oe) {
  var re = q(e), ae = [P$1, E$1].indexOf(re) >= 0 ? -1 : 1, le = typeof oe == "function" ? oe(Object.assign({}, k, { placement: e })) : oe, ie = le[0], ue = le[1];
  return ie = ie || 0, ue = (ue || 0) * ae, [P$1, W].indexOf(re) >= 0 ? { x: ue, y: ie } : { x: ie, y: ue };
}
function tn(e) {
  var k = e.state, oe = e.options, re = e.name, ae = oe.offset, le = ae === void 0 ? [0, 0] : ae, ie = Ee.reduce(function(Ce, _e) {
    return Ce[_e] = en(_e, k.rects, le), Ce;
  }, {}), ue = ie[k.placement], de = ue.x, pe = ue.y;
  k.modifiersData.popperOffsets != null && (k.modifiersData.popperOffsets.x += de, k.modifiersData.popperOffsets.y += pe), k.modifiersData[re] = ie;
}
var wt = { name: "offset", enabled: !0, phase: "main", requires: ["popperOffsets"], fn: tn };
function nn(e) {
  var k = e.state, oe = e.name;
  k.modifiersData[oe] = mt({ reference: k.rects.reference, element: k.rects.popper, strategy: "absolute", placement: k.placement });
}
var He = { name: "popperOffsets", enabled: !0, phase: "read", fn: nn, data: {} };
function rn(e) {
  return e === "x" ? "y" : "x";
}
function on(e) {
  var k = e.state, oe = e.options, re = e.name, ae = oe.mainAxis, le = ae === void 0 ? !0 : ae, ie = oe.altAxis, ue = ie === void 0 ? !1 : ie, de = oe.boundary, pe = oe.rootBoundary, Ce = oe.altBoundary, _e = oe.padding, $e = oe.tether, Ve = $e === void 0 ? !0 : $e, Ne = oe.tetherOffset, he = Ne === void 0 ? 0 : Ne, Oe = ne(k, { boundary: de, rootBoundary: pe, padding: _e, altBoundary: Ce }), Ie = q(k.placement), qe = te(k.placement), xe = !qe, ze = Le(Ie), At = rn(ze), Fe = k.modifiersData.popperOffsets, Pt = k.rects.reference, vn = k.rects.popper, En = typeof he == "function" ? he(Object.assign({}, k.rects, { placement: k.placement })) : he, Nn = typeof En == "number" ? { mainAxis: En, altAxis: En } : Object.assign({ mainAxis: 0, altAxis: 0 }, En), Tn = k.modifiersData.offset ? k.modifiersData.offset[k.placement] : null, wn = { x: 0, y: 0 };
  if (Fe) {
    if (le) {
      var Lt, Dt = ze === "y" ? E$1 : P$1, Cn = ze === "y" ? R : W, jt = ze === "y" ? "height" : "width", bn = Fe[ze], kt = bn + Oe[Dt], Et = bn - Oe[Cn], _n = Ve ? -vn[jt] / 2 : 0, Pn = qe === U$1 ? Pt[jt] : vn[jt], hn = qe === U$1 ? -vn[jt] : -Pt[jt], On = k.elements.arrow, Dn = Ve && On ? ke(On) : { width: 0, height: 0 }, Rn = k.modifiersData["arrow#persistent"] ? k.modifiersData["arrow#persistent"].padding : st(), Fn = Rn[Dt], kn = Rn[Cn], An = fe(0, Pt[jt], Dn[jt]), Vn = xe ? Pt[jt] / 2 - _n - An - Fn - Nn.mainAxis : Pn - An - Fn - Nn.mainAxis, Bn = xe ? -Pt[jt] / 2 + _n + An + kn + Nn.mainAxis : hn + An + kn + Nn.mainAxis, Wn = k.elements.arrow && se(k.elements.arrow), Yn = Wn ? ze === "y" ? Wn.clientTop || 0 : Wn.clientLeft || 0 : 0, Xn = (Lt = Tn == null ? void 0 : Tn[ze]) != null ? Lt : 0, eo = bn + Vn - Xn - Yn, Gn = bn + Bn - Xn, no = fe(Ve ? ve(kt, eo) : kt, bn, Ve ? X$1(Et, Gn) : Et);
      Fe[ze] = no, wn[ze] = no - bn;
    }
    if (ue) {
      var oo, zn = ze === "x" ? E$1 : P$1, Hn = ze === "x" ? R : W, qn = Fe[At], Zn = At === "y" ? "height" : "width", lo = qn + Oe[zn], ao = qn - Oe[Hn], In = [E$1, P$1].indexOf(Ie) !== -1, Jn = (oo = Tn == null ? void 0 : Tn[At]) != null ? oo : 0, Qn = In ? lo : qn - Pt[Zn] - vn[Zn] - Jn + Nn.altAxis, ro = In ? qn + Pt[Zn] + vn[Zn] - Jn - Nn.altAxis : ao, $n = Ve && In ? St(Qn, qn, ro) : fe(Ve ? Qn : lo, qn, Ve ? ro : ao);
      Fe[At] = $n, wn[At] = $n - qn;
    }
    k.modifiersData[re] = wn;
  }
}
var xt = { name: "preventOverflow", enabled: !0, phase: "main", fn: on, requiresIfExists: ["offset"] };
function an(e) {
  return { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop };
}
function sn(e) {
  return e === H(e) || !B(e) ? We(e) : an(e);
}
function fn(e) {
  var k = e.getBoundingClientRect(), oe = Z(k.width) / e.offsetWidth || 1, re = Z(k.height) / e.offsetHeight || 1;
  return oe !== 1 || re !== 1;
}
function cn(e, k, oe) {
  oe === void 0 && (oe = !1);
  var re = B(k), ae = B(k) && fn(k), le = I$1(k), ie = ee(e, ae), ue = { scrollLeft: 0, scrollTop: 0 }, de = { x: 0, y: 0 };
  return (re || !re && !oe) && ((C(k) !== "body" || Se(le)) && (ue = sn(k)), B(k) ? (de = ee(k, !0), de.x += k.clientLeft, de.y += k.clientTop) : le && (de.x = Be(le))), { x: ie.left + ue.scrollLeft - de.x, y: ie.top + ue.scrollTop - de.y, width: ie.width, height: ie.height };
}
function pn(e) {
  var k = /* @__PURE__ */ new Map(), oe = /* @__PURE__ */ new Set(), re = [];
  e.forEach(function(le) {
    k.set(le.name, le);
  });
  function ae(le) {
    oe.add(le.name);
    var ie = [].concat(le.requires || [], le.requiresIfExists || []);
    ie.forEach(function(ue) {
      if (!oe.has(ue)) {
        var de = k.get(ue);
        de && ae(de);
      }
    }), re.push(le);
  }
  return e.forEach(function(le) {
    oe.has(le.name) || ae(le);
  }), re;
}
function un(e) {
  var k = pn(e);
  return ot.reduce(function(oe, re) {
    return oe.concat(k.filter(function(ae) {
      return ae.phase === re;
    }));
  }, []);
}
function ln(e) {
  var k;
  return function() {
    return k || (k = new Promise(function(oe) {
      Promise.resolve().then(function() {
        k = void 0, oe(e());
      });
    })), k;
  };
}
function dn(e) {
  var k = e.reduce(function(oe, re) {
    var ae = oe[re.name];
    return oe[re.name] = ae ? Object.assign({}, ae, re, { options: Object.assign({}, ae.options, re.options), data: Object.assign({}, ae.data, re.data) }) : re, oe;
  }, {});
  return Object.keys(k).map(function(oe) {
    return k[oe];
  });
}
var Ot = { placement: "bottom", modifiers: [], strategy: "absolute" };
function $t() {
  for (var e = arguments.length, k = new Array(e), oe = 0; oe < e; oe++)
    k[oe] = arguments[oe];
  return !k.some(function(re) {
    return !(re && typeof re.getBoundingClientRect == "function");
  });
}
function we(e) {
  e === void 0 && (e = {});
  var k = e, oe = k.defaultModifiers, re = oe === void 0 ? [] : oe, ae = k.defaultOptions, le = ae === void 0 ? Ot : ae;
  return function(ie, ue, de) {
    de === void 0 && (de = le);
    var pe = { placement: "bottom", orderedModifiers: [], options: Object.assign({}, Ot, le), modifiersData: {}, elements: { reference: ie, popper: ue }, attributes: {}, styles: {} }, Ce = [], _e = !1, $e = { state: pe, setOptions: function(he) {
      var Oe = typeof he == "function" ? he(pe.options) : he;
      Ne(), pe.options = Object.assign({}, le, pe.options, Oe), pe.scrollParents = { reference: Q(ie) ? ce(ie) : ie.contextElement ? ce(ie.contextElement) : [], popper: ce(ue) };
      var Ie = un(dn([].concat(re, pe.options.modifiers)));
      return pe.orderedModifiers = Ie.filter(function(qe) {
        return qe.enabled;
      }), Ve(), $e.update();
    }, forceUpdate: function() {
      if (!_e) {
        var he = pe.elements, Oe = he.reference, Ie = he.popper;
        if ($t(Oe, Ie)) {
          pe.rects = { reference: cn(Oe, se(Ie), pe.options.strategy === "fixed"), popper: ke(Ie) }, pe.reset = !1, pe.placement = pe.options.placement, pe.orderedModifiers.forEach(function(vn) {
            return pe.modifiersData[vn.name] = Object.assign({}, vn.data);
          });
          for (var qe = 0; qe < pe.orderedModifiers.length; qe++) {
            if (pe.reset === !0) {
              pe.reset = !1, qe = -1;
              continue;
            }
            var xe = pe.orderedModifiers[qe], ze = xe.fn, At = xe.options, Fe = At === void 0 ? {} : At, Pt = xe.name;
            typeof ze == "function" && (pe = ze({ state: pe, options: Fe, name: Pt, instance: $e }) || pe);
          }
        }
      }
    }, update: ln(function() {
      return new Promise(function(he) {
        $e.forceUpdate(), he(pe);
      });
    }), destroy: function() {
      Ne(), _e = !0;
    } };
    if (!$t(ie, ue))
      return $e;
    $e.setOptions(de).then(function(he) {
      !_e && de.onFirstUpdate && de.onFirstUpdate(he);
    });
    function Ve() {
      pe.orderedModifiers.forEach(function(he) {
        var Oe = he.name, Ie = he.options, qe = Ie === void 0 ? {} : Ie, xe = he.effect;
        if (typeof xe == "function") {
          var ze = xe({ state: pe, name: Oe, instance: $e, options: qe }), At = function() {
          };
          Ce.push(ze || At);
        }
      });
    }
    function Ne() {
      Ce.forEach(function(he) {
        return he();
      }), Ce = [];
    }
    return $e;
  };
}
we();
var mn = [Re, He, Me, Ae];
we({ defaultModifiers: mn });
var gn = [Re, He, Me, Ae, wt, vt, xt, pt, bt], yn = we({ defaultModifiers: gn });
const obtainAllFocusableElements = (e) => {
  const k = [], oe = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (re) => {
      const ae = re.tagName === "INPUT" && re.type === "hidden";
      return re.disabled || re.hidden || ae ? NodeFilter.FILTER_SKIP : re.tabIndex >= 0 || re === document.activeElement ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; oe.nextNode(); )
    k.push(oe.currentNode);
  return k;
}, getVisibleElement = (e, k) => {
  for (const oe of e)
    if (!isHidden(oe, k))
      return oe;
}, isHidden = (e, k) => {
  if (process.env.NODE_ENV === "test")
    return !1;
  if (getComputedStyle(e).visibility === "hidden")
    return !0;
  for (; e; ) {
    if (k && e === k)
      return !1;
    if (getComputedStyle(e).display === "none")
      return !0;
    e = e.parentElement;
  }
  return !1;
}, getEdges = (e) => {
  const k = obtainAllFocusableElements(e), oe = getVisibleElement(k, e), re = getVisibleElement(k.reverse(), e);
  return [oe, re];
}, isSelectable = (e) => e instanceof HTMLInputElement && "select" in e, tryFocus = (e, k) => {
  if (e && e.focus) {
    const oe = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== oe && isSelectable(e) && k && e.select();
  }
};
function removeFromStack(e, k) {
  const oe = [...e], re = e.indexOf(k);
  return re !== -1 && oe.splice(re, 1), oe;
}
const createFocusableStack = () => {
  let e = [];
  return {
    push: (re) => {
      const ae = e[0];
      ae && re !== ae && ae.pause(), e = removeFromStack(e, re), e.unshift(re);
    },
    remove: (re) => {
      var ae, le;
      e = removeFromStack(e, re), (le = (ae = e[0]) == null ? void 0 : ae.resume) == null || le.call(ae);
    }
  };
}, focusFirstDescendant = (e, k = !1) => {
  const oe = document.activeElement;
  for (const re of e)
    if (tryFocus(re, k), document.activeElement !== oe)
      return;
}, focusableStack = createFocusableStack(), FOCUS_AFTER_TRAPPED = "focus-trap.focus-after-trapped", FOCUS_AFTER_RELEASED = "focus-trap.focus-after-released", FOCUS_AFTER_TRAPPED_OPTS = {
  cancelable: !0,
  bubbles: !1
}, ON_TRAP_FOCUS_EVT = "focusAfterTrapped", ON_RELEASE_FOCUS_EVT = "focusAfterReleased", FOCUS_TRAP_INJECTION_KEY = Symbol("elFocusTrap"), _sfc_main$R = defineComponent({
  name: "ElFocusTrap",
  inheritAttrs: !1,
  props: {
    loop: Boolean,
    trapped: Boolean,
    focusTrapEl: Object,
    focusStartEl: {
      type: [Object, String],
      default: "first"
    }
  },
  emits: [
    ON_TRAP_FOCUS_EVT,
    ON_RELEASE_FOCUS_EVT,
    "focusin",
    "focusout",
    "focusout-prevented",
    "release-requested"
  ],
  setup(e, { emit: k }) {
    const oe = ref();
    let re, ae;
    useEscapeKeydown((Ve) => {
      e.trapped && !le.paused && k("release-requested", Ve);
    });
    const le = {
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    }, ie = (Ve) => {
      if (!e.loop && !e.trapped || le.paused)
        return;
      const { key: Ne, altKey: he, ctrlKey: Oe, metaKey: Ie, currentTarget: qe, shiftKey: xe } = Ve, { loop: ze } = e, At = Ne === EVENT_CODE.tab && !he && !Oe && !Ie, Fe = document.activeElement;
      if (At && Fe) {
        const Pt = qe, [vn, En] = getEdges(Pt);
        vn && En ? !xe && Fe === En ? (Ve.preventDefault(), ze && tryFocus(vn, !0), k("focusout-prevented")) : xe && [vn, Pt].includes(Fe) && (Ve.preventDefault(), ze && tryFocus(En, !0), k("focusout-prevented")) : Fe === Pt && (Ve.preventDefault(), k("focusout-prevented"));
      }
    };
    provide(FOCUS_TRAP_INJECTION_KEY, {
      focusTrapRef: oe,
      onKeydown: ie
    }), watch(() => e.focusTrapEl, (Ve) => {
      Ve && (oe.value = Ve);
    }, { immediate: !0 }), watch([oe], ([Ve], [Ne]) => {
      Ve && (Ve.addEventListener("keydown", ie), Ve.addEventListener("focusin", pe), Ve.addEventListener("focusout", Ce)), Ne && (Ne.removeEventListener("keydown", ie), Ne.removeEventListener("focusin", pe), Ne.removeEventListener("focusout", Ce));
    });
    const ue = (Ve) => {
      k(ON_TRAP_FOCUS_EVT, Ve);
    }, de = (Ve) => k(ON_RELEASE_FOCUS_EVT, Ve), pe = (Ve) => {
      const Ne = unref(oe);
      if (!Ne)
        return;
      const he = Ve.target, Oe = he && Ne.contains(he);
      Oe && k("focusin", Ve), !le.paused && e.trapped && (Oe ? ae = he : tryFocus(ae, !0));
    }, Ce = (Ve) => {
      const Ne = unref(oe);
      if (!(le.paused || !Ne))
        if (e.trapped) {
          const he = Ve.relatedTarget;
          !isNil(he) && !Ne.contains(he) && setTimeout(() => {
            !le.paused && e.trapped && tryFocus(ae, !0);
          }, 0);
        } else {
          const he = Ve.target;
          he && Ne.contains(he) || k("focusout", Ve);
        }
    };
    async function _e() {
      await nextTick();
      const Ve = unref(oe);
      if (Ve) {
        focusableStack.push(le);
        const Ne = document.activeElement;
        if (re = Ne, !Ve.contains(Ne)) {
          const Oe = new Event(FOCUS_AFTER_TRAPPED, FOCUS_AFTER_TRAPPED_OPTS);
          Ve.addEventListener(FOCUS_AFTER_TRAPPED, ue), Ve.dispatchEvent(Oe), Oe.defaultPrevented || nextTick(() => {
            let Ie = e.focusStartEl;
            isString(Ie) || (tryFocus(Ie), document.activeElement !== Ie && (Ie = "first")), Ie === "first" && focusFirstDescendant(obtainAllFocusableElements(Ve), !0), (document.activeElement === Ne || Ie === "container") && tryFocus(Ve);
          });
        }
      }
    }
    function $e() {
      const Ve = unref(oe);
      if (Ve) {
        Ve.removeEventListener(FOCUS_AFTER_TRAPPED, ue);
        const Ne = new Event(FOCUS_AFTER_RELEASED, FOCUS_AFTER_TRAPPED_OPTS);
        Ve.addEventListener(FOCUS_AFTER_RELEASED, de), Ve.dispatchEvent(Ne), Ne.defaultPrevented || tryFocus(re != null ? re : document.body, !0), Ve.removeEventListener(FOCUS_AFTER_RELEASED, ue), focusableStack.remove(le);
      }
    }
    return onMounted(() => {
      e.trapped && _e(), watch(() => e.trapped, (Ve) => {
        Ve ? _e() : $e();
      });
    }), onBeforeUnmount(() => {
      e.trapped && $e();
    }), {
      onKeydown: ie
    };
  }
});
function _sfc_render$h(e, k, oe, re, ae, le) {
  return renderSlot(e.$slots, "default", { handleKeydown: e.onKeydown });
}
var ElFocusTrap = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["render", _sfc_render$h], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/focus-trap/src/focus-trap.vue"]]);
const POSITIONING_STRATEGIES = ["fixed", "absolute"], usePopperCoreConfigProps = buildProps({
  boundariesPadding: {
    type: Number,
    default: 0
  },
  fallbackPlacements: {
    type: definePropType(Array),
    default: () => []
  },
  gpuAcceleration: {
    type: Boolean,
    default: !0
  },
  offset: {
    type: Number,
    default: 12
  },
  placement: {
    type: String,
    values: Ee,
    default: "bottom"
  },
  popperOptions: {
    type: definePropType(Object),
    default: () => ({})
  },
  strategy: {
    type: String,
    values: POSITIONING_STRATEGIES,
    default: "absolute"
  }
}), usePopperContentProps = buildProps({
  ...usePopperCoreConfigProps,
  id: String,
  style: { type: definePropType([String, Array, Object]) },
  className: { type: definePropType([String, Array, Object]) },
  effect: {
    type: String,
    default: "dark"
  },
  visible: Boolean,
  enterable: {
    type: Boolean,
    default: !0
  },
  pure: Boolean,
  focusOnShow: {
    type: Boolean,
    default: !1
  },
  trapping: {
    type: Boolean,
    default: !1
  },
  popperClass: {
    type: definePropType([String, Array, Object])
  },
  popperStyle: {
    type: definePropType([String, Array, Object])
  },
  referenceEl: {
    type: definePropType(Object)
  },
  triggerTargetEl: {
    type: definePropType(Object)
  },
  stopPopperMouseEvent: {
    type: Boolean,
    default: !0
  },
  ariaLabel: {
    type: String,
    default: void 0
  },
  virtualTriggering: Boolean,
  zIndex: Number
}), usePopperContentEmits = [
  "mouseenter",
  "mouseleave",
  "focus",
  "blur",
  "close"
], buildPopperOptions = (e, k) => {
  const { placement: oe, strategy: re, popperOptions: ae } = e, le = {
    placement: oe,
    strategy: re,
    ...ae,
    modifiers: genModifiers(e)
  };
  return attachArrow(le, k), deriveExtraModifiers(le, ae == null ? void 0 : ae.modifiers), le;
}, unwrapMeasurableEl = (e) => {
  if (!!isClient$1)
    return unrefElement(e);
};
function genModifiers(e) {
  const { offset: k, gpuAcceleration: oe, fallbackPlacements: re } = e;
  return [
    {
      name: "offset",
      options: {
        offset: [0, k != null ? k : 12]
      }
    },
    {
      name: "preventOverflow",
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    },
    {
      name: "flip",
      options: {
        padding: 5,
        fallbackPlacements: re != null ? re : []
      }
    },
    {
      name: "computeStyles",
      options: {
        gpuAcceleration: oe,
        adaptive: oe
      }
    }
  ];
}
function attachArrow(e, { arrowEl: k, arrowOffset: oe }) {
  e.modifiers.push({
    name: "arrow",
    options: {
      element: k,
      padding: oe != null ? oe : 5
    }
  });
}
function deriveExtraModifiers(e, k) {
  k && (e.modifiers = [...e.modifiers, ...k != null ? k : []]);
}
const __default__$n = {
  name: "ElPopperContent"
}, _sfc_main$Q = /* @__PURE__ */ defineComponent({
  ...__default__$n,
  props: usePopperContentProps,
  emits: usePopperContentEmits,
  setup(e, { expose: k, emit: oe }) {
    const re = e, { popperInstanceRef: ae, contentRef: le, triggerRef: ie, role: ue } = inject(POPPER_INJECTION_KEY, void 0), de = inject(formItemContextKey, void 0), { nextZIndex: pe } = useZIndex(), Ce = useNamespace("popper"), _e = ref(), $e = ref("first"), Ve = ref(), Ne = ref();
    provide(POPPER_CONTENT_INJECTION_KEY, {
      arrowRef: Ve,
      arrowOffset: Ne
    }), de && (de.addInputId || de.removeInputId) && provide(formItemContextKey, {
      ...de,
      addInputId: NOOP,
      removeInputId: NOOP
    });
    const he = ref(re.zIndex || pe()), Oe = ref(!1);
    let Ie;
    const qe = computed(() => unwrapMeasurableEl(re.referenceEl) || unref(ie)), xe = computed(() => [{ zIndex: unref(he) }, re.popperStyle]), ze = computed(() => [
      Ce.b(),
      Ce.is("pure", re.pure),
      Ce.is(re.effect),
      re.popperClass
    ]), At = computed(() => ue && ue.value === "dialog" ? "false" : void 0), Fe = ({ referenceEl: Dt, popperContentEl: Cn, arrowEl: jt }) => {
      const bn = buildPopperOptions(re, {
        arrowEl: jt,
        arrowOffset: unref(Ne)
      });
      return yn(Dt, Cn, bn);
    }, Pt = (Dt = !0) => {
      var Cn;
      (Cn = unref(ae)) == null || Cn.update(), Dt && (he.value = re.zIndex || pe());
    }, vn = () => {
      var Dt, Cn;
      const jt = { name: "eventListeners", enabled: re.visible };
      (Cn = (Dt = unref(ae)) == null ? void 0 : Dt.setOptions) == null || Cn.call(Dt, (bn) => ({
        ...bn,
        modifiers: [...bn.modifiers || [], jt]
      })), Pt(!1), re.visible && re.focusOnShow ? Oe.value = !0 : re.visible === !1 && (Oe.value = !1);
    }, En = () => {
      oe("focus");
    }, Nn = () => {
      $e.value = "first", oe("blur");
    }, Tn = (Dt) => {
      var Cn;
      re.visible && !Oe.value && (Dt.target && ($e.value = Dt.target), Oe.value = !0, Dt.relatedTarget && ((Cn = Dt.relatedTarget) == null || Cn.focus()));
    }, wn = () => {
      re.trapping || (Oe.value = !1);
    }, Lt = () => {
      Oe.value = !1, oe("close");
    };
    return onMounted(() => {
      let Dt;
      watch(qe, (Cn) => {
        var jt;
        Dt == null || Dt();
        const bn = unref(ae);
        if ((jt = bn == null ? void 0 : bn.destroy) == null || jt.call(bn), Cn) {
          const kt = unref(_e);
          le.value = kt, ae.value = Fe({
            referenceEl: Cn,
            popperContentEl: kt,
            arrowEl: unref(Ve)
          }), Dt = watch(() => Cn.getBoundingClientRect(), () => Pt(), {
            immediate: !0
          });
        } else
          ae.value = void 0;
      }, {
        immediate: !0
      }), watch(() => re.triggerTargetEl, (Cn, jt) => {
        Ie == null || Ie(), Ie = void 0;
        const bn = unref(Cn || _e.value), kt = unref(jt || _e.value);
        if (isElement(bn)) {
          const { ariaLabel: Et, id: _n } = toRefs(re);
          Ie = watch([ue, Et, At, _n], (Pn) => {
            ["role", "aria-label", "aria-modal", "id"].forEach((hn, On) => {
              isNil(Pn[On]) ? bn.removeAttribute(hn) : bn.setAttribute(hn, Pn[On]);
            });
          }, { immediate: !0 });
        }
        isElement(kt) && ["role", "aria-label", "aria-modal", "id"].forEach((Et) => {
          kt.removeAttribute(Et);
        });
      }, { immediate: !0 }), watch(() => re.visible, vn, { immediate: !0 }), watch(() => buildPopperOptions(re, {
        arrowEl: unref(Ve),
        arrowOffset: unref(Ne)
      }), (Cn) => {
        var jt;
        return (jt = ae.value) == null ? void 0 : jt.setOptions(Cn);
      });
    }), onBeforeUnmount(() => {
      Ie == null || Ie(), Ie = void 0;
    }), k({
      popperContentRef: _e,
      popperInstanceRef: ae,
      updatePopper: Pt,
      contentStyle: xe
    }), (Dt, Cn) => (openBlock(), createElementBlock("div", {
      ref_key: "popperContentRef",
      ref: _e,
      style: normalizeStyle(unref(xe)),
      class: normalizeClass(unref(ze)),
      tabindex: "-1",
      onMouseenter: Cn[0] || (Cn[0] = (jt) => Dt.$emit("mouseenter", jt)),
      onMouseleave: Cn[1] || (Cn[1] = (jt) => Dt.$emit("mouseleave", jt))
    }, [
      createVNode(unref(ElFocusTrap), {
        trapped: Oe.value,
        "trap-on-focus-in": !0,
        "focus-trap-el": _e.value,
        "focus-start-el": $e.value,
        onFocusAfterTrapped: En,
        onFocusAfterReleased: Nn,
        onFocusin: Tn,
        onFocusoutPrevented: wn,
        onReleaseRequested: Lt
      }, {
        default: withCtx(() => [
          renderSlot(Dt.$slots, "default")
        ]),
        _: 3
      }, 8, ["trapped", "focus-trap-el", "focus-start-el"])
    ], 38));
  }
});
var ElPopperContent = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/content.vue"]]);
const ElPopper = withInstall(Popper), ns = useNamespace("tooltip"), useTooltipContentProps = buildProps({
  ...useDelayedToggleProps,
  ...usePopperContentProps,
  appendTo: {
    type: definePropType([String, Object]),
    default: POPPER_CONTAINER_SELECTOR
  },
  content: {
    type: String,
    default: ""
  },
  rawContent: {
    type: Boolean,
    default: !1
  },
  persistent: Boolean,
  ariaLabel: String,
  visible: {
    type: definePropType(Boolean),
    default: null
  },
  transition: {
    type: String,
    default: `${ns.namespace.value}-fade-in-linear`
  },
  teleported: {
    type: Boolean,
    default: !0
  },
  disabled: {
    type: Boolean
  }
}), useTooltipTriggerProps = buildProps({
  ...usePopperTriggerProps,
  disabled: Boolean,
  trigger: {
    type: definePropType([String, Array]),
    default: "hover"
  },
  triggerKeys: {
    type: definePropType(Array),
    default: () => [EVENT_CODE.enter, EVENT_CODE.space]
  }
}), useTooltipProps = buildProps({
  openDelay: {
    type: Number
  },
  visibleArrow: {
    type: Boolean,
    default: void 0
  },
  hideAfter: {
    type: Number,
    default: 200
  },
  showArrow: {
    type: Boolean,
    default: !0
  }
}), TOOLTIP_INJECTION_KEY = Symbol("elTooltip"), _sfc_main$P = defineComponent({
  name: "ElTooltipContent",
  components: {
    ElPopperContent
  },
  inheritAttrs: !1,
  props: useTooltipContentProps,
  setup(e) {
    const k = ref(null), oe = ref(!1), re = ref(!1), ae = ref(!1), le = ref(!1), {
      controlled: ie,
      id: ue,
      open: de,
      trigger: pe,
      onClose: Ce,
      onOpen: _e,
      onShow: $e,
      onHide: Ve,
      onBeforeShow: Ne,
      onBeforeHide: he
    } = inject(TOOLTIP_INJECTION_KEY, void 0), Oe = computed(() => process.env.NODE_ENV === "test" ? !0 : e.persistent);
    onBeforeUnmount(() => {
      le.value = !0;
    });
    const Ie = computed(() => unref(Oe) ? !0 : unref(de)), qe = computed(() => e.disabled ? !1 : unref(de)), xe = computed(() => {
      var Dt;
      return (Dt = e.style) != null ? Dt : {};
    }), ze = computed(() => !unref(de)), At = () => {
      Ve();
    }, Fe = () => {
      if (unref(ie))
        return !0;
    }, Pt = composeEventHandlers(Fe, () => {
      e.enterable && unref(pe) === "hover" && _e();
    }), vn = composeEventHandlers(Fe, () => {
      unref(pe) === "hover" && Ce();
    }), En = () => {
      var Dt, Cn;
      (Cn = (Dt = k.value) == null ? void 0 : Dt.updatePopper) == null || Cn.call(Dt), Ne == null || Ne();
    }, Nn = () => {
      he == null || he();
    }, Tn = () => {
      $e(), Lt = onClickOutside(computed(() => {
        var Dt;
        return (Dt = k.value) == null ? void 0 : Dt.popperContentRef;
      }), () => {
        if (unref(ie))
          return;
        unref(pe) !== "hover" && Ce();
      });
    }, wn = () => {
      e.virtualTriggering || Ce();
    };
    let Lt;
    return watch(() => unref(de), (Dt) => {
      Dt || Lt == null || Lt();
    }, {
      flush: "post"
    }), {
      ariaHidden: ze,
      entering: re,
      leaving: ae,
      id: ue,
      intermediateOpen: oe,
      contentStyle: xe,
      contentRef: k,
      destroyed: le,
      shouldRender: Ie,
      shouldShow: qe,
      onClose: Ce,
      open: de,
      onAfterShow: Tn,
      onBeforeEnter: En,
      onBeforeLeave: Nn,
      onContentEnter: Pt,
      onContentLeave: vn,
      onTransitionLeave: At,
      onBlur: wn
    };
  }
});
function _sfc_render$g(e, k, oe, re, ae, le) {
  const ie = resolveComponent("el-popper-content");
  return openBlock(), createBlock(Teleport, {
    disabled: !e.teleported,
    to: e.appendTo
  }, [
    createVNode(Transition, {
      name: e.transition,
      onAfterLeave: e.onTransitionLeave,
      onBeforeEnter: e.onBeforeEnter,
      onAfterEnter: e.onAfterShow,
      onBeforeLeave: e.onBeforeLeave
    }, {
      default: withCtx(() => [
        e.shouldRender ? withDirectives((openBlock(), createBlock(ie, mergeProps({
          key: 0,
          id: e.id,
          ref: "contentRef"
        }, e.$attrs, {
          "aria-label": e.ariaLabel,
          "aria-hidden": e.ariaHidden,
          "boundaries-padding": e.boundariesPadding,
          "fallback-placements": e.fallbackPlacements,
          "gpu-acceleration": e.gpuAcceleration,
          offset: e.offset,
          placement: e.placement,
          "popper-options": e.popperOptions,
          strategy: e.strategy,
          effect: e.effect,
          enterable: e.enterable,
          pure: e.pure,
          "popper-class": e.popperClass,
          "popper-style": [e.popperStyle, e.contentStyle],
          "reference-el": e.referenceEl,
          "trigger-target-el": e.triggerTargetEl,
          visible: e.shouldShow,
          "z-index": e.zIndex,
          onMouseenter: e.onContentEnter,
          onMouseleave: e.onContentLeave,
          onBlur: e.onBlur,
          onClose: e.onClose
        }), {
          default: withCtx(() => [
            createCommentVNode(" Workaround bug #6378 "),
            e.destroyed ? createCommentVNode("v-if", !0) : renderSlot(e.$slots, "default", { key: 0 })
          ]),
          _: 3
        }, 16, ["id", "aria-label", "aria-hidden", "boundaries-padding", "fallback-placements", "gpu-acceleration", "offset", "placement", "popper-options", "strategy", "effect", "enterable", "pure", "popper-class", "popper-style", "reference-el", "trigger-target-el", "visible", "z-index", "onMouseenter", "onMouseleave", "onBlur", "onClose"])), [
          [vShow, e.shouldShow]
        ]) : createCommentVNode("v-if", !0)
      ]),
      _: 3
    }, 8, ["name", "onAfterLeave", "onBeforeEnter", "onAfterEnter", "onBeforeLeave"])
  ], 8, ["disabled", "to"]);
}
var ElTooltipContent = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["render", _sfc_render$g], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/content.vue"]]);
const isTriggerType = (e, k) => isArray(e) ? e.includes(k) : e === k, whenTrigger = (e, k, oe) => (re) => {
  isTriggerType(unref(e), k) && oe(re);
}, _sfc_main$O = defineComponent({
  name: "ElTooltipTrigger",
  components: {
    ElPopperTrigger
  },
  props: useTooltipTriggerProps,
  setup(e) {
    const k = useNamespace("tooltip"), { controlled: oe, id: re, open: ae, onOpen: le, onClose: ie, onToggle: ue } = inject(TOOLTIP_INJECTION_KEY, void 0), de = ref(null), pe = () => {
      if (unref(oe) || e.disabled)
        return !0;
    }, Ce = toRef(e, "trigger"), _e = composeEventHandlers(pe, whenTrigger(Ce, "hover", le)), $e = composeEventHandlers(pe, whenTrigger(Ce, "hover", ie)), Ve = composeEventHandlers(pe, whenTrigger(Ce, "click", (qe) => {
      qe.button === 0 && ue(qe);
    })), Ne = composeEventHandlers(pe, whenTrigger(Ce, "focus", le)), he = composeEventHandlers(pe, whenTrigger(Ce, "focus", ie)), Oe = composeEventHandlers(pe, whenTrigger(Ce, "contextmenu", (qe) => {
      qe.preventDefault(), ue(qe);
    })), Ie = composeEventHandlers(pe, (qe) => {
      const { code: xe } = qe;
      e.triggerKeys.includes(xe) && (qe.preventDefault(), ue(qe));
    });
    return {
      onBlur: he,
      onContextMenu: Oe,
      onFocus: Ne,
      onMouseenter: _e,
      onMouseleave: $e,
      onClick: Ve,
      onKeydown: Ie,
      open: ae,
      id: re,
      triggerRef: de,
      ns: k
    };
  }
});
function _sfc_render$f(e, k, oe, re, ae, le) {
  const ie = resolveComponent("el-popper-trigger");
  return openBlock(), createBlock(ie, {
    id: e.id,
    "virtual-ref": e.virtualRef,
    open: e.open,
    "virtual-triggering": e.virtualTriggering,
    class: normalizeClass(e.ns.e("trigger")),
    onBlur: e.onBlur,
    onClick: e.onClick,
    onContextmenu: e.onContextMenu,
    onFocus: e.onFocus,
    onMouseenter: e.onMouseenter,
    onMouseleave: e.onMouseleave,
    onKeydown: e.onKeydown
  }, {
    default: withCtx(() => [
      renderSlot(e.$slots, "default")
    ]),
    _: 3
  }, 8, ["id", "virtual-ref", "open", "virtual-triggering", "class", "onBlur", "onClick", "onContextmenu", "onFocus", "onMouseenter", "onMouseleave", "onKeydown"]);
}
var ElTooltipTrigger = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["render", _sfc_render$f], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/trigger.vue"]]);
const { useModelToggleProps, useModelToggle, useModelToggleEmits } = createModelToggleComposable("visible"), _sfc_main$N = defineComponent({
  name: "ElTooltip",
  components: {
    ElPopper,
    ElPopperArrow,
    ElTooltipContent,
    ElTooltipTrigger
  },
  props: {
    ...usePopperProps,
    ...useModelToggleProps,
    ...useTooltipContentProps,
    ...useTooltipTriggerProps,
    ...usePopperArrowProps,
    ...useTooltipProps
  },
  emits: [
    ...useModelToggleEmits,
    "before-show",
    "before-hide",
    "show",
    "hide",
    "open",
    "close"
  ],
  setup(e, { emit: k }) {
    usePopperContainer();
    const oe = computed(() => (isUndefined(e.openDelay) || debugWarn("ElTooltip", "open-delay is about to be deprecated in the next major version, please use `show-after` instead"), e.openDelay || e.showAfter)), re = computed(() => (isUndefined(e.visibleArrow) || debugWarn("ElTooltip", "`visible-arrow` is about to be deprecated in the next major version, please use `show-arrow` instead"), isBoolean(e.visibleArrow) ? e.visibleArrow : e.showArrow)), ae = useId(), le = ref(null), ie = ref(null), ue = () => {
      var Ie;
      const qe = unref(le);
      qe && ((Ie = qe.popperInstanceRef) == null || Ie.update());
    }, de = ref(!1), pe = ref(void 0), { show: Ce, hide: _e, hasUpdateHandler: $e } = useModelToggle({
      indicator: de,
      toggleReason: pe
    }), { onOpen: Ve, onClose: Ne } = useDelayedToggle({
      showAfter: oe,
      hideAfter: toRef(e, "hideAfter"),
      open: Ce,
      close: _e
    }), he = computed(() => isBoolean(e.visible) && !$e.value);
    provide(TOOLTIP_INJECTION_KEY, {
      controlled: he,
      id: ae,
      open: readonly(de),
      trigger: toRef(e, "trigger"),
      onOpen: (Ie) => {
        Ve(Ie);
      },
      onClose: (Ie) => {
        Ne(Ie);
      },
      onToggle: (Ie) => {
        unref(de) ? Ne(Ie) : Ve(Ie);
      },
      onShow: () => {
        k("show", pe.value);
      },
      onHide: () => {
        k("hide", pe.value);
      },
      onBeforeShow: () => {
        k("before-show", pe.value);
      },
      onBeforeHide: () => {
        k("before-hide", pe.value);
      },
      updatePopper: ue
    }), watch(() => e.disabled, (Ie) => {
      Ie && de.value && (de.value = !1);
    });
    const Oe = () => {
      var Ie, qe;
      const xe = (qe = (Ie = ie.value) == null ? void 0 : Ie.contentRef) == null ? void 0 : qe.popperContentRef;
      return xe && xe.contains(document.activeElement);
    };
    return onDeactivated(() => de.value && _e()), {
      compatShowAfter: oe,
      compatShowArrow: re,
      popperRef: le,
      contentRef: ie,
      open: de,
      hide: _e,
      isFocusInsideContent: Oe,
      updatePopper: ue,
      onOpen: Ve,
      onClose: Ne
    };
  }
}), _hoisted_1$u = ["innerHTML"], _hoisted_2$k = { key: 1 };
function _sfc_render$e(e, k, oe, re, ae, le) {
  const ie = resolveComponent("el-tooltip-trigger"), ue = resolveComponent("el-popper-arrow"), de = resolveComponent("el-tooltip-content"), pe = resolveComponent("el-popper");
  return openBlock(), createBlock(pe, {
    ref: "popperRef",
    role: e.role
  }, {
    default: withCtx(() => [
      createVNode(ie, {
        disabled: e.disabled,
        trigger: e.trigger,
        "trigger-keys": e.triggerKeys,
        "virtual-ref": e.virtualRef,
        "virtual-triggering": e.virtualTriggering
      }, {
        default: withCtx(() => [
          e.$slots.default ? renderSlot(e.$slots, "default", { key: 0 }) : createCommentVNode("v-if", !0)
        ]),
        _: 3
      }, 8, ["disabled", "trigger", "trigger-keys", "virtual-ref", "virtual-triggering"]),
      createVNode(de, {
        ref: "contentRef",
        "aria-label": e.ariaLabel,
        "boundaries-padding": e.boundariesPadding,
        content: e.content,
        disabled: e.disabled,
        effect: e.effect,
        enterable: e.enterable,
        "fallback-placements": e.fallbackPlacements,
        "hide-after": e.hideAfter,
        "gpu-acceleration": e.gpuAcceleration,
        offset: e.offset,
        persistent: e.persistent,
        "popper-class": e.popperClass,
        "popper-style": e.popperStyle,
        placement: e.placement,
        "popper-options": e.popperOptions,
        pure: e.pure,
        "raw-content": e.rawContent,
        "reference-el": e.referenceEl,
        "trigger-target-el": e.triggerTargetEl,
        "show-after": e.compatShowAfter,
        strategy: e.strategy,
        teleported: e.teleported,
        transition: e.transition,
        "virtual-triggering": e.virtualTriggering,
        "z-index": e.zIndex,
        "append-to": e.appendTo
      }, {
        default: withCtx(() => [
          renderSlot(e.$slots, "content", {}, () => [
            e.rawContent ? (openBlock(), createElementBlock("span", {
              key: 0,
              innerHTML: e.content
            }, null, 8, _hoisted_1$u)) : (openBlock(), createElementBlock("span", _hoisted_2$k, toDisplayString(e.content), 1))
          ]),
          e.compatShowArrow ? (openBlock(), createBlock(ue, {
            key: 0,
            "arrow-offset": e.arrowOffset
          }, null, 8, ["arrow-offset"])) : createCommentVNode("v-if", !0)
        ]),
        _: 3
      }, 8, ["aria-label", "boundaries-padding", "content", "disabled", "effect", "enterable", "fallback-placements", "hide-after", "gpu-acceleration", "offset", "persistent", "popper-class", "popper-style", "placement", "popper-options", "pure", "raw-content", "reference-el", "trigger-target-el", "show-after", "strategy", "teleported", "transition", "virtual-triggering", "z-index", "append-to"])
    ]),
    _: 3
  }, 8, ["role"]);
}
var Tooltip = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["render", _sfc_render$e], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/tooltip.vue"]]);
const ElTooltip = withInstall(Tooltip), autocompleteProps = buildProps({
  valueKey: {
    type: String,
    default: "value"
  },
  modelValue: {
    type: [String, Number],
    default: ""
  },
  debounce: {
    type: Number,
    default: 300
  },
  placement: {
    type: definePropType(String),
    values: [
      "top",
      "top-start",
      "top-end",
      "bottom",
      "bottom-start",
      "bottom-end"
    ],
    default: "bottom-start"
  },
  fetchSuggestions: {
    type: definePropType([Function, Array]),
    default: NOOP
  },
  popperClass: {
    type: String,
    default: ""
  },
  triggerOnFocus: {
    type: Boolean,
    default: !0
  },
  selectWhenUnmatched: {
    type: Boolean,
    default: !1
  },
  hideLoading: {
    type: Boolean,
    default: !1
  },
  label: {
    type: String
  },
  teleported: useTooltipContentProps.teleported,
  highlightFirstItem: {
    type: Boolean,
    default: !1
  },
  fitInputWidth: {
    type: Boolean,
    default: !1
  }
}), autocompleteEmits = {
  [UPDATE_MODEL_EVENT]: (e) => isString(e),
  [INPUT_EVENT]: (e) => isString(e),
  [CHANGE_EVENT]: (e) => isString(e),
  focus: (e) => e instanceof FocusEvent,
  blur: (e) => e instanceof FocusEvent,
  clear: () => !0,
  select: (e) => isObject$1(e)
}, _hoisted_1$t = ["aria-expanded", "aria-owns"], _hoisted_2$j = { key: 0 }, _hoisted_3$b = ["id", "aria-selected", "onClick"], __default__$m = {
  name: "ElAutocomplete",
  inheritAttrs: !1
}, _sfc_main$M = /* @__PURE__ */ defineComponent({
  ...__default__$m,
  props: autocompleteProps,
  emits: autocompleteEmits,
  setup(e, { expose: k, emit: oe }) {
    const re = e, ae = "ElAutocomplete", le = useAttrs$1(), ie = useAttrs$2(), ue = useDisabled$1(), de = useNamespace("autocomplete"), pe = ref(), Ce = ref(), _e = ref(), $e = ref();
    let Ve = !1;
    const Ne = ref([]), he = ref(-1), Oe = ref(""), Ie = ref(!1), qe = ref(!1), xe = ref(!1), ze = computed(() => de.b(String(generateId()))), At = computed(() => ie.style), Fe = computed(() => (Ne.value.length > 0 || xe.value) && Ie.value), Pt = computed(() => !re.hideLoading && xe.value), vn = computed(() => pe.value ? Array.from(pe.value.$el.querySelectorAll("input")) : []), En = async () => {
      await nextTick(), Fe.value && (Oe.value = `${pe.value.$el.offsetWidth}px`);
    }, Nn = () => {
      Ve = !0;
    }, Tn = () => {
      Ve = !1, he.value = -1;
    }, Lt = debounce(async (kn) => {
      if (qe.value)
        return;
      const An = (Vn) => {
        xe.value = !1, !qe.value && (isArray(Vn) ? (Ne.value = Vn, he.value = re.highlightFirstItem ? 0 : -1) : throwError(ae, "autocomplete suggestions must be an array"));
      };
      if (xe.value = !0, isArray(re.fetchSuggestions))
        An(re.fetchSuggestions);
      else {
        const Vn = await re.fetchSuggestions(kn, An);
        isArray(Vn) && An(Vn);
      }
    }, re.debounce), Dt = (kn) => {
      const An = !!kn;
      if (oe(INPUT_EVENT, kn), oe(UPDATE_MODEL_EVENT, kn), qe.value = !1, Ie.value || (Ie.value = An), !re.triggerOnFocus && !kn) {
        qe.value = !0, Ne.value = [];
        return;
      }
      Lt(kn);
    }, Cn = (kn) => {
      var An;
      ue.value || (((An = kn.target) == null ? void 0 : An.tagName) !== "INPUT" || vn.value.includes(document.activeElement)) && (Ie.value = !0);
    }, jt = (kn) => {
      oe(CHANGE_EVENT, kn);
    }, bn = (kn) => {
      Ve || (Ie.value = !0, oe("focus", kn), re.triggerOnFocus && Lt(String(re.modelValue)));
    }, kt = (kn) => {
      Ve || oe("blur", kn);
    }, Et = () => {
      Ie.value = !1, oe(UPDATE_MODEL_EVENT, ""), oe("clear");
    }, _n = async () => {
      Fe.value && he.value >= 0 && he.value < Ne.value.length ? Rn(Ne.value[he.value]) : re.selectWhenUnmatched && (oe("select", { value: re.modelValue }), Ne.value = [], he.value = -1);
    }, Pn = (kn) => {
      Fe.value && (kn.preventDefault(), kn.stopPropagation(), hn());
    }, hn = () => {
      Ie.value = !1;
    }, On = () => {
      var kn;
      (kn = pe.value) == null || kn.focus();
    }, Dn = () => {
      var kn;
      (kn = pe.value) == null || kn.blur();
    }, Rn = async (kn) => {
      oe(INPUT_EVENT, kn[re.valueKey]), oe(UPDATE_MODEL_EVENT, kn[re.valueKey]), oe("select", kn), Ne.value = [], he.value = -1;
    }, Fn = (kn) => {
      if (!Fe.value || xe.value)
        return;
      if (kn < 0) {
        he.value = -1;
        return;
      }
      kn >= Ne.value.length && (kn = Ne.value.length - 1);
      const An = Ce.value.querySelector(`.${de.be("suggestion", "wrap")}`), Bn = An.querySelectorAll(`.${de.be("suggestion", "list")} li`)[kn], Wn = An.scrollTop, { offsetTop: Yn, scrollHeight: Xn } = Bn;
      Yn + Xn > Wn + An.clientHeight && (An.scrollTop += Xn), Yn < Wn && (An.scrollTop -= Xn), he.value = kn, pe.value.ref.setAttribute("aria-activedescendant", `${ze.value}-item-${he.value}`);
    };
    return onClickOutside($e, () => {
      Fe.value && hn();
    }), onMounted(() => {
      pe.value.ref.setAttribute("role", "textbox"), pe.value.ref.setAttribute("aria-autocomplete", "list"), pe.value.ref.setAttribute("aria-controls", "id"), pe.value.ref.setAttribute("aria-activedescendant", `${ze.value}-item-${he.value}`);
    }), k({
      highlightedIndex: he,
      activated: Ie,
      loading: xe,
      inputRef: pe,
      popperRef: _e,
      suggestions: Ne,
      handleSelect: Rn,
      handleKeyEnter: _n,
      focus: On,
      blur: Dn,
      close: hn,
      highlight: Fn
    }), (kn, An) => (openBlock(), createBlock(unref(ElTooltip), {
      ref_key: "popperRef",
      ref: _e,
      visible: unref(Fe),
      placement: kn.placement,
      "fallback-placements": ["bottom-start", "top-start"],
      "popper-class": [unref(de).e("popper"), kn.popperClass],
      teleported: kn.teleported,
      "gpu-acceleration": !1,
      pure: "",
      "manual-mode": "",
      effect: "light",
      trigger: "click",
      transition: `${unref(de).namespace.value}-zoom-in-top`,
      persistent: "",
      onBeforeShow: En,
      onShow: Nn,
      onHide: Tn
    }, {
      content: withCtx(() => [
        createElementVNode("div", {
          ref_key: "regionRef",
          ref: Ce,
          class: normalizeClass([unref(de).b("suggestion"), unref(de).is("loading", unref(Pt))]),
          style: normalizeStyle({
            [kn.fitInputWidth ? "width" : "minWidth"]: Oe.value,
            outline: "none"
          }),
          role: "region"
        }, [
          createVNode(unref(ElScrollbar), {
            id: unref(ze),
            tag: "ul",
            "wrap-class": unref(de).be("suggestion", "wrap"),
            "view-class": unref(de).be("suggestion", "list"),
            role: "listbox"
          }, {
            default: withCtx(() => [
              unref(Pt) ? (openBlock(), createElementBlock("li", _hoisted_2$j, [
                createVNode(unref(ElIcon), {
                  class: normalizeClass(unref(de).is("loading"))
                }, {
                  default: withCtx(() => [
                    createVNode(unref(loading_default))
                  ]),
                  _: 1
                }, 8, ["class"])
              ])) : (openBlock(!0), createElementBlock(Fragment, { key: 1 }, renderList(Ne.value, (Vn, Bn) => (openBlock(), createElementBlock("li", {
                id: `${unref(ze)}-item-${Bn}`,
                key: Bn,
                class: normalizeClass({ highlighted: he.value === Bn }),
                role: "option",
                "aria-selected": he.value === Bn,
                onClick: (Wn) => Rn(Vn)
              }, [
                renderSlot(kn.$slots, "default", { item: Vn }, () => [
                  createTextVNode(toDisplayString(Vn[kn.valueKey]), 1)
                ])
              ], 10, _hoisted_3$b))), 128))
            ]),
            _: 3
          }, 8, ["id", "wrap-class", "view-class"])
        ], 6)
      ]),
      default: withCtx(() => [
        createElementVNode("div", {
          ref_key: "listboxRef",
          ref: $e,
          class: normalizeClass([unref(de).b(), kn.$attrs.class]),
          style: normalizeStyle(unref(At)),
          role: "combobox",
          "aria-haspopup": "listbox",
          "aria-expanded": unref(Fe),
          "aria-owns": unref(ze)
        }, [
          createVNode(unref(ElInput), mergeProps({
            ref_key: "inputRef",
            ref: pe
          }, unref(le), {
            "model-value": kn.modelValue,
            onInput: Dt,
            onChange: jt,
            onFocus: bn,
            onBlur: kt,
            onClear: Et,
            onKeydown: [
              An[0] || (An[0] = withKeys(withModifiers((Vn) => Fn(he.value - 1), ["prevent"]), ["up"])),
              An[1] || (An[1] = withKeys(withModifiers((Vn) => Fn(he.value + 1), ["prevent"]), ["down"])),
              withKeys(_n, ["enter"]),
              withKeys(hn, ["tab"]),
              withKeys(Pn, ["esc"])
            ],
            onMousedown: Cn
          }), createSlots({ _: 2 }, [
            kn.$slots.prepend ? {
              name: "prepend",
              fn: withCtx(() => [
                renderSlot(kn.$slots, "prepend")
              ])
            } : void 0,
            kn.$slots.append ? {
              name: "append",
              fn: withCtx(() => [
                renderSlot(kn.$slots, "append")
              ])
            } : void 0,
            kn.$slots.prefix ? {
              name: "prefix",
              fn: withCtx(() => [
                renderSlot(kn.$slots, "prefix")
              ])
            } : void 0,
            kn.$slots.suffix ? {
              name: "suffix",
              fn: withCtx(() => [
                renderSlot(kn.$slots, "suffix")
              ])
            } : void 0
          ]), 1040, ["model-value", "onKeydown"])
        ], 14, _hoisted_1$t)
      ]),
      _: 3
    }, 8, ["visible", "placement", "popper-class", "teleported", "transition"]));
  }
});
var Autocomplete = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/autocomplete/src/autocomplete.vue"]]);
const ElAutocomplete = withInstall(Autocomplete), buttonTypes = [
  "default",
  "primary",
  "success",
  "warning",
  "info",
  "danger",
  "text",
  ""
], buttonNativeTypes = ["button", "submit", "reset"], buttonProps = buildProps({
  size: useSizeProp,
  disabled: Boolean,
  type: {
    type: String,
    values: buttonTypes,
    default: ""
  },
  icon: {
    type: iconPropType,
    default: ""
  },
  nativeType: {
    type: String,
    values: buttonNativeTypes,
    default: "button"
  },
  loading: Boolean,
  loadingIcon: {
    type: iconPropType,
    default: () => loading_default
  },
  plain: Boolean,
  text: Boolean,
  link: Boolean,
  bg: Boolean,
  autofocus: Boolean,
  round: Boolean,
  circle: Boolean,
  color: String,
  dark: Boolean,
  autoInsertSpace: {
    type: Boolean,
    default: void 0
  }
}), buttonEmits = {
  click: (e) => e instanceof MouseEvent
};
function bound01(e, k) {
  isOnePointZero(e) && (e = "100%");
  var oe = isPercentage(e);
  return e = k === 360 ? e : Math.min(k, Math.max(0, parseFloat(e))), oe && (e = parseInt(String(e * k), 10) / 100), Math.abs(e - k) < 1e-6 ? 1 : (k === 360 ? e = (e < 0 ? e % k + k : e % k) / parseFloat(String(k)) : e = e % k / parseFloat(String(k)), e);
}
function clamp01(e) {
  return Math.min(1, Math.max(0, e));
}
function isOnePointZero(e) {
  return typeof e == "string" && e.indexOf(".") !== -1 && parseFloat(e) === 1;
}
function isPercentage(e) {
  return typeof e == "string" && e.indexOf("%") !== -1;
}
function boundAlpha(e) {
  return e = parseFloat(e), (isNaN(e) || e < 0 || e > 1) && (e = 1), e;
}
function convertToPercentage(e) {
  return e <= 1 ? "".concat(Number(e) * 100, "%") : e;
}
function pad2(e) {
  return e.length === 1 ? "0" + e : String(e);
}
function rgbToRgb(e, k, oe) {
  return {
    r: bound01(e, 255) * 255,
    g: bound01(k, 255) * 255,
    b: bound01(oe, 255) * 255
  };
}
function rgbToHsl(e, k, oe) {
  e = bound01(e, 255), k = bound01(k, 255), oe = bound01(oe, 255);
  var re = Math.max(e, k, oe), ae = Math.min(e, k, oe), le = 0, ie = 0, ue = (re + ae) / 2;
  if (re === ae)
    ie = 0, le = 0;
  else {
    var de = re - ae;
    switch (ie = ue > 0.5 ? de / (2 - re - ae) : de / (re + ae), re) {
      case e:
        le = (k - oe) / de + (k < oe ? 6 : 0);
        break;
      case k:
        le = (oe - e) / de + 2;
        break;
      case oe:
        le = (e - k) / de + 4;
        break;
    }
    le /= 6;
  }
  return { h: le, s: ie, l: ue };
}
function hue2rgb(e, k, oe) {
  return oe < 0 && (oe += 1), oe > 1 && (oe -= 1), oe < 1 / 6 ? e + (k - e) * (6 * oe) : oe < 1 / 2 ? k : oe < 2 / 3 ? e + (k - e) * (2 / 3 - oe) * 6 : e;
}
function hslToRgb(e, k, oe) {
  var re, ae, le;
  if (e = bound01(e, 360), k = bound01(k, 100), oe = bound01(oe, 100), k === 0)
    ae = oe, le = oe, re = oe;
  else {
    var ie = oe < 0.5 ? oe * (1 + k) : oe + k - oe * k, ue = 2 * oe - ie;
    re = hue2rgb(ue, ie, e + 1 / 3), ae = hue2rgb(ue, ie, e), le = hue2rgb(ue, ie, e - 1 / 3);
  }
  return { r: re * 255, g: ae * 255, b: le * 255 };
}
function rgbToHsv(e, k, oe) {
  e = bound01(e, 255), k = bound01(k, 255), oe = bound01(oe, 255);
  var re = Math.max(e, k, oe), ae = Math.min(e, k, oe), le = 0, ie = re, ue = re - ae, de = re === 0 ? 0 : ue / re;
  if (re === ae)
    le = 0;
  else {
    switch (re) {
      case e:
        le = (k - oe) / ue + (k < oe ? 6 : 0);
        break;
      case k:
        le = (oe - e) / ue + 2;
        break;
      case oe:
        le = (e - k) / ue + 4;
        break;
    }
    le /= 6;
  }
  return { h: le, s: de, v: ie };
}
function hsvToRgb(e, k, oe) {
  e = bound01(e, 360) * 6, k = bound01(k, 100), oe = bound01(oe, 100);
  var re = Math.floor(e), ae = e - re, le = oe * (1 - k), ie = oe * (1 - ae * k), ue = oe * (1 - (1 - ae) * k), de = re % 6, pe = [oe, ie, le, le, ue, oe][de], Ce = [ue, oe, oe, ie, le, le][de], _e = [le, le, ue, oe, oe, ie][de];
  return { r: pe * 255, g: Ce * 255, b: _e * 255 };
}
function rgbToHex(e, k, oe, re) {
  var ae = [
    pad2(Math.round(e).toString(16)),
    pad2(Math.round(k).toString(16)),
    pad2(Math.round(oe).toString(16))
  ];
  return re && ae[0].startsWith(ae[0].charAt(1)) && ae[1].startsWith(ae[1].charAt(1)) && ae[2].startsWith(ae[2].charAt(1)) ? ae[0].charAt(0) + ae[1].charAt(0) + ae[2].charAt(0) : ae.join("");
}
function rgbaToHex(e, k, oe, re, ae) {
  var le = [
    pad2(Math.round(e).toString(16)),
    pad2(Math.round(k).toString(16)),
    pad2(Math.round(oe).toString(16)),
    pad2(convertDecimalToHex(re))
  ];
  return ae && le[0].startsWith(le[0].charAt(1)) && le[1].startsWith(le[1].charAt(1)) && le[2].startsWith(le[2].charAt(1)) && le[3].startsWith(le[3].charAt(1)) ? le[0].charAt(0) + le[1].charAt(0) + le[2].charAt(0) + le[3].charAt(0) : le.join("");
}
function convertDecimalToHex(e) {
  return Math.round(parseFloat(e) * 255).toString(16);
}
function convertHexToDecimal(e) {
  return parseIntFromHex(e) / 255;
}
function parseIntFromHex(e) {
  return parseInt(e, 16);
}
function numberInputToObject(e) {
  return {
    r: e >> 16,
    g: (e & 65280) >> 8,
    b: e & 255
  };
}
var names = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  goldenrod: "#daa520",
  gold: "#ffd700",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavenderblush: "#fff0f5",
  lavender: "#e6e6fa",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};
function inputToRGB(e) {
  var k = { r: 0, g: 0, b: 0 }, oe = 1, re = null, ae = null, le = null, ie = !1, ue = !1;
  return typeof e == "string" && (e = stringInputToObject(e)), typeof e == "object" && (isValidCSSUnit(e.r) && isValidCSSUnit(e.g) && isValidCSSUnit(e.b) ? (k = rgbToRgb(e.r, e.g, e.b), ie = !0, ue = String(e.r).substr(-1) === "%" ? "prgb" : "rgb") : isValidCSSUnit(e.h) && isValidCSSUnit(e.s) && isValidCSSUnit(e.v) ? (re = convertToPercentage(e.s), ae = convertToPercentage(e.v), k = hsvToRgb(e.h, re, ae), ie = !0, ue = "hsv") : isValidCSSUnit(e.h) && isValidCSSUnit(e.s) && isValidCSSUnit(e.l) && (re = convertToPercentage(e.s), le = convertToPercentage(e.l), k = hslToRgb(e.h, re, le), ie = !0, ue = "hsl"), Object.prototype.hasOwnProperty.call(e, "a") && (oe = e.a)), oe = boundAlpha(oe), {
    ok: ie,
    format: e.format || ue,
    r: Math.min(255, Math.max(k.r, 0)),
    g: Math.min(255, Math.max(k.g, 0)),
    b: Math.min(255, Math.max(k.b, 0)),
    a: oe
  };
}
var CSS_INTEGER = "[-\\+]?\\d+%?", CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?", CSS_UNIT = "(?:".concat(CSS_NUMBER, ")|(?:").concat(CSS_INTEGER, ")"), PERMISSIVE_MATCH3 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?"), PERMISSIVE_MATCH4 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?"), matchers = {
  CSS_UNIT: new RegExp(CSS_UNIT),
  rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
  rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
  hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
  hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
  hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
  hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
};
function stringInputToObject(e) {
  if (e = e.trim().toLowerCase(), e.length === 0)
    return !1;
  var k = !1;
  if (names[e])
    e = names[e], k = !0;
  else if (e === "transparent")
    return { r: 0, g: 0, b: 0, a: 0, format: "name" };
  var oe = matchers.rgb.exec(e);
  return oe ? { r: oe[1], g: oe[2], b: oe[3] } : (oe = matchers.rgba.exec(e), oe ? { r: oe[1], g: oe[2], b: oe[3], a: oe[4] } : (oe = matchers.hsl.exec(e), oe ? { h: oe[1], s: oe[2], l: oe[3] } : (oe = matchers.hsla.exec(e), oe ? { h: oe[1], s: oe[2], l: oe[3], a: oe[4] } : (oe = matchers.hsv.exec(e), oe ? { h: oe[1], s: oe[2], v: oe[3] } : (oe = matchers.hsva.exec(e), oe ? { h: oe[1], s: oe[2], v: oe[3], a: oe[4] } : (oe = matchers.hex8.exec(e), oe ? {
    r: parseIntFromHex(oe[1]),
    g: parseIntFromHex(oe[2]),
    b: parseIntFromHex(oe[3]),
    a: convertHexToDecimal(oe[4]),
    format: k ? "name" : "hex8"
  } : (oe = matchers.hex6.exec(e), oe ? {
    r: parseIntFromHex(oe[1]),
    g: parseIntFromHex(oe[2]),
    b: parseIntFromHex(oe[3]),
    format: k ? "name" : "hex"
  } : (oe = matchers.hex4.exec(e), oe ? {
    r: parseIntFromHex(oe[1] + oe[1]),
    g: parseIntFromHex(oe[2] + oe[2]),
    b: parseIntFromHex(oe[3] + oe[3]),
    a: convertHexToDecimal(oe[4] + oe[4]),
    format: k ? "name" : "hex8"
  } : (oe = matchers.hex3.exec(e), oe ? {
    r: parseIntFromHex(oe[1] + oe[1]),
    g: parseIntFromHex(oe[2] + oe[2]),
    b: parseIntFromHex(oe[3] + oe[3]),
    format: k ? "name" : "hex"
  } : !1)))))))));
}
function isValidCSSUnit(e) {
  return Boolean(matchers.CSS_UNIT.exec(String(e)));
}
var TinyColor = function() {
  function e(k, oe) {
    k === void 0 && (k = ""), oe === void 0 && (oe = {});
    var re;
    if (k instanceof e)
      return k;
    typeof k == "number" && (k = numberInputToObject(k)), this.originalInput = k;
    var ae = inputToRGB(k);
    this.originalInput = k, this.r = ae.r, this.g = ae.g, this.b = ae.b, this.a = ae.a, this.roundA = Math.round(100 * this.a) / 100, this.format = (re = oe.format) !== null && re !== void 0 ? re : ae.format, this.gradientType = oe.gradientType, this.r < 1 && (this.r = Math.round(this.r)), this.g < 1 && (this.g = Math.round(this.g)), this.b < 1 && (this.b = Math.round(this.b)), this.isValid = ae.ok;
  }
  return e.prototype.isDark = function() {
    return this.getBrightness() < 128;
  }, e.prototype.isLight = function() {
    return !this.isDark();
  }, e.prototype.getBrightness = function() {
    var k = this.toRgb();
    return (k.r * 299 + k.g * 587 + k.b * 114) / 1e3;
  }, e.prototype.getLuminance = function() {
    var k = this.toRgb(), oe, re, ae, le = k.r / 255, ie = k.g / 255, ue = k.b / 255;
    return le <= 0.03928 ? oe = le / 12.92 : oe = Math.pow((le + 0.055) / 1.055, 2.4), ie <= 0.03928 ? re = ie / 12.92 : re = Math.pow((ie + 0.055) / 1.055, 2.4), ue <= 0.03928 ? ae = ue / 12.92 : ae = Math.pow((ue + 0.055) / 1.055, 2.4), 0.2126 * oe + 0.7152 * re + 0.0722 * ae;
  }, e.prototype.getAlpha = function() {
    return this.a;
  }, e.prototype.setAlpha = function(k) {
    return this.a = boundAlpha(k), this.roundA = Math.round(100 * this.a) / 100, this;
  }, e.prototype.toHsv = function() {
    var k = rgbToHsv(this.r, this.g, this.b);
    return { h: k.h * 360, s: k.s, v: k.v, a: this.a };
  }, e.prototype.toHsvString = function() {
    var k = rgbToHsv(this.r, this.g, this.b), oe = Math.round(k.h * 360), re = Math.round(k.s * 100), ae = Math.round(k.v * 100);
    return this.a === 1 ? "hsv(".concat(oe, ", ").concat(re, "%, ").concat(ae, "%)") : "hsva(".concat(oe, ", ").concat(re, "%, ").concat(ae, "%, ").concat(this.roundA, ")");
  }, e.prototype.toHsl = function() {
    var k = rgbToHsl(this.r, this.g, this.b);
    return { h: k.h * 360, s: k.s, l: k.l, a: this.a };
  }, e.prototype.toHslString = function() {
    var k = rgbToHsl(this.r, this.g, this.b), oe = Math.round(k.h * 360), re = Math.round(k.s * 100), ae = Math.round(k.l * 100);
    return this.a === 1 ? "hsl(".concat(oe, ", ").concat(re, "%, ").concat(ae, "%)") : "hsla(".concat(oe, ", ").concat(re, "%, ").concat(ae, "%, ").concat(this.roundA, ")");
  }, e.prototype.toHex = function(k) {
    return k === void 0 && (k = !1), rgbToHex(this.r, this.g, this.b, k);
  }, e.prototype.toHexString = function(k) {
    return k === void 0 && (k = !1), "#" + this.toHex(k);
  }, e.prototype.toHex8 = function(k) {
    return k === void 0 && (k = !1), rgbaToHex(this.r, this.g, this.b, this.a, k);
  }, e.prototype.toHex8String = function(k) {
    return k === void 0 && (k = !1), "#" + this.toHex8(k);
  }, e.prototype.toRgb = function() {
    return {
      r: Math.round(this.r),
      g: Math.round(this.g),
      b: Math.round(this.b),
      a: this.a
    };
  }, e.prototype.toRgbString = function() {
    var k = Math.round(this.r), oe = Math.round(this.g), re = Math.round(this.b);
    return this.a === 1 ? "rgb(".concat(k, ", ").concat(oe, ", ").concat(re, ")") : "rgba(".concat(k, ", ").concat(oe, ", ").concat(re, ", ").concat(this.roundA, ")");
  }, e.prototype.toPercentageRgb = function() {
    var k = function(oe) {
      return "".concat(Math.round(bound01(oe, 255) * 100), "%");
    };
    return {
      r: k(this.r),
      g: k(this.g),
      b: k(this.b),
      a: this.a
    };
  }, e.prototype.toPercentageRgbString = function() {
    var k = function(oe) {
      return Math.round(bound01(oe, 255) * 100);
    };
    return this.a === 1 ? "rgb(".concat(k(this.r), "%, ").concat(k(this.g), "%, ").concat(k(this.b), "%)") : "rgba(".concat(k(this.r), "%, ").concat(k(this.g), "%, ").concat(k(this.b), "%, ").concat(this.roundA, ")");
  }, e.prototype.toName = function() {
    if (this.a === 0)
      return "transparent";
    if (this.a < 1)
      return !1;
    for (var k = "#" + rgbToHex(this.r, this.g, this.b, !1), oe = 0, re = Object.entries(names); oe < re.length; oe++) {
      var ae = re[oe], le = ae[0], ie = ae[1];
      if (k === ie)
        return le;
    }
    return !1;
  }, e.prototype.toString = function(k) {
    var oe = Boolean(k);
    k = k != null ? k : this.format;
    var re = !1, ae = this.a < 1 && this.a >= 0, le = !oe && ae && (k.startsWith("hex") || k === "name");
    return le ? k === "name" && this.a === 0 ? this.toName() : this.toRgbString() : (k === "rgb" && (re = this.toRgbString()), k === "prgb" && (re = this.toPercentageRgbString()), (k === "hex" || k === "hex6") && (re = this.toHexString()), k === "hex3" && (re = this.toHexString(!0)), k === "hex4" && (re = this.toHex8String(!0)), k === "hex8" && (re = this.toHex8String()), k === "name" && (re = this.toName()), k === "hsl" && (re = this.toHslString()), k === "hsv" && (re = this.toHsvString()), re || this.toHexString());
  }, e.prototype.toNumber = function() {
    return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
  }, e.prototype.clone = function() {
    return new e(this.toString());
  }, e.prototype.lighten = function(k) {
    k === void 0 && (k = 10);
    var oe = this.toHsl();
    return oe.l += k / 100, oe.l = clamp01(oe.l), new e(oe);
  }, e.prototype.brighten = function(k) {
    k === void 0 && (k = 10);
    var oe = this.toRgb();
    return oe.r = Math.max(0, Math.min(255, oe.r - Math.round(255 * -(k / 100)))), oe.g = Math.max(0, Math.min(255, oe.g - Math.round(255 * -(k / 100)))), oe.b = Math.max(0, Math.min(255, oe.b - Math.round(255 * -(k / 100)))), new e(oe);
  }, e.prototype.darken = function(k) {
    k === void 0 && (k = 10);
    var oe = this.toHsl();
    return oe.l -= k / 100, oe.l = clamp01(oe.l), new e(oe);
  }, e.prototype.tint = function(k) {
    return k === void 0 && (k = 10), this.mix("white", k);
  }, e.prototype.shade = function(k) {
    return k === void 0 && (k = 10), this.mix("black", k);
  }, e.prototype.desaturate = function(k) {
    k === void 0 && (k = 10);
    var oe = this.toHsl();
    return oe.s -= k / 100, oe.s = clamp01(oe.s), new e(oe);
  }, e.prototype.saturate = function(k) {
    k === void 0 && (k = 10);
    var oe = this.toHsl();
    return oe.s += k / 100, oe.s = clamp01(oe.s), new e(oe);
  }, e.prototype.greyscale = function() {
    return this.desaturate(100);
  }, e.prototype.spin = function(k) {
    var oe = this.toHsl(), re = (oe.h + k) % 360;
    return oe.h = re < 0 ? 360 + re : re, new e(oe);
  }, e.prototype.mix = function(k, oe) {
    oe === void 0 && (oe = 50);
    var re = this.toRgb(), ae = new e(k).toRgb(), le = oe / 100, ie = {
      r: (ae.r - re.r) * le + re.r,
      g: (ae.g - re.g) * le + re.g,
      b: (ae.b - re.b) * le + re.b,
      a: (ae.a - re.a) * le + re.a
    };
    return new e(ie);
  }, e.prototype.analogous = function(k, oe) {
    k === void 0 && (k = 6), oe === void 0 && (oe = 30);
    var re = this.toHsl(), ae = 360 / oe, le = [this];
    for (re.h = (re.h - (ae * k >> 1) + 720) % 360; --k; )
      re.h = (re.h + ae) % 360, le.push(new e(re));
    return le;
  }, e.prototype.complement = function() {
    var k = this.toHsl();
    return k.h = (k.h + 180) % 360, new e(k);
  }, e.prototype.monochromatic = function(k) {
    k === void 0 && (k = 6);
    for (var oe = this.toHsv(), re = oe.h, ae = oe.s, le = oe.v, ie = [], ue = 1 / k; k--; )
      ie.push(new e({ h: re, s: ae, v: le })), le = (le + ue) % 1;
    return ie;
  }, e.prototype.splitcomplement = function() {
    var k = this.toHsl(), oe = k.h;
    return [
      this,
      new e({ h: (oe + 72) % 360, s: k.s, l: k.l }),
      new e({ h: (oe + 216) % 360, s: k.s, l: k.l })
    ];
  }, e.prototype.onBackground = function(k) {
    var oe = this.toRgb(), re = new e(k).toRgb();
    return new e({
      r: re.r + (oe.r - re.r) * oe.a,
      g: re.g + (oe.g - re.g) * oe.a,
      b: re.b + (oe.b - re.b) * oe.a
    });
  }, e.prototype.triad = function() {
    return this.polyad(3);
  }, e.prototype.tetrad = function() {
    return this.polyad(4);
  }, e.prototype.polyad = function(k) {
    for (var oe = this.toHsl(), re = oe.h, ae = [this], le = 360 / k, ie = 1; ie < k; ie++)
      ae.push(new e({ h: (re + ie * le) % 360, s: oe.s, l: oe.l }));
    return ae;
  }, e.prototype.equals = function(k) {
    return this.toRgbString() === new e(k).toRgbString();
  }, e;
}();
function darken(e, k = 20) {
  return e.mix("#141414", k).toString();
}
function useButtonCustomStyle(e) {
  const k = useDisabled$1(), oe = useNamespace("button");
  return computed(() => {
    let re = {};
    const ae = e.color;
    if (ae) {
      const le = new TinyColor(ae), ie = e.dark ? le.tint(20).toString() : darken(le, 20);
      if (e.plain)
        re = oe.cssVarBlock({
          "bg-color": e.dark ? darken(le, 90) : le.tint(90).toString(),
          "text-color": ae,
          "border-color": e.dark ? darken(le, 50) : le.tint(50).toString(),
          "hover-text-color": `var(${oe.cssVarName("color-white")})`,
          "hover-bg-color": ae,
          "hover-border-color": ae,
          "active-bg-color": ie,
          "active-text-color": `var(${oe.cssVarName("color-white")})`,
          "active-border-color": ie
        }), k.value && (re[oe.cssVarBlockName("disabled-bg-color")] = e.dark ? darken(le, 90) : le.tint(90).toString(), re[oe.cssVarBlockName("disabled-text-color")] = e.dark ? darken(le, 50) : le.tint(50).toString(), re[oe.cssVarBlockName("disabled-border-color")] = e.dark ? darken(le, 80) : le.tint(80).toString());
      else {
        const ue = e.dark ? darken(le, 30) : le.tint(30).toString(), de = le.isDark() ? `var(${oe.cssVarName("color-white")})` : `var(${oe.cssVarName("color-black")})`;
        if (re = oe.cssVarBlock({
          "bg-color": ae,
          "text-color": de,
          "border-color": ae,
          "hover-bg-color": ue,
          "hover-text-color": de,
          "hover-border-color": ue,
          "active-bg-color": ie,
          "active-border-color": ie
        }), k.value) {
          const pe = e.dark ? darken(le, 50) : le.tint(50).toString();
          re[oe.cssVarBlockName("disabled-bg-color")] = pe, re[oe.cssVarBlockName("disabled-text-color")] = e.dark ? "rgba(255, 255, 255, 0.5)" : `var(${oe.cssVarName("color-white")})`, re[oe.cssVarBlockName("disabled-border-color")] = pe;
        }
      }
    }
    return re;
  });
}
const _hoisted_1$s = ["aria-disabled", "disabled", "autofocus", "type"], __default__$l = {
  name: "ElButton"
}, _sfc_main$L = /* @__PURE__ */ defineComponent({
  ...__default__$l,
  props: buttonProps,
  emits: buttonEmits,
  setup(e, { expose: k, emit: oe }) {
    const re = e, ae = useSlots();
    useDeprecated({
      from: "type.text",
      replacement: "type.link",
      version: "3.0.0",
      scope: "props",
      ref: "https://element-plus.org/en-US/component/button.html#button-attributes"
    }, computed(() => re.type === "text"));
    const le = inject(buttonGroupContextKey, void 0), ie = useGlobalConfig("button"), ue = useNamespace("button"), { form: de } = useFormItem(), pe = useSize(computed(() => le == null ? void 0 : le.size)), Ce = useDisabled$1(), _e = ref(), $e = computed(() => re.type || (le == null ? void 0 : le.type) || ""), Ve = computed(() => {
      var Ie, qe, xe;
      return (xe = (qe = re.autoInsertSpace) != null ? qe : (Ie = ie.value) == null ? void 0 : Ie.autoInsertSpace) != null ? xe : !1;
    }), Ne = computed(() => {
      var Ie;
      const qe = (Ie = ae.default) == null ? void 0 : Ie.call(ae);
      if (Ve.value && (qe == null ? void 0 : qe.length) === 1) {
        const xe = qe[0];
        if ((xe == null ? void 0 : xe.type) === Text) {
          const ze = xe.children;
          return /^\p{Unified_Ideograph}{2}$/u.test(ze.trim());
        }
      }
      return !1;
    }), he = useButtonCustomStyle(re), Oe = (Ie) => {
      re.nativeType === "reset" && (de == null || de.resetFields()), oe("click", Ie);
    };
    return k({
      ref: _e,
      size: pe,
      type: $e,
      disabled: Ce,
      shouldAddSpace: Ne
    }), (Ie, qe) => (openBlock(), createElementBlock("button", {
      ref_key: "_ref",
      ref: _e,
      class: normalizeClass([
        unref(ue).b(),
        unref(ue).m(unref($e)),
        unref(ue).m(unref(pe)),
        unref(ue).is("disabled", unref(Ce)),
        unref(ue).is("loading", Ie.loading),
        unref(ue).is("plain", Ie.plain),
        unref(ue).is("round", Ie.round),
        unref(ue).is("circle", Ie.circle),
        unref(ue).is("text", Ie.text),
        unref(ue).is("link", Ie.link),
        unref(ue).is("has-bg", Ie.bg)
      ]),
      "aria-disabled": unref(Ce) || Ie.loading,
      disabled: unref(Ce) || Ie.loading,
      autofocus: Ie.autofocus,
      type: Ie.nativeType,
      style: normalizeStyle(unref(he)),
      onClick: Oe
    }, [
      Ie.loading ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        Ie.$slots.loading ? renderSlot(Ie.$slots, "loading", { key: 0 }) : (openBlock(), createBlock(unref(ElIcon), {
          key: 1,
          class: normalizeClass(unref(ue).is("loading"))
        }, {
          default: withCtx(() => [
            (openBlock(), createBlock(resolveDynamicComponent(Ie.loadingIcon)))
          ]),
          _: 1
        }, 8, ["class"]))
      ], 64)) : Ie.icon || Ie.$slots.icon ? (openBlock(), createBlock(unref(ElIcon), { key: 1 }, {
        default: withCtx(() => [
          Ie.icon ? (openBlock(), createBlock(resolveDynamicComponent(Ie.icon), { key: 0 })) : renderSlot(Ie.$slots, "icon", { key: 1 })
        ]),
        _: 3
      })) : createCommentVNode("v-if", !0),
      Ie.$slots.default ? (openBlock(), createElementBlock("span", {
        key: 2,
        class: normalizeClass({ [unref(ue).em("text", "expand")]: unref(Ne) })
      }, [
        renderSlot(Ie.$slots, "default")
      ], 2)) : createCommentVNode("v-if", !0)
    ], 14, _hoisted_1$s));
  }
});
var Button = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/button/src/button.vue"]]);
const buttonGroupProps = {
  size: buttonProps.size,
  type: buttonProps.type
}, __default__$k = {
  name: "ElButtonGroup"
}, _sfc_main$K = /* @__PURE__ */ defineComponent({
  ...__default__$k,
  props: buttonGroupProps,
  setup(e) {
    const k = e;
    provide(buttonGroupContextKey, reactive({
      size: toRef(k, "size"),
      type: toRef(k, "type")
    }));
    const oe = useNamespace("button");
    return (re, ae) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(`${unref(oe).b("group")}`)
    }, [
      renderSlot(re.$slots, "default")
    ], 2));
  }
});
var ButtonGroup = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/button/src/button-group.vue"]]);
const ElButton = withInstall(Button, {
  ButtonGroup
});
withNoopInstall(ButtonGroup);
var commonjsGlobal = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, dayjs_min = { exports: {} };
(function(e, k) {
  (function(oe, re) {
    e.exports = re();
  })(commonjsGlobal, function() {
    var oe = 1e3, re = 6e4, ae = 36e5, le = "millisecond", ie = "second", ue = "minute", de = "hour", pe = "day", Ce = "week", _e = "month", $e = "quarter", Ve = "year", Ne = "date", he = "Invalid Date", Oe = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, Ie = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, qe = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_") }, xe = function(Lt, Dt, Cn) {
      var jt = String(Lt);
      return !jt || jt.length >= Dt ? Lt : "" + Array(Dt + 1 - jt.length).join(Cn) + Lt;
    }, ze = { s: xe, z: function(Lt) {
      var Dt = -Lt.utcOffset(), Cn = Math.abs(Dt), jt = Math.floor(Cn / 60), bn = Cn % 60;
      return (Dt <= 0 ? "+" : "-") + xe(jt, 2, "0") + ":" + xe(bn, 2, "0");
    }, m: function Lt(Dt, Cn) {
      if (Dt.date() < Cn.date())
        return -Lt(Cn, Dt);
      var jt = 12 * (Cn.year() - Dt.year()) + (Cn.month() - Dt.month()), bn = Dt.clone().add(jt, _e), kt = Cn - bn < 0, Et = Dt.clone().add(jt + (kt ? -1 : 1), _e);
      return +(-(jt + (Cn - bn) / (kt ? bn - Et : Et - bn)) || 0);
    }, a: function(Lt) {
      return Lt < 0 ? Math.ceil(Lt) || 0 : Math.floor(Lt);
    }, p: function(Lt) {
      return { M: _e, y: Ve, w: Ce, d: pe, D: Ne, h: de, m: ue, s: ie, ms: le, Q: $e }[Lt] || String(Lt || "").toLowerCase().replace(/s$/, "");
    }, u: function(Lt) {
      return Lt === void 0;
    } }, At = "en", Fe = {};
    Fe[At] = qe;
    var Pt = function(Lt) {
      return Lt instanceof Tn;
    }, vn = function Lt(Dt, Cn, jt) {
      var bn;
      if (!Dt)
        return At;
      if (typeof Dt == "string") {
        var kt = Dt.toLowerCase();
        Fe[kt] && (bn = kt), Cn && (Fe[kt] = Cn, bn = kt);
        var Et = Dt.split("-");
        if (!bn && Et.length > 1)
          return Lt(Et[0]);
      } else {
        var _n = Dt.name;
        Fe[_n] = Dt, bn = _n;
      }
      return !jt && bn && (At = bn), bn || !jt && At;
    }, En = function(Lt, Dt) {
      if (Pt(Lt))
        return Lt.clone();
      var Cn = typeof Dt == "object" ? Dt : {};
      return Cn.date = Lt, Cn.args = arguments, new Tn(Cn);
    }, Nn = ze;
    Nn.l = vn, Nn.i = Pt, Nn.w = function(Lt, Dt) {
      return En(Lt, { locale: Dt.$L, utc: Dt.$u, x: Dt.$x, $offset: Dt.$offset });
    };
    var Tn = function() {
      function Lt(Cn) {
        this.$L = vn(Cn.locale, null, !0), this.parse(Cn);
      }
      var Dt = Lt.prototype;
      return Dt.parse = function(Cn) {
        this.$d = function(jt) {
          var bn = jt.date, kt = jt.utc;
          if (bn === null)
            return new Date(NaN);
          if (Nn.u(bn))
            return new Date();
          if (bn instanceof Date)
            return new Date(bn);
          if (typeof bn == "string" && !/Z$/i.test(bn)) {
            var Et = bn.match(Oe);
            if (Et) {
              var _n = Et[2] - 1 || 0, Pn = (Et[7] || "0").substring(0, 3);
              return kt ? new Date(Date.UTC(Et[1], _n, Et[3] || 1, Et[4] || 0, Et[5] || 0, Et[6] || 0, Pn)) : new Date(Et[1], _n, Et[3] || 1, Et[4] || 0, Et[5] || 0, Et[6] || 0, Pn);
            }
          }
          return new Date(bn);
        }(Cn), this.$x = Cn.x || {}, this.init();
      }, Dt.init = function() {
        var Cn = this.$d;
        this.$y = Cn.getFullYear(), this.$M = Cn.getMonth(), this.$D = Cn.getDate(), this.$W = Cn.getDay(), this.$H = Cn.getHours(), this.$m = Cn.getMinutes(), this.$s = Cn.getSeconds(), this.$ms = Cn.getMilliseconds();
      }, Dt.$utils = function() {
        return Nn;
      }, Dt.isValid = function() {
        return this.$d.toString() !== he;
      }, Dt.isSame = function(Cn, jt) {
        var bn = En(Cn);
        return this.startOf(jt) <= bn && bn <= this.endOf(jt);
      }, Dt.isAfter = function(Cn, jt) {
        return En(Cn) < this.startOf(jt);
      }, Dt.isBefore = function(Cn, jt) {
        return this.endOf(jt) < En(Cn);
      }, Dt.$g = function(Cn, jt, bn) {
        return Nn.u(Cn) ? this[jt] : this.set(bn, Cn);
      }, Dt.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, Dt.valueOf = function() {
        return this.$d.getTime();
      }, Dt.startOf = function(Cn, jt) {
        var bn = this, kt = !!Nn.u(jt) || jt, Et = Nn.p(Cn), _n = function(An, Vn) {
          var Bn = Nn.w(bn.$u ? Date.UTC(bn.$y, Vn, An) : new Date(bn.$y, Vn, An), bn);
          return kt ? Bn : Bn.endOf(pe);
        }, Pn = function(An, Vn) {
          return Nn.w(bn.toDate()[An].apply(bn.toDate("s"), (kt ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(Vn)), bn);
        }, hn = this.$W, On = this.$M, Dn = this.$D, Rn = "set" + (this.$u ? "UTC" : "");
        switch (Et) {
          case Ve:
            return kt ? _n(1, 0) : _n(31, 11);
          case _e:
            return kt ? _n(1, On) : _n(0, On + 1);
          case Ce:
            var Fn = this.$locale().weekStart || 0, kn = (hn < Fn ? hn + 7 : hn) - Fn;
            return _n(kt ? Dn - kn : Dn + (6 - kn), On);
          case pe:
          case Ne:
            return Pn(Rn + "Hours", 0);
          case de:
            return Pn(Rn + "Minutes", 1);
          case ue:
            return Pn(Rn + "Seconds", 2);
          case ie:
            return Pn(Rn + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, Dt.endOf = function(Cn) {
        return this.startOf(Cn, !1);
      }, Dt.$set = function(Cn, jt) {
        var bn, kt = Nn.p(Cn), Et = "set" + (this.$u ? "UTC" : ""), _n = (bn = {}, bn[pe] = Et + "Date", bn[Ne] = Et + "Date", bn[_e] = Et + "Month", bn[Ve] = Et + "FullYear", bn[de] = Et + "Hours", bn[ue] = Et + "Minutes", bn[ie] = Et + "Seconds", bn[le] = Et + "Milliseconds", bn)[kt], Pn = kt === pe ? this.$D + (jt - this.$W) : jt;
        if (kt === _e || kt === Ve) {
          var hn = this.clone().set(Ne, 1);
          hn.$d[_n](Pn), hn.init(), this.$d = hn.set(Ne, Math.min(this.$D, hn.daysInMonth())).$d;
        } else
          _n && this.$d[_n](Pn);
        return this.init(), this;
      }, Dt.set = function(Cn, jt) {
        return this.clone().$set(Cn, jt);
      }, Dt.get = function(Cn) {
        return this[Nn.p(Cn)]();
      }, Dt.add = function(Cn, jt) {
        var bn, kt = this;
        Cn = Number(Cn);
        var Et = Nn.p(jt), _n = function(On) {
          var Dn = En(kt);
          return Nn.w(Dn.date(Dn.date() + Math.round(On * Cn)), kt);
        };
        if (Et === _e)
          return this.set(_e, this.$M + Cn);
        if (Et === Ve)
          return this.set(Ve, this.$y + Cn);
        if (Et === pe)
          return _n(1);
        if (Et === Ce)
          return _n(7);
        var Pn = (bn = {}, bn[ue] = re, bn[de] = ae, bn[ie] = oe, bn)[Et] || 1, hn = this.$d.getTime() + Cn * Pn;
        return Nn.w(hn, this);
      }, Dt.subtract = function(Cn, jt) {
        return this.add(-1 * Cn, jt);
      }, Dt.format = function(Cn) {
        var jt = this, bn = this.$locale();
        if (!this.isValid())
          return bn.invalidDate || he;
        var kt = Cn || "YYYY-MM-DDTHH:mm:ssZ", Et = Nn.z(this), _n = this.$H, Pn = this.$m, hn = this.$M, On = bn.weekdays, Dn = bn.months, Rn = function(Vn, Bn, Wn, Yn) {
          return Vn && (Vn[Bn] || Vn(jt, kt)) || Wn[Bn].slice(0, Yn);
        }, Fn = function(Vn) {
          return Nn.s(_n % 12 || 12, Vn, "0");
        }, kn = bn.meridiem || function(Vn, Bn, Wn) {
          var Yn = Vn < 12 ? "AM" : "PM";
          return Wn ? Yn.toLowerCase() : Yn;
        }, An = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: hn + 1, MM: Nn.s(hn + 1, 2, "0"), MMM: Rn(bn.monthsShort, hn, Dn, 3), MMMM: Rn(Dn, hn), D: this.$D, DD: Nn.s(this.$D, 2, "0"), d: String(this.$W), dd: Rn(bn.weekdaysMin, this.$W, On, 2), ddd: Rn(bn.weekdaysShort, this.$W, On, 3), dddd: On[this.$W], H: String(_n), HH: Nn.s(_n, 2, "0"), h: Fn(1), hh: Fn(2), a: kn(_n, Pn, !0), A: kn(_n, Pn, !1), m: String(Pn), mm: Nn.s(Pn, 2, "0"), s: String(this.$s), ss: Nn.s(this.$s, 2, "0"), SSS: Nn.s(this.$ms, 3, "0"), Z: Et };
        return kt.replace(Ie, function(Vn, Bn) {
          return Bn || An[Vn] || Et.replace(":", "");
        });
      }, Dt.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, Dt.diff = function(Cn, jt, bn) {
        var kt, Et = Nn.p(jt), _n = En(Cn), Pn = (_n.utcOffset() - this.utcOffset()) * re, hn = this - _n, On = Nn.m(this, _n);
        return On = (kt = {}, kt[Ve] = On / 12, kt[_e] = On, kt[$e] = On / 3, kt[Ce] = (hn - Pn) / 6048e5, kt[pe] = (hn - Pn) / 864e5, kt[de] = hn / ae, kt[ue] = hn / re, kt[ie] = hn / oe, kt)[Et] || hn, bn ? On : Nn.a(On);
      }, Dt.daysInMonth = function() {
        return this.endOf(_e).$D;
      }, Dt.$locale = function() {
        return Fe[this.$L];
      }, Dt.locale = function(Cn, jt) {
        if (!Cn)
          return this.$L;
        var bn = this.clone(), kt = vn(Cn, jt, !0);
        return kt && (bn.$L = kt), bn;
      }, Dt.clone = function() {
        return Nn.w(this.$d, this);
      }, Dt.toDate = function() {
        return new Date(this.valueOf());
      }, Dt.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, Dt.toISOString = function() {
        return this.$d.toISOString();
      }, Dt.toString = function() {
        return this.$d.toUTCString();
      }, Lt;
    }(), wn = Tn.prototype;
    return En.prototype = wn, [["$ms", le], ["$s", ie], ["$m", ue], ["$H", de], ["$W", pe], ["$M", _e], ["$y", Ve], ["$D", Ne]].forEach(function(Lt) {
      wn[Lt[1]] = function(Dt) {
        return this.$g(Dt, Lt[0], Lt[1]);
      };
    }), En.extend = function(Lt, Dt) {
      return Lt.$i || (Lt(Dt, Tn, En), Lt.$i = !0), En;
    }, En.locale = vn, En.isDayjs = Pt, En.unix = function(Lt) {
      return En(1e3 * Lt);
    }, En.en = Fe[At], En.Ls = Fe, En.p = {}, En;
  });
})(dayjs_min);
const dayjs = dayjs_min.exports;
var localeData$1 = { exports: {} };
(function(e, k) {
  (function(oe, re) {
    e.exports = re();
  })(commonjsGlobal, function() {
    return function(oe, re, ae) {
      var le = re.prototype, ie = function(_e) {
        return _e && (_e.indexOf ? _e : _e.s);
      }, ue = function(_e, $e, Ve, Ne, he) {
        var Oe = _e.name ? _e : _e.$locale(), Ie = ie(Oe[$e]), qe = ie(Oe[Ve]), xe = Ie || qe.map(function(At) {
          return At.slice(0, Ne);
        });
        if (!he)
          return xe;
        var ze = Oe.weekStart;
        return xe.map(function(At, Fe) {
          return xe[(Fe + (ze || 0)) % 7];
        });
      }, de = function() {
        return ae.Ls[ae.locale()];
      }, pe = function(_e, $e) {
        return _e.formats[$e] || function(Ve) {
          return Ve.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(Ne, he, Oe) {
            return he || Oe.slice(1);
          });
        }(_e.formats[$e.toUpperCase()]);
      }, Ce = function() {
        var _e = this;
        return { months: function($e) {
          return $e ? $e.format("MMMM") : ue(_e, "months");
        }, monthsShort: function($e) {
          return $e ? $e.format("MMM") : ue(_e, "monthsShort", "months", 3);
        }, firstDayOfWeek: function() {
          return _e.$locale().weekStart || 0;
        }, weekdays: function($e) {
          return $e ? $e.format("dddd") : ue(_e, "weekdays");
        }, weekdaysMin: function($e) {
          return $e ? $e.format("dd") : ue(_e, "weekdaysMin", "weekdays", 2);
        }, weekdaysShort: function($e) {
          return $e ? $e.format("ddd") : ue(_e, "weekdaysShort", "weekdays", 3);
        }, longDateFormat: function($e) {
          return pe(_e.$locale(), $e);
        }, meridiem: this.$locale().meridiem, ordinal: this.$locale().ordinal };
      };
      le.localeData = function() {
        return Ce.bind(this)();
      }, ae.localeData = function() {
        var _e = de();
        return { firstDayOfWeek: function() {
          return _e.weekStart || 0;
        }, weekdays: function() {
          return ae.weekdays();
        }, weekdaysShort: function() {
          return ae.weekdaysShort();
        }, weekdaysMin: function() {
          return ae.weekdaysMin();
        }, months: function() {
          return ae.months();
        }, monthsShort: function() {
          return ae.monthsShort();
        }, longDateFormat: function($e) {
          return pe(_e, $e);
        }, meridiem: _e.meridiem, ordinal: _e.ordinal };
      }, ae.months = function() {
        return ue(de(), "months");
      }, ae.monthsShort = function() {
        return ue(de(), "monthsShort", "months", 3);
      }, ae.weekdays = function(_e) {
        return ue(de(), "weekdays", null, null, _e);
      }, ae.weekdaysShort = function(_e) {
        return ue(de(), "weekdaysShort", "weekdays", 3, _e);
      }, ae.weekdaysMin = function(_e) {
        return ue(de(), "weekdaysMin", "weekdays", 2, _e);
      };
    };
  });
})(localeData$1);
const localeData = localeData$1.exports;
var customParseFormat$1 = { exports: {} };
(function(e, k) {
  (function(oe, re) {
    e.exports = re();
  })(commonjsGlobal, function() {
    var oe = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, re = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, ae = /\d\d/, le = /\d\d?/, ie = /\d*[^-_:/,()\s\d]+/, ue = {}, de = function(he) {
      return (he = +he) + (he > 68 ? 1900 : 2e3);
    }, pe = function(he) {
      return function(Oe) {
        this[he] = +Oe;
      };
    }, Ce = [/[+-]\d\d:?(\d\d)?|Z/, function(he) {
      (this.zone || (this.zone = {})).offset = function(Oe) {
        if (!Oe || Oe === "Z")
          return 0;
        var Ie = Oe.match(/([+-]|\d\d)/g), qe = 60 * Ie[1] + (+Ie[2] || 0);
        return qe === 0 ? 0 : Ie[0] === "+" ? -qe : qe;
      }(he);
    }], _e = function(he) {
      var Oe = ue[he];
      return Oe && (Oe.indexOf ? Oe : Oe.s.concat(Oe.f));
    }, $e = function(he, Oe) {
      var Ie, qe = ue.meridiem;
      if (qe) {
        for (var xe = 1; xe <= 24; xe += 1)
          if (he.indexOf(qe(xe, 0, Oe)) > -1) {
            Ie = xe > 12;
            break;
          }
      } else
        Ie = he === (Oe ? "pm" : "PM");
      return Ie;
    }, Ve = { A: [ie, function(he) {
      this.afternoon = $e(he, !1);
    }], a: [ie, function(he) {
      this.afternoon = $e(he, !0);
    }], S: [/\d/, function(he) {
      this.milliseconds = 100 * +he;
    }], SS: [ae, function(he) {
      this.milliseconds = 10 * +he;
    }], SSS: [/\d{3}/, function(he) {
      this.milliseconds = +he;
    }], s: [le, pe("seconds")], ss: [le, pe("seconds")], m: [le, pe("minutes")], mm: [le, pe("minutes")], H: [le, pe("hours")], h: [le, pe("hours")], HH: [le, pe("hours")], hh: [le, pe("hours")], D: [le, pe("day")], DD: [ae, pe("day")], Do: [ie, function(he) {
      var Oe = ue.ordinal, Ie = he.match(/\d+/);
      if (this.day = Ie[0], Oe)
        for (var qe = 1; qe <= 31; qe += 1)
          Oe(qe).replace(/\[|\]/g, "") === he && (this.day = qe);
    }], M: [le, pe("month")], MM: [ae, pe("month")], MMM: [ie, function(he) {
      var Oe = _e("months"), Ie = (_e("monthsShort") || Oe.map(function(qe) {
        return qe.slice(0, 3);
      })).indexOf(he) + 1;
      if (Ie < 1)
        throw new Error();
      this.month = Ie % 12 || Ie;
    }], MMMM: [ie, function(he) {
      var Oe = _e("months").indexOf(he) + 1;
      if (Oe < 1)
        throw new Error();
      this.month = Oe % 12 || Oe;
    }], Y: [/[+-]?\d+/, pe("year")], YY: [ae, function(he) {
      this.year = de(he);
    }], YYYY: [/\d{4}/, pe("year")], Z: Ce, ZZ: Ce };
    function Ne(he) {
      var Oe, Ie;
      Oe = he, Ie = ue && ue.formats;
      for (var qe = (he = Oe.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(En, Nn, Tn) {
        var wn = Tn && Tn.toUpperCase();
        return Nn || Ie[Tn] || oe[Tn] || Ie[wn].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(Lt, Dt, Cn) {
          return Dt || Cn.slice(1);
        });
      })).match(re), xe = qe.length, ze = 0; ze < xe; ze += 1) {
        var At = qe[ze], Fe = Ve[At], Pt = Fe && Fe[0], vn = Fe && Fe[1];
        qe[ze] = vn ? { regex: Pt, parser: vn } : At.replace(/^\[|\]$/g, "");
      }
      return function(En) {
        for (var Nn = {}, Tn = 0, wn = 0; Tn < xe; Tn += 1) {
          var Lt = qe[Tn];
          if (typeof Lt == "string")
            wn += Lt.length;
          else {
            var Dt = Lt.regex, Cn = Lt.parser, jt = En.slice(wn), bn = Dt.exec(jt)[0];
            Cn.call(Nn, bn), En = En.replace(bn, "");
          }
        }
        return function(kt) {
          var Et = kt.afternoon;
          if (Et !== void 0) {
            var _n = kt.hours;
            Et ? _n < 12 && (kt.hours += 12) : _n === 12 && (kt.hours = 0), delete kt.afternoon;
          }
        }(Nn), Nn;
      };
    }
    return function(he, Oe, Ie) {
      Ie.p.customParseFormat = !0, he && he.parseTwoDigitYear && (de = he.parseTwoDigitYear);
      var qe = Oe.prototype, xe = qe.parse;
      qe.parse = function(ze) {
        var At = ze.date, Fe = ze.utc, Pt = ze.args;
        this.$u = Fe;
        var vn = Pt[1];
        if (typeof vn == "string") {
          var En = Pt[2] === !0, Nn = Pt[3] === !0, Tn = En || Nn, wn = Pt[2];
          Nn && (wn = Pt[2]), ue = this.$locale(), !En && wn && (ue = Ie.Ls[wn]), this.$d = function(jt, bn, kt) {
            try {
              if (["x", "X"].indexOf(bn) > -1)
                return new Date((bn === "X" ? 1e3 : 1) * jt);
              var Et = Ne(bn)(jt), _n = Et.year, Pn = Et.month, hn = Et.day, On = Et.hours, Dn = Et.minutes, Rn = Et.seconds, Fn = Et.milliseconds, kn = Et.zone, An = new Date(), Vn = hn || (_n || Pn ? 1 : An.getDate()), Bn = _n || An.getFullYear(), Wn = 0;
              _n && !Pn || (Wn = Pn > 0 ? Pn - 1 : An.getMonth());
              var Yn = On || 0, Xn = Dn || 0, eo = Rn || 0, Gn = Fn || 0;
              return kn ? new Date(Date.UTC(Bn, Wn, Vn, Yn, Xn, eo, Gn + 60 * kn.offset * 1e3)) : kt ? new Date(Date.UTC(Bn, Wn, Vn, Yn, Xn, eo, Gn)) : new Date(Bn, Wn, Vn, Yn, Xn, eo, Gn);
            } catch {
              return new Date("");
            }
          }(At, vn, Fe), this.init(), wn && wn !== !0 && (this.$L = this.locale(wn).$L), Tn && At != this.format(vn) && (this.$d = new Date("")), ue = {};
        } else if (vn instanceof Array)
          for (var Lt = vn.length, Dt = 1; Dt <= Lt; Dt += 1) {
            Pt[1] = vn[Dt - 1];
            var Cn = Ie.apply(this, Pt);
            if (Cn.isValid()) {
              this.$d = Cn.$d, this.$L = Cn.$L, this.init();
              break;
            }
            Dt === Lt && (this.$d = new Date(""));
          }
        else
          xe.call(this, ze);
      };
    };
  });
})(customParseFormat$1);
const customParseFormat = customParseFormat$1.exports, timeUnits = ["hours", "minutes", "seconds"], DEFAULT_FORMATS_TIME = "HH:mm:ss", DEFAULT_FORMATS_DATE = "YYYY-MM-DD", DEFAULT_FORMATS_DATEPICKER = {
  date: DEFAULT_FORMATS_DATE,
  dates: DEFAULT_FORMATS_DATE,
  week: "gggg[w]ww",
  year: "YYYY",
  month: "YYYY-MM",
  datetime: `${DEFAULT_FORMATS_DATE} ${DEFAULT_FORMATS_TIME}`,
  monthrange: "YYYY-MM",
  daterange: DEFAULT_FORMATS_DATE,
  datetimerange: `${DEFAULT_FORMATS_DATE} ${DEFAULT_FORMATS_TIME}`
}, buildTimeList = (e, k) => [
  e > 0 ? e - 1 : void 0,
  e,
  e < k ? e + 1 : void 0
], rangeArr = (e) => Array.from(Array.from({ length: e }).keys()), extractDateFormat = (e) => e.replace(/\W?m{1,2}|\W?ZZ/g, "").replace(/\W?h{1,2}|\W?s{1,3}|\W?a/gi, "").trim(), extractTimeFormat = (e) => e.replace(/\W?D{1,2}|\W?Do|\W?d{1,4}|\W?M{1,4}|\W?Y{2,4}/g, "").trim(), dateEquals = function(e, k) {
  const oe = isDate(e), re = isDate(k);
  return oe && re ? e.getTime() === k.getTime() : !oe && !re ? e === k : !1;
}, valueEquals = function(e, k) {
  const oe = isArray(e), re = isArray(k);
  return oe && re ? e.length !== k.length ? !1 : e.every((ae, le) => dateEquals(ae, k[le])) : !oe && !re ? dateEquals(e, k) : !1;
}, parseDate = function(e, k, oe) {
  const re = isEmpty(k) || k === "x" ? dayjs(e).locale(oe) : dayjs(e, k).locale(oe);
  return re.isValid() ? re : void 0;
}, formatter = function(e, k, oe) {
  return isEmpty(k) ? e : k === "x" ? +e : dayjs(e).locale(oe).format(k);
}, makeList = (e, k) => {
  var oe;
  const re = [], ae = k == null ? void 0 : k();
  for (let le = 0; le < e; le++)
    re.push((oe = ae == null ? void 0 : ae.includes(le)) != null ? oe : !1);
  return re;
}, disabledTimeListsProps = buildProps({
  disabledHours: {
    type: definePropType(Function)
  },
  disabledMinutes: {
    type: definePropType(Function)
  },
  disabledSeconds: {
    type: definePropType(Function)
  }
}), timePanelSharedProps = buildProps({
  visible: Boolean,
  actualVisible: {
    type: Boolean,
    default: void 0
  },
  format: {
    type: String,
    default: ""
  }
}), timePickerDefaultProps = buildProps({
  id: {
    type: definePropType([Array, String])
  },
  name: {
    type: definePropType([Array, String]),
    default: ""
  },
  popperClass: {
    type: String,
    default: ""
  },
  format: String,
  valueFormat: String,
  type: {
    type: String,
    default: ""
  },
  clearable: {
    type: Boolean,
    default: !0
  },
  clearIcon: {
    type: definePropType([String, Object]),
    default: circle_close_default
  },
  editable: {
    type: Boolean,
    default: !0
  },
  prefixIcon: {
    type: definePropType([String, Object]),
    default: ""
  },
  size: useSizeProp,
  readonly: {
    type: Boolean,
    default: !1
  },
  disabled: {
    type: Boolean,
    default: !1
  },
  placeholder: {
    type: String,
    default: ""
  },
  popperOptions: {
    type: definePropType(Object),
    default: () => ({})
  },
  modelValue: {
    type: definePropType([Date, Array, String, Number]),
    default: ""
  },
  rangeSeparator: {
    type: String,
    default: "-"
  },
  startPlaceholder: String,
  endPlaceholder: String,
  defaultValue: {
    type: definePropType([Date, Array])
  },
  defaultTime: {
    type: definePropType([Date, Array])
  },
  isRange: {
    type: Boolean,
    default: !1
  },
  ...disabledTimeListsProps,
  disabledDate: {
    type: Function
  },
  cellClassName: {
    type: Function
  },
  shortcuts: {
    type: Array,
    default: () => []
  },
  arrowControl: {
    type: Boolean,
    default: !1
  },
  label: {
    type: String,
    default: void 0
  },
  tabindex: {
    type: definePropType([String, Number]),
    default: 0
  },
  validateEvent: {
    type: Boolean,
    default: !0
  },
  unlinkPanels: Boolean
}), _hoisted_1$r = ["id", "name", "placeholder", "value", "disabled", "readonly"], _hoisted_2$i = ["id", "name", "placeholder", "value", "disabled", "readonly"], __default__$j = {
  name: "Picker"
}, _sfc_main$J = /* @__PURE__ */ defineComponent({
  ...__default__$j,
  props: timePickerDefaultProps,
  emits: [
    "update:modelValue",
    "change",
    "focus",
    "blur",
    "calendar-change",
    "panel-change",
    "visible-change",
    "keydown"
  ],
  setup(e, { expose: k, emit: oe }) {
    const re = e, { lang: ae } = useLocale(), le = useNamespace("date"), ie = useNamespace("input"), ue = useNamespace("range"), de = inject(formContextKey, {}), pe = inject(formItemContextKey, {}), Ce = inject("ElPopperOptions", {}), _e = ref(), $e = ref(), Ve = ref(!1), Ne = ref(!1), he = ref(null);
    let Oe = !1, Ie = !1;
    watch(Ve, (Ue) => {
      Ue ? he.value = re.modelValue : (Gn.value = null, nextTick(() => {
        qe(re.modelValue);
      }));
    });
    const qe = (Ue, Sn) => {
      var xn;
      (Sn || !valueEquals(Ue, he.value)) && (oe("change", Ue), re.validateEvent && ((xn = pe.validate) == null || xn.call(pe, "change").catch((jn) => debugWarn(jn))));
    }, xe = (Ue) => {
      if (!valueEquals(re.modelValue, Ue)) {
        let Sn;
        isArray(Ue) ? Sn = Ue.map((xn) => formatter(xn, re.valueFormat, ae.value)) : Ue && (Sn = formatter(Ue, re.valueFormat, ae.value)), oe("update:modelValue", Ue && Sn, ae.value);
      }
    }, ze = (Ue) => {
      oe("keydown", Ue);
    }, At = computed(() => {
      if ($e.value) {
        const Ue = Wn.value ? $e.value : $e.value.$el;
        return Array.from(Ue.querySelectorAll("input"));
      }
      return [];
    }), Fe = (Ue, Sn, xn) => {
      const jn = At.value;
      !jn.length || (!xn || xn === "min" ? (jn[0].setSelectionRange(Ue, Sn), jn[0].focus()) : xn === "max" && (jn[1].setSelectionRange(Ue, Sn), jn[1].focus()));
    }, Pt = () => {
      Lt(!0, !0), nextTick(() => {
        Ie = !1;
      });
    }, vn = (Ue = "", Sn = !1) => {
      Sn || Pt(), Ve.value = Sn;
      let xn;
      isArray(Ue) ? xn = Ue.map((jn) => jn.toDate()) : xn = Ue && Ue.toDate(), Gn.value = null, xe(xn);
    }, En = () => {
      Ne.value = !0;
    }, Nn = () => {
      oe("visible-change", !0);
    }, Tn = (Ue) => {
      (Ue == null ? void 0 : Ue.key) === EVENT_CODE.esc && Lt(!0, !0);
    }, wn = () => {
      Ne.value = !1, Ie = !1, oe("visible-change", !1);
    }, Lt = (Ue = !0, Sn = !1) => {
      Ie = Sn;
      const [xn, jn] = unref(At);
      let Ln = xn;
      !Ue && Wn.value && (Ln = jn), Ln && Ln.focus();
    }, Dt = (Ue) => {
      re.readonly || bn.value || Ve.value || Ie || (Ve.value = !0, oe("focus", Ue));
    };
    let Cn;
    const jt = (Ue) => {
      const Sn = async () => {
        setTimeout(() => {
          var xn, jn;
          Cn === Sn && (!(((xn = _e.value) == null ? void 0 : xn.isFocusInsideContent()) && !Oe) && At.value.filter((Ln) => Ln.contains(document.activeElement)).length === 0 && (no(), Ve.value = !1, oe("blur", Ue), re.validateEvent && ((jn = pe.validate) == null || jn.call(pe, "blur").catch((Ln) => debugWarn(Ln)))), Oe = !1);
        }, 0);
      };
      Cn = Sn, Sn();
    }, bn = computed(() => re.disabled || de.disabled), kt = computed(() => {
      let Ue;
      if (Fn.value ? Qn.value.getDefaultValue && (Ue = Qn.value.getDefaultValue()) : isArray(re.modelValue) ? Ue = re.modelValue.map((Sn) => parseDate(Sn, re.valueFormat, ae.value)) : Ue = parseDate(re.modelValue, re.valueFormat, ae.value), Qn.value.getRangeAvailableTime) {
        const Sn = Qn.value.getRangeAvailableTime(Ue);
        isEqual(Sn, Ue) || (Ue = Sn, xe(isArray(Ue) ? Ue.map((xn) => xn.toDate()) : Ue.toDate()));
      }
      return isArray(Ue) && Ue.some((Sn) => !Sn) && (Ue = []), Ue;
    }), Et = computed(() => {
      if (!Qn.value.panelReady)
        return "";
      const Ue = zn(kt.value);
      return isArray(Gn.value) ? [
        Gn.value[0] || Ue && Ue[0] || "",
        Gn.value[1] || Ue && Ue[1] || ""
      ] : Gn.value !== null ? Gn.value : !Pn.value && Fn.value || !Ve.value && Fn.value ? "" : Ue ? hn.value ? Ue.join(", ") : Ue : "";
    }), _n = computed(() => re.type.includes("time")), Pn = computed(() => re.type.startsWith("time")), hn = computed(() => re.type === "dates"), On = computed(() => re.prefixIcon || (_n.value ? clock_default : calendar_default)), Dn = ref(!1), Rn = (Ue) => {
      re.readonly || bn.value || Dn.value && (Ue.stopPropagation(), Pt(), xe(null), qe(null, !0), Dn.value = !1, Ve.value = !1, Qn.value.handleClear && Qn.value.handleClear());
    }, Fn = computed(() => {
      const { modelValue: Ue } = re;
      return !Ue || isArray(Ue) && !Ue.filter(Boolean).length;
    }), kn = async (Ue) => {
      var Sn;
      re.readonly || bn.value || (((Sn = Ue.target) == null ? void 0 : Sn.tagName) !== "INPUT" || At.value.includes(document.activeElement)) && (Ve.value = !0);
    }, An = () => {
      re.readonly || bn.value || !Fn.value && re.clearable && (Dn.value = !0);
    }, Vn = () => {
      Dn.value = !1;
    }, Bn = (Ue) => {
      var Sn;
      (((Sn = Ue.touches[0].target) == null ? void 0 : Sn.tagName) !== "INPUT" || At.value.includes(document.activeElement)) && (Ve.value = !0);
    }, Wn = computed(() => re.type.includes("range")), Yn = useSize(), Xn = computed(() => {
      var Ue, Sn;
      return (Sn = (Ue = unref(_e)) == null ? void 0 : Ue.popperRef) == null ? void 0 : Sn.contentRef;
    }), eo = computed(() => {
      var Ue;
      return unref(Wn) ? unref($e) : (Ue = unref($e)) == null ? void 0 : Ue.$el;
    });
    onClickOutside(eo, (Ue) => {
      const Sn = unref(Xn), xn = unref(eo);
      Sn && (Ue.target === Sn || Ue.composedPath().includes(Sn)) || Ue.target === xn || Ue.composedPath().includes(xn) || (Ve.value = !1);
    });
    const Gn = ref(null), no = () => {
      if (Gn.value) {
        const Ue = oo(Et.value);
        Ue && Hn(Ue) && (xe(isArray(Ue) ? Ue.map((Sn) => Sn.toDate()) : Ue.toDate()), Gn.value = null);
      }
      Gn.value === "" && (xe(null), qe(null), Gn.value = null);
    }, oo = (Ue) => Ue ? Qn.value.parseUserInput(Ue) : null, zn = (Ue) => Ue ? Qn.value.formatToString(Ue) : null, Hn = (Ue) => Qn.value.isValidValue(Ue), qn = async (Ue) => {
      if (re.readonly || bn.value)
        return;
      const { code: Sn } = Ue;
      if (ze(Ue), Sn === EVENT_CODE.esc) {
        Ve.value === !0 && (Ve.value = !1, Ue.preventDefault(), Ue.stopPropagation());
        return;
      }
      if (Sn === EVENT_CODE.down && (Qn.value.handleFocusPicker && (Ue.preventDefault(), Ue.stopPropagation()), Ve.value === !1 && (Ve.value = !0, await nextTick()), Qn.value.handleFocusPicker)) {
        Qn.value.handleFocusPicker();
        return;
      }
      if (Sn === EVENT_CODE.tab) {
        Oe = !0;
        return;
      }
      if (Sn === EVENT_CODE.enter || Sn === EVENT_CODE.numpadEnter) {
        (Gn.value === null || Gn.value === "" || Hn(oo(Et.value))) && (no(), Ve.value = !1), Ue.stopPropagation();
        return;
      }
      if (Gn.value) {
        Ue.stopPropagation();
        return;
      }
      Qn.value.handleKeydownInput && Qn.value.handleKeydownInput(Ue);
    }, Zn = (Ue) => {
      Gn.value = Ue, Ve.value || (Ve.value = !0);
    }, lo = (Ue) => {
      const Sn = Ue.target;
      Gn.value ? Gn.value = [Sn.value, Gn.value[1]] : Gn.value = [Sn.value, null];
    }, ao = (Ue) => {
      const Sn = Ue.target;
      Gn.value ? Gn.value = [Gn.value[0], Sn.value] : Gn.value = [null, Sn.value];
    }, In = () => {
      var Ue;
      const Sn = Gn.value, xn = oo(Sn && Sn[0]), jn = unref(kt);
      if (xn && xn.isValid()) {
        Gn.value = [
          zn(xn),
          ((Ue = Et.value) == null ? void 0 : Ue[1]) || null
        ];
        const Ln = [xn, jn && (jn[1] || null)];
        Hn(Ln) && (xe(Ln), Gn.value = null);
      }
    }, Jn = () => {
      var Ue;
      const Sn = unref(Gn), xn = oo(Sn && Sn[1]), jn = unref(kt);
      if (xn && xn.isValid()) {
        Gn.value = [
          ((Ue = unref(Et)) == null ? void 0 : Ue[0]) || null,
          zn(xn)
        ];
        const Ln = [jn && jn[0], xn];
        Hn(Ln) && (xe(Ln), Gn.value = null);
      }
    }, Qn = ref({}), ro = (Ue) => {
      Qn.value[Ue[0]] = Ue[1], Qn.value.panelReady = !0;
    }, $n = (Ue) => {
      oe("calendar-change", Ue);
    }, Mn = (Ue, Sn, xn) => {
      oe("panel-change", Ue, Sn, xn);
    };
    return provide("EP_PICKER_BASE", {
      props: re
    }), k({
      focus: Lt,
      handleFocusInput: Dt,
      handleBlurInput: jt,
      onPick: vn
    }), (Ue, Sn) => (openBlock(), createBlock(unref(ElTooltip), mergeProps({
      ref_key: "refPopper",
      ref: _e,
      visible: Ve.value,
      effect: "light",
      pure: "",
      trigger: "click"
    }, Ue.$attrs, {
      role: "dialog",
      teleported: "",
      transition: `${unref(le).namespace.value}-zoom-in-top`,
      "popper-class": [`${unref(le).namespace.value}-picker__popper`, Ue.popperClass],
      "popper-options": unref(Ce),
      "fallback-placements": ["bottom", "top", "right", "left"],
      "gpu-acceleration": !1,
      "stop-popper-mouse-event": !1,
      "hide-after": 0,
      persistent: "",
      onBeforeShow: En,
      onShow: Nn,
      onHide: wn
    }), {
      default: withCtx(() => [
        unref(Wn) ? (openBlock(), createElementBlock("div", {
          key: 1,
          ref_key: "inputRef",
          ref: $e,
          class: normalizeClass([
            unref(le).b("editor"),
            unref(le).bm("editor", Ue.type),
            unref(ie).e("wrapper"),
            unref(le).is("disabled", unref(bn)),
            unref(le).is("active", Ve.value),
            unref(ue).b("editor"),
            unref(Yn) ? unref(ue).bm("editor", unref(Yn)) : "",
            Ue.$attrs.class
          ]),
          style: normalizeStyle(Ue.$attrs.style),
          onClick: Dt,
          onMouseenter: An,
          onMouseleave: Vn,
          onTouchstart: Bn,
          onKeydown: qn
        }, [
          unref(On) ? (openBlock(), createBlock(unref(ElIcon), {
            key: 0,
            class: normalizeClass([unref(ie).e("icon"), unref(ue).e("icon")]),
            onMousedown: withModifiers(kn, ["prevent"]),
            onTouchstart: Bn
          }, {
            default: withCtx(() => [
              (openBlock(), createBlock(resolveDynamicComponent(unref(On))))
            ]),
            _: 1
          }, 8, ["class", "onMousedown"])) : createCommentVNode("v-if", !0),
          createElementVNode("input", {
            id: Ue.id && Ue.id[0],
            autocomplete: "off",
            name: Ue.name && Ue.name[0],
            placeholder: Ue.startPlaceholder,
            value: unref(Et) && unref(Et)[0],
            disabled: unref(bn),
            readonly: !Ue.editable || Ue.readonly,
            class: normalizeClass(unref(ue).b("input")),
            onMousedown: kn,
            onInput: lo,
            onChange: In,
            onFocus: Dt,
            onBlur: jt
          }, null, 42, _hoisted_1$r),
          renderSlot(Ue.$slots, "range-separator", {}, () => [
            createElementVNode("span", {
              class: normalizeClass(unref(ue).b("separator"))
            }, toDisplayString(Ue.rangeSeparator), 3)
          ]),
          createElementVNode("input", {
            id: Ue.id && Ue.id[1],
            autocomplete: "off",
            name: Ue.name && Ue.name[1],
            placeholder: Ue.endPlaceholder,
            value: unref(Et) && unref(Et)[1],
            disabled: unref(bn),
            readonly: !Ue.editable || Ue.readonly,
            class: normalizeClass(unref(ue).b("input")),
            onMousedown: kn,
            onFocus: Dt,
            onBlur: jt,
            onInput: ao,
            onChange: Jn
          }, null, 42, _hoisted_2$i),
          Ue.clearIcon ? (openBlock(), createBlock(unref(ElIcon), {
            key: 1,
            class: normalizeClass([
              unref(ie).e("icon"),
              unref(ue).e("close-icon"),
              {
                [unref(ue).e("close-icon--hidden")]: !Dn.value
              }
            ]),
            onClick: Rn
          }, {
            default: withCtx(() => [
              (openBlock(), createBlock(resolveDynamicComponent(Ue.clearIcon)))
            ]),
            _: 1
          }, 8, ["class"])) : createCommentVNode("v-if", !0)
        ], 38)) : (openBlock(), createBlock(unref(ElInput), {
          key: 0,
          id: Ue.id,
          ref_key: "inputRef",
          ref: $e,
          "container-role": "combobox",
          "model-value": unref(Et),
          name: Ue.name,
          size: unref(Yn),
          disabled: unref(bn),
          placeholder: Ue.placeholder,
          class: normalizeClass([unref(le).b("editor"), unref(le).bm("editor", Ue.type), Ue.$attrs.class]),
          style: normalizeStyle(Ue.$attrs.style),
          readonly: !Ue.editable || Ue.readonly || unref(hn) || Ue.type === "week",
          label: Ue.label,
          tabindex: Ue.tabindex,
          "validate-event": Ue.validateEvent,
          onInput: Zn,
          onFocus: Dt,
          onBlur: jt,
          onKeydown: qn,
          onChange: no,
          onMousedown: kn,
          onMouseenter: An,
          onMouseleave: Vn,
          onTouchstart: Bn,
          onClick: Sn[0] || (Sn[0] = withModifiers(() => {
          }, ["stop"]))
        }, {
          prefix: withCtx(() => [
            unref(On) ? (openBlock(), createBlock(unref(ElIcon), {
              key: 0,
              class: normalizeClass(unref(ie).e("icon")),
              onMousedown: withModifiers(kn, ["prevent"]),
              onTouchstart: Bn
            }, {
              default: withCtx(() => [
                (openBlock(), createBlock(resolveDynamicComponent(unref(On))))
              ]),
              _: 1
            }, 8, ["class", "onMousedown"])) : createCommentVNode("v-if", !0)
          ]),
          suffix: withCtx(() => [
            Dn.value && Ue.clearIcon ? (openBlock(), createBlock(unref(ElIcon), {
              key: 0,
              class: normalizeClass(`${unref(ie).e("icon")} clear-icon`),
              onClick: withModifiers(Rn, ["stop"])
            }, {
              default: withCtx(() => [
                (openBlock(), createBlock(resolveDynamicComponent(Ue.clearIcon)))
              ]),
              _: 1
            }, 8, ["class", "onClick"])) : createCommentVNode("v-if", !0)
          ]),
          _: 1
        }, 8, ["id", "model-value", "name", "size", "disabled", "placeholder", "class", "style", "readonly", "label", "tabindex", "validate-event", "onKeydown"]))
      ]),
      content: withCtx(() => [
        renderSlot(Ue.$slots, "default", {
          visible: Ve.value,
          actualVisible: Ne.value,
          parsedValue: unref(kt),
          format: Ue.format,
          unlinkPanels: Ue.unlinkPanels,
          type: Ue.type,
          defaultValue: Ue.defaultValue,
          onPick: vn,
          onSelectRange: Fe,
          onSetPickerOption: ro,
          onCalendarChange: $n,
          onPanelChange: Mn,
          onKeydown: Tn,
          onMousedown: Sn[1] || (Sn[1] = withModifiers(() => {
          }, ["stop"]))
        })
      ]),
      _: 3
    }, 16, ["visible", "transition", "popper-class", "popper-options"]));
  }
});
var CommonPicker = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/time-picker/src/common/picker.vue"]]);
const panelTimePickerProps = buildProps({
  ...timePanelSharedProps,
  datetimeRole: String,
  parsedValue: {
    type: definePropType(Object)
  }
}), useTimePanel = ({
  getAvailableHours: e,
  getAvailableMinutes: k,
  getAvailableSeconds: oe
}) => {
  const re = (ie, ue, de, pe) => {
    const Ce = {
      hour: e,
      minute: k,
      second: oe
    };
    let _e = ie;
    return ["hour", "minute", "second"].forEach(($e) => {
      if (Ce[$e]) {
        let Ve;
        const Ne = Ce[$e];
        switch ($e) {
          case "minute": {
            Ve = Ne(_e.hour(), ue, pe);
            break;
          }
          case "second": {
            Ve = Ne(_e.hour(), _e.minute(), ue, pe);
            break;
          }
          default: {
            Ve = Ne(ue, pe);
            break;
          }
        }
        if ((Ve == null ? void 0 : Ve.length) && !Ve.includes(_e[$e]())) {
          const he = de ? 0 : Ve.length - 1;
          _e = _e[$e](Ve[he]);
        }
      }
    }), _e;
  }, ae = {};
  return {
    timePickerOptions: ae,
    getAvailableTime: re,
    onSetOption: ([ie, ue]) => {
      ae[ie] = ue;
    }
  };
}, makeAvailableArr = (e) => {
  const k = (re, ae) => re || ae, oe = (re) => re !== !0;
  return e.map(k).filter(oe);
}, getTimeLists = (e, k, oe) => ({
  getHoursList: (ie, ue) => makeList(24, e && (() => e == null ? void 0 : e(ie, ue))),
  getMinutesList: (ie, ue, de) => makeList(60, k && (() => k == null ? void 0 : k(ie, ue, de))),
  getSecondsList: (ie, ue, de, pe) => makeList(60, oe && (() => oe == null ? void 0 : oe(ie, ue, de, pe)))
}), buildAvailableTimeSlotGetter = (e, k, oe) => {
  const { getHoursList: re, getMinutesList: ae, getSecondsList: le } = getTimeLists(e, k, oe);
  return {
    getAvailableHours: (pe, Ce) => makeAvailableArr(re(pe, Ce)),
    getAvailableMinutes: (pe, Ce, _e) => makeAvailableArr(ae(pe, Ce, _e)),
    getAvailableSeconds: (pe, Ce, _e, $e) => makeAvailableArr(le(pe, Ce, _e, $e))
  };
}, useOldValue = (e) => {
  const k = ref(e.parsedValue);
  return watch(() => e.visible, (oe) => {
    oe || (k.value = e.parsedValue);
  }), k;
}, nodeList = /* @__PURE__ */ new Map();
let startClick;
isClient$1 && (document.addEventListener("mousedown", (e) => startClick = e), document.addEventListener("mouseup", (e) => {
  for (const k of nodeList.values())
    for (const { documentHandler: oe } of k)
      oe(e, startClick);
}));
function createDocumentHandler(e, k) {
  let oe = [];
  return Array.isArray(k.arg) ? oe = k.arg : isElement(k.arg) && oe.push(k.arg), function(re, ae) {
    const le = k.instance.popperRef, ie = re.target, ue = ae == null ? void 0 : ae.target, de = !k || !k.instance, pe = !ie || !ue, Ce = e.contains(ie) || e.contains(ue), _e = e === ie, $e = oe.length && oe.some((Ne) => Ne == null ? void 0 : Ne.contains(ie)) || oe.length && oe.includes(ue), Ve = le && (le.contains(ie) || le.contains(ue));
    de || pe || Ce || _e || $e || Ve || k.value(re, ae);
  };
}
const ClickOutside = {
  beforeMount(e, k) {
    nodeList.has(e) || nodeList.set(e, []), nodeList.get(e).push({
      documentHandler: createDocumentHandler(e, k),
      bindingFn: k.value
    });
  },
  updated(e, k) {
    nodeList.has(e) || nodeList.set(e, []);
    const oe = nodeList.get(e), re = oe.findIndex((le) => le.bindingFn === k.oldValue), ae = {
      documentHandler: createDocumentHandler(e, k),
      bindingFn: k.value
    };
    re >= 0 ? oe.splice(re, 1, ae) : oe.push(ae);
  },
  unmounted(e) {
    nodeList.delete(e);
  }
}, RepeatClick = {
  beforeMount(e, k) {
    let oe = null, re = !1;
    const ae = () => k.value && k.value(), le = () => {
      clearInterval(oe), oe = null, re || ae(), re = !1;
    };
    e.addEventListener("mousedown", (ie) => {
      ie.button === 0 && (document.addEventListener("mouseup", le, { once: !0 }), clearInterval(oe), oe = setInterval(() => {
        re = !0, ae();
      }, 100));
    });
  }
};
var v = !1, o, f, s, u, d, N, l, p, m, w, D, x, E, M, F;
function a() {
  if (!v) {
    v = !0;
    var e = navigator.userAgent, k = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(e), oe = /(Mac OS X)|(Windows)|(Linux)/.exec(e);
    if (x = /\b(iPhone|iP[ao]d)/.exec(e), E = /\b(iP[ao]d)/.exec(e), w = /Android/i.exec(e), M = /FBAN\/\w+;/i.exec(e), F = /Mobile/i.exec(e), D = !!/Win64/.exec(e), k) {
      o = k[1] ? parseFloat(k[1]) : k[5] ? parseFloat(k[5]) : NaN, o && document && document.documentMode && (o = document.documentMode);
      var re = /(?:Trident\/(\d+.\d+))/.exec(e);
      N = re ? parseFloat(re[1]) + 4 : o, f = k[2] ? parseFloat(k[2]) : NaN, s = k[3] ? parseFloat(k[3]) : NaN, u = k[4] ? parseFloat(k[4]) : NaN, u ? (k = /(?:Chrome\/(\d+\.\d+))/.exec(e), d = k && k[1] ? parseFloat(k[1]) : NaN) : d = NaN;
    } else
      o = f = s = d = u = NaN;
    if (oe) {
      if (oe[1]) {
        var ae = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(e);
        l = ae ? parseFloat(ae[1].replace("_", ".")) : !0;
      } else
        l = !1;
      p = !!oe[2], m = !!oe[3];
    } else
      l = p = m = !1;
  }
}
var _ = { ie: function() {
  return a() || o;
}, ieCompatibilityMode: function() {
  return a() || N > o;
}, ie64: function() {
  return _.ie() && D;
}, firefox: function() {
  return a() || f;
}, opera: function() {
  return a() || s;
}, webkit: function() {
  return a() || u;
}, safari: function() {
  return _.webkit();
}, chrome: function() {
  return a() || d;
}, windows: function() {
  return a() || p;
}, osx: function() {
  return a() || l;
}, linux: function() {
  return a() || m;
}, iphone: function() {
  return a() || x;
}, mobile: function() {
  return a() || x || E || w || F;
}, nativeApp: function() {
  return a() || M;
}, android: function() {
  return a() || w;
}, ipad: function() {
  return a() || E;
} }, A = _, c = !!(typeof window < "u" && window.document && window.document.createElement), U = { canUseDOM: c, canUseWorkers: typeof Worker < "u", canUseEventListeners: c && !!(window.addEventListener || window.attachEvent), canUseViewport: c && !!window.screen, isInWorker: !c }, h = U, X;
h.canUseDOM && (X = document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("", "") !== !0);
function S(e, k) {
  if (!h.canUseDOM || k && !("addEventListener" in document))
    return !1;
  var oe = "on" + e, re = oe in document;
  if (!re) {
    var ae = document.createElement("div");
    ae.setAttribute(oe, "return;"), re = typeof ae[oe] == "function";
  }
  return !re && X && e === "wheel" && (re = document.implementation.hasFeature("Events.wheel", "3.0")), re;
}
var b = S, O = 10, I = 40, P = 800;
function T(e) {
  var k = 0, oe = 0, re = 0, ae = 0;
  return "detail" in e && (oe = e.detail), "wheelDelta" in e && (oe = -e.wheelDelta / 120), "wheelDeltaY" in e && (oe = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (k = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (k = oe, oe = 0), re = k * O, ae = oe * O, "deltaY" in e && (ae = e.deltaY), "deltaX" in e && (re = e.deltaX), (re || ae) && e.deltaMode && (e.deltaMode == 1 ? (re *= I, ae *= I) : (re *= P, ae *= P)), re && !k && (k = re < 1 ? -1 : 1), ae && !oe && (oe = ae < 1 ? -1 : 1), { spinX: k, spinY: oe, pixelX: re, pixelY: ae };
}
T.getEventType = function() {
  return A.firefox() ? "DOMMouseScroll" : b("wheel") ? "wheel" : "mousewheel";
};
var Y = T;
/**
* Checks if an event is supported in the current execution environment.
*
* NOTE: This will not work correctly for non-generic events such as `change`,
* `reset`, `load`, `error`, and `select`.
*
* Borrows from Modernizr.
*
* @param {string} eventNameSuffix Event name, e.g. "click".
* @param {?boolean} capture Check if the capture phase is supported.
* @return {boolean} True if the event is supported.
* @internal
* @license Modernizr 3.0.0pre (Custom Build) | MIT
*/
const mousewheel = function(e, k) {
  if (e && e.addEventListener) {
    const oe = function(re) {
      const ae = Y(re);
      k && Reflect.apply(k, this, [re, ae]);
    };
    e.addEventListener("wheel", oe, { passive: !0 });
  }
}, Mousewheel = {
  beforeMount(e, k) {
    mousewheel(e, k.value);
  }
}, basicTimeSpinnerProps = buildProps({
  role: {
    type: String,
    required: !0
  },
  spinnerDate: {
    type: definePropType(Object),
    required: !0
  },
  showSeconds: {
    type: Boolean,
    default: !0
  },
  arrowControl: Boolean,
  amPmMode: {
    type: definePropType(String),
    default: ""
  },
  ...disabledTimeListsProps
}), _hoisted_1$q = ["onClick"], _hoisted_2$h = ["onMouseenter"], _sfc_main$I = /* @__PURE__ */ defineComponent({
  __name: "basic-time-spinner",
  props: basicTimeSpinnerProps,
  emits: ["change", "select-range", "set-option"],
  setup(e, { emit: k }) {
    const oe = e, re = useNamespace("time"), { getHoursList: ae, getMinutesList: le, getSecondsList: ie } = getTimeLists(oe.disabledHours, oe.disabledMinutes, oe.disabledSeconds);
    let ue = !1;
    const de = ref(), pe = ref(), Ce = ref(), _e = ref(), $e = {
      hours: pe,
      minutes: Ce,
      seconds: _e
    }, Ve = computed(() => oe.showSeconds ? timeUnits : timeUnits.slice(0, 2)), Ne = computed(() => {
      const { spinnerDate: kt } = oe, Et = kt.hour(), _n = kt.minute(), Pn = kt.second();
      return { hours: Et, minutes: _n, seconds: Pn };
    }), he = computed(() => {
      const { hours: kt, minutes: Et } = unref(Ne);
      return {
        hours: ae(oe.role),
        minutes: le(kt, oe.role),
        seconds: ie(kt, Et, oe.role)
      };
    }), Oe = computed(() => {
      const { hours: kt, minutes: Et, seconds: _n } = unref(Ne);
      return {
        hours: buildTimeList(kt, 23),
        minutes: buildTimeList(Et, 59),
        seconds: buildTimeList(_n, 59)
      };
    }), Ie = debounce((kt) => {
      ue = !1, ze(kt);
    }, 200), qe = (kt) => {
      if (!!!oe.amPmMode)
        return "";
      const _n = oe.amPmMode === "A";
      let Pn = kt < 12 ? " am" : " pm";
      return _n && (Pn = Pn.toUpperCase()), Pn;
    }, xe = (kt) => {
      let Et;
      switch (kt) {
        case "hours":
          Et = [0, 2];
          break;
        case "minutes":
          Et = [3, 5];
          break;
        case "seconds":
          Et = [6, 8];
          break;
      }
      const [_n, Pn] = Et;
      k("select-range", _n, Pn), de.value = kt;
    }, ze = (kt) => {
      Pt(kt, unref(Ne)[kt]);
    }, At = () => {
      ze("hours"), ze("minutes"), ze("seconds");
    }, Fe = (kt) => kt.querySelector(`.${re.namespace.value}-scrollbar__wrap`), Pt = (kt, Et) => {
      if (oe.arrowControl)
        return;
      const _n = unref($e[kt]);
      _n && _n.$el && (Fe(_n.$el).scrollTop = Math.max(0, Et * vn(kt)));
    }, vn = (kt) => {
      const Et = unref($e[kt]);
      return (Et == null ? void 0 : Et.$el.querySelector("li").offsetHeight) || 0;
    }, En = () => {
      Tn(1);
    }, Nn = () => {
      Tn(-1);
    }, Tn = (kt) => {
      de.value || xe("hours");
      const Et = de.value;
      let _n = unref(Ne)[Et];
      const Pn = de.value === "hours" ? 24 : 60;
      _n = (_n + kt + Pn) % Pn, wn(Et, _n), Pt(Et, _n), nextTick(() => xe(Et));
    }, wn = (kt, Et) => {
      if (unref(he)[kt][Et])
        return;
      const { hours: hn, minutes: On, seconds: Dn } = unref(Ne);
      let Rn;
      switch (kt) {
        case "hours":
          Rn = oe.spinnerDate.hour(Et).minute(On).second(Dn);
          break;
        case "minutes":
          Rn = oe.spinnerDate.hour(hn).minute(Et).second(Dn);
          break;
        case "seconds":
          Rn = oe.spinnerDate.hour(hn).minute(On).second(Et);
          break;
      }
      k("change", Rn);
    }, Lt = (kt, { value: Et, disabled: _n }) => {
      _n || (wn(kt, Et), xe(kt), Pt(kt, Et));
    }, Dt = (kt) => {
      ue = !0, Ie(kt);
      const Et = Math.min(Math.round((Fe(unref($e[kt]).$el).scrollTop - (Cn(kt) * 0.5 - 10) / vn(kt) + 3) / vn(kt)), kt === "hours" ? 23 : 59);
      wn(kt, Et);
    }, Cn = (kt) => unref($e[kt]).$el.offsetHeight, jt = () => {
      const kt = (Et) => {
        const _n = unref($e[Et]);
        _n && _n.$el && (Fe(_n.$el).onscroll = () => {
          Dt(Et);
        });
      };
      kt("hours"), kt("minutes"), kt("seconds");
    };
    onMounted(() => {
      nextTick(() => {
        !oe.arrowControl && jt(), At(), oe.role === "start" && xe("hours");
      });
    });
    const bn = (kt, Et) => {
      $e[Et].value = kt;
    };
    return k("set-option", [`${oe.role}_scrollDown`, Tn]), k("set-option", [`${oe.role}_emitSelectRange`, xe]), watch(() => oe.spinnerDate, () => {
      ue || At();
    }), (kt, Et) => (openBlock(), createElementBlock("div", {
      class: normalizeClass([unref(re).b("spinner"), { "has-seconds": kt.showSeconds }])
    }, [
      kt.arrowControl ? createCommentVNode("v-if", !0) : (openBlock(!0), createElementBlock(Fragment, { key: 0 }, renderList(unref(Ve), (_n) => (openBlock(), createBlock(unref(ElScrollbar), {
        key: _n,
        ref_for: !0,
        ref: (Pn) => bn(Pn, _n),
        class: normalizeClass(unref(re).be("spinner", "wrapper")),
        "wrap-style": "max-height: inherit;",
        "view-class": unref(re).be("spinner", "list"),
        noresize: "",
        tag: "ul",
        onMouseenter: (Pn) => xe(_n),
        onMousemove: (Pn) => ze(_n)
      }, {
        default: withCtx(() => [
          (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(he)[_n], (Pn, hn) => (openBlock(), createElementBlock("li", {
            key: hn,
            class: normalizeClass([
              unref(re).be("spinner", "item"),
              unref(re).is("active", hn === unref(Ne)[_n]),
              unref(re).is("disabled", Pn)
            ]),
            onClick: (On) => Lt(_n, { value: hn, disabled: Pn })
          }, [
            _n === "hours" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(toDisplayString(("0" + (kt.amPmMode ? hn % 12 || 12 : hn)).slice(-2)) + toDisplayString(qe(hn)), 1)
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createTextVNode(toDisplayString(("0" + hn).slice(-2)), 1)
            ], 64))
          ], 10, _hoisted_1$q))), 128))
        ]),
        _: 2
      }, 1032, ["class", "view-class", "onMouseenter", "onMousemove"]))), 128)),
      kt.arrowControl ? (openBlock(!0), createElementBlock(Fragment, { key: 1 }, renderList(unref(Ve), (_n) => (openBlock(), createElementBlock("div", {
        key: _n,
        class: normalizeClass([unref(re).be("spinner", "wrapper"), unref(re).is("arrow")]),
        onMouseenter: (Pn) => xe(_n)
      }, [
        withDirectives((openBlock(), createBlock(unref(ElIcon), {
          class: normalizeClass(["arrow-up", unref(re).be("spinner", "arrow")])
        }, {
          default: withCtx(() => [
            createVNode(unref(arrow_up_default))
          ]),
          _: 1
        }, 8, ["class"])), [
          [unref(RepeatClick), Nn]
        ]),
        withDirectives((openBlock(), createBlock(unref(ElIcon), {
          class: normalizeClass(["arrow-down", unref(re).be("spinner", "arrow")])
        }, {
          default: withCtx(() => [
            createVNode(unref(arrow_down_default))
          ]),
          _: 1
        }, 8, ["class"])), [
          [unref(RepeatClick), En]
        ]),
        createElementVNode("ul", {
          class: normalizeClass(unref(re).be("spinner", "list"))
        }, [
          (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(Oe)[_n], (Pn, hn) => (openBlock(), createElementBlock("li", {
            key: hn,
            class: normalizeClass([
              unref(re).be("spinner", "item"),
              unref(re).is("active", Pn === unref(Ne)[_n]),
              unref(re).is("disabled", unref(he)[_n][Pn])
            ])
          }, [
            typeof Pn == "number" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              _n === "hours" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createTextVNode(toDisplayString(("0" + (kt.amPmMode ? Pn % 12 || 12 : Pn)).slice(-2)) + toDisplayString(qe(Pn)), 1)
              ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createTextVNode(toDisplayString(("0" + Pn).slice(-2)), 1)
              ], 64))
            ], 64)) : createCommentVNode("v-if", !0)
          ], 2))), 128))
        ], 2)
      ], 42, _hoisted_2$h))), 128)) : createCommentVNode("v-if", !0)
    ], 2));
  }
});
var TimeSpinner = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/time-picker/src/time-picker-com/basic-time-spinner.vue"]]);
const _sfc_main$H = /* @__PURE__ */ defineComponent({
  __name: "panel-time-pick",
  props: panelTimePickerProps,
  emits: ["pick", "select-range", "set-picker-option"],
  setup(e, { emit: k }) {
    const oe = e, re = inject("EP_PICKER_BASE"), {
      arrowControl: ae,
      disabledHours: le,
      disabledMinutes: ie,
      disabledSeconds: ue,
      defaultValue: de
    } = re.props, { getAvailableHours: pe, getAvailableMinutes: Ce, getAvailableSeconds: _e } = buildAvailableTimeSlotGetter(le, ie, ue), $e = useNamespace("time"), { t: Ve, lang: Ne } = useLocale(), he = ref([0, 2]), Oe = useOldValue(oe), Ie = computed(() => isUndefined(oe.actualVisible) ? `${$e.namespace.value}-zoom-in-top` : ""), qe = computed(() => oe.format.includes("ss")), xe = computed(() => oe.format.includes("A") ? "A" : oe.format.includes("a") ? "a" : ""), ze = (kt) => {
      const Et = dayjs(kt).locale(Ne.value), _n = Dt(Et);
      return Et.isSame(_n);
    }, At = () => {
      k("pick", Oe.value, !1);
    }, Fe = (kt = !1, Et = !1) => {
      Et || k("pick", oe.parsedValue, kt);
    }, Pt = (kt) => {
      if (!oe.visible)
        return;
      const Et = Dt(kt).millisecond(0);
      k("pick", Et, !0);
    }, vn = (kt, Et) => {
      k("select-range", kt, Et), he.value = [kt, Et];
    }, En = (kt) => {
      const Et = [0, 3].concat(qe.value ? [6] : []), _n = ["hours", "minutes"].concat(qe.value ? ["seconds"] : []), hn = (Et.indexOf(he.value[0]) + kt + Et.length) % Et.length;
      Tn.start_emitSelectRange(_n[hn]);
    }, Nn = (kt) => {
      const Et = kt.code, { left: _n, right: Pn, up: hn, down: On } = EVENT_CODE;
      if ([_n, Pn].includes(Et)) {
        En(Et === _n ? -1 : 1), kt.preventDefault();
        return;
      }
      if ([hn, On].includes(Et)) {
        const Dn = Et === hn ? -1 : 1;
        Tn.start_scrollDown(Dn), kt.preventDefault();
        return;
      }
    }, { timePickerOptions: Tn, onSetOption: wn, getAvailableTime: Lt } = useTimePanel({
      getAvailableHours: pe,
      getAvailableMinutes: Ce,
      getAvailableSeconds: _e
    }), Dt = (kt) => Lt(kt, oe.datetimeRole || "", !0), Cn = (kt) => kt ? dayjs(kt, oe.format).locale(Ne.value) : null, jt = (kt) => kt ? kt.format(oe.format) : null, bn = () => dayjs(de).locale(Ne.value);
    return k("set-picker-option", ["isValidValue", ze]), k("set-picker-option", ["formatToString", jt]), k("set-picker-option", ["parseUserInput", Cn]), k("set-picker-option", ["handleKeydownInput", Nn]), k("set-picker-option", ["getRangeAvailableTime", Dt]), k("set-picker-option", ["getDefaultValue", bn]), (kt, Et) => (openBlock(), createBlock(Transition, { name: unref(Ie) }, {
      default: withCtx(() => [
        kt.actualVisible || kt.visible ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref($e).b("panel"))
        }, [
          createElementVNode("div", {
            class: normalizeClass([unref($e).be("panel", "content"), { "has-seconds": unref(qe) }])
          }, [
            createVNode(TimeSpinner, {
              ref: "spinner",
              role: kt.datetimeRole || "start",
              "arrow-control": unref(ae),
              "show-seconds": unref(qe),
              "am-pm-mode": unref(xe),
              "spinner-date": kt.parsedValue,
              "disabled-hours": unref(le),
              "disabled-minutes": unref(ie),
              "disabled-seconds": unref(ue),
              onChange: Pt,
              onSetOption: unref(wn),
              onSelectRange: vn
            }, null, 8, ["role", "arrow-control", "show-seconds", "am-pm-mode", "spinner-date", "disabled-hours", "disabled-minutes", "disabled-seconds", "onSetOption"])
          ], 2),
          createElementVNode("div", {
            class: normalizeClass(unref($e).be("panel", "footer"))
          }, [
            createElementVNode("button", {
              type: "button",
              class: normalizeClass([unref($e).be("panel", "btn"), "cancel"]),
              onClick: At
            }, toDisplayString(unref(Ve)("el.datepicker.cancel")), 3),
            createElementVNode("button", {
              type: "button",
              class: normalizeClass([unref($e).be("panel", "btn"), "confirm"]),
              onClick: Et[0] || (Et[0] = (_n) => Fe())
            }, toDisplayString(unref(Ve)("el.datepicker.confirm")), 3)
          ], 2)
        ], 2)) : createCommentVNode("v-if", !0)
      ]),
      _: 1
    }, 8, ["name"]));
  }
});
var TimePickPanel = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/time-picker/src/time-picker-com/panel-time-pick.vue"]]);
const panelTimeRangeProps = buildProps({
  ...timePanelSharedProps,
  parsedValue: {
    type: definePropType(Array)
  }
}), _hoisted_1$p = ["disabled"], _sfc_main$G = /* @__PURE__ */ defineComponent({
  __name: "panel-time-range",
  props: panelTimeRangeProps,
  emits: ["pick", "select-range", "set-picker-option"],
  setup(e, { emit: k }) {
    const oe = e, re = (Vn, Bn) => {
      const Wn = [];
      for (let Yn = Vn; Yn <= Bn; Yn++)
        Wn.push(Yn);
      return Wn;
    }, { t: ae, lang: le } = useLocale(), ie = useNamespace("time"), ue = useNamespace("picker"), de = inject("EP_PICKER_BASE"), {
      arrowControl: pe,
      disabledHours: Ce,
      disabledMinutes: _e,
      disabledSeconds: $e,
      defaultValue: Ve
    } = de.props, Ne = computed(() => oe.parsedValue[0]), he = computed(() => oe.parsedValue[1]), Oe = useOldValue(oe), Ie = () => {
      k("pick", Oe.value, !1);
    }, qe = computed(() => oe.format.includes("ss")), xe = computed(() => oe.format.includes("A") ? "A" : oe.format.includes("a") ? "a" : ""), ze = (Vn = !1) => {
      k("pick", [Ne.value, he.value], Vn);
    }, At = (Vn) => {
      vn(Vn.millisecond(0), he.value);
    }, Fe = (Vn) => {
      vn(Ne.value, Vn.millisecond(0));
    }, Pt = (Vn) => {
      const Bn = Vn.map((Yn) => dayjs(Yn).locale(le.value)), Wn = Et(Bn);
      return Bn[0].isSame(Wn[0]) && Bn[1].isSame(Wn[1]);
    }, vn = (Vn, Bn) => {
      k("pick", [Vn, Bn], !0);
    }, En = computed(() => Ne.value > he.value), Nn = ref([0, 2]), Tn = (Vn, Bn) => {
      k("select-range", Vn, Bn, "min"), Nn.value = [Vn, Bn];
    }, wn = computed(() => qe.value ? 11 : 8), Lt = (Vn, Bn) => {
      k("select-range", Vn, Bn, "max");
      const Wn = unref(wn);
      Nn.value = [Vn + Wn, Bn + Wn];
    }, Dt = (Vn) => {
      const Bn = qe.value ? [0, 3, 6, 11, 14, 17] : [0, 3, 8, 11], Wn = ["hours", "minutes"].concat(qe.value ? ["seconds"] : []), Xn = (Bn.indexOf(Nn.value[0]) + Vn + Bn.length) % Bn.length, eo = Bn.length / 2;
      Xn < eo ? On.start_emitSelectRange(Wn[Xn]) : On.end_emitSelectRange(Wn[Xn - eo]);
    }, Cn = (Vn) => {
      const Bn = Vn.code, { left: Wn, right: Yn, up: Xn, down: eo } = EVENT_CODE;
      if ([Wn, Yn].includes(Bn)) {
        Dt(Bn === Wn ? -1 : 1), Vn.preventDefault();
        return;
      }
      if ([Xn, eo].includes(Bn)) {
        const Gn = Bn === Xn ? -1 : 1, no = Nn.value[0] < wn.value ? "start" : "end";
        On[`${no}_scrollDown`](Gn), Vn.preventDefault();
        return;
      }
    }, jt = (Vn, Bn) => {
      const Wn = Ce ? Ce(Vn) : [], Yn = Vn === "start", eo = (Bn || (Yn ? he.value : Ne.value)).hour(), Gn = Yn ? re(eo + 1, 23) : re(0, eo - 1);
      return union$1(Wn, Gn);
    }, bn = (Vn, Bn, Wn) => {
      const Yn = _e ? _e(Vn, Bn) : [], Xn = Bn === "start", eo = Wn || (Xn ? he.value : Ne.value), Gn = eo.hour();
      if (Vn !== Gn)
        return Yn;
      const no = eo.minute(), oo = Xn ? re(no + 1, 59) : re(0, no - 1);
      return union$1(Yn, oo);
    }, kt = (Vn, Bn, Wn, Yn) => {
      const Xn = $e ? $e(Vn, Bn, Wn) : [], eo = Wn === "start", Gn = Yn || (eo ? he.value : Ne.value), no = Gn.hour(), oo = Gn.minute();
      if (Vn !== no || Bn !== oo)
        return Xn;
      const zn = Gn.second(), Hn = eo ? re(zn + 1, 59) : re(0, zn - 1);
      return union$1(Xn, Hn);
    }, Et = ([Vn, Bn]) => [
      Dn(Vn, "start", !0, Bn),
      Dn(Bn, "end", !1, Vn)
    ], { getAvailableHours: _n, getAvailableMinutes: Pn, getAvailableSeconds: hn } = buildAvailableTimeSlotGetter(jt, bn, kt), {
      timePickerOptions: On,
      getAvailableTime: Dn,
      onSetOption: Rn
    } = useTimePanel({
      getAvailableHours: _n,
      getAvailableMinutes: Pn,
      getAvailableSeconds: hn
    }), Fn = (Vn) => Vn ? isArray(Vn) ? Vn.map((Bn) => dayjs(Bn, oe.format).locale(le.value)) : dayjs(Vn, oe.format).locale(le.value) : null, kn = (Vn) => Vn ? isArray(Vn) ? Vn.map((Bn) => Bn.format(oe.format)) : Vn.format(oe.format) : null, An = () => {
      if (isArray(Ve))
        return Ve.map((Bn) => dayjs(Bn).locale(le.value));
      const Vn = dayjs(Ve).locale(le.value);
      return [Vn, Vn.add(60, "m")];
    };
    return k("set-picker-option", ["formatToString", kn]), k("set-picker-option", ["parseUserInput", Fn]), k("set-picker-option", ["isValidValue", Pt]), k("set-picker-option", ["handleKeydownInput", Cn]), k("set-picker-option", ["getDefaultValue", An]), k("set-picker-option", ["getRangeAvailableTime", Et]), (Vn, Bn) => Vn.actualVisible ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass([unref(ie).b("range-picker"), unref(ue).b("panel")])
    }, [
      createElementVNode("div", {
        class: normalizeClass(unref(ie).be("range-picker", "content"))
      }, [
        createElementVNode("div", {
          class: normalizeClass(unref(ie).be("range-picker", "cell"))
        }, [
          createElementVNode("div", {
            class: normalizeClass(unref(ie).be("range-picker", "header"))
          }, toDisplayString(unref(ae)("el.datepicker.startTime")), 3),
          createElementVNode("div", {
            class: normalizeClass([
              unref(ie).be("range-picker", "body"),
              unref(ie).be("panel", "content"),
              unref(ie).is("arrow", unref(pe)),
              { "has-seconds": unref(qe) }
            ])
          }, [
            createVNode(TimeSpinner, {
              ref: "minSpinner",
              role: "start",
              "show-seconds": unref(qe),
              "am-pm-mode": unref(xe),
              "arrow-control": unref(pe),
              "spinner-date": unref(Ne),
              "disabled-hours": jt,
              "disabled-minutes": bn,
              "disabled-seconds": kt,
              onChange: At,
              onSetOption: unref(Rn),
              onSelectRange: Tn
            }, null, 8, ["show-seconds", "am-pm-mode", "arrow-control", "spinner-date", "onSetOption"])
          ], 2)
        ], 2),
        createElementVNode("div", {
          class: normalizeClass(unref(ie).be("range-picker", "cell"))
        }, [
          createElementVNode("div", {
            class: normalizeClass(unref(ie).be("range-picker", "header"))
          }, toDisplayString(unref(ae)("el.datepicker.endTime")), 3),
          createElementVNode("div", {
            class: normalizeClass([
              unref(ie).be("range-picker", "body"),
              unref(ie).be("panel", "content"),
              unref(ie).is("arrow", unref(pe)),
              { "has-seconds": unref(qe) }
            ])
          }, [
            createVNode(TimeSpinner, {
              ref: "maxSpinner",
              role: "end",
              "show-seconds": unref(qe),
              "am-pm-mode": unref(xe),
              "arrow-control": unref(pe),
              "spinner-date": unref(he),
              "disabled-hours": jt,
              "disabled-minutes": bn,
              "disabled-seconds": kt,
              onChange: Fe,
              onSetOption: unref(Rn),
              onSelectRange: Lt
            }, null, 8, ["show-seconds", "am-pm-mode", "arrow-control", "spinner-date", "onSetOption"])
          ], 2)
        ], 2)
      ], 2),
      createElementVNode("div", {
        class: normalizeClass(unref(ie).be("panel", "footer"))
      }, [
        createElementVNode("button", {
          type: "button",
          class: normalizeClass([unref(ie).be("panel", "btn"), "cancel"]),
          onClick: Bn[0] || (Bn[0] = (Wn) => Ie())
        }, toDisplayString(unref(ae)("el.datepicker.cancel")), 3),
        createElementVNode("button", {
          type: "button",
          class: normalizeClass([unref(ie).be("panel", "btn"), "confirm"]),
          disabled: unref(En),
          onClick: Bn[1] || (Bn[1] = (Wn) => ze())
        }, toDisplayString(unref(ae)("el.datepicker.confirm")), 11, _hoisted_1$p)
      ], 2)
    ], 2)) : createCommentVNode("v-if", !0);
  }
});
var TimeRangePanel = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/time-picker/src/time-picker-com/panel-time-range.vue"]]);
dayjs.extend(customParseFormat);
var TimePicker = defineComponent({
  name: "ElTimePicker",
  install: null,
  props: {
    ...timePickerDefaultProps,
    isRange: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:modelValue"],
  setup(e, k) {
    const oe = ref(), [re, ae] = e.isRange ? ["timerange", TimeRangePanel] : ["time", TimePickPanel], le = (ie) => k.emit("update:modelValue", ie);
    return provide("ElPopperOptions", e.popperOptions), k.expose({
      focus: (ie) => {
        var ue;
        (ue = oe.value) == null || ue.handleFocusInput(ie);
      },
      blur: (ie) => {
        var ue;
        (ue = oe.value) == null || ue.handleBlurInput(ie);
      }
    }), () => {
      var ie;
      const ue = (ie = e.format) != null ? ie : DEFAULT_FORMATS_TIME;
      return createVNode(CommonPicker, mergeProps(e, {
        ref: oe,
        type: re,
        format: ue,
        "onUpdate:modelValue": le
      }), {
        default: (de) => createVNode(ae, de, null)
      });
    };
  }
});
const _TimePicker = TimePicker;
_TimePicker.install = (e) => {
  e.component(_TimePicker.name, _TimePicker);
};
const ElTimePicker = _TimePicker, useCheckboxGroupProps = {
  modelValue: {
    type: Array,
    default: () => []
  },
  disabled: Boolean,
  min: {
    type: Number,
    default: void 0
  },
  max: {
    type: Number,
    default: void 0
  },
  size: useSizeProp,
  id: {
    type: String,
    default: void 0
  },
  label: {
    type: String,
    default: void 0
  },
  fill: {
    type: String,
    default: void 0
  },
  textColor: {
    type: String,
    default: void 0
  },
  tag: {
    type: String,
    default: "div"
  },
  validateEvent: {
    type: Boolean,
    default: !0
  }
}, checkboxProps = {
  modelValue: {
    type: [Number, String, Boolean],
    default: () => {
    }
  },
  label: {
    type: [String, Boolean, Number, Object]
  },
  indeterminate: Boolean,
  disabled: Boolean,
  checked: Boolean,
  name: {
    type: String,
    default: void 0
  },
  trueLabel: {
    type: [String, Number],
    default: void 0
  },
  falseLabel: {
    type: [String, Number],
    default: void 0
  },
  id: {
    type: String,
    default: void 0
  },
  controls: {
    type: String,
    default: void 0
  },
  border: Boolean,
  size: useSizeProp,
  tabindex: [String, Number],
  validateEvent: {
    type: Boolean,
    default: !0
  }
}, useCheckboxGroup = () => {
  const e = inject(formContextKey, {}), k = inject(formItemContextKey, {}), oe = inject("CheckboxGroup", {}), re = computed(() => oe && (oe == null ? void 0 : oe.name) === "ElCheckboxGroup"), ae = computed(() => k.size);
  return {
    isGroup: re,
    checkboxGroup: oe,
    elForm: e,
    elFormItemSize: ae,
    elFormItem: k
  };
}, useCheckboxGroupId = (e, { elFormItem: k }) => {
  const { inputId: oe, isLabeledByFormItem: re } = useFormItemInputId(e, {
    formItemContext: k
  });
  return {
    isLabeledByFormItem: re,
    groupId: oe
  };
}, useModel = (e) => {
  const k = ref(!1), { emit: oe } = getCurrentInstance(), { isGroup: re, checkboxGroup: ae, elFormItem: le } = useCheckboxGroup(), ie = ref(!1);
  return {
    model: computed({
      get() {
        var de, pe;
        return re.value ? (de = ae.modelValue) == null ? void 0 : de.value : (pe = e.modelValue) != null ? pe : k.value;
      },
      set(de) {
        var pe;
        re.value && Array.isArray(de) ? (ie.value = ae.max !== void 0 && de.length > ae.max.value, ie.value === !1 && ((pe = ae == null ? void 0 : ae.changeEvent) == null || pe.call(ae, de))) : (oe(UPDATE_MODEL_EVENT, de), k.value = de);
      }
    }),
    isGroup: re,
    isLimitExceeded: ie,
    elFormItem: le
  };
}, useCheckboxStatus = (e, k, { model: oe }) => {
  const { isGroup: re, checkboxGroup: ae } = useCheckboxGroup(), le = ref(!1), ie = useSize(ae == null ? void 0 : ae.checkboxGroupSize, { prop: !0 }), ue = computed(() => {
    const Ce = oe.value;
    return toTypeString(Ce) === "[object Boolean]" ? Ce : Array.isArray(Ce) ? Ce.includes(e.label) : Ce != null ? Ce === e.trueLabel : !!Ce;
  }), de = useSize(computed(() => {
    var Ce;
    return re.value ? (Ce = ae == null ? void 0 : ae.checkboxGroupSize) == null ? void 0 : Ce.value : void 0;
  })), pe = computed(() => !!(k.default || e.label));
  return {
    isChecked: ue,
    focus: le,
    size: ie,
    checkboxSize: de,
    hasOwnLabel: pe
  };
}, useDisabled = (e, {
  model: k,
  isChecked: oe
}) => {
  const { elForm: re, isGroup: ae, checkboxGroup: le } = useCheckboxGroup(), ie = computed(() => {
    var de, pe;
    const Ce = (de = le.max) == null ? void 0 : de.value, _e = (pe = le.min) == null ? void 0 : pe.value;
    return !!(Ce || _e) && k.value.length >= Ce && !oe.value || k.value.length <= _e && oe.value;
  });
  return {
    isDisabled: computed(() => {
      var de, pe;
      const Ce = e.disabled || (re == null ? void 0 : re.disabled);
      return (pe = ae.value ? ((de = le.disabled) == null ? void 0 : de.value) || Ce || ie.value : Ce) != null ? pe : !1;
    }),
    isLimitDisabled: ie
  };
}, setStoreValue = (e, { model: k }) => {
  function oe() {
    Array.isArray(k.value) && !k.value.includes(e.label) ? k.value.push(e.label) : k.value = e.trueLabel || !0;
  }
  e.checked && oe();
}, useEvent$1 = (e, {
  model: k,
  isLimitExceeded: oe,
  hasOwnLabel: re,
  isDisabled: ae,
  isLabeledByFormItem: le
}) => {
  const { elFormItem: ie, checkboxGroup: ue } = useCheckboxGroup(), { emit: de } = getCurrentInstance();
  function pe(Ne) {
    var he, Oe;
    return Ne === e.trueLabel || Ne === !0 ? (he = e.trueLabel) != null ? he : !0 : (Oe = e.falseLabel) != null ? Oe : !1;
  }
  function Ce(Ne, he) {
    de("change", pe(Ne), he);
  }
  function _e(Ne) {
    if (oe.value)
      return;
    const he = Ne.target;
    de("change", pe(he.checked), Ne);
  }
  async function $e(Ne) {
    oe.value || !re.value && !ae.value && le.value && (k.value = pe([!1, e.falseLabel].includes(k.value)), await nextTick(), Ce(k.value, Ne));
  }
  const Ve = computed(() => {
    var Ne;
    return ((Ne = ue.validateEvent) == null ? void 0 : Ne.value) || e.validateEvent;
  });
  return watch(() => e.modelValue, () => {
    var Ne;
    Ve.value && ((Ne = ie == null ? void 0 : ie.validate) == null || Ne.call(ie, "change").catch((he) => debugWarn(he)));
  }), {
    handleChange: _e,
    onClickRoot: $e
  };
}, checkboxEmits = {
  [UPDATE_MODEL_EVENT]: (e) => isString(e) || isNumber(e) || isBoolean(e),
  change: (e) => isString(e) || isNumber(e) || isBoolean(e)
}, checkboxGroupEmits = {
  [UPDATE_MODEL_EVENT]: (e) => isArray(e),
  change: (e) => isArray(e)
}, useCheckbox = (e, k) => {
  const { model: oe, isGroup: re, isLimitExceeded: ae, elFormItem: le } = useModel(e), { focus: ie, size: ue, isChecked: de, checkboxSize: pe, hasOwnLabel: Ce } = useCheckboxStatus(e, k, {
    model: oe
  }), { isDisabled: _e } = useDisabled(e, { model: oe, isChecked: de }), { inputId: $e, isLabeledByFormItem: Ve } = useFormItemInputId(e, {
    formItemContext: le,
    disableIdGeneration: Ce,
    disableIdManagement: re
  }), { handleChange: Ne, onClickRoot: he } = useEvent$1(e, {
    model: oe,
    isLimitExceeded: ae,
    hasOwnLabel: Ce,
    isDisabled: _e,
    isLabeledByFormItem: Ve
  });
  return setStoreValue(e, { model: oe }), {
    elFormItem: le,
    inputId: $e,
    isLabeledByFormItem: Ve,
    isChecked: de,
    isDisabled: _e,
    isGroup: re,
    checkboxSize: pe,
    hasOwnLabel: Ce,
    model: oe,
    handleChange: Ne,
    onClickRoot: he,
    focus: ie,
    size: ue
  };
}, _hoisted_1$o = ["tabindex", "role", "aria-checked"], _hoisted_2$g = ["id", "aria-hidden", "name", "tabindex", "disabled", "true-value", "false-value"], _hoisted_3$a = ["id", "aria-hidden", "disabled", "value", "name", "tabindex"], __default__$i = {
  name: "ElCheckbox"
}, _sfc_main$F = /* @__PURE__ */ defineComponent({
  ...__default__$i,
  props: checkboxProps,
  emits: checkboxEmits,
  setup(e) {
    const k = e, oe = useSlots(), {
      inputId: re,
      isLabeledByFormItem: ae,
      isChecked: le,
      isDisabled: ie,
      checkboxSize: ue,
      hasOwnLabel: de,
      model: pe,
      handleChange: Ce,
      onClickRoot: _e,
      focus: $e
    } = useCheckbox(k, oe), Ve = useNamespace("checkbox");
    return (Ne, he) => (openBlock(), createBlock(resolveDynamicComponent(!unref(de) && unref(ae) ? "span" : "label"), {
      class: normalizeClass([
        unref(Ve).b(),
        unref(Ve).m(unref(ue)),
        unref(Ve).is("disabled", unref(ie)),
        unref(Ve).is("bordered", Ne.border),
        unref(Ve).is("checked", unref(le))
      ]),
      "aria-controls": Ne.indeterminate ? Ne.controls : null,
      onClick: unref(_e)
    }, {
      default: withCtx(() => [
        createElementVNode("span", {
          class: normalizeClass([
            unref(Ve).e("input"),
            unref(Ve).is("disabled", unref(ie)),
            unref(Ve).is("checked", unref(le)),
            unref(Ve).is("indeterminate", Ne.indeterminate),
            unref(Ve).is("focus", unref($e))
          ]),
          tabindex: Ne.indeterminate ? 0 : void 0,
          role: Ne.indeterminate ? "checkbox" : void 0,
          "aria-checked": Ne.indeterminate ? "mixed" : void 0
        }, [
          Ne.trueLabel || Ne.falseLabel ? withDirectives((openBlock(), createElementBlock("input", {
            key: 0,
            id: unref(re),
            "onUpdate:modelValue": he[0] || (he[0] = (Oe) => isRef(pe) ? pe.value = Oe : null),
            class: normalizeClass(unref(Ve).e("original")),
            type: "checkbox",
            "aria-hidden": Ne.indeterminate ? "true" : "false",
            name: Ne.name,
            tabindex: Ne.tabindex,
            disabled: unref(ie),
            "true-value": Ne.trueLabel,
            "false-value": Ne.falseLabel,
            onChange: he[1] || (he[1] = (...Oe) => unref(Ce) && unref(Ce)(...Oe)),
            onFocus: he[2] || (he[2] = (Oe) => $e.value = !0),
            onBlur: he[3] || (he[3] = (Oe) => $e.value = !1)
          }, null, 42, _hoisted_2$g)), [
            [vModelCheckbox, unref(pe)]
          ]) : withDirectives((openBlock(), createElementBlock("input", {
            key: 1,
            id: unref(re),
            "onUpdate:modelValue": he[4] || (he[4] = (Oe) => isRef(pe) ? pe.value = Oe : null),
            class: normalizeClass(unref(Ve).e("original")),
            type: "checkbox",
            "aria-hidden": Ne.indeterminate ? "true" : "false",
            disabled: unref(ie),
            value: Ne.label,
            name: Ne.name,
            tabindex: Ne.tabindex,
            onChange: he[5] || (he[5] = (...Oe) => unref(Ce) && unref(Ce)(...Oe)),
            onFocus: he[6] || (he[6] = (Oe) => $e.value = !0),
            onBlur: he[7] || (he[7] = (Oe) => $e.value = !1)
          }, null, 42, _hoisted_3$a)), [
            [vModelCheckbox, unref(pe)]
          ]),
          createElementVNode("span", {
            class: normalizeClass(unref(Ve).e("inner"))
          }, null, 2)
        ], 10, _hoisted_1$o),
        unref(de) ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: normalizeClass(unref(Ve).e("label"))
        }, [
          renderSlot(Ne.$slots, "default"),
          Ne.$slots.default ? createCommentVNode("v-if", !0) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createTextVNode(toDisplayString(Ne.label), 1)
          ], 64))
        ], 2)) : createCommentVNode("v-if", !0)
      ]),
      _: 3
    }, 8, ["class", "aria-controls", "onClick"]));
  }
});
var Checkbox = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox.vue"]]);
const _hoisted_1$n = ["name", "tabindex", "disabled", "true-value", "false-value"], _hoisted_2$f = ["name", "tabindex", "disabled", "value"], __default__$h = {
  name: "ElCheckboxButton"
}, _sfc_main$E = /* @__PURE__ */ defineComponent({
  ...__default__$h,
  props: checkboxProps,
  emits: checkboxEmits,
  setup(e) {
    const k = e, oe = useSlots(), { focus: re, isChecked: ae, isDisabled: le, size: ie, model: ue, handleChange: de } = useCheckbox(k, oe), { checkboxGroup: pe } = useCheckboxGroup(), Ce = useNamespace("checkbox"), _e = computed(() => {
      var $e, Ve, Ne, he;
      const Oe = (Ve = ($e = pe == null ? void 0 : pe.fill) == null ? void 0 : $e.value) != null ? Ve : "";
      return {
        backgroundColor: Oe,
        borderColor: Oe,
        color: (he = (Ne = pe == null ? void 0 : pe.textColor) == null ? void 0 : Ne.value) != null ? he : "",
        boxShadow: Oe ? `-1px 0 0 0 ${Oe}` : void 0
      };
    });
    return ($e, Ve) => (openBlock(), createElementBlock("label", {
      class: normalizeClass([
        unref(Ce).b("button"),
        unref(Ce).bm("button", unref(ie)),
        unref(Ce).is("disabled", unref(le)),
        unref(Ce).is("checked", unref(ae)),
        unref(Ce).is("focus", unref(re))
      ])
    }, [
      $e.trueLabel || $e.falseLabel ? withDirectives((openBlock(), createElementBlock("input", {
        key: 0,
        "onUpdate:modelValue": Ve[0] || (Ve[0] = (Ne) => isRef(ue) ? ue.value = Ne : null),
        class: normalizeClass(unref(Ce).be("button", "original")),
        type: "checkbox",
        name: $e.name,
        tabindex: $e.tabindex,
        disabled: unref(le),
        "true-value": $e.trueLabel,
        "false-value": $e.falseLabel,
        onChange: Ve[1] || (Ve[1] = (...Ne) => unref(de) && unref(de)(...Ne)),
        onFocus: Ve[2] || (Ve[2] = (Ne) => re.value = !0),
        onBlur: Ve[3] || (Ve[3] = (Ne) => re.value = !1)
      }, null, 42, _hoisted_1$n)), [
        [vModelCheckbox, unref(ue)]
      ]) : withDirectives((openBlock(), createElementBlock("input", {
        key: 1,
        "onUpdate:modelValue": Ve[4] || (Ve[4] = (Ne) => isRef(ue) ? ue.value = Ne : null),
        class: normalizeClass(unref(Ce).be("button", "original")),
        type: "checkbox",
        name: $e.name,
        tabindex: $e.tabindex,
        disabled: unref(le),
        value: $e.label,
        onChange: Ve[5] || (Ve[5] = (...Ne) => unref(de) && unref(de)(...Ne)),
        onFocus: Ve[6] || (Ve[6] = (Ne) => re.value = !0),
        onBlur: Ve[7] || (Ve[7] = (Ne) => re.value = !1)
      }, null, 42, _hoisted_2$f)), [
        [vModelCheckbox, unref(ue)]
      ]),
      $e.$slots.default || $e.label ? (openBlock(), createElementBlock("span", {
        key: 2,
        class: normalizeClass(unref(Ce).be("button", "inner")),
        style: normalizeStyle(unref(ae) ? unref(_e) : void 0)
      }, [
        renderSlot($e.$slots, "default", {}, () => [
          createTextVNode(toDisplayString($e.label), 1)
        ])
      ], 6)) : createCommentVNode("v-if", !0)
    ], 2));
  }
});
var CheckboxButton = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox-button.vue"]]);
const __default__$g = {
  name: "ElCheckboxGroup"
}, _sfc_main$D = /* @__PURE__ */ defineComponent({
  ...__default__$g,
  props: useCheckboxGroupProps,
  emits: checkboxGroupEmits,
  setup(e, { emit: k }) {
    const oe = e, { elFormItem: re } = useCheckboxGroup(), { groupId: ae, isLabeledByFormItem: le } = useCheckboxGroupId(oe, {
      elFormItem: re
    }), ie = useSize(), ue = useNamespace("checkbox"), de = (Ce) => {
      k(UPDATE_MODEL_EVENT, Ce), nextTick(() => {
        k("change", Ce);
      });
    }, pe = computed({
      get() {
        return oe.modelValue;
      },
      set(Ce) {
        de(Ce);
      }
    });
    return provide("CheckboxGroup", {
      name: "ElCheckboxGroup",
      ...toRefs(oe),
      modelValue: pe,
      checkboxGroupSize: ie,
      changeEvent: de
    }), watch(() => oe.modelValue, () => {
      var Ce;
      oe.validateEvent && ((Ce = re.validate) == null || Ce.call(re, "change").catch((_e) => debugWarn(_e)));
    }), (Ce, _e) => (openBlock(), createBlock(resolveDynamicComponent(Ce.tag), {
      id: unref(ae),
      class: normalizeClass(unref(ue).b("group")),
      role: "group",
      "aria-label": unref(le) ? void 0 : Ce.label || "checkbox-group",
      "aria-labelledby": unref(le) ? unref(re).labelId : void 0
    }, {
      default: withCtx(() => [
        renderSlot(Ce.$slots, "default")
      ]),
      _: 3
    }, 8, ["id", "class", "aria-label", "aria-labelledby"]));
  }
});
var CheckboxGroup = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox-group.vue"]]);
const ElCheckbox = withInstall(Checkbox, {
  CheckboxButton,
  CheckboxGroup
});
withNoopInstall(CheckboxButton);
const ElCheckboxGroup$1 = withNoopInstall(CheckboxGroup), radioPropsBase = buildProps({
  size: useSizeProp,
  disabled: Boolean,
  label: {
    type: [String, Number, Boolean],
    default: ""
  }
}), radioProps = buildProps({
  ...radioPropsBase,
  modelValue: {
    type: [String, Number, Boolean],
    default: ""
  },
  name: {
    type: String,
    default: ""
  },
  border: Boolean
}), radioEmits = {
  [UPDATE_MODEL_EVENT]: (e) => isString(e) || isNumber(e) || isBoolean(e),
  [CHANGE_EVENT]: (e) => isString(e) || isNumber(e) || isBoolean(e)
}, useRadio = (e, k) => {
  const oe = ref(), re = inject(radioGroupKey, void 0), ae = computed(() => !!re), le = computed({
    get() {
      return ae.value ? re.modelValue : e.modelValue;
    },
    set(Ce) {
      ae.value ? re.changeEvent(Ce) : k && k(UPDATE_MODEL_EVENT, Ce), oe.value.checked = e.modelValue === e.label;
    }
  }), ie = useSize(computed(() => re == null ? void 0 : re.size)), ue = useDisabled$1(computed(() => re == null ? void 0 : re.disabled)), de = ref(!1), pe = computed(() => ue.value || ae.value && le.value !== e.label ? -1 : 0);
  return {
    radioRef: oe,
    isGroup: ae,
    radioGroup: re,
    focus: de,
    size: ie,
    disabled: ue,
    tabIndex: pe,
    modelValue: le
  };
}, _hoisted_1$m = ["value", "name", "disabled"], __default__$f = {
  name: "ElRadio"
}, _sfc_main$C = /* @__PURE__ */ defineComponent({
  ...__default__$f,
  props: radioProps,
  emits: radioEmits,
  setup(e, { emit: k }) {
    const oe = e, re = useNamespace("radio"), { radioRef: ae, radioGroup: le, focus: ie, size: ue, disabled: de, modelValue: pe } = useRadio(oe, k);
    function Ce() {
      nextTick(() => k("change", pe.value));
    }
    return (_e, $e) => {
      var Ve;
      return openBlock(), createElementBlock("label", {
        class: normalizeClass([
          unref(re).b(),
          unref(re).is("disabled", unref(de)),
          unref(re).is("focus", unref(ie)),
          unref(re).is("bordered", _e.border),
          unref(re).is("checked", unref(pe) === _e.label),
          unref(re).m(unref(ue))
        ])
      }, [
        createElementVNode("span", {
          class: normalizeClass([
            unref(re).e("input"),
            unref(re).is("disabled", unref(de)),
            unref(re).is("checked", unref(pe) === _e.label)
          ])
        }, [
          withDirectives(createElementVNode("input", {
            ref_key: "radioRef",
            ref: ae,
            "onUpdate:modelValue": $e[0] || ($e[0] = (Ne) => isRef(pe) ? pe.value = Ne : null),
            class: normalizeClass(unref(re).e("original")),
            value: _e.label,
            name: _e.name || ((Ve = unref(le)) == null ? void 0 : Ve.name),
            disabled: unref(de),
            type: "radio",
            onFocus: $e[1] || ($e[1] = (Ne) => ie.value = !0),
            onBlur: $e[2] || ($e[2] = (Ne) => ie.value = !1),
            onChange: Ce
          }, null, 42, _hoisted_1$m), [
            [vModelRadio, unref(pe)]
          ]),
          createElementVNode("span", {
            class: normalizeClass(unref(re).e("inner"))
          }, null, 2)
        ], 2),
        createElementVNode("span", {
          class: normalizeClass(unref(re).e("label")),
          onKeydown: $e[3] || ($e[3] = withModifiers(() => {
          }, ["stop"]))
        }, [
          renderSlot(_e.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(_e.label), 1)
          ])
        ], 34)
      ], 2);
    };
  }
});
var Radio = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio.vue"]]);
const radioButtonProps = buildProps({
  ...radioPropsBase,
  name: {
    type: String,
    default: ""
  }
}), _hoisted_1$l = ["value", "name", "disabled"], __default__$e = {
  name: "ElRadioButton"
}, _sfc_main$B = /* @__PURE__ */ defineComponent({
  ...__default__$e,
  props: radioButtonProps,
  setup(e) {
    const k = e, oe = useNamespace("radio"), { radioRef: re, focus: ae, size: le, disabled: ie, modelValue: ue, radioGroup: de } = useRadio(k), pe = computed(() => ({
      backgroundColor: (de == null ? void 0 : de.fill) || "",
      borderColor: (de == null ? void 0 : de.fill) || "",
      boxShadow: de != null && de.fill ? `-1px 0 0 0 ${de.fill}` : "",
      color: (de == null ? void 0 : de.textColor) || ""
    }));
    return (Ce, _e) => {
      var $e;
      return openBlock(), createElementBlock("label", {
        class: normalizeClass([
          unref(oe).b("button"),
          unref(oe).is("active", unref(ue) === Ce.label),
          unref(oe).is("disabled", unref(ie)),
          unref(oe).is("focus", unref(ae)),
          unref(oe).bm("button", unref(le))
        ])
      }, [
        withDirectives(createElementVNode("input", {
          ref_key: "radioRef",
          ref: re,
          "onUpdate:modelValue": _e[0] || (_e[0] = (Ve) => isRef(ue) ? ue.value = Ve : null),
          class: normalizeClass(unref(oe).be("button", "original-radio")),
          value: Ce.label,
          type: "radio",
          name: Ce.name || (($e = unref(de)) == null ? void 0 : $e.name),
          disabled: unref(ie),
          onFocus: _e[1] || (_e[1] = (Ve) => ae.value = !0),
          onBlur: _e[2] || (_e[2] = (Ve) => ae.value = !1)
        }, null, 42, _hoisted_1$l), [
          [vModelRadio, unref(ue)]
        ]),
        createElementVNode("span", {
          class: normalizeClass(unref(oe).be("button", "inner")),
          style: normalizeStyle(unref(ue) === Ce.label ? unref(pe) : {}),
          onKeydown: _e[3] || (_e[3] = withModifiers(() => {
          }, ["stop"]))
        }, [
          renderSlot(Ce.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(Ce.label), 1)
          ])
        ], 38)
      ], 2);
    };
  }
});
var RadioButton = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio-button.vue"]]);
const radioGroupProps = buildProps({
  id: {
    type: String,
    default: void 0
  },
  size: useSizeProp,
  disabled: Boolean,
  modelValue: {
    type: [String, Number, Boolean],
    default: ""
  },
  fill: {
    type: String,
    default: ""
  },
  label: {
    type: String,
    default: void 0
  },
  textColor: {
    type: String,
    default: ""
  },
  name: {
    type: String,
    default: void 0
  },
  validateEvent: {
    type: Boolean,
    default: !0
  }
}), radioGroupEmits = radioEmits, _hoisted_1$k = ["id", "aria-label", "aria-labelledby"], __default__$d = {
  name: "ElRadioGroup"
}, _sfc_main$A = /* @__PURE__ */ defineComponent({
  ...__default__$d,
  props: radioGroupProps,
  emits: radioGroupEmits,
  setup(e, { emit: k }) {
    const oe = e, re = useNamespace("radio"), ae = useId(), le = ref(), { formItem: ie } = useFormItem(), { inputId: ue, isLabeledByFormItem: de } = useFormItemInputId(oe, {
      formItemContext: ie
    }), pe = (_e) => {
      k(UPDATE_MODEL_EVENT, _e), nextTick(() => k("change", _e));
    };
    onMounted(() => {
      const _e = le.value.querySelectorAll("[type=radio]"), $e = _e[0];
      !Array.from(_e).some((Ve) => Ve.checked) && $e && ($e.tabIndex = 0);
    });
    const Ce = computed(() => oe.name || ae.value);
    return provide(radioGroupKey, reactive({
      ...toRefs(oe),
      changeEvent: pe,
      name: Ce
    })), watch(() => oe.modelValue, () => {
      oe.validateEvent && (ie == null || ie.validate("change").catch((_e) => debugWarn(_e)));
    }), (_e, $e) => (openBlock(), createElementBlock("div", {
      id: unref(ue),
      ref_key: "radioGroupRef",
      ref: le,
      class: normalizeClass(unref(re).b("group")),
      role: "radiogroup",
      "aria-label": unref(de) ? void 0 : _e.label || "radio-group",
      "aria-labelledby": unref(de) ? unref(ie).labelId : void 0
    }, [
      renderSlot(_e.$slots, "default")
    ], 10, _hoisted_1$k));
  }
});
var RadioGroup = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio-group.vue"]]);
const ElRadio = withInstall(Radio, {
  RadioButton,
  RadioGroup
}), ElRadioGroup = withNoopInstall(RadioGroup);
withNoopInstall(RadioButton);
var NodeContent = defineComponent({
  name: "NodeContent",
  setup() {
    return {
      ns: useNamespace("cascader-node")
    };
  },
  render() {
    const { ns: e } = this, { node: k, panel: oe } = this.$parent, { data: re, label: ae } = k, { renderLabelFn: le } = oe;
    return h$2("span", { class: e.e("label") }, le ? le({ node: k, data: re }) : ae);
  }
});
const CASCADER_PANEL_INJECTION_KEY = Symbol(), _sfc_main$z = defineComponent({
  name: "ElCascaderNode",
  components: {
    ElCheckbox,
    ElRadio,
    NodeContent,
    ElIcon,
    Check: check_default,
    Loading: loading_default,
    ArrowRight: arrow_right_default
  },
  props: {
    node: {
      type: Object,
      required: !0
    },
    menuId: String
  },
  emits: ["expand"],
  setup(e, { emit: k }) {
    const oe = inject(CASCADER_PANEL_INJECTION_KEY), re = useNamespace("cascader-node"), ae = computed(() => oe.isHoverMenu), le = computed(() => oe.config.multiple), ie = computed(() => oe.config.checkStrictly), ue = computed(() => {
      var Fe;
      return (Fe = oe.checkedNodes[0]) == null ? void 0 : Fe.uid;
    }), de = computed(() => e.node.isDisabled), pe = computed(() => e.node.isLeaf), Ce = computed(() => ie.value && !pe.value || !de.value), _e = computed(() => Ve(oe.expandingNode)), $e = computed(() => ie.value && oe.checkedNodes.some(Ve)), Ve = (Fe) => {
      var Pt;
      const { level: vn, uid: En } = e.node;
      return ((Pt = Fe == null ? void 0 : Fe.pathNodes[vn - 1]) == null ? void 0 : Pt.uid) === En;
    }, Ne = () => {
      _e.value || oe.expandNode(e.node);
    }, he = (Fe) => {
      const { node: Pt } = e;
      Fe !== Pt.checked && oe.handleCheckChange(Pt, Fe);
    }, Oe = () => {
      oe.lazyLoad(e.node, () => {
        pe.value || Ne();
      });
    }, Ie = (Fe) => {
      !ae.value || (qe(), !pe.value && k("expand", Fe));
    }, qe = () => {
      const { node: Fe } = e;
      !Ce.value || Fe.loading || (Fe.loaded ? Ne() : Oe());
    }, xe = () => {
      ae.value && !pe.value || (pe.value && !de.value && !ie.value && !le.value ? At(!0) : qe());
    }, ze = (Fe) => {
      ie.value ? (he(Fe), e.node.loaded && Ne()) : At(Fe);
    }, At = (Fe) => {
      e.node.loaded ? (he(Fe), !ie.value && Ne()) : Oe();
    };
    return {
      panel: oe,
      isHoverMenu: ae,
      multiple: le,
      checkStrictly: ie,
      checkedNodeId: ue,
      isDisabled: de,
      isLeaf: pe,
      expandable: Ce,
      inExpandingPath: _e,
      inCheckedPath: $e,
      ns: re,
      handleHoverExpand: Ie,
      handleExpand: qe,
      handleClick: xe,
      handleCheck: At,
      handleSelectCheck: ze
    };
  }
}), _hoisted_1$j = ["id", "aria-haspopup", "aria-owns", "aria-expanded", "tabindex"], _hoisted_2$e = /* @__PURE__ */ createElementVNode("span", null, null, -1);
function _sfc_render$d(e, k, oe, re, ae, le) {
  const ie = resolveComponent("el-checkbox"), ue = resolveComponent("el-radio"), de = resolveComponent("check"), pe = resolveComponent("el-icon"), Ce = resolveComponent("node-content"), _e = resolveComponent("loading"), $e = resolveComponent("arrow-right");
  return openBlock(), createElementBlock("li", {
    id: `${e.menuId}-${e.node.uid}`,
    role: "menuitem",
    "aria-haspopup": !e.isLeaf,
    "aria-owns": e.isLeaf ? null : e.menuId,
    "aria-expanded": e.inExpandingPath,
    tabindex: e.expandable ? -1 : void 0,
    class: normalizeClass([
      e.ns.b(),
      e.ns.is("selectable", e.checkStrictly),
      e.ns.is("active", e.node.checked),
      e.ns.is("disabled", !e.expandable),
      e.inExpandingPath && "in-active-path",
      e.inCheckedPath && "in-checked-path"
    ]),
    onMouseenter: k[2] || (k[2] = (...Ve) => e.handleHoverExpand && e.handleHoverExpand(...Ve)),
    onFocus: k[3] || (k[3] = (...Ve) => e.handleHoverExpand && e.handleHoverExpand(...Ve)),
    onClick: k[4] || (k[4] = (...Ve) => e.handleClick && e.handleClick(...Ve))
  }, [
    createCommentVNode(" prefix "),
    e.multiple ? (openBlock(), createBlock(ie, {
      key: 0,
      "model-value": e.node.checked,
      indeterminate: e.node.indeterminate,
      disabled: e.isDisabled,
      onClick: k[0] || (k[0] = withModifiers(() => {
      }, ["stop"])),
      "onUpdate:modelValue": e.handleSelectCheck
    }, null, 8, ["model-value", "indeterminate", "disabled", "onUpdate:modelValue"])) : e.checkStrictly ? (openBlock(), createBlock(ue, {
      key: 1,
      "model-value": e.checkedNodeId,
      label: e.node.uid,
      disabled: e.isDisabled,
      "onUpdate:modelValue": e.handleSelectCheck,
      onClick: k[1] || (k[1] = withModifiers(() => {
      }, ["stop"]))
    }, {
      default: withCtx(() => [
        createCommentVNode(`
        Add an empty element to avoid render label,
        do not use empty fragment here for https://github.com/vuejs/vue-next/pull/2485
      `),
        _hoisted_2$e
      ]),
      _: 1
    }, 8, ["model-value", "label", "disabled", "onUpdate:modelValue"])) : e.isLeaf && e.node.checked ? (openBlock(), createBlock(pe, {
      key: 2,
      class: normalizeClass(e.ns.e("prefix"))
    }, {
      default: withCtx(() => [
        createVNode(de)
      ]),
      _: 1
    }, 8, ["class"])) : createCommentVNode("v-if", !0),
    createCommentVNode(" content "),
    createVNode(Ce),
    createCommentVNode(" postfix "),
    e.isLeaf ? createCommentVNode("v-if", !0) : (openBlock(), createElementBlock(Fragment, { key: 3 }, [
      e.node.loading ? (openBlock(), createBlock(pe, {
        key: 0,
        class: normalizeClass([e.ns.is("loading"), e.ns.e("postfix")])
      }, {
        default: withCtx(() => [
          createVNode(_e)
        ]),
        _: 1
      }, 8, ["class"])) : (openBlock(), createBlock(pe, {
        key: 1,
        class: normalizeClass(["arrow-right", e.ns.e("postfix")])
      }, {
        default: withCtx(() => [
          createVNode($e)
        ]),
        _: 1
      }, 8, ["class"]))
    ], 64))
  ], 42, _hoisted_1$j);
}
var ElCascaderNode = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$d], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/cascader-panel/src/node.vue"]]);
const _sfc_main$y = defineComponent({
  name: "ElCascaderMenu",
  components: {
    Loading: loading_default,
    ElIcon,
    ElScrollbar,
    ElCascaderNode
  },
  props: {
    nodes: {
      type: Array,
      required: !0
    },
    index: {
      type: Number,
      required: !0
    }
  },
  setup(e) {
    const k = getCurrentInstance(), oe = useNamespace("cascader-menu"), { t: re } = useLocale(), ae = generateId();
    let le = null, ie = null;
    const ue = inject(CASCADER_PANEL_INJECTION_KEY), de = ref(null), pe = computed(() => !e.nodes.length), Ce = computed(() => !ue.initialLoaded), _e = computed(() => `cascader-menu-${ae}-${e.index}`), $e = (Oe) => {
      le = Oe.target;
    }, Ve = (Oe) => {
      if (!(!ue.isHoverMenu || !le || !de.value))
        if (le.contains(Oe.target)) {
          Ne();
          const Ie = k.vnode.el, { left: qe } = Ie.getBoundingClientRect(), { offsetWidth: xe, offsetHeight: ze } = Ie, At = Oe.clientX - qe, Fe = le.offsetTop, Pt = Fe + le.offsetHeight;
          de.value.innerHTML = `
          <path style="pointer-events: auto;" fill="transparent" d="M${At} ${Fe} L${xe} 0 V${Fe} Z" />
          <path style="pointer-events: auto;" fill="transparent" d="M${At} ${Pt} L${xe} ${ze} V${Pt} Z" />
        `;
        } else
          ie || (ie = window.setTimeout(he, ue.config.hoverThreshold));
    }, Ne = () => {
      !ie || (clearTimeout(ie), ie = null);
    }, he = () => {
      !de.value || (de.value.innerHTML = "", Ne());
    };
    return {
      ns: oe,
      panel: ue,
      hoverZone: de,
      isEmpty: pe,
      isLoading: Ce,
      menuId: _e,
      t: re,
      handleExpand: $e,
      handleMouseMove: Ve,
      clearHoverZone: he
    };
  }
});
function _sfc_render$c(e, k, oe, re, ae, le) {
  const ie = resolveComponent("el-cascader-node"), ue = resolveComponent("loading"), de = resolveComponent("el-icon"), pe = resolveComponent("el-scrollbar");
  return openBlock(), createBlock(pe, {
    key: e.menuId,
    tag: "ul",
    role: "menu",
    class: normalizeClass(e.ns.b()),
    "wrap-class": e.ns.e("wrap"),
    "view-class": [e.ns.e("list"), e.ns.is("empty", e.isEmpty)],
    onMousemove: e.handleMouseMove,
    onMouseleave: e.clearHoverZone
  }, {
    default: withCtx(() => {
      var Ce;
      return [
        (openBlock(!0), createElementBlock(Fragment, null, renderList(e.nodes, (_e) => (openBlock(), createBlock(ie, {
          key: _e.uid,
          node: _e,
          "menu-id": e.menuId,
          onExpand: e.handleExpand
        }, null, 8, ["node", "menu-id", "onExpand"]))), 128)),
        e.isLoading ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(e.ns.e("empty-text"))
        }, [
          createVNode(de, {
            size: "14",
            class: normalizeClass(e.ns.is("loading"))
          }, {
            default: withCtx(() => [
              createVNode(ue)
            ]),
            _: 1
          }, 8, ["class"]),
          createTextVNode(" " + toDisplayString(e.t("el.cascader.loading")), 1)
        ], 2)) : e.isEmpty ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(e.ns.e("empty-text"))
        }, toDisplayString(e.t("el.cascader.noData")), 3)) : (Ce = e.panel) != null && Ce.isHoverMenu ? (openBlock(), createElementBlock("svg", {
          key: 2,
          ref: "hoverZone",
          class: normalizeClass(e.ns.e("hover-zone"))
        }, null, 2)) : createCommentVNode("v-if", !0)
      ];
    }),
    _: 1
  }, 8, ["class", "wrap-class", "view-class", "onMousemove", "onMouseleave"]);
}
var ElCascaderMenu = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$c], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/cascader-panel/src/menu.vue"]]), ExpandTrigger = /* @__PURE__ */ ((e) => (e.CLICK = "click", e.HOVER = "hover", e))(ExpandTrigger || {});
let uid = 0;
const calculatePathNodes = (e) => {
  const k = [e];
  let { parent: oe } = e;
  for (; oe; )
    k.unshift(oe), oe = oe.parent;
  return k;
};
class Node {
  constructor(k, oe, re, ae = !1) {
    this.data = k, this.config = oe, this.parent = re, this.root = ae, this.uid = uid++, this.checked = !1, this.indeterminate = !1, this.loading = !1;
    const { value: le, label: ie, children: ue } = oe, de = k[ue], pe = calculatePathNodes(this);
    this.level = ae ? 0 : re ? re.level + 1 : 1, this.value = k[le], this.label = k[ie], this.pathNodes = pe, this.pathValues = pe.map((Ce) => Ce.value), this.pathLabels = pe.map((Ce) => Ce.label), this.childrenData = de, this.children = (de || []).map((Ce) => new Node(Ce, oe, this)), this.loaded = !oe.lazy || this.isLeaf || !isEmpty(de);
  }
  get isDisabled() {
    const { data: k, parent: oe, config: re } = this, { disabled: ae, checkStrictly: le } = re;
    return (isFunction(ae) ? ae(k, this) : !!k[ae]) || !le && (oe == null ? void 0 : oe.isDisabled);
  }
  get isLeaf() {
    const { data: k, config: oe, childrenData: re, loaded: ae } = this, { lazy: le, leaf: ie } = oe, ue = isFunction(ie) ? ie(k, this) : k[ie];
    return isUndefined(ue) ? le && !ae ? !1 : !(Array.isArray(re) && re.length) : !!ue;
  }
  get valueByOption() {
    return this.config.emitPath ? this.pathValues : this.value;
  }
  appendChild(k) {
    const { childrenData: oe, children: re } = this, ae = new Node(k, this.config, this);
    return Array.isArray(oe) ? oe.push(k) : this.childrenData = [k], re.push(ae), ae;
  }
  calcText(k, oe) {
    const re = k ? this.pathLabels.join(oe) : this.label;
    return this.text = re, re;
  }
  broadcast(k, ...oe) {
    const re = `onParent${capitalize(k)}`;
    this.children.forEach((ae) => {
      ae && (ae.broadcast(k, ...oe), ae[re] && ae[re](...oe));
    });
  }
  emit(k, ...oe) {
    const { parent: re } = this, ae = `onChild${capitalize(k)}`;
    re && (re[ae] && re[ae](...oe), re.emit(k, ...oe));
  }
  onParentCheck(k) {
    this.isDisabled || this.setCheckState(k);
  }
  onChildCheck() {
    const { children: k } = this, oe = k.filter((ae) => !ae.isDisabled), re = oe.length ? oe.every((ae) => ae.checked) : !1;
    this.setCheckState(re);
  }
  setCheckState(k) {
    const oe = this.children.length, re = this.children.reduce((ae, le) => {
      const ie = le.checked ? 1 : le.indeterminate ? 0.5 : 0;
      return ae + ie;
    }, 0);
    this.checked = this.loaded && this.children.filter((ae) => !ae.isDisabled).every((ae) => ae.loaded && ae.checked) && k, this.indeterminate = this.loaded && re !== oe && re > 0;
  }
  doCheck(k) {
    if (this.checked === k)
      return;
    const { checkStrictly: oe, multiple: re } = this.config;
    oe || !re ? this.checked = k : (this.broadcast("check", k), this.setCheckState(k), this.emit("check"));
  }
}
const flatNodes = (e, k) => e.reduce((oe, re) => (re.isLeaf ? oe.push(re) : (!k && oe.push(re), oe = oe.concat(flatNodes(re.children, k))), oe), []);
class Store {
  constructor(k, oe) {
    this.config = oe;
    const re = (k || []).map((ae) => new Node(ae, this.config));
    this.nodes = re, this.allNodes = flatNodes(re, !1), this.leafNodes = flatNodes(re, !0);
  }
  getNodes() {
    return this.nodes;
  }
  getFlattedNodes(k) {
    return k ? this.leafNodes : this.allNodes;
  }
  appendNode(k, oe) {
    const re = oe ? oe.appendChild(k) : new Node(k, this.config);
    oe || this.nodes.push(re), this.allNodes.push(re), re.isLeaf && this.leafNodes.push(re);
  }
  appendNodes(k, oe) {
    k.forEach((re) => this.appendNode(re, oe));
  }
  getNodeByValue(k, oe = !1) {
    return !k && k !== 0 ? null : this.getFlattedNodes(oe).find((ae) => isEqual(ae.value, k) || isEqual(ae.pathValues, k)) || null;
  }
  getSameNode(k) {
    return k && this.getFlattedNodes(!1).find(({ value: re, level: ae }) => isEqual(k.value, re) && k.level === ae) || null;
  }
}
const CommonProps = {
  modelValue: [Number, String, Array],
  options: {
    type: Array,
    default: () => []
  },
  props: {
    type: Object,
    default: () => ({})
  }
}, DefaultProps = {
  expandTrigger: ExpandTrigger.CLICK,
  multiple: !1,
  checkStrictly: !1,
  emitPath: !0,
  lazy: !1,
  lazyLoad: NOOP,
  value: "value",
  label: "label",
  children: "children",
  leaf: "leaf",
  disabled: "disabled",
  hoverThreshold: 500
}, useCascaderConfig = (e) => computed(() => ({
  ...DefaultProps,
  ...e.props
})), getMenuIndex = (e) => {
  if (!e)
    return 0;
  const k = e.id.split("-");
  return Number(k[k.length - 2]);
}, checkNode = (e) => {
  if (!e)
    return;
  const k = e.querySelector("input");
  k ? k.click() : isLeaf(e) && e.click();
}, sortByOriginalOrder = (e, k) => {
  const oe = k.slice(0), re = oe.map((le) => le.uid), ae = e.reduce((le, ie) => {
    const ue = re.indexOf(ie.uid);
    return ue > -1 && (le.push(ie), oe.splice(ue, 1), re.splice(ue, 1)), le;
  }, []);
  return ae.push(...oe), ae;
}, _sfc_main$x = defineComponent({
  name: "ElCascaderPanel",
  components: {
    ElCascaderMenu
  },
  props: {
    ...CommonProps,
    border: {
      type: Boolean,
      default: !0
    },
    renderLabel: Function
  },
  emits: [UPDATE_MODEL_EVENT, CHANGE_EVENT, "close", "expand-change"],
  setup(e, { emit: k, slots: oe }) {
    let re = !1;
    const ae = useNamespace("cascader"), le = useCascaderConfig(e);
    let ie = null;
    const ue = ref(!0), de = ref([]), pe = ref(null), Ce = ref([]), _e = ref(null), $e = ref([]), Ve = computed(() => le.value.expandTrigger === ExpandTrigger.HOVER), Ne = computed(() => e.renderLabel || oe.default), he = () => {
      const { options: wn } = e, Lt = le.value;
      re = !1, ie = new Store(wn, Lt), Ce.value = [ie.getNodes()], Lt.lazy && isEmpty(e.options) ? (ue.value = !1, Oe(void 0, (Dt) => {
        Dt && (ie = new Store(Dt, Lt), Ce.value = [ie.getNodes()]), ue.value = !0, vn(!1, !0);
      })) : vn(!1, !0);
    }, Oe = (wn, Lt) => {
      const Dt = le.value;
      wn = wn || new Node({}, Dt, void 0, !0), wn.loading = !0;
      const Cn = (jt) => {
        const bn = wn, kt = bn.root ? null : bn;
        jt && (ie == null || ie.appendNodes(jt, kt)), bn.loading = !1, bn.loaded = !0, bn.childrenData = bn.childrenData || [], Lt && Lt(jt);
      };
      Dt.lazyLoad(wn, Cn);
    }, Ie = (wn, Lt) => {
      var Dt;
      const { level: Cn } = wn, jt = Ce.value.slice(0, Cn);
      let bn;
      wn.isLeaf ? bn = wn.pathNodes[Cn - 2] : (bn = wn, jt.push(wn.children)), ((Dt = _e.value) == null ? void 0 : Dt.uid) !== (bn == null ? void 0 : bn.uid) && (_e.value = wn, Ce.value = jt, !Lt && k("expand-change", (wn == null ? void 0 : wn.pathValues) || []));
    }, qe = (wn, Lt, Dt = !0) => {
      const { checkStrictly: Cn, multiple: jt } = le.value, bn = $e.value[0];
      re = !0, !jt && (bn == null || bn.doCheck(!1)), wn.doCheck(Lt), Pt(), Dt && !jt && !Cn && k("close"), !Dt && !jt && !Cn && xe(wn);
    }, xe = (wn) => {
      !wn || (wn = wn.parent, xe(wn), wn && Ie(wn));
    }, ze = (wn) => ie == null ? void 0 : ie.getFlattedNodes(wn), At = (wn) => {
      var Lt;
      return (Lt = ze(wn)) == null ? void 0 : Lt.filter((Dt) => Dt.checked !== !1);
    }, Fe = () => {
      $e.value.forEach((wn) => wn.doCheck(!1)), Pt();
    }, Pt = () => {
      var wn;
      const { checkStrictly: Lt, multiple: Dt } = le.value, Cn = $e.value, jt = At(!Lt), bn = sortByOriginalOrder(Cn, jt), kt = bn.map((Et) => Et.valueByOption);
      $e.value = bn, pe.value = Dt ? kt : (wn = kt[0]) != null ? wn : null;
    }, vn = (wn = !1, Lt = !1) => {
      const { modelValue: Dt } = e, { lazy: Cn, multiple: jt, checkStrictly: bn } = le.value, kt = !bn;
      if (!(!ue.value || re || !Lt && isEqual(Dt, pe.value)))
        if (Cn && !wn) {
          const _n = unique(flattenDeep(castArray(Dt))).map((Pn) => ie == null ? void 0 : ie.getNodeByValue(Pn)).filter((Pn) => !!Pn && !Pn.loaded && !Pn.loading);
          _n.length ? _n.forEach((Pn) => {
            Oe(Pn, () => vn(!1, Lt));
          }) : vn(!0, Lt);
        } else {
          const Et = jt ? castArray(Dt) : [Dt], _n = unique(Et.map((Pn) => ie == null ? void 0 : ie.getNodeByValue(Pn, kt)));
          En(_n, Lt), pe.value = Dt;
        }
    }, En = (wn, Lt = !0) => {
      const { checkStrictly: Dt } = le.value, Cn = $e.value, jt = wn.filter((Et) => !!Et && (Dt || Et.isLeaf)), bn = ie == null ? void 0 : ie.getSameNode(_e.value), kt = Lt && bn || jt[0];
      kt ? kt.pathNodes.forEach((Et) => Ie(Et, !0)) : _e.value = null, Cn.forEach((Et) => Et.doCheck(!1)), jt.forEach((Et) => Et.doCheck(!0)), $e.value = jt, nextTick(Nn);
    }, Nn = () => {
      !isClient$1 || de.value.forEach((wn) => {
        const Lt = wn == null ? void 0 : wn.$el;
        if (Lt) {
          const Dt = Lt.querySelector(`.${ae.namespace.value}-scrollbar__wrap`), Cn = Lt.querySelector(`.${ae.b("node")}.${ae.is("active")}`) || Lt.querySelector(`.${ae.b("node")}.in-active-path`);
          scrollIntoView(Dt, Cn);
        }
      });
    }, Tn = (wn) => {
      const Lt = wn.target, { code: Dt } = wn;
      switch (Dt) {
        case EVENT_CODE.up:
        case EVENT_CODE.down: {
          wn.preventDefault();
          const Cn = Dt === EVENT_CODE.up ? -1 : 1;
          focusNode(getSibling(Lt, Cn, `.${ae.b("node")}[tabindex="-1"]`));
          break;
        }
        case EVENT_CODE.left: {
          wn.preventDefault();
          const Cn = de.value[getMenuIndex(Lt) - 1], jt = Cn == null ? void 0 : Cn.$el.querySelector(`.${ae.b("node")}[aria-expanded="true"]`);
          focusNode(jt);
          break;
        }
        case EVENT_CODE.right: {
          wn.preventDefault();
          const Cn = de.value[getMenuIndex(Lt) + 1], jt = Cn == null ? void 0 : Cn.$el.querySelector(`.${ae.b("node")}[tabindex="-1"]`);
          focusNode(jt);
          break;
        }
        case EVENT_CODE.enter:
          checkNode(Lt);
          break;
      }
    };
    return provide(CASCADER_PANEL_INJECTION_KEY, reactive({
      config: le,
      expandingNode: _e,
      checkedNodes: $e,
      isHoverMenu: Ve,
      initialLoaded: ue,
      renderLabelFn: Ne,
      lazyLoad: Oe,
      expandNode: Ie,
      handleCheckChange: qe
    })), watch([le, () => e.options], he, {
      deep: !0,
      immediate: !0
    }), watch(() => e.modelValue, () => {
      re = !1, vn();
    }), watch(pe, (wn) => {
      isEqual(wn, e.modelValue) || (k(UPDATE_MODEL_EVENT, wn), k(CHANGE_EVENT, wn));
    }), onBeforeUpdate(() => de.value = []), onMounted(() => !isEmpty(e.modelValue) && vn()), {
      ns: ae,
      menuList: de,
      menus: Ce,
      checkedNodes: $e,
      handleKeyDown: Tn,
      handleCheckChange: qe,
      getFlattedNodes: ze,
      getCheckedNodes: At,
      clearCheckedNodes: Fe,
      calculateCheckedValue: Pt,
      scrollToExpandingNode: Nn
    };
  }
});
function _sfc_render$b(e, k, oe, re, ae, le) {
  const ie = resolveComponent("el-cascader-menu");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass([e.ns.b("panel"), e.ns.is("bordered", e.border)]),
    onKeydown: k[0] || (k[0] = (...ue) => e.handleKeyDown && e.handleKeyDown(...ue))
  }, [
    (openBlock(!0), createElementBlock(Fragment, null, renderList(e.menus, (ue, de) => (openBlock(), createBlock(ie, {
      key: de,
      ref_for: !0,
      ref: (pe) => e.menuList[de] = pe,
      index: de,
      nodes: [...ue]
    }, null, 8, ["index", "nodes"]))), 128))
  ], 34);
}
var CascaderPanel = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$b], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/cascader-panel/src/index.vue"]]);
CascaderPanel.install = (e) => {
  e.component(CascaderPanel.name, CascaderPanel);
};
const _CascaderPanel = CascaderPanel, tagProps = buildProps({
  closable: Boolean,
  type: {
    type: String,
    values: ["success", "info", "warning", "danger", ""],
    default: ""
  },
  hit: Boolean,
  disableTransitions: Boolean,
  color: {
    type: String,
    default: ""
  },
  size: {
    type: String,
    values: componentSizes,
    default: ""
  },
  effect: {
    type: String,
    values: ["dark", "light", "plain"],
    default: "light"
  },
  round: Boolean
}), tagEmits = {
  close: (e) => e instanceof MouseEvent,
  click: (e) => e instanceof MouseEvent
}, __default__$c = {
  name: "ElTag"
}, _sfc_main$w = /* @__PURE__ */ defineComponent({
  ...__default__$c,
  props: tagProps,
  emits: tagEmits,
  setup(e, { emit: k }) {
    const oe = e, re = useSize(), ae = useNamespace("tag"), le = computed(() => {
      const { type: de, hit: pe, effect: Ce, closable: _e, round: $e } = oe;
      return [
        ae.b(),
        ae.is("closable", _e),
        ae.m(de),
        ae.m(re.value),
        ae.m(Ce),
        ae.is("hit", pe),
        ae.is("round", $e)
      ];
    }), ie = (de) => {
      k("close", de);
    }, ue = (de) => {
      k("click", de);
    };
    return (de, pe) => de.disableTransitions ? (openBlock(), createElementBlock("span", {
      key: 0,
      class: normalizeClass(unref(le)),
      style: normalizeStyle({ backgroundColor: de.color }),
      onClick: ue
    }, [
      createElementVNode("span", {
        class: normalizeClass(unref(ae).e("content"))
      }, [
        renderSlot(de.$slots, "default")
      ], 2),
      de.closable ? (openBlock(), createBlock(unref(ElIcon), {
        key: 0,
        class: normalizeClass(unref(ae).e("close")),
        onClick: withModifiers(ie, ["stop"])
      }, {
        default: withCtx(() => [
          createVNode(unref(close_default))
        ]),
        _: 1
      }, 8, ["class", "onClick"])) : createCommentVNode("v-if", !0)
    ], 6)) : (openBlock(), createBlock(Transition, {
      key: 1,
      name: `${unref(ae).namespace.value}-zoom-in-center`,
      appear: ""
    }, {
      default: withCtx(() => [
        createElementVNode("span", {
          class: normalizeClass(unref(le)),
          style: normalizeStyle({ backgroundColor: de.color }),
          onClick: ue
        }, [
          createElementVNode("span", {
            class: normalizeClass(unref(ae).e("content"))
          }, [
            renderSlot(de.$slots, "default")
          ], 2),
          de.closable ? (openBlock(), createBlock(unref(ElIcon), {
            key: 0,
            class: normalizeClass(unref(ae).e("close")),
            onClick: withModifiers(ie, ["stop"])
          }, {
            default: withCtx(() => [
              createVNode(unref(close_default))
            ]),
            _: 1
          }, 8, ["class", "onClick"])) : createCommentVNode("v-if", !0)
        ], 6)
      ]),
      _: 3
    }, 8, ["name"]));
  }
});
var Tag = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/tag/src/tag.vue"]]);
const ElTag = withInstall(Tag), DEFAULT_INPUT_HEIGHT = 40, INPUT_HEIGHT_MAP = {
  large: 36,
  default: 32,
  small: 28
}, popperOptions = {
  modifiers: [
    {
      name: "arrowPosition",
      enabled: !0,
      phase: "main",
      fn: ({ state: e }) => {
        const { modifiersData: k, placement: oe } = e;
        ["right", "left", "bottom", "top"].includes(oe) || (k.arrow.x = 35);
      },
      requires: ["arrow"]
    }
  ]
}, COMPONENT_NAME$2 = "ElCascader", _sfc_main$v = defineComponent({
  name: COMPONENT_NAME$2,
  components: {
    ElCascaderPanel: _CascaderPanel,
    ElInput,
    ElTooltip,
    ElScrollbar,
    ElTag,
    ElIcon,
    CircleClose: circle_close_default,
    Check: check_default,
    ArrowDown: arrow_down_default
  },
  directives: {
    Clickoutside: ClickOutside
  },
  props: {
    ...CommonProps,
    size: {
      type: String,
      validator: isValidComponentSize
    },
    placeholder: {
      type: String
    },
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    filterMethod: {
      type: Function,
      default: (e, k) => e.text.includes(k)
    },
    separator: {
      type: String,
      default: " / "
    },
    showAllLevels: {
      type: Boolean,
      default: !0
    },
    collapseTags: Boolean,
    collapseTagsTooltip: {
      type: Boolean,
      default: !1
    },
    debounce: {
      type: Number,
      default: 300
    },
    beforeFilter: {
      type: Function,
      default: () => !0
    },
    popperClass: {
      type: String,
      default: ""
    },
    teleported: useTooltipContentProps.teleported,
    tagType: { ...tagProps.type, default: "info" },
    validateEvent: {
      type: Boolean,
      default: !0
    }
  },
  emits: [
    UPDATE_MODEL_EVENT,
    CHANGE_EVENT,
    "focus",
    "blur",
    "visible-change",
    "expand-change",
    "remove-tag"
  ],
  setup(e, { emit: k }) {
    let oe = 0, re = 0;
    const ae = useNamespace("cascader"), le = useNamespace("input"), { t: ie } = useLocale(), ue = inject(formContextKey, {}), de = inject(formItemContextKey, {}), pe = ref(null), Ce = ref(null), _e = ref(null), $e = ref(null), Ve = ref(null), Ne = ref(!1), he = ref(!1), Oe = ref(!1), Ie = ref(""), qe = ref(""), xe = ref([]), ze = ref([]), At = ref([]), Fe = ref(!1), Pt = computed(() => e.disabled || ue.disabled), vn = computed(() => e.placeholder || ie("el.cascader.placeholder")), En = useSize(), Nn = computed(() => ["small"].includes(En.value) ? "small" : "default"), Tn = computed(() => !!e.props.multiple), wn = computed(() => !e.filterable || Tn.value), Lt = computed(() => Tn.value ? qe.value : Ie.value), Dt = computed(() => {
      var zn;
      return ((zn = $e.value) == null ? void 0 : zn.checkedNodes) || [];
    }), Cn = computed(() => !e.clearable || Pt.value || Oe.value || !he.value ? !1 : !!Dt.value.length), jt = computed(() => {
      const { showAllLevels: zn, separator: Hn } = e, qn = Dt.value;
      return qn.length ? Tn.value ? " " : qn[0].calcText(zn, Hn) : "";
    }), bn = computed({
      get() {
        return e.modelValue;
      },
      set(zn) {
        var Hn;
        k(UPDATE_MODEL_EVENT, zn), k(CHANGE_EVENT, zn), e.validateEvent && ((Hn = de.validate) == null || Hn.call(de, "change").catch((qn) => debugWarn(qn)));
      }
    }), kt = computed(() => {
      var zn, Hn;
      return (Hn = (zn = pe.value) == null ? void 0 : zn.popperRef) == null ? void 0 : Hn.contentRef;
    }), Et = (zn) => {
      var Hn, qn, Zn;
      if (!Pt.value && (zn = zn != null ? zn : !Ne.value, zn !== Ne.value)) {
        if (Ne.value = zn, (qn = (Hn = Ce.value) == null ? void 0 : Hn.input) == null || qn.setAttribute("aria-expanded", `${zn}`), zn)
          _n(), nextTick((Zn = $e.value) == null ? void 0 : Zn.scrollToExpandingNode);
        else if (e.filterable) {
          const { value: lo } = jt;
          Ie.value = lo, qe.value = lo;
        }
        k("visible-change", zn);
      }
    }, _n = () => {
      nextTick(() => {
        var zn;
        (zn = pe.value) == null || zn.updatePopper();
      });
    }, Pn = () => {
      Oe.value = !1;
    }, hn = (zn) => {
      const { showAllLevels: Hn, separator: qn } = e;
      return {
        node: zn,
        key: zn.uid,
        text: zn.calcText(Hn, qn),
        hitState: !1,
        closable: !Pt.value && !zn.isDisabled,
        isCollapseTag: !1
      };
    }, On = (zn) => {
      var Hn;
      const qn = zn.node;
      qn.doCheck(!1), (Hn = $e.value) == null || Hn.calculateCheckedValue(), k("remove-tag", qn.valueByOption);
    }, Dn = () => {
      if (!Tn.value)
        return;
      const zn = Dt.value, Hn = [], qn = [];
      if (zn.forEach((Zn) => qn.push(hn(Zn))), ze.value = qn, zn.length) {
        const [Zn, ...lo] = zn, ao = lo.length;
        Hn.push(hn(Zn)), ao && (e.collapseTags ? Hn.push({
          key: -1,
          text: `+ ${ao}`,
          closable: !1,
          isCollapseTag: !0
        }) : lo.forEach((In) => Hn.push(hn(In))));
      }
      xe.value = Hn;
    }, Rn = () => {
      var zn, Hn;
      const { filterMethod: qn, showAllLevels: Zn, separator: lo } = e, ao = (Hn = (zn = $e.value) == null ? void 0 : zn.getFlattedNodes(!e.props.checkStrictly)) == null ? void 0 : Hn.filter((In) => In.isDisabled ? !1 : (In.calcText(Zn, lo), qn(In, Lt.value)));
      Tn.value && (xe.value.forEach((In) => {
        In.hitState = !1;
      }), ze.value.forEach((In) => {
        In.hitState = !1;
      })), Oe.value = !0, At.value = ao, _n();
    }, Fn = () => {
      var zn;
      let Hn;
      Oe.value && Ve.value ? Hn = Ve.value.$el.querySelector(`.${ae.e("suggestion-item")}`) : Hn = (zn = $e.value) == null ? void 0 : zn.$el.querySelector(`.${ae.b("node")}[tabindex="-1"]`), Hn && (Hn.focus(), !Oe.value && Hn.click());
    }, kn = () => {
      var zn, Hn;
      const qn = (zn = Ce.value) == null ? void 0 : zn.input, Zn = _e.value, lo = (Hn = Ve.value) == null ? void 0 : Hn.$el;
      if (!(!isClient$1 || !qn)) {
        if (lo) {
          const ao = lo.querySelector(`.${ae.e("suggestion-list")}`);
          ao.style.minWidth = `${qn.offsetWidth}px`;
        }
        if (Zn) {
          const { offsetHeight: ao } = Zn, In = xe.value.length > 0 ? `${Math.max(ao + 6, oe)}px` : `${oe}px`;
          qn.style.height = In, _n();
        }
      }
    }, An = (zn) => {
      var Hn;
      return (Hn = $e.value) == null ? void 0 : Hn.getCheckedNodes(zn);
    }, Vn = (zn) => {
      _n(), k("expand-change", zn);
    }, Bn = (zn) => {
      var Hn;
      const qn = (Hn = zn.target) == null ? void 0 : Hn.value;
      if (zn.type === "compositionend")
        Fe.value = !1, nextTick(() => oo(qn));
      else {
        const Zn = qn[qn.length - 1] || "";
        Fe.value = !isKorean(Zn);
      }
    }, Wn = (zn) => {
      if (!Fe.value)
        switch (zn.code) {
          case EVENT_CODE.enter:
            Et();
            break;
          case EVENT_CODE.down:
            Et(!0), nextTick(Fn), zn.preventDefault();
            break;
          case EVENT_CODE.esc:
            Ne.value === !0 && (zn.preventDefault(), zn.stopPropagation(), Et(!1));
            break;
          case EVENT_CODE.tab:
            Et(!1);
            break;
        }
    }, Yn = () => {
      var zn;
      (zn = $e.value) == null || zn.clearCheckedNodes(), Et(!1);
    }, Xn = (zn) => {
      var Hn, qn;
      const { checked: Zn } = zn;
      Tn.value ? (Hn = $e.value) == null || Hn.handleCheckChange(zn, !Zn, !1) : (!Zn && ((qn = $e.value) == null || qn.handleCheckChange(zn, !0, !1)), Et(!1));
    }, eo = (zn) => {
      const Hn = zn.target, { code: qn } = zn;
      switch (qn) {
        case EVENT_CODE.up:
        case EVENT_CODE.down: {
          const Zn = qn === EVENT_CODE.up ? -1 : 1;
          focusNode(getSibling(Hn, Zn, `.${ae.e("suggestion-item")}[tabindex="-1"]`));
          break;
        }
        case EVENT_CODE.enter:
          Hn.click();
          break;
      }
    }, Gn = () => {
      const zn = xe.value, Hn = zn[zn.length - 1];
      re = qe.value ? 0 : re + 1, !(!Hn || !re) && (Hn.hitState ? On(Hn) : Hn.hitState = !0);
    }, no = debounce(() => {
      const { value: zn } = Lt;
      if (!zn)
        return;
      const Hn = e.beforeFilter(zn);
      isPromise(Hn) ? Hn.then(Rn).catch(() => {
      }) : Hn !== !1 ? Rn() : Pn();
    }, e.debounce), oo = (zn, Hn) => {
      !Ne.value && Et(!0), !(Hn != null && Hn.isComposing) && (zn ? no() : Pn());
    };
    return watch(Oe, _n), watch([Dt, Pt], Dn), watch(xe, () => {
      nextTick(() => kn());
    }), watch(jt, (zn) => Ie.value = zn, { immediate: !0 }), onMounted(() => {
      var zn;
      const Hn = (zn = Ce.value) == null ? void 0 : zn.$el;
      oe = (Hn == null ? void 0 : Hn.offsetHeight) || INPUT_HEIGHT_MAP[En.value] || DEFAULT_INPUT_HEIGHT, useResizeObserver(Hn, kn);
    }), {
      popperOptions,
      tooltipRef: pe,
      popperPaneRef: kt,
      input: Ce,
      tagWrapper: _e,
      panel: $e,
      suggestionPanel: Ve,
      popperVisible: Ne,
      inputHover: he,
      inputPlaceholder: vn,
      filtering: Oe,
      presentText: jt,
      checkedValue: bn,
      inputValue: Ie,
      searchInputValue: qe,
      presentTags: xe,
      allPresentTags: ze,
      suggestions: At,
      isDisabled: Pt,
      isOnComposition: Fe,
      realSize: En,
      tagSize: Nn,
      multiple: Tn,
      readonly: wn,
      clearBtnVisible: Cn,
      nsCascader: ae,
      nsInput: le,
      t: ie,
      togglePopperVisible: Et,
      hideSuggestionPanel: Pn,
      deleteTag: On,
      focusFirstNode: Fn,
      getCheckedNodes: An,
      handleExpandChange: Vn,
      handleKeyDown: Wn,
      handleComposition: Bn,
      handleClear: Yn,
      handleSuggestionClick: Xn,
      handleSuggestionKeyDown: eo,
      handleDelete: Gn,
      handleInput: oo
    };
  }
}), _hoisted_1$i = { key: 0 }, _hoisted_2$d = ["placeholder"], _hoisted_3$9 = ["onClick"];
function _sfc_render$a(e, k, oe, re, ae, le) {
  const ie = resolveComponent("circle-close"), ue = resolveComponent("el-icon"), de = resolveComponent("arrow-down"), pe = resolveComponent("el-input"), Ce = resolveComponent("el-tag"), _e = resolveComponent("el-tooltip"), $e = resolveComponent("el-cascader-panel"), Ve = resolveComponent("check"), Ne = resolveComponent("el-scrollbar"), he = resolveDirective("clickoutside");
  return openBlock(), createBlock(_e, {
    ref: "tooltipRef",
    visible: e.popperVisible,
    teleported: e.teleported,
    "popper-class": [e.nsCascader.e("dropdown"), e.popperClass],
    "popper-options": e.popperOptions,
    "fallback-placements": [
      "bottom-start",
      "bottom",
      "top-start",
      "top",
      "right",
      "left"
    ],
    "stop-popper-mouse-event": !1,
    "gpu-acceleration": !1,
    placement: "bottom-start",
    transition: `${e.nsCascader.namespace.value}-zoom-in-top`,
    effect: "light",
    pure: "",
    persistent: "",
    onHide: e.hideSuggestionPanel
  }, {
    default: withCtx(() => [
      withDirectives((openBlock(), createElementBlock("div", {
        class: normalizeClass([
          e.nsCascader.b(),
          e.nsCascader.m(e.realSize),
          e.nsCascader.is("disabled", e.isDisabled),
          e.$attrs.class
        ]),
        style: normalizeStyle(e.$attrs.style),
        onClick: k[11] || (k[11] = () => e.togglePopperVisible(e.readonly ? void 0 : !0)),
        onKeydown: k[12] || (k[12] = (...Oe) => e.handleKeyDown && e.handleKeyDown(...Oe)),
        onMouseenter: k[13] || (k[13] = (Oe) => e.inputHover = !0),
        onMouseleave: k[14] || (k[14] = (Oe) => e.inputHover = !1)
      }, [
        createVNode(pe, {
          ref: "input",
          modelValue: e.inputValue,
          "onUpdate:modelValue": k[1] || (k[1] = (Oe) => e.inputValue = Oe),
          placeholder: e.searchInputValue ? "" : e.inputPlaceholder,
          readonly: e.readonly,
          disabled: e.isDisabled,
          "validate-event": !1,
          size: e.realSize,
          class: normalizeClass(e.nsCascader.is("focus", e.popperVisible)),
          onCompositionstart: e.handleComposition,
          onCompositionupdate: e.handleComposition,
          onCompositionend: e.handleComposition,
          onFocus: k[2] || (k[2] = (Oe) => e.$emit("focus", Oe)),
          onBlur: k[3] || (k[3] = (Oe) => e.$emit("blur", Oe)),
          onInput: e.handleInput
        }, {
          suffix: withCtx(() => [
            e.clearBtnVisible ? (openBlock(), createBlock(ue, {
              key: "clear",
              class: normalizeClass([e.nsInput.e("icon"), "icon-circle-close"]),
              onClick: withModifiers(e.handleClear, ["stop"])
            }, {
              default: withCtx(() => [
                createVNode(ie)
              ]),
              _: 1
            }, 8, ["class", "onClick"])) : (openBlock(), createBlock(ue, {
              key: "arrow-down",
              class: normalizeClass([
                e.nsInput.e("icon"),
                "icon-arrow-down",
                e.nsCascader.is("reverse", e.popperVisible)
              ]),
              onClick: k[0] || (k[0] = withModifiers((Oe) => e.togglePopperVisible(), ["stop"]))
            }, {
              default: withCtx(() => [
                createVNode(de)
              ]),
              _: 1
            }, 8, ["class"]))
          ]),
          _: 1
        }, 8, ["modelValue", "placeholder", "readonly", "disabled", "size", "class", "onCompositionstart", "onCompositionupdate", "onCompositionend", "onInput"]),
        e.multiple ? (openBlock(), createElementBlock("div", {
          key: 0,
          ref: "tagWrapper",
          class: normalizeClass(e.nsCascader.e("tags"))
        }, [
          (openBlock(!0), createElementBlock(Fragment, null, renderList(e.presentTags, (Oe) => (openBlock(), createBlock(Ce, {
            key: Oe.key,
            type: e.tagType,
            size: e.tagSize,
            hit: Oe.hitState,
            closable: Oe.closable,
            "disable-transitions": "",
            onClose: (Ie) => e.deleteTag(Oe)
          }, {
            default: withCtx(() => [
              Oe.isCollapseTag === !1 ? (openBlock(), createElementBlock("span", _hoisted_1$i, toDisplayString(Oe.text), 1)) : (openBlock(), createBlock(_e, {
                key: 1,
                teleported: !1,
                disabled: e.popperVisible || !e.collapseTagsTooltip,
                "fallback-placements": ["bottom", "top", "right", "left"],
                placement: "bottom",
                effect: "light"
              }, {
                default: withCtx(() => [
                  createElementVNode("span", null, toDisplayString(Oe.text), 1)
                ]),
                content: withCtx(() => [
                  createElementVNode("div", {
                    class: normalizeClass(e.nsCascader.e("collapse-tags"))
                  }, [
                    (openBlock(!0), createElementBlock(Fragment, null, renderList(e.allPresentTags, (Ie, qe) => (openBlock(), createElementBlock("div", {
                      key: qe,
                      class: normalizeClass(e.nsCascader.e("collapse-tag"))
                    }, [
                      (openBlock(), createBlock(Ce, {
                        key: Ie.key,
                        class: "in-tooltip",
                        type: e.tagType,
                        size: e.tagSize,
                        hit: Ie.hitState,
                        closable: Ie.closable,
                        "disable-transitions": "",
                        onClose: (xe) => e.deleteTag(Ie)
                      }, {
                        default: withCtx(() => [
                          createElementVNode("span", null, toDisplayString(Ie.text), 1)
                        ]),
                        _: 2
                      }, 1032, ["type", "size", "hit", "closable", "onClose"]))
                    ], 2))), 128))
                  ], 2)
                ]),
                _: 2
              }, 1032, ["disabled"]))
            ]),
            _: 2
          }, 1032, ["type", "size", "hit", "closable", "onClose"]))), 128)),
          e.filterable && !e.isDisabled ? withDirectives((openBlock(), createElementBlock("input", {
            key: 0,
            "onUpdate:modelValue": k[4] || (k[4] = (Oe) => e.searchInputValue = Oe),
            type: "text",
            class: normalizeClass(e.nsCascader.e("search-input")),
            placeholder: e.presentText ? "" : e.inputPlaceholder,
            onInput: k[5] || (k[5] = (Oe) => e.handleInput(e.searchInputValue, Oe)),
            onClick: k[6] || (k[6] = withModifiers((Oe) => e.togglePopperVisible(!0), ["stop"])),
            onKeydown: k[7] || (k[7] = withKeys((...Oe) => e.handleDelete && e.handleDelete(...Oe), ["delete"])),
            onCompositionstart: k[8] || (k[8] = (...Oe) => e.handleComposition && e.handleComposition(...Oe)),
            onCompositionupdate: k[9] || (k[9] = (...Oe) => e.handleComposition && e.handleComposition(...Oe)),
            onCompositionend: k[10] || (k[10] = (...Oe) => e.handleComposition && e.handleComposition(...Oe))
          }, null, 42, _hoisted_2$d)), [
            [vModelText, e.searchInputValue]
          ]) : createCommentVNode("v-if", !0)
        ], 2)) : createCommentVNode("v-if", !0)
      ], 38)), [
        [he, () => e.togglePopperVisible(!1), e.popperPaneRef]
      ])
    ]),
    content: withCtx(() => [
      withDirectives(createVNode($e, {
        ref: "panel",
        modelValue: e.checkedValue,
        "onUpdate:modelValue": k[15] || (k[15] = (Oe) => e.checkedValue = Oe),
        options: e.options,
        props: e.props,
        border: !1,
        "render-label": e.$slots.default,
        onExpandChange: e.handleExpandChange,
        onClose: k[16] || (k[16] = (Oe) => e.$nextTick(() => e.togglePopperVisible(!1)))
      }, null, 8, ["modelValue", "options", "props", "render-label", "onExpandChange"]), [
        [vShow, !e.filtering]
      ]),
      e.filterable ? withDirectives((openBlock(), createBlock(Ne, {
        key: 0,
        ref: "suggestionPanel",
        tag: "ul",
        class: normalizeClass(e.nsCascader.e("suggestion-panel")),
        "view-class": e.nsCascader.e("suggestion-list"),
        onKeydown: e.handleSuggestionKeyDown
      }, {
        default: withCtx(() => [
          e.suggestions.length ? (openBlock(!0), createElementBlock(Fragment, { key: 0 }, renderList(e.suggestions, (Oe) => (openBlock(), createElementBlock("li", {
            key: Oe.uid,
            class: normalizeClass([
              e.nsCascader.e("suggestion-item"),
              e.nsCascader.is("checked", Oe.checked)
            ]),
            tabindex: -1,
            onClick: (Ie) => e.handleSuggestionClick(Oe)
          }, [
            createElementVNode("span", null, toDisplayString(Oe.text), 1),
            Oe.checked ? (openBlock(), createBlock(ue, { key: 0 }, {
              default: withCtx(() => [
                createVNode(Ve)
              ]),
              _: 1
            })) : createCommentVNode("v-if", !0)
          ], 10, _hoisted_3$9))), 128)) : renderSlot(e.$slots, "empty", { key: 1 }, () => [
            createElementVNode("li", {
              class: normalizeClass(e.nsCascader.e("empty-text"))
            }, toDisplayString(e.t("el.cascader.noMatch")), 3)
          ])
        ]),
        _: 3
      }, 8, ["class", "view-class", "onKeydown"])), [
        [vShow, e.filtering]
      ]) : createCommentVNode("v-if", !0)
    ]),
    _: 3
  }, 8, ["visible", "teleported", "popper-class", "popper-options", "transition", "onHide"]);
}
var Cascader = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$a], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/cascader/src/index.vue"]]);
Cascader.install = (e) => {
  e.component(Cascader.name, Cascader);
};
const _Cascader = Cascader, ElCascader = _Cascader, colProps = buildProps({
  tag: {
    type: String,
    default: "div"
  },
  span: {
    type: Number,
    default: 24
  },
  offset: {
    type: Number,
    default: 0
  },
  pull: {
    type: Number,
    default: 0
  },
  push: {
    type: Number,
    default: 0
  },
  xs: {
    type: definePropType([Number, Object]),
    default: () => mutable({})
  },
  sm: {
    type: definePropType([Number, Object]),
    default: () => mutable({})
  },
  md: {
    type: definePropType([Number, Object]),
    default: () => mutable({})
  },
  lg: {
    type: definePropType([Number, Object]),
    default: () => mutable({})
  },
  xl: {
    type: definePropType([Number, Object]),
    default: () => mutable({})
  }
}), __default__$b = {
  name: "ElCol"
}, _sfc_main$u = /* @__PURE__ */ defineComponent({
  ...__default__$b,
  props: colProps,
  setup(e) {
    const k = e, { gutter: oe } = inject(rowContextKey, { gutter: computed(() => 0) }), re = useNamespace("col"), ae = computed(() => {
      const ie = {};
      return oe.value && (ie.paddingLeft = ie.paddingRight = `${oe.value / 2}px`), ie;
    }), le = computed(() => {
      const ie = [];
      return ["span", "offset", "pull", "push"].forEach((pe) => {
        const Ce = k[pe];
        isNumber(Ce) && (pe === "span" ? ie.push(re.b(`${k[pe]}`)) : Ce > 0 && ie.push(re.b(`${pe}-${k[pe]}`)));
      }), ["xs", "sm", "md", "lg", "xl"].forEach((pe) => {
        isNumber(k[pe]) ? ie.push(re.b(`${pe}-${k[pe]}`)) : isObject$1(k[pe]) && Object.entries(k[pe]).forEach(([Ce, _e]) => {
          ie.push(Ce !== "span" ? re.b(`${pe}-${Ce}-${_e}`) : re.b(`${pe}-${_e}`));
        });
      }), oe.value && ie.push(re.is("guttered")), ie;
    });
    return (ie, ue) => (openBlock(), createBlock(resolveDynamicComponent(ie.tag), {
      class: normalizeClass([unref(re).b(), unref(le)]),
      style: normalizeStyle(unref(ae))
    }, {
      default: withCtx(() => [
        renderSlot(ie.$slots, "default")
      ]),
      _: 3
    }, 8, ["class", "style"]));
  }
});
var Col = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/col/src/col.vue"]]);
const ElCol = withInstall(Col);
var advancedFormat$1 = { exports: {} };
(function(e, k) {
  (function(oe, re) {
    e.exports = re();
  })(commonjsGlobal, function() {
    return function(oe, re, ae) {
      var le = re.prototype, ie = le.format;
      ae.en.ordinal = function(ue) {
        var de = ["th", "st", "nd", "rd"], pe = ue % 100;
        return "[" + ue + (de[(pe - 20) % 10] || de[pe] || de[0]) + "]";
      }, le.format = function(ue) {
        var de = this, pe = this.$locale();
        if (!this.isValid())
          return ie.bind(this)(ue);
        var Ce = this.$utils(), _e = (ue || "YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g, function($e) {
          switch ($e) {
            case "Q":
              return Math.ceil((de.$M + 1) / 3);
            case "Do":
              return pe.ordinal(de.$D);
            case "gggg":
              return de.weekYear();
            case "GGGG":
              return de.isoWeekYear();
            case "wo":
              return pe.ordinal(de.week(), "W");
            case "w":
            case "ww":
              return Ce.s(de.week(), $e === "w" ? 1 : 2, "0");
            case "W":
            case "WW":
              return Ce.s(de.isoWeek(), $e === "W" ? 1 : 2, "0");
            case "k":
            case "kk":
              return Ce.s(String(de.$H === 0 ? 24 : de.$H), $e === "k" ? 1 : 2, "0");
            case "X":
              return Math.floor(de.$d.getTime() / 1e3);
            case "x":
              return de.$d.getTime();
            case "z":
              return "[" + de.offsetName() + "]";
            case "zzz":
              return "[" + de.offsetName("long") + "]";
            default:
              return $e;
          }
        });
        return ie.bind(this)(_e);
      };
    };
  });
})(advancedFormat$1);
const advancedFormat = advancedFormat$1.exports;
var weekOfYear$1 = { exports: {} };
(function(e, k) {
  (function(oe, re) {
    e.exports = re();
  })(commonjsGlobal, function() {
    var oe = "week", re = "year";
    return function(ae, le, ie) {
      var ue = le.prototype;
      ue.week = function(de) {
        if (de === void 0 && (de = null), de !== null)
          return this.add(7 * (de - this.week()), "day");
        var pe = this.$locale().yearStart || 1;
        if (this.month() === 11 && this.date() > 25) {
          var Ce = ie(this).startOf(re).add(1, re).date(pe), _e = ie(this).endOf(oe);
          if (Ce.isBefore(_e))
            return 1;
        }
        var $e = ie(this).startOf(re).date(pe).startOf(oe).subtract(1, "millisecond"), Ve = this.diff($e, oe, !0);
        return Ve < 0 ? ie(this).startOf("week").week() : Math.ceil(Ve);
      }, ue.weeks = function(de) {
        return de === void 0 && (de = null), this.week(de);
      };
    };
  });
})(weekOfYear$1);
const weekOfYear = weekOfYear$1.exports;
var weekYear$1 = { exports: {} };
(function(e, k) {
  (function(oe, re) {
    e.exports = re();
  })(commonjsGlobal, function() {
    return function(oe, re) {
      re.prototype.weekYear = function() {
        var ae = this.month(), le = this.week(), ie = this.year();
        return le === 1 && ae === 11 ? ie + 1 : ae === 0 && le >= 52 ? ie - 1 : ie;
      };
    };
  });
})(weekYear$1);
const weekYear = weekYear$1.exports;
var dayOfYear$1 = { exports: {} };
(function(e, k) {
  (function(oe, re) {
    e.exports = re();
  })(commonjsGlobal, function() {
    return function(oe, re, ae) {
      re.prototype.dayOfYear = function(le) {
        var ie = Math.round((ae(this).startOf("day") - ae(this).startOf("year")) / 864e5) + 1;
        return le == null ? ie : this.add(le - ie, "day");
      };
    };
  });
})(dayOfYear$1);
const dayOfYear = dayOfYear$1.exports;
var isSameOrAfter$1 = { exports: {} };
(function(e, k) {
  (function(oe, re) {
    e.exports = re();
  })(commonjsGlobal, function() {
    return function(oe, re) {
      re.prototype.isSameOrAfter = function(ae, le) {
        return this.isSame(ae, le) || this.isAfter(ae, le);
      };
    };
  });
})(isSameOrAfter$1);
const isSameOrAfter = isSameOrAfter$1.exports;
var isSameOrBefore$1 = { exports: {} };
(function(e, k) {
  (function(oe, re) {
    e.exports = re();
  })(commonjsGlobal, function() {
    return function(oe, re) {
      re.prototype.isSameOrBefore = function(ae, le) {
        return this.isSame(ae, le) || this.isBefore(ae, le);
      };
    };
  });
})(isSameOrBefore$1);
const isSameOrBefore = isSameOrBefore$1.exports, datePickerProps = buildProps({
  type: {
    type: definePropType(String),
    default: "date"
  }
}), selectionModes = ["date", "dates", "year", "month", "week", "range"], datePickerSharedProps = buildProps({
  disabledDate: {
    type: definePropType(Function)
  },
  date: {
    type: definePropType(Object),
    required: !0
  },
  minDate: {
    type: definePropType(Object)
  },
  maxDate: {
    type: definePropType(Object)
  },
  parsedValue: {
    type: definePropType([Object, Array])
  },
  rangeState: {
    type: definePropType(Object),
    default: () => ({
      endDate: null,
      selecting: !1
    })
  }
}), panelSharedProps = buildProps({
  type: {
    type: definePropType(String),
    required: !0,
    values: datePickTypes
  }
}), panelRangeSharedProps = buildProps({
  unlinkPanels: Boolean,
  parsedValue: {
    type: definePropType(Array)
  }
}), selectionModeWithDefault = (e) => ({
  type: String,
  values: selectionModes,
  default: e
}), panelDatePickProps = buildProps({
  ...panelSharedProps,
  parsedValue: {
    type: definePropType([Object, Array])
  },
  visible: {
    type: Boolean
  },
  format: {
    type: String,
    default: ""
  }
}), basicDateTableProps = buildProps({
  ...datePickerSharedProps,
  cellClassName: {
    type: definePropType(Function)
  },
  showWeekNumber: Boolean,
  selectionMode: selectionModeWithDefault("date")
}), isValidRange = (e) => {
  if (!isArray(e))
    return !1;
  const [k, oe] = e;
  return dayjs.isDayjs(k) && dayjs.isDayjs(oe) && k.isSameOrBefore(oe);
}, getDefaultValue = (e, { lang: k, unit: oe, unlinkPanels: re }) => {
  let ae;
  if (isArray(e)) {
    let [le, ie] = e.map((ue) => dayjs(ue).locale(k));
    return re || (ie = le.add(1, oe)), [le, ie];
  } else
    e ? ae = dayjs(e) : ae = dayjs();
  return ae = ae.locale(k), [ae, ae.add(1, oe)];
}, buildPickerTable = (e, k, {
  columnIndexOffset: oe,
  startDate: re,
  nextEndDate: ae,
  now: le,
  unit: ie,
  relativeDateGetter: ue,
  setCellMetadata: de,
  setRowMetadata: pe
}) => {
  for (let Ce = 0; Ce < e.row; Ce++) {
    const _e = k[Ce];
    for (let $e = 0; $e < e.column; $e++) {
      let Ve = _e[$e + oe];
      Ve || (Ve = {
        row: Ce,
        column: $e,
        type: "normal",
        inRange: !1,
        start: !1,
        end: !1
      });
      const Ne = Ce * e.column + $e, he = ue(Ne);
      Ve.dayjs = he, Ve.date = he.toDate(), Ve.timestamp = he.valueOf(), Ve.type = "normal", Ve.inRange = !!(re && he.isSameOrAfter(re, ie) && ae && he.isSameOrBefore(ae, ie)) || !!(re && he.isSameOrBefore(re, ie) && ae && he.isSameOrAfter(ae, ie)), re != null && re.isSameOrAfter(ae) ? (Ve.start = !!ae && he.isSame(ae, ie), Ve.end = re && he.isSame(re, ie)) : (Ve.start = !!re && he.isSame(re, ie), Ve.end = !!ae && he.isSame(ae, ie)), he.isSame(le, ie) && (Ve.type = "today"), de == null || de(Ve, { rowIndex: Ce, columnIndex: $e }), _e[$e + oe] = Ve;
    }
    pe == null || pe(_e);
  }
}, basicCellProps = buildProps({
  cell: {
    type: definePropType(Object)
  }
});
var ElDatePickerCell = defineComponent({
  name: "ElDatePickerCell",
  props: basicCellProps,
  setup(e) {
    const k = useNamespace("date-table-cell"), {
      slots: oe
    } = inject(ROOT_PICKER_INJECTION_KEY);
    return () => {
      const {
        cell: re
      } = e;
      if (oe.default) {
        const ae = oe.default(re).filter((le) => le.patchFlag !== -2 && le.type.toString() !== "Symbol(Comment)");
        if (ae.length)
          return ae;
      }
      return createVNode("div", {
        class: k.b()
      }, [createVNode("span", {
        class: k.e("text")
      }, [re == null ? void 0 : re.text])]);
    };
  }
});
const _hoisted_1$h = ["aria-label"], _hoisted_2$c = {
  key: 0,
  scope: "col"
}, _hoisted_3$8 = ["aria-label"], _hoisted_4$4 = ["aria-current", "aria-selected", "tabindex"], _sfc_main$t = /* @__PURE__ */ defineComponent({
  __name: "basic-date-table",
  props: basicDateTableProps,
  emits: ["changerange", "pick", "select"],
  setup(e, { expose: k, emit: oe }) {
    const re = e, ae = useNamespace("date-table"), { t: le, lang: ie } = useLocale(), ue = ref(), de = ref(), pe = ref(), Ce = ref(), _e = ref([[], [], [], [], [], []]);
    let $e = !1;
    const Ve = re.date.$locale().weekStart || 7, Ne = re.date.locale("en").localeData().weekdaysShort().map((hn) => hn.toLowerCase()), he = computed(() => Ve > 3 ? 7 - Ve : -Ve), Oe = computed(() => {
      const hn = re.date.startOf("month");
      return hn.subtract(hn.day() || 7, "day");
    }), Ie = computed(() => Ne.concat(Ne).slice(Ve, Ve + 7)), qe = computed(() => vn.value.flat().some((hn) => hn.isCurrent)), xe = computed(() => {
      const hn = re.date.startOf("month"), On = hn.day() || 7, Dn = hn.daysInMonth(), Rn = hn.subtract(1, "month").daysInMonth();
      return {
        startOfMonthDay: On,
        dateCountOfMonth: Dn,
        dateCountOfLastMonth: Rn
      };
    }), ze = computed(() => re.selectionMode === "dates" ? castArray(re.parsedValue) : []), At = (hn, {
      count: On,
      rowIndex: Dn,
      columnIndex: Rn
    }) => {
      const { startOfMonthDay: Fn, dateCountOfMonth: kn, dateCountOfLastMonth: An } = unref(xe), Vn = unref(he);
      if (Dn >= 0 && Dn <= 1) {
        const Bn = Fn + Vn < 0 ? 7 + Fn + Vn : Fn + Vn;
        if (Rn + Dn * 7 >= Bn)
          return hn.text = On, !0;
        hn.text = An - (Bn - Rn % 7) + 1 + Dn * 7, hn.type = "prev-month";
      } else
        return On <= kn ? hn.text = On : (hn.text = On - kn, hn.type = "next-month"), !0;
      return !1;
    }, Fe = (hn, {
      columnIndex: On,
      rowIndex: Dn
    }, Rn) => {
      const { disabledDate: Fn, cellClassName: kn } = re, An = unref(ze), Vn = At(hn, { count: Rn, rowIndex: Dn, columnIndex: On }), Bn = hn.dayjs.toDate();
      return hn.selected = An.find((Wn) => Wn.valueOf() === hn.dayjs.valueOf()), hn.isSelected = !!hn.selected, hn.isCurrent = Tn(hn), hn.disabled = Fn == null ? void 0 : Fn(Bn), hn.customClass = kn == null ? void 0 : kn(Bn), Vn;
    }, Pt = (hn) => {
      if (re.selectionMode === "week") {
        const [On, Dn] = re.showWeekNumber ? [1, 7] : [0, 6], Rn = Pn(hn[On + 1]);
        hn[On].inRange = Rn, hn[On].start = Rn, hn[Dn].inRange = Rn, hn[Dn].end = Rn;
      }
    }, vn = computed(() => {
      const { minDate: hn, maxDate: On, rangeState: Dn, showWeekNumber: Rn } = re, Fn = he.value, kn = _e.value, An = "day";
      let Vn = 1;
      if (Rn)
        for (let Bn = 0; Bn < 6; Bn++)
          kn[Bn][0] || (kn[Bn][0] = {
            type: "week",
            text: Oe.value.add(Bn * 7 + 1, An).week()
          });
      return buildPickerTable({ row: 6, column: 7 }, kn, {
        startDate: hn,
        columnIndexOffset: Rn ? 1 : 0,
        nextEndDate: Dn.endDate || On || Dn.selecting && hn || null,
        now: dayjs().locale(unref(ie)).startOf(An),
        unit: An,
        relativeDateGetter: (Bn) => Oe.value.add(Bn - Fn, An),
        setCellMetadata: (...Bn) => {
          Fe(...Bn, Vn) && (Vn += 1);
        },
        setRowMetadata: Pt
      }), kn;
    });
    watch(() => re.date, async () => {
      var hn, On;
      (hn = ue.value) != null && hn.contains(document.activeElement) && (await nextTick(), (On = de.value) == null || On.focus());
    });
    const En = async () => {
      var hn;
      (hn = de.value) == null || hn.focus();
    }, Nn = (hn = "") => ["normal", "today"].includes(hn), Tn = (hn) => re.selectionMode === "date" && Nn(hn.type) && wn(hn, re.parsedValue), wn = (hn, On) => On ? dayjs(On).locale(ie.value).isSame(re.date.date(Number(hn.text)), "day") : !1, Lt = (hn) => {
      const On = [];
      return Nn(hn.type) && !hn.disabled ? (On.push("available"), hn.type === "today" && On.push("today")) : On.push(hn.type), Tn(hn) && On.push("current"), hn.inRange && (Nn(hn.type) || re.selectionMode === "week") && (On.push("in-range"), hn.start && On.push("start-date"), hn.end && On.push("end-date")), hn.disabled && On.push("disabled"), hn.selected && On.push("selected"), hn.customClass && On.push(hn.customClass), On.join(" ");
    }, Dt = (hn, On) => {
      const Dn = hn * 7 + (On - (re.showWeekNumber ? 1 : 0)) - he.value;
      return Oe.value.add(Dn, "day");
    }, Cn = (hn) => {
      var On;
      if (!re.rangeState.selecting)
        return;
      let Dn = hn.target;
      if (Dn.tagName === "SPAN" && (Dn = (On = Dn.parentNode) == null ? void 0 : On.parentNode), Dn.tagName === "DIV" && (Dn = Dn.parentNode), Dn.tagName !== "TD")
        return;
      const Rn = Dn.parentNode.rowIndex - 1, Fn = Dn.cellIndex;
      vn.value[Rn][Fn].disabled || (Rn !== pe.value || Fn !== Ce.value) && (pe.value = Rn, Ce.value = Fn, oe("changerange", {
        selecting: !0,
        endDate: Dt(Rn, Fn)
      }));
    }, jt = (hn) => !qe.value && (hn == null ? void 0 : hn.text) === 1 && hn.type === "normal" || hn.isCurrent, bn = (hn) => {
      $e || qe.value || re.selectionMode !== "date" || _n(hn, !0);
    }, kt = (hn) => {
      !hn.target.closest("td") || ($e = !0);
    }, Et = (hn) => {
      !hn.target.closest("td") || ($e = !1);
    }, _n = (hn, On = !1) => {
      const Dn = hn.target.closest("td");
      if (!Dn)
        return;
      const Rn = Dn.parentNode.rowIndex - 1, Fn = Dn.cellIndex, kn = vn.value[Rn][Fn];
      if (kn.disabled || kn.type === "week")
        return;
      const An = Dt(Rn, Fn);
      if (re.selectionMode === "range")
        !re.rangeState.selecting || !re.minDate ? (oe("pick", { minDate: An, maxDate: null }), oe("select", !0)) : (An >= re.minDate ? oe("pick", { minDate: re.minDate, maxDate: An }) : oe("pick", { minDate: An, maxDate: re.minDate }), oe("select", !1));
      else if (re.selectionMode === "date")
        oe("pick", An, On);
      else if (re.selectionMode === "week") {
        const Vn = An.week(), Bn = `${An.year()}w${Vn}`;
        oe("pick", {
          year: An.year(),
          week: Vn,
          value: Bn,
          date: An.startOf("week")
        });
      } else if (re.selectionMode === "dates") {
        const Vn = kn.selected ? castArray(re.parsedValue).filter((Bn) => (Bn == null ? void 0 : Bn.valueOf()) !== An.valueOf()) : castArray(re.parsedValue).concat([An]);
        oe("pick", Vn);
      }
    }, Pn = (hn) => {
      if (re.selectionMode !== "week")
        return !1;
      let On = re.date.startOf("day");
      if (hn.type === "prev-month" && (On = On.subtract(1, "month")), hn.type === "next-month" && (On = On.add(1, "month")), On = On.date(Number.parseInt(hn.text, 10)), re.parsedValue && !Array.isArray(re.parsedValue)) {
        const Dn = (re.parsedValue.day() - Ve + 7) % 7 - 1;
        return re.parsedValue.subtract(Dn, "day").isSame(On, "day");
      }
      return !1;
    };
    return k({
      focus: En
    }), (hn, On) => (openBlock(), createElementBlock("table", {
      role: "grid",
      "aria-label": unref(le)("el.datepicker.dateTablePrompt"),
      cellspacing: "0",
      cellpadding: "0",
      class: normalizeClass([unref(ae).b(), { "is-week-mode": hn.selectionMode === "week" }]),
      onClick: _n,
      onMousemove: Cn,
      onMousedown: kt,
      onMouseup: Et
    }, [
      createElementVNode("tbody", {
        ref_key: "tbodyRef",
        ref: ue
      }, [
        createElementVNode("tr", null, [
          hn.showWeekNumber ? (openBlock(), createElementBlock("th", _hoisted_2$c, toDisplayString(unref(le)("el.datepicker.week")), 1)) : createCommentVNode("v-if", !0),
          (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(Ie), (Dn, Rn) => (openBlock(), createElementBlock("th", {
            key: Rn,
            scope: "col",
            "aria-label": unref(le)("el.datepicker.weeksFull." + Dn)
          }, toDisplayString(unref(le)("el.datepicker.weeks." + Dn)), 9, _hoisted_3$8))), 128))
        ]),
        (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(vn), (Dn, Rn) => (openBlock(), createElementBlock("tr", {
          key: Rn,
          class: normalizeClass([unref(ae).e("row"), { current: Pn(Dn[1]) }])
        }, [
          (openBlock(!0), createElementBlock(Fragment, null, renderList(Dn, (Fn, kn) => (openBlock(), createElementBlock("td", {
            key: `${Rn}.${kn}`,
            ref_for: !0,
            ref: (An) => jt(Fn) && (de.value = An),
            class: normalizeClass(Lt(Fn)),
            "aria-current": Fn.isCurrent ? "date" : void 0,
            "aria-selected": Fn.isCurrent,
            tabindex: jt(Fn) ? 0 : -1,
            onFocus: bn
          }, [
            createVNode(unref(ElDatePickerCell), { cell: Fn }, null, 8, ["cell"])
          ], 42, _hoisted_4$4))), 128))
        ], 2))), 128))
      ], 512)
    ], 42, _hoisted_1$h));
  }
});
var DateTable = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/date-picker/src/date-picker-com/basic-date-table.vue"]]);
const basicMonthTableProps = buildProps({
  ...datePickerSharedProps,
  selectionMode: selectionModeWithDefault("month")
}), _hoisted_1$g = ["aria-label"], _hoisted_2$b = ["aria-selected", "aria-label", "tabindex", "onKeydown"], _hoisted_3$7 = { class: "cell" }, _sfc_main$s = /* @__PURE__ */ defineComponent({
  __name: "basic-month-table",
  props: basicMonthTableProps,
  emits: ["changerange", "pick", "select"],
  setup(e, { expose: k, emit: oe }) {
    const re = e, ae = (ze, At, Fe) => {
      const Pt = dayjs().locale(Fe).startOf("month").month(At).year(ze), vn = Pt.daysInMonth();
      return rangeArr(vn).map((En) => Pt.add(En, "day").toDate());
    }, le = useNamespace("month-table"), { t: ie, lang: ue } = useLocale(), de = ref(), pe = ref(), Ce = ref(re.date.locale("en").localeData().monthsShort().map((ze) => ze.toLowerCase())), _e = ref([
      [],
      [],
      []
    ]), $e = ref(), Ve = ref(), Ne = computed(() => {
      var ze, At;
      const Fe = _e.value, Pt = dayjs().locale(ue.value).startOf("month");
      for (let vn = 0; vn < 3; vn++) {
        const En = Fe[vn];
        for (let Nn = 0; Nn < 4; Nn++) {
          const Tn = En[Nn] || (En[Nn] = {
            row: vn,
            column: Nn,
            type: "normal",
            inRange: !1,
            start: !1,
            end: !1,
            text: -1,
            disabled: !1
          });
          Tn.type = "normal";
          const wn = vn * 4 + Nn, Lt = re.date.startOf("year").month(wn), Dt = re.rangeState.endDate || re.maxDate || re.rangeState.selecting && re.minDate || null;
          Tn.inRange = !!(re.minDate && Lt.isSameOrAfter(re.minDate, "month") && Dt && Lt.isSameOrBefore(Dt, "month")) || !!(re.minDate && Lt.isSameOrBefore(re.minDate, "month") && Dt && Lt.isSameOrAfter(Dt, "month")), (ze = re.minDate) != null && ze.isSameOrAfter(Dt) ? (Tn.start = !!(Dt && Lt.isSame(Dt, "month")), Tn.end = re.minDate && Lt.isSame(re.minDate, "month")) : (Tn.start = !!(re.minDate && Lt.isSame(re.minDate, "month")), Tn.end = !!(Dt && Lt.isSame(Dt, "month"))), Pt.isSame(Lt) && (Tn.type = "today"), Tn.text = wn, Tn.disabled = ((At = re.disabledDate) == null ? void 0 : At.call(re, Lt.toDate())) || !1;
        }
      }
      return Fe;
    }), he = () => {
      var ze;
      (ze = pe.value) == null || ze.focus();
    }, Oe = (ze) => {
      const At = {}, Fe = re.date.year(), Pt = new Date(), vn = ze.text;
      return At.disabled = re.disabledDate ? ae(Fe, vn, ue.value).every(re.disabledDate) : !1, At.current = castArray(re.parsedValue).findIndex((En) => dayjs.isDayjs(En) && En.year() === Fe && En.month() === vn) >= 0, At.today = Pt.getFullYear() === Fe && Pt.getMonth() === vn, ze.inRange && (At["in-range"] = !0, ze.start && (At["start-date"] = !0), ze.end && (At["end-date"] = !0)), At;
    }, Ie = (ze) => {
      const At = re.date.year(), Fe = ze.text;
      return castArray(re.date).findIndex((Pt) => Pt.year() === At && Pt.month() === Fe) >= 0;
    }, qe = (ze) => {
      var At;
      if (!re.rangeState.selecting)
        return;
      let Fe = ze.target;
      if (Fe.tagName === "A" && (Fe = (At = Fe.parentNode) == null ? void 0 : At.parentNode), Fe.tagName === "DIV" && (Fe = Fe.parentNode), Fe.tagName !== "TD")
        return;
      const Pt = Fe.parentNode.rowIndex, vn = Fe.cellIndex;
      Ne.value[Pt][vn].disabled || (Pt !== $e.value || vn !== Ve.value) && ($e.value = Pt, Ve.value = vn, oe("changerange", {
        selecting: !0,
        endDate: re.date.startOf("year").month(Pt * 4 + vn)
      }));
    }, xe = (ze) => {
      var At;
      const Fe = (At = ze.target) == null ? void 0 : At.closest("td");
      if ((Fe == null ? void 0 : Fe.tagName) !== "TD" || hasClass$1(Fe, "disabled"))
        return;
      const Pt = Fe.cellIndex, En = Fe.parentNode.rowIndex * 4 + Pt, Nn = re.date.startOf("year").month(En);
      re.selectionMode === "range" ? re.rangeState.selecting ? (re.minDate && Nn >= re.minDate ? oe("pick", { minDate: re.minDate, maxDate: Nn }) : oe("pick", { minDate: Nn, maxDate: re.minDate }), oe("select", !1)) : (oe("pick", { minDate: Nn, maxDate: null }), oe("select", !0)) : oe("pick", En);
    };
    return watch(() => re.date, async () => {
      var ze, At;
      (ze = de.value) != null && ze.contains(document.activeElement) && (await nextTick(), (At = pe.value) == null || At.focus());
    }), k({
      focus: he
    }), (ze, At) => (openBlock(), createElementBlock("table", {
      role: "grid",
      "aria-label": unref(ie)("el.datepicker.monthTablePrompt"),
      class: normalizeClass(unref(le).b()),
      onClick: xe,
      onMousemove: qe
    }, [
      createElementVNode("tbody", {
        ref_key: "tbodyRef",
        ref: de
      }, [
        (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(Ne), (Fe, Pt) => (openBlock(), createElementBlock("tr", { key: Pt }, [
          (openBlock(!0), createElementBlock(Fragment, null, renderList(Fe, (vn, En) => (openBlock(), createElementBlock("td", {
            key: En,
            ref_for: !0,
            ref: (Nn) => Ie(vn) && (pe.value = Nn),
            class: normalizeClass(Oe(vn)),
            "aria-selected": `${Ie(vn)}`,
            "aria-label": unref(ie)(`el.datepicker.month${+vn.text + 1}`),
            tabindex: Ie(vn) ? 0 : -1,
            onKeydown: [
              withKeys(withModifiers(xe, ["prevent", "stop"]), ["space"]),
              withKeys(withModifiers(xe, ["prevent", "stop"]), ["enter"])
            ]
          }, [
            createElementVNode("div", null, [
              createElementVNode("span", _hoisted_3$7, toDisplayString(unref(ie)("el.datepicker.months." + Ce.value[vn.text])), 1)
            ])
          ], 42, _hoisted_2$b))), 128))
        ]))), 128))
      ], 512)
    ], 42, _hoisted_1$g));
  }
});
var MonthTable = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/date-picker/src/date-picker-com/basic-month-table.vue"]]);
const { date: date$1, disabledDate, parsedValue } = datePickerSharedProps, basicYearTableProps = buildProps({
  date: date$1,
  disabledDate,
  parsedValue
}), _hoisted_1$f = ["aria-label"], _hoisted_2$a = ["aria-selected", "tabindex", "onKeydown"], _hoisted_3$6 = { class: "cell" }, _hoisted_4$3 = { key: 1 }, _sfc_main$r = /* @__PURE__ */ defineComponent({
  __name: "basic-year-table",
  props: basicYearTableProps,
  emits: ["pick"],
  setup(e, { expose: k, emit: oe }) {
    const re = e, ae = (he, Oe) => {
      const Ie = dayjs(String(he)).locale(Oe).startOf("year"), xe = Ie.endOf("year").dayOfYear();
      return rangeArr(xe).map((ze) => Ie.add(ze, "day").toDate());
    }, le = useNamespace("year-table"), { t: ie, lang: ue } = useLocale(), de = ref(), pe = ref(), Ce = computed(() => Math.floor(re.date.year() / 10) * 10), _e = () => {
      var he;
      (he = pe.value) == null || he.focus();
    }, $e = (he) => {
      const Oe = {}, Ie = dayjs().locale(ue.value);
      return Oe.disabled = re.disabledDate ? ae(he, ue.value).every(re.disabledDate) : !1, Oe.current = castArray(re.parsedValue).findIndex((qe) => qe.year() === he) >= 0, Oe.today = Ie.year() === he, Oe;
    }, Ve = (he) => he === Ce.value && re.date.year() < Ce.value && re.date.year() > Ce.value + 9 || castArray(re.date).findIndex((Oe) => Oe.year() === he) >= 0, Ne = (he) => {
      const Ie = he.target.closest("td");
      if (Ie) {
        if (hasClass$1(Ie, "disabled"))
          return;
        const qe = Ie.textContent || Ie.innerText;
        oe("pick", Number(qe));
      }
    };
    return watch(() => re.date, async () => {
      var he, Oe;
      (he = de.value) != null && he.contains(document.activeElement) && (await nextTick(), (Oe = pe.value) == null || Oe.focus());
    }), k({
      focus: _e
    }), (he, Oe) => (openBlock(), createElementBlock("table", {
      role: "grid",
      "aria-label": unref(ie)("el.datepicker.yearTablePrompt"),
      class: normalizeClass(unref(le).b()),
      onClick: Ne
    }, [
      createElementVNode("tbody", {
        ref_key: "tbodyRef",
        ref: de
      }, [
        (openBlock(), createElementBlock(Fragment, null, renderList(3, (Ie, qe) => createElementVNode("tr", { key: qe }, [
          (openBlock(), createElementBlock(Fragment, null, renderList(4, (xe, ze) => (openBlock(), createElementBlock(Fragment, {
            key: qe + "_" + ze
          }, [
            qe * 4 + ze < 10 ? (openBlock(), createElementBlock("td", {
              key: 0,
              ref_for: !0,
              ref: (At) => Ve(unref(Ce) + qe * 4 + ze) && (pe.value = At),
              class: normalizeClass(["available", $e(unref(Ce) + qe * 4 + ze)]),
              "aria-selected": `${Ve(unref(Ce) + qe * 4 + ze)}`,
              tabindex: Ve(unref(Ce) + qe * 4 + ze) ? 0 : -1,
              onKeydown: [
                withKeys(withModifiers(Ne, ["prevent", "stop"]), ["space"]),
                withKeys(withModifiers(Ne, ["prevent", "stop"]), ["enter"])
              ]
            }, [
              createElementVNode("span", _hoisted_3$6, toDisplayString(unref(Ce) + qe * 4 + ze), 1)
            ], 42, _hoisted_2$a)) : (openBlock(), createElementBlock("td", _hoisted_4$3))
          ], 64))), 64))
        ])), 64))
      ], 512)
    ], 10, _hoisted_1$f));
  }
});
var YearTable = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/date-picker/src/date-picker-com/basic-year-table.vue"]]);
const _hoisted_1$e = ["onClick"], _hoisted_2$9 = ["aria-label"], _hoisted_3$5 = ["aria-label"], _hoisted_4$2 = ["aria-label"], _hoisted_5$2 = ["aria-label"], _sfc_main$q = /* @__PURE__ */ defineComponent({
  __name: "panel-date-pick",
  props: panelDatePickProps,
  emits: ["pick", "set-picker-option", "panel-change"],
  setup(e, { emit: k }) {
    const oe = e, re = ($n, Mn, Ue) => !0, ae = useNamespace("picker-panel"), le = useNamespace("date-picker"), ie = useAttrs$2(), ue = useSlots(), { t: de, lang: pe } = useLocale(), Ce = inject("EP_PICKER_BASE"), _e = inject(TOOLTIP_INJECTION_KEY), { shortcuts: $e, disabledDate: Ve, cellClassName: Ne, defaultTime: he, arrowControl: Oe } = Ce.props, Ie = toRef(Ce.props, "defaultValue"), qe = ref(), xe = ref(dayjs().locale(pe.value)), ze = computed(() => dayjs(he).locale(pe.value)), At = computed(() => xe.value.month()), Fe = computed(() => xe.value.year()), Pt = ref([]), vn = ref(null), En = ref(null), Nn = ($n) => Pt.value.length > 0 ? re($n, Pt.value, oe.format || "HH:mm:ss") : !0, Tn = ($n) => he && !Wn.value ? ze.value.year($n.year()).month($n.month()).date($n.date()) : Rn.value ? $n.millisecond(0) : $n.startOf("day"), wn = ($n, ...Mn) => {
      if (!$n)
        k("pick", $n, ...Mn);
      else if (isArray($n)) {
        const Ue = $n.map(Tn);
        k("pick", Ue, ...Mn);
      } else
        k("pick", Tn($n), ...Mn);
      vn.value = null, En.value = null;
    }, Lt = ($n, Mn) => {
      if (Et.value === "date") {
        $n = $n;
        let Ue = oe.parsedValue ? oe.parsedValue.year($n.year()).month($n.month()).date($n.date()) : $n;
        Nn(Ue) || (Ue = Pt.value[0][0].year($n.year()).month($n.month()).date($n.date())), xe.value = Ue, wn(Ue, Rn.value || Mn);
      } else
        Et.value === "week" ? wn($n.date) : Et.value === "dates" && wn($n, !0);
    }, Dt = ($n) => {
      const Mn = $n ? "add" : "subtract";
      xe.value = xe.value[Mn](1, "month"), ro("month");
    }, Cn = ($n) => {
      const Mn = xe.value, Ue = $n ? "add" : "subtract";
      xe.value = jt.value === "year" ? Mn[Ue](10, "year") : Mn[Ue](1, "year"), ro("year");
    }, jt = ref("date"), bn = computed(() => {
      const $n = de("el.datepicker.year");
      if (jt.value === "year") {
        const Mn = Math.floor(Fe.value / 10) * 10;
        return $n ? `${Mn} ${$n} - ${Mn + 9} ${$n}` : `${Mn} - ${Mn + 9}`;
      }
      return `${Fe.value} ${$n}`;
    }), kt = ($n) => {
      const Mn = isFunction($n.value) ? $n.value() : $n.value;
      if (Mn) {
        wn(dayjs(Mn).locale(pe.value));
        return;
      }
      $n.onClick && $n.onClick({
        attrs: ie,
        slots: ue,
        emit: k
      });
    }, Et = computed(() => {
      const { type: $n } = oe;
      return ["week", "month", "year", "dates"].includes($n) ? $n : "date";
    }), _n = computed(() => Et.value === "date" ? jt.value : Et.value), Pn = computed(() => !!$e.length), hn = async ($n) => {
      xe.value = xe.value.startOf("month").month($n), Et.value === "month" ? wn(xe.value, !1) : (jt.value = "date", ["month", "year", "date", "week"].includes(Et.value) && (wn(xe.value, !0), await nextTick(), In())), ro("month");
    }, On = async ($n) => {
      Et.value === "year" ? (xe.value = xe.value.startOf("year").year($n), wn(xe.value, !1)) : (xe.value = xe.value.year($n), jt.value = "month", ["month", "year", "date", "week"].includes(Et.value) && (wn(xe.value, !0), await nextTick(), In())), ro("year");
    }, Dn = async ($n) => {
      jt.value = $n, await nextTick(), In();
    }, Rn = computed(() => oe.type === "datetime" || oe.type === "datetimerange"), Fn = computed(() => Rn.value || Et.value === "dates"), kn = () => {
      if (Et.value === "dates")
        wn(oe.parsedValue);
      else {
        let $n = oe.parsedValue;
        if (!$n) {
          const Mn = dayjs(he).locale(pe.value), Ue = ao();
          $n = Mn.year(Ue.year()).month(Ue.month()).date(Ue.date());
        }
        xe.value = $n, wn($n);
      }
    }, An = () => {
      const Mn = dayjs().locale(pe.value).toDate();
      (!Ve || !Ve(Mn)) && Nn(Mn) && (xe.value = dayjs().locale(pe.value), wn(xe.value));
    }, Vn = computed(() => extractTimeFormat(oe.format)), Bn = computed(() => extractDateFormat(oe.format)), Wn = computed(() => {
      if (En.value)
        return En.value;
      if (!(!oe.parsedValue && !Ie.value))
        return (oe.parsedValue || xe.value).format(Vn.value);
    }), Yn = computed(() => {
      if (vn.value)
        return vn.value;
      if (!(!oe.parsedValue && !Ie.value))
        return (oe.parsedValue || xe.value).format(Bn.value);
    }), Xn = ref(!1), eo = () => {
      Xn.value = !0;
    }, Gn = () => {
      Xn.value = !1;
    }, no = ($n) => ({
      hour: $n.hour(),
      minute: $n.minute(),
      second: $n.second(),
      year: $n.year(),
      month: $n.month(),
      date: $n.date()
    }), oo = ($n, Mn, Ue) => {
      const { hour: Sn, minute: xn, second: jn } = no($n), Ln = oe.parsedValue ? oe.parsedValue.hour(Sn).minute(xn).second(jn) : $n;
      xe.value = Ln, wn(xe.value, !0), Ue || (Xn.value = Mn);
    }, zn = ($n) => {
      const Mn = dayjs($n, Vn.value).locale(pe.value);
      if (Mn.isValid() && Nn(Mn)) {
        const { year: Ue, month: Sn, date: xn } = no(xe.value);
        xe.value = Mn.year(Ue).month(Sn).date(xn), En.value = null, Xn.value = !1, wn(xe.value, !0);
      }
    }, Hn = ($n) => {
      const Mn = dayjs($n, Bn.value).locale(pe.value);
      if (Mn.isValid()) {
        if (Ve && Ve(Mn.toDate()))
          return;
        const { hour: Ue, minute: Sn, second: xn } = no(xe.value);
        xe.value = Mn.hour(Ue).minute(Sn).second(xn), vn.value = null, wn(xe.value, !0);
      }
    }, qn = ($n) => dayjs.isDayjs($n) && $n.isValid() && (Ve ? !Ve($n.toDate()) : !0), Zn = ($n) => Et.value === "dates" ? $n.map((Mn) => Mn.format(oe.format)) : $n.format(oe.format), lo = ($n) => dayjs($n, oe.format).locale(pe.value), ao = () => {
      const $n = dayjs(Ie.value).locale(pe.value);
      if (!Ie.value) {
        const Mn = ze.value;
        return dayjs().hour(Mn.hour()).minute(Mn.minute()).second(Mn.second()).locale(pe.value);
      }
      return $n;
    }, In = async () => {
      var $n;
      ["week", "month", "year", "date"].includes(Et.value) && (($n = qe.value) == null || $n.focus(), Et.value === "week" && Qn(EVENT_CODE.down));
    }, Jn = ($n) => {
      const { code: Mn } = $n;
      [
        EVENT_CODE.up,
        EVENT_CODE.down,
        EVENT_CODE.left,
        EVENT_CODE.right,
        EVENT_CODE.home,
        EVENT_CODE.end,
        EVENT_CODE.pageUp,
        EVENT_CODE.pageDown
      ].includes(Mn) && (Qn(Mn), $n.stopPropagation(), $n.preventDefault()), [EVENT_CODE.enter, EVENT_CODE.space].includes(Mn) && vn.value === null && En.value === null && ($n.preventDefault(), wn(xe.value, !1));
    }, Qn = ($n) => {
      var Mn;
      const { up: Ue, down: Sn, left: xn, right: jn, home: Ln, end: Kn, pageUp: Un, pageDown: uo } = EVENT_CODE, io = {
        year: {
          [Ue]: -4,
          [Sn]: 4,
          [xn]: -1,
          [jn]: 1,
          offset: (to, co) => to.setFullYear(to.getFullYear() + co)
        },
        month: {
          [Ue]: -4,
          [Sn]: 4,
          [xn]: -1,
          [jn]: 1,
          offset: (to, co) => to.setMonth(to.getMonth() + co)
        },
        week: {
          [Ue]: -1,
          [Sn]: 1,
          [xn]: -1,
          [jn]: 1,
          offset: (to, co) => to.setDate(to.getDate() + co * 7)
        },
        date: {
          [Ue]: -7,
          [Sn]: 7,
          [xn]: -1,
          [jn]: 1,
          [Ln]: (to) => -to.getDay(),
          [Kn]: (to) => -to.getDay() + 6,
          [Un]: (to) => -new Date(to.getFullYear(), to.getMonth(), 0).getDate(),
          [uo]: (to) => new Date(to.getFullYear(), to.getMonth() + 1, 0).getDate(),
          offset: (to, co) => to.setDate(to.getDate() + co)
        }
      }, so = xe.value.toDate();
      for (; Math.abs(xe.value.diff(so, "year", !0)) < 1; ) {
        const to = io[_n.value];
        if (!to)
          return;
        if (to.offset(so, isFunction(to[$n]) ? to[$n](so) : (Mn = to[$n]) != null ? Mn : 0), Ve && Ve(so))
          break;
        const co = dayjs(so).locale(pe.value);
        xe.value = co, k("pick", co, !0);
        break;
      }
    }, ro = ($n) => {
      k("panel-change", xe.value.toDate(), $n, jt.value);
    };
    return watch(() => Et.value, ($n) => {
      if (["month", "year"].includes($n)) {
        jt.value = $n;
        return;
      }
      jt.value = "date";
    }, { immediate: !0 }), watch(() => jt.value, () => {
      _e == null || _e.updatePopper();
    }), watch(() => Ie.value, ($n) => {
      $n && (xe.value = ao());
    }, { immediate: !0 }), watch(() => oe.parsedValue, ($n) => {
      if ($n) {
        if (Et.value === "dates" || Array.isArray($n))
          return;
        xe.value = $n;
      } else
        xe.value = ao();
    }, { immediate: !0 }), k("set-picker-option", ["isValidValue", qn]), k("set-picker-option", ["formatToString", Zn]), k("set-picker-option", ["parseUserInput", lo]), k("set-picker-option", ["handleFocusPicker", In]), ($n, Mn) => (openBlock(), createElementBlock("div", {
      class: normalizeClass([
        unref(ae).b(),
        unref(le).b(),
        {
          "has-sidebar": $n.$slots.sidebar || unref(Pn),
          "has-time": unref(Rn)
        }
      ])
    }, [
      createElementVNode("div", {
        class: normalizeClass(unref(ae).e("body-wrapper"))
      }, [
        renderSlot($n.$slots, "sidebar", {
          class: normalizeClass(unref(ae).e("sidebar"))
        }),
        unref(Pn) ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(ae).e("sidebar"))
        }, [
          (openBlock(!0), createElementBlock(Fragment, null, renderList(unref($e), (Ue, Sn) => (openBlock(), createElementBlock("button", {
            key: Sn,
            type: "button",
            class: normalizeClass(unref(ae).e("shortcut")),
            onClick: (xn) => kt(Ue)
          }, toDisplayString(Ue.text), 11, _hoisted_1$e))), 128))
        ], 2)) : createCommentVNode("v-if", !0),
        createElementVNode("div", {
          class: normalizeClass(unref(ae).e("body"))
        }, [
          unref(Rn) ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(unref(le).e("time-header"))
          }, [
            createElementVNode("span", {
              class: normalizeClass(unref(le).e("editor-wrap"))
            }, [
              createVNode(unref(ElInput), {
                placeholder: unref(de)("el.datepicker.selectDate"),
                "model-value": unref(Yn),
                size: "small",
                onInput: Mn[0] || (Mn[0] = (Ue) => vn.value = Ue),
                onChange: Hn
              }, null, 8, ["placeholder", "model-value"])
            ], 2),
            withDirectives((openBlock(), createElementBlock("span", {
              class: normalizeClass(unref(le).e("editor-wrap"))
            }, [
              createVNode(unref(ElInput), {
                placeholder: unref(de)("el.datepicker.selectTime"),
                "model-value": unref(Wn),
                size: "small",
                onFocus: eo,
                onInput: Mn[1] || (Mn[1] = (Ue) => En.value = Ue),
                onChange: zn
              }, null, 8, ["placeholder", "model-value"]),
              createVNode(unref(TimePickPanel), {
                visible: Xn.value,
                format: unref(Vn),
                "time-arrow-control": unref(Oe),
                "parsed-value": xe.value,
                onPick: oo
              }, null, 8, ["visible", "format", "time-arrow-control", "parsed-value"])
            ], 2)), [
              [unref(ClickOutside), Gn]
            ])
          ], 2)) : createCommentVNode("v-if", !0),
          withDirectives(createElementVNode("div", {
            class: normalizeClass([
              unref(le).e("header"),
              (jt.value === "year" || jt.value === "month") && unref(le).e("header--bordered")
            ])
          }, [
            createElementVNode("span", {
              class: normalizeClass(unref(le).e("prev-btn"))
            }, [
              createElementVNode("button", {
                type: "button",
                "aria-label": unref(de)("el.datepicker.prevYear"),
                class: normalizeClass(["d-arrow-left", unref(ae).e("icon-btn")]),
                onClick: Mn[2] || (Mn[2] = (Ue) => Cn(!1))
              }, [
                createVNode(unref(ElIcon), null, {
                  default: withCtx(() => [
                    createVNode(unref(d_arrow_left_default))
                  ]),
                  _: 1
                })
              ], 10, _hoisted_2$9),
              withDirectives(createElementVNode("button", {
                type: "button",
                "aria-label": unref(de)("el.datepicker.prevMonth"),
                class: normalizeClass([unref(ae).e("icon-btn"), "arrow-left"]),
                onClick: Mn[3] || (Mn[3] = (Ue) => Dt(!1))
              }, [
                createVNode(unref(ElIcon), null, {
                  default: withCtx(() => [
                    createVNode(unref(arrow_left_default))
                  ]),
                  _: 1
                })
              ], 10, _hoisted_3$5), [
                [vShow, jt.value === "date"]
              ])
            ], 2),
            createElementVNode("span", {
              role: "button",
              class: normalizeClass(unref(le).e("header-label")),
              "aria-live": "polite",
              tabindex: "0",
              onKeydown: Mn[4] || (Mn[4] = withKeys((Ue) => Dn("year"), ["enter"])),
              onClick: Mn[5] || (Mn[5] = (Ue) => Dn("year"))
            }, toDisplayString(unref(bn)), 35),
            withDirectives(createElementVNode("span", {
              role: "button",
              "aria-live": "polite",
              tabindex: "0",
              class: normalizeClass([
                unref(le).e("header-label"),
                { active: jt.value === "month" }
              ]),
              onKeydown: Mn[6] || (Mn[6] = withKeys((Ue) => Dn("month"), ["enter"])),
              onClick: Mn[7] || (Mn[7] = (Ue) => Dn("month"))
            }, toDisplayString(unref(de)(`el.datepicker.month${unref(At) + 1}`)), 35), [
              [vShow, jt.value === "date"]
            ]),
            createElementVNode("span", {
              class: normalizeClass(unref(le).e("next-btn"))
            }, [
              withDirectives(createElementVNode("button", {
                type: "button",
                "aria-label": unref(de)("el.datepicker.nextMonth"),
                class: normalizeClass([unref(ae).e("icon-btn"), "arrow-right"]),
                onClick: Mn[8] || (Mn[8] = (Ue) => Dt(!0))
              }, [
                createVNode(unref(ElIcon), null, {
                  default: withCtx(() => [
                    createVNode(unref(arrow_right_default))
                  ]),
                  _: 1
                })
              ], 10, _hoisted_4$2), [
                [vShow, jt.value === "date"]
              ]),
              createElementVNode("button", {
                type: "button",
                "aria-label": unref(de)("el.datepicker.nextYear"),
                class: normalizeClass([unref(ae).e("icon-btn"), "d-arrow-right"]),
                onClick: Mn[9] || (Mn[9] = (Ue) => Cn(!0))
              }, [
                createVNode(unref(ElIcon), null, {
                  default: withCtx(() => [
                    createVNode(unref(d_arrow_right_default))
                  ]),
                  _: 1
                })
              ], 10, _hoisted_5$2)
            ], 2)
          ], 2), [
            [vShow, jt.value !== "time"]
          ]),
          createElementVNode("div", {
            class: normalizeClass(unref(ae).e("content")),
            onKeydown: Jn
          }, [
            jt.value === "date" ? (openBlock(), createBlock(DateTable, {
              key: 0,
              ref_key: "currentViewRef",
              ref: qe,
              "selection-mode": unref(Et),
              date: xe.value,
              "parsed-value": $n.parsedValue,
              "disabled-date": unref(Ve),
              "cell-class-name": unref(Ne),
              onPick: Lt
            }, null, 8, ["selection-mode", "date", "parsed-value", "disabled-date", "cell-class-name"])) : createCommentVNode("v-if", !0),
            jt.value === "year" ? (openBlock(), createBlock(YearTable, {
              key: 1,
              ref_key: "currentViewRef",
              ref: qe,
              date: xe.value,
              "disabled-date": unref(Ve),
              "parsed-value": $n.parsedValue,
              onPick: On
            }, null, 8, ["date", "disabled-date", "parsed-value"])) : createCommentVNode("v-if", !0),
            jt.value === "month" ? (openBlock(), createBlock(MonthTable, {
              key: 2,
              ref_key: "currentViewRef",
              ref: qe,
              date: xe.value,
              "parsed-value": $n.parsedValue,
              "disabled-date": unref(Ve),
              onPick: hn
            }, null, 8, ["date", "parsed-value", "disabled-date"])) : createCommentVNode("v-if", !0)
          ], 34)
        ], 2)
      ], 2),
      withDirectives(createElementVNode("div", {
        class: normalizeClass(unref(ae).e("footer"))
      }, [
        withDirectives(createVNode(unref(ElButton), {
          text: "",
          size: "small",
          class: normalizeClass(unref(ae).e("link-btn")),
          onClick: An
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(unref(de)("el.datepicker.now")), 1)
          ]),
          _: 1
        }, 8, ["class"]), [
          [vShow, unref(Et) !== "dates"]
        ]),
        createVNode(unref(ElButton), {
          plain: "",
          size: "small",
          class: normalizeClass(unref(ae).e("link-btn")),
          onClick: kn
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(unref(de)("el.datepicker.confirm")), 1)
          ]),
          _: 1
        }, 8, ["class"])
      ], 2), [
        [vShow, unref(Fn) && jt.value === "date"]
      ])
    ], 2));
  }
});
var DatePickPanel = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/date-picker/src/date-picker-com/panel-date-pick.vue"]]);
const panelDateRangeProps = buildProps({
  ...panelSharedProps,
  ...panelRangeSharedProps
}), useShortcut = (e) => {
  const { emit: k } = getCurrentInstance(), oe = useAttrs$2(), re = useSlots();
  return (le) => {
    const ie = isFunction(le.value) ? le.value() : le.value;
    if (ie) {
      k("pick", [
        dayjs(ie[0]).locale(e.value),
        dayjs(ie[1]).locale(e.value)
      ]);
      return;
    }
    le.onClick && le.onClick({
      attrs: oe,
      slots: re,
      emit: k
    });
  };
}, useRangePicker = (e, {
  defaultValue: k,
  leftDate: oe,
  rightDate: re,
  unit: ae,
  onParsedValueChanged: le
}) => {
  const { emit: ie } = getCurrentInstance(), { pickerNs: ue } = inject(ROOT_PICKER_INJECTION_KEY), de = useNamespace("date-range-picker"), { t: pe, lang: Ce } = useLocale(), _e = useShortcut(Ce), $e = ref(), Ve = ref(), Ne = ref({
    endDate: null,
    selecting: !1
  }), he = (xe) => {
    Ne.value = xe;
  }, Oe = (xe = !1) => {
    const ze = unref($e), At = unref(Ve);
    isValidRange([ze, At]) && ie("pick", [ze, At], xe);
  }, Ie = (xe) => {
    Ne.value.selecting = xe, xe || (Ne.value.endDate = null);
  }, qe = () => {
    const [xe, ze] = getDefaultValue(unref(k), {
      lang: unref(Ce),
      unit: ae,
      unlinkPanels: e.unlinkPanels
    });
    $e.value = void 0, Ve.value = void 0, oe.value = xe, re.value = ze;
  };
  return watch(k, (xe) => {
    xe && qe();
  }, { immediate: !0 }), watch(() => e.parsedValue, (xe) => {
    if (isArray(xe) && xe.length === 2) {
      const [ze, At] = xe;
      $e.value = ze, oe.value = ze, Ve.value = At, le(unref($e), unref(Ve));
    } else
      qe();
  }, { immediate: !0 }), {
    minDate: $e,
    maxDate: Ve,
    rangeState: Ne,
    lang: Ce,
    ppNs: ue,
    drpNs: de,
    handleChangeRange: he,
    handleRangeConfirm: Oe,
    handleShortcutClick: _e,
    onSelect: Ie,
    t: pe
  };
}, _hoisted_1$d = ["onClick"], _hoisted_2$8 = ["disabled"], _hoisted_3$4 = ["disabled"], _hoisted_4$1 = ["disabled"], _hoisted_5$1 = ["disabled"], _sfc_main$p = /* @__PURE__ */ defineComponent({
  __name: "panel-date-range",
  props: panelDateRangeProps,
  emits: [
    "pick",
    "set-picker-option",
    "calendar-change",
    "panel-change"
  ],
  setup(e, { emit: k }) {
    const oe = e, re = "month", ae = inject("EP_PICKER_BASE"), {
      disabledDate: le,
      cellClassName: ie,
      format: ue,
      defaultTime: de,
      arrowControl: pe,
      clearable: Ce
    } = ae.props, _e = toRef(ae.props, "shortcuts"), $e = toRef(ae.props, "defaultValue"), { lang: Ve } = useLocale(), Ne = ref(dayjs().locale(Ve.value)), he = ref(dayjs().locale(Ve.value).add(1, re)), {
      minDate: Oe,
      maxDate: Ie,
      rangeState: qe,
      ppNs: xe,
      drpNs: ze,
      handleChangeRange: At,
      handleRangeConfirm: Fe,
      handleShortcutClick: Pt,
      onSelect: vn,
      t: En
    } = useRangePicker(oe, {
      defaultValue: $e,
      leftDate: Ne,
      rightDate: he,
      unit: re,
      onParsedValueChanged: jn
    }), Nn = ref({
      min: null,
      max: null
    }), Tn = ref({
      min: null,
      max: null
    }), wn = computed(() => `${Ne.value.year()} ${En("el.datepicker.year")} ${En(`el.datepicker.month${Ne.value.month() + 1}`)}`), Lt = computed(() => `${he.value.year()} ${En("el.datepicker.year")} ${En(`el.datepicker.month${he.value.month() + 1}`)}`), Dt = computed(() => Ne.value.year()), Cn = computed(() => Ne.value.month()), jt = computed(() => he.value.year()), bn = computed(() => he.value.month()), kt = computed(() => !!_e.value.length), Et = computed(() => Nn.value.min !== null ? Nn.value.min : Oe.value ? Oe.value.format(Dn.value) : ""), _n = computed(() => Nn.value.max !== null ? Nn.value.max : Ie.value || Oe.value ? (Ie.value || Oe.value).format(Dn.value) : ""), Pn = computed(() => Tn.value.min !== null ? Tn.value.min : Oe.value ? Oe.value.format(On.value) : ""), hn = computed(() => Tn.value.max !== null ? Tn.value.max : Ie.value || Oe.value ? (Ie.value || Oe.value).format(On.value) : ""), On = computed(() => extractTimeFormat(ue)), Dn = computed(() => extractDateFormat(ue)), Rn = () => {
      Ne.value = Ne.value.subtract(1, "year"), oe.unlinkPanels || (he.value = Ne.value.add(1, "month")), Xn("year");
    }, Fn = () => {
      Ne.value = Ne.value.subtract(1, "month"), oe.unlinkPanels || (he.value = Ne.value.add(1, "month")), Xn("month");
    }, kn = () => {
      oe.unlinkPanels ? he.value = he.value.add(1, "year") : (Ne.value = Ne.value.add(1, "year"), he.value = Ne.value.add(1, "month")), Xn("year");
    }, An = () => {
      oe.unlinkPanels ? he.value = he.value.add(1, "month") : (Ne.value = Ne.value.add(1, "month"), he.value = Ne.value.add(1, "month")), Xn("month");
    }, Vn = () => {
      Ne.value = Ne.value.add(1, "year"), Xn("year");
    }, Bn = () => {
      Ne.value = Ne.value.add(1, "month"), Xn("month");
    }, Wn = () => {
      he.value = he.value.subtract(1, "year"), Xn("year");
    }, Yn = () => {
      he.value = he.value.subtract(1, "month"), Xn("month");
    }, Xn = (Ln) => {
      k("panel-change", [Ne.value.toDate(), he.value.toDate()], Ln);
    }, eo = computed(() => {
      const Ln = (Cn.value + 1) % 12, Kn = Cn.value + 1 >= 12 ? 1 : 0;
      return oe.unlinkPanels && new Date(Dt.value + Kn, Ln) < new Date(jt.value, bn.value);
    }), Gn = computed(() => oe.unlinkPanels && jt.value * 12 + bn.value - (Dt.value * 12 + Cn.value + 1) >= 12), no = computed(() => !(Oe.value && Ie.value && !qe.value.selecting && isValidRange([Oe.value, Ie.value]))), oo = computed(() => oe.type === "datetime" || oe.type === "datetimerange"), zn = (Ln, Kn) => {
      if (!!Ln)
        return de ? dayjs(de[Kn] || de).locale(Ve.value).year(Ln.year()).month(Ln.month()).date(Ln.date()) : Ln;
    }, Hn = (Ln, Kn = !0) => {
      const Un = Ln.minDate, uo = Ln.maxDate, io = zn(Un, 0), so = zn(uo, 1);
      Ie.value === so && Oe.value === io || (k("calendar-change", [Un.toDate(), uo && uo.toDate()]), Ie.value = so, Oe.value = io, !(!Kn || oo.value) && Fe());
    }, qn = ref(!1), Zn = ref(!1), lo = () => {
      qn.value = !1;
    }, ao = () => {
      Zn.value = !1;
    }, In = (Ln, Kn) => {
      Nn.value[Kn] = Ln;
      const Un = dayjs(Ln, Dn.value).locale(Ve.value);
      if (Un.isValid()) {
        if (le && le(Un.toDate()))
          return;
        Kn === "min" ? (Ne.value = Un, Oe.value = (Oe.value || Ne.value).year(Un.year()).month(Un.month()).date(Un.date()), oe.unlinkPanels || (he.value = Un.add(1, "month"), Ie.value = Oe.value.add(1, "month"))) : (he.value = Un, Ie.value = (Ie.value || he.value).year(Un.year()).month(Un.month()).date(Un.date()), oe.unlinkPanels || (Ne.value = Un.subtract(1, "month"), Oe.value = Ie.value.subtract(1, "month")));
      }
    }, Jn = (Ln, Kn) => {
      Nn.value[Kn] = null;
    }, Qn = (Ln, Kn) => {
      Tn.value[Kn] = Ln;
      const Un = dayjs(Ln, On.value).locale(Ve.value);
      Un.isValid() && (Kn === "min" ? (qn.value = !0, Oe.value = (Oe.value || Ne.value).hour(Un.hour()).minute(Un.minute()).second(Un.second()), (!Ie.value || Ie.value.isBefore(Oe.value)) && (Ie.value = Oe.value)) : (Zn.value = !0, Ie.value = (Ie.value || he.value).hour(Un.hour()).minute(Un.minute()).second(Un.second()), he.value = Ie.value, Ie.value && Ie.value.isBefore(Oe.value) && (Oe.value = Ie.value)));
    }, ro = (Ln, Kn) => {
      Tn.value[Kn] = null, Kn === "min" ? (Ne.value = Oe.value, qn.value = !1) : (he.value = Ie.value, Zn.value = !1);
    }, $n = (Ln, Kn, Un) => {
      Tn.value.min || (Ln && (Ne.value = Ln, Oe.value = (Oe.value || Ne.value).hour(Ln.hour()).minute(Ln.minute()).second(Ln.second())), Un || (qn.value = Kn), (!Ie.value || Ie.value.isBefore(Oe.value)) && (Ie.value = Oe.value, he.value = Ln));
    }, Mn = (Ln, Kn, Un) => {
      Tn.value.max || (Ln && (he.value = Ln, Ie.value = (Ie.value || he.value).hour(Ln.hour()).minute(Ln.minute()).second(Ln.second())), Un || (Zn.value = Kn), Ie.value && Ie.value.isBefore(Oe.value) && (Oe.value = Ie.value));
    }, Ue = () => {
      Ne.value = getDefaultValue(unref($e), {
        lang: unref(Ve),
        unit: "month",
        unlinkPanels: oe.unlinkPanels
      })[0], he.value = Ne.value.add(1, "month"), k("pick", null);
    }, Sn = (Ln) => isArray(Ln) ? Ln.map((Kn) => Kn.format(ue)) : Ln.format(ue), xn = (Ln) => isArray(Ln) ? Ln.map((Kn) => dayjs(Kn, ue).locale(Ve.value)) : dayjs(Ln, ue).locale(Ve.value);
    function jn(Ln, Kn) {
      if (oe.unlinkPanels && Kn) {
        const Un = (Ln == null ? void 0 : Ln.year()) || 0, uo = (Ln == null ? void 0 : Ln.month()) || 0, io = Kn.year(), so = Kn.month();
        he.value = Un === io && uo === so ? Kn.add(1, re) : Kn;
      } else
        he.value = Ne.value.add(1, re), Kn && (he.value = he.value.hour(Kn.hour()).minute(Kn.minute()).second(Kn.second()));
    }
    return k("set-picker-option", ["isValidValue", isValidRange]), k("set-picker-option", ["parseUserInput", xn]), k("set-picker-option", ["formatToString", Sn]), k("set-picker-option", ["handleClear", Ue]), (Ln, Kn) => (openBlock(), createElementBlock("div", {
      class: normalizeClass([
        unref(xe).b(),
        unref(ze).b(),
        {
          "has-sidebar": Ln.$slots.sidebar || unref(kt),
          "has-time": unref(oo)
        }
      ])
    }, [
      createElementVNode("div", {
        class: normalizeClass(unref(xe).e("body-wrapper"))
      }, [
        renderSlot(Ln.$slots, "sidebar", {
          class: normalizeClass(unref(xe).e("sidebar"))
        }),
        unref(kt) ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(xe).e("sidebar"))
        }, [
          (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(_e), (Un, uo) => (openBlock(), createElementBlock("button", {
            key: uo,
            type: "button",
            class: normalizeClass(unref(xe).e("shortcut")),
            onClick: (io) => unref(Pt)(Un)
          }, toDisplayString(Un.text), 11, _hoisted_1$d))), 128))
        ], 2)) : createCommentVNode("v-if", !0),
        createElementVNode("div", {
          class: normalizeClass(unref(xe).e("body"))
        }, [
          unref(oo) ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(unref(ze).e("time-header"))
          }, [
            createElementVNode("span", {
              class: normalizeClass(unref(ze).e("editors-wrap"))
            }, [
              createElementVNode("span", {
                class: normalizeClass(unref(ze).e("time-picker-wrap"))
              }, [
                createVNode(unref(ElInput), {
                  size: "small",
                  disabled: unref(qe).selecting,
                  placeholder: unref(En)("el.datepicker.startDate"),
                  class: normalizeClass(unref(ze).e("editor")),
                  "model-value": unref(Et),
                  onInput: Kn[0] || (Kn[0] = (Un) => In(Un, "min")),
                  onChange: Kn[1] || (Kn[1] = (Un) => Jn(Un, "min"))
                }, null, 8, ["disabled", "placeholder", "class", "model-value"])
              ], 2),
              withDirectives((openBlock(), createElementBlock("span", {
                class: normalizeClass(unref(ze).e("time-picker-wrap"))
              }, [
                createVNode(unref(ElInput), {
                  size: "small",
                  class: normalizeClass(unref(ze).e("editor")),
                  disabled: unref(qe).selecting,
                  placeholder: unref(En)("el.datepicker.startTime"),
                  "model-value": unref(Pn),
                  onFocus: Kn[2] || (Kn[2] = (Un) => qn.value = !0),
                  onInput: Kn[3] || (Kn[3] = (Un) => Qn(Un, "min")),
                  onChange: Kn[4] || (Kn[4] = (Un) => ro(Un, "min"))
                }, null, 8, ["class", "disabled", "placeholder", "model-value"]),
                createVNode(unref(TimePickPanel), {
                  visible: qn.value,
                  format: unref(On),
                  "datetime-role": "start",
                  "time-arrow-control": unref(pe),
                  "parsed-value": Ne.value,
                  onPick: $n
                }, null, 8, ["visible", "format", "time-arrow-control", "parsed-value"])
              ], 2)), [
                [unref(ClickOutside), lo]
              ])
            ], 2),
            createElementVNode("span", null, [
              createVNode(unref(ElIcon), null, {
                default: withCtx(() => [
                  createVNode(unref(arrow_right_default))
                ]),
                _: 1
              })
            ]),
            createElementVNode("span", {
              class: normalizeClass([unref(ze).e("editors-wrap"), "is-right"])
            }, [
              createElementVNode("span", {
                class: normalizeClass(unref(ze).e("time-picker-wrap"))
              }, [
                createVNode(unref(ElInput), {
                  size: "small",
                  class: normalizeClass(unref(ze).e("editor")),
                  disabled: unref(qe).selecting,
                  placeholder: unref(En)("el.datepicker.endDate"),
                  "model-value": unref(_n),
                  readonly: !unref(Oe),
                  onInput: Kn[5] || (Kn[5] = (Un) => In(Un, "max")),
                  onChange: Kn[6] || (Kn[6] = (Un) => Jn(Un, "max"))
                }, null, 8, ["class", "disabled", "placeholder", "model-value", "readonly"])
              ], 2),
              withDirectives((openBlock(), createElementBlock("span", {
                class: normalizeClass(unref(ze).e("time-picker-wrap"))
              }, [
                createVNode(unref(ElInput), {
                  size: "small",
                  class: normalizeClass(unref(ze).e("editor")),
                  disabled: unref(qe).selecting,
                  placeholder: unref(En)("el.datepicker.endTime"),
                  "model-value": unref(hn),
                  readonly: !unref(Oe),
                  onFocus: Kn[7] || (Kn[7] = (Un) => unref(Oe) && (Zn.value = !0)),
                  onInput: Kn[8] || (Kn[8] = (Un) => Qn(Un, "max")),
                  onChange: Kn[9] || (Kn[9] = (Un) => ro(Un, "max"))
                }, null, 8, ["class", "disabled", "placeholder", "model-value", "readonly"]),
                createVNode(unref(TimePickPanel), {
                  "datetime-role": "end",
                  visible: Zn.value,
                  format: unref(On),
                  "time-arrow-control": unref(pe),
                  "parsed-value": he.value,
                  onPick: Mn
                }, null, 8, ["visible", "format", "time-arrow-control", "parsed-value"])
              ], 2)), [
                [unref(ClickOutside), ao]
              ])
            ], 2)
          ], 2)) : createCommentVNode("v-if", !0),
          createElementVNode("div", {
            class: normalizeClass([[unref(xe).e("content"), unref(ze).e("content")], "is-left"])
          }, [
            createElementVNode("div", {
              class: normalizeClass(unref(ze).e("header"))
            }, [
              createElementVNode("button", {
                type: "button",
                class: normalizeClass([unref(xe).e("icon-btn"), "d-arrow-left"]),
                onClick: Rn
              }, [
                createVNode(unref(ElIcon), null, {
                  default: withCtx(() => [
                    createVNode(unref(d_arrow_left_default))
                  ]),
                  _: 1
                })
              ], 2),
              createElementVNode("button", {
                type: "button",
                class: normalizeClass([unref(xe).e("icon-btn"), "arrow-left"]),
                onClick: Fn
              }, [
                createVNode(unref(ElIcon), null, {
                  default: withCtx(() => [
                    createVNode(unref(arrow_left_default))
                  ]),
                  _: 1
                })
              ], 2),
              Ln.unlinkPanels ? (openBlock(), createElementBlock("button", {
                key: 0,
                type: "button",
                disabled: !unref(Gn),
                class: normalizeClass([[unref(xe).e("icon-btn"), { "is-disabled": !unref(Gn) }], "d-arrow-right"]),
                onClick: Vn
              }, [
                createVNode(unref(ElIcon), null, {
                  default: withCtx(() => [
                    createVNode(unref(d_arrow_right_default))
                  ]),
                  _: 1
                })
              ], 10, _hoisted_2$8)) : createCommentVNode("v-if", !0),
              Ln.unlinkPanels ? (openBlock(), createElementBlock("button", {
                key: 1,
                type: "button",
                disabled: !unref(eo),
                class: normalizeClass([[
                  unref(xe).e("icon-btn"),
                  { "is-disabled": !unref(eo) }
                ], "arrow-right"]),
                onClick: Bn
              }, [
                createVNode(unref(ElIcon), null, {
                  default: withCtx(() => [
                    createVNode(unref(arrow_right_default))
                  ]),
                  _: 1
                })
              ], 10, _hoisted_3$4)) : createCommentVNode("v-if", !0),
              createElementVNode("div", null, toDisplayString(unref(wn)), 1)
            ], 2),
            createVNode(DateTable, {
              "selection-mode": "range",
              date: Ne.value,
              "min-date": unref(Oe),
              "max-date": unref(Ie),
              "range-state": unref(qe),
              "disabled-date": unref(le),
              "cell-class-name": unref(ie),
              onChangerange: unref(At),
              onPick: Hn,
              onSelect: unref(vn)
            }, null, 8, ["date", "min-date", "max-date", "range-state", "disabled-date", "cell-class-name", "onChangerange", "onSelect"])
          ], 2),
          createElementVNode("div", {
            class: normalizeClass([[unref(xe).e("content"), unref(ze).e("content")], "is-right"])
          }, [
            createElementVNode("div", {
              class: normalizeClass(unref(ze).e("header"))
            }, [
              Ln.unlinkPanels ? (openBlock(), createElementBlock("button", {
                key: 0,
                type: "button",
                disabled: !unref(Gn),
                class: normalizeClass([[unref(xe).e("icon-btn"), { "is-disabled": !unref(Gn) }], "d-arrow-left"]),
                onClick: Wn
              }, [
                createVNode(unref(ElIcon), null, {
                  default: withCtx(() => [
                    createVNode(unref(d_arrow_left_default))
                  ]),
                  _: 1
                })
              ], 10, _hoisted_4$1)) : createCommentVNode("v-if", !0),
              Ln.unlinkPanels ? (openBlock(), createElementBlock("button", {
                key: 1,
                type: "button",
                disabled: !unref(eo),
                class: normalizeClass([[
                  unref(xe).e("icon-btn"),
                  { "is-disabled": !unref(eo) }
                ], "arrow-left"]),
                onClick: Yn
              }, [
                createVNode(unref(ElIcon), null, {
                  default: withCtx(() => [
                    createVNode(unref(arrow_left_default))
                  ]),
                  _: 1
                })
              ], 10, _hoisted_5$1)) : createCommentVNode("v-if", !0),
              createElementVNode("button", {
                type: "button",
                class: normalizeClass([unref(xe).e("icon-btn"), "d-arrow-right"]),
                onClick: kn
              }, [
                createVNode(unref(ElIcon), null, {
                  default: withCtx(() => [
                    createVNode(unref(d_arrow_right_default))
                  ]),
                  _: 1
                })
              ], 2),
              createElementVNode("button", {
                type: "button",
                class: normalizeClass([unref(xe).e("icon-btn"), "arrow-right"]),
                onClick: An
              }, [
                createVNode(unref(ElIcon), null, {
                  default: withCtx(() => [
                    createVNode(unref(arrow_right_default))
                  ]),
                  _: 1
                })
              ], 2),
              createElementVNode("div", null, toDisplayString(unref(Lt)), 1)
            ], 2),
            createVNode(DateTable, {
              "selection-mode": "range",
              date: he.value,
              "min-date": unref(Oe),
              "max-date": unref(Ie),
              "range-state": unref(qe),
              "disabled-date": unref(le),
              "cell-class-name": unref(ie),
              onChangerange: unref(At),
              onPick: Hn,
              onSelect: unref(vn)
            }, null, 8, ["date", "min-date", "max-date", "range-state", "disabled-date", "cell-class-name", "onChangerange", "onSelect"])
          ], 2)
        ], 2)
      ], 2),
      unref(oo) ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(unref(xe).e("footer"))
      }, [
        unref(Ce) ? (openBlock(), createBlock(unref(ElButton), {
          key: 0,
          text: "",
          size: "small",
          class: normalizeClass(unref(xe).e("link-btn")),
          onClick: Ue
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(unref(En)("el.datepicker.clear")), 1)
          ]),
          _: 1
        }, 8, ["class"])) : createCommentVNode("v-if", !0),
        createVNode(unref(ElButton), {
          plain: "",
          size: "small",
          class: normalizeClass(unref(xe).e("link-btn")),
          disabled: unref(no),
          onClick: Kn[10] || (Kn[10] = (Un) => unref(Fe)(!1))
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(unref(En)("el.datepicker.confirm")), 1)
          ]),
          _: 1
        }, 8, ["class", "disabled"])
      ], 2)) : createCommentVNode("v-if", !0)
    ], 2));
  }
});
var DateRangePickPanel = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/date-picker/src/date-picker-com/panel-date-range.vue"]]);
const panelMonthRangeProps = buildProps({
  ...panelRangeSharedProps
}), panelMonthRangeEmits = ["pick", "set-picker-option"], useMonthRangeHeader = ({
  unlinkPanels: e,
  leftDate: k,
  rightDate: oe
}) => {
  const { t: re } = useLocale(), ae = () => {
    k.value = k.value.subtract(1, "year"), e || (oe.value = oe.value.subtract(1, "year"));
  }, le = () => {
    e || (k.value = k.value.add(1, "year")), oe.value = oe.value.add(1, "year");
  }, ie = () => {
    k.value = k.value.add(1, "year");
  }, ue = () => {
    oe.value = oe.value.subtract(1, "year");
  }, de = computed(() => `${k.value.year()} ${re("el.datepicker.year")}`), pe = computed(() => `${oe.value.year()} ${re("el.datepicker.year")}`), Ce = computed(() => k.value.year()), _e = computed(() => oe.value.year() === k.value.year() ? k.value.year() + 1 : oe.value.year());
  return {
    leftPrevYear: ae,
    rightNextYear: le,
    leftNextYear: ie,
    rightPrevYear: ue,
    leftLabel: de,
    rightLabel: pe,
    leftYear: Ce,
    rightYear: _e
  };
}, _hoisted_1$c = ["onClick"], _hoisted_2$7 = ["disabled"], _hoisted_3$3 = ["disabled"], __default__$a = {
  name: "DatePickerMonthRange"
}, _sfc_main$o = /* @__PURE__ */ defineComponent({
  ...__default__$a,
  props: panelMonthRangeProps,
  emits: panelMonthRangeEmits,
  setup(e, { emit: k }) {
    const oe = e, re = "year", { lang: ae } = useLocale(), le = inject("EP_PICKER_BASE"), { shortcuts: ie, disabledDate: ue, format: de } = le.props, pe = toRef(le.props, "defaultValue"), Ce = ref(dayjs().locale(ae.value)), _e = ref(dayjs().locale(ae.value).add(1, re)), {
      minDate: $e,
      maxDate: Ve,
      rangeState: Ne,
      ppNs: he,
      drpNs: Oe,
      handleChangeRange: Ie,
      handleRangeConfirm: qe,
      handleShortcutClick: xe,
      onSelect: ze
    } = useRangePicker(oe, {
      defaultValue: pe,
      leftDate: Ce,
      rightDate: _e,
      unit: re,
      onParsedValueChanged: bn
    }), At = computed(() => !!ie.length), {
      leftPrevYear: Fe,
      rightNextYear: Pt,
      leftNextYear: vn,
      rightPrevYear: En,
      leftLabel: Nn,
      rightLabel: Tn,
      leftYear: wn,
      rightYear: Lt
    } = useMonthRangeHeader({
      unlinkPanels: toRef(oe, "unlinkPanels"),
      leftDate: Ce,
      rightDate: _e
    }), Dt = computed(() => oe.unlinkPanels && Lt.value > wn.value + 1), Cn = (kt, Et = !0) => {
      const _n = kt.minDate, Pn = kt.maxDate;
      Ve.value === Pn && $e.value === _n || (Ve.value = Pn, $e.value = _n, Et && qe());
    }, jt = (kt) => kt.map((Et) => Et.format(de));
    function bn(kt, Et) {
      if (oe.unlinkPanels && Et) {
        const _n = (kt == null ? void 0 : kt.year()) || 0, Pn = Et.year();
        _e.value = _n === Pn ? Et.add(1, re) : Et;
      } else
        _e.value = Ce.value.add(1, re);
    }
    return k("set-picker-option", ["formatToString", jt]), (kt, Et) => (openBlock(), createElementBlock("div", {
      class: normalizeClass([
        unref(he).b(),
        unref(Oe).b(),
        {
          "has-sidebar": Boolean(kt.$slots.sidebar) || unref(At)
        }
      ])
    }, [
      createElementVNode("div", {
        class: normalizeClass(unref(he).e("body-wrapper"))
      }, [
        renderSlot(kt.$slots, "sidebar", {
          class: normalizeClass(unref(he).e("sidebar"))
        }),
        unref(At) ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(he).e("sidebar"))
        }, [
          (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(ie), (_n, Pn) => (openBlock(), createElementBlock("button", {
            key: Pn,
            type: "button",
            class: normalizeClass(unref(he).e("shortcut")),
            onClick: (hn) => unref(xe)(_n)
          }, toDisplayString(_n.text), 11, _hoisted_1$c))), 128))
        ], 2)) : createCommentVNode("v-if", !0),
        createElementVNode("div", {
          class: normalizeClass(unref(he).e("body"))
        }, [
          createElementVNode("div", {
            class: normalizeClass([[unref(he).e("content"), unref(Oe).e("content")], "is-left"])
          }, [
            createElementVNode("div", {
              class: normalizeClass(unref(Oe).e("header"))
            }, [
              createElementVNode("button", {
                type: "button",
                class: normalizeClass([unref(he).e("icon-btn"), "d-arrow-left"]),
                onClick: Et[0] || (Et[0] = (..._n) => unref(Fe) && unref(Fe)(..._n))
              }, [
                createVNode(unref(ElIcon), null, {
                  default: withCtx(() => [
                    createVNode(unref(d_arrow_left_default))
                  ]),
                  _: 1
                })
              ], 2),
              kt.unlinkPanels ? (openBlock(), createElementBlock("button", {
                key: 0,
                type: "button",
                disabled: !unref(Dt),
                class: normalizeClass([[
                  unref(he).e("icon-btn"),
                  { [unref(he).is("disabled")]: !unref(Dt) }
                ], "d-arrow-right"]),
                onClick: Et[1] || (Et[1] = (..._n) => unref(vn) && unref(vn)(..._n))
              }, [
                createVNode(unref(ElIcon), null, {
                  default: withCtx(() => [
                    createVNode(unref(d_arrow_right_default))
                  ]),
                  _: 1
                })
              ], 10, _hoisted_2$7)) : createCommentVNode("v-if", !0),
              createElementVNode("div", null, toDisplayString(unref(Nn)), 1)
            ], 2),
            createVNode(MonthTable, {
              "selection-mode": "range",
              date: Ce.value,
              "min-date": unref($e),
              "max-date": unref(Ve),
              "range-state": unref(Ne),
              "disabled-date": unref(ue),
              onChangerange: unref(Ie),
              onPick: Cn,
              onSelect: unref(ze)
            }, null, 8, ["date", "min-date", "max-date", "range-state", "disabled-date", "onChangerange", "onSelect"])
          ], 2),
          createElementVNode("div", {
            class: normalizeClass([[unref(he).e("content"), unref(Oe).e("content")], "is-right"])
          }, [
            createElementVNode("div", {
              class: normalizeClass(unref(Oe).e("header"))
            }, [
              kt.unlinkPanels ? (openBlock(), createElementBlock("button", {
                key: 0,
                type: "button",
                disabled: !unref(Dt),
                class: normalizeClass([[unref(he).e("icon-btn"), { "is-disabled": !unref(Dt) }], "d-arrow-left"]),
                onClick: Et[2] || (Et[2] = (..._n) => unref(En) && unref(En)(..._n))
              }, [
                createVNode(unref(ElIcon), null, {
                  default: withCtx(() => [
                    createVNode(unref(d_arrow_left_default))
                  ]),
                  _: 1
                })
              ], 10, _hoisted_3$3)) : createCommentVNode("v-if", !0),
              createElementVNode("button", {
                type: "button",
                class: normalizeClass([unref(he).e("icon-btn"), "d-arrow-right"]),
                onClick: Et[3] || (Et[3] = (..._n) => unref(Pt) && unref(Pt)(..._n))
              }, [
                createVNode(unref(ElIcon), null, {
                  default: withCtx(() => [
                    createVNode(unref(d_arrow_right_default))
                  ]),
                  _: 1
                })
              ], 2),
              createElementVNode("div", null, toDisplayString(unref(Tn)), 1)
            ], 2),
            createVNode(MonthTable, {
              "selection-mode": "range",
              date: _e.value,
              "min-date": unref($e),
              "max-date": unref(Ve),
              "range-state": unref(Ne),
              "disabled-date": unref(ue),
              onChangerange: unref(Ie),
              onPick: Cn,
              onSelect: unref(ze)
            }, null, 8, ["date", "min-date", "max-date", "range-state", "disabled-date", "onChangerange", "onSelect"])
          ], 2)
        ], 2)
      ], 2)
    ], 2));
  }
});
var MonthRangePickPanel = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/date-picker/src/date-picker-com/panel-month-range.vue"]]);
const getPanel = function(e) {
  switch (e) {
    case "daterange":
    case "datetimerange":
      return DateRangePickPanel;
    case "monthrange":
      return MonthRangePickPanel;
    default:
      return DatePickPanel;
  }
};
dayjs.extend(localeData);
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(dayOfYear);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
var DatePicker = defineComponent({
  name: "ElDatePicker",
  install: null,
  props: {
    ...timePickerDefaultProps,
    ...datePickerProps
  },
  emits: ["update:modelValue"],
  setup(e, {
    expose: k,
    emit: oe,
    slots: re
  }) {
    const ae = useNamespace("picker-panel");
    provide("ElPopperOptions", reactive(toRef(e, "popperOptions"))), provide(ROOT_PICKER_INJECTION_KEY, {
      slots: re,
      pickerNs: ae
    });
    const le = ref();
    k({
      focus: (de = !0) => {
        var pe;
        (pe = le.value) == null || pe.focus(de);
      }
    });
    const ue = (de) => {
      oe("update:modelValue", de);
    };
    return () => {
      var de;
      const pe = (de = e.format) != null ? de : DEFAULT_FORMATS_DATEPICKER[e.type] || DEFAULT_FORMATS_DATE, Ce = getPanel(e.type);
      return createVNode(CommonPicker, mergeProps(e, {
        format: pe,
        type: e.type,
        ref: le,
        "onUpdate:modelValue": ue
      }), {
        default: (_e) => createVNode(Ce, _e, null),
        "range-separator": re["range-separator"]
      });
    };
  }
});
const _DatePicker = DatePicker;
_DatePicker.install = (e) => {
  e.component(_DatePicker.name, _DatePicker);
};
const ElDatePicker = _DatePicker, dividerProps = buildProps({
  direction: {
    type: String,
    values: ["horizontal", "vertical"],
    default: "horizontal"
  },
  contentPosition: {
    type: String,
    values: ["left", "center", "right"],
    default: "center"
  },
  borderStyle: {
    type: definePropType(String),
    default: "solid"
  }
}), __default__$9 = {
  name: "ElDivider"
}, _sfc_main$n = /* @__PURE__ */ defineComponent({
  ...__default__$9,
  props: dividerProps,
  setup(e) {
    const k = e, oe = useNamespace("divider"), re = computed(() => oe.cssVar({
      "border-style": k.borderStyle
    }));
    return (ae, le) => (openBlock(), createElementBlock("div", {
      class: normalizeClass([unref(oe).b(), unref(oe).m(ae.direction)]),
      style: normalizeStyle(unref(re)),
      role: "separator"
    }, [
      ae.$slots.default && ae.direction !== "vertical" ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass([unref(oe).e("text"), unref(oe).is(ae.contentPosition)])
      }, [
        renderSlot(ae.$slots, "default")
      ], 2)) : createCommentVNode("v-if", !0)
    ], 6));
  }
});
var Divider = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/divider/src/divider.vue"]]);
const ElDivider = withInstall(Divider), formProps = buildProps({
  model: Object,
  rules: {
    type: definePropType(Object)
  },
  labelPosition: {
    type: String,
    values: ["left", "right", "top"],
    default: "right"
  },
  labelWidth: {
    type: [String, Number],
    default: ""
  },
  labelSuffix: {
    type: String,
    default: ""
  },
  inline: Boolean,
  inlineMessage: Boolean,
  statusIcon: Boolean,
  showMessage: {
    type: Boolean,
    default: !0
  },
  size: {
    type: String,
    values: componentSizes
  },
  disabled: Boolean,
  validateOnRuleChange: {
    type: Boolean,
    default: !0
  },
  hideRequiredAsterisk: {
    type: Boolean,
    default: !1
  },
  scrollToError: Boolean
}), formEmits = {
  validate: (e, k, oe) => (isArray(e) || isString(e)) && isBoolean(k) && isString(oe)
}, SCOPE = "ElForm";
function useFormLabelWidth() {
  const e = ref([]), k = computed(() => {
    if (!e.value.length)
      return "0";
    const le = Math.max(...e.value);
    return le ? `${le}px` : "";
  });
  function oe(le) {
    const ie = e.value.indexOf(le);
    return ie === -1 && debugWarn(SCOPE, `unexpected width ${le}`), ie;
  }
  function re(le, ie) {
    if (le && ie) {
      const ue = oe(ie);
      e.value.splice(ue, 1, le);
    } else
      le && e.value.push(le);
  }
  function ae(le) {
    const ie = oe(le);
    ie > -1 && e.value.splice(ie, 1);
  }
  return {
    autoLabelWidth: k,
    registerLabelWidth: re,
    deregisterLabelWidth: ae
  };
}
const filterFields = (e, k) => {
  const oe = castArray$1(k);
  return oe.length > 0 ? e.filter((re) => re.prop && oe.includes(re.prop)) : e;
}, __default__$8 = {
  name: "ElForm"
}, _sfc_main$m = /* @__PURE__ */ defineComponent({
  ...__default__$8,
  props: formProps,
  emits: formEmits,
  setup(e, { expose: k, emit: oe }) {
    const re = e, ae = "ElForm", le = [], ie = useSize(), ue = useNamespace("form"), de = computed(() => {
      const { labelPosition: xe, inline: ze } = re;
      return [
        ue.b(),
        ue.m(ie.value || "default"),
        {
          [ue.m(`label-${xe}`)]: xe,
          [ue.m("inline")]: ze
        }
      ];
    }), pe = (xe) => {
      le.push(xe);
    }, Ce = (xe) => {
      xe.prop && le.splice(le.indexOf(xe), 1);
    }, _e = (xe = []) => {
      if (!re.model) {
        debugWarn(ae, "model is required for resetFields to work.");
        return;
      }
      filterFields(le, xe).forEach((ze) => ze.resetField());
    }, $e = (xe = []) => {
      filterFields(le, xe).forEach((ze) => ze.clearValidate());
    }, Ve = computed(() => {
      const xe = !!re.model;
      return xe || debugWarn(ae, "model is required for validate to work."), xe;
    }), Ne = (xe) => {
      if (le.length === 0)
        return [];
      const ze = filterFields(le, xe);
      return ze.length ? ze : (debugWarn(ae, "please pass correct props!"), []);
    }, he = async (xe) => Ie(void 0, xe), Oe = async (xe = []) => {
      if (!Ve.value)
        return !1;
      const ze = Ne(xe);
      if (ze.length === 0)
        return !0;
      let At = {};
      for (const Fe of ze)
        try {
          await Fe.validate("");
        } catch (Pt) {
          At = {
            ...At,
            ...Pt
          };
        }
      return Object.keys(At).length === 0 ? !0 : Promise.reject(At);
    }, Ie = async (xe = [], ze) => {
      const At = !isFunction(ze);
      try {
        const Fe = await Oe(xe);
        return Fe === !0 && (ze == null || ze(Fe)), Fe;
      } catch (Fe) {
        const Pt = Fe;
        return re.scrollToError && qe(Object.keys(Pt)[0]), ze == null || ze(!1, Pt), At && Promise.reject(Pt);
      }
    }, qe = (xe) => {
      var ze;
      const At = filterFields(le, xe)[0];
      At && ((ze = At.$el) == null || ze.scrollIntoView());
    };
    return watch(() => re.rules, () => {
      re.validateOnRuleChange && he().catch((xe) => debugWarn(xe));
    }, { deep: !0 }), provide(formContextKey, reactive({
      ...toRefs(re),
      emit: oe,
      resetFields: _e,
      clearValidate: $e,
      validateField: Ie,
      addField: pe,
      removeField: Ce,
      ...useFormLabelWidth()
    })), k({
      validate: he,
      validateField: Ie,
      resetFields: _e,
      clearValidate: $e,
      scrollToField: qe
    }), (xe, ze) => (openBlock(), createElementBlock("form", {
      class: normalizeClass(unref(de))
    }, [
      renderSlot(xe.$slots, "default")
    ], 2));
  }
});
var Form = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/form/src/form.vue"]]);
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(e) {
    for (var k = 1; k < arguments.length; k++) {
      var oe = arguments[k];
      for (var re in oe)
        Object.prototype.hasOwnProperty.call(oe, re) && (e[re] = oe[re]);
    }
    return e;
  }, _extends.apply(this, arguments);
}
function _inheritsLoose(e, k) {
  e.prototype = Object.create(k.prototype), e.prototype.constructor = e, _setPrototypeOf(e, k);
}
function _getPrototypeOf(e) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(oe) {
    return oe.__proto__ || Object.getPrototypeOf(oe);
  }, _getPrototypeOf(e);
}
function _setPrototypeOf(e, k) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(re, ae) {
    return re.__proto__ = ae, re;
  }, _setPrototypeOf(e, k);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function _construct(e, k, oe) {
  return _isNativeReflectConstruct() ? _construct = Reflect.construct.bind() : _construct = function(ae, le, ie) {
    var ue = [null];
    ue.push.apply(ue, le);
    var de = Function.bind.apply(ae, ue), pe = new de();
    return ie && _setPrototypeOf(pe, ie.prototype), pe;
  }, _construct.apply(null, arguments);
}
function _isNativeFunction(e) {
  return Function.toString.call(e).indexOf("[native code]") !== -1;
}
function _wrapNativeSuper(e) {
  var k = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return _wrapNativeSuper = function(re) {
    if (re === null || !_isNativeFunction(re))
      return re;
    if (typeof re != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof k < "u") {
      if (k.has(re))
        return k.get(re);
      k.set(re, ae);
    }
    function ae() {
      return _construct(re, arguments, _getPrototypeOf(this).constructor);
    }
    return ae.prototype = Object.create(re.prototype, {
      constructor: {
        value: ae,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), _setPrototypeOf(ae, re);
  }, _wrapNativeSuper(e);
}
var formatRegExp = /%[sdj%]/g, warning = function() {
};
typeof process < "u" && process.env && process.env.NODE_ENV !== "production" && typeof window < "u" && typeof document < "u" && (warning = function(k, oe) {
  typeof console < "u" && console.warn && typeof ASYNC_VALIDATOR_NO_WARNING > "u" && oe.every(function(re) {
    return typeof re == "string";
  }) && console.warn(k, oe);
});
function convertFieldsError(e) {
  if (!e || !e.length)
    return null;
  var k = {};
  return e.forEach(function(oe) {
    var re = oe.field;
    k[re] = k[re] || [], k[re].push(oe);
  }), k;
}
function format(e) {
  for (var k = arguments.length, oe = new Array(k > 1 ? k - 1 : 0), re = 1; re < k; re++)
    oe[re - 1] = arguments[re];
  var ae = 0, le = oe.length;
  if (typeof e == "function")
    return e.apply(null, oe);
  if (typeof e == "string") {
    var ie = e.replace(formatRegExp, function(ue) {
      if (ue === "%%")
        return "%";
      if (ae >= le)
        return ue;
      switch (ue) {
        case "%s":
          return String(oe[ae++]);
        case "%d":
          return Number(oe[ae++]);
        case "%j":
          try {
            return JSON.stringify(oe[ae++]);
          } catch {
            return "[Circular]";
          }
          break;
        default:
          return ue;
      }
    });
    return ie;
  }
  return e;
}
function isNativeStringType(e) {
  return e === "string" || e === "url" || e === "hex" || e === "email" || e === "date" || e === "pattern";
}
function isEmptyValue(e, k) {
  return !!(e == null || k === "array" && Array.isArray(e) && !e.length || isNativeStringType(k) && typeof e == "string" && !e);
}
function asyncParallelArray(e, k, oe) {
  var re = [], ae = 0, le = e.length;
  function ie(ue) {
    re.push.apply(re, ue || []), ae++, ae === le && oe(re);
  }
  e.forEach(function(ue) {
    k(ue, ie);
  });
}
function asyncSerialArray(e, k, oe) {
  var re = 0, ae = e.length;
  function le(ie) {
    if (ie && ie.length) {
      oe(ie);
      return;
    }
    var ue = re;
    re = re + 1, ue < ae ? k(e[ue], le) : oe([]);
  }
  le([]);
}
function flattenObjArr(e) {
  var k = [];
  return Object.keys(e).forEach(function(oe) {
    k.push.apply(k, e[oe] || []);
  }), k;
}
var AsyncValidationError = /* @__PURE__ */ function(e) {
  _inheritsLoose(k, e);
  function k(oe, re) {
    var ae;
    return ae = e.call(this, "Async Validation Error") || this, ae.errors = oe, ae.fields = re, ae;
  }
  return k;
}(/* @__PURE__ */ _wrapNativeSuper(Error));
function asyncMap(e, k, oe, re, ae) {
  if (k.first) {
    var le = new Promise(function($e, Ve) {
      var Ne = function(Ie) {
        return re(Ie), Ie.length ? Ve(new AsyncValidationError(Ie, convertFieldsError(Ie))) : $e(ae);
      }, he = flattenObjArr(e);
      asyncSerialArray(he, oe, Ne);
    });
    return le.catch(function($e) {
      return $e;
    }), le;
  }
  var ie = k.firstFields === !0 ? Object.keys(e) : k.firstFields || [], ue = Object.keys(e), de = ue.length, pe = 0, Ce = [], _e = new Promise(function($e, Ve) {
    var Ne = function(Oe) {
      if (Ce.push.apply(Ce, Oe), pe++, pe === de)
        return re(Ce), Ce.length ? Ve(new AsyncValidationError(Ce, convertFieldsError(Ce))) : $e(ae);
    };
    ue.length || (re(Ce), $e(ae)), ue.forEach(function(he) {
      var Oe = e[he];
      ie.indexOf(he) !== -1 ? asyncSerialArray(Oe, oe, Ne) : asyncParallelArray(Oe, oe, Ne);
    });
  });
  return _e.catch(function($e) {
    return $e;
  }), _e;
}
function isErrorObj(e) {
  return !!(e && e.message !== void 0);
}
function getValue(e, k) {
  for (var oe = e, re = 0; re < k.length; re++) {
    if (oe == null)
      return oe;
    oe = oe[k[re]];
  }
  return oe;
}
function complementError(e, k) {
  return function(oe) {
    var re;
    return e.fullFields ? re = getValue(k, e.fullFields) : re = k[oe.field || e.fullField], isErrorObj(oe) ? (oe.field = oe.field || e.fullField, oe.fieldValue = re, oe) : {
      message: typeof oe == "function" ? oe() : oe,
      fieldValue: re,
      field: oe.field || e.fullField
    };
  };
}
function deepMerge(e, k) {
  if (k) {
    for (var oe in k)
      if (k.hasOwnProperty(oe)) {
        var re = k[oe];
        typeof re == "object" && typeof e[oe] == "object" ? e[oe] = _extends({}, e[oe], re) : e[oe] = re;
      }
  }
  return e;
}
var required$1 = function(k, oe, re, ae, le, ie) {
  k.required && (!re.hasOwnProperty(k.field) || isEmptyValue(oe, ie || k.type)) && ae.push(format(le.messages.required, k.fullField));
}, whitespace = function(k, oe, re, ae, le) {
  (/^\s+$/.test(oe) || oe === "") && ae.push(format(le.messages.whitespace, k.fullField));
}, urlReg, getUrlRegex = function() {
  if (urlReg)
    return urlReg;
  var e = "[a-fA-F\\d:]", k = function(ze) {
    return ze && ze.includeBoundaries ? "(?:(?<=\\s|^)(?=" + e + ")|(?<=" + e + ")(?=\\s|$))" : "";
  }, oe = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}", re = "[a-fA-F\\d]{1,4}", ae = (`
(?:
(?:` + re + ":){7}(?:" + re + `|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:` + re + ":){6}(?:" + oe + "|:" + re + `|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:` + re + ":){5}(?::" + oe + "|(?::" + re + `){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:` + re + ":){4}(?:(?::" + re + "){0,1}:" + oe + "|(?::" + re + `){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:` + re + ":){3}(?:(?::" + re + "){0,2}:" + oe + "|(?::" + re + `){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:` + re + ":){2}(?:(?::" + re + "){0,3}:" + oe + "|(?::" + re + `){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:` + re + ":){1}(?:(?::" + re + "){0,4}:" + oe + "|(?::" + re + `){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::(?:(?::` + re + "){0,5}:" + oe + "|(?::" + re + `){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1
`).replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim(), le = new RegExp("(?:^" + oe + "$)|(?:^" + ae + "$)"), ie = new RegExp("^" + oe + "$"), ue = new RegExp("^" + ae + "$"), de = function(ze) {
    return ze && ze.exact ? le : new RegExp("(?:" + k(ze) + oe + k(ze) + ")|(?:" + k(ze) + ae + k(ze) + ")", "g");
  };
  de.v4 = function(xe) {
    return xe && xe.exact ? ie : new RegExp("" + k(xe) + oe + k(xe), "g");
  }, de.v6 = function(xe) {
    return xe && xe.exact ? ue : new RegExp("" + k(xe) + ae + k(xe), "g");
  };
  var pe = "(?:(?:[a-z]+:)?//)", Ce = "(?:\\S+(?::\\S*)?@)?", _e = de.v4().source, $e = de.v6().source, Ve = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", Ne = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", he = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", Oe = "(?::\\d{2,5})?", Ie = '(?:[/?#][^\\s"]*)?', qe = "(?:" + pe + "|www\\.)" + Ce + "(?:localhost|" + _e + "|" + $e + "|" + Ve + Ne + he + ")" + Oe + Ie;
  return urlReg = new RegExp("(?:^" + qe + "$)", "i"), urlReg;
}, pattern$2 = {
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
}, types = {
  integer: function(k) {
    return types.number(k) && parseInt(k, 10) === k;
  },
  float: function(k) {
    return types.number(k) && !types.integer(k);
  },
  array: function(k) {
    return Array.isArray(k);
  },
  regexp: function(k) {
    if (k instanceof RegExp)
      return !0;
    try {
      return !!new RegExp(k);
    } catch {
      return !1;
    }
  },
  date: function(k) {
    return typeof k.getTime == "function" && typeof k.getMonth == "function" && typeof k.getYear == "function" && !isNaN(k.getTime());
  },
  number: function(k) {
    return isNaN(k) ? !1 : typeof k == "number";
  },
  object: function(k) {
    return typeof k == "object" && !types.array(k);
  },
  method: function(k) {
    return typeof k == "function";
  },
  email: function(k) {
    return typeof k == "string" && k.length <= 320 && !!k.match(pattern$2.email);
  },
  url: function(k) {
    return typeof k == "string" && k.length <= 2048 && !!k.match(getUrlRegex());
  },
  hex: function(k) {
    return typeof k == "string" && !!k.match(pattern$2.hex);
  }
}, type$1 = function(k, oe, re, ae, le) {
  if (k.required && oe === void 0) {
    required$1(k, oe, re, ae, le);
    return;
  }
  var ie = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], ue = k.type;
  ie.indexOf(ue) > -1 ? types[ue](oe) || ae.push(format(le.messages.types[ue], k.fullField, k.type)) : ue && typeof oe !== k.type && ae.push(format(le.messages.types[ue], k.fullField, k.type));
}, range = function(k, oe, re, ae, le) {
  var ie = typeof k.len == "number", ue = typeof k.min == "number", de = typeof k.max == "number", pe = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, Ce = oe, _e = null, $e = typeof oe == "number", Ve = typeof oe == "string", Ne = Array.isArray(oe);
  if ($e ? _e = "number" : Ve ? _e = "string" : Ne && (_e = "array"), !_e)
    return !1;
  Ne && (Ce = oe.length), Ve && (Ce = oe.replace(pe, "_").length), ie ? Ce !== k.len && ae.push(format(le.messages[_e].len, k.fullField, k.len)) : ue && !de && Ce < k.min ? ae.push(format(le.messages[_e].min, k.fullField, k.min)) : de && !ue && Ce > k.max ? ae.push(format(le.messages[_e].max, k.fullField, k.max)) : ue && de && (Ce < k.min || Ce > k.max) && ae.push(format(le.messages[_e].range, k.fullField, k.min, k.max));
}, ENUM$1 = "enum", enumerable$1 = function(k, oe, re, ae, le) {
  k[ENUM$1] = Array.isArray(k[ENUM$1]) ? k[ENUM$1] : [], k[ENUM$1].indexOf(oe) === -1 && ae.push(format(le.messages[ENUM$1], k.fullField, k[ENUM$1].join(", ")));
}, pattern$1 = function(k, oe, re, ae, le) {
  if (k.pattern) {
    if (k.pattern instanceof RegExp)
      k.pattern.lastIndex = 0, k.pattern.test(oe) || ae.push(format(le.messages.pattern.mismatch, k.fullField, oe, k.pattern));
    else if (typeof k.pattern == "string") {
      var ie = new RegExp(k.pattern);
      ie.test(oe) || ae.push(format(le.messages.pattern.mismatch, k.fullField, oe, k.pattern));
    }
  }
}, rules = {
  required: required$1,
  whitespace,
  type: type$1,
  range,
  enum: enumerable$1,
  pattern: pattern$1
}, string = function(k, oe, re, ae, le) {
  var ie = [], ue = k.required || !k.required && ae.hasOwnProperty(k.field);
  if (ue) {
    if (isEmptyValue(oe, "string") && !k.required)
      return re();
    rules.required(k, oe, ae, ie, le, "string"), isEmptyValue(oe, "string") || (rules.type(k, oe, ae, ie, le), rules.range(k, oe, ae, ie, le), rules.pattern(k, oe, ae, ie, le), k.whitespace === !0 && rules.whitespace(k, oe, ae, ie, le));
  }
  re(ie);
}, method = function(k, oe, re, ae, le) {
  var ie = [], ue = k.required || !k.required && ae.hasOwnProperty(k.field);
  if (ue) {
    if (isEmptyValue(oe) && !k.required)
      return re();
    rules.required(k, oe, ae, ie, le), oe !== void 0 && rules.type(k, oe, ae, ie, le);
  }
  re(ie);
}, number = function(k, oe, re, ae, le) {
  var ie = [], ue = k.required || !k.required && ae.hasOwnProperty(k.field);
  if (ue) {
    if (oe === "" && (oe = void 0), isEmptyValue(oe) && !k.required)
      return re();
    rules.required(k, oe, ae, ie, le), oe !== void 0 && (rules.type(k, oe, ae, ie, le), rules.range(k, oe, ae, ie, le));
  }
  re(ie);
}, _boolean = function(k, oe, re, ae, le) {
  var ie = [], ue = k.required || !k.required && ae.hasOwnProperty(k.field);
  if (ue) {
    if (isEmptyValue(oe) && !k.required)
      return re();
    rules.required(k, oe, ae, ie, le), oe !== void 0 && rules.type(k, oe, ae, ie, le);
  }
  re(ie);
}, regexp = function(k, oe, re, ae, le) {
  var ie = [], ue = k.required || !k.required && ae.hasOwnProperty(k.field);
  if (ue) {
    if (isEmptyValue(oe) && !k.required)
      return re();
    rules.required(k, oe, ae, ie, le), isEmptyValue(oe) || rules.type(k, oe, ae, ie, le);
  }
  re(ie);
}, integer = function(k, oe, re, ae, le) {
  var ie = [], ue = k.required || !k.required && ae.hasOwnProperty(k.field);
  if (ue) {
    if (isEmptyValue(oe) && !k.required)
      return re();
    rules.required(k, oe, ae, ie, le), oe !== void 0 && (rules.type(k, oe, ae, ie, le), rules.range(k, oe, ae, ie, le));
  }
  re(ie);
}, floatFn = function(k, oe, re, ae, le) {
  var ie = [], ue = k.required || !k.required && ae.hasOwnProperty(k.field);
  if (ue) {
    if (isEmptyValue(oe) && !k.required)
      return re();
    rules.required(k, oe, ae, ie, le), oe !== void 0 && (rules.type(k, oe, ae, ie, le), rules.range(k, oe, ae, ie, le));
  }
  re(ie);
}, array = function(k, oe, re, ae, le) {
  var ie = [], ue = k.required || !k.required && ae.hasOwnProperty(k.field);
  if (ue) {
    if (oe == null && !k.required)
      return re();
    rules.required(k, oe, ae, ie, le, "array"), oe != null && (rules.type(k, oe, ae, ie, le), rules.range(k, oe, ae, ie, le));
  }
  re(ie);
}, object = function(k, oe, re, ae, le) {
  var ie = [], ue = k.required || !k.required && ae.hasOwnProperty(k.field);
  if (ue) {
    if (isEmptyValue(oe) && !k.required)
      return re();
    rules.required(k, oe, ae, ie, le), oe !== void 0 && rules.type(k, oe, ae, ie, le);
  }
  re(ie);
}, ENUM = "enum", enumerable = function(k, oe, re, ae, le) {
  var ie = [], ue = k.required || !k.required && ae.hasOwnProperty(k.field);
  if (ue) {
    if (isEmptyValue(oe) && !k.required)
      return re();
    rules.required(k, oe, ae, ie, le), oe !== void 0 && rules[ENUM](k, oe, ae, ie, le);
  }
  re(ie);
}, pattern = function(k, oe, re, ae, le) {
  var ie = [], ue = k.required || !k.required && ae.hasOwnProperty(k.field);
  if (ue) {
    if (isEmptyValue(oe, "string") && !k.required)
      return re();
    rules.required(k, oe, ae, ie, le), isEmptyValue(oe, "string") || rules.pattern(k, oe, ae, ie, le);
  }
  re(ie);
}, date = function(k, oe, re, ae, le) {
  var ie = [], ue = k.required || !k.required && ae.hasOwnProperty(k.field);
  if (ue) {
    if (isEmptyValue(oe, "date") && !k.required)
      return re();
    if (rules.required(k, oe, ae, ie, le), !isEmptyValue(oe, "date")) {
      var de;
      oe instanceof Date ? de = oe : de = new Date(oe), rules.type(k, de, ae, ie, le), de && rules.range(k, de.getTime(), ae, ie, le);
    }
  }
  re(ie);
}, required = function(k, oe, re, ae, le) {
  var ie = [], ue = Array.isArray(oe) ? "array" : typeof oe;
  rules.required(k, oe, ae, ie, le, ue), re(ie);
}, type = function(k, oe, re, ae, le) {
  var ie = k.type, ue = [], de = k.required || !k.required && ae.hasOwnProperty(k.field);
  if (de) {
    if (isEmptyValue(oe, ie) && !k.required)
      return re();
    rules.required(k, oe, ae, ue, le, ie), isEmptyValue(oe, ie) || rules.type(k, oe, ae, ue, le);
  }
  re(ue);
}, any = function(k, oe, re, ae, le) {
  var ie = [], ue = k.required || !k.required && ae.hasOwnProperty(k.field);
  if (ue) {
    if (isEmptyValue(oe) && !k.required)
      return re();
    rules.required(k, oe, ae, ie, le);
  }
  re(ie);
}, validators = {
  string,
  method,
  number,
  boolean: _boolean,
  regexp,
  integer,
  float: floatFn,
  array,
  object,
  enum: enumerable,
  pattern,
  date,
  url: type,
  hex: type,
  email: type,
  required,
  any
};
function newMessages() {
  return {
    default: "Validation error on field %s",
    required: "%s is required",
    enum: "%s must be one of %s",
    whitespace: "%s cannot be empty",
    date: {
      format: "%s date %s is invalid for format %s",
      parse: "%s date could not be parsed, %s is invalid ",
      invalid: "%s date %s is invalid"
    },
    types: {
      string: "%s is not a %s",
      method: "%s is not a %s (function)",
      array: "%s is not an %s",
      object: "%s is not an %s",
      number: "%s is not a %s",
      date: "%s is not a %s",
      boolean: "%s is not a %s",
      integer: "%s is not an %s",
      float: "%s is not a %s",
      regexp: "%s is not a valid %s",
      email: "%s is not a valid %s",
      url: "%s is not a valid %s",
      hex: "%s is not a valid %s"
    },
    string: {
      len: "%s must be exactly %s characters",
      min: "%s must be at least %s characters",
      max: "%s cannot be longer than %s characters",
      range: "%s must be between %s and %s characters"
    },
    number: {
      len: "%s must equal %s",
      min: "%s cannot be less than %s",
      max: "%s cannot be greater than %s",
      range: "%s must be between %s and %s"
    },
    array: {
      len: "%s must be exactly %s in length",
      min: "%s cannot be less than %s in length",
      max: "%s cannot be greater than %s in length",
      range: "%s must be between %s and %s in length"
    },
    pattern: {
      mismatch: "%s value %s does not match pattern %s"
    },
    clone: function() {
      var k = JSON.parse(JSON.stringify(this));
      return k.clone = this.clone, k;
    }
  };
}
var messages = newMessages(), Schema = /* @__PURE__ */ function() {
  function e(oe) {
    this.rules = null, this._messages = messages, this.define(oe);
  }
  var k = e.prototype;
  return k.define = function(re) {
    var ae = this;
    if (!re)
      throw new Error("Cannot configure a schema with no rules");
    if (typeof re != "object" || Array.isArray(re))
      throw new Error("Rules must be an object");
    this.rules = {}, Object.keys(re).forEach(function(le) {
      var ie = re[le];
      ae.rules[le] = Array.isArray(ie) ? ie : [ie];
    });
  }, k.messages = function(re) {
    return re && (this._messages = deepMerge(newMessages(), re)), this._messages;
  }, k.validate = function(re, ae, le) {
    var ie = this;
    ae === void 0 && (ae = {}), le === void 0 && (le = function() {
    });
    var ue = re, de = ae, pe = le;
    if (typeof de == "function" && (pe = de, de = {}), !this.rules || Object.keys(this.rules).length === 0)
      return pe && pe(null, ue), Promise.resolve(ue);
    function Ce(he) {
      var Oe = [], Ie = {};
      function qe(ze) {
        if (Array.isArray(ze)) {
          var At;
          Oe = (At = Oe).concat.apply(At, ze);
        } else
          Oe.push(ze);
      }
      for (var xe = 0; xe < he.length; xe++)
        qe(he[xe]);
      Oe.length ? (Ie = convertFieldsError(Oe), pe(Oe, Ie)) : pe(null, ue);
    }
    if (de.messages) {
      var _e = this.messages();
      _e === messages && (_e = newMessages()), deepMerge(_e, de.messages), de.messages = _e;
    } else
      de.messages = this.messages();
    var $e = {}, Ve = de.keys || Object.keys(this.rules);
    Ve.forEach(function(he) {
      var Oe = ie.rules[he], Ie = ue[he];
      Oe.forEach(function(qe) {
        var xe = qe;
        typeof xe.transform == "function" && (ue === re && (ue = _extends({}, ue)), Ie = ue[he] = xe.transform(Ie)), typeof xe == "function" ? xe = {
          validator: xe
        } : xe = _extends({}, xe), xe.validator = ie.getValidationMethod(xe), xe.validator && (xe.field = he, xe.fullField = xe.fullField || he, xe.type = ie.getType(xe), $e[he] = $e[he] || [], $e[he].push({
          rule: xe,
          value: Ie,
          source: ue,
          field: he
        }));
      });
    });
    var Ne = {};
    return asyncMap($e, de, function(he, Oe) {
      var Ie = he.rule, qe = (Ie.type === "object" || Ie.type === "array") && (typeof Ie.fields == "object" || typeof Ie.defaultField == "object");
      qe = qe && (Ie.required || !Ie.required && he.value), Ie.field = he.field;
      function xe(Fe, Pt) {
        return _extends({}, Pt, {
          fullField: Ie.fullField + "." + Fe,
          fullFields: Ie.fullFields ? [].concat(Ie.fullFields, [Fe]) : [Fe]
        });
      }
      function ze(Fe) {
        Fe === void 0 && (Fe = []);
        var Pt = Array.isArray(Fe) ? Fe : [Fe];
        !de.suppressWarning && Pt.length && e.warning("async-validator:", Pt), Pt.length && Ie.message !== void 0 && (Pt = [].concat(Ie.message));
        var vn = Pt.map(complementError(Ie, ue));
        if (de.first && vn.length)
          return Ne[Ie.field] = 1, Oe(vn);
        if (!qe)
          Oe(vn);
        else {
          if (Ie.required && !he.value)
            return Ie.message !== void 0 ? vn = [].concat(Ie.message).map(complementError(Ie, ue)) : de.error && (vn = [de.error(Ie, format(de.messages.required, Ie.field))]), Oe(vn);
          var En = {};
          Ie.defaultField && Object.keys(he.value).map(function(wn) {
            En[wn] = Ie.defaultField;
          }), En = _extends({}, En, he.rule.fields);
          var Nn = {};
          Object.keys(En).forEach(function(wn) {
            var Lt = En[wn], Dt = Array.isArray(Lt) ? Lt : [Lt];
            Nn[wn] = Dt.map(xe.bind(null, wn));
          });
          var Tn = new e(Nn);
          Tn.messages(de.messages), he.rule.options && (he.rule.options.messages = de.messages, he.rule.options.error = de.error), Tn.validate(he.value, he.rule.options || de, function(wn) {
            var Lt = [];
            vn && vn.length && Lt.push.apply(Lt, vn), wn && wn.length && Lt.push.apply(Lt, wn), Oe(Lt.length ? Lt : null);
          });
        }
      }
      var At;
      if (Ie.asyncValidator)
        At = Ie.asyncValidator(Ie, he.value, ze, he.source, de);
      else if (Ie.validator) {
        try {
          At = Ie.validator(Ie, he.value, ze, he.source, de);
        } catch (Fe) {
          console.error == null || console.error(Fe), de.suppressValidatorError || setTimeout(function() {
            throw Fe;
          }, 0), ze(Fe.message);
        }
        At === !0 ? ze() : At === !1 ? ze(typeof Ie.message == "function" ? Ie.message(Ie.fullField || Ie.field) : Ie.message || (Ie.fullField || Ie.field) + " fails") : At instanceof Array ? ze(At) : At instanceof Error && ze(At.message);
      }
      At && At.then && At.then(function() {
        return ze();
      }, function(Fe) {
        return ze(Fe);
      });
    }, function(he) {
      Ce(he);
    }, ue);
  }, k.getType = function(re) {
    if (re.type === void 0 && re.pattern instanceof RegExp && (re.type = "pattern"), typeof re.validator != "function" && re.type && !validators.hasOwnProperty(re.type))
      throw new Error(format("Unknown rule type %s", re.type));
    return re.type || "string";
  }, k.getValidationMethod = function(re) {
    if (typeof re.validator == "function")
      return re.validator;
    var ae = Object.keys(re), le = ae.indexOf("message");
    return le !== -1 && ae.splice(le, 1), ae.length === 1 && ae[0] === "required" ? validators.required : validators[this.getType(re)] || void 0;
  }, e;
}();
Schema.register = function(k, oe) {
  if (typeof oe != "function")
    throw new Error("Cannot register a validator by type, validator is not a function");
  validators[k] = oe;
};
Schema.warning = warning;
Schema.messages = messages;
Schema.validators = validators;
const formItemValidateStates = [
  "",
  "error",
  "validating",
  "success"
], formItemProps = buildProps({
  label: String,
  labelWidth: {
    type: [String, Number],
    default: ""
  },
  prop: {
    type: definePropType([String, Array])
  },
  required: {
    type: Boolean,
    default: void 0
  },
  rules: {
    type: definePropType([Object, Array])
  },
  error: String,
  validateStatus: {
    type: String,
    values: formItemValidateStates
  },
  for: String,
  inlineMessage: {
    type: [String, Boolean],
    default: ""
  },
  showMessage: {
    type: Boolean,
    default: !0
  },
  size: {
    type: String,
    values: componentSizes
  }
}), COMPONENT_NAME$1 = "ElLabelWrap";
var FormLabelWrap = defineComponent({
  name: COMPONENT_NAME$1,
  props: {
    isAutoWidth: Boolean,
    updateAll: Boolean
  },
  setup(e, {
    slots: k
  }) {
    const oe = inject(formContextKey, void 0);
    inject(formItemContextKey) || throwError(COMPONENT_NAME$1, "usage: <el-form-item><label-wrap /></el-form-item>");
    const ae = useNamespace("form"), le = ref(), ie = ref(0), ue = () => {
      var Ce;
      if ((Ce = le.value) != null && Ce.firstElementChild) {
        const _e = window.getComputedStyle(le.value.firstElementChild).width;
        return Math.ceil(Number.parseFloat(_e));
      } else
        return 0;
    }, de = (Ce = "update") => {
      nextTick(() => {
        k.default && e.isAutoWidth && (Ce === "update" ? ie.value = ue() : Ce === "remove" && (oe == null || oe.deregisterLabelWidth(ie.value)));
      });
    }, pe = () => de("update");
    return onMounted(() => {
      pe();
    }), onBeforeUnmount(() => {
      de("remove");
    }), onUpdated(() => pe()), watch(ie, (Ce, _e) => {
      e.updateAll && (oe == null || oe.registerLabelWidth(Ce, _e));
    }), useResizeObserver(computed(() => {
      var Ce, _e;
      return (_e = (Ce = le.value) == null ? void 0 : Ce.firstElementChild) != null ? _e : null;
    }), pe), () => {
      var Ce, _e;
      if (!k)
        return null;
      const {
        isAutoWidth: $e
      } = e;
      if ($e) {
        const Ve = oe == null ? void 0 : oe.autoLabelWidth, Ne = {};
        if (Ve && Ve !== "auto") {
          const he = Math.max(0, Number.parseInt(Ve, 10) - ie.value), Oe = oe.labelPosition === "left" ? "marginRight" : "marginLeft";
          he && (Ne[Oe] = `${he}px`);
        }
        return createVNode("div", {
          ref: le,
          class: [ae.be("item", "label-wrap")],
          style: Ne
        }, [(Ce = k.default) == null ? void 0 : Ce.call(k)]);
      } else
        return createVNode(Fragment, {
          ref: le
        }, [(_e = k.default) == null ? void 0 : _e.call(k)]);
    };
  }
});
const _hoisted_1$b = ["role", "aria-labelledby"], __default__$7 = {
  name: "ElFormItem"
}, _sfc_main$l = /* @__PURE__ */ defineComponent({
  ...__default__$7,
  props: formItemProps,
  setup(e, { expose: k }) {
    const oe = e, re = useSlots(), ae = inject(formContextKey, void 0), le = inject(formItemContextKey, void 0), ie = useSize(void 0, { formItem: !1 }), ue = useNamespace("form-item"), de = useId().value, pe = ref([]), Ce = ref(""), _e = refDebounced(Ce, 100), $e = ref(""), Ve = ref();
    let Ne, he = !1;
    const Oe = computed(() => {
      if ((ae == null ? void 0 : ae.labelPosition) === "top")
        return {};
      const kn = addUnit(oe.labelWidth || (ae == null ? void 0 : ae.labelWidth) || "");
      return kn ? { width: kn } : {};
    }), Ie = computed(() => {
      if ((ae == null ? void 0 : ae.labelPosition) === "top" || (ae == null ? void 0 : ae.inline))
        return {};
      if (!oe.label && !oe.labelWidth && En)
        return {};
      const kn = addUnit(oe.labelWidth || (ae == null ? void 0 : ae.labelWidth) || "");
      return !oe.label && !re.label ? { marginLeft: kn } : {};
    }), qe = computed(() => [
      ue.b(),
      ue.m(ie.value),
      ue.is("error", Ce.value === "error"),
      ue.is("validating", Ce.value === "validating"),
      ue.is("success", Ce.value === "success"),
      ue.is("required", Dt.value || oe.required),
      ue.is("no-asterisk", ae == null ? void 0 : ae.hideRequiredAsterisk),
      { [ue.m("feedback")]: ae == null ? void 0 : ae.statusIcon }
    ]), xe = computed(() => isBoolean(oe.inlineMessage) ? oe.inlineMessage : (ae == null ? void 0 : ae.inlineMessage) || !1), ze = computed(() => [
      ue.e("error"),
      { [ue.em("error", "inline")]: xe.value }
    ]), At = computed(() => oe.prop ? isString(oe.prop) ? oe.prop : oe.prop.join(".") : ""), Fe = computed(() => !!(oe.label || re.label)), Pt = computed(() => oe.for || pe.value.length === 1 ? pe.value[0] : void 0), vn = computed(() => !Pt.value && Fe.value), En = !!le, Nn = computed(() => {
      const kn = ae == null ? void 0 : ae.model;
      if (!(!kn || !oe.prop))
        return getProp(kn, oe.prop).value;
    }), Tn = computed(() => {
      const kn = oe.rules ? castArray$1(oe.rules) : [], An = ae == null ? void 0 : ae.rules;
      if (An && oe.prop) {
        const Vn = getProp(An, oe.prop).value;
        Vn && kn.push(...castArray$1(Vn));
      }
      return oe.required !== void 0 && kn.push({ required: !!oe.required }), kn;
    }), wn = computed(() => Tn.value.length > 0), Lt = (kn) => Tn.value.filter((Vn) => !Vn.trigger || !kn ? !0 : Array.isArray(Vn.trigger) ? Vn.trigger.includes(kn) : Vn.trigger === kn).map(({ trigger: Vn, ...Bn }) => Bn), Dt = computed(() => Tn.value.some((kn) => kn.required === !0)), Cn = computed(() => {
      var kn;
      return _e.value === "error" && oe.showMessage && ((kn = ae == null ? void 0 : ae.showMessage) != null ? kn : !0);
    }), jt = computed(() => `${oe.label || ""}${(ae == null ? void 0 : ae.labelSuffix) || ""}`), bn = (kn) => {
      Ce.value = kn;
    }, kt = (kn) => {
      var An, Vn;
      const { errors: Bn, fields: Wn } = kn;
      (!Bn || !Wn) && console.error(kn), bn("error"), $e.value = Bn ? (Vn = (An = Bn == null ? void 0 : Bn[0]) == null ? void 0 : An.message) != null ? Vn : `${oe.prop} is required` : "", ae == null || ae.emit("validate", oe.prop, !1, $e.value);
    }, Et = () => {
      bn("success"), ae == null || ae.emit("validate", oe.prop, !0, "");
    }, _n = async (kn) => {
      const An = At.value;
      return new Schema({
        [An]: kn
      }).validate({ [An]: Nn.value }, { firstFields: !0 }).then(() => (Et(), !0)).catch((Bn) => (kt(Bn), Promise.reject(Bn)));
    }, Pn = async (kn, An) => {
      if (he)
        return he = !1, !1;
      const Vn = isFunction(An);
      if (!wn.value)
        return An == null || An(!1), !1;
      const Bn = Lt(kn);
      return Bn.length === 0 ? (An == null || An(!0), !0) : (bn("validating"), _n(Bn).then(() => (An == null || An(!0), !0)).catch((Wn) => {
        const { fields: Yn } = Wn;
        return An == null || An(!1, Yn), Vn ? !1 : Promise.reject(Yn);
      }));
    }, hn = () => {
      bn(""), $e.value = "";
    }, On = async () => {
      const kn = ae == null ? void 0 : ae.model;
      if (!kn || !oe.prop)
        return;
      const An = getProp(kn, oe.prop);
      isEqual(An.value, Ne) || (he = !0, An.value = clone(Ne)), await nextTick(), hn();
    }, Dn = (kn) => {
      pe.value.includes(kn) || pe.value.push(kn);
    }, Rn = (kn) => {
      pe.value = pe.value.filter((An) => An !== kn);
    };
    watch(() => oe.error, (kn) => {
      $e.value = kn || "", bn(kn ? "error" : "");
    }, { immediate: !0 }), watch(() => oe.validateStatus, (kn) => bn(kn || ""));
    const Fn = reactive({
      ...toRefs(oe),
      $el: Ve,
      size: ie,
      validateState: Ce,
      labelId: de,
      inputIds: pe,
      isGroup: vn,
      addInputId: Dn,
      removeInputId: Rn,
      resetField: On,
      clearValidate: hn,
      validate: Pn
    });
    return provide(formItemContextKey, Fn), onMounted(() => {
      oe.prop && (ae == null || ae.addField(Fn), Ne = clone(Nn.value));
    }), onBeforeUnmount(() => {
      ae == null || ae.removeField(Fn);
    }), k({
      size: ie,
      validateMessage: $e,
      validateState: Ce,
      validate: Pn,
      clearValidate: hn,
      resetField: On
    }), (kn, An) => {
      var Vn;
      return openBlock(), createElementBlock("div", {
        ref_key: "formItemRef",
        ref: Ve,
        class: normalizeClass(unref(qe)),
        role: unref(vn) ? "group" : void 0,
        "aria-labelledby": unref(vn) ? unref(de) : void 0
      }, [
        createVNode(unref(FormLabelWrap), {
          "is-auto-width": unref(Oe).width === "auto",
          "update-all": ((Vn = unref(ae)) == null ? void 0 : Vn.labelWidth) === "auto"
        }, {
          default: withCtx(() => [
            unref(Fe) ? (openBlock(), createBlock(resolveDynamicComponent(unref(Pt) ? "label" : "div"), {
              key: 0,
              id: unref(de),
              for: unref(Pt),
              class: normalizeClass(unref(ue).e("label")),
              style: normalizeStyle(unref(Oe))
            }, {
              default: withCtx(() => [
                renderSlot(kn.$slots, "label", { label: unref(jt) }, () => [
                  createTextVNode(toDisplayString(unref(jt)), 1)
                ])
              ]),
              _: 3
            }, 8, ["id", "for", "class", "style"])) : createCommentVNode("v-if", !0)
          ]),
          _: 3
        }, 8, ["is-auto-width", "update-all"]),
        createElementVNode("div", {
          class: normalizeClass(unref(ue).e("content")),
          style: normalizeStyle(unref(Ie))
        }, [
          renderSlot(kn.$slots, "default"),
          createVNode(Transition, {
            name: `${unref(ue).namespace.value}-zoom-in-top`
          }, {
            default: withCtx(() => [
              unref(Cn) ? renderSlot(kn.$slots, "error", {
                key: 0,
                error: $e.value
              }, () => [
                createElementVNode("div", {
                  class: normalizeClass(unref(ze))
                }, toDisplayString($e.value), 3)
              ]) : createCommentVNode("v-if", !0)
            ]),
            _: 3
          }, 8, ["name"])
        ], 6)
      ], 10, _hoisted_1$b);
    };
  }
});
var FormItem = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/form/src/form-item.vue"]]);
const ElForm = withInstall(Form, {
  FormItem
}), ElFormItem = withNoopInstall(FormItem), inputNumberProps = buildProps({
  id: {
    type: String,
    default: void 0
  },
  step: {
    type: Number,
    default: 1
  },
  stepStrictly: Boolean,
  max: {
    type: Number,
    default: Number.POSITIVE_INFINITY
  },
  min: {
    type: Number,
    default: Number.NEGATIVE_INFINITY
  },
  modelValue: Number,
  disabled: Boolean,
  size: useSizeProp,
  controls: {
    type: Boolean,
    default: !0
  },
  controlsPosition: {
    type: String,
    default: "",
    values: ["", "right"]
  },
  valueOnClear: {
    type: [String, Number, null],
    validator: (e) => e === null || isNumber(e) || ["min", "max"].includes(e),
    default: null
  },
  name: String,
  label: String,
  placeholder: String,
  precision: {
    type: Number,
    validator: (e) => e >= 0 && e === Number.parseInt(`${e}`, 10)
  },
  validateEvent: {
    type: Boolean,
    default: !0
  }
}), inputNumberEmits = {
  [CHANGE_EVENT]: (e, k) => e !== k,
  blur: (e) => e instanceof FocusEvent,
  focus: (e) => e instanceof FocusEvent,
  [INPUT_EVENT]: (e) => isNumber(e) || isNil(e),
  [UPDATE_MODEL_EVENT]: (e) => isNumber(e) || isNil(e)
}, _hoisted_1$a = ["aria-label", "onKeydown"], _hoisted_2$6 = ["aria-label", "onKeydown"], __default__$6 = {
  name: "ElInputNumber"
}, _sfc_main$k = /* @__PURE__ */ defineComponent({
  ...__default__$6,
  props: inputNumberProps,
  emits: inputNumberEmits,
  setup(e, { expose: k, emit: oe }) {
    const re = e, { t: ae } = useLocale(), le = useNamespace("input-number"), ie = ref(), ue = reactive({
      currentValue: re.modelValue,
      userInput: null
    }), { formItem: de } = useFormItem(), pe = computed(() => isNumber(re.modelValue) && qe(re.modelValue, -1) < re.min), Ce = computed(() => isNumber(re.modelValue) && qe(re.modelValue) > re.max), _e = computed(() => {
      const Lt = Ie(re.step);
      return isUndefined(re.precision) ? Math.max(Ie(re.modelValue), Lt) : (Lt > re.precision && debugWarn("InputNumber", "precision should not be less than the decimal places of step"), re.precision);
    }), $e = computed(() => re.controls && re.controlsPosition === "right"), Ve = useSize(), Ne = useDisabled$1(), he = computed(() => {
      if (ue.userInput !== null)
        return ue.userInput;
      let Lt = ue.currentValue;
      if (isNil(Lt))
        return "";
      if (isNumber(Lt)) {
        if (Number.isNaN(Lt))
          return "";
        isUndefined(re.precision) || (Lt = Lt.toFixed(re.precision));
      }
      return Lt;
    }), Oe = (Lt, Dt) => {
      if (isUndefined(Dt) && (Dt = _e.value), Dt === 0)
        return Math.round(Lt);
      let Cn = String(Lt);
      const jt = Cn.indexOf(".");
      if (jt === -1 || !Cn.replace(".", "").split("")[jt + Dt])
        return Lt;
      const Et = Cn.length;
      return Cn.charAt(Et - 1) === "5" && (Cn = `${Cn.slice(0, Math.max(0, Et - 1))}6`), Number.parseFloat(Number(Cn).toFixed(Dt));
    }, Ie = (Lt) => {
      if (isNil(Lt))
        return 0;
      const Dt = Lt.toString(), Cn = Dt.indexOf(".");
      let jt = 0;
      return Cn !== -1 && (jt = Dt.length - Cn - 1), jt;
    }, qe = (Lt, Dt = 1) => isNumber(Lt) ? Oe(Lt + re.step * Dt) : ue.currentValue, xe = () => {
      if (Ne.value || Ce.value)
        return;
      const Lt = re.modelValue || 0, Dt = qe(Lt);
      Fe(Dt);
    }, ze = () => {
      if (Ne.value || pe.value)
        return;
      const Lt = re.modelValue || 0, Dt = qe(Lt, -1);
      Fe(Dt);
    }, At = (Lt, Dt) => {
      const { max: Cn, min: jt, step: bn, precision: kt, stepStrictly: Et, valueOnClear: _n } = re;
      let Pn = Number(Lt);
      if (isNil(Lt) || Number.isNaN(Pn))
        return null;
      if (Lt === "") {
        if (_n === null)
          return null;
        Pn = isString(_n) ? { min: jt, max: Cn }[_n] : _n;
      }
      return Et && (Pn = Oe(Math.round(Pn / bn) * bn, kt)), isUndefined(kt) || (Pn = Oe(Pn, kt)), (Pn > Cn || Pn < jt) && (Pn = Pn > Cn ? Cn : jt, Dt && oe("update:modelValue", Pn)), Pn;
    }, Fe = (Lt) => {
      var Dt;
      const Cn = ue.currentValue, jt = At(Lt);
      Cn !== jt && (ue.userInput = null, oe("update:modelValue", jt), oe("input", jt), oe("change", jt, Cn), re.validateEvent && ((Dt = de == null ? void 0 : de.validate) == null || Dt.call(de, "change").catch((bn) => debugWarn(bn))), ue.currentValue = jt);
    }, Pt = (Lt) => ue.userInput = Lt, vn = (Lt) => {
      const Dt = Lt !== "" ? Number(Lt) : "";
      (isNumber(Dt) && !Number.isNaN(Dt) || Lt === "") && Fe(Dt), ue.userInput = null;
    }, En = () => {
      var Lt, Dt;
      (Dt = (Lt = ie.value) == null ? void 0 : Lt.focus) == null || Dt.call(Lt);
    }, Nn = () => {
      var Lt, Dt;
      (Dt = (Lt = ie.value) == null ? void 0 : Lt.blur) == null || Dt.call(Lt);
    }, Tn = (Lt) => {
      oe("focus", Lt);
    }, wn = (Lt) => {
      var Dt;
      oe("blur", Lt), re.validateEvent && ((Dt = de == null ? void 0 : de.validate) == null || Dt.call(de, "blur").catch((Cn) => debugWarn(Cn)));
    };
    return watch(() => re.modelValue, (Lt) => {
      ue.currentValue = At(Lt, !0), ue.userInput = null;
    }, { immediate: !0 }), onMounted(() => {
      var Lt;
      const { min: Dt, max: Cn, modelValue: jt } = re, bn = (Lt = ie.value) == null ? void 0 : Lt.input;
      if (bn.setAttribute("role", "spinbutton"), Number.isFinite(Cn) ? bn.setAttribute("aria-valuemax", String(Cn)) : bn.removeAttribute("aria-valuemax"), Number.isFinite(Dt) ? bn.setAttribute("aria-valuemin", String(Dt)) : bn.removeAttribute("aria-valuemin"), bn.setAttribute("aria-valuenow", String(ue.currentValue)), bn.setAttribute("aria-disabled", String(Ne.value)), !isNumber(jt) && jt != null) {
        let kt = Number(jt);
        Number.isNaN(kt) && (kt = null), oe("update:modelValue", kt);
      }
    }), onUpdated(() => {
      var Lt;
      const Dt = (Lt = ie.value) == null ? void 0 : Lt.input;
      Dt == null || Dt.setAttribute("aria-valuenow", `${ue.currentValue}`);
    }), k({
      focus: En,
      blur: Nn
    }), (Lt, Dt) => (openBlock(), createElementBlock("div", {
      class: normalizeClass([
        unref(le).b(),
        unref(le).m(unref(Ve)),
        unref(le).is("disabled", unref(Ne)),
        unref(le).is("without-controls", !Lt.controls),
        unref(le).is("controls-right", unref($e))
      ]),
      onDragstart: Dt[0] || (Dt[0] = withModifiers(() => {
      }, ["prevent"]))
    }, [
      Lt.controls ? withDirectives((openBlock(), createElementBlock("span", {
        key: 0,
        role: "button",
        "aria-label": unref(ae)("el.inputNumber.decrease"),
        class: normalizeClass([unref(le).e("decrease"), unref(le).is("disabled", unref(pe))]),
        onKeydown: withKeys(ze, ["enter"])
      }, [
        createVNode(unref(ElIcon), null, {
          default: withCtx(() => [
            unref($e) ? (openBlock(), createBlock(unref(arrow_down_default), { key: 0 })) : (openBlock(), createBlock(unref(minus_default), { key: 1 }))
          ]),
          _: 1
        })
      ], 42, _hoisted_1$a)), [
        [unref(RepeatClick), ze]
      ]) : createCommentVNode("v-if", !0),
      Lt.controls ? withDirectives((openBlock(), createElementBlock("span", {
        key: 1,
        role: "button",
        "aria-label": unref(ae)("el.inputNumber.increase"),
        class: normalizeClass([unref(le).e("increase"), unref(le).is("disabled", unref(Ce))]),
        onKeydown: withKeys(xe, ["enter"])
      }, [
        createVNode(unref(ElIcon), null, {
          default: withCtx(() => [
            unref($e) ? (openBlock(), createBlock(unref(arrow_up_default), { key: 0 })) : (openBlock(), createBlock(unref(plus_default), { key: 1 }))
          ]),
          _: 1
        })
      ], 42, _hoisted_2$6)), [
        [unref(RepeatClick), xe]
      ]) : createCommentVNode("v-if", !0),
      createVNode(unref(ElInput), {
        id: Lt.id,
        ref_key: "input",
        ref: ie,
        type: "number",
        step: Lt.step,
        "model-value": unref(he),
        placeholder: Lt.placeholder,
        disabled: unref(Ne),
        size: unref(Ve),
        max: Lt.max,
        min: Lt.min,
        name: Lt.name,
        label: Lt.label,
        "validate-event": !1,
        onKeydown: [
          withKeys(withModifiers(xe, ["prevent"]), ["up"]),
          withKeys(withModifiers(ze, ["prevent"]), ["down"])
        ],
        onBlur: wn,
        onFocus: Tn,
        onInput: Pt,
        onChange: vn
      }, null, 8, ["id", "step", "model-value", "placeholder", "disabled", "size", "max", "min", "name", "label", "onKeydown"])
    ], 34));
  }
});
var InputNumber = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/input-number/src/input-number.vue"]]);
const ElInputNumber = withInstall(InputNumber), selectGroupKey = "ElSelectGroup", selectKey = "ElSelect";
function useOption(e, k) {
  const oe = inject(selectKey), re = inject(selectGroupKey, { disabled: !1 }), ae = computed(() => Object.prototype.toString.call(e.value).toLowerCase() === "[object object]"), le = computed(() => oe.props.multiple ? _e(oe.props.modelValue, e.value) : $e(e.value, oe.props.modelValue)), ie = computed(() => {
    if (oe.props.multiple) {
      const he = oe.props.modelValue || [];
      return !le.value && he.length >= oe.props.multipleLimit && oe.props.multipleLimit > 0;
    } else
      return !1;
  }), ue = computed(() => e.label || (ae.value ? "" : e.value)), de = computed(() => e.value || e.label || ""), pe = computed(() => e.disabled || k.groupDisabled || ie.value), Ce = getCurrentInstance(), _e = (he = [], Oe) => {
    if (ae.value) {
      const Ie = oe.props.valueKey;
      return he && he.some((qe) => get(qe, Ie) === get(Oe, Ie));
    } else
      return he && he.includes(Oe);
  }, $e = (he, Oe) => {
    if (ae.value) {
      const { valueKey: Ie } = oe.props;
      return get(he, Ie) === get(Oe, Ie);
    } else
      return he === Oe;
  }, Ve = () => {
    !e.disabled && !re.disabled && (oe.hoverIndex = oe.optionsArray.indexOf(Ce.proxy));
  };
  watch(() => ue.value, () => {
    !e.created && !oe.props.remote && oe.setSelected();
  }), watch(() => e.value, (he, Oe) => {
    const { remote: Ie, valueKey: qe } = oe.props;
    if (!e.created && !Ie) {
      if (qe && typeof he == "object" && typeof Oe == "object" && he[qe] === Oe[qe])
        return;
      oe.setSelected();
    }
  }), watch(() => re.disabled, () => {
    k.groupDisabled = re.disabled;
  }, { immediate: !0 });
  const { queryChange: Ne } = toRaw(oe);
  return watch(Ne, (he) => {
    const { query: Oe } = unref(he), Ie = new RegExp(escapeStringRegexp(Oe), "i");
    k.visible = Ie.test(ue.value) || e.created, k.visible || oe.filteredOptionsCount--;
  }), {
    select: oe,
    currentLabel: ue,
    currentValue: de,
    itemSelected: le,
    isDisabled: pe,
    hoverItem: Ve
  };
}
const _sfc_main$j = defineComponent({
  name: "ElOption",
  componentName: "ElOption",
  props: {
    value: {
      required: !0,
      type: [String, Number, Boolean, Object]
    },
    label: [String, Number],
    created: Boolean,
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    const k = useNamespace("select"), oe = reactive({
      index: -1,
      groupDisabled: !1,
      visible: !0,
      hitState: !1,
      hover: !1
    }), { currentLabel: re, itemSelected: ae, isDisabled: le, select: ie, hoverItem: ue } = useOption(e, oe), { visible: de, hover: pe } = toRefs(oe), Ce = getCurrentInstance().proxy, _e = Ce.value;
    ie.onOptionCreate(Ce), onBeforeUnmount(() => {
      const { selected: Ve } = ie, he = (ie.props.multiple ? Ve : [Ve]).some((Oe) => Oe.value === Ce.value);
      nextTick(() => {
        ie.cachedOptions.get(_e) === Ce && !he && ie.cachedOptions.delete(_e);
      }), ie.onOptionDestroy(_e, Ce);
    });
    function $e() {
      e.disabled !== !0 && oe.groupDisabled !== !0 && ie.handleOptionSelect(Ce, !0);
    }
    return {
      ns: k,
      currentLabel: re,
      itemSelected: ae,
      isDisabled: le,
      select: ie,
      hoverItem: ue,
      visible: de,
      hover: pe,
      selectOptionClick: $e,
      states: oe
    };
  }
});
function _sfc_render$9(e, k, oe, re, ae, le) {
  return withDirectives((openBlock(), createElementBlock("li", {
    class: normalizeClass([
      e.ns.be("dropdown", "item"),
      e.ns.is("disabled", e.isDisabled),
      {
        selected: e.itemSelected,
        hover: e.hover
      }
    ]),
    onMouseenter: k[0] || (k[0] = (...ie) => e.hoverItem && e.hoverItem(...ie)),
    onClick: k[1] || (k[1] = withModifiers((...ie) => e.selectOptionClick && e.selectOptionClick(...ie), ["stop"]))
  }, [
    renderSlot(e.$slots, "default", {}, () => [
      createElementVNode("span", null, toDisplayString(e.currentLabel), 1)
    ])
  ], 34)), [
    [vShow, e.visible]
  ]);
}
var Option = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$9], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/select/src/option.vue"]]);
const _sfc_main$i = defineComponent({
  name: "ElSelectDropdown",
  componentName: "ElSelectDropdown",
  setup() {
    const e = inject(selectKey), k = useNamespace("select"), oe = computed(() => e.props.popperClass), re = computed(() => e.props.multiple), ae = computed(() => e.props.fitInputWidth), le = ref("");
    function ie() {
      var ue;
      le.value = `${(ue = e.selectWrapper) == null ? void 0 : ue.offsetWidth}px`;
    }
    return onMounted(() => {
      ie(), useResizeObserver(e.selectWrapper, ie);
    }), {
      ns: k,
      minWidth: le,
      popperClass: oe,
      isMultiple: re,
      isFitInputWidth: ae
    };
  }
});
function _sfc_render$8(e, k, oe, re, ae, le) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass([e.ns.b("dropdown"), e.ns.is("multiple", e.isMultiple), e.popperClass]),
    style: normalizeStyle({ [e.isFitInputWidth ? "width" : "minWidth"]: e.minWidth })
  }, [
    renderSlot(e.$slots, "default")
  ], 6);
}
var ElSelectMenu = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$8], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/select/src/select-dropdown.vue"]]);
function useSelectStates(e) {
  const { t: k } = useLocale();
  return reactive({
    options: /* @__PURE__ */ new Map(),
    cachedOptions: /* @__PURE__ */ new Map(),
    createdLabel: null,
    createdSelected: !1,
    selected: e.multiple ? [] : {},
    inputLength: 20,
    inputWidth: 0,
    optionsCount: 0,
    filteredOptionsCount: 0,
    visible: !1,
    softFocus: !1,
    selectedLabel: "",
    hoverIndex: -1,
    query: "",
    previousQuery: null,
    inputHovering: !1,
    cachedPlaceHolder: "",
    currentPlaceholder: k("el.select.placeholder"),
    menuVisibleOnFocus: !1,
    isOnComposition: !1,
    isSilentBlur: !1,
    prefixWidth: 11,
    tagInMultiLine: !1
  });
}
const useSelect = (e, k, oe) => {
  const { t: re } = useLocale(), ae = useNamespace("select"), le = ref(null), ie = ref(null), ue = ref(null), de = ref(null), pe = ref(null), Ce = ref(null), _e = ref(-1), $e = shallowRef({ query: "" }), Ve = shallowRef(""), Ne = inject(formContextKey, {}), he = inject(formItemContextKey, {}), Oe = computed(() => !e.filterable || e.multiple || !k.visible), Ie = computed(() => e.disabled || Ne.disabled), qe = computed(() => {
    const Ue = e.multiple ? Array.isArray(e.modelValue) && e.modelValue.length > 0 : e.modelValue !== void 0 && e.modelValue !== null && e.modelValue !== "";
    return e.clearable && !Ie.value && k.inputHovering && Ue;
  }), xe = computed(() => e.remote && e.filterable ? "" : e.suffixIcon), ze = computed(() => ae.is("reverse", xe.value && k.visible)), At = computed(() => e.remote ? 300 : 0), Fe = computed(() => e.loading ? e.loadingText || re("el.select.loading") : e.remote && k.query === "" && k.options.size === 0 ? !1 : e.filterable && k.query && k.options.size > 0 && k.filteredOptionsCount === 0 ? e.noMatchText || re("el.select.noMatch") : k.options.size === 0 ? e.noDataText || re("el.select.noData") : null), Pt = computed(() => Array.from(k.options.values())), vn = computed(() => Array.from(k.cachedOptions.values())), En = computed(() => {
    const Ue = Pt.value.filter((Sn) => !Sn.created).some((Sn) => Sn.currentLabel === k.query);
    return e.filterable && e.allowCreate && k.query !== "" && !Ue;
  }), Nn = useSize(), Tn = computed(() => ["small"].includes(Nn.value) ? "small" : "default"), wn = computed({
    get() {
      return k.visible && Fe.value !== !1;
    },
    set(Ue) {
      k.visible = Ue;
    }
  });
  watch([() => Ie.value, () => Nn.value, () => Ne.size], () => {
    nextTick(() => {
      Lt();
    });
  }), watch(() => e.placeholder, (Ue) => {
    k.cachedPlaceHolder = k.currentPlaceholder = Ue;
  }), watch(() => e.modelValue, (Ue, Sn) => {
    var xn;
    e.multiple && (Lt(), Ue && Ue.length > 0 || ie.value && k.query !== "" ? k.currentPlaceholder = "" : k.currentPlaceholder = k.cachedPlaceHolder, e.filterable && !e.reserveKeyword && (k.query = "", Dt(k.query))), bn(), e.filterable && !e.multiple && (k.inputLength = 20), !isEqual(Ue, Sn) && e.validateEvent && ((xn = he.validate) == null || xn.call(he, "change").catch((jn) => debugWarn(jn)));
  }, {
    flush: "post",
    deep: !0
  }), watch(() => k.visible, (Ue) => {
    var Sn, xn, jn;
    Ue ? ((xn = (Sn = ue.value) == null ? void 0 : Sn.updatePopper) == null || xn.call(Sn), e.filterable && (k.filteredOptionsCount = k.optionsCount, k.query = e.remote ? "" : k.selectedLabel, e.multiple ? (jn = ie.value) == null || jn.focus() : k.selectedLabel && (k.currentPlaceholder = `${k.selectedLabel}`, k.selectedLabel = ""), Dt(k.query), !e.multiple && !e.remote && ($e.value.query = "", triggerRef($e), triggerRef(Ve)))) : (ie.value && ie.value.blur(), k.query = "", k.previousQuery = null, k.selectedLabel = "", k.inputLength = 20, k.menuVisibleOnFocus = !1, Et(), nextTick(() => {
      ie.value && ie.value.value === "" && k.selected.length === 0 && (k.currentPlaceholder = k.cachedPlaceHolder);
    }), e.multiple || (k.selected && (e.filterable && e.allowCreate && k.createdSelected && k.createdLabel ? k.selectedLabel = k.createdLabel : k.selectedLabel = k.selected.currentLabel, e.filterable && (k.query = k.selectedLabel)), e.filterable && (k.currentPlaceholder = k.cachedPlaceHolder))), oe.emit("visible-change", Ue);
  }), watch(() => k.options.entries(), () => {
    var Ue, Sn, xn;
    if (!isClient$1)
      return;
    (Sn = (Ue = ue.value) == null ? void 0 : Ue.updatePopper) == null || Sn.call(Ue), e.multiple && Lt();
    const jn = ((xn = pe.value) == null ? void 0 : xn.querySelectorAll("input")) || [];
    Array.from(jn).includes(document.activeElement) || bn(), e.defaultFirstOption && (e.filterable || e.remote) && k.filteredOptionsCount && jt();
  }, {
    flush: "post"
  }), watch(() => k.hoverIndex, (Ue) => {
    typeof Ue == "number" && Ue > -1 && (_e.value = Pt.value[Ue] || {}), Pt.value.forEach((Sn) => {
      Sn.hover = _e.value === Sn;
    });
  });
  const Lt = () => {
    e.collapseTags && !e.filterable || nextTick(() => {
      var Ue, Sn;
      if (!le.value)
        return;
      const xn = le.value.$el.querySelector("input"), jn = de.value, Ln = getComponentSize(Nn.value || Ne.size);
      xn.style.height = `${(k.selected.length === 0 ? Ln : Math.max(jn ? jn.clientHeight + (jn.clientHeight > Ln ? 6 : 0) : 0, Ln)) - 2}px`, k.tagInMultiLine = Number.parseFloat(xn.style.height) >= Ln, k.visible && Fe.value !== !1 && ((Sn = (Ue = ue.value) == null ? void 0 : Ue.updatePopper) == null || Sn.call(Ue));
    });
  }, Dt = (Ue) => {
    if (!(k.previousQuery === Ue || k.isOnComposition)) {
      if (k.previousQuery === null && (typeof e.filterMethod == "function" || typeof e.remoteMethod == "function")) {
        k.previousQuery = Ue;
        return;
      }
      k.previousQuery = Ue, nextTick(() => {
        var Sn, xn;
        k.visible && ((xn = (Sn = ue.value) == null ? void 0 : Sn.updatePopper) == null || xn.call(Sn));
      }), k.hoverIndex = -1, e.multiple && e.filterable && nextTick(() => {
        const Sn = ie.value.value.length * 15 + 20;
        k.inputLength = e.collapseTags ? Math.min(50, Sn) : Sn, Cn(), Lt();
      }), e.remote && typeof e.remoteMethod == "function" ? (k.hoverIndex = -1, e.remoteMethod(Ue)) : typeof e.filterMethod == "function" ? (e.filterMethod(Ue), triggerRef(Ve)) : (k.filteredOptionsCount = k.optionsCount, $e.value.query = Ue, triggerRef($e), triggerRef(Ve)), e.defaultFirstOption && (e.filterable || e.remote) && k.filteredOptionsCount && jt();
    }
  }, Cn = () => {
    k.currentPlaceholder !== "" && (k.currentPlaceholder = ie.value.value ? "" : k.cachedPlaceHolder);
  }, jt = () => {
    const Ue = Pt.value.filter((jn) => jn.visible && !jn.disabled && !jn.states.groupDisabled), Sn = Ue.find((jn) => jn.created), xn = Ue[0];
    k.hoverIndex = Bn(Pt.value, Sn || xn);
  }, bn = () => {
    var Ue;
    if (e.multiple)
      k.selectedLabel = "";
    else {
      const xn = kt(e.modelValue);
      (Ue = xn.props) != null && Ue.created ? (k.createdLabel = xn.props.value, k.createdSelected = !0) : k.createdSelected = !1, k.selectedLabel = xn.currentLabel, k.selected = xn, e.filterable && (k.query = k.selectedLabel);
      return;
    }
    const Sn = [];
    Array.isArray(e.modelValue) && e.modelValue.forEach((xn) => {
      Sn.push(kt(xn));
    }), k.selected = Sn, nextTick(() => {
      Lt();
    });
  }, kt = (Ue) => {
    let Sn;
    const xn = toRawType(Ue).toLowerCase() === "object", jn = toRawType(Ue).toLowerCase() === "null", Ln = toRawType(Ue).toLowerCase() === "undefined";
    for (let uo = k.cachedOptions.size - 1; uo >= 0; uo--) {
      const io = vn.value[uo];
      if (xn ? get(io.value, e.valueKey) === get(Ue, e.valueKey) : io.value === Ue) {
        Sn = {
          value: Ue,
          currentLabel: io.currentLabel,
          isDisabled: io.isDisabled
        };
        break;
      }
    }
    if (Sn)
      return Sn;
    const Kn = xn ? Ue.label : !jn && !Ln ? Ue : "", Un = {
      value: Ue,
      currentLabel: Kn
    };
    return e.multiple && (Un.hitState = !1), Un;
  }, Et = () => {
    setTimeout(() => {
      const Ue = e.valueKey;
      e.multiple ? k.selected.length > 0 ? k.hoverIndex = Math.min.apply(null, k.selected.map((Sn) => Pt.value.findIndex((xn) => get(xn, Ue) === get(Sn, Ue)))) : k.hoverIndex = -1 : k.hoverIndex = Pt.value.findIndex((Sn) => ro(Sn) === ro(k.selected));
    }, 300);
  }, _n = () => {
    var Ue, Sn;
    Pn(), (Sn = (Ue = ue.value) == null ? void 0 : Ue.updatePopper) == null || Sn.call(Ue), e.multiple && !e.filterable && Lt();
  }, Pn = () => {
    var Ue;
    k.inputWidth = (Ue = le.value) == null ? void 0 : Ue.$el.getBoundingClientRect().width;
  }, hn = () => {
    e.filterable && k.query !== k.selectedLabel && (k.query = k.selectedLabel, Dt(k.query));
  }, On = debounce(() => {
    hn();
  }, At.value), Dn = debounce((Ue) => {
    Dt(Ue.target.value);
  }, At.value), Rn = (Ue) => {
    isEqual(e.modelValue, Ue) || oe.emit(CHANGE_EVENT, Ue);
  }, Fn = (Ue) => {
    if (Ue.target.value.length <= 0 && !no()) {
      const Sn = e.modelValue.slice();
      Sn.pop(), oe.emit(UPDATE_MODEL_EVENT, Sn), Rn(Sn);
    }
    Ue.target.value.length === 1 && e.modelValue.length === 0 && (k.currentPlaceholder = k.cachedPlaceHolder);
  }, kn = (Ue, Sn) => {
    const xn = k.selected.indexOf(Sn);
    if (xn > -1 && !Ie.value) {
      const jn = e.modelValue.slice();
      jn.splice(xn, 1), oe.emit(UPDATE_MODEL_EVENT, jn), Rn(jn), oe.emit("remove-tag", Sn.value);
    }
    Ue.stopPropagation();
  }, An = (Ue) => {
    Ue.stopPropagation();
    const Sn = e.multiple ? [] : "";
    if (typeof Sn != "string")
      for (const xn of k.selected)
        xn.isDisabled && Sn.push(xn.value);
    oe.emit(UPDATE_MODEL_EVENT, Sn), Rn(Sn), k.visible = !1, oe.emit("clear");
  }, Vn = (Ue, Sn) => {
    var xn;
    if (e.multiple) {
      const jn = (e.modelValue || []).slice(), Ln = Bn(jn, Ue.value);
      Ln > -1 ? jn.splice(Ln, 1) : (e.multipleLimit <= 0 || jn.length < e.multipleLimit) && jn.push(Ue.value), oe.emit(UPDATE_MODEL_EVENT, jn), Rn(jn), Ue.created && (k.query = "", Dt(""), k.inputLength = 20), e.filterable && ((xn = ie.value) == null || xn.focus());
    } else
      oe.emit(UPDATE_MODEL_EVENT, Ue.value), Rn(Ue.value), k.visible = !1;
    k.isSilentBlur = Sn, Wn(), !k.visible && nextTick(() => {
      Yn(Ue);
    });
  }, Bn = (Ue = [], Sn) => {
    if (!isObject$1(Sn))
      return Ue.indexOf(Sn);
    const xn = e.valueKey;
    let jn = -1;
    return Ue.some((Ln, Kn) => get(Ln, xn) === get(Sn, xn) ? (jn = Kn, !0) : !1), jn;
  }, Wn = () => {
    k.softFocus = !0;
    const Ue = ie.value || le.value;
    Ue && (Ue == null || Ue.focus());
  }, Yn = (Ue) => {
    var Sn, xn, jn, Ln, Kn;
    const Un = Array.isArray(Ue) ? Ue[0] : Ue;
    let uo = null;
    if (Un != null && Un.value) {
      const io = Pt.value.filter((so) => so.value === Un.value);
      io.length > 0 && (uo = io[0].$el);
    }
    if (ue.value && uo) {
      const io = (Ln = (jn = (xn = (Sn = ue.value) == null ? void 0 : Sn.popperRef) == null ? void 0 : xn.contentRef) == null ? void 0 : jn.querySelector) == null ? void 0 : Ln.call(jn, `.${ae.be("dropdown", "wrap")}`);
      io && scrollIntoView(io, uo);
    }
    (Kn = Ce.value) == null || Kn.handleScroll();
  }, Xn = (Ue) => {
    k.optionsCount++, k.filteredOptionsCount++, k.options.set(Ue.value, Ue), k.cachedOptions.set(Ue.value, Ue);
  }, eo = (Ue, Sn) => {
    k.options.get(Ue) === Sn && (k.optionsCount--, k.filteredOptionsCount--, k.options.delete(Ue));
  }, Gn = (Ue) => {
    Ue.code !== EVENT_CODE.backspace && no(!1), k.inputLength = ie.value.value.length * 15 + 20, Lt();
  }, no = (Ue) => {
    if (!Array.isArray(k.selected))
      return;
    const Sn = k.selected[k.selected.length - 1];
    if (!!Sn)
      return Ue === !0 || Ue === !1 ? (Sn.hitState = Ue, Ue) : (Sn.hitState = !Sn.hitState, Sn.hitState);
  }, oo = (Ue) => {
    const Sn = Ue.target.value;
    if (Ue.type === "compositionend")
      k.isOnComposition = !1, nextTick(() => Dt(Sn));
    else {
      const xn = Sn[Sn.length - 1] || "";
      k.isOnComposition = !isKorean(xn);
    }
  }, zn = () => {
    nextTick(() => Yn(k.selected));
  }, Hn = (Ue) => {
    k.softFocus ? k.softFocus = !1 : ((e.automaticDropdown || e.filterable) && (e.filterable && !k.visible && (k.menuVisibleOnFocus = !0), k.visible = !0), oe.emit("focus", Ue));
  }, qn = () => {
    var Ue;
    k.visible = !1, (Ue = le.value) == null || Ue.blur();
  }, Zn = (Ue) => {
    nextTick(() => {
      k.isSilentBlur ? k.isSilentBlur = !1 : oe.emit("blur", Ue);
    }), k.softFocus = !1;
  }, lo = (Ue) => {
    An(Ue);
  }, ao = () => {
    k.visible = !1;
  }, In = (Ue) => {
    k.visible && (Ue.preventDefault(), Ue.stopPropagation(), k.visible = !1);
  }, Jn = () => {
    var Ue;
    Ie.value || (k.menuVisibleOnFocus ? k.menuVisibleOnFocus = !1 : k.visible = !k.visible, k.visible && ((Ue = ie.value || le.value) == null || Ue.focus()));
  }, Qn = () => {
    k.visible ? Pt.value[k.hoverIndex] && Vn(Pt.value[k.hoverIndex], void 0) : Jn();
  }, ro = (Ue) => isObject$1(Ue.value) ? get(Ue.value, e.valueKey) : Ue.value, $n = computed(() => Pt.value.filter((Ue) => Ue.visible).every((Ue) => Ue.disabled)), Mn = (Ue) => {
    if (!k.visible) {
      k.visible = !0;
      return;
    }
    if (!(k.options.size === 0 || k.filteredOptionsCount === 0) && !k.isOnComposition && !$n.value) {
      Ue === "next" ? (k.hoverIndex++, k.hoverIndex === k.options.size && (k.hoverIndex = 0)) : Ue === "prev" && (k.hoverIndex--, k.hoverIndex < 0 && (k.hoverIndex = k.options.size - 1));
      const Sn = Pt.value[k.hoverIndex];
      (Sn.disabled === !0 || Sn.states.groupDisabled === !0 || !Sn.visible) && Mn(Ue), nextTick(() => Yn(_e.value));
    }
  };
  return {
    optionsArray: Pt,
    selectSize: Nn,
    handleResize: _n,
    debouncedOnInputChange: On,
    debouncedQueryChange: Dn,
    deletePrevTag: Fn,
    deleteTag: kn,
    deleteSelected: An,
    handleOptionSelect: Vn,
    scrollToOption: Yn,
    readonly: Oe,
    resetInputHeight: Lt,
    showClose: qe,
    iconComponent: xe,
    iconReverse: ze,
    showNewOption: En,
    collapseTagSize: Tn,
    setSelected: bn,
    managePlaceholder: Cn,
    selectDisabled: Ie,
    emptyText: Fe,
    toggleLastOptionHitState: no,
    resetInputState: Gn,
    handleComposition: oo,
    onOptionCreate: Xn,
    onOptionDestroy: eo,
    handleMenuEnter: zn,
    handleFocus: Hn,
    blur: qn,
    handleBlur: Zn,
    handleClearClick: lo,
    handleClose: ao,
    handleKeydownEscape: In,
    toggleMenu: Jn,
    selectOption: Qn,
    getValueKey: ro,
    navigateOptions: Mn,
    dropMenuVisible: wn,
    queryChange: $e,
    groupQueryChange: Ve,
    reference: le,
    input: ie,
    tooltipRef: ue,
    tags: de,
    selectWrapper: pe,
    scrollbar: Ce
  };
}, COMPONENT_NAME = "ElSelect", _sfc_main$h = defineComponent({
  name: COMPONENT_NAME,
  componentName: COMPONENT_NAME,
  components: {
    ElInput,
    ElSelectMenu,
    ElOption: Option,
    ElTag,
    ElScrollbar,
    ElTooltip,
    ElIcon
  },
  directives: { ClickOutside },
  props: {
    name: String,
    id: String,
    modelValue: {
      type: [Array, String, Number, Boolean, Object],
      default: void 0
    },
    autocomplete: {
      type: String,
      default: "off"
    },
    automaticDropdown: Boolean,
    size: {
      type: String,
      validator: isValidComponentSize
    },
    effect: {
      type: String,
      default: "light"
    },
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    allowCreate: Boolean,
    loading: Boolean,
    popperClass: {
      type: String,
      default: ""
    },
    remote: Boolean,
    loadingText: String,
    noMatchText: String,
    noDataText: String,
    remoteMethod: Function,
    filterMethod: Function,
    multiple: Boolean,
    multipleLimit: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String
    },
    defaultFirstOption: Boolean,
    reserveKeyword: {
      type: Boolean,
      default: !0
    },
    valueKey: {
      type: String,
      default: "value"
    },
    collapseTags: Boolean,
    collapseTagsTooltip: {
      type: Boolean,
      default: !1
    },
    teleported: useTooltipContentProps.teleported,
    persistent: {
      type: Boolean,
      default: !0
    },
    clearIcon: {
      type: [String, Object],
      default: circle_close_default
    },
    fitInputWidth: {
      type: Boolean,
      default: !1
    },
    suffixIcon: {
      type: [String, Object],
      default: arrow_up_default
    },
    tagType: { ...tagProps.type, default: "info" },
    validateEvent: {
      type: Boolean,
      default: !0
    }
  },
  emits: [
    UPDATE_MODEL_EVENT,
    CHANGE_EVENT,
    "remove-tag",
    "clear",
    "visible-change",
    "focus",
    "blur"
  ],
  setup(e, k) {
    const oe = useNamespace("select"), re = useNamespace("input"), { t: ae } = useLocale(), le = useSelectStates(e), {
      optionsArray: ie,
      selectSize: ue,
      readonly: de,
      handleResize: pe,
      collapseTagSize: Ce,
      debouncedOnInputChange: _e,
      debouncedQueryChange: $e,
      deletePrevTag: Ve,
      deleteTag: Ne,
      deleteSelected: he,
      handleOptionSelect: Oe,
      scrollToOption: Ie,
      setSelected: qe,
      resetInputHeight: xe,
      managePlaceholder: ze,
      showClose: At,
      selectDisabled: Fe,
      iconComponent: Pt,
      iconReverse: vn,
      showNewOption: En,
      emptyText: Nn,
      toggleLastOptionHitState: Tn,
      resetInputState: wn,
      handleComposition: Lt,
      onOptionCreate: Dt,
      onOptionDestroy: Cn,
      handleMenuEnter: jt,
      handleFocus: bn,
      blur: kt,
      handleBlur: Et,
      handleClearClick: _n,
      handleClose: Pn,
      handleKeydownEscape: hn,
      toggleMenu: On,
      selectOption: Dn,
      getValueKey: Rn,
      navigateOptions: Fn,
      dropMenuVisible: kn,
      reference: An,
      input: Vn,
      tooltipRef: Bn,
      tags: Wn,
      selectWrapper: Yn,
      scrollbar: Xn,
      queryChange: eo,
      groupQueryChange: Gn
    } = useSelect(e, le, k), { focus: no } = useFocus(An), {
      inputWidth: oo,
      selected: zn,
      inputLength: Hn,
      filteredOptionsCount: qn,
      visible: Zn,
      softFocus: lo,
      selectedLabel: ao,
      hoverIndex: In,
      query: Jn,
      inputHovering: Qn,
      currentPlaceholder: ro,
      menuVisibleOnFocus: $n,
      isOnComposition: Mn,
      isSilentBlur: Ue,
      options: Sn,
      cachedOptions: xn,
      optionsCount: jn,
      prefixWidth: Ln,
      tagInMultiLine: Kn
    } = toRefs(le), Un = computed(() => {
      const so = [oe.b()], to = unref(ue);
      return to && so.push(oe.m(to)), e.disabled && so.push(oe.m("disabled")), so;
    }), uo = computed(() => ({
      maxWidth: `${unref(oo) - 32}px`,
      width: "100%"
    }));
    provide(selectKey, reactive({
      props: e,
      options: Sn,
      optionsArray: ie,
      cachedOptions: xn,
      optionsCount: jn,
      filteredOptionsCount: qn,
      hoverIndex: In,
      handleOptionSelect: Oe,
      onOptionCreate: Dt,
      onOptionDestroy: Cn,
      selectWrapper: Yn,
      selected: zn,
      setSelected: qe,
      queryChange: eo,
      groupQueryChange: Gn
    })), onMounted(() => {
      le.cachedPlaceHolder = ro.value = e.placeholder || ae("el.select.placeholder"), e.multiple && Array.isArray(e.modelValue) && e.modelValue.length > 0 && (ro.value = ""), useResizeObserver(Yn, pe), e.remote && e.multiple && xe(), nextTick(() => {
        const so = An.value && An.value.$el;
        if (!!so && (oo.value = so.getBoundingClientRect().width, k.slots.prefix)) {
          const to = so.querySelector(`.${re.e("prefix")}`);
          Ln.value = Math.max(to.getBoundingClientRect().width + 5, 30);
        }
      }), qe();
    }), e.multiple && !Array.isArray(e.modelValue) && k.emit(UPDATE_MODEL_EVENT, []), !e.multiple && Array.isArray(e.modelValue) && k.emit(UPDATE_MODEL_EVENT, "");
    const io = computed(() => {
      var so, to;
      return (to = (so = Bn.value) == null ? void 0 : so.popperRef) == null ? void 0 : to.contentRef;
    });
    return {
      tagInMultiLine: Kn,
      prefixWidth: Ln,
      selectSize: ue,
      readonly: de,
      handleResize: pe,
      collapseTagSize: Ce,
      debouncedOnInputChange: _e,
      debouncedQueryChange: $e,
      deletePrevTag: Ve,
      deleteTag: Ne,
      deleteSelected: he,
      handleOptionSelect: Oe,
      scrollToOption: Ie,
      inputWidth: oo,
      selected: zn,
      inputLength: Hn,
      filteredOptionsCount: qn,
      visible: Zn,
      softFocus: lo,
      selectedLabel: ao,
      hoverIndex: In,
      query: Jn,
      inputHovering: Qn,
      currentPlaceholder: ro,
      menuVisibleOnFocus: $n,
      isOnComposition: Mn,
      isSilentBlur: Ue,
      options: Sn,
      resetInputHeight: xe,
      managePlaceholder: ze,
      showClose: At,
      selectDisabled: Fe,
      iconComponent: Pt,
      iconReverse: vn,
      showNewOption: En,
      emptyText: Nn,
      toggleLastOptionHitState: Tn,
      resetInputState: wn,
      handleComposition: Lt,
      handleMenuEnter: jt,
      handleFocus: bn,
      blur: kt,
      handleBlur: Et,
      handleClearClick: _n,
      handleClose: Pn,
      handleKeydownEscape: hn,
      toggleMenu: On,
      selectOption: Dn,
      getValueKey: Rn,
      navigateOptions: Fn,
      dropMenuVisible: kn,
      focus: no,
      reference: An,
      input: Vn,
      tooltipRef: Bn,
      popperPaneRef: io,
      tags: Wn,
      selectWrapper: Yn,
      scrollbar: Xn,
      wrapperKls: Un,
      selectTagsStyle: uo,
      nsSelect: oe
    };
  }
}), _hoisted_1$9 = { class: "select-trigger" }, _hoisted_2$5 = ["disabled", "autocomplete"], _hoisted_3$2 = { style: { height: "100%", display: "flex", "justify-content": "center", "align-items": "center" } };
function _sfc_render$7(e, k, oe, re, ae, le) {
  const ie = resolveComponent("el-tag"), ue = resolveComponent("el-tooltip"), de = resolveComponent("el-icon"), pe = resolveComponent("el-input"), Ce = resolveComponent("el-option"), _e = resolveComponent("el-scrollbar"), $e = resolveComponent("el-select-menu"), Ve = resolveDirective("click-outside");
  return withDirectives((openBlock(), createElementBlock("div", {
    ref: "selectWrapper",
    class: normalizeClass(e.wrapperKls),
    onClick: k[22] || (k[22] = withModifiers((...Ne) => e.toggleMenu && e.toggleMenu(...Ne), ["stop"]))
  }, [
    createVNode(ue, {
      ref: "tooltipRef",
      visible: e.dropMenuVisible,
      placement: "bottom-start",
      teleported: e.teleported,
      "popper-class": [e.nsSelect.e("popper"), e.popperClass],
      "fallback-placements": ["bottom-start", "top-start", "right", "left"],
      effect: e.effect,
      pure: "",
      trigger: "click",
      transition: `${e.nsSelect.namespace.value}-zoom-in-top`,
      "stop-popper-mouse-event": !1,
      "gpu-acceleration": !1,
      persistent: e.persistent,
      onShow: e.handleMenuEnter
    }, {
      default: withCtx(() => [
        createElementVNode("div", _hoisted_1$9, [
          e.multiple ? (openBlock(), createElementBlock("div", {
            key: 0,
            ref: "tags",
            class: normalizeClass(e.nsSelect.e("tags")),
            style: normalizeStyle(e.selectTagsStyle)
          }, [
            e.collapseTags && e.selected.length ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: normalizeClass([
                e.nsSelect.b("tags-wrapper"),
                { "has-prefix": e.prefixWidth && e.selected.length }
              ])
            }, [
              createVNode(ie, {
                closable: !e.selectDisabled && !e.selected[0].isDisabled,
                size: e.collapseTagSize,
                hit: e.selected[0].hitState,
                type: e.tagType,
                "disable-transitions": "",
                onClose: k[0] || (k[0] = (Ne) => e.deleteTag(Ne, e.selected[0]))
              }, {
                default: withCtx(() => [
                  createElementVNode("span", {
                    class: normalizeClass(e.nsSelect.e("tags-text")),
                    style: normalizeStyle({ maxWidth: e.inputWidth - 123 + "px" })
                  }, toDisplayString(e.selected[0].currentLabel), 7)
                ]),
                _: 1
              }, 8, ["closable", "size", "hit", "type"]),
              e.selected.length > 1 ? (openBlock(), createBlock(ie, {
                key: 0,
                closable: !1,
                size: e.collapseTagSize,
                type: e.tagType,
                "disable-transitions": ""
              }, {
                default: withCtx(() => [
                  e.collapseTagsTooltip ? (openBlock(), createBlock(ue, {
                    key: 0,
                    disabled: e.dropMenuVisible,
                    "fallback-placements": ["bottom", "top", "right", "left"],
                    effect: e.effect,
                    placement: "bottom",
                    teleported: e.teleported
                  }, {
                    default: withCtx(() => [
                      createElementVNode("span", {
                        class: normalizeClass(e.nsSelect.e("tags-text"))
                      }, "+ " + toDisplayString(e.selected.length - 1), 3)
                    ]),
                    content: withCtx(() => [
                      createElementVNode("div", {
                        class: normalizeClass(e.nsSelect.e("collapse-tags"))
                      }, [
                        (openBlock(!0), createElementBlock(Fragment, null, renderList(e.selected.slice(1), (Ne, he) => (openBlock(), createElementBlock("div", {
                          key: he,
                          class: normalizeClass(e.nsSelect.e("collapse-tag"))
                        }, [
                          (openBlock(), createBlock(ie, {
                            key: e.getValueKey(Ne),
                            class: "in-tooltip",
                            closable: !e.selectDisabled && !Ne.isDisabled,
                            size: e.collapseTagSize,
                            hit: Ne.hitState,
                            type: e.tagType,
                            "disable-transitions": "",
                            style: { margin: "2px" },
                            onClose: (Oe) => e.deleteTag(Oe, Ne)
                          }, {
                            default: withCtx(() => [
                              createElementVNode("span", {
                                class: normalizeClass(e.nsSelect.e("tags-text")),
                                style: normalizeStyle({
                                  maxWidth: e.inputWidth - 75 + "px"
                                })
                              }, toDisplayString(Ne.currentLabel), 7)
                            ]),
                            _: 2
                          }, 1032, ["closable", "size", "hit", "type", "onClose"]))
                        ], 2))), 128))
                      ], 2)
                    ]),
                    _: 1
                  }, 8, ["disabled", "effect", "teleported"])) : (openBlock(), createElementBlock("span", {
                    key: 1,
                    class: normalizeClass(e.nsSelect.e("tags-text"))
                  }, "+ " + toDisplayString(e.selected.length - 1), 3))
                ]),
                _: 1
              }, 8, ["size", "type"])) : createCommentVNode("v-if", !0)
            ], 2)) : createCommentVNode("v-if", !0),
            createCommentVNode(" <div> "),
            e.collapseTags ? createCommentVNode("v-if", !0) : (openBlock(), createBlock(Transition, {
              key: 1,
              onAfterLeave: e.resetInputHeight
            }, {
              default: withCtx(() => [
                createElementVNode("span", {
                  class: normalizeClass([
                    e.nsSelect.b("tags-wrapper"),
                    { "has-prefix": e.prefixWidth && e.selected.length }
                  ])
                }, [
                  (openBlock(!0), createElementBlock(Fragment, null, renderList(e.selected, (Ne) => (openBlock(), createBlock(ie, {
                    key: e.getValueKey(Ne),
                    closable: !e.selectDisabled && !Ne.isDisabled,
                    size: e.collapseTagSize,
                    hit: Ne.hitState,
                    type: e.tagType,
                    "disable-transitions": "",
                    onClose: (he) => e.deleteTag(he, Ne)
                  }, {
                    default: withCtx(() => [
                      createElementVNode("span", {
                        class: normalizeClass(e.nsSelect.e("tags-text")),
                        style: normalizeStyle({ maxWidth: e.inputWidth - 75 + "px" })
                      }, toDisplayString(Ne.currentLabel), 7)
                    ]),
                    _: 2
                  }, 1032, ["closable", "size", "hit", "type", "onClose"]))), 128))
                ], 2)
              ]),
              _: 1
            }, 8, ["onAfterLeave"])),
            createCommentVNode(" </div> "),
            e.filterable ? withDirectives((openBlock(), createElementBlock("input", {
              key: 2,
              ref: "input",
              "onUpdate:modelValue": k[1] || (k[1] = (Ne) => e.query = Ne),
              type: "text",
              class: normalizeClass([e.nsSelect.e("input"), e.nsSelect.is(e.selectSize)]),
              disabled: e.selectDisabled,
              autocomplete: e.autocomplete,
              style: normalizeStyle({
                marginLeft: e.prefixWidth && !e.selected.length || e.tagInMultiLine ? `${e.prefixWidth}px` : "",
                flexGrow: 1,
                width: `${e.inputLength / (e.inputWidth - 32)}%`,
                maxWidth: `${e.inputWidth - 42}px`
              }),
              onFocus: k[2] || (k[2] = (...Ne) => e.handleFocus && e.handleFocus(...Ne)),
              onBlur: k[3] || (k[3] = (...Ne) => e.handleBlur && e.handleBlur(...Ne)),
              onKeyup: k[4] || (k[4] = (...Ne) => e.managePlaceholder && e.managePlaceholder(...Ne)),
              onKeydown: [
                k[5] || (k[5] = (...Ne) => e.resetInputState && e.resetInputState(...Ne)),
                k[6] || (k[6] = withKeys(withModifiers((Ne) => e.navigateOptions("next"), ["prevent"]), ["down"])),
                k[7] || (k[7] = withKeys(withModifiers((Ne) => e.navigateOptions("prev"), ["prevent"]), ["up"])),
                k[8] || (k[8] = withKeys((...Ne) => e.handleKeydownEscape && e.handleKeydownEscape(...Ne), ["esc"])),
                k[9] || (k[9] = withKeys(withModifiers((...Ne) => e.selectOption && e.selectOption(...Ne), ["stop", "prevent"]), ["enter"])),
                k[10] || (k[10] = withKeys((...Ne) => e.deletePrevTag && e.deletePrevTag(...Ne), ["delete"])),
                k[11] || (k[11] = withKeys((Ne) => e.visible = !1, ["tab"]))
              ],
              onCompositionstart: k[12] || (k[12] = (...Ne) => e.handleComposition && e.handleComposition(...Ne)),
              onCompositionupdate: k[13] || (k[13] = (...Ne) => e.handleComposition && e.handleComposition(...Ne)),
              onCompositionend: k[14] || (k[14] = (...Ne) => e.handleComposition && e.handleComposition(...Ne)),
              onInput: k[15] || (k[15] = (...Ne) => e.debouncedQueryChange && e.debouncedQueryChange(...Ne))
            }, null, 46, _hoisted_2$5)), [
              [vModelText, e.query]
            ]) : createCommentVNode("v-if", !0)
          ], 6)) : createCommentVNode("v-if", !0),
          createVNode(pe, {
            id: e.id,
            ref: "reference",
            modelValue: e.selectedLabel,
            "onUpdate:modelValue": k[16] || (k[16] = (Ne) => e.selectedLabel = Ne),
            type: "text",
            placeholder: e.currentPlaceholder,
            name: e.name,
            autocomplete: e.autocomplete,
            size: e.selectSize,
            disabled: e.selectDisabled,
            readonly: e.readonly,
            "validate-event": !1,
            class: normalizeClass([e.nsSelect.is("focus", e.visible)]),
            tabindex: e.multiple && e.filterable ? -1 : void 0,
            onFocus: e.handleFocus,
            onBlur: e.handleBlur,
            onInput: e.debouncedOnInputChange,
            onPaste: e.debouncedOnInputChange,
            onCompositionstart: e.handleComposition,
            onCompositionupdate: e.handleComposition,
            onCompositionend: e.handleComposition,
            onKeydown: [
              k[17] || (k[17] = withKeys(withModifiers((Ne) => e.navigateOptions("next"), ["stop", "prevent"]), ["down"])),
              k[18] || (k[18] = withKeys(withModifiers((Ne) => e.navigateOptions("prev"), ["stop", "prevent"]), ["up"])),
              withKeys(withModifiers(e.selectOption, ["stop", "prevent"]), ["enter"]),
              withKeys(e.handleKeydownEscape, ["esc"]),
              k[19] || (k[19] = withKeys((Ne) => e.visible = !1, ["tab"]))
            ],
            onMouseenter: k[20] || (k[20] = (Ne) => e.inputHovering = !0),
            onMouseleave: k[21] || (k[21] = (Ne) => e.inputHovering = !1)
          }, createSlots({
            suffix: withCtx(() => [
              e.iconComponent && !e.showClose ? (openBlock(), createBlock(de, {
                key: 0,
                class: normalizeClass([e.nsSelect.e("caret"), e.nsSelect.e("icon"), e.iconReverse])
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(resolveDynamicComponent(e.iconComponent)))
                ]),
                _: 1
              }, 8, ["class"])) : createCommentVNode("v-if", !0),
              e.showClose && e.clearIcon ? (openBlock(), createBlock(de, {
                key: 1,
                class: normalizeClass([e.nsSelect.e("caret"), e.nsSelect.e("icon")]),
                onClick: e.handleClearClick
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(resolveDynamicComponent(e.clearIcon)))
                ]),
                _: 1
              }, 8, ["class", "onClick"])) : createCommentVNode("v-if", !0)
            ]),
            _: 2
          }, [
            e.$slots.prefix ? {
              name: "prefix",
              fn: withCtx(() => [
                createElementVNode("div", _hoisted_3$2, [
                  renderSlot(e.$slots, "prefix")
                ])
              ])
            } : void 0
          ]), 1032, ["id", "modelValue", "placeholder", "name", "autocomplete", "size", "disabled", "readonly", "class", "tabindex", "onFocus", "onBlur", "onInput", "onPaste", "onCompositionstart", "onCompositionupdate", "onCompositionend", "onKeydown"])
        ])
      ]),
      content: withCtx(() => [
        createVNode($e, null, {
          default: withCtx(() => [
            withDirectives(createVNode(_e, {
              ref: "scrollbar",
              tag: "ul",
              "wrap-class": e.nsSelect.be("dropdown", "wrap"),
              "view-class": e.nsSelect.be("dropdown", "list"),
              class: normalizeClass([
                e.nsSelect.is("empty", !e.allowCreate && Boolean(e.query) && e.filteredOptionsCount === 0)
              ])
            }, {
              default: withCtx(() => [
                e.showNewOption ? (openBlock(), createBlock(Ce, {
                  key: 0,
                  value: e.query,
                  created: !0
                }, null, 8, ["value"])) : createCommentVNode("v-if", !0),
                renderSlot(e.$slots, "default")
              ]),
              _: 3
            }, 8, ["wrap-class", "view-class", "class"]), [
              [vShow, e.options.size > 0 && !e.loading]
            ]),
            e.emptyText && (!e.allowCreate || e.loading || e.allowCreate && e.options.size === 0) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              e.$slots.empty ? renderSlot(e.$slots, "empty", { key: 0 }) : (openBlock(), createElementBlock("p", {
                key: 1,
                class: normalizeClass(e.nsSelect.be("dropdown", "empty"))
              }, toDisplayString(e.emptyText), 3))
            ], 64)) : createCommentVNode("v-if", !0)
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["visible", "teleported", "popper-class", "effect", "transition", "persistent", "onShow"])
  ], 2)), [
    [Ve, e.handleClose, e.popperPaneRef]
  ]);
}
var Select = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$7], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/select/src/select.vue"]]);
const _sfc_main$g = defineComponent({
  name: "ElOptionGroup",
  componentName: "ElOptionGroup",
  props: {
    label: String,
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    const k = useNamespace("select"), oe = ref(!0), re = getCurrentInstance(), ae = ref([]);
    provide(selectGroupKey, reactive({
      ...toRefs(e)
    }));
    const le = inject(selectKey);
    onMounted(() => {
      ae.value = ie(re.subTree);
    });
    const ie = (de) => {
      const pe = [];
      return Array.isArray(de.children) && de.children.forEach((Ce) => {
        var _e;
        Ce.type && Ce.type.name === "ElOption" && Ce.component && Ce.component.proxy ? pe.push(Ce.component.proxy) : (_e = Ce.children) != null && _e.length && pe.push(...ie(Ce));
      }), pe;
    }, { groupQueryChange: ue } = toRaw(le);
    return watch(ue, () => {
      oe.value = ae.value.some((de) => de.visible === !0);
    }), {
      visible: oe,
      ns: k
    };
  }
});
function _sfc_render$6(e, k, oe, re, ae, le) {
  return withDirectives((openBlock(), createElementBlock("ul", {
    class: normalizeClass(e.ns.be("group", "wrap"))
  }, [
    createElementVNode("li", {
      class: normalizeClass(e.ns.be("group", "title"))
    }, toDisplayString(e.label), 3),
    createElementVNode("li", null, [
      createElementVNode("ul", {
        class: normalizeClass(e.ns.b("group"))
      }, [
        renderSlot(e.$slots, "default")
      ], 2)
    ])
  ], 2)), [
    [vShow, e.visible]
  ]);
}
var OptionGroup = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$6], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/select/src/option-group.vue"]]);
const ElSelect = withInstall(Select, {
  Option,
  OptionGroup
}), ElOption = withNoopInstall(Option);
withNoopInstall(OptionGroup);
const rateProps = buildProps({
  modelValue: {
    type: Number,
    default: 0
  },
  id: {
    type: String,
    default: void 0
  },
  lowThreshold: {
    type: Number,
    default: 2
  },
  highThreshold: {
    type: Number,
    default: 4
  },
  max: {
    type: Number,
    default: 5
  },
  colors: {
    type: definePropType([Array, Object]),
    default: () => mutable(["", "", ""])
  },
  voidColor: {
    type: String,
    default: ""
  },
  disabledVoidColor: {
    type: String,
    default: ""
  },
  icons: {
    type: definePropType([Array, Object]),
    default: () => [star_filled_default, star_filled_default, star_filled_default]
  },
  voidIcon: {
    type: iconPropType,
    default: () => star_default
  },
  disabledVoidIcon: {
    type: iconPropType,
    default: () => star_filled_default
  },
  disabled: {
    type: Boolean
  },
  allowHalf: {
    type: Boolean
  },
  showText: {
    type: Boolean
  },
  showScore: {
    type: Boolean
  },
  textColor: {
    type: String,
    default: ""
  },
  texts: {
    type: definePropType(Array),
    default: () => mutable([
      "Extremely bad",
      "Disappointed",
      "Fair",
      "Satisfied",
      "Surprise"
    ])
  },
  scoreTemplate: {
    type: String,
    default: "{value}"
  },
  size: {
    type: String,
    validator: isValidComponentSize
  },
  label: {
    type: String,
    default: void 0
  }
}), rateEmits = {
  [CHANGE_EVENT]: (e) => isNumber(e),
  [UPDATE_MODEL_EVENT]: (e) => isNumber(e)
}, _hoisted_1$8 = ["id", "aria-label", "aria-labelledby", "aria-valuenow", "aria-valuetext", "aria-valuemax"], _hoisted_2$4 = ["onMousemove", "onClick"], __default__$5 = {
  name: "ElRate"
}, _sfc_main$f = /* @__PURE__ */ defineComponent({
  ...__default__$5,
  props: rateProps,
  emits: rateEmits,
  setup(e, { expose: k, emit: oe }) {
    const re = e;
    function ae(jt, bn) {
      const kt = (Pn) => isObject$1(Pn), Et = Object.keys(bn).map((Pn) => +Pn).filter((Pn) => {
        const hn = bn[Pn];
        return (kt(hn) ? hn.excluded : !1) ? jt < Pn : jt <= Pn;
      }).sort((Pn, hn) => Pn - hn), _n = bn[Et[0]];
      return kt(_n) && _n.value || _n;
    }
    const le = inject(formContextKey, void 0), ie = inject(formItemContextKey, void 0), ue = useSize(), de = useNamespace("rate"), { inputId: pe, isLabeledByFormItem: Ce } = useFormItemInputId(re, {
      formItemContext: ie
    }), _e = ref(re.modelValue), $e = ref(-1), Ve = ref(!0), Ne = computed(() => [de.b(), de.m(ue.value)]), he = computed(() => re.disabled || (le == null ? void 0 : le.disabled)), Oe = computed(() => de.cssVarBlock({
      "void-color": re.voidColor,
      "disabled-void-color": re.disabledVoidColor,
      "fill-color": ze.value
    })), Ie = computed(() => {
      let jt = "";
      return re.showScore ? jt = re.scoreTemplate.replace(/\{\s*value\s*\}/, he.value ? `${re.modelValue}` : `${_e.value}`) : re.showText && (jt = re.texts[Math.ceil(_e.value) - 1]), jt;
    }), qe = computed(() => re.modelValue * 100 - Math.floor(re.modelValue) * 100), xe = computed(() => isArray(re.colors) ? {
      [re.lowThreshold]: re.colors[0],
      [re.highThreshold]: { value: re.colors[1], excluded: !0 },
      [re.max]: re.colors[2]
    } : re.colors), ze = computed(() => {
      const jt = ae(_e.value, xe.value);
      return isObject$1(jt) ? "" : jt;
    }), At = computed(() => {
      let jt = "";
      return he.value ? jt = `${qe.value}%` : re.allowHalf && (jt = "50%"), {
        color: ze.value,
        width: jt
      };
    }), Fe = computed(() => isArray(re.icons) ? {
      [re.lowThreshold]: re.icons[0],
      [re.highThreshold]: {
        value: re.icons[1],
        excluded: !0
      },
      [re.max]: re.icons[2]
    } : re.icons), Pt = computed(() => ae(re.modelValue, Fe.value)), vn = computed(() => he.value ? re.disabledVoidIcon : re.voidIcon), En = computed(() => ae(_e.value, Fe.value)), Nn = computed(() => {
      const jt = Array.from({ length: re.max }), bn = _e.value;
      return jt.fill(En.value, 0, bn), jt.fill(vn.value, bn, re.max), jt;
    });
    function Tn(jt) {
      const bn = he.value && qe.value > 0 && jt - 1 < re.modelValue && jt > re.modelValue, kt = re.allowHalf && Ve.value && jt - 0.5 <= _e.value && jt > _e.value;
      return bn || kt;
    }
    function wn(jt) {
      he.value || (re.allowHalf && Ve.value ? (oe(UPDATE_MODEL_EVENT, _e.value), re.modelValue !== _e.value && oe("change", _e.value)) : (oe(UPDATE_MODEL_EVENT, jt), re.modelValue !== jt && oe("change", jt)));
    }
    function Lt(jt) {
      if (he.value)
        return;
      let bn = _e.value;
      const kt = jt.code;
      return kt === EVENT_CODE.up || kt === EVENT_CODE.right ? (re.allowHalf ? bn += 0.5 : bn += 1, jt.stopPropagation(), jt.preventDefault()) : (kt === EVENT_CODE.left || kt === EVENT_CODE.down) && (re.allowHalf ? bn -= 0.5 : bn -= 1, jt.stopPropagation(), jt.preventDefault()), bn = bn < 0 ? 0 : bn, bn = bn > re.max ? re.max : bn, oe(UPDATE_MODEL_EVENT, bn), oe("change", bn), bn;
    }
    function Dt(jt, bn) {
      if (!he.value) {
        if (re.allowHalf) {
          let kt = bn.target;
          hasClass$1(kt, de.e("item")) && (kt = kt.querySelector(`.${de.e("icon")}`)), (kt.clientWidth === 0 || hasClass$1(kt, de.e("decimal"))) && (kt = kt.parentNode), Ve.value = bn.offsetX * 2 <= kt.clientWidth, _e.value = Ve.value ? jt - 0.5 : jt;
        } else
          _e.value = jt;
        $e.value = jt;
      }
    }
    function Cn() {
      he.value || (re.allowHalf && (Ve.value = re.modelValue !== Math.floor(re.modelValue)), _e.value = re.modelValue, $e.value = -1);
    }
    return watch(() => re.modelValue, (jt) => {
      _e.value = jt, Ve.value = re.modelValue !== Math.floor(re.modelValue);
    }), re.modelValue || oe(UPDATE_MODEL_EVENT, 0), k({
      setCurrentValue: Dt,
      resetCurrentValue: Cn
    }), (jt, bn) => {
      var kt;
      return openBlock(), createElementBlock("div", {
        id: unref(pe),
        class: normalizeClass([unref(Ne), unref(de).is("disabled", unref(he))]),
        role: "slider",
        "aria-label": unref(Ce) ? void 0 : jt.label || "rating",
        "aria-labelledby": unref(Ce) ? (kt = unref(ie)) == null ? void 0 : kt.labelId : void 0,
        "aria-valuenow": _e.value,
        "aria-valuetext": unref(Ie) || void 0,
        "aria-valuemin": "0",
        "aria-valuemax": jt.max,
        tabindex: "0",
        style: normalizeStyle(unref(Oe)),
        onKeydown: Lt
      }, [
        (openBlock(!0), createElementBlock(Fragment, null, renderList(jt.max, (Et, _n) => (openBlock(), createElementBlock("span", {
          key: _n,
          class: normalizeClass(unref(de).e("item")),
          onMousemove: (Pn) => Dt(Et, Pn),
          onMouseleave: Cn,
          onClick: (Pn) => wn(Et)
        }, [
          createVNode(unref(ElIcon), {
            class: normalizeClass([
              unref(de).e("icon"),
              { hover: $e.value === Et },
              unref(de).is("active", Et <= _e.value)
            ])
          }, {
            default: withCtx(() => [
              Tn(Et) ? createCommentVNode("v-if", !0) : (openBlock(), createBlock(resolveDynamicComponent(unref(Nn)[Et - 1]), { key: 0 })),
              Tn(Et) ? (openBlock(), createBlock(unref(ElIcon), {
                key: 1,
                style: normalizeStyle(unref(At)),
                class: normalizeClass([unref(de).e("icon"), unref(de).e("decimal")])
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(resolveDynamicComponent(unref(Pt))))
                ]),
                _: 1
              }, 8, ["style", "class"])) : createCommentVNode("v-if", !0)
            ]),
            _: 2
          }, 1032, ["class"])
        ], 42, _hoisted_2$4))), 128)),
        jt.showText || jt.showScore ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: normalizeClass(unref(de).e("text"))
        }, toDisplayString(unref(Ie)), 3)) : createCommentVNode("v-if", !0)
      ], 46, _hoisted_1$8);
    };
  }
});
var Rate = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/rate/src/rate.vue"]]);
const ElRate = withInstall(Rate), RowJustify = [
  "start",
  "center",
  "end",
  "space-around",
  "space-between",
  "space-evenly"
], RowAlign = ["top", "middle", "bottom"], rowProps = buildProps({
  tag: {
    type: String,
    default: "div"
  },
  gutter: {
    type: Number,
    default: 0
  },
  justify: {
    type: String,
    values: RowJustify,
    default: "start"
  },
  align: {
    type: String,
    values: RowAlign,
    default: "top"
  }
}), __default__$4 = {
  name: "ElRow"
}, _sfc_main$e = /* @__PURE__ */ defineComponent({
  ...__default__$4,
  props: rowProps,
  setup(e) {
    const k = e, oe = useNamespace("row"), re = computed(() => k.gutter);
    provide(rowContextKey, {
      gutter: re
    });
    const ae = computed(() => {
      const le = {};
      return k.gutter && (le.marginRight = le.marginLeft = `-${k.gutter / 2}px`), le;
    });
    return (le, ie) => (openBlock(), createBlock(resolveDynamicComponent(le.tag), {
      class: normalizeClass([
        unref(oe).b(),
        unref(oe).is(`justify-${k.justify}`, le.justify !== "start"),
        unref(oe).is(`align-${k.align}`, le.align !== "top")
      ]),
      style: normalizeStyle(unref(ae))
    }, {
      default: withCtx(() => [
        renderSlot(le.$slots, "default")
      ]),
      _: 3
    }, 8, ["class", "style"]));
  }
});
var Row = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/row/src/row.vue"]]);
const ElRow = withInstall(Row), sliderProps = buildProps({
  modelValue: {
    type: definePropType([Number, Array]),
    default: 0
  },
  id: {
    type: String,
    default: void 0
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  step: {
    type: Number,
    default: 1
  },
  showInput: Boolean,
  showInputControls: {
    type: Boolean,
    default: !0
  },
  size: useSizeProp,
  inputSize: useSizeProp,
  showStops: Boolean,
  showTooltip: {
    type: Boolean,
    default: !0
  },
  formatTooltip: {
    type: definePropType(Function),
    default: void 0
  },
  disabled: Boolean,
  range: Boolean,
  vertical: Boolean,
  height: String,
  debounce: {
    type: Number,
    default: 300
  },
  label: {
    type: String,
    default: void 0
  },
  rangeStartLabel: {
    type: String,
    default: void 0
  },
  rangeEndLabel: {
    type: String,
    default: void 0
  },
  formatValueText: {
    type: definePropType(Function),
    default: void 0
  },
  tooltipClass: {
    type: String,
    default: void 0
  },
  placement: {
    type: String,
    values: Ee,
    default: "top"
  },
  marks: {
    type: definePropType(Object)
  },
  validateEvent: {
    type: Boolean,
    default: !0
  }
}), isValidValue = (e) => isNumber(e) || isArray(e) && e.every(isNumber), sliderEmits = {
  [UPDATE_MODEL_EVENT]: isValidValue,
  [INPUT_EVENT]: isValidValue,
  [CHANGE_EVENT]: isValidValue
}, useLifecycle = (e, k, oe) => {
  const re = ref();
  return onMounted(async () => {
    e.range ? (Array.isArray(e.modelValue) ? (k.firstValue = Math.max(e.min, e.modelValue[0]), k.secondValue = Math.min(e.max, e.modelValue[1])) : (k.firstValue = e.min, k.secondValue = e.max), k.oldValue = [k.firstValue, k.secondValue]) : (typeof e.modelValue != "number" || Number.isNaN(e.modelValue) ? k.firstValue = e.min : k.firstValue = Math.min(e.max, Math.max(e.min, e.modelValue)), k.oldValue = k.firstValue), useEventListener(window, "resize", oe), await nextTick(), oe();
  }), {
    sliderWrapper: re
  };
}, useMarks = (e) => computed(() => e.marks ? Object.keys(e.marks).map(parseFloat).sort((oe, re) => oe - re).filter((oe) => oe <= e.max && oe >= e.min).map((oe) => ({
  point: oe,
  position: (oe - e.min) * 100 / (e.max - e.min),
  mark: e.marks[oe]
})) : []), useSlide = (e, k, oe) => {
  const { form: re, formItem: ae } = useFormItem(), le = shallowRef(), ie = ref(), ue = ref(), de = {
    firstButton: ie,
    secondButton: ue
  }, pe = computed(() => e.disabled || (re == null ? void 0 : re.disabled) || !1), Ce = computed(() => Math.min(k.firstValue, k.secondValue)), _e = computed(() => Math.max(k.firstValue, k.secondValue)), $e = computed(() => e.range ? `${100 * (_e.value - Ce.value) / (e.max - e.min)}%` : `${100 * (k.firstValue - e.min) / (e.max - e.min)}%`), Ve = computed(() => e.range ? `${100 * (Ce.value - e.min) / (e.max - e.min)}%` : "0%"), Ne = computed(() => e.vertical ? { height: e.height } : {}), he = computed(() => e.vertical ? {
    height: $e.value,
    bottom: Ve.value
  } : {
    width: $e.value,
    left: Ve.value
  }), Oe = () => {
    le.value && (k.sliderSize = le.value[`client${e.vertical ? "Height" : "Width"}`]);
  }, Ie = (Tn) => {
    const wn = e.min + Tn * (e.max - e.min) / 100;
    if (!e.range)
      return ie;
    let Lt;
    return Math.abs(Ce.value - wn) < Math.abs(_e.value - wn) ? Lt = k.firstValue < k.secondValue ? "firstButton" : "secondButton" : Lt = k.firstValue > k.secondValue ? "firstButton" : "secondButton", de[Lt];
  }, qe = (Tn) => {
    const wn = Ie(Tn);
    return wn.value.setPosition(Tn), wn;
  }, xe = (Tn) => {
    k.firstValue = Tn, At(e.range ? [Ce.value, _e.value] : Tn);
  }, ze = (Tn) => {
    k.secondValue = Tn, e.range && At([Ce.value, _e.value]);
  }, At = (Tn) => {
    oe(UPDATE_MODEL_EVENT, Tn), oe(INPUT_EVENT, Tn);
  }, Fe = async () => {
    await nextTick(), oe(CHANGE_EVENT, e.range ? [Ce.value, _e.value] : e.modelValue);
  }, Pt = (Tn) => {
    var wn, Lt, Dt, Cn, jt, bn;
    if (pe.value || k.dragging)
      return;
    Oe();
    let kt = 0;
    if (e.vertical) {
      const Et = (Dt = (Lt = (wn = Tn.touches) == null ? void 0 : wn.item(0)) == null ? void 0 : Lt.clientY) != null ? Dt : Tn.clientY;
      kt = (le.value.getBoundingClientRect().bottom - Et) / k.sliderSize * 100;
    } else {
      const Et = (bn = (jt = (Cn = Tn.touches) == null ? void 0 : Cn.item(0)) == null ? void 0 : jt.clientX) != null ? bn : Tn.clientX, _n = le.value.getBoundingClientRect().left;
      kt = (Et - _n) / k.sliderSize * 100;
    }
    if (!(kt < 0 || kt > 100))
      return qe(kt);
  };
  return {
    elFormItem: ae,
    slider: le,
    firstButton: ie,
    secondButton: ue,
    sliderDisabled: pe,
    minValue: Ce,
    maxValue: _e,
    runwayStyle: Ne,
    barStyle: he,
    resetSize: Oe,
    setPosition: qe,
    emitChange: Fe,
    onSliderWrapperPrevent: (Tn) => {
      var wn, Lt;
      (((wn = de.firstButton.value) == null ? void 0 : wn.dragging) || ((Lt = de.secondButton.value) == null ? void 0 : Lt.dragging)) && Tn.preventDefault();
    },
    onSliderClick: (Tn) => {
      Pt(Tn) && Fe();
    },
    onSliderDown: async (Tn) => {
      const wn = Pt(Tn);
      wn && (await nextTick(), wn.value.onButtonDown(Tn));
    },
    setFirstValue: xe,
    setSecondValue: ze
  };
}, { left, down, right, up, home, end, pageUp, pageDown } = EVENT_CODE, useTooltip = (e, k, oe) => {
  const re = ref(), ae = ref(!1), le = computed(() => k.value instanceof Function), ie = computed(() => le.value && k.value(e.modelValue) || e.modelValue), ue = debounce(() => {
    oe.value && (ae.value = !0);
  }, 50), de = debounce(() => {
    oe.value && (ae.value = !1);
  }, 50);
  return {
    tooltip: re,
    tooltipVisible: ae,
    formatValue: ie,
    displayTooltip: ue,
    hideTooltip: de
  };
}, useSliderButton = (e, k, oe) => {
  const {
    disabled: re,
    min: ae,
    max: le,
    step: ie,
    showTooltip: ue,
    precision: de,
    sliderSize: pe,
    formatTooltip: Ce,
    emitChange: _e,
    resetSize: $e,
    updateDragging: Ve
  } = inject(sliderContextKey), { tooltip: Ne, tooltipVisible: he, formatValue: Oe, displayTooltip: Ie, hideTooltip: qe } = useTooltip(e, Ce, ue), xe = ref(), ze = computed(() => `${(e.modelValue - ae.value) / (le.value - ae.value) * 100}%`), At = computed(() => e.vertical ? { bottom: ze.value } : { left: ze.value }), Fe = () => {
    k.hovering = !0, Ie();
  }, Pt = () => {
    k.hovering = !1, k.dragging || qe();
  }, vn = (hn) => {
    re.value || (hn.preventDefault(), kt(hn), window.addEventListener("mousemove", Et), window.addEventListener("touchmove", Et), window.addEventListener("mouseup", _n), window.addEventListener("touchend", _n), window.addEventListener("contextmenu", _n), xe.value.focus());
  }, En = (hn) => {
    re.value || (k.newPosition = Number.parseFloat(ze.value) + hn / (le.value - ae.value) * 100, Pn(k.newPosition), _e());
  }, Nn = () => {
    En(-ie.value);
  }, Tn = () => {
    En(ie.value);
  }, wn = () => {
    En(-ie.value * 4);
  }, Lt = () => {
    En(ie.value * 4);
  }, Dt = () => {
    re.value || (Pn(0), _e());
  }, Cn = () => {
    re.value || (Pn(100), _e());
  }, jt = (hn) => {
    let On = !0;
    [left, down].includes(hn.key) ? Nn() : [right, up].includes(hn.key) ? Tn() : hn.key === home ? Dt() : hn.key === end ? Cn() : hn.key === pageDown ? wn() : hn.key === pageUp ? Lt() : On = !1, On && hn.preventDefault();
  }, bn = (hn) => {
    let On, Dn;
    return hn.type.startsWith("touch") ? (Dn = hn.touches[0].clientY, On = hn.touches[0].clientX) : (Dn = hn.clientY, On = hn.clientX), {
      clientX: On,
      clientY: Dn
    };
  }, kt = (hn) => {
    k.dragging = !0, k.isClick = !0;
    const { clientX: On, clientY: Dn } = bn(hn);
    e.vertical ? k.startY = Dn : k.startX = On, k.startPosition = Number.parseFloat(ze.value), k.newPosition = k.startPosition;
  }, Et = (hn) => {
    if (k.dragging) {
      k.isClick = !1, Ie(), $e();
      let On;
      const { clientX: Dn, clientY: Rn } = bn(hn);
      e.vertical ? (k.currentY = Rn, On = (k.startY - k.currentY) / pe.value * 100) : (k.currentX = Dn, On = (k.currentX - k.startX) / pe.value * 100), k.newPosition = k.startPosition + On, Pn(k.newPosition);
    }
  }, _n = () => {
    k.dragging && (setTimeout(() => {
      k.dragging = !1, k.hovering || qe(), k.isClick || (Pn(k.newPosition), _e());
    }, 0), window.removeEventListener("mousemove", Et), window.removeEventListener("touchmove", Et), window.removeEventListener("mouseup", _n), window.removeEventListener("touchend", _n), window.removeEventListener("contextmenu", _n));
  }, Pn = async (hn) => {
    if (hn === null || Number.isNaN(+hn))
      return;
    hn < 0 ? hn = 0 : hn > 100 && (hn = 100);
    const On = 100 / ((le.value - ae.value) / ie.value);
    let Rn = Math.round(hn / On) * On * (le.value - ae.value) * 0.01 + ae.value;
    Rn = Number.parseFloat(Rn.toFixed(de.value)), Rn !== e.modelValue && oe(UPDATE_MODEL_EVENT, Rn), !k.dragging && e.modelValue !== k.oldValue && (k.oldValue = e.modelValue), await nextTick(), k.dragging && Ie(), Ne.value.updatePopper();
  };
  return watch(() => k.dragging, (hn) => {
    Ve(hn);
  }), {
    disabled: re,
    button: xe,
    tooltip: Ne,
    tooltipVisible: he,
    showTooltip: ue,
    wrapperStyle: At,
    formatValue: Oe,
    handleMouseEnter: Fe,
    handleMouseLeave: Pt,
    onButtonDown: vn,
    onKeyDown: jt,
    setPosition: Pn
  };
}, useStops = (e, k, oe, re) => ({
  stops: computed(() => {
    if (!e.showStops || e.min > e.max)
      return [];
    if (e.step === 0)
      return debugWarn("ElSlider", "step should not be 0."), [];
    const ie = (e.max - e.min) / e.step, ue = 100 * e.step / (e.max - e.min), de = Array.from({ length: ie - 1 }).map((pe, Ce) => (Ce + 1) * ue);
    return e.range ? de.filter((pe) => pe < 100 * (oe.value - e.min) / (e.max - e.min) || pe > 100 * (re.value - e.min) / (e.max - e.min)) : de.filter((pe) => pe > 100 * (k.firstValue - e.min) / (e.max - e.min));
  }),
  getStopStyle: (ie) => e.vertical ? { bottom: `${ie}%` } : { left: `${ie}%` }
}), useWatch = (e, k, oe, re, ae, le) => {
  const ie = (pe) => {
    ae(UPDATE_MODEL_EVENT, pe), ae(INPUT_EVENT, pe);
  }, ue = () => e.range ? ![oe.value, re.value].every((pe, Ce) => pe === k.oldValue[Ce]) : e.modelValue !== k.oldValue, de = () => {
    var pe, Ce;
    if (e.min > e.max) {
      throwError("Slider", "min should not be greater than max.");
      return;
    }
    const _e = e.modelValue;
    e.range && Array.isArray(_e) ? _e[1] < e.min ? ie([e.min, e.min]) : _e[0] > e.max ? ie([e.max, e.max]) : _e[0] < e.min ? ie([e.min, _e[1]]) : _e[1] > e.max ? ie([_e[0], e.max]) : (k.firstValue = _e[0], k.secondValue = _e[1], ue() && (e.validateEvent && ((pe = le == null ? void 0 : le.validate) == null || pe.call(le, "change").catch(($e) => debugWarn($e))), k.oldValue = _e.slice())) : !e.range && typeof _e == "number" && !Number.isNaN(_e) && (_e < e.min ? ie(e.min) : _e > e.max ? ie(e.max) : (k.firstValue = _e, ue() && (e.validateEvent && ((Ce = le == null ? void 0 : le.validate) == null || Ce.call(le, "change").catch(($e) => debugWarn($e))), k.oldValue = _e)));
  };
  de(), watch(() => k.dragging, (pe) => {
    pe || de();
  }), watch(() => e.modelValue, (pe, Ce) => {
    k.dragging || Array.isArray(pe) && Array.isArray(Ce) && pe.every((_e, $e) => _e === Ce[$e]) && k.firstValue === pe[0] && k.secondValue === pe[1] || de();
  }, {
    deep: !0
  }), watch(() => [e.min, e.max], () => {
    de();
  });
}, sliderButtonProps = buildProps({
  modelValue: {
    type: Number,
    default: 0
  },
  vertical: Boolean,
  tooltipClass: String,
  placement: {
    type: String,
    values: Ee,
    default: "top"
  }
}), sliderButtonEmits = {
  [UPDATE_MODEL_EVENT]: (e) => isNumber(e)
}, _hoisted_1$7 = ["tabindex"], __default__$3 = {
  name: "ElSliderButton"
}, _sfc_main$d = /* @__PURE__ */ defineComponent({
  ...__default__$3,
  props: sliderButtonProps,
  emits: sliderButtonEmits,
  setup(e, { expose: k, emit: oe }) {
    const re = e, ae = useNamespace("slider"), le = reactive({
      hovering: !1,
      dragging: !1,
      isClick: !1,
      startX: 0,
      currentX: 0,
      startY: 0,
      currentY: 0,
      startPosition: 0,
      newPosition: 0,
      oldValue: re.modelValue
    }), {
      disabled: ie,
      button: ue,
      tooltip: de,
      showTooltip: pe,
      tooltipVisible: Ce,
      wrapperStyle: _e,
      formatValue: $e,
      handleMouseEnter: Ve,
      handleMouseLeave: Ne,
      onButtonDown: he,
      onKeyDown: Oe,
      setPosition: Ie
    } = useSliderButton(re, le, oe), { hovering: qe, dragging: xe } = toRefs(le);
    return k({
      onButtonDown: he,
      onKeyDown: Oe,
      setPosition: Ie,
      hovering: qe,
      dragging: xe
    }), (ze, At) => (openBlock(), createElementBlock("div", {
      ref_key: "button",
      ref: ue,
      class: normalizeClass([unref(ae).e("button-wrapper"), { hover: unref(qe), dragging: unref(xe) }]),
      style: normalizeStyle(unref(_e)),
      tabindex: unref(ie) ? -1 : 0,
      onMouseenter: At[0] || (At[0] = (...Fe) => unref(Ve) && unref(Ve)(...Fe)),
      onMouseleave: At[1] || (At[1] = (...Fe) => unref(Ne) && unref(Ne)(...Fe)),
      onMousedown: At[2] || (At[2] = (...Fe) => unref(he) && unref(he)(...Fe)),
      onTouchstart: At[3] || (At[3] = (...Fe) => unref(he) && unref(he)(...Fe)),
      onFocus: At[4] || (At[4] = (...Fe) => unref(Ve) && unref(Ve)(...Fe)),
      onBlur: At[5] || (At[5] = (...Fe) => unref(Ne) && unref(Ne)(...Fe)),
      onKeydown: At[6] || (At[6] = (...Fe) => unref(Oe) && unref(Oe)(...Fe))
    }, [
      createVNode(unref(ElTooltip), {
        ref_key: "tooltip",
        ref: de,
        visible: unref(Ce),
        placement: ze.placement,
        "fallback-placements": ["top", "bottom", "right", "left"],
        "stop-popper-mouse-event": !1,
        "popper-class": ze.tooltipClass,
        disabled: !unref(pe),
        persistent: ""
      }, {
        content: withCtx(() => [
          createElementVNode("span", null, toDisplayString(unref($e)), 1)
        ]),
        default: withCtx(() => [
          createElementVNode("div", {
            class: normalizeClass([unref(ae).e("button"), { hover: unref(qe), dragging: unref(xe) }])
          }, null, 2)
        ]),
        _: 1
      }, 8, ["visible", "placement", "popper-class", "disabled"])
    ], 46, _hoisted_1$7));
  }
});
var SliderButton = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/slider/src/button.vue"]]);
const sliderMarkerProps = buildProps({
  mark: {
    type: definePropType([String, Object]),
    default: void 0
  }
});
var SliderMarker = defineComponent({
  name: "ElSliderMarker",
  props: sliderMarkerProps,
  setup(e) {
    const k = useNamespace("slider"), oe = computed(() => isString(e.mark) ? e.mark : e.mark.label), re = computed(() => isString(e.mark) ? void 0 : e.mark.style);
    return () => h$2("div", {
      class: k.e("marks-text"),
      style: re.value
    }, oe.value);
  }
});
const _hoisted_1$6 = ["id", "role", "aria-label", "aria-labelledby"], _hoisted_2$3 = { key: 1 }, __default__$2 = {
  name: "ElSlider"
}, _sfc_main$c = /* @__PURE__ */ defineComponent({
  ...__default__$2,
  props: sliderProps,
  emits: sliderEmits,
  setup(e, { expose: k, emit: oe }) {
    const re = e, ae = useNamespace("slider"), { t: le } = useLocale(), ie = reactive({
      firstValue: 0,
      secondValue: 0,
      oldValue: 0,
      dragging: !1,
      sliderSize: 1
    }), {
      elFormItem: ue,
      slider: de,
      firstButton: pe,
      secondButton: Ce,
      sliderDisabled: _e,
      minValue: $e,
      maxValue: Ve,
      runwayStyle: Ne,
      barStyle: he,
      resetSize: Oe,
      emitChange: Ie,
      onSliderWrapperPrevent: qe,
      onSliderClick: xe,
      onSliderDown: ze,
      setFirstValue: At,
      setSecondValue: Fe
    } = useSlide(re, ie, oe), { stops: Pt, getStopStyle: vn } = useStops(re, ie, $e, Ve), { inputId: En, isLabeledByFormItem: Nn } = useFormItemInputId(re, {
      formItemContext: ue
    }), Tn = useSize(), wn = computed(() => re.inputSize || Tn.value), Lt = computed(() => re.label || le("el.slider.defaultLabel", {
      min: re.min,
      max: re.max
    })), Dt = computed(() => re.range ? re.rangeStartLabel || le("el.slider.defaultRangeStartLabel") : Lt.value), Cn = computed(() => re.formatValueText ? re.formatValueText(hn.value) : `${hn.value}`), jt = computed(() => re.rangeEndLabel || le("el.slider.defaultRangeEndLabel")), bn = computed(() => re.formatValueText ? re.formatValueText(On.value) : `${On.value}`), kt = computed(() => [
      ae.b(),
      ae.m(Tn.value),
      ae.is("vertical", re.vertical),
      { [ae.m("with-input")]: re.showInput }
    ]), Et = useMarks(re);
    useWatch(re, ie, $e, Ve, oe, ue);
    const _n = computed(() => {
      const Fn = [re.min, re.max, re.step].map((kn) => {
        const An = `${kn}`.split(".")[1];
        return An ? An.length : 0;
      });
      return Math.max.apply(null, Fn);
    }), { sliderWrapper: Pn } = useLifecycle(re, ie, Oe), { firstValue: hn, secondValue: On, sliderSize: Dn } = toRefs(ie), Rn = (Fn) => {
      ie.dragging = Fn;
    };
    return provide(sliderContextKey, {
      ...toRefs(re),
      sliderSize: Dn,
      disabled: _e,
      precision: _n,
      emitChange: Ie,
      resetSize: Oe,
      updateDragging: Rn
    }), k({
      onSliderClick: xe
    }), (Fn, kn) => {
      var An, Vn;
      return openBlock(), createElementBlock("div", {
        id: Fn.range ? unref(En) : void 0,
        ref_key: "sliderWrapper",
        ref: Pn,
        class: normalizeClass(unref(kt)),
        role: Fn.range ? "group" : void 0,
        "aria-label": Fn.range && !unref(Nn) ? unref(Lt) : void 0,
        "aria-labelledby": Fn.range && unref(Nn) ? (An = unref(ue)) == null ? void 0 : An.labelId : void 0,
        onTouchstart: kn[2] || (kn[2] = (...Bn) => unref(qe) && unref(qe)(...Bn)),
        onTouchmove: kn[3] || (kn[3] = (...Bn) => unref(qe) && unref(qe)(...Bn))
      }, [
        createElementVNode("div", {
          ref_key: "slider",
          ref: de,
          class: normalizeClass([
            unref(ae).e("runway"),
            { "show-input": Fn.showInput && !Fn.range },
            unref(ae).is("disabled", unref(_e))
          ]),
          style: normalizeStyle(unref(Ne)),
          onMousedown: kn[0] || (kn[0] = (...Bn) => unref(ze) && unref(ze)(...Bn)),
          onTouchstart: kn[1] || (kn[1] = (...Bn) => unref(ze) && unref(ze)(...Bn))
        }, [
          createElementVNode("div", {
            class: normalizeClass(unref(ae).e("bar")),
            style: normalizeStyle(unref(he))
          }, null, 6),
          createVNode(SliderButton, {
            id: Fn.range ? void 0 : unref(En),
            ref_key: "firstButton",
            ref: pe,
            "model-value": unref(hn),
            vertical: Fn.vertical,
            "tooltip-class": Fn.tooltipClass,
            placement: Fn.placement,
            role: "slider",
            "aria-label": Fn.range || !unref(Nn) ? unref(Dt) : void 0,
            "aria-labelledby": !Fn.range && unref(Nn) ? (Vn = unref(ue)) == null ? void 0 : Vn.labelId : void 0,
            "aria-valuemin": Fn.min,
            "aria-valuemax": Fn.range ? unref(On) : Fn.max,
            "aria-valuenow": unref(hn),
            "aria-valuetext": unref(Cn),
            "aria-orientation": Fn.vertical ? "vertical" : "horizontal",
            "aria-disabled": unref(_e),
            "onUpdate:modelValue": unref(At)
          }, null, 8, ["id", "model-value", "vertical", "tooltip-class", "placement", "aria-label", "aria-labelledby", "aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-valuetext", "aria-orientation", "aria-disabled", "onUpdate:modelValue"]),
          Fn.range ? (openBlock(), createBlock(SliderButton, {
            key: 0,
            ref_key: "secondButton",
            ref: Ce,
            "model-value": unref(On),
            vertical: Fn.vertical,
            "tooltip-class": Fn.tooltipClass,
            placement: Fn.placement,
            role: "slider",
            "aria-label": unref(jt),
            "aria-valuemin": unref(hn),
            "aria-valuemax": Fn.max,
            "aria-valuenow": unref(On),
            "aria-valuetext": unref(bn),
            "aria-orientation": Fn.vertical ? "vertical" : "horizontal",
            "aria-disabled": unref(_e),
            "onUpdate:modelValue": unref(Fe)
          }, null, 8, ["model-value", "vertical", "tooltip-class", "placement", "aria-label", "aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-valuetext", "aria-orientation", "aria-disabled", "onUpdate:modelValue"])) : createCommentVNode("v-if", !0),
          Fn.showStops ? (openBlock(), createElementBlock("div", _hoisted_2$3, [
            (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(Pt), (Bn, Wn) => (openBlock(), createElementBlock("div", {
              key: Wn,
              class: normalizeClass(unref(ae).e("stop")),
              style: normalizeStyle(unref(vn)(Bn))
            }, null, 6))), 128))
          ])) : createCommentVNode("v-if", !0),
          unref(Et).length > 0 ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
            createElementVNode("div", null, [
              (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(Et), (Bn, Wn) => (openBlock(), createElementBlock("div", {
                key: Wn,
                style: normalizeStyle(unref(vn)(Bn.position)),
                class: normalizeClass([unref(ae).e("stop"), unref(ae).e("marks-stop")])
              }, null, 6))), 128))
            ]),
            createElementVNode("div", {
              class: normalizeClass(unref(ae).e("marks"))
            }, [
              (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(Et), (Bn, Wn) => (openBlock(), createBlock(unref(SliderMarker), {
                key: Wn,
                mark: Bn.mark,
                style: normalizeStyle(unref(vn)(Bn.position))
              }, null, 8, ["mark", "style"]))), 128))
            ], 2)
          ], 64)) : createCommentVNode("v-if", !0)
        ], 38),
        Fn.showInput && !Fn.range ? (openBlock(), createBlock(unref(ElInputNumber), {
          key: 0,
          ref: "input",
          "model-value": unref(hn),
          class: normalizeClass(unref(ae).e("input")),
          step: Fn.step,
          disabled: unref(_e),
          controls: Fn.showInputControls,
          min: Fn.min,
          max: Fn.max,
          debounce: Fn.debounce,
          size: unref(wn),
          "onUpdate:modelValue": unref(At),
          onChange: unref(Ie)
        }, null, 8, ["model-value", "class", "step", "disabled", "controls", "min", "max", "debounce", "size", "onUpdate:modelValue", "onChange"])) : createCommentVNode("v-if", !0)
      ], 42, _hoisted_1$6);
    };
  }
});
var Slider = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/slider/src/slider.vue"]]);
const ElSlider = withInstall(Slider), switchProps = buildProps({
  modelValue: {
    type: [Boolean, String, Number],
    default: !1
  },
  value: {
    type: [Boolean, String, Number],
    default: !1
  },
  disabled: {
    type: Boolean,
    default: !1
  },
  width: {
    type: [String, Number],
    default: ""
  },
  inlinePrompt: {
    type: Boolean,
    default: !1
  },
  activeIcon: {
    type: iconPropType,
    default: ""
  },
  inactiveIcon: {
    type: iconPropType,
    default: ""
  },
  activeText: {
    type: String,
    default: ""
  },
  inactiveText: {
    type: String,
    default: ""
  },
  activeColor: {
    type: String,
    default: ""
  },
  inactiveColor: {
    type: String,
    default: ""
  },
  borderColor: {
    type: String,
    default: ""
  },
  activeValue: {
    type: [Boolean, String, Number],
    default: !0
  },
  inactiveValue: {
    type: [Boolean, String, Number],
    default: !1
  },
  name: {
    type: String,
    default: ""
  },
  validateEvent: {
    type: Boolean,
    default: !0
  },
  id: String,
  loading: {
    type: Boolean,
    default: !1
  },
  beforeChange: {
    type: definePropType(Function)
  },
  size: {
    type: String,
    validator: isValidComponentSize
  },
  tabindex: {
    type: [String, Number]
  }
}), switchEmits = {
  [UPDATE_MODEL_EVENT]: (e) => isBoolean(e) || isString(e) || isNumber(e),
  [CHANGE_EVENT]: (e) => isBoolean(e) || isString(e) || isNumber(e),
  [INPUT_EVENT]: (e) => isBoolean(e) || isString(e) || isNumber(e)
}, _hoisted_1$5 = ["onClick"], _hoisted_2$2 = ["id", "aria-checked", "aria-disabled", "name", "true-value", "false-value", "disabled", "tabindex", "onKeydown"], _hoisted_3$1 = ["aria-hidden"], _hoisted_4 = ["aria-hidden"], _hoisted_5 = ["aria-hidden"], _hoisted_6 = ["aria-hidden"], __default__$1 = {
  name: "ElSwitch"
}, _sfc_main$b = /* @__PURE__ */ defineComponent({
  ...__default__$1,
  props: switchProps,
  emits: switchEmits,
  setup(e, { expose: k, emit: oe }) {
    const re = e, ae = "ElSwitch", le = getCurrentInstance(), { formItem: ie } = useFormItem(), ue = useSize(), de = useNamespace("switch");
    useDeprecated({
      from: '"value"',
      replacement: '"model-value" or "v-model"',
      scope: ae,
      version: "2.3.0",
      ref: "https://element-plus.org/en-US/component/switch.html#attributes",
      type: "Attribute"
    }, computed(() => {
      var Fe;
      return !!((Fe = le.vnode.props) != null && Fe.value);
    }));
    const { inputId: pe } = useFormItemInputId(re, {
      formItemContext: ie
    }), Ce = useDisabled$1(computed(() => re.loading)), _e = ref(re.modelValue !== !1), $e = ref(), Ve = ref(), Ne = computed(() => [
      de.b(),
      de.m(ue.value),
      de.is("disabled", Ce.value),
      de.is("checked", Ie.value)
    ]), he = computed(() => ({
      width: addUnit(re.width)
    }));
    watch(() => re.modelValue, () => {
      _e.value = !0;
    }), watch(() => re.value, () => {
      _e.value = !1;
    });
    const Oe = computed(() => _e.value ? re.modelValue : re.value), Ie = computed(() => Oe.value === re.activeValue);
    [re.activeValue, re.inactiveValue].includes(Oe.value) || (oe(UPDATE_MODEL_EVENT, re.inactiveValue), oe(CHANGE_EVENT, re.inactiveValue), oe(INPUT_EVENT, re.inactiveValue)), watch(Ie, (Fe) => {
      var Pt;
      $e.value.checked = Fe, re.validateEvent && ((Pt = ie == null ? void 0 : ie.validate) == null || Pt.call(ie, "change").catch((vn) => debugWarn(vn)));
    });
    const qe = () => {
      const Fe = Ie.value ? re.inactiveValue : re.activeValue;
      oe(UPDATE_MODEL_EVENT, Fe), oe(CHANGE_EVENT, Fe), oe(INPUT_EVENT, Fe), nextTick(() => {
        $e.value.checked = Ie.value;
      });
    }, xe = () => {
      if (Ce.value)
        return;
      const { beforeChange: Fe } = re;
      if (!Fe) {
        qe();
        return;
      }
      const Pt = Fe();
      [
        isPromise(Pt),
        isBoolean(Pt)
      ].includes(!0) || throwError(ae, "beforeChange must return type `Promise<boolean>` or `boolean`"), isPromise(Pt) ? Pt.then((En) => {
        En && qe();
      }).catch((En) => {
        debugWarn(ae, `some error occurred: ${En}`);
      }) : Pt && qe();
    }, ze = computed(() => de.cssVarBlock({
      ...re.activeColor ? { "on-color": re.activeColor } : null,
      ...re.inactiveColor ? { "off-color": re.inactiveColor } : null,
      ...re.borderColor ? { "border-color": re.borderColor } : null
    })), At = () => {
      var Fe, Pt;
      (Pt = (Fe = $e.value) == null ? void 0 : Fe.focus) == null || Pt.call(Fe);
    };
    return onMounted(() => {
      $e.value.checked = Ie.value;
    }), k({
      focus: At
    }), (Fe, Pt) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(unref(Ne)),
      style: normalizeStyle(unref(ze)),
      onClick: withModifiers(xe, ["prevent"])
    }, [
      createElementVNode("input", {
        id: unref(pe),
        ref_key: "input",
        ref: $e,
        class: normalizeClass(unref(de).e("input")),
        type: "checkbox",
        role: "switch",
        "aria-checked": unref(Ie),
        "aria-disabled": unref(Ce),
        name: Fe.name,
        "true-value": Fe.activeValue,
        "false-value": Fe.inactiveValue,
        disabled: unref(Ce),
        tabindex: Fe.tabindex,
        onChange: qe,
        onKeydown: withKeys(xe, ["enter"])
      }, null, 42, _hoisted_2$2),
      !Fe.inlinePrompt && (Fe.inactiveIcon || Fe.inactiveText) ? (openBlock(), createElementBlock("span", {
        key: 0,
        class: normalizeClass([
          unref(de).e("label"),
          unref(de).em("label", "left"),
          unref(de).is("active", !unref(Ie))
        ])
      }, [
        Fe.inactiveIcon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
          default: withCtx(() => [
            (openBlock(), createBlock(resolveDynamicComponent(Fe.inactiveIcon)))
          ]),
          _: 1
        })) : createCommentVNode("v-if", !0),
        !Fe.inactiveIcon && Fe.inactiveText ? (openBlock(), createElementBlock("span", {
          key: 1,
          "aria-hidden": unref(Ie)
        }, toDisplayString(Fe.inactiveText), 9, _hoisted_3$1)) : createCommentVNode("v-if", !0)
      ], 2)) : createCommentVNode("v-if", !0),
      createElementVNode("span", {
        ref_key: "core",
        ref: Ve,
        class: normalizeClass(unref(de).e("core")),
        style: normalizeStyle(unref(he))
      }, [
        Fe.inlinePrompt ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(de).e("inner"))
        }, [
          Fe.activeIcon || Fe.inactiveIcon ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            Fe.activeIcon ? (openBlock(), createBlock(unref(ElIcon), {
              key: 0,
              class: normalizeClass([unref(de).is("icon"), unref(Ie) ? unref(de).is("show") : unref(de).is("hide")])
            }, {
              default: withCtx(() => [
                (openBlock(), createBlock(resolveDynamicComponent(Fe.activeIcon)))
              ]),
              _: 1
            }, 8, ["class"])) : createCommentVNode("v-if", !0),
            Fe.inactiveIcon ? (openBlock(), createBlock(unref(ElIcon), {
              key: 1,
              class: normalizeClass([unref(de).is("icon"), unref(Ie) ? unref(de).is("hide") : unref(de).is("show")])
            }, {
              default: withCtx(() => [
                (openBlock(), createBlock(resolveDynamicComponent(Fe.inactiveIcon)))
              ]),
              _: 1
            }, 8, ["class"])) : createCommentVNode("v-if", !0)
          ], 64)) : Fe.activeText || Fe.inactiveIcon ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            Fe.activeText ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: normalizeClass([unref(de).is("text"), unref(Ie) ? unref(de).is("show") : unref(de).is("hide")]),
              "aria-hidden": !unref(Ie)
            }, toDisplayString(Fe.activeText.substring(0, 3)), 11, _hoisted_4)) : createCommentVNode("v-if", !0),
            Fe.inactiveText ? (openBlock(), createElementBlock("span", {
              key: 1,
              class: normalizeClass([unref(de).is("text"), unref(Ie) ? unref(de).is("hide") : unref(de).is("show")]),
              "aria-hidden": unref(Ie)
            }, toDisplayString(Fe.inactiveText.substring(0, 3)), 11, _hoisted_5)) : createCommentVNode("v-if", !0)
          ], 64)) : createCommentVNode("v-if", !0)
        ], 2)) : createCommentVNode("v-if", !0),
        createElementVNode("div", {
          class: normalizeClass(unref(de).e("action"))
        }, [
          Fe.loading ? (openBlock(), createBlock(unref(ElIcon), {
            key: 0,
            class: normalizeClass(unref(de).is("loading"))
          }, {
            default: withCtx(() => [
              createVNode(unref(loading_default))
            ]),
            _: 1
          }, 8, ["class"])) : createCommentVNode("v-if", !0)
        ], 2)
      ], 6),
      !Fe.inlinePrompt && (Fe.activeIcon || Fe.activeText) ? (openBlock(), createElementBlock("span", {
        key: 1,
        class: normalizeClass([
          unref(de).e("label"),
          unref(de).em("label", "right"),
          unref(de).is("active", unref(Ie))
        ])
      }, [
        Fe.activeIcon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
          default: withCtx(() => [
            (openBlock(), createBlock(resolveDynamicComponent(Fe.activeIcon)))
          ]),
          _: 1
        })) : createCommentVNode("v-if", !0),
        !Fe.activeIcon && Fe.activeText ? (openBlock(), createElementBlock("span", {
          key: 1,
          "aria-hidden": !unref(Ie)
        }, toDisplayString(Fe.activeText), 9, _hoisted_6)) : createCommentVNode("v-if", !0)
      ], 2)) : createCommentVNode("v-if", !0)
    ], 14, _hoisted_1$5));
  }
});
var Switch = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/switch/src/switch.vue"]]);
const ElSwitch = withInstall(Switch);
/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */
var matchHtmlRegExp = /["'&<>]/, escapeHtml_1 = escapeHtml;
function escapeHtml(e) {
  var k = "" + e, oe = matchHtmlRegExp.exec(k);
  if (!oe)
    return k;
  var re, ae = "", le = 0, ie = 0;
  for (le = oe.index; le < k.length; le++) {
    switch (k.charCodeAt(le)) {
      case 34:
        re = "&quot;";
        break;
      case 38:
        re = "&amp;";
        break;
      case 39:
        re = "&#39;";
        break;
      case 60:
        re = "&lt;";
        break;
      case 62:
        re = "&gt;";
        break;
      default:
        continue;
    }
    ie !== le && (ae += k.substring(ie, le)), ie = le + 1, ae += re;
  }
  return ie !== le ? ae + k.substring(ie, le) : ae;
}
const getCell = function(e) {
  var k;
  return (k = e.target) == null ? void 0 : k.closest("td");
}, isObject = function(e) {
  return e !== null && typeof e == "object";
}, orderBy = function(e, k, oe, re, ae) {
  if (!k && !re && (!ae || Array.isArray(ae) && !ae.length))
    return e;
  typeof oe == "string" ? oe = oe === "descending" ? -1 : 1 : oe = oe && oe < 0 ? -1 : 1;
  const le = re ? null : function(ue, de) {
    return ae ? (Array.isArray(ae) || (ae = [ae]), ae.map((pe) => typeof pe == "string" ? get(ue, pe) : pe(ue, de, e))) : (k !== "$key" && isObject(ue) && "$value" in ue && (ue = ue.$value), [isObject(ue) ? get(ue, k) : ue]);
  }, ie = function(ue, de) {
    if (re)
      return re(ue.value, de.value);
    for (let pe = 0, Ce = ue.key.length; pe < Ce; pe++) {
      if (ue.key[pe] < de.key[pe])
        return -1;
      if (ue.key[pe] > de.key[pe])
        return 1;
    }
    return 0;
  };
  return e.map((ue, de) => ({
    value: ue,
    index: de,
    key: le ? le(ue, de) : null
  })).sort((ue, de) => {
    let pe = ie(ue, de);
    return pe || (pe = ue.index - de.index), pe * +oe;
  }).map((ue) => ue.value);
}, getColumnById = function(e, k) {
  let oe = null;
  return e.columns.forEach((re) => {
    re.id === k && (oe = re);
  }), oe;
}, getColumnByKey = function(e, k) {
  let oe = null;
  for (let re = 0; re < e.columns.length; re++) {
    const ae = e.columns[re];
    if (ae.columnKey === k) {
      oe = ae;
      break;
    }
  }
  return oe;
}, getColumnByCell = function(e, k, oe) {
  const re = (k.className || "").match(new RegExp(`${oe}-table_[^\\s]+`, "gm"));
  return re ? getColumnById(e, re[0]) : null;
}, getRowIdentity = (e, k) => {
  if (!e)
    throw new Error("Row is required when get row identity");
  if (typeof k == "string") {
    if (!k.includes("."))
      return `${e[k]}`;
    const oe = k.split(".");
    let re = e;
    for (const ae of oe)
      re = re[ae];
    return `${re}`;
  } else if (typeof k == "function")
    return k.call(null, e);
}, getKeysMap = function(e, k) {
  const oe = {};
  return (e || []).forEach((re, ae) => {
    oe[getRowIdentity(re, k)] = { row: re, index: ae };
  }), oe;
};
function mergeOptions(e, k) {
  const oe = {};
  let re;
  for (re in e)
    oe[re] = e[re];
  for (re in k)
    if (hasOwn(k, re)) {
      const ae = k[re];
      typeof ae < "u" && (oe[re] = ae);
    }
  return oe;
}
function parseWidth(e) {
  return e === "" || e !== void 0 && (e = Number.parseInt(e, 10), Number.isNaN(e) && (e = "")), e;
}
function parseMinWidth(e) {
  return e === "" || e !== void 0 && (e = parseWidth(e), Number.isNaN(e) && (e = 80)), e;
}
function parseHeight(e) {
  return typeof e == "number" ? e : typeof e == "string" ? /^\d+(?:px)?$/.test(e) ? Number.parseInt(e, 10) : e : null;
}
function compose(...e) {
  return e.length === 0 ? (k) => k : e.length === 1 ? e[0] : e.reduce((k, oe) => (...re) => k(oe(...re)));
}
function toggleRowStatus(e, k, oe) {
  let re = !1;
  const ae = e.indexOf(k), le = ae !== -1, ie = () => {
    e.push(k), re = !0;
  }, ue = () => {
    e.splice(ae, 1), re = !0;
  };
  return typeof oe == "boolean" ? oe && !le ? ie() : !oe && le && ue() : le ? ue() : ie(), re;
}
function walkTreeNode(e, k, oe = "children", re = "hasChildren") {
  const ae = (ie) => !(Array.isArray(ie) && ie.length);
  function le(ie, ue, de) {
    k(ie, ue, de), ue.forEach((pe) => {
      if (pe[re]) {
        k(pe, null, de + 1);
        return;
      }
      const Ce = pe[oe];
      ae(Ce) || le(pe, Ce, de + 1);
    });
  }
  e.forEach((ie) => {
    if (ie[re]) {
      k(ie, null, 0);
      return;
    }
    const ue = ie[oe];
    ae(ue) || le(ie, ue, 0);
  });
}
let removePopper;
function createTablePopper(e, k, oe, re, ae) {
  const { nextZIndex: le } = useZIndex(), ie = e == null ? void 0 : e.dataset.prefix, ue = e == null ? void 0 : e.querySelector(`.${ie}-scrollbar__wrap`);
  function de() {
    const Ne = ae === "light", he = document.createElement("div");
    return he.className = `${ie}-popper ${Ne ? "is-light" : "is-dark"}`, oe = escapeHtml_1(oe), he.innerHTML = oe, he.style.zIndex = String(le()), e == null || e.appendChild(he), he;
  }
  function pe() {
    const Ne = document.createElement("div");
    return Ne.className = `${ie}-popper__arrow`, Ne;
  }
  function Ce() {
    _e && _e.update();
  }
  removePopper = () => {
    try {
      _e && _e.destroy(), $e && (e == null || e.removeChild($e)), k.removeEventListener("mouseenter", Ce), k.removeEventListener("mouseleave", removePopper), ue == null || ue.removeEventListener("scroll", removePopper), removePopper = void 0;
    } catch {
    }
  };
  let _e = null;
  const $e = de(), Ve = pe();
  return $e.appendChild(Ve), _e = yn(k, $e, {
    strategy: "absolute",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 8]
        }
      },
      {
        name: "arrow",
        options: {
          element: Ve,
          padding: 10
        }
      }
    ],
    ...re
  }), k.addEventListener("mouseenter", Ce), k.addEventListener("mouseleave", removePopper), ue == null || ue.addEventListener("scroll", removePopper), _e;
}
const isFixedColumn = (e, k, oe, re) => {
  let ae = 0, le = e;
  if (re) {
    if (re[e].colSpan > 1)
      return {};
    for (let de = 0; de < e; de++)
      ae += re[de].colSpan;
    le = ae + re[e].colSpan - 1;
  } else
    ae = e;
  let ie;
  const ue = oe.states.columns;
  switch (k) {
    case "left":
      le < oe.states.fixedLeafColumnsLength.value && (ie = "left");
      break;
    case "right":
      ae >= ue.value.length - oe.states.rightFixedLeafColumnsLength.value && (ie = "right");
      break;
    default:
      le < oe.states.fixedLeafColumnsLength.value ? ie = "left" : ae >= ue.value.length - oe.states.rightFixedLeafColumnsLength.value && (ie = "right");
  }
  return ie ? {
    direction: ie,
    start: ae,
    after: le
  } : {};
}, getFixedColumnsClass = (e, k, oe, re, ae) => {
  const le = [], { direction: ie, start: ue } = isFixedColumn(k, oe, re, ae);
  if (ie) {
    const de = ie === "left";
    le.push(`${e}-fixed-column--${ie}`), de && ue === re.states.fixedLeafColumnsLength.value - 1 ? le.push("is-last-column") : !de && ue === re.states.columns.value.length - re.states.rightFixedLeafColumnsLength.value && le.push("is-first-column");
  }
  return le;
};
function getOffset(e, k) {
  return e + (k.realWidth === null || Number.isNaN(k.realWidth) ? Number(k.width) : k.realWidth);
}
const getFixedColumnOffset = (e, k, oe, re) => {
  const { direction: ae, start: le = 0 } = isFixedColumn(e, k, oe, re);
  if (!ae)
    return;
  const ie = {}, ue = ae === "left", de = oe.states.columns.value;
  return ue ? ie.left = de.slice(0, e).reduce(getOffset, 0) : ie.right = de.slice(le + 1).reverse().reduce(getOffset, 0), ie;
}, ensurePosition = (e, k) => {
  !e || Number.isNaN(e[k]) || (e[k] = `${e[k]}px`);
};
function useExpand(e) {
  const k = getCurrentInstance(), oe = ref(!1), re = ref([]);
  return {
    updateExpandRows: () => {
      const de = e.data.value || [], pe = e.rowKey.value;
      if (oe.value)
        re.value = de.slice();
      else if (pe) {
        const Ce = getKeysMap(re.value, pe);
        re.value = de.reduce((_e, $e) => {
          const Ve = getRowIdentity($e, pe);
          return Ce[Ve] && _e.push($e), _e;
        }, []);
      } else
        re.value = [];
    },
    toggleRowExpansion: (de, pe) => {
      toggleRowStatus(re.value, de, pe) && k.emit("expand-change", de, re.value.slice());
    },
    setExpandRowKeys: (de) => {
      k.store.assertRowKey();
      const pe = e.data.value || [], Ce = e.rowKey.value, _e = getKeysMap(pe, Ce);
      re.value = de.reduce(($e, Ve) => {
        const Ne = _e[Ve];
        return Ne && $e.push(Ne.row), $e;
      }, []);
    },
    isRowExpanded: (de) => {
      const pe = e.rowKey.value;
      return pe ? !!getKeysMap(re.value, pe)[getRowIdentity(de, pe)] : re.value.includes(de);
    },
    states: {
      expandRows: re,
      defaultExpandAll: oe
    }
  };
}
function useCurrent(e) {
  const k = getCurrentInstance(), oe = ref(null), re = ref(null), ae = (pe) => {
    k.store.assertRowKey(), oe.value = pe, ie(pe);
  }, le = () => {
    oe.value = null;
  }, ie = (pe) => {
    const { data: Ce, rowKey: _e } = e;
    let $e = null;
    _e.value && ($e = (unref(Ce) || []).find((Ve) => getRowIdentity(Ve, _e.value) === pe)), re.value = $e, k.emit("current-change", re.value, null);
  };
  return {
    setCurrentRowKey: ae,
    restoreCurrentRowKey: le,
    setCurrentRowByKey: ie,
    updateCurrentRow: (pe) => {
      const Ce = re.value;
      if (pe && pe !== Ce) {
        re.value = pe, k.emit("current-change", re.value, Ce);
        return;
      }
      !pe && Ce && (re.value = null, k.emit("current-change", null, Ce));
    },
    updateCurrentRowData: () => {
      const pe = e.rowKey.value, Ce = e.data.value || [], _e = re.value;
      if (!Ce.includes(_e) && _e) {
        if (pe) {
          const $e = getRowIdentity(_e, pe);
          ie($e);
        } else
          re.value = null;
        re.value === null && k.emit("current-change", null, _e);
      } else
        oe.value && (ie(oe.value), le());
    },
    states: {
      _currentRowKey: oe,
      currentRow: re
    }
  };
}
function useTree(e) {
  const k = ref([]), oe = ref({}), re = ref(16), ae = ref(!1), le = ref({}), ie = ref("hasChildren"), ue = ref("children"), de = getCurrentInstance(), pe = computed(() => {
    if (!e.rowKey.value)
      return {};
    const Ie = e.data.value || [];
    return _e(Ie);
  }), Ce = computed(() => {
    const Ie = e.rowKey.value, qe = Object.keys(le.value), xe = {};
    return qe.length && qe.forEach((ze) => {
      if (le.value[ze].length) {
        const At = { children: [] };
        le.value[ze].forEach((Fe) => {
          const Pt = getRowIdentity(Fe, Ie);
          At.children.push(Pt), Fe[ie.value] && !xe[Pt] && (xe[Pt] = { children: [] });
        }), xe[ze] = At;
      }
    }), xe;
  }), _e = (Ie) => {
    const qe = e.rowKey.value, xe = {};
    return walkTreeNode(Ie, (ze, At, Fe) => {
      const Pt = getRowIdentity(ze, qe);
      Array.isArray(At) ? xe[Pt] = {
        children: At.map((vn) => getRowIdentity(vn, qe)),
        level: Fe
      } : ae.value && (xe[Pt] = {
        children: [],
        lazy: !0,
        level: Fe
      });
    }, ue.value, ie.value), xe;
  }, $e = (Ie = !1, qe = ((xe) => (xe = de.store) == null ? void 0 : xe.states.defaultExpandAll.value)()) => {
    var xe;
    const ze = pe.value, At = Ce.value, Fe = Object.keys(ze), Pt = {};
    if (Fe.length) {
      const vn = unref(oe), En = [], Nn = (wn, Lt) => {
        if (Ie)
          return k.value ? qe || k.value.includes(Lt) : !!(qe || (wn == null ? void 0 : wn.expanded));
        {
          const Dt = qe || k.value && k.value.includes(Lt);
          return !!((wn == null ? void 0 : wn.expanded) || Dt);
        }
      };
      Fe.forEach((wn) => {
        const Lt = vn[wn], Dt = { ...ze[wn] };
        if (Dt.expanded = Nn(Lt, wn), Dt.lazy) {
          const { loaded: Cn = !1, loading: jt = !1 } = Lt || {};
          Dt.loaded = !!Cn, Dt.loading = !!jt, En.push(wn);
        }
        Pt[wn] = Dt;
      });
      const Tn = Object.keys(At);
      ae.value && Tn.length && En.length && Tn.forEach((wn) => {
        const Lt = vn[wn], Dt = At[wn].children;
        if (En.includes(wn)) {
          if (Pt[wn].children.length !== 0)
            throw new Error("[ElTable]children must be an empty array.");
          Pt[wn].children = Dt;
        } else {
          const { loaded: Cn = !1, loading: jt = !1 } = Lt || {};
          Pt[wn] = {
            lazy: !0,
            loaded: !!Cn,
            loading: !!jt,
            expanded: Nn(Lt, wn),
            children: Dt,
            level: ""
          };
        }
      });
    }
    oe.value = Pt, (xe = de.store) == null || xe.updateTableScrollY();
  };
  watch(() => k.value, () => {
    $e(!0);
  }), watch(() => pe.value, () => {
    $e();
  }), watch(() => Ce.value, () => {
    $e();
  });
  const Ve = (Ie) => {
    k.value = Ie, $e();
  }, Ne = (Ie, qe) => {
    de.store.assertRowKey();
    const xe = e.rowKey.value, ze = getRowIdentity(Ie, xe), At = ze && oe.value[ze];
    if (ze && At && "expanded" in At) {
      const Fe = At.expanded;
      qe = typeof qe > "u" ? !At.expanded : qe, oe.value[ze].expanded = qe, Fe !== qe && de.emit("expand-change", Ie, qe), de.store.updateTableScrollY();
    }
  }, he = (Ie) => {
    de.store.assertRowKey();
    const qe = e.rowKey.value, xe = getRowIdentity(Ie, qe), ze = oe.value[xe];
    ae.value && ze && "loaded" in ze && !ze.loaded ? Oe(Ie, xe, ze) : Ne(Ie, void 0);
  }, Oe = (Ie, qe, xe) => {
    const { load: ze } = de.props;
    ze && !oe.value[qe].loaded && (oe.value[qe].loading = !0, ze(Ie, xe, (At) => {
      if (!Array.isArray(At))
        throw new TypeError("[ElTable] data must be an array");
      oe.value[qe].loading = !1, oe.value[qe].loaded = !0, oe.value[qe].expanded = !0, At.length && (le.value[qe] = At), de.emit("expand-change", Ie, !0);
    }));
  };
  return {
    loadData: Oe,
    loadOrToggle: he,
    toggleTreeExpansion: Ne,
    updateTreeExpandKeys: Ve,
    updateTreeData: $e,
    normalize: _e,
    states: {
      expandRowKeys: k,
      treeData: oe,
      indent: re,
      lazy: ae,
      lazyTreeNodeMap: le,
      lazyColumnIdentifier: ie,
      childrenColumnName: ue
    }
  };
}
const sortData = (e, k) => {
  const oe = k.sortingColumn;
  return !oe || typeof oe.sortable == "string" ? e : orderBy(e, k.sortProp, k.sortOrder, oe.sortMethod, oe.sortBy);
}, doFlattenColumns = (e) => {
  const k = [];
  return e.forEach((oe) => {
    oe.children ? k.push.apply(k, doFlattenColumns(oe.children)) : k.push(oe);
  }), k;
};
function useWatcher$1() {
  var e;
  const k = getCurrentInstance(), { size: oe } = toRefs((e = k.proxy) == null ? void 0 : e.$props), re = ref(null), ae = ref([]), le = ref([]), ie = ref(!1), ue = ref([]), de = ref([]), pe = ref([]), Ce = ref([]), _e = ref([]), $e = ref([]), Ve = ref([]), Ne = ref([]), he = ref(0), Oe = ref(0), Ie = ref(0), qe = ref(!1), xe = ref([]), ze = ref(!1), At = ref(!1), Fe = ref(null), Pt = ref({}), vn = ref(null), En = ref(null), Nn = ref(null), Tn = ref(null), wn = ref(null);
  watch(ae, () => k.state && Cn(!1), {
    deep: !0
  });
  const Lt = () => {
    if (!re.value)
      throw new Error("[ElTable] prop row-key is required");
  }, Dt = () => {
    Ce.value = ue.value.filter((xn) => xn.fixed === !0 || xn.fixed === "left"), _e.value = ue.value.filter((xn) => xn.fixed === "right"), Ce.value.length > 0 && ue.value[0] && ue.value[0].type === "selection" && !ue.value[0].fixed && (ue.value[0].fixed = !0, Ce.value.unshift(ue.value[0]));
    const $n = ue.value.filter((xn) => !xn.fixed);
    de.value = [].concat(Ce.value).concat($n).concat(_e.value);
    const Mn = doFlattenColumns($n), Ue = doFlattenColumns(Ce.value), Sn = doFlattenColumns(_e.value);
    he.value = Mn.length, Oe.value = Ue.length, Ie.value = Sn.length, pe.value = [].concat(Ue).concat(Mn).concat(Sn), ie.value = Ce.value.length > 0 || _e.value.length > 0;
  }, Cn = ($n, Mn = !1) => {
    $n && Dt(), Mn ? k.state.doLayout() : k.state.debouncedUpdateLayout();
  }, jt = ($n) => xe.value.includes($n), bn = () => {
    qe.value = !1, xe.value.length && (xe.value = [], k.emit("selection-change", []));
  }, kt = () => {
    let $n;
    if (re.value) {
      $n = [];
      const Mn = getKeysMap(xe.value, re.value), Ue = getKeysMap(ae.value, re.value);
      for (const Sn in Mn)
        hasOwn(Mn, Sn) && !Ue[Sn] && $n.push(Mn[Sn].row);
    } else
      $n = xe.value.filter((Mn) => !ae.value.includes(Mn));
    if ($n.length) {
      const Mn = xe.value.filter((Ue) => !$n.includes(Ue));
      xe.value = Mn, k.emit("selection-change", Mn.slice());
    }
  }, Et = () => (xe.value || []).slice(), _n = ($n, Mn = void 0, Ue = !0) => {
    if (toggleRowStatus(xe.value, $n, Mn)) {
      const xn = (xe.value || []).slice();
      Ue && k.emit("select", xn, $n), k.emit("selection-change", xn);
    }
  }, Pn = () => {
    var $n, Mn;
    const Ue = At.value ? !qe.value : !(qe.value || xe.value.length);
    qe.value = Ue;
    let Sn = !1, xn = 0;
    const jn = (Mn = ($n = k == null ? void 0 : k.store) == null ? void 0 : $n.states) == null ? void 0 : Mn.rowKey.value;
    ae.value.forEach((Ln, Kn) => {
      const Un = Kn + xn;
      Fe.value ? Fe.value.call(null, Ln, Un) && toggleRowStatus(xe.value, Ln, Ue) && (Sn = !0) : toggleRowStatus(xe.value, Ln, Ue) && (Sn = !0), xn += Dn(getRowIdentity(Ln, jn));
    }), Sn && k.emit("selection-change", xe.value ? xe.value.slice() : []), k.emit("select-all", xe.value);
  }, hn = () => {
    const $n = getKeysMap(xe.value, re.value);
    ae.value.forEach((Mn) => {
      const Ue = getRowIdentity(Mn, re.value), Sn = $n[Ue];
      Sn && (xe.value[Sn.index] = Mn);
    });
  }, On = () => {
    var $n, Mn, Ue;
    if ((($n = ae.value) == null ? void 0 : $n.length) === 0) {
      qe.value = !1;
      return;
    }
    let Sn;
    re.value && (Sn = getKeysMap(xe.value, re.value));
    const xn = function(Un) {
      return Sn ? !!Sn[getRowIdentity(Un, re.value)] : xe.value.includes(Un);
    };
    let jn = !0, Ln = 0, Kn = 0;
    for (let Un = 0, uo = (ae.value || []).length; Un < uo; Un++) {
      const io = (Ue = (Mn = k == null ? void 0 : k.store) == null ? void 0 : Mn.states) == null ? void 0 : Ue.rowKey.value, so = Un + Kn, to = ae.value[Un], co = Fe.value && Fe.value.call(null, to, so);
      if (xn(to))
        Ln++;
      else if (!Fe.value || co) {
        jn = !1;
        break;
      }
      Kn += Dn(getRowIdentity(to, io));
    }
    Ln === 0 && (jn = !1), qe.value = jn;
  }, Dn = ($n) => {
    var Mn;
    if (!k || !k.store)
      return 0;
    const { treeData: Ue } = k.store.states;
    let Sn = 0;
    const xn = (Mn = Ue.value[$n]) == null ? void 0 : Mn.children;
    return xn && (Sn += xn.length, xn.forEach((jn) => {
      Sn += Dn(jn);
    })), Sn;
  }, Rn = ($n, Mn) => {
    Array.isArray($n) || ($n = [$n]);
    const Ue = {};
    return $n.forEach((Sn) => {
      Pt.value[Sn.id] = Mn, Ue[Sn.columnKey || Sn.id] = Mn;
    }), Ue;
  }, Fn = ($n, Mn, Ue) => {
    En.value && En.value !== $n && (En.value.order = null), En.value = $n, Nn.value = Mn, Tn.value = Ue;
  }, kn = () => {
    let $n = unref(le);
    Object.keys(Pt.value).forEach((Mn) => {
      const Ue = Pt.value[Mn];
      if (!Ue || Ue.length === 0)
        return;
      const Sn = getColumnById({
        columns: pe.value
      }, Mn);
      Sn && Sn.filterMethod && ($n = $n.filter((xn) => Ue.some((jn) => Sn.filterMethod.call(null, jn, xn, Sn))));
    }), vn.value = $n;
  }, An = () => {
    ae.value = sortData(vn.value, {
      sortingColumn: En.value,
      sortProp: Nn.value,
      sortOrder: Tn.value
    });
  }, Vn = ($n = void 0) => {
    $n && $n.filter || kn(), An();
  }, Bn = ($n) => {
    const { tableHeaderRef: Mn } = k.refs;
    if (!Mn)
      return;
    const Ue = Object.assign({}, Mn.filterPanels), Sn = Object.keys(Ue);
    if (!!Sn.length)
      if (typeof $n == "string" && ($n = [$n]), Array.isArray($n)) {
        const xn = $n.map((jn) => getColumnByKey({
          columns: pe.value
        }, jn));
        Sn.forEach((jn) => {
          const Ln = xn.find((Kn) => Kn.id === jn);
          Ln && (Ln.filteredValue = []);
        }), k.store.commit("filterChange", {
          column: xn,
          values: [],
          silent: !0,
          multi: !0
        });
      } else
        Sn.forEach((xn) => {
          const jn = pe.value.find((Ln) => Ln.id === xn);
          jn && (jn.filteredValue = []);
        }), Pt.value = {}, k.store.commit("filterChange", {
          column: {},
          values: [],
          silent: !0
        });
  }, Wn = () => {
    !En.value || (Fn(null, null, null), k.store.commit("changeSortCondition", {
      silent: !0
    }));
  }, {
    setExpandRowKeys: Yn,
    toggleRowExpansion: Xn,
    updateExpandRows: eo,
    states: Gn,
    isRowExpanded: no
  } = useExpand({
    data: ae,
    rowKey: re
  }), {
    updateTreeExpandKeys: oo,
    toggleTreeExpansion: zn,
    updateTreeData: Hn,
    loadOrToggle: qn,
    states: Zn
  } = useTree({
    data: ae,
    rowKey: re
  }), {
    updateCurrentRowData: lo,
    updateCurrentRow: ao,
    setCurrentRowKey: In,
    states: Jn
  } = useCurrent({
    data: ae,
    rowKey: re
  });
  return {
    assertRowKey: Lt,
    updateColumns: Dt,
    scheduleLayout: Cn,
    isSelected: jt,
    clearSelection: bn,
    cleanSelection: kt,
    getSelectionRows: Et,
    toggleRowSelection: _n,
    _toggleAllSelection: Pn,
    toggleAllSelection: null,
    updateSelectionByRowKey: hn,
    updateAllSelected: On,
    updateFilters: Rn,
    updateCurrentRow: ao,
    updateSort: Fn,
    execFilter: kn,
    execSort: An,
    execQuery: Vn,
    clearFilter: Bn,
    clearSort: Wn,
    toggleRowExpansion: Xn,
    setExpandRowKeysAdapter: ($n) => {
      Yn($n), oo($n);
    },
    setCurrentRowKey: In,
    toggleRowExpansionAdapter: ($n, Mn) => {
      pe.value.some(({ type: Sn }) => Sn === "expand") ? Xn($n, Mn) : zn($n, Mn);
    },
    isRowExpanded: no,
    updateExpandRows: eo,
    updateCurrentRowData: lo,
    loadOrToggle: qn,
    updateTreeData: Hn,
    states: {
      tableSize: oe,
      rowKey: re,
      data: ae,
      _data: le,
      isComplex: ie,
      _columns: ue,
      originColumns: de,
      columns: pe,
      fixedColumns: Ce,
      rightFixedColumns: _e,
      leafColumns: $e,
      fixedLeafColumns: Ve,
      rightFixedLeafColumns: Ne,
      leafColumnsLength: he,
      fixedLeafColumnsLength: Oe,
      rightFixedLeafColumnsLength: Ie,
      isAllSelected: qe,
      selection: xe,
      reserveSelection: ze,
      selectOnIndeterminate: At,
      selectable: Fe,
      filters: Pt,
      filteredData: vn,
      sortingColumn: En,
      sortProp: Nn,
      sortOrder: Tn,
      hoverRow: wn,
      ...Gn,
      ...Zn,
      ...Jn
    }
  };
}
function replaceColumn(e, k) {
  return e.map((oe) => {
    var re;
    return oe.id === k.id ? k : ((re = oe.children) != null && re.length && (oe.children = replaceColumn(oe.children, k)), oe);
  });
}
function sortColumn(e) {
  e.forEach((k) => {
    var oe, re;
    k.no = (oe = k.getColumnIndex) == null ? void 0 : oe.call(k), (re = k.children) != null && re.length && sortColumn(k.children);
  }), e.sort((k, oe) => k.no - oe.no);
}
function useStore() {
  const e = getCurrentInstance(), k = useWatcher$1();
  return {
    ns: useNamespace("table"),
    ...k,
    mutations: {
      setData(ie, ue) {
        const de = unref(ie._data) !== ue;
        ie.data.value = ue, ie._data.value = ue, e.store.execQuery(), e.store.updateCurrentRowData(), e.store.updateExpandRows(), e.store.updateTreeData(e.store.states.defaultExpandAll.value), unref(ie.reserveSelection) ? (e.store.assertRowKey(), e.store.updateSelectionByRowKey()) : de ? e.store.clearSelection() : e.store.cleanSelection(), e.store.updateAllSelected(), e.$ready && e.store.scheduleLayout();
      },
      insertColumn(ie, ue, de) {
        const pe = unref(ie._columns);
        let Ce = [];
        de ? (de && !de.children && (de.children = []), de.children.push(ue), Ce = replaceColumn(pe, de)) : (pe.push(ue), Ce = pe), sortColumn(Ce), ie._columns.value = Ce, ue.type === "selection" && (ie.selectable.value = ue.selectable, ie.reserveSelection.value = ue.reserveSelection), e.$ready && (e.store.updateColumns(), e.store.scheduleLayout());
      },
      removeColumn(ie, ue, de) {
        const pe = unref(ie._columns) || [];
        if (de)
          de.children.splice(de.children.findIndex((Ce) => Ce.id === ue.id), 1), de.children.length === 0 && delete de.children, ie._columns.value = replaceColumn(pe, de);
        else {
          const Ce = pe.indexOf(ue);
          Ce > -1 && (pe.splice(Ce, 1), ie._columns.value = pe);
        }
        e.$ready && (e.store.updateColumns(), e.store.scheduleLayout());
      },
      sort(ie, ue) {
        const { prop: de, order: pe, init: Ce } = ue;
        if (de) {
          const _e = unref(ie.columns).find(($e) => $e.property === de);
          _e && (_e.order = pe, e.store.updateSort(_e, de, pe), e.store.commit("changeSortCondition", { init: Ce }));
        }
      },
      changeSortCondition(ie, ue) {
        const { sortingColumn: de, sortProp: pe, sortOrder: Ce } = ie;
        unref(Ce) === null && (ie.sortingColumn.value = null, ie.sortProp.value = null);
        const _e = { filter: !0 };
        e.store.execQuery(_e), (!ue || !(ue.silent || ue.init)) && e.emit("sort-change", {
          column: unref(de),
          prop: unref(pe),
          order: unref(Ce)
        }), e.store.updateTableScrollY();
      },
      filterChange(ie, ue) {
        const { column: de, values: pe, silent: Ce } = ue, _e = e.store.updateFilters(de, pe);
        e.store.execQuery(), Ce || e.emit("filter-change", _e), e.store.updateTableScrollY();
      },
      toggleAllSelection() {
        e.store.toggleAllSelection();
      },
      rowSelectedChanged(ie, ue) {
        e.store.toggleRowSelection(ue), e.store.updateAllSelected();
      },
      setHoverRow(ie, ue) {
        ie.hoverRow.value = ue;
      },
      setCurrentRow(ie, ue) {
        e.store.updateCurrentRow(ue);
      }
    },
    commit: function(ie, ...ue) {
      const de = e.store.mutations;
      if (de[ie])
        de[ie].apply(e, [e.store.states].concat(ue));
      else
        throw new Error(`Action not found: ${ie}`);
    },
    updateTableScrollY: function() {
      nextTick(() => e.layout.updateScrollY.apply(e.layout));
    }
  };
}
const InitialStateMap = {
  rowKey: "rowKey",
  defaultExpandAll: "defaultExpandAll",
  selectOnIndeterminate: "selectOnIndeterminate",
  indent: "indent",
  lazy: "lazy",
  data: "data",
  ["treeProps.hasChildren"]: {
    key: "lazyColumnIdentifier",
    default: "hasChildren"
  },
  ["treeProps.children"]: {
    key: "childrenColumnName",
    default: "children"
  }
};
function createStore(e, k) {
  if (!e)
    throw new Error("Table is required.");
  const oe = useStore();
  return oe.toggleAllSelection = debounce(oe._toggleAllSelection, 10), Object.keys(InitialStateMap).forEach((re) => {
    handleValue(getArrKeysValue(k, re), re, oe);
  }), proxyTableProps(oe, k), oe;
}
function proxyTableProps(e, k) {
  Object.keys(InitialStateMap).forEach((oe) => {
    watch(() => getArrKeysValue(k, oe), (re) => {
      handleValue(re, oe, e);
    });
  });
}
function handleValue(e, k, oe) {
  let re = e, ae = InitialStateMap[k];
  typeof InitialStateMap[k] == "object" && (ae = ae.key, re = re || InitialStateMap[k].default), oe.states[ae].value = re;
}
function getArrKeysValue(e, k) {
  if (k.includes(".")) {
    const oe = k.split(".");
    let re = e;
    return oe.forEach((ae) => {
      re = re[ae];
    }), re;
  } else
    return e[k];
}
class TableLayout {
  constructor(k) {
    this.observers = [], this.table = null, this.store = null, this.columns = [], this.fit = !0, this.showHeader = !0, this.height = ref(null), this.scrollX = ref(!1), this.scrollY = ref(!1), this.bodyWidth = ref(null), this.fixedWidth = ref(null), this.rightFixedWidth = ref(null), this.gutterWidth = 0;
    for (const oe in k)
      hasOwn(k, oe) && (isRef(this[oe]) ? this[oe].value = k[oe] : this[oe] = k[oe]);
    if (!this.table)
      throw new Error("Table is required for Table Layout");
    if (!this.store)
      throw new Error("Store is required for Table Layout");
  }
  updateScrollY() {
    if (this.height.value === null)
      return !1;
    const oe = this.table.refs.scrollBarRef;
    if (this.table.vnode.el && oe) {
      let re = !0;
      const ae = this.scrollY.value;
      return re = oe.wrap$.scrollHeight > oe.wrap$.clientHeight, this.scrollY.value = re, ae !== re;
    }
    return !1;
  }
  setHeight(k, oe = "height") {
    if (!isClient$1)
      return;
    const re = this.table.vnode.el;
    if (k = parseHeight(k), this.height.value = Number(k), !re && (k || k === 0))
      return nextTick(() => this.setHeight(k, oe));
    typeof k == "number" ? (re.style[oe] = `${k}px`, this.updateElsHeight()) : typeof k == "string" && (re.style[oe] = k, this.updateElsHeight());
  }
  setMaxHeight(k) {
    this.setHeight(k, "max-height");
  }
  getFlattenColumns() {
    const k = [];
    return this.table.store.states.columns.value.forEach((re) => {
      re.isColumnGroup ? k.push.apply(k, re.columns) : k.push(re);
    }), k;
  }
  updateElsHeight() {
    this.updateScrollY(), this.notifyObservers("scrollable");
  }
  headerDisplayNone(k) {
    if (!k)
      return !0;
    let oe = k;
    for (; oe.tagName !== "DIV"; ) {
      if (getComputedStyle(oe).display === "none")
        return !0;
      oe = oe.parentElement;
    }
    return !1;
  }
  updateColumnsWidth() {
    if (!isClient$1)
      return;
    const k = this.fit, oe = this.table.vnode.el.clientWidth;
    let re = 0;
    const ae = this.getFlattenColumns(), le = ae.filter((de) => typeof de.width != "number");
    if (ae.forEach((de) => {
      typeof de.width == "number" && de.realWidth && (de.realWidth = null);
    }), le.length > 0 && k) {
      if (ae.forEach((de) => {
        re += Number(de.width || de.minWidth || 80);
      }), re <= oe) {
        this.scrollX.value = !1;
        const de = oe - re;
        if (le.length === 1)
          le[0].realWidth = Number(le[0].minWidth || 80) + de;
        else {
          const pe = le.reduce(($e, Ve) => $e + Number(Ve.minWidth || 80), 0), Ce = de / pe;
          let _e = 0;
          le.forEach(($e, Ve) => {
            if (Ve === 0)
              return;
            const Ne = Math.floor(Number($e.minWidth || 80) * Ce);
            _e += Ne, $e.realWidth = Number($e.minWidth || 80) + Ne;
          }), le[0].realWidth = Number(le[0].minWidth || 80) + de - _e;
        }
      } else
        this.scrollX.value = !0, le.forEach((de) => {
          de.realWidth = Number(de.minWidth);
        });
      this.bodyWidth.value = Math.max(re, oe), this.table.state.resizeState.value.width = this.bodyWidth.value;
    } else
      ae.forEach((de) => {
        !de.width && !de.minWidth ? de.realWidth = 80 : de.realWidth = Number(de.width || de.minWidth), re += de.realWidth;
      }), this.scrollX.value = re > oe, this.bodyWidth.value = re;
    const ie = this.store.states.fixedColumns.value;
    if (ie.length > 0) {
      let de = 0;
      ie.forEach((pe) => {
        de += Number(pe.realWidth || pe.width);
      }), this.fixedWidth.value = de;
    }
    const ue = this.store.states.rightFixedColumns.value;
    if (ue.length > 0) {
      let de = 0;
      ue.forEach((pe) => {
        de += Number(pe.realWidth || pe.width);
      }), this.rightFixedWidth.value = de;
    }
    this.notifyObservers("columns");
  }
  addObserver(k) {
    this.observers.push(k);
  }
  removeObserver(k) {
    const oe = this.observers.indexOf(k);
    oe !== -1 && this.observers.splice(oe, 1);
  }
  notifyObservers(k) {
    this.observers.forEach((re) => {
      var ae, le;
      switch (k) {
        case "columns":
          (ae = re.state) == null || ae.onColumnsChange(this);
          break;
        case "scrollable":
          (le = re.state) == null || le.onScrollableChange(this);
          break;
        default:
          throw new Error(`Table Layout don't have event ${k}.`);
      }
    });
  }
}
const { CheckboxGroup: ElCheckboxGroup } = ElCheckbox, _sfc_main$a = defineComponent({
  name: "ElTableFilterPanel",
  components: {
    ElCheckbox,
    ElCheckboxGroup,
    ElScrollbar,
    ElTooltip,
    ElIcon,
    ArrowDown: arrow_down_default,
    ArrowUp: arrow_up_default
  },
  directives: { ClickOutside },
  props: {
    placement: {
      type: String,
      default: "bottom-start"
    },
    store: {
      type: Object
    },
    column: {
      type: Object
    },
    upDataColumn: {
      type: Function
    }
  },
  setup(e) {
    const k = getCurrentInstance(), { t: oe } = useLocale(), re = useNamespace("table-filter"), ae = k == null ? void 0 : k.parent;
    ae.filterPanels.value[e.column.id] || (ae.filterPanels.value[e.column.id] = k);
    const le = ref(!1), ie = ref(null), ue = computed(() => e.column && e.column.filters), de = computed({
      get: () => {
        var ze;
        return (((ze = e.column) == null ? void 0 : ze.filteredValue) || [])[0];
      },
      set: (ze) => {
        pe.value && (typeof ze < "u" && ze !== null ? pe.value.splice(0, 1, ze) : pe.value.splice(0, 1));
      }
    }), pe = computed({
      get() {
        return e.column ? e.column.filteredValue || [] : [];
      },
      set(ze) {
        e.column && e.upDataColumn("filteredValue", ze);
      }
    }), Ce = computed(() => e.column ? e.column.filterMultiple : !0), _e = (ze) => ze.value === de.value, $e = () => {
      le.value = !1;
    }, Ve = (ze) => {
      ze.stopPropagation(), le.value = !le.value;
    }, Ne = () => {
      le.value = !1;
    }, he = () => {
      qe(pe.value), $e();
    }, Oe = () => {
      pe.value = [], qe(pe.value), $e();
    }, Ie = (ze) => {
      de.value = ze, qe(typeof ze < "u" && ze !== null ? pe.value : []), $e();
    }, qe = (ze) => {
      e.store.commit("filterChange", {
        column: e.column,
        values: ze
      }), e.store.updateAllSelected();
    };
    watch(le, (ze) => {
      e.column && e.upDataColumn("filterOpened", ze);
    }, {
      immediate: !0
    });
    const xe = computed(() => {
      var ze, At;
      return (At = (ze = ie.value) == null ? void 0 : ze.popperRef) == null ? void 0 : At.contentRef;
    });
    return {
      tooltipVisible: le,
      multiple: Ce,
      filteredValue: pe,
      filterValue: de,
      filters: ue,
      handleConfirm: he,
      handleReset: Oe,
      handleSelect: Ie,
      isActive: _e,
      t: oe,
      ns: re,
      showFilterPanel: Ve,
      hideFilterPanel: Ne,
      popperPaneRef: xe,
      tooltip: ie
    };
  }
}), _hoisted_1$4 = { key: 0 }, _hoisted_2$1 = ["disabled"], _hoisted_3 = ["label", "onClick"];
function _sfc_render$5(e, k, oe, re, ae, le) {
  const ie = resolveComponent("el-checkbox"), ue = resolveComponent("el-checkbox-group"), de = resolveComponent("el-scrollbar"), pe = resolveComponent("arrow-up"), Ce = resolveComponent("arrow-down"), _e = resolveComponent("el-icon"), $e = resolveComponent("el-tooltip"), Ve = resolveDirective("click-outside");
  return openBlock(), createBlock($e, {
    ref: "tooltip",
    visible: e.tooltipVisible,
    offset: 0,
    placement: e.placement,
    "show-arrow": !1,
    "stop-popper-mouse-event": !1,
    teleported: "",
    effect: "light",
    pure: "",
    "popper-class": e.ns.b(),
    persistent: ""
  }, {
    content: withCtx(() => [
      e.multiple ? (openBlock(), createElementBlock("div", _hoisted_1$4, [
        createElementVNode("div", {
          class: normalizeClass(e.ns.e("content"))
        }, [
          createVNode(de, {
            "wrap-class": e.ns.e("wrap")
          }, {
            default: withCtx(() => [
              createVNode(ue, {
                modelValue: e.filteredValue,
                "onUpdate:modelValue": k[0] || (k[0] = (Ne) => e.filteredValue = Ne),
                class: normalizeClass(e.ns.e("checkbox-group"))
              }, {
                default: withCtx(() => [
                  (openBlock(!0), createElementBlock(Fragment, null, renderList(e.filters, (Ne) => (openBlock(), createBlock(ie, {
                    key: Ne.value,
                    label: Ne.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(Ne.text), 1)
                    ]),
                    _: 2
                  }, 1032, ["label"]))), 128))
                ]),
                _: 1
              }, 8, ["modelValue", "class"])
            ]),
            _: 1
          }, 8, ["wrap-class"])
        ], 2),
        createElementVNode("div", {
          class: normalizeClass(e.ns.e("bottom"))
        }, [
          createElementVNode("button", {
            class: normalizeClass({ [e.ns.is("disabled")]: e.filteredValue.length === 0 }),
            disabled: e.filteredValue.length === 0,
            type: "button",
            onClick: k[1] || (k[1] = (...Ne) => e.handleConfirm && e.handleConfirm(...Ne))
          }, toDisplayString(e.t("el.table.confirmFilter")), 11, _hoisted_2$1),
          createElementVNode("button", {
            type: "button",
            onClick: k[2] || (k[2] = (...Ne) => e.handleReset && e.handleReset(...Ne))
          }, toDisplayString(e.t("el.table.resetFilter")), 1)
        ], 2)
      ])) : (openBlock(), createElementBlock("ul", {
        key: 1,
        class: normalizeClass(e.ns.e("list"))
      }, [
        createElementVNode("li", {
          class: normalizeClass([
            e.ns.e("list-item"),
            {
              [e.ns.is("active")]: e.filterValue === void 0 || e.filterValue === null
            }
          ]),
          onClick: k[3] || (k[3] = (Ne) => e.handleSelect(null))
        }, toDisplayString(e.t("el.table.clearFilter")), 3),
        (openBlock(!0), createElementBlock(Fragment, null, renderList(e.filters, (Ne) => (openBlock(), createElementBlock("li", {
          key: Ne.value,
          class: normalizeClass([e.ns.e("list-item"), e.ns.is("active", e.isActive(Ne))]),
          label: Ne.value,
          onClick: (he) => e.handleSelect(Ne.value)
        }, toDisplayString(Ne.text), 11, _hoisted_3))), 128))
      ], 2))
    ]),
    default: withCtx(() => [
      withDirectives((openBlock(), createElementBlock("span", {
        class: normalizeClass([
          `${e.ns.namespace.value}-table__column-filter-trigger`,
          `${e.ns.namespace.value}-none-outline`
        ]),
        onClick: k[4] || (k[4] = (...Ne) => e.showFilterPanel && e.showFilterPanel(...Ne))
      }, [
        createVNode(_e, null, {
          default: withCtx(() => [
            e.column.filterOpened ? (openBlock(), createBlock(pe, { key: 0 })) : (openBlock(), createBlock(Ce, { key: 1 }))
          ]),
          _: 1
        })
      ], 2)), [
        [Ve, e.hideFilterPanel, e.popperPaneRef]
      ])
    ]),
    _: 1
  }, 8, ["visible", "placement", "popper-class"]);
}
var FilterPanel = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$5], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/table/src/filter-panel.vue"]]);
function useLayoutObserver(e) {
  const k = getCurrentInstance();
  onBeforeMount(() => {
    oe.value.addObserver(k);
  }), onMounted(() => {
    re(oe.value), ae(oe.value);
  }), onUpdated(() => {
    re(oe.value), ae(oe.value);
  }), onUnmounted(() => {
    oe.value.removeObserver(k);
  });
  const oe = computed(() => {
    const le = e.layout;
    if (!le)
      throw new Error("Can not find table layout.");
    return le;
  }), re = (le) => {
    var ie;
    const ue = ((ie = e.vnode.el) == null ? void 0 : ie.querySelectorAll("colgroup > col")) || [];
    if (!ue.length)
      return;
    const de = le.getFlattenColumns(), pe = {};
    de.forEach((Ce) => {
      pe[Ce.id] = Ce;
    });
    for (let Ce = 0, _e = ue.length; Ce < _e; Ce++) {
      const $e = ue[Ce], Ve = $e.getAttribute("name"), Ne = pe[Ve];
      Ne && $e.setAttribute("width", Ne.realWidth || Ne.width);
    }
  }, ae = (le) => {
    var ie, ue;
    const de = ((ie = e.vnode.el) == null ? void 0 : ie.querySelectorAll("colgroup > col[name=gutter]")) || [];
    for (let Ce = 0, _e = de.length; Ce < _e; Ce++)
      de[Ce].setAttribute("width", le.scrollY.value ? le.gutterWidth : "0");
    const pe = ((ue = e.vnode.el) == null ? void 0 : ue.querySelectorAll("th.gutter")) || [];
    for (let Ce = 0, _e = pe.length; Ce < _e; Ce++) {
      const $e = pe[Ce];
      $e.style.width = le.scrollY.value ? `${le.gutterWidth}px` : "0", $e.style.display = le.scrollY.value ? "" : "none";
    }
  };
  return {
    tableLayout: oe.value,
    onColumnsChange: re,
    onScrollableChange: ae
  };
}
const TABLE_INJECTION_KEY = Symbol("ElTable");
function useEvent(e, k) {
  const oe = getCurrentInstance(), re = inject(TABLE_INJECTION_KEY), ae = (he) => {
    he.stopPropagation();
  }, le = (he, Oe) => {
    !Oe.filters && Oe.sortable ? Ne(he, Oe, !1) : Oe.filterable && !Oe.sortable && ae(he), re == null || re.emit("header-click", Oe, he);
  }, ie = (he, Oe) => {
    re == null || re.emit("header-contextmenu", Oe, he);
  }, ue = ref(null), de = ref(!1), pe = ref({}), Ce = (he, Oe) => {
    if (!!isClient$1 && !(Oe.children && Oe.children.length > 0) && ue.value && e.border) {
      de.value = !0;
      const Ie = re;
      k("set-drag-visible", !0);
      const xe = (Ie == null ? void 0 : Ie.vnode.el).getBoundingClientRect().left, ze = oe.vnode.el.querySelector(`th.${Oe.id}`), At = ze.getBoundingClientRect(), Fe = At.left - xe + 30;
      addClass$1(ze, "noclick"), pe.value = {
        startMouseLeft: he.clientX,
        startLeft: At.right - xe,
        startColumnLeft: At.left - xe,
        tableLeft: xe
      };
      const Pt = Ie == null ? void 0 : Ie.refs.resizeProxy;
      Pt.style.left = `${pe.value.startLeft}px`, document.onselectstart = function() {
        return !1;
      }, document.ondragstart = function() {
        return !1;
      };
      const vn = (Nn) => {
        const Tn = Nn.clientX - pe.value.startMouseLeft, wn = pe.value.startLeft + Tn;
        Pt.style.left = `${Math.max(Fe, wn)}px`;
      }, En = () => {
        if (de.value) {
          const { startColumnLeft: Nn, startLeft: Tn } = pe.value, Lt = Number.parseInt(Pt.style.left, 10) - Nn;
          Oe.width = Oe.realWidth = Lt, Ie == null || Ie.emit("header-dragend", Oe.width, Tn - Nn, Oe, he), requestAnimationFrame(() => {
            e.store.scheduleLayout(!1, !0);
          }), document.body.style.cursor = "", de.value = !1, ue.value = null, pe.value = {}, k("set-drag-visible", !1);
        }
        document.removeEventListener("mousemove", vn), document.removeEventListener("mouseup", En), document.onselectstart = null, document.ondragstart = null, setTimeout(() => {
          removeClass$1(ze, "noclick");
        }, 0);
      };
      document.addEventListener("mousemove", vn), document.addEventListener("mouseup", En);
    }
  }, _e = (he, Oe) => {
    var Ie;
    if (Oe.children && Oe.children.length > 0)
      return;
    const qe = (Ie = he.target) == null ? void 0 : Ie.closest("th");
    if (!(!Oe || !Oe.resizable) && !de.value && e.border) {
      const xe = qe.getBoundingClientRect(), ze = document.body.style;
      xe.width > 12 && xe.right - he.pageX < 8 ? (ze.cursor = "col-resize", hasClass$1(qe, "is-sortable") && (qe.style.cursor = "col-resize"), ue.value = Oe) : de.value || (ze.cursor = "", hasClass$1(qe, "is-sortable") && (qe.style.cursor = "pointer"), ue.value = null);
    }
  }, $e = () => {
    !isClient$1 || (document.body.style.cursor = "");
  }, Ve = ({ order: he, sortOrders: Oe }) => {
    if (he === "")
      return Oe[0];
    const Ie = Oe.indexOf(he || null);
    return Oe[Ie > Oe.length - 2 ? 0 : Ie + 1];
  }, Ne = (he, Oe, Ie) => {
    var qe;
    he.stopPropagation();
    const xe = Oe.order === Ie ? null : Ie || Ve(Oe), ze = (qe = he.target) == null ? void 0 : qe.closest("th");
    if (ze && hasClass$1(ze, "noclick")) {
      removeClass$1(ze, "noclick");
      return;
    }
    if (!Oe.sortable)
      return;
    const At = e.store.states;
    let Fe = At.sortProp.value, Pt;
    const vn = At.sortingColumn.value;
    (vn !== Oe || vn === Oe && vn.order === null) && (vn && (vn.order = null), At.sortingColumn.value = Oe, Fe = Oe.property), xe ? Pt = Oe.order = xe : Pt = Oe.order = null, At.sortProp.value = Fe, At.sortOrder.value = Pt, re == null || re.store.commit("changeSortCondition");
  };
  return {
    handleHeaderClick: le,
    handleHeaderContextMenu: ie,
    handleMouseDown: Ce,
    handleMouseMove: _e,
    handleMouseOut: $e,
    handleSortClick: Ne,
    handleFilterClick: ae
  };
}
function useStyle$2(e) {
  const k = inject(TABLE_INJECTION_KEY), oe = useNamespace("table");
  return {
    getHeaderRowStyle: (ue) => {
      const de = k == null ? void 0 : k.props.headerRowStyle;
      return typeof de == "function" ? de.call(null, { rowIndex: ue }) : de;
    },
    getHeaderRowClass: (ue) => {
      const de = [], pe = k == null ? void 0 : k.props.headerRowClassName;
      return typeof pe == "string" ? de.push(pe) : typeof pe == "function" && de.push(pe.call(null, { rowIndex: ue })), de.join(" ");
    },
    getHeaderCellStyle: (ue, de, pe, Ce) => {
      var _e;
      let $e = (_e = k == null ? void 0 : k.props.headerCellStyle) != null ? _e : {};
      typeof $e == "function" && ($e = $e.call(null, {
        rowIndex: ue,
        columnIndex: de,
        row: pe,
        column: Ce
      }));
      const Ve = Ce.isSubColumn ? null : getFixedColumnOffset(de, Ce.fixed, e.store, pe);
      return ensurePosition(Ve, "left"), ensurePosition(Ve, "right"), Object.assign({}, $e, Ve);
    },
    getHeaderCellClass: (ue, de, pe, Ce) => {
      const _e = Ce.isSubColumn ? [] : getFixedColumnsClass(oe.b(), de, Ce.fixed, e.store, pe), $e = [
        Ce.id,
        Ce.order,
        Ce.headerAlign,
        Ce.className,
        Ce.labelClassName,
        ..._e
      ];
      Ce.children || $e.push("is-leaf"), Ce.sortable && $e.push("is-sortable");
      const Ve = k == null ? void 0 : k.props.headerCellClassName;
      return typeof Ve == "string" ? $e.push(Ve) : typeof Ve == "function" && $e.push(Ve.call(null, {
        rowIndex: ue,
        columnIndex: de,
        row: pe,
        column: Ce
      })), $e.push(oe.e("cell")), $e.filter((Ne) => Boolean(Ne)).join(" ");
    }
  };
}
const getAllColumns = (e) => {
  const k = [];
  return e.forEach((oe) => {
    oe.children ? (k.push(oe), k.push.apply(k, getAllColumns(oe.children))) : k.push(oe);
  }), k;
}, convertToRows = (e) => {
  let k = 1;
  const oe = (le, ie) => {
    if (ie && (le.level = ie.level + 1, k < le.level && (k = le.level)), le.children) {
      let ue = 0;
      le.children.forEach((de) => {
        oe(de, le), ue += de.colSpan;
      }), le.colSpan = ue;
    } else
      le.colSpan = 1;
  };
  e.forEach((le) => {
    le.level = 1, oe(le, void 0);
  });
  const re = [];
  for (let le = 0; le < k; le++)
    re.push([]);
  return getAllColumns(e).forEach((le) => {
    le.children ? (le.rowSpan = 1, le.children.forEach((ie) => ie.isSubColumn = !0)) : le.rowSpan = k - le.level + 1, re[le.level - 1].push(le);
  }), re;
};
function useUtils$1(e) {
  const k = inject(TABLE_INJECTION_KEY), oe = computed(() => convertToRows(e.store.states.originColumns.value));
  return {
    isGroup: computed(() => {
      const le = oe.value.length > 1;
      return le && k && (k.state.isGroup.value = !0), le;
    }),
    toggleAllSelection: (le) => {
      le.stopPropagation(), k == null || k.store.commit("toggleAllSelection");
    },
    columnRows: oe
  };
}
var TableHeader = defineComponent({
  name: "ElTableHeader",
  components: {
    ElCheckbox
  },
  props: {
    fixed: {
      type: String,
      default: ""
    },
    store: {
      required: !0,
      type: Object
    },
    border: Boolean,
    defaultSort: {
      type: Object,
      default: () => ({
        prop: "",
        order: ""
      })
    }
  },
  setup(e, { emit: k }) {
    const oe = getCurrentInstance(), re = inject(TABLE_INJECTION_KEY), ae = useNamespace("table"), le = ref({}), { onColumnsChange: ie, onScrollableChange: ue } = useLayoutObserver(re);
    onMounted(async () => {
      await nextTick(), await nextTick();
      const { prop: Fe, order: Pt } = e.defaultSort;
      re == null || re.store.commit("sort", { prop: Fe, order: Pt, init: !0 });
    });
    const {
      handleHeaderClick: de,
      handleHeaderContextMenu: pe,
      handleMouseDown: Ce,
      handleMouseMove: _e,
      handleMouseOut: $e,
      handleSortClick: Ve,
      handleFilterClick: Ne
    } = useEvent(e, k), {
      getHeaderRowStyle: he,
      getHeaderRowClass: Oe,
      getHeaderCellStyle: Ie,
      getHeaderCellClass: qe
    } = useStyle$2(e), { isGroup: xe, toggleAllSelection: ze, columnRows: At } = useUtils$1(e);
    return oe.state = {
      onColumnsChange: ie,
      onScrollableChange: ue
    }, oe.filterPanels = le, {
      ns: ae,
      filterPanels: le,
      onColumnsChange: ie,
      onScrollableChange: ue,
      columnRows: At,
      getHeaderRowClass: Oe,
      getHeaderRowStyle: he,
      getHeaderCellClass: qe,
      getHeaderCellStyle: Ie,
      handleHeaderClick: de,
      handleHeaderContextMenu: pe,
      handleMouseDown: Ce,
      handleMouseMove: _e,
      handleMouseOut: $e,
      handleSortClick: Ve,
      handleFilterClick: Ne,
      isGroup: xe,
      toggleAllSelection: ze
    };
  },
  render() {
    const {
      ns: e,
      isGroup: k,
      columnRows: oe,
      getHeaderCellStyle: re,
      getHeaderCellClass: ae,
      getHeaderRowClass: le,
      getHeaderRowStyle: ie,
      handleHeaderClick: ue,
      handleHeaderContextMenu: de,
      handleMouseDown: pe,
      handleMouseMove: Ce,
      handleSortClick: _e,
      handleMouseOut: $e,
      store: Ve,
      $parent: Ne
    } = this;
    let he = 1;
    return h$2("thead", {
      class: { [e.is("group")]: k }
    }, oe.map((Oe, Ie) => h$2("tr", {
      class: le(Ie),
      key: Ie,
      style: ie(Ie)
    }, Oe.map((qe, xe) => (qe.rowSpan > he && (he = qe.rowSpan), h$2("th", {
      class: ae(Ie, xe, Oe, qe),
      colspan: qe.colSpan,
      key: `${qe.id}-thead`,
      rowspan: qe.rowSpan,
      style: re(Ie, xe, Oe, qe),
      onClick: (ze) => ue(ze, qe),
      onContextmenu: (ze) => de(ze, qe),
      onMousedown: (ze) => pe(ze, qe),
      onMousemove: (ze) => Ce(ze, qe),
      onMouseout: $e
    }, [
      h$2("div", {
        class: [
          "cell",
          qe.filteredValue && qe.filteredValue.length > 0 ? "highlight" : "",
          qe.labelClassName
        ]
      }, [
        qe.renderHeader ? qe.renderHeader({
          column: qe,
          $index: xe,
          store: Ve,
          _self: Ne
        }) : qe.label,
        qe.sortable && h$2("span", {
          onClick: (ze) => _e(ze, qe),
          class: "caret-wrapper"
        }, [
          h$2("i", {
            onClick: (ze) => _e(ze, qe, "ascending"),
            class: "sort-caret ascending"
          }),
          h$2("i", {
            onClick: (ze) => _e(ze, qe, "descending"),
            class: "sort-caret descending"
          })
        ]),
        qe.filterable && h$2(FilterPanel, {
          store: Ve,
          placement: qe.filterPlacement || "bottom-start",
          column: qe,
          upDataColumn: (ze, At) => {
            qe[ze] = At;
          }
        })
      ])
    ]))))));
  }
});
function useEvents(e) {
  const k = inject(TABLE_INJECTION_KEY), oe = ref(""), re = ref(h$2("div")), ae = ($e, Ve, Ne) => {
    var he;
    const Oe = k, Ie = getCell($e);
    let qe;
    const xe = (he = Oe == null ? void 0 : Oe.vnode.el) == null ? void 0 : he.dataset.prefix;
    Ie && (qe = getColumnByCell({
      columns: e.store.states.columns.value
    }, Ie, xe), qe && (Oe == null || Oe.emit(`cell-${Ne}`, Ve, qe, Ie, $e))), Oe == null || Oe.emit(`row-${Ne}`, Ve, qe, $e);
  }, le = ($e, Ve) => {
    ae($e, Ve, "dblclick");
  }, ie = ($e, Ve) => {
    e.store.commit("setCurrentRow", Ve), ae($e, Ve, "click");
  }, ue = ($e, Ve) => {
    ae($e, Ve, "contextmenu");
  }, de = debounce(($e) => {
    e.store.commit("setHoverRow", $e);
  }, 30), pe = debounce(() => {
    e.store.commit("setHoverRow", null);
  }, 30);
  return {
    handleDoubleClick: le,
    handleClick: ie,
    handleContextMenu: ue,
    handleMouseEnter: de,
    handleMouseLeave: pe,
    handleCellMouseEnter: ($e, Ve) => {
      var Ne;
      const he = k, Oe = getCell($e), Ie = (Ne = he == null ? void 0 : he.vnode.el) == null ? void 0 : Ne.dataset.prefix;
      if (Oe) {
        const Fe = getColumnByCell({
          columns: e.store.states.columns.value
        }, Oe, Ie), Pt = he.hoverState = { cell: Oe, column: Fe, row: Ve };
        he == null || he.emit("cell-mouse-enter", Pt.row, Pt.column, Pt.cell, $e);
      }
      const qe = $e.target.querySelector(".cell");
      if (!(hasClass$1(qe, `${Ie}-tooltip`) && qe.childNodes.length))
        return;
      const xe = document.createRange();
      xe.setStart(qe, 0), xe.setEnd(qe, qe.childNodes.length);
      const ze = xe.getBoundingClientRect().width, At = (Number.parseInt(getStyle(qe, "paddingLeft"), 10) || 0) + (Number.parseInt(getStyle(qe, "paddingRight"), 10) || 0);
      (ze + At > qe.offsetWidth || qe.scrollWidth > qe.offsetWidth) && createTablePopper(k == null ? void 0 : k.refs.tableWrapper, Oe, Oe.innerText || Oe.textContent, {
        placement: "top",
        strategy: "fixed"
      }, Ve.tooltipEffect);
    },
    handleCellMouseLeave: ($e) => {
      if (!getCell($e))
        return;
      const Ne = k == null ? void 0 : k.hoverState;
      k == null || k.emit("cell-mouse-leave", Ne == null ? void 0 : Ne.row, Ne == null ? void 0 : Ne.column, Ne == null ? void 0 : Ne.cell, $e);
    },
    tooltipContent: oe,
    tooltipTrigger: re
  };
}
function useStyles(e) {
  const k = inject(TABLE_INJECTION_KEY), oe = useNamespace("table");
  return {
    getRowStyle: (pe, Ce) => {
      const _e = k == null ? void 0 : k.props.rowStyle;
      return typeof _e == "function" ? _e.call(null, {
        row: pe,
        rowIndex: Ce
      }) : _e || null;
    },
    getRowClass: (pe, Ce) => {
      const _e = [oe.e("row")];
      (k == null ? void 0 : k.props.highlightCurrentRow) && pe === e.store.states.currentRow.value && _e.push("current-row"), e.stripe && Ce % 2 === 1 && _e.push(oe.em("row", "striped"));
      const $e = k == null ? void 0 : k.props.rowClassName;
      return typeof $e == "string" ? _e.push($e) : typeof $e == "function" && _e.push($e.call(null, {
        row: pe,
        rowIndex: Ce
      })), _e;
    },
    getCellStyle: (pe, Ce, _e, $e) => {
      const Ve = k == null ? void 0 : k.props.cellStyle;
      let Ne = Ve != null ? Ve : {};
      typeof Ve == "function" && (Ne = Ve.call(null, {
        rowIndex: pe,
        columnIndex: Ce,
        row: _e,
        column: $e
      }));
      const he = $e.isSubColumn ? null : getFixedColumnOffset(Ce, e == null ? void 0 : e.fixed, e.store);
      return ensurePosition(he, "left"), ensurePosition(he, "right"), Object.assign({}, Ne, he);
    },
    getCellClass: (pe, Ce, _e, $e) => {
      const Ve = $e.isSubColumn ? [] : getFixedColumnsClass(oe.b(), Ce, e == null ? void 0 : e.fixed, e.store), Ne = [$e.id, $e.align, $e.className, ...Ve], he = k == null ? void 0 : k.props.cellClassName;
      return typeof he == "string" ? Ne.push(he) : typeof he == "function" && Ne.push(he.call(null, {
        rowIndex: pe,
        columnIndex: Ce,
        row: _e,
        column: $e
      })), Ne.push(oe.e("cell")), Ne.filter((Oe) => Boolean(Oe)).join(" ");
    },
    getSpan: (pe, Ce, _e, $e) => {
      let Ve = 1, Ne = 1;
      const he = k == null ? void 0 : k.props.spanMethod;
      if (typeof he == "function") {
        const Oe = he({
          row: pe,
          column: Ce,
          rowIndex: _e,
          columnIndex: $e
        });
        Array.isArray(Oe) ? (Ve = Oe[0], Ne = Oe[1]) : typeof Oe == "object" && (Ve = Oe.rowspan, Ne = Oe.colspan);
      }
      return { rowspan: Ve, colspan: Ne };
    },
    getColspanRealWidth: (pe, Ce, _e) => {
      if (Ce < 1)
        return pe[_e].realWidth;
      const $e = pe.map(({ realWidth: Ve, width: Ne }) => Ve || Ne).slice(_e, _e + Ce);
      return Number($e.reduce((Ve, Ne) => Number(Ve) + Number(Ne), -1));
    }
  };
}
function useRender$1(e) {
  const k = inject(TABLE_INJECTION_KEY), oe = useNamespace("table"), {
    handleDoubleClick: re,
    handleClick: ae,
    handleContextMenu: le,
    handleMouseEnter: ie,
    handleMouseLeave: ue,
    handleCellMouseEnter: de,
    handleCellMouseLeave: pe,
    tooltipContent: Ce,
    tooltipTrigger: _e
  } = useEvents(e), {
    getRowStyle: $e,
    getRowClass: Ve,
    getCellStyle: Ne,
    getCellClass: he,
    getSpan: Oe,
    getColspanRealWidth: Ie
  } = useStyles(e), qe = computed(() => e.store.states.columns.value.findIndex(({ type: Pt }) => Pt === "default")), xe = (Pt, vn) => {
    const En = k.props.rowKey;
    return En ? getRowIdentity(Pt, En) : vn;
  }, ze = (Pt, vn, En, Nn = !1) => {
    const { tooltipEffect: Tn, store: wn } = e, { indent: Lt, columns: Dt } = wn.states, Cn = Ve(Pt, vn);
    let jt = !0;
    return En && (Cn.push(oe.em("row", `level-${En.level}`)), jt = En.display), h$2("tr", {
      style: [jt ? null : {
        display: "none"
      }, $e(Pt, vn)],
      class: Cn,
      key: xe(Pt, vn),
      onDblclick: (kt) => re(kt, Pt),
      onClick: (kt) => ae(kt, Pt),
      onContextmenu: (kt) => le(kt, Pt),
      onMouseenter: () => ie(vn),
      onMouseleave: ue
    }, Dt.value.map((kt, Et) => {
      const { rowspan: _n, colspan: Pn } = Oe(Pt, kt, vn, Et);
      if (!_n || !Pn)
        return null;
      const hn = { ...kt };
      hn.realWidth = Ie(Dt.value, Pn, Et);
      const On = {
        store: e.store,
        _self: e.context || k,
        column: hn,
        row: Pt,
        $index: vn,
        cellIndex: Et,
        expanded: Nn
      };
      Et === qe.value && En && (On.treeNode = {
        indent: En.level * Lt.value,
        level: En.level
      }, typeof En.expanded == "boolean" && (On.treeNode.expanded = En.expanded, "loading" in En && (On.treeNode.loading = En.loading), "noLazyChildren" in En && (On.treeNode.noLazyChildren = En.noLazyChildren)));
      const Dn = `${vn},${Et}`, Rn = hn.columnKey || hn.rawColumnKey || "", Fn = At(Et, kt, On);
      return h$2("td", {
        style: Ne(vn, Et, Pt, kt),
        class: he(vn, Et, Pt, kt),
        key: `${Rn}${Dn}`,
        rowspan: _n,
        colspan: Pn,
        onMouseenter: (kn) => de(kn, { ...Pt, tooltipEffect: Tn }),
        onMouseleave: pe
      }, [Fn]);
    }));
  }, At = (Pt, vn, En) => vn.renderCell(En);
  return {
    wrappedRowRender: (Pt, vn) => {
      const En = e.store, { isRowExpanded: Nn, assertRowKey: Tn } = En, { treeData: wn, lazyTreeNodeMap: Lt, childrenColumnName: Dt, rowKey: Cn } = En.states, jt = En.states.columns.value;
      if (jt.some(({ type: kt }) => kt === "expand")) {
        const kt = Nn(Pt), Et = ze(Pt, vn, void 0, kt), _n = k.renderExpanded;
        return kt ? _n ? [
          [
            Et,
            h$2("tr", {
              key: `expanded-row__${Et.key}`
            }, [
              h$2("td", {
                colspan: jt.length,
                class: "el-table__cell el-table__expanded-cell"
              }, [_n({ row: Pt, $index: vn, store: En, expanded: kt })])
            ])
          ]
        ] : (console.error("[Element Error]renderExpanded is required."), Et) : [[Et]];
      } else if (Object.keys(wn.value).length) {
        Tn();
        const kt = getRowIdentity(Pt, Cn.value);
        let Et = wn.value[kt], _n = null;
        Et && (_n = {
          expanded: Et.expanded,
          level: Et.level,
          display: !0
        }, typeof Et.lazy == "boolean" && (typeof Et.loaded == "boolean" && Et.loaded && (_n.noLazyChildren = !(Et.children && Et.children.length)), _n.loading = Et.loading));
        const Pn = [ze(Pt, vn, _n)];
        if (Et) {
          let hn = 0;
          const On = (Rn, Fn) => {
            !(Rn && Rn.length && Fn) || Rn.forEach((kn) => {
              const An = {
                display: Fn.display && Fn.expanded,
                level: Fn.level + 1,
                expanded: !1,
                noLazyChildren: !1,
                loading: !1
              }, Vn = getRowIdentity(kn, Cn.value);
              if (Vn == null)
                throw new Error("For nested data item, row-key is required.");
              if (Et = { ...wn.value[Vn] }, Et && (An.expanded = Et.expanded, Et.level = Et.level || An.level, Et.display = !!(Et.expanded && An.display), typeof Et.lazy == "boolean" && (typeof Et.loaded == "boolean" && Et.loaded && (An.noLazyChildren = !(Et.children && Et.children.length)), An.loading = Et.loading)), hn++, Pn.push(ze(kn, vn + hn, An)), Et) {
                const Bn = Lt.value[Vn] || kn[Dt.value];
                On(Bn, Et);
              }
            });
          };
          Et.display = !0;
          const Dn = Lt.value[kt] || Pt[Dt.value];
          On(Dn, Et);
        }
        return Pn;
      } else
        return ze(Pt, vn, void 0);
    },
    tooltipContent: Ce,
    tooltipTrigger: _e
  };
}
const defaultProps$2 = {
  store: {
    required: !0,
    type: Object
  },
  stripe: Boolean,
  tooltipEffect: String,
  context: {
    default: () => ({}),
    type: Object
  },
  rowClassName: [String, Function],
  rowStyle: [Object, Function],
  fixed: {
    type: String,
    default: ""
  },
  highlight: Boolean
};
var TableBody = defineComponent({
  name: "ElTableBody",
  props: defaultProps$2,
  setup(e) {
    const k = getCurrentInstance(), oe = inject(TABLE_INJECTION_KEY), re = useNamespace("table"), { wrappedRowRender: ae, tooltipContent: le, tooltipTrigger: ie } = useRender$1(e), { onColumnsChange: ue, onScrollableChange: de } = useLayoutObserver(oe);
    return watch(e.store.states.hoverRow, (pe, Ce) => {
      if (!e.store.states.isComplex.value || !isClient$1)
        return;
      let _e = window.requestAnimationFrame;
      _e || (_e = ($e) => window.setTimeout($e, 16)), _e(() => {
        var $e;
        const Ve = ($e = k == null ? void 0 : k.vnode.el) == null ? void 0 : $e.querySelectorAll(`.${re.e("row")}`), Ne = Ve[Ce], he = Ve[pe];
        Ne && removeClass$1(Ne, "hover-row"), he && addClass$1(he, "hover-row");
      });
    }), onUnmounted(() => {
      var pe;
      (pe = removePopper) == null || pe();
    }), onUpdated(() => {
      var pe;
      (pe = removePopper) == null || pe();
    }), {
      ns: re,
      onColumnsChange: ue,
      onScrollableChange: de,
      wrappedRowRender: ae,
      tooltipContent: le,
      tooltipTrigger: ie
    };
  },
  render() {
    const { wrappedRowRender: e, store: k } = this, oe = k.states.data.value || [];
    return h$2("tbody", {}, [
      oe.reduce((re, ae) => re.concat(e(ae, re.length)), [])
    ]);
  }
});
function hColgroup(e) {
  const k = e.tableLayout === "auto";
  let oe = e.columns || [];
  k && oe.every((ae) => ae.width === void 0) && (oe = []);
  const re = (ae) => {
    const le = {
      key: `${e.tableLayout}_${ae.id}`,
      style: {},
      name: void 0
    };
    return k ? le.style = {
      width: `${ae.width}px`
    } : le.name = ae.id, le;
  };
  return h$2("colgroup", {}, oe.map((ae) => h$2("col", re(ae))));
}
hColgroup.props = ["columns", "tableLayout"];
function useMapState() {
  const e = inject(TABLE_INJECTION_KEY), k = e == null ? void 0 : e.store, oe = computed(() => k.states.fixedLeafColumnsLength.value), re = computed(() => k.states.rightFixedColumns.value.length), ae = computed(() => k.states.columns.value.length), le = computed(() => k.states.fixedColumns.value.length), ie = computed(() => k.states.rightFixedColumns.value.length);
  return {
    leftFixedLeafCount: oe,
    rightFixedLeafCount: re,
    columnsCount: ae,
    leftFixedCount: le,
    rightFixedCount: ie,
    columns: k.states.columns
  };
}
function useStyle$1(e) {
  const { columns: k } = useMapState(), oe = useNamespace("table");
  return {
    getCellClasses: (le, ie) => {
      const ue = le[ie], de = [
        oe.e("cell"),
        ue.id,
        ue.align,
        ue.labelClassName,
        ...getFixedColumnsClass(oe.b(), ie, ue.fixed, e.store)
      ];
      return ue.className && de.push(ue.className), ue.children || de.push(oe.is("leaf")), de;
    },
    getCellStyles: (le, ie) => {
      const ue = getFixedColumnOffset(ie, le.fixed, e.store);
      return ensurePosition(ue, "left"), ensurePosition(ue, "right"), ue;
    },
    columns: k
  };
}
var TableFooter = defineComponent({
  name: "ElTableFooter",
  props: {
    fixed: {
      type: String,
      default: ""
    },
    store: {
      required: !0,
      type: Object
    },
    summaryMethod: Function,
    sumText: String,
    border: Boolean,
    defaultSort: {
      type: Object,
      default: () => ({
        prop: "",
        order: ""
      })
    }
  },
  setup(e) {
    const { getCellClasses: k, getCellStyles: oe, columns: re } = useStyle$1(e);
    return {
      ns: useNamespace("table"),
      getCellClasses: k,
      getCellStyles: oe,
      columns: re
    };
  },
  render() {
    const {
      columns: e,
      getCellStyles: k,
      getCellClasses: oe,
      summaryMethod: re,
      sumText: ae,
      ns: le
    } = this, ie = this.store.states.data.value;
    let ue = [];
    return re ? ue = re({
      columns: e,
      data: ie
    }) : e.forEach((de, pe) => {
      if (pe === 0) {
        ue[pe] = ae;
        return;
      }
      const Ce = ie.map((Ne) => Number(Ne[de.property])), _e = [];
      let $e = !0;
      Ce.forEach((Ne) => {
        if (!Number.isNaN(+Ne)) {
          $e = !1;
          const he = `${Ne}`.split(".")[1];
          _e.push(he ? he.length : 0);
        }
      });
      const Ve = Math.max.apply(null, _e);
      $e ? ue[pe] = "" : ue[pe] = Ce.reduce((Ne, he) => {
        const Oe = Number(he);
        return Number.isNaN(+Oe) ? Ne : Number.parseFloat((Ne + he).toFixed(Math.min(Ve, 20)));
      }, 0);
    }), h$2("table", {
      class: le.e("footer"),
      cellspacing: "0",
      cellpadding: "0",
      border: "0"
    }, [
      hColgroup({
        columns: e
      }),
      h$2("tbody", [
        h$2("tr", {}, [
          ...e.map((de, pe) => h$2("td", {
            key: pe,
            colspan: de.colSpan,
            rowspan: de.rowSpan,
            class: oe(e, pe),
            style: k(de, pe)
          }, [
            h$2("div", {
              class: ["cell", de.labelClassName]
            }, [ue[pe]])
          ]))
        ])
      ])
    ]);
  }
});
function useUtils(e) {
  return {
    setCurrentRow: (Ce) => {
      e.commit("setCurrentRow", Ce);
    },
    getSelectionRows: () => e.getSelectionRows(),
    toggleRowSelection: (Ce, _e) => {
      e.toggleRowSelection(Ce, _e, !1), e.updateAllSelected();
    },
    clearSelection: () => {
      e.clearSelection();
    },
    clearFilter: (Ce) => {
      e.clearFilter(Ce);
    },
    toggleAllSelection: () => {
      e.commit("toggleAllSelection");
    },
    toggleRowExpansion: (Ce, _e) => {
      e.toggleRowExpansionAdapter(Ce, _e);
    },
    clearSort: () => {
      e.clearSort();
    },
    sort: (Ce, _e) => {
      e.commit("sort", { prop: Ce, order: _e });
    }
  };
}
function useStyle(e, k, oe, re) {
  const ae = ref(!1), le = ref(null), ie = ref(!1), ue = (kt) => {
    ie.value = kt;
  }, de = ref({
    width: null,
    height: null,
    headerHeight: null
  }), pe = ref(!1), Ce = {
    display: "inline-block",
    verticalAlign: "middle"
  }, _e = ref(), $e = ref(0), Ve = ref(0), Ne = ref(0), he = ref(0);
  watchEffect(() => {
    k.setHeight(e.height);
  }), watchEffect(() => {
    k.setMaxHeight(e.maxHeight);
  }), watch(() => [e.currentRowKey, oe.states.rowKey], ([kt, Et]) => {
    !unref(Et) || oe.setCurrentRowKey(`${kt}`);
  }, {
    immediate: !0
  }), watch(() => e.data, (kt) => {
    re.store.commit("setData", kt);
  }, {
    immediate: !0,
    deep: !0
  }), watchEffect(() => {
    e.expandRowKeys && oe.setExpandRowKeysAdapter(e.expandRowKeys);
  });
  const Oe = () => {
    re.store.commit("setHoverRow", null), re.hoverState && (re.hoverState = null);
  }, Ie = (kt, Et) => {
    const { pixelX: _n, pixelY: Pn } = Et;
    Math.abs(_n) >= Math.abs(Pn) && (re.refs.bodyWrapper.scrollLeft += Et.pixelX / 5);
  }, qe = computed(() => e.height || e.maxHeight || oe.states.fixedColumns.value.length > 0 || oe.states.rightFixedColumns.value.length > 0), xe = computed(() => ({
    width: k.bodyWidth.value ? `${k.bodyWidth.value}px` : ""
  })), ze = () => {
    qe.value && k.updateElsHeight(), k.updateColumnsWidth(), requestAnimationFrame(vn);
  };
  onMounted(async () => {
    await nextTick(), oe.updateColumns(), En(), requestAnimationFrame(ze);
    const kt = re.vnode.el, Et = re.refs.headerWrapper;
    e.flexible && kt && kt.parentElement && (kt.parentElement.style.minWidth = "0"), de.value = {
      width: _e.value = kt.offsetWidth,
      height: kt.offsetHeight,
      headerHeight: e.showHeader && Et ? Et.offsetHeight : null
    }, oe.states.columns.value.forEach((_n) => {
      _n.filteredValue && _n.filteredValue.length && re.store.commit("filterChange", {
        column: _n,
        values: _n.filteredValue,
        silent: !0
      });
    }), re.$ready = !0;
  });
  const At = (kt, Et) => {
    if (!kt)
      return;
    const _n = Array.from(kt.classList).filter((Pn) => !Pn.startsWith("is-scrolling-"));
    _n.push(k.scrollX.value ? Et : "is-scrolling-none"), kt.className = _n.join(" ");
  }, Fe = (kt) => {
    const { tableWrapper: Et } = re.refs;
    At(Et, kt);
  }, Pt = (kt) => {
    const { tableWrapper: Et } = re.refs;
    return !!(Et && Et.classList.contains(kt));
  }, vn = function() {
    if (!re.refs.scrollBarRef)
      return;
    if (!k.scrollX.value) {
      const Rn = "is-scrolling-none";
      Pt(Rn) || Fe(Rn);
      return;
    }
    const kt = re.refs.scrollBarRef.wrap$;
    if (!kt)
      return;
    const { scrollLeft: Et, offsetWidth: _n, scrollWidth: Pn } = kt, { headerWrapper: hn, footerWrapper: On } = re.refs;
    hn && (hn.scrollLeft = Et), On && (On.scrollLeft = Et);
    const Dn = Pn - _n - 1;
    Et >= Dn ? Fe("is-scrolling-right") : Fe(Et === 0 ? "is-scrolling-left" : "is-scrolling-middle");
  }, En = () => {
    !re.refs.scrollBarRef || (re.refs.scrollBarRef.wrap$ && useEventListener(re.refs.scrollBarRef.wrap$, "scroll", vn, {
      passive: !0
    }), e.fit ? useResizeObserver(re.vnode.el, Nn) : useEventListener(window, "resize", Nn));
  }, Nn = () => {
    var kt, Et, _n;
    const Pn = re.vnode.el;
    if (!re.$ready || !Pn)
      return;
    let hn = !1;
    const {
      width: On,
      height: Dn,
      headerHeight: Rn
    } = de.value, Fn = _e.value = Pn.offsetWidth;
    On !== Fn && (hn = !0);
    const kn = Pn.offsetHeight;
    (e.height || qe.value) && Dn !== kn && (hn = !0);
    const An = e.tableLayout === "fixed" ? re.refs.headerWrapper : (kt = re.refs.tableHeaderRef) == null ? void 0 : kt.$el;
    e.showHeader && (An == null ? void 0 : An.offsetHeight) !== Rn && (hn = !0), $e.value = ((Et = re.refs.tableWrapper) == null ? void 0 : Et.scrollHeight) || 0, Ne.value = (An == null ? void 0 : An.scrollHeight) || 0, he.value = ((_n = re.refs.footerWrapper) == null ? void 0 : _n.scrollHeight) || 0, Ve.value = $e.value - Ne.value - he.value, hn && (de.value = {
      width: Fn,
      height: kn,
      headerHeight: e.showHeader && (An == null ? void 0 : An.offsetHeight) || 0
    }, ze());
  }, Tn = useSize(), wn = computed(() => {
    const { bodyWidth: kt, scrollY: Et, gutterWidth: _n } = k;
    return kt.value ? `${kt.value - (Et.value ? _n : 0)}px` : "";
  }), Lt = computed(() => e.maxHeight ? "fixed" : e.tableLayout), Dt = computed(() => {
    if (e.data && e.data.length)
      return null;
    let kt = "100%";
    Ve.value && (kt = `${Ve.value}px`);
    const Et = _e.value;
    return {
      width: Et ? `${Et}px` : "",
      height: kt
    };
  }), Cn = computed(() => e.height ? {
    height: Number.isNaN(Number(e.height)) ? e.height : `${e.height}px`
  } : e.maxHeight ? {
    maxHeight: Number.isNaN(Number(e.maxHeight)) ? e.maxHeight : `${e.maxHeight}px`
  } : {}), jt = computed(() => {
    var kt, Et;
    if (e.height)
      return {
        height: "100%"
      };
    if (e.maxHeight) {
      if (Number.isNaN(Number(e.maxHeight)))
        return {
          maxHeight: `calc(${e.maxHeight} - ${Ne.value + he.value}px)`
        };
      {
        const _n = ((kt = re.refs.headerWrapper) == null ? void 0 : kt.scrollHeight) || 0, Pn = ((Et = re.refs.footerWrapper) == null ? void 0 : Et.scrollHeight) || 0, hn = e.maxHeight;
        if ($e.value >= Number(hn))
          return {
            maxHeight: `${$e.value - _n - Pn}px`
          };
      }
    }
    return {};
  });
  return {
    isHidden: ae,
    renderExpanded: le,
    setDragVisible: ue,
    isGroup: pe,
    handleMouseLeave: Oe,
    handleHeaderFooterMousewheel: Ie,
    tableSize: Tn,
    emptyBlockStyle: Dt,
    handleFixedMousewheel: (kt, Et) => {
      const _n = re.refs.bodyWrapper;
      if (Math.abs(Et.spinY) > 0) {
        const Pn = _n.scrollTop;
        Et.pixelY < 0 && Pn !== 0 && kt.preventDefault(), Et.pixelY > 0 && _n.scrollHeight - _n.clientHeight > Pn && kt.preventDefault(), _n.scrollTop += Math.ceil(Et.pixelY / 5);
      } else
        _n.scrollLeft += Math.ceil(Et.pixelX / 5);
    },
    resizeProxyVisible: ie,
    bodyWidth: wn,
    resizeState: de,
    doLayout: ze,
    tableBodyStyles: xe,
    tableLayout: Lt,
    scrollbarViewStyle: Ce,
    tableInnerStyle: Cn,
    scrollbarStyle: jt
  };
}
var defaultProps$1 = {
  data: {
    type: Array,
    default: () => []
  },
  size: String,
  width: [String, Number],
  height: [String, Number],
  maxHeight: [String, Number],
  fit: {
    type: Boolean,
    default: !0
  },
  stripe: Boolean,
  border: Boolean,
  rowKey: [String, Function],
  showHeader: {
    type: Boolean,
    default: !0
  },
  showSummary: Boolean,
  sumText: String,
  summaryMethod: Function,
  rowClassName: [String, Function],
  rowStyle: [Object, Function],
  cellClassName: [String, Function],
  cellStyle: [Object, Function],
  headerRowClassName: [String, Function],
  headerRowStyle: [Object, Function],
  headerCellClassName: [String, Function],
  headerCellStyle: [Object, Function],
  highlightCurrentRow: Boolean,
  currentRowKey: [String, Number],
  emptyText: String,
  expandRowKeys: Array,
  defaultExpandAll: Boolean,
  defaultSort: Object,
  tooltipEffect: String,
  spanMethod: Function,
  selectOnIndeterminate: {
    type: Boolean,
    default: !0
  },
  indent: {
    type: Number,
    default: 16
  },
  treeProps: {
    type: Object,
    default: () => ({
      hasChildren: "hasChildren",
      children: "children"
    })
  },
  lazy: Boolean,
  load: Function,
  style: {
    type: Object,
    default: () => ({})
  },
  className: {
    type: String,
    default: ""
  },
  tableLayout: {
    type: String,
    default: "fixed"
  },
  scrollbarAlwaysOn: {
    type: Boolean,
    default: !1
  },
  flexible: Boolean
};
const useScrollbar = () => {
  const e = ref(), k = (le, ie) => {
    const ue = e.value;
    ue && ue.scrollTo(le, ie);
  }, oe = (le, ie) => {
    const ue = e.value;
    ue && isNumber(ie) && ["Top", "Left"].includes(le) && ue[`setScroll${le}`](ie);
  };
  return {
    scrollBarRef: e,
    scrollTo: k,
    setScrollTop: (le) => oe("Top", le),
    setScrollLeft: (le) => oe("Left", le)
  };
};
let tableIdSeed = 1;
const _sfc_main$9 = defineComponent({
  name: "ElTable",
  directives: {
    Mousewheel
  },
  components: {
    TableHeader,
    TableBody,
    TableFooter,
    ElScrollbar,
    hColgroup
  },
  props: defaultProps$1,
  emits: [
    "select",
    "select-all",
    "selection-change",
    "cell-mouse-enter",
    "cell-mouse-leave",
    "cell-contextmenu",
    "cell-click",
    "cell-dblclick",
    "row-click",
    "row-contextmenu",
    "row-dblclick",
    "header-click",
    "header-contextmenu",
    "sort-change",
    "filter-change",
    "current-change",
    "header-dragend",
    "expand-change"
  ],
  setup(e) {
    const { t: k } = useLocale(), oe = useNamespace("table"), re = getCurrentInstance();
    provide(TABLE_INJECTION_KEY, re);
    const ae = createStore(re, e);
    re.store = ae;
    const le = new TableLayout({
      store: re.store,
      table: re,
      fit: e.fit,
      showHeader: e.showHeader
    });
    re.layout = le;
    const ie = computed(() => (ae.states.data.value || []).length === 0), {
      setCurrentRow: ue,
      getSelectionRows: de,
      toggleRowSelection: pe,
      clearSelection: Ce,
      clearFilter: _e,
      toggleAllSelection: $e,
      toggleRowExpansion: Ve,
      clearSort: Ne,
      sort: he
    } = useUtils(ae), {
      isHidden: Oe,
      renderExpanded: Ie,
      setDragVisible: qe,
      isGroup: xe,
      handleMouseLeave: ze,
      handleHeaderFooterMousewheel: At,
      tableSize: Fe,
      emptyBlockStyle: Pt,
      handleFixedMousewheel: vn,
      resizeProxyVisible: En,
      bodyWidth: Nn,
      resizeState: Tn,
      doLayout: wn,
      tableBodyStyles: Lt,
      tableLayout: Dt,
      scrollbarViewStyle: Cn,
      tableInnerStyle: jt,
      scrollbarStyle: bn
    } = useStyle(e, le, ae, re), { scrollBarRef: kt, scrollTo: Et, setScrollLeft: _n, setScrollTop: Pn } = useScrollbar(), hn = debounce(wn, 50), On = `el-table_${tableIdSeed++}`;
    re.tableId = On, re.state = {
      isGroup: xe,
      resizeState: Tn,
      doLayout: wn,
      debouncedUpdateLayout: hn
    };
    const Dn = computed(() => e.sumText || k("el.table.sumText")), Rn = computed(() => e.emptyText || k("el.table.emptyText"));
    return {
      ns: oe,
      layout: le,
      store: ae,
      handleHeaderFooterMousewheel: At,
      handleMouseLeave: ze,
      tableId: On,
      tableSize: Fe,
      isHidden: Oe,
      isEmpty: ie,
      renderExpanded: Ie,
      resizeProxyVisible: En,
      resizeState: Tn,
      isGroup: xe,
      bodyWidth: Nn,
      tableBodyStyles: Lt,
      emptyBlockStyle: Pt,
      debouncedUpdateLayout: hn,
      handleFixedMousewheel: vn,
      setCurrentRow: ue,
      getSelectionRows: de,
      toggleRowSelection: pe,
      clearSelection: Ce,
      clearFilter: _e,
      toggleAllSelection: $e,
      toggleRowExpansion: Ve,
      clearSort: Ne,
      doLayout: wn,
      sort: he,
      t: k,
      setDragVisible: qe,
      context: re,
      computedSumText: Dn,
      computedEmptyText: Rn,
      tableLayout: Dt,
      scrollbarViewStyle: Cn,
      tableInnerStyle: jt,
      scrollbarStyle: bn,
      scrollBarRef: kt,
      scrollTo: Et,
      setScrollLeft: _n,
      setScrollTop: Pn
    };
  }
}), _hoisted_1$3 = ["data-prefix"], _hoisted_2 = {
  ref: "hiddenColumns",
  class: "hidden-columns"
};
function _sfc_render$4(e, k, oe, re, ae, le) {
  const ie = resolveComponent("hColgroup"), ue = resolveComponent("table-header"), de = resolveComponent("table-body"), pe = resolveComponent("el-scrollbar"), Ce = resolveComponent("table-footer"), _e = resolveDirective("mousewheel");
  return openBlock(), createElementBlock("div", {
    ref: "tableWrapper",
    class: normalizeClass([
      {
        [e.ns.m("fit")]: e.fit,
        [e.ns.m("striped")]: e.stripe,
        [e.ns.m("border")]: e.border || e.isGroup,
        [e.ns.m("hidden")]: e.isHidden,
        [e.ns.m("group")]: e.isGroup,
        [e.ns.m("fluid-height")]: e.maxHeight,
        [e.ns.m("scrollable-x")]: e.layout.scrollX.value,
        [e.ns.m("scrollable-y")]: e.layout.scrollY.value,
        [e.ns.m("enable-row-hover")]: !e.store.states.isComplex.value,
        [e.ns.m("enable-row-transition")]: (e.store.states.data.value || []).length !== 0 && (e.store.states.data.value || []).length < 100,
        "has-footer": e.showSummary
      },
      e.ns.m(e.tableSize),
      e.className,
      e.ns.b(),
      e.ns.m(`layout-${e.tableLayout}`)
    ]),
    style: normalizeStyle(e.style),
    "data-prefix": e.ns.namespace.value,
    onMouseleave: k[0] || (k[0] = ($e) => e.handleMouseLeave())
  }, [
    createElementVNode("div", {
      class: normalizeClass(e.ns.e("inner-wrapper")),
      style: normalizeStyle(e.tableInnerStyle)
    }, [
      createElementVNode("div", _hoisted_2, [
        renderSlot(e.$slots, "default")
      ], 512),
      e.showHeader && e.tableLayout === "fixed" ? withDirectives((openBlock(), createElementBlock("div", {
        key: 0,
        ref: "headerWrapper",
        class: normalizeClass(e.ns.e("header-wrapper"))
      }, [
        createElementVNode("table", {
          ref: "tableHeader",
          class: normalizeClass(e.ns.e("header")),
          style: normalizeStyle(e.tableBodyStyles),
          border: "0",
          cellpadding: "0",
          cellspacing: "0"
        }, [
          createVNode(ie, {
            columns: e.store.states.columns.value,
            "table-layout": e.tableLayout
          }, null, 8, ["columns", "table-layout"]),
          createVNode(ue, {
            ref: "tableHeaderRef",
            border: e.border,
            "default-sort": e.defaultSort,
            store: e.store,
            onSetDragVisible: e.setDragVisible
          }, null, 8, ["border", "default-sort", "store", "onSetDragVisible"])
        ], 6)
      ], 2)), [
        [_e, e.handleHeaderFooterMousewheel]
      ]) : createCommentVNode("v-if", !0),
      createElementVNode("div", {
        ref: "bodyWrapper",
        class: normalizeClass(e.ns.e("body-wrapper"))
      }, [
        createVNode(pe, {
          ref: "scrollBarRef",
          "view-style": e.scrollbarViewStyle,
          "wrap-style": e.scrollbarStyle,
          always: e.scrollbarAlwaysOn
        }, {
          default: withCtx(() => [
            createElementVNode("table", {
              ref: "tableBody",
              class: normalizeClass(e.ns.e("body")),
              cellspacing: "0",
              cellpadding: "0",
              border: "0",
              style: normalizeStyle({
                width: e.bodyWidth,
                tableLayout: e.tableLayout
              })
            }, [
              createVNode(ie, {
                columns: e.store.states.columns.value,
                "table-layout": e.tableLayout
              }, null, 8, ["columns", "table-layout"]),
              e.showHeader && e.tableLayout === "auto" ? (openBlock(), createBlock(ue, {
                key: 0,
                ref: "tableHeaderRef",
                border: e.border,
                "default-sort": e.defaultSort,
                store: e.store,
                onSetDragVisible: e.setDragVisible
              }, null, 8, ["border", "default-sort", "store", "onSetDragVisible"])) : createCommentVNode("v-if", !0),
              createVNode(de, {
                context: e.context,
                highlight: e.highlightCurrentRow,
                "row-class-name": e.rowClassName,
                "tooltip-effect": e.tooltipEffect,
                "row-style": e.rowStyle,
                store: e.store,
                stripe: e.stripe
              }, null, 8, ["context", "highlight", "row-class-name", "tooltip-effect", "row-style", "store", "stripe"])
            ], 6),
            e.isEmpty ? (openBlock(), createElementBlock("div", {
              key: 0,
              ref: "emptyBlock",
              style: normalizeStyle(e.emptyBlockStyle),
              class: normalizeClass(e.ns.e("empty-block"))
            }, [
              createElementVNode("span", {
                class: normalizeClass(e.ns.e("empty-text"))
              }, [
                renderSlot(e.$slots, "empty", {}, () => [
                  createTextVNode(toDisplayString(e.computedEmptyText), 1)
                ])
              ], 2)
            ], 6)) : createCommentVNode("v-if", !0),
            e.$slots.append ? (openBlock(), createElementBlock("div", {
              key: 1,
              ref: "appendWrapper",
              class: normalizeClass(e.ns.e("append-wrapper"))
            }, [
              renderSlot(e.$slots, "append")
            ], 2)) : createCommentVNode("v-if", !0)
          ]),
          _: 3
        }, 8, ["view-style", "wrap-style", "always"])
      ], 2),
      e.showSummary ? withDirectives((openBlock(), createElementBlock("div", {
        key: 1,
        ref: "footerWrapper",
        class: normalizeClass(e.ns.e("footer-wrapper"))
      }, [
        createVNode(Ce, {
          border: e.border,
          "default-sort": e.defaultSort,
          store: e.store,
          style: normalizeStyle(e.tableBodyStyles),
          "sum-text": e.computedSumText,
          "summary-method": e.summaryMethod
        }, null, 8, ["border", "default-sort", "store", "style", "sum-text", "summary-method"])
      ], 2)), [
        [vShow, !e.isEmpty],
        [_e, e.handleHeaderFooterMousewheel]
      ]) : createCommentVNode("v-if", !0),
      e.border || e.isGroup ? (openBlock(), createElementBlock("div", {
        key: 2,
        class: normalizeClass(e.ns.e("border-left-patch"))
      }, null, 2)) : createCommentVNode("v-if", !0)
    ], 6),
    withDirectives(createElementVNode("div", {
      ref: "resizeProxy",
      class: normalizeClass(e.ns.e("column-resize-proxy"))
    }, null, 2), [
      [vShow, e.resizeProxyVisible]
    ])
  ], 46, _hoisted_1$3);
}
var Table = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$4], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/table/src/table.vue"]]);
const defaultClassNames = {
  selection: "table-column--selection",
  expand: "table__expand-column"
}, cellStarts = {
  default: {
    order: ""
  },
  selection: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: ""
  },
  expand: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: ""
  },
  index: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: ""
  }
}, getDefaultClassName = (e) => defaultClassNames[e] || "", cellForced = {
  selection: {
    renderHeader({ store: e }) {
      function k() {
        return e.states.data.value && e.states.data.value.length === 0;
      }
      return h$2(ElCheckbox, {
        disabled: k(),
        size: e.states.tableSize.value,
        indeterminate: e.states.selection.value.length > 0 && !e.states.isAllSelected.value,
        "onUpdate:modelValue": e.toggleAllSelection,
        modelValue: e.states.isAllSelected.value
      });
    },
    renderCell({
      row: e,
      column: k,
      store: oe,
      $index: re
    }) {
      return h$2(ElCheckbox, {
        disabled: k.selectable ? !k.selectable.call(null, e, re) : !1,
        size: oe.states.tableSize.value,
        onChange: () => {
          oe.commit("rowSelectedChanged", e);
        },
        onClick: (ae) => ae.stopPropagation(),
        modelValue: oe.isSelected(e)
      });
    },
    sortable: !1,
    resizable: !1
  },
  index: {
    renderHeader({ column: e }) {
      return e.label || "#";
    },
    renderCell({
      column: e,
      $index: k
    }) {
      let oe = k + 1;
      const re = e.index;
      return typeof re == "number" ? oe = k + re : typeof re == "function" && (oe = re(k)), h$2("div", {}, [oe]);
    },
    sortable: !1
  },
  expand: {
    renderHeader({ column: e }) {
      return e.label || "";
    },
    renderCell({
      row: e,
      store: k,
      expanded: oe
    }) {
      const { ns: re } = k, ae = [re.e("expand-icon")];
      return oe && ae.push(re.em("expand-icon", "expanded")), h$2("div", {
        class: ae,
        onClick: function(ie) {
          ie.stopPropagation(), k.toggleRowExpansion(e);
        }
      }, {
        default: () => [
          h$2(ElIcon, null, {
            default: () => [h$2(arrow_right_default)]
          })
        ]
      });
    },
    sortable: !1,
    resizable: !1
  }
};
function defaultRenderCell({
  row: e,
  column: k,
  $index: oe
}) {
  var re;
  const ae = k.property, le = ae && getProp(e, ae).value;
  return k && k.formatter ? k.formatter(e, k, le, oe) : ((re = le == null ? void 0 : le.toString) == null ? void 0 : re.call(le)) || "";
}
function treeCellPrefix({
  row: e,
  treeNode: k,
  store: oe
}, re = !1) {
  const { ns: ae } = oe;
  if (!k)
    return re ? [
      h$2("span", {
        class: ae.e("placeholder")
      })
    ] : null;
  const le = [], ie = function(ue) {
    ue.stopPropagation(), oe.loadOrToggle(e);
  };
  if (k.indent && le.push(h$2("span", {
    class: ae.e("indent"),
    style: { "padding-left": `${k.indent}px` }
  })), typeof k.expanded == "boolean" && !k.noLazyChildren) {
    const ue = [
      ae.e("expand-icon"),
      k.expanded ? ae.em("expand-icon", "expanded") : ""
    ];
    let de = arrow_right_default;
    k.loading && (de = loading_default), le.push(h$2("div", {
      class: ue,
      onClick: ie
    }, {
      default: () => [
        h$2(ElIcon, { class: { [ae.is("loading")]: k.loading } }, {
          default: () => [h$2(de)]
        })
      ]
    }));
  } else
    le.push(h$2("span", {
      class: ae.e("placeholder")
    }));
  return le;
}
function getAllAliases(e, k) {
  return e.reduce((oe, re) => (oe[re] = re, oe), k);
}
function useWatcher(e, k) {
  const oe = getCurrentInstance();
  return {
    registerComplexWatchers: () => {
      const le = ["fixed"], ie = {
        realWidth: "width",
        realMinWidth: "minWidth"
      }, ue = getAllAliases(le, ie);
      Object.keys(ue).forEach((de) => {
        const pe = ie[de];
        hasOwn(k, pe) && watch(() => k[pe], (Ce) => {
          let _e = Ce;
          pe === "width" && de === "realWidth" && (_e = parseWidth(Ce)), pe === "minWidth" && de === "realMinWidth" && (_e = parseMinWidth(Ce)), oe.columnConfig.value[pe] = _e, oe.columnConfig.value[de] = _e;
          const $e = pe === "fixed";
          e.value.store.scheduleLayout($e);
        });
      });
    },
    registerNormalWatchers: () => {
      const le = [
        "label",
        "filters",
        "filterMultiple",
        "sortable",
        "index",
        "formatter",
        "className",
        "labelClassName",
        "showOverflowTooltip"
      ], ie = {
        property: "prop",
        align: "realAlign",
        headerAlign: "realHeaderAlign"
      }, ue = getAllAliases(le, ie);
      Object.keys(ue).forEach((de) => {
        const pe = ie[de];
        hasOwn(k, pe) && watch(() => k[pe], (Ce) => {
          oe.columnConfig.value[de] = Ce;
        });
      });
    }
  };
}
function useRender(e, k, oe) {
  const re = getCurrentInstance(), ae = ref(""), le = ref(!1), ie = ref(), ue = ref(), de = useNamespace("table");
  watchEffect(() => {
    ie.value = e.align ? `is-${e.align}` : null, ie.value;
  }), watchEffect(() => {
    ue.value = e.headerAlign ? `is-${e.headerAlign}` : ie.value, ue.value;
  });
  const pe = computed(() => {
    let xe = re.vnode.vParent || re.parent;
    for (; xe && !xe.tableId && !xe.columnId; )
      xe = xe.vnode.vParent || xe.parent;
    return xe;
  }), Ce = computed(() => {
    const { store: xe } = re.parent;
    if (!xe)
      return !1;
    const { treeData: ze } = xe.states, At = ze.value;
    return At && Object.keys(At).length > 0;
  }), _e = ref(parseWidth(e.width)), $e = ref(parseMinWidth(e.minWidth)), Ve = (xe) => (_e.value && (xe.width = _e.value), $e.value && (xe.minWidth = $e.value), xe.minWidth || (xe.minWidth = 80), xe.realWidth = Number(xe.width === void 0 ? xe.minWidth : xe.width), xe), Ne = (xe) => {
    const ze = xe.type, At = cellForced[ze] || {};
    Object.keys(At).forEach((Pt) => {
      const vn = At[Pt];
      Pt !== "className" && vn !== void 0 && (xe[Pt] = vn);
    });
    const Fe = getDefaultClassName(ze);
    if (Fe) {
      const Pt = `${unref(de.namespace)}-${Fe}`;
      xe.className = xe.className ? `${xe.className} ${Pt}` : Pt;
    }
    return xe;
  }, he = (xe) => {
    Array.isArray(xe) ? xe.forEach((At) => ze(At)) : ze(xe);
    function ze(At) {
      var Fe;
      ((Fe = At == null ? void 0 : At.type) == null ? void 0 : Fe.name) === "ElTableColumn" && (At.vParent = re);
    }
  };
  return {
    columnId: ae,
    realAlign: ie,
    isSubColumn: le,
    realHeaderAlign: ue,
    columnOrTableParent: pe,
    setColumnWidth: Ve,
    setColumnForcedProps: Ne,
    setColumnRenders: (xe) => {
      e.renderHeader ? debugWarn("TableColumn", "Comparing to render-header, scoped-slot header is easier to use. We recommend users to use scoped-slot header.") : xe.type !== "selection" && (xe.renderHeader = (Fe) => {
        re.columnConfig.value.label;
        const Pt = k.header;
        return Pt ? Pt(Fe) : xe.label;
      });
      let ze = xe.renderCell;
      const At = Ce.value;
      return xe.type === "expand" ? (xe.renderCell = (Fe) => h$2("div", {
        class: "cell"
      }, [ze(Fe)]), oe.value.renderExpanded = (Fe) => k.default ? k.default(Fe) : k.default) : (ze = ze || defaultRenderCell, xe.renderCell = (Fe) => {
        let Pt = null;
        if (k.default) {
          const Tn = k.default(Fe);
          Pt = Tn.some((wn) => wn.type !== Comment) ? Tn : ze(Fe);
        } else
          Pt = ze(Fe);
        const vn = At && Fe.cellIndex === 0, En = treeCellPrefix(Fe, vn), Nn = {
          class: "cell",
          style: {}
        };
        return xe.showOverflowTooltip && (Nn.class = `${Nn.class} ${unref(de.namespace)}-tooltip`, Nn.style = {
          width: `${(Fe.column.realWidth || Number(Fe.column.width)) - 1}px`
        }), he(Pt), h$2("div", Nn, [En, Pt]);
      }), xe;
    },
    getPropsData: (...xe) => xe.reduce((ze, At) => (Array.isArray(At) && At.forEach((Fe) => {
      ze[Fe] = e[Fe];
    }), ze), {}),
    getColumnElIndex: (xe, ze) => Array.prototype.indexOf.call(xe, ze)
  };
}
var defaultProps = {
  type: {
    type: String,
    default: "default"
  },
  label: String,
  className: String,
  labelClassName: String,
  property: String,
  prop: String,
  width: {
    type: [String, Number],
    default: ""
  },
  minWidth: {
    type: [String, Number],
    default: ""
  },
  renderHeader: Function,
  sortable: {
    type: [Boolean, String],
    default: !1
  },
  sortMethod: Function,
  sortBy: [String, Function, Array],
  resizable: {
    type: Boolean,
    default: !0
  },
  columnKey: String,
  align: String,
  headerAlign: String,
  showTooltipWhenOverflow: Boolean,
  showOverflowTooltip: Boolean,
  fixed: [Boolean, String],
  formatter: Function,
  selectable: Function,
  reserveSelection: Boolean,
  filterMethod: Function,
  filteredValue: Array,
  filters: Array,
  filterPlacement: String,
  filterMultiple: {
    type: Boolean,
    default: !0
  },
  index: [Number, Function],
  sortOrders: {
    type: Array,
    default: () => ["ascending", "descending", null],
    validator: (e) => e.every((k) => ["ascending", "descending", null].includes(k))
  }
};
let columnIdSeed = 1;
var ElTableColumn$1 = defineComponent({
  name: "ElTableColumn",
  components: {
    ElCheckbox
  },
  props: defaultProps,
  setup(e, { slots: k }) {
    const oe = getCurrentInstance(), re = ref({}), ae = computed(() => {
      let qe = oe.parent;
      for (; qe && !qe.tableId; )
        qe = qe.parent;
      return qe;
    }), { registerNormalWatchers: le, registerComplexWatchers: ie } = useWatcher(ae, e), {
      columnId: ue,
      isSubColumn: de,
      realHeaderAlign: pe,
      columnOrTableParent: Ce,
      setColumnWidth: _e,
      setColumnForcedProps: $e,
      setColumnRenders: Ve,
      getPropsData: Ne,
      getColumnElIndex: he,
      realAlign: Oe
    } = useRender(e, k, ae), Ie = Ce.value;
    ue.value = `${Ie.tableId || Ie.columnId}_column_${columnIdSeed++}`, onBeforeMount(() => {
      de.value = ae.value !== Ie;
      const qe = e.type || "default", xe = e.sortable === "" ? !0 : e.sortable, ze = {
        ...cellStarts[qe],
        id: ue.value,
        type: qe,
        property: e.prop || e.property,
        align: Oe,
        headerAlign: pe,
        showOverflowTooltip: e.showOverflowTooltip || e.showTooltipWhenOverflow,
        filterable: e.filters || e.filterMethod,
        filteredValue: [],
        filterPlacement: "",
        isColumnGroup: !1,
        isSubColumn: !1,
        filterOpened: !1,
        sortable: xe,
        index: e.index,
        rawColumnKey: oe.vnode.key
      };
      let En = Ne([
        "columnKey",
        "label",
        "className",
        "labelClassName",
        "type",
        "renderHeader",
        "formatter",
        "fixed",
        "resizable"
      ], ["sortMethod", "sortBy", "sortOrders"], ["selectable", "reserveSelection"], [
        "filterMethod",
        "filters",
        "filterMultiple",
        "filterOpened",
        "filteredValue",
        "filterPlacement"
      ]);
      En = mergeOptions(ze, En), En = compose(Ve, _e, $e)(En), re.value = En, le(), ie();
    }), onMounted(() => {
      var qe;
      const xe = Ce.value, ze = de.value ? xe.vnode.el.children : (qe = xe.refs.hiddenColumns) == null ? void 0 : qe.children, At = () => he(ze || [], oe.vnode.el);
      re.value.getColumnIndex = At, At() > -1 && ae.value.store.commit("insertColumn", re.value, de.value ? xe.columnConfig.value : null);
    }), onBeforeUnmount(() => {
      ae.value.store.commit("removeColumn", re.value, de.value ? Ie.columnConfig.value : null);
    }), oe.columnId = ue.value, oe.columnConfig = re;
  },
  render() {
    var e, k, oe;
    try {
      const re = (k = (e = this.$slots).default) == null ? void 0 : k.call(e, {
        row: {},
        column: {},
        $index: -1
      }), ae = [];
      if (Array.isArray(re))
        for (const ie of re)
          ((oe = ie.type) == null ? void 0 : oe.name) === "ElTableColumn" || ie.shapeFlag & 2 ? ae.push(ie) : ie.type === Fragment && Array.isArray(ie.children) && ie.children.forEach((ue) => {
            (ue == null ? void 0 : ue.patchFlag) !== 1024 && !isString(ue == null ? void 0 : ue.children) && ae.push(ue);
          });
      return h$2("div", ae);
    } catch {
      return h$2("div", []);
    }
  }
});
const ElTable = withInstall(Table, {
  TableColumn: ElTableColumn$1
}), ElTableColumn = withNoopInstall(ElTableColumn$1), timeSelectProps = buildProps({
  format: {
    type: String,
    default: "HH:mm"
  },
  modelValue: String,
  disabled: Boolean,
  editable: {
    type: Boolean,
    default: !0
  },
  effect: {
    type: String,
    default: "light"
  },
  clearable: {
    type: Boolean,
    default: !0
  },
  size: useSizeProp,
  placeholder: String,
  start: {
    type: String,
    default: "09:00"
  },
  end: {
    type: String,
    default: "18:00"
  },
  step: {
    type: String,
    default: "00:30"
  },
  minTime: String,
  maxTime: String,
  name: String,
  prefixIcon: {
    type: definePropType([String, Object]),
    default: () => clock_default
  },
  clearIcon: {
    type: definePropType([String, Object]),
    default: () => circle_close_default
  }
}), parseTime = (e) => {
  const k = (e || "").split(":");
  if (k.length >= 2) {
    let oe = Number.parseInt(k[0], 10);
    const re = Number.parseInt(k[1], 10), ae = e.toUpperCase();
    return ae.includes("AM") && oe === 12 ? oe = 0 : ae.includes("PM") && oe !== 12 && (oe += 12), {
      hours: oe,
      minutes: re
    };
  }
  return null;
}, compareTime = (e, k) => {
  const oe = parseTime(e);
  if (!oe)
    return -1;
  const re = parseTime(k);
  if (!re)
    return -1;
  const ae = oe.minutes + oe.hours * 60, le = re.minutes + re.hours * 60;
  return ae === le ? 0 : ae > le ? 1 : -1;
}, padTime = (e) => `${e}`.padStart(2, "0"), formatTime = (e) => `${padTime(e.hours)}:${padTime(e.minutes)}`, nextTime = (e, k) => {
  const oe = parseTime(e);
  if (!oe)
    return "";
  const re = parseTime(k);
  if (!re)
    return "";
  const ae = {
    hours: oe.hours,
    minutes: oe.minutes
  };
  return ae.minutes += re.minutes, ae.hours += re.hours, ae.hours += Math.floor(ae.minutes / 60), ae.minutes = ae.minutes % 60, formatTime(ae);
}, __default__ = {
  name: "ElTimeSelect"
}, _sfc_main$8 = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: timeSelectProps,
  emits: ["change", "blur", "focus", "update:modelValue"],
  setup(e, { expose: k }) {
    const oe = e;
    dayjs.extend(customParseFormat);
    const { Option: re } = ElSelect, ae = useNamespace("input"), le = ref(), ie = computed(() => oe.modelValue), ue = computed(() => {
      const he = parseTime(oe.start);
      return he ? formatTime(he) : null;
    }), de = computed(() => {
      const he = parseTime(oe.end);
      return he ? formatTime(he) : null;
    }), pe = computed(() => {
      const he = parseTime(oe.step);
      return he ? formatTime(he) : null;
    }), Ce = computed(() => {
      const he = parseTime(oe.minTime || "");
      return he ? formatTime(he) : null;
    }), _e = computed(() => {
      const he = parseTime(oe.maxTime || "");
      return he ? formatTime(he) : null;
    }), $e = computed(() => {
      const he = [];
      if (oe.start && oe.end && oe.step) {
        let Oe = ue.value, Ie;
        for (; Oe && de.value && compareTime(Oe, de.value) <= 0; )
          Ie = dayjs(Oe, "HH:mm").format(oe.format), he.push({
            value: Ie,
            disabled: compareTime(Oe, Ce.value || "-1:-1") <= 0 || compareTime(Oe, _e.value || "100:100") >= 0
          }), Oe = nextTime(Oe, pe.value);
      }
      return he;
    });
    return k({
      blur: () => {
        var he, Oe;
        (Oe = (he = le.value) == null ? void 0 : he.blur) == null || Oe.call(he);
      },
      focus: () => {
        var he, Oe;
        (Oe = (he = le.value) == null ? void 0 : he.focus) == null || Oe.call(he);
      }
    }), (he, Oe) => (openBlock(), createBlock(unref(ElSelect), {
      ref_key: "select",
      ref: le,
      "model-value": unref(ie),
      disabled: he.disabled,
      clearable: he.clearable,
      "clear-icon": he.clearIcon,
      size: he.size,
      effect: he.effect,
      placeholder: he.placeholder,
      "default-first-option": "",
      filterable: he.editable,
      "onUpdate:modelValue": Oe[0] || (Oe[0] = (Ie) => he.$emit("update:modelValue", Ie)),
      onChange: Oe[1] || (Oe[1] = (Ie) => he.$emit("change", Ie)),
      onBlur: Oe[2] || (Oe[2] = (Ie) => he.$emit("blur", Ie)),
      onFocus: Oe[3] || (Oe[3] = (Ie) => he.$emit("focus", Ie))
    }, {
      prefix: withCtx(() => [
        he.prefixIcon ? (openBlock(), createBlock(unref(ElIcon), {
          key: 0,
          class: normalizeClass(unref(ae).e("prefix-icon"))
        }, {
          default: withCtx(() => [
            (openBlock(), createBlock(resolveDynamicComponent(he.prefixIcon)))
          ]),
          _: 1
        }, 8, ["class"])) : createCommentVNode("v-if", !0)
      ]),
      default: withCtx(() => [
        (openBlock(!0), createElementBlock(Fragment, null, renderList(unref($e), (Ie) => (openBlock(), createBlock(unref(re), {
          key: Ie.value,
          label: Ie.value,
          value: Ie.value,
          disabled: Ie.disabled
        }, null, 8, ["label", "value", "disabled"]))), 128))
      ]),
      _: 1
    }, 8, ["model-value", "disabled", "clearable", "clear-icon", "size", "effect", "placeholder", "filterable"]));
  }
});
var TimeSelect = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/time-select/src/time-select.vue"]]);
TimeSelect.install = (e) => {
  e.component(TimeSelect.name, TimeSelect);
};
const _TimeSelect = TimeSelect, ElTimeSelect = _TimeSelect;
function useRuleFormItem(e, k = "value", oe = "change", re) {
  const ae = getCurrentInstance(), le = ae == null ? void 0 : ae.emit, ie = reactive({
    value: e[k]
  }), ue = readonly(ie), de = (Ce) => {
    ie.value = Ce;
  };
  return watchEffect(() => {
    ie.value = e[k];
  }), [computed({
    get() {
      return ie.value;
    },
    set(Ce) {
      isEqual(Ce, ue.value) || (ie.value = Ce, nextTick(() => {
        le == null || le(oe, Ce, ...toRaw(unref(re)) || []);
      }));
    }
  }), de, ue];
}
const DEFAULT_EXCLUDE_KEYS = ["class", "style"], LISTENER_PREFIX = /^on[A-Z]/;
function entries(e) {
  return Object.keys(e).map((k) => [k, e[k]]);
}
function useAttrs(e = {}) {
  const k = getCurrentInstance();
  if (!k)
    return {};
  const { excludeListeners: oe = !1, excludeKeys: re = [], excludeDefaultKeys: ae = !0 } = e, le = shallowRef({}), ie = re.concat(ae ? DEFAULT_EXCLUDE_KEYS : []);
  return k.attrs = reactive(k.attrs), watchEffect(() => {
    const ue = entries(k.attrs).reduce((de, [pe, Ce]) => (!ie.includes(pe) && !(oe && LISTENER_PREFIX.test(pe)) && (de[pe] = Ce), de), {});
    le.value = ue;
  }), le;
}
const _sfc_main$7 = defineComponent({
  name: "ApiSelect",
  components: {
    ElSelect
  },
  inheritAttrs: !1,
  props: {
    value: [Array, Object, String, Number],
    numberToString: propTypes.bool,
    api: {
      type: Function,
      default: null
    },
    params: {
      type: Object,
      default: () => ({})
    },
    resultField: propTypes.string.def(""),
    labelField: propTypes.string.def("label"),
    valueField: propTypes.string.def("value"),
    immediate: propTypes.bool.def(!0),
    alwaysLoad: propTypes.bool.def(!1)
  },
  emits: ["options-change", "change"],
  setup(e, { emit: k }) {
    const oe = ref([]), re = ref(!1), ae = ref(!0), le = ref([]), ie = useAttrs(), [ue] = useRuleFormItem(e, "value", "change", le), de = computed(() => {
      const { labelField: Ve, valueField: Ne, numberToString: he } = e;
      return unref(oe).reduce((Oe, Ie) => {
        if (Ie) {
          const qe = Ie[Ne];
          Oe.push({
            ...omit$1(Ie, [Ve, Ne]),
            label: Ie[Ve],
            value: he ? `${qe}` : qe
          });
        }
        return Oe;
      }, []);
    });
    watchEffect(() => {
      e.immediate && !e.alwaysLoad && pe();
    }), watch(
      () => e.params,
      () => {
        !unref(ae) && pe();
      },
      { deep: !0 }
    );
    async function pe() {
      const Ve = e.api;
      if (!(!Ve || !isFunction$2(Ve))) {
        oe.value = [];
        try {
          re.value = !0;
          const Ne = await Ve(e.params);
          if (Array.isArray(Ne)) {
            oe.value = Ne, _e();
            return;
          }
          e.resultField && (oe.value = get(Ne, e.resultField) || []), _e();
        } catch (Ne) {
          console.warn(Ne);
        } finally {
          re.value = !1;
        }
      }
    }
    async function Ce(Ve) {
      Ve && (e.alwaysLoad ? await pe() : !e.immediate && unref(ae) && (await pe(), ae.value = !1));
    }
    function _e() {
      k("options-change", unref(de));
    }
    function $e(Ve, ...Ne) {
      le.value = Ne;
    }
    return { state: ue, attrs: ie, getOptions: de, loading: re, handleFetch: Ce, handleChange: $e };
  }
}), _hoisted_1$2 = /* @__PURE__ */ createTextVNode(" \u6CA1\u6709\u53D1\u73B0\u6570\u636E ");
function _sfc_render$3(e, k, oe, re, ae, le) {
  const ie = resolveComponent("el-option"), ue = resolveComponent("Loading"), de = resolveComponent("el-select");
  return openBlock(), createBlock(de, mergeProps({ onVisibleChange: e.handleFetch }, e.$attrs, {
    onChange: e.handleChange,
    value: e.state,
    "onUpdate:value": k[0] || (k[0] = (pe) => e.state = pe)
  }), createSlots({
    default: withCtx(() => [
      (openBlock(!0), createElementBlock(Fragment, null, renderList(e.getOptions, (pe) => (openBlock(), createBlock(ie, {
        key: pe.value,
        label: pe.label,
        value: pe.value
      }, null, 8, ["label", "value"]))), 128))
    ]),
    _: 2
  }, [
    e.loading ? {
      name: "suffixIcon",
      fn: withCtx(() => [
        createVNode(ue)
      ])
    } : void 0,
    e.loading ? {
      name: "notFoundContent",
      fn: withCtx(() => [
        createElementVNode("span", null, [
          createVNode(ue),
          _hoisted_1$2
        ])
      ])
    } : void 0
  ]), 1040, ["onVisibleChange", "onChange", "value"]);
}
const ApiSelect = /* @__PURE__ */ _export_sfc$1(_sfc_main$7, [["render", _sfc_render$3]]), componentMap = /* @__PURE__ */ new Map();
componentMap.set("Autocomplete", ElAutocomplete);
componentMap.set("Button", ElButton);
componentMap.set("Checkbox", ElCheckbox);
componentMap.set("CheckboxGroup", ElCheckboxGroup$1);
componentMap.set("Cascader", ElCascader);
componentMap.set("DatePicker", ElDatePicker);
componentMap.set("Input", ElInput);
componentMap.set("InputNumber", ElInputNumber);
componentMap.set("TimePicker", ElTimePicker);
componentMap.set("TimeSelect", ElTimeSelect);
componentMap.set("Slider", ElSlider);
componentMap.set("Select", ElSelect);
componentMap.set("SelectOption", ElOption);
componentMap.set("Switch", ElSwitch);
componentMap.set("Radio", ElRadio);
componentMap.set("RadioGroup", ElRadioGroup);
componentMap.set("Rate", ElRate);
componentMap.set("Divider", ElDivider);
componentMap.set("ApiSelect", ApiSelect);
function add(e, k) {
  componentMap.set(e, k);
}
function del(e) {
  componentMap.delete(e);
}
function createPlaceholderMessage(e) {
  return e.includes("Input") || e.includes("Complete") ? "\u8BF7\u8F93\u5165\u5185\u5BB9" : e.includes("Picker") || e.includes("Select") || e.includes("Cascader") || e.includes("Checkbox") || e.includes("Radio") || e.includes("Switch") ? "\u8BF7\u9009\u62E9\u5185\u5BB9" : "";
}
const DATE_TYPE = ["DatePicker", "MonthPicker", "WeekPicker", "TimePicker"];
function genType() {
  return [...DATE_TYPE, "RangePicker"];
}
function handleInputNumberValue(e, k) {
  return e && ["Input", "InputPassword", "InputSearch", "InputTextArea"].includes(
    e
  ) && k && isNumber$1(k) ? `${k}` : k;
}
const dateItemType = genType(), defaultValueComponents = [
  "Input",
  "InputPassword",
  "InputSearch",
  "InputTextArea"
];
function getSlot(e, k = "default", oe) {
  if (!e || !Reflect.has(e, k))
    return null;
  if (!isFunction$2(e[k]))
    return console.error(`${k} is not a function!`), null;
  const re = e[k];
  return re ? re(oe) : null;
}
const props = {
  color: {
    type: String,
    default: "#ffffff"
  },
  fontSize: {
    type: String,
    default: "14px"
  },
  tabindex: {
    type: Boolean
  },
  placement: {
    type: String,
    default: "right"
  },
  content: {
    type: [Array, String]
  }
}, _sfc_main$6 = defineComponent({
  name: "BasicHelp",
  components: {
    ElTooltip
  },
  props,
  setup(e, {
    slots: k
  }) {
    const oe = "pandora-basic-help", re = () => `<div style="color: ${e.color};fontSize: ${e.fontSize};">${e.content}</div>`;
    return () => createVNode(ElTooltip, {
      content: re(),
      rawContent: !0,
      placement: e.placement
    }, {
      default: () => [createVNode("span", {
        class: oe
      }, [getSlot(k) || createVNode(warning_default, null, null)])]
    });
  }
}), BasicHelp_vue_vue_type_style_index_0_lang = "";
function _isSlot$2(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !isVNode(e);
}
const _sfc_main$5 = defineComponent({
  name: "PandoraBasicFormItem",
  inheritAttrs: !1,
  props: {
    schema: {
      type: Object,
      default: () => ({})
    },
    formModel: {
      type: Object,
      default: () => ({})
    },
    formProps: {
      type: Object,
      default: () => ({})
    },
    setFormModel: {
      type: Function,
      default: null
    },
    allDefaultValues: {
      type: Object,
      default: () => ({})
    },
    tableAction: {
      type: Object
    },
    formActionType: {
      type: Object
    }
  },
  setup(e, {
    slots: k
  }) {
    const {
      schema: oe
    } = toRefs(e), re = computed(() => {
      var Oe;
      const {
        schema: _e,
        tableAction: $e,
        formModel: Ve,
        formActionType: Ne
      } = e, {
        componentProps: he = {}
      } = _e;
      return isFunction$2(he) ? (Oe = he({
        schema: _e,
        tableAction: $e,
        formModel: Ve,
        formActionType: Ne
      })) != null ? Oe : {} : he;
    }), ae = computed(() => {
      const {
        allDefaultValues: _e,
        formModel: $e,
        schema: Ve
      } = e, {
        mergeDynamicData: Ne
      } = e.formProps;
      return {
        field: Ve.field,
        model: $e,
        values: {
          ...Ne,
          ..._e,
          ...$e
        },
        schema: Ve
      };
    }), le = computed(() => {
      const {
        disabled: _e
      } = e.formProps, {
        dynamicDisabled: $e
      } = e.schema, {
        disabled: Ve = !1
      } = unref(re);
      let Ne = !!_e || Ve;
      return isBoolean$1($e) && (Ne = $e), isFunction$2($e) && (Ne = $e(unref(ae))), Ne;
    });
    function ie() {
      const {
        show: _e,
        ifShow: $e
      } = e.schema, {
        showAdvancedButton: Ve
      } = e.formProps, Ne = Ve && isBoolean$1(e.schema.isAdvanced) ? e.schema.isAdvanced : !0;
      let he = !0, Oe = !0;
      return isBoolean$1(_e) && (he = _e), isBoolean$1($e) && (Oe = $e), isFunction$2(_e) && (he = _e(unref(ae))), isFunction$2($e) && (Oe = $e(unref(ae))), he = he && Ne, {
        isShow: he,
        isIfShow: Oe
      };
    }
    const ue = (_e) => {
      var xe;
      let $e;
      const {
        schema: Ve,
        tableAction: Ne,
        formModel: he,
        formActionType: Oe
      } = e;
      let {
        componentProps: Ie = {}
      } = unref(Ve);
      isFunction$2(Ie) && (Ie = (xe = Ie({
        schema: Ve,
        tableAction: Ne,
        formModel: he,
        formActionType: Oe
      })) != null ? xe : {});
      const qe = Ie.options;
      return _e === "CheckboxGroup" ? ($e = qe.map(({
        label: ze,
        value: At
      }) => {
        const Fe = componentMap.get("Checkbox");
        return createVNode(Fe, {
          label: At,
          key: At
        }, _isSlot$2(ze) ? ze : {
          default: () => [ze]
        });
      }), $e) : (_e === "Select" ? $e = qe.map(({
        label: ze,
        value: At
      }) => {
        const Fe = componentMap.get("SelectOption");
        return createVNode(Fe, {
          label: ze,
          value: At,
          key: At
        }, _isSlot$2(ze) ? ze : {
          default: () => [ze]
        });
      }) : _e === "RadioGroup" && ($e = qe.map(({
        label: ze,
        value: At
      }) => {
        const Fe = componentMap.get("Radio");
        return createVNode(Fe, {
          label: At,
          key: At
        }, _isSlot$2(ze) ? ze : {
          default: () => [ze]
        });
      })), $e);
    }, de = () => {
      var Nn, Tn;
      const {
        renderComponentContent: _e,
        component: $e,
        field: Ve,
        changeEvent: Ne = "change",
        valueField: he
      } = e.schema, Oe = $e && ["Switch", "Checkbox"].includes($e), Ie = `on${upperFirst$1(Ne)}`, qe = {
        [Ie]: (...wn) => {
          const [Lt] = wn;
          ze[Ie] && ze[Ie](...wn);
          const Dt = Lt ? Lt.target : null, Cn = Dt ? Oe ? Dt.checked : Dt.value : Lt;
          e.setFormModel(Ve, Cn);
        }
      }, xe = componentMap.get($e), ze = {
        getPopupContainer: (wn) => wn.parentNode,
        ...unref(re),
        disabled: unref(le)
      }, {
        autoSetPlaceHolder: At
      } = e.formProps;
      !ze.disabled && At && $e && (ze.placeholder = ((Nn = unref(re)) == null ? void 0 : Nn.placeholder) || createPlaceholderMessage($e)), ze.placeholder = (Tn = unref(re)) == null ? void 0 : Tn.placeholder, ze.codeField = Ve, ze.formValues = unref(ae);
      const Pt = {
        [he || (Oe ? "checked" : "value")]: e.formModel[Ve]
      }, vn = {
        ...ze,
        ...qe,
        ...Pt
      };
      if (!_e) {
        let wn;
        return createVNode(xe, mergeProps(vn, {
          modelValue: e.formModel[Ve],
          "onUpdate:modelValue": (Lt) => e.formModel[Ve] = Lt
        }), _isSlot$2(wn = ue($e)) ? wn : {
          default: () => [wn]
        });
      }
      const En = isFunction$2(_e) ? {
        ..._e(unref(ae))
      } : {
        default: () => _e
      };
      return createVNode(xe, mergeProps(vn, {
        modelValue: e.formModel[Ve],
        "onUpdate:modelValue": (wn) => e.formModel[Ve] = wn
      }), _isSlot$2(En) ? En : {
        default: () => [En]
      });
    }, pe = () => {
      const {
        label: _e,
        helpMessage: $e,
        helpComponentProps: Ve,
        subLabel: Ne
      } = e.schema, he = Ne ? createVNode("span", null, [_e, createTextVNode(" "), createVNode("span", {
        class: "text-secondary"
      }, [Ne])]) : _e, Oe = isFunction$2($e) ? $e(unref(ae)) : $e;
      return Oe !== void 0 || Array.isArray(Oe) && (Oe == null ? void 0 : Oe.length) > 0 ? createVNode("span", null, [he, createVNode(_sfc_main$6, mergeProps({
        placement: "top",
        content: Oe
      }, Ve), null)]) : createVNode("span", null, [he]);
    }, Ce = () => {
      const {
        label: _e,
        slot: $e,
        rules: Ve,
        render: Ne,
        field: he,
        suffix: Oe,
        itemProps: Ie,
        component: qe
      } = e.schema;
      if (qe === "Divider") {
        let xe;
        const ze = deepMerge$1({
          contentPosition: "left"
        }, {
          ...unref(re)
        });
        return createVNode(ElCol, {
          span: 24
        }, {
          default: () => [createVNode(ElDivider, ze, _isSlot$2(xe = pe()) ? xe : {
            default: () => [xe]
          })]
        });
      } else {
        const xe = unref(ae), ze = () => $e ? getSlot(k, $e, xe) : Ne ? Ne(xe) : de(), At = !!Oe, Fe = isFunction$2(Oe) ? Oe(unref(ae)) : Oe, Pt = {
          default: () => createVNode("div", {
            style: "display:flex;width:100%;"
          }, [createVNode("div", {
            style: "flex:1;"
          }, [ze()]), At && createVNode("span", {
            class: "suffix"
          }, [Fe])]),
          label: () => pe()
        };
        return createVNode(ElFormItem, mergeProps({
          prop: he,
          label: _e,
          rules: Ve
        }, Ie), {
          default: () => [createTextVNode(" ")],
          ...Pt
        });
      }
    };
    return onMounted(() => {
      const {
        field: _e,
        defaultValue: $e = ""
      } = unref(oe);
      e.setFormModel(_e, $e);
    }), () => {
      let _e;
      const {
        colProps: $e = {},
        colSlot: Ve,
        renderColContent: Ne,
        component: he
      } = e.schema;
      if (!componentMap.has(he))
        return console.error(`FormItem component:${he} is an unregistered component Key`), null;
      const {
        baseColProps: Oe = {}
      } = e.formProps, Ie = {
        ...Oe,
        ...$e
      }, {
        isShow: qe
      } = ie(), xe = unref(ae);
      return withDirectives(createVNode(ElCol, Ie, _isSlot$2(_e = (() => Ve ? getSlot(k, Ve, xe) : Ne ? Ne(xe) : Ce())()) ? _e : {
        default: () => [_e]
      }), [[vShow, qe]]);
    };
  }
}), _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "BasicArrow",
  props: {
    expand: { type: Boolean },
    up: { type: Boolean },
    down: { type: Boolean },
    inset: { type: Boolean }
  },
  setup(e) {
    const k = e, oe = "pandora-basic-arrow", re = computed(() => {
      const { expand: ae, up: le, down: ie, inset: ue } = k;
      return [
        oe,
        {
          [`${oe}--active`]: ae,
          up: le,
          inset: ue,
          down: ie
        }
      ];
    });
    return (ae, le) => {
      const ie = resolveComponent("ArrowDown");
      return openBlock(), createElementBlock("span", {
        class: normalizeClass(unref(re))
      }, [
        createVNode(ie, {
          style: normalizeStyle(ae.$attrs.iconStyle)
        }, null, 8, ["style"])
      ], 2);
    };
  }
}), BasicArrow_vue_vue_type_style_index_0_scoped_ff467d49_lang = "", BasicArrow = /* @__PURE__ */ _export_sfc$1(_sfc_main$4, [["__scopeId", "data-v-ff467d49"]]);
function createContext(e, k = Symbol(), oe = {}) {
  const { readonly: re = !0, createProvider: ae = !1, native: le = !1 } = oe, ie = reactive(e), ue = re ? readonly(ie) : ie;
  return !ae && provide(k, le ? e : ue), {
    state: ie
  };
}
function useContext(e = Symbol(), k) {
  return inject(e, k || {});
}
const key = Symbol();
function createFormContext(e) {
  return createContext(e, key);
}
function useFormContext() {
  return useContext(key);
}
const _sfc_main$3 = defineComponent({
  name: "BasicFormAction",
  components: {
    BasicArrow,
    ElCol,
    ElButton
  },
  props: {
    showActionButtonGroup: propTypes.bool.def(!0),
    showResetButton: propTypes.bool.def(!0),
    showSubmitButton: propTypes.bool.def(!0),
    showAdvancedButton: propTypes.bool.def(!0),
    actionColStyle: {
      type: Object,
      default: () => ({})
    },
    resetButtonOptions: {
      type: Object,
      default: () => ({})
    },
    submitButtonOptions: {
      type: Object,
      default: () => ({})
    },
    actionColOptions: {
      type: Object,
      default: () => ({})
    },
    actionSpan: propTypes.number.def(6),
    isAdvanced: propTypes.bool,
    hideAdvanceBtn: propTypes.bool.def(!1)
  },
  emits: ["toggle-advanced"],
  setup(e, { emit: k }) {
    const oe = computed(() => {
      const { showAdvancedButton: ue, actionSpan: de, actionColOptions: pe } = e, Ce = 24 - de, _e = ue ? { span: Ce < 6 ? 24 : Ce } : {};
      return {
        span: ue ? 6 : 4,
        ..._e,
        ...pe
      };
    }), re = computed(() => {
      const { actionColStyle: ue } = e;
      return {
        width: "100%",
        "text-align": ue.textAlign ? ue.textAlign : "right"
      };
    }), ae = computed(() => Object.assign(
      {
        label: "\u91CD\u7F6E"
      },
      e.resetButtonOptions
    )), le = computed(() => Object.assign(
      {
        label: "\u67E5\u8BE2"
      },
      e.submitButtonOptions
    ));
    function ie() {
      k("toggle-advanced");
    }
    return {
      actionColOpt: oe,
      getResetBtnOptions: ae,
      getSubmitBtnOptions: le,
      toggleAdvanced: ie,
      getActionStyle: re,
      ...useFormContext()
    };
  }
});
function _sfc_render$2(e, k, oe, re, ae, le) {
  const ie = resolveComponent("el-button"), ue = resolveComponent("BasicArrow"), de = resolveComponent("el-col");
  return e.showActionButtonGroup ? (openBlock(), createBlock(de, normalizeProps(mergeProps({ key: 0 }, e.actionColOpt)), {
    default: withCtx(() => [
      createElementVNode("div", {
        style: normalizeStyle(e.getActionStyle)
      }, [
        renderSlot(e.$slots, "resetBefore"),
        e.showResetButton ? (openBlock(), createBlock(ie, mergeProps({
          key: 0,
          type: "default"
        }, e.getResetBtnOptions, { onClick: e.resetAction }), {
          default: withCtx(() => [
            createTextVNode(toDisplayString(e.getResetBtnOptions.label), 1)
          ]),
          _: 1
        }, 16, ["onClick"])) : createCommentVNode("", !0),
        renderSlot(e.$slots, "submitBefore"),
        e.showSubmitButton ? (openBlock(), createBlock(ie, mergeProps({
          key: 1,
          type: "primary"
        }, e.getSubmitBtnOptions, { onClick: e.submitAction }), {
          default: withCtx(() => [
            createTextVNode(toDisplayString(e.getSubmitBtnOptions.label), 1)
          ]),
          _: 1
        }, 16, ["onClick"])) : createCommentVNode("", !0),
        renderSlot(e.$slots, "advanceBefore"),
        e.showAdvancedButton && !e.hideAdvanceBtn ? (openBlock(), createBlock(ie, {
          key: 2,
          type: "text",
          size: "small",
          onClick: e.toggleAdvanced
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(e.isAdvanced ? "\u6536\u8D77" : "\u5C55\u5F00") + " ", 1),
            createVNode(ue, {
              class: "ml-1",
              expand: !e.isAdvanced,
              up: ""
            }, null, 8, ["expand"])
          ]),
          _: 1
        }, 8, ["onClick"])) : createCommentVNode("", !0),
        renderSlot(e.$slots, "advanceAfter")
      ], 4)
    ]),
    _: 3
  }, 16)) : createCommentVNode("", !0);
}
const FormAction = /* @__PURE__ */ _export_sfc$1(_sfc_main$3, [["render", _sfc_render$2]]);
function createNamespace(e) {
  return [`Pd${e}`];
}
const dateUtil = dayjs;
function tryDeconstructArray(e, k, oe) {
  const re = /^\[(.+)\]$/;
  if (re.test(e)) {
    const ae = e.match(re);
    if (ae && ae[1]) {
      const le = ae[1].split(",");
      return k = Array.isArray(k) ? k : [k], le.forEach((ie, ue) => {
        set(oe, ie.trim(), k[ue]);
      }), !0;
    }
  }
}
function tryDeconstructObject(e, k, oe) {
  const re = /^\{(.+)\}$/;
  if (re.test(e)) {
    const ae = e.match(re);
    if (ae && ae[1]) {
      const le = ae[1].split(",");
      return k = isObject$3(k) ? k : {}, le.forEach((ie) => {
        set(oe, ie.trim(), k[ie.trim()]);
      }), !0;
    }
  }
}
function useFormValues({
  defaultValueRef: e,
  getSchema: k,
  getProps: oe,
  formModel: re
}) {
  function ae(ue) {
    var pe, Ce;
    if (!isObject$3(ue))
      return {};
    const de = {};
    for (const _e of Object.entries(ue)) {
      let [, $e] = _e;
      const [Ve] = _e;
      if (!Ve || isArray$3($e) && $e.length === 0 || isFunction$2($e))
        continue;
      const Ne = unref(oe).transformDateFunc;
      isObject$3($e) && ($e = Ne == null ? void 0 : Ne($e)), isArray$3($e) && ((pe = $e[0]) == null ? void 0 : pe.format) && ((Ce = $e[1]) == null ? void 0 : Ce.format) && ($e = $e.map((he) => Ne == null ? void 0 : Ne(he))), isString$2($e) && ($e = $e.trim()), !tryDeconstructArray(Ve, $e, de) && !tryDeconstructObject(Ve, $e, de) && set(de, Ve, $e);
    }
    return le(de);
  }
  function le(ue) {
    const de = unref(oe).fieldMapToTime;
    if (!de || !Array.isArray(de))
      return ue;
    for (const [
      pe,
      [Ce, _e],
      $e = "YYYY-MM-DD"
    ] of de) {
      if (!pe || !Ce || !_e || !ue[pe])
        continue;
      const [Ve, Ne] = ue[pe];
      ue[Ce] = dateUtil(Ve).format($e), ue[_e] = dateUtil(Ne).format($e), Reflect.deleteProperty(ue, pe);
    }
    return ue;
  }
  function ie() {
    const ue = unref(k), de = {};
    ue.forEach((pe) => {
      const { defaultValue: Ce } = pe;
      isNullOrUnDef(Ce) || (de[pe.field] = Ce, re[pe.field] = Ce, re[pe.field] === void 0 && (re[pe.field] = Ce));
    }), e.value = cloneDeep(de);
  }
  return { handleFormValues: ae, initDefault: ie };
}
function useFormEvents({
  emit,
  getProps,
  formModel,
  getSchema,
  defaultValueRef,
  formElRef,
  schemaRef,
  handleFormValues
}) {
  async function resetFields() {
    const { resetFunc: e, submitOnReset: k } = unref(getProps);
    e && isFunction$2(e) && await e(), unref(formElRef) && (Object.keys(formModel).forEach((re) => {
      const ae = unref(getSchema).find((ue) => ue.field === re), le = (ae == null ? void 0 : ae.component) && defaultValueComponents.includes(ae.component), ie = cloneDeep(defaultValueRef.value[re]);
      formModel[re] = le ? ie || "" : ie;
    }), nextTick(() => clearValidate()), emit("reset", toRaw(formModel)), k && handleSubmit());
  }
  async function setFieldsValue(values) {
    const fields = unref(getSchema).map((e) => e.field).filter(Boolean), delimiter = ".", nestKeyArray = fields.filter(
      (e) => e.indexOf(delimiter) >= 0
    ), validKeys = [];
    Object.keys(values).forEach((key) => {
      const schema = unref(getSchema).find((e) => e.field === key);
      let value = values[key];
      const hasKey = Reflect.has(values, key);
      if (value = handleInputNumberValue(schema == null ? void 0 : schema.component, value), hasKey && fields.includes(key)) {
        if (itemIsDateType(key))
          if (Array.isArray(value)) {
            const e = [];
            for (const k of value)
              e.push(k ? dateUtil(k) : null);
            formModel[key] = e;
          } else {
            const { componentProps: e } = schema || {};
            let k = e;
            typeof e == "function" && (k = k({ formModel })), formModel[key] = value ? k != null && k.valueFormat ? value : dateUtil(value) : null;
          }
        else
          formModel[key] = value;
        validKeys.push(key);
      } else
        nestKeyArray.forEach((nestKey) => {
          try {
            const value = eval("values" + delimiter + nestKey);
            isDef(value) && (formModel[nestKey] = value, validKeys.push(nestKey));
          } catch (e) {
            isDef(defaultValueRef.value[nestKey]) && (formModel[nestKey] = cloneDeep(defaultValueRef.value[nestKey]));
          }
        });
    }), validateFields(validKeys).catch((e) => {
    });
  }
  async function removeSchemaByFiled(e) {
    const k = cloneDeep(unref(getSchema));
    if (!e)
      return;
    let oe = isString$2(e) ? [e] : e;
    isString$2(e) && (oe = [e]);
    for (const re of oe)
      _removeSchemaByFiled(re, k);
    schemaRef.value = k;
  }
  function _removeSchemaByFiled(e, k) {
    if (isString$2(e)) {
      const oe = k.findIndex((re) => re.field === e);
      oe !== -1 && (delete formModel[e], k.splice(oe, 1));
    }
  }
  async function appendSchemaByField(e, k, oe = !1) {
    const re = cloneDeep(unref(getSchema)), ae = re.findIndex((le) => le.field === k);
    if (!k || ae === -1 || oe) {
      oe ? re.unshift(e) : re.push(e), schemaRef.value = re, _setDefaultValue(e);
      return;
    }
    ae !== -1 && re.splice(ae + 1, 0, e), _setDefaultValue(e), schemaRef.value = re;
  }
  async function resetSchema(e) {
    let k = [];
    if (isObject$3(e) && k.push(e), isArray$3(e) && (k = [...e]), !k.every(
      (re) => re.component === "Divider" || Reflect.has(re, "field") && re.field
    )) {
      error(
        "All children of the form Schema array that need to be updated must contain the `field` field"
      );
      return;
    }
    schemaRef.value = k;
  }
  async function updateSchema(e) {
    let k = [];
    if (isObject$3(e) && k.push(e), isArray$3(e) && (k = [...e]), !k.every(
      (ae) => ae.component === "Divider" || Reflect.has(ae, "field") && ae.field
    )) {
      error(
        "All children of the form Schema array that need to be updated must contain the `field` field"
      );
      return;
    }
    const re = [];
    k.forEach((ae) => {
      unref(getSchema).forEach((le) => {
        if (le.field === ae.field) {
          const ie = deepMerge$1(le, ae);
          re.push(ie);
        } else
          re.push(le);
      });
    }), _setDefaultValue(re), schemaRef.value = uniqBy(re, "field");
  }
  function _setDefaultValue(e) {
    let k = [];
    isObject$3(e) && k.push(e), isArray$3(e) && (k = [...e]);
    const oe = {}, re = getFieldsValue();
    k.forEach((ae) => {
      ae.component != "Divider" && Reflect.has(ae, "field") && ae.field && !isNullOrUnDef(ae.defaultValue) && !(ae.field in re) && (oe[ae.field] = ae.defaultValue);
    }), setFieldsValue(oe);
  }
  function getFieldsValue() {
    return unref(formElRef) ? handleFormValues(toRaw(unref(formModel))) : {};
  }
  function itemIsDateType(e) {
    return unref(getSchema).some((k) => k.field === e ? dateItemType.includes(k.component) : !1);
  }
  async function validateFields(e, k) {
    var oe;
    return (oe = unref(formElRef)) == null ? void 0 : oe.validateFields(e, k);
  }
  async function validate(e) {
    var k;
    return await ((k = unref(formElRef)) == null ? void 0 : k.validate(e));
  }
  async function clearValidate(e) {
    var k;
    await ((k = unref(formElRef)) == null ? void 0 : k.clearValidate(e));
  }
  async function scrollToField(e, k) {
    var oe;
    await ((oe = unref(formElRef)) == null ? void 0 : oe.scrollToField(e, k));
  }
  async function handleSubmit(e) {
    e && e.preventDefault();
    const { submitFunc: k } = unref(getProps);
    if (k && isFunction$2(k)) {
      await k();
      return;
    }
    !unref(formElRef) || await validate(function(re, ae) {
      if (re) {
        console.log("submit!");
        const le = handleFormValues(toRaw(unref(formModel)));
        emit("submit", le);
      } else
        console.error("error submit!", ae);
    });
  }
  return {
    handleSubmit,
    clearValidate,
    validate,
    validateFields,
    getFieldsValue,
    updateSchema,
    resetSchema,
    appendSchemaByField,
    removeSchemaByFiled,
    resetFields,
    setFieldsValue,
    scrollToField
  };
}
async function useAutoFocus({
  getSchema: e,
  getProps: k,
  formElRef: oe,
  isInitedDefault: re
}) {
  watchEffect(async () => {
    if (unref(re) || !unref(k).autoFocusFirstItem)
      return;
    await nextTick();
    const ae = unref(e), le = unref(oe), ie = le == null ? void 0 : le.$el;
    if (!le || !ie || !ae || ae.length === 0 || !ae[0].component.includes("Input"))
      return;
    const de = ie.querySelector(
      ".ant-row:first-child input"
    );
    !de || de == null || de.focus();
  });
}
var _a;
const isClient = typeof window < "u";
isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function resolveUnref(e) {
  return typeof e == "function" ? e() : unref(e);
}
function createFilterWrapper(e, k) {
  function oe(...re) {
    e(() => k.apply(this, re), { fn: k, thisArg: this, args: re });
  }
  return oe;
}
function debounceFilter(e, k = {}) {
  let oe, re;
  return (le) => {
    const ie = resolveUnref(e), ue = resolveUnref(k.maxWait);
    if (oe && clearTimeout(oe), ie <= 0 || ue !== void 0 && ue <= 0)
      return re && (clearTimeout(re), re = null), le();
    ue && !re && (re = setTimeout(() => {
      oe && clearTimeout(oe), re = null, le();
    }, ue)), oe = setTimeout(() => {
      re && clearTimeout(re), re = null, le();
    }, ie);
  };
}
function useDebounceFn(e, k = 200, oe = {}) {
  return createFilterWrapper(debounceFilter(k, oe), e);
}
function tryOnUnmounted(e) {
  getCurrentInstance() && onUnmounted(e);
}
const FormBasicProps = {
  model: {
    type: Object,
    default: {}
  },
  labelWidth: {
    type: [Number, String],
    default: 0
  },
  fieldMapToTime: {
    type: Array,
    default: () => []
  },
  schemas: {
    type: [Array],
    default: () => []
  },
  mergeDynamicData: {
    type: Object,
    default: null
  },
  baseRowStyle: {
    type: Object
  },
  baseColProps: {
    type: Object
  },
  autoSetPlaceHolder: propTypes.bool.def(!0),
  autoSubmitOnEnter: propTypes.bool.def(!1),
  submitOnReset: propTypes.bool,
  submitOnChange: propTypes.bool,
  size: propTypes.oneOf(["large", "default", "small"]).def("default"),
  disabled: propTypes.bool,
  emptySpan: {
    type: [Number, Object],
    default: 0
  },
  showAdvancedButton: propTypes.bool.def(!1),
  transformDateFunc: {
    type: Function,
    default: (e) => {
      var k, oe;
      return (oe = (k = e == null ? void 0 : e.format) == null ? void 0 : k.call(e, "YYYY-MM-DD HH:mm:ss")) != null ? oe : e;
    }
  },
  rulesMessageJoinLabel: propTypes.bool.def(!0),
  autoAdvancedLine: propTypes.number.def(3),
  alwaysShowLines: propTypes.number.def(1),
  showActionButtonGroup: propTypes.bool.def(!0),
  actionColOptions: Object,
  showResetButton: propTypes.bool.def(!0),
  autoFocusFirstItem: propTypes.bool,
  resetButtonOptions: Object,
  showSubmitButton: propTypes.bool.def(!0),
  submitButtonOptions: Object,
  resetFunc: Function,
  submitFunc: Function,
  hideRequiredMark: propTypes.bool,
  labelAlign: propTypes.string,
  rowProps: Object,
  rules: Object
};
var screenEnum = /* @__PURE__ */ ((e) => (e[e.XS = 480] = "XS", e[e.SM = 576] = "SM", e[e.MD = 768] = "MD", e[e.LG = 992] = "LG", e[e.XL = 1200] = "XL", e[e.XXL = 1600] = "XXL", e))(screenEnum || {});
const screenMap = /* @__PURE__ */ new Map();
screenMap.set("XS", 480);
screenMap.set("SM", 576);
screenMap.set("MD", 768);
screenMap.set("LG", 992);
screenMap.set("XL", 1200);
screenMap.set("XXL", 1600);
let globalScreenRef, globalWidthRef, globalRealWidthRef;
function useBreakpoint() {
  return {
    screenRef: computed(() => unref(globalScreenRef)),
    widthRef: globalWidthRef,
    screenEnum,
    realWidthRef: globalRealWidthRef
  };
}
const BASIC_COL_LEN = 24;
function useAdvanced({
  advanceState: e,
  emit: k,
  getProps: oe,
  getSchema: re,
  formModel: ae,
  defaultValueRef: le
}) {
  const ie = getCurrentInstance(), { realWidthRef: ue, screenEnum: de, screenRef: pe } = useBreakpoint(), Ce = computed(() => {
    if (!e.isAdvanced)
      return 0;
    const he = unref(oe).emptySpan || 0;
    if (isNumber$1(he))
      return he;
    if (isObject$3(he)) {
      const { span: Oe = 0 } = he, Ie = unref(pe);
      return he[Ie.toLowerCase()] || Oe || 0;
    }
    return 0;
  }), _e = useDebounceFn(Ve, 30);
  watch(
    [
      () => unref(re),
      () => e.isAdvanced,
      () => unref(ue)
    ],
    () => {
      const { showAdvancedButton: he } = unref(oe);
      he && _e();
    },
    { immediate: !0 }
  );
  function $e(he, Oe = 0, Ie = !1) {
    const qe = unref(ue), xe = parseInt(he.md) || parseInt(he.xs) || parseInt(he.sm) || he.span || BASIC_COL_LEN, ze = parseInt(he.lg) || xe, At = parseInt(he.xl) || ze, Fe = parseInt(he.xxl) || At;
    return qe <= de.MD ? Oe += xe : qe < de.LG ? Oe += ze : qe < de.XL ? Oe += At : Oe += Fe, Ie ? (e.hideAdvanceBtn = !1, Oe <= BASIC_COL_LEN * 2 ? (e.hideAdvanceBtn = !0, e.isAdvanced = !0) : Oe > BASIC_COL_LEN * 2 && Oe <= BASIC_COL_LEN * (unref(oe).autoAdvancedLine || 3) ? e.hideAdvanceBtn = !1 : e.isLoad || (e.isLoad = !0, e.isAdvanced = !e.isAdvanced), { isAdvanced: e.isAdvanced, itemColSum: Oe }) : Oe > BASIC_COL_LEN * (unref(oe).alwaysShowLines || 1) ? { isAdvanced: e.isAdvanced, itemColSum: Oe } : { isAdvanced: !0, itemColSum: Oe };
  }
  function Ve() {
    var qe;
    let he = 0, Oe = 0;
    const { baseColProps: Ie = {} } = unref(oe);
    for (const xe of unref(re)) {
      const { show: ze, colProps: At } = xe;
      let Fe = !0;
      if (isBoolean$1(ze) && (Fe = ze), isFunction$2(ze) && (Fe = ze({
        schema: xe,
        model: ae,
        field: xe.field,
        values: {
          ...unref(le),
          ...ae
        }
      })), Fe && (At || Ie)) {
        const { itemColSum: Pt, isAdvanced: vn } = $e(
          { ...Ie, ...At },
          he
        );
        he = Pt || 0, vn && (Oe = he), xe.isAdvanced = vn;
      }
    }
    (qe = ie == null ? void 0 : ie.proxy) == null || qe.$forceUpdate(), e.actionSpan = Oe % BASIC_COL_LEN + unref(Ce), $e(
      unref(oe).actionColOptions || { span: BASIC_COL_LEN },
      he,
      !0
    ), k("advanced-change");
  }
  function Ne() {
    e.isAdvanced = !e.isAdvanced;
  }
  return { handleToggleAdvanced: Ne };
}
const [name$2] = createNamespace("Form"), _sfc_main$2 = defineComponent({
  name: name$2,
  inheritAttrs: !1,
  props: FormBasicProps,
  components: {
    ElForm,
    ElRow,
    FormItem: _sfc_main$5,
    FormAction
  },
  emits: ["advanced-change", "reset", "submit", "register", "field-value-change"],
  setup(e, { emit: k, attrs: oe }) {
    const re = reactive({}), ae = ref({}), le = ref({}), ie = ref(null), ue = ref(null), de = ref(!1), pe = reactive({
      isAdvanced: !0,
      hideAdvanceBtn: !1,
      isLoad: !1,
      actionSpan: 6
    }), Ce = computed(
      () => ({
        ...e,
        ...unref(ae)
      })
    ), _e = computed(() => {
      const { baseRowStyle: kt = {}, rowProps: Et } = unref(Ce);
      return {
        style: kt,
        ...Et
      };
    }), $e = computed(() => {
      const { rules: kt = {} } = unref(Ce);
      return kt;
    }), Ve = computed(
      () => ({ ...oe, ...e, ...unref(Ce) })
    ), Ne = computed(() => {
      const kt = unref(ie) || e.schemas;
      for (const Et of kt) {
        const { defaultValue: _n, component: Pn } = Et;
        if (_n && dateItemType.includes(Pn))
          if (!Array.isArray(_n))
            Et.defaultValue = dateUtil(_n);
          else {
            const hn = [];
            _n.forEach((On) => {
              hn.push(dateUtil(On));
            }), Et.defaultValue = hn;
          }
      }
      return unref(Ce).showAdvancedButton ? cloneDeep(
        kt.filter((Et) => Et.component !== "Divider")
      ) : cloneDeep(kt);
    }), { initDefault: he, handleFormValues: Oe } = useFormValues({
      getProps: Ce,
      defaultValueRef: le,
      getSchema: Ne,
      formModel: re
    }), {
      handleSubmit: Ie,
      setFieldsValue: qe,
      clearValidate: xe,
      validate: ze,
      validateFields: At,
      getFieldsValue: Fe,
      updateSchema: Pt,
      resetSchema: vn,
      appendSchemaByField: En,
      removeSchemaByFiled: Nn,
      resetFields: Tn,
      scrollToField: wn
    } = useFormEvents({
      emit: k,
      getProps: Ce,
      formModel: re,
      getSchema: Ne,
      defaultValueRef: le,
      formElRef: ue,
      schemaRef: ie,
      handleFormValues: Oe
    });
    createFormContext({
      resetAction: Tn,
      submitAction: Ie
    }), watch(
      () => unref(Ce).model,
      () => {
        const { model: kt } = unref(Ce);
        !kt || qe(kt);
      },
      {
        immediate: !0
      }
    ), watch(
      () => unref(Ce).schemas,
      (kt) => {
        vn(kt != null ? kt : []);
      }
    ), watch(
      () => Ne.value,
      (kt) => {
        unref(de) || kt != null && kt.length && (he(), de.value = !0);
      }
    ), watch(
      () => re,
      useDebounceFn(() => {
        unref(Ce).submitOnChange && Ie();
      }, 300),
      { deep: !0 }
    );
    async function Lt(kt) {
      ae.value = deepMerge$1(unref(ae) || {}, kt);
    }
    function Dt(kt, Et) {
      re[kt] = Et;
      const { validateTrigger: _n } = unref(Ve);
      (!_n || _n === "change") && At([kt]).catch(() => {
      }), k("field-value-change", kt, Et);
    }
    function Cn(kt) {
      const { autoSubmitOnEnter: Et } = unref(Ce);
      if (!!Et && kt.key === "Enter" && kt.target && kt.target instanceof HTMLElement) {
        const _n = kt.target;
        _n && _n.tagName && _n.tagName.toUpperCase() == "INPUT" && Ie();
      }
    }
    const jt = {
      getFieldsValue: Fe,
      setFieldsValue: qe,
      resetFields: Tn,
      updateSchema: Pt,
      resetSchema: vn,
      setProps: Lt,
      removeSchemaByFiled: Nn,
      appendSchemaByField: En,
      clearValidate: xe,
      validateFields: At,
      validate: ze,
      submit: Ie,
      scrollToField: wn
    };
    useAutoFocus({
      getSchema: Ne,
      getProps: Ce,
      isInitedDefault: de,
      formElRef: ue
    }), onMounted(() => {
      he(), k("register", jt);
    });
    const { handleToggleAdvanced: bn } = useAdvanced({
      advanceState: pe,
      emit: k,
      getProps: Ce,
      getSchema: Ne,
      formModel: re,
      defaultValueRef: le
    });
    return {
      getBindValue: Ve,
      handleToggleAdvanced: bn,
      handleEnterPress: Cn,
      formModel: re,
      defaultValueRef: le,
      advanceState: pe,
      getRow: _e,
      getProps: Ce,
      getRules: $e,
      formRef: ue,
      getSchema: Ne,
      formActionType: jt,
      setFormModel: Dt,
      getFormActionBindProps: computed(
        () => ({ ...Ce.value, ...pe })
      ),
      ...jt
    };
  }
}), index_vue_vue_type_style_index_0_lang$2 = "", _hoisted_1$1 = { class: "vpandora-form" };
function _sfc_render$1(e, k, oe, re, ae, le) {
  const ie = resolveComponent("FormItem"), ue = resolveComponent("FormAction"), de = resolveComponent("el-row"), pe = resolveComponent("el-Form");
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    createVNode(pe, mergeProps(e.getBindValue, {
      rules: e.getRules,
      ref: "formRef",
      model: e.formModel,
      onKeypress: withKeys(e.handleEnterPress, ["enter"])
    }), {
      default: withCtx(() => [
        createVNode(de, normalizeProps(guardReactiveProps(e.getRow)), {
          default: withCtx(() => [
            renderSlot(e.$slots, "formHeader"),
            (openBlock(!0), createElementBlock(Fragment, null, renderList(e.getSchema, (Ce) => (openBlock(), createBlock(ie, {
              key: Ce.field,
              tableAction: e.tableAction,
              formActionType: e.formActionType,
              schema: Ce,
              formProps: e.getProps,
              allDefaultValues: e.defaultValueRef,
              formModel: e.formModel,
              setFormModel: e.setFormModel
            }, createSlots({ _: 2 }, [
              renderList(Object.keys(e.$slots), (_e) => ({
                name: _e,
                fn: withCtx(($e) => [
                  renderSlot(e.$slots, _e, normalizeProps(guardReactiveProps($e || {})))
                ])
              }))
            ]), 1032, ["tableAction", "formActionType", "schema", "formProps", "allDefaultValues", "formModel", "setFormModel"]))), 128)),
            createVNode(ue, mergeProps(e.getFormActionBindProps, { onToggleAdvanced: e.handleToggleAdvanced }), createSlots({ _: 2 }, [
              renderList(["resetBefore", "submitBefore", "advanceBefore", "advanceAfter"], (Ce) => ({
                name: Ce,
                fn: withCtx((_e) => [
                  renderSlot(e.$slots, Ce, normalizeProps(guardReactiveProps(_e || {})))
                ])
              }))
            ]), 1040, ["onToggleAdvanced"]),
            renderSlot(e.$slots, "formFooter")
          ]),
          _: 3
        }, 16)
      ]),
      _: 3
    }, 16, ["rules", "model", "onKeypress"])
  ]);
}
const _Form = /* @__PURE__ */ _export_sfc$1(_sfc_main$2, [["render", _sfc_render$1]]);
function isProdMode() {
  return !0;
}
function useForm(e) {
  const k = ref(null), oe = ref(!1);
  async function re() {
    const ie = unref(k);
    return ie || error(
      "The form instance has not been obtained, please make sure that the form has been rendered when performing the form operation!"
    ), await nextTick(), ie;
  }
  return [(ie) => {
    onUnmounted(() => {
      k.value = null, oe.value = null;
    }), !(unref(oe) && isProdMode() && ie === unref(k)) && (k.value = ie, oe.value = !0, watch(
      () => e,
      () => {
        e && ie.setProps(getDynamicProps(e));
      },
      {
        immediate: !0,
        deep: !0
      }
    ));
  }, {
    setProps: async (ie) => {
      (await re()).setProps(ie);
    },
    updateSchema: async (ie) => {
      (await re()).updateSchema(ie);
    },
    resetSchema: async (ie) => {
      (await re()).resetSchema(ie);
    },
    clearValidate: async (ie) => {
      (await re()).clearValidate(ie);
    },
    resetFields: async () => {
      re().then(async (ie) => {
        await ie.resetFields();
      });
    },
    removeSchemaByFiled: async (ie) => {
      var ue;
      (ue = unref(k)) == null || ue.removeSchemaByFiled(ie);
    },
    getFieldsValue: () => {
      var ie;
      return (ie = unref(k)) == null ? void 0 : ie.getFieldsValue();
    },
    setFieldsValue: async (ie) => {
      (await re()).setFieldsValue(ie);
    },
    appendSchemaByField: async (ie, ue, de) => {
      const pe = await re();
      pe == null || pe.appendSchemaByField(ie, ue, de);
    },
    submit: async () => (await re()).submit()
  }];
}
function useComponentRegister(e, k) {
  add(e, k), tryOnUnmounted(() => {
    del(e);
  });
}
const PdForm = withInstall$1(_Form);
function _isSlot$1(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !isVNode(e);
}
function renderColumnProp(e, k) {
  const {
    prop: oe,
    value: re,
    label: ae,
    name: le,
    sortable: ie,
    render: ue,
    ...de
  } = e, pe = {
    prop: oe || re,
    label: ae || le,
    ...de
  };
  let Ce;
  return ie && (Ce = {
    header: (_e) => {
      const $e = _e.column;
      return createVNode("div", {
        relId: $e.property
      }, [$e.label, createVNode("span", {
        class: "caret-wrapper"
      }, [createVNode("i", {
        class: "sort-caret ascending",
        "on-click": (Ne) => k.sortIconClick(Ne, $e, "ascending")
      }, null), createVNode("i", {
        class: "sort-caret descending",
        "on-click": (Ne) => k.sortIconClick(Ne, $e, "descending")
      }, null)])]);
    }
  }), ue && isFunction$2(ue) && (Ce = {
    default: (_e) => ue(toRaw(_e.row), _e.column, _e.$index)
  }), {
    columnProps: pe,
    slots: Ce
  };
}
function getColumnVNode(e, k, oe = null) {
  const {
    columnProps: re,
    slots: ae
  } = renderColumnProp(e, k);
  if (oe)
    return createVNode(ElTableColumn, re, _isSlot$1(oe) ? oe : {
      default: () => [oe]
    });
  const le = ae && (ae.default || ae.header) ? ae : "";
  return createVNode(ElTableColumn, {
    ...re
  }, le);
}
function useColumnRender(e, k) {
  return e.map((re) => {
    let ae;
    return (re == null ? void 0 : re.columns) && (re == null ? void 0 : re.columns.length) ? (ae = re == null ? void 0 : re.columns.map((le) => getColumnVNode(le, k)), getColumnVNode(re, k, ae)) : getColumnVNode(re, k);
  });
}
const PAGE_HEIGHT = 50, defaultOption = {
  height: PAGE_HEIGHT,
  currentPage: 1,
  total: 200,
  pageCount: 7,
  pageSizes: [10, 20, 30, 40, 50],
  pageSize: 10,
  layout: "total, sizes, prev, pager, next, jumper"
}, getPagerProps = () => ({
  option: {
    type: Object,
    default() {
      return cloneDeep(defaultOption);
    }
  }
}), [name$1] = createNamespace("Pagination"), _sfc_main$1 = defineComponent({
  name: name$1,
  inheritAttrs: !1,
  props: getPagerProps(),
  setup(e, { emit: k }) {
    return {
      handleSizeChange: (ae) => {
        k("handleSizeChange", ae);
      },
      handleCurrentChange: (ae) => {
        k("handleCurrentChange", ae);
      }
    };
  }
}), index_vue_vue_type_style_index_0_lang$1 = "", _hoisted_1 = { class: "vpandora-pagination" };
function _sfc_render(e, k, oe, re, ae, le) {
  const ie = resolveComponent("el-pagination");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(ie, {
      onSizeChange: e.handleSizeChange,
      onCurrentChange: e.handleCurrentChange,
      currentPage: e.option.currentPage,
      "onUpdate:currentPage": k[0] || (k[0] = (ue) => e.option.currentPage = ue),
      "page-sizes": e.option.pageSizes,
      "page-size": e.option.pageSize,
      "onUpdate:page-size": k[1] || (k[1] = (ue) => e.option.pageSize = ue),
      "pager-count": e.option.pageCount,
      layout: e.option.layout,
      total: e.option.total
    }, null, 8, ["onSizeChange", "onCurrentChange", "currentPage", "page-sizes", "page-size", "pager-count", "layout", "total"])
  ]);
}
const Pagination = /* @__PURE__ */ _export_sfc$1(_sfc_main$1, [["render", _sfc_render]]), usePagerRender = (e, k, oe) => {
  let re = null;
  const le = {
    ref: ref(null),
    option: e,
    onHandleSizeChange: k,
    onHandleCurrentChange: oe
  };
  return re = createVNode(Pagination, le, null), re;
}, tableProps = {
  data: {
    type: Array,
    default() {
      return [];
    }
  },
  columns: {
    type: Array,
    default() {
      return [];
    }
  },
  sortConfig: {
    type: Object,
    default() {
      return {};
    }
  },
  tableConfig: {
    type: Object,
    default() {
      return {};
    }
  }
}, trim = function(e) {
  return (e || "").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, "");
};
function hasClass(e, k) {
  return !!e.className.match(new RegExp("(\\s|^)" + k + "(\\s|$)"));
}
function addClass(e, k) {
  hasClass(e, k) || (e.className = trim(e.className) + " " + k);
}
function removeClass(e, k) {
  hasClass(e, k) && (e.className = e.className.replace(
    new RegExp("(\\s|^)" + k + "(\\s|$)"),
    " "
  ));
}
const ASC = "ascending", DESC = "descending", DEFAULT_SORT = "descending", SINGLE = "single", SORT_ARR = [ASC, DESC];
class SortService {
  constructor(k) {
    fo(this, "activeSort", {});
    fo(this, "defaultSortObj", {});
    fo(this, "_oldActiveSort", {});
    fo(this, "option", {
      sortMode: SINGLE
    });
    this.option = k;
  }
  init() {
    const k = this.option.userColumnOrder;
    this._initDefSortObj();
    for (const oe in k)
      this.defaultSortObj[oe] && (k[oe] = this.defaultSortObj[oe]);
    this._oldActiveSort = Object.assign({}, k), this.activeSort = Object.assign({}, k), this.initIconSort();
  }
  initSort() {
    this._clearSortOrderService(), this._initDefSortObj(), this.sortChange();
  }
  _initDefSortObj() {
    this.option.defaultSorts && this.option.defaultSorts.forEach((k) => {
      this.defaultSortObj[k.prop] = k.order;
    });
  }
  _getDefaultOrder(k) {
    let oe = "";
    return this._oldActiveSort[k] ? oe = this._oldActiveSort[k] : oe = this.option.defaultOrder || DEFAULT_SORT, oe;
  }
  getSortColDom(k) {
    var ae;
    return ((ae = this.option.tableInstance) == null ? void 0 : ae.value).$el.querySelectorAll(`div[relid=${k}]`);
  }
  initIconSort() {
    for (const k in this.activeSort)
      this.getSortColDom(k).forEach((re) => {
        addClass(re.parentNode.parentNode, this.activeSort[k]);
      });
  }
  getTargetSortKey(k) {
    const oe = SORT_ARR.findIndex((re) => re !== k);
    return SORT_ARR[oe];
  }
  getCurrentSortKey(k) {
    let oe = "";
    const re = `${ASC}|${DESC}`;
    for (let ae = 0; ae < k.length; ae++)
      new RegExp(re).test(k[ae]) && (oe = trim(k[ae]));
    return oe;
  }
  _isSingleModel(k) {
    return SINGLE === k;
  }
  getTargetNode(k) {
    const oe = k.target;
    let re;
    return oe.className === "caret-wrapper" ? re = oe.parentNode.parentNode.parentNode : oe.nodeName === "I" ? re = oe.parentNode.parentNode.parentNode.parentNode : oe.nodeName === "DIV" && oe.attributes.getNamedItem("relid") ? re = oe.parentNode.parentNode : oe.nodeName === "DIV" && oe.className == "cell" && (re = oe.parentNode), re;
  }
  isNeedOrderChange(k) {
    return this._oldActiveSort[k];
  }
  sortOrderService(k, oe) {
    this.activeSort[k] = oe;
  }
  _clearSortOrderService() {
    for (const k in this.activeSort)
      this.activeSort[k] = "", this.clearSortOrderCls(k);
  }
  clearSortOrderCls(k) {
    this.getSortColDom(k).forEach((re) => {
      this.removeAllSortOrderCls(re.parentNode.parentNode);
    });
  }
  changeSortOrderClass(k, oe) {
    this.removeAllSortOrderCls(k), addClass(k, oe);
  }
  removeAllSortOrderCls(k) {
    SORT_ARR.forEach((oe) => {
      removeClass(k, oe);
    });
  }
  sortIconClick(k, oe, re) {
    const ae = this.getTargetNode(k);
    this._isSingleModel(this.option.sortMode) && this._clearSortOrderService(), this.changeSortOrderClass(ae, re), this.sortOrderService(oe.property, re), this.sortChange(), k.stopPropagation(), k.preventDefault();
  }
  sortChange() {
    this.option.sortChange && isFunction$2(this.option.sortChange) && this.option.sortChange(this.getActiveSortValue());
  }
  getActiveSortValue() {
    const k = /* @__PURE__ */ Object.create(null);
    for (const oe in this.activeSort)
      this.activeSort[oe] !== "" && (k[oe] = this.activeSort[oe]);
    return k;
  }
  executeHeaderClick(k, oe) {
    const re = k.property;
    if (!this.isNeedOrderChange(re))
      return;
    const ae = this.getTargetNode(oe), le = this.getCurrentSortKey(ae.classList);
    let ie = "";
    this._isSingleModel(this.option.sortMode) && this._clearSortOrderService(), le !== "" ? ie = this.getTargetSortKey(le) : ie = this._getDefaultOrder(re), this.changeSortOrderClass(ae, ie), this.sortOrderService(re, ie), this.sortChange();
  }
}
function useSortService(e, k, oe) {
  const re = () => {
    const le = Object.create([]);
    return k.map((ie) => {
      ie.sortable && ie.sortable !== void 0 && (le[ie.value] = "");
    }), le;
  };
  return e.userColumnOrder = re(), e.tableInstance = oe, new SortService(e);
}
const useTableProps = (e) => {
  const k = ref(), oe = ref(e.data), re = e.tableConfig, ae = ref(e.columns), { sortConfig: le, columns: ie } = e, ue = useSortService(
    le,
    ie,
    k
  ), de = (pe, Ce) => {
    ue.executeHeaderClick(pe, Ce);
  };
  return watch(
    () => e.data,
    () => {
      oe.value = e.data, ue.init();
    }
  ), {
    tableInstance: k,
    tableConfig: re,
    currentData: oe,
    columnsProps: ae,
    $sortService: ue,
    handleHeaderClick: de
  };
};
function _isSlot(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !isVNode(e);
}
const [name] = createNamespace("Table"), _sfc_main = defineComponent({
  name,
  inheritAttrs: !1,
  props: tableProps,
  setup(e, {
    emit: k
  }) {
    const {
      tableInstance: oe,
      tableConfig: re,
      currentData: ae,
      columnsProps: le,
      $sortService: ie,
      handleHeaderClick: ue
    } = useTableProps(e), {
      pagination: de,
      pageOpt: pe,
      ...Ce
    } = re, _e = computed(() => {
      let Ne = {};
      const he = Object.keys(Ce);
      for (let Oe in he)
        Ne[Oe] = unref(he[Oe]);
      return Ne;
    });
    onMounted(() => {
      ie.init();
    });
    const $e = (Ne) => {
      k("handleSizePageChange", Ne);
    }, Ve = (Ne) => {
      k("handleCurrentPageChange", Ne);
    };
    return () => {
      const Ne = Object.assign({
        ref: oe,
        onHeaderClick: ue,
        data: ae.value
      }, _e.value), he = useColumnRender(le.value, ie);
      let Oe = null;
      return unref(de) && (Oe = usePagerRender(pe, $e, Ve)), createVNode("div", {
        class: "vpandora-table"
      }, [createVNode(ElTable, Ne, _isSlot(he) ? he : {
        default: () => [he]
      }), Oe]);
    };
  }
}), index_vue_vue_type_style_index_0_lang = "", PdTable = withInstall$1(_sfc_main), Pandora2 = {
  install(e) {
    e.use(PdFContainer), e.use(PdForm), e.use(PdTable);
  }
};
export {
  PdFContainer as PdContainer,
  PdForm,
  PdTable,
  Pandora2 as default,
  useComponentRegister,
  useForm
};
