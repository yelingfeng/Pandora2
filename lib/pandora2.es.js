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
function t$1() {
  return t$1 = Object.assign ? Object.assign.bind() : function(e) {
    for (var k = 1; k < arguments.length; k++) {
      var oe = arguments[k];
      for (var re in oe)
        Object.prototype.hasOwnProperty.call(oe, re) && (e[re] = oe[re]);
    }
    return e;
  }, t$1.apply(this, arguments);
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
      return t$1({}, this.defaults);
    }
    static set sensibleDefaults(oe) {
      this.defaults = oe !== !1 ? t$1({}, oe !== !0 ? oe : e) : {};
    }
  }).defaults = t$1({}, e), k;
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
    var $e = getTag$1(e), Ne = $e == funcTag || $e == genTag;
    if (isBuffer$1(e))
      return cloneBuffer(e, ue);
    if ($e == objectTag$1 || $e == argsTag$1 || Ne && !ae) {
      if (ie = de || Ne ? {} : initCloneObject(e), !ue)
        return de ? copySymbolsIn(e, baseAssignIn(ie, e)) : copySymbols(e, baseAssign(ie, e));
    } else {
      if (!cloneableTags[$e])
        return ae ? e : {};
      ie = initCloneByTag(e, $e, ue);
    }
  }
  le || (le = new Stack());
  var Oe = le.get(e);
  if (Oe)
    return Oe;
  le.set(e, ie), isSet$1(e) ? e.forEach(function(Ve) {
    ie.add(baseClone(Ve, k, oe, Ve, e, le));
  }) : isMap$1(e) && e.forEach(function(Ve, Ie) {
    ie.set(Ie, baseClone(Ve, k, oe, Ie, e, le));
  });
  var _e = pe ? de ? getAllKeysIn : getAllKeys : de ? keysIn : keys, he = Ce ? void 0 : _e(e);
  return arrayEach(he || e, function(Ve, Ie) {
    he && (Ie = Ve, Ve = e[Ie]), assignValue(ie, Ie, baseClone(Ve, k, oe, Ie, e, le));
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
  var $e = -1, Ne = !0, Oe = oe & COMPARE_UNORDERED_FLAG$3 ? new SetCache() : void 0;
  for (le.set(e, k), le.set(k, e); ++$e < ue; ) {
    var _e = e[$e], he = k[$e];
    if (re)
      var Ve = ie ? re(he, _e, $e, k, e, le) : re(_e, he, $e, e, k, le);
    if (Ve !== void 0) {
      if (Ve)
        continue;
      Ne = !1;
      break;
    }
    if (Oe) {
      if (!arraySome(k, function(Ie, ze) {
        if (!cacheHas(Oe, ze) && (_e === Ie || ae(_e, Ie, oe, re, le)))
          return Oe.push(ze);
      })) {
        Ne = !1;
        break;
      }
    } else if (!(_e === he || ae(_e, he, oe, re, le))) {
      Ne = !1;
      break;
    }
  }
  return le.delete(e), le.delete(k), Ne;
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
  for (var $e = de; $e--; ) {
    var Ne = ue[$e];
    if (!(ie ? Ne in k : hasOwnProperty$2.call(k, Ne)))
      return !1;
  }
  var Oe = le.get(e), _e = le.get(k);
  if (Oe && _e)
    return Oe == k && _e == e;
  var he = !0;
  le.set(e, k), le.set(k, e);
  for (var Ve = ie; ++$e < de; ) {
    Ne = ue[$e];
    var Ie = e[Ne], ze = k[Ne];
    if (re)
      var xe = ie ? re(ze, Ie, Ne, k, e, le) : re(Ie, ze, Ne, e, k, le);
    if (!(xe === void 0 ? Ie === ze || ae(Ie, ze, oe, re, le) : xe)) {
      he = !1;
      break;
    }
    Ve || (Ve = Ne == "constructor");
  }
  if (he && !Ve) {
    var Ue = e.constructor, At = k.constructor;
    Ue != At && "constructor" in e && "constructor" in k && !(typeof Ue == "function" && Ue instanceof Ue && typeof At == "function" && At instanceof At) && (he = !1);
  }
  return le.delete(e), le.delete(k), he;
}
var COMPARE_PARTIAL_FLAG$2 = 1, argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]", objectProto = Object.prototype, hasOwnProperty$1 = objectProto.hasOwnProperty;
function baseIsEqualDeep(e, k, oe, re, ae, le) {
  var ie = isArray$2(e), ue = isArray$2(k), de = ie ? arrayTag : getTag$1(e), pe = ue ? arrayTag : getTag$1(k);
  de = de == argsTag ? objectTag : de, pe = pe == argsTag ? objectTag : pe;
  var Ce = de == objectTag, $e = pe == objectTag, Ne = de == pe;
  if (Ne && isBuffer$1(e)) {
    if (!isBuffer$1(k))
      return !1;
    ie = !0, Ce = !1;
  }
  if (Ne && !Ce)
    return le || (le = new Stack()), ie || isTypedArray$1(e) ? equalArrays(e, k, oe, re, ae, le) : equalByTag(e, k, de, oe, re, ae, le);
  if (!(oe & COMPARE_PARTIAL_FLAG$2)) {
    var Oe = Ce && hasOwnProperty$1.call(e, "__wrapped__"), _e = $e && hasOwnProperty$1.call(k, "__wrapped__");
    if (Oe || _e) {
      var he = Oe ? e.value() : e, Ve = _e ? k.value() : k;
      return le || (le = new Stack()), ae(he, Ve, oe, re, le);
    }
  }
  return Ne ? (le || (le = new Stack()), equalObjects(e, k, oe, re, ae, le)) : !1;
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
      var $e = new Stack();
      if (re)
        var Ne = re(pe, Ce, de, e, k, $e);
      if (!(Ne === void 0 ? baseIsEqual(Ce, pe, COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1, re, $e) : Ne))
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
  var re, ae, le, ie, ue, de, pe = 0, Ce = !1, $e = !1, Ne = !0;
  if (typeof e != "function")
    throw new TypeError(FUNC_ERROR_TEXT);
  k = toNumber(k) || 0, isObject$2(oe) && (Ce = !!oe.leading, $e = "maxWait" in oe, le = $e ? nativeMax(toNumber(oe.maxWait) || 0, k) : le, Ne = "trailing" in oe ? !!oe.trailing : Ne);
  function Oe(Fe) {
    var Pt = re, vn = ae;
    return re = ae = void 0, pe = Fe, ie = e.apply(vn, Pt), ie;
  }
  function _e(Fe) {
    return pe = Fe, ue = setTimeout(Ie, k), Ce ? Oe(Fe) : ie;
  }
  function he(Fe) {
    var Pt = Fe - de, vn = Fe - pe, En = k - Pt;
    return $e ? nativeMin(En, le - vn) : En;
  }
  function Ve(Fe) {
    var Pt = Fe - de, vn = Fe - pe;
    return de === void 0 || Pt >= k || Pt < 0 || $e && vn >= le;
  }
  function Ie() {
    var Fe = now$1();
    if (Ve(Fe))
      return ze(Fe);
    ue = setTimeout(Ie, he(Fe));
  }
  function ze(Fe) {
    return ue = void 0, Ne && re ? Oe(Fe) : (re = ae = void 0, ie);
  }
  function xe() {
    ue !== void 0 && clearTimeout(ue), pe = 0, re = de = ae = ue = void 0;
  }
  function Ue() {
    return ue === void 0 ? ie : ze(now$1());
  }
  function At() {
    var Fe = now$1(), Pt = Ve(Fe);
    if (re = arguments, ae = this, de = Fe, Pt) {
      if (ue === void 0)
        return _e(de);
      if ($e)
        return clearTimeout(ue), ue = setTimeout(Ie, k), Oe(de);
    }
    return ue === void 0 && (ue = setTimeout(Ie, k)), ie;
  }
  return At.cancel = xe, At.flush = Ue, At;
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
      var Ce = e[re], $e = k ? k(Ce) : Ce;
      if (Ce = oe || Ce !== 0 ? Ce : 0, ie && $e === $e) {
        for (var Ne = de.length; Ne--; )
          if (de[Ne] === $e)
            continue e;
        k && de.push($e), ue.push(Ce);
      } else
        ae(de, $e, oe) || (de !== ue && de.push($e), ue.push(Ce));
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
  const pe = (Ne) => {
    re.clearTimeout(de);
    const Oe = unrefElement(e), _e = Ne.composedPath();
    !Oe || Oe === Ne.target || _e.includes(Oe) || !ue.value || ae && ae.length > 0 && ae.some((he) => {
      const Ve = unrefElement(he);
      return Ve && (Ne.target === Ve || _e.includes(Ve));
    }) || k(Ne);
  }, Ce = [
    useEventListener(re, "click", pe, { passive: !0, capture: le }),
    useEventListener(re, "pointerdown", (Ne) => {
      const Oe = unrefElement(e);
      ue.value = !!Oe && !Ne.composedPath().includes(Oe);
    }, { passive: !0 }),
    useEventListener(re, "pointerup", (Ne) => {
      if (Ne.button === 0) {
        const Oe = Ne.composedPath();
        Ne.composedPath = () => Oe, de = re.setTimeout(() => pe(Ne), 50);
      }
    }, { passive: !0 }),
    ie && useEventListener(re, "blur", (Ne) => {
      var Oe;
      const _e = unrefElement(e);
      ((Oe = document.activeElement) == null ? void 0 : Oe.tagName) === "IFRAME" && !(_e != null && _e.contains(document.activeElement)) && k(Ne);
    })
  ].filter(Boolean);
  return () => Ce.forEach((Ne) => Ne());
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
  }, pe = watch(() => unrefElement(e), ($e) => {
    de(), ue && ae && $e && (ie = new ResizeObserver(k), ie.observe($e, le));
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
      let Ce = !1, $e = [];
      if (oe && ($e = Array.from(oe), hasOwn(e, "default") && $e.push(ae), Ce || (Ce = $e.includes(pe))), ie && (Ce || (Ce = ie(pe))), !Ce && $e.length > 0) {
        const Ne = [...new Set($e)].map((Oe) => JSON.stringify(Oe)).join(", ");
        warn(`Invalid prop: validation failed${k ? ` for prop "${k}"` : ""}. Expected one of [${Ne}], got value ${JSON.stringify(pe)}.`);
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
    be: (he, Ve) => he && Ve ? _bem(unref(oe), e, he, Ve, "") : "",
    em: (he, Ve) => he && Ve ? _bem(unref(oe), e, "", he, Ve) : "",
    bm: (he, Ve) => he && Ve ? _bem(unref(oe), e, he, "", Ve) : "",
    bem: (he, Ve, Ie) => he && Ve && Ie ? _bem(unref(oe), e, he, Ve, Ie) : "",
    is: (he, ...Ve) => {
      const Ie = Ve.length >= 1 ? Ve[0] : !0;
      return he && Ie ? `${statePrefix}${he}` : "";
    },
    cssVar: (he) => {
      const Ve = {};
      for (const Ie in he)
        he[Ie] && (Ve[`--${oe.value}-${Ie}`] = he[Ie]);
      return Ve;
    },
    cssVarName: (he) => `--${oe.value}-${he}`,
    cssVarBlock: (he) => {
      const Ve = {};
      for (const Ie in he)
        he[Ie] && (Ve[`--${oe.value}-${e}-${Ie}`] = he[Ie]);
      return Ve;
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
      onHide: $e
    }) => {
      const Ne = getCurrentInstance(), { emit: Oe } = Ne, _e = Ne.props, he = computed(() => isFunction(_e[oe])), Ve = computed(() => _e[e] === null), Ie = (Pt) => {
        ie.value !== !0 && (ie.value = !0, ue && (ue.value = Pt), isFunction(Ce) && Ce(Pt));
      }, ze = (Pt) => {
        ie.value !== !1 && (ie.value = !1, ue && (ue.value = Pt), isFunction($e) && $e(Pt));
      }, xe = (Pt) => {
        if (_e.disabled === !0 || isFunction(pe) && !pe())
          return;
        const vn = he.value && isClient$1;
        vn && Oe(k, !0), (Ve.value || !vn) && Ie(Pt);
      }, Ue = (Pt) => {
        if (_e.disabled === !0 || !isClient$1)
          return;
        const vn = he.value && isClient$1;
        vn && Oe(k, !1), (Ve.value || !vn) && ze(Pt);
      }, At = (Pt) => {
        !isBoolean(Pt) || (_e.disabled && Pt ? he.value && Oe(k, !1) : ie.value !== Pt && (Pt ? Ie() : ze()));
      }, Fe = () => {
        ie.value ? Ue() : xe();
      };
      return watch(() => _e[e], At), de && Ne.appContext.config.globalProperties.$route !== void 0 && watch(() => ({
        ...Ne.proxy.$route
      }), () => {
        de.value && ie.value && Ue();
      }), onMounted(() => {
        At(_e[e]);
      }), {
        hide: Ue,
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
    let $e = Ce * k;
    ie === "border-box" && ($e = $e + ae + le), de = Math.max($e, de), pe.minHeight = `${$e}px`;
  }
  if (isNumber(oe)) {
    let $e = Ce * oe;
    ie === "border-box" && ($e = $e + ae + le), de = Math.min($e, de);
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
    }), { form: Ce, formItem: $e } = useFormItem(), { inputId: Ne } = useFormItemInputId(re, {
      formItemContext: $e
    }), Oe = useSize(), _e = useDisabled$1(), he = useNamespace("input"), Ve = useNamespace("textarea"), Ie = shallowRef(), ze = shallowRef(), xe = ref(!1), Ue = ref(!1), At = ref(!1), Fe = ref(!1), Pt = ref(), vn = shallowRef(re.inputStyle), En = computed(() => Ie.value || ze.value), $n = computed(() => {
      var In;
      return (In = Ce == null ? void 0 : Ce.statusIcon) != null ? In : !1;
    }), kn = computed(() => ($e == null ? void 0 : $e.validateState) || ""), wn = computed(() => kn.value && ValidateComponentsMap[kn.value]), Dt = computed(() => Fe.value ? view_default : hide_default), Lt = computed(() => [
      ie.style,
      re.inputStyle
    ]), bn = computed(() => [
      re.inputStyle,
      vn.value,
      { resize: re.resize }
    ]), jt = computed(() => isNil(re.modelValue) ? "" : String(re.modelValue)), Cn = computed(() => re.clearable && !_e.value && !re.readonly && !!jt.value && (xe.value || Ue.value)), kt = computed(() => re.showPassword && !_e.value && !re.readonly && !!jt.value && (!!jt.value || xe.value)), Et = computed(() => re.showWordLimit && !!pe.value.maxlength && (re.type === "text" || re.type === "textarea") && !_e.value && !re.readonly && !re.showPassword), _n = computed(() => Array.from(jt.value).length), Pn = computed(() => !!Et.value && _n.value > Number(pe.value.maxlength)), hn = computed(() => !!ue.suffix || !!re.suffixIcon || Cn.value || re.showPassword || Et.value || !!kn.value && $n.value), [On, Dn] = useCursor(Ie);
    useResizeObserver(ze, (In) => {
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
            ...calcTextareaHeight(ze.value, Qn, ro)
          };
        } else
          vn.value = {
            minHeight: calcTextareaHeight(ze.value).minHeight
          };
    }, Fn = () => {
      const In = En.value;
      !In || In.value === jt.value || (In.value = jt.value);
    }, Nn = (In) => {
      const { el: Jn } = le.vnode;
      if (!Jn)
        return;
      const ro = Array.from(Jn.querySelectorAll(`.${he.e(In)}`)).find((Mn) => Mn.parentNode === Jn);
      if (!ro)
        return;
      const Tn = ae[In];
      ue[Tn] ? ro.style.transform = `translateX(${In === "suffix" ? "-" : ""}${Jn.querySelector(`.${he.be("group", Tn)}`).offsetWidth}px)` : ro.removeAttribute("style");
    }, Bn = () => {
      Nn("prefix"), Nn("suffix");
    }, Vn = async (In) => {
      On();
      let { value: Jn } = In.target;
      re.formatter && (Jn = re.parser ? re.parser(Jn) : Jn, Jn = re.formatter(Jn)), !At.value && Jn !== jt.value && (oe(UPDATE_MODEL_EVENT, Jn), oe("input", Jn), await nextTick(), Fn(), Dn());
    }, An = (In) => {
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
      Fe.value = !Fe.value, qn();
    }, qn = async () => {
      var In;
      await nextTick(), (In = En.value) == null || In.focus();
    }, no = () => {
      var In;
      return (In = En.value) == null ? void 0 : In.blur();
    }, oo = (In) => {
      xe.value = !0, oe("focus", In);
    }, zn = (In) => {
      var Jn;
      xe.value = !1, oe("blur", In), re.validateEvent && ((Jn = $e == null ? void 0 : $e.validate) == null || Jn.call($e, "blur").catch((Qn) => debugWarn(Qn)));
    }, Hn = (In) => {
      Ue.value = !1, oe("mouseleave", In);
    }, Gn = (In) => {
      Ue.value = !0, oe("mouseenter", In);
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
      nextTick(() => Rn()), re.validateEvent && ((In = $e == null ? void 0 : $e.validate) == null || In.call($e, "change").catch((Jn) => debugWarn(Jn)));
    }), watch(jt, () => Fn()), watch(() => re.type, async () => {
      await nextTick(), Fn(), Rn(), Bn();
    }), onMounted(async () => {
      !re.formatter && re.parser && debugWarn("ElInput", "If you set the parser, you also need to set the formatter."), Fn(), Bn(), await nextTick(), Rn();
    }), onUpdated(async () => {
      await nextTick(), Bn();
    }), k({
      input: Ie,
      textarea: ze,
      ref: En,
      textareaStyle: bn,
      autosize: toRef(re, "autosize"),
      focus: qn,
      blur: no,
      select: lo,
      clear: ao,
      resizeTextarea: Rn
    }), (In, Jn) => withDirectives((openBlock(), createElementBlock("div", mergeProps(unref(de), {
      class: [
        In.type === "textarea" ? unref(Ve).b() : unref(he).b(),
        unref(he).m(unref(Oe)),
        unref(he).is("disabled", unref(_e)),
        unref(he).is("exceed", unref(Pn)),
        {
          [unref(he).b("group")]: In.$slots.prepend || In.$slots.append,
          [unref(he).bm("group", "append")]: In.$slots.append,
          [unref(he).bm("group", "prepend")]: In.$slots.prepend,
          [unref(he).m("prefix")]: In.$slots.prefix || In.prefixIcon,
          [unref(he).m("suffix")]: In.$slots.suffix || In.suffixIcon || In.clearable || In.showPassword,
          [unref(he).bm("suffix", "password-clear")]: unref(Cn) && unref(kt)
        },
        In.$attrs.class
      ],
      style: unref(Lt),
      role: In.containerRole,
      onMouseenter: Gn,
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
            id: unref(Ne),
            ref_key: "input",
            ref: Ie,
            class: unref(he).e("inner")
          }, unref(pe), {
            type: In.showPassword ? Fe.value ? "text" : "password" : In.type,
            disabled: unref(_e),
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
            onChange: An,
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
              !unref(Cn) || !unref(kt) || !unref(Et) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
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
              unref(Cn) ? (openBlock(), createBlock(unref(ElIcon), {
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
                  (openBlock(), createBlock(resolveDynamicComponent(unref(Dt))))
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
              unref(kn) && unref(wn) && unref($n) ? (openBlock(), createBlock(unref(ElIcon), {
                key: 4,
                class: normalizeClass([
                  unref(he).e("icon"),
                  unref(he).e("validateIcon"),
                  unref(he).is("loading", unref(kn) === "validating")
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
          id: unref(Ne),
          ref_key: "textarea",
          ref: ze,
          class: unref(Ve).e("inner")
        }, unref(pe), {
          tabindex: In.tabindex,
          disabled: unref(_e),
          readonly: In.readonly,
          autocomplete: In.autocomplete,
          style: unref(bn),
          "aria-label": In.label,
          placeholder: In.placeholder,
          onCompositionstart: Wn,
          onCompositionupdate: Yn,
          onCompositionend: Xn,
          onInput: Vn,
          onFocus: oo,
          onBlur: zn,
          onChange: An,
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
    let pe = !1, Ce = !1, $e = isClient$1 ? document.onselectstart : null;
    const Ne = computed(() => BAR_MAP[k.vertical ? "vertical" : "horizontal"]), Oe = computed(() => renderThumbStyle({
      size: k.size,
      move: k.move,
      bar: Ne.value
    })), _e = computed(() => le.value[Ne.value.offset] ** 2 / re.wrapElement[Ne.value.scrollSize] / k.ratio / ie.value[Ne.value.offset]), he = (Pt) => {
      var vn;
      if (Pt.stopPropagation(), Pt.ctrlKey || [1, 2].includes(Pt.button))
        return;
      (vn = window.getSelection()) == null || vn.removeAllRanges(), Ie(Pt);
      const En = Pt.currentTarget;
      !En || (ue.value[Ne.value.axis] = En[Ne.value.offset] - (Pt[Ne.value.client] - En.getBoundingClientRect()[Ne.value.direction]));
    }, Ve = (Pt) => {
      if (!ie.value || !le.value || !re.wrapElement)
        return;
      const vn = Math.abs(Pt.target.getBoundingClientRect()[Ne.value.direction] - Pt[Ne.value.client]), En = ie.value[Ne.value.offset] / 2, $n = (vn - En) * 100 * _e.value / le.value[Ne.value.offset];
      re.wrapElement[Ne.value.scroll] = $n * re.wrapElement[Ne.value.scrollSize] / 100;
    }, Ie = (Pt) => {
      Pt.stopImmediatePropagation(), pe = !0, document.addEventListener("mousemove", ze), document.addEventListener("mouseup", xe), $e = document.onselectstart, document.onselectstart = () => !1;
    }, ze = (Pt) => {
      if (!le.value || !ie.value || pe === !1)
        return;
      const vn = ue.value[Ne.value.axis];
      if (!vn)
        return;
      const En = (le.value.getBoundingClientRect()[Ne.value.direction] - Pt[Ne.value.client]) * -1, $n = ie.value[Ne.value.offset] - vn, kn = (En - $n) * 100 * _e.value / le.value[Ne.value.offset];
      re.wrapElement[Ne.value.scroll] = kn * re.wrapElement[Ne.value.scrollSize] / 100;
    }, xe = () => {
      pe = !1, ue.value[Ne.value.axis] = 0, document.removeEventListener("mousemove", ze), document.removeEventListener("mouseup", xe), Fe(), Ce && (de.value = !1);
    }, Ue = () => {
      Ce = !1, de.value = !!k.size;
    }, At = () => {
      Ce = !0, de.value = pe;
    };
    onBeforeUnmount(() => {
      Fe(), document.removeEventListener("mouseup", xe);
    });
    const Fe = () => {
      document.onselectstart !== $e && (document.onselectstart = $e);
    };
    return useEventListener(toRef(re, "scrollbarElement"), "mousemove", Ue), useEventListener(toRef(re, "scrollbarElement"), "mouseleave", At), (Pt, vn) => (openBlock(), createBlock(Transition, {
      name: unref(ae).b("fade"),
      persisted: ""
    }, {
      default: withCtx(() => [
        withDirectives(createElementVNode("div", {
          ref_key: "instance",
          ref: le,
          class: normalizeClass([unref(ae).e("bar"), unref(ae).is(unref(Ne).key)]),
          onMousedown: Ve
        }, [
          createElementVNode("div", {
            ref_key: "thumb",
            ref: ie,
            class: normalizeClass(unref(ae).e("thumb")),
            style: normalizeStyle(unref(Oe)),
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
    const ue = ref(), de = ref(), pe = ref(), Ce = ref("0"), $e = ref("0"), Ne = ref(), Oe = ref(1), _e = ref(1), he = "ElScrollbar", Ve = computed(() => {
      const Fe = {};
      return re.height && (Fe.height = addUnit(re.height)), re.maxHeight && (Fe.maxHeight = addUnit(re.maxHeight)), [re.wrapStyle, Fe];
    }), Ie = () => {
      var Fe;
      de.value && ((Fe = Ne.value) == null || Fe.handleScroll(de.value), oe("scroll", {
        scrollTop: de.value.scrollTop,
        scrollLeft: de.value.scrollLeft
      }));
    };
    function ze(Fe, Pt) {
      isObject$1(Fe) ? de.value.scrollTo(Fe) : isNumber(Fe) && isNumber(Pt) && de.value.scrollTo(Fe, Pt);
    }
    const xe = (Fe) => {
      if (!isNumber(Fe)) {
        debugWarn(he, "value must be a number");
        return;
      }
      de.value.scrollTop = Fe;
    }, Ue = (Fe) => {
      if (!isNumber(Fe)) {
        debugWarn(he, "value must be a number");
        return;
      }
      de.value.scrollLeft = Fe;
    }, At = () => {
      if (!de.value)
        return;
      const Fe = de.value.offsetHeight - GAP, Pt = de.value.offsetWidth - GAP, vn = Fe ** 2 / de.value.scrollHeight, En = Pt ** 2 / de.value.scrollWidth, $n = Math.max(vn, re.minSize), kn = Math.max(En, re.minSize);
      Oe.value = vn / (Fe - vn) / ($n / (Fe - $n)), _e.value = En / (Pt - En) / (kn / (Pt - kn)), $e.value = $n + GAP < Fe ? `${$n}px` : "", Ce.value = kn + GAP < Pt ? `${kn}px` : "";
    };
    return watch(() => re.noresize, (Fe) => {
      Fe ? (le == null || le(), ie == null || ie()) : ({ stop: le } = useResizeObserver(pe, At), ie = useEventListener("resize", At));
    }, { immediate: !0 }), watch(() => [re.maxHeight, re.height], () => {
      re.native || nextTick(() => {
        var Fe;
        At(), de.value && ((Fe = Ne.value) == null || Fe.handleScroll(de.value));
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
      scrollTo: ze,
      setScrollTop: xe,
      setScrollLeft: Ue,
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
        style: normalizeStyle(unref(Ve)),
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
        ref: Ne,
        height: $e.value,
        width: Ce.value,
        always: Fe.always,
        "ratio-x": _e.value,
        "ratio-y": Oe.value
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
      }), watch(() => ae.value, (Ce, $e) => {
        pe == null || pe(), pe = void 0, isElement(Ce) && ([
          "onMouseenter",
          "onMouseleave",
          "onClick",
          "onKeydown",
          "onFocus",
          "onBlur",
          "onContextmenu"
        ].forEach((Ne) => {
          var Oe;
          const _e = oe[Ne];
          _e && (Ce.addEventListener(Ne.slice(2).toLowerCase(), _e), (Oe = $e == null ? void 0 : $e.removeEventListener) == null || Oe.call($e, Ne.slice(2).toLowerCase(), _e));
        }), pe = watch([le, ie, ue, de], (Ne) => {
          [
            "aria-controls",
            "aria-describedby",
            "aria-haspopup",
            "aria-expanded"
          ].forEach((Oe, _e) => {
            isNil(Ne[_e]) ? Ce.removeAttribute(Oe) : Ce.setAttribute(Oe, Ne[_e]);
          });
        }, { immediate: !0 })), isElement($e) && [
          "aria-controls",
          "aria-describedby",
          "aria-haspopup",
          "aria-expanded"
        ].forEach((Ne) => $e.removeAttribute(Ne));
      }, {
        immediate: !0
      });
    }), onBeforeUnmount(() => {
      pe == null || pe(), pe = void 0;
    }), k({
      triggerRef: ae
    }), (Ce, $e) => Ce.virtualTriggering ? createCommentVNode("v-if", !0) : (openBlock(), createBlock(unref(OnlyChild), mergeProps({ key: 0 }, Ce.$attrs, {
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
    var $e = Tt(ae.padding, oe), Ne = ke(le), Oe = de === "y" ? E$1 : P$1, _e = de === "y" ? R : W, he = oe.rects.reference[Ce] + oe.rects.reference[de] - ie[de] - oe.rects.popper[Ce], Ve = ie[de] - oe.rects.reference[de], Ie = se(le), ze = Ie ? de === "y" ? Ie.clientHeight || 0 : Ie.clientWidth || 0 : 0, xe = he / 2 - Ve / 2, Ue = $e[Oe], At = ze - Ne[Ce] - $e[_e], Fe = ze / 2 - Ne[Ce] / 2 + xe, Pt = fe(Ue, Fe, At), vn = de;
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
  var k, oe = e.popper, re = e.popperRect, ae = e.placement, le = e.variation, ie = e.offsets, ue = e.position, de = e.gpuAcceleration, pe = e.adaptive, Ce = e.roundOffsets, $e = e.isFixed, Ne = ie.x, Oe = Ne === void 0 ? 0 : Ne, _e = ie.y, he = _e === void 0 ? 0 : _e, Ve = typeof Ce == "function" ? Ce({ x: Oe, y: he }) : { x: Oe, y: he };
  Oe = Ve.x, he = Ve.y;
  var Ie = ie.hasOwnProperty("x"), ze = ie.hasOwnProperty("y"), xe = P$1, Ue = E$1, At = window;
  if (pe) {
    var Fe = se(oe), Pt = "clientHeight", vn = "clientWidth";
    if (Fe === H(oe) && (Fe = I$1(oe), N$1(Fe).position !== "static" && ue === "absolute" && (Pt = "scrollHeight", vn = "scrollWidth")), Fe = Fe, ae === E$1 || (ae === P$1 || ae === W) && le === J) {
      Ue = R;
      var En = $e && Fe === At && At.visualViewport ? At.visualViewport.height : Fe[Pt];
      he -= En - re.height, he *= de ? 1 : -1;
    }
    if (ae === P$1 || (ae === E$1 || ae === R) && le === J) {
      xe = W;
      var $n = $e && Fe === At && At.visualViewport ? At.visualViewport.width : Fe[vn];
      Oe -= $n - re.width, Oe *= de ? 1 : -1;
    }
  }
  var kn = Object.assign({ position: ue }, pe && qt), wn = Ce === !0 ? Vt({ x: Oe, y: he }) : { x: Oe, y: he };
  if (Oe = wn.x, he = wn.y, de) {
    var Dt;
    return Object.assign({}, kn, (Dt = {}, Dt[Ue] = ze ? "0" : "", Dt[xe] = Ie ? "0" : "", Dt.transform = (At.devicePixelRatio || 1) <= 1 ? "translate(" + Oe + "px, " + he + "px)" : "translate3d(" + Oe + "px, " + he + "px, 0)", Dt));
  }
  return Object.assign({}, kn, (k = {}, k[Ue] = ze ? he + "px" : "", k[xe] = Ie ? Oe + "px" : "", k.transform = "", k));
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
  var oe = k, re = oe.placement, ae = re === void 0 ? e.placement : re, le = oe.boundary, ie = le === void 0 ? Xe : le, ue = oe.rootBoundary, de = ue === void 0 ? je : ue, pe = oe.elementContext, Ce = pe === void 0 ? K : pe, $e = oe.altBoundary, Ne = $e === void 0 ? !1 : $e, Oe = oe.padding, _e = Oe === void 0 ? 0 : Oe, he = ft(typeof _e != "number" ? _e : ct(_e, G)), Ve = Ce === K ? Ye : K, Ie = e.rects.popper, ze = e.elements[Ne ? Ve : Ce], xe = Gt(Q(ze) ? ze : ze.contextElement || I$1(e.elements.popper), ie, de), Ue = ee(e.elements.reference), At = mt({ reference: Ue, element: Ie, strategy: "absolute", placement: ae }), Fe = Te(Object.assign({}, Ie, At)), Pt = Ce === K ? Fe : Ue, vn = { top: xe.top - Pt.top + he.top, bottom: Pt.bottom - xe.bottom + he.bottom, left: xe.left - Pt.left + he.left, right: Pt.right - xe.right + he.right }, En = e.modifiersData.offset;
  if (Ce === K && En) {
    var $n = En[ae];
    Object.keys(vn).forEach(function(kn) {
      var wn = [W, R].indexOf(kn) >= 0 ? 1 : -1, Dt = [E$1, R].indexOf(kn) >= 0 ? "y" : "x";
      vn[kn] += $n[Dt] * wn;
    });
  }
  return vn;
}
function Jt(e, k) {
  k === void 0 && (k = {});
  var oe = k, re = oe.placement, ae = oe.boundary, le = oe.rootBoundary, ie = oe.padding, ue = oe.flipVariations, de = oe.allowedAutoPlacements, pe = de === void 0 ? Ee : de, Ce = te(re), $e = Ce ? ue ? De : De.filter(function(_e) {
    return te(_e) === Ce;
  }) : G, Ne = $e.filter(function(_e) {
    return pe.indexOf(_e) >= 0;
  });
  Ne.length === 0 && (Ne = $e);
  var Oe = Ne.reduce(function(_e, he) {
    return _e[he] = ne(e, { placement: he, boundary: ae, rootBoundary: le, padding: ie })[q(he)], _e;
  }, {});
  return Object.keys(Oe).sort(function(_e, he) {
    return Oe[_e] - Oe[he];
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
    for (var ae = oe.mainAxis, le = ae === void 0 ? !0 : ae, ie = oe.altAxis, ue = ie === void 0 ? !0 : ie, de = oe.fallbackPlacements, pe = oe.padding, Ce = oe.boundary, $e = oe.rootBoundary, Ne = oe.altBoundary, Oe = oe.flipVariations, _e = Oe === void 0 ? !0 : Oe, he = oe.allowedAutoPlacements, Ve = k.options.placement, Ie = q(Ve), ze = Ie === Ve, xe = de || (ze || !_e ? [be(Ve)] : Kt(Ve)), Ue = [Ve].concat(xe).reduce(function(Dn, Rn) {
      return Dn.concat(q(Rn) === me ? Jt(k, { placement: Rn, boundary: Ce, rootBoundary: $e, padding: pe, flipVariations: _e, allowedAutoPlacements: he }) : Rn);
    }, []), At = k.rects.reference, Fe = k.rects.popper, Pt = /* @__PURE__ */ new Map(), vn = !0, En = Ue[0], $n = 0; $n < Ue.length; $n++) {
      var kn = Ue[$n], wn = q(kn), Dt = te(kn) === U$1, Lt = [E$1, R].indexOf(wn) >= 0, bn = Lt ? "width" : "height", jt = ne(k, { placement: kn, boundary: Ce, rootBoundary: $e, altBoundary: Ne, padding: pe }), Cn = Lt ? Dt ? W : P$1 : Dt ? R : E$1;
      At[bn] > Fe[bn] && (Cn = be(Cn));
      var kt = be(Cn), Et = [];
      if (le && Et.push(jt[wn] <= 0), ue && Et.push(jt[Cn] <= 0, jt[kt] <= 0), Et.every(function(Dn) {
        return Dn;
      })) {
        En = kn, vn = !1;
        break;
      }
      Pt.set(kn, Et);
    }
    if (vn)
      for (var _n = _e ? 3 : 1, Pn = function(Dn) {
        var Rn = Ue.find(function(Fn) {
          var Nn = Pt.get(Fn);
          if (Nn)
            return Nn.slice(0, Dn).every(function(Bn) {
              return Bn;
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
  var k = e.state, oe = e.name, re = k.rects.reference, ae = k.rects.popper, le = k.modifiersData.preventOverflow, ie = ne(k, { elementContext: "reference" }), ue = ne(k, { altBoundary: !0 }), de = gt(ie, re), pe = gt(ue, ae, le), Ce = yt(de), $e = yt(pe);
  k.modifiersData[oe] = { referenceClippingOffsets: de, popperEscapeOffsets: pe, isReferenceHidden: Ce, hasPopperEscaped: $e }, k.attributes.popper = Object.assign({}, k.attributes.popper, { "data-popper-reference-hidden": Ce, "data-popper-escaped": $e });
}
var bt = { name: "hide", enabled: !0, phase: "main", requiresIfExists: ["preventOverflow"], fn: Zt };
function en(e, k, oe) {
  var re = q(e), ae = [P$1, E$1].indexOf(re) >= 0 ? -1 : 1, le = typeof oe == "function" ? oe(Object.assign({}, k, { placement: e })) : oe, ie = le[0], ue = le[1];
  return ie = ie || 0, ue = (ue || 0) * ae, [P$1, W].indexOf(re) >= 0 ? { x: ue, y: ie } : { x: ie, y: ue };
}
function tn(e) {
  var k = e.state, oe = e.options, re = e.name, ae = oe.offset, le = ae === void 0 ? [0, 0] : ae, ie = Ee.reduce(function(Ce, $e) {
    return Ce[$e] = en($e, k.rects, le), Ce;
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
  var k = e.state, oe = e.options, re = e.name, ae = oe.mainAxis, le = ae === void 0 ? !0 : ae, ie = oe.altAxis, ue = ie === void 0 ? !1 : ie, de = oe.boundary, pe = oe.rootBoundary, Ce = oe.altBoundary, $e = oe.padding, Ne = oe.tether, Oe = Ne === void 0 ? !0 : Ne, _e = oe.tetherOffset, he = _e === void 0 ? 0 : _e, Ve = ne(k, { boundary: de, rootBoundary: pe, padding: $e, altBoundary: Ce }), Ie = q(k.placement), ze = te(k.placement), xe = !ze, Ue = Le(Ie), At = rn(Ue), Fe = k.modifiersData.popperOffsets, Pt = k.rects.reference, vn = k.rects.popper, En = typeof he == "function" ? he(Object.assign({}, k.rects, { placement: k.placement })) : he, $n = typeof En == "number" ? { mainAxis: En, altAxis: En } : Object.assign({ mainAxis: 0, altAxis: 0 }, En), kn = k.modifiersData.offset ? k.modifiersData.offset[k.placement] : null, wn = { x: 0, y: 0 };
  if (Fe) {
    if (le) {
      var Dt, Lt = Ue === "y" ? E$1 : P$1, bn = Ue === "y" ? R : W, jt = Ue === "y" ? "height" : "width", Cn = Fe[Ue], kt = Cn + Ve[Lt], Et = Cn - Ve[bn], _n = Oe ? -vn[jt] / 2 : 0, Pn = ze === U$1 ? Pt[jt] : vn[jt], hn = ze === U$1 ? -vn[jt] : -Pt[jt], On = k.elements.arrow, Dn = Oe && On ? ke(On) : { width: 0, height: 0 }, Rn = k.modifiersData["arrow#persistent"] ? k.modifiersData["arrow#persistent"].padding : st(), Fn = Rn[Lt], Nn = Rn[bn], Bn = fe(0, Pt[jt], Dn[jt]), Vn = xe ? Pt[jt] / 2 - _n - Bn - Fn - $n.mainAxis : Pn - Bn - Fn - $n.mainAxis, An = xe ? -Pt[jt] / 2 + _n + Bn + Nn + $n.mainAxis : hn + Bn + Nn + $n.mainAxis, Wn = k.elements.arrow && se(k.elements.arrow), Yn = Wn ? Ue === "y" ? Wn.clientTop || 0 : Wn.clientLeft || 0 : 0, Xn = (Dt = kn == null ? void 0 : kn[Ue]) != null ? Dt : 0, eo = Cn + Vn - Xn - Yn, qn = Cn + An - Xn, no = fe(Oe ? ve(kt, eo) : kt, Cn, Oe ? X$1(Et, qn) : Et);
      Fe[Ue] = no, wn[Ue] = no - Cn;
    }
    if (ue) {
      var oo, zn = Ue === "x" ? E$1 : P$1, Hn = Ue === "x" ? R : W, Gn = Fe[At], Zn = At === "y" ? "height" : "width", lo = Gn + Ve[zn], ao = Gn - Ve[Hn], In = [E$1, P$1].indexOf(Ie) !== -1, Jn = (oo = kn == null ? void 0 : kn[At]) != null ? oo : 0, Qn = In ? lo : Gn - Pt[Zn] - vn[Zn] - Jn + $n.altAxis, ro = In ? Gn + Pt[Zn] + vn[Zn] - Jn - $n.altAxis : ao, Tn = Oe && In ? St(Qn, Gn, ro) : fe(Oe ? Qn : lo, Gn, Oe ? ro : ao);
      Fe[At] = Tn, wn[At] = Tn - Gn;
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
    var pe = { placement: "bottom", orderedModifiers: [], options: Object.assign({}, Ot, le), modifiersData: {}, elements: { reference: ie, popper: ue }, attributes: {}, styles: {} }, Ce = [], $e = !1, Ne = { state: pe, setOptions: function(he) {
      var Ve = typeof he == "function" ? he(pe.options) : he;
      _e(), pe.options = Object.assign({}, le, pe.options, Ve), pe.scrollParents = { reference: Q(ie) ? ce(ie) : ie.contextElement ? ce(ie.contextElement) : [], popper: ce(ue) };
      var Ie = un(dn([].concat(re, pe.options.modifiers)));
      return pe.orderedModifiers = Ie.filter(function(ze) {
        return ze.enabled;
      }), Oe(), Ne.update();
    }, forceUpdate: function() {
      if (!$e) {
        var he = pe.elements, Ve = he.reference, Ie = he.popper;
        if ($t(Ve, Ie)) {
          pe.rects = { reference: cn(Ve, se(Ie), pe.options.strategy === "fixed"), popper: ke(Ie) }, pe.reset = !1, pe.placement = pe.options.placement, pe.orderedModifiers.forEach(function(vn) {
            return pe.modifiersData[vn.name] = Object.assign({}, vn.data);
          });
          for (var ze = 0; ze < pe.orderedModifiers.length; ze++) {
            if (pe.reset === !0) {
              pe.reset = !1, ze = -1;
              continue;
            }
            var xe = pe.orderedModifiers[ze], Ue = xe.fn, At = xe.options, Fe = At === void 0 ? {} : At, Pt = xe.name;
            typeof Ue == "function" && (pe = Ue({ state: pe, options: Fe, name: Pt, instance: Ne }) || pe);
          }
        }
      }
    }, update: ln(function() {
      return new Promise(function(he) {
        Ne.forceUpdate(), he(pe);
      });
    }), destroy: function() {
      _e(), $e = !0;
    } };
    if (!$t(ie, ue))
      return Ne;
    Ne.setOptions(de).then(function(he) {
      !$e && de.onFirstUpdate && de.onFirstUpdate(he);
    });
    function Oe() {
      pe.orderedModifiers.forEach(function(he) {
        var Ve = he.name, Ie = he.options, ze = Ie === void 0 ? {} : Ie, xe = he.effect;
        if (typeof xe == "function") {
          var Ue = xe({ state: pe, name: Ve, instance: Ne, options: ze }), At = function() {
          };
          Ce.push(Ue || At);
        }
      });
    }
    function _e() {
      Ce.forEach(function(he) {
        return he();
      }), Ce = [];
    }
    return Ne;
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
    useEscapeKeydown((Oe) => {
      e.trapped && !le.paused && k("release-requested", Oe);
    });
    const le = {
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    }, ie = (Oe) => {
      if (!e.loop && !e.trapped || le.paused)
        return;
      const { key: _e, altKey: he, ctrlKey: Ve, metaKey: Ie, currentTarget: ze, shiftKey: xe } = Oe, { loop: Ue } = e, At = _e === EVENT_CODE.tab && !he && !Ve && !Ie, Fe = document.activeElement;
      if (At && Fe) {
        const Pt = ze, [vn, En] = getEdges(Pt);
        vn && En ? !xe && Fe === En ? (Oe.preventDefault(), Ue && tryFocus(vn, !0), k("focusout-prevented")) : xe && [vn, Pt].includes(Fe) && (Oe.preventDefault(), Ue && tryFocus(En, !0), k("focusout-prevented")) : Fe === Pt && (Oe.preventDefault(), k("focusout-prevented"));
      }
    };
    provide(FOCUS_TRAP_INJECTION_KEY, {
      focusTrapRef: oe,
      onKeydown: ie
    }), watch(() => e.focusTrapEl, (Oe) => {
      Oe && (oe.value = Oe);
    }, { immediate: !0 }), watch([oe], ([Oe], [_e]) => {
      Oe && (Oe.addEventListener("keydown", ie), Oe.addEventListener("focusin", pe), Oe.addEventListener("focusout", Ce)), _e && (_e.removeEventListener("keydown", ie), _e.removeEventListener("focusin", pe), _e.removeEventListener("focusout", Ce));
    });
    const ue = (Oe) => {
      k(ON_TRAP_FOCUS_EVT, Oe);
    }, de = (Oe) => k(ON_RELEASE_FOCUS_EVT, Oe), pe = (Oe) => {
      const _e = unref(oe);
      if (!_e)
        return;
      const he = Oe.target, Ve = he && _e.contains(he);
      Ve && k("focusin", Oe), !le.paused && e.trapped && (Ve ? ae = he : tryFocus(ae, !0));
    }, Ce = (Oe) => {
      const _e = unref(oe);
      if (!(le.paused || !_e))
        if (e.trapped) {
          const he = Oe.relatedTarget;
          !isNil(he) && !_e.contains(he) && setTimeout(() => {
            !le.paused && e.trapped && tryFocus(ae, !0);
          }, 0);
        } else {
          const he = Oe.target;
          he && _e.contains(he) || k("focusout", Oe);
        }
    };
    async function $e() {
      await nextTick();
      const Oe = unref(oe);
      if (Oe) {
        focusableStack.push(le);
        const _e = document.activeElement;
        if (re = _e, !Oe.contains(_e)) {
          const Ve = new Event(FOCUS_AFTER_TRAPPED, FOCUS_AFTER_TRAPPED_OPTS);
          Oe.addEventListener(FOCUS_AFTER_TRAPPED, ue), Oe.dispatchEvent(Ve), Ve.defaultPrevented || nextTick(() => {
            let Ie = e.focusStartEl;
            isString(Ie) || (tryFocus(Ie), document.activeElement !== Ie && (Ie = "first")), Ie === "first" && focusFirstDescendant(obtainAllFocusableElements(Oe), !0), (document.activeElement === _e || Ie === "container") && tryFocus(Oe);
          });
        }
      }
    }
    function Ne() {
      const Oe = unref(oe);
      if (Oe) {
        Oe.removeEventListener(FOCUS_AFTER_TRAPPED, ue);
        const _e = new Event(FOCUS_AFTER_RELEASED, FOCUS_AFTER_TRAPPED_OPTS);
        Oe.addEventListener(FOCUS_AFTER_RELEASED, de), Oe.dispatchEvent(_e), _e.defaultPrevented || tryFocus(re != null ? re : document.body, !0), Oe.removeEventListener(FOCUS_AFTER_RELEASED, ue), focusableStack.remove(le);
      }
    }
    return onMounted(() => {
      e.trapped && $e(), watch(() => e.trapped, (Oe) => {
        Oe ? $e() : Ne();
      });
    }), onBeforeUnmount(() => {
      e.trapped && Ne();
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
    const re = e, { popperInstanceRef: ae, contentRef: le, triggerRef: ie, role: ue } = inject(POPPER_INJECTION_KEY, void 0), de = inject(formItemContextKey, void 0), { nextZIndex: pe } = useZIndex(), Ce = useNamespace("popper"), $e = ref(), Ne = ref("first"), Oe = ref(), _e = ref();
    provide(POPPER_CONTENT_INJECTION_KEY, {
      arrowRef: Oe,
      arrowOffset: _e
    }), de && (de.addInputId || de.removeInputId) && provide(formItemContextKey, {
      ...de,
      addInputId: NOOP,
      removeInputId: NOOP
    });
    const he = ref(re.zIndex || pe()), Ve = ref(!1);
    let Ie;
    const ze = computed(() => unwrapMeasurableEl(re.referenceEl) || unref(ie)), xe = computed(() => [{ zIndex: unref(he) }, re.popperStyle]), Ue = computed(() => [
      Ce.b(),
      Ce.is("pure", re.pure),
      Ce.is(re.effect),
      re.popperClass
    ]), At = computed(() => ue && ue.value === "dialog" ? "false" : void 0), Fe = ({ referenceEl: Lt, popperContentEl: bn, arrowEl: jt }) => {
      const Cn = buildPopperOptions(re, {
        arrowEl: jt,
        arrowOffset: unref(_e)
      });
      return yn(Lt, bn, Cn);
    }, Pt = (Lt = !0) => {
      var bn;
      (bn = unref(ae)) == null || bn.update(), Lt && (he.value = re.zIndex || pe());
    }, vn = () => {
      var Lt, bn;
      const jt = { name: "eventListeners", enabled: re.visible };
      (bn = (Lt = unref(ae)) == null ? void 0 : Lt.setOptions) == null || bn.call(Lt, (Cn) => ({
        ...Cn,
        modifiers: [...Cn.modifiers || [], jt]
      })), Pt(!1), re.visible && re.focusOnShow ? Ve.value = !0 : re.visible === !1 && (Ve.value = !1);
    }, En = () => {
      oe("focus");
    }, $n = () => {
      Ne.value = "first", oe("blur");
    }, kn = (Lt) => {
      var bn;
      re.visible && !Ve.value && (Lt.target && (Ne.value = Lt.target), Ve.value = !0, Lt.relatedTarget && ((bn = Lt.relatedTarget) == null || bn.focus()));
    }, wn = () => {
      re.trapping || (Ve.value = !1);
    }, Dt = () => {
      Ve.value = !1, oe("close");
    };
    return onMounted(() => {
      let Lt;
      watch(ze, (bn) => {
        var jt;
        Lt == null || Lt();
        const Cn = unref(ae);
        if ((jt = Cn == null ? void 0 : Cn.destroy) == null || jt.call(Cn), bn) {
          const kt = unref($e);
          le.value = kt, ae.value = Fe({
            referenceEl: bn,
            popperContentEl: kt,
            arrowEl: unref(Oe)
          }), Lt = watch(() => bn.getBoundingClientRect(), () => Pt(), {
            immediate: !0
          });
        } else
          ae.value = void 0;
      }, {
        immediate: !0
      }), watch(() => re.triggerTargetEl, (bn, jt) => {
        Ie == null || Ie(), Ie = void 0;
        const Cn = unref(bn || $e.value), kt = unref(jt || $e.value);
        if (isElement(Cn)) {
          const { ariaLabel: Et, id: _n } = toRefs(re);
          Ie = watch([ue, Et, At, _n], (Pn) => {
            ["role", "aria-label", "aria-modal", "id"].forEach((hn, On) => {
              isNil(Pn[On]) ? Cn.removeAttribute(hn) : Cn.setAttribute(hn, Pn[On]);
            });
          }, { immediate: !0 });
        }
        isElement(kt) && ["role", "aria-label", "aria-modal", "id"].forEach((Et) => {
          kt.removeAttribute(Et);
        });
      }, { immediate: !0 }), watch(() => re.visible, vn, { immediate: !0 }), watch(() => buildPopperOptions(re, {
        arrowEl: unref(Oe),
        arrowOffset: unref(_e)
      }), (bn) => {
        var jt;
        return (jt = ae.value) == null ? void 0 : jt.setOptions(bn);
      });
    }), onBeforeUnmount(() => {
      Ie == null || Ie(), Ie = void 0;
    }), k({
      popperContentRef: $e,
      popperInstanceRef: ae,
      updatePopper: Pt,
      contentStyle: xe
    }), (Lt, bn) => (openBlock(), createElementBlock("div", {
      ref_key: "popperContentRef",
      ref: $e,
      style: normalizeStyle(unref(xe)),
      class: normalizeClass(unref(Ue)),
      tabindex: "-1",
      onMouseenter: bn[0] || (bn[0] = (jt) => Lt.$emit("mouseenter", jt)),
      onMouseleave: bn[1] || (bn[1] = (jt) => Lt.$emit("mouseleave", jt))
    }, [
      createVNode(unref(ElFocusTrap), {
        trapped: Ve.value,
        "trap-on-focus-in": !0,
        "focus-trap-el": $e.value,
        "focus-start-el": Ne.value,
        onFocusAfterTrapped: En,
        onFocusAfterReleased: $n,
        onFocusin: kn,
        onFocusoutPrevented: wn,
        onReleaseRequested: Dt
      }, {
        default: withCtx(() => [
          renderSlot(Lt.$slots, "default")
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
      onOpen: $e,
      onShow: Ne,
      onHide: Oe,
      onBeforeShow: _e,
      onBeforeHide: he
    } = inject(TOOLTIP_INJECTION_KEY, void 0), Ve = computed(() => process.env.NODE_ENV === "test" ? !0 : e.persistent);
    onBeforeUnmount(() => {
      le.value = !0;
    });
    const Ie = computed(() => unref(Ve) ? !0 : unref(de)), ze = computed(() => e.disabled ? !1 : unref(de)), xe = computed(() => {
      var Lt;
      return (Lt = e.style) != null ? Lt : {};
    }), Ue = computed(() => !unref(de)), At = () => {
      Oe();
    }, Fe = () => {
      if (unref(ie))
        return !0;
    }, Pt = composeEventHandlers(Fe, () => {
      e.enterable && unref(pe) === "hover" && $e();
    }), vn = composeEventHandlers(Fe, () => {
      unref(pe) === "hover" && Ce();
    }), En = () => {
      var Lt, bn;
      (bn = (Lt = k.value) == null ? void 0 : Lt.updatePopper) == null || bn.call(Lt), _e == null || _e();
    }, $n = () => {
      he == null || he();
    }, kn = () => {
      Ne(), Dt = onClickOutside(computed(() => {
        var Lt;
        return (Lt = k.value) == null ? void 0 : Lt.popperContentRef;
      }), () => {
        if (unref(ie))
          return;
        unref(pe) !== "hover" && Ce();
      });
    }, wn = () => {
      e.virtualTriggering || Ce();
    };
    let Dt;
    return watch(() => unref(de), (Lt) => {
      Lt || Dt == null || Dt();
    }, {
      flush: "post"
    }), {
      ariaHidden: Ue,
      entering: re,
      leaving: ae,
      id: ue,
      intermediateOpen: oe,
      contentStyle: xe,
      contentRef: k,
      destroyed: le,
      shouldRender: Ie,
      shouldShow: ze,
      onClose: Ce,
      open: de,
      onAfterShow: kn,
      onBeforeEnter: En,
      onBeforeLeave: $n,
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
    }, Ce = toRef(e, "trigger"), $e = composeEventHandlers(pe, whenTrigger(Ce, "hover", le)), Ne = composeEventHandlers(pe, whenTrigger(Ce, "hover", ie)), Oe = composeEventHandlers(pe, whenTrigger(Ce, "click", (ze) => {
      ze.button === 0 && ue(ze);
    })), _e = composeEventHandlers(pe, whenTrigger(Ce, "focus", le)), he = composeEventHandlers(pe, whenTrigger(Ce, "focus", ie)), Ve = composeEventHandlers(pe, whenTrigger(Ce, "contextmenu", (ze) => {
      ze.preventDefault(), ue(ze);
    })), Ie = composeEventHandlers(pe, (ze) => {
      const { code: xe } = ze;
      e.triggerKeys.includes(xe) && (ze.preventDefault(), ue(ze));
    });
    return {
      onBlur: he,
      onContextMenu: Ve,
      onFocus: _e,
      onMouseenter: $e,
      onMouseleave: Ne,
      onClick: Oe,
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
      const ze = unref(le);
      ze && ((Ie = ze.popperInstanceRef) == null || Ie.update());
    }, de = ref(!1), pe = ref(void 0), { show: Ce, hide: $e, hasUpdateHandler: Ne } = useModelToggle({
      indicator: de,
      toggleReason: pe
    }), { onOpen: Oe, onClose: _e } = useDelayedToggle({
      showAfter: oe,
      hideAfter: toRef(e, "hideAfter"),
      open: Ce,
      close: $e
    }), he = computed(() => isBoolean(e.visible) && !Ne.value);
    provide(TOOLTIP_INJECTION_KEY, {
      controlled: he,
      id: ae,
      open: readonly(de),
      trigger: toRef(e, "trigger"),
      onOpen: (Ie) => {
        Oe(Ie);
      },
      onClose: (Ie) => {
        _e(Ie);
      },
      onToggle: (Ie) => {
        unref(de) ? _e(Ie) : Oe(Ie);
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
    const Ve = () => {
      var Ie, ze;
      const xe = (ze = (Ie = ie.value) == null ? void 0 : Ie.contentRef) == null ? void 0 : ze.popperContentRef;
      return xe && xe.contains(document.activeElement);
    };
    return onDeactivated(() => de.value && $e()), {
      compatShowAfter: oe,
      compatShowArrow: re,
      popperRef: le,
      contentRef: ie,
      open: de,
      hide: $e,
      isFocusInsideContent: Ve,
      updatePopper: ue,
      onOpen: Oe,
      onClose: _e
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
    const re = e, ae = "ElAutocomplete", le = useAttrs$1(), ie = useAttrs$2(), ue = useDisabled$1(), de = useNamespace("autocomplete"), pe = ref(), Ce = ref(), $e = ref(), Ne = ref();
    let Oe = !1;
    const _e = ref([]), he = ref(-1), Ve = ref(""), Ie = ref(!1), ze = ref(!1), xe = ref(!1), Ue = computed(() => de.b(String(generateId()))), At = computed(() => ie.style), Fe = computed(() => (_e.value.length > 0 || xe.value) && Ie.value), Pt = computed(() => !re.hideLoading && xe.value), vn = computed(() => pe.value ? Array.from(pe.value.$el.querySelectorAll("input")) : []), En = async () => {
      await nextTick(), Fe.value && (Ve.value = `${pe.value.$el.offsetWidth}px`);
    }, $n = () => {
      Oe = !0;
    }, kn = () => {
      Oe = !1, he.value = -1;
    }, Dt = debounce(async (Nn) => {
      if (ze.value)
        return;
      const Bn = (Vn) => {
        xe.value = !1, !ze.value && (isArray(Vn) ? (_e.value = Vn, he.value = re.highlightFirstItem ? 0 : -1) : throwError(ae, "autocomplete suggestions must be an array"));
      };
      if (xe.value = !0, isArray(re.fetchSuggestions))
        Bn(re.fetchSuggestions);
      else {
        const Vn = await re.fetchSuggestions(Nn, Bn);
        isArray(Vn) && Bn(Vn);
      }
    }, re.debounce), Lt = (Nn) => {
      const Bn = !!Nn;
      if (oe(INPUT_EVENT, Nn), oe(UPDATE_MODEL_EVENT, Nn), ze.value = !1, Ie.value || (Ie.value = Bn), !re.triggerOnFocus && !Nn) {
        ze.value = !0, _e.value = [];
        return;
      }
      Dt(Nn);
    }, bn = (Nn) => {
      var Bn;
      ue.value || (((Bn = Nn.target) == null ? void 0 : Bn.tagName) !== "INPUT" || vn.value.includes(document.activeElement)) && (Ie.value = !0);
    }, jt = (Nn) => {
      oe(CHANGE_EVENT, Nn);
    }, Cn = (Nn) => {
      Oe || (Ie.value = !0, oe("focus", Nn), re.triggerOnFocus && Dt(String(re.modelValue)));
    }, kt = (Nn) => {
      Oe || oe("blur", Nn);
    }, Et = () => {
      Ie.value = !1, oe(UPDATE_MODEL_EVENT, ""), oe("clear");
    }, _n = async () => {
      Fe.value && he.value >= 0 && he.value < _e.value.length ? Rn(_e.value[he.value]) : re.selectWhenUnmatched && (oe("select", { value: re.modelValue }), _e.value = [], he.value = -1);
    }, Pn = (Nn) => {
      Fe.value && (Nn.preventDefault(), Nn.stopPropagation(), hn());
    }, hn = () => {
      Ie.value = !1;
    }, On = () => {
      var Nn;
      (Nn = pe.value) == null || Nn.focus();
    }, Dn = () => {
      var Nn;
      (Nn = pe.value) == null || Nn.blur();
    }, Rn = async (Nn) => {
      oe(INPUT_EVENT, Nn[re.valueKey]), oe(UPDATE_MODEL_EVENT, Nn[re.valueKey]), oe("select", Nn), _e.value = [], he.value = -1;
    }, Fn = (Nn) => {
      if (!Fe.value || xe.value)
        return;
      if (Nn < 0) {
        he.value = -1;
        return;
      }
      Nn >= _e.value.length && (Nn = _e.value.length - 1);
      const Bn = Ce.value.querySelector(`.${de.be("suggestion", "wrap")}`), An = Bn.querySelectorAll(`.${de.be("suggestion", "list")} li`)[Nn], Wn = Bn.scrollTop, { offsetTop: Yn, scrollHeight: Xn } = An;
      Yn + Xn > Wn + Bn.clientHeight && (Bn.scrollTop += Xn), Yn < Wn && (Bn.scrollTop -= Xn), he.value = Nn, pe.value.ref.setAttribute("aria-activedescendant", `${Ue.value}-item-${he.value}`);
    };
    return onClickOutside(Ne, () => {
      Fe.value && hn();
    }), onMounted(() => {
      pe.value.ref.setAttribute("role", "textbox"), pe.value.ref.setAttribute("aria-autocomplete", "list"), pe.value.ref.setAttribute("aria-controls", "id"), pe.value.ref.setAttribute("aria-activedescendant", `${Ue.value}-item-${he.value}`);
    }), k({
      highlightedIndex: he,
      activated: Ie,
      loading: xe,
      inputRef: pe,
      popperRef: $e,
      suggestions: _e,
      handleSelect: Rn,
      handleKeyEnter: _n,
      focus: On,
      blur: Dn,
      close: hn,
      highlight: Fn
    }), (Nn, Bn) => (openBlock(), createBlock(unref(ElTooltip), {
      ref_key: "popperRef",
      ref: $e,
      visible: unref(Fe),
      placement: Nn.placement,
      "fallback-placements": ["bottom-start", "top-start"],
      "popper-class": [unref(de).e("popper"), Nn.popperClass],
      teleported: Nn.teleported,
      "gpu-acceleration": !1,
      pure: "",
      "manual-mode": "",
      effect: "light",
      trigger: "click",
      transition: `${unref(de).namespace.value}-zoom-in-top`,
      persistent: "",
      onBeforeShow: En,
      onShow: $n,
      onHide: kn
    }, {
      content: withCtx(() => [
        createElementVNode("div", {
          ref_key: "regionRef",
          ref: Ce,
          class: normalizeClass([unref(de).b("suggestion"), unref(de).is("loading", unref(Pt))]),
          style: normalizeStyle({
            [Nn.fitInputWidth ? "width" : "minWidth"]: Ve.value,
            outline: "none"
          }),
          role: "region"
        }, [
          createVNode(unref(ElScrollbar), {
            id: unref(Ue),
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
              ])) : (openBlock(!0), createElementBlock(Fragment, { key: 1 }, renderList(_e.value, (Vn, An) => (openBlock(), createElementBlock("li", {
                id: `${unref(Ue)}-item-${An}`,
                key: An,
                class: normalizeClass({ highlighted: he.value === An }),
                role: "option",
                "aria-selected": he.value === An,
                onClick: (Wn) => Rn(Vn)
              }, [
                renderSlot(Nn.$slots, "default", { item: Vn }, () => [
                  createTextVNode(toDisplayString(Vn[Nn.valueKey]), 1)
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
          ref: Ne,
          class: normalizeClass([unref(de).b(), Nn.$attrs.class]),
          style: normalizeStyle(unref(At)),
          role: "combobox",
          "aria-haspopup": "listbox",
          "aria-expanded": unref(Fe),
          "aria-owns": unref(Ue)
        }, [
          createVNode(unref(ElInput), mergeProps({
            ref_key: "inputRef",
            ref: pe
          }, unref(le), {
            "model-value": Nn.modelValue,
            onInput: Lt,
            onChange: jt,
            onFocus: Cn,
            onBlur: kt,
            onClear: Et,
            onKeydown: [
              Bn[0] || (Bn[0] = withKeys(withModifiers((Vn) => Fn(he.value - 1), ["prevent"]), ["up"])),
              Bn[1] || (Bn[1] = withKeys(withModifiers((Vn) => Fn(he.value + 1), ["prevent"]), ["down"])),
              withKeys(_n, ["enter"]),
              withKeys(hn, ["tab"]),
              withKeys(Pn, ["esc"])
            ],
            onMousedown: bn
          }), createSlots({ _: 2 }, [
            Nn.$slots.prepend ? {
              name: "prepend",
              fn: withCtx(() => [
                renderSlot(Nn.$slots, "prepend")
              ])
            } : void 0,
            Nn.$slots.append ? {
              name: "append",
              fn: withCtx(() => [
                renderSlot(Nn.$slots, "append")
              ])
            } : void 0,
            Nn.$slots.prefix ? {
              name: "prefix",
              fn: withCtx(() => [
                renderSlot(Nn.$slots, "prefix")
              ])
            } : void 0,
            Nn.$slots.suffix ? {
              name: "suffix",
              fn: withCtx(() => [
                renderSlot(Nn.$slots, "suffix")
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
  var re = Math.floor(e), ae = e - re, le = oe * (1 - k), ie = oe * (1 - ae * k), ue = oe * (1 - (1 - ae) * k), de = re % 6, pe = [oe, ie, le, le, ue, oe][de], Ce = [ue, oe, oe, ie, le, le][de], $e = [le, le, ue, oe, oe, ie][de];
  return { r: pe * 255, g: Ce * 255, b: $e * 255 };
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
    const le = inject(buttonGroupContextKey, void 0), ie = useGlobalConfig("button"), ue = useNamespace("button"), { form: de } = useFormItem(), pe = useSize(computed(() => le == null ? void 0 : le.size)), Ce = useDisabled$1(), $e = ref(), Ne = computed(() => re.type || (le == null ? void 0 : le.type) || ""), Oe = computed(() => {
      var Ie, ze, xe;
      return (xe = (ze = re.autoInsertSpace) != null ? ze : (Ie = ie.value) == null ? void 0 : Ie.autoInsertSpace) != null ? xe : !1;
    }), _e = computed(() => {
      var Ie;
      const ze = (Ie = ae.default) == null ? void 0 : Ie.call(ae);
      if (Oe.value && (ze == null ? void 0 : ze.length) === 1) {
        const xe = ze[0];
        if ((xe == null ? void 0 : xe.type) === Text) {
          const Ue = xe.children;
          return /^\p{Unified_Ideograph}{2}$/u.test(Ue.trim());
        }
      }
      return !1;
    }), he = useButtonCustomStyle(re), Ve = (Ie) => {
      re.nativeType === "reset" && (de == null || de.resetFields()), oe("click", Ie);
    };
    return k({
      ref: $e,
      size: pe,
      type: Ne,
      disabled: Ce,
      shouldAddSpace: _e
    }), (Ie, ze) => (openBlock(), createElementBlock("button", {
      ref_key: "_ref",
      ref: $e,
      class: normalizeClass([
        unref(ue).b(),
        unref(ue).m(unref(Ne)),
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
      onClick: Ve
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
        class: normalizeClass({ [unref(ue).em("text", "expand")]: unref(_e) })
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
    var oe = 1e3, re = 6e4, ae = 36e5, le = "millisecond", ie = "second", ue = "minute", de = "hour", pe = "day", Ce = "week", $e = "month", Ne = "quarter", Oe = "year", _e = "date", he = "Invalid Date", Ve = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, Ie = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, ze = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_") }, xe = function(Dt, Lt, bn) {
      var jt = String(Dt);
      return !jt || jt.length >= Lt ? Dt : "" + Array(Lt + 1 - jt.length).join(bn) + Dt;
    }, Ue = { s: xe, z: function(Dt) {
      var Lt = -Dt.utcOffset(), bn = Math.abs(Lt), jt = Math.floor(bn / 60), Cn = bn % 60;
      return (Lt <= 0 ? "+" : "-") + xe(jt, 2, "0") + ":" + xe(Cn, 2, "0");
    }, m: function Dt(Lt, bn) {
      if (Lt.date() < bn.date())
        return -Dt(bn, Lt);
      var jt = 12 * (bn.year() - Lt.year()) + (bn.month() - Lt.month()), Cn = Lt.clone().add(jt, $e), kt = bn - Cn < 0, Et = Lt.clone().add(jt + (kt ? -1 : 1), $e);
      return +(-(jt + (bn - Cn) / (kt ? Cn - Et : Et - Cn)) || 0);
    }, a: function(Dt) {
      return Dt < 0 ? Math.ceil(Dt) || 0 : Math.floor(Dt);
    }, p: function(Dt) {
      return { M: $e, y: Oe, w: Ce, d: pe, D: _e, h: de, m: ue, s: ie, ms: le, Q: Ne }[Dt] || String(Dt || "").toLowerCase().replace(/s$/, "");
    }, u: function(Dt) {
      return Dt === void 0;
    } }, At = "en", Fe = {};
    Fe[At] = ze;
    var Pt = function(Dt) {
      return Dt instanceof kn;
    }, vn = function Dt(Lt, bn, jt) {
      var Cn;
      if (!Lt)
        return At;
      if (typeof Lt == "string") {
        var kt = Lt.toLowerCase();
        Fe[kt] && (Cn = kt), bn && (Fe[kt] = bn, Cn = kt);
        var Et = Lt.split("-");
        if (!Cn && Et.length > 1)
          return Dt(Et[0]);
      } else {
        var _n = Lt.name;
        Fe[_n] = Lt, Cn = _n;
      }
      return !jt && Cn && (At = Cn), Cn || !jt && At;
    }, En = function(Dt, Lt) {
      if (Pt(Dt))
        return Dt.clone();
      var bn = typeof Lt == "object" ? Lt : {};
      return bn.date = Dt, bn.args = arguments, new kn(bn);
    }, $n = Ue;
    $n.l = vn, $n.i = Pt, $n.w = function(Dt, Lt) {
      return En(Dt, { locale: Lt.$L, utc: Lt.$u, x: Lt.$x, $offset: Lt.$offset });
    };
    var kn = function() {
      function Dt(bn) {
        this.$L = vn(bn.locale, null, !0), this.parse(bn);
      }
      var Lt = Dt.prototype;
      return Lt.parse = function(bn) {
        this.$d = function(jt) {
          var Cn = jt.date, kt = jt.utc;
          if (Cn === null)
            return new Date(NaN);
          if ($n.u(Cn))
            return new Date();
          if (Cn instanceof Date)
            return new Date(Cn);
          if (typeof Cn == "string" && !/Z$/i.test(Cn)) {
            var Et = Cn.match(Ve);
            if (Et) {
              var _n = Et[2] - 1 || 0, Pn = (Et[7] || "0").substring(0, 3);
              return kt ? new Date(Date.UTC(Et[1], _n, Et[3] || 1, Et[4] || 0, Et[5] || 0, Et[6] || 0, Pn)) : new Date(Et[1], _n, Et[3] || 1, Et[4] || 0, Et[5] || 0, Et[6] || 0, Pn);
            }
          }
          return new Date(Cn);
        }(bn), this.$x = bn.x || {}, this.init();
      }, Lt.init = function() {
        var bn = this.$d;
        this.$y = bn.getFullYear(), this.$M = bn.getMonth(), this.$D = bn.getDate(), this.$W = bn.getDay(), this.$H = bn.getHours(), this.$m = bn.getMinutes(), this.$s = bn.getSeconds(), this.$ms = bn.getMilliseconds();
      }, Lt.$utils = function() {
        return $n;
      }, Lt.isValid = function() {
        return this.$d.toString() !== he;
      }, Lt.isSame = function(bn, jt) {
        var Cn = En(bn);
        return this.startOf(jt) <= Cn && Cn <= this.endOf(jt);
      }, Lt.isAfter = function(bn, jt) {
        return En(bn) < this.startOf(jt);
      }, Lt.isBefore = function(bn, jt) {
        return this.endOf(jt) < En(bn);
      }, Lt.$g = function(bn, jt, Cn) {
        return $n.u(bn) ? this[jt] : this.set(Cn, bn);
      }, Lt.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, Lt.valueOf = function() {
        return this.$d.getTime();
      }, Lt.startOf = function(bn, jt) {
        var Cn = this, kt = !!$n.u(jt) || jt, Et = $n.p(bn), _n = function(Bn, Vn) {
          var An = $n.w(Cn.$u ? Date.UTC(Cn.$y, Vn, Bn) : new Date(Cn.$y, Vn, Bn), Cn);
          return kt ? An : An.endOf(pe);
        }, Pn = function(Bn, Vn) {
          return $n.w(Cn.toDate()[Bn].apply(Cn.toDate("s"), (kt ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(Vn)), Cn);
        }, hn = this.$W, On = this.$M, Dn = this.$D, Rn = "set" + (this.$u ? "UTC" : "");
        switch (Et) {
          case Oe:
            return kt ? _n(1, 0) : _n(31, 11);
          case $e:
            return kt ? _n(1, On) : _n(0, On + 1);
          case Ce:
            var Fn = this.$locale().weekStart || 0, Nn = (hn < Fn ? hn + 7 : hn) - Fn;
            return _n(kt ? Dn - Nn : Dn + (6 - Nn), On);
          case pe:
          case _e:
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
      }, Lt.endOf = function(bn) {
        return this.startOf(bn, !1);
      }, Lt.$set = function(bn, jt) {
        var Cn, kt = $n.p(bn), Et = "set" + (this.$u ? "UTC" : ""), _n = (Cn = {}, Cn[pe] = Et + "Date", Cn[_e] = Et + "Date", Cn[$e] = Et + "Month", Cn[Oe] = Et + "FullYear", Cn[de] = Et + "Hours", Cn[ue] = Et + "Minutes", Cn[ie] = Et + "Seconds", Cn[le] = Et + "Milliseconds", Cn)[kt], Pn = kt === pe ? this.$D + (jt - this.$W) : jt;
        if (kt === $e || kt === Oe) {
          var hn = this.clone().set(_e, 1);
          hn.$d[_n](Pn), hn.init(), this.$d = hn.set(_e, Math.min(this.$D, hn.daysInMonth())).$d;
        } else
          _n && this.$d[_n](Pn);
        return this.init(), this;
      }, Lt.set = function(bn, jt) {
        return this.clone().$set(bn, jt);
      }, Lt.get = function(bn) {
        return this[$n.p(bn)]();
      }, Lt.add = function(bn, jt) {
        var Cn, kt = this;
        bn = Number(bn);
        var Et = $n.p(jt), _n = function(On) {
          var Dn = En(kt);
          return $n.w(Dn.date(Dn.date() + Math.round(On * bn)), kt);
        };
        if (Et === $e)
          return this.set($e, this.$M + bn);
        if (Et === Oe)
          return this.set(Oe, this.$y + bn);
        if (Et === pe)
          return _n(1);
        if (Et === Ce)
          return _n(7);
        var Pn = (Cn = {}, Cn[ue] = re, Cn[de] = ae, Cn[ie] = oe, Cn)[Et] || 1, hn = this.$d.getTime() + bn * Pn;
        return $n.w(hn, this);
      }, Lt.subtract = function(bn, jt) {
        return this.add(-1 * bn, jt);
      }, Lt.format = function(bn) {
        var jt = this, Cn = this.$locale();
        if (!this.isValid())
          return Cn.invalidDate || he;
        var kt = bn || "YYYY-MM-DDTHH:mm:ssZ", Et = $n.z(this), _n = this.$H, Pn = this.$m, hn = this.$M, On = Cn.weekdays, Dn = Cn.months, Rn = function(Vn, An, Wn, Yn) {
          return Vn && (Vn[An] || Vn(jt, kt)) || Wn[An].slice(0, Yn);
        }, Fn = function(Vn) {
          return $n.s(_n % 12 || 12, Vn, "0");
        }, Nn = Cn.meridiem || function(Vn, An, Wn) {
          var Yn = Vn < 12 ? "AM" : "PM";
          return Wn ? Yn.toLowerCase() : Yn;
        }, Bn = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: hn + 1, MM: $n.s(hn + 1, 2, "0"), MMM: Rn(Cn.monthsShort, hn, Dn, 3), MMMM: Rn(Dn, hn), D: this.$D, DD: $n.s(this.$D, 2, "0"), d: String(this.$W), dd: Rn(Cn.weekdaysMin, this.$W, On, 2), ddd: Rn(Cn.weekdaysShort, this.$W, On, 3), dddd: On[this.$W], H: String(_n), HH: $n.s(_n, 2, "0"), h: Fn(1), hh: Fn(2), a: Nn(_n, Pn, !0), A: Nn(_n, Pn, !1), m: String(Pn), mm: $n.s(Pn, 2, "0"), s: String(this.$s), ss: $n.s(this.$s, 2, "0"), SSS: $n.s(this.$ms, 3, "0"), Z: Et };
        return kt.replace(Ie, function(Vn, An) {
          return An || Bn[Vn] || Et.replace(":", "");
        });
      }, Lt.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, Lt.diff = function(bn, jt, Cn) {
        var kt, Et = $n.p(jt), _n = En(bn), Pn = (_n.utcOffset() - this.utcOffset()) * re, hn = this - _n, On = $n.m(this, _n);
        return On = (kt = {}, kt[Oe] = On / 12, kt[$e] = On, kt[Ne] = On / 3, kt[Ce] = (hn - Pn) / 6048e5, kt[pe] = (hn - Pn) / 864e5, kt[de] = hn / ae, kt[ue] = hn / re, kt[ie] = hn / oe, kt)[Et] || hn, Cn ? On : $n.a(On);
      }, Lt.daysInMonth = function() {
        return this.endOf($e).$D;
      }, Lt.$locale = function() {
        return Fe[this.$L];
      }, Lt.locale = function(bn, jt) {
        if (!bn)
          return this.$L;
        var Cn = this.clone(), kt = vn(bn, jt, !0);
        return kt && (Cn.$L = kt), Cn;
      }, Lt.clone = function() {
        return $n.w(this.$d, this);
      }, Lt.toDate = function() {
        return new Date(this.valueOf());
      }, Lt.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, Lt.toISOString = function() {
        return this.$d.toISOString();
      }, Lt.toString = function() {
        return this.$d.toUTCString();
      }, Dt;
    }(), wn = kn.prototype;
    return En.prototype = wn, [["$ms", le], ["$s", ie], ["$m", ue], ["$H", de], ["$W", pe], ["$M", $e], ["$y", Oe], ["$D", _e]].forEach(function(Dt) {
      wn[Dt[1]] = function(Lt) {
        return this.$g(Lt, Dt[0], Dt[1]);
      };
    }), En.extend = function(Dt, Lt) {
      return Dt.$i || (Dt(Lt, kn, En), Dt.$i = !0), En;
    }, En.locale = vn, En.isDayjs = Pt, En.unix = function(Dt) {
      return En(1e3 * Dt);
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
      var le = re.prototype, ie = function($e) {
        return $e && ($e.indexOf ? $e : $e.s);
      }, ue = function($e, Ne, Oe, _e, he) {
        var Ve = $e.name ? $e : $e.$locale(), Ie = ie(Ve[Ne]), ze = ie(Ve[Oe]), xe = Ie || ze.map(function(At) {
          return At.slice(0, _e);
        });
        if (!he)
          return xe;
        var Ue = Ve.weekStart;
        return xe.map(function(At, Fe) {
          return xe[(Fe + (Ue || 0)) % 7];
        });
      }, de = function() {
        return ae.Ls[ae.locale()];
      }, pe = function($e, Ne) {
        return $e.formats[Ne] || function(Oe) {
          return Oe.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(_e, he, Ve) {
            return he || Ve.slice(1);
          });
        }($e.formats[Ne.toUpperCase()]);
      }, Ce = function() {
        var $e = this;
        return { months: function(Ne) {
          return Ne ? Ne.format("MMMM") : ue($e, "months");
        }, monthsShort: function(Ne) {
          return Ne ? Ne.format("MMM") : ue($e, "monthsShort", "months", 3);
        }, firstDayOfWeek: function() {
          return $e.$locale().weekStart || 0;
        }, weekdays: function(Ne) {
          return Ne ? Ne.format("dddd") : ue($e, "weekdays");
        }, weekdaysMin: function(Ne) {
          return Ne ? Ne.format("dd") : ue($e, "weekdaysMin", "weekdays", 2);
        }, weekdaysShort: function(Ne) {
          return Ne ? Ne.format("ddd") : ue($e, "weekdaysShort", "weekdays", 3);
        }, longDateFormat: function(Ne) {
          return pe($e.$locale(), Ne);
        }, meridiem: this.$locale().meridiem, ordinal: this.$locale().ordinal };
      };
      le.localeData = function() {
        return Ce.bind(this)();
      }, ae.localeData = function() {
        var $e = de();
        return { firstDayOfWeek: function() {
          return $e.weekStart || 0;
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
        }, longDateFormat: function(Ne) {
          return pe($e, Ne);
        }, meridiem: $e.meridiem, ordinal: $e.ordinal };
      }, ae.months = function() {
        return ue(de(), "months");
      }, ae.monthsShort = function() {
        return ue(de(), "monthsShort", "months", 3);
      }, ae.weekdays = function($e) {
        return ue(de(), "weekdays", null, null, $e);
      }, ae.weekdaysShort = function($e) {
        return ue(de(), "weekdaysShort", "weekdays", 3, $e);
      }, ae.weekdaysMin = function($e) {
        return ue(de(), "weekdaysMin", "weekdays", 2, $e);
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
      return function(Ve) {
        this[he] = +Ve;
      };
    }, Ce = [/[+-]\d\d:?(\d\d)?|Z/, function(he) {
      (this.zone || (this.zone = {})).offset = function(Ve) {
        if (!Ve || Ve === "Z")
          return 0;
        var Ie = Ve.match(/([+-]|\d\d)/g), ze = 60 * Ie[1] + (+Ie[2] || 0);
        return ze === 0 ? 0 : Ie[0] === "+" ? -ze : ze;
      }(he);
    }], $e = function(he) {
      var Ve = ue[he];
      return Ve && (Ve.indexOf ? Ve : Ve.s.concat(Ve.f));
    }, Ne = function(he, Ve) {
      var Ie, ze = ue.meridiem;
      if (ze) {
        for (var xe = 1; xe <= 24; xe += 1)
          if (he.indexOf(ze(xe, 0, Ve)) > -1) {
            Ie = xe > 12;
            break;
          }
      } else
        Ie = he === (Ve ? "pm" : "PM");
      return Ie;
    }, Oe = { A: [ie, function(he) {
      this.afternoon = Ne(he, !1);
    }], a: [ie, function(he) {
      this.afternoon = Ne(he, !0);
    }], S: [/\d/, function(he) {
      this.milliseconds = 100 * +he;
    }], SS: [ae, function(he) {
      this.milliseconds = 10 * +he;
    }], SSS: [/\d{3}/, function(he) {
      this.milliseconds = +he;
    }], s: [le, pe("seconds")], ss: [le, pe("seconds")], m: [le, pe("minutes")], mm: [le, pe("minutes")], H: [le, pe("hours")], h: [le, pe("hours")], HH: [le, pe("hours")], hh: [le, pe("hours")], D: [le, pe("day")], DD: [ae, pe("day")], Do: [ie, function(he) {
      var Ve = ue.ordinal, Ie = he.match(/\d+/);
      if (this.day = Ie[0], Ve)
        for (var ze = 1; ze <= 31; ze += 1)
          Ve(ze).replace(/\[|\]/g, "") === he && (this.day = ze);
    }], M: [le, pe("month")], MM: [ae, pe("month")], MMM: [ie, function(he) {
      var Ve = $e("months"), Ie = ($e("monthsShort") || Ve.map(function(ze) {
        return ze.slice(0, 3);
      })).indexOf(he) + 1;
      if (Ie < 1)
        throw new Error();
      this.month = Ie % 12 || Ie;
    }], MMMM: [ie, function(he) {
      var Ve = $e("months").indexOf(he) + 1;
      if (Ve < 1)
        throw new Error();
      this.month = Ve % 12 || Ve;
    }], Y: [/[+-]?\d+/, pe("year")], YY: [ae, function(he) {
      this.year = de(he);
    }], YYYY: [/\d{4}/, pe("year")], Z: Ce, ZZ: Ce };
    function _e(he) {
      var Ve, Ie;
      Ve = he, Ie = ue && ue.formats;
      for (var ze = (he = Ve.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(En, $n, kn) {
        var wn = kn && kn.toUpperCase();
        return $n || Ie[kn] || oe[kn] || Ie[wn].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(Dt, Lt, bn) {
          return Lt || bn.slice(1);
        });
      })).match(re), xe = ze.length, Ue = 0; Ue < xe; Ue += 1) {
        var At = ze[Ue], Fe = Oe[At], Pt = Fe && Fe[0], vn = Fe && Fe[1];
        ze[Ue] = vn ? { regex: Pt, parser: vn } : At.replace(/^\[|\]$/g, "");
      }
      return function(En) {
        for (var $n = {}, kn = 0, wn = 0; kn < xe; kn += 1) {
          var Dt = ze[kn];
          if (typeof Dt == "string")
            wn += Dt.length;
          else {
            var Lt = Dt.regex, bn = Dt.parser, jt = En.slice(wn), Cn = Lt.exec(jt)[0];
            bn.call($n, Cn), En = En.replace(Cn, "");
          }
        }
        return function(kt) {
          var Et = kt.afternoon;
          if (Et !== void 0) {
            var _n = kt.hours;
            Et ? _n < 12 && (kt.hours += 12) : _n === 12 && (kt.hours = 0), delete kt.afternoon;
          }
        }($n), $n;
      };
    }
    return function(he, Ve, Ie) {
      Ie.p.customParseFormat = !0, he && he.parseTwoDigitYear && (de = he.parseTwoDigitYear);
      var ze = Ve.prototype, xe = ze.parse;
      ze.parse = function(Ue) {
        var At = Ue.date, Fe = Ue.utc, Pt = Ue.args;
        this.$u = Fe;
        var vn = Pt[1];
        if (typeof vn == "string") {
          var En = Pt[2] === !0, $n = Pt[3] === !0, kn = En || $n, wn = Pt[2];
          $n && (wn = Pt[2]), ue = this.$locale(), !En && wn && (ue = Ie.Ls[wn]), this.$d = function(jt, Cn, kt) {
            try {
              if (["x", "X"].indexOf(Cn) > -1)
                return new Date((Cn === "X" ? 1e3 : 1) * jt);
              var Et = _e(Cn)(jt), _n = Et.year, Pn = Et.month, hn = Et.day, On = Et.hours, Dn = Et.minutes, Rn = Et.seconds, Fn = Et.milliseconds, Nn = Et.zone, Bn = new Date(), Vn = hn || (_n || Pn ? 1 : Bn.getDate()), An = _n || Bn.getFullYear(), Wn = 0;
              _n && !Pn || (Wn = Pn > 0 ? Pn - 1 : Bn.getMonth());
              var Yn = On || 0, Xn = Dn || 0, eo = Rn || 0, qn = Fn || 0;
              return Nn ? new Date(Date.UTC(An, Wn, Vn, Yn, Xn, eo, qn + 60 * Nn.offset * 1e3)) : kt ? new Date(Date.UTC(An, Wn, Vn, Yn, Xn, eo, qn)) : new Date(An, Wn, Vn, Yn, Xn, eo, qn);
            } catch {
              return new Date("");
            }
          }(At, vn, Fe), this.init(), wn && wn !== !0 && (this.$L = this.locale(wn).$L), kn && At != this.format(vn) && (this.$d = new Date("")), ue = {};
        } else if (vn instanceof Array)
          for (var Dt = vn.length, Lt = 1; Lt <= Dt; Lt += 1) {
            Pt[1] = vn[Lt - 1];
            var bn = Ie.apply(this, Pt);
            if (bn.isValid()) {
              this.$d = bn.$d, this.$L = bn.$L, this.init();
              break;
            }
            Lt === Dt && (this.$d = new Date(""));
          }
        else
          xe.call(this, Ue);
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
    const re = e, { lang: ae } = useLocale(), le = useNamespace("date"), ie = useNamespace("input"), ue = useNamespace("range"), de = inject(formContextKey, {}), pe = inject(formItemContextKey, {}), Ce = inject("ElPopperOptions", {}), $e = ref(), Ne = ref(), Oe = ref(!1), _e = ref(!1), he = ref(null);
    let Ve = !1, Ie = !1;
    watch(Oe, (qe) => {
      qe ? he.value = re.modelValue : (qn.value = null, nextTick(() => {
        ze(re.modelValue);
      }));
    });
    const ze = (qe, Sn) => {
      var xn;
      (Sn || !valueEquals(qe, he.value)) && (oe("change", qe), re.validateEvent && ((xn = pe.validate) == null || xn.call(pe, "change").catch((jn) => debugWarn(jn))));
    }, xe = (qe) => {
      if (!valueEquals(re.modelValue, qe)) {
        let Sn;
        isArray(qe) ? Sn = qe.map((xn) => formatter(xn, re.valueFormat, ae.value)) : qe && (Sn = formatter(qe, re.valueFormat, ae.value)), oe("update:modelValue", qe && Sn, ae.value);
      }
    }, Ue = (qe) => {
      oe("keydown", qe);
    }, At = computed(() => {
      if (Ne.value) {
        const qe = Wn.value ? Ne.value : Ne.value.$el;
        return Array.from(qe.querySelectorAll("input"));
      }
      return [];
    }), Fe = (qe, Sn, xn) => {
      const jn = At.value;
      !jn.length || (!xn || xn === "min" ? (jn[0].setSelectionRange(qe, Sn), jn[0].focus()) : xn === "max" && (jn[1].setSelectionRange(qe, Sn), jn[1].focus()));
    }, Pt = () => {
      Dt(!0, !0), nextTick(() => {
        Ie = !1;
      });
    }, vn = (qe = "", Sn = !1) => {
      Sn || Pt(), Oe.value = Sn;
      let xn;
      isArray(qe) ? xn = qe.map((jn) => jn.toDate()) : xn = qe && qe.toDate(), qn.value = null, xe(xn);
    }, En = () => {
      _e.value = !0;
    }, $n = () => {
      oe("visible-change", !0);
    }, kn = (qe) => {
      (qe == null ? void 0 : qe.key) === EVENT_CODE.esc && Dt(!0, !0);
    }, wn = () => {
      _e.value = !1, Ie = !1, oe("visible-change", !1);
    }, Dt = (qe = !0, Sn = !1) => {
      Ie = Sn;
      const [xn, jn] = unref(At);
      let Ln = xn;
      !qe && Wn.value && (Ln = jn), Ln && Ln.focus();
    }, Lt = (qe) => {
      re.readonly || Cn.value || Oe.value || Ie || (Oe.value = !0, oe("focus", qe));
    };
    let bn;
    const jt = (qe) => {
      const Sn = async () => {
        setTimeout(() => {
          var xn, jn;
          bn === Sn && (!(((xn = $e.value) == null ? void 0 : xn.isFocusInsideContent()) && !Ve) && At.value.filter((Ln) => Ln.contains(document.activeElement)).length === 0 && (no(), Oe.value = !1, oe("blur", qe), re.validateEvent && ((jn = pe.validate) == null || jn.call(pe, "blur").catch((Ln) => debugWarn(Ln)))), Ve = !1);
        }, 0);
      };
      bn = Sn, Sn();
    }, Cn = computed(() => re.disabled || de.disabled), kt = computed(() => {
      let qe;
      if (Fn.value ? Qn.value.getDefaultValue && (qe = Qn.value.getDefaultValue()) : isArray(re.modelValue) ? qe = re.modelValue.map((Sn) => parseDate(Sn, re.valueFormat, ae.value)) : qe = parseDate(re.modelValue, re.valueFormat, ae.value), Qn.value.getRangeAvailableTime) {
        const Sn = Qn.value.getRangeAvailableTime(qe);
        isEqual(Sn, qe) || (qe = Sn, xe(isArray(qe) ? qe.map((xn) => xn.toDate()) : qe.toDate()));
      }
      return isArray(qe) && qe.some((Sn) => !Sn) && (qe = []), qe;
    }), Et = computed(() => {
      if (!Qn.value.panelReady)
        return "";
      const qe = zn(kt.value);
      return isArray(qn.value) ? [
        qn.value[0] || qe && qe[0] || "",
        qn.value[1] || qe && qe[1] || ""
      ] : qn.value !== null ? qn.value : !Pn.value && Fn.value || !Oe.value && Fn.value ? "" : qe ? hn.value ? qe.join(", ") : qe : "";
    }), _n = computed(() => re.type.includes("time")), Pn = computed(() => re.type.startsWith("time")), hn = computed(() => re.type === "dates"), On = computed(() => re.prefixIcon || (_n.value ? clock_default : calendar_default)), Dn = ref(!1), Rn = (qe) => {
      re.readonly || Cn.value || Dn.value && (qe.stopPropagation(), Pt(), xe(null), ze(null, !0), Dn.value = !1, Oe.value = !1, Qn.value.handleClear && Qn.value.handleClear());
    }, Fn = computed(() => {
      const { modelValue: qe } = re;
      return !qe || isArray(qe) && !qe.filter(Boolean).length;
    }), Nn = async (qe) => {
      var Sn;
      re.readonly || Cn.value || (((Sn = qe.target) == null ? void 0 : Sn.tagName) !== "INPUT" || At.value.includes(document.activeElement)) && (Oe.value = !0);
    }, Bn = () => {
      re.readonly || Cn.value || !Fn.value && re.clearable && (Dn.value = !0);
    }, Vn = () => {
      Dn.value = !1;
    }, An = (qe) => {
      var Sn;
      (((Sn = qe.touches[0].target) == null ? void 0 : Sn.tagName) !== "INPUT" || At.value.includes(document.activeElement)) && (Oe.value = !0);
    }, Wn = computed(() => re.type.includes("range")), Yn = useSize(), Xn = computed(() => {
      var qe, Sn;
      return (Sn = (qe = unref($e)) == null ? void 0 : qe.popperRef) == null ? void 0 : Sn.contentRef;
    }), eo = computed(() => {
      var qe;
      return unref(Wn) ? unref(Ne) : (qe = unref(Ne)) == null ? void 0 : qe.$el;
    });
    onClickOutside(eo, (qe) => {
      const Sn = unref(Xn), xn = unref(eo);
      Sn && (qe.target === Sn || qe.composedPath().includes(Sn)) || qe.target === xn || qe.composedPath().includes(xn) || (Oe.value = !1);
    });
    const qn = ref(null), no = () => {
      if (qn.value) {
        const qe = oo(Et.value);
        qe && Hn(qe) && (xe(isArray(qe) ? qe.map((Sn) => Sn.toDate()) : qe.toDate()), qn.value = null);
      }
      qn.value === "" && (xe(null), ze(null), qn.value = null);
    }, oo = (qe) => qe ? Qn.value.parseUserInput(qe) : null, zn = (qe) => qe ? Qn.value.formatToString(qe) : null, Hn = (qe) => Qn.value.isValidValue(qe), Gn = async (qe) => {
      if (re.readonly || Cn.value)
        return;
      const { code: Sn } = qe;
      if (Ue(qe), Sn === EVENT_CODE.esc) {
        Oe.value === !0 && (Oe.value = !1, qe.preventDefault(), qe.stopPropagation());
        return;
      }
      if (Sn === EVENT_CODE.down && (Qn.value.handleFocusPicker && (qe.preventDefault(), qe.stopPropagation()), Oe.value === !1 && (Oe.value = !0, await nextTick()), Qn.value.handleFocusPicker)) {
        Qn.value.handleFocusPicker();
        return;
      }
      if (Sn === EVENT_CODE.tab) {
        Ve = !0;
        return;
      }
      if (Sn === EVENT_CODE.enter || Sn === EVENT_CODE.numpadEnter) {
        (qn.value === null || qn.value === "" || Hn(oo(Et.value))) && (no(), Oe.value = !1), qe.stopPropagation();
        return;
      }
      if (qn.value) {
        qe.stopPropagation();
        return;
      }
      Qn.value.handleKeydownInput && Qn.value.handleKeydownInput(qe);
    }, Zn = (qe) => {
      qn.value = qe, Oe.value || (Oe.value = !0);
    }, lo = (qe) => {
      const Sn = qe.target;
      qn.value ? qn.value = [Sn.value, qn.value[1]] : qn.value = [Sn.value, null];
    }, ao = (qe) => {
      const Sn = qe.target;
      qn.value ? qn.value = [qn.value[0], Sn.value] : qn.value = [null, Sn.value];
    }, In = () => {
      var qe;
      const Sn = qn.value, xn = oo(Sn && Sn[0]), jn = unref(kt);
      if (xn && xn.isValid()) {
        qn.value = [
          zn(xn),
          ((qe = Et.value) == null ? void 0 : qe[1]) || null
        ];
        const Ln = [xn, jn && (jn[1] || null)];
        Hn(Ln) && (xe(Ln), qn.value = null);
      }
    }, Jn = () => {
      var qe;
      const Sn = unref(qn), xn = oo(Sn && Sn[1]), jn = unref(kt);
      if (xn && xn.isValid()) {
        qn.value = [
          ((qe = unref(Et)) == null ? void 0 : qe[0]) || null,
          zn(xn)
        ];
        const Ln = [jn && jn[0], xn];
        Hn(Ln) && (xe(Ln), qn.value = null);
      }
    }, Qn = ref({}), ro = (qe) => {
      Qn.value[qe[0]] = qe[1], Qn.value.panelReady = !0;
    }, Tn = (qe) => {
      oe("calendar-change", qe);
    }, Mn = (qe, Sn, xn) => {
      oe("panel-change", qe, Sn, xn);
    };
    return provide("EP_PICKER_BASE", {
      props: re
    }), k({
      focus: Dt,
      handleFocusInput: Lt,
      handleBlurInput: jt,
      onPick: vn
    }), (qe, Sn) => (openBlock(), createBlock(unref(ElTooltip), mergeProps({
      ref_key: "refPopper",
      ref: $e,
      visible: Oe.value,
      effect: "light",
      pure: "",
      trigger: "click"
    }, qe.$attrs, {
      role: "dialog",
      teleported: "",
      transition: `${unref(le).namespace.value}-zoom-in-top`,
      "popper-class": [`${unref(le).namespace.value}-picker__popper`, qe.popperClass],
      "popper-options": unref(Ce),
      "fallback-placements": ["bottom", "top", "right", "left"],
      "gpu-acceleration": !1,
      "stop-popper-mouse-event": !1,
      "hide-after": 0,
      persistent: "",
      onBeforeShow: En,
      onShow: $n,
      onHide: wn
    }), {
      default: withCtx(() => [
        unref(Wn) ? (openBlock(), createElementBlock("div", {
          key: 1,
          ref_key: "inputRef",
          ref: Ne,
          class: normalizeClass([
            unref(le).b("editor"),
            unref(le).bm("editor", qe.type),
            unref(ie).e("wrapper"),
            unref(le).is("disabled", unref(Cn)),
            unref(le).is("active", Oe.value),
            unref(ue).b("editor"),
            unref(Yn) ? unref(ue).bm("editor", unref(Yn)) : "",
            qe.$attrs.class
          ]),
          style: normalizeStyle(qe.$attrs.style),
          onClick: Lt,
          onMouseenter: Bn,
          onMouseleave: Vn,
          onTouchstart: An,
          onKeydown: Gn
        }, [
          unref(On) ? (openBlock(), createBlock(unref(ElIcon), {
            key: 0,
            class: normalizeClass([unref(ie).e("icon"), unref(ue).e("icon")]),
            onMousedown: withModifiers(Nn, ["prevent"]),
            onTouchstart: An
          }, {
            default: withCtx(() => [
              (openBlock(), createBlock(resolveDynamicComponent(unref(On))))
            ]),
            _: 1
          }, 8, ["class", "onMousedown"])) : createCommentVNode("v-if", !0),
          createElementVNode("input", {
            id: qe.id && qe.id[0],
            autocomplete: "off",
            name: qe.name && qe.name[0],
            placeholder: qe.startPlaceholder,
            value: unref(Et) && unref(Et)[0],
            disabled: unref(Cn),
            readonly: !qe.editable || qe.readonly,
            class: normalizeClass(unref(ue).b("input")),
            onMousedown: Nn,
            onInput: lo,
            onChange: In,
            onFocus: Lt,
            onBlur: jt
          }, null, 42, _hoisted_1$r),
          renderSlot(qe.$slots, "range-separator", {}, () => [
            createElementVNode("span", {
              class: normalizeClass(unref(ue).b("separator"))
            }, toDisplayString(qe.rangeSeparator), 3)
          ]),
          createElementVNode("input", {
            id: qe.id && qe.id[1],
            autocomplete: "off",
            name: qe.name && qe.name[1],
            placeholder: qe.endPlaceholder,
            value: unref(Et) && unref(Et)[1],
            disabled: unref(Cn),
            readonly: !qe.editable || qe.readonly,
            class: normalizeClass(unref(ue).b("input")),
            onMousedown: Nn,
            onFocus: Lt,
            onBlur: jt,
            onInput: ao,
            onChange: Jn
          }, null, 42, _hoisted_2$i),
          qe.clearIcon ? (openBlock(), createBlock(unref(ElIcon), {
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
              (openBlock(), createBlock(resolveDynamicComponent(qe.clearIcon)))
            ]),
            _: 1
          }, 8, ["class"])) : createCommentVNode("v-if", !0)
        ], 38)) : (openBlock(), createBlock(unref(ElInput), {
          key: 0,
          id: qe.id,
          ref_key: "inputRef",
          ref: Ne,
          "container-role": "combobox",
          "model-value": unref(Et),
          name: qe.name,
          size: unref(Yn),
          disabled: unref(Cn),
          placeholder: qe.placeholder,
          class: normalizeClass([unref(le).b("editor"), unref(le).bm("editor", qe.type), qe.$attrs.class]),
          style: normalizeStyle(qe.$attrs.style),
          readonly: !qe.editable || qe.readonly || unref(hn) || qe.type === "week",
          label: qe.label,
          tabindex: qe.tabindex,
          "validate-event": qe.validateEvent,
          onInput: Zn,
          onFocus: Lt,
          onBlur: jt,
          onKeydown: Gn,
          onChange: no,
          onMousedown: Nn,
          onMouseenter: Bn,
          onMouseleave: Vn,
          onTouchstart: An,
          onClick: Sn[0] || (Sn[0] = withModifiers(() => {
          }, ["stop"]))
        }, {
          prefix: withCtx(() => [
            unref(On) ? (openBlock(), createBlock(unref(ElIcon), {
              key: 0,
              class: normalizeClass(unref(ie).e("icon")),
              onMousedown: withModifiers(Nn, ["prevent"]),
              onTouchstart: An
            }, {
              default: withCtx(() => [
                (openBlock(), createBlock(resolveDynamicComponent(unref(On))))
              ]),
              _: 1
            }, 8, ["class", "onMousedown"])) : createCommentVNode("v-if", !0)
          ]),
          suffix: withCtx(() => [
            Dn.value && qe.clearIcon ? (openBlock(), createBlock(unref(ElIcon), {
              key: 0,
              class: normalizeClass(`${unref(ie).e("icon")} clear-icon`),
              onClick: withModifiers(Rn, ["stop"])
            }, {
              default: withCtx(() => [
                (openBlock(), createBlock(resolveDynamicComponent(qe.clearIcon)))
              ]),
              _: 1
            }, 8, ["class", "onClick"])) : createCommentVNode("v-if", !0)
          ]),
          _: 1
        }, 8, ["id", "model-value", "name", "size", "disabled", "placeholder", "class", "style", "readonly", "label", "tabindex", "validate-event", "onKeydown"]))
      ]),
      content: withCtx(() => [
        renderSlot(qe.$slots, "default", {
          visible: Oe.value,
          actualVisible: _e.value,
          parsedValue: unref(kt),
          format: qe.format,
          unlinkPanels: qe.unlinkPanels,
          type: qe.type,
          defaultValue: qe.defaultValue,
          onPick: vn,
          onSelectRange: Fe,
          onSetPickerOption: ro,
          onCalendarChange: Tn,
          onPanelChange: Mn,
          onKeydown: kn,
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
    let $e = ie;
    return ["hour", "minute", "second"].forEach((Ne) => {
      if (Ce[Ne]) {
        let Oe;
        const _e = Ce[Ne];
        switch (Ne) {
          case "minute": {
            Oe = _e($e.hour(), ue, pe);
            break;
          }
          case "second": {
            Oe = _e($e.hour(), $e.minute(), ue, pe);
            break;
          }
          default: {
            Oe = _e(ue, pe);
            break;
          }
        }
        if ((Oe == null ? void 0 : Oe.length) && !Oe.includes($e[Ne]())) {
          const he = de ? 0 : Oe.length - 1;
          $e = $e[Ne](Oe[he]);
        }
      }
    }), $e;
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
    getAvailableMinutes: (pe, Ce, $e) => makeAvailableArr(ae(pe, Ce, $e)),
    getAvailableSeconds: (pe, Ce, $e, Ne) => makeAvailableArr(le(pe, Ce, $e, Ne))
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
    const le = k.instance.popperRef, ie = re.target, ue = ae == null ? void 0 : ae.target, de = !k || !k.instance, pe = !ie || !ue, Ce = e.contains(ie) || e.contains(ue), $e = e === ie, Ne = oe.length && oe.some((_e) => _e == null ? void 0 : _e.contains(ie)) || oe.length && oe.includes(ue), Oe = le && (le.contains(ie) || le.contains(ue));
    de || pe || Ce || $e || Ne || Oe || k.value(re, ae);
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
    const de = ref(), pe = ref(), Ce = ref(), $e = ref(), Ne = {
      hours: pe,
      minutes: Ce,
      seconds: $e
    }, Oe = computed(() => oe.showSeconds ? timeUnits : timeUnits.slice(0, 2)), _e = computed(() => {
      const { spinnerDate: kt } = oe, Et = kt.hour(), _n = kt.minute(), Pn = kt.second();
      return { hours: Et, minutes: _n, seconds: Pn };
    }), he = computed(() => {
      const { hours: kt, minutes: Et } = unref(_e);
      return {
        hours: ae(oe.role),
        minutes: le(kt, oe.role),
        seconds: ie(kt, Et, oe.role)
      };
    }), Ve = computed(() => {
      const { hours: kt, minutes: Et, seconds: _n } = unref(_e);
      return {
        hours: buildTimeList(kt, 23),
        minutes: buildTimeList(Et, 59),
        seconds: buildTimeList(_n, 59)
      };
    }), Ie = debounce((kt) => {
      ue = !1, Ue(kt);
    }, 200), ze = (kt) => {
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
    }, Ue = (kt) => {
      Pt(kt, unref(_e)[kt]);
    }, At = () => {
      Ue("hours"), Ue("minutes"), Ue("seconds");
    }, Fe = (kt) => kt.querySelector(`.${re.namespace.value}-scrollbar__wrap`), Pt = (kt, Et) => {
      if (oe.arrowControl)
        return;
      const _n = unref(Ne[kt]);
      _n && _n.$el && (Fe(_n.$el).scrollTop = Math.max(0, Et * vn(kt)));
    }, vn = (kt) => {
      const Et = unref(Ne[kt]);
      return (Et == null ? void 0 : Et.$el.querySelector("li").offsetHeight) || 0;
    }, En = () => {
      kn(1);
    }, $n = () => {
      kn(-1);
    }, kn = (kt) => {
      de.value || xe("hours");
      const Et = de.value;
      let _n = unref(_e)[Et];
      const Pn = de.value === "hours" ? 24 : 60;
      _n = (_n + kt + Pn) % Pn, wn(Et, _n), Pt(Et, _n), nextTick(() => xe(Et));
    }, wn = (kt, Et) => {
      if (unref(he)[kt][Et])
        return;
      const { hours: hn, minutes: On, seconds: Dn } = unref(_e);
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
    }, Dt = (kt, { value: Et, disabled: _n }) => {
      _n || (wn(kt, Et), xe(kt), Pt(kt, Et));
    }, Lt = (kt) => {
      ue = !0, Ie(kt);
      const Et = Math.min(Math.round((Fe(unref(Ne[kt]).$el).scrollTop - (bn(kt) * 0.5 - 10) / vn(kt) + 3) / vn(kt)), kt === "hours" ? 23 : 59);
      wn(kt, Et);
    }, bn = (kt) => unref(Ne[kt]).$el.offsetHeight, jt = () => {
      const kt = (Et) => {
        const _n = unref(Ne[Et]);
        _n && _n.$el && (Fe(_n.$el).onscroll = () => {
          Lt(Et);
        });
      };
      kt("hours"), kt("minutes"), kt("seconds");
    };
    onMounted(() => {
      nextTick(() => {
        !oe.arrowControl && jt(), At(), oe.role === "start" && xe("hours");
      });
    });
    const Cn = (kt, Et) => {
      Ne[Et].value = kt;
    };
    return k("set-option", [`${oe.role}_scrollDown`, kn]), k("set-option", [`${oe.role}_emitSelectRange`, xe]), watch(() => oe.spinnerDate, () => {
      ue || At();
    }), (kt, Et) => (openBlock(), createElementBlock("div", {
      class: normalizeClass([unref(re).b("spinner"), { "has-seconds": kt.showSeconds }])
    }, [
      kt.arrowControl ? createCommentVNode("v-if", !0) : (openBlock(!0), createElementBlock(Fragment, { key: 0 }, renderList(unref(Oe), (_n) => (openBlock(), createBlock(unref(ElScrollbar), {
        key: _n,
        ref_for: !0,
        ref: (Pn) => Cn(Pn, _n),
        class: normalizeClass(unref(re).be("spinner", "wrapper")),
        "wrap-style": "max-height: inherit;",
        "view-class": unref(re).be("spinner", "list"),
        noresize: "",
        tag: "ul",
        onMouseenter: (Pn) => xe(_n),
        onMousemove: (Pn) => Ue(_n)
      }, {
        default: withCtx(() => [
          (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(he)[_n], (Pn, hn) => (openBlock(), createElementBlock("li", {
            key: hn,
            class: normalizeClass([
              unref(re).be("spinner", "item"),
              unref(re).is("active", hn === unref(_e)[_n]),
              unref(re).is("disabled", Pn)
            ]),
            onClick: (On) => Dt(_n, { value: hn, disabled: Pn })
          }, [
            _n === "hours" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(toDisplayString(("0" + (kt.amPmMode ? hn % 12 || 12 : hn)).slice(-2)) + toDisplayString(ze(hn)), 1)
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createTextVNode(toDisplayString(("0" + hn).slice(-2)), 1)
            ], 64))
          ], 10, _hoisted_1$q))), 128))
        ]),
        _: 2
      }, 1032, ["class", "view-class", "onMouseenter", "onMousemove"]))), 128)),
      kt.arrowControl ? (openBlock(!0), createElementBlock(Fragment, { key: 1 }, renderList(unref(Oe), (_n) => (openBlock(), createElementBlock("div", {
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
          [unref(RepeatClick), $n]
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
          (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(Ve)[_n], (Pn, hn) => (openBlock(), createElementBlock("li", {
            key: hn,
            class: normalizeClass([
              unref(re).be("spinner", "item"),
              unref(re).is("active", Pn === unref(_e)[_n]),
              unref(re).is("disabled", unref(he)[_n][Pn])
            ])
          }, [
            typeof Pn == "number" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              _n === "hours" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createTextVNode(toDisplayString(("0" + (kt.amPmMode ? Pn % 12 || 12 : Pn)).slice(-2)) + toDisplayString(ze(Pn)), 1)
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
    } = re.props, { getAvailableHours: pe, getAvailableMinutes: Ce, getAvailableSeconds: $e } = buildAvailableTimeSlotGetter(le, ie, ue), Ne = useNamespace("time"), { t: Oe, lang: _e } = useLocale(), he = ref([0, 2]), Ve = useOldValue(oe), Ie = computed(() => isUndefined(oe.actualVisible) ? `${Ne.namespace.value}-zoom-in-top` : ""), ze = computed(() => oe.format.includes("ss")), xe = computed(() => oe.format.includes("A") ? "A" : oe.format.includes("a") ? "a" : ""), Ue = (kt) => {
      const Et = dayjs(kt).locale(_e.value), _n = Lt(Et);
      return Et.isSame(_n);
    }, At = () => {
      k("pick", Ve.value, !1);
    }, Fe = (kt = !1, Et = !1) => {
      Et || k("pick", oe.parsedValue, kt);
    }, Pt = (kt) => {
      if (!oe.visible)
        return;
      const Et = Lt(kt).millisecond(0);
      k("pick", Et, !0);
    }, vn = (kt, Et) => {
      k("select-range", kt, Et), he.value = [kt, Et];
    }, En = (kt) => {
      const Et = [0, 3].concat(ze.value ? [6] : []), _n = ["hours", "minutes"].concat(ze.value ? ["seconds"] : []), hn = (Et.indexOf(he.value[0]) + kt + Et.length) % Et.length;
      kn.start_emitSelectRange(_n[hn]);
    }, $n = (kt) => {
      const Et = kt.code, { left: _n, right: Pn, up: hn, down: On } = EVENT_CODE;
      if ([_n, Pn].includes(Et)) {
        En(Et === _n ? -1 : 1), kt.preventDefault();
        return;
      }
      if ([hn, On].includes(Et)) {
        const Dn = Et === hn ? -1 : 1;
        kn.start_scrollDown(Dn), kt.preventDefault();
        return;
      }
    }, { timePickerOptions: kn, onSetOption: wn, getAvailableTime: Dt } = useTimePanel({
      getAvailableHours: pe,
      getAvailableMinutes: Ce,
      getAvailableSeconds: $e
    }), Lt = (kt) => Dt(kt, oe.datetimeRole || "", !0), bn = (kt) => kt ? dayjs(kt, oe.format).locale(_e.value) : null, jt = (kt) => kt ? kt.format(oe.format) : null, Cn = () => dayjs(de).locale(_e.value);
    return k("set-picker-option", ["isValidValue", Ue]), k("set-picker-option", ["formatToString", jt]), k("set-picker-option", ["parseUserInput", bn]), k("set-picker-option", ["handleKeydownInput", $n]), k("set-picker-option", ["getRangeAvailableTime", Lt]), k("set-picker-option", ["getDefaultValue", Cn]), (kt, Et) => (openBlock(), createBlock(Transition, { name: unref(Ie) }, {
      default: withCtx(() => [
        kt.actualVisible || kt.visible ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(Ne).b("panel"))
        }, [
          createElementVNode("div", {
            class: normalizeClass([unref(Ne).be("panel", "content"), { "has-seconds": unref(ze) }])
          }, [
            createVNode(TimeSpinner, {
              ref: "spinner",
              role: kt.datetimeRole || "start",
              "arrow-control": unref(ae),
              "show-seconds": unref(ze),
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
            class: normalizeClass(unref(Ne).be("panel", "footer"))
          }, [
            createElementVNode("button", {
              type: "button",
              class: normalizeClass([unref(Ne).be("panel", "btn"), "cancel"]),
              onClick: At
            }, toDisplayString(unref(Oe)("el.datepicker.cancel")), 3),
            createElementVNode("button", {
              type: "button",
              class: normalizeClass([unref(Ne).be("panel", "btn"), "confirm"]),
              onClick: Et[0] || (Et[0] = (_n) => Fe())
            }, toDisplayString(unref(Oe)("el.datepicker.confirm")), 3)
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
    const oe = e, re = (Vn, An) => {
      const Wn = [];
      for (let Yn = Vn; Yn <= An; Yn++)
        Wn.push(Yn);
      return Wn;
    }, { t: ae, lang: le } = useLocale(), ie = useNamespace("time"), ue = useNamespace("picker"), de = inject("EP_PICKER_BASE"), {
      arrowControl: pe,
      disabledHours: Ce,
      disabledMinutes: $e,
      disabledSeconds: Ne,
      defaultValue: Oe
    } = de.props, _e = computed(() => oe.parsedValue[0]), he = computed(() => oe.parsedValue[1]), Ve = useOldValue(oe), Ie = () => {
      k("pick", Ve.value, !1);
    }, ze = computed(() => oe.format.includes("ss")), xe = computed(() => oe.format.includes("A") ? "A" : oe.format.includes("a") ? "a" : ""), Ue = (Vn = !1) => {
      k("pick", [_e.value, he.value], Vn);
    }, At = (Vn) => {
      vn(Vn.millisecond(0), he.value);
    }, Fe = (Vn) => {
      vn(_e.value, Vn.millisecond(0));
    }, Pt = (Vn) => {
      const An = Vn.map((Yn) => dayjs(Yn).locale(le.value)), Wn = Et(An);
      return An[0].isSame(Wn[0]) && An[1].isSame(Wn[1]);
    }, vn = (Vn, An) => {
      k("pick", [Vn, An], !0);
    }, En = computed(() => _e.value > he.value), $n = ref([0, 2]), kn = (Vn, An) => {
      k("select-range", Vn, An, "min"), $n.value = [Vn, An];
    }, wn = computed(() => ze.value ? 11 : 8), Dt = (Vn, An) => {
      k("select-range", Vn, An, "max");
      const Wn = unref(wn);
      $n.value = [Vn + Wn, An + Wn];
    }, Lt = (Vn) => {
      const An = ze.value ? [0, 3, 6, 11, 14, 17] : [0, 3, 8, 11], Wn = ["hours", "minutes"].concat(ze.value ? ["seconds"] : []), Xn = (An.indexOf($n.value[0]) + Vn + An.length) % An.length, eo = An.length / 2;
      Xn < eo ? On.start_emitSelectRange(Wn[Xn]) : On.end_emitSelectRange(Wn[Xn - eo]);
    }, bn = (Vn) => {
      const An = Vn.code, { left: Wn, right: Yn, up: Xn, down: eo } = EVENT_CODE;
      if ([Wn, Yn].includes(An)) {
        Lt(An === Wn ? -1 : 1), Vn.preventDefault();
        return;
      }
      if ([Xn, eo].includes(An)) {
        const qn = An === Xn ? -1 : 1, no = $n.value[0] < wn.value ? "start" : "end";
        On[`${no}_scrollDown`](qn), Vn.preventDefault();
        return;
      }
    }, jt = (Vn, An) => {
      const Wn = Ce ? Ce(Vn) : [], Yn = Vn === "start", eo = (An || (Yn ? he.value : _e.value)).hour(), qn = Yn ? re(eo + 1, 23) : re(0, eo - 1);
      return union$1(Wn, qn);
    }, Cn = (Vn, An, Wn) => {
      const Yn = $e ? $e(Vn, An) : [], Xn = An === "start", eo = Wn || (Xn ? he.value : _e.value), qn = eo.hour();
      if (Vn !== qn)
        return Yn;
      const no = eo.minute(), oo = Xn ? re(no + 1, 59) : re(0, no - 1);
      return union$1(Yn, oo);
    }, kt = (Vn, An, Wn, Yn) => {
      const Xn = Ne ? Ne(Vn, An, Wn) : [], eo = Wn === "start", qn = Yn || (eo ? he.value : _e.value), no = qn.hour(), oo = qn.minute();
      if (Vn !== no || An !== oo)
        return Xn;
      const zn = qn.second(), Hn = eo ? re(zn + 1, 59) : re(0, zn - 1);
      return union$1(Xn, Hn);
    }, Et = ([Vn, An]) => [
      Dn(Vn, "start", !0, An),
      Dn(An, "end", !1, Vn)
    ], { getAvailableHours: _n, getAvailableMinutes: Pn, getAvailableSeconds: hn } = buildAvailableTimeSlotGetter(jt, Cn, kt), {
      timePickerOptions: On,
      getAvailableTime: Dn,
      onSetOption: Rn
    } = useTimePanel({
      getAvailableHours: _n,
      getAvailableMinutes: Pn,
      getAvailableSeconds: hn
    }), Fn = (Vn) => Vn ? isArray(Vn) ? Vn.map((An) => dayjs(An, oe.format).locale(le.value)) : dayjs(Vn, oe.format).locale(le.value) : null, Nn = (Vn) => Vn ? isArray(Vn) ? Vn.map((An) => An.format(oe.format)) : Vn.format(oe.format) : null, Bn = () => {
      if (isArray(Oe))
        return Oe.map((An) => dayjs(An).locale(le.value));
      const Vn = dayjs(Oe).locale(le.value);
      return [Vn, Vn.add(60, "m")];
    };
    return k("set-picker-option", ["formatToString", Nn]), k("set-picker-option", ["parseUserInput", Fn]), k("set-picker-option", ["isValidValue", Pt]), k("set-picker-option", ["handleKeydownInput", bn]), k("set-picker-option", ["getDefaultValue", Bn]), k("set-picker-option", ["getRangeAvailableTime", Et]), (Vn, An) => Vn.actualVisible ? (openBlock(), createElementBlock("div", {
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
              { "has-seconds": unref(ze) }
            ])
          }, [
            createVNode(TimeSpinner, {
              ref: "minSpinner",
              role: "start",
              "show-seconds": unref(ze),
              "am-pm-mode": unref(xe),
              "arrow-control": unref(pe),
              "spinner-date": unref(_e),
              "disabled-hours": jt,
              "disabled-minutes": Cn,
              "disabled-seconds": kt,
              onChange: At,
              onSetOption: unref(Rn),
              onSelectRange: kn
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
              { "has-seconds": unref(ze) }
            ])
          }, [
            createVNode(TimeSpinner, {
              ref: "maxSpinner",
              role: "end",
              "show-seconds": unref(ze),
              "am-pm-mode": unref(xe),
              "arrow-control": unref(pe),
              "spinner-date": unref(he),
              "disabled-hours": jt,
              "disabled-minutes": Cn,
              "disabled-seconds": kt,
              onChange: Fe,
              onSetOption: unref(Rn),
              onSelectRange: Dt
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
          onClick: An[0] || (An[0] = (Wn) => Ie())
        }, toDisplayString(unref(ae)("el.datepicker.cancel")), 3),
        createElementVNode("button", {
          type: "button",
          class: normalizeClass([unref(ie).be("panel", "btn"), "confirm"]),
          disabled: unref(En),
          onClick: An[1] || (An[1] = (Wn) => Ue())
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
    const Ce = (de = le.max) == null ? void 0 : de.value, $e = (pe = le.min) == null ? void 0 : pe.value;
    return !!(Ce || $e) && k.value.length >= Ce && !oe.value || k.value.length <= $e && oe.value;
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
  function pe(_e) {
    var he, Ve;
    return _e === e.trueLabel || _e === !0 ? (he = e.trueLabel) != null ? he : !0 : (Ve = e.falseLabel) != null ? Ve : !1;
  }
  function Ce(_e, he) {
    de("change", pe(_e), he);
  }
  function $e(_e) {
    if (oe.value)
      return;
    const he = _e.target;
    de("change", pe(he.checked), _e);
  }
  async function Ne(_e) {
    oe.value || !re.value && !ae.value && le.value && (k.value = pe([!1, e.falseLabel].includes(k.value)), await nextTick(), Ce(k.value, _e));
  }
  const Oe = computed(() => {
    var _e;
    return ((_e = ue.validateEvent) == null ? void 0 : _e.value) || e.validateEvent;
  });
  return watch(() => e.modelValue, () => {
    var _e;
    Oe.value && ((_e = ie == null ? void 0 : ie.validate) == null || _e.call(ie, "change").catch((he) => debugWarn(he)));
  }), {
    handleChange: $e,
    onClickRoot: Ne
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
  }), { isDisabled: $e } = useDisabled(e, { model: oe, isChecked: de }), { inputId: Ne, isLabeledByFormItem: Oe } = useFormItemInputId(e, {
    formItemContext: le,
    disableIdGeneration: Ce,
    disableIdManagement: re
  }), { handleChange: _e, onClickRoot: he } = useEvent$1(e, {
    model: oe,
    isLimitExceeded: ae,
    hasOwnLabel: Ce,
    isDisabled: $e,
    isLabeledByFormItem: Oe
  });
  return setStoreValue(e, { model: oe }), {
    elFormItem: le,
    inputId: Ne,
    isLabeledByFormItem: Oe,
    isChecked: de,
    isDisabled: $e,
    isGroup: re,
    checkboxSize: pe,
    hasOwnLabel: Ce,
    model: oe,
    handleChange: _e,
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
      onClickRoot: $e,
      focus: Ne
    } = useCheckbox(k, oe), Oe = useNamespace("checkbox");
    return (_e, he) => (openBlock(), createBlock(resolveDynamicComponent(!unref(de) && unref(ae) ? "span" : "label"), {
      class: normalizeClass([
        unref(Oe).b(),
        unref(Oe).m(unref(ue)),
        unref(Oe).is("disabled", unref(ie)),
        unref(Oe).is("bordered", _e.border),
        unref(Oe).is("checked", unref(le))
      ]),
      "aria-controls": _e.indeterminate ? _e.controls : null,
      onClick: unref($e)
    }, {
      default: withCtx(() => [
        createElementVNode("span", {
          class: normalizeClass([
            unref(Oe).e("input"),
            unref(Oe).is("disabled", unref(ie)),
            unref(Oe).is("checked", unref(le)),
            unref(Oe).is("indeterminate", _e.indeterminate),
            unref(Oe).is("focus", unref(Ne))
          ]),
          tabindex: _e.indeterminate ? 0 : void 0,
          role: _e.indeterminate ? "checkbox" : void 0,
          "aria-checked": _e.indeterminate ? "mixed" : void 0
        }, [
          _e.trueLabel || _e.falseLabel ? withDirectives((openBlock(), createElementBlock("input", {
            key: 0,
            id: unref(re),
            "onUpdate:modelValue": he[0] || (he[0] = (Ve) => isRef(pe) ? pe.value = Ve : null),
            class: normalizeClass(unref(Oe).e("original")),
            type: "checkbox",
            "aria-hidden": _e.indeterminate ? "true" : "false",
            name: _e.name,
            tabindex: _e.tabindex,
            disabled: unref(ie),
            "true-value": _e.trueLabel,
            "false-value": _e.falseLabel,
            onChange: he[1] || (he[1] = (...Ve) => unref(Ce) && unref(Ce)(...Ve)),
            onFocus: he[2] || (he[2] = (Ve) => Ne.value = !0),
            onBlur: he[3] || (he[3] = (Ve) => Ne.value = !1)
          }, null, 42, _hoisted_2$g)), [
            [vModelCheckbox, unref(pe)]
          ]) : withDirectives((openBlock(), createElementBlock("input", {
            key: 1,
            id: unref(re),
            "onUpdate:modelValue": he[4] || (he[4] = (Ve) => isRef(pe) ? pe.value = Ve : null),
            class: normalizeClass(unref(Oe).e("original")),
            type: "checkbox",
            "aria-hidden": _e.indeterminate ? "true" : "false",
            disabled: unref(ie),
            value: _e.label,
            name: _e.name,
            tabindex: _e.tabindex,
            onChange: he[5] || (he[5] = (...Ve) => unref(Ce) && unref(Ce)(...Ve)),
            onFocus: he[6] || (he[6] = (Ve) => Ne.value = !0),
            onBlur: he[7] || (he[7] = (Ve) => Ne.value = !1)
          }, null, 42, _hoisted_3$a)), [
            [vModelCheckbox, unref(pe)]
          ]),
          createElementVNode("span", {
            class: normalizeClass(unref(Oe).e("inner"))
          }, null, 2)
        ], 10, _hoisted_1$o),
        unref(de) ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: normalizeClass(unref(Oe).e("label"))
        }, [
          renderSlot(_e.$slots, "default"),
          _e.$slots.default ? createCommentVNode("v-if", !0) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createTextVNode(toDisplayString(_e.label), 1)
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
    const k = e, oe = useSlots(), { focus: re, isChecked: ae, isDisabled: le, size: ie, model: ue, handleChange: de } = useCheckbox(k, oe), { checkboxGroup: pe } = useCheckboxGroup(), Ce = useNamespace("checkbox"), $e = computed(() => {
      var Ne, Oe, _e, he;
      const Ve = (Oe = (Ne = pe == null ? void 0 : pe.fill) == null ? void 0 : Ne.value) != null ? Oe : "";
      return {
        backgroundColor: Ve,
        borderColor: Ve,
        color: (he = (_e = pe == null ? void 0 : pe.textColor) == null ? void 0 : _e.value) != null ? he : "",
        boxShadow: Ve ? `-1px 0 0 0 ${Ve}` : void 0
      };
    });
    return (Ne, Oe) => (openBlock(), createElementBlock("label", {
      class: normalizeClass([
        unref(Ce).b("button"),
        unref(Ce).bm("button", unref(ie)),
        unref(Ce).is("disabled", unref(le)),
        unref(Ce).is("checked", unref(ae)),
        unref(Ce).is("focus", unref(re))
      ])
    }, [
      Ne.trueLabel || Ne.falseLabel ? withDirectives((openBlock(), createElementBlock("input", {
        key: 0,
        "onUpdate:modelValue": Oe[0] || (Oe[0] = (_e) => isRef(ue) ? ue.value = _e : null),
        class: normalizeClass(unref(Ce).be("button", "original")),
        type: "checkbox",
        name: Ne.name,
        tabindex: Ne.tabindex,
        disabled: unref(le),
        "true-value": Ne.trueLabel,
        "false-value": Ne.falseLabel,
        onChange: Oe[1] || (Oe[1] = (..._e) => unref(de) && unref(de)(..._e)),
        onFocus: Oe[2] || (Oe[2] = (_e) => re.value = !0),
        onBlur: Oe[3] || (Oe[3] = (_e) => re.value = !1)
      }, null, 42, _hoisted_1$n)), [
        [vModelCheckbox, unref(ue)]
      ]) : withDirectives((openBlock(), createElementBlock("input", {
        key: 1,
        "onUpdate:modelValue": Oe[4] || (Oe[4] = (_e) => isRef(ue) ? ue.value = _e : null),
        class: normalizeClass(unref(Ce).be("button", "original")),
        type: "checkbox",
        name: Ne.name,
        tabindex: Ne.tabindex,
        disabled: unref(le),
        value: Ne.label,
        onChange: Oe[5] || (Oe[5] = (..._e) => unref(de) && unref(de)(..._e)),
        onFocus: Oe[6] || (Oe[6] = (_e) => re.value = !0),
        onBlur: Oe[7] || (Oe[7] = (_e) => re.value = !1)
      }, null, 42, _hoisted_2$f)), [
        [vModelCheckbox, unref(ue)]
      ]),
      Ne.$slots.default || Ne.label ? (openBlock(), createElementBlock("span", {
        key: 2,
        class: normalizeClass(unref(Ce).be("button", "inner")),
        style: normalizeStyle(unref(ae) ? unref($e) : void 0)
      }, [
        renderSlot(Ne.$slots, "default", {}, () => [
          createTextVNode(toDisplayString(Ne.label), 1)
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
      oe.validateEvent && ((Ce = re.validate) == null || Ce.call(re, "change").catch(($e) => debugWarn($e)));
    }), (Ce, $e) => (openBlock(), createBlock(resolveDynamicComponent(Ce.tag), {
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
    return ($e, Ne) => {
      var Oe;
      return openBlock(), createElementBlock("label", {
        class: normalizeClass([
          unref(re).b(),
          unref(re).is("disabled", unref(de)),
          unref(re).is("focus", unref(ie)),
          unref(re).is("bordered", $e.border),
          unref(re).is("checked", unref(pe) === $e.label),
          unref(re).m(unref(ue))
        ])
      }, [
        createElementVNode("span", {
          class: normalizeClass([
            unref(re).e("input"),
            unref(re).is("disabled", unref(de)),
            unref(re).is("checked", unref(pe) === $e.label)
          ])
        }, [
          withDirectives(createElementVNode("input", {
            ref_key: "radioRef",
            ref: ae,
            "onUpdate:modelValue": Ne[0] || (Ne[0] = (_e) => isRef(pe) ? pe.value = _e : null),
            class: normalizeClass(unref(re).e("original")),
            value: $e.label,
            name: $e.name || ((Oe = unref(le)) == null ? void 0 : Oe.name),
            disabled: unref(de),
            type: "radio",
            onFocus: Ne[1] || (Ne[1] = (_e) => ie.value = !0),
            onBlur: Ne[2] || (Ne[2] = (_e) => ie.value = !1),
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
          onKeydown: Ne[3] || (Ne[3] = withModifiers(() => {
          }, ["stop"]))
        }, [
          renderSlot($e.$slots, "default", {}, () => [
            createTextVNode(toDisplayString($e.label), 1)
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
    return (Ce, $e) => {
      var Ne;
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
          "onUpdate:modelValue": $e[0] || ($e[0] = (Oe) => isRef(ue) ? ue.value = Oe : null),
          class: normalizeClass(unref(oe).be("button", "original-radio")),
          value: Ce.label,
          type: "radio",
          name: Ce.name || ((Ne = unref(de)) == null ? void 0 : Ne.name),
          disabled: unref(ie),
          onFocus: $e[1] || ($e[1] = (Oe) => ae.value = !0),
          onBlur: $e[2] || ($e[2] = (Oe) => ae.value = !1)
        }, null, 42, _hoisted_1$l), [
          [vModelRadio, unref(ue)]
        ]),
        createElementVNode("span", {
          class: normalizeClass(unref(oe).be("button", "inner")),
          style: normalizeStyle(unref(ue) === Ce.label ? unref(pe) : {}),
          onKeydown: $e[3] || ($e[3] = withModifiers(() => {
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
    }), pe = ($e) => {
      k(UPDATE_MODEL_EVENT, $e), nextTick(() => k("change", $e));
    };
    onMounted(() => {
      const $e = le.value.querySelectorAll("[type=radio]"), Ne = $e[0];
      !Array.from($e).some((Oe) => Oe.checked) && Ne && (Ne.tabIndex = 0);
    });
    const Ce = computed(() => oe.name || ae.value);
    return provide(radioGroupKey, reactive({
      ...toRefs(oe),
      changeEvent: pe,
      name: Ce
    })), watch(() => oe.modelValue, () => {
      oe.validateEvent && (ie == null || ie.validate("change").catch(($e) => debugWarn($e)));
    }), ($e, Ne) => (openBlock(), createElementBlock("div", {
      id: unref(ue),
      ref_key: "radioGroupRef",
      ref: le,
      class: normalizeClass(unref(re).b("group")),
      role: "radiogroup",
      "aria-label": unref(de) ? void 0 : $e.label || "radio-group",
      "aria-labelledby": unref(de) ? unref(ie).labelId : void 0
    }, [
      renderSlot($e.$slots, "default")
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
    }), de = computed(() => e.node.isDisabled), pe = computed(() => e.node.isLeaf), Ce = computed(() => ie.value && !pe.value || !de.value), $e = computed(() => Oe(oe.expandingNode)), Ne = computed(() => ie.value && oe.checkedNodes.some(Oe)), Oe = (Fe) => {
      var Pt;
      const { level: vn, uid: En } = e.node;
      return ((Pt = Fe == null ? void 0 : Fe.pathNodes[vn - 1]) == null ? void 0 : Pt.uid) === En;
    }, _e = () => {
      $e.value || oe.expandNode(e.node);
    }, he = (Fe) => {
      const { node: Pt } = e;
      Fe !== Pt.checked && oe.handleCheckChange(Pt, Fe);
    }, Ve = () => {
      oe.lazyLoad(e.node, () => {
        pe.value || _e();
      });
    }, Ie = (Fe) => {
      !ae.value || (ze(), !pe.value && k("expand", Fe));
    }, ze = () => {
      const { node: Fe } = e;
      !Ce.value || Fe.loading || (Fe.loaded ? _e() : Ve());
    }, xe = () => {
      ae.value && !pe.value || (pe.value && !de.value && !ie.value && !le.value ? At(!0) : ze());
    }, Ue = (Fe) => {
      ie.value ? (he(Fe), e.node.loaded && _e()) : At(Fe);
    }, At = (Fe) => {
      e.node.loaded ? (he(Fe), !ie.value && _e()) : Ve();
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
      inExpandingPath: $e,
      inCheckedPath: Ne,
      ns: re,
      handleHoverExpand: Ie,
      handleExpand: ze,
      handleClick: xe,
      handleCheck: At,
      handleSelectCheck: Ue
    };
  }
}), _hoisted_1$j = ["id", "aria-haspopup", "aria-owns", "aria-expanded", "tabindex"], _hoisted_2$e = /* @__PURE__ */ createElementVNode("span", null, null, -1);
function _sfc_render$d(e, k, oe, re, ae, le) {
  const ie = resolveComponent("el-checkbox"), ue = resolveComponent("el-radio"), de = resolveComponent("check"), pe = resolveComponent("el-icon"), Ce = resolveComponent("node-content"), $e = resolveComponent("loading"), Ne = resolveComponent("arrow-right");
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
    onMouseenter: k[2] || (k[2] = (...Oe) => e.handleHoverExpand && e.handleHoverExpand(...Oe)),
    onFocus: k[3] || (k[3] = (...Oe) => e.handleHoverExpand && e.handleHoverExpand(...Oe)),
    onClick: k[4] || (k[4] = (...Oe) => e.handleClick && e.handleClick(...Oe))
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
          createVNode($e)
        ]),
        _: 1
      }, 8, ["class"])) : (openBlock(), createBlock(pe, {
        key: 1,
        class: normalizeClass(["arrow-right", e.ns.e("postfix")])
      }, {
        default: withCtx(() => [
          createVNode(Ne)
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
    const ue = inject(CASCADER_PANEL_INJECTION_KEY), de = ref(null), pe = computed(() => !e.nodes.length), Ce = computed(() => !ue.initialLoaded), $e = computed(() => `cascader-menu-${ae}-${e.index}`), Ne = (Ve) => {
      le = Ve.target;
    }, Oe = (Ve) => {
      if (!(!ue.isHoverMenu || !le || !de.value))
        if (le.contains(Ve.target)) {
          _e();
          const Ie = k.vnode.el, { left: ze } = Ie.getBoundingClientRect(), { offsetWidth: xe, offsetHeight: Ue } = Ie, At = Ve.clientX - ze, Fe = le.offsetTop, Pt = Fe + le.offsetHeight;
          de.value.innerHTML = `
          <path style="pointer-events: auto;" fill="transparent" d="M${At} ${Fe} L${xe} 0 V${Fe} Z" />
          <path style="pointer-events: auto;" fill="transparent" d="M${At} ${Pt} L${xe} ${Ue} V${Pt} Z" />
        `;
        } else
          ie || (ie = window.setTimeout(he, ue.config.hoverThreshold));
    }, _e = () => {
      !ie || (clearTimeout(ie), ie = null);
    }, he = () => {
      !de.value || (de.value.innerHTML = "", _e());
    };
    return {
      ns: oe,
      panel: ue,
      hoverZone: de,
      isEmpty: pe,
      isLoading: Ce,
      menuId: $e,
      t: re,
      handleExpand: Ne,
      handleMouseMove: Oe,
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
        (openBlock(!0), createElementBlock(Fragment, null, renderList(e.nodes, ($e) => (openBlock(), createBlock(ie, {
          key: $e.uid,
          node: $e,
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
    const ue = ref(!0), de = ref([]), pe = ref(null), Ce = ref([]), $e = ref(null), Ne = ref([]), Oe = computed(() => le.value.expandTrigger === ExpandTrigger.HOVER), _e = computed(() => e.renderLabel || oe.default), he = () => {
      const { options: wn } = e, Dt = le.value;
      re = !1, ie = new Store(wn, Dt), Ce.value = [ie.getNodes()], Dt.lazy && isEmpty(e.options) ? (ue.value = !1, Ve(void 0, (Lt) => {
        Lt && (ie = new Store(Lt, Dt), Ce.value = [ie.getNodes()]), ue.value = !0, vn(!1, !0);
      })) : vn(!1, !0);
    }, Ve = (wn, Dt) => {
      const Lt = le.value;
      wn = wn || new Node({}, Lt, void 0, !0), wn.loading = !0;
      const bn = (jt) => {
        const Cn = wn, kt = Cn.root ? null : Cn;
        jt && (ie == null || ie.appendNodes(jt, kt)), Cn.loading = !1, Cn.loaded = !0, Cn.childrenData = Cn.childrenData || [], Dt && Dt(jt);
      };
      Lt.lazyLoad(wn, bn);
    }, Ie = (wn, Dt) => {
      var Lt;
      const { level: bn } = wn, jt = Ce.value.slice(0, bn);
      let Cn;
      wn.isLeaf ? Cn = wn.pathNodes[bn - 2] : (Cn = wn, jt.push(wn.children)), ((Lt = $e.value) == null ? void 0 : Lt.uid) !== (Cn == null ? void 0 : Cn.uid) && ($e.value = wn, Ce.value = jt, !Dt && k("expand-change", (wn == null ? void 0 : wn.pathValues) || []));
    }, ze = (wn, Dt, Lt = !0) => {
      const { checkStrictly: bn, multiple: jt } = le.value, Cn = Ne.value[0];
      re = !0, !jt && (Cn == null || Cn.doCheck(!1)), wn.doCheck(Dt), Pt(), Lt && !jt && !bn && k("close"), !Lt && !jt && !bn && xe(wn);
    }, xe = (wn) => {
      !wn || (wn = wn.parent, xe(wn), wn && Ie(wn));
    }, Ue = (wn) => ie == null ? void 0 : ie.getFlattedNodes(wn), At = (wn) => {
      var Dt;
      return (Dt = Ue(wn)) == null ? void 0 : Dt.filter((Lt) => Lt.checked !== !1);
    }, Fe = () => {
      Ne.value.forEach((wn) => wn.doCheck(!1)), Pt();
    }, Pt = () => {
      var wn;
      const { checkStrictly: Dt, multiple: Lt } = le.value, bn = Ne.value, jt = At(!Dt), Cn = sortByOriginalOrder(bn, jt), kt = Cn.map((Et) => Et.valueByOption);
      Ne.value = Cn, pe.value = Lt ? kt : (wn = kt[0]) != null ? wn : null;
    }, vn = (wn = !1, Dt = !1) => {
      const { modelValue: Lt } = e, { lazy: bn, multiple: jt, checkStrictly: Cn } = le.value, kt = !Cn;
      if (!(!ue.value || re || !Dt && isEqual(Lt, pe.value)))
        if (bn && !wn) {
          const _n = unique(flattenDeep(castArray(Lt))).map((Pn) => ie == null ? void 0 : ie.getNodeByValue(Pn)).filter((Pn) => !!Pn && !Pn.loaded && !Pn.loading);
          _n.length ? _n.forEach((Pn) => {
            Ve(Pn, () => vn(!1, Dt));
          }) : vn(!0, Dt);
        } else {
          const Et = jt ? castArray(Lt) : [Lt], _n = unique(Et.map((Pn) => ie == null ? void 0 : ie.getNodeByValue(Pn, kt)));
          En(_n, Dt), pe.value = Lt;
        }
    }, En = (wn, Dt = !0) => {
      const { checkStrictly: Lt } = le.value, bn = Ne.value, jt = wn.filter((Et) => !!Et && (Lt || Et.isLeaf)), Cn = ie == null ? void 0 : ie.getSameNode($e.value), kt = Dt && Cn || jt[0];
      kt ? kt.pathNodes.forEach((Et) => Ie(Et, !0)) : $e.value = null, bn.forEach((Et) => Et.doCheck(!1)), jt.forEach((Et) => Et.doCheck(!0)), Ne.value = jt, nextTick($n);
    }, $n = () => {
      !isClient$1 || de.value.forEach((wn) => {
        const Dt = wn == null ? void 0 : wn.$el;
        if (Dt) {
          const Lt = Dt.querySelector(`.${ae.namespace.value}-scrollbar__wrap`), bn = Dt.querySelector(`.${ae.b("node")}.${ae.is("active")}`) || Dt.querySelector(`.${ae.b("node")}.in-active-path`);
          scrollIntoView(Lt, bn);
        }
      });
    }, kn = (wn) => {
      const Dt = wn.target, { code: Lt } = wn;
      switch (Lt) {
        case EVENT_CODE.up:
        case EVENT_CODE.down: {
          wn.preventDefault();
          const bn = Lt === EVENT_CODE.up ? -1 : 1;
          focusNode(getSibling(Dt, bn, `.${ae.b("node")}[tabindex="-1"]`));
          break;
        }
        case EVENT_CODE.left: {
          wn.preventDefault();
          const bn = de.value[getMenuIndex(Dt) - 1], jt = bn == null ? void 0 : bn.$el.querySelector(`.${ae.b("node")}[aria-expanded="true"]`);
          focusNode(jt);
          break;
        }
        case EVENT_CODE.right: {
          wn.preventDefault();
          const bn = de.value[getMenuIndex(Dt) + 1], jt = bn == null ? void 0 : bn.$el.querySelector(`.${ae.b("node")}[tabindex="-1"]`);
          focusNode(jt);
          break;
        }
        case EVENT_CODE.enter:
          checkNode(Dt);
          break;
      }
    };
    return provide(CASCADER_PANEL_INJECTION_KEY, reactive({
      config: le,
      expandingNode: $e,
      checkedNodes: Ne,
      isHoverMenu: Oe,
      initialLoaded: ue,
      renderLabelFn: _e,
      lazyLoad: Ve,
      expandNode: Ie,
      handleCheckChange: ze
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
      checkedNodes: Ne,
      handleKeyDown: kn,
      handleCheckChange: ze,
      getFlattedNodes: Ue,
      getCheckedNodes: At,
      clearCheckedNodes: Fe,
      calculateCheckedValue: Pt,
      scrollToExpandingNode: $n
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
      const { type: de, hit: pe, effect: Ce, closable: $e, round: Ne } = oe;
      return [
        ae.b(),
        ae.is("closable", $e),
        ae.m(de),
        ae.m(re.value),
        ae.m(Ce),
        ae.is("hit", pe),
        ae.is("round", Ne)
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
    const ae = useNamespace("cascader"), le = useNamespace("input"), { t: ie } = useLocale(), ue = inject(formContextKey, {}), de = inject(formItemContextKey, {}), pe = ref(null), Ce = ref(null), $e = ref(null), Ne = ref(null), Oe = ref(null), _e = ref(!1), he = ref(!1), Ve = ref(!1), Ie = ref(""), ze = ref(""), xe = ref([]), Ue = ref([]), At = ref([]), Fe = ref(!1), Pt = computed(() => e.disabled || ue.disabled), vn = computed(() => e.placeholder || ie("el.cascader.placeholder")), En = useSize(), $n = computed(() => ["small"].includes(En.value) ? "small" : "default"), kn = computed(() => !!e.props.multiple), wn = computed(() => !e.filterable || kn.value), Dt = computed(() => kn.value ? ze.value : Ie.value), Lt = computed(() => {
      var zn;
      return ((zn = Ne.value) == null ? void 0 : zn.checkedNodes) || [];
    }), bn = computed(() => !e.clearable || Pt.value || Ve.value || !he.value ? !1 : !!Lt.value.length), jt = computed(() => {
      const { showAllLevels: zn, separator: Hn } = e, Gn = Lt.value;
      return Gn.length ? kn.value ? " " : Gn[0].calcText(zn, Hn) : "";
    }), Cn = computed({
      get() {
        return e.modelValue;
      },
      set(zn) {
        var Hn;
        k(UPDATE_MODEL_EVENT, zn), k(CHANGE_EVENT, zn), e.validateEvent && ((Hn = de.validate) == null || Hn.call(de, "change").catch((Gn) => debugWarn(Gn)));
      }
    }), kt = computed(() => {
      var zn, Hn;
      return (Hn = (zn = pe.value) == null ? void 0 : zn.popperRef) == null ? void 0 : Hn.contentRef;
    }), Et = (zn) => {
      var Hn, Gn, Zn;
      if (!Pt.value && (zn = zn != null ? zn : !_e.value, zn !== _e.value)) {
        if (_e.value = zn, (Gn = (Hn = Ce.value) == null ? void 0 : Hn.input) == null || Gn.setAttribute("aria-expanded", `${zn}`), zn)
          _n(), nextTick((Zn = Ne.value) == null ? void 0 : Zn.scrollToExpandingNode);
        else if (e.filterable) {
          const { value: lo } = jt;
          Ie.value = lo, ze.value = lo;
        }
        k("visible-change", zn);
      }
    }, _n = () => {
      nextTick(() => {
        var zn;
        (zn = pe.value) == null || zn.updatePopper();
      });
    }, Pn = () => {
      Ve.value = !1;
    }, hn = (zn) => {
      const { showAllLevels: Hn, separator: Gn } = e;
      return {
        node: zn,
        key: zn.uid,
        text: zn.calcText(Hn, Gn),
        hitState: !1,
        closable: !Pt.value && !zn.isDisabled,
        isCollapseTag: !1
      };
    }, On = (zn) => {
      var Hn;
      const Gn = zn.node;
      Gn.doCheck(!1), (Hn = Ne.value) == null || Hn.calculateCheckedValue(), k("remove-tag", Gn.valueByOption);
    }, Dn = () => {
      if (!kn.value)
        return;
      const zn = Lt.value, Hn = [], Gn = [];
      if (zn.forEach((Zn) => Gn.push(hn(Zn))), Ue.value = Gn, zn.length) {
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
      const { filterMethod: Gn, showAllLevels: Zn, separator: lo } = e, ao = (Hn = (zn = Ne.value) == null ? void 0 : zn.getFlattedNodes(!e.props.checkStrictly)) == null ? void 0 : Hn.filter((In) => In.isDisabled ? !1 : (In.calcText(Zn, lo), Gn(In, Dt.value)));
      kn.value && (xe.value.forEach((In) => {
        In.hitState = !1;
      }), Ue.value.forEach((In) => {
        In.hitState = !1;
      })), Ve.value = !0, At.value = ao, _n();
    }, Fn = () => {
      var zn;
      let Hn;
      Ve.value && Oe.value ? Hn = Oe.value.$el.querySelector(`.${ae.e("suggestion-item")}`) : Hn = (zn = Ne.value) == null ? void 0 : zn.$el.querySelector(`.${ae.b("node")}[tabindex="-1"]`), Hn && (Hn.focus(), !Ve.value && Hn.click());
    }, Nn = () => {
      var zn, Hn;
      const Gn = (zn = Ce.value) == null ? void 0 : zn.input, Zn = $e.value, lo = (Hn = Oe.value) == null ? void 0 : Hn.$el;
      if (!(!isClient$1 || !Gn)) {
        if (lo) {
          const ao = lo.querySelector(`.${ae.e("suggestion-list")}`);
          ao.style.minWidth = `${Gn.offsetWidth}px`;
        }
        if (Zn) {
          const { offsetHeight: ao } = Zn, In = xe.value.length > 0 ? `${Math.max(ao + 6, oe)}px` : `${oe}px`;
          Gn.style.height = In, _n();
        }
      }
    }, Bn = (zn) => {
      var Hn;
      return (Hn = Ne.value) == null ? void 0 : Hn.getCheckedNodes(zn);
    }, Vn = (zn) => {
      _n(), k("expand-change", zn);
    }, An = (zn) => {
      var Hn;
      const Gn = (Hn = zn.target) == null ? void 0 : Hn.value;
      if (zn.type === "compositionend")
        Fe.value = !1, nextTick(() => oo(Gn));
      else {
        const Zn = Gn[Gn.length - 1] || "";
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
            _e.value === !0 && (zn.preventDefault(), zn.stopPropagation(), Et(!1));
            break;
          case EVENT_CODE.tab:
            Et(!1);
            break;
        }
    }, Yn = () => {
      var zn;
      (zn = Ne.value) == null || zn.clearCheckedNodes(), Et(!1);
    }, Xn = (zn) => {
      var Hn, Gn;
      const { checked: Zn } = zn;
      kn.value ? (Hn = Ne.value) == null || Hn.handleCheckChange(zn, !Zn, !1) : (!Zn && ((Gn = Ne.value) == null || Gn.handleCheckChange(zn, !0, !1)), Et(!1));
    }, eo = (zn) => {
      const Hn = zn.target, { code: Gn } = zn;
      switch (Gn) {
        case EVENT_CODE.up:
        case EVENT_CODE.down: {
          const Zn = Gn === EVENT_CODE.up ? -1 : 1;
          focusNode(getSibling(Hn, Zn, `.${ae.e("suggestion-item")}[tabindex="-1"]`));
          break;
        }
        case EVENT_CODE.enter:
          Hn.click();
          break;
      }
    }, qn = () => {
      const zn = xe.value, Hn = zn[zn.length - 1];
      re = ze.value ? 0 : re + 1, !(!Hn || !re) && (Hn.hitState ? On(Hn) : Hn.hitState = !0);
    }, no = debounce(() => {
      const { value: zn } = Dt;
      if (!zn)
        return;
      const Hn = e.beforeFilter(zn);
      isPromise(Hn) ? Hn.then(Rn).catch(() => {
      }) : Hn !== !1 ? Rn() : Pn();
    }, e.debounce), oo = (zn, Hn) => {
      !_e.value && Et(!0), !(Hn != null && Hn.isComposing) && (zn ? no() : Pn());
    };
    return watch(Ve, _n), watch([Lt, Pt], Dn), watch(xe, () => {
      nextTick(() => Nn());
    }), watch(jt, (zn) => Ie.value = zn, { immediate: !0 }), onMounted(() => {
      var zn;
      const Hn = (zn = Ce.value) == null ? void 0 : zn.$el;
      oe = (Hn == null ? void 0 : Hn.offsetHeight) || INPUT_HEIGHT_MAP[En.value] || DEFAULT_INPUT_HEIGHT, useResizeObserver(Hn, Nn);
    }), {
      popperOptions,
      tooltipRef: pe,
      popperPaneRef: kt,
      input: Ce,
      tagWrapper: $e,
      panel: Ne,
      suggestionPanel: Oe,
      popperVisible: _e,
      inputHover: he,
      inputPlaceholder: vn,
      filtering: Ve,
      presentText: jt,
      checkedValue: Cn,
      inputValue: Ie,
      searchInputValue: ze,
      presentTags: xe,
      allPresentTags: Ue,
      suggestions: At,
      isDisabled: Pt,
      isOnComposition: Fe,
      realSize: En,
      tagSize: $n,
      multiple: kn,
      readonly: wn,
      clearBtnVisible: bn,
      nsCascader: ae,
      nsInput: le,
      t: ie,
      togglePopperVisible: Et,
      hideSuggestionPanel: Pn,
      deleteTag: On,
      focusFirstNode: Fn,
      getCheckedNodes: Bn,
      handleExpandChange: Vn,
      handleKeyDown: Wn,
      handleComposition: An,
      handleClear: Yn,
      handleSuggestionClick: Xn,
      handleSuggestionKeyDown: eo,
      handleDelete: qn,
      handleInput: oo
    };
  }
}), _hoisted_1$i = { key: 0 }, _hoisted_2$d = ["placeholder"], _hoisted_3$9 = ["onClick"];
function _sfc_render$a(e, k, oe, re, ae, le) {
  const ie = resolveComponent("circle-close"), ue = resolveComponent("el-icon"), de = resolveComponent("arrow-down"), pe = resolveComponent("el-input"), Ce = resolveComponent("el-tag"), $e = resolveComponent("el-tooltip"), Ne = resolveComponent("el-cascader-panel"), Oe = resolveComponent("check"), _e = resolveComponent("el-scrollbar"), he = resolveDirective("clickoutside");
  return openBlock(), createBlock($e, {
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
        onKeydown: k[12] || (k[12] = (...Ve) => e.handleKeyDown && e.handleKeyDown(...Ve)),
        onMouseenter: k[13] || (k[13] = (Ve) => e.inputHover = !0),
        onMouseleave: k[14] || (k[14] = (Ve) => e.inputHover = !1)
      }, [
        createVNode(pe, {
          ref: "input",
          modelValue: e.inputValue,
          "onUpdate:modelValue": k[1] || (k[1] = (Ve) => e.inputValue = Ve),
          placeholder: e.searchInputValue ? "" : e.inputPlaceholder,
          readonly: e.readonly,
          disabled: e.isDisabled,
          "validate-event": !1,
          size: e.realSize,
          class: normalizeClass(e.nsCascader.is("focus", e.popperVisible)),
          onCompositionstart: e.handleComposition,
          onCompositionupdate: e.handleComposition,
          onCompositionend: e.handleComposition,
          onFocus: k[2] || (k[2] = (Ve) => e.$emit("focus", Ve)),
          onBlur: k[3] || (k[3] = (Ve) => e.$emit("blur", Ve)),
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
              onClick: k[0] || (k[0] = withModifiers((Ve) => e.togglePopperVisible(), ["stop"]))
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
          (openBlock(!0), createElementBlock(Fragment, null, renderList(e.presentTags, (Ve) => (openBlock(), createBlock(Ce, {
            key: Ve.key,
            type: e.tagType,
            size: e.tagSize,
            hit: Ve.hitState,
            closable: Ve.closable,
            "disable-transitions": "",
            onClose: (Ie) => e.deleteTag(Ve)
          }, {
            default: withCtx(() => [
              Ve.isCollapseTag === !1 ? (openBlock(), createElementBlock("span", _hoisted_1$i, toDisplayString(Ve.text), 1)) : (openBlock(), createBlock($e, {
                key: 1,
                teleported: !1,
                disabled: e.popperVisible || !e.collapseTagsTooltip,
                "fallback-placements": ["bottom", "top", "right", "left"],
                placement: "bottom",
                effect: "light"
              }, {
                default: withCtx(() => [
                  createElementVNode("span", null, toDisplayString(Ve.text), 1)
                ]),
                content: withCtx(() => [
                  createElementVNode("div", {
                    class: normalizeClass(e.nsCascader.e("collapse-tags"))
                  }, [
                    (openBlock(!0), createElementBlock(Fragment, null, renderList(e.allPresentTags, (Ie, ze) => (openBlock(), createElementBlock("div", {
                      key: ze,
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
            "onUpdate:modelValue": k[4] || (k[4] = (Ve) => e.searchInputValue = Ve),
            type: "text",
            class: normalizeClass(e.nsCascader.e("search-input")),
            placeholder: e.presentText ? "" : e.inputPlaceholder,
            onInput: k[5] || (k[5] = (Ve) => e.handleInput(e.searchInputValue, Ve)),
            onClick: k[6] || (k[6] = withModifiers((Ve) => e.togglePopperVisible(!0), ["stop"])),
            onKeydown: k[7] || (k[7] = withKeys((...Ve) => e.handleDelete && e.handleDelete(...Ve), ["delete"])),
            onCompositionstart: k[8] || (k[8] = (...Ve) => e.handleComposition && e.handleComposition(...Ve)),
            onCompositionupdate: k[9] || (k[9] = (...Ve) => e.handleComposition && e.handleComposition(...Ve)),
            onCompositionend: k[10] || (k[10] = (...Ve) => e.handleComposition && e.handleComposition(...Ve))
          }, null, 42, _hoisted_2$d)), [
            [vModelText, e.searchInputValue]
          ]) : createCommentVNode("v-if", !0)
        ], 2)) : createCommentVNode("v-if", !0)
      ], 38)), [
        [he, () => e.togglePopperVisible(!1), e.popperPaneRef]
      ])
    ]),
    content: withCtx(() => [
      withDirectives(createVNode(Ne, {
        ref: "panel",
        modelValue: e.checkedValue,
        "onUpdate:modelValue": k[15] || (k[15] = (Ve) => e.checkedValue = Ve),
        options: e.options,
        props: e.props,
        border: !1,
        "render-label": e.$slots.default,
        onExpandChange: e.handleExpandChange,
        onClose: k[16] || (k[16] = (Ve) => e.$nextTick(() => e.togglePopperVisible(!1)))
      }, null, 8, ["modelValue", "options", "props", "render-label", "onExpandChange"]), [
        [vShow, !e.filtering]
      ]),
      e.filterable ? withDirectives((openBlock(), createBlock(_e, {
        key: 0,
        ref: "suggestionPanel",
        tag: "ul",
        class: normalizeClass(e.nsCascader.e("suggestion-panel")),
        "view-class": e.nsCascader.e("suggestion-list"),
        onKeydown: e.handleSuggestionKeyDown
      }, {
        default: withCtx(() => [
          e.suggestions.length ? (openBlock(!0), createElementBlock(Fragment, { key: 0 }, renderList(e.suggestions, (Ve) => (openBlock(), createElementBlock("li", {
            key: Ve.uid,
            class: normalizeClass([
              e.nsCascader.e("suggestion-item"),
              e.nsCascader.is("checked", Ve.checked)
            ]),
            tabindex: -1,
            onClick: (Ie) => e.handleSuggestionClick(Ve)
          }, [
            createElementVNode("span", null, toDisplayString(Ve.text), 1),
            Ve.checked ? (openBlock(), createBlock(ue, { key: 0 }, {
              default: withCtx(() => [
                createVNode(Oe)
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
        isNumber(k[pe]) ? ie.push(re.b(`${pe}-${k[pe]}`)) : isObject$1(k[pe]) && Object.entries(k[pe]).forEach(([Ce, $e]) => {
          ie.push(Ce !== "span" ? re.b(`${pe}-${Ce}-${$e}`) : re.b(`${pe}-${$e}`));
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
        var Ce = this.$utils(), $e = (ue || "YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g, function(Ne) {
          switch (Ne) {
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
              return Ce.s(de.week(), Ne === "w" ? 1 : 2, "0");
            case "W":
            case "WW":
              return Ce.s(de.isoWeek(), Ne === "W" ? 1 : 2, "0");
            case "k":
            case "kk":
              return Ce.s(String(de.$H === 0 ? 24 : de.$H), Ne === "k" ? 1 : 2, "0");
            case "X":
              return Math.floor(de.$d.getTime() / 1e3);
            case "x":
              return de.$d.getTime();
            case "z":
              return "[" + de.offsetName() + "]";
            case "zzz":
              return "[" + de.offsetName("long") + "]";
            default:
              return Ne;
          }
        });
        return ie.bind(this)($e);
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
          var Ce = ie(this).startOf(re).add(1, re).date(pe), $e = ie(this).endOf(oe);
          if (Ce.isBefore($e))
            return 1;
        }
        var Ne = ie(this).startOf(re).date(pe).startOf(oe).subtract(1, "millisecond"), Oe = this.diff(Ne, oe, !0);
        return Oe < 0 ? ie(this).startOf("week").week() : Math.ceil(Oe);
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
    const $e = k[Ce];
    for (let Ne = 0; Ne < e.column; Ne++) {
      let Oe = $e[Ne + oe];
      Oe || (Oe = {
        row: Ce,
        column: Ne,
        type: "normal",
        inRange: !1,
        start: !1,
        end: !1
      });
      const _e = Ce * e.column + Ne, he = ue(_e);
      Oe.dayjs = he, Oe.date = he.toDate(), Oe.timestamp = he.valueOf(), Oe.type = "normal", Oe.inRange = !!(re && he.isSameOrAfter(re, ie) && ae && he.isSameOrBefore(ae, ie)) || !!(re && he.isSameOrBefore(re, ie) && ae && he.isSameOrAfter(ae, ie)), re != null && re.isSameOrAfter(ae) ? (Oe.start = !!ae && he.isSame(ae, ie), Oe.end = re && he.isSame(re, ie)) : (Oe.start = !!re && he.isSame(re, ie), Oe.end = !!ae && he.isSame(ae, ie)), he.isSame(le, ie) && (Oe.type = "today"), de == null || de(Oe, { rowIndex: Ce, columnIndex: Ne }), $e[Ne + oe] = Oe;
    }
    pe == null || pe($e);
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
    const re = e, ae = useNamespace("date-table"), { t: le, lang: ie } = useLocale(), ue = ref(), de = ref(), pe = ref(), Ce = ref(), $e = ref([[], [], [], [], [], []]);
    let Ne = !1;
    const Oe = re.date.$locale().weekStart || 7, _e = re.date.locale("en").localeData().weekdaysShort().map((hn) => hn.toLowerCase()), he = computed(() => Oe > 3 ? 7 - Oe : -Oe), Ve = computed(() => {
      const hn = re.date.startOf("month");
      return hn.subtract(hn.day() || 7, "day");
    }), Ie = computed(() => _e.concat(_e).slice(Oe, Oe + 7)), ze = computed(() => vn.value.flat().some((hn) => hn.isCurrent)), xe = computed(() => {
      const hn = re.date.startOf("month"), On = hn.day() || 7, Dn = hn.daysInMonth(), Rn = hn.subtract(1, "month").daysInMonth();
      return {
        startOfMonthDay: On,
        dateCountOfMonth: Dn,
        dateCountOfLastMonth: Rn
      };
    }), Ue = computed(() => re.selectionMode === "dates" ? castArray(re.parsedValue) : []), At = (hn, {
      count: On,
      rowIndex: Dn,
      columnIndex: Rn
    }) => {
      const { startOfMonthDay: Fn, dateCountOfMonth: Nn, dateCountOfLastMonth: Bn } = unref(xe), Vn = unref(he);
      if (Dn >= 0 && Dn <= 1) {
        const An = Fn + Vn < 0 ? 7 + Fn + Vn : Fn + Vn;
        if (Rn + Dn * 7 >= An)
          return hn.text = On, !0;
        hn.text = Bn - (An - Rn % 7) + 1 + Dn * 7, hn.type = "prev-month";
      } else
        return On <= Nn ? hn.text = On : (hn.text = On - Nn, hn.type = "next-month"), !0;
      return !1;
    }, Fe = (hn, {
      columnIndex: On,
      rowIndex: Dn
    }, Rn) => {
      const { disabledDate: Fn, cellClassName: Nn } = re, Bn = unref(Ue), Vn = At(hn, { count: Rn, rowIndex: Dn, columnIndex: On }), An = hn.dayjs.toDate();
      return hn.selected = Bn.find((Wn) => Wn.valueOf() === hn.dayjs.valueOf()), hn.isSelected = !!hn.selected, hn.isCurrent = kn(hn), hn.disabled = Fn == null ? void 0 : Fn(An), hn.customClass = Nn == null ? void 0 : Nn(An), Vn;
    }, Pt = (hn) => {
      if (re.selectionMode === "week") {
        const [On, Dn] = re.showWeekNumber ? [1, 7] : [0, 6], Rn = Pn(hn[On + 1]);
        hn[On].inRange = Rn, hn[On].start = Rn, hn[Dn].inRange = Rn, hn[Dn].end = Rn;
      }
    }, vn = computed(() => {
      const { minDate: hn, maxDate: On, rangeState: Dn, showWeekNumber: Rn } = re, Fn = he.value, Nn = $e.value, Bn = "day";
      let Vn = 1;
      if (Rn)
        for (let An = 0; An < 6; An++)
          Nn[An][0] || (Nn[An][0] = {
            type: "week",
            text: Ve.value.add(An * 7 + 1, Bn).week()
          });
      return buildPickerTable({ row: 6, column: 7 }, Nn, {
        startDate: hn,
        columnIndexOffset: Rn ? 1 : 0,
        nextEndDate: Dn.endDate || On || Dn.selecting && hn || null,
        now: dayjs().locale(unref(ie)).startOf(Bn),
        unit: Bn,
        relativeDateGetter: (An) => Ve.value.add(An - Fn, Bn),
        setCellMetadata: (...An) => {
          Fe(...An, Vn) && (Vn += 1);
        },
        setRowMetadata: Pt
      }), Nn;
    });
    watch(() => re.date, async () => {
      var hn, On;
      (hn = ue.value) != null && hn.contains(document.activeElement) && (await nextTick(), (On = de.value) == null || On.focus());
    });
    const En = async () => {
      var hn;
      (hn = de.value) == null || hn.focus();
    }, $n = (hn = "") => ["normal", "today"].includes(hn), kn = (hn) => re.selectionMode === "date" && $n(hn.type) && wn(hn, re.parsedValue), wn = (hn, On) => On ? dayjs(On).locale(ie.value).isSame(re.date.date(Number(hn.text)), "day") : !1, Dt = (hn) => {
      const On = [];
      return $n(hn.type) && !hn.disabled ? (On.push("available"), hn.type === "today" && On.push("today")) : On.push(hn.type), kn(hn) && On.push("current"), hn.inRange && ($n(hn.type) || re.selectionMode === "week") && (On.push("in-range"), hn.start && On.push("start-date"), hn.end && On.push("end-date")), hn.disabled && On.push("disabled"), hn.selected && On.push("selected"), hn.customClass && On.push(hn.customClass), On.join(" ");
    }, Lt = (hn, On) => {
      const Dn = hn * 7 + (On - (re.showWeekNumber ? 1 : 0)) - he.value;
      return Ve.value.add(Dn, "day");
    }, bn = (hn) => {
      var On;
      if (!re.rangeState.selecting)
        return;
      let Dn = hn.target;
      if (Dn.tagName === "SPAN" && (Dn = (On = Dn.parentNode) == null ? void 0 : On.parentNode), Dn.tagName === "DIV" && (Dn = Dn.parentNode), Dn.tagName !== "TD")
        return;
      const Rn = Dn.parentNode.rowIndex - 1, Fn = Dn.cellIndex;
      vn.value[Rn][Fn].disabled || (Rn !== pe.value || Fn !== Ce.value) && (pe.value = Rn, Ce.value = Fn, oe("changerange", {
        selecting: !0,
        endDate: Lt(Rn, Fn)
      }));
    }, jt = (hn) => !ze.value && (hn == null ? void 0 : hn.text) === 1 && hn.type === "normal" || hn.isCurrent, Cn = (hn) => {
      Ne || ze.value || re.selectionMode !== "date" || _n(hn, !0);
    }, kt = (hn) => {
      !hn.target.closest("td") || (Ne = !0);
    }, Et = (hn) => {
      !hn.target.closest("td") || (Ne = !1);
    }, _n = (hn, On = !1) => {
      const Dn = hn.target.closest("td");
      if (!Dn)
        return;
      const Rn = Dn.parentNode.rowIndex - 1, Fn = Dn.cellIndex, Nn = vn.value[Rn][Fn];
      if (Nn.disabled || Nn.type === "week")
        return;
      const Bn = Lt(Rn, Fn);
      if (re.selectionMode === "range")
        !re.rangeState.selecting || !re.minDate ? (oe("pick", { minDate: Bn, maxDate: null }), oe("select", !0)) : (Bn >= re.minDate ? oe("pick", { minDate: re.minDate, maxDate: Bn }) : oe("pick", { minDate: Bn, maxDate: re.minDate }), oe("select", !1));
      else if (re.selectionMode === "date")
        oe("pick", Bn, On);
      else if (re.selectionMode === "week") {
        const Vn = Bn.week(), An = `${Bn.year()}w${Vn}`;
        oe("pick", {
          year: Bn.year(),
          week: Vn,
          value: An,
          date: Bn.startOf("week")
        });
      } else if (re.selectionMode === "dates") {
        const Vn = Nn.selected ? castArray(re.parsedValue).filter((An) => (An == null ? void 0 : An.valueOf()) !== Bn.valueOf()) : castArray(re.parsedValue).concat([Bn]);
        oe("pick", Vn);
      }
    }, Pn = (hn) => {
      if (re.selectionMode !== "week")
        return !1;
      let On = re.date.startOf("day");
      if (hn.type === "prev-month" && (On = On.subtract(1, "month")), hn.type === "next-month" && (On = On.add(1, "month")), On = On.date(Number.parseInt(hn.text, 10)), re.parsedValue && !Array.isArray(re.parsedValue)) {
        const Dn = (re.parsedValue.day() - Oe + 7) % 7 - 1;
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
      onMousemove: bn,
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
          (openBlock(!0), createElementBlock(Fragment, null, renderList(Dn, (Fn, Nn) => (openBlock(), createElementBlock("td", {
            key: `${Rn}.${Nn}`,
            ref_for: !0,
            ref: (Bn) => jt(Fn) && (de.value = Bn),
            class: normalizeClass(Dt(Fn)),
            "aria-current": Fn.isCurrent ? "date" : void 0,
            "aria-selected": Fn.isCurrent,
            tabindex: jt(Fn) ? 0 : -1,
            onFocus: Cn
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
    const re = e, ae = (Ue, At, Fe) => {
      const Pt = dayjs().locale(Fe).startOf("month").month(At).year(Ue), vn = Pt.daysInMonth();
      return rangeArr(vn).map((En) => Pt.add(En, "day").toDate());
    }, le = useNamespace("month-table"), { t: ie, lang: ue } = useLocale(), de = ref(), pe = ref(), Ce = ref(re.date.locale("en").localeData().monthsShort().map((Ue) => Ue.toLowerCase())), $e = ref([
      [],
      [],
      []
    ]), Ne = ref(), Oe = ref(), _e = computed(() => {
      var Ue, At;
      const Fe = $e.value, Pt = dayjs().locale(ue.value).startOf("month");
      for (let vn = 0; vn < 3; vn++) {
        const En = Fe[vn];
        for (let $n = 0; $n < 4; $n++) {
          const kn = En[$n] || (En[$n] = {
            row: vn,
            column: $n,
            type: "normal",
            inRange: !1,
            start: !1,
            end: !1,
            text: -1,
            disabled: !1
          });
          kn.type = "normal";
          const wn = vn * 4 + $n, Dt = re.date.startOf("year").month(wn), Lt = re.rangeState.endDate || re.maxDate || re.rangeState.selecting && re.minDate || null;
          kn.inRange = !!(re.minDate && Dt.isSameOrAfter(re.minDate, "month") && Lt && Dt.isSameOrBefore(Lt, "month")) || !!(re.minDate && Dt.isSameOrBefore(re.minDate, "month") && Lt && Dt.isSameOrAfter(Lt, "month")), (Ue = re.minDate) != null && Ue.isSameOrAfter(Lt) ? (kn.start = !!(Lt && Dt.isSame(Lt, "month")), kn.end = re.minDate && Dt.isSame(re.minDate, "month")) : (kn.start = !!(re.minDate && Dt.isSame(re.minDate, "month")), kn.end = !!(Lt && Dt.isSame(Lt, "month"))), Pt.isSame(Dt) && (kn.type = "today"), kn.text = wn, kn.disabled = ((At = re.disabledDate) == null ? void 0 : At.call(re, Dt.toDate())) || !1;
        }
      }
      return Fe;
    }), he = () => {
      var Ue;
      (Ue = pe.value) == null || Ue.focus();
    }, Ve = (Ue) => {
      const At = {}, Fe = re.date.year(), Pt = new Date(), vn = Ue.text;
      return At.disabled = re.disabledDate ? ae(Fe, vn, ue.value).every(re.disabledDate) : !1, At.current = castArray(re.parsedValue).findIndex((En) => dayjs.isDayjs(En) && En.year() === Fe && En.month() === vn) >= 0, At.today = Pt.getFullYear() === Fe && Pt.getMonth() === vn, Ue.inRange && (At["in-range"] = !0, Ue.start && (At["start-date"] = !0), Ue.end && (At["end-date"] = !0)), At;
    }, Ie = (Ue) => {
      const At = re.date.year(), Fe = Ue.text;
      return castArray(re.date).findIndex((Pt) => Pt.year() === At && Pt.month() === Fe) >= 0;
    }, ze = (Ue) => {
      var At;
      if (!re.rangeState.selecting)
        return;
      let Fe = Ue.target;
      if (Fe.tagName === "A" && (Fe = (At = Fe.parentNode) == null ? void 0 : At.parentNode), Fe.tagName === "DIV" && (Fe = Fe.parentNode), Fe.tagName !== "TD")
        return;
      const Pt = Fe.parentNode.rowIndex, vn = Fe.cellIndex;
      _e.value[Pt][vn].disabled || (Pt !== Ne.value || vn !== Oe.value) && (Ne.value = Pt, Oe.value = vn, oe("changerange", {
        selecting: !0,
        endDate: re.date.startOf("year").month(Pt * 4 + vn)
      }));
    }, xe = (Ue) => {
      var At;
      const Fe = (At = Ue.target) == null ? void 0 : At.closest("td");
      if ((Fe == null ? void 0 : Fe.tagName) !== "TD" || hasClass$1(Fe, "disabled"))
        return;
      const Pt = Fe.cellIndex, En = Fe.parentNode.rowIndex * 4 + Pt, $n = re.date.startOf("year").month(En);
      re.selectionMode === "range" ? re.rangeState.selecting ? (re.minDate && $n >= re.minDate ? oe("pick", { minDate: re.minDate, maxDate: $n }) : oe("pick", { minDate: $n, maxDate: re.minDate }), oe("select", !1)) : (oe("pick", { minDate: $n, maxDate: null }), oe("select", !0)) : oe("pick", En);
    };
    return watch(() => re.date, async () => {
      var Ue, At;
      (Ue = de.value) != null && Ue.contains(document.activeElement) && (await nextTick(), (At = pe.value) == null || At.focus());
    }), k({
      focus: he
    }), (Ue, At) => (openBlock(), createElementBlock("table", {
      role: "grid",
      "aria-label": unref(ie)("el.datepicker.monthTablePrompt"),
      class: normalizeClass(unref(le).b()),
      onClick: xe,
      onMousemove: ze
    }, [
      createElementVNode("tbody", {
        ref_key: "tbodyRef",
        ref: de
      }, [
        (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(_e), (Fe, Pt) => (openBlock(), createElementBlock("tr", { key: Pt }, [
          (openBlock(!0), createElementBlock(Fragment, null, renderList(Fe, (vn, En) => (openBlock(), createElementBlock("td", {
            key: En,
            ref_for: !0,
            ref: ($n) => Ie(vn) && (pe.value = $n),
            class: normalizeClass(Ve(vn)),
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
    const re = e, ae = (he, Ve) => {
      const Ie = dayjs(String(he)).locale(Ve).startOf("year"), xe = Ie.endOf("year").dayOfYear();
      return rangeArr(xe).map((Ue) => Ie.add(Ue, "day").toDate());
    }, le = useNamespace("year-table"), { t: ie, lang: ue } = useLocale(), de = ref(), pe = ref(), Ce = computed(() => Math.floor(re.date.year() / 10) * 10), $e = () => {
      var he;
      (he = pe.value) == null || he.focus();
    }, Ne = (he) => {
      const Ve = {}, Ie = dayjs().locale(ue.value);
      return Ve.disabled = re.disabledDate ? ae(he, ue.value).every(re.disabledDate) : !1, Ve.current = castArray(re.parsedValue).findIndex((ze) => ze.year() === he) >= 0, Ve.today = Ie.year() === he, Ve;
    }, Oe = (he) => he === Ce.value && re.date.year() < Ce.value && re.date.year() > Ce.value + 9 || castArray(re.date).findIndex((Ve) => Ve.year() === he) >= 0, _e = (he) => {
      const Ie = he.target.closest("td");
      if (Ie) {
        if (hasClass$1(Ie, "disabled"))
          return;
        const ze = Ie.textContent || Ie.innerText;
        oe("pick", Number(ze));
      }
    };
    return watch(() => re.date, async () => {
      var he, Ve;
      (he = de.value) != null && he.contains(document.activeElement) && (await nextTick(), (Ve = pe.value) == null || Ve.focus());
    }), k({
      focus: $e
    }), (he, Ve) => (openBlock(), createElementBlock("table", {
      role: "grid",
      "aria-label": unref(ie)("el.datepicker.yearTablePrompt"),
      class: normalizeClass(unref(le).b()),
      onClick: _e
    }, [
      createElementVNode("tbody", {
        ref_key: "tbodyRef",
        ref: de
      }, [
        (openBlock(), createElementBlock(Fragment, null, renderList(3, (Ie, ze) => createElementVNode("tr", { key: ze }, [
          (openBlock(), createElementBlock(Fragment, null, renderList(4, (xe, Ue) => (openBlock(), createElementBlock(Fragment, {
            key: ze + "_" + Ue
          }, [
            ze * 4 + Ue < 10 ? (openBlock(), createElementBlock("td", {
              key: 0,
              ref_for: !0,
              ref: (At) => Oe(unref(Ce) + ze * 4 + Ue) && (pe.value = At),
              class: normalizeClass(["available", Ne(unref(Ce) + ze * 4 + Ue)]),
              "aria-selected": `${Oe(unref(Ce) + ze * 4 + Ue)}`,
              tabindex: Oe(unref(Ce) + ze * 4 + Ue) ? 0 : -1,
              onKeydown: [
                withKeys(withModifiers(_e, ["prevent", "stop"]), ["space"]),
                withKeys(withModifiers(_e, ["prevent", "stop"]), ["enter"])
              ]
            }, [
              createElementVNode("span", _hoisted_3$6, toDisplayString(unref(Ce) + ze * 4 + Ue), 1)
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
    const oe = e, re = (Tn, Mn, qe) => !0, ae = useNamespace("picker-panel"), le = useNamespace("date-picker"), ie = useAttrs$2(), ue = useSlots(), { t: de, lang: pe } = useLocale(), Ce = inject("EP_PICKER_BASE"), $e = inject(TOOLTIP_INJECTION_KEY), { shortcuts: Ne, disabledDate: Oe, cellClassName: _e, defaultTime: he, arrowControl: Ve } = Ce.props, Ie = toRef(Ce.props, "defaultValue"), ze = ref(), xe = ref(dayjs().locale(pe.value)), Ue = computed(() => dayjs(he).locale(pe.value)), At = computed(() => xe.value.month()), Fe = computed(() => xe.value.year()), Pt = ref([]), vn = ref(null), En = ref(null), $n = (Tn) => Pt.value.length > 0 ? re(Tn, Pt.value, oe.format || "HH:mm:ss") : !0, kn = (Tn) => he && !Wn.value ? Ue.value.year(Tn.year()).month(Tn.month()).date(Tn.date()) : Rn.value ? Tn.millisecond(0) : Tn.startOf("day"), wn = (Tn, ...Mn) => {
      if (!Tn)
        k("pick", Tn, ...Mn);
      else if (isArray(Tn)) {
        const qe = Tn.map(kn);
        k("pick", qe, ...Mn);
      } else
        k("pick", kn(Tn), ...Mn);
      vn.value = null, En.value = null;
    }, Dt = (Tn, Mn) => {
      if (Et.value === "date") {
        Tn = Tn;
        let qe = oe.parsedValue ? oe.parsedValue.year(Tn.year()).month(Tn.month()).date(Tn.date()) : Tn;
        $n(qe) || (qe = Pt.value[0][0].year(Tn.year()).month(Tn.month()).date(Tn.date())), xe.value = qe, wn(qe, Rn.value || Mn);
      } else
        Et.value === "week" ? wn(Tn.date) : Et.value === "dates" && wn(Tn, !0);
    }, Lt = (Tn) => {
      const Mn = Tn ? "add" : "subtract";
      xe.value = xe.value[Mn](1, "month"), ro("month");
    }, bn = (Tn) => {
      const Mn = xe.value, qe = Tn ? "add" : "subtract";
      xe.value = jt.value === "year" ? Mn[qe](10, "year") : Mn[qe](1, "year"), ro("year");
    }, jt = ref("date"), Cn = computed(() => {
      const Tn = de("el.datepicker.year");
      if (jt.value === "year") {
        const Mn = Math.floor(Fe.value / 10) * 10;
        return Tn ? `${Mn} ${Tn} - ${Mn + 9} ${Tn}` : `${Mn} - ${Mn + 9}`;
      }
      return `${Fe.value} ${Tn}`;
    }), kt = (Tn) => {
      const Mn = isFunction(Tn.value) ? Tn.value() : Tn.value;
      if (Mn) {
        wn(dayjs(Mn).locale(pe.value));
        return;
      }
      Tn.onClick && Tn.onClick({
        attrs: ie,
        slots: ue,
        emit: k
      });
    }, Et = computed(() => {
      const { type: Tn } = oe;
      return ["week", "month", "year", "dates"].includes(Tn) ? Tn : "date";
    }), _n = computed(() => Et.value === "date" ? jt.value : Et.value), Pn = computed(() => !!Ne.length), hn = async (Tn) => {
      xe.value = xe.value.startOf("month").month(Tn), Et.value === "month" ? wn(xe.value, !1) : (jt.value = "date", ["month", "year", "date", "week"].includes(Et.value) && (wn(xe.value, !0), await nextTick(), In())), ro("month");
    }, On = async (Tn) => {
      Et.value === "year" ? (xe.value = xe.value.startOf("year").year(Tn), wn(xe.value, !1)) : (xe.value = xe.value.year(Tn), jt.value = "month", ["month", "year", "date", "week"].includes(Et.value) && (wn(xe.value, !0), await nextTick(), In())), ro("year");
    }, Dn = async (Tn) => {
      jt.value = Tn, await nextTick(), In();
    }, Rn = computed(() => oe.type === "datetime" || oe.type === "datetimerange"), Fn = computed(() => Rn.value || Et.value === "dates"), Nn = () => {
      if (Et.value === "dates")
        wn(oe.parsedValue);
      else {
        let Tn = oe.parsedValue;
        if (!Tn) {
          const Mn = dayjs(he).locale(pe.value), qe = ao();
          Tn = Mn.year(qe.year()).month(qe.month()).date(qe.date());
        }
        xe.value = Tn, wn(Tn);
      }
    }, Bn = () => {
      const Mn = dayjs().locale(pe.value).toDate();
      (!Oe || !Oe(Mn)) && $n(Mn) && (xe.value = dayjs().locale(pe.value), wn(xe.value));
    }, Vn = computed(() => extractTimeFormat(oe.format)), An = computed(() => extractDateFormat(oe.format)), Wn = computed(() => {
      if (En.value)
        return En.value;
      if (!(!oe.parsedValue && !Ie.value))
        return (oe.parsedValue || xe.value).format(Vn.value);
    }), Yn = computed(() => {
      if (vn.value)
        return vn.value;
      if (!(!oe.parsedValue && !Ie.value))
        return (oe.parsedValue || xe.value).format(An.value);
    }), Xn = ref(!1), eo = () => {
      Xn.value = !0;
    }, qn = () => {
      Xn.value = !1;
    }, no = (Tn) => ({
      hour: Tn.hour(),
      minute: Tn.minute(),
      second: Tn.second(),
      year: Tn.year(),
      month: Tn.month(),
      date: Tn.date()
    }), oo = (Tn, Mn, qe) => {
      const { hour: Sn, minute: xn, second: jn } = no(Tn), Ln = oe.parsedValue ? oe.parsedValue.hour(Sn).minute(xn).second(jn) : Tn;
      xe.value = Ln, wn(xe.value, !0), qe || (Xn.value = Mn);
    }, zn = (Tn) => {
      const Mn = dayjs(Tn, Vn.value).locale(pe.value);
      if (Mn.isValid() && $n(Mn)) {
        const { year: qe, month: Sn, date: xn } = no(xe.value);
        xe.value = Mn.year(qe).month(Sn).date(xn), En.value = null, Xn.value = !1, wn(xe.value, !0);
      }
    }, Hn = (Tn) => {
      const Mn = dayjs(Tn, An.value).locale(pe.value);
      if (Mn.isValid()) {
        if (Oe && Oe(Mn.toDate()))
          return;
        const { hour: qe, minute: Sn, second: xn } = no(xe.value);
        xe.value = Mn.hour(qe).minute(Sn).second(xn), vn.value = null, wn(xe.value, !0);
      }
    }, Gn = (Tn) => dayjs.isDayjs(Tn) && Tn.isValid() && (Oe ? !Oe(Tn.toDate()) : !0), Zn = (Tn) => Et.value === "dates" ? Tn.map((Mn) => Mn.format(oe.format)) : Tn.format(oe.format), lo = (Tn) => dayjs(Tn, oe.format).locale(pe.value), ao = () => {
      const Tn = dayjs(Ie.value).locale(pe.value);
      if (!Ie.value) {
        const Mn = Ue.value;
        return dayjs().hour(Mn.hour()).minute(Mn.minute()).second(Mn.second()).locale(pe.value);
      }
      return Tn;
    }, In = async () => {
      var Tn;
      ["week", "month", "year", "date"].includes(Et.value) && ((Tn = ze.value) == null || Tn.focus(), Et.value === "week" && Qn(EVENT_CODE.down));
    }, Jn = (Tn) => {
      const { code: Mn } = Tn;
      [
        EVENT_CODE.up,
        EVENT_CODE.down,
        EVENT_CODE.left,
        EVENT_CODE.right,
        EVENT_CODE.home,
        EVENT_CODE.end,
        EVENT_CODE.pageUp,
        EVENT_CODE.pageDown
      ].includes(Mn) && (Qn(Mn), Tn.stopPropagation(), Tn.preventDefault()), [EVENT_CODE.enter, EVENT_CODE.space].includes(Mn) && vn.value === null && En.value === null && (Tn.preventDefault(), wn(xe.value, !1));
    }, Qn = (Tn) => {
      var Mn;
      const { up: qe, down: Sn, left: xn, right: jn, home: Ln, end: Kn, pageUp: Un, pageDown: uo } = EVENT_CODE, io = {
        year: {
          [qe]: -4,
          [Sn]: 4,
          [xn]: -1,
          [jn]: 1,
          offset: (to, co) => to.setFullYear(to.getFullYear() + co)
        },
        month: {
          [qe]: -4,
          [Sn]: 4,
          [xn]: -1,
          [jn]: 1,
          offset: (to, co) => to.setMonth(to.getMonth() + co)
        },
        week: {
          [qe]: -1,
          [Sn]: 1,
          [xn]: -1,
          [jn]: 1,
          offset: (to, co) => to.setDate(to.getDate() + co * 7)
        },
        date: {
          [qe]: -7,
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
        if (to.offset(so, isFunction(to[Tn]) ? to[Tn](so) : (Mn = to[Tn]) != null ? Mn : 0), Oe && Oe(so))
          break;
        const co = dayjs(so).locale(pe.value);
        xe.value = co, k("pick", co, !0);
        break;
      }
    }, ro = (Tn) => {
      k("panel-change", xe.value.toDate(), Tn, jt.value);
    };
    return watch(() => Et.value, (Tn) => {
      if (["month", "year"].includes(Tn)) {
        jt.value = Tn;
        return;
      }
      jt.value = "date";
    }, { immediate: !0 }), watch(() => jt.value, () => {
      $e == null || $e.updatePopper();
    }), watch(() => Ie.value, (Tn) => {
      Tn && (xe.value = ao());
    }, { immediate: !0 }), watch(() => oe.parsedValue, (Tn) => {
      if (Tn) {
        if (Et.value === "dates" || Array.isArray(Tn))
          return;
        xe.value = Tn;
      } else
        xe.value = ao();
    }, { immediate: !0 }), k("set-picker-option", ["isValidValue", Gn]), k("set-picker-option", ["formatToString", Zn]), k("set-picker-option", ["parseUserInput", lo]), k("set-picker-option", ["handleFocusPicker", In]), (Tn, Mn) => (openBlock(), createElementBlock("div", {
      class: normalizeClass([
        unref(ae).b(),
        unref(le).b(),
        {
          "has-sidebar": Tn.$slots.sidebar || unref(Pn),
          "has-time": unref(Rn)
        }
      ])
    }, [
      createElementVNode("div", {
        class: normalizeClass(unref(ae).e("body-wrapper"))
      }, [
        renderSlot(Tn.$slots, "sidebar", {
          class: normalizeClass(unref(ae).e("sidebar"))
        }),
        unref(Pn) ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(ae).e("sidebar"))
        }, [
          (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(Ne), (qe, Sn) => (openBlock(), createElementBlock("button", {
            key: Sn,
            type: "button",
            class: normalizeClass(unref(ae).e("shortcut")),
            onClick: (xn) => kt(qe)
          }, toDisplayString(qe.text), 11, _hoisted_1$e))), 128))
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
                onInput: Mn[0] || (Mn[0] = (qe) => vn.value = qe),
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
                onInput: Mn[1] || (Mn[1] = (qe) => En.value = qe),
                onChange: zn
              }, null, 8, ["placeholder", "model-value"]),
              createVNode(unref(TimePickPanel), {
                visible: Xn.value,
                format: unref(Vn),
                "time-arrow-control": unref(Ve),
                "parsed-value": xe.value,
                onPick: oo
              }, null, 8, ["visible", "format", "time-arrow-control", "parsed-value"])
            ], 2)), [
              [unref(ClickOutside), qn]
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
                onClick: Mn[2] || (Mn[2] = (qe) => bn(!1))
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
                onClick: Mn[3] || (Mn[3] = (qe) => Lt(!1))
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
              onKeydown: Mn[4] || (Mn[4] = withKeys((qe) => Dn("year"), ["enter"])),
              onClick: Mn[5] || (Mn[5] = (qe) => Dn("year"))
            }, toDisplayString(unref(Cn)), 35),
            withDirectives(createElementVNode("span", {
              role: "button",
              "aria-live": "polite",
              tabindex: "0",
              class: normalizeClass([
                unref(le).e("header-label"),
                { active: jt.value === "month" }
              ]),
              onKeydown: Mn[6] || (Mn[6] = withKeys((qe) => Dn("month"), ["enter"])),
              onClick: Mn[7] || (Mn[7] = (qe) => Dn("month"))
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
                onClick: Mn[8] || (Mn[8] = (qe) => Lt(!0))
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
                onClick: Mn[9] || (Mn[9] = (qe) => bn(!0))
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
              ref: ze,
              "selection-mode": unref(Et),
              date: xe.value,
              "parsed-value": Tn.parsedValue,
              "disabled-date": unref(Oe),
              "cell-class-name": unref(_e),
              onPick: Dt
            }, null, 8, ["selection-mode", "date", "parsed-value", "disabled-date", "cell-class-name"])) : createCommentVNode("v-if", !0),
            jt.value === "year" ? (openBlock(), createBlock(YearTable, {
              key: 1,
              ref_key: "currentViewRef",
              ref: ze,
              date: xe.value,
              "disabled-date": unref(Oe),
              "parsed-value": Tn.parsedValue,
              onPick: On
            }, null, 8, ["date", "disabled-date", "parsed-value"])) : createCommentVNode("v-if", !0),
            jt.value === "month" ? (openBlock(), createBlock(MonthTable, {
              key: 2,
              ref_key: "currentViewRef",
              ref: ze,
              date: xe.value,
              "parsed-value": Tn.parsedValue,
              "disabled-date": unref(Oe),
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
          onClick: Bn
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
          onClick: Nn
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
  const { emit: ie } = getCurrentInstance(), { pickerNs: ue } = inject(ROOT_PICKER_INJECTION_KEY), de = useNamespace("date-range-picker"), { t: pe, lang: Ce } = useLocale(), $e = useShortcut(Ce), Ne = ref(), Oe = ref(), _e = ref({
    endDate: null,
    selecting: !1
  }), he = (xe) => {
    _e.value = xe;
  }, Ve = (xe = !1) => {
    const Ue = unref(Ne), At = unref(Oe);
    isValidRange([Ue, At]) && ie("pick", [Ue, At], xe);
  }, Ie = (xe) => {
    _e.value.selecting = xe, xe || (_e.value.endDate = null);
  }, ze = () => {
    const [xe, Ue] = getDefaultValue(unref(k), {
      lang: unref(Ce),
      unit: ae,
      unlinkPanels: e.unlinkPanels
    });
    Ne.value = void 0, Oe.value = void 0, oe.value = xe, re.value = Ue;
  };
  return watch(k, (xe) => {
    xe && ze();
  }, { immediate: !0 }), watch(() => e.parsedValue, (xe) => {
    if (isArray(xe) && xe.length === 2) {
      const [Ue, At] = xe;
      Ne.value = Ue, oe.value = Ue, Oe.value = At, le(unref(Ne), unref(Oe));
    } else
      ze();
  }, { immediate: !0 }), {
    minDate: Ne,
    maxDate: Oe,
    rangeState: _e,
    lang: Ce,
    ppNs: ue,
    drpNs: de,
    handleChangeRange: he,
    handleRangeConfirm: Ve,
    handleShortcutClick: $e,
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
    } = ae.props, $e = toRef(ae.props, "shortcuts"), Ne = toRef(ae.props, "defaultValue"), { lang: Oe } = useLocale(), _e = ref(dayjs().locale(Oe.value)), he = ref(dayjs().locale(Oe.value).add(1, re)), {
      minDate: Ve,
      maxDate: Ie,
      rangeState: ze,
      ppNs: xe,
      drpNs: Ue,
      handleChangeRange: At,
      handleRangeConfirm: Fe,
      handleShortcutClick: Pt,
      onSelect: vn,
      t: En
    } = useRangePicker(oe, {
      defaultValue: Ne,
      leftDate: _e,
      rightDate: he,
      unit: re,
      onParsedValueChanged: jn
    }), $n = ref({
      min: null,
      max: null
    }), kn = ref({
      min: null,
      max: null
    }), wn = computed(() => `${_e.value.year()} ${En("el.datepicker.year")} ${En(`el.datepicker.month${_e.value.month() + 1}`)}`), Dt = computed(() => `${he.value.year()} ${En("el.datepicker.year")} ${En(`el.datepicker.month${he.value.month() + 1}`)}`), Lt = computed(() => _e.value.year()), bn = computed(() => _e.value.month()), jt = computed(() => he.value.year()), Cn = computed(() => he.value.month()), kt = computed(() => !!$e.value.length), Et = computed(() => $n.value.min !== null ? $n.value.min : Ve.value ? Ve.value.format(Dn.value) : ""), _n = computed(() => $n.value.max !== null ? $n.value.max : Ie.value || Ve.value ? (Ie.value || Ve.value).format(Dn.value) : ""), Pn = computed(() => kn.value.min !== null ? kn.value.min : Ve.value ? Ve.value.format(On.value) : ""), hn = computed(() => kn.value.max !== null ? kn.value.max : Ie.value || Ve.value ? (Ie.value || Ve.value).format(On.value) : ""), On = computed(() => extractTimeFormat(ue)), Dn = computed(() => extractDateFormat(ue)), Rn = () => {
      _e.value = _e.value.subtract(1, "year"), oe.unlinkPanels || (he.value = _e.value.add(1, "month")), Xn("year");
    }, Fn = () => {
      _e.value = _e.value.subtract(1, "month"), oe.unlinkPanels || (he.value = _e.value.add(1, "month")), Xn("month");
    }, Nn = () => {
      oe.unlinkPanels ? he.value = he.value.add(1, "year") : (_e.value = _e.value.add(1, "year"), he.value = _e.value.add(1, "month")), Xn("year");
    }, Bn = () => {
      oe.unlinkPanels ? he.value = he.value.add(1, "month") : (_e.value = _e.value.add(1, "month"), he.value = _e.value.add(1, "month")), Xn("month");
    }, Vn = () => {
      _e.value = _e.value.add(1, "year"), Xn("year");
    }, An = () => {
      _e.value = _e.value.add(1, "month"), Xn("month");
    }, Wn = () => {
      he.value = he.value.subtract(1, "year"), Xn("year");
    }, Yn = () => {
      he.value = he.value.subtract(1, "month"), Xn("month");
    }, Xn = (Ln) => {
      k("panel-change", [_e.value.toDate(), he.value.toDate()], Ln);
    }, eo = computed(() => {
      const Ln = (bn.value + 1) % 12, Kn = bn.value + 1 >= 12 ? 1 : 0;
      return oe.unlinkPanels && new Date(Lt.value + Kn, Ln) < new Date(jt.value, Cn.value);
    }), qn = computed(() => oe.unlinkPanels && jt.value * 12 + Cn.value - (Lt.value * 12 + bn.value + 1) >= 12), no = computed(() => !(Ve.value && Ie.value && !ze.value.selecting && isValidRange([Ve.value, Ie.value]))), oo = computed(() => oe.type === "datetime" || oe.type === "datetimerange"), zn = (Ln, Kn) => {
      if (!!Ln)
        return de ? dayjs(de[Kn] || de).locale(Oe.value).year(Ln.year()).month(Ln.month()).date(Ln.date()) : Ln;
    }, Hn = (Ln, Kn = !0) => {
      const Un = Ln.minDate, uo = Ln.maxDate, io = zn(Un, 0), so = zn(uo, 1);
      Ie.value === so && Ve.value === io || (k("calendar-change", [Un.toDate(), uo && uo.toDate()]), Ie.value = so, Ve.value = io, !(!Kn || oo.value) && Fe());
    }, Gn = ref(!1), Zn = ref(!1), lo = () => {
      Gn.value = !1;
    }, ao = () => {
      Zn.value = !1;
    }, In = (Ln, Kn) => {
      $n.value[Kn] = Ln;
      const Un = dayjs(Ln, Dn.value).locale(Oe.value);
      if (Un.isValid()) {
        if (le && le(Un.toDate()))
          return;
        Kn === "min" ? (_e.value = Un, Ve.value = (Ve.value || _e.value).year(Un.year()).month(Un.month()).date(Un.date()), oe.unlinkPanels || (he.value = Un.add(1, "month"), Ie.value = Ve.value.add(1, "month"))) : (he.value = Un, Ie.value = (Ie.value || he.value).year(Un.year()).month(Un.month()).date(Un.date()), oe.unlinkPanels || (_e.value = Un.subtract(1, "month"), Ve.value = Ie.value.subtract(1, "month")));
      }
    }, Jn = (Ln, Kn) => {
      $n.value[Kn] = null;
    }, Qn = (Ln, Kn) => {
      kn.value[Kn] = Ln;
      const Un = dayjs(Ln, On.value).locale(Oe.value);
      Un.isValid() && (Kn === "min" ? (Gn.value = !0, Ve.value = (Ve.value || _e.value).hour(Un.hour()).minute(Un.minute()).second(Un.second()), (!Ie.value || Ie.value.isBefore(Ve.value)) && (Ie.value = Ve.value)) : (Zn.value = !0, Ie.value = (Ie.value || he.value).hour(Un.hour()).minute(Un.minute()).second(Un.second()), he.value = Ie.value, Ie.value && Ie.value.isBefore(Ve.value) && (Ve.value = Ie.value)));
    }, ro = (Ln, Kn) => {
      kn.value[Kn] = null, Kn === "min" ? (_e.value = Ve.value, Gn.value = !1) : (he.value = Ie.value, Zn.value = !1);
    }, Tn = (Ln, Kn, Un) => {
      kn.value.min || (Ln && (_e.value = Ln, Ve.value = (Ve.value || _e.value).hour(Ln.hour()).minute(Ln.minute()).second(Ln.second())), Un || (Gn.value = Kn), (!Ie.value || Ie.value.isBefore(Ve.value)) && (Ie.value = Ve.value, he.value = Ln));
    }, Mn = (Ln, Kn, Un) => {
      kn.value.max || (Ln && (he.value = Ln, Ie.value = (Ie.value || he.value).hour(Ln.hour()).minute(Ln.minute()).second(Ln.second())), Un || (Zn.value = Kn), Ie.value && Ie.value.isBefore(Ve.value) && (Ve.value = Ie.value));
    }, qe = () => {
      _e.value = getDefaultValue(unref(Ne), {
        lang: unref(Oe),
        unit: "month",
        unlinkPanels: oe.unlinkPanels
      })[0], he.value = _e.value.add(1, "month"), k("pick", null);
    }, Sn = (Ln) => isArray(Ln) ? Ln.map((Kn) => Kn.format(ue)) : Ln.format(ue), xn = (Ln) => isArray(Ln) ? Ln.map((Kn) => dayjs(Kn, ue).locale(Oe.value)) : dayjs(Ln, ue).locale(Oe.value);
    function jn(Ln, Kn) {
      if (oe.unlinkPanels && Kn) {
        const Un = (Ln == null ? void 0 : Ln.year()) || 0, uo = (Ln == null ? void 0 : Ln.month()) || 0, io = Kn.year(), so = Kn.month();
        he.value = Un === io && uo === so ? Kn.add(1, re) : Kn;
      } else
        he.value = _e.value.add(1, re), Kn && (he.value = he.value.hour(Kn.hour()).minute(Kn.minute()).second(Kn.second()));
    }
    return k("set-picker-option", ["isValidValue", isValidRange]), k("set-picker-option", ["parseUserInput", xn]), k("set-picker-option", ["formatToString", Sn]), k("set-picker-option", ["handleClear", qe]), (Ln, Kn) => (openBlock(), createElementBlock("div", {
      class: normalizeClass([
        unref(xe).b(),
        unref(Ue).b(),
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
          (openBlock(!0), createElementBlock(Fragment, null, renderList(unref($e), (Un, uo) => (openBlock(), createElementBlock("button", {
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
            class: normalizeClass(unref(Ue).e("time-header"))
          }, [
            createElementVNode("span", {
              class: normalizeClass(unref(Ue).e("editors-wrap"))
            }, [
              createElementVNode("span", {
                class: normalizeClass(unref(Ue).e("time-picker-wrap"))
              }, [
                createVNode(unref(ElInput), {
                  size: "small",
                  disabled: unref(ze).selecting,
                  placeholder: unref(En)("el.datepicker.startDate"),
                  class: normalizeClass(unref(Ue).e("editor")),
                  "model-value": unref(Et),
                  onInput: Kn[0] || (Kn[0] = (Un) => In(Un, "min")),
                  onChange: Kn[1] || (Kn[1] = (Un) => Jn(Un, "min"))
                }, null, 8, ["disabled", "placeholder", "class", "model-value"])
              ], 2),
              withDirectives((openBlock(), createElementBlock("span", {
                class: normalizeClass(unref(Ue).e("time-picker-wrap"))
              }, [
                createVNode(unref(ElInput), {
                  size: "small",
                  class: normalizeClass(unref(Ue).e("editor")),
                  disabled: unref(ze).selecting,
                  placeholder: unref(En)("el.datepicker.startTime"),
                  "model-value": unref(Pn),
                  onFocus: Kn[2] || (Kn[2] = (Un) => Gn.value = !0),
                  onInput: Kn[3] || (Kn[3] = (Un) => Qn(Un, "min")),
                  onChange: Kn[4] || (Kn[4] = (Un) => ro(Un, "min"))
                }, null, 8, ["class", "disabled", "placeholder", "model-value"]),
                createVNode(unref(TimePickPanel), {
                  visible: Gn.value,
                  format: unref(On),
                  "datetime-role": "start",
                  "time-arrow-control": unref(pe),
                  "parsed-value": _e.value,
                  onPick: Tn
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
              class: normalizeClass([unref(Ue).e("editors-wrap"), "is-right"])
            }, [
              createElementVNode("span", {
                class: normalizeClass(unref(Ue).e("time-picker-wrap"))
              }, [
                createVNode(unref(ElInput), {
                  size: "small",
                  class: normalizeClass(unref(Ue).e("editor")),
                  disabled: unref(ze).selecting,
                  placeholder: unref(En)("el.datepicker.endDate"),
                  "model-value": unref(_n),
                  readonly: !unref(Ve),
                  onInput: Kn[5] || (Kn[5] = (Un) => In(Un, "max")),
                  onChange: Kn[6] || (Kn[6] = (Un) => Jn(Un, "max"))
                }, null, 8, ["class", "disabled", "placeholder", "model-value", "readonly"])
              ], 2),
              withDirectives((openBlock(), createElementBlock("span", {
                class: normalizeClass(unref(Ue).e("time-picker-wrap"))
              }, [
                createVNode(unref(ElInput), {
                  size: "small",
                  class: normalizeClass(unref(Ue).e("editor")),
                  disabled: unref(ze).selecting,
                  placeholder: unref(En)("el.datepicker.endTime"),
                  "model-value": unref(hn),
                  readonly: !unref(Ve),
                  onFocus: Kn[7] || (Kn[7] = (Un) => unref(Ve) && (Zn.value = !0)),
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
            class: normalizeClass([[unref(xe).e("content"), unref(Ue).e("content")], "is-left"])
          }, [
            createElementVNode("div", {
              class: normalizeClass(unref(Ue).e("header"))
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
                disabled: !unref(qn),
                class: normalizeClass([[unref(xe).e("icon-btn"), { "is-disabled": !unref(qn) }], "d-arrow-right"]),
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
                onClick: An
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
              date: _e.value,
              "min-date": unref(Ve),
              "max-date": unref(Ie),
              "range-state": unref(ze),
              "disabled-date": unref(le),
              "cell-class-name": unref(ie),
              onChangerange: unref(At),
              onPick: Hn,
              onSelect: unref(vn)
            }, null, 8, ["date", "min-date", "max-date", "range-state", "disabled-date", "cell-class-name", "onChangerange", "onSelect"])
          ], 2),
          createElementVNode("div", {
            class: normalizeClass([[unref(xe).e("content"), unref(Ue).e("content")], "is-right"])
          }, [
            createElementVNode("div", {
              class: normalizeClass(unref(Ue).e("header"))
            }, [
              Ln.unlinkPanels ? (openBlock(), createElementBlock("button", {
                key: 0,
                type: "button",
                disabled: !unref(qn),
                class: normalizeClass([[unref(xe).e("icon-btn"), { "is-disabled": !unref(qn) }], "d-arrow-left"]),
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
                onClick: Nn
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
                onClick: Bn
              }, [
                createVNode(unref(ElIcon), null, {
                  default: withCtx(() => [
                    createVNode(unref(arrow_right_default))
                  ]),
                  _: 1
                })
              ], 2),
              createElementVNode("div", null, toDisplayString(unref(Dt)), 1)
            ], 2),
            createVNode(DateTable, {
              "selection-mode": "range",
              date: he.value,
              "min-date": unref(Ve),
              "max-date": unref(Ie),
              "range-state": unref(ze),
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
          onClick: qe
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
  }, de = computed(() => `${k.value.year()} ${re("el.datepicker.year")}`), pe = computed(() => `${oe.value.year()} ${re("el.datepicker.year")}`), Ce = computed(() => k.value.year()), $e = computed(() => oe.value.year() === k.value.year() ? k.value.year() + 1 : oe.value.year());
  return {
    leftPrevYear: ae,
    rightNextYear: le,
    leftNextYear: ie,
    rightPrevYear: ue,
    leftLabel: de,
    rightLabel: pe,
    leftYear: Ce,
    rightYear: $e
  };
}, _hoisted_1$c = ["onClick"], _hoisted_2$7 = ["disabled"], _hoisted_3$3 = ["disabled"], __default__$a = {
  name: "DatePickerMonthRange"
}, _sfc_main$o = /* @__PURE__ */ defineComponent({
  ...__default__$a,
  props: panelMonthRangeProps,
  emits: panelMonthRangeEmits,
  setup(e, { emit: k }) {
    const oe = e, re = "year", { lang: ae } = useLocale(), le = inject("EP_PICKER_BASE"), { shortcuts: ie, disabledDate: ue, format: de } = le.props, pe = toRef(le.props, "defaultValue"), Ce = ref(dayjs().locale(ae.value)), $e = ref(dayjs().locale(ae.value).add(1, re)), {
      minDate: Ne,
      maxDate: Oe,
      rangeState: _e,
      ppNs: he,
      drpNs: Ve,
      handleChangeRange: Ie,
      handleRangeConfirm: ze,
      handleShortcutClick: xe,
      onSelect: Ue
    } = useRangePicker(oe, {
      defaultValue: pe,
      leftDate: Ce,
      rightDate: $e,
      unit: re,
      onParsedValueChanged: Cn
    }), At = computed(() => !!ie.length), {
      leftPrevYear: Fe,
      rightNextYear: Pt,
      leftNextYear: vn,
      rightPrevYear: En,
      leftLabel: $n,
      rightLabel: kn,
      leftYear: wn,
      rightYear: Dt
    } = useMonthRangeHeader({
      unlinkPanels: toRef(oe, "unlinkPanels"),
      leftDate: Ce,
      rightDate: $e
    }), Lt = computed(() => oe.unlinkPanels && Dt.value > wn.value + 1), bn = (kt, Et = !0) => {
      const _n = kt.minDate, Pn = kt.maxDate;
      Oe.value === Pn && Ne.value === _n || (Oe.value = Pn, Ne.value = _n, Et && ze());
    }, jt = (kt) => kt.map((Et) => Et.format(de));
    function Cn(kt, Et) {
      if (oe.unlinkPanels && Et) {
        const _n = (kt == null ? void 0 : kt.year()) || 0, Pn = Et.year();
        $e.value = _n === Pn ? Et.add(1, re) : Et;
      } else
        $e.value = Ce.value.add(1, re);
    }
    return k("set-picker-option", ["formatToString", jt]), (kt, Et) => (openBlock(), createElementBlock("div", {
      class: normalizeClass([
        unref(he).b(),
        unref(Ve).b(),
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
            class: normalizeClass([[unref(he).e("content"), unref(Ve).e("content")], "is-left"])
          }, [
            createElementVNode("div", {
              class: normalizeClass(unref(Ve).e("header"))
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
                disabled: !unref(Lt),
                class: normalizeClass([[
                  unref(he).e("icon-btn"),
                  { [unref(he).is("disabled")]: !unref(Lt) }
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
              createElementVNode("div", null, toDisplayString(unref($n)), 1)
            ], 2),
            createVNode(MonthTable, {
              "selection-mode": "range",
              date: Ce.value,
              "min-date": unref(Ne),
              "max-date": unref(Oe),
              "range-state": unref(_e),
              "disabled-date": unref(ue),
              onChangerange: unref(Ie),
              onPick: bn,
              onSelect: unref(Ue)
            }, null, 8, ["date", "min-date", "max-date", "range-state", "disabled-date", "onChangerange", "onSelect"])
          ], 2),
          createElementVNode("div", {
            class: normalizeClass([[unref(he).e("content"), unref(Ve).e("content")], "is-right"])
          }, [
            createElementVNode("div", {
              class: normalizeClass(unref(Ve).e("header"))
            }, [
              kt.unlinkPanels ? (openBlock(), createElementBlock("button", {
                key: 0,
                type: "button",
                disabled: !unref(Lt),
                class: normalizeClass([[unref(he).e("icon-btn"), { "is-disabled": !unref(Lt) }], "d-arrow-left"]),
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
              createElementVNode("div", null, toDisplayString(unref(kn)), 1)
            ], 2),
            createVNode(MonthTable, {
              "selection-mode": "range",
              date: $e.value,
              "min-date": unref(Ne),
              "max-date": unref(Oe),
              "range-state": unref(_e),
              "disabled-date": unref(ue),
              onChangerange: unref(Ie),
              onPick: bn,
              onSelect: unref(Ue)
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
        default: ($e) => createVNode(Ce, $e, null),
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
      const { labelPosition: xe, inline: Ue } = re;
      return [
        ue.b(),
        ue.m(ie.value || "default"),
        {
          [ue.m(`label-${xe}`)]: xe,
          [ue.m("inline")]: Ue
        }
      ];
    }), pe = (xe) => {
      le.push(xe);
    }, Ce = (xe) => {
      xe.prop && le.splice(le.indexOf(xe), 1);
    }, $e = (xe = []) => {
      if (!re.model) {
        debugWarn(ae, "model is required for resetFields to work.");
        return;
      }
      filterFields(le, xe).forEach((Ue) => Ue.resetField());
    }, Ne = (xe = []) => {
      filterFields(le, xe).forEach((Ue) => Ue.clearValidate());
    }, Oe = computed(() => {
      const xe = !!re.model;
      return xe || debugWarn(ae, "model is required for validate to work."), xe;
    }), _e = (xe) => {
      if (le.length === 0)
        return [];
      const Ue = filterFields(le, xe);
      return Ue.length ? Ue : (debugWarn(ae, "please pass correct props!"), []);
    }, he = async (xe) => Ie(void 0, xe), Ve = async (xe = []) => {
      if (!Oe.value)
        return !1;
      const Ue = _e(xe);
      if (Ue.length === 0)
        return !0;
      let At = {};
      for (const Fe of Ue)
        try {
          await Fe.validate("");
        } catch (Pt) {
          At = {
            ...At,
            ...Pt
          };
        }
      return Object.keys(At).length === 0 ? !0 : Promise.reject(At);
    }, Ie = async (xe = [], Ue) => {
      const At = !isFunction(Ue);
      try {
        const Fe = await Ve(xe);
        return Fe === !0 && (Ue == null || Ue(Fe)), Fe;
      } catch (Fe) {
        const Pt = Fe;
        return re.scrollToError && ze(Object.keys(Pt)[0]), Ue == null || Ue(!1, Pt), At && Promise.reject(Pt);
      }
    }, ze = (xe) => {
      var Ue;
      const At = filterFields(le, xe)[0];
      At && ((Ue = At.$el) == null || Ue.scrollIntoView());
    };
    return watch(() => re.rules, () => {
      re.validateOnRuleChange && he().catch((xe) => debugWarn(xe));
    }, { deep: !0 }), provide(formContextKey, reactive({
      ...toRefs(re),
      emit: oe,
      resetFields: $e,
      clearValidate: Ne,
      validateField: Ie,
      addField: pe,
      removeField: Ce,
      ...useFormLabelWidth()
    })), k({
      validate: he,
      validateField: Ie,
      resetFields: $e,
      clearValidate: Ne,
      scrollToField: ze
    }), (xe, Ue) => (openBlock(), createElementBlock("form", {
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
    var le = new Promise(function(Ne, Oe) {
      var _e = function(Ie) {
        return re(Ie), Ie.length ? Oe(new AsyncValidationError(Ie, convertFieldsError(Ie))) : Ne(ae);
      }, he = flattenObjArr(e);
      asyncSerialArray(he, oe, _e);
    });
    return le.catch(function(Ne) {
      return Ne;
    }), le;
  }
  var ie = k.firstFields === !0 ? Object.keys(e) : k.firstFields || [], ue = Object.keys(e), de = ue.length, pe = 0, Ce = [], $e = new Promise(function(Ne, Oe) {
    var _e = function(Ve) {
      if (Ce.push.apply(Ce, Ve), pe++, pe === de)
        return re(Ce), Ce.length ? Oe(new AsyncValidationError(Ce, convertFieldsError(Ce))) : Ne(ae);
    };
    ue.length || (re(Ce), Ne(ae)), ue.forEach(function(he) {
      var Ve = e[he];
      ie.indexOf(he) !== -1 ? asyncSerialArray(Ve, oe, _e) : asyncParallelArray(Ve, oe, _e);
    });
  });
  return $e.catch(function(Ne) {
    return Ne;
  }), $e;
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
  var e = "[a-fA-F\\d:]", k = function(Ue) {
    return Ue && Ue.includeBoundaries ? "(?:(?<=\\s|^)(?=" + e + ")|(?<=" + e + ")(?=\\s|$))" : "";
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
`).replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim(), le = new RegExp("(?:^" + oe + "$)|(?:^" + ae + "$)"), ie = new RegExp("^" + oe + "$"), ue = new RegExp("^" + ae + "$"), de = function(Ue) {
    return Ue && Ue.exact ? le : new RegExp("(?:" + k(Ue) + oe + k(Ue) + ")|(?:" + k(Ue) + ae + k(Ue) + ")", "g");
  };
  de.v4 = function(xe) {
    return xe && xe.exact ? ie : new RegExp("" + k(xe) + oe + k(xe), "g");
  }, de.v6 = function(xe) {
    return xe && xe.exact ? ue : new RegExp("" + k(xe) + ae + k(xe), "g");
  };
  var pe = "(?:(?:[a-z]+:)?//)", Ce = "(?:\\S+(?::\\S*)?@)?", $e = de.v4().source, Ne = de.v6().source, Oe = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", _e = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", he = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", Ve = "(?::\\d{2,5})?", Ie = '(?:[/?#][^\\s"]*)?', ze = "(?:" + pe + "|www\\.)" + Ce + "(?:localhost|" + $e + "|" + Ne + "|" + Oe + _e + he + ")" + Ve + Ie;
  return urlReg = new RegExp("(?:^" + ze + "$)", "i"), urlReg;
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
  var ie = typeof k.len == "number", ue = typeof k.min == "number", de = typeof k.max == "number", pe = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, Ce = oe, $e = null, Ne = typeof oe == "number", Oe = typeof oe == "string", _e = Array.isArray(oe);
  if (Ne ? $e = "number" : Oe ? $e = "string" : _e && ($e = "array"), !$e)
    return !1;
  _e && (Ce = oe.length), Oe && (Ce = oe.replace(pe, "_").length), ie ? Ce !== k.len && ae.push(format(le.messages[$e].len, k.fullField, k.len)) : ue && !de && Ce < k.min ? ae.push(format(le.messages[$e].min, k.fullField, k.min)) : de && !ue && Ce > k.max ? ae.push(format(le.messages[$e].max, k.fullField, k.max)) : ue && de && (Ce < k.min || Ce > k.max) && ae.push(format(le.messages[$e].range, k.fullField, k.min, k.max));
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
      var Ve = [], Ie = {};
      function ze(Ue) {
        if (Array.isArray(Ue)) {
          var At;
          Ve = (At = Ve).concat.apply(At, Ue);
        } else
          Ve.push(Ue);
      }
      for (var xe = 0; xe < he.length; xe++)
        ze(he[xe]);
      Ve.length ? (Ie = convertFieldsError(Ve), pe(Ve, Ie)) : pe(null, ue);
    }
    if (de.messages) {
      var $e = this.messages();
      $e === messages && ($e = newMessages()), deepMerge($e, de.messages), de.messages = $e;
    } else
      de.messages = this.messages();
    var Ne = {}, Oe = de.keys || Object.keys(this.rules);
    Oe.forEach(function(he) {
      var Ve = ie.rules[he], Ie = ue[he];
      Ve.forEach(function(ze) {
        var xe = ze;
        typeof xe.transform == "function" && (ue === re && (ue = _extends({}, ue)), Ie = ue[he] = xe.transform(Ie)), typeof xe == "function" ? xe = {
          validator: xe
        } : xe = _extends({}, xe), xe.validator = ie.getValidationMethod(xe), xe.validator && (xe.field = he, xe.fullField = xe.fullField || he, xe.type = ie.getType(xe), Ne[he] = Ne[he] || [], Ne[he].push({
          rule: xe,
          value: Ie,
          source: ue,
          field: he
        }));
      });
    });
    var _e = {};
    return asyncMap(Ne, de, function(he, Ve) {
      var Ie = he.rule, ze = (Ie.type === "object" || Ie.type === "array") && (typeof Ie.fields == "object" || typeof Ie.defaultField == "object");
      ze = ze && (Ie.required || !Ie.required && he.value), Ie.field = he.field;
      function xe(Fe, Pt) {
        return _extends({}, Pt, {
          fullField: Ie.fullField + "." + Fe,
          fullFields: Ie.fullFields ? [].concat(Ie.fullFields, [Fe]) : [Fe]
        });
      }
      function Ue(Fe) {
        Fe === void 0 && (Fe = []);
        var Pt = Array.isArray(Fe) ? Fe : [Fe];
        !de.suppressWarning && Pt.length && e.warning("async-validator:", Pt), Pt.length && Ie.message !== void 0 && (Pt = [].concat(Ie.message));
        var vn = Pt.map(complementError(Ie, ue));
        if (de.first && vn.length)
          return _e[Ie.field] = 1, Ve(vn);
        if (!ze)
          Ve(vn);
        else {
          if (Ie.required && !he.value)
            return Ie.message !== void 0 ? vn = [].concat(Ie.message).map(complementError(Ie, ue)) : de.error && (vn = [de.error(Ie, format(de.messages.required, Ie.field))]), Ve(vn);
          var En = {};
          Ie.defaultField && Object.keys(he.value).map(function(wn) {
            En[wn] = Ie.defaultField;
          }), En = _extends({}, En, he.rule.fields);
          var $n = {};
          Object.keys(En).forEach(function(wn) {
            var Dt = En[wn], Lt = Array.isArray(Dt) ? Dt : [Dt];
            $n[wn] = Lt.map(xe.bind(null, wn));
          });
          var kn = new e($n);
          kn.messages(de.messages), he.rule.options && (he.rule.options.messages = de.messages, he.rule.options.error = de.error), kn.validate(he.value, he.rule.options || de, function(wn) {
            var Dt = [];
            vn && vn.length && Dt.push.apply(Dt, vn), wn && wn.length && Dt.push.apply(Dt, wn), Ve(Dt.length ? Dt : null);
          });
        }
      }
      var At;
      if (Ie.asyncValidator)
        At = Ie.asyncValidator(Ie, he.value, Ue, he.source, de);
      else if (Ie.validator) {
        try {
          At = Ie.validator(Ie, he.value, Ue, he.source, de);
        } catch (Fe) {
          console.error == null || console.error(Fe), de.suppressValidatorError || setTimeout(function() {
            throw Fe;
          }, 0), Ue(Fe.message);
        }
        At === !0 ? Ue() : At === !1 ? Ue(typeof Ie.message == "function" ? Ie.message(Ie.fullField || Ie.field) : Ie.message || (Ie.fullField || Ie.field) + " fails") : At instanceof Array ? Ue(At) : At instanceof Error && Ue(At.message);
      }
      At && At.then && At.then(function() {
        return Ue();
      }, function(Fe) {
        return Ue(Fe);
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
        const $e = window.getComputedStyle(le.value.firstElementChild).width;
        return Math.ceil(Number.parseFloat($e));
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
    }), onUpdated(() => pe()), watch(ie, (Ce, $e) => {
      e.updateAll && (oe == null || oe.registerLabelWidth(Ce, $e));
    }), useResizeObserver(computed(() => {
      var Ce, $e;
      return ($e = (Ce = le.value) == null ? void 0 : Ce.firstElementChild) != null ? $e : null;
    }), pe), () => {
      var Ce, $e;
      if (!k)
        return null;
      const {
        isAutoWidth: Ne
      } = e;
      if (Ne) {
        const Oe = oe == null ? void 0 : oe.autoLabelWidth, _e = {};
        if (Oe && Oe !== "auto") {
          const he = Math.max(0, Number.parseInt(Oe, 10) - ie.value), Ve = oe.labelPosition === "left" ? "marginRight" : "marginLeft";
          he && (_e[Ve] = `${he}px`);
        }
        return createVNode("div", {
          ref: le,
          class: [ae.be("item", "label-wrap")],
          style: _e
        }, [(Ce = k.default) == null ? void 0 : Ce.call(k)]);
      } else
        return createVNode(Fragment, {
          ref: le
        }, [($e = k.default) == null ? void 0 : $e.call(k)]);
    };
  }
});
const _hoisted_1$b = ["role", "aria-labelledby"], __default__$7 = {
  name: "ElFormItem"
}, _sfc_main$l = /* @__PURE__ */ defineComponent({
  ...__default__$7,
  props: formItemProps,
  setup(e, { expose: k }) {
    const oe = e, re = useSlots(), ae = inject(formContextKey, void 0), le = inject(formItemContextKey, void 0), ie = useSize(void 0, { formItem: !1 }), ue = useNamespace("form-item"), de = useId().value, pe = ref([]), Ce = ref(""), $e = refDebounced(Ce, 100), Ne = ref(""), Oe = ref();
    let _e, he = !1;
    const Ve = computed(() => {
      if ((ae == null ? void 0 : ae.labelPosition) === "top")
        return {};
      const Nn = addUnit(oe.labelWidth || (ae == null ? void 0 : ae.labelWidth) || "");
      return Nn ? { width: Nn } : {};
    }), Ie = computed(() => {
      if ((ae == null ? void 0 : ae.labelPosition) === "top" || (ae == null ? void 0 : ae.inline))
        return {};
      if (!oe.label && !oe.labelWidth && En)
        return {};
      const Nn = addUnit(oe.labelWidth || (ae == null ? void 0 : ae.labelWidth) || "");
      return !oe.label && !re.label ? { marginLeft: Nn } : {};
    }), ze = computed(() => [
      ue.b(),
      ue.m(ie.value),
      ue.is("error", Ce.value === "error"),
      ue.is("validating", Ce.value === "validating"),
      ue.is("success", Ce.value === "success"),
      ue.is("required", Lt.value || oe.required),
      ue.is("no-asterisk", ae == null ? void 0 : ae.hideRequiredAsterisk),
      { [ue.m("feedback")]: ae == null ? void 0 : ae.statusIcon }
    ]), xe = computed(() => isBoolean(oe.inlineMessage) ? oe.inlineMessage : (ae == null ? void 0 : ae.inlineMessage) || !1), Ue = computed(() => [
      ue.e("error"),
      { [ue.em("error", "inline")]: xe.value }
    ]), At = computed(() => oe.prop ? isString(oe.prop) ? oe.prop : oe.prop.join(".") : ""), Fe = computed(() => !!(oe.label || re.label)), Pt = computed(() => oe.for || pe.value.length === 1 ? pe.value[0] : void 0), vn = computed(() => !Pt.value && Fe.value), En = !!le, $n = computed(() => {
      const Nn = ae == null ? void 0 : ae.model;
      if (!(!Nn || !oe.prop))
        return getProp(Nn, oe.prop).value;
    }), kn = computed(() => {
      const Nn = oe.rules ? castArray$1(oe.rules) : [], Bn = ae == null ? void 0 : ae.rules;
      if (Bn && oe.prop) {
        const Vn = getProp(Bn, oe.prop).value;
        Vn && Nn.push(...castArray$1(Vn));
      }
      return oe.required !== void 0 && Nn.push({ required: !!oe.required }), Nn;
    }), wn = computed(() => kn.value.length > 0), Dt = (Nn) => kn.value.filter((Vn) => !Vn.trigger || !Nn ? !0 : Array.isArray(Vn.trigger) ? Vn.trigger.includes(Nn) : Vn.trigger === Nn).map(({ trigger: Vn, ...An }) => An), Lt = computed(() => kn.value.some((Nn) => Nn.required === !0)), bn = computed(() => {
      var Nn;
      return $e.value === "error" && oe.showMessage && ((Nn = ae == null ? void 0 : ae.showMessage) != null ? Nn : !0);
    }), jt = computed(() => `${oe.label || ""}${(ae == null ? void 0 : ae.labelSuffix) || ""}`), Cn = (Nn) => {
      Ce.value = Nn;
    }, kt = (Nn) => {
      var Bn, Vn;
      const { errors: An, fields: Wn } = Nn;
      (!An || !Wn) && console.error(Nn), Cn("error"), Ne.value = An ? (Vn = (Bn = An == null ? void 0 : An[0]) == null ? void 0 : Bn.message) != null ? Vn : `${oe.prop} is required` : "", ae == null || ae.emit("validate", oe.prop, !1, Ne.value);
    }, Et = () => {
      Cn("success"), ae == null || ae.emit("validate", oe.prop, !0, "");
    }, _n = async (Nn) => {
      const Bn = At.value;
      return new Schema({
        [Bn]: Nn
      }).validate({ [Bn]: $n.value }, { firstFields: !0 }).then(() => (Et(), !0)).catch((An) => (kt(An), Promise.reject(An)));
    }, Pn = async (Nn, Bn) => {
      if (he)
        return he = !1, !1;
      const Vn = isFunction(Bn);
      if (!wn.value)
        return Bn == null || Bn(!1), !1;
      const An = Dt(Nn);
      return An.length === 0 ? (Bn == null || Bn(!0), !0) : (Cn("validating"), _n(An).then(() => (Bn == null || Bn(!0), !0)).catch((Wn) => {
        const { fields: Yn } = Wn;
        return Bn == null || Bn(!1, Yn), Vn ? !1 : Promise.reject(Yn);
      }));
    }, hn = () => {
      Cn(""), Ne.value = "";
    }, On = async () => {
      const Nn = ae == null ? void 0 : ae.model;
      if (!Nn || !oe.prop)
        return;
      const Bn = getProp(Nn, oe.prop);
      isEqual(Bn.value, _e) || (he = !0, Bn.value = clone(_e)), await nextTick(), hn();
    }, Dn = (Nn) => {
      pe.value.includes(Nn) || pe.value.push(Nn);
    }, Rn = (Nn) => {
      pe.value = pe.value.filter((Bn) => Bn !== Nn);
    };
    watch(() => oe.error, (Nn) => {
      Ne.value = Nn || "", Cn(Nn ? "error" : "");
    }, { immediate: !0 }), watch(() => oe.validateStatus, (Nn) => Cn(Nn || ""));
    const Fn = reactive({
      ...toRefs(oe),
      $el: Oe,
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
      oe.prop && (ae == null || ae.addField(Fn), _e = clone($n.value));
    }), onBeforeUnmount(() => {
      ae == null || ae.removeField(Fn);
    }), k({
      size: ie,
      validateMessage: Ne,
      validateState: Ce,
      validate: Pn,
      clearValidate: hn,
      resetField: On
    }), (Nn, Bn) => {
      var Vn;
      return openBlock(), createElementBlock("div", {
        ref_key: "formItemRef",
        ref: Oe,
        class: normalizeClass(unref(ze)),
        role: unref(vn) ? "group" : void 0,
        "aria-labelledby": unref(vn) ? unref(de) : void 0
      }, [
        createVNode(unref(FormLabelWrap), {
          "is-auto-width": unref(Ve).width === "auto",
          "update-all": ((Vn = unref(ae)) == null ? void 0 : Vn.labelWidth) === "auto"
        }, {
          default: withCtx(() => [
            unref(Fe) ? (openBlock(), createBlock(resolveDynamicComponent(unref(Pt) ? "label" : "div"), {
              key: 0,
              id: unref(de),
              for: unref(Pt),
              class: normalizeClass(unref(ue).e("label")),
              style: normalizeStyle(unref(Ve))
            }, {
              default: withCtx(() => [
                renderSlot(Nn.$slots, "label", { label: unref(jt) }, () => [
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
          renderSlot(Nn.$slots, "default"),
          createVNode(Transition, {
            name: `${unref(ue).namespace.value}-zoom-in-top`
          }, {
            default: withCtx(() => [
              unref(bn) ? renderSlot(Nn.$slots, "error", {
                key: 0,
                error: Ne.value
              }, () => [
                createElementVNode("div", {
                  class: normalizeClass(unref(Ue))
                }, toDisplayString(Ne.value), 3)
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
    }), { formItem: de } = useFormItem(), pe = computed(() => isNumber(re.modelValue) && ze(re.modelValue, -1) < re.min), Ce = computed(() => isNumber(re.modelValue) && ze(re.modelValue) > re.max), $e = computed(() => {
      const Dt = Ie(re.step);
      return isUndefined(re.precision) ? Math.max(Ie(re.modelValue), Dt) : (Dt > re.precision && debugWarn("InputNumber", "precision should not be less than the decimal places of step"), re.precision);
    }), Ne = computed(() => re.controls && re.controlsPosition === "right"), Oe = useSize(), _e = useDisabled$1(), he = computed(() => {
      if (ue.userInput !== null)
        return ue.userInput;
      let Dt = ue.currentValue;
      if (isNil(Dt))
        return "";
      if (isNumber(Dt)) {
        if (Number.isNaN(Dt))
          return "";
        isUndefined(re.precision) || (Dt = Dt.toFixed(re.precision));
      }
      return Dt;
    }), Ve = (Dt, Lt) => {
      if (isUndefined(Lt) && (Lt = $e.value), Lt === 0)
        return Math.round(Dt);
      let bn = String(Dt);
      const jt = bn.indexOf(".");
      if (jt === -1 || !bn.replace(".", "").split("")[jt + Lt])
        return Dt;
      const Et = bn.length;
      return bn.charAt(Et - 1) === "5" && (bn = `${bn.slice(0, Math.max(0, Et - 1))}6`), Number.parseFloat(Number(bn).toFixed(Lt));
    }, Ie = (Dt) => {
      if (isNil(Dt))
        return 0;
      const Lt = Dt.toString(), bn = Lt.indexOf(".");
      let jt = 0;
      return bn !== -1 && (jt = Lt.length - bn - 1), jt;
    }, ze = (Dt, Lt = 1) => isNumber(Dt) ? Ve(Dt + re.step * Lt) : ue.currentValue, xe = () => {
      if (_e.value || Ce.value)
        return;
      const Dt = re.modelValue || 0, Lt = ze(Dt);
      Fe(Lt);
    }, Ue = () => {
      if (_e.value || pe.value)
        return;
      const Dt = re.modelValue || 0, Lt = ze(Dt, -1);
      Fe(Lt);
    }, At = (Dt, Lt) => {
      const { max: bn, min: jt, step: Cn, precision: kt, stepStrictly: Et, valueOnClear: _n } = re;
      let Pn = Number(Dt);
      if (isNil(Dt) || Number.isNaN(Pn))
        return null;
      if (Dt === "") {
        if (_n === null)
          return null;
        Pn = isString(_n) ? { min: jt, max: bn }[_n] : _n;
      }
      return Et && (Pn = Ve(Math.round(Pn / Cn) * Cn, kt)), isUndefined(kt) || (Pn = Ve(Pn, kt)), (Pn > bn || Pn < jt) && (Pn = Pn > bn ? bn : jt, Lt && oe("update:modelValue", Pn)), Pn;
    }, Fe = (Dt) => {
      var Lt;
      const bn = ue.currentValue, jt = At(Dt);
      bn !== jt && (ue.userInput = null, oe("update:modelValue", jt), oe("input", jt), oe("change", jt, bn), re.validateEvent && ((Lt = de == null ? void 0 : de.validate) == null || Lt.call(de, "change").catch((Cn) => debugWarn(Cn))), ue.currentValue = jt);
    }, Pt = (Dt) => ue.userInput = Dt, vn = (Dt) => {
      const Lt = Dt !== "" ? Number(Dt) : "";
      (isNumber(Lt) && !Number.isNaN(Lt) || Dt === "") && Fe(Lt), ue.userInput = null;
    }, En = () => {
      var Dt, Lt;
      (Lt = (Dt = ie.value) == null ? void 0 : Dt.focus) == null || Lt.call(Dt);
    }, $n = () => {
      var Dt, Lt;
      (Lt = (Dt = ie.value) == null ? void 0 : Dt.blur) == null || Lt.call(Dt);
    }, kn = (Dt) => {
      oe("focus", Dt);
    }, wn = (Dt) => {
      var Lt;
      oe("blur", Dt), re.validateEvent && ((Lt = de == null ? void 0 : de.validate) == null || Lt.call(de, "blur").catch((bn) => debugWarn(bn)));
    };
    return watch(() => re.modelValue, (Dt) => {
      ue.currentValue = At(Dt, !0), ue.userInput = null;
    }, { immediate: !0 }), onMounted(() => {
      var Dt;
      const { min: Lt, max: bn, modelValue: jt } = re, Cn = (Dt = ie.value) == null ? void 0 : Dt.input;
      if (Cn.setAttribute("role", "spinbutton"), Number.isFinite(bn) ? Cn.setAttribute("aria-valuemax", String(bn)) : Cn.removeAttribute("aria-valuemax"), Number.isFinite(Lt) ? Cn.setAttribute("aria-valuemin", String(Lt)) : Cn.removeAttribute("aria-valuemin"), Cn.setAttribute("aria-valuenow", String(ue.currentValue)), Cn.setAttribute("aria-disabled", String(_e.value)), !isNumber(jt) && jt != null) {
        let kt = Number(jt);
        Number.isNaN(kt) && (kt = null), oe("update:modelValue", kt);
      }
    }), onUpdated(() => {
      var Dt;
      const Lt = (Dt = ie.value) == null ? void 0 : Dt.input;
      Lt == null || Lt.setAttribute("aria-valuenow", `${ue.currentValue}`);
    }), k({
      focus: En,
      blur: $n
    }), (Dt, Lt) => (openBlock(), createElementBlock("div", {
      class: normalizeClass([
        unref(le).b(),
        unref(le).m(unref(Oe)),
        unref(le).is("disabled", unref(_e)),
        unref(le).is("without-controls", !Dt.controls),
        unref(le).is("controls-right", unref(Ne))
      ]),
      onDragstart: Lt[0] || (Lt[0] = withModifiers(() => {
      }, ["prevent"]))
    }, [
      Dt.controls ? withDirectives((openBlock(), createElementBlock("span", {
        key: 0,
        role: "button",
        "aria-label": unref(ae)("el.inputNumber.decrease"),
        class: normalizeClass([unref(le).e("decrease"), unref(le).is("disabled", unref(pe))]),
        onKeydown: withKeys(Ue, ["enter"])
      }, [
        createVNode(unref(ElIcon), null, {
          default: withCtx(() => [
            unref(Ne) ? (openBlock(), createBlock(unref(arrow_down_default), { key: 0 })) : (openBlock(), createBlock(unref(minus_default), { key: 1 }))
          ]),
          _: 1
        })
      ], 42, _hoisted_1$a)), [
        [unref(RepeatClick), Ue]
      ]) : createCommentVNode("v-if", !0),
      Dt.controls ? withDirectives((openBlock(), createElementBlock("span", {
        key: 1,
        role: "button",
        "aria-label": unref(ae)("el.inputNumber.increase"),
        class: normalizeClass([unref(le).e("increase"), unref(le).is("disabled", unref(Ce))]),
        onKeydown: withKeys(xe, ["enter"])
      }, [
        createVNode(unref(ElIcon), null, {
          default: withCtx(() => [
            unref(Ne) ? (openBlock(), createBlock(unref(arrow_up_default), { key: 0 })) : (openBlock(), createBlock(unref(plus_default), { key: 1 }))
          ]),
          _: 1
        })
      ], 42, _hoisted_2$6)), [
        [unref(RepeatClick), xe]
      ]) : createCommentVNode("v-if", !0),
      createVNode(unref(ElInput), {
        id: Dt.id,
        ref_key: "input",
        ref: ie,
        type: "number",
        step: Dt.step,
        "model-value": unref(he),
        placeholder: Dt.placeholder,
        disabled: unref(_e),
        size: unref(Oe),
        max: Dt.max,
        min: Dt.min,
        name: Dt.name,
        label: Dt.label,
        "validate-event": !1,
        onKeydown: [
          withKeys(withModifiers(xe, ["prevent"]), ["up"]),
          withKeys(withModifiers(Ue, ["prevent"]), ["down"])
        ],
        onBlur: wn,
        onFocus: kn,
        onInput: Pt,
        onChange: vn
      }, null, 8, ["id", "step", "model-value", "placeholder", "disabled", "size", "max", "min", "name", "label", "onKeydown"])
    ], 34));
  }
});
var InputNumber = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/input-number/src/input-number.vue"]]);
const ElInputNumber = withInstall(InputNumber), selectGroupKey = "ElSelectGroup", selectKey = "ElSelect";
function useOption(e, k) {
  const oe = inject(selectKey), re = inject(selectGroupKey, { disabled: !1 }), ae = computed(() => Object.prototype.toString.call(e.value).toLowerCase() === "[object object]"), le = computed(() => oe.props.multiple ? $e(oe.props.modelValue, e.value) : Ne(e.value, oe.props.modelValue)), ie = computed(() => {
    if (oe.props.multiple) {
      const he = oe.props.modelValue || [];
      return !le.value && he.length >= oe.props.multipleLimit && oe.props.multipleLimit > 0;
    } else
      return !1;
  }), ue = computed(() => e.label || (ae.value ? "" : e.value)), de = computed(() => e.value || e.label || ""), pe = computed(() => e.disabled || k.groupDisabled || ie.value), Ce = getCurrentInstance(), $e = (he = [], Ve) => {
    if (ae.value) {
      const Ie = oe.props.valueKey;
      return he && he.some((ze) => get(ze, Ie) === get(Ve, Ie));
    } else
      return he && he.includes(Ve);
  }, Ne = (he, Ve) => {
    if (ae.value) {
      const { valueKey: Ie } = oe.props;
      return get(he, Ie) === get(Ve, Ie);
    } else
      return he === Ve;
  }, Oe = () => {
    !e.disabled && !re.disabled && (oe.hoverIndex = oe.optionsArray.indexOf(Ce.proxy));
  };
  watch(() => ue.value, () => {
    !e.created && !oe.props.remote && oe.setSelected();
  }), watch(() => e.value, (he, Ve) => {
    const { remote: Ie, valueKey: ze } = oe.props;
    if (!e.created && !Ie) {
      if (ze && typeof he == "object" && typeof Ve == "object" && he[ze] === Ve[ze])
        return;
      oe.setSelected();
    }
  }), watch(() => re.disabled, () => {
    k.groupDisabled = re.disabled;
  }, { immediate: !0 });
  const { queryChange: _e } = toRaw(oe);
  return watch(_e, (he) => {
    const { query: Ve } = unref(he), Ie = new RegExp(escapeStringRegexp(Ve), "i");
    k.visible = Ie.test(ue.value) || e.created, k.visible || oe.filteredOptionsCount--;
  }), {
    select: oe,
    currentLabel: ue,
    currentValue: de,
    itemSelected: le,
    isDisabled: pe,
    hoverItem: Oe
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
    }), { currentLabel: re, itemSelected: ae, isDisabled: le, select: ie, hoverItem: ue } = useOption(e, oe), { visible: de, hover: pe } = toRefs(oe), Ce = getCurrentInstance().proxy, $e = Ce.value;
    ie.onOptionCreate(Ce), onBeforeUnmount(() => {
      const { selected: Oe } = ie, he = (ie.props.multiple ? Oe : [Oe]).some((Ve) => Ve.value === Ce.value);
      nextTick(() => {
        ie.cachedOptions.get($e) === Ce && !he && ie.cachedOptions.delete($e);
      }), ie.onOptionDestroy($e, Ce);
    });
    function Ne() {
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
      selectOptionClick: Ne,
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
  const { t: re } = useLocale(), ae = useNamespace("select"), le = ref(null), ie = ref(null), ue = ref(null), de = ref(null), pe = ref(null), Ce = ref(null), $e = ref(-1), Ne = shallowRef({ query: "" }), Oe = shallowRef(""), _e = inject(formContextKey, {}), he = inject(formItemContextKey, {}), Ve = computed(() => !e.filterable || e.multiple || !k.visible), Ie = computed(() => e.disabled || _e.disabled), ze = computed(() => {
    const qe = e.multiple ? Array.isArray(e.modelValue) && e.modelValue.length > 0 : e.modelValue !== void 0 && e.modelValue !== null && e.modelValue !== "";
    return e.clearable && !Ie.value && k.inputHovering && qe;
  }), xe = computed(() => e.remote && e.filterable ? "" : e.suffixIcon), Ue = computed(() => ae.is("reverse", xe.value && k.visible)), At = computed(() => e.remote ? 300 : 0), Fe = computed(() => e.loading ? e.loadingText || re("el.select.loading") : e.remote && k.query === "" && k.options.size === 0 ? !1 : e.filterable && k.query && k.options.size > 0 && k.filteredOptionsCount === 0 ? e.noMatchText || re("el.select.noMatch") : k.options.size === 0 ? e.noDataText || re("el.select.noData") : null), Pt = computed(() => Array.from(k.options.values())), vn = computed(() => Array.from(k.cachedOptions.values())), En = computed(() => {
    const qe = Pt.value.filter((Sn) => !Sn.created).some((Sn) => Sn.currentLabel === k.query);
    return e.filterable && e.allowCreate && k.query !== "" && !qe;
  }), $n = useSize(), kn = computed(() => ["small"].includes($n.value) ? "small" : "default"), wn = computed({
    get() {
      return k.visible && Fe.value !== !1;
    },
    set(qe) {
      k.visible = qe;
    }
  });
  watch([() => Ie.value, () => $n.value, () => _e.size], () => {
    nextTick(() => {
      Dt();
    });
  }), watch(() => e.placeholder, (qe) => {
    k.cachedPlaceHolder = k.currentPlaceholder = qe;
  }), watch(() => e.modelValue, (qe, Sn) => {
    var xn;
    e.multiple && (Dt(), qe && qe.length > 0 || ie.value && k.query !== "" ? k.currentPlaceholder = "" : k.currentPlaceholder = k.cachedPlaceHolder, e.filterable && !e.reserveKeyword && (k.query = "", Lt(k.query))), Cn(), e.filterable && !e.multiple && (k.inputLength = 20), !isEqual(qe, Sn) && e.validateEvent && ((xn = he.validate) == null || xn.call(he, "change").catch((jn) => debugWarn(jn)));
  }, {
    flush: "post",
    deep: !0
  }), watch(() => k.visible, (qe) => {
    var Sn, xn, jn;
    qe ? ((xn = (Sn = ue.value) == null ? void 0 : Sn.updatePopper) == null || xn.call(Sn), e.filterable && (k.filteredOptionsCount = k.optionsCount, k.query = e.remote ? "" : k.selectedLabel, e.multiple ? (jn = ie.value) == null || jn.focus() : k.selectedLabel && (k.currentPlaceholder = `${k.selectedLabel}`, k.selectedLabel = ""), Lt(k.query), !e.multiple && !e.remote && (Ne.value.query = "", triggerRef(Ne), triggerRef(Oe)))) : (ie.value && ie.value.blur(), k.query = "", k.previousQuery = null, k.selectedLabel = "", k.inputLength = 20, k.menuVisibleOnFocus = !1, Et(), nextTick(() => {
      ie.value && ie.value.value === "" && k.selected.length === 0 && (k.currentPlaceholder = k.cachedPlaceHolder);
    }), e.multiple || (k.selected && (e.filterable && e.allowCreate && k.createdSelected && k.createdLabel ? k.selectedLabel = k.createdLabel : k.selectedLabel = k.selected.currentLabel, e.filterable && (k.query = k.selectedLabel)), e.filterable && (k.currentPlaceholder = k.cachedPlaceHolder))), oe.emit("visible-change", qe);
  }), watch(() => k.options.entries(), () => {
    var qe, Sn, xn;
    if (!isClient$1)
      return;
    (Sn = (qe = ue.value) == null ? void 0 : qe.updatePopper) == null || Sn.call(qe), e.multiple && Dt();
    const jn = ((xn = pe.value) == null ? void 0 : xn.querySelectorAll("input")) || [];
    Array.from(jn).includes(document.activeElement) || Cn(), e.defaultFirstOption && (e.filterable || e.remote) && k.filteredOptionsCount && jt();
  }, {
    flush: "post"
  }), watch(() => k.hoverIndex, (qe) => {
    typeof qe == "number" && qe > -1 && ($e.value = Pt.value[qe] || {}), Pt.value.forEach((Sn) => {
      Sn.hover = $e.value === Sn;
    });
  });
  const Dt = () => {
    e.collapseTags && !e.filterable || nextTick(() => {
      var qe, Sn;
      if (!le.value)
        return;
      const xn = le.value.$el.querySelector("input"), jn = de.value, Ln = getComponentSize($n.value || _e.size);
      xn.style.height = `${(k.selected.length === 0 ? Ln : Math.max(jn ? jn.clientHeight + (jn.clientHeight > Ln ? 6 : 0) : 0, Ln)) - 2}px`, k.tagInMultiLine = Number.parseFloat(xn.style.height) >= Ln, k.visible && Fe.value !== !1 && ((Sn = (qe = ue.value) == null ? void 0 : qe.updatePopper) == null || Sn.call(qe));
    });
  }, Lt = (qe) => {
    if (!(k.previousQuery === qe || k.isOnComposition)) {
      if (k.previousQuery === null && (typeof e.filterMethod == "function" || typeof e.remoteMethod == "function")) {
        k.previousQuery = qe;
        return;
      }
      k.previousQuery = qe, nextTick(() => {
        var Sn, xn;
        k.visible && ((xn = (Sn = ue.value) == null ? void 0 : Sn.updatePopper) == null || xn.call(Sn));
      }), k.hoverIndex = -1, e.multiple && e.filterable && nextTick(() => {
        const Sn = ie.value.value.length * 15 + 20;
        k.inputLength = e.collapseTags ? Math.min(50, Sn) : Sn, bn(), Dt();
      }), e.remote && typeof e.remoteMethod == "function" ? (k.hoverIndex = -1, e.remoteMethod(qe)) : typeof e.filterMethod == "function" ? (e.filterMethod(qe), triggerRef(Oe)) : (k.filteredOptionsCount = k.optionsCount, Ne.value.query = qe, triggerRef(Ne), triggerRef(Oe)), e.defaultFirstOption && (e.filterable || e.remote) && k.filteredOptionsCount && jt();
    }
  }, bn = () => {
    k.currentPlaceholder !== "" && (k.currentPlaceholder = ie.value.value ? "" : k.cachedPlaceHolder);
  }, jt = () => {
    const qe = Pt.value.filter((jn) => jn.visible && !jn.disabled && !jn.states.groupDisabled), Sn = qe.find((jn) => jn.created), xn = qe[0];
    k.hoverIndex = An(Pt.value, Sn || xn);
  }, Cn = () => {
    var qe;
    if (e.multiple)
      k.selectedLabel = "";
    else {
      const xn = kt(e.modelValue);
      (qe = xn.props) != null && qe.created ? (k.createdLabel = xn.props.value, k.createdSelected = !0) : k.createdSelected = !1, k.selectedLabel = xn.currentLabel, k.selected = xn, e.filterable && (k.query = k.selectedLabel);
      return;
    }
    const Sn = [];
    Array.isArray(e.modelValue) && e.modelValue.forEach((xn) => {
      Sn.push(kt(xn));
    }), k.selected = Sn, nextTick(() => {
      Dt();
    });
  }, kt = (qe) => {
    let Sn;
    const xn = toRawType(qe).toLowerCase() === "object", jn = toRawType(qe).toLowerCase() === "null", Ln = toRawType(qe).toLowerCase() === "undefined";
    for (let uo = k.cachedOptions.size - 1; uo >= 0; uo--) {
      const io = vn.value[uo];
      if (xn ? get(io.value, e.valueKey) === get(qe, e.valueKey) : io.value === qe) {
        Sn = {
          value: qe,
          currentLabel: io.currentLabel,
          isDisabled: io.isDisabled
        };
        break;
      }
    }
    if (Sn)
      return Sn;
    const Kn = xn ? qe.label : !jn && !Ln ? qe : "", Un = {
      value: qe,
      currentLabel: Kn
    };
    return e.multiple && (Un.hitState = !1), Un;
  }, Et = () => {
    setTimeout(() => {
      const qe = e.valueKey;
      e.multiple ? k.selected.length > 0 ? k.hoverIndex = Math.min.apply(null, k.selected.map((Sn) => Pt.value.findIndex((xn) => get(xn, qe) === get(Sn, qe)))) : k.hoverIndex = -1 : k.hoverIndex = Pt.value.findIndex((Sn) => ro(Sn) === ro(k.selected));
    }, 300);
  }, _n = () => {
    var qe, Sn;
    Pn(), (Sn = (qe = ue.value) == null ? void 0 : qe.updatePopper) == null || Sn.call(qe), e.multiple && !e.filterable && Dt();
  }, Pn = () => {
    var qe;
    k.inputWidth = (qe = le.value) == null ? void 0 : qe.$el.getBoundingClientRect().width;
  }, hn = () => {
    e.filterable && k.query !== k.selectedLabel && (k.query = k.selectedLabel, Lt(k.query));
  }, On = debounce(() => {
    hn();
  }, At.value), Dn = debounce((qe) => {
    Lt(qe.target.value);
  }, At.value), Rn = (qe) => {
    isEqual(e.modelValue, qe) || oe.emit(CHANGE_EVENT, qe);
  }, Fn = (qe) => {
    if (qe.target.value.length <= 0 && !no()) {
      const Sn = e.modelValue.slice();
      Sn.pop(), oe.emit(UPDATE_MODEL_EVENT, Sn), Rn(Sn);
    }
    qe.target.value.length === 1 && e.modelValue.length === 0 && (k.currentPlaceholder = k.cachedPlaceHolder);
  }, Nn = (qe, Sn) => {
    const xn = k.selected.indexOf(Sn);
    if (xn > -1 && !Ie.value) {
      const jn = e.modelValue.slice();
      jn.splice(xn, 1), oe.emit(UPDATE_MODEL_EVENT, jn), Rn(jn), oe.emit("remove-tag", Sn.value);
    }
    qe.stopPropagation();
  }, Bn = (qe) => {
    qe.stopPropagation();
    const Sn = e.multiple ? [] : "";
    if (typeof Sn != "string")
      for (const xn of k.selected)
        xn.isDisabled && Sn.push(xn.value);
    oe.emit(UPDATE_MODEL_EVENT, Sn), Rn(Sn), k.visible = !1, oe.emit("clear");
  }, Vn = (qe, Sn) => {
    var xn;
    if (e.multiple) {
      const jn = (e.modelValue || []).slice(), Ln = An(jn, qe.value);
      Ln > -1 ? jn.splice(Ln, 1) : (e.multipleLimit <= 0 || jn.length < e.multipleLimit) && jn.push(qe.value), oe.emit(UPDATE_MODEL_EVENT, jn), Rn(jn), qe.created && (k.query = "", Lt(""), k.inputLength = 20), e.filterable && ((xn = ie.value) == null || xn.focus());
    } else
      oe.emit(UPDATE_MODEL_EVENT, qe.value), Rn(qe.value), k.visible = !1;
    k.isSilentBlur = Sn, Wn(), !k.visible && nextTick(() => {
      Yn(qe);
    });
  }, An = (qe = [], Sn) => {
    if (!isObject$1(Sn))
      return qe.indexOf(Sn);
    const xn = e.valueKey;
    let jn = -1;
    return qe.some((Ln, Kn) => get(Ln, xn) === get(Sn, xn) ? (jn = Kn, !0) : !1), jn;
  }, Wn = () => {
    k.softFocus = !0;
    const qe = ie.value || le.value;
    qe && (qe == null || qe.focus());
  }, Yn = (qe) => {
    var Sn, xn, jn, Ln, Kn;
    const Un = Array.isArray(qe) ? qe[0] : qe;
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
  }, Xn = (qe) => {
    k.optionsCount++, k.filteredOptionsCount++, k.options.set(qe.value, qe), k.cachedOptions.set(qe.value, qe);
  }, eo = (qe, Sn) => {
    k.options.get(qe) === Sn && (k.optionsCount--, k.filteredOptionsCount--, k.options.delete(qe));
  }, qn = (qe) => {
    qe.code !== EVENT_CODE.backspace && no(!1), k.inputLength = ie.value.value.length * 15 + 20, Dt();
  }, no = (qe) => {
    if (!Array.isArray(k.selected))
      return;
    const Sn = k.selected[k.selected.length - 1];
    if (!!Sn)
      return qe === !0 || qe === !1 ? (Sn.hitState = qe, qe) : (Sn.hitState = !Sn.hitState, Sn.hitState);
  }, oo = (qe) => {
    const Sn = qe.target.value;
    if (qe.type === "compositionend")
      k.isOnComposition = !1, nextTick(() => Lt(Sn));
    else {
      const xn = Sn[Sn.length - 1] || "";
      k.isOnComposition = !isKorean(xn);
    }
  }, zn = () => {
    nextTick(() => Yn(k.selected));
  }, Hn = (qe) => {
    k.softFocus ? k.softFocus = !1 : ((e.automaticDropdown || e.filterable) && (e.filterable && !k.visible && (k.menuVisibleOnFocus = !0), k.visible = !0), oe.emit("focus", qe));
  }, Gn = () => {
    var qe;
    k.visible = !1, (qe = le.value) == null || qe.blur();
  }, Zn = (qe) => {
    nextTick(() => {
      k.isSilentBlur ? k.isSilentBlur = !1 : oe.emit("blur", qe);
    }), k.softFocus = !1;
  }, lo = (qe) => {
    Bn(qe);
  }, ao = () => {
    k.visible = !1;
  }, In = (qe) => {
    k.visible && (qe.preventDefault(), qe.stopPropagation(), k.visible = !1);
  }, Jn = () => {
    var qe;
    Ie.value || (k.menuVisibleOnFocus ? k.menuVisibleOnFocus = !1 : k.visible = !k.visible, k.visible && ((qe = ie.value || le.value) == null || qe.focus()));
  }, Qn = () => {
    k.visible ? Pt.value[k.hoverIndex] && Vn(Pt.value[k.hoverIndex], void 0) : Jn();
  }, ro = (qe) => isObject$1(qe.value) ? get(qe.value, e.valueKey) : qe.value, Tn = computed(() => Pt.value.filter((qe) => qe.visible).every((qe) => qe.disabled)), Mn = (qe) => {
    if (!k.visible) {
      k.visible = !0;
      return;
    }
    if (!(k.options.size === 0 || k.filteredOptionsCount === 0) && !k.isOnComposition && !Tn.value) {
      qe === "next" ? (k.hoverIndex++, k.hoverIndex === k.options.size && (k.hoverIndex = 0)) : qe === "prev" && (k.hoverIndex--, k.hoverIndex < 0 && (k.hoverIndex = k.options.size - 1));
      const Sn = Pt.value[k.hoverIndex];
      (Sn.disabled === !0 || Sn.states.groupDisabled === !0 || !Sn.visible) && Mn(qe), nextTick(() => Yn($e.value));
    }
  };
  return {
    optionsArray: Pt,
    selectSize: $n,
    handleResize: _n,
    debouncedOnInputChange: On,
    debouncedQueryChange: Dn,
    deletePrevTag: Fn,
    deleteTag: Nn,
    deleteSelected: Bn,
    handleOptionSelect: Vn,
    scrollToOption: Yn,
    readonly: Ve,
    resetInputHeight: Dt,
    showClose: ze,
    iconComponent: xe,
    iconReverse: Ue,
    showNewOption: En,
    collapseTagSize: kn,
    setSelected: Cn,
    managePlaceholder: bn,
    selectDisabled: Ie,
    emptyText: Fe,
    toggleLastOptionHitState: no,
    resetInputState: qn,
    handleComposition: oo,
    onOptionCreate: Xn,
    onOptionDestroy: eo,
    handleMenuEnter: zn,
    handleFocus: Hn,
    blur: Gn,
    handleBlur: Zn,
    handleClearClick: lo,
    handleClose: ao,
    handleKeydownEscape: In,
    toggleMenu: Jn,
    selectOption: Qn,
    getValueKey: ro,
    navigateOptions: Mn,
    dropMenuVisible: wn,
    queryChange: Ne,
    groupQueryChange: Oe,
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
      debouncedOnInputChange: $e,
      debouncedQueryChange: Ne,
      deletePrevTag: Oe,
      deleteTag: _e,
      deleteSelected: he,
      handleOptionSelect: Ve,
      scrollToOption: Ie,
      setSelected: ze,
      resetInputHeight: xe,
      managePlaceholder: Ue,
      showClose: At,
      selectDisabled: Fe,
      iconComponent: Pt,
      iconReverse: vn,
      showNewOption: En,
      emptyText: $n,
      toggleLastOptionHitState: kn,
      resetInputState: wn,
      handleComposition: Dt,
      onOptionCreate: Lt,
      onOptionDestroy: bn,
      handleMenuEnter: jt,
      handleFocus: Cn,
      blur: kt,
      handleBlur: Et,
      handleClearClick: _n,
      handleClose: Pn,
      handleKeydownEscape: hn,
      toggleMenu: On,
      selectOption: Dn,
      getValueKey: Rn,
      navigateOptions: Fn,
      dropMenuVisible: Nn,
      reference: Bn,
      input: Vn,
      tooltipRef: An,
      tags: Wn,
      selectWrapper: Yn,
      scrollbar: Xn,
      queryChange: eo,
      groupQueryChange: qn
    } = useSelect(e, le, k), { focus: no } = useFocus(Bn), {
      inputWidth: oo,
      selected: zn,
      inputLength: Hn,
      filteredOptionsCount: Gn,
      visible: Zn,
      softFocus: lo,
      selectedLabel: ao,
      hoverIndex: In,
      query: Jn,
      inputHovering: Qn,
      currentPlaceholder: ro,
      menuVisibleOnFocus: Tn,
      isOnComposition: Mn,
      isSilentBlur: qe,
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
      filteredOptionsCount: Gn,
      hoverIndex: In,
      handleOptionSelect: Ve,
      onOptionCreate: Lt,
      onOptionDestroy: bn,
      selectWrapper: Yn,
      selected: zn,
      setSelected: ze,
      queryChange: eo,
      groupQueryChange: qn
    })), onMounted(() => {
      le.cachedPlaceHolder = ro.value = e.placeholder || ae("el.select.placeholder"), e.multiple && Array.isArray(e.modelValue) && e.modelValue.length > 0 && (ro.value = ""), useResizeObserver(Yn, pe), e.remote && e.multiple && xe(), nextTick(() => {
        const so = Bn.value && Bn.value.$el;
        if (!!so && (oo.value = so.getBoundingClientRect().width, k.slots.prefix)) {
          const to = so.querySelector(`.${re.e("prefix")}`);
          Ln.value = Math.max(to.getBoundingClientRect().width + 5, 30);
        }
      }), ze();
    }), e.multiple && !Array.isArray(e.modelValue) && k.emit(UPDATE_MODEL_EVENT, []), !e.multiple && Array.isArray(e.modelValue) && k.emit(UPDATE_MODEL_EVENT, "");
    const io = computed(() => {
      var so, to;
      return (to = (so = An.value) == null ? void 0 : so.popperRef) == null ? void 0 : to.contentRef;
    });
    return {
      tagInMultiLine: Kn,
      prefixWidth: Ln,
      selectSize: ue,
      readonly: de,
      handleResize: pe,
      collapseTagSize: Ce,
      debouncedOnInputChange: $e,
      debouncedQueryChange: Ne,
      deletePrevTag: Oe,
      deleteTag: _e,
      deleteSelected: he,
      handleOptionSelect: Ve,
      scrollToOption: Ie,
      inputWidth: oo,
      selected: zn,
      inputLength: Hn,
      filteredOptionsCount: Gn,
      visible: Zn,
      softFocus: lo,
      selectedLabel: ao,
      hoverIndex: In,
      query: Jn,
      inputHovering: Qn,
      currentPlaceholder: ro,
      menuVisibleOnFocus: Tn,
      isOnComposition: Mn,
      isSilentBlur: qe,
      options: Sn,
      resetInputHeight: xe,
      managePlaceholder: Ue,
      showClose: At,
      selectDisabled: Fe,
      iconComponent: Pt,
      iconReverse: vn,
      showNewOption: En,
      emptyText: $n,
      toggleLastOptionHitState: kn,
      resetInputState: wn,
      handleComposition: Dt,
      handleMenuEnter: jt,
      handleFocus: Cn,
      blur: kt,
      handleBlur: Et,
      handleClearClick: _n,
      handleClose: Pn,
      handleKeydownEscape: hn,
      toggleMenu: On,
      selectOption: Dn,
      getValueKey: Rn,
      navigateOptions: Fn,
      dropMenuVisible: Nn,
      focus: no,
      reference: Bn,
      input: Vn,
      tooltipRef: An,
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
  const ie = resolveComponent("el-tag"), ue = resolveComponent("el-tooltip"), de = resolveComponent("el-icon"), pe = resolveComponent("el-input"), Ce = resolveComponent("el-option"), $e = resolveComponent("el-scrollbar"), Ne = resolveComponent("el-select-menu"), Oe = resolveDirective("click-outside");
  return withDirectives((openBlock(), createElementBlock("div", {
    ref: "selectWrapper",
    class: normalizeClass(e.wrapperKls),
    onClick: k[22] || (k[22] = withModifiers((..._e) => e.toggleMenu && e.toggleMenu(..._e), ["stop"]))
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
                onClose: k[0] || (k[0] = (_e) => e.deleteTag(_e, e.selected[0]))
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
                        (openBlock(!0), createElementBlock(Fragment, null, renderList(e.selected.slice(1), (_e, he) => (openBlock(), createElementBlock("div", {
                          key: he,
                          class: normalizeClass(e.nsSelect.e("collapse-tag"))
                        }, [
                          (openBlock(), createBlock(ie, {
                            key: e.getValueKey(_e),
                            class: "in-tooltip",
                            closable: !e.selectDisabled && !_e.isDisabled,
                            size: e.collapseTagSize,
                            hit: _e.hitState,
                            type: e.tagType,
                            "disable-transitions": "",
                            style: { margin: "2px" },
                            onClose: (Ve) => e.deleteTag(Ve, _e)
                          }, {
                            default: withCtx(() => [
                              createElementVNode("span", {
                                class: normalizeClass(e.nsSelect.e("tags-text")),
                                style: normalizeStyle({
                                  maxWidth: e.inputWidth - 75 + "px"
                                })
                              }, toDisplayString(_e.currentLabel), 7)
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
                  (openBlock(!0), createElementBlock(Fragment, null, renderList(e.selected, (_e) => (openBlock(), createBlock(ie, {
                    key: e.getValueKey(_e),
                    closable: !e.selectDisabled && !_e.isDisabled,
                    size: e.collapseTagSize,
                    hit: _e.hitState,
                    type: e.tagType,
                    "disable-transitions": "",
                    onClose: (he) => e.deleteTag(he, _e)
                  }, {
                    default: withCtx(() => [
                      createElementVNode("span", {
                        class: normalizeClass(e.nsSelect.e("tags-text")),
                        style: normalizeStyle({ maxWidth: e.inputWidth - 75 + "px" })
                      }, toDisplayString(_e.currentLabel), 7)
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
              "onUpdate:modelValue": k[1] || (k[1] = (_e) => e.query = _e),
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
              onFocus: k[2] || (k[2] = (..._e) => e.handleFocus && e.handleFocus(..._e)),
              onBlur: k[3] || (k[3] = (..._e) => e.handleBlur && e.handleBlur(..._e)),
              onKeyup: k[4] || (k[4] = (..._e) => e.managePlaceholder && e.managePlaceholder(..._e)),
              onKeydown: [
                k[5] || (k[5] = (..._e) => e.resetInputState && e.resetInputState(..._e)),
                k[6] || (k[6] = withKeys(withModifiers((_e) => e.navigateOptions("next"), ["prevent"]), ["down"])),
                k[7] || (k[7] = withKeys(withModifiers((_e) => e.navigateOptions("prev"), ["prevent"]), ["up"])),
                k[8] || (k[8] = withKeys((..._e) => e.handleKeydownEscape && e.handleKeydownEscape(..._e), ["esc"])),
                k[9] || (k[9] = withKeys(withModifiers((..._e) => e.selectOption && e.selectOption(..._e), ["stop", "prevent"]), ["enter"])),
                k[10] || (k[10] = withKeys((..._e) => e.deletePrevTag && e.deletePrevTag(..._e), ["delete"])),
                k[11] || (k[11] = withKeys((_e) => e.visible = !1, ["tab"]))
              ],
              onCompositionstart: k[12] || (k[12] = (..._e) => e.handleComposition && e.handleComposition(..._e)),
              onCompositionupdate: k[13] || (k[13] = (..._e) => e.handleComposition && e.handleComposition(..._e)),
              onCompositionend: k[14] || (k[14] = (..._e) => e.handleComposition && e.handleComposition(..._e)),
              onInput: k[15] || (k[15] = (..._e) => e.debouncedQueryChange && e.debouncedQueryChange(..._e))
            }, null, 46, _hoisted_2$5)), [
              [vModelText, e.query]
            ]) : createCommentVNode("v-if", !0)
          ], 6)) : createCommentVNode("v-if", !0),
          createVNode(pe, {
            id: e.id,
            ref: "reference",
            modelValue: e.selectedLabel,
            "onUpdate:modelValue": k[16] || (k[16] = (_e) => e.selectedLabel = _e),
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
              k[17] || (k[17] = withKeys(withModifiers((_e) => e.navigateOptions("next"), ["stop", "prevent"]), ["down"])),
              k[18] || (k[18] = withKeys(withModifiers((_e) => e.navigateOptions("prev"), ["stop", "prevent"]), ["up"])),
              withKeys(withModifiers(e.selectOption, ["stop", "prevent"]), ["enter"]),
              withKeys(e.handleKeydownEscape, ["esc"]),
              k[19] || (k[19] = withKeys((_e) => e.visible = !1, ["tab"]))
            ],
            onMouseenter: k[20] || (k[20] = (_e) => e.inputHovering = !0),
            onMouseleave: k[21] || (k[21] = (_e) => e.inputHovering = !1)
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
        createVNode(Ne, null, {
          default: withCtx(() => [
            withDirectives(createVNode($e, {
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
    [Oe, e.handleClose, e.popperPaneRef]
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
        var $e;
        Ce.type && Ce.type.name === "ElOption" && Ce.component && Ce.component.proxy ? pe.push(Ce.component.proxy) : ($e = Ce.children) != null && $e.length && pe.push(...ie(Ce));
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
    function ae(jt, Cn) {
      const kt = (Pn) => isObject$1(Pn), Et = Object.keys(Cn).map((Pn) => +Pn).filter((Pn) => {
        const hn = Cn[Pn];
        return (kt(hn) ? hn.excluded : !1) ? jt < Pn : jt <= Pn;
      }).sort((Pn, hn) => Pn - hn), _n = Cn[Et[0]];
      return kt(_n) && _n.value || _n;
    }
    const le = inject(formContextKey, void 0), ie = inject(formItemContextKey, void 0), ue = useSize(), de = useNamespace("rate"), { inputId: pe, isLabeledByFormItem: Ce } = useFormItemInputId(re, {
      formItemContext: ie
    }), $e = ref(re.modelValue), Ne = ref(-1), Oe = ref(!0), _e = computed(() => [de.b(), de.m(ue.value)]), he = computed(() => re.disabled || (le == null ? void 0 : le.disabled)), Ve = computed(() => de.cssVarBlock({
      "void-color": re.voidColor,
      "disabled-void-color": re.disabledVoidColor,
      "fill-color": Ue.value
    })), Ie = computed(() => {
      let jt = "";
      return re.showScore ? jt = re.scoreTemplate.replace(/\{\s*value\s*\}/, he.value ? `${re.modelValue}` : `${$e.value}`) : re.showText && (jt = re.texts[Math.ceil($e.value) - 1]), jt;
    }), ze = computed(() => re.modelValue * 100 - Math.floor(re.modelValue) * 100), xe = computed(() => isArray(re.colors) ? {
      [re.lowThreshold]: re.colors[0],
      [re.highThreshold]: { value: re.colors[1], excluded: !0 },
      [re.max]: re.colors[2]
    } : re.colors), Ue = computed(() => {
      const jt = ae($e.value, xe.value);
      return isObject$1(jt) ? "" : jt;
    }), At = computed(() => {
      let jt = "";
      return he.value ? jt = `${ze.value}%` : re.allowHalf && (jt = "50%"), {
        color: Ue.value,
        width: jt
      };
    }), Fe = computed(() => isArray(re.icons) ? {
      [re.lowThreshold]: re.icons[0],
      [re.highThreshold]: {
        value: re.icons[1],
        excluded: !0
      },
      [re.max]: re.icons[2]
    } : re.icons), Pt = computed(() => ae(re.modelValue, Fe.value)), vn = computed(() => he.value ? re.disabledVoidIcon : re.voidIcon), En = computed(() => ae($e.value, Fe.value)), $n = computed(() => {
      const jt = Array.from({ length: re.max }), Cn = $e.value;
      return jt.fill(En.value, 0, Cn), jt.fill(vn.value, Cn, re.max), jt;
    });
    function kn(jt) {
      const Cn = he.value && ze.value > 0 && jt - 1 < re.modelValue && jt > re.modelValue, kt = re.allowHalf && Oe.value && jt - 0.5 <= $e.value && jt > $e.value;
      return Cn || kt;
    }
    function wn(jt) {
      he.value || (re.allowHalf && Oe.value ? (oe(UPDATE_MODEL_EVENT, $e.value), re.modelValue !== $e.value && oe("change", $e.value)) : (oe(UPDATE_MODEL_EVENT, jt), re.modelValue !== jt && oe("change", jt)));
    }
    function Dt(jt) {
      if (he.value)
        return;
      let Cn = $e.value;
      const kt = jt.code;
      return kt === EVENT_CODE.up || kt === EVENT_CODE.right ? (re.allowHalf ? Cn += 0.5 : Cn += 1, jt.stopPropagation(), jt.preventDefault()) : (kt === EVENT_CODE.left || kt === EVENT_CODE.down) && (re.allowHalf ? Cn -= 0.5 : Cn -= 1, jt.stopPropagation(), jt.preventDefault()), Cn = Cn < 0 ? 0 : Cn, Cn = Cn > re.max ? re.max : Cn, oe(UPDATE_MODEL_EVENT, Cn), oe("change", Cn), Cn;
    }
    function Lt(jt, Cn) {
      if (!he.value) {
        if (re.allowHalf) {
          let kt = Cn.target;
          hasClass$1(kt, de.e("item")) && (kt = kt.querySelector(`.${de.e("icon")}`)), (kt.clientWidth === 0 || hasClass$1(kt, de.e("decimal"))) && (kt = kt.parentNode), Oe.value = Cn.offsetX * 2 <= kt.clientWidth, $e.value = Oe.value ? jt - 0.5 : jt;
        } else
          $e.value = jt;
        Ne.value = jt;
      }
    }
    function bn() {
      he.value || (re.allowHalf && (Oe.value = re.modelValue !== Math.floor(re.modelValue)), $e.value = re.modelValue, Ne.value = -1);
    }
    return watch(() => re.modelValue, (jt) => {
      $e.value = jt, Oe.value = re.modelValue !== Math.floor(re.modelValue);
    }), re.modelValue || oe(UPDATE_MODEL_EVENT, 0), k({
      setCurrentValue: Lt,
      resetCurrentValue: bn
    }), (jt, Cn) => {
      var kt;
      return openBlock(), createElementBlock("div", {
        id: unref(pe),
        class: normalizeClass([unref(_e), unref(de).is("disabled", unref(he))]),
        role: "slider",
        "aria-label": unref(Ce) ? void 0 : jt.label || "rating",
        "aria-labelledby": unref(Ce) ? (kt = unref(ie)) == null ? void 0 : kt.labelId : void 0,
        "aria-valuenow": $e.value,
        "aria-valuetext": unref(Ie) || void 0,
        "aria-valuemin": "0",
        "aria-valuemax": jt.max,
        tabindex: "0",
        style: normalizeStyle(unref(Ve)),
        onKeydown: Dt
      }, [
        (openBlock(!0), createElementBlock(Fragment, null, renderList(jt.max, (Et, _n) => (openBlock(), createElementBlock("span", {
          key: _n,
          class: normalizeClass(unref(de).e("item")),
          onMousemove: (Pn) => Lt(Et, Pn),
          onMouseleave: bn,
          onClick: (Pn) => wn(Et)
        }, [
          createVNode(unref(ElIcon), {
            class: normalizeClass([
              unref(de).e("icon"),
              { hover: Ne.value === Et },
              unref(de).is("active", Et <= $e.value)
            ])
          }, {
            default: withCtx(() => [
              kn(Et) ? createCommentVNode("v-if", !0) : (openBlock(), createBlock(resolveDynamicComponent(unref($n)[Et - 1]), { key: 0 })),
              kn(Et) ? (openBlock(), createBlock(unref(ElIcon), {
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
  }, pe = computed(() => e.disabled || (re == null ? void 0 : re.disabled) || !1), Ce = computed(() => Math.min(k.firstValue, k.secondValue)), $e = computed(() => Math.max(k.firstValue, k.secondValue)), Ne = computed(() => e.range ? `${100 * ($e.value - Ce.value) / (e.max - e.min)}%` : `${100 * (k.firstValue - e.min) / (e.max - e.min)}%`), Oe = computed(() => e.range ? `${100 * (Ce.value - e.min) / (e.max - e.min)}%` : "0%"), _e = computed(() => e.vertical ? { height: e.height } : {}), he = computed(() => e.vertical ? {
    height: Ne.value,
    bottom: Oe.value
  } : {
    width: Ne.value,
    left: Oe.value
  }), Ve = () => {
    le.value && (k.sliderSize = le.value[`client${e.vertical ? "Height" : "Width"}`]);
  }, Ie = (kn) => {
    const wn = e.min + kn * (e.max - e.min) / 100;
    if (!e.range)
      return ie;
    let Dt;
    return Math.abs(Ce.value - wn) < Math.abs($e.value - wn) ? Dt = k.firstValue < k.secondValue ? "firstButton" : "secondButton" : Dt = k.firstValue > k.secondValue ? "firstButton" : "secondButton", de[Dt];
  }, ze = (kn) => {
    const wn = Ie(kn);
    return wn.value.setPosition(kn), wn;
  }, xe = (kn) => {
    k.firstValue = kn, At(e.range ? [Ce.value, $e.value] : kn);
  }, Ue = (kn) => {
    k.secondValue = kn, e.range && At([Ce.value, $e.value]);
  }, At = (kn) => {
    oe(UPDATE_MODEL_EVENT, kn), oe(INPUT_EVENT, kn);
  }, Fe = async () => {
    await nextTick(), oe(CHANGE_EVENT, e.range ? [Ce.value, $e.value] : e.modelValue);
  }, Pt = (kn) => {
    var wn, Dt, Lt, bn, jt, Cn;
    if (pe.value || k.dragging)
      return;
    Ve();
    let kt = 0;
    if (e.vertical) {
      const Et = (Lt = (Dt = (wn = kn.touches) == null ? void 0 : wn.item(0)) == null ? void 0 : Dt.clientY) != null ? Lt : kn.clientY;
      kt = (le.value.getBoundingClientRect().bottom - Et) / k.sliderSize * 100;
    } else {
      const Et = (Cn = (jt = (bn = kn.touches) == null ? void 0 : bn.item(0)) == null ? void 0 : jt.clientX) != null ? Cn : kn.clientX, _n = le.value.getBoundingClientRect().left;
      kt = (Et - _n) / k.sliderSize * 100;
    }
    if (!(kt < 0 || kt > 100))
      return ze(kt);
  };
  return {
    elFormItem: ae,
    slider: le,
    firstButton: ie,
    secondButton: ue,
    sliderDisabled: pe,
    minValue: Ce,
    maxValue: $e,
    runwayStyle: _e,
    barStyle: he,
    resetSize: Ve,
    setPosition: ze,
    emitChange: Fe,
    onSliderWrapperPrevent: (kn) => {
      var wn, Dt;
      (((wn = de.firstButton.value) == null ? void 0 : wn.dragging) || ((Dt = de.secondButton.value) == null ? void 0 : Dt.dragging)) && kn.preventDefault();
    },
    onSliderClick: (kn) => {
      Pt(kn) && Fe();
    },
    onSliderDown: async (kn) => {
      const wn = Pt(kn);
      wn && (await nextTick(), wn.value.onButtonDown(kn));
    },
    setFirstValue: xe,
    setSecondValue: Ue
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
    emitChange: $e,
    resetSize: Ne,
    updateDragging: Oe
  } = inject(sliderContextKey), { tooltip: _e, tooltipVisible: he, formatValue: Ve, displayTooltip: Ie, hideTooltip: ze } = useTooltip(e, Ce, ue), xe = ref(), Ue = computed(() => `${(e.modelValue - ae.value) / (le.value - ae.value) * 100}%`), At = computed(() => e.vertical ? { bottom: Ue.value } : { left: Ue.value }), Fe = () => {
    k.hovering = !0, Ie();
  }, Pt = () => {
    k.hovering = !1, k.dragging || ze();
  }, vn = (hn) => {
    re.value || (hn.preventDefault(), kt(hn), window.addEventListener("mousemove", Et), window.addEventListener("touchmove", Et), window.addEventListener("mouseup", _n), window.addEventListener("touchend", _n), window.addEventListener("contextmenu", _n), xe.value.focus());
  }, En = (hn) => {
    re.value || (k.newPosition = Number.parseFloat(Ue.value) + hn / (le.value - ae.value) * 100, Pn(k.newPosition), $e());
  }, $n = () => {
    En(-ie.value);
  }, kn = () => {
    En(ie.value);
  }, wn = () => {
    En(-ie.value * 4);
  }, Dt = () => {
    En(ie.value * 4);
  }, Lt = () => {
    re.value || (Pn(0), $e());
  }, bn = () => {
    re.value || (Pn(100), $e());
  }, jt = (hn) => {
    let On = !0;
    [left, down].includes(hn.key) ? $n() : [right, up].includes(hn.key) ? kn() : hn.key === home ? Lt() : hn.key === end ? bn() : hn.key === pageDown ? wn() : hn.key === pageUp ? Dt() : On = !1, On && hn.preventDefault();
  }, Cn = (hn) => {
    let On, Dn;
    return hn.type.startsWith("touch") ? (Dn = hn.touches[0].clientY, On = hn.touches[0].clientX) : (Dn = hn.clientY, On = hn.clientX), {
      clientX: On,
      clientY: Dn
    };
  }, kt = (hn) => {
    k.dragging = !0, k.isClick = !0;
    const { clientX: On, clientY: Dn } = Cn(hn);
    e.vertical ? k.startY = Dn : k.startX = On, k.startPosition = Number.parseFloat(Ue.value), k.newPosition = k.startPosition;
  }, Et = (hn) => {
    if (k.dragging) {
      k.isClick = !1, Ie(), Ne();
      let On;
      const { clientX: Dn, clientY: Rn } = Cn(hn);
      e.vertical ? (k.currentY = Rn, On = (k.startY - k.currentY) / pe.value * 100) : (k.currentX = Dn, On = (k.currentX - k.startX) / pe.value * 100), k.newPosition = k.startPosition + On, Pn(k.newPosition);
    }
  }, _n = () => {
    k.dragging && (setTimeout(() => {
      k.dragging = !1, k.hovering || ze(), k.isClick || (Pn(k.newPosition), $e());
    }, 0), window.removeEventListener("mousemove", Et), window.removeEventListener("touchmove", Et), window.removeEventListener("mouseup", _n), window.removeEventListener("touchend", _n), window.removeEventListener("contextmenu", _n));
  }, Pn = async (hn) => {
    if (hn === null || Number.isNaN(+hn))
      return;
    hn < 0 ? hn = 0 : hn > 100 && (hn = 100);
    const On = 100 / ((le.value - ae.value) / ie.value);
    let Rn = Math.round(hn / On) * On * (le.value - ae.value) * 0.01 + ae.value;
    Rn = Number.parseFloat(Rn.toFixed(de.value)), Rn !== e.modelValue && oe(UPDATE_MODEL_EVENT, Rn), !k.dragging && e.modelValue !== k.oldValue && (k.oldValue = e.modelValue), await nextTick(), k.dragging && Ie(), _e.value.updatePopper();
  };
  return watch(() => k.dragging, (hn) => {
    Oe(hn);
  }), {
    disabled: re,
    button: xe,
    tooltip: _e,
    tooltipVisible: he,
    showTooltip: ue,
    wrapperStyle: At,
    formatValue: Ve,
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
    const $e = e.modelValue;
    e.range && Array.isArray($e) ? $e[1] < e.min ? ie([e.min, e.min]) : $e[0] > e.max ? ie([e.max, e.max]) : $e[0] < e.min ? ie([e.min, $e[1]]) : $e[1] > e.max ? ie([$e[0], e.max]) : (k.firstValue = $e[0], k.secondValue = $e[1], ue() && (e.validateEvent && ((pe = le == null ? void 0 : le.validate) == null || pe.call(le, "change").catch((Ne) => debugWarn(Ne))), k.oldValue = $e.slice())) : !e.range && typeof $e == "number" && !Number.isNaN($e) && ($e < e.min ? ie(e.min) : $e > e.max ? ie(e.max) : (k.firstValue = $e, ue() && (e.validateEvent && ((Ce = le == null ? void 0 : le.validate) == null || Ce.call(le, "change").catch((Ne) => debugWarn(Ne))), k.oldValue = $e)));
  };
  de(), watch(() => k.dragging, (pe) => {
    pe || de();
  }), watch(() => e.modelValue, (pe, Ce) => {
    k.dragging || Array.isArray(pe) && Array.isArray(Ce) && pe.every(($e, Ne) => $e === Ce[Ne]) && k.firstValue === pe[0] && k.secondValue === pe[1] || de();
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
      wrapperStyle: $e,
      formatValue: Ne,
      handleMouseEnter: Oe,
      handleMouseLeave: _e,
      onButtonDown: he,
      onKeyDown: Ve,
      setPosition: Ie
    } = useSliderButton(re, le, oe), { hovering: ze, dragging: xe } = toRefs(le);
    return k({
      onButtonDown: he,
      onKeyDown: Ve,
      setPosition: Ie,
      hovering: ze,
      dragging: xe
    }), (Ue, At) => (openBlock(), createElementBlock("div", {
      ref_key: "button",
      ref: ue,
      class: normalizeClass([unref(ae).e("button-wrapper"), { hover: unref(ze), dragging: unref(xe) }]),
      style: normalizeStyle(unref($e)),
      tabindex: unref(ie) ? -1 : 0,
      onMouseenter: At[0] || (At[0] = (...Fe) => unref(Oe) && unref(Oe)(...Fe)),
      onMouseleave: At[1] || (At[1] = (...Fe) => unref(_e) && unref(_e)(...Fe)),
      onMousedown: At[2] || (At[2] = (...Fe) => unref(he) && unref(he)(...Fe)),
      onTouchstart: At[3] || (At[3] = (...Fe) => unref(he) && unref(he)(...Fe)),
      onFocus: At[4] || (At[4] = (...Fe) => unref(Oe) && unref(Oe)(...Fe)),
      onBlur: At[5] || (At[5] = (...Fe) => unref(_e) && unref(_e)(...Fe)),
      onKeydown: At[6] || (At[6] = (...Fe) => unref(Ve) && unref(Ve)(...Fe))
    }, [
      createVNode(unref(ElTooltip), {
        ref_key: "tooltip",
        ref: de,
        visible: unref(Ce),
        placement: Ue.placement,
        "fallback-placements": ["top", "bottom", "right", "left"],
        "stop-popper-mouse-event": !1,
        "popper-class": Ue.tooltipClass,
        disabled: !unref(pe),
        persistent: ""
      }, {
        content: withCtx(() => [
          createElementVNode("span", null, toDisplayString(unref(Ne)), 1)
        ]),
        default: withCtx(() => [
          createElementVNode("div", {
            class: normalizeClass([unref(ae).e("button"), { hover: unref(ze), dragging: unref(xe) }])
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
      sliderDisabled: $e,
      minValue: Ne,
      maxValue: Oe,
      runwayStyle: _e,
      barStyle: he,
      resetSize: Ve,
      emitChange: Ie,
      onSliderWrapperPrevent: ze,
      onSliderClick: xe,
      onSliderDown: Ue,
      setFirstValue: At,
      setSecondValue: Fe
    } = useSlide(re, ie, oe), { stops: Pt, getStopStyle: vn } = useStops(re, ie, Ne, Oe), { inputId: En, isLabeledByFormItem: $n } = useFormItemInputId(re, {
      formItemContext: ue
    }), kn = useSize(), wn = computed(() => re.inputSize || kn.value), Dt = computed(() => re.label || le("el.slider.defaultLabel", {
      min: re.min,
      max: re.max
    })), Lt = computed(() => re.range ? re.rangeStartLabel || le("el.slider.defaultRangeStartLabel") : Dt.value), bn = computed(() => re.formatValueText ? re.formatValueText(hn.value) : `${hn.value}`), jt = computed(() => re.rangeEndLabel || le("el.slider.defaultRangeEndLabel")), Cn = computed(() => re.formatValueText ? re.formatValueText(On.value) : `${On.value}`), kt = computed(() => [
      ae.b(),
      ae.m(kn.value),
      ae.is("vertical", re.vertical),
      { [ae.m("with-input")]: re.showInput }
    ]), Et = useMarks(re);
    useWatch(re, ie, Ne, Oe, oe, ue);
    const _n = computed(() => {
      const Fn = [re.min, re.max, re.step].map((Nn) => {
        const Bn = `${Nn}`.split(".")[1];
        return Bn ? Bn.length : 0;
      });
      return Math.max.apply(null, Fn);
    }), { sliderWrapper: Pn } = useLifecycle(re, ie, Ve), { firstValue: hn, secondValue: On, sliderSize: Dn } = toRefs(ie), Rn = (Fn) => {
      ie.dragging = Fn;
    };
    return provide(sliderContextKey, {
      ...toRefs(re),
      sliderSize: Dn,
      disabled: $e,
      precision: _n,
      emitChange: Ie,
      resetSize: Ve,
      updateDragging: Rn
    }), k({
      onSliderClick: xe
    }), (Fn, Nn) => {
      var Bn, Vn;
      return openBlock(), createElementBlock("div", {
        id: Fn.range ? unref(En) : void 0,
        ref_key: "sliderWrapper",
        ref: Pn,
        class: normalizeClass(unref(kt)),
        role: Fn.range ? "group" : void 0,
        "aria-label": Fn.range && !unref($n) ? unref(Dt) : void 0,
        "aria-labelledby": Fn.range && unref($n) ? (Bn = unref(ue)) == null ? void 0 : Bn.labelId : void 0,
        onTouchstart: Nn[2] || (Nn[2] = (...An) => unref(ze) && unref(ze)(...An)),
        onTouchmove: Nn[3] || (Nn[3] = (...An) => unref(ze) && unref(ze)(...An))
      }, [
        createElementVNode("div", {
          ref_key: "slider",
          ref: de,
          class: normalizeClass([
            unref(ae).e("runway"),
            { "show-input": Fn.showInput && !Fn.range },
            unref(ae).is("disabled", unref($e))
          ]),
          style: normalizeStyle(unref(_e)),
          onMousedown: Nn[0] || (Nn[0] = (...An) => unref(Ue) && unref(Ue)(...An)),
          onTouchstart: Nn[1] || (Nn[1] = (...An) => unref(Ue) && unref(Ue)(...An))
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
            "aria-label": Fn.range || !unref($n) ? unref(Lt) : void 0,
            "aria-labelledby": !Fn.range && unref($n) ? (Vn = unref(ue)) == null ? void 0 : Vn.labelId : void 0,
            "aria-valuemin": Fn.min,
            "aria-valuemax": Fn.range ? unref(On) : Fn.max,
            "aria-valuenow": unref(hn),
            "aria-valuetext": unref(bn),
            "aria-orientation": Fn.vertical ? "vertical" : "horizontal",
            "aria-disabled": unref($e),
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
            "aria-valuetext": unref(Cn),
            "aria-orientation": Fn.vertical ? "vertical" : "horizontal",
            "aria-disabled": unref($e),
            "onUpdate:modelValue": unref(Fe)
          }, null, 8, ["model-value", "vertical", "tooltip-class", "placement", "aria-label", "aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-valuetext", "aria-orientation", "aria-disabled", "onUpdate:modelValue"])) : createCommentVNode("v-if", !0),
          Fn.showStops ? (openBlock(), createElementBlock("div", _hoisted_2$3, [
            (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(Pt), (An, Wn) => (openBlock(), createElementBlock("div", {
              key: Wn,
              class: normalizeClass(unref(ae).e("stop")),
              style: normalizeStyle(unref(vn)(An))
            }, null, 6))), 128))
          ])) : createCommentVNode("v-if", !0),
          unref(Et).length > 0 ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
            createElementVNode("div", null, [
              (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(Et), (An, Wn) => (openBlock(), createElementBlock("div", {
                key: Wn,
                style: normalizeStyle(unref(vn)(An.position)),
                class: normalizeClass([unref(ae).e("stop"), unref(ae).e("marks-stop")])
              }, null, 6))), 128))
            ]),
            createElementVNode("div", {
              class: normalizeClass(unref(ae).e("marks"))
            }, [
              (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(Et), (An, Wn) => (openBlock(), createBlock(unref(SliderMarker), {
                key: Wn,
                mark: An.mark,
                style: normalizeStyle(unref(vn)(An.position))
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
          disabled: unref($e),
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
    }), Ce = useDisabled$1(computed(() => re.loading)), $e = ref(re.modelValue !== !1), Ne = ref(), Oe = ref(), _e = computed(() => [
      de.b(),
      de.m(ue.value),
      de.is("disabled", Ce.value),
      de.is("checked", Ie.value)
    ]), he = computed(() => ({
      width: addUnit(re.width)
    }));
    watch(() => re.modelValue, () => {
      $e.value = !0;
    }), watch(() => re.value, () => {
      $e.value = !1;
    });
    const Ve = computed(() => $e.value ? re.modelValue : re.value), Ie = computed(() => Ve.value === re.activeValue);
    [re.activeValue, re.inactiveValue].includes(Ve.value) || (oe(UPDATE_MODEL_EVENT, re.inactiveValue), oe(CHANGE_EVENT, re.inactiveValue), oe(INPUT_EVENT, re.inactiveValue)), watch(Ie, (Fe) => {
      var Pt;
      Ne.value.checked = Fe, re.validateEvent && ((Pt = ie == null ? void 0 : ie.validate) == null || Pt.call(ie, "change").catch((vn) => debugWarn(vn)));
    });
    const ze = () => {
      const Fe = Ie.value ? re.inactiveValue : re.activeValue;
      oe(UPDATE_MODEL_EVENT, Fe), oe(CHANGE_EVENT, Fe), oe(INPUT_EVENT, Fe), nextTick(() => {
        Ne.value.checked = Ie.value;
      });
    }, xe = () => {
      if (Ce.value)
        return;
      const { beforeChange: Fe } = re;
      if (!Fe) {
        ze();
        return;
      }
      const Pt = Fe();
      [
        isPromise(Pt),
        isBoolean(Pt)
      ].includes(!0) || throwError(ae, "beforeChange must return type `Promise<boolean>` or `boolean`"), isPromise(Pt) ? Pt.then((En) => {
        En && ze();
      }).catch((En) => {
        debugWarn(ae, `some error occurred: ${En}`);
      }) : Pt && ze();
    }, Ue = computed(() => de.cssVarBlock({
      ...re.activeColor ? { "on-color": re.activeColor } : null,
      ...re.inactiveColor ? { "off-color": re.inactiveColor } : null,
      ...re.borderColor ? { "border-color": re.borderColor } : null
    })), At = () => {
      var Fe, Pt;
      (Pt = (Fe = Ne.value) == null ? void 0 : Fe.focus) == null || Pt.call(Fe);
    };
    return onMounted(() => {
      Ne.value.checked = Ie.value;
    }), k({
      focus: At
    }), (Fe, Pt) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(unref(_e)),
      style: normalizeStyle(unref(Ue)),
      onClick: withModifiers(xe, ["prevent"])
    }, [
      createElementVNode("input", {
        id: unref(pe),
        ref_key: "input",
        ref: Ne,
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
        onChange: ze,
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
        ref: Oe,
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
    const _e = ae === "light", he = document.createElement("div");
    return he.className = `${ie}-popper ${_e ? "is-light" : "is-dark"}`, oe = escapeHtml_1(oe), he.innerHTML = oe, he.style.zIndex = String(le()), e == null || e.appendChild(he), he;
  }
  function pe() {
    const _e = document.createElement("div");
    return _e.className = `${ie}-popper__arrow`, _e;
  }
  function Ce() {
    $e && $e.update();
  }
  removePopper = () => {
    try {
      $e && $e.destroy(), Ne && (e == null || e.removeChild(Ne)), k.removeEventListener("mouseenter", Ce), k.removeEventListener("mouseleave", removePopper), ue == null || ue.removeEventListener("scroll", removePopper), removePopper = void 0;
    } catch {
    }
  };
  let $e = null;
  const Ne = de(), Oe = pe();
  return Ne.appendChild(Oe), $e = yn(k, Ne, {
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
          element: Oe,
          padding: 10
        }
      }
    ],
    ...re
  }), k.addEventListener("mouseenter", Ce), k.addEventListener("mouseleave", removePopper), ue == null || ue.addEventListener("scroll", removePopper), $e;
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
        re.value = de.reduce(($e, Ne) => {
          const Oe = getRowIdentity(Ne, pe);
          return Ce[Oe] && $e.push(Ne), $e;
        }, []);
      } else
        re.value = [];
    },
    toggleRowExpansion: (de, pe) => {
      toggleRowStatus(re.value, de, pe) && k.emit("expand-change", de, re.value.slice());
    },
    setExpandRowKeys: (de) => {
      k.store.assertRowKey();
      const pe = e.data.value || [], Ce = e.rowKey.value, $e = getKeysMap(pe, Ce);
      re.value = de.reduce((Ne, Oe) => {
        const _e = $e[Oe];
        return _e && Ne.push(_e.row), Ne;
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
    const { data: Ce, rowKey: $e } = e;
    let Ne = null;
    $e.value && (Ne = (unref(Ce) || []).find((Oe) => getRowIdentity(Oe, $e.value) === pe)), re.value = Ne, k.emit("current-change", re.value, null);
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
      const pe = e.rowKey.value, Ce = e.data.value || [], $e = re.value;
      if (!Ce.includes($e) && $e) {
        if (pe) {
          const Ne = getRowIdentity($e, pe);
          ie(Ne);
        } else
          re.value = null;
        re.value === null && k.emit("current-change", null, $e);
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
    return $e(Ie);
  }), Ce = computed(() => {
    const Ie = e.rowKey.value, ze = Object.keys(le.value), xe = {};
    return ze.length && ze.forEach((Ue) => {
      if (le.value[Ue].length) {
        const At = { children: [] };
        le.value[Ue].forEach((Fe) => {
          const Pt = getRowIdentity(Fe, Ie);
          At.children.push(Pt), Fe[ie.value] && !xe[Pt] && (xe[Pt] = { children: [] });
        }), xe[Ue] = At;
      }
    }), xe;
  }), $e = (Ie) => {
    const ze = e.rowKey.value, xe = {};
    return walkTreeNode(Ie, (Ue, At, Fe) => {
      const Pt = getRowIdentity(Ue, ze);
      Array.isArray(At) ? xe[Pt] = {
        children: At.map((vn) => getRowIdentity(vn, ze)),
        level: Fe
      } : ae.value && (xe[Pt] = {
        children: [],
        lazy: !0,
        level: Fe
      });
    }, ue.value, ie.value), xe;
  }, Ne = (Ie = !1, ze = ((xe) => (xe = de.store) == null ? void 0 : xe.states.defaultExpandAll.value)()) => {
    var xe;
    const Ue = pe.value, At = Ce.value, Fe = Object.keys(Ue), Pt = {};
    if (Fe.length) {
      const vn = unref(oe), En = [], $n = (wn, Dt) => {
        if (Ie)
          return k.value ? ze || k.value.includes(Dt) : !!(ze || (wn == null ? void 0 : wn.expanded));
        {
          const Lt = ze || k.value && k.value.includes(Dt);
          return !!((wn == null ? void 0 : wn.expanded) || Lt);
        }
      };
      Fe.forEach((wn) => {
        const Dt = vn[wn], Lt = { ...Ue[wn] };
        if (Lt.expanded = $n(Dt, wn), Lt.lazy) {
          const { loaded: bn = !1, loading: jt = !1 } = Dt || {};
          Lt.loaded = !!bn, Lt.loading = !!jt, En.push(wn);
        }
        Pt[wn] = Lt;
      });
      const kn = Object.keys(At);
      ae.value && kn.length && En.length && kn.forEach((wn) => {
        const Dt = vn[wn], Lt = At[wn].children;
        if (En.includes(wn)) {
          if (Pt[wn].children.length !== 0)
            throw new Error("[ElTable]children must be an empty array.");
          Pt[wn].children = Lt;
        } else {
          const { loaded: bn = !1, loading: jt = !1 } = Dt || {};
          Pt[wn] = {
            lazy: !0,
            loaded: !!bn,
            loading: !!jt,
            expanded: $n(Dt, wn),
            children: Lt,
            level: ""
          };
        }
      });
    }
    oe.value = Pt, (xe = de.store) == null || xe.updateTableScrollY();
  };
  watch(() => k.value, () => {
    Ne(!0);
  }), watch(() => pe.value, () => {
    Ne();
  }), watch(() => Ce.value, () => {
    Ne();
  });
  const Oe = (Ie) => {
    k.value = Ie, Ne();
  }, _e = (Ie, ze) => {
    de.store.assertRowKey();
    const xe = e.rowKey.value, Ue = getRowIdentity(Ie, xe), At = Ue && oe.value[Ue];
    if (Ue && At && "expanded" in At) {
      const Fe = At.expanded;
      ze = typeof ze > "u" ? !At.expanded : ze, oe.value[Ue].expanded = ze, Fe !== ze && de.emit("expand-change", Ie, ze), de.store.updateTableScrollY();
    }
  }, he = (Ie) => {
    de.store.assertRowKey();
    const ze = e.rowKey.value, xe = getRowIdentity(Ie, ze), Ue = oe.value[xe];
    ae.value && Ue && "loaded" in Ue && !Ue.loaded ? Ve(Ie, xe, Ue) : _e(Ie, void 0);
  }, Ve = (Ie, ze, xe) => {
    const { load: Ue } = de.props;
    Ue && !oe.value[ze].loaded && (oe.value[ze].loading = !0, Ue(Ie, xe, (At) => {
      if (!Array.isArray(At))
        throw new TypeError("[ElTable] data must be an array");
      oe.value[ze].loading = !1, oe.value[ze].loaded = !0, oe.value[ze].expanded = !0, At.length && (le.value[ze] = At), de.emit("expand-change", Ie, !0);
    }));
  };
  return {
    loadData: Ve,
    loadOrToggle: he,
    toggleTreeExpansion: _e,
    updateTreeExpandKeys: Oe,
    updateTreeData: Ne,
    normalize: $e,
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
  const k = getCurrentInstance(), { size: oe } = toRefs((e = k.proxy) == null ? void 0 : e.$props), re = ref(null), ae = ref([]), le = ref([]), ie = ref(!1), ue = ref([]), de = ref([]), pe = ref([]), Ce = ref([]), $e = ref([]), Ne = ref([]), Oe = ref([]), _e = ref([]), he = ref(0), Ve = ref(0), Ie = ref(0), ze = ref(!1), xe = ref([]), Ue = ref(!1), At = ref(!1), Fe = ref(null), Pt = ref({}), vn = ref(null), En = ref(null), $n = ref(null), kn = ref(null), wn = ref(null);
  watch(ae, () => k.state && bn(!1), {
    deep: !0
  });
  const Dt = () => {
    if (!re.value)
      throw new Error("[ElTable] prop row-key is required");
  }, Lt = () => {
    Ce.value = ue.value.filter((xn) => xn.fixed === !0 || xn.fixed === "left"), $e.value = ue.value.filter((xn) => xn.fixed === "right"), Ce.value.length > 0 && ue.value[0] && ue.value[0].type === "selection" && !ue.value[0].fixed && (ue.value[0].fixed = !0, Ce.value.unshift(ue.value[0]));
    const Tn = ue.value.filter((xn) => !xn.fixed);
    de.value = [].concat(Ce.value).concat(Tn).concat($e.value);
    const Mn = doFlattenColumns(Tn), qe = doFlattenColumns(Ce.value), Sn = doFlattenColumns($e.value);
    he.value = Mn.length, Ve.value = qe.length, Ie.value = Sn.length, pe.value = [].concat(qe).concat(Mn).concat(Sn), ie.value = Ce.value.length > 0 || $e.value.length > 0;
  }, bn = (Tn, Mn = !1) => {
    Tn && Lt(), Mn ? k.state.doLayout() : k.state.debouncedUpdateLayout();
  }, jt = (Tn) => xe.value.includes(Tn), Cn = () => {
    ze.value = !1, xe.value.length && (xe.value = [], k.emit("selection-change", []));
  }, kt = () => {
    let Tn;
    if (re.value) {
      Tn = [];
      const Mn = getKeysMap(xe.value, re.value), qe = getKeysMap(ae.value, re.value);
      for (const Sn in Mn)
        hasOwn(Mn, Sn) && !qe[Sn] && Tn.push(Mn[Sn].row);
    } else
      Tn = xe.value.filter((Mn) => !ae.value.includes(Mn));
    if (Tn.length) {
      const Mn = xe.value.filter((qe) => !Tn.includes(qe));
      xe.value = Mn, k.emit("selection-change", Mn.slice());
    }
  }, Et = () => (xe.value || []).slice(), _n = (Tn, Mn = void 0, qe = !0) => {
    if (toggleRowStatus(xe.value, Tn, Mn)) {
      const xn = (xe.value || []).slice();
      qe && k.emit("select", xn, Tn), k.emit("selection-change", xn);
    }
  }, Pn = () => {
    var Tn, Mn;
    const qe = At.value ? !ze.value : !(ze.value || xe.value.length);
    ze.value = qe;
    let Sn = !1, xn = 0;
    const jn = (Mn = (Tn = k == null ? void 0 : k.store) == null ? void 0 : Tn.states) == null ? void 0 : Mn.rowKey.value;
    ae.value.forEach((Ln, Kn) => {
      const Un = Kn + xn;
      Fe.value ? Fe.value.call(null, Ln, Un) && toggleRowStatus(xe.value, Ln, qe) && (Sn = !0) : toggleRowStatus(xe.value, Ln, qe) && (Sn = !0), xn += Dn(getRowIdentity(Ln, jn));
    }), Sn && k.emit("selection-change", xe.value ? xe.value.slice() : []), k.emit("select-all", xe.value);
  }, hn = () => {
    const Tn = getKeysMap(xe.value, re.value);
    ae.value.forEach((Mn) => {
      const qe = getRowIdentity(Mn, re.value), Sn = Tn[qe];
      Sn && (xe.value[Sn.index] = Mn);
    });
  }, On = () => {
    var Tn, Mn, qe;
    if (((Tn = ae.value) == null ? void 0 : Tn.length) === 0) {
      ze.value = !1;
      return;
    }
    let Sn;
    re.value && (Sn = getKeysMap(xe.value, re.value));
    const xn = function(Un) {
      return Sn ? !!Sn[getRowIdentity(Un, re.value)] : xe.value.includes(Un);
    };
    let jn = !0, Ln = 0, Kn = 0;
    for (let Un = 0, uo = (ae.value || []).length; Un < uo; Un++) {
      const io = (qe = (Mn = k == null ? void 0 : k.store) == null ? void 0 : Mn.states) == null ? void 0 : qe.rowKey.value, so = Un + Kn, to = ae.value[Un], co = Fe.value && Fe.value.call(null, to, so);
      if (xn(to))
        Ln++;
      else if (!Fe.value || co) {
        jn = !1;
        break;
      }
      Kn += Dn(getRowIdentity(to, io));
    }
    Ln === 0 && (jn = !1), ze.value = jn;
  }, Dn = (Tn) => {
    var Mn;
    if (!k || !k.store)
      return 0;
    const { treeData: qe } = k.store.states;
    let Sn = 0;
    const xn = (Mn = qe.value[Tn]) == null ? void 0 : Mn.children;
    return xn && (Sn += xn.length, xn.forEach((jn) => {
      Sn += Dn(jn);
    })), Sn;
  }, Rn = (Tn, Mn) => {
    Array.isArray(Tn) || (Tn = [Tn]);
    const qe = {};
    return Tn.forEach((Sn) => {
      Pt.value[Sn.id] = Mn, qe[Sn.columnKey || Sn.id] = Mn;
    }), qe;
  }, Fn = (Tn, Mn, qe) => {
    En.value && En.value !== Tn && (En.value.order = null), En.value = Tn, $n.value = Mn, kn.value = qe;
  }, Nn = () => {
    let Tn = unref(le);
    Object.keys(Pt.value).forEach((Mn) => {
      const qe = Pt.value[Mn];
      if (!qe || qe.length === 0)
        return;
      const Sn = getColumnById({
        columns: pe.value
      }, Mn);
      Sn && Sn.filterMethod && (Tn = Tn.filter((xn) => qe.some((jn) => Sn.filterMethod.call(null, jn, xn, Sn))));
    }), vn.value = Tn;
  }, Bn = () => {
    ae.value = sortData(vn.value, {
      sortingColumn: En.value,
      sortProp: $n.value,
      sortOrder: kn.value
    });
  }, Vn = (Tn = void 0) => {
    Tn && Tn.filter || Nn(), Bn();
  }, An = (Tn) => {
    const { tableHeaderRef: Mn } = k.refs;
    if (!Mn)
      return;
    const qe = Object.assign({}, Mn.filterPanels), Sn = Object.keys(qe);
    if (!!Sn.length)
      if (typeof Tn == "string" && (Tn = [Tn]), Array.isArray(Tn)) {
        const xn = Tn.map((jn) => getColumnByKey({
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
    states: qn,
    isRowExpanded: no
  } = useExpand({
    data: ae,
    rowKey: re
  }), {
    updateTreeExpandKeys: oo,
    toggleTreeExpansion: zn,
    updateTreeData: Hn,
    loadOrToggle: Gn,
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
    assertRowKey: Dt,
    updateColumns: Lt,
    scheduleLayout: bn,
    isSelected: jt,
    clearSelection: Cn,
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
    execFilter: Nn,
    execSort: Bn,
    execQuery: Vn,
    clearFilter: An,
    clearSort: Wn,
    toggleRowExpansion: Xn,
    setExpandRowKeysAdapter: (Tn) => {
      Yn(Tn), oo(Tn);
    },
    setCurrentRowKey: In,
    toggleRowExpansionAdapter: (Tn, Mn) => {
      pe.value.some(({ type: Sn }) => Sn === "expand") ? Xn(Tn, Mn) : zn(Tn, Mn);
    },
    isRowExpanded: no,
    updateExpandRows: eo,
    updateCurrentRowData: lo,
    loadOrToggle: Gn,
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
      rightFixedColumns: $e,
      leafColumns: Ne,
      fixedLeafColumns: Oe,
      rightFixedLeafColumns: _e,
      leafColumnsLength: he,
      fixedLeafColumnsLength: Ve,
      rightFixedLeafColumnsLength: Ie,
      isAllSelected: ze,
      selection: xe,
      reserveSelection: Ue,
      selectOnIndeterminate: At,
      selectable: Fe,
      filters: Pt,
      filteredData: vn,
      sortingColumn: En,
      sortProp: $n,
      sortOrder: kn,
      hoverRow: wn,
      ...qn,
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
          const $e = unref(ie.columns).find((Ne) => Ne.property === de);
          $e && ($e.order = pe, e.store.updateSort($e, de, pe), e.store.commit("changeSortCondition", { init: Ce }));
        }
      },
      changeSortCondition(ie, ue) {
        const { sortingColumn: de, sortProp: pe, sortOrder: Ce } = ie;
        unref(Ce) === null && (ie.sortingColumn.value = null, ie.sortProp.value = null);
        const $e = { filter: !0 };
        e.store.execQuery($e), (!ue || !(ue.silent || ue.init)) && e.emit("sort-change", {
          column: unref(de),
          prop: unref(pe),
          order: unref(Ce)
        }), e.store.updateTableScrollY();
      },
      filterChange(ie, ue) {
        const { column: de, values: pe, silent: Ce } = ue, $e = e.store.updateFilters(de, pe);
        e.store.execQuery(), Ce || e.emit("filter-change", $e), e.store.updateTableScrollY();
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
          const pe = le.reduce((Ne, Oe) => Ne + Number(Oe.minWidth || 80), 0), Ce = de / pe;
          let $e = 0;
          le.forEach((Ne, Oe) => {
            if (Oe === 0)
              return;
            const _e = Math.floor(Number(Ne.minWidth || 80) * Ce);
            $e += _e, Ne.realWidth = Number(Ne.minWidth || 80) + _e;
          }), le[0].realWidth = Number(le[0].minWidth || 80) + de - $e;
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
        var Ue;
        return (((Ue = e.column) == null ? void 0 : Ue.filteredValue) || [])[0];
      },
      set: (Ue) => {
        pe.value && (typeof Ue < "u" && Ue !== null ? pe.value.splice(0, 1, Ue) : pe.value.splice(0, 1));
      }
    }), pe = computed({
      get() {
        return e.column ? e.column.filteredValue || [] : [];
      },
      set(Ue) {
        e.column && e.upDataColumn("filteredValue", Ue);
      }
    }), Ce = computed(() => e.column ? e.column.filterMultiple : !0), $e = (Ue) => Ue.value === de.value, Ne = () => {
      le.value = !1;
    }, Oe = (Ue) => {
      Ue.stopPropagation(), le.value = !le.value;
    }, _e = () => {
      le.value = !1;
    }, he = () => {
      ze(pe.value), Ne();
    }, Ve = () => {
      pe.value = [], ze(pe.value), Ne();
    }, Ie = (Ue) => {
      de.value = Ue, ze(typeof Ue < "u" && Ue !== null ? pe.value : []), Ne();
    }, ze = (Ue) => {
      e.store.commit("filterChange", {
        column: e.column,
        values: Ue
      }), e.store.updateAllSelected();
    };
    watch(le, (Ue) => {
      e.column && e.upDataColumn("filterOpened", Ue);
    }, {
      immediate: !0
    });
    const xe = computed(() => {
      var Ue, At;
      return (At = (Ue = ie.value) == null ? void 0 : Ue.popperRef) == null ? void 0 : At.contentRef;
    });
    return {
      tooltipVisible: le,
      multiple: Ce,
      filteredValue: pe,
      filterValue: de,
      filters: ue,
      handleConfirm: he,
      handleReset: Ve,
      handleSelect: Ie,
      isActive: $e,
      t: oe,
      ns: re,
      showFilterPanel: Oe,
      hideFilterPanel: _e,
      popperPaneRef: xe,
      tooltip: ie
    };
  }
}), _hoisted_1$4 = { key: 0 }, _hoisted_2$1 = ["disabled"], _hoisted_3 = ["label", "onClick"];
function _sfc_render$5(e, k, oe, re, ae, le) {
  const ie = resolveComponent("el-checkbox"), ue = resolveComponent("el-checkbox-group"), de = resolveComponent("el-scrollbar"), pe = resolveComponent("arrow-up"), Ce = resolveComponent("arrow-down"), $e = resolveComponent("el-icon"), Ne = resolveComponent("el-tooltip"), Oe = resolveDirective("click-outside");
  return openBlock(), createBlock(Ne, {
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
                "onUpdate:modelValue": k[0] || (k[0] = (_e) => e.filteredValue = _e),
                class: normalizeClass(e.ns.e("checkbox-group"))
              }, {
                default: withCtx(() => [
                  (openBlock(!0), createElementBlock(Fragment, null, renderList(e.filters, (_e) => (openBlock(), createBlock(ie, {
                    key: _e.value,
                    label: _e.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_e.text), 1)
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
            onClick: k[1] || (k[1] = (..._e) => e.handleConfirm && e.handleConfirm(..._e))
          }, toDisplayString(e.t("el.table.confirmFilter")), 11, _hoisted_2$1),
          createElementVNode("button", {
            type: "button",
            onClick: k[2] || (k[2] = (..._e) => e.handleReset && e.handleReset(..._e))
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
          onClick: k[3] || (k[3] = (_e) => e.handleSelect(null))
        }, toDisplayString(e.t("el.table.clearFilter")), 3),
        (openBlock(!0), createElementBlock(Fragment, null, renderList(e.filters, (_e) => (openBlock(), createElementBlock("li", {
          key: _e.value,
          class: normalizeClass([e.ns.e("list-item"), e.ns.is("active", e.isActive(_e))]),
          label: _e.value,
          onClick: (he) => e.handleSelect(_e.value)
        }, toDisplayString(_e.text), 11, _hoisted_3))), 128))
      ], 2))
    ]),
    default: withCtx(() => [
      withDirectives((openBlock(), createElementBlock("span", {
        class: normalizeClass([
          `${e.ns.namespace.value}-table__column-filter-trigger`,
          `${e.ns.namespace.value}-none-outline`
        ]),
        onClick: k[4] || (k[4] = (..._e) => e.showFilterPanel && e.showFilterPanel(..._e))
      }, [
        createVNode($e, null, {
          default: withCtx(() => [
            e.column.filterOpened ? (openBlock(), createBlock(pe, { key: 0 })) : (openBlock(), createBlock(Ce, { key: 1 }))
          ]),
          _: 1
        })
      ], 2)), [
        [Oe, e.hideFilterPanel, e.popperPaneRef]
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
    for (let Ce = 0, $e = ue.length; Ce < $e; Ce++) {
      const Ne = ue[Ce], Oe = Ne.getAttribute("name"), _e = pe[Oe];
      _e && Ne.setAttribute("width", _e.realWidth || _e.width);
    }
  }, ae = (le) => {
    var ie, ue;
    const de = ((ie = e.vnode.el) == null ? void 0 : ie.querySelectorAll("colgroup > col[name=gutter]")) || [];
    for (let Ce = 0, $e = de.length; Ce < $e; Ce++)
      de[Ce].setAttribute("width", le.scrollY.value ? le.gutterWidth : "0");
    const pe = ((ue = e.vnode.el) == null ? void 0 : ue.querySelectorAll("th.gutter")) || [];
    for (let Ce = 0, $e = pe.length; Ce < $e; Ce++) {
      const Ne = pe[Ce];
      Ne.style.width = le.scrollY.value ? `${le.gutterWidth}px` : "0", Ne.style.display = le.scrollY.value ? "" : "none";
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
  }, le = (he, Ve) => {
    !Ve.filters && Ve.sortable ? _e(he, Ve, !1) : Ve.filterable && !Ve.sortable && ae(he), re == null || re.emit("header-click", Ve, he);
  }, ie = (he, Ve) => {
    re == null || re.emit("header-contextmenu", Ve, he);
  }, ue = ref(null), de = ref(!1), pe = ref({}), Ce = (he, Ve) => {
    if (!!isClient$1 && !(Ve.children && Ve.children.length > 0) && ue.value && e.border) {
      de.value = !0;
      const Ie = re;
      k("set-drag-visible", !0);
      const xe = (Ie == null ? void 0 : Ie.vnode.el).getBoundingClientRect().left, Ue = oe.vnode.el.querySelector(`th.${Ve.id}`), At = Ue.getBoundingClientRect(), Fe = At.left - xe + 30;
      addClass$1(Ue, "noclick"), pe.value = {
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
      const vn = ($n) => {
        const kn = $n.clientX - pe.value.startMouseLeft, wn = pe.value.startLeft + kn;
        Pt.style.left = `${Math.max(Fe, wn)}px`;
      }, En = () => {
        if (de.value) {
          const { startColumnLeft: $n, startLeft: kn } = pe.value, Dt = Number.parseInt(Pt.style.left, 10) - $n;
          Ve.width = Ve.realWidth = Dt, Ie == null || Ie.emit("header-dragend", Ve.width, kn - $n, Ve, he), requestAnimationFrame(() => {
            e.store.scheduleLayout(!1, !0);
          }), document.body.style.cursor = "", de.value = !1, ue.value = null, pe.value = {}, k("set-drag-visible", !1);
        }
        document.removeEventListener("mousemove", vn), document.removeEventListener("mouseup", En), document.onselectstart = null, document.ondragstart = null, setTimeout(() => {
          removeClass$1(Ue, "noclick");
        }, 0);
      };
      document.addEventListener("mousemove", vn), document.addEventListener("mouseup", En);
    }
  }, $e = (he, Ve) => {
    var Ie;
    if (Ve.children && Ve.children.length > 0)
      return;
    const ze = (Ie = he.target) == null ? void 0 : Ie.closest("th");
    if (!(!Ve || !Ve.resizable) && !de.value && e.border) {
      const xe = ze.getBoundingClientRect(), Ue = document.body.style;
      xe.width > 12 && xe.right - he.pageX < 8 ? (Ue.cursor = "col-resize", hasClass$1(ze, "is-sortable") && (ze.style.cursor = "col-resize"), ue.value = Ve) : de.value || (Ue.cursor = "", hasClass$1(ze, "is-sortable") && (ze.style.cursor = "pointer"), ue.value = null);
    }
  }, Ne = () => {
    !isClient$1 || (document.body.style.cursor = "");
  }, Oe = ({ order: he, sortOrders: Ve }) => {
    if (he === "")
      return Ve[0];
    const Ie = Ve.indexOf(he || null);
    return Ve[Ie > Ve.length - 2 ? 0 : Ie + 1];
  }, _e = (he, Ve, Ie) => {
    var ze;
    he.stopPropagation();
    const xe = Ve.order === Ie ? null : Ie || Oe(Ve), Ue = (ze = he.target) == null ? void 0 : ze.closest("th");
    if (Ue && hasClass$1(Ue, "noclick")) {
      removeClass$1(Ue, "noclick");
      return;
    }
    if (!Ve.sortable)
      return;
    const At = e.store.states;
    let Fe = At.sortProp.value, Pt;
    const vn = At.sortingColumn.value;
    (vn !== Ve || vn === Ve && vn.order === null) && (vn && (vn.order = null), At.sortingColumn.value = Ve, Fe = Ve.property), xe ? Pt = Ve.order = xe : Pt = Ve.order = null, At.sortProp.value = Fe, At.sortOrder.value = Pt, re == null || re.store.commit("changeSortCondition");
  };
  return {
    handleHeaderClick: le,
    handleHeaderContextMenu: ie,
    handleMouseDown: Ce,
    handleMouseMove: $e,
    handleMouseOut: Ne,
    handleSortClick: _e,
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
      var $e;
      let Ne = ($e = k == null ? void 0 : k.props.headerCellStyle) != null ? $e : {};
      typeof Ne == "function" && (Ne = Ne.call(null, {
        rowIndex: ue,
        columnIndex: de,
        row: pe,
        column: Ce
      }));
      const Oe = Ce.isSubColumn ? null : getFixedColumnOffset(de, Ce.fixed, e.store, pe);
      return ensurePosition(Oe, "left"), ensurePosition(Oe, "right"), Object.assign({}, Ne, Oe);
    },
    getHeaderCellClass: (ue, de, pe, Ce) => {
      const $e = Ce.isSubColumn ? [] : getFixedColumnsClass(oe.b(), de, Ce.fixed, e.store, pe), Ne = [
        Ce.id,
        Ce.order,
        Ce.headerAlign,
        Ce.className,
        Ce.labelClassName,
        ...$e
      ];
      Ce.children || Ne.push("is-leaf"), Ce.sortable && Ne.push("is-sortable");
      const Oe = k == null ? void 0 : k.props.headerCellClassName;
      return typeof Oe == "string" ? Ne.push(Oe) : typeof Oe == "function" && Ne.push(Oe.call(null, {
        rowIndex: ue,
        columnIndex: de,
        row: pe,
        column: Ce
      })), Ne.push(oe.e("cell")), Ne.filter((_e) => Boolean(_e)).join(" ");
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
      handleMouseMove: $e,
      handleMouseOut: Ne,
      handleSortClick: Oe,
      handleFilterClick: _e
    } = useEvent(e, k), {
      getHeaderRowStyle: he,
      getHeaderRowClass: Ve,
      getHeaderCellStyle: Ie,
      getHeaderCellClass: ze
    } = useStyle$2(e), { isGroup: xe, toggleAllSelection: Ue, columnRows: At } = useUtils$1(e);
    return oe.state = {
      onColumnsChange: ie,
      onScrollableChange: ue
    }, oe.filterPanels = le, {
      ns: ae,
      filterPanels: le,
      onColumnsChange: ie,
      onScrollableChange: ue,
      columnRows: At,
      getHeaderRowClass: Ve,
      getHeaderRowStyle: he,
      getHeaderCellClass: ze,
      getHeaderCellStyle: Ie,
      handleHeaderClick: de,
      handleHeaderContextMenu: pe,
      handleMouseDown: Ce,
      handleMouseMove: $e,
      handleMouseOut: Ne,
      handleSortClick: Oe,
      handleFilterClick: _e,
      isGroup: xe,
      toggleAllSelection: Ue
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
      handleSortClick: $e,
      handleMouseOut: Ne,
      store: Oe,
      $parent: _e
    } = this;
    let he = 1;
    return h$2("thead", {
      class: { [e.is("group")]: k }
    }, oe.map((Ve, Ie) => h$2("tr", {
      class: le(Ie),
      key: Ie,
      style: ie(Ie)
    }, Ve.map((ze, xe) => (ze.rowSpan > he && (he = ze.rowSpan), h$2("th", {
      class: ae(Ie, xe, Ve, ze),
      colspan: ze.colSpan,
      key: `${ze.id}-thead`,
      rowspan: ze.rowSpan,
      style: re(Ie, xe, Ve, ze),
      onClick: (Ue) => ue(Ue, ze),
      onContextmenu: (Ue) => de(Ue, ze),
      onMousedown: (Ue) => pe(Ue, ze),
      onMousemove: (Ue) => Ce(Ue, ze),
      onMouseout: Ne
    }, [
      h$2("div", {
        class: [
          "cell",
          ze.filteredValue && ze.filteredValue.length > 0 ? "highlight" : "",
          ze.labelClassName
        ]
      }, [
        ze.renderHeader ? ze.renderHeader({
          column: ze,
          $index: xe,
          store: Oe,
          _self: _e
        }) : ze.label,
        ze.sortable && h$2("span", {
          onClick: (Ue) => $e(Ue, ze),
          class: "caret-wrapper"
        }, [
          h$2("i", {
            onClick: (Ue) => $e(Ue, ze, "ascending"),
            class: "sort-caret ascending"
          }),
          h$2("i", {
            onClick: (Ue) => $e(Ue, ze, "descending"),
            class: "sort-caret descending"
          })
        ]),
        ze.filterable && h$2(FilterPanel, {
          store: Oe,
          placement: ze.filterPlacement || "bottom-start",
          column: ze,
          upDataColumn: (Ue, At) => {
            ze[Ue] = At;
          }
        })
      ])
    ]))))));
  }
});
function useEvents(e) {
  const k = inject(TABLE_INJECTION_KEY), oe = ref(""), re = ref(h$2("div")), ae = (Ne, Oe, _e) => {
    var he;
    const Ve = k, Ie = getCell(Ne);
    let ze;
    const xe = (he = Ve == null ? void 0 : Ve.vnode.el) == null ? void 0 : he.dataset.prefix;
    Ie && (ze = getColumnByCell({
      columns: e.store.states.columns.value
    }, Ie, xe), ze && (Ve == null || Ve.emit(`cell-${_e}`, Oe, ze, Ie, Ne))), Ve == null || Ve.emit(`row-${_e}`, Oe, ze, Ne);
  }, le = (Ne, Oe) => {
    ae(Ne, Oe, "dblclick");
  }, ie = (Ne, Oe) => {
    e.store.commit("setCurrentRow", Oe), ae(Ne, Oe, "click");
  }, ue = (Ne, Oe) => {
    ae(Ne, Oe, "contextmenu");
  }, de = debounce((Ne) => {
    e.store.commit("setHoverRow", Ne);
  }, 30), pe = debounce(() => {
    e.store.commit("setHoverRow", null);
  }, 30);
  return {
    handleDoubleClick: le,
    handleClick: ie,
    handleContextMenu: ue,
    handleMouseEnter: de,
    handleMouseLeave: pe,
    handleCellMouseEnter: (Ne, Oe) => {
      var _e;
      const he = k, Ve = getCell(Ne), Ie = (_e = he == null ? void 0 : he.vnode.el) == null ? void 0 : _e.dataset.prefix;
      if (Ve) {
        const Fe = getColumnByCell({
          columns: e.store.states.columns.value
        }, Ve, Ie), Pt = he.hoverState = { cell: Ve, column: Fe, row: Oe };
        he == null || he.emit("cell-mouse-enter", Pt.row, Pt.column, Pt.cell, Ne);
      }
      const ze = Ne.target.querySelector(".cell");
      if (!(hasClass$1(ze, `${Ie}-tooltip`) && ze.childNodes.length))
        return;
      const xe = document.createRange();
      xe.setStart(ze, 0), xe.setEnd(ze, ze.childNodes.length);
      const Ue = xe.getBoundingClientRect().width, At = (Number.parseInt(getStyle(ze, "paddingLeft"), 10) || 0) + (Number.parseInt(getStyle(ze, "paddingRight"), 10) || 0);
      (Ue + At > ze.offsetWidth || ze.scrollWidth > ze.offsetWidth) && createTablePopper(k == null ? void 0 : k.refs.tableWrapper, Ve, Ve.innerText || Ve.textContent, {
        placement: "top",
        strategy: "fixed"
      }, Oe.tooltipEffect);
    },
    handleCellMouseLeave: (Ne) => {
      if (!getCell(Ne))
        return;
      const _e = k == null ? void 0 : k.hoverState;
      k == null || k.emit("cell-mouse-leave", _e == null ? void 0 : _e.row, _e == null ? void 0 : _e.column, _e == null ? void 0 : _e.cell, Ne);
    },
    tooltipContent: oe,
    tooltipTrigger: re
  };
}
function useStyles(e) {
  const k = inject(TABLE_INJECTION_KEY), oe = useNamespace("table");
  return {
    getRowStyle: (pe, Ce) => {
      const $e = k == null ? void 0 : k.props.rowStyle;
      return typeof $e == "function" ? $e.call(null, {
        row: pe,
        rowIndex: Ce
      }) : $e || null;
    },
    getRowClass: (pe, Ce) => {
      const $e = [oe.e("row")];
      (k == null ? void 0 : k.props.highlightCurrentRow) && pe === e.store.states.currentRow.value && $e.push("current-row"), e.stripe && Ce % 2 === 1 && $e.push(oe.em("row", "striped"));
      const Ne = k == null ? void 0 : k.props.rowClassName;
      return typeof Ne == "string" ? $e.push(Ne) : typeof Ne == "function" && $e.push(Ne.call(null, {
        row: pe,
        rowIndex: Ce
      })), $e;
    },
    getCellStyle: (pe, Ce, $e, Ne) => {
      const Oe = k == null ? void 0 : k.props.cellStyle;
      let _e = Oe != null ? Oe : {};
      typeof Oe == "function" && (_e = Oe.call(null, {
        rowIndex: pe,
        columnIndex: Ce,
        row: $e,
        column: Ne
      }));
      const he = Ne.isSubColumn ? null : getFixedColumnOffset(Ce, e == null ? void 0 : e.fixed, e.store);
      return ensurePosition(he, "left"), ensurePosition(he, "right"), Object.assign({}, _e, he);
    },
    getCellClass: (pe, Ce, $e, Ne) => {
      const Oe = Ne.isSubColumn ? [] : getFixedColumnsClass(oe.b(), Ce, e == null ? void 0 : e.fixed, e.store), _e = [Ne.id, Ne.align, Ne.className, ...Oe], he = k == null ? void 0 : k.props.cellClassName;
      return typeof he == "string" ? _e.push(he) : typeof he == "function" && _e.push(he.call(null, {
        rowIndex: pe,
        columnIndex: Ce,
        row: $e,
        column: Ne
      })), _e.push(oe.e("cell")), _e.filter((Ve) => Boolean(Ve)).join(" ");
    },
    getSpan: (pe, Ce, $e, Ne) => {
      let Oe = 1, _e = 1;
      const he = k == null ? void 0 : k.props.spanMethod;
      if (typeof he == "function") {
        const Ve = he({
          row: pe,
          column: Ce,
          rowIndex: $e,
          columnIndex: Ne
        });
        Array.isArray(Ve) ? (Oe = Ve[0], _e = Ve[1]) : typeof Ve == "object" && (Oe = Ve.rowspan, _e = Ve.colspan);
      }
      return { rowspan: Oe, colspan: _e };
    },
    getColspanRealWidth: (pe, Ce, $e) => {
      if (Ce < 1)
        return pe[$e].realWidth;
      const Ne = pe.map(({ realWidth: Oe, width: _e }) => Oe || _e).slice($e, $e + Ce);
      return Number(Ne.reduce((Oe, _e) => Number(Oe) + Number(_e), -1));
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
    tooltipTrigger: $e
  } = useEvents(e), {
    getRowStyle: Ne,
    getRowClass: Oe,
    getCellStyle: _e,
    getCellClass: he,
    getSpan: Ve,
    getColspanRealWidth: Ie
  } = useStyles(e), ze = computed(() => e.store.states.columns.value.findIndex(({ type: Pt }) => Pt === "default")), xe = (Pt, vn) => {
    const En = k.props.rowKey;
    return En ? getRowIdentity(Pt, En) : vn;
  }, Ue = (Pt, vn, En, $n = !1) => {
    const { tooltipEffect: kn, store: wn } = e, { indent: Dt, columns: Lt } = wn.states, bn = Oe(Pt, vn);
    let jt = !0;
    return En && (bn.push(oe.em("row", `level-${En.level}`)), jt = En.display), h$2("tr", {
      style: [jt ? null : {
        display: "none"
      }, Ne(Pt, vn)],
      class: bn,
      key: xe(Pt, vn),
      onDblclick: (kt) => re(kt, Pt),
      onClick: (kt) => ae(kt, Pt),
      onContextmenu: (kt) => le(kt, Pt),
      onMouseenter: () => ie(vn),
      onMouseleave: ue
    }, Lt.value.map((kt, Et) => {
      const { rowspan: _n, colspan: Pn } = Ve(Pt, kt, vn, Et);
      if (!_n || !Pn)
        return null;
      const hn = { ...kt };
      hn.realWidth = Ie(Lt.value, Pn, Et);
      const On = {
        store: e.store,
        _self: e.context || k,
        column: hn,
        row: Pt,
        $index: vn,
        cellIndex: Et,
        expanded: $n
      };
      Et === ze.value && En && (On.treeNode = {
        indent: En.level * Dt.value,
        level: En.level
      }, typeof En.expanded == "boolean" && (On.treeNode.expanded = En.expanded, "loading" in En && (On.treeNode.loading = En.loading), "noLazyChildren" in En && (On.treeNode.noLazyChildren = En.noLazyChildren)));
      const Dn = `${vn},${Et}`, Rn = hn.columnKey || hn.rawColumnKey || "", Fn = At(Et, kt, On);
      return h$2("td", {
        style: _e(vn, Et, Pt, kt),
        class: he(vn, Et, Pt, kt),
        key: `${Rn}${Dn}`,
        rowspan: _n,
        colspan: Pn,
        onMouseenter: (Nn) => de(Nn, { ...Pt, tooltipEffect: kn }),
        onMouseleave: pe
      }, [Fn]);
    }));
  }, At = (Pt, vn, En) => vn.renderCell(En);
  return {
    wrappedRowRender: (Pt, vn) => {
      const En = e.store, { isRowExpanded: $n, assertRowKey: kn } = En, { treeData: wn, lazyTreeNodeMap: Dt, childrenColumnName: Lt, rowKey: bn } = En.states, jt = En.states.columns.value;
      if (jt.some(({ type: kt }) => kt === "expand")) {
        const kt = $n(Pt), Et = Ue(Pt, vn, void 0, kt), _n = k.renderExpanded;
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
        kn();
        const kt = getRowIdentity(Pt, bn.value);
        let Et = wn.value[kt], _n = null;
        Et && (_n = {
          expanded: Et.expanded,
          level: Et.level,
          display: !0
        }, typeof Et.lazy == "boolean" && (typeof Et.loaded == "boolean" && Et.loaded && (_n.noLazyChildren = !(Et.children && Et.children.length)), _n.loading = Et.loading));
        const Pn = [Ue(Pt, vn, _n)];
        if (Et) {
          let hn = 0;
          const On = (Rn, Fn) => {
            !(Rn && Rn.length && Fn) || Rn.forEach((Nn) => {
              const Bn = {
                display: Fn.display && Fn.expanded,
                level: Fn.level + 1,
                expanded: !1,
                noLazyChildren: !1,
                loading: !1
              }, Vn = getRowIdentity(Nn, bn.value);
              if (Vn == null)
                throw new Error("For nested data item, row-key is required.");
              if (Et = { ...wn.value[Vn] }, Et && (Bn.expanded = Et.expanded, Et.level = Et.level || Bn.level, Et.display = !!(Et.expanded && Bn.display), typeof Et.lazy == "boolean" && (typeof Et.loaded == "boolean" && Et.loaded && (Bn.noLazyChildren = !(Et.children && Et.children.length)), Bn.loading = Et.loading)), hn++, Pn.push(Ue(Nn, vn + hn, Bn)), Et) {
                const An = Dt.value[Vn] || Nn[Lt.value];
                On(An, Et);
              }
            });
          };
          Et.display = !0;
          const Dn = Dt.value[kt] || Pt[Lt.value];
          On(Dn, Et);
        }
        return Pn;
      } else
        return Ue(Pt, vn, void 0);
    },
    tooltipContent: Ce,
    tooltipTrigger: $e
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
      let $e = window.requestAnimationFrame;
      $e || ($e = (Ne) => window.setTimeout(Ne, 16)), $e(() => {
        var Ne;
        const Oe = (Ne = k == null ? void 0 : k.vnode.el) == null ? void 0 : Ne.querySelectorAll(`.${re.e("row")}`), _e = Oe[Ce], he = Oe[pe];
        _e && removeClass$1(_e, "hover-row"), he && addClass$1(he, "hover-row");
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
      const Ce = ie.map((_e) => Number(_e[de.property])), $e = [];
      let Ne = !0;
      Ce.forEach((_e) => {
        if (!Number.isNaN(+_e)) {
          Ne = !1;
          const he = `${_e}`.split(".")[1];
          $e.push(he ? he.length : 0);
        }
      });
      const Oe = Math.max.apply(null, $e);
      Ne ? ue[pe] = "" : ue[pe] = Ce.reduce((_e, he) => {
        const Ve = Number(he);
        return Number.isNaN(+Ve) ? _e : Number.parseFloat((_e + he).toFixed(Math.min(Oe, 20)));
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
    toggleRowSelection: (Ce, $e) => {
      e.toggleRowSelection(Ce, $e, !1), e.updateAllSelected();
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
    toggleRowExpansion: (Ce, $e) => {
      e.toggleRowExpansionAdapter(Ce, $e);
    },
    clearSort: () => {
      e.clearSort();
    },
    sort: (Ce, $e) => {
      e.commit("sort", { prop: Ce, order: $e });
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
  }, $e = ref(), Ne = ref(0), Oe = ref(0), _e = ref(0), he = ref(0);
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
  const Ve = () => {
    re.store.commit("setHoverRow", null), re.hoverState && (re.hoverState = null);
  }, Ie = (kt, Et) => {
    const { pixelX: _n, pixelY: Pn } = Et;
    Math.abs(_n) >= Math.abs(Pn) && (re.refs.bodyWrapper.scrollLeft += Et.pixelX / 5);
  }, ze = computed(() => e.height || e.maxHeight || oe.states.fixedColumns.value.length > 0 || oe.states.rightFixedColumns.value.length > 0), xe = computed(() => ({
    width: k.bodyWidth.value ? `${k.bodyWidth.value}px` : ""
  })), Ue = () => {
    ze.value && k.updateElsHeight(), k.updateColumnsWidth(), requestAnimationFrame(vn);
  };
  onMounted(async () => {
    await nextTick(), oe.updateColumns(), En(), requestAnimationFrame(Ue);
    const kt = re.vnode.el, Et = re.refs.headerWrapper;
    e.flexible && kt && kt.parentElement && (kt.parentElement.style.minWidth = "0"), de.value = {
      width: $e.value = kt.offsetWidth,
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
    }), e.fit ? useResizeObserver(re.vnode.el, $n) : useEventListener(window, "resize", $n));
  }, $n = () => {
    var kt, Et, _n;
    const Pn = re.vnode.el;
    if (!re.$ready || !Pn)
      return;
    let hn = !1;
    const {
      width: On,
      height: Dn,
      headerHeight: Rn
    } = de.value, Fn = $e.value = Pn.offsetWidth;
    On !== Fn && (hn = !0);
    const Nn = Pn.offsetHeight;
    (e.height || ze.value) && Dn !== Nn && (hn = !0);
    const Bn = e.tableLayout === "fixed" ? re.refs.headerWrapper : (kt = re.refs.tableHeaderRef) == null ? void 0 : kt.$el;
    e.showHeader && (Bn == null ? void 0 : Bn.offsetHeight) !== Rn && (hn = !0), Ne.value = ((Et = re.refs.tableWrapper) == null ? void 0 : Et.scrollHeight) || 0, _e.value = (Bn == null ? void 0 : Bn.scrollHeight) || 0, he.value = ((_n = re.refs.footerWrapper) == null ? void 0 : _n.scrollHeight) || 0, Oe.value = Ne.value - _e.value - he.value, hn && (de.value = {
      width: Fn,
      height: Nn,
      headerHeight: e.showHeader && (Bn == null ? void 0 : Bn.offsetHeight) || 0
    }, Ue());
  }, kn = useSize(), wn = computed(() => {
    const { bodyWidth: kt, scrollY: Et, gutterWidth: _n } = k;
    return kt.value ? `${kt.value - (Et.value ? _n : 0)}px` : "";
  }), Dt = computed(() => e.maxHeight ? "fixed" : e.tableLayout), Lt = computed(() => {
    if (e.data && e.data.length)
      return null;
    let kt = "100%";
    Oe.value && (kt = `${Oe.value}px`);
    const Et = $e.value;
    return {
      width: Et ? `${Et}px` : "",
      height: kt
    };
  }), bn = computed(() => e.height ? {
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
          maxHeight: `calc(${e.maxHeight} - ${_e.value + he.value}px)`
        };
      {
        const _n = ((kt = re.refs.headerWrapper) == null ? void 0 : kt.scrollHeight) || 0, Pn = ((Et = re.refs.footerWrapper) == null ? void 0 : Et.scrollHeight) || 0, hn = e.maxHeight;
        if (Ne.value >= Number(hn))
          return {
            maxHeight: `${Ne.value - _n - Pn}px`
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
    handleMouseLeave: Ve,
    handleHeaderFooterMousewheel: Ie,
    tableSize: kn,
    emptyBlockStyle: Lt,
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
    doLayout: Ue,
    tableBodyStyles: xe,
    tableLayout: Dt,
    scrollbarViewStyle: Ce,
    tableInnerStyle: bn,
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
      clearFilter: $e,
      toggleAllSelection: Ne,
      toggleRowExpansion: Oe,
      clearSort: _e,
      sort: he
    } = useUtils(ae), {
      isHidden: Ve,
      renderExpanded: Ie,
      setDragVisible: ze,
      isGroup: xe,
      handleMouseLeave: Ue,
      handleHeaderFooterMousewheel: At,
      tableSize: Fe,
      emptyBlockStyle: Pt,
      handleFixedMousewheel: vn,
      resizeProxyVisible: En,
      bodyWidth: $n,
      resizeState: kn,
      doLayout: wn,
      tableBodyStyles: Dt,
      tableLayout: Lt,
      scrollbarViewStyle: bn,
      tableInnerStyle: jt,
      scrollbarStyle: Cn
    } = useStyle(e, le, ae, re), { scrollBarRef: kt, scrollTo: Et, setScrollLeft: _n, setScrollTop: Pn } = useScrollbar(), hn = debounce(wn, 50), On = `el-table_${tableIdSeed++}`;
    re.tableId = On, re.state = {
      isGroup: xe,
      resizeState: kn,
      doLayout: wn,
      debouncedUpdateLayout: hn
    };
    const Dn = computed(() => e.sumText || k("el.table.sumText")), Rn = computed(() => e.emptyText || k("el.table.emptyText"));
    return {
      ns: oe,
      layout: le,
      store: ae,
      handleHeaderFooterMousewheel: At,
      handleMouseLeave: Ue,
      tableId: On,
      tableSize: Fe,
      isHidden: Ve,
      isEmpty: ie,
      renderExpanded: Ie,
      resizeProxyVisible: En,
      resizeState: kn,
      isGroup: xe,
      bodyWidth: $n,
      tableBodyStyles: Dt,
      emptyBlockStyle: Pt,
      debouncedUpdateLayout: hn,
      handleFixedMousewheel: vn,
      setCurrentRow: ue,
      getSelectionRows: de,
      toggleRowSelection: pe,
      clearSelection: Ce,
      clearFilter: $e,
      toggleAllSelection: Ne,
      toggleRowExpansion: Oe,
      clearSort: _e,
      doLayout: wn,
      sort: he,
      t: k,
      setDragVisible: ze,
      context: re,
      computedSumText: Dn,
      computedEmptyText: Rn,
      tableLayout: Lt,
      scrollbarViewStyle: bn,
      tableInnerStyle: jt,
      scrollbarStyle: Cn,
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
  const ie = resolveComponent("hColgroup"), ue = resolveComponent("table-header"), de = resolveComponent("table-body"), pe = resolveComponent("el-scrollbar"), Ce = resolveComponent("table-footer"), $e = resolveDirective("mousewheel");
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
    onMouseleave: k[0] || (k[0] = (Ne) => e.handleMouseLeave())
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
        [$e, e.handleHeaderFooterMousewheel]
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
        [$e, e.handleHeaderFooterMousewheel]
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
          let $e = Ce;
          pe === "width" && de === "realWidth" && ($e = parseWidth(Ce)), pe === "minWidth" && de === "realMinWidth" && ($e = parseMinWidth(Ce)), oe.columnConfig.value[pe] = $e, oe.columnConfig.value[de] = $e;
          const Ne = pe === "fixed";
          e.value.store.scheduleLayout(Ne);
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
    const { treeData: Ue } = xe.states, At = Ue.value;
    return At && Object.keys(At).length > 0;
  }), $e = ref(parseWidth(e.width)), Ne = ref(parseMinWidth(e.minWidth)), Oe = (xe) => ($e.value && (xe.width = $e.value), Ne.value && (xe.minWidth = Ne.value), xe.minWidth || (xe.minWidth = 80), xe.realWidth = Number(xe.width === void 0 ? xe.minWidth : xe.width), xe), _e = (xe) => {
    const Ue = xe.type, At = cellForced[Ue] || {};
    Object.keys(At).forEach((Pt) => {
      const vn = At[Pt];
      Pt !== "className" && vn !== void 0 && (xe[Pt] = vn);
    });
    const Fe = getDefaultClassName(Ue);
    if (Fe) {
      const Pt = `${unref(de.namespace)}-${Fe}`;
      xe.className = xe.className ? `${xe.className} ${Pt}` : Pt;
    }
    return xe;
  }, he = (xe) => {
    Array.isArray(xe) ? xe.forEach((At) => Ue(At)) : Ue(xe);
    function Ue(At) {
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
    setColumnWidth: Oe,
    setColumnForcedProps: _e,
    setColumnRenders: (xe) => {
      e.renderHeader ? debugWarn("TableColumn", "Comparing to render-header, scoped-slot header is easier to use. We recommend users to use scoped-slot header.") : xe.type !== "selection" && (xe.renderHeader = (Fe) => {
        re.columnConfig.value.label;
        const Pt = k.header;
        return Pt ? Pt(Fe) : xe.label;
      });
      let Ue = xe.renderCell;
      const At = Ce.value;
      return xe.type === "expand" ? (xe.renderCell = (Fe) => h$2("div", {
        class: "cell"
      }, [Ue(Fe)]), oe.value.renderExpanded = (Fe) => k.default ? k.default(Fe) : k.default) : (Ue = Ue || defaultRenderCell, xe.renderCell = (Fe) => {
        let Pt = null;
        if (k.default) {
          const kn = k.default(Fe);
          Pt = kn.some((wn) => wn.type !== Comment) ? kn : Ue(Fe);
        } else
          Pt = Ue(Fe);
        const vn = At && Fe.cellIndex === 0, En = treeCellPrefix(Fe, vn), $n = {
          class: "cell",
          style: {}
        };
        return xe.showOverflowTooltip && ($n.class = `${$n.class} ${unref(de.namespace)}-tooltip`, $n.style = {
          width: `${(Fe.column.realWidth || Number(Fe.column.width)) - 1}px`
        }), he(Pt), h$2("div", $n, [En, Pt]);
      }), xe;
    },
    getPropsData: (...xe) => xe.reduce((Ue, At) => (Array.isArray(At) && At.forEach((Fe) => {
      Ue[Fe] = e[Fe];
    }), Ue), {}),
    getColumnElIndex: (xe, Ue) => Array.prototype.indexOf.call(xe, Ue)
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
      let ze = oe.parent;
      for (; ze && !ze.tableId; )
        ze = ze.parent;
      return ze;
    }), { registerNormalWatchers: le, registerComplexWatchers: ie } = useWatcher(ae, e), {
      columnId: ue,
      isSubColumn: de,
      realHeaderAlign: pe,
      columnOrTableParent: Ce,
      setColumnWidth: $e,
      setColumnForcedProps: Ne,
      setColumnRenders: Oe,
      getPropsData: _e,
      getColumnElIndex: he,
      realAlign: Ve
    } = useRender(e, k, ae), Ie = Ce.value;
    ue.value = `${Ie.tableId || Ie.columnId}_column_${columnIdSeed++}`, onBeforeMount(() => {
      de.value = ae.value !== Ie;
      const ze = e.type || "default", xe = e.sortable === "" ? !0 : e.sortable, Ue = {
        ...cellStarts[ze],
        id: ue.value,
        type: ze,
        property: e.prop || e.property,
        align: Ve,
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
      let En = _e([
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
      En = mergeOptions(Ue, En), En = compose(Oe, $e, Ne)(En), re.value = En, le(), ie();
    }), onMounted(() => {
      var ze;
      const xe = Ce.value, Ue = de.value ? xe.vnode.el.children : (ze = xe.refs.hiddenColumns) == null ? void 0 : ze.children, At = () => he(Ue || [], oe.vnode.el);
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
    }), $e = computed(() => {
      const he = parseTime(oe.maxTime || "");
      return he ? formatTime(he) : null;
    }), Ne = computed(() => {
      const he = [];
      if (oe.start && oe.end && oe.step) {
        let Ve = ue.value, Ie;
        for (; Ve && de.value && compareTime(Ve, de.value) <= 0; )
          Ie = dayjs(Ve, "HH:mm").format(oe.format), he.push({
            value: Ie,
            disabled: compareTime(Ve, Ce.value || "-1:-1") <= 0 || compareTime(Ve, $e.value || "100:100") >= 0
          }), Ve = nextTime(Ve, pe.value);
      }
      return he;
    });
    return k({
      blur: () => {
        var he, Ve;
        (Ve = (he = le.value) == null ? void 0 : he.blur) == null || Ve.call(he);
      },
      focus: () => {
        var he, Ve;
        (Ve = (he = le.value) == null ? void 0 : he.focus) == null || Ve.call(he);
      }
    }), (he, Ve) => (openBlock(), createBlock(unref(ElSelect), {
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
      "onUpdate:modelValue": Ve[0] || (Ve[0] = (Ie) => he.$emit("update:modelValue", Ie)),
      onChange: Ve[1] || (Ve[1] = (Ie) => he.$emit("change", Ie)),
      onBlur: Ve[2] || (Ve[2] = (Ie) => he.$emit("blur", Ie)),
      onFocus: Ve[3] || (Ve[3] = (Ie) => he.$emit("focus", Ie))
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
        (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(Ne), (Ie) => (openBlock(), createBlock(unref(re), {
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
      const { labelField: Oe, valueField: _e, numberToString: he } = e;
      return unref(oe).reduce((Ve, Ie) => {
        if (Ie) {
          const ze = Ie[_e];
          Ve.push({
            ...omit$1(Ie, [Oe, _e]),
            label: Ie[Oe],
            value: he ? `${ze}` : ze
          });
        }
        return Ve;
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
      const Oe = e.api;
      if (!(!Oe || !isFunction$2(Oe))) {
        oe.value = [];
        try {
          re.value = !0;
          const _e = await Oe(e.params);
          if (console.log(_e), Array.isArray(_e)) {
            oe.value = _e, $e();
            return;
          }
          e.resultField && (oe.value = get(_e, e.resultField) || []), $e();
        } catch (_e) {
          console.warn(_e);
        } finally {
          re.value = !1;
        }
      }
    }
    async function Ce(Oe) {
      Oe && (e.alwaysLoad ? await pe() : !e.immediate && unref(ae) && (await pe(), ae.value = !1));
    }
    function $e() {
      k("options-change", unref(de));
    }
    function Ne(Oe, ..._e) {
      le.value = _e;
    }
    return { state: ue, attrs: ie, getOptions: de, loading: re, handleFetch: Ce, handleChange: Ne };
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
function setComponentRuleType(e, k, oe) {
  ["DatePicker", "MonthPicker", "WeekPicker", "TimePicker"].includes(
    k
  ) ? e.type = oe ? "string" : "object" : ["RangePicker", "Upload", "CheckboxGroup", "TimePicker"].includes(k) ? e.type = "array" : ["InputNumber"].includes(k) && (e.type = "number");
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
    const oe = "pandora-basic-help", re = computed(() => ({
      color: e.color,
      fontSize: e.fontSize
    }));
    function ae() {
      const le = e.content;
      return isString$2(le) ? le : isArray$3(le) ? le.map((ie, ue) => createVNode("p", {
        key: ie
      }, [createVNode(Fragment, null, [e.showIndex ? `${ue + 1}. ` : "", ie])])) : null;
    }
    return () => createVNode(ElTooltip, {
      content: createVNode("div", {
        style: unref(re)
      }, [ae()]),
      "raw-content": !0,
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
      schema: oe,
      formProps: re
    } = toRefs(e), ae = computed(() => {
      var ze;
      const {
        schema: Oe,
        tableAction: _e,
        formModel: he,
        formActionType: Ve
      } = e, {
        componentProps: Ie = {}
      } = Oe;
      return isFunction$2(Ie) ? (ze = Ie({
        schema: Oe,
        tableAction: _e,
        formModel: he,
        formActionType: Ve
      })) != null ? ze : {} : Ie;
    }), le = computed(() => {
      const {
        allDefaultValues: Oe,
        formModel: _e,
        schema: he
      } = e, {
        mergeDynamicData: Ve
      } = e.formProps;
      return {
        field: he.field,
        model: _e,
        values: {
          ...Ve,
          ...Oe,
          ..._e
        },
        schema: he
      };
    }), ie = computed(() => {
      const {
        disabled: Oe
      } = e.formProps, {
        dynamicDisabled: _e
      } = e.schema, {
        disabled: he = !1
      } = unref(ae);
      let Ve = !!Oe || he;
      return isBoolean$1(_e) && (Ve = _e), isFunction$2(_e) && (Ve = _e(unref(le))), Ve;
    });
    function ue() {
      const {
        show: Oe,
        ifShow: _e
      } = e.schema, {
        showAdvancedButton: he
      } = e.formProps, Ve = he && isBoolean$1(e.schema.isAdvanced) ? e.schema.isAdvanced : !0;
      let Ie = !0, ze = !0;
      return isBoolean$1(Oe) && (Ie = Oe), isBoolean$1(_e) && (ze = _e), isFunction$2(Oe) && (Ie = Oe(unref(le))), isFunction$2(_e) && (ze = _e(unref(le))), Ie = Ie && Ve, {
        isShow: Ie,
        isIfShow: ze
      };
    }
    function de() {
      var kn;
      const {
        rules: Oe = [],
        component: _e,
        rulesMessageJoinLabel: he,
        label: Ve,
        dynamicRules: Ie,
        required: ze
      } = e.schema;
      if (isFunction$2(Ie))
        return Ie(unref(le));
      let xe = cloneDeep(Oe);
      const {
        rulesMessageJoinLabel: Ue
      } = e.formProps, At = Reflect.has(e.schema, "rulesMessageJoinLabel") ? he : Ue, Fe = createPlaceholderMessage(_e) + `${At ? Ve : ""}`;
      function Pt(wn, Dt, Lt) {
        const bn = wn.message || Fe;
        return Dt === void 0 || isNull(Dt) || Array.isArray(Dt) && Dt.length === 0 || typeof Dt == "string" && Dt.trim() === "" || typeof Dt == "object" && Reflect.has(Dt, "checked") && Reflect.has(Dt, "halfChecked") && Array.isArray(Dt.checked) && Array.isArray(Dt.halfChecked) && Dt.checked.length === 0 && Dt.halfChecked.length === 0 ? Promise.reject(bn) : Promise.resolve();
      }
      const vn = isFunction$2(ze) ? ze(unref(le)) : ze;
      vn && (!xe || xe.length === 0 ? xe = [{
        required: vn,
        validator: Pt
      }] : xe.findIndex((Dt) => Reflect.has(Dt, "required")) === -1 && xe.push({
        required: vn,
        validator: Pt
      }));
      const En = xe.findIndex((wn) => Reflect.has(wn, "required") && !Reflect.has(wn, "validator"));
      if (En !== -1) {
        const wn = xe[En], {
          isShow: Dt
        } = ue();
        if (Dt || (wn.required = !1), _e) {
          Reflect.has(wn, "type") || (wn.type = _e === "InputNumber" ? "number" : "string"), wn.message = wn.message || Fe, (_e.includes("Input") || _e.includes("Textarea")) && (wn.whitespace = !0);
          const Lt = (kn = unref(ae)) == null ? void 0 : kn.valueFormat;
          setComponentRuleType(wn, _e, Lt);
        }
      }
      const $n = xe.findIndex((wn) => wn.max);
      return $n !== -1 && !xe[$n].validator && (xe[$n].message = xe[$n].message || t("component.form.maxTip", [xe[$n].max])), xe;
    }
    const pe = (Oe) => {
      var At;
      let _e;
      const {
        schema: he,
        tableAction: Ve,
        formModel: Ie,
        formActionType: ze
      } = e;
      let {
        componentProps: xe = {}
      } = unref(he);
      isFunction$2(xe) && (xe = (At = xe({
        schema: he,
        tableAction: Ve,
        formModel: Ie,
        formActionType: ze
      })) != null ? At : {});
      const Ue = xe.options;
      return console.log(Ue, xe), Oe === "CheckboxGroup" ? (_e = Ue.map(({
        label: Fe,
        value: Pt
      }) => {
        const vn = componentMap.get("Checkbox");
        return createVNode(vn, {
          label: Pt,
          key: Pt
        }, _isSlot$2(Fe) ? Fe : {
          default: () => [Fe]
        });
      }), _e) : (Oe === "Select" ? _e = Ue.map(({
        label: Fe,
        value: Pt
      }) => {
        const vn = componentMap.get("SelectOption");
        return createVNode(vn, {
          label: Fe,
          value: Pt,
          key: Pt
        }, _isSlot$2(Fe) ? Fe : {
          default: () => [Fe]
        });
      }) : Oe === "RadioGroup" && (_e = Ue.map(({
        label: Fe,
        value: Pt
      }) => {
        const vn = componentMap.get("Radio");
        return createVNode(vn, {
          label: Pt,
          key: Pt
        }, _isSlot$2(Fe) ? Fe : {
          default: () => [Fe]
        });
      })), _e);
    }, Ce = () => {
      var wn, Dt;
      const {
        renderComponentContent: Oe,
        component: _e,
        field: he,
        changeEvent: Ve = "change",
        valueField: Ie
      } = e.schema, ze = _e && ["Switch", "Checkbox"].includes(_e), xe = `on${upperFirst$1(Ve)}`, Ue = {
        [xe]: (...Lt) => {
          const [bn] = Lt;
          Fe[xe] && Fe[xe](...Lt);
          const jt = bn ? bn.target : null, Cn = jt ? ze ? jt.checked : jt.value : bn;
          e.setFormModel(he, Cn);
        }
      }, At = componentMap.get(_e), Fe = {
        getPopupContainer: (Lt) => Lt.parentNode,
        ...unref(ae),
        disabled: unref(ie)
      }, {
        autoSetPlaceHolder: Pt
      } = e.formProps;
      !Fe.disabled && Pt && _e && (Fe.placeholder = ((wn = unref(ae)) == null ? void 0 : wn.placeholder) || createPlaceholderMessage(_e)), Fe.placeholder = (Dt = unref(ae)) == null ? void 0 : Dt.placeholder, Fe.codeField = he, Fe.formValues = unref(le);
      const En = {
        [Ie || (ze ? "checked" : "value")]: e.formModel[he]
      }, $n = {
        ...Fe,
        ...Ue,
        ...En
      };
      if (!Oe) {
        let Lt;
        return createVNode(At, mergeProps($n, {
          modelValue: e.formModel[he],
          "onUpdate:modelValue": (bn) => e.formModel[he] = bn
        }), _isSlot$2(Lt = pe(_e)) ? Lt : {
          default: () => [Lt]
        });
      }
      const kn = isFunction$2(Oe) ? {
        ...Oe(unref(le))
      } : {
        default: () => Oe
      };
      return createVNode(At, $n, _isSlot$2(kn) ? kn : {
        default: () => [kn]
      });
    }, $e = () => {
      const {
        label: Oe,
        helpMessage: _e,
        helpComponentProps: he,
        subLabel: Ve
      } = e.schema, Ie = Ve ? createVNode("span", null, [Oe, createTextVNode(" "), createVNode("span", {
        class: "text-secondary"
      }, [Ve])]) : Oe, ze = isFunction$2(_e) ? _e(unref(le)) : _e;
      return ze !== void 0 || Array.isArray(ze) && ze.length > 0 ? createVNode("span", null, [Ie, createVNode(_sfc_main$6, mergeProps({
        placement: "top",
        content: ze
      }, he), null)]) : createVNode("span", null, [Ie]);
    }, Ne = () => {
      const {
        label: Oe,
        slot: _e,
        render: he,
        field: Ve,
        suffix: Ie,
        itemProps: ze,
        component: xe
      } = e.schema;
      if (xe === "Divider") {
        let Ue;
        const At = deepMerge$1({
          contentPosition: "left"
        }, {
          ...unref(ae)
        });
        return createVNode(ElCol, {
          span: 24
        }, {
          default: () => [createVNode(ElDivider, At, _isSlot$2(Ue = $e()) ? Ue : {
            default: () => [Ue]
          })]
        });
      } else {
        const Ue = () => _e ? getSlot(k, _e, unref(le)) : he ? he(unref(le)) : Ce(), At = !!Ie, Fe = isFunction$2(Ie) ? Ie(unref(le)) : Ie, Pt = {
          default: () => createVNode("div", {
            style: "display:flex;width:100%;"
          }, [createVNode("div", {
            style: "flex:1;"
          }, [Ue()]), At && createVNode("span", {
            class: "suffix"
          }, [Fe])]),
          label: () => $e()
        };
        return createVNode(ElFormItem, mergeProps({
          prop: Ve,
          label: Oe,
          rules: de()
        }, ze), {
          default: () => [createTextVNode(" ")],
          ...Pt
        });
      }
    };
    return onMounted(() => {
      const {
        field: Oe,
        defaultValue: _e = ""
      } = unref(oe);
      e.setFormModel(Oe, _e);
    }), () => {
      let Oe;
      const {
        colProps: _e = {},
        colSlot: he,
        renderColContent: Ve,
        component: Ie
      } = e.schema;
      if (!componentMap.has(Ie))
        return console.error(`FormItem component:${Ie} is an unregistered component Key`), null;
      const {
        baseColProps: ze = {}
      } = e.formProps, xe = {
        ...ze,
        ..._e
      }, {
        isShow: Ue
      } = ue(), At = unref(le);
      return withDirectives(createVNode(ElCol, xe, _isSlot$2(Oe = (() => he ? getSlot(k, he, At) : Ve ? Ve(At) : Ne())()) ? Oe : {
        default: () => [Oe]
      }), [[vShow, Ue]]);
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
      const { showAdvancedButton: ue, actionSpan: de, actionColOptions: pe } = e, Ce = 24 - de, $e = ue ? { span: Ce < 6 ? 24 : Ce } : {};
      return {
        span: ue ? 6 : 4,
        ...$e,
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
    for (const $e of Object.entries(ue)) {
      let [, Ne] = $e;
      const [Oe] = $e;
      if (!Oe || isArray$3(Ne) && Ne.length === 0 || isFunction$2(Ne))
        continue;
      const _e = unref(oe).transformDateFunc;
      isObject$3(Ne) && (Ne = _e == null ? void 0 : _e(Ne)), isArray$3(Ne) && ((pe = Ne[0]) == null ? void 0 : pe.format) && ((Ce = Ne[1]) == null ? void 0 : Ce.format) && (Ne = Ne.map((he) => _e == null ? void 0 : _e(he))), isString$2(Ne) && (Ne = Ne.trim()), !tryDeconstructArray(Oe, Ne, de) && !tryDeconstructObject(Oe, Ne, de) && set(de, Oe, Ne);
    }
    return le(de);
  }
  function le(ue) {
    const de = unref(oe).fieldMapToTime;
    if (!de || !Array.isArray(de))
      return ue;
    for (const [
      pe,
      [Ce, $e],
      Ne = "YYYY-MM-DD"
    ] of de) {
      if (!pe || !Ce || !$e || !ue[pe])
        continue;
      const [Oe, _e] = ue[pe];
      ue[Ce] = dateUtil(Oe).format(Ne), ue[$e] = dateUtil(_e).format(Ne), Reflect.deleteProperty(ue, pe);
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
      const { span: Ve = 0 } = he, Ie = unref(pe);
      return he[Ie.toLowerCase()] || Ve || 0;
    }
    return 0;
  }), $e = useDebounceFn(Oe, 30);
  watch(
    [
      () => unref(re),
      () => e.isAdvanced,
      () => unref(ue)
    ],
    () => {
      const { showAdvancedButton: he } = unref(oe);
      he && $e();
    },
    { immediate: !0 }
  );
  function Ne(he, Ve = 0, Ie = !1) {
    const ze = unref(ue), xe = parseInt(he.md) || parseInt(he.xs) || parseInt(he.sm) || he.span || BASIC_COL_LEN, Ue = parseInt(he.lg) || xe, At = parseInt(he.xl) || Ue, Fe = parseInt(he.xxl) || At;
    return ze <= de.MD ? Ve += xe : ze < de.LG ? Ve += Ue : ze < de.XL ? Ve += At : Ve += Fe, Ie ? (e.hideAdvanceBtn = !1, Ve <= BASIC_COL_LEN * 2 ? (e.hideAdvanceBtn = !0, e.isAdvanced = !0) : Ve > BASIC_COL_LEN * 2 && Ve <= BASIC_COL_LEN * (unref(oe).autoAdvancedLine || 3) ? e.hideAdvanceBtn = !1 : e.isLoad || (e.isLoad = !0, e.isAdvanced = !e.isAdvanced), { isAdvanced: e.isAdvanced, itemColSum: Ve }) : Ve > BASIC_COL_LEN * (unref(oe).alwaysShowLines || 1) ? { isAdvanced: e.isAdvanced, itemColSum: Ve } : { isAdvanced: !0, itemColSum: Ve };
  }
  function Oe() {
    var ze;
    let he = 0, Ve = 0;
    const { baseColProps: Ie = {} } = unref(oe);
    for (const xe of unref(re)) {
      const { show: Ue, colProps: At } = xe;
      let Fe = !0;
      if (isBoolean$1(Ue) && (Fe = Ue), isFunction$2(Ue) && (Fe = Ue({
        schema: xe,
        model: ae,
        field: xe.field,
        values: {
          ...unref(le),
          ...ae
        }
      })), Fe && (At || Ie)) {
        const { itemColSum: Pt, isAdvanced: vn } = Ne(
          { ...Ie, ...At },
          he
        );
        he = Pt || 0, vn && (Ve = he), xe.isAdvanced = vn;
      }
    }
    console.log(he), (ze = ie == null ? void 0 : ie.proxy) == null || ze.$forceUpdate(), e.actionSpan = Ve % BASIC_COL_LEN + unref(Ce), Ne(
      unref(oe).actionColOptions || { span: BASIC_COL_LEN },
      he,
      !0
    ), k("advanced-change");
  }
  function _e() {
    e.isAdvanced = !e.isAdvanced;
  }
  return { handleToggleAdvanced: _e };
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
    ), $e = computed(() => {
      const { baseRowStyle: kt = {}, rowProps: Et } = unref(Ce);
      return {
        style: kt,
        ...Et
      };
    }), Ne = computed(() => {
      const { rules: kt = {} } = unref(Ce);
      return kt;
    }), Oe = computed(
      () => ({ ...oe, ...e, ...unref(Ce) })
    ), _e = computed(() => {
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
    }), { initDefault: he, handleFormValues: Ve } = useFormValues({
      getProps: Ce,
      defaultValueRef: le,
      getSchema: _e,
      formModel: re
    }), {
      handleSubmit: Ie,
      setFieldsValue: ze,
      clearValidate: xe,
      validate: Ue,
      validateFields: At,
      getFieldsValue: Fe,
      updateSchema: Pt,
      resetSchema: vn,
      appendSchemaByField: En,
      removeSchemaByFiled: $n,
      resetFields: kn,
      scrollToField: wn
    } = useFormEvents({
      emit: k,
      getProps: Ce,
      formModel: re,
      getSchema: _e,
      defaultValueRef: le,
      formElRef: ue,
      schemaRef: ie,
      handleFormValues: Ve
    });
    createFormContext({
      resetAction: kn,
      submitAction: Ie
    }), watch(
      () => unref(Ce).model,
      () => {
        const { model: kt } = unref(Ce);
        !kt || ze(kt);
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
      () => _e.value,
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
    async function Dt(kt) {
      ae.value = deepMerge$1(unref(ae) || {}, kt);
    }
    function Lt(kt, Et) {
      re[kt] = Et;
      const { validateTrigger: _n } = unref(Oe);
      (!_n || _n === "change") && At([kt]).catch(() => {
      }), k("field-value-change", kt, Et);
    }
    function bn(kt) {
      const { autoSubmitOnEnter: Et } = unref(Ce);
      if (!!Et && kt.key === "Enter" && kt.target && kt.target instanceof HTMLElement) {
        const _n = kt.target;
        _n && _n.tagName && _n.tagName.toUpperCase() == "INPUT" && Ie();
      }
    }
    const jt = {
      getFieldsValue: Fe,
      setFieldsValue: ze,
      resetFields: kn,
      updateSchema: Pt,
      resetSchema: vn,
      setProps: Dt,
      removeSchemaByFiled: $n,
      appendSchemaByField: En,
      clearValidate: xe,
      validateFields: At,
      validate: Ue,
      submit: Ie,
      scrollToField: wn
    };
    useAutoFocus({
      getSchema: _e,
      getProps: Ce,
      isInitedDefault: de,
      formElRef: ue
    }), onMounted(() => {
      he(), k("register", jt);
    });
    const { handleToggleAdvanced: Cn } = useAdvanced({
      advanceState: pe,
      emit: k,
      getProps: Ce,
      getSchema: _e,
      formModel: re,
      defaultValueRef: le
    });
    return {
      getBindValue: Oe,
      handleToggleAdvanced: Cn,
      handleEnterPress: bn,
      formModel: re,
      defaultValueRef: le,
      advanceState: pe,
      getRow: $e,
      getProps: Ce,
      getRules: Ne,
      formRef: ue,
      getSchema: _e,
      formActionType: jt,
      setFormModel: Lt,
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
              renderList(Object.keys(e.$slots), ($e) => ({
                name: $e,
                fn: withCtx((Ne) => [
                  renderSlot(e.$slots, $e, normalizeProps(guardReactiveProps(Ne || {})))
                ])
              }))
            ]), 1032, ["tableAction", "formActionType", "schema", "formProps", "allDefaultValues", "formModel", "setFormModel"]))), 128)),
            createVNode(ue, mergeProps(e.getFormActionBindProps, { onToggleAdvanced: e.handleToggleAdvanced }), createSlots({ _: 2 }, [
              renderList(["resetBefore", "submitBefore", "advanceBefore", "advanceAfter"], (Ce) => ({
                name: Ce,
                fn: withCtx(($e) => [
                  renderSlot(e.$slots, Ce, normalizeProps(guardReactiveProps($e || {})))
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
    header: ($e) => {
      const Ne = $e.column;
      return createVNode("div", {
        relId: Ne.property
      }, [Ne.label, createVNode("span", {
        class: "caret-wrapper"
      }, [createVNode("i", {
        class: "sort-caret ascending",
        "on-click": (_e) => k.sortIconClick(_e, Ne, "ascending")
      }, null), createVNode("i", {
        class: "sort-caret descending",
        "on-click": (_e) => k.sortIconClick(_e, Ne, "descending")
      }, null)])]);
    }
  }), ue && isFunction$2(ue) && (Ce = {
    default: ($e) => ue(toRaw($e.row), $e.column, $e.$index)
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
    } = re, $e = computed(() => {
      let _e = {};
      const he = Object.keys(Ce);
      for (let Ve in he)
        _e[Ve] = unref(he[Ve]);
      return _e;
    });
    onMounted(() => {
      ie.init();
    });
    const Ne = (_e) => {
      k("handleSizePageChange", _e);
    }, Oe = (_e) => {
      k("handleCurrentPageChange", _e);
    };
    return () => {
      const _e = Object.assign({
        ref: oe,
        onHeaderClick: ue,
        data: ae.value
      }, $e.value);
      console.log($e);
      const he = useColumnRender(le.value, ie);
      let Ve = null;
      return unref(de) && (Ve = usePagerRender(pe, Ne, Oe)), createVNode("div", {
        class: "vpandora-table"
      }, [createVNode(ElTable, _e, _isSlot(he) ? he : {
        default: () => [he]
      }), Ve]);
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
