var po = Object.defineProperty;
var mo = (e, k, oe) => k in e ? po(e, k, { enumerable: !0, configurable: !0, writable: !0, value: oe }) : e[k] = oe;
var fo = (e, k, oe) => (mo(e, typeof k != "symbol" ? k + "" : k, oe), oe);
import { unref, openBlock, createElementBlock, normalizeClass, createElementVNode, createTextVNode, toDisplayString, renderSlot, getCurrentScope, onScopeDispose, ref, watch, warn, computed, getCurrentInstance, inject, onMounted, toRef, onUnmounted, isRef, onBeforeUnmount, onBeforeMount, provide, defineComponent, mergeProps, useAttrs as useAttrs$1, useSlots, shallowRef, nextTick, onUpdated, withDirectives, createCommentVNode, Fragment, createBlock, withCtx, resolveDynamicComponent, withModifiers, createVNode, normalizeStyle, vShow, Transition, reactive, cloneVNode, Text, Comment, toRefs, resolveComponent, Teleport, readonly, onDeactivated, renderList, withKeys, createSlots, vModelCheckbox, vModelRadio, h as h$2, onBeforeUpdate, resolveDirective, vModelText, toRaw, triggerRef, watchEffect, isVNode, normalizeProps, guardReactiveProps } from "vue";
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
function isObject$4(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function isPlainObject(e) {
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
const c$1 = isPlainObject, f$1 = (e) => e;
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
function getPopupContainer(e) {
  var k;
  return (k = e == null ? void 0 : e.parentNode) != null ? k : document.body;
}
const _sfc_main$Z = {
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
}, _hoisted_1$v = { class: "title" }, _hoisted_2$m = /* @__PURE__ */ createElementVNode("span", { class: "border" }, null, -1);
function _sfc_render$h(e, k, oe, re, ae, le) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(ae.isPC ? "PandoraContainer" : "PandoraContainer-m")
  }, [
    createElementVNode("div", _hoisted_1$v, [
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
const PandoraContainer = /* @__PURE__ */ _export_sfc$1(_sfc_main$Z, [["render", _sfc_render$h]]), PdFContainer = withInstall$1(PandoraContainer);
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
const freeGlobal$1 = freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self, root = freeGlobal$1 || freeSelf || Function("return this")();
const root$1 = root;
var Symbol$1 = root$1.Symbol;
const Symbol$2 = Symbol$1;
var objectProto$e = Object.prototype, hasOwnProperty$c = objectProto$e.hasOwnProperty, nativeObjectToString$1 = objectProto$e.toString, symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
function getRawTag(e) {
  var k = hasOwnProperty$c.call(e, symToStringTag$1), oe = e[symToStringTag$1];
  try {
    e[symToStringTag$1] = void 0;
    var re = !0;
  } catch {
  }
  var ae = nativeObjectToString$1.call(e);
  return re && (k ? e[symToStringTag$1] = oe : delete e[symToStringTag$1]), ae;
}
var objectProto$d = Object.prototype, nativeObjectToString = objectProto$d.toString;
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
var funcProto$1 = Function.prototype, funcToString$1 = funcProto$1.toString;
function toSource(e) {
  if (e != null) {
    try {
      return funcToString$1.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reIsHostCtor = /^\[object .+?Constructor\]$/, funcProto = Function.prototype, objectProto$c = Object.prototype, funcToString = funcProto.toString, hasOwnProperty$b = objectProto$c.hasOwnProperty, reIsNative = RegExp(
  "^" + funcToString.call(hasOwnProperty$b).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
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
var objectProto$b = Object.prototype, hasOwnProperty$a = objectProto$b.hasOwnProperty;
function assignValue(e, k, oe) {
  var re = e[k];
  (!(hasOwnProperty$a.call(e, k) && eq(re, oe)) || oe === void 0 && !(k in e)) && baseAssignValue(e, k, oe);
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
var objectProto$a = Object.prototype;
function isPrototype(e) {
  var k = e && e.constructor, oe = typeof k == "function" && k.prototype || objectProto$a;
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
var objectProto$9 = Object.prototype, hasOwnProperty$9 = objectProto$9.hasOwnProperty, propertyIsEnumerable$1 = objectProto$9.propertyIsEnumerable, isArguments = baseIsArguments(function() {
  return arguments;
}()) ? baseIsArguments : function(e) {
  return isObjectLike(e) && hasOwnProperty$9.call(e, "callee") && !propertyIsEnumerable$1.call(e, "callee");
};
const isArguments$1 = isArguments;
function stubFalse() {
  return !1;
}
var freeExports$2 = typeof exports == "object" && exports && !exports.nodeType && exports, freeModule$2 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module, moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2, Buffer$1 = moduleExports$2 ? root$1.Buffer : void 0, nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : void 0, isBuffer = nativeIsBuffer || stubFalse;
const isBuffer$1 = isBuffer;
var argsTag$2 = "[object Arguments]", arrayTag$2 = "[object Array]", boolTag$3 = "[object Boolean]", dateTag$3 = "[object Date]", errorTag$2 = "[object Error]", funcTag$1 = "[object Function]", mapTag$5 = "[object Map]", numberTag$3 = "[object Number]", objectTag$3 = "[object Object]", regexpTag$3 = "[object RegExp]", setTag$5 = "[object Set]", stringTag$3 = "[object String]", weakMapTag$2 = "[object WeakMap]", arrayBufferTag$3 = "[object ArrayBuffer]", dataViewTag$4 = "[object DataView]", float32Tag$2 = "[object Float32Array]", float64Tag$2 = "[object Float64Array]", int8Tag$2 = "[object Int8Array]", int16Tag$2 = "[object Int16Array]", int32Tag$2 = "[object Int32Array]", uint8Tag$2 = "[object Uint8Array]", uint8ClampedTag$2 = "[object Uint8ClampedArray]", uint16Tag$2 = "[object Uint16Array]", uint32Tag$2 = "[object Uint32Array]", typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = !0;
typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$2] = typedArrayTags[arrayBufferTag$3] = typedArrayTags[boolTag$3] = typedArrayTags[dataViewTag$4] = typedArrayTags[dateTag$3] = typedArrayTags[errorTag$2] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$5] = typedArrayTags[numberTag$3] = typedArrayTags[objectTag$3] = typedArrayTags[regexpTag$3] = typedArrayTags[setTag$5] = typedArrayTags[stringTag$3] = typedArrayTags[weakMapTag$2] = !1;
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
var objectProto$8 = Object.prototype, hasOwnProperty$8 = objectProto$8.hasOwnProperty;
function arrayLikeKeys(e, k) {
  var oe = isArray$2(e), re = !oe && isArguments$1(e), ae = !oe && !re && isBuffer$1(e), le = !oe && !re && !ae && isTypedArray$1(e), ie = oe || re || ae || le, ue = ie ? baseTimes(e.length, String) : [], de = ue.length;
  for (var pe in e)
    (k || hasOwnProperty$8.call(e, pe)) && !(ie && (pe == "length" || ae && (pe == "offset" || pe == "parent") || le && (pe == "buffer" || pe == "byteLength" || pe == "byteOffset") || isIndex(pe, de))) && ue.push(pe);
  return ue;
}
function overArg(e, k) {
  return function(oe) {
    return e(k(oe));
  };
}
var nativeKeys = overArg(Object.keys, Object);
const nativeKeys$1 = nativeKeys;
var objectProto$7 = Object.prototype, hasOwnProperty$7 = objectProto$7.hasOwnProperty;
function baseKeys(e) {
  if (!isPrototype(e))
    return nativeKeys$1(e);
  var k = [];
  for (var oe in Object(e))
    hasOwnProperty$7.call(e, oe) && oe != "constructor" && k.push(oe);
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
var objectProto$6 = Object.prototype, hasOwnProperty$6 = objectProto$6.hasOwnProperty;
function baseKeysIn(e) {
  if (!isObject$2(e))
    return nativeKeysIn(e);
  var k = isPrototype(e), oe = [];
  for (var re in e)
    re == "constructor" && (k || !hasOwnProperty$6.call(e, re)) || oe.push(re);
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
var HASH_UNDEFINED$2 = "__lodash_hash_undefined__", objectProto$5 = Object.prototype, hasOwnProperty$5 = objectProto$5.hasOwnProperty;
function hashGet(e) {
  var k = this.__data__;
  if (nativeCreate$1) {
    var oe = k[e];
    return oe === HASH_UNDEFINED$2 ? void 0 : oe;
  }
  return hasOwnProperty$5.call(k, e) ? k[e] : void 0;
}
var objectProto$4 = Object.prototype, hasOwnProperty$4 = objectProto$4.hasOwnProperty;
function hashHas(e) {
  var k = this.__data__;
  return nativeCreate$1 ? k[e] !== void 0 : hasOwnProperty$4.call(k, e);
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
var getPrototype = overArg(Object.getPrototypeOf, Object);
const getPrototype$1 = getPrototype;
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
var CLONE_DEEP_FLAG$1 = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG$2 = 4, argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", errorTag$1 = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag$1 = "[object Map]", numberTag$1 = "[object Number]", objectTag$1 = "[object Object]", regexpTag$1 = "[object RegExp]", setTag$1 = "[object Set]", stringTag$1 = "[object String]", symbolTag$1 = "[object Symbol]", weakMapTag = "[object WeakMap]", arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]", cloneableTags = {};
cloneableTags[argsTag$1] = cloneableTags[arrayTag$1] = cloneableTags[arrayBufferTag$1] = cloneableTags[dataViewTag$1] = cloneableTags[boolTag$1] = cloneableTags[dateTag$1] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag$1] = cloneableTags[numberTag$1] = cloneableTags[objectTag$1] = cloneableTags[regexpTag$1] = cloneableTags[setTag$1] = cloneableTags[stringTag$1] = cloneableTags[symbolTag$1] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = !0;
cloneableTags[errorTag$1] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = !1;
function baseClone(e, k, oe, re, ae, le) {
  var ie, ue = k & CLONE_DEEP_FLAG$1, de = k & CLONE_FLAT_FLAG, pe = k & CLONE_SYMBOLS_FLAG$2;
  if (oe && (ie = ae ? oe(e, re, ae, le) : oe(e)), ie !== void 0)
    return ie;
  if (!isObject$2(e))
    return e;
  var Ce = isArray$2(e);
  if (Ce) {
    if (ie = initCloneArray(e), !ue)
      return copyArray(e, ie);
  } else {
    var _e = getTag$1(e), Ne = _e == funcTag || _e == genTag;
    if (isBuffer$1(e))
      return cloneBuffer(e, ue);
    if (_e == objectTag$1 || _e == argsTag$1 || Ne && !ae) {
      if (ie = de || Ne ? {} : initCloneObject(e), !ue)
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
  }) : isMap$1(e) && e.forEach(function(Oe, xe) {
    ie.set(xe, baseClone(Oe, k, oe, xe, e, le));
  });
  var $e = pe ? de ? getAllKeysIn : getAllKeys : de ? keysIn : keys, he = Ce ? void 0 : $e(e);
  return arrayEach(he || e, function(Oe, xe) {
    he && (xe = Oe, Oe = e[xe]), assignValue(ie, xe, baseClone(Oe, k, oe, xe, e, le));
  }), ie;
}
var CLONE_SYMBOLS_FLAG$1 = 4;
function clone(e) {
  return baseClone(e, CLONE_SYMBOLS_FLAG$1);
}
var CLONE_DEEP_FLAG = 1, CLONE_SYMBOLS_FLAG = 4;
function cloneDeep(e) {
  return baseClone(e, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
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
  var _e = -1, Ne = !0, Ve = oe & COMPARE_UNORDERED_FLAG$3 ? new SetCache() : void 0;
  for (le.set(e, k), le.set(k, e); ++_e < ue; ) {
    var $e = e[_e], he = k[_e];
    if (re)
      var Oe = ie ? re(he, $e, _e, k, e, le) : re($e, he, _e, e, k, le);
    if (Oe !== void 0) {
      if (Oe)
        continue;
      Ne = !1;
      break;
    }
    if (Ve) {
      if (!arraySome(k, function(xe, Fe) {
        if (!cacheHas(Ve, Fe) && ($e === xe || ae($e, xe, oe, re, le)))
          return Ve.push(Fe);
      })) {
        Ne = !1;
        break;
      }
    } else if (!($e === he || ae($e, he, oe, re, le))) {
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
  for (var _e = de; _e--; ) {
    var Ne = ue[_e];
    if (!(ie ? Ne in k : hasOwnProperty$2.call(k, Ne)))
      return !1;
  }
  var Ve = le.get(e), $e = le.get(k);
  if (Ve && $e)
    return Ve == k && $e == e;
  var he = !0;
  le.set(e, k), le.set(k, e);
  for (var Oe = ie; ++_e < de; ) {
    Ne = ue[_e];
    var xe = e[Ne], Fe = k[Ne];
    if (re)
      var Ie = ie ? re(Fe, xe, Ne, k, e, le) : re(xe, Fe, Ne, e, k, le);
    if (!(Ie === void 0 ? xe === Fe || ae(xe, Fe, oe, re, le) : Ie)) {
      he = !1;
      break;
    }
    Oe || (Oe = Ne == "constructor");
  }
  if (he && !Oe) {
    var Ue = e.constructor, Lt = k.constructor;
    Ue != Lt && "constructor" in e && "constructor" in k && !(typeof Ue == "function" && Ue instanceof Ue && typeof Lt == "function" && Lt instanceof Lt) && (he = !1);
  }
  return le.delete(e), le.delete(k), he;
}
var COMPARE_PARTIAL_FLAG$2 = 1, argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]", objectProto = Object.prototype, hasOwnProperty$1 = objectProto.hasOwnProperty;
function baseIsEqualDeep(e, k, oe, re, ae, le) {
  var ie = isArray$2(e), ue = isArray$2(k), de = ie ? arrayTag : getTag$1(e), pe = ue ? arrayTag : getTag$1(k);
  de = de == argsTag ? objectTag : de, pe = pe == argsTag ? objectTag : pe;
  var Ce = de == objectTag, _e = pe == objectTag, Ne = de == pe;
  if (Ne && isBuffer$1(e)) {
    if (!isBuffer$1(k))
      return !1;
    ie = !0, Ce = !1;
  }
  if (Ne && !Ce)
    return le || (le = new Stack()), ie || isTypedArray$1(e) ? equalArrays(e, k, oe, re, ae, le) : equalByTag(e, k, de, oe, re, ae, le);
  if (!(oe & COMPARE_PARTIAL_FLAG$2)) {
    var Ve = Ce && hasOwnProperty$1.call(e, "__wrapped__"), $e = _e && hasOwnProperty$1.call(k, "__wrapped__");
    if (Ve || $e) {
      var he = Ve ? e.value() : e, Oe = $e ? k.value() : k;
      return le || (le = new Stack()), ae(he, Oe, oe, re, le);
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
      var _e = new Stack();
      if (re)
        var Ne = re(pe, Ce, de, e, k, _e);
      if (!(Ne === void 0 ? baseIsEqual(Ce, pe, COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1, re, _e) : Ne))
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
  var re, ae, le, ie, ue, de, pe = 0, Ce = !1, _e = !1, Ne = !0;
  if (typeof e != "function")
    throw new TypeError(FUNC_ERROR_TEXT);
  k = toNumber(k) || 0, isObject$2(oe) && (Ce = !!oe.leading, _e = "maxWait" in oe, le = _e ? nativeMax(toNumber(oe.maxWait) || 0, k) : le, Ne = "trailing" in oe ? !!oe.trailing : Ne);
  function Ve(ze) {
    var Pt = re, bn = ae;
    return re = ae = void 0, pe = ze, ie = e.apply(bn, Pt), ie;
  }
  function $e(ze) {
    return pe = ze, ue = setTimeout(xe, k), Ce ? Ve(ze) : ie;
  }
  function he(ze) {
    var Pt = ze - de, bn = ze - pe, En = k - Pt;
    return _e ? nativeMin(En, le - bn) : En;
  }
  function Oe(ze) {
    var Pt = ze - de, bn = ze - pe;
    return de === void 0 || Pt >= k || Pt < 0 || _e && bn >= le;
  }
  function xe() {
    var ze = now$1();
    if (Oe(ze))
      return Fe(ze);
    ue = setTimeout(xe, he(ze));
  }
  function Fe(ze) {
    return ue = void 0, Ne && re ? Ve(ze) : (re = ae = void 0, ie);
  }
  function Ie() {
    ue !== void 0 && clearTimeout(ue), pe = 0, re = de = ae = ue = void 0;
  }
  function Ue() {
    return ue === void 0 ? ie : Fe(now$1());
  }
  function Lt() {
    var ze = now$1(), Pt = Oe(ze);
    if (re = arguments, ae = this, de = ze, Pt) {
      if (ue === void 0)
        return $e(de);
      if (_e)
        return clearTimeout(ue), ue = setTimeout(xe, k), Ve(de);
    }
    return ue === void 0 && (ue = setTimeout(xe, k)), ie;
  }
  return Lt.cancel = Ie, Lt.flush = Ue, Lt;
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
function isEqual(e, k) {
  return baseIsEqual(e, k);
}
function isNil(e) {
  return e == null;
}
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
        for (var Ne = de.length; Ne--; )
          if (de[Ne] === _e)
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
  const pe = (Ne) => {
    re.clearTimeout(de);
    const Ve = unrefElement(e), $e = Ne.composedPath();
    !Ve || Ve === Ne.target || $e.includes(Ve) || !ue.value || ae && ae.length > 0 && ae.some((he) => {
      const Oe = unrefElement(he);
      return Oe && (Ne.target === Oe || $e.includes(Oe));
    }) || k(Ne);
  }, Ce = [
    useEventListener(re, "click", pe, { passive: !0, capture: le }),
    useEventListener(re, "pointerdown", (Ne) => {
      const Ve = unrefElement(e);
      ue.value = !!Ve && !Ne.composedPath().includes(Ve);
    }, { passive: !0 }),
    useEventListener(re, "pointerup", (Ne) => {
      if (Ne.button === 0) {
        const Ve = Ne.composedPath();
        Ne.composedPath = () => Ve, de = re.setTimeout(() => pe(Ne), 50);
      }
    }, { passive: !0 }),
    ie && useEventListener(re, "blur", (Ne) => {
      var Ve;
      const $e = unrefElement(e);
      ((Ve = document.activeElement) == null ? void 0 : Ve.tagName) === "IFRAME" && !($e != null && $e.contains(document.activeElement)) && k(Ne);
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
        const Ne = [...new Set(_e)].map((Ve) => JSON.stringify(Ve)).join(", ");
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
}, getComponentSize = (e) => componentSizeMap[e || "default"], isValidComponentSize = (e) => ["", ...componentSizes].includes(e), unique = (e) => [...new Set(e)], castArray = (e) => !e && e !== 0 ? [] : Array.isArray(e) ? e : [e], isKorean = (e) => /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi.test(e), generateId = () => Math.floor(Math.random() * 1e4), mutable = (e) => e, DEFAULT_EXCLUDE_KEYS = ["class", "style"], LISTENER_PREFIX = /^on[A-Z]/, useAttrs = (e = {}) => {
  const { excludeListeners: k = !1, excludeKeys: oe } = e, re = computed(() => ((oe == null ? void 0 : oe.value) || []).concat(DEFAULT_EXCLUDE_KEYS)), ae = getCurrentInstance();
  return ae ? computed(() => {
    var le;
    return fromPairs(Object.entries((le = ae.proxy) == null ? void 0 : le.$attrs).filter(([ie]) => !re.value.includes(ie) && !(k && LISTENER_PREFIX.test(ie))));
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
    bem: (he, Oe, xe) => he && Oe && xe ? _bem(unref(oe), e, he, Oe, xe) : "",
    is: (he, ...Oe) => {
      const xe = Oe.length >= 1 ? Oe[0] : !0;
      return he && xe ? `${statePrefix}${he}` : "";
    },
    cssVar: (he) => {
      const Oe = {};
      for (const xe in he)
        he[xe] && (Oe[`--${oe.value}-${xe}`] = he[xe]);
      return Oe;
    },
    cssVarName: (he) => `--${oe.value}-${he}`,
    cssVarBlock: (he) => {
      const Oe = {};
      for (const xe in he)
        he[xe] && (Oe[`--${oe.value}-${e}-${xe}`] = he[xe]);
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
      const Ne = getCurrentInstance(), { emit: Ve } = Ne, $e = Ne.props, he = computed(() => isFunction($e[oe])), Oe = computed(() => $e[e] === null), xe = (Pt) => {
        ie.value !== !0 && (ie.value = !0, ue && (ue.value = Pt), isFunction(Ce) && Ce(Pt));
      }, Fe = (Pt) => {
        ie.value !== !1 && (ie.value = !1, ue && (ue.value = Pt), isFunction(_e) && _e(Pt));
      }, Ie = (Pt) => {
        if ($e.disabled === !0 || isFunction(pe) && !pe())
          return;
        const bn = he.value && isClient$1;
        bn && Ve(k, !0), (Oe.value || !bn) && xe(Pt);
      }, Ue = (Pt) => {
        if ($e.disabled === !0 || !isClient$1)
          return;
        const bn = he.value && isClient$1;
        bn && Ve(k, !1), (Oe.value || !bn) && Fe(Pt);
      }, Lt = (Pt) => {
        !isBoolean(Pt) || ($e.disabled && Pt ? he.value && Ve(k, !1) : ie.value !== Pt && (Pt ? xe() : Fe()));
      }, ze = () => {
        ie.value ? Ue() : Ie();
      };
      return watch(() => $e[e], Lt), de && Ne.appContext.config.globalProperties.$route !== void 0 && watch(() => ({
        ...Ne.proxy.$route
      }), () => {
        de.value && ie.value && Ue();
      }), onMounted(() => {
        Lt($e[e]);
      }), {
        hide: Ue,
        show: Ie,
        toggle: ze,
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
}, _sfc_main$Y = /* @__PURE__ */ defineComponent({
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
var Icon = /* @__PURE__ */ _export_sfc(_sfc_main$Y, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/icon/src/icon.vue"]]);
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
}, _hoisted_1$u = ["role"], _hoisted_2$l = ["id", "type", "disabled", "formatter", "parser", "readonly", "autocomplete", "tabindex", "aria-label", "placeholder"], _hoisted_3$c = ["id", "tabindex", "disabled", "readonly", "autocomplete", "aria-label", "placeholder"], __default__$s = {
  name: "ElInput",
  inheritAttrs: !1
}, _sfc_main$X = /* @__PURE__ */ defineComponent({
  ...__default__$s,
  props: inputProps,
  emits: inputEmits,
  setup(e, { expose: k, emit: oe }) {
    const re = e, ae = {
      suffix: "append",
      prefix: "prepend"
    }, le = getCurrentInstance(), ie = useAttrs$1(), ue = useSlots(), de = computed(() => {
      const xn = {};
      return re.containerRole === "combobox" && (xn["aria-haspopup"] = ie["aria-haspopup"], xn["aria-owns"] = ie["aria-owns"], xn["aria-expanded"] = ie["aria-expanded"]), xn;
    }), pe = useAttrs({
      excludeKeys: computed(() => Object.keys(de.value))
    }), { form: Ce, formItem: _e } = useFormItem(), { inputId: Ne } = useFormItemInputId(re, {
      formItemContext: _e
    }), Ve = useSize(), $e = useDisabled$1(), he = useNamespace("input"), Oe = useNamespace("textarea"), xe = shallowRef(), Fe = shallowRef(), Ie = ref(!1), Ue = ref(!1), Lt = ref(!1), ze = ref(!1), Pt = ref(), bn = shallowRef(re.inputStyle), En = computed(() => xe.value || Fe.value), Tn = computed(() => {
      var xn;
      return (xn = Ce == null ? void 0 : Ce.statusIcon) != null ? xn : !1;
    }), $n = computed(() => (_e == null ? void 0 : _e.validateState) || ""), _n = computed(() => $n.value && ValidateComponentsMap[$n.value]), Dt = computed(() => ze.value ? view_default : hide_default), At = computed(() => [
      ie.style,
      re.inputStyle
    ]), vn = computed(() => [
      re.inputStyle,
      bn.value,
      { resize: re.resize }
    ]), jt = computed(() => isNil(re.modelValue) ? "" : String(re.modelValue)), Cn = computed(() => re.clearable && !$e.value && !re.readonly && !!jt.value && (Ie.value || Ue.value)), kt = computed(() => re.showPassword && !$e.value && !re.readonly && !!jt.value && (!!jt.value || Ie.value)), Et = computed(() => re.showWordLimit && !!pe.value.maxlength && (re.type === "text" || re.type === "textarea") && !$e.value && !re.readonly && !re.showPassword), wn = computed(() => Array.from(jt.value).length), Pn = computed(() => !!Et.value && wn.value > Number(pe.value.maxlength)), hn = computed(() => !!ue.suffix || !!re.suffixIcon || Cn.value || re.showPassword || Et.value || !!$n.value && Tn.value), [On, Dn] = useCursor(xe);
    useResizeObserver(Fe, (xn) => {
      if (!Et.value || re.resize !== "both")
        return;
      const Jn = xn[0], { width: Qn } = Jn.contentRect;
      Pt.value = {
        right: `calc(100% - ${Qn + 15 + 6}px)`
      };
    });
    const Rn = () => {
      const { type: xn, autosize: Jn } = re;
      if (!(!isClient$1 || xn !== "textarea"))
        if (Jn) {
          const Qn = isObject$1(Jn) ? Jn.minRows : void 0, ro = isObject$1(Jn) ? Jn.maxRows : void 0;
          bn.value = {
            ...calcTextareaHeight(Fe.value, Qn, ro)
          };
        } else
          bn.value = {
            minHeight: calcTextareaHeight(Fe.value).minHeight
          };
    }, Fn = () => {
      const xn = En.value;
      !xn || xn.value === jt.value || (xn.value = jt.value);
    }, Nn = (xn) => {
      const { el: Jn } = le.vnode;
      if (!Jn)
        return;
      const ro = Array.from(Jn.querySelectorAll(`.${he.e(xn)}`)).find((Mn) => Mn.parentNode === Jn);
      if (!ro)
        return;
      const kn = ae[xn];
      ue[kn] ? ro.style.transform = `translateX(${xn === "suffix" ? "-" : ""}${Jn.querySelector(`.${he.be("group", kn)}`).offsetWidth}px)` : ro.removeAttribute("style");
    }, An = () => {
      Nn("prefix"), Nn("suffix");
    }, Vn = async (xn) => {
      On();
      let { value: Jn } = xn.target;
      re.formatter && (Jn = re.parser ? re.parser(Jn) : Jn, Jn = re.formatter(Jn)), !Lt.value && Jn !== jt.value && (oe(UPDATE_MODEL_EVENT, Jn), oe("input", Jn), await nextTick(), Fn(), Dn());
    }, Bn = (xn) => {
      oe("change", xn.target.value);
    }, Kn = (xn) => {
      oe("compositionstart", xn), Lt.value = !0;
    }, Yn = (xn) => {
      var Jn;
      oe("compositionupdate", xn);
      const Qn = (Jn = xn.target) == null ? void 0 : Jn.value, ro = Qn[Qn.length - 1] || "";
      Lt.value = !isKorean(ro);
    }, Xn = (xn) => {
      oe("compositionend", xn), Lt.value && (Lt.value = !1, Vn(xn));
    }, eo = () => {
      ze.value = !ze.value, qn();
    }, qn = async () => {
      var xn;
      await nextTick(), (xn = En.value) == null || xn.focus();
    }, no = () => {
      var xn;
      return (xn = En.value) == null ? void 0 : xn.blur();
    }, oo = (xn) => {
      Ie.value = !0, oe("focus", xn);
    }, zn = (xn) => {
      var Jn;
      Ie.value = !1, oe("blur", xn), re.validateEvent && ((Jn = _e == null ? void 0 : _e.validate) == null || Jn.call(_e, "blur").catch((Qn) => debugWarn(Qn)));
    }, Hn = (xn) => {
      Ue.value = !1, oe("mouseleave", xn);
    }, Gn = (xn) => {
      Ue.value = !0, oe("mouseenter", xn);
    }, Zn = (xn) => {
      oe("keydown", xn);
    }, lo = () => {
      var xn;
      (xn = En.value) == null || xn.select();
    }, ao = () => {
      oe(UPDATE_MODEL_EVENT, ""), oe("change", ""), oe("clear"), oe("input", "");
    };
    return watch(() => re.modelValue, () => {
      var xn;
      nextTick(() => Rn()), re.validateEvent && ((xn = _e == null ? void 0 : _e.validate) == null || xn.call(_e, "change").catch((Jn) => debugWarn(Jn)));
    }), watch(jt, () => Fn()), watch(() => re.type, async () => {
      await nextTick(), Fn(), Rn(), An();
    }), onMounted(async () => {
      !re.formatter && re.parser && debugWarn("ElInput", "If you set the parser, you also need to set the formatter."), Fn(), An(), await nextTick(), Rn();
    }), onUpdated(async () => {
      await nextTick(), An();
    }), k({
      input: xe,
      textarea: Fe,
      ref: En,
      textareaStyle: vn,
      autosize: toRef(re, "autosize"),
      focus: qn,
      blur: no,
      select: lo,
      clear: ao,
      resizeTextarea: Rn
    }), (xn, Jn) => withDirectives((openBlock(), createElementBlock("div", mergeProps(unref(de), {
      class: [
        xn.type === "textarea" ? unref(Oe).b() : unref(he).b(),
        unref(he).m(unref(Ve)),
        unref(he).is("disabled", unref($e)),
        unref(he).is("exceed", unref(Pn)),
        {
          [unref(he).b("group")]: xn.$slots.prepend || xn.$slots.append,
          [unref(he).bm("group", "append")]: xn.$slots.append,
          [unref(he).bm("group", "prepend")]: xn.$slots.prepend,
          [unref(he).m("prefix")]: xn.$slots.prefix || xn.prefixIcon,
          [unref(he).m("suffix")]: xn.$slots.suffix || xn.suffixIcon || xn.clearable || xn.showPassword,
          [unref(he).bm("suffix", "password-clear")]: unref(Cn) && unref(kt)
        },
        xn.$attrs.class
      ],
      style: unref(At),
      role: xn.containerRole,
      onMouseenter: Gn,
      onMouseleave: Hn
    }), [
      createCommentVNode(" input "),
      xn.type !== "textarea" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        createCommentVNode(" prepend slot "),
        xn.$slots.prepend ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(he).be("group", "prepend"))
        }, [
          renderSlot(xn.$slots, "prepend")
        ], 2)) : createCommentVNode("v-if", !0),
        createElementVNode("div", {
          class: normalizeClass([unref(he).e("wrapper"), unref(he).is("focus", Ie.value)])
        }, [
          createCommentVNode(" prefix slot "),
          xn.$slots.prefix || xn.prefixIcon ? (openBlock(), createElementBlock("span", {
            key: 0,
            class: normalizeClass(unref(he).e("prefix"))
          }, [
            createElementVNode("span", {
              class: normalizeClass(unref(he).e("prefix-inner"))
            }, [
              renderSlot(xn.$slots, "prefix"),
              xn.prefixIcon ? (openBlock(), createBlock(unref(ElIcon), {
                key: 0,
                class: normalizeClass(unref(he).e("icon"))
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(resolveDynamicComponent(xn.prefixIcon)))
                ]),
                _: 1
              }, 8, ["class"])) : createCommentVNode("v-if", !0)
            ], 2)
          ], 2)) : createCommentVNode("v-if", !0),
          createElementVNode("input", mergeProps({
            id: unref(Ne),
            ref_key: "input",
            ref: xe,
            class: unref(he).e("inner")
          }, unref(pe), {
            type: xn.showPassword ? ze.value ? "text" : "password" : xn.type,
            disabled: unref($e),
            formatter: xn.formatter,
            parser: xn.parser,
            readonly: xn.readonly,
            autocomplete: xn.autocomplete,
            tabindex: xn.tabindex,
            "aria-label": xn.label,
            placeholder: xn.placeholder,
            style: xn.inputStyle,
            onCompositionstart: Kn,
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
              !unref(Cn) || !unref(kt) || !unref(Et) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                renderSlot(xn.$slots, "suffix"),
                xn.suffixIcon ? (openBlock(), createBlock(unref(ElIcon), {
                  key: 0,
                  class: normalizeClass(unref(he).e("icon"))
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent(xn.suffixIcon)))
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
                }, toDisplayString(unref(wn)) + " / " + toDisplayString(unref(pe).maxlength), 3)
              ], 2)) : createCommentVNode("v-if", !0),
              unref($n) && unref(_n) && unref(Tn) ? (openBlock(), createBlock(unref(ElIcon), {
                key: 4,
                class: normalizeClass([
                  unref(he).e("icon"),
                  unref(he).e("validateIcon"),
                  unref(he).is("loading", unref($n) === "validating")
                ])
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(resolveDynamicComponent(unref(_n))))
                ]),
                _: 1
              }, 8, ["class"])) : createCommentVNode("v-if", !0)
            ], 2)
          ], 2)) : createCommentVNode("v-if", !0)
        ], 2),
        createCommentVNode(" append slot "),
        xn.$slots.append ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(unref(he).be("group", "append"))
        }, [
          renderSlot(xn.$slots, "append")
        ], 2)) : createCommentVNode("v-if", !0)
      ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        createCommentVNode(" textarea "),
        createElementVNode("textarea", mergeProps({
          id: unref(Ne),
          ref_key: "textarea",
          ref: Fe,
          class: unref(Oe).e("inner")
        }, unref(pe), {
          tabindex: xn.tabindex,
          disabled: unref($e),
          readonly: xn.readonly,
          autocomplete: xn.autocomplete,
          style: unref(vn),
          "aria-label": xn.label,
          placeholder: xn.placeholder,
          onCompositionstart: Kn,
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
        }, toDisplayString(unref(wn)) + " / " + toDisplayString(unref(pe).maxlength), 7)) : createCommentVNode("v-if", !0)
      ], 64))
    ], 16, _hoisted_1$u)), [
      [vShow, xn.type !== "hidden"]
    ]);
  }
});
var Input = /* @__PURE__ */ _export_sfc(_sfc_main$X, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/input/src/input.vue"]]);
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
}), _sfc_main$W = /* @__PURE__ */ defineComponent({
  __name: "thumb",
  props: thumbProps,
  setup(e) {
    const k = e, oe = "Thumb", re = inject(scrollbarContextKey), ae = useNamespace("scrollbar");
    re || throwError(oe, "can not inject scrollbar context");
    const le = ref(), ie = ref(), ue = ref({}), de = ref(!1);
    let pe = !1, Ce = !1, _e = isClient$1 ? document.onselectstart : null;
    const Ne = computed(() => BAR_MAP[k.vertical ? "vertical" : "horizontal"]), Ve = computed(() => renderThumbStyle({
      size: k.size,
      move: k.move,
      bar: Ne.value
    })), $e = computed(() => le.value[Ne.value.offset] ** 2 / re.wrapElement[Ne.value.scrollSize] / k.ratio / ie.value[Ne.value.offset]), he = (Pt) => {
      var bn;
      if (Pt.stopPropagation(), Pt.ctrlKey || [1, 2].includes(Pt.button))
        return;
      (bn = window.getSelection()) == null || bn.removeAllRanges(), xe(Pt);
      const En = Pt.currentTarget;
      !En || (ue.value[Ne.value.axis] = En[Ne.value.offset] - (Pt[Ne.value.client] - En.getBoundingClientRect()[Ne.value.direction]));
    }, Oe = (Pt) => {
      if (!ie.value || !le.value || !re.wrapElement)
        return;
      const bn = Math.abs(Pt.target.getBoundingClientRect()[Ne.value.direction] - Pt[Ne.value.client]), En = ie.value[Ne.value.offset] / 2, Tn = (bn - En) * 100 * $e.value / le.value[Ne.value.offset];
      re.wrapElement[Ne.value.scroll] = Tn * re.wrapElement[Ne.value.scrollSize] / 100;
    }, xe = (Pt) => {
      Pt.stopImmediatePropagation(), pe = !0, document.addEventListener("mousemove", Fe), document.addEventListener("mouseup", Ie), _e = document.onselectstart, document.onselectstart = () => !1;
    }, Fe = (Pt) => {
      if (!le.value || !ie.value || pe === !1)
        return;
      const bn = ue.value[Ne.value.axis];
      if (!bn)
        return;
      const En = (le.value.getBoundingClientRect()[Ne.value.direction] - Pt[Ne.value.client]) * -1, Tn = ie.value[Ne.value.offset] - bn, $n = (En - Tn) * 100 * $e.value / le.value[Ne.value.offset];
      re.wrapElement[Ne.value.scroll] = $n * re.wrapElement[Ne.value.scrollSize] / 100;
    }, Ie = () => {
      pe = !1, ue.value[Ne.value.axis] = 0, document.removeEventListener("mousemove", Fe), document.removeEventListener("mouseup", Ie), ze(), Ce && (de.value = !1);
    }, Ue = () => {
      Ce = !1, de.value = !!k.size;
    }, Lt = () => {
      Ce = !0, de.value = pe;
    };
    onBeforeUnmount(() => {
      ze(), document.removeEventListener("mouseup", Ie);
    });
    const ze = () => {
      document.onselectstart !== _e && (document.onselectstart = _e);
    };
    return useEventListener(toRef(re, "scrollbarElement"), "mousemove", Ue), useEventListener(toRef(re, "scrollbarElement"), "mouseleave", Lt), (Pt, bn) => (openBlock(), createBlock(Transition, {
      name: unref(ae).b("fade"),
      persisted: ""
    }, {
      default: withCtx(() => [
        withDirectives(createElementVNode("div", {
          ref_key: "instance",
          ref: le,
          class: normalizeClass([unref(ae).e("bar"), unref(ae).is(unref(Ne).key)]),
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
var Thumb = /* @__PURE__ */ _export_sfc(_sfc_main$W, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/thumb.vue"]]);
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
}), _sfc_main$V = /* @__PURE__ */ defineComponent({
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
var Bar = /* @__PURE__ */ _export_sfc(_sfc_main$V, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/bar.vue"]]);
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
}, _sfc_main$U = /* @__PURE__ */ defineComponent({
  ...__default__$r,
  props: scrollbarProps,
  emits: scrollbarEmits,
  setup(e, { expose: k, emit: oe }) {
    const re = e, ae = useNamespace("scrollbar");
    let le, ie;
    const ue = ref(), de = ref(), pe = ref(), Ce = ref("0"), _e = ref("0"), Ne = ref(), Ve = ref(1), $e = ref(1), he = "ElScrollbar", Oe = computed(() => {
      const ze = {};
      return re.height && (ze.height = addUnit(re.height)), re.maxHeight && (ze.maxHeight = addUnit(re.maxHeight)), [re.wrapStyle, ze];
    }), xe = () => {
      var ze;
      de.value && ((ze = Ne.value) == null || ze.handleScroll(de.value), oe("scroll", {
        scrollTop: de.value.scrollTop,
        scrollLeft: de.value.scrollLeft
      }));
    };
    function Fe(ze, Pt) {
      isObject$1(ze) ? de.value.scrollTo(ze) : isNumber(ze) && isNumber(Pt) && de.value.scrollTo(ze, Pt);
    }
    const Ie = (ze) => {
      if (!isNumber(ze)) {
        debugWarn(he, "value must be a number");
        return;
      }
      de.value.scrollTop = ze;
    }, Ue = (ze) => {
      if (!isNumber(ze)) {
        debugWarn(he, "value must be a number");
        return;
      }
      de.value.scrollLeft = ze;
    }, Lt = () => {
      if (!de.value)
        return;
      const ze = de.value.offsetHeight - GAP, Pt = de.value.offsetWidth - GAP, bn = ze ** 2 / de.value.scrollHeight, En = Pt ** 2 / de.value.scrollWidth, Tn = Math.max(bn, re.minSize), $n = Math.max(En, re.minSize);
      Ve.value = bn / (ze - bn) / (Tn / (ze - Tn)), $e.value = En / (Pt - En) / ($n / (Pt - $n)), _e.value = Tn + GAP < ze ? `${Tn}px` : "", Ce.value = $n + GAP < Pt ? `${$n}px` : "";
    };
    return watch(() => re.noresize, (ze) => {
      ze ? (le == null || le(), ie == null || ie()) : ({ stop: le } = useResizeObserver(pe, Lt), ie = useEventListener("resize", Lt));
    }, { immediate: !0 }), watch(() => [re.maxHeight, re.height], () => {
      re.native || nextTick(() => {
        var ze;
        Lt(), de.value && ((ze = Ne.value) == null || ze.handleScroll(de.value));
      });
    }), provide(scrollbarContextKey, reactive({
      scrollbarElement: ue,
      wrapElement: de
    })), onMounted(() => {
      re.native || nextTick(() => {
        Lt();
      });
    }), onUpdated(() => Lt()), k({
      wrap$: de,
      update: Lt,
      scrollTo: Fe,
      setScrollTop: Ie,
      setScrollLeft: Ue,
      handleScroll: xe
    }), (ze, Pt) => (openBlock(), createElementBlock("div", {
      ref_key: "scrollbar$",
      ref: ue,
      class: normalizeClass(unref(ae).b())
    }, [
      createElementVNode("div", {
        ref_key: "wrap$",
        ref: de,
        class: normalizeClass([
          ze.wrapClass,
          unref(ae).e("wrap"),
          { [unref(ae).em("wrap", "hidden-default")]: !ze.native }
        ]),
        style: normalizeStyle(unref(Oe)),
        onScroll: xe
      }, [
        (openBlock(), createBlock(resolveDynamicComponent(ze.tag), {
          ref_key: "resize$",
          ref: pe,
          class: normalizeClass([unref(ae).e("view"), ze.viewClass]),
          style: normalizeStyle(ze.viewStyle)
        }, {
          default: withCtx(() => [
            renderSlot(ze.$slots, "default")
          ]),
          _: 3
        }, 8, ["class", "style"]))
      ], 38),
      ze.native ? createCommentVNode("v-if", !0) : (openBlock(), createBlock(Bar, {
        key: 0,
        ref_key: "barRef",
        ref: Ne,
        height: _e.value,
        width: Ce.value,
        always: ze.always,
        "ratio-x": $e.value,
        "ratio-y": Ve.value
      }, null, 8, ["height", "width", "always", "ratio-x", "ratio-y"]))
    ], 2));
  }
});
var Scrollbar = /* @__PURE__ */ _export_sfc(_sfc_main$U, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/scrollbar.vue"]]);
const ElScrollbar = withInstall(Scrollbar), usePopperProps = buildProps({
  role: {
    type: String,
    default: "tooltip"
  }
}), __default__$q = {
  name: "ElPopperRoot",
  inheritAttrs: !1
}, _sfc_main$T = /* @__PURE__ */ defineComponent({
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
var Popper = /* @__PURE__ */ _export_sfc(_sfc_main$T, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/popper.vue"]]);
const usePopperArrowProps = buildProps({
  arrowOffset: {
    type: Number,
    default: 5
  }
}), __default__$p = {
  name: "ElPopperArrow",
  inheritAttrs: !1
}, _sfc_main$S = /* @__PURE__ */ defineComponent({
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
var ElPopperArrow = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/arrow.vue"]]);
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
}, _sfc_main$R = /* @__PURE__ */ defineComponent({
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
        ].forEach((Ne) => {
          var Ve;
          const $e = oe[Ne];
          $e && (Ce.addEventListener(Ne.slice(2).toLowerCase(), $e), (Ve = _e == null ? void 0 : _e.removeEventListener) == null || Ve.call(_e, Ne.slice(2).toLowerCase(), $e));
        }), pe = watch([le, ie, ue, de], (Ne) => {
          [
            "aria-controls",
            "aria-describedby",
            "aria-haspopup",
            "aria-expanded"
          ].forEach((Ve, $e) => {
            isNil(Ne[$e]) ? Ce.removeAttribute(Ve) : Ce.setAttribute(Ve, Ne[$e]);
          });
        }, { immediate: !0 })), isElement(_e) && [
          "aria-controls",
          "aria-describedby",
          "aria-haspopup",
          "aria-expanded"
        ].forEach((Ne) => _e.removeAttribute(Ne));
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
var ElPopperTrigger = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/trigger.vue"]]), E$1 = "top", R = "bottom", W = "right", P$1 = "left", me = "auto", G = [E$1, R, W, P$1], U$1 = "start", J = "end", Xe = "clippingParents", je = "viewport", K = "popper", Ye = "reference", De = G.reduce(function(e, k) {
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
    var _e = Tt(ae.padding, oe), Ne = ke(le), Ve = de === "y" ? E$1 : P$1, $e = de === "y" ? R : W, he = oe.rects.reference[Ce] + oe.rects.reference[de] - ie[de] - oe.rects.popper[Ce], Oe = ie[de] - oe.rects.reference[de], xe = se(le), Fe = xe ? de === "y" ? xe.clientHeight || 0 : xe.clientWidth || 0 : 0, Ie = he / 2 - Oe / 2, Ue = _e[Ve], Lt = Fe - Ne[Ce] - _e[$e], ze = Fe / 2 - Ne[Ce] / 2 + Ie, Pt = fe(Ue, ze, Lt), bn = de;
    oe.modifiersData[re] = (k = {}, k[bn] = Pt, k.centerOffset = Pt - ze, k);
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
  var k, oe = e.popper, re = e.popperRect, ae = e.placement, le = e.variation, ie = e.offsets, ue = e.position, de = e.gpuAcceleration, pe = e.adaptive, Ce = e.roundOffsets, _e = e.isFixed, Ne = ie.x, Ve = Ne === void 0 ? 0 : Ne, $e = ie.y, he = $e === void 0 ? 0 : $e, Oe = typeof Ce == "function" ? Ce({ x: Ve, y: he }) : { x: Ve, y: he };
  Ve = Oe.x, he = Oe.y;
  var xe = ie.hasOwnProperty("x"), Fe = ie.hasOwnProperty("y"), Ie = P$1, Ue = E$1, Lt = window;
  if (pe) {
    var ze = se(oe), Pt = "clientHeight", bn = "clientWidth";
    if (ze === H(oe) && (ze = I$1(oe), N$1(ze).position !== "static" && ue === "absolute" && (Pt = "scrollHeight", bn = "scrollWidth")), ze = ze, ae === E$1 || (ae === P$1 || ae === W) && le === J) {
      Ue = R;
      var En = _e && ze === Lt && Lt.visualViewport ? Lt.visualViewport.height : ze[Pt];
      he -= En - re.height, he *= de ? 1 : -1;
    }
    if (ae === P$1 || (ae === E$1 || ae === R) && le === J) {
      Ie = W;
      var Tn = _e && ze === Lt && Lt.visualViewport ? Lt.visualViewport.width : ze[bn];
      Ve -= Tn - re.width, Ve *= de ? 1 : -1;
    }
  }
  var $n = Object.assign({ position: ue }, pe && qt), _n = Ce === !0 ? Vt({ x: Ve, y: he }) : { x: Ve, y: he };
  if (Ve = _n.x, he = _n.y, de) {
    var Dt;
    return Object.assign({}, $n, (Dt = {}, Dt[Ue] = Fe ? "0" : "", Dt[Ie] = xe ? "0" : "", Dt.transform = (Lt.devicePixelRatio || 1) <= 1 ? "translate(" + Ve + "px, " + he + "px)" : "translate3d(" + Ve + "px, " + he + "px, 0)", Dt));
  }
  return Object.assign({}, $n, (k = {}, k[Ue] = Fe ? he + "px" : "", k[Ie] = xe ? Ve + "px" : "", k.transform = "", k));
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
  var oe = k, re = oe.placement, ae = re === void 0 ? e.placement : re, le = oe.boundary, ie = le === void 0 ? Xe : le, ue = oe.rootBoundary, de = ue === void 0 ? je : ue, pe = oe.elementContext, Ce = pe === void 0 ? K : pe, _e = oe.altBoundary, Ne = _e === void 0 ? !1 : _e, Ve = oe.padding, $e = Ve === void 0 ? 0 : Ve, he = ft(typeof $e != "number" ? $e : ct($e, G)), Oe = Ce === K ? Ye : K, xe = e.rects.popper, Fe = e.elements[Ne ? Oe : Ce], Ie = Gt(Q(Fe) ? Fe : Fe.contextElement || I$1(e.elements.popper), ie, de), Ue = ee(e.elements.reference), Lt = mt({ reference: Ue, element: xe, strategy: "absolute", placement: ae }), ze = Te(Object.assign({}, xe, Lt)), Pt = Ce === K ? ze : Ue, bn = { top: Ie.top - Pt.top + he.top, bottom: Pt.bottom - Ie.bottom + he.bottom, left: Ie.left - Pt.left + he.left, right: Pt.right - Ie.right + he.right }, En = e.modifiersData.offset;
  if (Ce === K && En) {
    var Tn = En[ae];
    Object.keys(bn).forEach(function($n) {
      var _n = [W, R].indexOf($n) >= 0 ? 1 : -1, Dt = [E$1, R].indexOf($n) >= 0 ? "y" : "x";
      bn[$n] += Tn[Dt] * _n;
    });
  }
  return bn;
}
function Jt(e, k) {
  k === void 0 && (k = {});
  var oe = k, re = oe.placement, ae = oe.boundary, le = oe.rootBoundary, ie = oe.padding, ue = oe.flipVariations, de = oe.allowedAutoPlacements, pe = de === void 0 ? Ee : de, Ce = te(re), _e = Ce ? ue ? De : De.filter(function($e) {
    return te($e) === Ce;
  }) : G, Ne = _e.filter(function($e) {
    return pe.indexOf($e) >= 0;
  });
  Ne.length === 0 && (Ne = _e);
  var Ve = Ne.reduce(function($e, he) {
    return $e[he] = ne(e, { placement: he, boundary: ae, rootBoundary: le, padding: ie })[q(he)], $e;
  }, {});
  return Object.keys(Ve).sort(function($e, he) {
    return Ve[$e] - Ve[he];
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
    for (var ae = oe.mainAxis, le = ae === void 0 ? !0 : ae, ie = oe.altAxis, ue = ie === void 0 ? !0 : ie, de = oe.fallbackPlacements, pe = oe.padding, Ce = oe.boundary, _e = oe.rootBoundary, Ne = oe.altBoundary, Ve = oe.flipVariations, $e = Ve === void 0 ? !0 : Ve, he = oe.allowedAutoPlacements, Oe = k.options.placement, xe = q(Oe), Fe = xe === Oe, Ie = de || (Fe || !$e ? [be(Oe)] : Kt(Oe)), Ue = [Oe].concat(Ie).reduce(function(Dn, Rn) {
      return Dn.concat(q(Rn) === me ? Jt(k, { placement: Rn, boundary: Ce, rootBoundary: _e, padding: pe, flipVariations: $e, allowedAutoPlacements: he }) : Rn);
    }, []), Lt = k.rects.reference, ze = k.rects.popper, Pt = /* @__PURE__ */ new Map(), bn = !0, En = Ue[0], Tn = 0; Tn < Ue.length; Tn++) {
      var $n = Ue[Tn], _n = q($n), Dt = te($n) === U$1, At = [E$1, R].indexOf(_n) >= 0, vn = At ? "width" : "height", jt = ne(k, { placement: $n, boundary: Ce, rootBoundary: _e, altBoundary: Ne, padding: pe }), Cn = At ? Dt ? W : P$1 : Dt ? R : E$1;
      Lt[vn] > ze[vn] && (Cn = be(Cn));
      var kt = be(Cn), Et = [];
      if (le && Et.push(jt[_n] <= 0), ue && Et.push(jt[Cn] <= 0, jt[kt] <= 0), Et.every(function(Dn) {
        return Dn;
      })) {
        En = $n, bn = !1;
        break;
      }
      Pt.set($n, Et);
    }
    if (bn)
      for (var wn = $e ? 3 : 1, Pn = function(Dn) {
        var Rn = Ue.find(function(Fn) {
          var Nn = Pt.get(Fn);
          if (Nn)
            return Nn.slice(0, Dn).every(function(An) {
              return An;
            });
        });
        if (Rn)
          return En = Rn, "break";
      }, hn = wn; hn > 0; hn--) {
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
  var k = e.state, oe = e.options, re = e.name, ae = oe.mainAxis, le = ae === void 0 ? !0 : ae, ie = oe.altAxis, ue = ie === void 0 ? !1 : ie, de = oe.boundary, pe = oe.rootBoundary, Ce = oe.altBoundary, _e = oe.padding, Ne = oe.tether, Ve = Ne === void 0 ? !0 : Ne, $e = oe.tetherOffset, he = $e === void 0 ? 0 : $e, Oe = ne(k, { boundary: de, rootBoundary: pe, padding: _e, altBoundary: Ce }), xe = q(k.placement), Fe = te(k.placement), Ie = !Fe, Ue = Le(xe), Lt = rn(Ue), ze = k.modifiersData.popperOffsets, Pt = k.rects.reference, bn = k.rects.popper, En = typeof he == "function" ? he(Object.assign({}, k.rects, { placement: k.placement })) : he, Tn = typeof En == "number" ? { mainAxis: En, altAxis: En } : Object.assign({ mainAxis: 0, altAxis: 0 }, En), $n = k.modifiersData.offset ? k.modifiersData.offset[k.placement] : null, _n = { x: 0, y: 0 };
  if (ze) {
    if (le) {
      var Dt, At = Ue === "y" ? E$1 : P$1, vn = Ue === "y" ? R : W, jt = Ue === "y" ? "height" : "width", Cn = ze[Ue], kt = Cn + Oe[At], Et = Cn - Oe[vn], wn = Ve ? -bn[jt] / 2 : 0, Pn = Fe === U$1 ? Pt[jt] : bn[jt], hn = Fe === U$1 ? -bn[jt] : -Pt[jt], On = k.elements.arrow, Dn = Ve && On ? ke(On) : { width: 0, height: 0 }, Rn = k.modifiersData["arrow#persistent"] ? k.modifiersData["arrow#persistent"].padding : st(), Fn = Rn[At], Nn = Rn[vn], An = fe(0, Pt[jt], Dn[jt]), Vn = Ie ? Pt[jt] / 2 - wn - An - Fn - Tn.mainAxis : Pn - An - Fn - Tn.mainAxis, Bn = Ie ? -Pt[jt] / 2 + wn + An + Nn + Tn.mainAxis : hn + An + Nn + Tn.mainAxis, Kn = k.elements.arrow && se(k.elements.arrow), Yn = Kn ? Ue === "y" ? Kn.clientTop || 0 : Kn.clientLeft || 0 : 0, Xn = (Dt = $n == null ? void 0 : $n[Ue]) != null ? Dt : 0, eo = Cn + Vn - Xn - Yn, qn = Cn + Bn - Xn, no = fe(Ve ? ve(kt, eo) : kt, Cn, Ve ? X$1(Et, qn) : Et);
      ze[Ue] = no, _n[Ue] = no - Cn;
    }
    if (ue) {
      var oo, zn = Ue === "x" ? E$1 : P$1, Hn = Ue === "x" ? R : W, Gn = ze[Lt], Zn = Lt === "y" ? "height" : "width", lo = Gn + Oe[zn], ao = Gn - Oe[Hn], xn = [E$1, P$1].indexOf(xe) !== -1, Jn = (oo = $n == null ? void 0 : $n[Lt]) != null ? oo : 0, Qn = xn ? lo : Gn - Pt[Zn] - bn[Zn] - Jn + Tn.altAxis, ro = xn ? Gn + Pt[Zn] + bn[Zn] - Jn - Tn.altAxis : ao, kn = Ve && xn ? St(Qn, Gn, ro) : fe(Ve ? Qn : lo, Gn, Ve ? ro : ao);
      ze[Lt] = kn, _n[Lt] = kn - Gn;
    }
    k.modifiersData[re] = _n;
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
    var pe = { placement: "bottom", orderedModifiers: [], options: Object.assign({}, Ot, le), modifiersData: {}, elements: { reference: ie, popper: ue }, attributes: {}, styles: {} }, Ce = [], _e = !1, Ne = { state: pe, setOptions: function(he) {
      var Oe = typeof he == "function" ? he(pe.options) : he;
      $e(), pe.options = Object.assign({}, le, pe.options, Oe), pe.scrollParents = { reference: Q(ie) ? ce(ie) : ie.contextElement ? ce(ie.contextElement) : [], popper: ce(ue) };
      var xe = un(dn([].concat(re, pe.options.modifiers)));
      return pe.orderedModifiers = xe.filter(function(Fe) {
        return Fe.enabled;
      }), Ve(), Ne.update();
    }, forceUpdate: function() {
      if (!_e) {
        var he = pe.elements, Oe = he.reference, xe = he.popper;
        if ($t(Oe, xe)) {
          pe.rects = { reference: cn(Oe, se(xe), pe.options.strategy === "fixed"), popper: ke(xe) }, pe.reset = !1, pe.placement = pe.options.placement, pe.orderedModifiers.forEach(function(bn) {
            return pe.modifiersData[bn.name] = Object.assign({}, bn.data);
          });
          for (var Fe = 0; Fe < pe.orderedModifiers.length; Fe++) {
            if (pe.reset === !0) {
              pe.reset = !1, Fe = -1;
              continue;
            }
            var Ie = pe.orderedModifiers[Fe], Ue = Ie.fn, Lt = Ie.options, ze = Lt === void 0 ? {} : Lt, Pt = Ie.name;
            typeof Ue == "function" && (pe = Ue({ state: pe, options: ze, name: Pt, instance: Ne }) || pe);
          }
        }
      }
    }, update: ln(function() {
      return new Promise(function(he) {
        Ne.forceUpdate(), he(pe);
      });
    }), destroy: function() {
      $e(), _e = !0;
    } };
    if (!$t(ie, ue))
      return Ne;
    Ne.setOptions(de).then(function(he) {
      !_e && de.onFirstUpdate && de.onFirstUpdate(he);
    });
    function Ve() {
      pe.orderedModifiers.forEach(function(he) {
        var Oe = he.name, xe = he.options, Fe = xe === void 0 ? {} : xe, Ie = he.effect;
        if (typeof Ie == "function") {
          var Ue = Ie({ state: pe, name: Oe, instance: Ne, options: Fe }), Lt = function() {
          };
          Ce.push(Ue || Lt);
        }
      });
    }
    function $e() {
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
}, ON_TRAP_FOCUS_EVT = "focusAfterTrapped", ON_RELEASE_FOCUS_EVT = "focusAfterReleased", FOCUS_TRAP_INJECTION_KEY = Symbol("elFocusTrap"), _sfc_main$Q = defineComponent({
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
      const { key: $e, altKey: he, ctrlKey: Oe, metaKey: xe, currentTarget: Fe, shiftKey: Ie } = Ve, { loop: Ue } = e, Lt = $e === EVENT_CODE.tab && !he && !Oe && !xe, ze = document.activeElement;
      if (Lt && ze) {
        const Pt = Fe, [bn, En] = getEdges(Pt);
        bn && En ? !Ie && ze === En ? (Ve.preventDefault(), Ue && tryFocus(bn, !0), k("focusout-prevented")) : Ie && [bn, Pt].includes(ze) && (Ve.preventDefault(), Ue && tryFocus(En, !0), k("focusout-prevented")) : ze === Pt && (Ve.preventDefault(), k("focusout-prevented"));
      }
    };
    provide(FOCUS_TRAP_INJECTION_KEY, {
      focusTrapRef: oe,
      onKeydown: ie
    }), watch(() => e.focusTrapEl, (Ve) => {
      Ve && (oe.value = Ve);
    }, { immediate: !0 }), watch([oe], ([Ve], [$e]) => {
      Ve && (Ve.addEventListener("keydown", ie), Ve.addEventListener("focusin", pe), Ve.addEventListener("focusout", Ce)), $e && ($e.removeEventListener("keydown", ie), $e.removeEventListener("focusin", pe), $e.removeEventListener("focusout", Ce));
    });
    const ue = (Ve) => {
      k(ON_TRAP_FOCUS_EVT, Ve);
    }, de = (Ve) => k(ON_RELEASE_FOCUS_EVT, Ve), pe = (Ve) => {
      const $e = unref(oe);
      if (!$e)
        return;
      const he = Ve.target, Oe = he && $e.contains(he);
      Oe && k("focusin", Ve), !le.paused && e.trapped && (Oe ? ae = he : tryFocus(ae, !0));
    }, Ce = (Ve) => {
      const $e = unref(oe);
      if (!(le.paused || !$e))
        if (e.trapped) {
          const he = Ve.relatedTarget;
          !isNil(he) && !$e.contains(he) && setTimeout(() => {
            !le.paused && e.trapped && tryFocus(ae, !0);
          }, 0);
        } else {
          const he = Ve.target;
          he && $e.contains(he) || k("focusout", Ve);
        }
    };
    async function _e() {
      await nextTick();
      const Ve = unref(oe);
      if (Ve) {
        focusableStack.push(le);
        const $e = document.activeElement;
        if (re = $e, !Ve.contains($e)) {
          const Oe = new Event(FOCUS_AFTER_TRAPPED, FOCUS_AFTER_TRAPPED_OPTS);
          Ve.addEventListener(FOCUS_AFTER_TRAPPED, ue), Ve.dispatchEvent(Oe), Oe.defaultPrevented || nextTick(() => {
            let xe = e.focusStartEl;
            isString(xe) || (tryFocus(xe), document.activeElement !== xe && (xe = "first")), xe === "first" && focusFirstDescendant(obtainAllFocusableElements(Ve), !0), (document.activeElement === $e || xe === "container") && tryFocus(Ve);
          });
        }
      }
    }
    function Ne() {
      const Ve = unref(oe);
      if (Ve) {
        Ve.removeEventListener(FOCUS_AFTER_TRAPPED, ue);
        const $e = new Event(FOCUS_AFTER_RELEASED, FOCUS_AFTER_TRAPPED_OPTS);
        Ve.addEventListener(FOCUS_AFTER_RELEASED, de), Ve.dispatchEvent($e), $e.defaultPrevented || tryFocus(re != null ? re : document.body, !0), Ve.removeEventListener(FOCUS_AFTER_RELEASED, ue), focusableStack.remove(le);
      }
    }
    return onMounted(() => {
      e.trapped && _e(), watch(() => e.trapped, (Ve) => {
        Ve ? _e() : Ne();
      });
    }), onBeforeUnmount(() => {
      e.trapped && Ne();
    }), {
      onKeydown: ie
    };
  }
});
function _sfc_render$g(e, k, oe, re, ae, le) {
  return renderSlot(e.$slots, "default", { handleKeydown: e.onKeydown });
}
var ElFocusTrap = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["render", _sfc_render$g], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/focus-trap/src/focus-trap.vue"]]);
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
}, _sfc_main$P = /* @__PURE__ */ defineComponent({
  ...__default__$n,
  props: usePopperContentProps,
  emits: usePopperContentEmits,
  setup(e, { expose: k, emit: oe }) {
    const re = e, { popperInstanceRef: ae, contentRef: le, triggerRef: ie, role: ue } = inject(POPPER_INJECTION_KEY, void 0), de = inject(formItemContextKey, void 0), { nextZIndex: pe } = useZIndex(), Ce = useNamespace("popper"), _e = ref(), Ne = ref("first"), Ve = ref(), $e = ref();
    provide(POPPER_CONTENT_INJECTION_KEY, {
      arrowRef: Ve,
      arrowOffset: $e
    }), de && (de.addInputId || de.removeInputId) && provide(formItemContextKey, {
      ...de,
      addInputId: NOOP,
      removeInputId: NOOP
    });
    const he = ref(re.zIndex || pe()), Oe = ref(!1);
    let xe;
    const Fe = computed(() => unwrapMeasurableEl(re.referenceEl) || unref(ie)), Ie = computed(() => [{ zIndex: unref(he) }, re.popperStyle]), Ue = computed(() => [
      Ce.b(),
      Ce.is("pure", re.pure),
      Ce.is(re.effect),
      re.popperClass
    ]), Lt = computed(() => ue && ue.value === "dialog" ? "false" : void 0), ze = ({ referenceEl: At, popperContentEl: vn, arrowEl: jt }) => {
      const Cn = buildPopperOptions(re, {
        arrowEl: jt,
        arrowOffset: unref($e)
      });
      return yn(At, vn, Cn);
    }, Pt = (At = !0) => {
      var vn;
      (vn = unref(ae)) == null || vn.update(), At && (he.value = re.zIndex || pe());
    }, bn = () => {
      var At, vn;
      const jt = { name: "eventListeners", enabled: re.visible };
      (vn = (At = unref(ae)) == null ? void 0 : At.setOptions) == null || vn.call(At, (Cn) => ({
        ...Cn,
        modifiers: [...Cn.modifiers || [], jt]
      })), Pt(!1), re.visible && re.focusOnShow ? Oe.value = !0 : re.visible === !1 && (Oe.value = !1);
    }, En = () => {
      oe("focus");
    }, Tn = () => {
      Ne.value = "first", oe("blur");
    }, $n = (At) => {
      var vn;
      re.visible && !Oe.value && (At.target && (Ne.value = At.target), Oe.value = !0, At.relatedTarget && ((vn = At.relatedTarget) == null || vn.focus()));
    }, _n = () => {
      re.trapping || (Oe.value = !1);
    }, Dt = () => {
      Oe.value = !1, oe("close");
    };
    return onMounted(() => {
      let At;
      watch(Fe, (vn) => {
        var jt;
        At == null || At();
        const Cn = unref(ae);
        if ((jt = Cn == null ? void 0 : Cn.destroy) == null || jt.call(Cn), vn) {
          const kt = unref(_e);
          le.value = kt, ae.value = ze({
            referenceEl: vn,
            popperContentEl: kt,
            arrowEl: unref(Ve)
          }), At = watch(() => vn.getBoundingClientRect(), () => Pt(), {
            immediate: !0
          });
        } else
          ae.value = void 0;
      }, {
        immediate: !0
      }), watch(() => re.triggerTargetEl, (vn, jt) => {
        xe == null || xe(), xe = void 0;
        const Cn = unref(vn || _e.value), kt = unref(jt || _e.value);
        if (isElement(Cn)) {
          const { ariaLabel: Et, id: wn } = toRefs(re);
          xe = watch([ue, Et, Lt, wn], (Pn) => {
            ["role", "aria-label", "aria-modal", "id"].forEach((hn, On) => {
              isNil(Pn[On]) ? Cn.removeAttribute(hn) : Cn.setAttribute(hn, Pn[On]);
            });
          }, { immediate: !0 });
        }
        isElement(kt) && ["role", "aria-label", "aria-modal", "id"].forEach((Et) => {
          kt.removeAttribute(Et);
        });
      }, { immediate: !0 }), watch(() => re.visible, bn, { immediate: !0 }), watch(() => buildPopperOptions(re, {
        arrowEl: unref(Ve),
        arrowOffset: unref($e)
      }), (vn) => {
        var jt;
        return (jt = ae.value) == null ? void 0 : jt.setOptions(vn);
      });
    }), onBeforeUnmount(() => {
      xe == null || xe(), xe = void 0;
    }), k({
      popperContentRef: _e,
      popperInstanceRef: ae,
      updatePopper: Pt,
      contentStyle: Ie
    }), (At, vn) => (openBlock(), createElementBlock("div", {
      ref_key: "popperContentRef",
      ref: _e,
      style: normalizeStyle(unref(Ie)),
      class: normalizeClass(unref(Ue)),
      tabindex: "-1",
      onMouseenter: vn[0] || (vn[0] = (jt) => At.$emit("mouseenter", jt)),
      onMouseleave: vn[1] || (vn[1] = (jt) => At.$emit("mouseleave", jt))
    }, [
      createVNode(unref(ElFocusTrap), {
        trapped: Oe.value,
        "trap-on-focus-in": !0,
        "focus-trap-el": _e.value,
        "focus-start-el": Ne.value,
        onFocusAfterTrapped: En,
        onFocusAfterReleased: Tn,
        onFocusin: $n,
        onFocusoutPrevented: _n,
        onReleaseRequested: Dt
      }, {
        default: withCtx(() => [
          renderSlot(At.$slots, "default")
        ]),
        _: 3
      }, 8, ["trapped", "focus-trap-el", "focus-start-el"])
    ], 38));
  }
});
var ElPopperContent = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/content.vue"]]);
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
}), TOOLTIP_INJECTION_KEY = Symbol("elTooltip"), _sfc_main$O = defineComponent({
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
      onShow: Ne,
      onHide: Ve,
      onBeforeShow: $e,
      onBeforeHide: he
    } = inject(TOOLTIP_INJECTION_KEY, void 0), Oe = computed(() => process.env.NODE_ENV === "test" ? !0 : e.persistent);
    onBeforeUnmount(() => {
      le.value = !0;
    });
    const xe = computed(() => unref(Oe) ? !0 : unref(de)), Fe = computed(() => e.disabled ? !1 : unref(de)), Ie = computed(() => {
      var At;
      return (At = e.style) != null ? At : {};
    }), Ue = computed(() => !unref(de)), Lt = () => {
      Ve();
    }, ze = () => {
      if (unref(ie))
        return !0;
    }, Pt = composeEventHandlers(ze, () => {
      e.enterable && unref(pe) === "hover" && _e();
    }), bn = composeEventHandlers(ze, () => {
      unref(pe) === "hover" && Ce();
    }), En = () => {
      var At, vn;
      (vn = (At = k.value) == null ? void 0 : At.updatePopper) == null || vn.call(At), $e == null || $e();
    }, Tn = () => {
      he == null || he();
    }, $n = () => {
      Ne(), Dt = onClickOutside(computed(() => {
        var At;
        return (At = k.value) == null ? void 0 : At.popperContentRef;
      }), () => {
        if (unref(ie))
          return;
        unref(pe) !== "hover" && Ce();
      });
    }, _n = () => {
      e.virtualTriggering || Ce();
    };
    let Dt;
    return watch(() => unref(de), (At) => {
      At || Dt == null || Dt();
    }, {
      flush: "post"
    }), {
      ariaHidden: Ue,
      entering: re,
      leaving: ae,
      id: ue,
      intermediateOpen: oe,
      contentStyle: Ie,
      contentRef: k,
      destroyed: le,
      shouldRender: xe,
      shouldShow: Fe,
      onClose: Ce,
      open: de,
      onAfterShow: $n,
      onBeforeEnter: En,
      onBeforeLeave: Tn,
      onContentEnter: Pt,
      onContentLeave: bn,
      onTransitionLeave: Lt,
      onBlur: _n
    };
  }
});
function _sfc_render$f(e, k, oe, re, ae, le) {
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
var ElTooltipContent = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["render", _sfc_render$f], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/content.vue"]]);
const isTriggerType = (e, k) => isArray(e) ? e.includes(k) : e === k, whenTrigger = (e, k, oe) => (re) => {
  isTriggerType(unref(e), k) && oe(re);
}, _sfc_main$N = defineComponent({
  name: "ElTooltipTrigger",
  components: {
    ElPopperTrigger
  },
  props: useTooltipTriggerProps,
  setup(e) {
    const k = useNamespace("tooltip"), { controlled: oe, id: re, open: ae, onOpen: le, onClose: ie, onToggle: ue } = inject(TOOLTIP_INJECTION_KEY, void 0), de = ref(null), pe = () => {
      if (unref(oe) || e.disabled)
        return !0;
    }, Ce = toRef(e, "trigger"), _e = composeEventHandlers(pe, whenTrigger(Ce, "hover", le)), Ne = composeEventHandlers(pe, whenTrigger(Ce, "hover", ie)), Ve = composeEventHandlers(pe, whenTrigger(Ce, "click", (Fe) => {
      Fe.button === 0 && ue(Fe);
    })), $e = composeEventHandlers(pe, whenTrigger(Ce, "focus", le)), he = composeEventHandlers(pe, whenTrigger(Ce, "focus", ie)), Oe = composeEventHandlers(pe, whenTrigger(Ce, "contextmenu", (Fe) => {
      Fe.preventDefault(), ue(Fe);
    })), xe = composeEventHandlers(pe, (Fe) => {
      const { code: Ie } = Fe;
      e.triggerKeys.includes(Ie) && (Fe.preventDefault(), ue(Fe));
    });
    return {
      onBlur: he,
      onContextMenu: Oe,
      onFocus: $e,
      onMouseenter: _e,
      onMouseleave: Ne,
      onClick: Ve,
      onKeydown: xe,
      open: ae,
      id: re,
      triggerRef: de,
      ns: k
    };
  }
});
function _sfc_render$e(e, k, oe, re, ae, le) {
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
var ElTooltipTrigger = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["render", _sfc_render$e], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/trigger.vue"]]);
const { useModelToggleProps, useModelToggle, useModelToggleEmits } = createModelToggleComposable("visible"), _sfc_main$M = defineComponent({
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
      var xe;
      const Fe = unref(le);
      Fe && ((xe = Fe.popperInstanceRef) == null || xe.update());
    }, de = ref(!1), pe = ref(void 0), { show: Ce, hide: _e, hasUpdateHandler: Ne } = useModelToggle({
      indicator: de,
      toggleReason: pe
    }), { onOpen: Ve, onClose: $e } = useDelayedToggle({
      showAfter: oe,
      hideAfter: toRef(e, "hideAfter"),
      open: Ce,
      close: _e
    }), he = computed(() => isBoolean(e.visible) && !Ne.value);
    provide(TOOLTIP_INJECTION_KEY, {
      controlled: he,
      id: ae,
      open: readonly(de),
      trigger: toRef(e, "trigger"),
      onOpen: (xe) => {
        Ve(xe);
      },
      onClose: (xe) => {
        $e(xe);
      },
      onToggle: (xe) => {
        unref(de) ? $e(xe) : Ve(xe);
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
    }), watch(() => e.disabled, (xe) => {
      xe && de.value && (de.value = !1);
    });
    const Oe = () => {
      var xe, Fe;
      const Ie = (Fe = (xe = ie.value) == null ? void 0 : xe.contentRef) == null ? void 0 : Fe.popperContentRef;
      return Ie && Ie.contains(document.activeElement);
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
      onClose: $e
    };
  }
}), _hoisted_1$t = ["innerHTML"], _hoisted_2$k = { key: 1 };
function _sfc_render$d(e, k, oe, re, ae, le) {
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
            }, null, 8, _hoisted_1$t)) : (openBlock(), createElementBlock("span", _hoisted_2$k, toDisplayString(e.content), 1))
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
var Tooltip = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["render", _sfc_render$d], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/tooltip.vue"]]);
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
}, _hoisted_1$s = ["aria-expanded", "aria-owns"], _hoisted_2$j = { key: 0 }, _hoisted_3$b = ["id", "aria-selected", "onClick"], __default__$m = {
  name: "ElAutocomplete",
  inheritAttrs: !1
}, _sfc_main$L = /* @__PURE__ */ defineComponent({
  ...__default__$m,
  props: autocompleteProps,
  emits: autocompleteEmits,
  setup(e, { expose: k, emit: oe }) {
    const re = e, ae = "ElAutocomplete", le = useAttrs(), ie = useAttrs$1(), ue = useDisabled$1(), de = useNamespace("autocomplete"), pe = ref(), Ce = ref(), _e = ref(), Ne = ref();
    let Ve = !1;
    const $e = ref([]), he = ref(-1), Oe = ref(""), xe = ref(!1), Fe = ref(!1), Ie = ref(!1), Ue = computed(() => de.b(String(generateId()))), Lt = computed(() => ie.style), ze = computed(() => ($e.value.length > 0 || Ie.value) && xe.value), Pt = computed(() => !re.hideLoading && Ie.value), bn = computed(() => pe.value ? Array.from(pe.value.$el.querySelectorAll("input")) : []), En = async () => {
      await nextTick(), ze.value && (Oe.value = `${pe.value.$el.offsetWidth}px`);
    }, Tn = () => {
      Ve = !0;
    }, $n = () => {
      Ve = !1, he.value = -1;
    }, Dt = debounce(async (Nn) => {
      if (Fe.value)
        return;
      const An = (Vn) => {
        Ie.value = !1, !Fe.value && (isArray(Vn) ? ($e.value = Vn, he.value = re.highlightFirstItem ? 0 : -1) : throwError(ae, "autocomplete suggestions must be an array"));
      };
      if (Ie.value = !0, isArray(re.fetchSuggestions))
        An(re.fetchSuggestions);
      else {
        const Vn = await re.fetchSuggestions(Nn, An);
        isArray(Vn) && An(Vn);
      }
    }, re.debounce), At = (Nn) => {
      const An = !!Nn;
      if (oe(INPUT_EVENT, Nn), oe(UPDATE_MODEL_EVENT, Nn), Fe.value = !1, xe.value || (xe.value = An), !re.triggerOnFocus && !Nn) {
        Fe.value = !0, $e.value = [];
        return;
      }
      Dt(Nn);
    }, vn = (Nn) => {
      var An;
      ue.value || (((An = Nn.target) == null ? void 0 : An.tagName) !== "INPUT" || bn.value.includes(document.activeElement)) && (xe.value = !0);
    }, jt = (Nn) => {
      oe(CHANGE_EVENT, Nn);
    }, Cn = (Nn) => {
      Ve || (xe.value = !0, oe("focus", Nn), re.triggerOnFocus && Dt(String(re.modelValue)));
    }, kt = (Nn) => {
      Ve || oe("blur", Nn);
    }, Et = () => {
      xe.value = !1, oe(UPDATE_MODEL_EVENT, ""), oe("clear");
    }, wn = async () => {
      ze.value && he.value >= 0 && he.value < $e.value.length ? Rn($e.value[he.value]) : re.selectWhenUnmatched && (oe("select", { value: re.modelValue }), $e.value = [], he.value = -1);
    }, Pn = (Nn) => {
      ze.value && (Nn.preventDefault(), Nn.stopPropagation(), hn());
    }, hn = () => {
      xe.value = !1;
    }, On = () => {
      var Nn;
      (Nn = pe.value) == null || Nn.focus();
    }, Dn = () => {
      var Nn;
      (Nn = pe.value) == null || Nn.blur();
    }, Rn = async (Nn) => {
      oe(INPUT_EVENT, Nn[re.valueKey]), oe(UPDATE_MODEL_EVENT, Nn[re.valueKey]), oe("select", Nn), $e.value = [], he.value = -1;
    }, Fn = (Nn) => {
      if (!ze.value || Ie.value)
        return;
      if (Nn < 0) {
        he.value = -1;
        return;
      }
      Nn >= $e.value.length && (Nn = $e.value.length - 1);
      const An = Ce.value.querySelector(`.${de.be("suggestion", "wrap")}`), Bn = An.querySelectorAll(`.${de.be("suggestion", "list")} li`)[Nn], Kn = An.scrollTop, { offsetTop: Yn, scrollHeight: Xn } = Bn;
      Yn + Xn > Kn + An.clientHeight && (An.scrollTop += Xn), Yn < Kn && (An.scrollTop -= Xn), he.value = Nn, pe.value.ref.setAttribute("aria-activedescendant", `${Ue.value}-item-${he.value}`);
    };
    return onClickOutside(Ne, () => {
      ze.value && hn();
    }), onMounted(() => {
      pe.value.ref.setAttribute("role", "textbox"), pe.value.ref.setAttribute("aria-autocomplete", "list"), pe.value.ref.setAttribute("aria-controls", "id"), pe.value.ref.setAttribute("aria-activedescendant", `${Ue.value}-item-${he.value}`);
    }), k({
      highlightedIndex: he,
      activated: xe,
      loading: Ie,
      inputRef: pe,
      popperRef: _e,
      suggestions: $e,
      handleSelect: Rn,
      handleKeyEnter: wn,
      focus: On,
      blur: Dn,
      close: hn,
      highlight: Fn
    }), (Nn, An) => (openBlock(), createBlock(unref(ElTooltip), {
      ref_key: "popperRef",
      ref: _e,
      visible: unref(ze),
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
      onShow: Tn,
      onHide: $n
    }, {
      content: withCtx(() => [
        createElementVNode("div", {
          ref_key: "regionRef",
          ref: Ce,
          class: normalizeClass([unref(de).b("suggestion"), unref(de).is("loading", unref(Pt))]),
          style: normalizeStyle({
            [Nn.fitInputWidth ? "width" : "minWidth"]: Oe.value,
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
              ])) : (openBlock(!0), createElementBlock(Fragment, { key: 1 }, renderList($e.value, (Vn, Bn) => (openBlock(), createElementBlock("li", {
                id: `${unref(Ue)}-item-${Bn}`,
                key: Bn,
                class: normalizeClass({ highlighted: he.value === Bn }),
                role: "option",
                "aria-selected": he.value === Bn,
                onClick: (Kn) => Rn(Vn)
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
          style: normalizeStyle(unref(Lt)),
          role: "combobox",
          "aria-haspopup": "listbox",
          "aria-expanded": unref(ze),
          "aria-owns": unref(Ue)
        }, [
          createVNode(unref(ElInput), mergeProps({
            ref_key: "inputRef",
            ref: pe
          }, unref(le), {
            "model-value": Nn.modelValue,
            onInput: At,
            onChange: jt,
            onFocus: Cn,
            onBlur: kt,
            onClear: Et,
            onKeydown: [
              An[0] || (An[0] = withKeys(withModifiers((Vn) => Fn(he.value - 1), ["prevent"]), ["up"])),
              An[1] || (An[1] = withKeys(withModifiers((Vn) => Fn(he.value + 1), ["prevent"]), ["down"])),
              withKeys(wn, ["enter"]),
              withKeys(hn, ["tab"]),
              withKeys(Pn, ["esc"])
            ],
            onMousedown: vn
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
        ], 14, _hoisted_1$s)
      ]),
      _: 3
    }, 8, ["visible", "placement", "popper-class", "teleported", "transition"]));
  }
});
var Autocomplete = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/autocomplete/src/autocomplete.vue"]]);
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
const _hoisted_1$r = ["aria-disabled", "disabled", "autofocus", "type"], __default__$l = {
  name: "ElButton"
}, _sfc_main$K = /* @__PURE__ */ defineComponent({
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
    const le = inject(buttonGroupContextKey, void 0), ie = useGlobalConfig("button"), ue = useNamespace("button"), { form: de } = useFormItem(), pe = useSize(computed(() => le == null ? void 0 : le.size)), Ce = useDisabled$1(), _e = ref(), Ne = computed(() => re.type || (le == null ? void 0 : le.type) || ""), Ve = computed(() => {
      var xe, Fe, Ie;
      return (Ie = (Fe = re.autoInsertSpace) != null ? Fe : (xe = ie.value) == null ? void 0 : xe.autoInsertSpace) != null ? Ie : !1;
    }), $e = computed(() => {
      var xe;
      const Fe = (xe = ae.default) == null ? void 0 : xe.call(ae);
      if (Ve.value && (Fe == null ? void 0 : Fe.length) === 1) {
        const Ie = Fe[0];
        if ((Ie == null ? void 0 : Ie.type) === Text) {
          const Ue = Ie.children;
          return /^\p{Unified_Ideograph}{2}$/u.test(Ue.trim());
        }
      }
      return !1;
    }), he = useButtonCustomStyle(re), Oe = (xe) => {
      re.nativeType === "reset" && (de == null || de.resetFields()), oe("click", xe);
    };
    return k({
      ref: _e,
      size: pe,
      type: Ne,
      disabled: Ce,
      shouldAddSpace: $e
    }), (xe, Fe) => (openBlock(), createElementBlock("button", {
      ref_key: "_ref",
      ref: _e,
      class: normalizeClass([
        unref(ue).b(),
        unref(ue).m(unref(Ne)),
        unref(ue).m(unref(pe)),
        unref(ue).is("disabled", unref(Ce)),
        unref(ue).is("loading", xe.loading),
        unref(ue).is("plain", xe.plain),
        unref(ue).is("round", xe.round),
        unref(ue).is("circle", xe.circle),
        unref(ue).is("text", xe.text),
        unref(ue).is("link", xe.link),
        unref(ue).is("has-bg", xe.bg)
      ]),
      "aria-disabled": unref(Ce) || xe.loading,
      disabled: unref(Ce) || xe.loading,
      autofocus: xe.autofocus,
      type: xe.nativeType,
      style: normalizeStyle(unref(he)),
      onClick: Oe
    }, [
      xe.loading ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        xe.$slots.loading ? renderSlot(xe.$slots, "loading", { key: 0 }) : (openBlock(), createBlock(unref(ElIcon), {
          key: 1,
          class: normalizeClass(unref(ue).is("loading"))
        }, {
          default: withCtx(() => [
            (openBlock(), createBlock(resolveDynamicComponent(xe.loadingIcon)))
          ]),
          _: 1
        }, 8, ["class"]))
      ], 64)) : xe.icon || xe.$slots.icon ? (openBlock(), createBlock(unref(ElIcon), { key: 1 }, {
        default: withCtx(() => [
          xe.icon ? (openBlock(), createBlock(resolveDynamicComponent(xe.icon), { key: 0 })) : renderSlot(xe.$slots, "icon", { key: 1 })
        ]),
        _: 3
      })) : createCommentVNode("v-if", !0),
      xe.$slots.default ? (openBlock(), createElementBlock("span", {
        key: 2,
        class: normalizeClass({ [unref(ue).em("text", "expand")]: unref($e) })
      }, [
        renderSlot(xe.$slots, "default")
      ], 2)) : createCommentVNode("v-if", !0)
    ], 14, _hoisted_1$r));
  }
});
var Button = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/button/src/button.vue"]]);
const buttonGroupProps = {
  size: buttonProps.size,
  type: buttonProps.type
}, __default__$k = {
  name: "ElButtonGroup"
}, _sfc_main$J = /* @__PURE__ */ defineComponent({
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
var ButtonGroup = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/button/src/button-group.vue"]]);
const ElButton = withInstall(Button, {
  ButtonGroup
});
withNoopInstall(ButtonGroup);
var commonjsGlobal = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, dayjs_min = { exports: {} };
(function(e, k) {
  (function(oe, re) {
    e.exports = re();
  })(commonjsGlobal, function() {
    var oe = 1e3, re = 6e4, ae = 36e5, le = "millisecond", ie = "second", ue = "minute", de = "hour", pe = "day", Ce = "week", _e = "month", Ne = "quarter", Ve = "year", $e = "date", he = "Invalid Date", Oe = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, xe = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, Fe = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_") }, Ie = function(Dt, At, vn) {
      var jt = String(Dt);
      return !jt || jt.length >= At ? Dt : "" + Array(At + 1 - jt.length).join(vn) + Dt;
    }, Ue = { s: Ie, z: function(Dt) {
      var At = -Dt.utcOffset(), vn = Math.abs(At), jt = Math.floor(vn / 60), Cn = vn % 60;
      return (At <= 0 ? "+" : "-") + Ie(jt, 2, "0") + ":" + Ie(Cn, 2, "0");
    }, m: function Dt(At, vn) {
      if (At.date() < vn.date())
        return -Dt(vn, At);
      var jt = 12 * (vn.year() - At.year()) + (vn.month() - At.month()), Cn = At.clone().add(jt, _e), kt = vn - Cn < 0, Et = At.clone().add(jt + (kt ? -1 : 1), _e);
      return +(-(jt + (vn - Cn) / (kt ? Cn - Et : Et - Cn)) || 0);
    }, a: function(Dt) {
      return Dt < 0 ? Math.ceil(Dt) || 0 : Math.floor(Dt);
    }, p: function(Dt) {
      return { M: _e, y: Ve, w: Ce, d: pe, D: $e, h: de, m: ue, s: ie, ms: le, Q: Ne }[Dt] || String(Dt || "").toLowerCase().replace(/s$/, "");
    }, u: function(Dt) {
      return Dt === void 0;
    } }, Lt = "en", ze = {};
    ze[Lt] = Fe;
    var Pt = function(Dt) {
      return Dt instanceof $n;
    }, bn = function Dt(At, vn, jt) {
      var Cn;
      if (!At)
        return Lt;
      if (typeof At == "string") {
        var kt = At.toLowerCase();
        ze[kt] && (Cn = kt), vn && (ze[kt] = vn, Cn = kt);
        var Et = At.split("-");
        if (!Cn && Et.length > 1)
          return Dt(Et[0]);
      } else {
        var wn = At.name;
        ze[wn] = At, Cn = wn;
      }
      return !jt && Cn && (Lt = Cn), Cn || !jt && Lt;
    }, En = function(Dt, At) {
      if (Pt(Dt))
        return Dt.clone();
      var vn = typeof At == "object" ? At : {};
      return vn.date = Dt, vn.args = arguments, new $n(vn);
    }, Tn = Ue;
    Tn.l = bn, Tn.i = Pt, Tn.w = function(Dt, At) {
      return En(Dt, { locale: At.$L, utc: At.$u, x: At.$x, $offset: At.$offset });
    };
    var $n = function() {
      function Dt(vn) {
        this.$L = bn(vn.locale, null, !0), this.parse(vn);
      }
      var At = Dt.prototype;
      return At.parse = function(vn) {
        this.$d = function(jt) {
          var Cn = jt.date, kt = jt.utc;
          if (Cn === null)
            return new Date(NaN);
          if (Tn.u(Cn))
            return new Date();
          if (Cn instanceof Date)
            return new Date(Cn);
          if (typeof Cn == "string" && !/Z$/i.test(Cn)) {
            var Et = Cn.match(Oe);
            if (Et) {
              var wn = Et[2] - 1 || 0, Pn = (Et[7] || "0").substring(0, 3);
              return kt ? new Date(Date.UTC(Et[1], wn, Et[3] || 1, Et[4] || 0, Et[5] || 0, Et[6] || 0, Pn)) : new Date(Et[1], wn, Et[3] || 1, Et[4] || 0, Et[5] || 0, Et[6] || 0, Pn);
            }
          }
          return new Date(Cn);
        }(vn), this.$x = vn.x || {}, this.init();
      }, At.init = function() {
        var vn = this.$d;
        this.$y = vn.getFullYear(), this.$M = vn.getMonth(), this.$D = vn.getDate(), this.$W = vn.getDay(), this.$H = vn.getHours(), this.$m = vn.getMinutes(), this.$s = vn.getSeconds(), this.$ms = vn.getMilliseconds();
      }, At.$utils = function() {
        return Tn;
      }, At.isValid = function() {
        return this.$d.toString() !== he;
      }, At.isSame = function(vn, jt) {
        var Cn = En(vn);
        return this.startOf(jt) <= Cn && Cn <= this.endOf(jt);
      }, At.isAfter = function(vn, jt) {
        return En(vn) < this.startOf(jt);
      }, At.isBefore = function(vn, jt) {
        return this.endOf(jt) < En(vn);
      }, At.$g = function(vn, jt, Cn) {
        return Tn.u(vn) ? this[jt] : this.set(Cn, vn);
      }, At.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, At.valueOf = function() {
        return this.$d.getTime();
      }, At.startOf = function(vn, jt) {
        var Cn = this, kt = !!Tn.u(jt) || jt, Et = Tn.p(vn), wn = function(An, Vn) {
          var Bn = Tn.w(Cn.$u ? Date.UTC(Cn.$y, Vn, An) : new Date(Cn.$y, Vn, An), Cn);
          return kt ? Bn : Bn.endOf(pe);
        }, Pn = function(An, Vn) {
          return Tn.w(Cn.toDate()[An].apply(Cn.toDate("s"), (kt ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(Vn)), Cn);
        }, hn = this.$W, On = this.$M, Dn = this.$D, Rn = "set" + (this.$u ? "UTC" : "");
        switch (Et) {
          case Ve:
            return kt ? wn(1, 0) : wn(31, 11);
          case _e:
            return kt ? wn(1, On) : wn(0, On + 1);
          case Ce:
            var Fn = this.$locale().weekStart || 0, Nn = (hn < Fn ? hn + 7 : hn) - Fn;
            return wn(kt ? Dn - Nn : Dn + (6 - Nn), On);
          case pe:
          case $e:
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
      }, At.endOf = function(vn) {
        return this.startOf(vn, !1);
      }, At.$set = function(vn, jt) {
        var Cn, kt = Tn.p(vn), Et = "set" + (this.$u ? "UTC" : ""), wn = (Cn = {}, Cn[pe] = Et + "Date", Cn[$e] = Et + "Date", Cn[_e] = Et + "Month", Cn[Ve] = Et + "FullYear", Cn[de] = Et + "Hours", Cn[ue] = Et + "Minutes", Cn[ie] = Et + "Seconds", Cn[le] = Et + "Milliseconds", Cn)[kt], Pn = kt === pe ? this.$D + (jt - this.$W) : jt;
        if (kt === _e || kt === Ve) {
          var hn = this.clone().set($e, 1);
          hn.$d[wn](Pn), hn.init(), this.$d = hn.set($e, Math.min(this.$D, hn.daysInMonth())).$d;
        } else
          wn && this.$d[wn](Pn);
        return this.init(), this;
      }, At.set = function(vn, jt) {
        return this.clone().$set(vn, jt);
      }, At.get = function(vn) {
        return this[Tn.p(vn)]();
      }, At.add = function(vn, jt) {
        var Cn, kt = this;
        vn = Number(vn);
        var Et = Tn.p(jt), wn = function(On) {
          var Dn = En(kt);
          return Tn.w(Dn.date(Dn.date() + Math.round(On * vn)), kt);
        };
        if (Et === _e)
          return this.set(_e, this.$M + vn);
        if (Et === Ve)
          return this.set(Ve, this.$y + vn);
        if (Et === pe)
          return wn(1);
        if (Et === Ce)
          return wn(7);
        var Pn = (Cn = {}, Cn[ue] = re, Cn[de] = ae, Cn[ie] = oe, Cn)[Et] || 1, hn = this.$d.getTime() + vn * Pn;
        return Tn.w(hn, this);
      }, At.subtract = function(vn, jt) {
        return this.add(-1 * vn, jt);
      }, At.format = function(vn) {
        var jt = this, Cn = this.$locale();
        if (!this.isValid())
          return Cn.invalidDate || he;
        var kt = vn || "YYYY-MM-DDTHH:mm:ssZ", Et = Tn.z(this), wn = this.$H, Pn = this.$m, hn = this.$M, On = Cn.weekdays, Dn = Cn.months, Rn = function(Vn, Bn, Kn, Yn) {
          return Vn && (Vn[Bn] || Vn(jt, kt)) || Kn[Bn].slice(0, Yn);
        }, Fn = function(Vn) {
          return Tn.s(wn % 12 || 12, Vn, "0");
        }, Nn = Cn.meridiem || function(Vn, Bn, Kn) {
          var Yn = Vn < 12 ? "AM" : "PM";
          return Kn ? Yn.toLowerCase() : Yn;
        }, An = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: hn + 1, MM: Tn.s(hn + 1, 2, "0"), MMM: Rn(Cn.monthsShort, hn, Dn, 3), MMMM: Rn(Dn, hn), D: this.$D, DD: Tn.s(this.$D, 2, "0"), d: String(this.$W), dd: Rn(Cn.weekdaysMin, this.$W, On, 2), ddd: Rn(Cn.weekdaysShort, this.$W, On, 3), dddd: On[this.$W], H: String(wn), HH: Tn.s(wn, 2, "0"), h: Fn(1), hh: Fn(2), a: Nn(wn, Pn, !0), A: Nn(wn, Pn, !1), m: String(Pn), mm: Tn.s(Pn, 2, "0"), s: String(this.$s), ss: Tn.s(this.$s, 2, "0"), SSS: Tn.s(this.$ms, 3, "0"), Z: Et };
        return kt.replace(xe, function(Vn, Bn) {
          return Bn || An[Vn] || Et.replace(":", "");
        });
      }, At.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, At.diff = function(vn, jt, Cn) {
        var kt, Et = Tn.p(jt), wn = En(vn), Pn = (wn.utcOffset() - this.utcOffset()) * re, hn = this - wn, On = Tn.m(this, wn);
        return On = (kt = {}, kt[Ve] = On / 12, kt[_e] = On, kt[Ne] = On / 3, kt[Ce] = (hn - Pn) / 6048e5, kt[pe] = (hn - Pn) / 864e5, kt[de] = hn / ae, kt[ue] = hn / re, kt[ie] = hn / oe, kt)[Et] || hn, Cn ? On : Tn.a(On);
      }, At.daysInMonth = function() {
        return this.endOf(_e).$D;
      }, At.$locale = function() {
        return ze[this.$L];
      }, At.locale = function(vn, jt) {
        if (!vn)
          return this.$L;
        var Cn = this.clone(), kt = bn(vn, jt, !0);
        return kt && (Cn.$L = kt), Cn;
      }, At.clone = function() {
        return Tn.w(this.$d, this);
      }, At.toDate = function() {
        return new Date(this.valueOf());
      }, At.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, At.toISOString = function() {
        return this.$d.toISOString();
      }, At.toString = function() {
        return this.$d.toUTCString();
      }, Dt;
    }(), _n = $n.prototype;
    return En.prototype = _n, [["$ms", le], ["$s", ie], ["$m", ue], ["$H", de], ["$W", pe], ["$M", _e], ["$y", Ve], ["$D", $e]].forEach(function(Dt) {
      _n[Dt[1]] = function(At) {
        return this.$g(At, Dt[0], Dt[1]);
      };
    }), En.extend = function(Dt, At) {
      return Dt.$i || (Dt(At, $n, En), Dt.$i = !0), En;
    }, En.locale = bn, En.isDayjs = Pt, En.unix = function(Dt) {
      return En(1e3 * Dt);
    }, En.en = ze[Lt], En.Ls = ze, En.p = {}, En;
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
      }, ue = function(_e, Ne, Ve, $e, he) {
        var Oe = _e.name ? _e : _e.$locale(), xe = ie(Oe[Ne]), Fe = ie(Oe[Ve]), Ie = xe || Fe.map(function(Lt) {
          return Lt.slice(0, $e);
        });
        if (!he)
          return Ie;
        var Ue = Oe.weekStart;
        return Ie.map(function(Lt, ze) {
          return Ie[(ze + (Ue || 0)) % 7];
        });
      }, de = function() {
        return ae.Ls[ae.locale()];
      }, pe = function(_e, Ne) {
        return _e.formats[Ne] || function(Ve) {
          return Ve.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function($e, he, Oe) {
            return he || Oe.slice(1);
          });
        }(_e.formats[Ne.toUpperCase()]);
      }, Ce = function() {
        var _e = this;
        return { months: function(Ne) {
          return Ne ? Ne.format("MMMM") : ue(_e, "months");
        }, monthsShort: function(Ne) {
          return Ne ? Ne.format("MMM") : ue(_e, "monthsShort", "months", 3);
        }, firstDayOfWeek: function() {
          return _e.$locale().weekStart || 0;
        }, weekdays: function(Ne) {
          return Ne ? Ne.format("dddd") : ue(_e, "weekdays");
        }, weekdaysMin: function(Ne) {
          return Ne ? Ne.format("dd") : ue(_e, "weekdaysMin", "weekdays", 2);
        }, weekdaysShort: function(Ne) {
          return Ne ? Ne.format("ddd") : ue(_e, "weekdaysShort", "weekdays", 3);
        }, longDateFormat: function(Ne) {
          return pe(_e.$locale(), Ne);
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
        }, longDateFormat: function(Ne) {
          return pe(_e, Ne);
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
        var xe = Oe.match(/([+-]|\d\d)/g), Fe = 60 * xe[1] + (+xe[2] || 0);
        return Fe === 0 ? 0 : xe[0] === "+" ? -Fe : Fe;
      }(he);
    }], _e = function(he) {
      var Oe = ue[he];
      return Oe && (Oe.indexOf ? Oe : Oe.s.concat(Oe.f));
    }, Ne = function(he, Oe) {
      var xe, Fe = ue.meridiem;
      if (Fe) {
        for (var Ie = 1; Ie <= 24; Ie += 1)
          if (he.indexOf(Fe(Ie, 0, Oe)) > -1) {
            xe = Ie > 12;
            break;
          }
      } else
        xe = he === (Oe ? "pm" : "PM");
      return xe;
    }, Ve = { A: [ie, function(he) {
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
      var Oe = ue.ordinal, xe = he.match(/\d+/);
      if (this.day = xe[0], Oe)
        for (var Fe = 1; Fe <= 31; Fe += 1)
          Oe(Fe).replace(/\[|\]/g, "") === he && (this.day = Fe);
    }], M: [le, pe("month")], MM: [ae, pe("month")], MMM: [ie, function(he) {
      var Oe = _e("months"), xe = (_e("monthsShort") || Oe.map(function(Fe) {
        return Fe.slice(0, 3);
      })).indexOf(he) + 1;
      if (xe < 1)
        throw new Error();
      this.month = xe % 12 || xe;
    }], MMMM: [ie, function(he) {
      var Oe = _e("months").indexOf(he) + 1;
      if (Oe < 1)
        throw new Error();
      this.month = Oe % 12 || Oe;
    }], Y: [/[+-]?\d+/, pe("year")], YY: [ae, function(he) {
      this.year = de(he);
    }], YYYY: [/\d{4}/, pe("year")], Z: Ce, ZZ: Ce };
    function $e(he) {
      var Oe, xe;
      Oe = he, xe = ue && ue.formats;
      for (var Fe = (he = Oe.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(En, Tn, $n) {
        var _n = $n && $n.toUpperCase();
        return Tn || xe[$n] || oe[$n] || xe[_n].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(Dt, At, vn) {
          return At || vn.slice(1);
        });
      })).match(re), Ie = Fe.length, Ue = 0; Ue < Ie; Ue += 1) {
        var Lt = Fe[Ue], ze = Ve[Lt], Pt = ze && ze[0], bn = ze && ze[1];
        Fe[Ue] = bn ? { regex: Pt, parser: bn } : Lt.replace(/^\[|\]$/g, "");
      }
      return function(En) {
        for (var Tn = {}, $n = 0, _n = 0; $n < Ie; $n += 1) {
          var Dt = Fe[$n];
          if (typeof Dt == "string")
            _n += Dt.length;
          else {
            var At = Dt.regex, vn = Dt.parser, jt = En.slice(_n), Cn = At.exec(jt)[0];
            vn.call(Tn, Cn), En = En.replace(Cn, "");
          }
        }
        return function(kt) {
          var Et = kt.afternoon;
          if (Et !== void 0) {
            var wn = kt.hours;
            Et ? wn < 12 && (kt.hours += 12) : wn === 12 && (kt.hours = 0), delete kt.afternoon;
          }
        }(Tn), Tn;
      };
    }
    return function(he, Oe, xe) {
      xe.p.customParseFormat = !0, he && he.parseTwoDigitYear && (de = he.parseTwoDigitYear);
      var Fe = Oe.prototype, Ie = Fe.parse;
      Fe.parse = function(Ue) {
        var Lt = Ue.date, ze = Ue.utc, Pt = Ue.args;
        this.$u = ze;
        var bn = Pt[1];
        if (typeof bn == "string") {
          var En = Pt[2] === !0, Tn = Pt[3] === !0, $n = En || Tn, _n = Pt[2];
          Tn && (_n = Pt[2]), ue = this.$locale(), !En && _n && (ue = xe.Ls[_n]), this.$d = function(jt, Cn, kt) {
            try {
              if (["x", "X"].indexOf(Cn) > -1)
                return new Date((Cn === "X" ? 1e3 : 1) * jt);
              var Et = $e(Cn)(jt), wn = Et.year, Pn = Et.month, hn = Et.day, On = Et.hours, Dn = Et.minutes, Rn = Et.seconds, Fn = Et.milliseconds, Nn = Et.zone, An = new Date(), Vn = hn || (wn || Pn ? 1 : An.getDate()), Bn = wn || An.getFullYear(), Kn = 0;
              wn && !Pn || (Kn = Pn > 0 ? Pn - 1 : An.getMonth());
              var Yn = On || 0, Xn = Dn || 0, eo = Rn || 0, qn = Fn || 0;
              return Nn ? new Date(Date.UTC(Bn, Kn, Vn, Yn, Xn, eo, qn + 60 * Nn.offset * 1e3)) : kt ? new Date(Date.UTC(Bn, Kn, Vn, Yn, Xn, eo, qn)) : new Date(Bn, Kn, Vn, Yn, Xn, eo, qn);
            } catch {
              return new Date("");
            }
          }(Lt, bn, ze), this.init(), _n && _n !== !0 && (this.$L = this.locale(_n).$L), $n && Lt != this.format(bn) && (this.$d = new Date("")), ue = {};
        } else if (bn instanceof Array)
          for (var Dt = bn.length, At = 1; At <= Dt; At += 1) {
            Pt[1] = bn[At - 1];
            var vn = xe.apply(this, Pt);
            if (vn.isValid()) {
              this.$d = vn.$d, this.$L = vn.$L, this.init();
              break;
            }
            At === Dt && (this.$d = new Date(""));
          }
        else
          Ie.call(this, Ue);
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
}), _hoisted_1$q = ["id", "name", "placeholder", "value", "disabled", "readonly"], _hoisted_2$i = ["id", "name", "placeholder", "value", "disabled", "readonly"], __default__$j = {
  name: "Picker"
}, _sfc_main$I = /* @__PURE__ */ defineComponent({
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
    const re = e, { lang: ae } = useLocale(), le = useNamespace("date"), ie = useNamespace("input"), ue = useNamespace("range"), de = inject(formContextKey, {}), pe = inject(formItemContextKey, {}), Ce = inject("ElPopperOptions", {}), _e = ref(), Ne = ref(), Ve = ref(!1), $e = ref(!1), he = ref(null);
    let Oe = !1, xe = !1;
    watch(Ve, (qe) => {
      qe ? he.value = re.modelValue : (qn.value = null, nextTick(() => {
        Fe(re.modelValue);
      }));
    });
    const Fe = (qe, Sn) => {
      var In;
      (Sn || !valueEquals(qe, he.value)) && (oe("change", qe), re.validateEvent && ((In = pe.validate) == null || In.call(pe, "change").catch((jn) => debugWarn(jn))));
    }, Ie = (qe) => {
      if (!valueEquals(re.modelValue, qe)) {
        let Sn;
        isArray(qe) ? Sn = qe.map((In) => formatter(In, re.valueFormat, ae.value)) : qe && (Sn = formatter(qe, re.valueFormat, ae.value)), oe("update:modelValue", qe && Sn, ae.value);
      }
    }, Ue = (qe) => {
      oe("keydown", qe);
    }, Lt = computed(() => {
      if (Ne.value) {
        const qe = Kn.value ? Ne.value : Ne.value.$el;
        return Array.from(qe.querySelectorAll("input"));
      }
      return [];
    }), ze = (qe, Sn, In) => {
      const jn = Lt.value;
      !jn.length || (!In || In === "min" ? (jn[0].setSelectionRange(qe, Sn), jn[0].focus()) : In === "max" && (jn[1].setSelectionRange(qe, Sn), jn[1].focus()));
    }, Pt = () => {
      Dt(!0, !0), nextTick(() => {
        xe = !1;
      });
    }, bn = (qe = "", Sn = !1) => {
      Sn || Pt(), Ve.value = Sn;
      let In;
      isArray(qe) ? In = qe.map((jn) => jn.toDate()) : In = qe && qe.toDate(), qn.value = null, Ie(In);
    }, En = () => {
      $e.value = !0;
    }, Tn = () => {
      oe("visible-change", !0);
    }, $n = (qe) => {
      (qe == null ? void 0 : qe.key) === EVENT_CODE.esc && Dt(!0, !0);
    }, _n = () => {
      $e.value = !1, xe = !1, oe("visible-change", !1);
    }, Dt = (qe = !0, Sn = !1) => {
      xe = Sn;
      const [In, jn] = unref(Lt);
      let Ln = In;
      !qe && Kn.value && (Ln = jn), Ln && Ln.focus();
    }, At = (qe) => {
      re.readonly || Cn.value || Ve.value || xe || (Ve.value = !0, oe("focus", qe));
    };
    let vn;
    const jt = (qe) => {
      const Sn = async () => {
        setTimeout(() => {
          var In, jn;
          vn === Sn && (!(((In = _e.value) == null ? void 0 : In.isFocusInsideContent()) && !Oe) && Lt.value.filter((Ln) => Ln.contains(document.activeElement)).length === 0 && (no(), Ve.value = !1, oe("blur", qe), re.validateEvent && ((jn = pe.validate) == null || jn.call(pe, "blur").catch((Ln) => debugWarn(Ln)))), Oe = !1);
        }, 0);
      };
      vn = Sn, Sn();
    }, Cn = computed(() => re.disabled || de.disabled), kt = computed(() => {
      let qe;
      if (Fn.value ? Qn.value.getDefaultValue && (qe = Qn.value.getDefaultValue()) : isArray(re.modelValue) ? qe = re.modelValue.map((Sn) => parseDate(Sn, re.valueFormat, ae.value)) : qe = parseDate(re.modelValue, re.valueFormat, ae.value), Qn.value.getRangeAvailableTime) {
        const Sn = Qn.value.getRangeAvailableTime(qe);
        isEqual(Sn, qe) || (qe = Sn, Ie(isArray(qe) ? qe.map((In) => In.toDate()) : qe.toDate()));
      }
      return isArray(qe) && qe.some((Sn) => !Sn) && (qe = []), qe;
    }), Et = computed(() => {
      if (!Qn.value.panelReady)
        return "";
      const qe = zn(kt.value);
      return isArray(qn.value) ? [
        qn.value[0] || qe && qe[0] || "",
        qn.value[1] || qe && qe[1] || ""
      ] : qn.value !== null ? qn.value : !Pn.value && Fn.value || !Ve.value && Fn.value ? "" : qe ? hn.value ? qe.join(", ") : qe : "";
    }), wn = computed(() => re.type.includes("time")), Pn = computed(() => re.type.startsWith("time")), hn = computed(() => re.type === "dates"), On = computed(() => re.prefixIcon || (wn.value ? clock_default : calendar_default)), Dn = ref(!1), Rn = (qe) => {
      re.readonly || Cn.value || Dn.value && (qe.stopPropagation(), Pt(), Ie(null), Fe(null, !0), Dn.value = !1, Ve.value = !1, Qn.value.handleClear && Qn.value.handleClear());
    }, Fn = computed(() => {
      const { modelValue: qe } = re;
      return !qe || isArray(qe) && !qe.filter(Boolean).length;
    }), Nn = async (qe) => {
      var Sn;
      re.readonly || Cn.value || (((Sn = qe.target) == null ? void 0 : Sn.tagName) !== "INPUT" || Lt.value.includes(document.activeElement)) && (Ve.value = !0);
    }, An = () => {
      re.readonly || Cn.value || !Fn.value && re.clearable && (Dn.value = !0);
    }, Vn = () => {
      Dn.value = !1;
    }, Bn = (qe) => {
      var Sn;
      (((Sn = qe.touches[0].target) == null ? void 0 : Sn.tagName) !== "INPUT" || Lt.value.includes(document.activeElement)) && (Ve.value = !0);
    }, Kn = computed(() => re.type.includes("range")), Yn = useSize(), Xn = computed(() => {
      var qe, Sn;
      return (Sn = (qe = unref(_e)) == null ? void 0 : qe.popperRef) == null ? void 0 : Sn.contentRef;
    }), eo = computed(() => {
      var qe;
      return unref(Kn) ? unref(Ne) : (qe = unref(Ne)) == null ? void 0 : qe.$el;
    });
    onClickOutside(eo, (qe) => {
      const Sn = unref(Xn), In = unref(eo);
      Sn && (qe.target === Sn || qe.composedPath().includes(Sn)) || qe.target === In || qe.composedPath().includes(In) || (Ve.value = !1);
    });
    const qn = ref(null), no = () => {
      if (qn.value) {
        const qe = oo(Et.value);
        qe && Hn(qe) && (Ie(isArray(qe) ? qe.map((Sn) => Sn.toDate()) : qe.toDate()), qn.value = null);
      }
      qn.value === "" && (Ie(null), Fe(null), qn.value = null);
    }, oo = (qe) => qe ? Qn.value.parseUserInput(qe) : null, zn = (qe) => qe ? Qn.value.formatToString(qe) : null, Hn = (qe) => Qn.value.isValidValue(qe), Gn = async (qe) => {
      if (re.readonly || Cn.value)
        return;
      const { code: Sn } = qe;
      if (Ue(qe), Sn === EVENT_CODE.esc) {
        Ve.value === !0 && (Ve.value = !1, qe.preventDefault(), qe.stopPropagation());
        return;
      }
      if (Sn === EVENT_CODE.down && (Qn.value.handleFocusPicker && (qe.preventDefault(), qe.stopPropagation()), Ve.value === !1 && (Ve.value = !0, await nextTick()), Qn.value.handleFocusPicker)) {
        Qn.value.handleFocusPicker();
        return;
      }
      if (Sn === EVENT_CODE.tab) {
        Oe = !0;
        return;
      }
      if (Sn === EVENT_CODE.enter || Sn === EVENT_CODE.numpadEnter) {
        (qn.value === null || qn.value === "" || Hn(oo(Et.value))) && (no(), Ve.value = !1), qe.stopPropagation();
        return;
      }
      if (qn.value) {
        qe.stopPropagation();
        return;
      }
      Qn.value.handleKeydownInput && Qn.value.handleKeydownInput(qe);
    }, Zn = (qe) => {
      qn.value = qe, Ve.value || (Ve.value = !0);
    }, lo = (qe) => {
      const Sn = qe.target;
      qn.value ? qn.value = [Sn.value, qn.value[1]] : qn.value = [Sn.value, null];
    }, ao = (qe) => {
      const Sn = qe.target;
      qn.value ? qn.value = [qn.value[0], Sn.value] : qn.value = [null, Sn.value];
    }, xn = () => {
      var qe;
      const Sn = qn.value, In = oo(Sn && Sn[0]), jn = unref(kt);
      if (In && In.isValid()) {
        qn.value = [
          zn(In),
          ((qe = Et.value) == null ? void 0 : qe[1]) || null
        ];
        const Ln = [In, jn && (jn[1] || null)];
        Hn(Ln) && (Ie(Ln), qn.value = null);
      }
    }, Jn = () => {
      var qe;
      const Sn = unref(qn), In = oo(Sn && Sn[1]), jn = unref(kt);
      if (In && In.isValid()) {
        qn.value = [
          ((qe = unref(Et)) == null ? void 0 : qe[0]) || null,
          zn(In)
        ];
        const Ln = [jn && jn[0], In];
        Hn(Ln) && (Ie(Ln), qn.value = null);
      }
    }, Qn = ref({}), ro = (qe) => {
      Qn.value[qe[0]] = qe[1], Qn.value.panelReady = !0;
    }, kn = (qe) => {
      oe("calendar-change", qe);
    }, Mn = (qe, Sn, In) => {
      oe("panel-change", qe, Sn, In);
    };
    return provide("EP_PICKER_BASE", {
      props: re
    }), k({
      focus: Dt,
      handleFocusInput: At,
      handleBlurInput: jt,
      onPick: bn
    }), (qe, Sn) => (openBlock(), createBlock(unref(ElTooltip), mergeProps({
      ref_key: "refPopper",
      ref: _e,
      visible: Ve.value,
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
      onShow: Tn,
      onHide: _n
    }), {
      default: withCtx(() => [
        unref(Kn) ? (openBlock(), createElementBlock("div", {
          key: 1,
          ref_key: "inputRef",
          ref: Ne,
          class: normalizeClass([
            unref(le).b("editor"),
            unref(le).bm("editor", qe.type),
            unref(ie).e("wrapper"),
            unref(le).is("disabled", unref(Cn)),
            unref(le).is("active", Ve.value),
            unref(ue).b("editor"),
            unref(Yn) ? unref(ue).bm("editor", unref(Yn)) : "",
            qe.$attrs.class
          ]),
          style: normalizeStyle(qe.$attrs.style),
          onClick: At,
          onMouseenter: An,
          onMouseleave: Vn,
          onTouchstart: Bn,
          onKeydown: Gn
        }, [
          unref(On) ? (openBlock(), createBlock(unref(ElIcon), {
            key: 0,
            class: normalizeClass([unref(ie).e("icon"), unref(ue).e("icon")]),
            onMousedown: withModifiers(Nn, ["prevent"]),
            onTouchstart: Bn
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
            onChange: xn,
            onFocus: At,
            onBlur: jt
          }, null, 42, _hoisted_1$q),
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
            onFocus: At,
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
          onFocus: At,
          onBlur: jt,
          onKeydown: Gn,
          onChange: no,
          onMousedown: Nn,
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
              onMousedown: withModifiers(Nn, ["prevent"]),
              onTouchstart: Bn
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
          visible: Ve.value,
          actualVisible: $e.value,
          parsedValue: unref(kt),
          format: qe.format,
          unlinkPanels: qe.unlinkPanels,
          type: qe.type,
          defaultValue: qe.defaultValue,
          onPick: bn,
          onSelectRange: ze,
          onSetPickerOption: ro,
          onCalendarChange: kn,
          onPanelChange: Mn,
          onKeydown: $n,
          onMousedown: Sn[1] || (Sn[1] = withModifiers(() => {
          }, ["stop"]))
        })
      ]),
      _: 3
    }, 16, ["visible", "transition", "popper-class", "popper-options"]));
  }
});
var CommonPicker = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/time-picker/src/common/picker.vue"]]);
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
    return ["hour", "minute", "second"].forEach((Ne) => {
      if (Ce[Ne]) {
        let Ve;
        const $e = Ce[Ne];
        switch (Ne) {
          case "minute": {
            Ve = $e(_e.hour(), ue, pe);
            break;
          }
          case "second": {
            Ve = $e(_e.hour(), _e.minute(), ue, pe);
            break;
          }
          default: {
            Ve = $e(ue, pe);
            break;
          }
        }
        if ((Ve == null ? void 0 : Ve.length) && !Ve.includes(_e[Ne]())) {
          const he = de ? 0 : Ve.length - 1;
          _e = _e[Ne](Ve[he]);
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
    getAvailableSeconds: (pe, Ce, _e, Ne) => makeAvailableArr(le(pe, Ce, _e, Ne))
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
    const le = k.instance.popperRef, ie = re.target, ue = ae == null ? void 0 : ae.target, de = !k || !k.instance, pe = !ie || !ue, Ce = e.contains(ie) || e.contains(ue), _e = e === ie, Ne = oe.length && oe.some(($e) => $e == null ? void 0 : $e.contains(ie)) || oe.length && oe.includes(ue), Ve = le && (le.contains(ie) || le.contains(ue));
    de || pe || Ce || _e || Ne || Ve || k.value(re, ae);
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
}), _hoisted_1$p = ["onClick"], _hoisted_2$h = ["onMouseenter"], _sfc_main$H = /* @__PURE__ */ defineComponent({
  __name: "basic-time-spinner",
  props: basicTimeSpinnerProps,
  emits: ["change", "select-range", "set-option"],
  setup(e, { emit: k }) {
    const oe = e, re = useNamespace("time"), { getHoursList: ae, getMinutesList: le, getSecondsList: ie } = getTimeLists(oe.disabledHours, oe.disabledMinutes, oe.disabledSeconds);
    let ue = !1;
    const de = ref(), pe = ref(), Ce = ref(), _e = ref(), Ne = {
      hours: pe,
      minutes: Ce,
      seconds: _e
    }, Ve = computed(() => oe.showSeconds ? timeUnits : timeUnits.slice(0, 2)), $e = computed(() => {
      const { spinnerDate: kt } = oe, Et = kt.hour(), wn = kt.minute(), Pn = kt.second();
      return { hours: Et, minutes: wn, seconds: Pn };
    }), he = computed(() => {
      const { hours: kt, minutes: Et } = unref($e);
      return {
        hours: ae(oe.role),
        minutes: le(kt, oe.role),
        seconds: ie(kt, Et, oe.role)
      };
    }), Oe = computed(() => {
      const { hours: kt, minutes: Et, seconds: wn } = unref($e);
      return {
        hours: buildTimeList(kt, 23),
        minutes: buildTimeList(Et, 59),
        seconds: buildTimeList(wn, 59)
      };
    }), xe = debounce((kt) => {
      ue = !1, Ue(kt);
    }, 200), Fe = (kt) => {
      if (!!!oe.amPmMode)
        return "";
      const wn = oe.amPmMode === "A";
      let Pn = kt < 12 ? " am" : " pm";
      return wn && (Pn = Pn.toUpperCase()), Pn;
    }, Ie = (kt) => {
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
      const [wn, Pn] = Et;
      k("select-range", wn, Pn), de.value = kt;
    }, Ue = (kt) => {
      Pt(kt, unref($e)[kt]);
    }, Lt = () => {
      Ue("hours"), Ue("minutes"), Ue("seconds");
    }, ze = (kt) => kt.querySelector(`.${re.namespace.value}-scrollbar__wrap`), Pt = (kt, Et) => {
      if (oe.arrowControl)
        return;
      const wn = unref(Ne[kt]);
      wn && wn.$el && (ze(wn.$el).scrollTop = Math.max(0, Et * bn(kt)));
    }, bn = (kt) => {
      const Et = unref(Ne[kt]);
      return (Et == null ? void 0 : Et.$el.querySelector("li").offsetHeight) || 0;
    }, En = () => {
      $n(1);
    }, Tn = () => {
      $n(-1);
    }, $n = (kt) => {
      de.value || Ie("hours");
      const Et = de.value;
      let wn = unref($e)[Et];
      const Pn = de.value === "hours" ? 24 : 60;
      wn = (wn + kt + Pn) % Pn, _n(Et, wn), Pt(Et, wn), nextTick(() => Ie(Et));
    }, _n = (kt, Et) => {
      if (unref(he)[kt][Et])
        return;
      const { hours: hn, minutes: On, seconds: Dn } = unref($e);
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
    }, Dt = (kt, { value: Et, disabled: wn }) => {
      wn || (_n(kt, Et), Ie(kt), Pt(kt, Et));
    }, At = (kt) => {
      ue = !0, xe(kt);
      const Et = Math.min(Math.round((ze(unref(Ne[kt]).$el).scrollTop - (vn(kt) * 0.5 - 10) / bn(kt) + 3) / bn(kt)), kt === "hours" ? 23 : 59);
      _n(kt, Et);
    }, vn = (kt) => unref(Ne[kt]).$el.offsetHeight, jt = () => {
      const kt = (Et) => {
        const wn = unref(Ne[Et]);
        wn && wn.$el && (ze(wn.$el).onscroll = () => {
          At(Et);
        });
      };
      kt("hours"), kt("minutes"), kt("seconds");
    };
    onMounted(() => {
      nextTick(() => {
        !oe.arrowControl && jt(), Lt(), oe.role === "start" && Ie("hours");
      });
    });
    const Cn = (kt, Et) => {
      Ne[Et].value = kt;
    };
    return k("set-option", [`${oe.role}_scrollDown`, $n]), k("set-option", [`${oe.role}_emitSelectRange`, Ie]), watch(() => oe.spinnerDate, () => {
      ue || Lt();
    }), (kt, Et) => (openBlock(), createElementBlock("div", {
      class: normalizeClass([unref(re).b("spinner"), { "has-seconds": kt.showSeconds }])
    }, [
      kt.arrowControl ? createCommentVNode("v-if", !0) : (openBlock(!0), createElementBlock(Fragment, { key: 0 }, renderList(unref(Ve), (wn) => (openBlock(), createBlock(unref(ElScrollbar), {
        key: wn,
        ref_for: !0,
        ref: (Pn) => Cn(Pn, wn),
        class: normalizeClass(unref(re).be("spinner", "wrapper")),
        "wrap-style": "max-height: inherit;",
        "view-class": unref(re).be("spinner", "list"),
        noresize: "",
        tag: "ul",
        onMouseenter: (Pn) => Ie(wn),
        onMousemove: (Pn) => Ue(wn)
      }, {
        default: withCtx(() => [
          (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(he)[wn], (Pn, hn) => (openBlock(), createElementBlock("li", {
            key: hn,
            class: normalizeClass([
              unref(re).be("spinner", "item"),
              unref(re).is("active", hn === unref($e)[wn]),
              unref(re).is("disabled", Pn)
            ]),
            onClick: (On) => Dt(wn, { value: hn, disabled: Pn })
          }, [
            wn === "hours" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(toDisplayString(("0" + (kt.amPmMode ? hn % 12 || 12 : hn)).slice(-2)) + toDisplayString(Fe(hn)), 1)
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createTextVNode(toDisplayString(("0" + hn).slice(-2)), 1)
            ], 64))
          ], 10, _hoisted_1$p))), 128))
        ]),
        _: 2
      }, 1032, ["class", "view-class", "onMouseenter", "onMousemove"]))), 128)),
      kt.arrowControl ? (openBlock(!0), createElementBlock(Fragment, { key: 1 }, renderList(unref(Ve), (wn) => (openBlock(), createElementBlock("div", {
        key: wn,
        class: normalizeClass([unref(re).be("spinner", "wrapper"), unref(re).is("arrow")]),
        onMouseenter: (Pn) => Ie(wn)
      }, [
        withDirectives((openBlock(), createBlock(unref(ElIcon), {
          class: normalizeClass(["arrow-up", unref(re).be("spinner", "arrow")])
        }, {
          default: withCtx(() => [
            createVNode(unref(arrow_up_default))
          ]),
          _: 1
        }, 8, ["class"])), [
          [unref(RepeatClick), Tn]
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
          (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(Oe)[wn], (Pn, hn) => (openBlock(), createElementBlock("li", {
            key: hn,
            class: normalizeClass([
              unref(re).be("spinner", "item"),
              unref(re).is("active", Pn === unref($e)[wn]),
              unref(re).is("disabled", unref(he)[wn][Pn])
            ])
          }, [
            typeof Pn == "number" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              wn === "hours" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createTextVNode(toDisplayString(("0" + (kt.amPmMode ? Pn % 12 || 12 : Pn)).slice(-2)) + toDisplayString(Fe(Pn)), 1)
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
var TimeSpinner = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/time-picker/src/time-picker-com/basic-time-spinner.vue"]]);
const _sfc_main$G = /* @__PURE__ */ defineComponent({
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
    } = re.props, { getAvailableHours: pe, getAvailableMinutes: Ce, getAvailableSeconds: _e } = buildAvailableTimeSlotGetter(le, ie, ue), Ne = useNamespace("time"), { t: Ve, lang: $e } = useLocale(), he = ref([0, 2]), Oe = useOldValue(oe), xe = computed(() => isUndefined(oe.actualVisible) ? `${Ne.namespace.value}-zoom-in-top` : ""), Fe = computed(() => oe.format.includes("ss")), Ie = computed(() => oe.format.includes("A") ? "A" : oe.format.includes("a") ? "a" : ""), Ue = (kt) => {
      const Et = dayjs(kt).locale($e.value), wn = At(Et);
      return Et.isSame(wn);
    }, Lt = () => {
      k("pick", Oe.value, !1);
    }, ze = (kt = !1, Et = !1) => {
      Et || k("pick", oe.parsedValue, kt);
    }, Pt = (kt) => {
      if (!oe.visible)
        return;
      const Et = At(kt).millisecond(0);
      k("pick", Et, !0);
    }, bn = (kt, Et) => {
      k("select-range", kt, Et), he.value = [kt, Et];
    }, En = (kt) => {
      const Et = [0, 3].concat(Fe.value ? [6] : []), wn = ["hours", "minutes"].concat(Fe.value ? ["seconds"] : []), hn = (Et.indexOf(he.value[0]) + kt + Et.length) % Et.length;
      $n.start_emitSelectRange(wn[hn]);
    }, Tn = (kt) => {
      const Et = kt.code, { left: wn, right: Pn, up: hn, down: On } = EVENT_CODE;
      if ([wn, Pn].includes(Et)) {
        En(Et === wn ? -1 : 1), kt.preventDefault();
        return;
      }
      if ([hn, On].includes(Et)) {
        const Dn = Et === hn ? -1 : 1;
        $n.start_scrollDown(Dn), kt.preventDefault();
        return;
      }
    }, { timePickerOptions: $n, onSetOption: _n, getAvailableTime: Dt } = useTimePanel({
      getAvailableHours: pe,
      getAvailableMinutes: Ce,
      getAvailableSeconds: _e
    }), At = (kt) => Dt(kt, oe.datetimeRole || "", !0), vn = (kt) => kt ? dayjs(kt, oe.format).locale($e.value) : null, jt = (kt) => kt ? kt.format(oe.format) : null, Cn = () => dayjs(de).locale($e.value);
    return k("set-picker-option", ["isValidValue", Ue]), k("set-picker-option", ["formatToString", jt]), k("set-picker-option", ["parseUserInput", vn]), k("set-picker-option", ["handleKeydownInput", Tn]), k("set-picker-option", ["getRangeAvailableTime", At]), k("set-picker-option", ["getDefaultValue", Cn]), (kt, Et) => (openBlock(), createBlock(Transition, { name: unref(xe) }, {
      default: withCtx(() => [
        kt.actualVisible || kt.visible ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(Ne).b("panel"))
        }, [
          createElementVNode("div", {
            class: normalizeClass([unref(Ne).be("panel", "content"), { "has-seconds": unref(Fe) }])
          }, [
            createVNode(TimeSpinner, {
              ref: "spinner",
              role: kt.datetimeRole || "start",
              "arrow-control": unref(ae),
              "show-seconds": unref(Fe),
              "am-pm-mode": unref(Ie),
              "spinner-date": kt.parsedValue,
              "disabled-hours": unref(le),
              "disabled-minutes": unref(ie),
              "disabled-seconds": unref(ue),
              onChange: Pt,
              onSetOption: unref(_n),
              onSelectRange: bn
            }, null, 8, ["role", "arrow-control", "show-seconds", "am-pm-mode", "spinner-date", "disabled-hours", "disabled-minutes", "disabled-seconds", "onSetOption"])
          ], 2),
          createElementVNode("div", {
            class: normalizeClass(unref(Ne).be("panel", "footer"))
          }, [
            createElementVNode("button", {
              type: "button",
              class: normalizeClass([unref(Ne).be("panel", "btn"), "cancel"]),
              onClick: Lt
            }, toDisplayString(unref(Ve)("el.datepicker.cancel")), 3),
            createElementVNode("button", {
              type: "button",
              class: normalizeClass([unref(Ne).be("panel", "btn"), "confirm"]),
              onClick: Et[0] || (Et[0] = (wn) => ze())
            }, toDisplayString(unref(Ve)("el.datepicker.confirm")), 3)
          ], 2)
        ], 2)) : createCommentVNode("v-if", !0)
      ]),
      _: 1
    }, 8, ["name"]));
  }
});
var TimePickPanel = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/time-picker/src/time-picker-com/panel-time-pick.vue"]]);
const panelTimeRangeProps = buildProps({
  ...timePanelSharedProps,
  parsedValue: {
    type: definePropType(Array)
  }
}), _hoisted_1$o = ["disabled"], _sfc_main$F = /* @__PURE__ */ defineComponent({
  __name: "panel-time-range",
  props: panelTimeRangeProps,
  emits: ["pick", "select-range", "set-picker-option"],
  setup(e, { emit: k }) {
    const oe = e, re = (Vn, Bn) => {
      const Kn = [];
      for (let Yn = Vn; Yn <= Bn; Yn++)
        Kn.push(Yn);
      return Kn;
    }, { t: ae, lang: le } = useLocale(), ie = useNamespace("time"), ue = useNamespace("picker"), de = inject("EP_PICKER_BASE"), {
      arrowControl: pe,
      disabledHours: Ce,
      disabledMinutes: _e,
      disabledSeconds: Ne,
      defaultValue: Ve
    } = de.props, $e = computed(() => oe.parsedValue[0]), he = computed(() => oe.parsedValue[1]), Oe = useOldValue(oe), xe = () => {
      k("pick", Oe.value, !1);
    }, Fe = computed(() => oe.format.includes("ss")), Ie = computed(() => oe.format.includes("A") ? "A" : oe.format.includes("a") ? "a" : ""), Ue = (Vn = !1) => {
      k("pick", [$e.value, he.value], Vn);
    }, Lt = (Vn) => {
      bn(Vn.millisecond(0), he.value);
    }, ze = (Vn) => {
      bn($e.value, Vn.millisecond(0));
    }, Pt = (Vn) => {
      const Bn = Vn.map((Yn) => dayjs(Yn).locale(le.value)), Kn = Et(Bn);
      return Bn[0].isSame(Kn[0]) && Bn[1].isSame(Kn[1]);
    }, bn = (Vn, Bn) => {
      k("pick", [Vn, Bn], !0);
    }, En = computed(() => $e.value > he.value), Tn = ref([0, 2]), $n = (Vn, Bn) => {
      k("select-range", Vn, Bn, "min"), Tn.value = [Vn, Bn];
    }, _n = computed(() => Fe.value ? 11 : 8), Dt = (Vn, Bn) => {
      k("select-range", Vn, Bn, "max");
      const Kn = unref(_n);
      Tn.value = [Vn + Kn, Bn + Kn];
    }, At = (Vn) => {
      const Bn = Fe.value ? [0, 3, 6, 11, 14, 17] : [0, 3, 8, 11], Kn = ["hours", "minutes"].concat(Fe.value ? ["seconds"] : []), Xn = (Bn.indexOf(Tn.value[0]) + Vn + Bn.length) % Bn.length, eo = Bn.length / 2;
      Xn < eo ? On.start_emitSelectRange(Kn[Xn]) : On.end_emitSelectRange(Kn[Xn - eo]);
    }, vn = (Vn) => {
      const Bn = Vn.code, { left: Kn, right: Yn, up: Xn, down: eo } = EVENT_CODE;
      if ([Kn, Yn].includes(Bn)) {
        At(Bn === Kn ? -1 : 1), Vn.preventDefault();
        return;
      }
      if ([Xn, eo].includes(Bn)) {
        const qn = Bn === Xn ? -1 : 1, no = Tn.value[0] < _n.value ? "start" : "end";
        On[`${no}_scrollDown`](qn), Vn.preventDefault();
        return;
      }
    }, jt = (Vn, Bn) => {
      const Kn = Ce ? Ce(Vn) : [], Yn = Vn === "start", eo = (Bn || (Yn ? he.value : $e.value)).hour(), qn = Yn ? re(eo + 1, 23) : re(0, eo - 1);
      return union$1(Kn, qn);
    }, Cn = (Vn, Bn, Kn) => {
      const Yn = _e ? _e(Vn, Bn) : [], Xn = Bn === "start", eo = Kn || (Xn ? he.value : $e.value), qn = eo.hour();
      if (Vn !== qn)
        return Yn;
      const no = eo.minute(), oo = Xn ? re(no + 1, 59) : re(0, no - 1);
      return union$1(Yn, oo);
    }, kt = (Vn, Bn, Kn, Yn) => {
      const Xn = Ne ? Ne(Vn, Bn, Kn) : [], eo = Kn === "start", qn = Yn || (eo ? he.value : $e.value), no = qn.hour(), oo = qn.minute();
      if (Vn !== no || Bn !== oo)
        return Xn;
      const zn = qn.second(), Hn = eo ? re(zn + 1, 59) : re(0, zn - 1);
      return union$1(Xn, Hn);
    }, Et = ([Vn, Bn]) => [
      Dn(Vn, "start", !0, Bn),
      Dn(Bn, "end", !1, Vn)
    ], { getAvailableHours: wn, getAvailableMinutes: Pn, getAvailableSeconds: hn } = buildAvailableTimeSlotGetter(jt, Cn, kt), {
      timePickerOptions: On,
      getAvailableTime: Dn,
      onSetOption: Rn
    } = useTimePanel({
      getAvailableHours: wn,
      getAvailableMinutes: Pn,
      getAvailableSeconds: hn
    }), Fn = (Vn) => Vn ? isArray(Vn) ? Vn.map((Bn) => dayjs(Bn, oe.format).locale(le.value)) : dayjs(Vn, oe.format).locale(le.value) : null, Nn = (Vn) => Vn ? isArray(Vn) ? Vn.map((Bn) => Bn.format(oe.format)) : Vn.format(oe.format) : null, An = () => {
      if (isArray(Ve))
        return Ve.map((Bn) => dayjs(Bn).locale(le.value));
      const Vn = dayjs(Ve).locale(le.value);
      return [Vn, Vn.add(60, "m")];
    };
    return k("set-picker-option", ["formatToString", Nn]), k("set-picker-option", ["parseUserInput", Fn]), k("set-picker-option", ["isValidValue", Pt]), k("set-picker-option", ["handleKeydownInput", vn]), k("set-picker-option", ["getDefaultValue", An]), k("set-picker-option", ["getRangeAvailableTime", Et]), (Vn, Bn) => Vn.actualVisible ? (openBlock(), createElementBlock("div", {
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
              { "has-seconds": unref(Fe) }
            ])
          }, [
            createVNode(TimeSpinner, {
              ref: "minSpinner",
              role: "start",
              "show-seconds": unref(Fe),
              "am-pm-mode": unref(Ie),
              "arrow-control": unref(pe),
              "spinner-date": unref($e),
              "disabled-hours": jt,
              "disabled-minutes": Cn,
              "disabled-seconds": kt,
              onChange: Lt,
              onSetOption: unref(Rn),
              onSelectRange: $n
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
              { "has-seconds": unref(Fe) }
            ])
          }, [
            createVNode(TimeSpinner, {
              ref: "maxSpinner",
              role: "end",
              "show-seconds": unref(Fe),
              "am-pm-mode": unref(Ie),
              "arrow-control": unref(pe),
              "spinner-date": unref(he),
              "disabled-hours": jt,
              "disabled-minutes": Cn,
              "disabled-seconds": kt,
              onChange: ze,
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
          onClick: Bn[0] || (Bn[0] = (Kn) => xe())
        }, toDisplayString(unref(ae)("el.datepicker.cancel")), 3),
        createElementVNode("button", {
          type: "button",
          class: normalizeClass([unref(ie).be("panel", "btn"), "confirm"]),
          disabled: unref(En),
          onClick: Bn[1] || (Bn[1] = (Kn) => Ue())
        }, toDisplayString(unref(ae)("el.datepicker.confirm")), 11, _hoisted_1$o)
      ], 2)
    ], 2)) : createCommentVNode("v-if", !0);
  }
});
var TimeRangePanel = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/time-picker/src/time-picker-com/panel-time-range.vue"]]);
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
  function pe($e) {
    var he, Oe;
    return $e === e.trueLabel || $e === !0 ? (he = e.trueLabel) != null ? he : !0 : (Oe = e.falseLabel) != null ? Oe : !1;
  }
  function Ce($e, he) {
    de("change", pe($e), he);
  }
  function _e($e) {
    if (oe.value)
      return;
    const he = $e.target;
    de("change", pe(he.checked), $e);
  }
  async function Ne($e) {
    oe.value || !re.value && !ae.value && le.value && (k.value = pe([!1, e.falseLabel].includes(k.value)), await nextTick(), Ce(k.value, $e));
  }
  const Ve = computed(() => {
    var $e;
    return (($e = ue.validateEvent) == null ? void 0 : $e.value) || e.validateEvent;
  });
  return watch(() => e.modelValue, () => {
    var $e;
    Ve.value && (($e = ie == null ? void 0 : ie.validate) == null || $e.call(ie, "change").catch((he) => debugWarn(he)));
  }), {
    handleChange: _e,
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
  }), { isDisabled: _e } = useDisabled(e, { model: oe, isChecked: de }), { inputId: Ne, isLabeledByFormItem: Ve } = useFormItemInputId(e, {
    formItemContext: le,
    disableIdGeneration: Ce,
    disableIdManagement: re
  }), { handleChange: $e, onClickRoot: he } = useEvent$1(e, {
    model: oe,
    isLimitExceeded: ae,
    hasOwnLabel: Ce,
    isDisabled: _e,
    isLabeledByFormItem: Ve
  });
  return setStoreValue(e, { model: oe }), {
    elFormItem: le,
    inputId: Ne,
    isLabeledByFormItem: Ve,
    isChecked: de,
    isDisabled: _e,
    isGroup: re,
    checkboxSize: pe,
    hasOwnLabel: Ce,
    model: oe,
    handleChange: $e,
    onClickRoot: he,
    focus: ie,
    size: ue
  };
}, _hoisted_1$n = ["tabindex", "role", "aria-checked"], _hoisted_2$g = ["id", "aria-hidden", "name", "tabindex", "disabled", "true-value", "false-value"], _hoisted_3$a = ["id", "aria-hidden", "disabled", "value", "name", "tabindex"], __default__$i = {
  name: "ElCheckbox"
}, _sfc_main$E = /* @__PURE__ */ defineComponent({
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
      focus: Ne
    } = useCheckbox(k, oe), Ve = useNamespace("checkbox");
    return ($e, he) => (openBlock(), createBlock(resolveDynamicComponent(!unref(de) && unref(ae) ? "span" : "label"), {
      class: normalizeClass([
        unref(Ve).b(),
        unref(Ve).m(unref(ue)),
        unref(Ve).is("disabled", unref(ie)),
        unref(Ve).is("bordered", $e.border),
        unref(Ve).is("checked", unref(le))
      ]),
      "aria-controls": $e.indeterminate ? $e.controls : null,
      onClick: unref(_e)
    }, {
      default: withCtx(() => [
        createElementVNode("span", {
          class: normalizeClass([
            unref(Ve).e("input"),
            unref(Ve).is("disabled", unref(ie)),
            unref(Ve).is("checked", unref(le)),
            unref(Ve).is("indeterminate", $e.indeterminate),
            unref(Ve).is("focus", unref(Ne))
          ]),
          tabindex: $e.indeterminate ? 0 : void 0,
          role: $e.indeterminate ? "checkbox" : void 0,
          "aria-checked": $e.indeterminate ? "mixed" : void 0
        }, [
          $e.trueLabel || $e.falseLabel ? withDirectives((openBlock(), createElementBlock("input", {
            key: 0,
            id: unref(re),
            "onUpdate:modelValue": he[0] || (he[0] = (Oe) => isRef(pe) ? pe.value = Oe : null),
            class: normalizeClass(unref(Ve).e("original")),
            type: "checkbox",
            "aria-hidden": $e.indeterminate ? "true" : "false",
            name: $e.name,
            tabindex: $e.tabindex,
            disabled: unref(ie),
            "true-value": $e.trueLabel,
            "false-value": $e.falseLabel,
            onChange: he[1] || (he[1] = (...Oe) => unref(Ce) && unref(Ce)(...Oe)),
            onFocus: he[2] || (he[2] = (Oe) => Ne.value = !0),
            onBlur: he[3] || (he[3] = (Oe) => Ne.value = !1)
          }, null, 42, _hoisted_2$g)), [
            [vModelCheckbox, unref(pe)]
          ]) : withDirectives((openBlock(), createElementBlock("input", {
            key: 1,
            id: unref(re),
            "onUpdate:modelValue": he[4] || (he[4] = (Oe) => isRef(pe) ? pe.value = Oe : null),
            class: normalizeClass(unref(Ve).e("original")),
            type: "checkbox",
            "aria-hidden": $e.indeterminate ? "true" : "false",
            disabled: unref(ie),
            value: $e.label,
            name: $e.name,
            tabindex: $e.tabindex,
            onChange: he[5] || (he[5] = (...Oe) => unref(Ce) && unref(Ce)(...Oe)),
            onFocus: he[6] || (he[6] = (Oe) => Ne.value = !0),
            onBlur: he[7] || (he[7] = (Oe) => Ne.value = !1)
          }, null, 42, _hoisted_3$a)), [
            [vModelCheckbox, unref(pe)]
          ]),
          createElementVNode("span", {
            class: normalizeClass(unref(Ve).e("inner"))
          }, null, 2)
        ], 10, _hoisted_1$n),
        unref(de) ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: normalizeClass(unref(Ve).e("label"))
        }, [
          renderSlot($e.$slots, "default"),
          $e.$slots.default ? createCommentVNode("v-if", !0) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createTextVNode(toDisplayString($e.label), 1)
          ], 64))
        ], 2)) : createCommentVNode("v-if", !0)
      ]),
      _: 3
    }, 8, ["class", "aria-controls", "onClick"]));
  }
});
var Checkbox = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox.vue"]]);
const _hoisted_1$m = ["name", "tabindex", "disabled", "true-value", "false-value"], _hoisted_2$f = ["name", "tabindex", "disabled", "value"], __default__$h = {
  name: "ElCheckboxButton"
}, _sfc_main$D = /* @__PURE__ */ defineComponent({
  ...__default__$h,
  props: checkboxProps,
  emits: checkboxEmits,
  setup(e) {
    const k = e, oe = useSlots(), { focus: re, isChecked: ae, isDisabled: le, size: ie, model: ue, handleChange: de } = useCheckbox(k, oe), { checkboxGroup: pe } = useCheckboxGroup(), Ce = useNamespace("checkbox"), _e = computed(() => {
      var Ne, Ve, $e, he;
      const Oe = (Ve = (Ne = pe == null ? void 0 : pe.fill) == null ? void 0 : Ne.value) != null ? Ve : "";
      return {
        backgroundColor: Oe,
        borderColor: Oe,
        color: (he = ($e = pe == null ? void 0 : pe.textColor) == null ? void 0 : $e.value) != null ? he : "",
        boxShadow: Oe ? `-1px 0 0 0 ${Oe}` : void 0
      };
    });
    return (Ne, Ve) => (openBlock(), createElementBlock("label", {
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
        "onUpdate:modelValue": Ve[0] || (Ve[0] = ($e) => isRef(ue) ? ue.value = $e : null),
        class: normalizeClass(unref(Ce).be("button", "original")),
        type: "checkbox",
        name: Ne.name,
        tabindex: Ne.tabindex,
        disabled: unref(le),
        "true-value": Ne.trueLabel,
        "false-value": Ne.falseLabel,
        onChange: Ve[1] || (Ve[1] = (...$e) => unref(de) && unref(de)(...$e)),
        onFocus: Ve[2] || (Ve[2] = ($e) => re.value = !0),
        onBlur: Ve[3] || (Ve[3] = ($e) => re.value = !1)
      }, null, 42, _hoisted_1$m)), [
        [vModelCheckbox, unref(ue)]
      ]) : withDirectives((openBlock(), createElementBlock("input", {
        key: 1,
        "onUpdate:modelValue": Ve[4] || (Ve[4] = ($e) => isRef(ue) ? ue.value = $e : null),
        class: normalizeClass(unref(Ce).be("button", "original")),
        type: "checkbox",
        name: Ne.name,
        tabindex: Ne.tabindex,
        disabled: unref(le),
        value: Ne.label,
        onChange: Ve[5] || (Ve[5] = (...$e) => unref(de) && unref(de)(...$e)),
        onFocus: Ve[6] || (Ve[6] = ($e) => re.value = !0),
        onBlur: Ve[7] || (Ve[7] = ($e) => re.value = !1)
      }, null, 42, _hoisted_2$f)), [
        [vModelCheckbox, unref(ue)]
      ]),
      Ne.$slots.default || Ne.label ? (openBlock(), createElementBlock("span", {
        key: 2,
        class: normalizeClass(unref(Ce).be("button", "inner")),
        style: normalizeStyle(unref(ae) ? unref(_e) : void 0)
      }, [
        renderSlot(Ne.$slots, "default", {}, () => [
          createTextVNode(toDisplayString(Ne.label), 1)
        ])
      ], 6)) : createCommentVNode("v-if", !0)
    ], 2));
  }
});
var CheckboxButton = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox-button.vue"]]);
const __default__$g = {
  name: "ElCheckboxGroup"
}, _sfc_main$C = /* @__PURE__ */ defineComponent({
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
var CheckboxGroup = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox-group.vue"]]);
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
}, _hoisted_1$l = ["value", "name", "disabled"], __default__$f = {
  name: "ElRadio"
}, _sfc_main$B = /* @__PURE__ */ defineComponent({
  ...__default__$f,
  props: radioProps,
  emits: radioEmits,
  setup(e, { emit: k }) {
    const oe = e, re = useNamespace("radio"), { radioRef: ae, radioGroup: le, focus: ie, size: ue, disabled: de, modelValue: pe } = useRadio(oe, k);
    function Ce() {
      nextTick(() => k("change", pe.value));
    }
    return (_e, Ne) => {
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
            "onUpdate:modelValue": Ne[0] || (Ne[0] = ($e) => isRef(pe) ? pe.value = $e : null),
            class: normalizeClass(unref(re).e("original")),
            value: _e.label,
            name: _e.name || ((Ve = unref(le)) == null ? void 0 : Ve.name),
            disabled: unref(de),
            type: "radio",
            onFocus: Ne[1] || (Ne[1] = ($e) => ie.value = !0),
            onBlur: Ne[2] || (Ne[2] = ($e) => ie.value = !1),
            onChange: Ce
          }, null, 42, _hoisted_1$l), [
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
          renderSlot(_e.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(_e.label), 1)
          ])
        ], 34)
      ], 2);
    };
  }
});
var Radio = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio.vue"]]);
const radioButtonProps = buildProps({
  ...radioPropsBase,
  name: {
    type: String,
    default: ""
  }
}), _hoisted_1$k = ["value", "name", "disabled"], __default__$e = {
  name: "ElRadioButton"
}, _sfc_main$A = /* @__PURE__ */ defineComponent({
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
          "onUpdate:modelValue": _e[0] || (_e[0] = (Ve) => isRef(ue) ? ue.value = Ve : null),
          class: normalizeClass(unref(oe).be("button", "original-radio")),
          value: Ce.label,
          type: "radio",
          name: Ce.name || ((Ne = unref(de)) == null ? void 0 : Ne.name),
          disabled: unref(ie),
          onFocus: _e[1] || (_e[1] = (Ve) => ae.value = !0),
          onBlur: _e[2] || (_e[2] = (Ve) => ae.value = !1)
        }, null, 42, _hoisted_1$k), [
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
var RadioButton = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio-button.vue"]]);
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
}), radioGroupEmits = radioEmits, _hoisted_1$j = ["id", "aria-label", "aria-labelledby"], __default__$d = {
  name: "ElRadioGroup"
}, _sfc_main$z = /* @__PURE__ */ defineComponent({
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
      const _e = le.value.querySelectorAll("[type=radio]"), Ne = _e[0];
      !Array.from(_e).some((Ve) => Ve.checked) && Ne && (Ne.tabIndex = 0);
    });
    const Ce = computed(() => oe.name || ae.value);
    return provide(radioGroupKey, reactive({
      ...toRefs(oe),
      changeEvent: pe,
      name: Ce
    })), watch(() => oe.modelValue, () => {
      oe.validateEvent && (ie == null || ie.validate("change").catch((_e) => debugWarn(_e)));
    }), (_e, Ne) => (openBlock(), createElementBlock("div", {
      id: unref(ue),
      ref_key: "radioGroupRef",
      ref: le,
      class: normalizeClass(unref(re).b("group")),
      role: "radiogroup",
      "aria-label": unref(de) ? void 0 : _e.label || "radio-group",
      "aria-labelledby": unref(de) ? unref(ie).labelId : void 0
    }, [
      renderSlot(_e.$slots, "default")
    ], 10, _hoisted_1$j));
  }
});
var RadioGroup = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio-group.vue"]]);
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
const CASCADER_PANEL_INJECTION_KEY = Symbol(), _sfc_main$y = defineComponent({
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
      var ze;
      return (ze = oe.checkedNodes[0]) == null ? void 0 : ze.uid;
    }), de = computed(() => e.node.isDisabled), pe = computed(() => e.node.isLeaf), Ce = computed(() => ie.value && !pe.value || !de.value), _e = computed(() => Ve(oe.expandingNode)), Ne = computed(() => ie.value && oe.checkedNodes.some(Ve)), Ve = (ze) => {
      var Pt;
      const { level: bn, uid: En } = e.node;
      return ((Pt = ze == null ? void 0 : ze.pathNodes[bn - 1]) == null ? void 0 : Pt.uid) === En;
    }, $e = () => {
      _e.value || oe.expandNode(e.node);
    }, he = (ze) => {
      const { node: Pt } = e;
      ze !== Pt.checked && oe.handleCheckChange(Pt, ze);
    }, Oe = () => {
      oe.lazyLoad(e.node, () => {
        pe.value || $e();
      });
    }, xe = (ze) => {
      !ae.value || (Fe(), !pe.value && k("expand", ze));
    }, Fe = () => {
      const { node: ze } = e;
      !Ce.value || ze.loading || (ze.loaded ? $e() : Oe());
    }, Ie = () => {
      ae.value && !pe.value || (pe.value && !de.value && !ie.value && !le.value ? Lt(!0) : Fe());
    }, Ue = (ze) => {
      ie.value ? (he(ze), e.node.loaded && $e()) : Lt(ze);
    }, Lt = (ze) => {
      e.node.loaded ? (he(ze), !ie.value && $e()) : Oe();
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
      inCheckedPath: Ne,
      ns: re,
      handleHoverExpand: xe,
      handleExpand: Fe,
      handleClick: Ie,
      handleCheck: Lt,
      handleSelectCheck: Ue
    };
  }
}), _hoisted_1$i = ["id", "aria-haspopup", "aria-owns", "aria-expanded", "tabindex"], _hoisted_2$e = /* @__PURE__ */ createElementVNode("span", null, null, -1);
function _sfc_render$c(e, k, oe, re, ae, le) {
  const ie = resolveComponent("el-checkbox"), ue = resolveComponent("el-radio"), de = resolveComponent("check"), pe = resolveComponent("el-icon"), Ce = resolveComponent("node-content"), _e = resolveComponent("loading"), Ne = resolveComponent("arrow-right");
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
          createVNode(Ne)
        ]),
        _: 1
      }, 8, ["class"]))
    ], 64))
  ], 42, _hoisted_1$i);
}
var ElCascaderNode = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$c], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/cascader-panel/src/node.vue"]]);
const _sfc_main$x = defineComponent({
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
    const ue = inject(CASCADER_PANEL_INJECTION_KEY), de = ref(null), pe = computed(() => !e.nodes.length), Ce = computed(() => !ue.initialLoaded), _e = computed(() => `cascader-menu-${ae}-${e.index}`), Ne = (Oe) => {
      le = Oe.target;
    }, Ve = (Oe) => {
      if (!(!ue.isHoverMenu || !le || !de.value))
        if (le.contains(Oe.target)) {
          $e();
          const xe = k.vnode.el, { left: Fe } = xe.getBoundingClientRect(), { offsetWidth: Ie, offsetHeight: Ue } = xe, Lt = Oe.clientX - Fe, ze = le.offsetTop, Pt = ze + le.offsetHeight;
          de.value.innerHTML = `
          <path style="pointer-events: auto;" fill="transparent" d="M${Lt} ${ze} L${Ie} 0 V${ze} Z" />
          <path style="pointer-events: auto;" fill="transparent" d="M${Lt} ${Pt} L${Ie} ${Ue} V${Pt} Z" />
        `;
        } else
          ie || (ie = window.setTimeout(he, ue.config.hoverThreshold));
    }, $e = () => {
      !ie || (clearTimeout(ie), ie = null);
    }, he = () => {
      !de.value || (de.value.innerHTML = "", $e());
    };
    return {
      ns: oe,
      panel: ue,
      hoverZone: de,
      isEmpty: pe,
      isLoading: Ce,
      menuId: _e,
      t: re,
      handleExpand: Ne,
      handleMouseMove: Ve,
      clearHoverZone: he
    };
  }
});
function _sfc_render$b(e, k, oe, re, ae, le) {
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
var ElCascaderMenu = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$b], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/cascader-panel/src/menu.vue"]]), ExpandTrigger = /* @__PURE__ */ ((e) => (e.CLICK = "click", e.HOVER = "hover", e))(ExpandTrigger || {});
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
}, _sfc_main$w = defineComponent({
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
    const ue = ref(!0), de = ref([]), pe = ref(null), Ce = ref([]), _e = ref(null), Ne = ref([]), Ve = computed(() => le.value.expandTrigger === ExpandTrigger.HOVER), $e = computed(() => e.renderLabel || oe.default), he = () => {
      const { options: _n } = e, Dt = le.value;
      re = !1, ie = new Store(_n, Dt), Ce.value = [ie.getNodes()], Dt.lazy && isEmpty(e.options) ? (ue.value = !1, Oe(void 0, (At) => {
        At && (ie = new Store(At, Dt), Ce.value = [ie.getNodes()]), ue.value = !0, bn(!1, !0);
      })) : bn(!1, !0);
    }, Oe = (_n, Dt) => {
      const At = le.value;
      _n = _n || new Node({}, At, void 0, !0), _n.loading = !0;
      const vn = (jt) => {
        const Cn = _n, kt = Cn.root ? null : Cn;
        jt && (ie == null || ie.appendNodes(jt, kt)), Cn.loading = !1, Cn.loaded = !0, Cn.childrenData = Cn.childrenData || [], Dt && Dt(jt);
      };
      At.lazyLoad(_n, vn);
    }, xe = (_n, Dt) => {
      var At;
      const { level: vn } = _n, jt = Ce.value.slice(0, vn);
      let Cn;
      _n.isLeaf ? Cn = _n.pathNodes[vn - 2] : (Cn = _n, jt.push(_n.children)), ((At = _e.value) == null ? void 0 : At.uid) !== (Cn == null ? void 0 : Cn.uid) && (_e.value = _n, Ce.value = jt, !Dt && k("expand-change", (_n == null ? void 0 : _n.pathValues) || []));
    }, Fe = (_n, Dt, At = !0) => {
      const { checkStrictly: vn, multiple: jt } = le.value, Cn = Ne.value[0];
      re = !0, !jt && (Cn == null || Cn.doCheck(!1)), _n.doCheck(Dt), Pt(), At && !jt && !vn && k("close"), !At && !jt && !vn && Ie(_n);
    }, Ie = (_n) => {
      !_n || (_n = _n.parent, Ie(_n), _n && xe(_n));
    }, Ue = (_n) => ie == null ? void 0 : ie.getFlattedNodes(_n), Lt = (_n) => {
      var Dt;
      return (Dt = Ue(_n)) == null ? void 0 : Dt.filter((At) => At.checked !== !1);
    }, ze = () => {
      Ne.value.forEach((_n) => _n.doCheck(!1)), Pt();
    }, Pt = () => {
      var _n;
      const { checkStrictly: Dt, multiple: At } = le.value, vn = Ne.value, jt = Lt(!Dt), Cn = sortByOriginalOrder(vn, jt), kt = Cn.map((Et) => Et.valueByOption);
      Ne.value = Cn, pe.value = At ? kt : (_n = kt[0]) != null ? _n : null;
    }, bn = (_n = !1, Dt = !1) => {
      const { modelValue: At } = e, { lazy: vn, multiple: jt, checkStrictly: Cn } = le.value, kt = !Cn;
      if (!(!ue.value || re || !Dt && isEqual(At, pe.value)))
        if (vn && !_n) {
          const wn = unique(flattenDeep(castArray(At))).map((Pn) => ie == null ? void 0 : ie.getNodeByValue(Pn)).filter((Pn) => !!Pn && !Pn.loaded && !Pn.loading);
          wn.length ? wn.forEach((Pn) => {
            Oe(Pn, () => bn(!1, Dt));
          }) : bn(!0, Dt);
        } else {
          const Et = jt ? castArray(At) : [At], wn = unique(Et.map((Pn) => ie == null ? void 0 : ie.getNodeByValue(Pn, kt)));
          En(wn, Dt), pe.value = At;
        }
    }, En = (_n, Dt = !0) => {
      const { checkStrictly: At } = le.value, vn = Ne.value, jt = _n.filter((Et) => !!Et && (At || Et.isLeaf)), Cn = ie == null ? void 0 : ie.getSameNode(_e.value), kt = Dt && Cn || jt[0];
      kt ? kt.pathNodes.forEach((Et) => xe(Et, !0)) : _e.value = null, vn.forEach((Et) => Et.doCheck(!1)), jt.forEach((Et) => Et.doCheck(!0)), Ne.value = jt, nextTick(Tn);
    }, Tn = () => {
      !isClient$1 || de.value.forEach((_n) => {
        const Dt = _n == null ? void 0 : _n.$el;
        if (Dt) {
          const At = Dt.querySelector(`.${ae.namespace.value}-scrollbar__wrap`), vn = Dt.querySelector(`.${ae.b("node")}.${ae.is("active")}`) || Dt.querySelector(`.${ae.b("node")}.in-active-path`);
          scrollIntoView(At, vn);
        }
      });
    }, $n = (_n) => {
      const Dt = _n.target, { code: At } = _n;
      switch (At) {
        case EVENT_CODE.up:
        case EVENT_CODE.down: {
          _n.preventDefault();
          const vn = At === EVENT_CODE.up ? -1 : 1;
          focusNode(getSibling(Dt, vn, `.${ae.b("node")}[tabindex="-1"]`));
          break;
        }
        case EVENT_CODE.left: {
          _n.preventDefault();
          const vn = de.value[getMenuIndex(Dt) - 1], jt = vn == null ? void 0 : vn.$el.querySelector(`.${ae.b("node")}[aria-expanded="true"]`);
          focusNode(jt);
          break;
        }
        case EVENT_CODE.right: {
          _n.preventDefault();
          const vn = de.value[getMenuIndex(Dt) + 1], jt = vn == null ? void 0 : vn.$el.querySelector(`.${ae.b("node")}[tabindex="-1"]`);
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
      expandingNode: _e,
      checkedNodes: Ne,
      isHoverMenu: Ve,
      initialLoaded: ue,
      renderLabelFn: $e,
      lazyLoad: Oe,
      expandNode: xe,
      handleCheckChange: Fe
    })), watch([le, () => e.options], he, {
      deep: !0,
      immediate: !0
    }), watch(() => e.modelValue, () => {
      re = !1, bn();
    }), watch(pe, (_n) => {
      isEqual(_n, e.modelValue) || (k(UPDATE_MODEL_EVENT, _n), k(CHANGE_EVENT, _n));
    }), onBeforeUpdate(() => de.value = []), onMounted(() => !isEmpty(e.modelValue) && bn()), {
      ns: ae,
      menuList: de,
      menus: Ce,
      checkedNodes: Ne,
      handleKeyDown: $n,
      handleCheckChange: Fe,
      getFlattedNodes: Ue,
      getCheckedNodes: Lt,
      clearCheckedNodes: ze,
      calculateCheckedValue: Pt,
      scrollToExpandingNode: Tn
    };
  }
});
function _sfc_render$a(e, k, oe, re, ae, le) {
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
var CascaderPanel = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$a], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/cascader-panel/src/index.vue"]]);
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
}, _sfc_main$v = /* @__PURE__ */ defineComponent({
  ...__default__$c,
  props: tagProps,
  emits: tagEmits,
  setup(e, { emit: k }) {
    const oe = e, re = useSize(), ae = useNamespace("tag"), le = computed(() => {
      const { type: de, hit: pe, effect: Ce, closable: _e, round: Ne } = oe;
      return [
        ae.b(),
        ae.is("closable", _e),
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
var Tag = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/tag/src/tag.vue"]]);
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
}, COMPONENT_NAME$2 = "ElCascader", _sfc_main$u = defineComponent({
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
    const ae = useNamespace("cascader"), le = useNamespace("input"), { t: ie } = useLocale(), ue = inject(formContextKey, {}), de = inject(formItemContextKey, {}), pe = ref(null), Ce = ref(null), _e = ref(null), Ne = ref(null), Ve = ref(null), $e = ref(!1), he = ref(!1), Oe = ref(!1), xe = ref(""), Fe = ref(""), Ie = ref([]), Ue = ref([]), Lt = ref([]), ze = ref(!1), Pt = computed(() => e.disabled || ue.disabled), bn = computed(() => e.placeholder || ie("el.cascader.placeholder")), En = useSize(), Tn = computed(() => ["small"].includes(En.value) ? "small" : "default"), $n = computed(() => !!e.props.multiple), _n = computed(() => !e.filterable || $n.value), Dt = computed(() => $n.value ? Fe.value : xe.value), At = computed(() => {
      var zn;
      return ((zn = Ne.value) == null ? void 0 : zn.checkedNodes) || [];
    }), vn = computed(() => !e.clearable || Pt.value || Oe.value || !he.value ? !1 : !!At.value.length), jt = computed(() => {
      const { showAllLevels: zn, separator: Hn } = e, Gn = At.value;
      return Gn.length ? $n.value ? " " : Gn[0].calcText(zn, Hn) : "";
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
      if (!Pt.value && (zn = zn != null ? zn : !$e.value, zn !== $e.value)) {
        if ($e.value = zn, (Gn = (Hn = Ce.value) == null ? void 0 : Hn.input) == null || Gn.setAttribute("aria-expanded", `${zn}`), zn)
          wn(), nextTick((Zn = Ne.value) == null ? void 0 : Zn.scrollToExpandingNode);
        else if (e.filterable) {
          const { value: lo } = jt;
          xe.value = lo, Fe.value = lo;
        }
        k("visible-change", zn);
      }
    }, wn = () => {
      nextTick(() => {
        var zn;
        (zn = pe.value) == null || zn.updatePopper();
      });
    }, Pn = () => {
      Oe.value = !1;
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
      if (!$n.value)
        return;
      const zn = At.value, Hn = [], Gn = [];
      if (zn.forEach((Zn) => Gn.push(hn(Zn))), Ue.value = Gn, zn.length) {
        const [Zn, ...lo] = zn, ao = lo.length;
        Hn.push(hn(Zn)), ao && (e.collapseTags ? Hn.push({
          key: -1,
          text: `+ ${ao}`,
          closable: !1,
          isCollapseTag: !0
        }) : lo.forEach((xn) => Hn.push(hn(xn))));
      }
      Ie.value = Hn;
    }, Rn = () => {
      var zn, Hn;
      const { filterMethod: Gn, showAllLevels: Zn, separator: lo } = e, ao = (Hn = (zn = Ne.value) == null ? void 0 : zn.getFlattedNodes(!e.props.checkStrictly)) == null ? void 0 : Hn.filter((xn) => xn.isDisabled ? !1 : (xn.calcText(Zn, lo), Gn(xn, Dt.value)));
      $n.value && (Ie.value.forEach((xn) => {
        xn.hitState = !1;
      }), Ue.value.forEach((xn) => {
        xn.hitState = !1;
      })), Oe.value = !0, Lt.value = ao, wn();
    }, Fn = () => {
      var zn;
      let Hn;
      Oe.value && Ve.value ? Hn = Ve.value.$el.querySelector(`.${ae.e("suggestion-item")}`) : Hn = (zn = Ne.value) == null ? void 0 : zn.$el.querySelector(`.${ae.b("node")}[tabindex="-1"]`), Hn && (Hn.focus(), !Oe.value && Hn.click());
    }, Nn = () => {
      var zn, Hn;
      const Gn = (zn = Ce.value) == null ? void 0 : zn.input, Zn = _e.value, lo = (Hn = Ve.value) == null ? void 0 : Hn.$el;
      if (!(!isClient$1 || !Gn)) {
        if (lo) {
          const ao = lo.querySelector(`.${ae.e("suggestion-list")}`);
          ao.style.minWidth = `${Gn.offsetWidth}px`;
        }
        if (Zn) {
          const { offsetHeight: ao } = Zn, xn = Ie.value.length > 0 ? `${Math.max(ao + 6, oe)}px` : `${oe}px`;
          Gn.style.height = xn, wn();
        }
      }
    }, An = (zn) => {
      var Hn;
      return (Hn = Ne.value) == null ? void 0 : Hn.getCheckedNodes(zn);
    }, Vn = (zn) => {
      wn(), k("expand-change", zn);
    }, Bn = (zn) => {
      var Hn;
      const Gn = (Hn = zn.target) == null ? void 0 : Hn.value;
      if (zn.type === "compositionend")
        ze.value = !1, nextTick(() => oo(Gn));
      else {
        const Zn = Gn[Gn.length - 1] || "";
        ze.value = !isKorean(Zn);
      }
    }, Kn = (zn) => {
      if (!ze.value)
        switch (zn.code) {
          case EVENT_CODE.enter:
            Et();
            break;
          case EVENT_CODE.down:
            Et(!0), nextTick(Fn), zn.preventDefault();
            break;
          case EVENT_CODE.esc:
            $e.value === !0 && (zn.preventDefault(), zn.stopPropagation(), Et(!1));
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
      $n.value ? (Hn = Ne.value) == null || Hn.handleCheckChange(zn, !Zn, !1) : (!Zn && ((Gn = Ne.value) == null || Gn.handleCheckChange(zn, !0, !1)), Et(!1));
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
      const zn = Ie.value, Hn = zn[zn.length - 1];
      re = Fe.value ? 0 : re + 1, !(!Hn || !re) && (Hn.hitState ? On(Hn) : Hn.hitState = !0);
    }, no = debounce(() => {
      const { value: zn } = Dt;
      if (!zn)
        return;
      const Hn = e.beforeFilter(zn);
      isPromise(Hn) ? Hn.then(Rn).catch(() => {
      }) : Hn !== !1 ? Rn() : Pn();
    }, e.debounce), oo = (zn, Hn) => {
      !$e.value && Et(!0), !(Hn != null && Hn.isComposing) && (zn ? no() : Pn());
    };
    return watch(Oe, wn), watch([At, Pt], Dn), watch(Ie, () => {
      nextTick(() => Nn());
    }), watch(jt, (zn) => xe.value = zn, { immediate: !0 }), onMounted(() => {
      var zn;
      const Hn = (zn = Ce.value) == null ? void 0 : zn.$el;
      oe = (Hn == null ? void 0 : Hn.offsetHeight) || INPUT_HEIGHT_MAP[En.value] || DEFAULT_INPUT_HEIGHT, useResizeObserver(Hn, Nn);
    }), {
      popperOptions,
      tooltipRef: pe,
      popperPaneRef: kt,
      input: Ce,
      tagWrapper: _e,
      panel: Ne,
      suggestionPanel: Ve,
      popperVisible: $e,
      inputHover: he,
      inputPlaceholder: bn,
      filtering: Oe,
      presentText: jt,
      checkedValue: Cn,
      inputValue: xe,
      searchInputValue: Fe,
      presentTags: Ie,
      allPresentTags: Ue,
      suggestions: Lt,
      isDisabled: Pt,
      isOnComposition: ze,
      realSize: En,
      tagSize: Tn,
      multiple: $n,
      readonly: _n,
      clearBtnVisible: vn,
      nsCascader: ae,
      nsInput: le,
      t: ie,
      togglePopperVisible: Et,
      hideSuggestionPanel: Pn,
      deleteTag: On,
      focusFirstNode: Fn,
      getCheckedNodes: An,
      handleExpandChange: Vn,
      handleKeyDown: Kn,
      handleComposition: Bn,
      handleClear: Yn,
      handleSuggestionClick: Xn,
      handleSuggestionKeyDown: eo,
      handleDelete: qn,
      handleInput: oo
    };
  }
}), _hoisted_1$h = { key: 0 }, _hoisted_2$d = ["placeholder"], _hoisted_3$9 = ["onClick"];
function _sfc_render$9(e, k, oe, re, ae, le) {
  const ie = resolveComponent("circle-close"), ue = resolveComponent("el-icon"), de = resolveComponent("arrow-down"), pe = resolveComponent("el-input"), Ce = resolveComponent("el-tag"), _e = resolveComponent("el-tooltip"), Ne = resolveComponent("el-cascader-panel"), Ve = resolveComponent("check"), $e = resolveComponent("el-scrollbar"), he = resolveDirective("clickoutside");
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
            onClose: (xe) => e.deleteTag(Oe)
          }, {
            default: withCtx(() => [
              Oe.isCollapseTag === !1 ? (openBlock(), createElementBlock("span", _hoisted_1$h, toDisplayString(Oe.text), 1)) : (openBlock(), createBlock(_e, {
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
                    (openBlock(!0), createElementBlock(Fragment, null, renderList(e.allPresentTags, (xe, Fe) => (openBlock(), createElementBlock("div", {
                      key: Fe,
                      class: normalizeClass(e.nsCascader.e("collapse-tag"))
                    }, [
                      (openBlock(), createBlock(Ce, {
                        key: xe.key,
                        class: "in-tooltip",
                        type: e.tagType,
                        size: e.tagSize,
                        hit: xe.hitState,
                        closable: xe.closable,
                        "disable-transitions": "",
                        onClose: (Ie) => e.deleteTag(xe)
                      }, {
                        default: withCtx(() => [
                          createElementVNode("span", null, toDisplayString(xe.text), 1)
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
      withDirectives(createVNode(Ne, {
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
      e.filterable ? withDirectives((openBlock(), createBlock($e, {
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
            onClick: (xe) => e.handleSuggestionClick(Oe)
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
var Cascader = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$9], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/cascader/src/index.vue"]]);
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
}, _sfc_main$t = /* @__PURE__ */ defineComponent({
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
var Col = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/col/src/col.vue"]]);
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
        var Ce = this.$utils(), _e = (ue || "YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g, function(Ne) {
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
        var Ne = ie(this).startOf(re).date(pe).startOf(oe).subtract(1, "millisecond"), Ve = this.diff(Ne, oe, !0);
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
    for (let Ne = 0; Ne < e.column; Ne++) {
      let Ve = _e[Ne + oe];
      Ve || (Ve = {
        row: Ce,
        column: Ne,
        type: "normal",
        inRange: !1,
        start: !1,
        end: !1
      });
      const $e = Ce * e.column + Ne, he = ue($e);
      Ve.dayjs = he, Ve.date = he.toDate(), Ve.timestamp = he.valueOf(), Ve.type = "normal", Ve.inRange = !!(re && he.isSameOrAfter(re, ie) && ae && he.isSameOrBefore(ae, ie)) || !!(re && he.isSameOrBefore(re, ie) && ae && he.isSameOrAfter(ae, ie)), re != null && re.isSameOrAfter(ae) ? (Ve.start = !!ae && he.isSame(ae, ie), Ve.end = re && he.isSame(re, ie)) : (Ve.start = !!re && he.isSame(re, ie), Ve.end = !!ae && he.isSame(ae, ie)), he.isSame(le, ie) && (Ve.type = "today"), de == null || de(Ve, { rowIndex: Ce, columnIndex: Ne }), _e[Ne + oe] = Ve;
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
const _hoisted_1$g = ["aria-label"], _hoisted_2$c = {
  key: 0,
  scope: "col"
}, _hoisted_3$8 = ["aria-label"], _hoisted_4$4 = ["aria-current", "aria-selected", "tabindex"], _sfc_main$s = /* @__PURE__ */ defineComponent({
  __name: "basic-date-table",
  props: basicDateTableProps,
  emits: ["changerange", "pick", "select"],
  setup(e, { expose: k, emit: oe }) {
    const re = e, ae = useNamespace("date-table"), { t: le, lang: ie } = useLocale(), ue = ref(), de = ref(), pe = ref(), Ce = ref(), _e = ref([[], [], [], [], [], []]);
    let Ne = !1;
    const Ve = re.date.$locale().weekStart || 7, $e = re.date.locale("en").localeData().weekdaysShort().map((hn) => hn.toLowerCase()), he = computed(() => Ve > 3 ? 7 - Ve : -Ve), Oe = computed(() => {
      const hn = re.date.startOf("month");
      return hn.subtract(hn.day() || 7, "day");
    }), xe = computed(() => $e.concat($e).slice(Ve, Ve + 7)), Fe = computed(() => bn.value.flat().some((hn) => hn.isCurrent)), Ie = computed(() => {
      const hn = re.date.startOf("month"), On = hn.day() || 7, Dn = hn.daysInMonth(), Rn = hn.subtract(1, "month").daysInMonth();
      return {
        startOfMonthDay: On,
        dateCountOfMonth: Dn,
        dateCountOfLastMonth: Rn
      };
    }), Ue = computed(() => re.selectionMode === "dates" ? castArray(re.parsedValue) : []), Lt = (hn, {
      count: On,
      rowIndex: Dn,
      columnIndex: Rn
    }) => {
      const { startOfMonthDay: Fn, dateCountOfMonth: Nn, dateCountOfLastMonth: An } = unref(Ie), Vn = unref(he);
      if (Dn >= 0 && Dn <= 1) {
        const Bn = Fn + Vn < 0 ? 7 + Fn + Vn : Fn + Vn;
        if (Rn + Dn * 7 >= Bn)
          return hn.text = On, !0;
        hn.text = An - (Bn - Rn % 7) + 1 + Dn * 7, hn.type = "prev-month";
      } else
        return On <= Nn ? hn.text = On : (hn.text = On - Nn, hn.type = "next-month"), !0;
      return !1;
    }, ze = (hn, {
      columnIndex: On,
      rowIndex: Dn
    }, Rn) => {
      const { disabledDate: Fn, cellClassName: Nn } = re, An = unref(Ue), Vn = Lt(hn, { count: Rn, rowIndex: Dn, columnIndex: On }), Bn = hn.dayjs.toDate();
      return hn.selected = An.find((Kn) => Kn.valueOf() === hn.dayjs.valueOf()), hn.isSelected = !!hn.selected, hn.isCurrent = $n(hn), hn.disabled = Fn == null ? void 0 : Fn(Bn), hn.customClass = Nn == null ? void 0 : Nn(Bn), Vn;
    }, Pt = (hn) => {
      if (re.selectionMode === "week") {
        const [On, Dn] = re.showWeekNumber ? [1, 7] : [0, 6], Rn = Pn(hn[On + 1]);
        hn[On].inRange = Rn, hn[On].start = Rn, hn[Dn].inRange = Rn, hn[Dn].end = Rn;
      }
    }, bn = computed(() => {
      const { minDate: hn, maxDate: On, rangeState: Dn, showWeekNumber: Rn } = re, Fn = he.value, Nn = _e.value, An = "day";
      let Vn = 1;
      if (Rn)
        for (let Bn = 0; Bn < 6; Bn++)
          Nn[Bn][0] || (Nn[Bn][0] = {
            type: "week",
            text: Oe.value.add(Bn * 7 + 1, An).week()
          });
      return buildPickerTable({ row: 6, column: 7 }, Nn, {
        startDate: hn,
        columnIndexOffset: Rn ? 1 : 0,
        nextEndDate: Dn.endDate || On || Dn.selecting && hn || null,
        now: dayjs().locale(unref(ie)).startOf(An),
        unit: An,
        relativeDateGetter: (Bn) => Oe.value.add(Bn - Fn, An),
        setCellMetadata: (...Bn) => {
          ze(...Bn, Vn) && (Vn += 1);
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
    }, Tn = (hn = "") => ["normal", "today"].includes(hn), $n = (hn) => re.selectionMode === "date" && Tn(hn.type) && _n(hn, re.parsedValue), _n = (hn, On) => On ? dayjs(On).locale(ie.value).isSame(re.date.date(Number(hn.text)), "day") : !1, Dt = (hn) => {
      const On = [];
      return Tn(hn.type) && !hn.disabled ? (On.push("available"), hn.type === "today" && On.push("today")) : On.push(hn.type), $n(hn) && On.push("current"), hn.inRange && (Tn(hn.type) || re.selectionMode === "week") && (On.push("in-range"), hn.start && On.push("start-date"), hn.end && On.push("end-date")), hn.disabled && On.push("disabled"), hn.selected && On.push("selected"), hn.customClass && On.push(hn.customClass), On.join(" ");
    }, At = (hn, On) => {
      const Dn = hn * 7 + (On - (re.showWeekNumber ? 1 : 0)) - he.value;
      return Oe.value.add(Dn, "day");
    }, vn = (hn) => {
      var On;
      if (!re.rangeState.selecting)
        return;
      let Dn = hn.target;
      if (Dn.tagName === "SPAN" && (Dn = (On = Dn.parentNode) == null ? void 0 : On.parentNode), Dn.tagName === "DIV" && (Dn = Dn.parentNode), Dn.tagName !== "TD")
        return;
      const Rn = Dn.parentNode.rowIndex - 1, Fn = Dn.cellIndex;
      bn.value[Rn][Fn].disabled || (Rn !== pe.value || Fn !== Ce.value) && (pe.value = Rn, Ce.value = Fn, oe("changerange", {
        selecting: !0,
        endDate: At(Rn, Fn)
      }));
    }, jt = (hn) => !Fe.value && (hn == null ? void 0 : hn.text) === 1 && hn.type === "normal" || hn.isCurrent, Cn = (hn) => {
      Ne || Fe.value || re.selectionMode !== "date" || wn(hn, !0);
    }, kt = (hn) => {
      !hn.target.closest("td") || (Ne = !0);
    }, Et = (hn) => {
      !hn.target.closest("td") || (Ne = !1);
    }, wn = (hn, On = !1) => {
      const Dn = hn.target.closest("td");
      if (!Dn)
        return;
      const Rn = Dn.parentNode.rowIndex - 1, Fn = Dn.cellIndex, Nn = bn.value[Rn][Fn];
      if (Nn.disabled || Nn.type === "week")
        return;
      const An = At(Rn, Fn);
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
        const Vn = Nn.selected ? castArray(re.parsedValue).filter((Bn) => (Bn == null ? void 0 : Bn.valueOf()) !== An.valueOf()) : castArray(re.parsedValue).concat([An]);
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
      onClick: wn,
      onMousemove: vn,
      onMousedown: kt,
      onMouseup: Et
    }, [
      createElementVNode("tbody", {
        ref_key: "tbodyRef",
        ref: ue
      }, [
        createElementVNode("tr", null, [
          hn.showWeekNumber ? (openBlock(), createElementBlock("th", _hoisted_2$c, toDisplayString(unref(le)("el.datepicker.week")), 1)) : createCommentVNode("v-if", !0),
          (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(xe), (Dn, Rn) => (openBlock(), createElementBlock("th", {
            key: Rn,
            scope: "col",
            "aria-label": unref(le)("el.datepicker.weeksFull." + Dn)
          }, toDisplayString(unref(le)("el.datepicker.weeks." + Dn)), 9, _hoisted_3$8))), 128))
        ]),
        (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(bn), (Dn, Rn) => (openBlock(), createElementBlock("tr", {
          key: Rn,
          class: normalizeClass([unref(ae).e("row"), { current: Pn(Dn[1]) }])
        }, [
          (openBlock(!0), createElementBlock(Fragment, null, renderList(Dn, (Fn, Nn) => (openBlock(), createElementBlock("td", {
            key: `${Rn}.${Nn}`,
            ref_for: !0,
            ref: (An) => jt(Fn) && (de.value = An),
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
    ], 42, _hoisted_1$g));
  }
});
var DateTable = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/date-picker/src/date-picker-com/basic-date-table.vue"]]);
const basicMonthTableProps = buildProps({
  ...datePickerSharedProps,
  selectionMode: selectionModeWithDefault("month")
}), _hoisted_1$f = ["aria-label"], _hoisted_2$b = ["aria-selected", "aria-label", "tabindex", "onKeydown"], _hoisted_3$7 = { class: "cell" }, _sfc_main$r = /* @__PURE__ */ defineComponent({
  __name: "basic-month-table",
  props: basicMonthTableProps,
  emits: ["changerange", "pick", "select"],
  setup(e, { expose: k, emit: oe }) {
    const re = e, ae = (Ue, Lt, ze) => {
      const Pt = dayjs().locale(ze).startOf("month").month(Lt).year(Ue), bn = Pt.daysInMonth();
      return rangeArr(bn).map((En) => Pt.add(En, "day").toDate());
    }, le = useNamespace("month-table"), { t: ie, lang: ue } = useLocale(), de = ref(), pe = ref(), Ce = ref(re.date.locale("en").localeData().monthsShort().map((Ue) => Ue.toLowerCase())), _e = ref([
      [],
      [],
      []
    ]), Ne = ref(), Ve = ref(), $e = computed(() => {
      var Ue, Lt;
      const ze = _e.value, Pt = dayjs().locale(ue.value).startOf("month");
      for (let bn = 0; bn < 3; bn++) {
        const En = ze[bn];
        for (let Tn = 0; Tn < 4; Tn++) {
          const $n = En[Tn] || (En[Tn] = {
            row: bn,
            column: Tn,
            type: "normal",
            inRange: !1,
            start: !1,
            end: !1,
            text: -1,
            disabled: !1
          });
          $n.type = "normal";
          const _n = bn * 4 + Tn, Dt = re.date.startOf("year").month(_n), At = re.rangeState.endDate || re.maxDate || re.rangeState.selecting && re.minDate || null;
          $n.inRange = !!(re.minDate && Dt.isSameOrAfter(re.minDate, "month") && At && Dt.isSameOrBefore(At, "month")) || !!(re.minDate && Dt.isSameOrBefore(re.minDate, "month") && At && Dt.isSameOrAfter(At, "month")), (Ue = re.minDate) != null && Ue.isSameOrAfter(At) ? ($n.start = !!(At && Dt.isSame(At, "month")), $n.end = re.minDate && Dt.isSame(re.minDate, "month")) : ($n.start = !!(re.minDate && Dt.isSame(re.minDate, "month")), $n.end = !!(At && Dt.isSame(At, "month"))), Pt.isSame(Dt) && ($n.type = "today"), $n.text = _n, $n.disabled = ((Lt = re.disabledDate) == null ? void 0 : Lt.call(re, Dt.toDate())) || !1;
        }
      }
      return ze;
    }), he = () => {
      var Ue;
      (Ue = pe.value) == null || Ue.focus();
    }, Oe = (Ue) => {
      const Lt = {}, ze = re.date.year(), Pt = new Date(), bn = Ue.text;
      return Lt.disabled = re.disabledDate ? ae(ze, bn, ue.value).every(re.disabledDate) : !1, Lt.current = castArray(re.parsedValue).findIndex((En) => dayjs.isDayjs(En) && En.year() === ze && En.month() === bn) >= 0, Lt.today = Pt.getFullYear() === ze && Pt.getMonth() === bn, Ue.inRange && (Lt["in-range"] = !0, Ue.start && (Lt["start-date"] = !0), Ue.end && (Lt["end-date"] = !0)), Lt;
    }, xe = (Ue) => {
      const Lt = re.date.year(), ze = Ue.text;
      return castArray(re.date).findIndex((Pt) => Pt.year() === Lt && Pt.month() === ze) >= 0;
    }, Fe = (Ue) => {
      var Lt;
      if (!re.rangeState.selecting)
        return;
      let ze = Ue.target;
      if (ze.tagName === "A" && (ze = (Lt = ze.parentNode) == null ? void 0 : Lt.parentNode), ze.tagName === "DIV" && (ze = ze.parentNode), ze.tagName !== "TD")
        return;
      const Pt = ze.parentNode.rowIndex, bn = ze.cellIndex;
      $e.value[Pt][bn].disabled || (Pt !== Ne.value || bn !== Ve.value) && (Ne.value = Pt, Ve.value = bn, oe("changerange", {
        selecting: !0,
        endDate: re.date.startOf("year").month(Pt * 4 + bn)
      }));
    }, Ie = (Ue) => {
      var Lt;
      const ze = (Lt = Ue.target) == null ? void 0 : Lt.closest("td");
      if ((ze == null ? void 0 : ze.tagName) !== "TD" || hasClass$1(ze, "disabled"))
        return;
      const Pt = ze.cellIndex, En = ze.parentNode.rowIndex * 4 + Pt, Tn = re.date.startOf("year").month(En);
      re.selectionMode === "range" ? re.rangeState.selecting ? (re.minDate && Tn >= re.minDate ? oe("pick", { minDate: re.minDate, maxDate: Tn }) : oe("pick", { minDate: Tn, maxDate: re.minDate }), oe("select", !1)) : (oe("pick", { minDate: Tn, maxDate: null }), oe("select", !0)) : oe("pick", En);
    };
    return watch(() => re.date, async () => {
      var Ue, Lt;
      (Ue = de.value) != null && Ue.contains(document.activeElement) && (await nextTick(), (Lt = pe.value) == null || Lt.focus());
    }), k({
      focus: he
    }), (Ue, Lt) => (openBlock(), createElementBlock("table", {
      role: "grid",
      "aria-label": unref(ie)("el.datepicker.monthTablePrompt"),
      class: normalizeClass(unref(le).b()),
      onClick: Ie,
      onMousemove: Fe
    }, [
      createElementVNode("tbody", {
        ref_key: "tbodyRef",
        ref: de
      }, [
        (openBlock(!0), createElementBlock(Fragment, null, renderList(unref($e), (ze, Pt) => (openBlock(), createElementBlock("tr", { key: Pt }, [
          (openBlock(!0), createElementBlock(Fragment, null, renderList(ze, (bn, En) => (openBlock(), createElementBlock("td", {
            key: En,
            ref_for: !0,
            ref: (Tn) => xe(bn) && (pe.value = Tn),
            class: normalizeClass(Oe(bn)),
            "aria-selected": `${xe(bn)}`,
            "aria-label": unref(ie)(`el.datepicker.month${+bn.text + 1}`),
            tabindex: xe(bn) ? 0 : -1,
            onKeydown: [
              withKeys(withModifiers(Ie, ["prevent", "stop"]), ["space"]),
              withKeys(withModifiers(Ie, ["prevent", "stop"]), ["enter"])
            ]
          }, [
            createElementVNode("div", null, [
              createElementVNode("span", _hoisted_3$7, toDisplayString(unref(ie)("el.datepicker.months." + Ce.value[bn.text])), 1)
            ])
          ], 42, _hoisted_2$b))), 128))
        ]))), 128))
      ], 512)
    ], 42, _hoisted_1$f));
  }
});
var MonthTable = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/date-picker/src/date-picker-com/basic-month-table.vue"]]);
const { date: date$1, disabledDate, parsedValue } = datePickerSharedProps, basicYearTableProps = buildProps({
  date: date$1,
  disabledDate,
  parsedValue
}), _hoisted_1$e = ["aria-label"], _hoisted_2$a = ["aria-selected", "tabindex", "onKeydown"], _hoisted_3$6 = { class: "cell" }, _hoisted_4$3 = { key: 1 }, _sfc_main$q = /* @__PURE__ */ defineComponent({
  __name: "basic-year-table",
  props: basicYearTableProps,
  emits: ["pick"],
  setup(e, { expose: k, emit: oe }) {
    const re = e, ae = (he, Oe) => {
      const xe = dayjs(String(he)).locale(Oe).startOf("year"), Ie = xe.endOf("year").dayOfYear();
      return rangeArr(Ie).map((Ue) => xe.add(Ue, "day").toDate());
    }, le = useNamespace("year-table"), { t: ie, lang: ue } = useLocale(), de = ref(), pe = ref(), Ce = computed(() => Math.floor(re.date.year() / 10) * 10), _e = () => {
      var he;
      (he = pe.value) == null || he.focus();
    }, Ne = (he) => {
      const Oe = {}, xe = dayjs().locale(ue.value);
      return Oe.disabled = re.disabledDate ? ae(he, ue.value).every(re.disabledDate) : !1, Oe.current = castArray(re.parsedValue).findIndex((Fe) => Fe.year() === he) >= 0, Oe.today = xe.year() === he, Oe;
    }, Ve = (he) => he === Ce.value && re.date.year() < Ce.value && re.date.year() > Ce.value + 9 || castArray(re.date).findIndex((Oe) => Oe.year() === he) >= 0, $e = (he) => {
      const xe = he.target.closest("td");
      if (xe) {
        if (hasClass$1(xe, "disabled"))
          return;
        const Fe = xe.textContent || xe.innerText;
        oe("pick", Number(Fe));
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
      onClick: $e
    }, [
      createElementVNode("tbody", {
        ref_key: "tbodyRef",
        ref: de
      }, [
        (openBlock(), createElementBlock(Fragment, null, renderList(3, (xe, Fe) => createElementVNode("tr", { key: Fe }, [
          (openBlock(), createElementBlock(Fragment, null, renderList(4, (Ie, Ue) => (openBlock(), createElementBlock(Fragment, {
            key: Fe + "_" + Ue
          }, [
            Fe * 4 + Ue < 10 ? (openBlock(), createElementBlock("td", {
              key: 0,
              ref_for: !0,
              ref: (Lt) => Ve(unref(Ce) + Fe * 4 + Ue) && (pe.value = Lt),
              class: normalizeClass(["available", Ne(unref(Ce) + Fe * 4 + Ue)]),
              "aria-selected": `${Ve(unref(Ce) + Fe * 4 + Ue)}`,
              tabindex: Ve(unref(Ce) + Fe * 4 + Ue) ? 0 : -1,
              onKeydown: [
                withKeys(withModifiers($e, ["prevent", "stop"]), ["space"]),
                withKeys(withModifiers($e, ["prevent", "stop"]), ["enter"])
              ]
            }, [
              createElementVNode("span", _hoisted_3$6, toDisplayString(unref(Ce) + Fe * 4 + Ue), 1)
            ], 42, _hoisted_2$a)) : (openBlock(), createElementBlock("td", _hoisted_4$3))
          ], 64))), 64))
        ])), 64))
      ], 512)
    ], 10, _hoisted_1$e));
  }
});
var YearTable = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/date-picker/src/date-picker-com/basic-year-table.vue"]]);
const _hoisted_1$d = ["onClick"], _hoisted_2$9 = ["aria-label"], _hoisted_3$5 = ["aria-label"], _hoisted_4$2 = ["aria-label"], _hoisted_5$2 = ["aria-label"], _sfc_main$p = /* @__PURE__ */ defineComponent({
  __name: "panel-date-pick",
  props: panelDatePickProps,
  emits: ["pick", "set-picker-option", "panel-change"],
  setup(e, { emit: k }) {
    const oe = e, re = (kn, Mn, qe) => !0, ae = useNamespace("picker-panel"), le = useNamespace("date-picker"), ie = useAttrs$1(), ue = useSlots(), { t: de, lang: pe } = useLocale(), Ce = inject("EP_PICKER_BASE"), _e = inject(TOOLTIP_INJECTION_KEY), { shortcuts: Ne, disabledDate: Ve, cellClassName: $e, defaultTime: he, arrowControl: Oe } = Ce.props, xe = toRef(Ce.props, "defaultValue"), Fe = ref(), Ie = ref(dayjs().locale(pe.value)), Ue = computed(() => dayjs(he).locale(pe.value)), Lt = computed(() => Ie.value.month()), ze = computed(() => Ie.value.year()), Pt = ref([]), bn = ref(null), En = ref(null), Tn = (kn) => Pt.value.length > 0 ? re(kn, Pt.value, oe.format || "HH:mm:ss") : !0, $n = (kn) => he && !Kn.value ? Ue.value.year(kn.year()).month(kn.month()).date(kn.date()) : Rn.value ? kn.millisecond(0) : kn.startOf("day"), _n = (kn, ...Mn) => {
      if (!kn)
        k("pick", kn, ...Mn);
      else if (isArray(kn)) {
        const qe = kn.map($n);
        k("pick", qe, ...Mn);
      } else
        k("pick", $n(kn), ...Mn);
      bn.value = null, En.value = null;
    }, Dt = (kn, Mn) => {
      if (Et.value === "date") {
        kn = kn;
        let qe = oe.parsedValue ? oe.parsedValue.year(kn.year()).month(kn.month()).date(kn.date()) : kn;
        Tn(qe) || (qe = Pt.value[0][0].year(kn.year()).month(kn.month()).date(kn.date())), Ie.value = qe, _n(qe, Rn.value || Mn);
      } else
        Et.value === "week" ? _n(kn.date) : Et.value === "dates" && _n(kn, !0);
    }, At = (kn) => {
      const Mn = kn ? "add" : "subtract";
      Ie.value = Ie.value[Mn](1, "month"), ro("month");
    }, vn = (kn) => {
      const Mn = Ie.value, qe = kn ? "add" : "subtract";
      Ie.value = jt.value === "year" ? Mn[qe](10, "year") : Mn[qe](1, "year"), ro("year");
    }, jt = ref("date"), Cn = computed(() => {
      const kn = de("el.datepicker.year");
      if (jt.value === "year") {
        const Mn = Math.floor(ze.value / 10) * 10;
        return kn ? `${Mn} ${kn} - ${Mn + 9} ${kn}` : `${Mn} - ${Mn + 9}`;
      }
      return `${ze.value} ${kn}`;
    }), kt = (kn) => {
      const Mn = isFunction(kn.value) ? kn.value() : kn.value;
      if (Mn) {
        _n(dayjs(Mn).locale(pe.value));
        return;
      }
      kn.onClick && kn.onClick({
        attrs: ie,
        slots: ue,
        emit: k
      });
    }, Et = computed(() => {
      const { type: kn } = oe;
      return ["week", "month", "year", "dates"].includes(kn) ? kn : "date";
    }), wn = computed(() => Et.value === "date" ? jt.value : Et.value), Pn = computed(() => !!Ne.length), hn = async (kn) => {
      Ie.value = Ie.value.startOf("month").month(kn), Et.value === "month" ? _n(Ie.value, !1) : (jt.value = "date", ["month", "year", "date", "week"].includes(Et.value) && (_n(Ie.value, !0), await nextTick(), xn())), ro("month");
    }, On = async (kn) => {
      Et.value === "year" ? (Ie.value = Ie.value.startOf("year").year(kn), _n(Ie.value, !1)) : (Ie.value = Ie.value.year(kn), jt.value = "month", ["month", "year", "date", "week"].includes(Et.value) && (_n(Ie.value, !0), await nextTick(), xn())), ro("year");
    }, Dn = async (kn) => {
      jt.value = kn, await nextTick(), xn();
    }, Rn = computed(() => oe.type === "datetime" || oe.type === "datetimerange"), Fn = computed(() => Rn.value || Et.value === "dates"), Nn = () => {
      if (Et.value === "dates")
        _n(oe.parsedValue);
      else {
        let kn = oe.parsedValue;
        if (!kn) {
          const Mn = dayjs(he).locale(pe.value), qe = ao();
          kn = Mn.year(qe.year()).month(qe.month()).date(qe.date());
        }
        Ie.value = kn, _n(kn);
      }
    }, An = () => {
      const Mn = dayjs().locale(pe.value).toDate();
      (!Ve || !Ve(Mn)) && Tn(Mn) && (Ie.value = dayjs().locale(pe.value), _n(Ie.value));
    }, Vn = computed(() => extractTimeFormat(oe.format)), Bn = computed(() => extractDateFormat(oe.format)), Kn = computed(() => {
      if (En.value)
        return En.value;
      if (!(!oe.parsedValue && !xe.value))
        return (oe.parsedValue || Ie.value).format(Vn.value);
    }), Yn = computed(() => {
      if (bn.value)
        return bn.value;
      if (!(!oe.parsedValue && !xe.value))
        return (oe.parsedValue || Ie.value).format(Bn.value);
    }), Xn = ref(!1), eo = () => {
      Xn.value = !0;
    }, qn = () => {
      Xn.value = !1;
    }, no = (kn) => ({
      hour: kn.hour(),
      minute: kn.minute(),
      second: kn.second(),
      year: kn.year(),
      month: kn.month(),
      date: kn.date()
    }), oo = (kn, Mn, qe) => {
      const { hour: Sn, minute: In, second: jn } = no(kn), Ln = oe.parsedValue ? oe.parsedValue.hour(Sn).minute(In).second(jn) : kn;
      Ie.value = Ln, _n(Ie.value, !0), qe || (Xn.value = Mn);
    }, zn = (kn) => {
      const Mn = dayjs(kn, Vn.value).locale(pe.value);
      if (Mn.isValid() && Tn(Mn)) {
        const { year: qe, month: Sn, date: In } = no(Ie.value);
        Ie.value = Mn.year(qe).month(Sn).date(In), En.value = null, Xn.value = !1, _n(Ie.value, !0);
      }
    }, Hn = (kn) => {
      const Mn = dayjs(kn, Bn.value).locale(pe.value);
      if (Mn.isValid()) {
        if (Ve && Ve(Mn.toDate()))
          return;
        const { hour: qe, minute: Sn, second: In } = no(Ie.value);
        Ie.value = Mn.hour(qe).minute(Sn).second(In), bn.value = null, _n(Ie.value, !0);
      }
    }, Gn = (kn) => dayjs.isDayjs(kn) && kn.isValid() && (Ve ? !Ve(kn.toDate()) : !0), Zn = (kn) => Et.value === "dates" ? kn.map((Mn) => Mn.format(oe.format)) : kn.format(oe.format), lo = (kn) => dayjs(kn, oe.format).locale(pe.value), ao = () => {
      const kn = dayjs(xe.value).locale(pe.value);
      if (!xe.value) {
        const Mn = Ue.value;
        return dayjs().hour(Mn.hour()).minute(Mn.minute()).second(Mn.second()).locale(pe.value);
      }
      return kn;
    }, xn = async () => {
      var kn;
      ["week", "month", "year", "date"].includes(Et.value) && ((kn = Fe.value) == null || kn.focus(), Et.value === "week" && Qn(EVENT_CODE.down));
    }, Jn = (kn) => {
      const { code: Mn } = kn;
      [
        EVENT_CODE.up,
        EVENT_CODE.down,
        EVENT_CODE.left,
        EVENT_CODE.right,
        EVENT_CODE.home,
        EVENT_CODE.end,
        EVENT_CODE.pageUp,
        EVENT_CODE.pageDown
      ].includes(Mn) && (Qn(Mn), kn.stopPropagation(), kn.preventDefault()), [EVENT_CODE.enter, EVENT_CODE.space].includes(Mn) && bn.value === null && En.value === null && (kn.preventDefault(), _n(Ie.value, !1));
    }, Qn = (kn) => {
      var Mn;
      const { up: qe, down: Sn, left: In, right: jn, home: Ln, end: Wn, pageUp: Un, pageDown: uo } = EVENT_CODE, io = {
        year: {
          [qe]: -4,
          [Sn]: 4,
          [In]: -1,
          [jn]: 1,
          offset: (to, co) => to.setFullYear(to.getFullYear() + co)
        },
        month: {
          [qe]: -4,
          [Sn]: 4,
          [In]: -1,
          [jn]: 1,
          offset: (to, co) => to.setMonth(to.getMonth() + co)
        },
        week: {
          [qe]: -1,
          [Sn]: 1,
          [In]: -1,
          [jn]: 1,
          offset: (to, co) => to.setDate(to.getDate() + co * 7)
        },
        date: {
          [qe]: -7,
          [Sn]: 7,
          [In]: -1,
          [jn]: 1,
          [Ln]: (to) => -to.getDay(),
          [Wn]: (to) => -to.getDay() + 6,
          [Un]: (to) => -new Date(to.getFullYear(), to.getMonth(), 0).getDate(),
          [uo]: (to) => new Date(to.getFullYear(), to.getMonth() + 1, 0).getDate(),
          offset: (to, co) => to.setDate(to.getDate() + co)
        }
      }, so = Ie.value.toDate();
      for (; Math.abs(Ie.value.diff(so, "year", !0)) < 1; ) {
        const to = io[wn.value];
        if (!to)
          return;
        if (to.offset(so, isFunction(to[kn]) ? to[kn](so) : (Mn = to[kn]) != null ? Mn : 0), Ve && Ve(so))
          break;
        const co = dayjs(so).locale(pe.value);
        Ie.value = co, k("pick", co, !0);
        break;
      }
    }, ro = (kn) => {
      k("panel-change", Ie.value.toDate(), kn, jt.value);
    };
    return watch(() => Et.value, (kn) => {
      if (["month", "year"].includes(kn)) {
        jt.value = kn;
        return;
      }
      jt.value = "date";
    }, { immediate: !0 }), watch(() => jt.value, () => {
      _e == null || _e.updatePopper();
    }), watch(() => xe.value, (kn) => {
      kn && (Ie.value = ao());
    }, { immediate: !0 }), watch(() => oe.parsedValue, (kn) => {
      if (kn) {
        if (Et.value === "dates" || Array.isArray(kn))
          return;
        Ie.value = kn;
      } else
        Ie.value = ao();
    }, { immediate: !0 }), k("set-picker-option", ["isValidValue", Gn]), k("set-picker-option", ["formatToString", Zn]), k("set-picker-option", ["parseUserInput", lo]), k("set-picker-option", ["handleFocusPicker", xn]), (kn, Mn) => (openBlock(), createElementBlock("div", {
      class: normalizeClass([
        unref(ae).b(),
        unref(le).b(),
        {
          "has-sidebar": kn.$slots.sidebar || unref(Pn),
          "has-time": unref(Rn)
        }
      ])
    }, [
      createElementVNode("div", {
        class: normalizeClass(unref(ae).e("body-wrapper"))
      }, [
        renderSlot(kn.$slots, "sidebar", {
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
            onClick: (In) => kt(qe)
          }, toDisplayString(qe.text), 11, _hoisted_1$d))), 128))
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
                onInput: Mn[0] || (Mn[0] = (qe) => bn.value = qe),
                onChange: Hn
              }, null, 8, ["placeholder", "model-value"])
            ], 2),
            withDirectives((openBlock(), createElementBlock("span", {
              class: normalizeClass(unref(le).e("editor-wrap"))
            }, [
              createVNode(unref(ElInput), {
                placeholder: unref(de)("el.datepicker.selectTime"),
                "model-value": unref(Kn),
                size: "small",
                onFocus: eo,
                onInput: Mn[1] || (Mn[1] = (qe) => En.value = qe),
                onChange: zn
              }, null, 8, ["placeholder", "model-value"]),
              createVNode(unref(TimePickPanel), {
                visible: Xn.value,
                format: unref(Vn),
                "time-arrow-control": unref(Oe),
                "parsed-value": Ie.value,
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
                onClick: Mn[2] || (Mn[2] = (qe) => vn(!1))
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
                onClick: Mn[3] || (Mn[3] = (qe) => At(!1))
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
            }, toDisplayString(unref(de)(`el.datepicker.month${unref(Lt) + 1}`)), 35), [
              [vShow, jt.value === "date"]
            ]),
            createElementVNode("span", {
              class: normalizeClass(unref(le).e("next-btn"))
            }, [
              withDirectives(createElementVNode("button", {
                type: "button",
                "aria-label": unref(de)("el.datepicker.nextMonth"),
                class: normalizeClass([unref(ae).e("icon-btn"), "arrow-right"]),
                onClick: Mn[8] || (Mn[8] = (qe) => At(!0))
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
                onClick: Mn[9] || (Mn[9] = (qe) => vn(!0))
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
              ref: Fe,
              "selection-mode": unref(Et),
              date: Ie.value,
              "parsed-value": kn.parsedValue,
              "disabled-date": unref(Ve),
              "cell-class-name": unref($e),
              onPick: Dt
            }, null, 8, ["selection-mode", "date", "parsed-value", "disabled-date", "cell-class-name"])) : createCommentVNode("v-if", !0),
            jt.value === "year" ? (openBlock(), createBlock(YearTable, {
              key: 1,
              ref_key: "currentViewRef",
              ref: Fe,
              date: Ie.value,
              "disabled-date": unref(Ve),
              "parsed-value": kn.parsedValue,
              onPick: On
            }, null, 8, ["date", "disabled-date", "parsed-value"])) : createCommentVNode("v-if", !0),
            jt.value === "month" ? (openBlock(), createBlock(MonthTable, {
              key: 2,
              ref_key: "currentViewRef",
              ref: Fe,
              date: Ie.value,
              "parsed-value": kn.parsedValue,
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
var DatePickPanel = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/date-picker/src/date-picker-com/panel-date-pick.vue"]]);
const panelDateRangeProps = buildProps({
  ...panelSharedProps,
  ...panelRangeSharedProps
}), useShortcut = (e) => {
  const { emit: k } = getCurrentInstance(), oe = useAttrs$1(), re = useSlots();
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
  const { emit: ie } = getCurrentInstance(), { pickerNs: ue } = inject(ROOT_PICKER_INJECTION_KEY), de = useNamespace("date-range-picker"), { t: pe, lang: Ce } = useLocale(), _e = useShortcut(Ce), Ne = ref(), Ve = ref(), $e = ref({
    endDate: null,
    selecting: !1
  }), he = (Ie) => {
    $e.value = Ie;
  }, Oe = (Ie = !1) => {
    const Ue = unref(Ne), Lt = unref(Ve);
    isValidRange([Ue, Lt]) && ie("pick", [Ue, Lt], Ie);
  }, xe = (Ie) => {
    $e.value.selecting = Ie, Ie || ($e.value.endDate = null);
  }, Fe = () => {
    const [Ie, Ue] = getDefaultValue(unref(k), {
      lang: unref(Ce),
      unit: ae,
      unlinkPanels: e.unlinkPanels
    });
    Ne.value = void 0, Ve.value = void 0, oe.value = Ie, re.value = Ue;
  };
  return watch(k, (Ie) => {
    Ie && Fe();
  }, { immediate: !0 }), watch(() => e.parsedValue, (Ie) => {
    if (isArray(Ie) && Ie.length === 2) {
      const [Ue, Lt] = Ie;
      Ne.value = Ue, oe.value = Ue, Ve.value = Lt, le(unref(Ne), unref(Ve));
    } else
      Fe();
  }, { immediate: !0 }), {
    minDate: Ne,
    maxDate: Ve,
    rangeState: $e,
    lang: Ce,
    ppNs: ue,
    drpNs: de,
    handleChangeRange: he,
    handleRangeConfirm: Oe,
    handleShortcutClick: _e,
    onSelect: xe,
    t: pe
  };
}, _hoisted_1$c = ["onClick"], _hoisted_2$8 = ["disabled"], _hoisted_3$4 = ["disabled"], _hoisted_4$1 = ["disabled"], _hoisted_5$1 = ["disabled"], _sfc_main$o = /* @__PURE__ */ defineComponent({
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
    } = ae.props, _e = toRef(ae.props, "shortcuts"), Ne = toRef(ae.props, "defaultValue"), { lang: Ve } = useLocale(), $e = ref(dayjs().locale(Ve.value)), he = ref(dayjs().locale(Ve.value).add(1, re)), {
      minDate: Oe,
      maxDate: xe,
      rangeState: Fe,
      ppNs: Ie,
      drpNs: Ue,
      handleChangeRange: Lt,
      handleRangeConfirm: ze,
      handleShortcutClick: Pt,
      onSelect: bn,
      t: En
    } = useRangePicker(oe, {
      defaultValue: Ne,
      leftDate: $e,
      rightDate: he,
      unit: re,
      onParsedValueChanged: jn
    }), Tn = ref({
      min: null,
      max: null
    }), $n = ref({
      min: null,
      max: null
    }), _n = computed(() => `${$e.value.year()} ${En("el.datepicker.year")} ${En(`el.datepicker.month${$e.value.month() + 1}`)}`), Dt = computed(() => `${he.value.year()} ${En("el.datepicker.year")} ${En(`el.datepicker.month${he.value.month() + 1}`)}`), At = computed(() => $e.value.year()), vn = computed(() => $e.value.month()), jt = computed(() => he.value.year()), Cn = computed(() => he.value.month()), kt = computed(() => !!_e.value.length), Et = computed(() => Tn.value.min !== null ? Tn.value.min : Oe.value ? Oe.value.format(Dn.value) : ""), wn = computed(() => Tn.value.max !== null ? Tn.value.max : xe.value || Oe.value ? (xe.value || Oe.value).format(Dn.value) : ""), Pn = computed(() => $n.value.min !== null ? $n.value.min : Oe.value ? Oe.value.format(On.value) : ""), hn = computed(() => $n.value.max !== null ? $n.value.max : xe.value || Oe.value ? (xe.value || Oe.value).format(On.value) : ""), On = computed(() => extractTimeFormat(ue)), Dn = computed(() => extractDateFormat(ue)), Rn = () => {
      $e.value = $e.value.subtract(1, "year"), oe.unlinkPanels || (he.value = $e.value.add(1, "month")), Xn("year");
    }, Fn = () => {
      $e.value = $e.value.subtract(1, "month"), oe.unlinkPanels || (he.value = $e.value.add(1, "month")), Xn("month");
    }, Nn = () => {
      oe.unlinkPanels ? he.value = he.value.add(1, "year") : ($e.value = $e.value.add(1, "year"), he.value = $e.value.add(1, "month")), Xn("year");
    }, An = () => {
      oe.unlinkPanels ? he.value = he.value.add(1, "month") : ($e.value = $e.value.add(1, "month"), he.value = $e.value.add(1, "month")), Xn("month");
    }, Vn = () => {
      $e.value = $e.value.add(1, "year"), Xn("year");
    }, Bn = () => {
      $e.value = $e.value.add(1, "month"), Xn("month");
    }, Kn = () => {
      he.value = he.value.subtract(1, "year"), Xn("year");
    }, Yn = () => {
      he.value = he.value.subtract(1, "month"), Xn("month");
    }, Xn = (Ln) => {
      k("panel-change", [$e.value.toDate(), he.value.toDate()], Ln);
    }, eo = computed(() => {
      const Ln = (vn.value + 1) % 12, Wn = vn.value + 1 >= 12 ? 1 : 0;
      return oe.unlinkPanels && new Date(At.value + Wn, Ln) < new Date(jt.value, Cn.value);
    }), qn = computed(() => oe.unlinkPanels && jt.value * 12 + Cn.value - (At.value * 12 + vn.value + 1) >= 12), no = computed(() => !(Oe.value && xe.value && !Fe.value.selecting && isValidRange([Oe.value, xe.value]))), oo = computed(() => oe.type === "datetime" || oe.type === "datetimerange"), zn = (Ln, Wn) => {
      if (!!Ln)
        return de ? dayjs(de[Wn] || de).locale(Ve.value).year(Ln.year()).month(Ln.month()).date(Ln.date()) : Ln;
    }, Hn = (Ln, Wn = !0) => {
      const Un = Ln.minDate, uo = Ln.maxDate, io = zn(Un, 0), so = zn(uo, 1);
      xe.value === so && Oe.value === io || (k("calendar-change", [Un.toDate(), uo && uo.toDate()]), xe.value = so, Oe.value = io, !(!Wn || oo.value) && ze());
    }, Gn = ref(!1), Zn = ref(!1), lo = () => {
      Gn.value = !1;
    }, ao = () => {
      Zn.value = !1;
    }, xn = (Ln, Wn) => {
      Tn.value[Wn] = Ln;
      const Un = dayjs(Ln, Dn.value).locale(Ve.value);
      if (Un.isValid()) {
        if (le && le(Un.toDate()))
          return;
        Wn === "min" ? ($e.value = Un, Oe.value = (Oe.value || $e.value).year(Un.year()).month(Un.month()).date(Un.date()), oe.unlinkPanels || (he.value = Un.add(1, "month"), xe.value = Oe.value.add(1, "month"))) : (he.value = Un, xe.value = (xe.value || he.value).year(Un.year()).month(Un.month()).date(Un.date()), oe.unlinkPanels || ($e.value = Un.subtract(1, "month"), Oe.value = xe.value.subtract(1, "month")));
      }
    }, Jn = (Ln, Wn) => {
      Tn.value[Wn] = null;
    }, Qn = (Ln, Wn) => {
      $n.value[Wn] = Ln;
      const Un = dayjs(Ln, On.value).locale(Ve.value);
      Un.isValid() && (Wn === "min" ? (Gn.value = !0, Oe.value = (Oe.value || $e.value).hour(Un.hour()).minute(Un.minute()).second(Un.second()), (!xe.value || xe.value.isBefore(Oe.value)) && (xe.value = Oe.value)) : (Zn.value = !0, xe.value = (xe.value || he.value).hour(Un.hour()).minute(Un.minute()).second(Un.second()), he.value = xe.value, xe.value && xe.value.isBefore(Oe.value) && (Oe.value = xe.value)));
    }, ro = (Ln, Wn) => {
      $n.value[Wn] = null, Wn === "min" ? ($e.value = Oe.value, Gn.value = !1) : (he.value = xe.value, Zn.value = !1);
    }, kn = (Ln, Wn, Un) => {
      $n.value.min || (Ln && ($e.value = Ln, Oe.value = (Oe.value || $e.value).hour(Ln.hour()).minute(Ln.minute()).second(Ln.second())), Un || (Gn.value = Wn), (!xe.value || xe.value.isBefore(Oe.value)) && (xe.value = Oe.value, he.value = Ln));
    }, Mn = (Ln, Wn, Un) => {
      $n.value.max || (Ln && (he.value = Ln, xe.value = (xe.value || he.value).hour(Ln.hour()).minute(Ln.minute()).second(Ln.second())), Un || (Zn.value = Wn), xe.value && xe.value.isBefore(Oe.value) && (Oe.value = xe.value));
    }, qe = () => {
      $e.value = getDefaultValue(unref(Ne), {
        lang: unref(Ve),
        unit: "month",
        unlinkPanels: oe.unlinkPanels
      })[0], he.value = $e.value.add(1, "month"), k("pick", null);
    }, Sn = (Ln) => isArray(Ln) ? Ln.map((Wn) => Wn.format(ue)) : Ln.format(ue), In = (Ln) => isArray(Ln) ? Ln.map((Wn) => dayjs(Wn, ue).locale(Ve.value)) : dayjs(Ln, ue).locale(Ve.value);
    function jn(Ln, Wn) {
      if (oe.unlinkPanels && Wn) {
        const Un = (Ln == null ? void 0 : Ln.year()) || 0, uo = (Ln == null ? void 0 : Ln.month()) || 0, io = Wn.year(), so = Wn.month();
        he.value = Un === io && uo === so ? Wn.add(1, re) : Wn;
      } else
        he.value = $e.value.add(1, re), Wn && (he.value = he.value.hour(Wn.hour()).minute(Wn.minute()).second(Wn.second()));
    }
    return k("set-picker-option", ["isValidValue", isValidRange]), k("set-picker-option", ["parseUserInput", In]), k("set-picker-option", ["formatToString", Sn]), k("set-picker-option", ["handleClear", qe]), (Ln, Wn) => (openBlock(), createElementBlock("div", {
      class: normalizeClass([
        unref(Ie).b(),
        unref(Ue).b(),
        {
          "has-sidebar": Ln.$slots.sidebar || unref(kt),
          "has-time": unref(oo)
        }
      ])
    }, [
      createElementVNode("div", {
        class: normalizeClass(unref(Ie).e("body-wrapper"))
      }, [
        renderSlot(Ln.$slots, "sidebar", {
          class: normalizeClass(unref(Ie).e("sidebar"))
        }),
        unref(kt) ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(Ie).e("sidebar"))
        }, [
          (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(_e), (Un, uo) => (openBlock(), createElementBlock("button", {
            key: uo,
            type: "button",
            class: normalizeClass(unref(Ie).e("shortcut")),
            onClick: (io) => unref(Pt)(Un)
          }, toDisplayString(Un.text), 11, _hoisted_1$c))), 128))
        ], 2)) : createCommentVNode("v-if", !0),
        createElementVNode("div", {
          class: normalizeClass(unref(Ie).e("body"))
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
                  disabled: unref(Fe).selecting,
                  placeholder: unref(En)("el.datepicker.startDate"),
                  class: normalizeClass(unref(Ue).e("editor")),
                  "model-value": unref(Et),
                  onInput: Wn[0] || (Wn[0] = (Un) => xn(Un, "min")),
                  onChange: Wn[1] || (Wn[1] = (Un) => Jn(Un, "min"))
                }, null, 8, ["disabled", "placeholder", "class", "model-value"])
              ], 2),
              withDirectives((openBlock(), createElementBlock("span", {
                class: normalizeClass(unref(Ue).e("time-picker-wrap"))
              }, [
                createVNode(unref(ElInput), {
                  size: "small",
                  class: normalizeClass(unref(Ue).e("editor")),
                  disabled: unref(Fe).selecting,
                  placeholder: unref(En)("el.datepicker.startTime"),
                  "model-value": unref(Pn),
                  onFocus: Wn[2] || (Wn[2] = (Un) => Gn.value = !0),
                  onInput: Wn[3] || (Wn[3] = (Un) => Qn(Un, "min")),
                  onChange: Wn[4] || (Wn[4] = (Un) => ro(Un, "min"))
                }, null, 8, ["class", "disabled", "placeholder", "model-value"]),
                createVNode(unref(TimePickPanel), {
                  visible: Gn.value,
                  format: unref(On),
                  "datetime-role": "start",
                  "time-arrow-control": unref(pe),
                  "parsed-value": $e.value,
                  onPick: kn
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
                  disabled: unref(Fe).selecting,
                  placeholder: unref(En)("el.datepicker.endDate"),
                  "model-value": unref(wn),
                  readonly: !unref(Oe),
                  onInput: Wn[5] || (Wn[5] = (Un) => xn(Un, "max")),
                  onChange: Wn[6] || (Wn[6] = (Un) => Jn(Un, "max"))
                }, null, 8, ["class", "disabled", "placeholder", "model-value", "readonly"])
              ], 2),
              withDirectives((openBlock(), createElementBlock("span", {
                class: normalizeClass(unref(Ue).e("time-picker-wrap"))
              }, [
                createVNode(unref(ElInput), {
                  size: "small",
                  class: normalizeClass(unref(Ue).e("editor")),
                  disabled: unref(Fe).selecting,
                  placeholder: unref(En)("el.datepicker.endTime"),
                  "model-value": unref(hn),
                  readonly: !unref(Oe),
                  onFocus: Wn[7] || (Wn[7] = (Un) => unref(Oe) && (Zn.value = !0)),
                  onInput: Wn[8] || (Wn[8] = (Un) => Qn(Un, "max")),
                  onChange: Wn[9] || (Wn[9] = (Un) => ro(Un, "max"))
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
            class: normalizeClass([[unref(Ie).e("content"), unref(Ue).e("content")], "is-left"])
          }, [
            createElementVNode("div", {
              class: normalizeClass(unref(Ue).e("header"))
            }, [
              createElementVNode("button", {
                type: "button",
                class: normalizeClass([unref(Ie).e("icon-btn"), "d-arrow-left"]),
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
                class: normalizeClass([unref(Ie).e("icon-btn"), "arrow-left"]),
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
                class: normalizeClass([[unref(Ie).e("icon-btn"), { "is-disabled": !unref(qn) }], "d-arrow-right"]),
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
                  unref(Ie).e("icon-btn"),
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
              createElementVNode("div", null, toDisplayString(unref(_n)), 1)
            ], 2),
            createVNode(DateTable, {
              "selection-mode": "range",
              date: $e.value,
              "min-date": unref(Oe),
              "max-date": unref(xe),
              "range-state": unref(Fe),
              "disabled-date": unref(le),
              "cell-class-name": unref(ie),
              onChangerange: unref(Lt),
              onPick: Hn,
              onSelect: unref(bn)
            }, null, 8, ["date", "min-date", "max-date", "range-state", "disabled-date", "cell-class-name", "onChangerange", "onSelect"])
          ], 2),
          createElementVNode("div", {
            class: normalizeClass([[unref(Ie).e("content"), unref(Ue).e("content")], "is-right"])
          }, [
            createElementVNode("div", {
              class: normalizeClass(unref(Ue).e("header"))
            }, [
              Ln.unlinkPanels ? (openBlock(), createElementBlock("button", {
                key: 0,
                type: "button",
                disabled: !unref(qn),
                class: normalizeClass([[unref(Ie).e("icon-btn"), { "is-disabled": !unref(qn) }], "d-arrow-left"]),
                onClick: Kn
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
                  unref(Ie).e("icon-btn"),
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
                class: normalizeClass([unref(Ie).e("icon-btn"), "d-arrow-right"]),
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
                class: normalizeClass([unref(Ie).e("icon-btn"), "arrow-right"]),
                onClick: An
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
              "min-date": unref(Oe),
              "max-date": unref(xe),
              "range-state": unref(Fe),
              "disabled-date": unref(le),
              "cell-class-name": unref(ie),
              onChangerange: unref(Lt),
              onPick: Hn,
              onSelect: unref(bn)
            }, null, 8, ["date", "min-date", "max-date", "range-state", "disabled-date", "cell-class-name", "onChangerange", "onSelect"])
          ], 2)
        ], 2)
      ], 2),
      unref(oo) ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(unref(Ie).e("footer"))
      }, [
        unref(Ce) ? (openBlock(), createBlock(unref(ElButton), {
          key: 0,
          text: "",
          size: "small",
          class: normalizeClass(unref(Ie).e("link-btn")),
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
          class: normalizeClass(unref(Ie).e("link-btn")),
          disabled: unref(no),
          onClick: Wn[10] || (Wn[10] = (Un) => unref(ze)(!1))
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
var DateRangePickPanel = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/date-picker/src/date-picker-com/panel-date-range.vue"]]);
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
}, _hoisted_1$b = ["onClick"], _hoisted_2$7 = ["disabled"], _hoisted_3$3 = ["disabled"], __default__$a = {
  name: "DatePickerMonthRange"
}, _sfc_main$n = /* @__PURE__ */ defineComponent({
  ...__default__$a,
  props: panelMonthRangeProps,
  emits: panelMonthRangeEmits,
  setup(e, { emit: k }) {
    const oe = e, re = "year", { lang: ae } = useLocale(), le = inject("EP_PICKER_BASE"), { shortcuts: ie, disabledDate: ue, format: de } = le.props, pe = toRef(le.props, "defaultValue"), Ce = ref(dayjs().locale(ae.value)), _e = ref(dayjs().locale(ae.value).add(1, re)), {
      minDate: Ne,
      maxDate: Ve,
      rangeState: $e,
      ppNs: he,
      drpNs: Oe,
      handleChangeRange: xe,
      handleRangeConfirm: Fe,
      handleShortcutClick: Ie,
      onSelect: Ue
    } = useRangePicker(oe, {
      defaultValue: pe,
      leftDate: Ce,
      rightDate: _e,
      unit: re,
      onParsedValueChanged: Cn
    }), Lt = computed(() => !!ie.length), {
      leftPrevYear: ze,
      rightNextYear: Pt,
      leftNextYear: bn,
      rightPrevYear: En,
      leftLabel: Tn,
      rightLabel: $n,
      leftYear: _n,
      rightYear: Dt
    } = useMonthRangeHeader({
      unlinkPanels: toRef(oe, "unlinkPanels"),
      leftDate: Ce,
      rightDate: _e
    }), At = computed(() => oe.unlinkPanels && Dt.value > _n.value + 1), vn = (kt, Et = !0) => {
      const wn = kt.minDate, Pn = kt.maxDate;
      Ve.value === Pn && Ne.value === wn || (Ve.value = Pn, Ne.value = wn, Et && Fe());
    }, jt = (kt) => kt.map((Et) => Et.format(de));
    function Cn(kt, Et) {
      if (oe.unlinkPanels && Et) {
        const wn = (kt == null ? void 0 : kt.year()) || 0, Pn = Et.year();
        _e.value = wn === Pn ? Et.add(1, re) : Et;
      } else
        _e.value = Ce.value.add(1, re);
    }
    return k("set-picker-option", ["formatToString", jt]), (kt, Et) => (openBlock(), createElementBlock("div", {
      class: normalizeClass([
        unref(he).b(),
        unref(Oe).b(),
        {
          "has-sidebar": Boolean(kt.$slots.sidebar) || unref(Lt)
        }
      ])
    }, [
      createElementVNode("div", {
        class: normalizeClass(unref(he).e("body-wrapper"))
      }, [
        renderSlot(kt.$slots, "sidebar", {
          class: normalizeClass(unref(he).e("sidebar"))
        }),
        unref(Lt) ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(he).e("sidebar"))
        }, [
          (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(ie), (wn, Pn) => (openBlock(), createElementBlock("button", {
            key: Pn,
            type: "button",
            class: normalizeClass(unref(he).e("shortcut")),
            onClick: (hn) => unref(Ie)(wn)
          }, toDisplayString(wn.text), 11, _hoisted_1$b))), 128))
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
                onClick: Et[0] || (Et[0] = (...wn) => unref(ze) && unref(ze)(...wn))
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
                disabled: !unref(At),
                class: normalizeClass([[
                  unref(he).e("icon-btn"),
                  { [unref(he).is("disabled")]: !unref(At) }
                ], "d-arrow-right"]),
                onClick: Et[1] || (Et[1] = (...wn) => unref(bn) && unref(bn)(...wn))
              }, [
                createVNode(unref(ElIcon), null, {
                  default: withCtx(() => [
                    createVNode(unref(d_arrow_right_default))
                  ]),
                  _: 1
                })
              ], 10, _hoisted_2$7)) : createCommentVNode("v-if", !0),
              createElementVNode("div", null, toDisplayString(unref(Tn)), 1)
            ], 2),
            createVNode(MonthTable, {
              "selection-mode": "range",
              date: Ce.value,
              "min-date": unref(Ne),
              "max-date": unref(Ve),
              "range-state": unref($e),
              "disabled-date": unref(ue),
              onChangerange: unref(xe),
              onPick: vn,
              onSelect: unref(Ue)
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
                disabled: !unref(At),
                class: normalizeClass([[unref(he).e("icon-btn"), { "is-disabled": !unref(At) }], "d-arrow-left"]),
                onClick: Et[2] || (Et[2] = (...wn) => unref(En) && unref(En)(...wn))
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
                onClick: Et[3] || (Et[3] = (...wn) => unref(Pt) && unref(Pt)(...wn))
              }, [
                createVNode(unref(ElIcon), null, {
                  default: withCtx(() => [
                    createVNode(unref(d_arrow_right_default))
                  ]),
                  _: 1
                })
              ], 2),
              createElementVNode("div", null, toDisplayString(unref($n)), 1)
            ], 2),
            createVNode(MonthTable, {
              "selection-mode": "range",
              date: _e.value,
              "min-date": unref(Ne),
              "max-date": unref(Ve),
              "range-state": unref($e),
              "disabled-date": unref(ue),
              onChangerange: unref(xe),
              onPick: vn,
              onSelect: unref(Ue)
            }, null, 8, ["date", "min-date", "max-date", "range-state", "disabled-date", "onChangerange", "onSelect"])
          ], 2)
        ], 2)
      ], 2)
    ], 2));
  }
});
var MonthRangePickPanel = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/date-picker/src/date-picker-com/panel-month-range.vue"]]);
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
}, _sfc_main$m = /* @__PURE__ */ defineComponent({
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
var Divider = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/divider/src/divider.vue"]]);
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
}, _sfc_main$l = /* @__PURE__ */ defineComponent({
  ...__default__$8,
  props: formProps,
  emits: formEmits,
  setup(e, { expose: k, emit: oe }) {
    const re = e, ae = "ElForm", le = [], ie = useSize(), ue = useNamespace("form"), de = computed(() => {
      const { labelPosition: Ie, inline: Ue } = re;
      return [
        ue.b(),
        ue.m(ie.value || "default"),
        {
          [ue.m(`label-${Ie}`)]: Ie,
          [ue.m("inline")]: Ue
        }
      ];
    }), pe = (Ie) => {
      le.push(Ie);
    }, Ce = (Ie) => {
      Ie.prop && le.splice(le.indexOf(Ie), 1);
    }, _e = (Ie = []) => {
      if (!re.model) {
        debugWarn(ae, "model is required for resetFields to work.");
        return;
      }
      filterFields(le, Ie).forEach((Ue) => Ue.resetField());
    }, Ne = (Ie = []) => {
      filterFields(le, Ie).forEach((Ue) => Ue.clearValidate());
    }, Ve = computed(() => {
      const Ie = !!re.model;
      return Ie || debugWarn(ae, "model is required for validate to work."), Ie;
    }), $e = (Ie) => {
      if (le.length === 0)
        return [];
      const Ue = filterFields(le, Ie);
      return Ue.length ? Ue : (debugWarn(ae, "please pass correct props!"), []);
    }, he = async (Ie) => xe(void 0, Ie), Oe = async (Ie = []) => {
      if (!Ve.value)
        return !1;
      const Ue = $e(Ie);
      if (Ue.length === 0)
        return !0;
      let Lt = {};
      for (const ze of Ue)
        try {
          await ze.validate("");
        } catch (Pt) {
          Lt = {
            ...Lt,
            ...Pt
          };
        }
      return Object.keys(Lt).length === 0 ? !0 : Promise.reject(Lt);
    }, xe = async (Ie = [], Ue) => {
      const Lt = !isFunction(Ue);
      try {
        const ze = await Oe(Ie);
        return ze === !0 && (Ue == null || Ue(ze)), ze;
      } catch (ze) {
        const Pt = ze;
        return re.scrollToError && Fe(Object.keys(Pt)[0]), Ue == null || Ue(!1, Pt), Lt && Promise.reject(Pt);
      }
    }, Fe = (Ie) => {
      var Ue;
      const Lt = filterFields(le, Ie)[0];
      Lt && ((Ue = Lt.$el) == null || Ue.scrollIntoView());
    };
    return watch(() => re.rules, () => {
      re.validateOnRuleChange && he().catch((Ie) => debugWarn(Ie));
    }, { deep: !0 }), provide(formContextKey, reactive({
      ...toRefs(re),
      emit: oe,
      resetFields: _e,
      clearValidate: Ne,
      validateField: xe,
      addField: pe,
      removeField: Ce,
      ...useFormLabelWidth()
    })), k({
      validate: he,
      validateField: xe,
      resetFields: _e,
      clearValidate: Ne,
      scrollToField: Fe
    }), (Ie, Ue) => (openBlock(), createElementBlock("form", {
      class: normalizeClass(unref(de))
    }, [
      renderSlot(Ie.$slots, "default")
    ], 2));
  }
});
var Form = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/form/src/form.vue"]]);
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
    var le = new Promise(function(Ne, Ve) {
      var $e = function(xe) {
        return re(xe), xe.length ? Ve(new AsyncValidationError(xe, convertFieldsError(xe))) : Ne(ae);
      }, he = flattenObjArr(e);
      asyncSerialArray(he, oe, $e);
    });
    return le.catch(function(Ne) {
      return Ne;
    }), le;
  }
  var ie = k.firstFields === !0 ? Object.keys(e) : k.firstFields || [], ue = Object.keys(e), de = ue.length, pe = 0, Ce = [], _e = new Promise(function(Ne, Ve) {
    var $e = function(Oe) {
      if (Ce.push.apply(Ce, Oe), pe++, pe === de)
        return re(Ce), Ce.length ? Ve(new AsyncValidationError(Ce, convertFieldsError(Ce))) : Ne(ae);
    };
    ue.length || (re(Ce), Ne(ae)), ue.forEach(function(he) {
      var Oe = e[he];
      ie.indexOf(he) !== -1 ? asyncSerialArray(Oe, oe, $e) : asyncParallelArray(Oe, oe, $e);
    });
  });
  return _e.catch(function(Ne) {
    return Ne;
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
  de.v4 = function(Ie) {
    return Ie && Ie.exact ? ie : new RegExp("" + k(Ie) + oe + k(Ie), "g");
  }, de.v6 = function(Ie) {
    return Ie && Ie.exact ? ue : new RegExp("" + k(Ie) + ae + k(Ie), "g");
  };
  var pe = "(?:(?:[a-z]+:)?//)", Ce = "(?:\\S+(?::\\S*)?@)?", _e = de.v4().source, Ne = de.v6().source, Ve = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", $e = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", he = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", Oe = "(?::\\d{2,5})?", xe = '(?:[/?#][^\\s"]*)?', Fe = "(?:" + pe + "|www\\.)" + Ce + "(?:localhost|" + _e + "|" + Ne + "|" + Ve + $e + he + ")" + Oe + xe;
  return urlReg = new RegExp("(?:^" + Fe + "$)", "i"), urlReg;
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
  var ie = typeof k.len == "number", ue = typeof k.min == "number", de = typeof k.max == "number", pe = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, Ce = oe, _e = null, Ne = typeof oe == "number", Ve = typeof oe == "string", $e = Array.isArray(oe);
  if (Ne ? _e = "number" : Ve ? _e = "string" : $e && (_e = "array"), !_e)
    return !1;
  $e && (Ce = oe.length), Ve && (Ce = oe.replace(pe, "_").length), ie ? Ce !== k.len && ae.push(format(le.messages[_e].len, k.fullField, k.len)) : ue && !de && Ce < k.min ? ae.push(format(le.messages[_e].min, k.fullField, k.min)) : de && !ue && Ce > k.max ? ae.push(format(le.messages[_e].max, k.fullField, k.max)) : ue && de && (Ce < k.min || Ce > k.max) && ae.push(format(le.messages[_e].range, k.fullField, k.min, k.max));
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
      var Oe = [], xe = {};
      function Fe(Ue) {
        if (Array.isArray(Ue)) {
          var Lt;
          Oe = (Lt = Oe).concat.apply(Lt, Ue);
        } else
          Oe.push(Ue);
      }
      for (var Ie = 0; Ie < he.length; Ie++)
        Fe(he[Ie]);
      Oe.length ? (xe = convertFieldsError(Oe), pe(Oe, xe)) : pe(null, ue);
    }
    if (de.messages) {
      var _e = this.messages();
      _e === messages && (_e = newMessages()), deepMerge(_e, de.messages), de.messages = _e;
    } else
      de.messages = this.messages();
    var Ne = {}, Ve = de.keys || Object.keys(this.rules);
    Ve.forEach(function(he) {
      var Oe = ie.rules[he], xe = ue[he];
      Oe.forEach(function(Fe) {
        var Ie = Fe;
        typeof Ie.transform == "function" && (ue === re && (ue = _extends({}, ue)), xe = ue[he] = Ie.transform(xe)), typeof Ie == "function" ? Ie = {
          validator: Ie
        } : Ie = _extends({}, Ie), Ie.validator = ie.getValidationMethod(Ie), Ie.validator && (Ie.field = he, Ie.fullField = Ie.fullField || he, Ie.type = ie.getType(Ie), Ne[he] = Ne[he] || [], Ne[he].push({
          rule: Ie,
          value: xe,
          source: ue,
          field: he
        }));
      });
    });
    var $e = {};
    return asyncMap(Ne, de, function(he, Oe) {
      var xe = he.rule, Fe = (xe.type === "object" || xe.type === "array") && (typeof xe.fields == "object" || typeof xe.defaultField == "object");
      Fe = Fe && (xe.required || !xe.required && he.value), xe.field = he.field;
      function Ie(ze, Pt) {
        return _extends({}, Pt, {
          fullField: xe.fullField + "." + ze,
          fullFields: xe.fullFields ? [].concat(xe.fullFields, [ze]) : [ze]
        });
      }
      function Ue(ze) {
        ze === void 0 && (ze = []);
        var Pt = Array.isArray(ze) ? ze : [ze];
        !de.suppressWarning && Pt.length && e.warning("async-validator:", Pt), Pt.length && xe.message !== void 0 && (Pt = [].concat(xe.message));
        var bn = Pt.map(complementError(xe, ue));
        if (de.first && bn.length)
          return $e[xe.field] = 1, Oe(bn);
        if (!Fe)
          Oe(bn);
        else {
          if (xe.required && !he.value)
            return xe.message !== void 0 ? bn = [].concat(xe.message).map(complementError(xe, ue)) : de.error && (bn = [de.error(xe, format(de.messages.required, xe.field))]), Oe(bn);
          var En = {};
          xe.defaultField && Object.keys(he.value).map(function(_n) {
            En[_n] = xe.defaultField;
          }), En = _extends({}, En, he.rule.fields);
          var Tn = {};
          Object.keys(En).forEach(function(_n) {
            var Dt = En[_n], At = Array.isArray(Dt) ? Dt : [Dt];
            Tn[_n] = At.map(Ie.bind(null, _n));
          });
          var $n = new e(Tn);
          $n.messages(de.messages), he.rule.options && (he.rule.options.messages = de.messages, he.rule.options.error = de.error), $n.validate(he.value, he.rule.options || de, function(_n) {
            var Dt = [];
            bn && bn.length && Dt.push.apply(Dt, bn), _n && _n.length && Dt.push.apply(Dt, _n), Oe(Dt.length ? Dt : null);
          });
        }
      }
      var Lt;
      if (xe.asyncValidator)
        Lt = xe.asyncValidator(xe, he.value, Ue, he.source, de);
      else if (xe.validator) {
        try {
          Lt = xe.validator(xe, he.value, Ue, he.source, de);
        } catch (ze) {
          console.error == null || console.error(ze), de.suppressValidatorError || setTimeout(function() {
            throw ze;
          }, 0), Ue(ze.message);
        }
        Lt === !0 ? Ue() : Lt === !1 ? Ue(typeof xe.message == "function" ? xe.message(xe.fullField || xe.field) : xe.message || (xe.fullField || xe.field) + " fails") : Lt instanceof Array ? Ue(Lt) : Lt instanceof Error && Ue(Lt.message);
      }
      Lt && Lt.then && Lt.then(function() {
        return Ue();
      }, function(ze) {
        return Ue(ze);
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
        isAutoWidth: Ne
      } = e;
      if (Ne) {
        const Ve = oe == null ? void 0 : oe.autoLabelWidth, $e = {};
        if (Ve && Ve !== "auto") {
          const he = Math.max(0, Number.parseInt(Ve, 10) - ie.value), Oe = oe.labelPosition === "left" ? "marginRight" : "marginLeft";
          he && ($e[Oe] = `${he}px`);
        }
        return createVNode("div", {
          ref: le,
          class: [ae.be("item", "label-wrap")],
          style: $e
        }, [(Ce = k.default) == null ? void 0 : Ce.call(k)]);
      } else
        return createVNode(Fragment, {
          ref: le
        }, [(_e = k.default) == null ? void 0 : _e.call(k)]);
    };
  }
});
const _hoisted_1$a = ["role", "aria-labelledby"], __default__$7 = {
  name: "ElFormItem"
}, _sfc_main$k = /* @__PURE__ */ defineComponent({
  ...__default__$7,
  props: formItemProps,
  setup(e, { expose: k }) {
    const oe = e, re = useSlots(), ae = inject(formContextKey, void 0), le = inject(formItemContextKey, void 0), ie = useSize(void 0, { formItem: !1 }), ue = useNamespace("form-item"), de = useId().value, pe = ref([]), Ce = ref(""), _e = refDebounced(Ce, 100), Ne = ref(""), Ve = ref();
    let $e, he = !1;
    const Oe = computed(() => {
      if ((ae == null ? void 0 : ae.labelPosition) === "top")
        return {};
      const Nn = addUnit(oe.labelWidth || (ae == null ? void 0 : ae.labelWidth) || "");
      return Nn ? { width: Nn } : {};
    }), xe = computed(() => {
      if ((ae == null ? void 0 : ae.labelPosition) === "top" || (ae == null ? void 0 : ae.inline))
        return {};
      if (!oe.label && !oe.labelWidth && En)
        return {};
      const Nn = addUnit(oe.labelWidth || (ae == null ? void 0 : ae.labelWidth) || "");
      return !oe.label && !re.label ? { marginLeft: Nn } : {};
    }), Fe = computed(() => [
      ue.b(),
      ue.m(ie.value),
      ue.is("error", Ce.value === "error"),
      ue.is("validating", Ce.value === "validating"),
      ue.is("success", Ce.value === "success"),
      ue.is("required", At.value || oe.required),
      ue.is("no-asterisk", ae == null ? void 0 : ae.hideRequiredAsterisk),
      { [ue.m("feedback")]: ae == null ? void 0 : ae.statusIcon }
    ]), Ie = computed(() => isBoolean(oe.inlineMessage) ? oe.inlineMessage : (ae == null ? void 0 : ae.inlineMessage) || !1), Ue = computed(() => [
      ue.e("error"),
      { [ue.em("error", "inline")]: Ie.value }
    ]), Lt = computed(() => oe.prop ? isString(oe.prop) ? oe.prop : oe.prop.join(".") : ""), ze = computed(() => !!(oe.label || re.label)), Pt = computed(() => oe.for || pe.value.length === 1 ? pe.value[0] : void 0), bn = computed(() => !Pt.value && ze.value), En = !!le, Tn = computed(() => {
      const Nn = ae == null ? void 0 : ae.model;
      if (!(!Nn || !oe.prop))
        return getProp(Nn, oe.prop).value;
    }), $n = computed(() => {
      const Nn = oe.rules ? castArray$1(oe.rules) : [], An = ae == null ? void 0 : ae.rules;
      if (An && oe.prop) {
        const Vn = getProp(An, oe.prop).value;
        Vn && Nn.push(...castArray$1(Vn));
      }
      return oe.required !== void 0 && Nn.push({ required: !!oe.required }), Nn;
    }), _n = computed(() => $n.value.length > 0), Dt = (Nn) => $n.value.filter((Vn) => !Vn.trigger || !Nn ? !0 : Array.isArray(Vn.trigger) ? Vn.trigger.includes(Nn) : Vn.trigger === Nn).map(({ trigger: Vn, ...Bn }) => Bn), At = computed(() => $n.value.some((Nn) => Nn.required === !0)), vn = computed(() => {
      var Nn;
      return _e.value === "error" && oe.showMessage && ((Nn = ae == null ? void 0 : ae.showMessage) != null ? Nn : !0);
    }), jt = computed(() => `${oe.label || ""}${(ae == null ? void 0 : ae.labelSuffix) || ""}`), Cn = (Nn) => {
      Ce.value = Nn;
    }, kt = (Nn) => {
      var An, Vn;
      const { errors: Bn, fields: Kn } = Nn;
      (!Bn || !Kn) && console.error(Nn), Cn("error"), Ne.value = Bn ? (Vn = (An = Bn == null ? void 0 : Bn[0]) == null ? void 0 : An.message) != null ? Vn : `${oe.prop} is required` : "", ae == null || ae.emit("validate", oe.prop, !1, Ne.value);
    }, Et = () => {
      Cn("success"), ae == null || ae.emit("validate", oe.prop, !0, "");
    }, wn = async (Nn) => {
      const An = Lt.value;
      return new Schema({
        [An]: Nn
      }).validate({ [An]: Tn.value }, { firstFields: !0 }).then(() => (Et(), !0)).catch((Bn) => (kt(Bn), Promise.reject(Bn)));
    }, Pn = async (Nn, An) => {
      if (he)
        return he = !1, !1;
      const Vn = isFunction(An);
      if (!_n.value)
        return An == null || An(!1), !1;
      const Bn = Dt(Nn);
      return Bn.length === 0 ? (An == null || An(!0), !0) : (Cn("validating"), wn(Bn).then(() => (An == null || An(!0), !0)).catch((Kn) => {
        const { fields: Yn } = Kn;
        return An == null || An(!1, Yn), Vn ? !1 : Promise.reject(Yn);
      }));
    }, hn = () => {
      Cn(""), Ne.value = "";
    }, On = async () => {
      const Nn = ae == null ? void 0 : ae.model;
      if (!Nn || !oe.prop)
        return;
      const An = getProp(Nn, oe.prop);
      isEqual(An.value, $e) || (he = !0, An.value = clone($e)), await nextTick(), hn();
    }, Dn = (Nn) => {
      pe.value.includes(Nn) || pe.value.push(Nn);
    }, Rn = (Nn) => {
      pe.value = pe.value.filter((An) => An !== Nn);
    };
    watch(() => oe.error, (Nn) => {
      Ne.value = Nn || "", Cn(Nn ? "error" : "");
    }, { immediate: !0 }), watch(() => oe.validateStatus, (Nn) => Cn(Nn || ""));
    const Fn = reactive({
      ...toRefs(oe),
      $el: Ve,
      size: ie,
      validateState: Ce,
      labelId: de,
      inputIds: pe,
      isGroup: bn,
      addInputId: Dn,
      removeInputId: Rn,
      resetField: On,
      clearValidate: hn,
      validate: Pn
    });
    return provide(formItemContextKey, Fn), onMounted(() => {
      oe.prop && (ae == null || ae.addField(Fn), $e = clone(Tn.value));
    }), onBeforeUnmount(() => {
      ae == null || ae.removeField(Fn);
    }), k({
      size: ie,
      validateMessage: Ne,
      validateState: Ce,
      validate: Pn,
      clearValidate: hn,
      resetField: On
    }), (Nn, An) => {
      var Vn;
      return openBlock(), createElementBlock("div", {
        ref_key: "formItemRef",
        ref: Ve,
        class: normalizeClass(unref(Fe)),
        role: unref(bn) ? "group" : void 0,
        "aria-labelledby": unref(bn) ? unref(de) : void 0
      }, [
        createVNode(unref(FormLabelWrap), {
          "is-auto-width": unref(Oe).width === "auto",
          "update-all": ((Vn = unref(ae)) == null ? void 0 : Vn.labelWidth) === "auto"
        }, {
          default: withCtx(() => [
            unref(ze) ? (openBlock(), createBlock(resolveDynamicComponent(unref(Pt) ? "label" : "div"), {
              key: 0,
              id: unref(de),
              for: unref(Pt),
              class: normalizeClass(unref(ue).e("label")),
              style: normalizeStyle(unref(Oe))
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
          style: normalizeStyle(unref(xe))
        }, [
          renderSlot(Nn.$slots, "default"),
          createVNode(Transition, {
            name: `${unref(ue).namespace.value}-zoom-in-top`
          }, {
            default: withCtx(() => [
              unref(vn) ? renderSlot(Nn.$slots, "error", {
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
      ], 10, _hoisted_1$a);
    };
  }
});
var FormItem = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/form/src/form-item.vue"]]);
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
}, _hoisted_1$9 = ["aria-label", "onKeydown"], _hoisted_2$6 = ["aria-label", "onKeydown"], __default__$6 = {
  name: "ElInputNumber"
}, _sfc_main$j = /* @__PURE__ */ defineComponent({
  ...__default__$6,
  props: inputNumberProps,
  emits: inputNumberEmits,
  setup(e, { expose: k, emit: oe }) {
    const re = e, { t: ae } = useLocale(), le = useNamespace("input-number"), ie = ref(), ue = reactive({
      currentValue: re.modelValue,
      userInput: null
    }), { formItem: de } = useFormItem(), pe = computed(() => isNumber(re.modelValue) && Fe(re.modelValue, -1) < re.min), Ce = computed(() => isNumber(re.modelValue) && Fe(re.modelValue) > re.max), _e = computed(() => {
      const Dt = xe(re.step);
      return isUndefined(re.precision) ? Math.max(xe(re.modelValue), Dt) : (Dt > re.precision && debugWarn("InputNumber", "precision should not be less than the decimal places of step"), re.precision);
    }), Ne = computed(() => re.controls && re.controlsPosition === "right"), Ve = useSize(), $e = useDisabled$1(), he = computed(() => {
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
    }), Oe = (Dt, At) => {
      if (isUndefined(At) && (At = _e.value), At === 0)
        return Math.round(Dt);
      let vn = String(Dt);
      const jt = vn.indexOf(".");
      if (jt === -1 || !vn.replace(".", "").split("")[jt + At])
        return Dt;
      const Et = vn.length;
      return vn.charAt(Et - 1) === "5" && (vn = `${vn.slice(0, Math.max(0, Et - 1))}6`), Number.parseFloat(Number(vn).toFixed(At));
    }, xe = (Dt) => {
      if (isNil(Dt))
        return 0;
      const At = Dt.toString(), vn = At.indexOf(".");
      let jt = 0;
      return vn !== -1 && (jt = At.length - vn - 1), jt;
    }, Fe = (Dt, At = 1) => isNumber(Dt) ? Oe(Dt + re.step * At) : ue.currentValue, Ie = () => {
      if ($e.value || Ce.value)
        return;
      const Dt = re.modelValue || 0, At = Fe(Dt);
      ze(At);
    }, Ue = () => {
      if ($e.value || pe.value)
        return;
      const Dt = re.modelValue || 0, At = Fe(Dt, -1);
      ze(At);
    }, Lt = (Dt, At) => {
      const { max: vn, min: jt, step: Cn, precision: kt, stepStrictly: Et, valueOnClear: wn } = re;
      let Pn = Number(Dt);
      if (isNil(Dt) || Number.isNaN(Pn))
        return null;
      if (Dt === "") {
        if (wn === null)
          return null;
        Pn = isString(wn) ? { min: jt, max: vn }[wn] : wn;
      }
      return Et && (Pn = Oe(Math.round(Pn / Cn) * Cn, kt)), isUndefined(kt) || (Pn = Oe(Pn, kt)), (Pn > vn || Pn < jt) && (Pn = Pn > vn ? vn : jt, At && oe("update:modelValue", Pn)), Pn;
    }, ze = (Dt) => {
      var At;
      const vn = ue.currentValue, jt = Lt(Dt);
      vn !== jt && (ue.userInput = null, oe("update:modelValue", jt), oe("input", jt), oe("change", jt, vn), re.validateEvent && ((At = de == null ? void 0 : de.validate) == null || At.call(de, "change").catch((Cn) => debugWarn(Cn))), ue.currentValue = jt);
    }, Pt = (Dt) => ue.userInput = Dt, bn = (Dt) => {
      const At = Dt !== "" ? Number(Dt) : "";
      (isNumber(At) && !Number.isNaN(At) || Dt === "") && ze(At), ue.userInput = null;
    }, En = () => {
      var Dt, At;
      (At = (Dt = ie.value) == null ? void 0 : Dt.focus) == null || At.call(Dt);
    }, Tn = () => {
      var Dt, At;
      (At = (Dt = ie.value) == null ? void 0 : Dt.blur) == null || At.call(Dt);
    }, $n = (Dt) => {
      oe("focus", Dt);
    }, _n = (Dt) => {
      var At;
      oe("blur", Dt), re.validateEvent && ((At = de == null ? void 0 : de.validate) == null || At.call(de, "blur").catch((vn) => debugWarn(vn)));
    };
    return watch(() => re.modelValue, (Dt) => {
      ue.currentValue = Lt(Dt, !0), ue.userInput = null;
    }, { immediate: !0 }), onMounted(() => {
      var Dt;
      const { min: At, max: vn, modelValue: jt } = re, Cn = (Dt = ie.value) == null ? void 0 : Dt.input;
      if (Cn.setAttribute("role", "spinbutton"), Number.isFinite(vn) ? Cn.setAttribute("aria-valuemax", String(vn)) : Cn.removeAttribute("aria-valuemax"), Number.isFinite(At) ? Cn.setAttribute("aria-valuemin", String(At)) : Cn.removeAttribute("aria-valuemin"), Cn.setAttribute("aria-valuenow", String(ue.currentValue)), Cn.setAttribute("aria-disabled", String($e.value)), !isNumber(jt) && jt != null) {
        let kt = Number(jt);
        Number.isNaN(kt) && (kt = null), oe("update:modelValue", kt);
      }
    }), onUpdated(() => {
      var Dt;
      const At = (Dt = ie.value) == null ? void 0 : Dt.input;
      At == null || At.setAttribute("aria-valuenow", `${ue.currentValue}`);
    }), k({
      focus: En,
      blur: Tn
    }), (Dt, At) => (openBlock(), createElementBlock("div", {
      class: normalizeClass([
        unref(le).b(),
        unref(le).m(unref(Ve)),
        unref(le).is("disabled", unref($e)),
        unref(le).is("without-controls", !Dt.controls),
        unref(le).is("controls-right", unref(Ne))
      ]),
      onDragstart: At[0] || (At[0] = withModifiers(() => {
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
      ], 42, _hoisted_1$9)), [
        [unref(RepeatClick), Ue]
      ]) : createCommentVNode("v-if", !0),
      Dt.controls ? withDirectives((openBlock(), createElementBlock("span", {
        key: 1,
        role: "button",
        "aria-label": unref(ae)("el.inputNumber.increase"),
        class: normalizeClass([unref(le).e("increase"), unref(le).is("disabled", unref(Ce))]),
        onKeydown: withKeys(Ie, ["enter"])
      }, [
        createVNode(unref(ElIcon), null, {
          default: withCtx(() => [
            unref(Ne) ? (openBlock(), createBlock(unref(arrow_up_default), { key: 0 })) : (openBlock(), createBlock(unref(plus_default), { key: 1 }))
          ]),
          _: 1
        })
      ], 42, _hoisted_2$6)), [
        [unref(RepeatClick), Ie]
      ]) : createCommentVNode("v-if", !0),
      createVNode(unref(ElInput), {
        id: Dt.id,
        ref_key: "input",
        ref: ie,
        type: "number",
        step: Dt.step,
        "model-value": unref(he),
        placeholder: Dt.placeholder,
        disabled: unref($e),
        size: unref(Ve),
        max: Dt.max,
        min: Dt.min,
        name: Dt.name,
        label: Dt.label,
        "validate-event": !1,
        onKeydown: [
          withKeys(withModifiers(Ie, ["prevent"]), ["up"]),
          withKeys(withModifiers(Ue, ["prevent"]), ["down"])
        ],
        onBlur: _n,
        onFocus: $n,
        onInput: Pt,
        onChange: bn
      }, null, 8, ["id", "step", "model-value", "placeholder", "disabled", "size", "max", "min", "name", "label", "onKeydown"])
    ], 34));
  }
});
var InputNumber = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/input-number/src/input-number.vue"]]);
const ElInputNumber = withInstall(InputNumber), selectGroupKey = "ElSelectGroup", selectKey = "ElSelect";
function useOption(e, k) {
  const oe = inject(selectKey), re = inject(selectGroupKey, { disabled: !1 }), ae = computed(() => Object.prototype.toString.call(e.value).toLowerCase() === "[object object]"), le = computed(() => oe.props.multiple ? _e(oe.props.modelValue, e.value) : Ne(e.value, oe.props.modelValue)), ie = computed(() => {
    if (oe.props.multiple) {
      const he = oe.props.modelValue || [];
      return !le.value && he.length >= oe.props.multipleLimit && oe.props.multipleLimit > 0;
    } else
      return !1;
  }), ue = computed(() => e.label || (ae.value ? "" : e.value)), de = computed(() => e.value || e.label || ""), pe = computed(() => e.disabled || k.groupDisabled || ie.value), Ce = getCurrentInstance(), _e = (he = [], Oe) => {
    if (ae.value) {
      const xe = oe.props.valueKey;
      return he && he.some((Fe) => get(Fe, xe) === get(Oe, xe));
    } else
      return he && he.includes(Oe);
  }, Ne = (he, Oe) => {
    if (ae.value) {
      const { valueKey: xe } = oe.props;
      return get(he, xe) === get(Oe, xe);
    } else
      return he === Oe;
  }, Ve = () => {
    !e.disabled && !re.disabled && (oe.hoverIndex = oe.optionsArray.indexOf(Ce.proxy));
  };
  watch(() => ue.value, () => {
    !e.created && !oe.props.remote && oe.setSelected();
  }), watch(() => e.value, (he, Oe) => {
    const { remote: xe, valueKey: Fe } = oe.props;
    if (!e.created && !xe) {
      if (Fe && typeof he == "object" && typeof Oe == "object" && he[Fe] === Oe[Fe])
        return;
      oe.setSelected();
    }
  }), watch(() => re.disabled, () => {
    k.groupDisabled = re.disabled;
  }, { immediate: !0 });
  const { queryChange: $e } = toRaw(oe);
  return watch($e, (he) => {
    const { query: Oe } = unref(he), xe = new RegExp(escapeStringRegexp(Oe), "i");
    k.visible = xe.test(ue.value) || e.created, k.visible || oe.filteredOptionsCount--;
  }), {
    select: oe,
    currentLabel: ue,
    currentValue: de,
    itemSelected: le,
    isDisabled: pe,
    hoverItem: Ve
  };
}
const _sfc_main$i = defineComponent({
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
function _sfc_render$8(e, k, oe, re, ae, le) {
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
var Option = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$8], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/select/src/option.vue"]]);
const _sfc_main$h = defineComponent({
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
function _sfc_render$7(e, k, oe, re, ae, le) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass([e.ns.b("dropdown"), e.ns.is("multiple", e.isMultiple), e.popperClass]),
    style: normalizeStyle({ [e.isFitInputWidth ? "width" : "minWidth"]: e.minWidth })
  }, [
    renderSlot(e.$slots, "default")
  ], 6);
}
var ElSelectMenu = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$7], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/select/src/select-dropdown.vue"]]);
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
  const { t: re } = useLocale(), ae = useNamespace("select"), le = ref(null), ie = ref(null), ue = ref(null), de = ref(null), pe = ref(null), Ce = ref(null), _e = ref(-1), Ne = shallowRef({ query: "" }), Ve = shallowRef(""), $e = inject(formContextKey, {}), he = inject(formItemContextKey, {}), Oe = computed(() => !e.filterable || e.multiple || !k.visible), xe = computed(() => e.disabled || $e.disabled), Fe = computed(() => {
    const qe = e.multiple ? Array.isArray(e.modelValue) && e.modelValue.length > 0 : e.modelValue !== void 0 && e.modelValue !== null && e.modelValue !== "";
    return e.clearable && !xe.value && k.inputHovering && qe;
  }), Ie = computed(() => e.remote && e.filterable ? "" : e.suffixIcon), Ue = computed(() => ae.is("reverse", Ie.value && k.visible)), Lt = computed(() => e.remote ? 300 : 0), ze = computed(() => e.loading ? e.loadingText || re("el.select.loading") : e.remote && k.query === "" && k.options.size === 0 ? !1 : e.filterable && k.query && k.options.size > 0 && k.filteredOptionsCount === 0 ? e.noMatchText || re("el.select.noMatch") : k.options.size === 0 ? e.noDataText || re("el.select.noData") : null), Pt = computed(() => Array.from(k.options.values())), bn = computed(() => Array.from(k.cachedOptions.values())), En = computed(() => {
    const qe = Pt.value.filter((Sn) => !Sn.created).some((Sn) => Sn.currentLabel === k.query);
    return e.filterable && e.allowCreate && k.query !== "" && !qe;
  }), Tn = useSize(), $n = computed(() => ["small"].includes(Tn.value) ? "small" : "default"), _n = computed({
    get() {
      return k.visible && ze.value !== !1;
    },
    set(qe) {
      k.visible = qe;
    }
  });
  watch([() => xe.value, () => Tn.value, () => $e.size], () => {
    nextTick(() => {
      Dt();
    });
  }), watch(() => e.placeholder, (qe) => {
    k.cachedPlaceHolder = k.currentPlaceholder = qe;
  }), watch(() => e.modelValue, (qe, Sn) => {
    var In;
    e.multiple && (Dt(), qe && qe.length > 0 || ie.value && k.query !== "" ? k.currentPlaceholder = "" : k.currentPlaceholder = k.cachedPlaceHolder, e.filterable && !e.reserveKeyword && (k.query = "", At(k.query))), Cn(), e.filterable && !e.multiple && (k.inputLength = 20), !isEqual(qe, Sn) && e.validateEvent && ((In = he.validate) == null || In.call(he, "change").catch((jn) => debugWarn(jn)));
  }, {
    flush: "post",
    deep: !0
  }), watch(() => k.visible, (qe) => {
    var Sn, In, jn;
    qe ? ((In = (Sn = ue.value) == null ? void 0 : Sn.updatePopper) == null || In.call(Sn), e.filterable && (k.filteredOptionsCount = k.optionsCount, k.query = e.remote ? "" : k.selectedLabel, e.multiple ? (jn = ie.value) == null || jn.focus() : k.selectedLabel && (k.currentPlaceholder = `${k.selectedLabel}`, k.selectedLabel = ""), At(k.query), !e.multiple && !e.remote && (Ne.value.query = "", triggerRef(Ne), triggerRef(Ve)))) : (ie.value && ie.value.blur(), k.query = "", k.previousQuery = null, k.selectedLabel = "", k.inputLength = 20, k.menuVisibleOnFocus = !1, Et(), nextTick(() => {
      ie.value && ie.value.value === "" && k.selected.length === 0 && (k.currentPlaceholder = k.cachedPlaceHolder);
    }), e.multiple || (k.selected && (e.filterable && e.allowCreate && k.createdSelected && k.createdLabel ? k.selectedLabel = k.createdLabel : k.selectedLabel = k.selected.currentLabel, e.filterable && (k.query = k.selectedLabel)), e.filterable && (k.currentPlaceholder = k.cachedPlaceHolder))), oe.emit("visible-change", qe);
  }), watch(() => k.options.entries(), () => {
    var qe, Sn, In;
    if (!isClient$1)
      return;
    (Sn = (qe = ue.value) == null ? void 0 : qe.updatePopper) == null || Sn.call(qe), e.multiple && Dt();
    const jn = ((In = pe.value) == null ? void 0 : In.querySelectorAll("input")) || [];
    Array.from(jn).includes(document.activeElement) || Cn(), e.defaultFirstOption && (e.filterable || e.remote) && k.filteredOptionsCount && jt();
  }, {
    flush: "post"
  }), watch(() => k.hoverIndex, (qe) => {
    typeof qe == "number" && qe > -1 && (_e.value = Pt.value[qe] || {}), Pt.value.forEach((Sn) => {
      Sn.hover = _e.value === Sn;
    });
  });
  const Dt = () => {
    e.collapseTags && !e.filterable || nextTick(() => {
      var qe, Sn;
      if (!le.value)
        return;
      const In = le.value.$el.querySelector("input"), jn = de.value, Ln = getComponentSize(Tn.value || $e.size);
      In.style.height = `${(k.selected.length === 0 ? Ln : Math.max(jn ? jn.clientHeight + (jn.clientHeight > Ln ? 6 : 0) : 0, Ln)) - 2}px`, k.tagInMultiLine = Number.parseFloat(In.style.height) >= Ln, k.visible && ze.value !== !1 && ((Sn = (qe = ue.value) == null ? void 0 : qe.updatePopper) == null || Sn.call(qe));
    });
  }, At = (qe) => {
    if (!(k.previousQuery === qe || k.isOnComposition)) {
      if (k.previousQuery === null && (typeof e.filterMethod == "function" || typeof e.remoteMethod == "function")) {
        k.previousQuery = qe;
        return;
      }
      k.previousQuery = qe, nextTick(() => {
        var Sn, In;
        k.visible && ((In = (Sn = ue.value) == null ? void 0 : Sn.updatePopper) == null || In.call(Sn));
      }), k.hoverIndex = -1, e.multiple && e.filterable && nextTick(() => {
        const Sn = ie.value.value.length * 15 + 20;
        k.inputLength = e.collapseTags ? Math.min(50, Sn) : Sn, vn(), Dt();
      }), e.remote && typeof e.remoteMethod == "function" ? (k.hoverIndex = -1, e.remoteMethod(qe)) : typeof e.filterMethod == "function" ? (e.filterMethod(qe), triggerRef(Ve)) : (k.filteredOptionsCount = k.optionsCount, Ne.value.query = qe, triggerRef(Ne), triggerRef(Ve)), e.defaultFirstOption && (e.filterable || e.remote) && k.filteredOptionsCount && jt();
    }
  }, vn = () => {
    k.currentPlaceholder !== "" && (k.currentPlaceholder = ie.value.value ? "" : k.cachedPlaceHolder);
  }, jt = () => {
    const qe = Pt.value.filter((jn) => jn.visible && !jn.disabled && !jn.states.groupDisabled), Sn = qe.find((jn) => jn.created), In = qe[0];
    k.hoverIndex = Bn(Pt.value, Sn || In);
  }, Cn = () => {
    var qe;
    if (e.multiple)
      k.selectedLabel = "";
    else {
      const In = kt(e.modelValue);
      (qe = In.props) != null && qe.created ? (k.createdLabel = In.props.value, k.createdSelected = !0) : k.createdSelected = !1, k.selectedLabel = In.currentLabel, k.selected = In, e.filterable && (k.query = k.selectedLabel);
      return;
    }
    const Sn = [];
    Array.isArray(e.modelValue) && e.modelValue.forEach((In) => {
      Sn.push(kt(In));
    }), k.selected = Sn, nextTick(() => {
      Dt();
    });
  }, kt = (qe) => {
    let Sn;
    const In = toRawType(qe).toLowerCase() === "object", jn = toRawType(qe).toLowerCase() === "null", Ln = toRawType(qe).toLowerCase() === "undefined";
    for (let uo = k.cachedOptions.size - 1; uo >= 0; uo--) {
      const io = bn.value[uo];
      if (In ? get(io.value, e.valueKey) === get(qe, e.valueKey) : io.value === qe) {
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
    const Wn = In ? qe.label : !jn && !Ln ? qe : "", Un = {
      value: qe,
      currentLabel: Wn
    };
    return e.multiple && (Un.hitState = !1), Un;
  }, Et = () => {
    setTimeout(() => {
      const qe = e.valueKey;
      e.multiple ? k.selected.length > 0 ? k.hoverIndex = Math.min.apply(null, k.selected.map((Sn) => Pt.value.findIndex((In) => get(In, qe) === get(Sn, qe)))) : k.hoverIndex = -1 : k.hoverIndex = Pt.value.findIndex((Sn) => ro(Sn) === ro(k.selected));
    }, 300);
  }, wn = () => {
    var qe, Sn;
    Pn(), (Sn = (qe = ue.value) == null ? void 0 : qe.updatePopper) == null || Sn.call(qe), e.multiple && !e.filterable && Dt();
  }, Pn = () => {
    var qe;
    k.inputWidth = (qe = le.value) == null ? void 0 : qe.$el.getBoundingClientRect().width;
  }, hn = () => {
    e.filterable && k.query !== k.selectedLabel && (k.query = k.selectedLabel, At(k.query));
  }, On = debounce(() => {
    hn();
  }, Lt.value), Dn = debounce((qe) => {
    At(qe.target.value);
  }, Lt.value), Rn = (qe) => {
    isEqual(e.modelValue, qe) || oe.emit(CHANGE_EVENT, qe);
  }, Fn = (qe) => {
    if (qe.target.value.length <= 0 && !no()) {
      const Sn = e.modelValue.slice();
      Sn.pop(), oe.emit(UPDATE_MODEL_EVENT, Sn), Rn(Sn);
    }
    qe.target.value.length === 1 && e.modelValue.length === 0 && (k.currentPlaceholder = k.cachedPlaceHolder);
  }, Nn = (qe, Sn) => {
    const In = k.selected.indexOf(Sn);
    if (In > -1 && !xe.value) {
      const jn = e.modelValue.slice();
      jn.splice(In, 1), oe.emit(UPDATE_MODEL_EVENT, jn), Rn(jn), oe.emit("remove-tag", Sn.value);
    }
    qe.stopPropagation();
  }, An = (qe) => {
    qe.stopPropagation();
    const Sn = e.multiple ? [] : "";
    if (typeof Sn != "string")
      for (const In of k.selected)
        In.isDisabled && Sn.push(In.value);
    oe.emit(UPDATE_MODEL_EVENT, Sn), Rn(Sn), k.visible = !1, oe.emit("clear");
  }, Vn = (qe, Sn) => {
    var In;
    if (e.multiple) {
      const jn = (e.modelValue || []).slice(), Ln = Bn(jn, qe.value);
      Ln > -1 ? jn.splice(Ln, 1) : (e.multipleLimit <= 0 || jn.length < e.multipleLimit) && jn.push(qe.value), oe.emit(UPDATE_MODEL_EVENT, jn), Rn(jn), qe.created && (k.query = "", At(""), k.inputLength = 20), e.filterable && ((In = ie.value) == null || In.focus());
    } else
      oe.emit(UPDATE_MODEL_EVENT, qe.value), Rn(qe.value), k.visible = !1;
    k.isSilentBlur = Sn, Kn(), !k.visible && nextTick(() => {
      Yn(qe);
    });
  }, Bn = (qe = [], Sn) => {
    if (!isObject$1(Sn))
      return qe.indexOf(Sn);
    const In = e.valueKey;
    let jn = -1;
    return qe.some((Ln, Wn) => get(Ln, In) === get(Sn, In) ? (jn = Wn, !0) : !1), jn;
  }, Kn = () => {
    k.softFocus = !0;
    const qe = ie.value || le.value;
    qe && (qe == null || qe.focus());
  }, Yn = (qe) => {
    var Sn, In, jn, Ln, Wn;
    const Un = Array.isArray(qe) ? qe[0] : qe;
    let uo = null;
    if (Un != null && Un.value) {
      const io = Pt.value.filter((so) => so.value === Un.value);
      io.length > 0 && (uo = io[0].$el);
    }
    if (ue.value && uo) {
      const io = (Ln = (jn = (In = (Sn = ue.value) == null ? void 0 : Sn.popperRef) == null ? void 0 : In.contentRef) == null ? void 0 : jn.querySelector) == null ? void 0 : Ln.call(jn, `.${ae.be("dropdown", "wrap")}`);
      io && scrollIntoView(io, uo);
    }
    (Wn = Ce.value) == null || Wn.handleScroll();
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
      k.isOnComposition = !1, nextTick(() => At(Sn));
    else {
      const In = Sn[Sn.length - 1] || "";
      k.isOnComposition = !isKorean(In);
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
    An(qe);
  }, ao = () => {
    k.visible = !1;
  }, xn = (qe) => {
    k.visible && (qe.preventDefault(), qe.stopPropagation(), k.visible = !1);
  }, Jn = () => {
    var qe;
    xe.value || (k.menuVisibleOnFocus ? k.menuVisibleOnFocus = !1 : k.visible = !k.visible, k.visible && ((qe = ie.value || le.value) == null || qe.focus()));
  }, Qn = () => {
    k.visible ? Pt.value[k.hoverIndex] && Vn(Pt.value[k.hoverIndex], void 0) : Jn();
  }, ro = (qe) => isObject$1(qe.value) ? get(qe.value, e.valueKey) : qe.value, kn = computed(() => Pt.value.filter((qe) => qe.visible).every((qe) => qe.disabled)), Mn = (qe) => {
    if (!k.visible) {
      k.visible = !0;
      return;
    }
    if (!(k.options.size === 0 || k.filteredOptionsCount === 0) && !k.isOnComposition && !kn.value) {
      qe === "next" ? (k.hoverIndex++, k.hoverIndex === k.options.size && (k.hoverIndex = 0)) : qe === "prev" && (k.hoverIndex--, k.hoverIndex < 0 && (k.hoverIndex = k.options.size - 1));
      const Sn = Pt.value[k.hoverIndex];
      (Sn.disabled === !0 || Sn.states.groupDisabled === !0 || !Sn.visible) && Mn(qe), nextTick(() => Yn(_e.value));
    }
  };
  return {
    optionsArray: Pt,
    selectSize: Tn,
    handleResize: wn,
    debouncedOnInputChange: On,
    debouncedQueryChange: Dn,
    deletePrevTag: Fn,
    deleteTag: Nn,
    deleteSelected: An,
    handleOptionSelect: Vn,
    scrollToOption: Yn,
    readonly: Oe,
    resetInputHeight: Dt,
    showClose: Fe,
    iconComponent: Ie,
    iconReverse: Ue,
    showNewOption: En,
    collapseTagSize: $n,
    setSelected: Cn,
    managePlaceholder: vn,
    selectDisabled: xe,
    emptyText: ze,
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
    handleKeydownEscape: xn,
    toggleMenu: Jn,
    selectOption: Qn,
    getValueKey: ro,
    navigateOptions: Mn,
    dropMenuVisible: _n,
    queryChange: Ne,
    groupQueryChange: Ve,
    reference: le,
    input: ie,
    tooltipRef: ue,
    tags: de,
    selectWrapper: pe,
    scrollbar: Ce
  };
}, COMPONENT_NAME = "ElSelect", _sfc_main$g = defineComponent({
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
      debouncedQueryChange: Ne,
      deletePrevTag: Ve,
      deleteTag: $e,
      deleteSelected: he,
      handleOptionSelect: Oe,
      scrollToOption: xe,
      setSelected: Fe,
      resetInputHeight: Ie,
      managePlaceholder: Ue,
      showClose: Lt,
      selectDisabled: ze,
      iconComponent: Pt,
      iconReverse: bn,
      showNewOption: En,
      emptyText: Tn,
      toggleLastOptionHitState: $n,
      resetInputState: _n,
      handleComposition: Dt,
      onOptionCreate: At,
      onOptionDestroy: vn,
      handleMenuEnter: jt,
      handleFocus: Cn,
      blur: kt,
      handleBlur: Et,
      handleClearClick: wn,
      handleClose: Pn,
      handleKeydownEscape: hn,
      toggleMenu: On,
      selectOption: Dn,
      getValueKey: Rn,
      navigateOptions: Fn,
      dropMenuVisible: Nn,
      reference: An,
      input: Vn,
      tooltipRef: Bn,
      tags: Kn,
      selectWrapper: Yn,
      scrollbar: Xn,
      queryChange: eo,
      groupQueryChange: qn
    } = useSelect(e, le, k), { focus: no } = useFocus(An), {
      inputWidth: oo,
      selected: zn,
      inputLength: Hn,
      filteredOptionsCount: Gn,
      visible: Zn,
      softFocus: lo,
      selectedLabel: ao,
      hoverIndex: xn,
      query: Jn,
      inputHovering: Qn,
      currentPlaceholder: ro,
      menuVisibleOnFocus: kn,
      isOnComposition: Mn,
      isSilentBlur: qe,
      options: Sn,
      cachedOptions: In,
      optionsCount: jn,
      prefixWidth: Ln,
      tagInMultiLine: Wn
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
      cachedOptions: In,
      optionsCount: jn,
      filteredOptionsCount: Gn,
      hoverIndex: xn,
      handleOptionSelect: Oe,
      onOptionCreate: At,
      onOptionDestroy: vn,
      selectWrapper: Yn,
      selected: zn,
      setSelected: Fe,
      queryChange: eo,
      groupQueryChange: qn
    })), onMounted(() => {
      le.cachedPlaceHolder = ro.value = e.placeholder || ae("el.select.placeholder"), e.multiple && Array.isArray(e.modelValue) && e.modelValue.length > 0 && (ro.value = ""), useResizeObserver(Yn, pe), e.remote && e.multiple && Ie(), nextTick(() => {
        const so = An.value && An.value.$el;
        if (!!so && (oo.value = so.getBoundingClientRect().width, k.slots.prefix)) {
          const to = so.querySelector(`.${re.e("prefix")}`);
          Ln.value = Math.max(to.getBoundingClientRect().width + 5, 30);
        }
      }), Fe();
    }), e.multiple && !Array.isArray(e.modelValue) && k.emit(UPDATE_MODEL_EVENT, []), !e.multiple && Array.isArray(e.modelValue) && k.emit(UPDATE_MODEL_EVENT, "");
    const io = computed(() => {
      var so, to;
      return (to = (so = Bn.value) == null ? void 0 : so.popperRef) == null ? void 0 : to.contentRef;
    });
    return {
      tagInMultiLine: Wn,
      prefixWidth: Ln,
      selectSize: ue,
      readonly: de,
      handleResize: pe,
      collapseTagSize: Ce,
      debouncedOnInputChange: _e,
      debouncedQueryChange: Ne,
      deletePrevTag: Ve,
      deleteTag: $e,
      deleteSelected: he,
      handleOptionSelect: Oe,
      scrollToOption: xe,
      inputWidth: oo,
      selected: zn,
      inputLength: Hn,
      filteredOptionsCount: Gn,
      visible: Zn,
      softFocus: lo,
      selectedLabel: ao,
      hoverIndex: xn,
      query: Jn,
      inputHovering: Qn,
      currentPlaceholder: ro,
      menuVisibleOnFocus: kn,
      isOnComposition: Mn,
      isSilentBlur: qe,
      options: Sn,
      resetInputHeight: Ie,
      managePlaceholder: Ue,
      showClose: Lt,
      selectDisabled: ze,
      iconComponent: Pt,
      iconReverse: bn,
      showNewOption: En,
      emptyText: Tn,
      toggleLastOptionHitState: $n,
      resetInputState: _n,
      handleComposition: Dt,
      handleMenuEnter: jt,
      handleFocus: Cn,
      blur: kt,
      handleBlur: Et,
      handleClearClick: wn,
      handleClose: Pn,
      handleKeydownEscape: hn,
      toggleMenu: On,
      selectOption: Dn,
      getValueKey: Rn,
      navigateOptions: Fn,
      dropMenuVisible: Nn,
      focus: no,
      reference: An,
      input: Vn,
      tooltipRef: Bn,
      popperPaneRef: io,
      tags: Kn,
      selectWrapper: Yn,
      scrollbar: Xn,
      wrapperKls: Un,
      selectTagsStyle: uo,
      nsSelect: oe
    };
  }
}), _hoisted_1$8 = { class: "select-trigger" }, _hoisted_2$5 = ["disabled", "autocomplete"], _hoisted_3$2 = { style: { height: "100%", display: "flex", "justify-content": "center", "align-items": "center" } };
function _sfc_render$6(e, k, oe, re, ae, le) {
  const ie = resolveComponent("el-tag"), ue = resolveComponent("el-tooltip"), de = resolveComponent("el-icon"), pe = resolveComponent("el-input"), Ce = resolveComponent("el-option"), _e = resolveComponent("el-scrollbar"), Ne = resolveComponent("el-select-menu"), Ve = resolveDirective("click-outside");
  return withDirectives((openBlock(), createElementBlock("div", {
    ref: "selectWrapper",
    class: normalizeClass(e.wrapperKls),
    onClick: k[22] || (k[22] = withModifiers((...$e) => e.toggleMenu && e.toggleMenu(...$e), ["stop"]))
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
        createElementVNode("div", _hoisted_1$8, [
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
                onClose: k[0] || (k[0] = ($e) => e.deleteTag($e, e.selected[0]))
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
                        (openBlock(!0), createElementBlock(Fragment, null, renderList(e.selected.slice(1), ($e, he) => (openBlock(), createElementBlock("div", {
                          key: he,
                          class: normalizeClass(e.nsSelect.e("collapse-tag"))
                        }, [
                          (openBlock(), createBlock(ie, {
                            key: e.getValueKey($e),
                            class: "in-tooltip",
                            closable: !e.selectDisabled && !$e.isDisabled,
                            size: e.collapseTagSize,
                            hit: $e.hitState,
                            type: e.tagType,
                            "disable-transitions": "",
                            style: { margin: "2px" },
                            onClose: (Oe) => e.deleteTag(Oe, $e)
                          }, {
                            default: withCtx(() => [
                              createElementVNode("span", {
                                class: normalizeClass(e.nsSelect.e("tags-text")),
                                style: normalizeStyle({
                                  maxWidth: e.inputWidth - 75 + "px"
                                })
                              }, toDisplayString($e.currentLabel), 7)
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
                  (openBlock(!0), createElementBlock(Fragment, null, renderList(e.selected, ($e) => (openBlock(), createBlock(ie, {
                    key: e.getValueKey($e),
                    closable: !e.selectDisabled && !$e.isDisabled,
                    size: e.collapseTagSize,
                    hit: $e.hitState,
                    type: e.tagType,
                    "disable-transitions": "",
                    onClose: (he) => e.deleteTag(he, $e)
                  }, {
                    default: withCtx(() => [
                      createElementVNode("span", {
                        class: normalizeClass(e.nsSelect.e("tags-text")),
                        style: normalizeStyle({ maxWidth: e.inputWidth - 75 + "px" })
                      }, toDisplayString($e.currentLabel), 7)
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
              "onUpdate:modelValue": k[1] || (k[1] = ($e) => e.query = $e),
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
              onFocus: k[2] || (k[2] = (...$e) => e.handleFocus && e.handleFocus(...$e)),
              onBlur: k[3] || (k[3] = (...$e) => e.handleBlur && e.handleBlur(...$e)),
              onKeyup: k[4] || (k[4] = (...$e) => e.managePlaceholder && e.managePlaceholder(...$e)),
              onKeydown: [
                k[5] || (k[5] = (...$e) => e.resetInputState && e.resetInputState(...$e)),
                k[6] || (k[6] = withKeys(withModifiers(($e) => e.navigateOptions("next"), ["prevent"]), ["down"])),
                k[7] || (k[7] = withKeys(withModifiers(($e) => e.navigateOptions("prev"), ["prevent"]), ["up"])),
                k[8] || (k[8] = withKeys((...$e) => e.handleKeydownEscape && e.handleKeydownEscape(...$e), ["esc"])),
                k[9] || (k[9] = withKeys(withModifiers((...$e) => e.selectOption && e.selectOption(...$e), ["stop", "prevent"]), ["enter"])),
                k[10] || (k[10] = withKeys((...$e) => e.deletePrevTag && e.deletePrevTag(...$e), ["delete"])),
                k[11] || (k[11] = withKeys(($e) => e.visible = !1, ["tab"]))
              ],
              onCompositionstart: k[12] || (k[12] = (...$e) => e.handleComposition && e.handleComposition(...$e)),
              onCompositionupdate: k[13] || (k[13] = (...$e) => e.handleComposition && e.handleComposition(...$e)),
              onCompositionend: k[14] || (k[14] = (...$e) => e.handleComposition && e.handleComposition(...$e)),
              onInput: k[15] || (k[15] = (...$e) => e.debouncedQueryChange && e.debouncedQueryChange(...$e))
            }, null, 46, _hoisted_2$5)), [
              [vModelText, e.query]
            ]) : createCommentVNode("v-if", !0)
          ], 6)) : createCommentVNode("v-if", !0),
          createVNode(pe, {
            id: e.id,
            ref: "reference",
            modelValue: e.selectedLabel,
            "onUpdate:modelValue": k[16] || (k[16] = ($e) => e.selectedLabel = $e),
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
              k[17] || (k[17] = withKeys(withModifiers(($e) => e.navigateOptions("next"), ["stop", "prevent"]), ["down"])),
              k[18] || (k[18] = withKeys(withModifiers(($e) => e.navigateOptions("prev"), ["stop", "prevent"]), ["up"])),
              withKeys(withModifiers(e.selectOption, ["stop", "prevent"]), ["enter"]),
              withKeys(e.handleKeydownEscape, ["esc"]),
              k[19] || (k[19] = withKeys(($e) => e.visible = !1, ["tab"]))
            ],
            onMouseenter: k[20] || (k[20] = ($e) => e.inputHovering = !0),
            onMouseleave: k[21] || (k[21] = ($e) => e.inputHovering = !1)
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
var Select = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$6], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/select/src/select.vue"]]);
const _sfc_main$f = defineComponent({
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
function _sfc_render$5(e, k, oe, re, ae, le) {
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
var OptionGroup = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$5], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/select/src/option-group.vue"]]);
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
}, _hoisted_1$7 = ["id", "aria-label", "aria-labelledby", "aria-valuenow", "aria-valuetext", "aria-valuemax"], _hoisted_2$4 = ["onMousemove", "onClick"], __default__$5 = {
  name: "ElRate"
}, _sfc_main$e = /* @__PURE__ */ defineComponent({
  ...__default__$5,
  props: rateProps,
  emits: rateEmits,
  setup(e, { expose: k, emit: oe }) {
    const re = e;
    function ae(jt, Cn) {
      const kt = (Pn) => isObject$1(Pn), Et = Object.keys(Cn).map((Pn) => +Pn).filter((Pn) => {
        const hn = Cn[Pn];
        return (kt(hn) ? hn.excluded : !1) ? jt < Pn : jt <= Pn;
      }).sort((Pn, hn) => Pn - hn), wn = Cn[Et[0]];
      return kt(wn) && wn.value || wn;
    }
    const le = inject(formContextKey, void 0), ie = inject(formItemContextKey, void 0), ue = useSize(), de = useNamespace("rate"), { inputId: pe, isLabeledByFormItem: Ce } = useFormItemInputId(re, {
      formItemContext: ie
    }), _e = ref(re.modelValue), Ne = ref(-1), Ve = ref(!0), $e = computed(() => [de.b(), de.m(ue.value)]), he = computed(() => re.disabled || (le == null ? void 0 : le.disabled)), Oe = computed(() => de.cssVarBlock({
      "void-color": re.voidColor,
      "disabled-void-color": re.disabledVoidColor,
      "fill-color": Ue.value
    })), xe = computed(() => {
      let jt = "";
      return re.showScore ? jt = re.scoreTemplate.replace(/\{\s*value\s*\}/, he.value ? `${re.modelValue}` : `${_e.value}`) : re.showText && (jt = re.texts[Math.ceil(_e.value) - 1]), jt;
    }), Fe = computed(() => re.modelValue * 100 - Math.floor(re.modelValue) * 100), Ie = computed(() => isArray(re.colors) ? {
      [re.lowThreshold]: re.colors[0],
      [re.highThreshold]: { value: re.colors[1], excluded: !0 },
      [re.max]: re.colors[2]
    } : re.colors), Ue = computed(() => {
      const jt = ae(_e.value, Ie.value);
      return isObject$1(jt) ? "" : jt;
    }), Lt = computed(() => {
      let jt = "";
      return he.value ? jt = `${Fe.value}%` : re.allowHalf && (jt = "50%"), {
        color: Ue.value,
        width: jt
      };
    }), ze = computed(() => isArray(re.icons) ? {
      [re.lowThreshold]: re.icons[0],
      [re.highThreshold]: {
        value: re.icons[1],
        excluded: !0
      },
      [re.max]: re.icons[2]
    } : re.icons), Pt = computed(() => ae(re.modelValue, ze.value)), bn = computed(() => he.value ? re.disabledVoidIcon : re.voidIcon), En = computed(() => ae(_e.value, ze.value)), Tn = computed(() => {
      const jt = Array.from({ length: re.max }), Cn = _e.value;
      return jt.fill(En.value, 0, Cn), jt.fill(bn.value, Cn, re.max), jt;
    });
    function $n(jt) {
      const Cn = he.value && Fe.value > 0 && jt - 1 < re.modelValue && jt > re.modelValue, kt = re.allowHalf && Ve.value && jt - 0.5 <= _e.value && jt > _e.value;
      return Cn || kt;
    }
    function _n(jt) {
      he.value || (re.allowHalf && Ve.value ? (oe(UPDATE_MODEL_EVENT, _e.value), re.modelValue !== _e.value && oe("change", _e.value)) : (oe(UPDATE_MODEL_EVENT, jt), re.modelValue !== jt && oe("change", jt)));
    }
    function Dt(jt) {
      if (he.value)
        return;
      let Cn = _e.value;
      const kt = jt.code;
      return kt === EVENT_CODE.up || kt === EVENT_CODE.right ? (re.allowHalf ? Cn += 0.5 : Cn += 1, jt.stopPropagation(), jt.preventDefault()) : (kt === EVENT_CODE.left || kt === EVENT_CODE.down) && (re.allowHalf ? Cn -= 0.5 : Cn -= 1, jt.stopPropagation(), jt.preventDefault()), Cn = Cn < 0 ? 0 : Cn, Cn = Cn > re.max ? re.max : Cn, oe(UPDATE_MODEL_EVENT, Cn), oe("change", Cn), Cn;
    }
    function At(jt, Cn) {
      if (!he.value) {
        if (re.allowHalf) {
          let kt = Cn.target;
          hasClass$1(kt, de.e("item")) && (kt = kt.querySelector(`.${de.e("icon")}`)), (kt.clientWidth === 0 || hasClass$1(kt, de.e("decimal"))) && (kt = kt.parentNode), Ve.value = Cn.offsetX * 2 <= kt.clientWidth, _e.value = Ve.value ? jt - 0.5 : jt;
        } else
          _e.value = jt;
        Ne.value = jt;
      }
    }
    function vn() {
      he.value || (re.allowHalf && (Ve.value = re.modelValue !== Math.floor(re.modelValue)), _e.value = re.modelValue, Ne.value = -1);
    }
    return watch(() => re.modelValue, (jt) => {
      _e.value = jt, Ve.value = re.modelValue !== Math.floor(re.modelValue);
    }), re.modelValue || oe(UPDATE_MODEL_EVENT, 0), k({
      setCurrentValue: At,
      resetCurrentValue: vn
    }), (jt, Cn) => {
      var kt;
      return openBlock(), createElementBlock("div", {
        id: unref(pe),
        class: normalizeClass([unref($e), unref(de).is("disabled", unref(he))]),
        role: "slider",
        "aria-label": unref(Ce) ? void 0 : jt.label || "rating",
        "aria-labelledby": unref(Ce) ? (kt = unref(ie)) == null ? void 0 : kt.labelId : void 0,
        "aria-valuenow": _e.value,
        "aria-valuetext": unref(xe) || void 0,
        "aria-valuemin": "0",
        "aria-valuemax": jt.max,
        tabindex: "0",
        style: normalizeStyle(unref(Oe)),
        onKeydown: Dt
      }, [
        (openBlock(!0), createElementBlock(Fragment, null, renderList(jt.max, (Et, wn) => (openBlock(), createElementBlock("span", {
          key: wn,
          class: normalizeClass(unref(de).e("item")),
          onMousemove: (Pn) => At(Et, Pn),
          onMouseleave: vn,
          onClick: (Pn) => _n(Et)
        }, [
          createVNode(unref(ElIcon), {
            class: normalizeClass([
              unref(de).e("icon"),
              { hover: Ne.value === Et },
              unref(de).is("active", Et <= _e.value)
            ])
          }, {
            default: withCtx(() => [
              $n(Et) ? createCommentVNode("v-if", !0) : (openBlock(), createBlock(resolveDynamicComponent(unref(Tn)[Et - 1]), { key: 0 })),
              $n(Et) ? (openBlock(), createBlock(unref(ElIcon), {
                key: 1,
                style: normalizeStyle(unref(Lt)),
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
        }, toDisplayString(unref(xe)), 3)) : createCommentVNode("v-if", !0)
      ], 46, _hoisted_1$7);
    };
  }
});
var Rate = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/rate/src/rate.vue"]]);
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
}, _sfc_main$d = /* @__PURE__ */ defineComponent({
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
var Row = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/row/src/row.vue"]]);
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
  }, pe = computed(() => e.disabled || (re == null ? void 0 : re.disabled) || !1), Ce = computed(() => Math.min(k.firstValue, k.secondValue)), _e = computed(() => Math.max(k.firstValue, k.secondValue)), Ne = computed(() => e.range ? `${100 * (_e.value - Ce.value) / (e.max - e.min)}%` : `${100 * (k.firstValue - e.min) / (e.max - e.min)}%`), Ve = computed(() => e.range ? `${100 * (Ce.value - e.min) / (e.max - e.min)}%` : "0%"), $e = computed(() => e.vertical ? { height: e.height } : {}), he = computed(() => e.vertical ? {
    height: Ne.value,
    bottom: Ve.value
  } : {
    width: Ne.value,
    left: Ve.value
  }), Oe = () => {
    le.value && (k.sliderSize = le.value[`client${e.vertical ? "Height" : "Width"}`]);
  }, xe = ($n) => {
    const _n = e.min + $n * (e.max - e.min) / 100;
    if (!e.range)
      return ie;
    let Dt;
    return Math.abs(Ce.value - _n) < Math.abs(_e.value - _n) ? Dt = k.firstValue < k.secondValue ? "firstButton" : "secondButton" : Dt = k.firstValue > k.secondValue ? "firstButton" : "secondButton", de[Dt];
  }, Fe = ($n) => {
    const _n = xe($n);
    return _n.value.setPosition($n), _n;
  }, Ie = ($n) => {
    k.firstValue = $n, Lt(e.range ? [Ce.value, _e.value] : $n);
  }, Ue = ($n) => {
    k.secondValue = $n, e.range && Lt([Ce.value, _e.value]);
  }, Lt = ($n) => {
    oe(UPDATE_MODEL_EVENT, $n), oe(INPUT_EVENT, $n);
  }, ze = async () => {
    await nextTick(), oe(CHANGE_EVENT, e.range ? [Ce.value, _e.value] : e.modelValue);
  }, Pt = ($n) => {
    var _n, Dt, At, vn, jt, Cn;
    if (pe.value || k.dragging)
      return;
    Oe();
    let kt = 0;
    if (e.vertical) {
      const Et = (At = (Dt = (_n = $n.touches) == null ? void 0 : _n.item(0)) == null ? void 0 : Dt.clientY) != null ? At : $n.clientY;
      kt = (le.value.getBoundingClientRect().bottom - Et) / k.sliderSize * 100;
    } else {
      const Et = (Cn = (jt = (vn = $n.touches) == null ? void 0 : vn.item(0)) == null ? void 0 : jt.clientX) != null ? Cn : $n.clientX, wn = le.value.getBoundingClientRect().left;
      kt = (Et - wn) / k.sliderSize * 100;
    }
    if (!(kt < 0 || kt > 100))
      return Fe(kt);
  };
  return {
    elFormItem: ae,
    slider: le,
    firstButton: ie,
    secondButton: ue,
    sliderDisabled: pe,
    minValue: Ce,
    maxValue: _e,
    runwayStyle: $e,
    barStyle: he,
    resetSize: Oe,
    setPosition: Fe,
    emitChange: ze,
    onSliderWrapperPrevent: ($n) => {
      var _n, Dt;
      (((_n = de.firstButton.value) == null ? void 0 : _n.dragging) || ((Dt = de.secondButton.value) == null ? void 0 : Dt.dragging)) && $n.preventDefault();
    },
    onSliderClick: ($n) => {
      Pt($n) && ze();
    },
    onSliderDown: async ($n) => {
      const _n = Pt($n);
      _n && (await nextTick(), _n.value.onButtonDown($n));
    },
    setFirstValue: Ie,
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
    emitChange: _e,
    resetSize: Ne,
    updateDragging: Ve
  } = inject(sliderContextKey), { tooltip: $e, tooltipVisible: he, formatValue: Oe, displayTooltip: xe, hideTooltip: Fe } = useTooltip(e, Ce, ue), Ie = ref(), Ue = computed(() => `${(e.modelValue - ae.value) / (le.value - ae.value) * 100}%`), Lt = computed(() => e.vertical ? { bottom: Ue.value } : { left: Ue.value }), ze = () => {
    k.hovering = !0, xe();
  }, Pt = () => {
    k.hovering = !1, k.dragging || Fe();
  }, bn = (hn) => {
    re.value || (hn.preventDefault(), kt(hn), window.addEventListener("mousemove", Et), window.addEventListener("touchmove", Et), window.addEventListener("mouseup", wn), window.addEventListener("touchend", wn), window.addEventListener("contextmenu", wn), Ie.value.focus());
  }, En = (hn) => {
    re.value || (k.newPosition = Number.parseFloat(Ue.value) + hn / (le.value - ae.value) * 100, Pn(k.newPosition), _e());
  }, Tn = () => {
    En(-ie.value);
  }, $n = () => {
    En(ie.value);
  }, _n = () => {
    En(-ie.value * 4);
  }, Dt = () => {
    En(ie.value * 4);
  }, At = () => {
    re.value || (Pn(0), _e());
  }, vn = () => {
    re.value || (Pn(100), _e());
  }, jt = (hn) => {
    let On = !0;
    [left, down].includes(hn.key) ? Tn() : [right, up].includes(hn.key) ? $n() : hn.key === home ? At() : hn.key === end ? vn() : hn.key === pageDown ? _n() : hn.key === pageUp ? Dt() : On = !1, On && hn.preventDefault();
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
      k.isClick = !1, xe(), Ne();
      let On;
      const { clientX: Dn, clientY: Rn } = Cn(hn);
      e.vertical ? (k.currentY = Rn, On = (k.startY - k.currentY) / pe.value * 100) : (k.currentX = Dn, On = (k.currentX - k.startX) / pe.value * 100), k.newPosition = k.startPosition + On, Pn(k.newPosition);
    }
  }, wn = () => {
    k.dragging && (setTimeout(() => {
      k.dragging = !1, k.hovering || Fe(), k.isClick || (Pn(k.newPosition), _e());
    }, 0), window.removeEventListener("mousemove", Et), window.removeEventListener("touchmove", Et), window.removeEventListener("mouseup", wn), window.removeEventListener("touchend", wn), window.removeEventListener("contextmenu", wn));
  }, Pn = async (hn) => {
    if (hn === null || Number.isNaN(+hn))
      return;
    hn < 0 ? hn = 0 : hn > 100 && (hn = 100);
    const On = 100 / ((le.value - ae.value) / ie.value);
    let Rn = Math.round(hn / On) * On * (le.value - ae.value) * 0.01 + ae.value;
    Rn = Number.parseFloat(Rn.toFixed(de.value)), Rn !== e.modelValue && oe(UPDATE_MODEL_EVENT, Rn), !k.dragging && e.modelValue !== k.oldValue && (k.oldValue = e.modelValue), await nextTick(), k.dragging && xe(), $e.value.updatePopper();
  };
  return watch(() => k.dragging, (hn) => {
    Ve(hn);
  }), {
    disabled: re,
    button: Ie,
    tooltip: $e,
    tooltipVisible: he,
    showTooltip: ue,
    wrapperStyle: Lt,
    formatValue: Oe,
    handleMouseEnter: ze,
    handleMouseLeave: Pt,
    onButtonDown: bn,
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
    e.range && Array.isArray(_e) ? _e[1] < e.min ? ie([e.min, e.min]) : _e[0] > e.max ? ie([e.max, e.max]) : _e[0] < e.min ? ie([e.min, _e[1]]) : _e[1] > e.max ? ie([_e[0], e.max]) : (k.firstValue = _e[0], k.secondValue = _e[1], ue() && (e.validateEvent && ((pe = le == null ? void 0 : le.validate) == null || pe.call(le, "change").catch((Ne) => debugWarn(Ne))), k.oldValue = _e.slice())) : !e.range && typeof _e == "number" && !Number.isNaN(_e) && (_e < e.min ? ie(e.min) : _e > e.max ? ie(e.max) : (k.firstValue = _e, ue() && (e.validateEvent && ((Ce = le == null ? void 0 : le.validate) == null || Ce.call(le, "change").catch((Ne) => debugWarn(Ne))), k.oldValue = _e)));
  };
  de(), watch(() => k.dragging, (pe) => {
    pe || de();
  }), watch(() => e.modelValue, (pe, Ce) => {
    k.dragging || Array.isArray(pe) && Array.isArray(Ce) && pe.every((_e, Ne) => _e === Ce[Ne]) && k.firstValue === pe[0] && k.secondValue === pe[1] || de();
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
}, _hoisted_1$6 = ["tabindex"], __default__$3 = {
  name: "ElSliderButton"
}, _sfc_main$c = /* @__PURE__ */ defineComponent({
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
      formatValue: Ne,
      handleMouseEnter: Ve,
      handleMouseLeave: $e,
      onButtonDown: he,
      onKeyDown: Oe,
      setPosition: xe
    } = useSliderButton(re, le, oe), { hovering: Fe, dragging: Ie } = toRefs(le);
    return k({
      onButtonDown: he,
      onKeyDown: Oe,
      setPosition: xe,
      hovering: Fe,
      dragging: Ie
    }), (Ue, Lt) => (openBlock(), createElementBlock("div", {
      ref_key: "button",
      ref: ue,
      class: normalizeClass([unref(ae).e("button-wrapper"), { hover: unref(Fe), dragging: unref(Ie) }]),
      style: normalizeStyle(unref(_e)),
      tabindex: unref(ie) ? -1 : 0,
      onMouseenter: Lt[0] || (Lt[0] = (...ze) => unref(Ve) && unref(Ve)(...ze)),
      onMouseleave: Lt[1] || (Lt[1] = (...ze) => unref($e) && unref($e)(...ze)),
      onMousedown: Lt[2] || (Lt[2] = (...ze) => unref(he) && unref(he)(...ze)),
      onTouchstart: Lt[3] || (Lt[3] = (...ze) => unref(he) && unref(he)(...ze)),
      onFocus: Lt[4] || (Lt[4] = (...ze) => unref(Ve) && unref(Ve)(...ze)),
      onBlur: Lt[5] || (Lt[5] = (...ze) => unref($e) && unref($e)(...ze)),
      onKeydown: Lt[6] || (Lt[6] = (...ze) => unref(Oe) && unref(Oe)(...ze))
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
            class: normalizeClass([unref(ae).e("button"), { hover: unref(Fe), dragging: unref(Ie) }])
          }, null, 2)
        ]),
        _: 1
      }, 8, ["visible", "placement", "popper-class", "disabled"])
    ], 46, _hoisted_1$6));
  }
});
var SliderButton = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/slider/src/button.vue"]]);
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
const _hoisted_1$5 = ["id", "role", "aria-label", "aria-labelledby"], _hoisted_2$3 = { key: 1 }, __default__$2 = {
  name: "ElSlider"
}, _sfc_main$b = /* @__PURE__ */ defineComponent({
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
      minValue: Ne,
      maxValue: Ve,
      runwayStyle: $e,
      barStyle: he,
      resetSize: Oe,
      emitChange: xe,
      onSliderWrapperPrevent: Fe,
      onSliderClick: Ie,
      onSliderDown: Ue,
      setFirstValue: Lt,
      setSecondValue: ze
    } = useSlide(re, ie, oe), { stops: Pt, getStopStyle: bn } = useStops(re, ie, Ne, Ve), { inputId: En, isLabeledByFormItem: Tn } = useFormItemInputId(re, {
      formItemContext: ue
    }), $n = useSize(), _n = computed(() => re.inputSize || $n.value), Dt = computed(() => re.label || le("el.slider.defaultLabel", {
      min: re.min,
      max: re.max
    })), At = computed(() => re.range ? re.rangeStartLabel || le("el.slider.defaultRangeStartLabel") : Dt.value), vn = computed(() => re.formatValueText ? re.formatValueText(hn.value) : `${hn.value}`), jt = computed(() => re.rangeEndLabel || le("el.slider.defaultRangeEndLabel")), Cn = computed(() => re.formatValueText ? re.formatValueText(On.value) : `${On.value}`), kt = computed(() => [
      ae.b(),
      ae.m($n.value),
      ae.is("vertical", re.vertical),
      { [ae.m("with-input")]: re.showInput }
    ]), Et = useMarks(re);
    useWatch(re, ie, Ne, Ve, oe, ue);
    const wn = computed(() => {
      const Fn = [re.min, re.max, re.step].map((Nn) => {
        const An = `${Nn}`.split(".")[1];
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
      precision: wn,
      emitChange: xe,
      resetSize: Oe,
      updateDragging: Rn
    }), k({
      onSliderClick: Ie
    }), (Fn, Nn) => {
      var An, Vn;
      return openBlock(), createElementBlock("div", {
        id: Fn.range ? unref(En) : void 0,
        ref_key: "sliderWrapper",
        ref: Pn,
        class: normalizeClass(unref(kt)),
        role: Fn.range ? "group" : void 0,
        "aria-label": Fn.range && !unref(Tn) ? unref(Dt) : void 0,
        "aria-labelledby": Fn.range && unref(Tn) ? (An = unref(ue)) == null ? void 0 : An.labelId : void 0,
        onTouchstart: Nn[2] || (Nn[2] = (...Bn) => unref(Fe) && unref(Fe)(...Bn)),
        onTouchmove: Nn[3] || (Nn[3] = (...Bn) => unref(Fe) && unref(Fe)(...Bn))
      }, [
        createElementVNode("div", {
          ref_key: "slider",
          ref: de,
          class: normalizeClass([
            unref(ae).e("runway"),
            { "show-input": Fn.showInput && !Fn.range },
            unref(ae).is("disabled", unref(_e))
          ]),
          style: normalizeStyle(unref($e)),
          onMousedown: Nn[0] || (Nn[0] = (...Bn) => unref(Ue) && unref(Ue)(...Bn)),
          onTouchstart: Nn[1] || (Nn[1] = (...Bn) => unref(Ue) && unref(Ue)(...Bn))
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
            "aria-label": Fn.range || !unref(Tn) ? unref(At) : void 0,
            "aria-labelledby": !Fn.range && unref(Tn) ? (Vn = unref(ue)) == null ? void 0 : Vn.labelId : void 0,
            "aria-valuemin": Fn.min,
            "aria-valuemax": Fn.range ? unref(On) : Fn.max,
            "aria-valuenow": unref(hn),
            "aria-valuetext": unref(vn),
            "aria-orientation": Fn.vertical ? "vertical" : "horizontal",
            "aria-disabled": unref(_e),
            "onUpdate:modelValue": unref(Lt)
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
            "aria-disabled": unref(_e),
            "onUpdate:modelValue": unref(ze)
          }, null, 8, ["model-value", "vertical", "tooltip-class", "placement", "aria-label", "aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-valuetext", "aria-orientation", "aria-disabled", "onUpdate:modelValue"])) : createCommentVNode("v-if", !0),
          Fn.showStops ? (openBlock(), createElementBlock("div", _hoisted_2$3, [
            (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(Pt), (Bn, Kn) => (openBlock(), createElementBlock("div", {
              key: Kn,
              class: normalizeClass(unref(ae).e("stop")),
              style: normalizeStyle(unref(bn)(Bn))
            }, null, 6))), 128))
          ])) : createCommentVNode("v-if", !0),
          unref(Et).length > 0 ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
            createElementVNode("div", null, [
              (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(Et), (Bn, Kn) => (openBlock(), createElementBlock("div", {
                key: Kn,
                style: normalizeStyle(unref(bn)(Bn.position)),
                class: normalizeClass([unref(ae).e("stop"), unref(ae).e("marks-stop")])
              }, null, 6))), 128))
            ]),
            createElementVNode("div", {
              class: normalizeClass(unref(ae).e("marks"))
            }, [
              (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(Et), (Bn, Kn) => (openBlock(), createBlock(unref(SliderMarker), {
                key: Kn,
                mark: Bn.mark,
                style: normalizeStyle(unref(bn)(Bn.position))
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
          size: unref(_n),
          "onUpdate:modelValue": unref(Lt),
          onChange: unref(xe)
        }, null, 8, ["model-value", "class", "step", "disabled", "controls", "min", "max", "debounce", "size", "onUpdate:modelValue", "onChange"])) : createCommentVNode("v-if", !0)
      ], 42, _hoisted_1$5);
    };
  }
});
var Slider = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/slider/src/slider.vue"]]);
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
}, _hoisted_1$4 = ["onClick"], _hoisted_2$2 = ["id", "aria-checked", "aria-disabled", "name", "true-value", "false-value", "disabled", "tabindex", "onKeydown"], _hoisted_3$1 = ["aria-hidden"], _hoisted_4 = ["aria-hidden"], _hoisted_5 = ["aria-hidden"], _hoisted_6 = ["aria-hidden"], __default__$1 = {
  name: "ElSwitch"
}, _sfc_main$a = /* @__PURE__ */ defineComponent({
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
      var ze;
      return !!((ze = le.vnode.props) != null && ze.value);
    }));
    const { inputId: pe } = useFormItemInputId(re, {
      formItemContext: ie
    }), Ce = useDisabled$1(computed(() => re.loading)), _e = ref(re.modelValue !== !1), Ne = ref(), Ve = ref(), $e = computed(() => [
      de.b(),
      de.m(ue.value),
      de.is("disabled", Ce.value),
      de.is("checked", xe.value)
    ]), he = computed(() => ({
      width: addUnit(re.width)
    }));
    watch(() => re.modelValue, () => {
      _e.value = !0;
    }), watch(() => re.value, () => {
      _e.value = !1;
    });
    const Oe = computed(() => _e.value ? re.modelValue : re.value), xe = computed(() => Oe.value === re.activeValue);
    [re.activeValue, re.inactiveValue].includes(Oe.value) || (oe(UPDATE_MODEL_EVENT, re.inactiveValue), oe(CHANGE_EVENT, re.inactiveValue), oe(INPUT_EVENT, re.inactiveValue)), watch(xe, (ze) => {
      var Pt;
      Ne.value.checked = ze, re.validateEvent && ((Pt = ie == null ? void 0 : ie.validate) == null || Pt.call(ie, "change").catch((bn) => debugWarn(bn)));
    });
    const Fe = () => {
      const ze = xe.value ? re.inactiveValue : re.activeValue;
      oe(UPDATE_MODEL_EVENT, ze), oe(CHANGE_EVENT, ze), oe(INPUT_EVENT, ze), nextTick(() => {
        Ne.value.checked = xe.value;
      });
    }, Ie = () => {
      if (Ce.value)
        return;
      const { beforeChange: ze } = re;
      if (!ze) {
        Fe();
        return;
      }
      const Pt = ze();
      [
        isPromise(Pt),
        isBoolean(Pt)
      ].includes(!0) || throwError(ae, "beforeChange must return type `Promise<boolean>` or `boolean`"), isPromise(Pt) ? Pt.then((En) => {
        En && Fe();
      }).catch((En) => {
        debugWarn(ae, `some error occurred: ${En}`);
      }) : Pt && Fe();
    }, Ue = computed(() => de.cssVarBlock({
      ...re.activeColor ? { "on-color": re.activeColor } : null,
      ...re.inactiveColor ? { "off-color": re.inactiveColor } : null,
      ...re.borderColor ? { "border-color": re.borderColor } : null
    })), Lt = () => {
      var ze, Pt;
      (Pt = (ze = Ne.value) == null ? void 0 : ze.focus) == null || Pt.call(ze);
    };
    return onMounted(() => {
      Ne.value.checked = xe.value;
    }), k({
      focus: Lt
    }), (ze, Pt) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(unref($e)),
      style: normalizeStyle(unref(Ue)),
      onClick: withModifiers(Ie, ["prevent"])
    }, [
      createElementVNode("input", {
        id: unref(pe),
        ref_key: "input",
        ref: Ne,
        class: normalizeClass(unref(de).e("input")),
        type: "checkbox",
        role: "switch",
        "aria-checked": unref(xe),
        "aria-disabled": unref(Ce),
        name: ze.name,
        "true-value": ze.activeValue,
        "false-value": ze.inactiveValue,
        disabled: unref(Ce),
        tabindex: ze.tabindex,
        onChange: Fe,
        onKeydown: withKeys(Ie, ["enter"])
      }, null, 42, _hoisted_2$2),
      !ze.inlinePrompt && (ze.inactiveIcon || ze.inactiveText) ? (openBlock(), createElementBlock("span", {
        key: 0,
        class: normalizeClass([
          unref(de).e("label"),
          unref(de).em("label", "left"),
          unref(de).is("active", !unref(xe))
        ])
      }, [
        ze.inactiveIcon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
          default: withCtx(() => [
            (openBlock(), createBlock(resolveDynamicComponent(ze.inactiveIcon)))
          ]),
          _: 1
        })) : createCommentVNode("v-if", !0),
        !ze.inactiveIcon && ze.inactiveText ? (openBlock(), createElementBlock("span", {
          key: 1,
          "aria-hidden": unref(xe)
        }, toDisplayString(ze.inactiveText), 9, _hoisted_3$1)) : createCommentVNode("v-if", !0)
      ], 2)) : createCommentVNode("v-if", !0),
      createElementVNode("span", {
        ref_key: "core",
        ref: Ve,
        class: normalizeClass(unref(de).e("core")),
        style: normalizeStyle(unref(he))
      }, [
        ze.inlinePrompt ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(de).e("inner"))
        }, [
          ze.activeIcon || ze.inactiveIcon ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            ze.activeIcon ? (openBlock(), createBlock(unref(ElIcon), {
              key: 0,
              class: normalizeClass([unref(de).is("icon"), unref(xe) ? unref(de).is("show") : unref(de).is("hide")])
            }, {
              default: withCtx(() => [
                (openBlock(), createBlock(resolveDynamicComponent(ze.activeIcon)))
              ]),
              _: 1
            }, 8, ["class"])) : createCommentVNode("v-if", !0),
            ze.inactiveIcon ? (openBlock(), createBlock(unref(ElIcon), {
              key: 1,
              class: normalizeClass([unref(de).is("icon"), unref(xe) ? unref(de).is("hide") : unref(de).is("show")])
            }, {
              default: withCtx(() => [
                (openBlock(), createBlock(resolveDynamicComponent(ze.inactiveIcon)))
              ]),
              _: 1
            }, 8, ["class"])) : createCommentVNode("v-if", !0)
          ], 64)) : ze.activeText || ze.inactiveIcon ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            ze.activeText ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: normalizeClass([unref(de).is("text"), unref(xe) ? unref(de).is("show") : unref(de).is("hide")]),
              "aria-hidden": !unref(xe)
            }, toDisplayString(ze.activeText.substring(0, 3)), 11, _hoisted_4)) : createCommentVNode("v-if", !0),
            ze.inactiveText ? (openBlock(), createElementBlock("span", {
              key: 1,
              class: normalizeClass([unref(de).is("text"), unref(xe) ? unref(de).is("hide") : unref(de).is("show")]),
              "aria-hidden": unref(xe)
            }, toDisplayString(ze.inactiveText.substring(0, 3)), 11, _hoisted_5)) : createCommentVNode("v-if", !0)
          ], 64)) : createCommentVNode("v-if", !0)
        ], 2)) : createCommentVNode("v-if", !0),
        createElementVNode("div", {
          class: normalizeClass(unref(de).e("action"))
        }, [
          ze.loading ? (openBlock(), createBlock(unref(ElIcon), {
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
      !ze.inlinePrompt && (ze.activeIcon || ze.activeText) ? (openBlock(), createElementBlock("span", {
        key: 1,
        class: normalizeClass([
          unref(de).e("label"),
          unref(de).em("label", "right"),
          unref(de).is("active", unref(xe))
        ])
      }, [
        ze.activeIcon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
          default: withCtx(() => [
            (openBlock(), createBlock(resolveDynamicComponent(ze.activeIcon)))
          ]),
          _: 1
        })) : createCommentVNode("v-if", !0),
        !ze.activeIcon && ze.activeText ? (openBlock(), createElementBlock("span", {
          key: 1,
          "aria-hidden": !unref(xe)
        }, toDisplayString(ze.activeText), 9, _hoisted_6)) : createCommentVNode("v-if", !0)
      ], 2)) : createCommentVNode("v-if", !0)
    ], 14, _hoisted_1$4));
  }
});
var Switch = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/switch/src/switch.vue"]]);
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
    const $e = ae === "light", he = document.createElement("div");
    return he.className = `${ie}-popper ${$e ? "is-light" : "is-dark"}`, oe = escapeHtml_1(oe), he.innerHTML = oe, he.style.zIndex = String(le()), e == null || e.appendChild(he), he;
  }
  function pe() {
    const $e = document.createElement("div");
    return $e.className = `${ie}-popper__arrow`, $e;
  }
  function Ce() {
    _e && _e.update();
  }
  removePopper = () => {
    try {
      _e && _e.destroy(), Ne && (e == null || e.removeChild(Ne)), k.removeEventListener("mouseenter", Ce), k.removeEventListener("mouseleave", removePopper), ue == null || ue.removeEventListener("scroll", removePopper), removePopper = void 0;
    } catch {
    }
  };
  let _e = null;
  const Ne = de(), Ve = pe();
  return Ne.appendChild(Ve), _e = yn(k, Ne, {
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
        re.value = de.reduce((_e, Ne) => {
          const Ve = getRowIdentity(Ne, pe);
          return Ce[Ve] && _e.push(Ne), _e;
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
      re.value = de.reduce((Ne, Ve) => {
        const $e = _e[Ve];
        return $e && Ne.push($e.row), Ne;
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
    let Ne = null;
    _e.value && (Ne = (unref(Ce) || []).find((Ve) => getRowIdentity(Ve, _e.value) === pe)), re.value = Ne, k.emit("current-change", re.value, null);
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
          const Ne = getRowIdentity(_e, pe);
          ie(Ne);
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
    const xe = e.data.value || [];
    return _e(xe);
  }), Ce = computed(() => {
    const xe = e.rowKey.value, Fe = Object.keys(le.value), Ie = {};
    return Fe.length && Fe.forEach((Ue) => {
      if (le.value[Ue].length) {
        const Lt = { children: [] };
        le.value[Ue].forEach((ze) => {
          const Pt = getRowIdentity(ze, xe);
          Lt.children.push(Pt), ze[ie.value] && !Ie[Pt] && (Ie[Pt] = { children: [] });
        }), Ie[Ue] = Lt;
      }
    }), Ie;
  }), _e = (xe) => {
    const Fe = e.rowKey.value, Ie = {};
    return walkTreeNode(xe, (Ue, Lt, ze) => {
      const Pt = getRowIdentity(Ue, Fe);
      Array.isArray(Lt) ? Ie[Pt] = {
        children: Lt.map((bn) => getRowIdentity(bn, Fe)),
        level: ze
      } : ae.value && (Ie[Pt] = {
        children: [],
        lazy: !0,
        level: ze
      });
    }, ue.value, ie.value), Ie;
  }, Ne = (xe = !1, Fe = ((Ie) => (Ie = de.store) == null ? void 0 : Ie.states.defaultExpandAll.value)()) => {
    var Ie;
    const Ue = pe.value, Lt = Ce.value, ze = Object.keys(Ue), Pt = {};
    if (ze.length) {
      const bn = unref(oe), En = [], Tn = (_n, Dt) => {
        if (xe)
          return k.value ? Fe || k.value.includes(Dt) : !!(Fe || (_n == null ? void 0 : _n.expanded));
        {
          const At = Fe || k.value && k.value.includes(Dt);
          return !!((_n == null ? void 0 : _n.expanded) || At);
        }
      };
      ze.forEach((_n) => {
        const Dt = bn[_n], At = { ...Ue[_n] };
        if (At.expanded = Tn(Dt, _n), At.lazy) {
          const { loaded: vn = !1, loading: jt = !1 } = Dt || {};
          At.loaded = !!vn, At.loading = !!jt, En.push(_n);
        }
        Pt[_n] = At;
      });
      const $n = Object.keys(Lt);
      ae.value && $n.length && En.length && $n.forEach((_n) => {
        const Dt = bn[_n], At = Lt[_n].children;
        if (En.includes(_n)) {
          if (Pt[_n].children.length !== 0)
            throw new Error("[ElTable]children must be an empty array.");
          Pt[_n].children = At;
        } else {
          const { loaded: vn = !1, loading: jt = !1 } = Dt || {};
          Pt[_n] = {
            lazy: !0,
            loaded: !!vn,
            loading: !!jt,
            expanded: Tn(Dt, _n),
            children: At,
            level: ""
          };
        }
      });
    }
    oe.value = Pt, (Ie = de.store) == null || Ie.updateTableScrollY();
  };
  watch(() => k.value, () => {
    Ne(!0);
  }), watch(() => pe.value, () => {
    Ne();
  }), watch(() => Ce.value, () => {
    Ne();
  });
  const Ve = (xe) => {
    k.value = xe, Ne();
  }, $e = (xe, Fe) => {
    de.store.assertRowKey();
    const Ie = e.rowKey.value, Ue = getRowIdentity(xe, Ie), Lt = Ue && oe.value[Ue];
    if (Ue && Lt && "expanded" in Lt) {
      const ze = Lt.expanded;
      Fe = typeof Fe > "u" ? !Lt.expanded : Fe, oe.value[Ue].expanded = Fe, ze !== Fe && de.emit("expand-change", xe, Fe), de.store.updateTableScrollY();
    }
  }, he = (xe) => {
    de.store.assertRowKey();
    const Fe = e.rowKey.value, Ie = getRowIdentity(xe, Fe), Ue = oe.value[Ie];
    ae.value && Ue && "loaded" in Ue && !Ue.loaded ? Oe(xe, Ie, Ue) : $e(xe, void 0);
  }, Oe = (xe, Fe, Ie) => {
    const { load: Ue } = de.props;
    Ue && !oe.value[Fe].loaded && (oe.value[Fe].loading = !0, Ue(xe, Ie, (Lt) => {
      if (!Array.isArray(Lt))
        throw new TypeError("[ElTable] data must be an array");
      oe.value[Fe].loading = !1, oe.value[Fe].loaded = !0, oe.value[Fe].expanded = !0, Lt.length && (le.value[Fe] = Lt), de.emit("expand-change", xe, !0);
    }));
  };
  return {
    loadData: Oe,
    loadOrToggle: he,
    toggleTreeExpansion: $e,
    updateTreeExpandKeys: Ve,
    updateTreeData: Ne,
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
  const k = getCurrentInstance(), { size: oe } = toRefs((e = k.proxy) == null ? void 0 : e.$props), re = ref(null), ae = ref([]), le = ref([]), ie = ref(!1), ue = ref([]), de = ref([]), pe = ref([]), Ce = ref([]), _e = ref([]), Ne = ref([]), Ve = ref([]), $e = ref([]), he = ref(0), Oe = ref(0), xe = ref(0), Fe = ref(!1), Ie = ref([]), Ue = ref(!1), Lt = ref(!1), ze = ref(null), Pt = ref({}), bn = ref(null), En = ref(null), Tn = ref(null), $n = ref(null), _n = ref(null);
  watch(ae, () => k.state && vn(!1), {
    deep: !0
  });
  const Dt = () => {
    if (!re.value)
      throw new Error("[ElTable] prop row-key is required");
  }, At = () => {
    Ce.value = ue.value.filter((In) => In.fixed === !0 || In.fixed === "left"), _e.value = ue.value.filter((In) => In.fixed === "right"), Ce.value.length > 0 && ue.value[0] && ue.value[0].type === "selection" && !ue.value[0].fixed && (ue.value[0].fixed = !0, Ce.value.unshift(ue.value[0]));
    const kn = ue.value.filter((In) => !In.fixed);
    de.value = [].concat(Ce.value).concat(kn).concat(_e.value);
    const Mn = doFlattenColumns(kn), qe = doFlattenColumns(Ce.value), Sn = doFlattenColumns(_e.value);
    he.value = Mn.length, Oe.value = qe.length, xe.value = Sn.length, pe.value = [].concat(qe).concat(Mn).concat(Sn), ie.value = Ce.value.length > 0 || _e.value.length > 0;
  }, vn = (kn, Mn = !1) => {
    kn && At(), Mn ? k.state.doLayout() : k.state.debouncedUpdateLayout();
  }, jt = (kn) => Ie.value.includes(kn), Cn = () => {
    Fe.value = !1, Ie.value.length && (Ie.value = [], k.emit("selection-change", []));
  }, kt = () => {
    let kn;
    if (re.value) {
      kn = [];
      const Mn = getKeysMap(Ie.value, re.value), qe = getKeysMap(ae.value, re.value);
      for (const Sn in Mn)
        hasOwn(Mn, Sn) && !qe[Sn] && kn.push(Mn[Sn].row);
    } else
      kn = Ie.value.filter((Mn) => !ae.value.includes(Mn));
    if (kn.length) {
      const Mn = Ie.value.filter((qe) => !kn.includes(qe));
      Ie.value = Mn, k.emit("selection-change", Mn.slice());
    }
  }, Et = () => (Ie.value || []).slice(), wn = (kn, Mn = void 0, qe = !0) => {
    if (toggleRowStatus(Ie.value, kn, Mn)) {
      const In = (Ie.value || []).slice();
      qe && k.emit("select", In, kn), k.emit("selection-change", In);
    }
  }, Pn = () => {
    var kn, Mn;
    const qe = Lt.value ? !Fe.value : !(Fe.value || Ie.value.length);
    Fe.value = qe;
    let Sn = !1, In = 0;
    const jn = (Mn = (kn = k == null ? void 0 : k.store) == null ? void 0 : kn.states) == null ? void 0 : Mn.rowKey.value;
    ae.value.forEach((Ln, Wn) => {
      const Un = Wn + In;
      ze.value ? ze.value.call(null, Ln, Un) && toggleRowStatus(Ie.value, Ln, qe) && (Sn = !0) : toggleRowStatus(Ie.value, Ln, qe) && (Sn = !0), In += Dn(getRowIdentity(Ln, jn));
    }), Sn && k.emit("selection-change", Ie.value ? Ie.value.slice() : []), k.emit("select-all", Ie.value);
  }, hn = () => {
    const kn = getKeysMap(Ie.value, re.value);
    ae.value.forEach((Mn) => {
      const qe = getRowIdentity(Mn, re.value), Sn = kn[qe];
      Sn && (Ie.value[Sn.index] = Mn);
    });
  }, On = () => {
    var kn, Mn, qe;
    if (((kn = ae.value) == null ? void 0 : kn.length) === 0) {
      Fe.value = !1;
      return;
    }
    let Sn;
    re.value && (Sn = getKeysMap(Ie.value, re.value));
    const In = function(Un) {
      return Sn ? !!Sn[getRowIdentity(Un, re.value)] : Ie.value.includes(Un);
    };
    let jn = !0, Ln = 0, Wn = 0;
    for (let Un = 0, uo = (ae.value || []).length; Un < uo; Un++) {
      const io = (qe = (Mn = k == null ? void 0 : k.store) == null ? void 0 : Mn.states) == null ? void 0 : qe.rowKey.value, so = Un + Wn, to = ae.value[Un], co = ze.value && ze.value.call(null, to, so);
      if (In(to))
        Ln++;
      else if (!ze.value || co) {
        jn = !1;
        break;
      }
      Wn += Dn(getRowIdentity(to, io));
    }
    Ln === 0 && (jn = !1), Fe.value = jn;
  }, Dn = (kn) => {
    var Mn;
    if (!k || !k.store)
      return 0;
    const { treeData: qe } = k.store.states;
    let Sn = 0;
    const In = (Mn = qe.value[kn]) == null ? void 0 : Mn.children;
    return In && (Sn += In.length, In.forEach((jn) => {
      Sn += Dn(jn);
    })), Sn;
  }, Rn = (kn, Mn) => {
    Array.isArray(kn) || (kn = [kn]);
    const qe = {};
    return kn.forEach((Sn) => {
      Pt.value[Sn.id] = Mn, qe[Sn.columnKey || Sn.id] = Mn;
    }), qe;
  }, Fn = (kn, Mn, qe) => {
    En.value && En.value !== kn && (En.value.order = null), En.value = kn, Tn.value = Mn, $n.value = qe;
  }, Nn = () => {
    let kn = unref(le);
    Object.keys(Pt.value).forEach((Mn) => {
      const qe = Pt.value[Mn];
      if (!qe || qe.length === 0)
        return;
      const Sn = getColumnById({
        columns: pe.value
      }, Mn);
      Sn && Sn.filterMethod && (kn = kn.filter((In) => qe.some((jn) => Sn.filterMethod.call(null, jn, In, Sn))));
    }), bn.value = kn;
  }, An = () => {
    ae.value = sortData(bn.value, {
      sortingColumn: En.value,
      sortProp: Tn.value,
      sortOrder: $n.value
    });
  }, Vn = (kn = void 0) => {
    kn && kn.filter || Nn(), An();
  }, Bn = (kn) => {
    const { tableHeaderRef: Mn } = k.refs;
    if (!Mn)
      return;
    const qe = Object.assign({}, Mn.filterPanels), Sn = Object.keys(qe);
    if (!!Sn.length)
      if (typeof kn == "string" && (kn = [kn]), Array.isArray(kn)) {
        const In = kn.map((jn) => getColumnByKey({
          columns: pe.value
        }, jn));
        Sn.forEach((jn) => {
          const Ln = In.find((Wn) => Wn.id === jn);
          Ln && (Ln.filteredValue = []);
        }), k.store.commit("filterChange", {
          column: In,
          values: [],
          silent: !0,
          multi: !0
        });
      } else
        Sn.forEach((In) => {
          const jn = pe.value.find((Ln) => Ln.id === In);
          jn && (jn.filteredValue = []);
        }), Pt.value = {}, k.store.commit("filterChange", {
          column: {},
          values: [],
          silent: !0
        });
  }, Kn = () => {
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
    setCurrentRowKey: xn,
    states: Jn
  } = useCurrent({
    data: ae,
    rowKey: re
  });
  return {
    assertRowKey: Dt,
    updateColumns: At,
    scheduleLayout: vn,
    isSelected: jt,
    clearSelection: Cn,
    cleanSelection: kt,
    getSelectionRows: Et,
    toggleRowSelection: wn,
    _toggleAllSelection: Pn,
    toggleAllSelection: null,
    updateSelectionByRowKey: hn,
    updateAllSelected: On,
    updateFilters: Rn,
    updateCurrentRow: ao,
    updateSort: Fn,
    execFilter: Nn,
    execSort: An,
    execQuery: Vn,
    clearFilter: Bn,
    clearSort: Kn,
    toggleRowExpansion: Xn,
    setExpandRowKeysAdapter: (kn) => {
      Yn(kn), oo(kn);
    },
    setCurrentRowKey: xn,
    toggleRowExpansionAdapter: (kn, Mn) => {
      pe.value.some(({ type: Sn }) => Sn === "expand") ? Xn(kn, Mn) : zn(kn, Mn);
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
      rightFixedColumns: _e,
      leafColumns: Ne,
      fixedLeafColumns: Ve,
      rightFixedLeafColumns: $e,
      leafColumnsLength: he,
      fixedLeafColumnsLength: Oe,
      rightFixedLeafColumnsLength: xe,
      isAllSelected: Fe,
      selection: Ie,
      reserveSelection: Ue,
      selectOnIndeterminate: Lt,
      selectable: ze,
      filters: Pt,
      filteredData: bn,
      sortingColumn: En,
      sortProp: Tn,
      sortOrder: $n,
      hoverRow: _n,
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
          const _e = unref(ie.columns).find((Ne) => Ne.property === de);
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
          const pe = le.reduce((Ne, Ve) => Ne + Number(Ve.minWidth || 80), 0), Ce = de / pe;
          let _e = 0;
          le.forEach((Ne, Ve) => {
            if (Ve === 0)
              return;
            const $e = Math.floor(Number(Ne.minWidth || 80) * Ce);
            _e += $e, Ne.realWidth = Number(Ne.minWidth || 80) + $e;
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
const { CheckboxGroup: ElCheckboxGroup } = ElCheckbox, _sfc_main$9 = defineComponent({
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
    }), Ce = computed(() => e.column ? e.column.filterMultiple : !0), _e = (Ue) => Ue.value === de.value, Ne = () => {
      le.value = !1;
    }, Ve = (Ue) => {
      Ue.stopPropagation(), le.value = !le.value;
    }, $e = () => {
      le.value = !1;
    }, he = () => {
      Fe(pe.value), Ne();
    }, Oe = () => {
      pe.value = [], Fe(pe.value), Ne();
    }, xe = (Ue) => {
      de.value = Ue, Fe(typeof Ue < "u" && Ue !== null ? pe.value : []), Ne();
    }, Fe = (Ue) => {
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
    const Ie = computed(() => {
      var Ue, Lt;
      return (Lt = (Ue = ie.value) == null ? void 0 : Ue.popperRef) == null ? void 0 : Lt.contentRef;
    });
    return {
      tooltipVisible: le,
      multiple: Ce,
      filteredValue: pe,
      filterValue: de,
      filters: ue,
      handleConfirm: he,
      handleReset: Oe,
      handleSelect: xe,
      isActive: _e,
      t: oe,
      ns: re,
      showFilterPanel: Ve,
      hideFilterPanel: $e,
      popperPaneRef: Ie,
      tooltip: ie
    };
  }
}), _hoisted_1$3 = { key: 0 }, _hoisted_2$1 = ["disabled"], _hoisted_3 = ["label", "onClick"];
function _sfc_render$4(e, k, oe, re, ae, le) {
  const ie = resolveComponent("el-checkbox"), ue = resolveComponent("el-checkbox-group"), de = resolveComponent("el-scrollbar"), pe = resolveComponent("arrow-up"), Ce = resolveComponent("arrow-down"), _e = resolveComponent("el-icon"), Ne = resolveComponent("el-tooltip"), Ve = resolveDirective("click-outside");
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
      e.multiple ? (openBlock(), createElementBlock("div", _hoisted_1$3, [
        createElementVNode("div", {
          class: normalizeClass(e.ns.e("content"))
        }, [
          createVNode(de, {
            "wrap-class": e.ns.e("wrap")
          }, {
            default: withCtx(() => [
              createVNode(ue, {
                modelValue: e.filteredValue,
                "onUpdate:modelValue": k[0] || (k[0] = ($e) => e.filteredValue = $e),
                class: normalizeClass(e.ns.e("checkbox-group"))
              }, {
                default: withCtx(() => [
                  (openBlock(!0), createElementBlock(Fragment, null, renderList(e.filters, ($e) => (openBlock(), createBlock(ie, {
                    key: $e.value,
                    label: $e.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString($e.text), 1)
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
            onClick: k[1] || (k[1] = (...$e) => e.handleConfirm && e.handleConfirm(...$e))
          }, toDisplayString(e.t("el.table.confirmFilter")), 11, _hoisted_2$1),
          createElementVNode("button", {
            type: "button",
            onClick: k[2] || (k[2] = (...$e) => e.handleReset && e.handleReset(...$e))
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
          onClick: k[3] || (k[3] = ($e) => e.handleSelect(null))
        }, toDisplayString(e.t("el.table.clearFilter")), 3),
        (openBlock(!0), createElementBlock(Fragment, null, renderList(e.filters, ($e) => (openBlock(), createElementBlock("li", {
          key: $e.value,
          class: normalizeClass([e.ns.e("list-item"), e.ns.is("active", e.isActive($e))]),
          label: $e.value,
          onClick: (he) => e.handleSelect($e.value)
        }, toDisplayString($e.text), 11, _hoisted_3))), 128))
      ], 2))
    ]),
    default: withCtx(() => [
      withDirectives((openBlock(), createElementBlock("span", {
        class: normalizeClass([
          `${e.ns.namespace.value}-table__column-filter-trigger`,
          `${e.ns.namespace.value}-none-outline`
        ]),
        onClick: k[4] || (k[4] = (...$e) => e.showFilterPanel && e.showFilterPanel(...$e))
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
var FilterPanel = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$4], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/table/src/filter-panel.vue"]]);
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
      const Ne = ue[Ce], Ve = Ne.getAttribute("name"), $e = pe[Ve];
      $e && Ne.setAttribute("width", $e.realWidth || $e.width);
    }
  }, ae = (le) => {
    var ie, ue;
    const de = ((ie = e.vnode.el) == null ? void 0 : ie.querySelectorAll("colgroup > col[name=gutter]")) || [];
    for (let Ce = 0, _e = de.length; Ce < _e; Ce++)
      de[Ce].setAttribute("width", le.scrollY.value ? le.gutterWidth : "0");
    const pe = ((ue = e.vnode.el) == null ? void 0 : ue.querySelectorAll("th.gutter")) || [];
    for (let Ce = 0, _e = pe.length; Ce < _e; Ce++) {
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
  }, le = (he, Oe) => {
    !Oe.filters && Oe.sortable ? $e(he, Oe, !1) : Oe.filterable && !Oe.sortable && ae(he), re == null || re.emit("header-click", Oe, he);
  }, ie = (he, Oe) => {
    re == null || re.emit("header-contextmenu", Oe, he);
  }, ue = ref(null), de = ref(!1), pe = ref({}), Ce = (he, Oe) => {
    if (!!isClient$1 && !(Oe.children && Oe.children.length > 0) && ue.value && e.border) {
      de.value = !0;
      const xe = re;
      k("set-drag-visible", !0);
      const Ie = (xe == null ? void 0 : xe.vnode.el).getBoundingClientRect().left, Ue = oe.vnode.el.querySelector(`th.${Oe.id}`), Lt = Ue.getBoundingClientRect(), ze = Lt.left - Ie + 30;
      addClass$1(Ue, "noclick"), pe.value = {
        startMouseLeft: he.clientX,
        startLeft: Lt.right - Ie,
        startColumnLeft: Lt.left - Ie,
        tableLeft: Ie
      };
      const Pt = xe == null ? void 0 : xe.refs.resizeProxy;
      Pt.style.left = `${pe.value.startLeft}px`, document.onselectstart = function() {
        return !1;
      }, document.ondragstart = function() {
        return !1;
      };
      const bn = (Tn) => {
        const $n = Tn.clientX - pe.value.startMouseLeft, _n = pe.value.startLeft + $n;
        Pt.style.left = `${Math.max(ze, _n)}px`;
      }, En = () => {
        if (de.value) {
          const { startColumnLeft: Tn, startLeft: $n } = pe.value, Dt = Number.parseInt(Pt.style.left, 10) - Tn;
          Oe.width = Oe.realWidth = Dt, xe == null || xe.emit("header-dragend", Oe.width, $n - Tn, Oe, he), requestAnimationFrame(() => {
            e.store.scheduleLayout(!1, !0);
          }), document.body.style.cursor = "", de.value = !1, ue.value = null, pe.value = {}, k("set-drag-visible", !1);
        }
        document.removeEventListener("mousemove", bn), document.removeEventListener("mouseup", En), document.onselectstart = null, document.ondragstart = null, setTimeout(() => {
          removeClass$1(Ue, "noclick");
        }, 0);
      };
      document.addEventListener("mousemove", bn), document.addEventListener("mouseup", En);
    }
  }, _e = (he, Oe) => {
    var xe;
    if (Oe.children && Oe.children.length > 0)
      return;
    const Fe = (xe = he.target) == null ? void 0 : xe.closest("th");
    if (!(!Oe || !Oe.resizable) && !de.value && e.border) {
      const Ie = Fe.getBoundingClientRect(), Ue = document.body.style;
      Ie.width > 12 && Ie.right - he.pageX < 8 ? (Ue.cursor = "col-resize", hasClass$1(Fe, "is-sortable") && (Fe.style.cursor = "col-resize"), ue.value = Oe) : de.value || (Ue.cursor = "", hasClass$1(Fe, "is-sortable") && (Fe.style.cursor = "pointer"), ue.value = null);
    }
  }, Ne = () => {
    !isClient$1 || (document.body.style.cursor = "");
  }, Ve = ({ order: he, sortOrders: Oe }) => {
    if (he === "")
      return Oe[0];
    const xe = Oe.indexOf(he || null);
    return Oe[xe > Oe.length - 2 ? 0 : xe + 1];
  }, $e = (he, Oe, xe) => {
    var Fe;
    he.stopPropagation();
    const Ie = Oe.order === xe ? null : xe || Ve(Oe), Ue = (Fe = he.target) == null ? void 0 : Fe.closest("th");
    if (Ue && hasClass$1(Ue, "noclick")) {
      removeClass$1(Ue, "noclick");
      return;
    }
    if (!Oe.sortable)
      return;
    const Lt = e.store.states;
    let ze = Lt.sortProp.value, Pt;
    const bn = Lt.sortingColumn.value;
    (bn !== Oe || bn === Oe && bn.order === null) && (bn && (bn.order = null), Lt.sortingColumn.value = Oe, ze = Oe.property), Ie ? Pt = Oe.order = Ie : Pt = Oe.order = null, Lt.sortProp.value = ze, Lt.sortOrder.value = Pt, re == null || re.store.commit("changeSortCondition");
  };
  return {
    handleHeaderClick: le,
    handleHeaderContextMenu: ie,
    handleMouseDown: Ce,
    handleMouseMove: _e,
    handleMouseOut: Ne,
    handleSortClick: $e,
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
      let Ne = (_e = k == null ? void 0 : k.props.headerCellStyle) != null ? _e : {};
      typeof Ne == "function" && (Ne = Ne.call(null, {
        rowIndex: ue,
        columnIndex: de,
        row: pe,
        column: Ce
      }));
      const Ve = Ce.isSubColumn ? null : getFixedColumnOffset(de, Ce.fixed, e.store, pe);
      return ensurePosition(Ve, "left"), ensurePosition(Ve, "right"), Object.assign({}, Ne, Ve);
    },
    getHeaderCellClass: (ue, de, pe, Ce) => {
      const _e = Ce.isSubColumn ? [] : getFixedColumnsClass(oe.b(), de, Ce.fixed, e.store, pe), Ne = [
        Ce.id,
        Ce.order,
        Ce.headerAlign,
        Ce.className,
        Ce.labelClassName,
        ..._e
      ];
      Ce.children || Ne.push("is-leaf"), Ce.sortable && Ne.push("is-sortable");
      const Ve = k == null ? void 0 : k.props.headerCellClassName;
      return typeof Ve == "string" ? Ne.push(Ve) : typeof Ve == "function" && Ne.push(Ve.call(null, {
        rowIndex: ue,
        columnIndex: de,
        row: pe,
        column: Ce
      })), Ne.push(oe.e("cell")), Ne.filter(($e) => Boolean($e)).join(" ");
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
      const { prop: ze, order: Pt } = e.defaultSort;
      re == null || re.store.commit("sort", { prop: ze, order: Pt, init: !0 });
    });
    const {
      handleHeaderClick: de,
      handleHeaderContextMenu: pe,
      handleMouseDown: Ce,
      handleMouseMove: _e,
      handleMouseOut: Ne,
      handleSortClick: Ve,
      handleFilterClick: $e
    } = useEvent(e, k), {
      getHeaderRowStyle: he,
      getHeaderRowClass: Oe,
      getHeaderCellStyle: xe,
      getHeaderCellClass: Fe
    } = useStyle$2(e), { isGroup: Ie, toggleAllSelection: Ue, columnRows: Lt } = useUtils$1(e);
    return oe.state = {
      onColumnsChange: ie,
      onScrollableChange: ue
    }, oe.filterPanels = le, {
      ns: ae,
      filterPanels: le,
      onColumnsChange: ie,
      onScrollableChange: ue,
      columnRows: Lt,
      getHeaderRowClass: Oe,
      getHeaderRowStyle: he,
      getHeaderCellClass: Fe,
      getHeaderCellStyle: xe,
      handleHeaderClick: de,
      handleHeaderContextMenu: pe,
      handleMouseDown: Ce,
      handleMouseMove: _e,
      handleMouseOut: Ne,
      handleSortClick: Ve,
      handleFilterClick: $e,
      isGroup: Ie,
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
      handleSortClick: _e,
      handleMouseOut: Ne,
      store: Ve,
      $parent: $e
    } = this;
    let he = 1;
    return h$2("thead", {
      class: { [e.is("group")]: k }
    }, oe.map((Oe, xe) => h$2("tr", {
      class: le(xe),
      key: xe,
      style: ie(xe)
    }, Oe.map((Fe, Ie) => (Fe.rowSpan > he && (he = Fe.rowSpan), h$2("th", {
      class: ae(xe, Ie, Oe, Fe),
      colspan: Fe.colSpan,
      key: `${Fe.id}-thead`,
      rowspan: Fe.rowSpan,
      style: re(xe, Ie, Oe, Fe),
      onClick: (Ue) => ue(Ue, Fe),
      onContextmenu: (Ue) => de(Ue, Fe),
      onMousedown: (Ue) => pe(Ue, Fe),
      onMousemove: (Ue) => Ce(Ue, Fe),
      onMouseout: Ne
    }, [
      h$2("div", {
        class: [
          "cell",
          Fe.filteredValue && Fe.filteredValue.length > 0 ? "highlight" : "",
          Fe.labelClassName
        ]
      }, [
        Fe.renderHeader ? Fe.renderHeader({
          column: Fe,
          $index: Ie,
          store: Ve,
          _self: $e
        }) : Fe.label,
        Fe.sortable && h$2("span", {
          onClick: (Ue) => _e(Ue, Fe),
          class: "caret-wrapper"
        }, [
          h$2("i", {
            onClick: (Ue) => _e(Ue, Fe, "ascending"),
            class: "sort-caret ascending"
          }),
          h$2("i", {
            onClick: (Ue) => _e(Ue, Fe, "descending"),
            class: "sort-caret descending"
          })
        ]),
        Fe.filterable && h$2(FilterPanel, {
          store: Ve,
          placement: Fe.filterPlacement || "bottom-start",
          column: Fe,
          upDataColumn: (Ue, Lt) => {
            Fe[Ue] = Lt;
          }
        })
      ])
    ]))))));
  }
});
function useEvents(e) {
  const k = inject(TABLE_INJECTION_KEY), oe = ref(""), re = ref(h$2("div")), ae = (Ne, Ve, $e) => {
    var he;
    const Oe = k, xe = getCell(Ne);
    let Fe;
    const Ie = (he = Oe == null ? void 0 : Oe.vnode.el) == null ? void 0 : he.dataset.prefix;
    xe && (Fe = getColumnByCell({
      columns: e.store.states.columns.value
    }, xe, Ie), Fe && (Oe == null || Oe.emit(`cell-${$e}`, Ve, Fe, xe, Ne))), Oe == null || Oe.emit(`row-${$e}`, Ve, Fe, Ne);
  }, le = (Ne, Ve) => {
    ae(Ne, Ve, "dblclick");
  }, ie = (Ne, Ve) => {
    e.store.commit("setCurrentRow", Ve), ae(Ne, Ve, "click");
  }, ue = (Ne, Ve) => {
    ae(Ne, Ve, "contextmenu");
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
    handleCellMouseEnter: (Ne, Ve) => {
      var $e;
      const he = k, Oe = getCell(Ne), xe = ($e = he == null ? void 0 : he.vnode.el) == null ? void 0 : $e.dataset.prefix;
      if (Oe) {
        const ze = getColumnByCell({
          columns: e.store.states.columns.value
        }, Oe, xe), Pt = he.hoverState = { cell: Oe, column: ze, row: Ve };
        he == null || he.emit("cell-mouse-enter", Pt.row, Pt.column, Pt.cell, Ne);
      }
      const Fe = Ne.target.querySelector(".cell");
      if (!(hasClass$1(Fe, `${xe}-tooltip`) && Fe.childNodes.length))
        return;
      const Ie = document.createRange();
      Ie.setStart(Fe, 0), Ie.setEnd(Fe, Fe.childNodes.length);
      const Ue = Ie.getBoundingClientRect().width, Lt = (Number.parseInt(getStyle(Fe, "paddingLeft"), 10) || 0) + (Number.parseInt(getStyle(Fe, "paddingRight"), 10) || 0);
      (Ue + Lt > Fe.offsetWidth || Fe.scrollWidth > Fe.offsetWidth) && createTablePopper(k == null ? void 0 : k.refs.tableWrapper, Oe, Oe.innerText || Oe.textContent, {
        placement: "top",
        strategy: "fixed"
      }, Ve.tooltipEffect);
    },
    handleCellMouseLeave: (Ne) => {
      if (!getCell(Ne))
        return;
      const $e = k == null ? void 0 : k.hoverState;
      k == null || k.emit("cell-mouse-leave", $e == null ? void 0 : $e.row, $e == null ? void 0 : $e.column, $e == null ? void 0 : $e.cell, Ne);
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
      const Ne = k == null ? void 0 : k.props.rowClassName;
      return typeof Ne == "string" ? _e.push(Ne) : typeof Ne == "function" && _e.push(Ne.call(null, {
        row: pe,
        rowIndex: Ce
      })), _e;
    },
    getCellStyle: (pe, Ce, _e, Ne) => {
      const Ve = k == null ? void 0 : k.props.cellStyle;
      let $e = Ve != null ? Ve : {};
      typeof Ve == "function" && ($e = Ve.call(null, {
        rowIndex: pe,
        columnIndex: Ce,
        row: _e,
        column: Ne
      }));
      const he = Ne.isSubColumn ? null : getFixedColumnOffset(Ce, e == null ? void 0 : e.fixed, e.store);
      return ensurePosition(he, "left"), ensurePosition(he, "right"), Object.assign({}, $e, he);
    },
    getCellClass: (pe, Ce, _e, Ne) => {
      const Ve = Ne.isSubColumn ? [] : getFixedColumnsClass(oe.b(), Ce, e == null ? void 0 : e.fixed, e.store), $e = [Ne.id, Ne.align, Ne.className, ...Ve], he = k == null ? void 0 : k.props.cellClassName;
      return typeof he == "string" ? $e.push(he) : typeof he == "function" && $e.push(he.call(null, {
        rowIndex: pe,
        columnIndex: Ce,
        row: _e,
        column: Ne
      })), $e.push(oe.e("cell")), $e.filter((Oe) => Boolean(Oe)).join(" ");
    },
    getSpan: (pe, Ce, _e, Ne) => {
      let Ve = 1, $e = 1;
      const he = k == null ? void 0 : k.props.spanMethod;
      if (typeof he == "function") {
        const Oe = he({
          row: pe,
          column: Ce,
          rowIndex: _e,
          columnIndex: Ne
        });
        Array.isArray(Oe) ? (Ve = Oe[0], $e = Oe[1]) : typeof Oe == "object" && (Ve = Oe.rowspan, $e = Oe.colspan);
      }
      return { rowspan: Ve, colspan: $e };
    },
    getColspanRealWidth: (pe, Ce, _e) => {
      if (Ce < 1)
        return pe[_e].realWidth;
      const Ne = pe.map(({ realWidth: Ve, width: $e }) => Ve || $e).slice(_e, _e + Ce);
      return Number(Ne.reduce((Ve, $e) => Number(Ve) + Number($e), -1));
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
    getRowStyle: Ne,
    getRowClass: Ve,
    getCellStyle: $e,
    getCellClass: he,
    getSpan: Oe,
    getColspanRealWidth: xe
  } = useStyles(e), Fe = computed(() => e.store.states.columns.value.findIndex(({ type: Pt }) => Pt === "default")), Ie = (Pt, bn) => {
    const En = k.props.rowKey;
    return En ? getRowIdentity(Pt, En) : bn;
  }, Ue = (Pt, bn, En, Tn = !1) => {
    const { tooltipEffect: $n, store: _n } = e, { indent: Dt, columns: At } = _n.states, vn = Ve(Pt, bn);
    let jt = !0;
    return En && (vn.push(oe.em("row", `level-${En.level}`)), jt = En.display), h$2("tr", {
      style: [jt ? null : {
        display: "none"
      }, Ne(Pt, bn)],
      class: vn,
      key: Ie(Pt, bn),
      onDblclick: (kt) => re(kt, Pt),
      onClick: (kt) => ae(kt, Pt),
      onContextmenu: (kt) => le(kt, Pt),
      onMouseenter: () => ie(bn),
      onMouseleave: ue
    }, At.value.map((kt, Et) => {
      const { rowspan: wn, colspan: Pn } = Oe(Pt, kt, bn, Et);
      if (!wn || !Pn)
        return null;
      const hn = { ...kt };
      hn.realWidth = xe(At.value, Pn, Et);
      const On = {
        store: e.store,
        _self: e.context || k,
        column: hn,
        row: Pt,
        $index: bn,
        cellIndex: Et,
        expanded: Tn
      };
      Et === Fe.value && En && (On.treeNode = {
        indent: En.level * Dt.value,
        level: En.level
      }, typeof En.expanded == "boolean" && (On.treeNode.expanded = En.expanded, "loading" in En && (On.treeNode.loading = En.loading), "noLazyChildren" in En && (On.treeNode.noLazyChildren = En.noLazyChildren)));
      const Dn = `${bn},${Et}`, Rn = hn.columnKey || hn.rawColumnKey || "", Fn = Lt(Et, kt, On);
      return h$2("td", {
        style: $e(bn, Et, Pt, kt),
        class: he(bn, Et, Pt, kt),
        key: `${Rn}${Dn}`,
        rowspan: wn,
        colspan: Pn,
        onMouseenter: (Nn) => de(Nn, { ...Pt, tooltipEffect: $n }),
        onMouseleave: pe
      }, [Fn]);
    }));
  }, Lt = (Pt, bn, En) => bn.renderCell(En);
  return {
    wrappedRowRender: (Pt, bn) => {
      const En = e.store, { isRowExpanded: Tn, assertRowKey: $n } = En, { treeData: _n, lazyTreeNodeMap: Dt, childrenColumnName: At, rowKey: vn } = En.states, jt = En.states.columns.value;
      if (jt.some(({ type: kt }) => kt === "expand")) {
        const kt = Tn(Pt), Et = Ue(Pt, bn, void 0, kt), wn = k.renderExpanded;
        return kt ? wn ? [
          [
            Et,
            h$2("tr", {
              key: `expanded-row__${Et.key}`
            }, [
              h$2("td", {
                colspan: jt.length,
                class: "el-table__cell el-table__expanded-cell"
              }, [wn({ row: Pt, $index: bn, store: En, expanded: kt })])
            ])
          ]
        ] : (console.error("[Element Error]renderExpanded is required."), Et) : [[Et]];
      } else if (Object.keys(_n.value).length) {
        $n();
        const kt = getRowIdentity(Pt, vn.value);
        let Et = _n.value[kt], wn = null;
        Et && (wn = {
          expanded: Et.expanded,
          level: Et.level,
          display: !0
        }, typeof Et.lazy == "boolean" && (typeof Et.loaded == "boolean" && Et.loaded && (wn.noLazyChildren = !(Et.children && Et.children.length)), wn.loading = Et.loading));
        const Pn = [Ue(Pt, bn, wn)];
        if (Et) {
          let hn = 0;
          const On = (Rn, Fn) => {
            !(Rn && Rn.length && Fn) || Rn.forEach((Nn) => {
              const An = {
                display: Fn.display && Fn.expanded,
                level: Fn.level + 1,
                expanded: !1,
                noLazyChildren: !1,
                loading: !1
              }, Vn = getRowIdentity(Nn, vn.value);
              if (Vn == null)
                throw new Error("For nested data item, row-key is required.");
              if (Et = { ..._n.value[Vn] }, Et && (An.expanded = Et.expanded, Et.level = Et.level || An.level, Et.display = !!(Et.expanded && An.display), typeof Et.lazy == "boolean" && (typeof Et.loaded == "boolean" && Et.loaded && (An.noLazyChildren = !(Et.children && Et.children.length)), An.loading = Et.loading)), hn++, Pn.push(Ue(Nn, bn + hn, An)), Et) {
                const Bn = Dt.value[Vn] || Nn[At.value];
                On(Bn, Et);
              }
            });
          };
          Et.display = !0;
          const Dn = Dt.value[kt] || Pt[At.value];
          On(Dn, Et);
        }
        return Pn;
      } else
        return Ue(Pt, bn, void 0);
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
      _e || (_e = (Ne) => window.setTimeout(Ne, 16)), _e(() => {
        var Ne;
        const Ve = (Ne = k == null ? void 0 : k.vnode.el) == null ? void 0 : Ne.querySelectorAll(`.${re.e("row")}`), $e = Ve[Ce], he = Ve[pe];
        $e && removeClass$1($e, "hover-row"), he && addClass$1(he, "hover-row");
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
      const Ce = ie.map(($e) => Number($e[de.property])), _e = [];
      let Ne = !0;
      Ce.forEach(($e) => {
        if (!Number.isNaN(+$e)) {
          Ne = !1;
          const he = `${$e}`.split(".")[1];
          _e.push(he ? he.length : 0);
        }
      });
      const Ve = Math.max.apply(null, _e);
      Ne ? ue[pe] = "" : ue[pe] = Ce.reduce(($e, he) => {
        const Oe = Number(he);
        return Number.isNaN(+Oe) ? $e : Number.parseFloat(($e + he).toFixed(Math.min(Ve, 20)));
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
  }, _e = ref(), Ne = ref(0), Ve = ref(0), $e = ref(0), he = ref(0);
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
  }, xe = (kt, Et) => {
    const { pixelX: wn, pixelY: Pn } = Et;
    Math.abs(wn) >= Math.abs(Pn) && (re.refs.bodyWrapper.scrollLeft += Et.pixelX / 5);
  }, Fe = computed(() => e.height || e.maxHeight || oe.states.fixedColumns.value.length > 0 || oe.states.rightFixedColumns.value.length > 0), Ie = computed(() => ({
    width: k.bodyWidth.value ? `${k.bodyWidth.value}px` : ""
  })), Ue = () => {
    Fe.value && k.updateElsHeight(), k.updateColumnsWidth(), requestAnimationFrame(bn);
  };
  onMounted(async () => {
    await nextTick(), oe.updateColumns(), En(), requestAnimationFrame(Ue);
    const kt = re.vnode.el, Et = re.refs.headerWrapper;
    e.flexible && kt && kt.parentElement && (kt.parentElement.style.minWidth = "0"), de.value = {
      width: _e.value = kt.offsetWidth,
      height: kt.offsetHeight,
      headerHeight: e.showHeader && Et ? Et.offsetHeight : null
    }, oe.states.columns.value.forEach((wn) => {
      wn.filteredValue && wn.filteredValue.length && re.store.commit("filterChange", {
        column: wn,
        values: wn.filteredValue,
        silent: !0
      });
    }), re.$ready = !0;
  });
  const Lt = (kt, Et) => {
    if (!kt)
      return;
    const wn = Array.from(kt.classList).filter((Pn) => !Pn.startsWith("is-scrolling-"));
    wn.push(k.scrollX.value ? Et : "is-scrolling-none"), kt.className = wn.join(" ");
  }, ze = (kt) => {
    const { tableWrapper: Et } = re.refs;
    Lt(Et, kt);
  }, Pt = (kt) => {
    const { tableWrapper: Et } = re.refs;
    return !!(Et && Et.classList.contains(kt));
  }, bn = function() {
    if (!re.refs.scrollBarRef)
      return;
    if (!k.scrollX.value) {
      const Rn = "is-scrolling-none";
      Pt(Rn) || ze(Rn);
      return;
    }
    const kt = re.refs.scrollBarRef.wrap$;
    if (!kt)
      return;
    const { scrollLeft: Et, offsetWidth: wn, scrollWidth: Pn } = kt, { headerWrapper: hn, footerWrapper: On } = re.refs;
    hn && (hn.scrollLeft = Et), On && (On.scrollLeft = Et);
    const Dn = Pn - wn - 1;
    Et >= Dn ? ze("is-scrolling-right") : ze(Et === 0 ? "is-scrolling-left" : "is-scrolling-middle");
  }, En = () => {
    !re.refs.scrollBarRef || (re.refs.scrollBarRef.wrap$ && useEventListener(re.refs.scrollBarRef.wrap$, "scroll", bn, {
      passive: !0
    }), e.fit ? useResizeObserver(re.vnode.el, Tn) : useEventListener(window, "resize", Tn));
  }, Tn = () => {
    var kt, Et, wn;
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
    const Nn = Pn.offsetHeight;
    (e.height || Fe.value) && Dn !== Nn && (hn = !0);
    const An = e.tableLayout === "fixed" ? re.refs.headerWrapper : (kt = re.refs.tableHeaderRef) == null ? void 0 : kt.$el;
    e.showHeader && (An == null ? void 0 : An.offsetHeight) !== Rn && (hn = !0), Ne.value = ((Et = re.refs.tableWrapper) == null ? void 0 : Et.scrollHeight) || 0, $e.value = (An == null ? void 0 : An.scrollHeight) || 0, he.value = ((wn = re.refs.footerWrapper) == null ? void 0 : wn.scrollHeight) || 0, Ve.value = Ne.value - $e.value - he.value, hn && (de.value = {
      width: Fn,
      height: Nn,
      headerHeight: e.showHeader && (An == null ? void 0 : An.offsetHeight) || 0
    }, Ue());
  }, $n = useSize(), _n = computed(() => {
    const { bodyWidth: kt, scrollY: Et, gutterWidth: wn } = k;
    return kt.value ? `${kt.value - (Et.value ? wn : 0)}px` : "";
  }), Dt = computed(() => e.maxHeight ? "fixed" : e.tableLayout), At = computed(() => {
    if (e.data && e.data.length)
      return null;
    let kt = "100%";
    Ve.value && (kt = `${Ve.value}px`);
    const Et = _e.value;
    return {
      width: Et ? `${Et}px` : "",
      height: kt
    };
  }), vn = computed(() => e.height ? {
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
          maxHeight: `calc(${e.maxHeight} - ${$e.value + he.value}px)`
        };
      {
        const wn = ((kt = re.refs.headerWrapper) == null ? void 0 : kt.scrollHeight) || 0, Pn = ((Et = re.refs.footerWrapper) == null ? void 0 : Et.scrollHeight) || 0, hn = e.maxHeight;
        if (Ne.value >= Number(hn))
          return {
            maxHeight: `${Ne.value - wn - Pn}px`
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
    handleHeaderFooterMousewheel: xe,
    tableSize: $n,
    emptyBlockStyle: At,
    handleFixedMousewheel: (kt, Et) => {
      const wn = re.refs.bodyWrapper;
      if (Math.abs(Et.spinY) > 0) {
        const Pn = wn.scrollTop;
        Et.pixelY < 0 && Pn !== 0 && kt.preventDefault(), Et.pixelY > 0 && wn.scrollHeight - wn.clientHeight > Pn && kt.preventDefault(), wn.scrollTop += Math.ceil(Et.pixelY / 5);
      } else
        wn.scrollLeft += Math.ceil(Et.pixelX / 5);
    },
    resizeProxyVisible: ie,
    bodyWidth: _n,
    resizeState: de,
    doLayout: Ue,
    tableBodyStyles: Ie,
    tableLayout: Dt,
    scrollbarViewStyle: Ce,
    tableInnerStyle: vn,
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
const _sfc_main$8 = defineComponent({
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
      toggleAllSelection: Ne,
      toggleRowExpansion: Ve,
      clearSort: $e,
      sort: he
    } = useUtils(ae), {
      isHidden: Oe,
      renderExpanded: xe,
      setDragVisible: Fe,
      isGroup: Ie,
      handleMouseLeave: Ue,
      handleHeaderFooterMousewheel: Lt,
      tableSize: ze,
      emptyBlockStyle: Pt,
      handleFixedMousewheel: bn,
      resizeProxyVisible: En,
      bodyWidth: Tn,
      resizeState: $n,
      doLayout: _n,
      tableBodyStyles: Dt,
      tableLayout: At,
      scrollbarViewStyle: vn,
      tableInnerStyle: jt,
      scrollbarStyle: Cn
    } = useStyle(e, le, ae, re), { scrollBarRef: kt, scrollTo: Et, setScrollLeft: wn, setScrollTop: Pn } = useScrollbar(), hn = debounce(_n, 50), On = `el-table_${tableIdSeed++}`;
    re.tableId = On, re.state = {
      isGroup: Ie,
      resizeState: $n,
      doLayout: _n,
      debouncedUpdateLayout: hn
    };
    const Dn = computed(() => e.sumText || k("el.table.sumText")), Rn = computed(() => e.emptyText || k("el.table.emptyText"));
    return {
      ns: oe,
      layout: le,
      store: ae,
      handleHeaderFooterMousewheel: Lt,
      handleMouseLeave: Ue,
      tableId: On,
      tableSize: ze,
      isHidden: Oe,
      isEmpty: ie,
      renderExpanded: xe,
      resizeProxyVisible: En,
      resizeState: $n,
      isGroup: Ie,
      bodyWidth: Tn,
      tableBodyStyles: Dt,
      emptyBlockStyle: Pt,
      debouncedUpdateLayout: hn,
      handleFixedMousewheel: bn,
      setCurrentRow: ue,
      getSelectionRows: de,
      toggleRowSelection: pe,
      clearSelection: Ce,
      clearFilter: _e,
      toggleAllSelection: Ne,
      toggleRowExpansion: Ve,
      clearSort: $e,
      doLayout: _n,
      sort: he,
      t: k,
      setDragVisible: Fe,
      context: re,
      computedSumText: Dn,
      computedEmptyText: Rn,
      tableLayout: At,
      scrollbarViewStyle: vn,
      tableInnerStyle: jt,
      scrollbarStyle: Cn,
      scrollBarRef: kt,
      scrollTo: Et,
      setScrollLeft: wn,
      setScrollTop: Pn
    };
  }
}), _hoisted_1$2 = ["data-prefix"], _hoisted_2 = {
  ref: "hiddenColumns",
  class: "hidden-columns"
};
function _sfc_render$3(e, k, oe, re, ae, le) {
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
  ], 46, _hoisted_1$2);
}
var Table = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$3], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/table/src/table.vue"]]);
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
    let Ie = re.vnode.vParent || re.parent;
    for (; Ie && !Ie.tableId && !Ie.columnId; )
      Ie = Ie.vnode.vParent || Ie.parent;
    return Ie;
  }), Ce = computed(() => {
    const { store: Ie } = re.parent;
    if (!Ie)
      return !1;
    const { treeData: Ue } = Ie.states, Lt = Ue.value;
    return Lt && Object.keys(Lt).length > 0;
  }), _e = ref(parseWidth(e.width)), Ne = ref(parseMinWidth(e.minWidth)), Ve = (Ie) => (_e.value && (Ie.width = _e.value), Ne.value && (Ie.minWidth = Ne.value), Ie.minWidth || (Ie.minWidth = 80), Ie.realWidth = Number(Ie.width === void 0 ? Ie.minWidth : Ie.width), Ie), $e = (Ie) => {
    const Ue = Ie.type, Lt = cellForced[Ue] || {};
    Object.keys(Lt).forEach((Pt) => {
      const bn = Lt[Pt];
      Pt !== "className" && bn !== void 0 && (Ie[Pt] = bn);
    });
    const ze = getDefaultClassName(Ue);
    if (ze) {
      const Pt = `${unref(de.namespace)}-${ze}`;
      Ie.className = Ie.className ? `${Ie.className} ${Pt}` : Pt;
    }
    return Ie;
  }, he = (Ie) => {
    Array.isArray(Ie) ? Ie.forEach((Lt) => Ue(Lt)) : Ue(Ie);
    function Ue(Lt) {
      var ze;
      ((ze = Lt == null ? void 0 : Lt.type) == null ? void 0 : ze.name) === "ElTableColumn" && (Lt.vParent = re);
    }
  };
  return {
    columnId: ae,
    realAlign: ie,
    isSubColumn: le,
    realHeaderAlign: ue,
    columnOrTableParent: pe,
    setColumnWidth: Ve,
    setColumnForcedProps: $e,
    setColumnRenders: (Ie) => {
      e.renderHeader ? debugWarn("TableColumn", "Comparing to render-header, scoped-slot header is easier to use. We recommend users to use scoped-slot header.") : Ie.type !== "selection" && (Ie.renderHeader = (ze) => {
        re.columnConfig.value.label;
        const Pt = k.header;
        return Pt ? Pt(ze) : Ie.label;
      });
      let Ue = Ie.renderCell;
      const Lt = Ce.value;
      return Ie.type === "expand" ? (Ie.renderCell = (ze) => h$2("div", {
        class: "cell"
      }, [Ue(ze)]), oe.value.renderExpanded = (ze) => k.default ? k.default(ze) : k.default) : (Ue = Ue || defaultRenderCell, Ie.renderCell = (ze) => {
        let Pt = null;
        if (k.default) {
          const $n = k.default(ze);
          Pt = $n.some((_n) => _n.type !== Comment) ? $n : Ue(ze);
        } else
          Pt = Ue(ze);
        const bn = Lt && ze.cellIndex === 0, En = treeCellPrefix(ze, bn), Tn = {
          class: "cell",
          style: {}
        };
        return Ie.showOverflowTooltip && (Tn.class = `${Tn.class} ${unref(de.namespace)}-tooltip`, Tn.style = {
          width: `${(ze.column.realWidth || Number(ze.column.width)) - 1}px`
        }), he(Pt), h$2("div", Tn, [En, Pt]);
      }), Ie;
    },
    getPropsData: (...Ie) => Ie.reduce((Ue, Lt) => (Array.isArray(Lt) && Lt.forEach((ze) => {
      Ue[ze] = e[ze];
    }), Ue), {}),
    getColumnElIndex: (Ie, Ue) => Array.prototype.indexOf.call(Ie, Ue)
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
      let Fe = oe.parent;
      for (; Fe && !Fe.tableId; )
        Fe = Fe.parent;
      return Fe;
    }), { registerNormalWatchers: le, registerComplexWatchers: ie } = useWatcher(ae, e), {
      columnId: ue,
      isSubColumn: de,
      realHeaderAlign: pe,
      columnOrTableParent: Ce,
      setColumnWidth: _e,
      setColumnForcedProps: Ne,
      setColumnRenders: Ve,
      getPropsData: $e,
      getColumnElIndex: he,
      realAlign: Oe
    } = useRender(e, k, ae), xe = Ce.value;
    ue.value = `${xe.tableId || xe.columnId}_column_${columnIdSeed++}`, onBeforeMount(() => {
      de.value = ae.value !== xe;
      const Fe = e.type || "default", Ie = e.sortable === "" ? !0 : e.sortable, Ue = {
        ...cellStarts[Fe],
        id: ue.value,
        type: Fe,
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
        sortable: Ie,
        index: e.index,
        rawColumnKey: oe.vnode.key
      };
      let En = $e([
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
      En = mergeOptions(Ue, En), En = compose(Ve, _e, Ne)(En), re.value = En, le(), ie();
    }), onMounted(() => {
      var Fe;
      const Ie = Ce.value, Ue = de.value ? Ie.vnode.el.children : (Fe = Ie.refs.hiddenColumns) == null ? void 0 : Fe.children, Lt = () => he(Ue || [], oe.vnode.el);
      re.value.getColumnIndex = Lt, Lt() > -1 && ae.value.store.commit("insertColumn", re.value, de.value ? Ie.columnConfig.value : null);
    }), onBeforeUnmount(() => {
      ae.value.store.commit("removeColumn", re.value, de.value ? xe.columnConfig.value : null);
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
}, _sfc_main$7 = /* @__PURE__ */ defineComponent({
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
    }), Ne = computed(() => {
      const he = [];
      if (oe.start && oe.end && oe.step) {
        let Oe = ue.value, xe;
        for (; Oe && de.value && compareTime(Oe, de.value) <= 0; )
          xe = dayjs(Oe, "HH:mm").format(oe.format), he.push({
            value: xe,
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
      "onUpdate:modelValue": Oe[0] || (Oe[0] = (xe) => he.$emit("update:modelValue", xe)),
      onChange: Oe[1] || (Oe[1] = (xe) => he.$emit("change", xe)),
      onBlur: Oe[2] || (Oe[2] = (xe) => he.$emit("blur", xe)),
      onFocus: Oe[3] || (Oe[3] = (xe) => he.$emit("focus", xe))
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
        (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(Ne), (xe) => (openBlock(), createBlock(unref(re), {
          key: xe.value,
          label: xe.value,
          value: xe.value,
          disabled: xe.disabled
        }, null, 8, ["label", "value", "disabled"]))), 128))
      ]),
      _: 1
    }, 8, ["model-value", "disabled", "clearable", "clear-icon", "size", "effect", "placeholder", "filterable"]));
  }
});
var TimeSelect = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/time-select/src/time-select.vue"]]);
TimeSelect.install = (e) => {
  e.component(TimeSelect.name, TimeSelect);
};
const _TimeSelect = TimeSelect, ElTimeSelect = _TimeSelect, componentMap = /* @__PURE__ */ new Map();
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
function useItemLabelWidth(e, k) {
  return computed(() => {
    const oe = unref(e), { labelCol: re = {}, wrapperCol: ae = {} } = oe.itemProps || {}, { labelWidth: le, disabledLabelWidth: ie } = oe, {
      labelWidth: ue,
      labelCol: de,
      wrapperCol: pe,
      layout: Ce
    } = unref(k);
    if (!ue && !le && !de || ie)
      return re.style = {
        textAlign: "left"
      }, { labelCol: re, wrapperCol: ae };
    let _e = le || ue;
    const Ne = { ...de, ...re }, Ve = { ...pe, ...ae };
    return _e && (_e = isNumber$1(_e) ? `${_e}px` : _e), {
      labelCol: { style: { width: _e }, ...Ne },
      wrapperCol: {
        style: {
          width: Ce === "vertical" ? "100%" : `calc(100% - ${_e})`
        },
        ...Ve
      }
    };
  });
}
const props = {
  maxWidth: {
    type: String,
    default: "600px"
  },
  showIndex: {
    type: Boolean
  },
  color: {
    type: String,
    default: "#ffffff"
  },
  fontSize: {
    type: String,
    default: "14px"
  },
  placement: {
    type: String,
    default: "right"
  },
  text: {
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
    })), ae = computed(() => ({
      maxWidth: e.maxWidth
    }));
    function le() {
      const ie = e.text;
      return isString$2(ie) ? createVNode("p", null, [ie]) : isArray$3(ie) ? ie.map((ue, de) => createVNode("p", {
        key: ue
      }, [createVNode(Fragment, null, [e.showIndex ? `${de + 1}. ` : "", ue])])) : null;
    }
    return () => createVNode(ElTooltip, {
      popperClass: `${oe}__wrap`,
      content: createVNode("div", {
        style: unref(re)
      }, [le()]),
      rawContent: !0,
      overlayStyle: unref(ae),
      placement: e.placement,
      appendTo: () => getPopupContainer()
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
    } = toRefs(e), ae = useItemLabelWidth(oe, re);
    unref(ae);
    const le = computed(() => {
      var Ie;
      const {
        schema: $e,
        tableAction: he,
        formModel: Oe,
        formActionType: xe
      } = e, {
        componentProps: Fe = {}
      } = $e;
      return isFunction$2(Fe) ? (Ie = Fe({
        schema: $e,
        tableAction: he,
        formModel: Oe,
        formActionType: xe
      })) != null ? Ie : {} : Fe;
    }), ie = computed(() => {
      const {
        allDefaultValues: $e,
        formModel: he,
        schema: Oe
      } = e, {
        mergeDynamicData: xe
      } = e.formProps;
      return {
        field: Oe.field,
        model: he,
        values: {
          ...xe,
          ...$e,
          ...he
        },
        schema: Oe
      };
    }), ue = computed(() => {
      const {
        disabled: $e
      } = e.formProps, {
        dynamicDisabled: he
      } = e.schema, {
        disabled: Oe = !1
      } = unref(le);
      let xe = !!$e || Oe;
      return isBoolean$1(he) && (xe = he), isFunction$2(he) && (xe = he(unref(ie))), xe;
    });
    function de() {
      const {
        show: $e,
        ifShow: he
      } = e.schema, {
        showAdvancedButton: Oe
      } = e.formProps, xe = Oe && isBoolean$1(e.schema.isAdvanced) ? e.schema.isAdvanced : !0;
      let Fe = !0, Ie = !0;
      return isBoolean$1($e) && (Fe = $e), isBoolean$1(he) && (Ie = he), isFunction$2($e) && (Fe = $e(unref(ie))), isFunction$2(he) && (Ie = he(unref(ie))), Fe = Fe && xe, {
        isShow: Fe,
        isIfShow: Ie
      };
    }
    function pe() {
      var _n;
      const {
        rules: $e = [],
        component: he,
        rulesMessageJoinLabel: Oe,
        label: xe,
        dynamicRules: Fe,
        required: Ie
      } = e.schema;
      if (isFunction$2(Fe))
        return Fe(unref(ie));
      let Ue = cloneDeep($e);
      const {
        rulesMessageJoinLabel: Lt
      } = e.formProps, ze = Reflect.has(e.schema, "rulesMessageJoinLabel") ? Oe : Lt, Pt = createPlaceholderMessage(he) + `${ze ? xe : ""}`;
      function bn(Dt, At, vn) {
        const jt = Dt.message || Pt;
        return At === void 0 || isNull(At) || Array.isArray(At) && At.length === 0 || typeof At == "string" && At.trim() === "" || typeof At == "object" && Reflect.has(At, "checked") && Reflect.has(At, "halfChecked") && Array.isArray(At.checked) && Array.isArray(At.halfChecked) && At.checked.length === 0 && At.halfChecked.length === 0 ? Promise.reject(jt) : Promise.resolve();
      }
      const En = isFunction$2(Ie) ? Ie(unref(ie)) : Ie;
      En && (!Ue || Ue.length === 0 ? Ue = [{
        required: En,
        validator: bn
      }] : Ue.findIndex((At) => Reflect.has(At, "required")) === -1 && Ue.push({
        required: En,
        validator: bn
      }));
      const Tn = Ue.findIndex((Dt) => Reflect.has(Dt, "required") && !Reflect.has(Dt, "validator"));
      if (Tn !== -1) {
        const Dt = Ue[Tn], {
          isShow: At
        } = de();
        if (At || (Dt.required = !1), he) {
          Reflect.has(Dt, "type") || (Dt.type = he === "InputNumber" ? "number" : "string"), Dt.message = Dt.message || Pt, (he.includes("Input") || he.includes("Textarea")) && (Dt.whitespace = !0);
          const vn = (_n = unref(le)) == null ? void 0 : _n.valueFormat;
          setComponentRuleType(Dt, he, vn);
        }
      }
      const $n = Ue.findIndex((Dt) => Dt.max);
      return $n !== -1 && !Ue[$n].validator && (Ue[$n].message = Ue[$n].message || t("component.form.maxTip", [Ue[$n].max])), Ue;
    }
    const Ce = ($e) => {
      let he;
      const {
        componentProps: Oe = {}
      } = unref(oe), xe = Oe.options;
      return $e === "CheckboxGroup" ? (he = xe.map(({
        label: Fe,
        value: Ie
      }) => {
        const Ue = componentMap.get("Checkbox");
        return createVNode(Ue, {
          label: Ie,
          key: Ie
        }, _isSlot$2(Fe) ? Fe : {
          default: () => [Fe]
        });
      }), he) : ($e === "Select" ? he = xe.map(({
        label: Fe,
        value: Ie
      }) => {
        const Ue = componentMap.get("SelectOption");
        return createVNode(Ue, {
          label: Fe,
          value: Ie,
          key: Ie
        }, _isSlot$2(Fe) ? Fe : {
          default: () => [Fe]
        });
      }) : $e === "RadioGroup" && (he = xe.map(({
        label: Fe,
        value: Ie
      }) => {
        const Ue = componentMap.get("Radio");
        return createVNode(Ue, {
          label: Ie,
          key: Ie
        }, _isSlot$2(Fe) ? Fe : {
          default: () => [Fe]
        });
      })), he);
    }, _e = () => {
      var Dt, At;
      const {
        renderComponentContent: $e,
        component: he,
        field: Oe,
        changeEvent: xe = "change",
        valueField: Fe
      } = e.schema, Ie = he && ["Switch", "Checkbox"].includes(he), Ue = `on${upperFirst$1(xe)}`, Lt = {
        [Ue]: (...vn) => {
          const [jt] = vn;
          Pt[Ue] && Pt[Ue](...vn);
          const Cn = jt ? jt.target : null, kt = Cn ? Ie ? Cn.checked : Cn.value : jt;
          e.setFormModel(Oe, kt);
        }
      }, ze = componentMap.get(he), Pt = {
        getPopupContainer: (vn) => vn.parentNode,
        ...unref(le),
        disabled: unref(ue)
      }, {
        autoSetPlaceHolder: bn
      } = e.formProps;
      !Pt.disabled && bn && he && (Pt.placeholder = ((Dt = unref(le)) == null ? void 0 : Dt.placeholder) || createPlaceholderMessage(he)), Pt.placeholder = (At = unref(le)) == null ? void 0 : At.placeholder, Pt.codeField = Oe, Pt.formValues = unref(ie);
      const Tn = {
        [Fe || (Ie ? "checked" : "value")]: e.formModel[Oe]
      }, $n = {
        ...Pt,
        ...Lt,
        ...Tn
      };
      if (!$e) {
        let vn;
        return createVNode(ze, mergeProps($n, {
          modelValue: e.formModel[Oe],
          "onUpdate:modelValue": (jt) => e.formModel[Oe] = jt
        }), _isSlot$2(vn = Ce(he)) ? vn : {
          default: () => [vn]
        });
      }
      const _n = isFunction$2($e) ? {
        ...$e(unref(ie))
      } : {
        default: () => $e
      };
      return createVNode(ze, $n, _isSlot$2(_n) ? _n : {
        default: () => [_n]
      });
    }, Ne = () => {
      const {
        label: $e,
        helpMessage: he,
        helpComponentProps: Oe,
        subLabel: xe
      } = e.schema, Fe = xe ? createVNode("span", null, [$e, createTextVNode(" "), createVNode("span", {
        class: "text-secondary"
      }, [xe])]) : $e, Ie = isFunction$2(he) ? he(unref(ie)) : he;
      return !Ie || Array.isArray(Ie) && Ie.length === 0 ? Fe : createVNode("span", null, [Fe, createVNode(_sfc_main$6, mergeProps({
        placement: "top",
        class: "mx-1",
        text: Ie
      }, Oe), null)]);
    }, Ve = () => {
      const {
        label: $e,
        slot: he,
        render: Oe,
        field: xe,
        suffix: Fe,
        itemProps: Ie
      } = e.schema, Ue = () => he ? getSlot(k, he, unref(ie)) : Oe ? Oe(unref(ie)) : _e(), Lt = !!Fe, ze = isFunction$2(Fe) ? Fe(unref(ie)) : Fe, Pt = {
        slots: {
          label: () => {
            Ne();
          }
        }
      };
      return createVNode(ElFormItem, mergeProps({
        prop: xe,
        label: $e,
        rules: pe()
      }, Ie, Pt), {
        default: () => [createVNode("div", {
          style: "display:flex;width:100%;"
        }, [createVNode("div", {
          style: "flex:1;"
        }, [Ue()]), Lt && createVNode("span", {
          class: "suffix"
        }, [ze])])]
      });
    };
    return onMounted(() => {
      const {
        field: $e,
        defaultValue: he = ""
      } = unref(oe);
      e.setFormModel($e, he);
    }), () => {
      let $e;
      const {
        colProps: he = {},
        colSlot: Oe,
        renderColContent: xe,
        component: Fe
      } = e.schema;
      if (!componentMap.has(Fe))
        return console.error(`FormItem component:${Fe} is an unregistered component Key`), null;
      const {
        baseColProps: Ie = {}
      } = e.formProps, Ue = {
        ...Ie,
        ...he
      }, {
        isShow: Lt
      } = de(), ze = unref(ie);
      return withDirectives(createVNode(ElCol, Ue, _isSlot$2($e = (() => Oe ? getSlot(k, Oe, ze) : xe ? xe(ze) : Ve())()) ? $e : {
        default: () => [$e]
      }), [[vShow, Lt]]);
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
    ElFormItem,
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
      let [, Ne] = _e;
      const [Ve] = _e;
      if (!Ve || isArray$3(Ne) && Ne.length === 0 || isFunction$2(Ne))
        continue;
      const $e = unref(oe).transformDateFunc;
      isObject$3(Ne) && (Ne = $e == null ? void 0 : $e(Ne)), isArray$3(Ne) && ((pe = Ne[0]) == null ? void 0 : pe.format) && ((Ce = Ne[1]) == null ? void 0 : Ce.format) && (Ne = Ne.map((he) => $e == null ? void 0 : $e(he))), isString$2(Ne) && (Ne = Ne.trim()), !tryDeconstructArray(Ve, Ne, de) && !tryDeconstructObject(Ve, Ne, de) && set(de, Ve, Ne);
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
      Ne = "YYYY-MM-DD"
    ] of de) {
      if (!pe || !Ce || !_e || !ue[pe])
        continue;
      const [Ve, $e] = ue[pe];
      ue[Ce] = dateUtil(Ve).format(Ne), ue[_e] = dateUtil($e).format(Ne), Reflect.deleteProperty(ue, pe);
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
    const fields = unref(getSchema).map((e) => e.field).filter(Boolean), delimiter = ".", nestKeyArray = fields.filter((e) => e.indexOf(delimiter) >= 0), validKeys = [];
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
      const { span: Oe = 0 } = he, xe = unref(pe);
      return he[xe.toLowerCase()] || Oe || 0;
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
  function Ne(he, Oe = 0, xe = !1) {
    const Fe = unref(ue), Ie = parseInt(he.md) || parseInt(he.xs) || parseInt(he.sm) || he.span || BASIC_COL_LEN, Ue = parseInt(he.lg) || Ie, Lt = parseInt(he.xl) || Ue, ze = parseInt(he.xxl) || Lt;
    return Fe <= de.MD ? Oe += Ie : Fe < de.LG ? Oe += Ue : Fe < de.XL ? Oe += Lt : Oe += ze, xe ? (e.hideAdvanceBtn = !1, Oe <= BASIC_COL_LEN * 2 ? (e.hideAdvanceBtn = !0, e.isAdvanced = !0) : Oe > BASIC_COL_LEN * 2 && Oe <= BASIC_COL_LEN * (unref(oe).autoAdvancedLine || 3) ? e.hideAdvanceBtn = !1 : e.isLoad || (e.isLoad = !0, e.isAdvanced = !e.isAdvanced), { isAdvanced: e.isAdvanced, itemColSum: Oe }) : Oe > BASIC_COL_LEN * (unref(oe).alwaysShowLines || 1) ? { isAdvanced: e.isAdvanced, itemColSum: Oe } : { isAdvanced: !0, itemColSum: Oe };
  }
  function Ve() {
    var Fe;
    let he = 0, Oe = 0;
    const { baseColProps: xe = {} } = unref(oe);
    for (const Ie of unref(re)) {
      const { show: Ue, colProps: Lt } = Ie;
      let ze = !0;
      if (isBoolean$1(Ue) && (ze = Ue), isFunction$2(Ue) && (ze = Ue({
        schema: Ie,
        model: ae,
        field: Ie.field,
        values: {
          ...unref(le),
          ...ae
        }
      })), ze && (Lt || xe)) {
        const { itemColSum: Pt, isAdvanced: bn } = Ne(
          { ...xe, ...Lt },
          he
        );
        he = Pt || 0, bn && (Oe = he), Ie.isAdvanced = bn;
      }
    }
    console.log(he), (Fe = ie == null ? void 0 : ie.proxy) == null || Fe.$forceUpdate(), e.actionSpan = Oe % BASIC_COL_LEN + unref(Ce), Ne(
      unref(oe).actionColOptions || { span: BASIC_COL_LEN },
      he,
      !0
    ), k("advanced-change");
  }
  function $e() {
    e.isAdvanced = !e.isAdvanced;
  }
  return { handleToggleAdvanced: $e };
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
      () => {
        const kt = {
          ...e,
          ...unref(ae)
        };
        return console.log(kt), kt;
      }
    ), _e = computed(() => {
      const { baseRowStyle: kt = {}, rowProps: Et } = unref(Ce);
      return {
        style: kt,
        ...Et
      };
    }), Ne = computed(() => {
      const { rules: kt = {} } = unref(Ce);
      return kt;
    }), Ve = computed(
      () => ({ ...oe, ...e, ...unref(Ce) })
    ), $e = computed(() => {
      const kt = unref(ie) || e.schemas;
      for (const Et of kt) {
        const { defaultValue: wn, component: Pn } = Et;
        if (wn && dateItemType.includes(Pn))
          if (!Array.isArray(wn))
            Et.defaultValue = dateUtil(wn);
          else {
            const hn = [];
            wn.forEach((On) => {
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
      getSchema: $e,
      formModel: re
    }), {
      handleSubmit: xe,
      setFieldsValue: Fe,
      clearValidate: Ie,
      validate: Ue,
      validateFields: Lt,
      getFieldsValue: ze,
      updateSchema: Pt,
      resetSchema: bn,
      appendSchemaByField: En,
      removeSchemaByFiled: Tn,
      resetFields: $n,
      scrollToField: _n
    } = useFormEvents({
      emit: k,
      getProps: Ce,
      formModel: re,
      getSchema: $e,
      defaultValueRef: le,
      formElRef: ue,
      schemaRef: ie,
      handleFormValues: Oe
    });
    createFormContext({
      resetAction: $n,
      submitAction: xe
    }), watch(
      () => unref(Ce).model,
      () => {
        const { model: kt } = unref(Ce);
        !kt || Fe(kt);
      },
      {
        immediate: !0
      }
    ), watch(
      () => unref(Ce).schemas,
      (kt) => {
        bn(kt != null ? kt : []);
      }
    ), watch(
      () => $e.value,
      (kt) => {
        unref(de) || kt != null && kt.length && (he(), de.value = !0);
      }
    ), watch(
      () => re,
      useDebounceFn(() => {
        unref(Ce).submitOnChange && xe();
      }, 300),
      { deep: !0 }
    );
    async function Dt(kt) {
      ae.value = deepMerge$1(unref(ae) || {}, kt);
    }
    function At(kt, Et) {
      re[kt] = Et;
      const { validateTrigger: wn } = unref(Ve);
      (!wn || wn === "change") && Lt([kt]).catch(() => {
      }), k("field-value-change", kt, Et);
    }
    function vn(kt) {
      const { autoSubmitOnEnter: Et } = unref(Ce);
      if (!!Et && kt.key === "Enter" && kt.target && kt.target instanceof HTMLElement) {
        const wn = kt.target;
        wn && wn.tagName && wn.tagName.toUpperCase() == "INPUT" && xe();
      }
    }
    const jt = {
      getFieldsValue: ze,
      setFieldsValue: Fe,
      resetFields: $n,
      updateSchema: Pt,
      resetSchema: bn,
      setProps: Dt,
      removeSchemaByFiled: Tn,
      appendSchemaByField: En,
      clearValidate: Ie,
      validateFields: Lt,
      validate: Ue,
      submit: xe,
      scrollToField: _n
    };
    useAutoFocus({
      getSchema: $e,
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
      getSchema: $e,
      formModel: re,
      defaultValueRef: le
    });
    return {
      getBindValue: Ve,
      handleToggleAdvanced: Cn,
      handleEnterPress: vn,
      formModel: re,
      defaultValueRef: le,
      advanceState: pe,
      getRow: _e,
      getProps: Ce,
      getRules: Ne,
      formRef: ue,
      getSchema: $e,
      formActionType: jt,
      setFormModel: At,
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
                fn: withCtx((Ne) => [
                  renderSlot(e.$slots, _e, normalizeProps(guardReactiveProps(Ne || {})))
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
      const Ne = _e.column;
      return createVNode("div", {
        relId: Ne.property
      }, [Ne.label, createVNode("span", {
        class: "caret-wrapper"
      }, [createVNode("i", {
        class: "sort-caret ascending",
        "on-click": ($e) => k.sortIconClick($e, Ne, "ascending")
      }, null), createVNode("i", {
        class: "sort-caret descending",
        "on-click": ($e) => k.sortIconClick($e, Ne, "descending")
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
      let $e = {};
      const he = Object.keys(Ce);
      for (let Oe in he)
        $e[Oe] = unref(he[Oe]);
      return $e;
    });
    onMounted(() => {
      ie.init();
    });
    const Ne = ($e) => {
      k("handleSizePageChange", $e);
    }, Ve = ($e) => {
      k("handleCurrentPageChange", $e);
    };
    return () => {
      const $e = Object.assign({
        ref: oe,
        onHeaderClick: ue,
        data: ae.value
      }, _e.value);
      console.log(_e);
      const he = useColumnRender(le.value, ie);
      let Oe = null;
      return unref(de) && (Oe = usePagerRender(pe, Ne, Ve)), createVNode("div", {
        class: "vpandora-table"
      }, [createVNode(ElTable, $e, _isSlot(he) ? he : {
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
