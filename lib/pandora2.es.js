var je = Object.defineProperty;
var Ve = (e, k, U) => k in e ? je(e, k, { enumerable: !0, configurable: !0, writable: !0, value: U }) : e[k] = U;
var Oe = (e, k, U) => (Ve(e, typeof k != "symbol" ? k + "" : k, U), U);
import { createVNode, isVNode, toRaw, defineComponent, resolveComponent, openBlock, createElementBlock, ref, watch, computed, unref, onMounted, getCurrentInstance, reactive, readonly, watchEffect, nextTick, shallowRef, createBlock, mergeProps, createSlots, withCtx, Fragment, renderList, createElementVNode, createTextVNode, toRefs, withDirectives, vShow, normalizeClass, normalizeStyle, provide, inject, normalizeProps, renderSlot, toDisplayString, createCommentVNode, onUnmounted, withKeys, guardReactiveProps } from "vue";
import { ElTableColumn, ElTable, ElSelect, ElAutocomplete, ElButton, ElCheckbox, ElCheckboxGroup, ElCascader, ElDatePicker, ElInput, ElInputNumber, ElTimePicker, ElTimeSelect, ElSlider, ElOption, ElSwitch, ElRadio, ElRadioGroup, ElRate, ElDivider, ElTooltip, ElCol, ElFormItem, ElForm, ElRow } from "element-plus";
import { cloneDeep, isEqual, omit, get, upperFirst, set, uniqBy } from "lodash-es";
import { Warning } from "@element-plus/icons-vue";
import dayjs from "dayjs";
const version$1 = require("../package.json").version, makeInstaller = (e = []) => ({
  version: version$1,
  install: (U) => {
    e.forEach((K) => U.use(K));
  }
}), withInstall = (e, k) => {
  if (e.install = (U) => {
    for (const K of [e, ...Object.values(k != null ? k : {})])
      U.component(K.name, K);
  }, k)
    for (const [U, K] of Object.entries(k))
      e[U] = K;
  return e;
}, withNoopInstall = (e) => (e.install = () => {
}, e), toString = Object.prototype.toString;
function is(e, k) {
  return toString.call(e) === `[object ${k}]`;
}
function isDef(e) {
  return typeof e < "u";
}
function isUnDef(e) {
  return !isDef(e);
}
function isObject$1(e) {
  return e !== null && is(e, "Object");
}
function isNull(e) {
  return e === null;
}
function isNullOrUnDef(e) {
  return isUnDef(e) || isNull(e);
}
function isNumber(e) {
  return is(e, "Number");
}
function isString(e) {
  return is(e, "String");
}
function isFunction(e) {
  return typeof e == "function";
}
function isBoolean(e) {
  return is(e, "Boolean");
}
function isArray(e) {
  return e && Array.isArray(e);
}
function createNamespace(e) {
  return [`Pd${e}`];
}
function _isSlot$2(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !isVNode(e);
}
function renderColumnProp(e, k) {
  const {
    prop: U,
    value: K,
    label: G,
    name: H,
    sortable: W,
    render: X,
    ...Z
  } = e, ee = {
    prop: U || K,
    label: G || H,
    ...Z
  };
  let te;
  return W && (te = {
    header: (oe) => {
      const Q = oe.column;
      return createVNode("div", {
        relId: Q.property
      }, [Q.label, createVNode("span", {
        class: "caret-wrapper"
      }, [createVNode("i", {
        class: "sort-caret ascending",
        "on-click": (ne) => k.sortIconClick(ne, Q, "ascending")
      }, null), createVNode("i", {
        class: "sort-caret descending",
        "on-click": (ne) => k.sortIconClick(ne, Q, "descending")
      }, null)])]);
    }
  }), X && isFunction(X) && (te = {
    default: (oe) => X(toRaw(oe.row), oe.column, oe.$index)
  }), {
    columnProps: ee,
    slots: te
  };
}
function getColumnVNode(e, k, U = null) {
  const {
    columnProps: K,
    slots: G
  } = renderColumnProp(e, k);
  if (U)
    return createVNode(ElTableColumn, K, _isSlot$2(U) ? U : {
      default: () => [U]
    });
  const H = G && (G.default || G.header) ? G : "";
  return createVNode(ElTableColumn, {
    ...K
  }, H);
}
function useColumnRender(e, k) {
  return e.map((K) => {
    let G;
    return (K == null ? void 0 : K.columns) && (K == null ? void 0 : K.columns.length) ? (G = K == null ? void 0 : K.columns.map((H) => getColumnVNode(H, k)), getColumnVNode(K, k, G)) : getColumnVNode(K, k);
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
}), [name$2] = createNamespace("Pagination"), _sfc_main$8 = defineComponent({
  name: name$2,
  inheritAttrs: !1,
  props: getPagerProps(),
  setup(e, { emit: k }) {
    return {
      handleSizeChange: (G) => {
        k("handleSizeChange", G);
      },
      handleCurrentChange: (G) => {
        k("handleCurrentChange", G);
      }
    };
  }
}), index_vue_vue_type_style_index_0_lang$3 = "", _export_sfc = (e, k) => {
  const U = e.__vccOpts || e;
  for (const [K, G] of k)
    U[K] = G;
  return U;
}, _hoisted_1$3 = { class: "vpandora-pagination" };
function _sfc_render$4(e, k, U, K, G, H) {
  const W = resolveComponent("el-pagination");
  return openBlock(), createElementBlock("div", _hoisted_1$3, [
    createVNode(W, {
      onSizeChange: e.handleSizeChange,
      onCurrentChange: e.handleCurrentChange,
      currentPage: e.option.currentPage,
      "onUpdate:currentPage": k[0] || (k[0] = (X) => e.option.currentPage = X),
      "page-sizes": e.option.pageSizes,
      "page-size": e.option.pageSize,
      "onUpdate:page-size": k[1] || (k[1] = (X) => e.option.pageSize = X),
      "pager-count": e.option.pageCount,
      layout: e.option.layout,
      total: e.option.total
    }, null, 8, ["onSizeChange", "onCurrentChange", "currentPage", "page-sizes", "page-size", "pager-count", "layout", "total"])
  ]);
}
const Pagination = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$4]]), usePagerRender = (e, k, U) => {
  let K = null;
  const H = {
    ref: ref(null),
    option: e,
    onHandleSizeChange: k,
    onHandleCurrentChange: U
  };
  return K = createVNode(Pagination, H, null), K;
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
    Oe(this, "activeSort", {});
    Oe(this, "defaultSortObj", {});
    Oe(this, "_oldActiveSort", {});
    Oe(this, "option", {
      sortMode: SINGLE
    });
    this.option = k;
  }
  init() {
    const k = this.option.userColumnOrder;
    this._initDefSortObj();
    for (const U in k)
      this.defaultSortObj[U] && (k[U] = this.defaultSortObj[U]);
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
    let U = "";
    return this._oldActiveSort[k] ? U = this._oldActiveSort[k] : U = this.option.defaultOrder || DEFAULT_SORT, U;
  }
  getSortColDom(k) {
    var G;
    return ((G = this.option.tableInstance) == null ? void 0 : G.value).$el.querySelectorAll(`div[relid=${k}]`);
  }
  initIconSort() {
    for (const k in this.activeSort)
      this.getSortColDom(k).forEach((K) => {
        addClass(K.parentNode.parentNode, this.activeSort[k]);
      });
  }
  getTargetSortKey(k) {
    const U = SORT_ARR.findIndex((K) => K !== k);
    return SORT_ARR[U];
  }
  getCurrentSortKey(k) {
    let U = "";
    const K = `${ASC}|${DESC}`;
    for (let G = 0; G < k.length; G++)
      new RegExp(K).test(k[G]) && (U = trim(k[G]));
    return U;
  }
  _isSingleModel(k) {
    return SINGLE === k;
  }
  getTargetNode(k) {
    const U = k.target;
    let K;
    return U.className === "caret-wrapper" ? K = U.parentNode.parentNode.parentNode : U.nodeName === "I" ? K = U.parentNode.parentNode.parentNode.parentNode : U.nodeName === "DIV" && U.attributes.getNamedItem("relid") ? K = U.parentNode.parentNode : U.nodeName === "DIV" && U.className == "cell" && (K = U.parentNode), K;
  }
  isNeedOrderChange(k) {
    return this._oldActiveSort[k];
  }
  sortOrderService(k, U) {
    this.activeSort[k] = U;
  }
  _clearSortOrderService() {
    for (const k in this.activeSort)
      this.activeSort[k] = "", this.clearSortOrderCls(k);
  }
  clearSortOrderCls(k) {
    this.getSortColDom(k).forEach((K) => {
      this.removeAllSortOrderCls(K.parentNode.parentNode);
    });
  }
  changeSortOrderClass(k, U) {
    this.removeAllSortOrderCls(k), addClass(k, U);
  }
  removeAllSortOrderCls(k) {
    SORT_ARR.forEach((U) => {
      removeClass(k, U);
    });
  }
  sortIconClick(k, U, K) {
    const G = this.getTargetNode(k);
    this._isSingleModel(this.option.sortMode) && this._clearSortOrderService(), this.changeSortOrderClass(G, K), this.sortOrderService(U.property, K), this.sortChange(), k.stopPropagation(), k.preventDefault();
  }
  sortChange() {
    this.option.sortChange && isFunction(this.option.sortChange) && this.option.sortChange(this.getActiveSortValue());
  }
  getActiveSortValue() {
    const k = /* @__PURE__ */ Object.create(null);
    for (const U in this.activeSort)
      this.activeSort[U] !== "" && (k[U] = this.activeSort[U]);
    return k;
  }
  executeHeaderClick(k, U) {
    const K = k.property;
    if (!this.isNeedOrderChange(K))
      return;
    const G = this.getTargetNode(U), H = this.getCurrentSortKey(G.classList);
    let W = "";
    this._isSingleModel(this.option.sortMode) && this._clearSortOrderService(), H !== "" ? W = this.getTargetSortKey(H) : W = this._getDefaultOrder(K), this.changeSortOrderClass(G, W), this.sortOrderService(K, W), this.sortChange();
  }
}
function useSortService(e, k, U) {
  const K = () => {
    const H = Object.create([]);
    return k.map((W) => {
      W.sortable && W.sortable !== void 0 && (H[W.value] = "");
    }), H;
  };
  return e.userColumnOrder = K(), e.tableInstance = U, new SortService(e);
}
const useTableProps = (e) => {
  const k = ref(), U = ref(e.data), K = e.tableConfig, G = ref(e.columns), { sortConfig: H, columns: W } = e, X = useSortService(
    H,
    W,
    k
  ), Z = (ee, te) => {
    X.executeHeaderClick(ee, te);
  };
  return watch(
    () => e.data,
    () => {
      U.value = e.data, X.init();
    }
  ), {
    tableInstance: k,
    tableConfig: K,
    currentData: U,
    columnsProps: G,
    $sortService: X,
    handleHeaderClick: Z
  };
};
function _isSlot$1(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !isVNode(e);
}
const [name$1] = createNamespace("Table"), _sfc_main$7 = defineComponent({
  name: name$1,
  inheritAttrs: !1,
  props: tableProps,
  setup(e, {
    emit: k
  }) {
    const {
      tableInstance: U,
      tableConfig: K,
      currentData: G,
      columnsProps: H,
      $sortService: W,
      handleHeaderClick: X
    } = useTableProps(e), {
      pagination: Z,
      pageOpt: ee,
      ...te
    } = K, oe = computed(() => {
      let ne = {};
      const re = Object.keys(te);
      for (let se in re)
        ne[se] = unref(re[se]);
      return ne;
    });
    onMounted(() => {
      W.init();
    });
    const Q = (ne) => {
      k("handleSizePageChange", ne);
    }, ae = (ne) => {
      k("handleCurrentPageChange", ne);
    };
    return () => {
      const ne = Object.assign({
        ref: U,
        onHeaderClick: X,
        data: G.value
      }, oe.value), re = useColumnRender(H.value, W);
      let se = null;
      return unref(Z) && (se = usePagerRender(ee, Q, ae)), createVNode("div", {
        class: "vpandora-table"
      }, [createVNode(ElTable, ne, _isSlot$1(re) ? re : {
        default: () => [re]
      }), se]);
    };
  }
}), index_vue_vue_type_style_index_0_lang$2 = "", PdTable = withInstall(_sfc_main$7);
function useRuleFormItem(e, k = "value", U = "change", K) {
  const G = getCurrentInstance(), H = G == null ? void 0 : G.emit, W = reactive({
    value: e[k]
  }), X = readonly(W), Z = (te) => {
    W.value = te;
  };
  return watchEffect(() => {
    W.value = e[k];
  }), [computed({
    get() {
      return W.value;
    },
    set(te) {
      isEqual(te, X.value) || (W.value = te, nextTick(() => {
        H == null || H(U, te, ...toRaw(unref(K)) || []);
      }));
    }
  }), Z, X];
}
const DEFAULT_EXCLUDE_KEYS = ["class", "style"], LISTENER_PREFIX = /^on[A-Z]/;
function entries(e) {
  return Object.keys(e).map((k) => [k, e[k]]);
}
function useAttrs(e = {}) {
  const k = getCurrentInstance();
  if (!k)
    return {};
  const { excludeListeners: U = !1, excludeKeys: K = [], excludeDefaultKeys: G = !0 } = e, H = shallowRef({}), W = K.concat(G ? DEFAULT_EXCLUDE_KEYS : []);
  return k.attrs = reactive(k.attrs), watchEffect(() => {
    const X = entries(k.attrs).reduce((Z, [ee, te]) => (!W.includes(ee) && !(U && LISTENER_PREFIX.test(ee)) && (Z[ee] = te), Z), {});
    H.value = X;
  }), H;
}
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
function isObject(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function isPlainObject(e) {
  var k, U;
  return isObject(e) === !1 ? !1 : (k = e.constructor, k === void 0 ? !0 : (U = k.prototype, !(isObject(U) === !1 || U.hasOwnProperty("isPrototypeOf") === !1)));
}
function t() {
  return t = Object.assign ? Object.assign.bind() : function(e) {
    for (var k = 1; k < arguments.length; k++) {
      var U = arguments[k];
      for (var K in U)
        Object.prototype.hasOwnProperty.call(U, K) && (e[K] = U[K]);
    }
    return e;
  }, t.apply(this, arguments);
}
function r(e, k) {
  if (e == null)
    return {};
  var U, K, G = {}, H = Object.keys(e);
  for (K = 0; K < H.length; K++)
    k.indexOf(U = H[K]) >= 0 || (G[U] = e[U]);
  return G;
}
const n = { silent: !1, logLevel: "warn" }, i = ["validator"], o = Object.prototype, a = o.toString, s = o.hasOwnProperty, u = /^\s*function (\w+)/;
function l(e) {
  var k;
  const U = (k = e == null ? void 0 : e.type) !== null && k !== void 0 ? k : e;
  if (U) {
    const K = U.toString().match(u);
    return K ? K[1] : "";
  }
  return "";
}
const c = isPlainObject, f = (e) => e;
let d = f;
process.env.NODE_ENV !== "production" && (d = typeof console < "u" ? function(k, U = n.logLevel) {
  n.silent === !1 && console[U](`[VueTypes warn]: ${k}`);
} : f);
const p = (e, k) => s.call(e, k), y = Number.isInteger || function(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}, v = Array.isArray || function(e) {
  return a.call(e) === "[object Array]";
}, h = (e) => a.call(e) === "[object Function]", b = (e) => c(e) && p(e, "_vueTypes_name"), g = (e) => c(e) && (p(e, "type") || ["_vueTypes_name", "validator", "default", "required"].some((k) => p(e, k)));
function O(e, k) {
  return Object.defineProperty(e.bind(k), "__original", { value: e });
}
function m(e, k, U = !1) {
  let K, G = !0, H = "";
  K = c(e) ? e : { type: e };
  const W = b(K) ? K._vueTypes_name + " - " : "";
  if (g(K) && K.type !== null) {
    if (K.type === void 0 || K.type === !0 || !K.required && k === void 0)
      return G;
    v(K.type) ? (G = K.type.some((X) => m(X, k, !0) === !0), H = K.type.map((X) => l(X)).join(" or ")) : (H = l(K), G = H === "Array" ? v(k) : H === "Object" ? c(k) : H === "String" || H === "Number" || H === "Boolean" || H === "Function" ? function(X) {
      if (X == null)
        return "";
      const Z = X.constructor.toString().match(u);
      return Z ? Z[1] : "";
    }(k) === H : k instanceof K.type);
  }
  if (!G) {
    const X = `${W}value "${k}" should be of type "${H}"`;
    return U === !1 ? (d(X), !1) : X;
  }
  if (p(K, "validator") && h(K.validator)) {
    const X = d, Z = [];
    if (d = (ee) => {
      Z.push(ee);
    }, G = K.validator(k), d = X, !G) {
      const ee = (Z.length > 1 ? "* " : "") + Z.join(`
* `);
      return Z.length = 0, U === !1 ? (d(ee), G) : ee;
    }
  }
  return G;
}
function j(e, k) {
  const U = Object.defineProperties(k, { _vueTypes_name: { value: e, writable: !0 }, isRequired: { get() {
    return this.required = !0, this;
  } }, def: { value(G) {
    return G === void 0 ? (p(this, "default") && delete this.default, this) : h(G) || m(this, G, !0) === !0 ? (this.default = v(G) ? () => [...G] : c(G) ? () => Object.assign({}, G) : G, this) : (d(`${this._vueTypes_name} - invalid default value: "${G}"`), this);
  } } }), { validator: K } = U;
  return h(K) && (U.validator = O(K, U)), U;
}
function _(e, k) {
  const U = j(e, k);
  return Object.defineProperty(U, "validate", { value(K) {
    return h(this.validator) && d(`${this._vueTypes_name} - calling .validate() will overwrite the current custom validator function. Validator info:
${JSON.stringify(this)}`), this.validator = O(K, this), this;
  } });
}
function T(e, k, U) {
  const K = function(Z) {
    const ee = {};
    return Object.getOwnPropertyNames(Z).forEach((te) => {
      ee[te] = Object.getOwnPropertyDescriptor(Z, te);
    }), Object.defineProperties({}, ee);
  }(k);
  if (K._vueTypes_name = e, !c(U))
    return K;
  const { validator: G } = U, H = r(U, i);
  if (h(G)) {
    let { validator: Z } = K;
    Z && (Z = (X = (W = Z).__original) !== null && X !== void 0 ? X : W), K.validator = O(Z ? function(ee) {
      return Z.call(this, ee) && G.call(this, ee);
    } : G, K);
  }
  var W, X;
  return Object.assign(K, H);
}
function $(e) {
  return e.replace(/^(?!\s*$)/gm, "  ");
}
const w = () => _("any", {}), P = () => _("function", { type: Function }), x = () => _("boolean", { type: Boolean }), E = () => _("string", { type: String }), N = () => _("number", { type: Number }), q = () => _("array", { type: Array }), A = () => _("object", { type: Object }), V = () => j("integer", { type: Number, validator: (e) => y(e) }), S = () => j("symbol", { validator: (e) => typeof e == "symbol" });
function D(e, k = "custom validation failed") {
  if (typeof e != "function")
    throw new TypeError("[VueTypes error]: You must provide a function as argument");
  return j(e.name || "<<anonymous function>>", { type: null, validator(U) {
    const K = e(U);
    return K || d(`${this._vueTypes_name} - ${k}`), K;
  } });
}
function L(e) {
  if (!v(e))
    throw new TypeError("[VueTypes error]: You must provide an array as argument.");
  const k = `oneOf - value should be one of "${e.join('", "')}".`, U = e.reduce((K, G) => {
    if (G != null) {
      const H = G.constructor;
      K.indexOf(H) === -1 && K.push(H);
    }
    return K;
  }, []);
  return j("oneOf", { type: U.length > 0 ? U : void 0, validator(K) {
    const G = e.indexOf(K) !== -1;
    return G || d(k), G;
  } });
}
function F(e) {
  if (!v(e))
    throw new TypeError("[VueTypes error]: You must provide an array as argument");
  let k = !1, U = [];
  for (let G = 0; G < e.length; G += 1) {
    const H = e[G];
    if (g(H)) {
      if (b(H) && H._vueTypes_name === "oneOf" && H.type) {
        U = U.concat(H.type);
        continue;
      }
      if (h(H.validator) && (k = !0), H.type === !0 || !H.type) {
        d('oneOfType - invalid usage of "true" or "null" as types.');
        continue;
      }
      U = U.concat(H.type);
    } else
      U.push(H);
  }
  U = U.filter((G, H) => U.indexOf(G) === H);
  const K = U.length > 0 ? U : null;
  return j("oneOfType", k ? { type: K, validator(G) {
    const H = [], W = e.some((X) => {
      const Z = m(b(X) && X._vueTypes_name === "oneOf" ? X.type || null : X, G, !0);
      return typeof Z == "string" && H.push(Z), Z === !0;
    });
    return W || d(`oneOfType - provided value does not match any of the ${H.length} passed-in validators:
${$(H.join(`
`))}`), W;
  } } : { type: K });
}
function Y(e) {
  return j("arrayOf", { type: Array, validator(k) {
    let U = "";
    const K = k.every((G) => (U = m(e, G, !0), U === !0));
    return K || d(`arrayOf - value validation error:
${$(U)}`), K;
  } });
}
function B(e) {
  return j("instanceOf", { type: e });
}
function I(e) {
  return j("objectOf", { type: Object, validator(k) {
    let U = "";
    const K = Object.keys(k).every((G) => (U = m(e, k[G], !0), U === !0));
    return K || d(`objectOf - value validation error:
${$(U)}`), K;
  } });
}
function J(e) {
  const k = Object.keys(e), U = k.filter((G) => {
    var H;
    return !((H = e[G]) === null || H === void 0 || !H.required);
  }), K = j("shape", { type: Object, validator(G) {
    if (!c(G))
      return !1;
    const H = Object.keys(G);
    if (U.length > 0 && U.some((W) => H.indexOf(W) === -1)) {
      const W = U.filter((X) => H.indexOf(X) === -1);
      return d(W.length === 1 ? `shape - required property "${W[0]}" is not defined.` : `shape - required properties "${W.join('", "')}" are not defined.`), !1;
    }
    return H.every((W) => {
      if (k.indexOf(W) === -1)
        return this._vueTypes_isLoose === !0 || (d(`shape - shape definition does not include a "${W}" property. Allowed keys: "${k.join('", "')}".`), !1);
      const X = m(e[W], G[W], !0);
      return typeof X == "string" && d(`shape - "${W}" property validation error:
 ${$(X)}`), X === !0;
    });
  } });
  return Object.defineProperty(K, "_vueTypes_isLoose", { writable: !0, value: !1 }), Object.defineProperty(K, "loose", { get() {
    return this._vueTypes_isLoose = !0, this;
  } }), K;
}
const M = ["name", "validate", "getter"], R = /* @__PURE__ */ (() => {
  var e;
  return (e = class {
    static get any() {
      return w();
    }
    static get func() {
      return P().def(this.defaults.func);
    }
    static get bool() {
      return x().def(this.defaults.bool);
    }
    static get string() {
      return E().def(this.defaults.string);
    }
    static get number() {
      return N().def(this.defaults.number);
    }
    static get array() {
      return q().def(this.defaults.array);
    }
    static get object() {
      return A().def(this.defaults.object);
    }
    static get integer() {
      return V().def(this.defaults.integer);
    }
    static get symbol() {
      return S();
    }
    static get nullable() {
      return { type: null };
    }
    static extend(k) {
      if (v(k))
        return k.forEach((Z) => this.extend(Z)), this;
      const { name: U, validate: K = !1, getter: G = !1 } = k, H = r(k, M);
      if (p(this, U))
        throw new TypeError(`[VueTypes error]: Type "${U}" already defined`);
      const { type: W } = H;
      if (b(W))
        return delete H.type, Object.defineProperty(this, U, G ? { get: () => T(U, W, H) } : { value(...Z) {
          const ee = T(U, W, H);
          return ee.validator && (ee.validator = ee.validator.bind(ee, ...Z)), ee;
        } });
      let X;
      return X = G ? { get() {
        const Z = Object.assign({}, H);
        return K ? _(U, Z) : j(U, Z);
      }, enumerable: !0 } : { value(...Z) {
        const ee = Object.assign({}, H);
        let te;
        return te = K ? _(U, ee) : j(U, ee), ee.validator && (te.validator = ee.validator.bind(te, ...Z)), te;
      }, enumerable: !0 }, Object.defineProperty(this, U, X);
    }
  }).defaults = {}, e.sensibleDefaults = void 0, e.config = n, e.custom = D, e.oneOf = L, e.instanceOf = B, e.oneOfType = F, e.arrayOf = Y, e.objectOf = I, e.shape = J, e.utils = { validate: (k, U) => m(U, k, !0) === !0, toType: (k, U, K = !1) => K ? _(k, U) : j(k, U) }, e;
})();
function z(e = { func: () => {
}, bool: !0, string: "", number: 0, array: () => [], object: () => ({}), integer: 0 }) {
  var k;
  return (k = class extends R {
    static get sensibleDefaults() {
      return t({}, this.defaults);
    }
    static set sensibleDefaults(U) {
      this.defaults = U !== !1 ? t({}, U !== !0 ? U : e) : {};
    }
  }).defaults = t({}, e), k;
}
class C extends z() {
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
const _sfc_main$6 = defineComponent({
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
    const U = ref([]), K = ref(!1), G = ref(!0), H = ref([]), W = useAttrs(), [X] = useRuleFormItem(e, "value", "change", H), Z = computed(() => {
      const { labelField: ae, valueField: ne, numberToString: re } = e;
      return unref(U).reduce((se, ce) => {
        if (ce) {
          const de = ce[ne];
          se.push({
            ...omit(ce, [ae, ne]),
            label: ce[ae],
            value: re ? `${de}` : de
          });
        }
        return se;
      }, []);
    });
    watchEffect(() => {
      e.immediate && !e.alwaysLoad && ee();
    }), watch(
      () => e.params,
      () => {
        !unref(G) && ee();
      },
      { deep: !0 }
    );
    async function ee() {
      const ae = e.api;
      if (!(!ae || !isFunction(ae))) {
        U.value = [];
        try {
          K.value = !0;
          const ne = await ae(e.params);
          if (Array.isArray(ne)) {
            U.value = ne, oe();
            return;
          }
          e.resultField && (U.value = get(ne, e.resultField) || []), oe();
        } catch (ne) {
          console.warn(ne);
        } finally {
          K.value = !1;
        }
      }
    }
    async function te(ae) {
      ae && (e.alwaysLoad ? await ee() : !e.immediate && unref(G) && (await ee(), G.value = !1));
    }
    function oe() {
      k("options-change", unref(Z));
    }
    function Q(ae, ...ne) {
      H.value = ne;
    }
    return { state: X, attrs: W, getOptions: Z, loading: K, handleFetch: te, handleChange: Q };
  }
}), _hoisted_1$2 = /* @__PURE__ */ createTextVNode(" \u6CA1\u6709\u53D1\u73B0\u6570\u636E ");
function _sfc_render$3(e, k, U, K, G, H) {
  const W = resolveComponent("el-option"), X = resolveComponent("Loading"), Z = resolveComponent("el-select");
  return openBlock(), createBlock(Z, mergeProps({ onVisibleChange: e.handleFetch }, e.$attrs, {
    onChange: e.handleChange,
    value: e.state,
    "onUpdate:value": k[0] || (k[0] = (ee) => e.state = ee)
  }), createSlots({
    default: withCtx(() => [
      (openBlock(!0), createElementBlock(Fragment, null, renderList(e.getOptions, (ee) => (openBlock(), createBlock(W, {
        key: ee.value,
        label: ee.label,
        value: ee.value
      }, null, 8, ["label", "value"]))), 128))
    ]),
    _: 2
  }, [
    e.loading ? {
      name: "suffixIcon",
      fn: withCtx(() => [
        createVNode(X)
      ])
    } : void 0,
    e.loading ? {
      name: "notFoundContent",
      fn: withCtx(() => [
        createElementVNode("span", null, [
          createVNode(X),
          _hoisted_1$2
        ])
      ])
    } : void 0
  ]), 1040, ["onVisibleChange", "onChange", "value"]);
}
const ApiSelect = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$3]]), componentMap = /* @__PURE__ */ new Map();
componentMap.set("Autocomplete", ElAutocomplete);
componentMap.set("Button", ElButton);
componentMap.set("Checkbox", ElCheckbox);
componentMap.set("CheckboxGroup", ElCheckboxGroup);
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
function getDynamicProps(e) {
  const k = {};
  return Object.keys(e).map((U) => {
    k[U] = unref(e[U]);
  }), k;
}
function deepMerge(e = {}, k = {}) {
  let U;
  for (U in k)
    e[U] = isObject$1(e[U]) ? deepMerge(e[U], k[U]) : e[U] = k[U];
  return e;
}
const projectName = "Pandora 2.0";
function error(e) {
  throw new Error(`[${projectName} error]:${e}`);
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
  ) && k && isNumber(k) ? `${k}` : k;
}
const dateItemType = genType(), defaultValueComponents = [
  "Input",
  "InputPassword",
  "InputSearch",
  "InputTextArea"
];
function getSlot(e, k = "default", U) {
  if (!e || !Reflect.has(e, k))
    return null;
  if (!isFunction(e[k]))
    return console.error(`${k} is not a function!`), null;
  const K = e[k];
  return K ? K(U) : null;
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
}, _sfc_main$5 = defineComponent({
  name: "BasicHelp",
  components: {
    ElTooltip
  },
  props,
  setup(e, {
    slots: k
  }) {
    const U = "pandora-basic-help", K = () => `<div style="color: ${e.color};fontSize: ${e.fontSize};">${e.content}</div>`;
    return () => createVNode(ElTooltip, {
      content: K(),
      rawContent: !0,
      placement: e.placement
    }, {
      default: () => [createVNode("span", {
        class: U
      }, [getSlot(k) || createVNode(Warning, null, null)])]
    });
  }
}), BasicHelp_vue_vue_type_style_index_0_lang = "";
function _isSlot(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !isVNode(e);
}
const _sfc_main$4 = defineComponent({
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
      schema: U
    } = toRefs(e), K = computed(() => {
      var se;
      const {
        schema: oe,
        tableAction: Q,
        formModel: ae,
        formActionType: ne
      } = e, {
        componentProps: re = {}
      } = oe;
      return isFunction(re) ? (se = re({
        schema: oe,
        tableAction: Q,
        formModel: ae,
        formActionType: ne
      })) != null ? se : {} : re;
    }), G = computed(() => {
      const {
        allDefaultValues: oe,
        formModel: Q,
        schema: ae
      } = e, {
        mergeDynamicData: ne
      } = e.formProps;
      return {
        field: ae.field,
        model: Q,
        values: {
          ...ne,
          ...oe,
          ...Q
        },
        schema: ae
      };
    }), H = computed(() => {
      const {
        disabled: oe
      } = e.formProps, {
        dynamicDisabled: Q
      } = e.schema, {
        disabled: ae = !1
      } = unref(K);
      let ne = !!oe || ae;
      return isBoolean(Q) && (ne = Q), isFunction(Q) && (ne = Q(unref(G))), ne;
    });
    function W() {
      const {
        show: oe,
        ifShow: Q
      } = e.schema, {
        showAdvancedButton: ae
      } = e.formProps, ne = ae && isBoolean(e.schema.isAdvanced) ? e.schema.isAdvanced : !0;
      let re = !0, se = !0;
      return isBoolean(oe) && (re = oe), isBoolean(Q) && (se = Q), isFunction(oe) && (re = oe(unref(G))), isFunction(Q) && (se = Q(unref(G))), re = re && ne, {
        isShow: re,
        isIfShow: se
      };
    }
    const X = (oe) => {
      var ue;
      let Q;
      const {
        schema: ae,
        tableAction: ne,
        formModel: re,
        formActionType: se
      } = e;
      let {
        componentProps: ce = {}
      } = unref(ae);
      isFunction(ce) && (ce = (ue = ce({
        schema: ae,
        tableAction: ne,
        formModel: re,
        formActionType: se
      })) != null ? ue : {});
      const de = ce.options;
      return oe === "CheckboxGroup" ? (Q = de.map(({
        label: ie,
        value: fe
      }) => {
        const pe = componentMap.get("Checkbox");
        return createVNode(pe, {
          label: fe,
          key: fe
        }, _isSlot(ie) ? ie : {
          default: () => [ie]
        });
      }), Q) : (oe === "Select" ? Q = de.map(({
        label: ie,
        value: fe
      }) => {
        const pe = componentMap.get("SelectOption");
        return createVNode(pe, {
          label: ie,
          value: fe,
          key: fe
        }, _isSlot(ie) ? ie : {
          default: () => [ie]
        });
      }) : oe === "RadioGroup" && (Q = de.map(({
        label: ie,
        value: fe
      }) => {
        const pe = componentMap.get("Radio");
        return createVNode(pe, {
          label: fe,
          key: fe
        }, _isSlot(ie) ? ie : {
          default: () => [ie]
        });
      })), Q);
    }, Z = () => {
      var Ae, _e;
      const {
        renderComponentContent: oe,
        component: Q,
        field: ae,
        changeEvent: ne = "change",
        valueField: re
      } = e.schema, se = Q && ["Switch", "Checkbox"].includes(Q), ce = `on${upperFirst(ne)}`, de = {
        [ce]: (...me) => {
          const [be] = me;
          ie[ce] && ie[ce](...me);
          const Ce = be ? be.target : null, we = Ce ? se ? Ce.checked : Ce.value : be;
          e.setFormModel(ae, we);
        }
      }, ue = componentMap.get(Q), ie = {
        getPopupContainer: (me) => me.parentNode,
        ...unref(K),
        disabled: unref(H)
      }, {
        autoSetPlaceHolder: fe
      } = e.formProps;
      !ie.disabled && fe && Q && (ie.placeholder = ((Ae = unref(K)) == null ? void 0 : Ae.placeholder) || createPlaceholderMessage(Q)), ie.placeholder = (_e = unref(K)) == null ? void 0 : _e.placeholder, ie.codeField = ae, ie.formValues = unref(G);
      const ve = {
        [re || (se ? "checked" : "value")]: e.formModel[ae]
      }, ge = {
        ...ie,
        ...de,
        ...ve
      };
      if (!oe) {
        let me;
        return createVNode(ue, mergeProps(ge, {
          modelValue: e.formModel[ae],
          "onUpdate:modelValue": (be) => e.formModel[ae] = be
        }), _isSlot(me = X(Q)) ? me : {
          default: () => [me]
        });
      }
      const Se = isFunction(oe) ? {
        ...oe(unref(G))
      } : {
        default: () => oe
      };
      return createVNode(ue, mergeProps(ge, {
        modelValue: e.formModel[ae],
        "onUpdate:modelValue": (me) => e.formModel[ae] = me
      }), _isSlot(Se) ? Se : {
        default: () => [Se]
      });
    }, ee = () => {
      const {
        label: oe,
        helpMessage: Q,
        helpComponentProps: ae,
        subLabel: ne
      } = e.schema, re = ne ? createVNode("span", null, [oe, createTextVNode(" "), createVNode("span", {
        class: "text-secondary"
      }, [ne])]) : oe, se = isFunction(Q) ? Q(unref(G)) : Q;
      return se !== void 0 || Array.isArray(se) && (se == null ? void 0 : se.length) > 0 ? createVNode("span", null, [re, createVNode(_sfc_main$5, mergeProps({
        placement: "top",
        content: se
      }, ae), null)]) : createVNode("span", null, [re]);
    }, te = () => {
      const {
        label: oe,
        slot: Q,
        rules: ae,
        render: ne,
        field: re,
        suffix: se,
        itemProps: ce,
        component: de
      } = e.schema;
      if (de === "Divider") {
        let ue;
        const ie = deepMerge({
          contentPosition: "left"
        }, {
          ...unref(K)
        });
        return createVNode(ElCol, {
          span: 24
        }, {
          default: () => [createVNode(ElDivider, ie, _isSlot(ue = ee()) ? ue : {
            default: () => [ue]
          })]
        });
      } else {
        const ue = unref(G), ie = () => Q ? getSlot(k, Q, ue) : ne ? ne(ue) : Z(), fe = !!se, pe = isFunction(se) ? se(unref(G)) : se, ve = {
          default: () => createVNode("div", {
            style: "display:flex;width:100%;"
          }, [createVNode("div", {
            style: "flex:1;"
          }, [ie()]), fe && createVNode("span", {
            class: "suffix"
          }, [pe])]),
          label: () => ee()
        };
        return createVNode(ElFormItem, mergeProps({
          prop: re,
          label: oe,
          rules: ae
        }, ce), {
          default: () => [createTextVNode(" ")],
          ...ve
        });
      }
    };
    return onMounted(() => {
      const {
        field: oe,
        defaultValue: Q = ""
      } = unref(U);
      e.setFormModel(oe, Q);
    }), () => {
      let oe;
      const {
        colProps: Q = {},
        colSlot: ae,
        renderColContent: ne,
        component: re
      } = e.schema;
      if (!componentMap.has(re))
        return console.error(`FormItem component:${re} is an unregistered component Key`), null;
      const {
        baseColProps: se = {}
      } = e.formProps, ce = {
        ...se,
        ...Q
      }, {
        isShow: de
      } = W(), ue = unref(G);
      return withDirectives(createVNode(ElCol, ce, _isSlot(oe = (() => ae ? getSlot(k, ae, ue) : ne ? ne(ue) : te())()) ? oe : {
        default: () => [oe]
      }), [[vShow, de]]);
    };
  }
}), _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "BasicArrow",
  props: {
    expand: { type: Boolean },
    up: { type: Boolean },
    down: { type: Boolean },
    inset: { type: Boolean }
  },
  setup(e) {
    const k = e, U = "pandora-basic-arrow", K = computed(() => {
      const { expand: G, up: H, down: W, inset: X } = k;
      return [
        U,
        {
          [`${U}--active`]: G,
          up: H,
          inset: X,
          down: W
        }
      ];
    });
    return (G, H) => {
      const W = resolveComponent("ArrowDown");
      return openBlock(), createElementBlock("span", {
        class: normalizeClass(unref(K))
      }, [
        createVNode(W, {
          style: normalizeStyle(G.$attrs.iconStyle)
        }, null, 8, ["style"])
      ], 2);
    };
  }
}), BasicArrow_vue_vue_type_style_index_0_scoped_b5173730_lang = "", BasicArrow = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-b5173730"]]);
function createContext(e, k = Symbol(), U = {}) {
  const { readonly: K = !0, createProvider: G = !1, native: H = !1 } = U, W = reactive(e), X = K ? readonly(W) : W;
  return !G && provide(k, H ? e : X), {
    state: W
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
const _sfc_main$2 = defineComponent({
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
    const U = computed(() => {
      const { showAdvancedButton: X, actionSpan: Z, actionColOptions: ee } = e, te = 24 - Z, oe = X ? { span: te < 6 ? 24 : te } : {};
      return {
        span: X ? 6 : 4,
        ...oe,
        ...ee
      };
    }), K = computed(() => {
      const { actionColStyle: X } = e;
      return {
        width: "100%",
        "text-align": X.textAlign ? X.textAlign : "right"
      };
    }), G = computed(() => Object.assign(
      {
        label: "\u91CD\u7F6E"
      },
      e.resetButtonOptions
    )), H = computed(() => Object.assign(
      {
        label: "\u67E5\u8BE2"
      },
      e.submitButtonOptions
    ));
    function W() {
      k("toggle-advanced");
    }
    return {
      actionColOpt: U,
      getResetBtnOptions: G,
      getSubmitBtnOptions: H,
      toggleAdvanced: W,
      getActionStyle: K,
      ...useFormContext()
    };
  }
});
function _sfc_render$2(e, k, U, K, G, H) {
  const W = resolveComponent("el-button"), X = resolveComponent("BasicArrow"), Z = resolveComponent("el-col");
  return e.showActionButtonGroup ? (openBlock(), createBlock(Z, normalizeProps(mergeProps({ key: 0 }, e.actionColOpt)), {
    default: withCtx(() => [
      createElementVNode("div", {
        style: normalizeStyle(e.getActionStyle)
      }, [
        renderSlot(e.$slots, "resetBefore"),
        e.showResetButton ? (openBlock(), createBlock(W, mergeProps({
          key: 0,
          type: "default"
        }, e.getResetBtnOptions, { onClick: e.resetAction }), {
          default: withCtx(() => [
            createTextVNode(toDisplayString(e.getResetBtnOptions.label), 1)
          ]),
          _: 1
        }, 16, ["onClick"])) : createCommentVNode("", !0),
        renderSlot(e.$slots, "submitBefore"),
        e.showSubmitButton ? (openBlock(), createBlock(W, mergeProps({
          key: 1,
          type: "primary"
        }, e.getSubmitBtnOptions, { onClick: e.submitAction }), {
          default: withCtx(() => [
            createTextVNode(toDisplayString(e.getSubmitBtnOptions.label), 1)
          ]),
          _: 1
        }, 16, ["onClick"])) : createCommentVNode("", !0),
        renderSlot(e.$slots, "advanceBefore"),
        e.showAdvancedButton && !e.hideAdvanceBtn ? (openBlock(), createBlock(W, {
          key: 2,
          type: "text",
          size: "small",
          onClick: e.toggleAdvanced
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(e.isAdvanced ? "\u6536\u8D77" : "\u5C55\u5F00") + " ", 1),
            createVNode(X, {
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
const FormAction = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]), dateUtil = dayjs;
function tryDeconstructArray(e, k, U) {
  const K = /^\[(.+)\]$/;
  if (K.test(e)) {
    const G = e.match(K);
    if (G && G[1]) {
      const H = G[1].split(",");
      return k = Array.isArray(k) ? k : [k], H.forEach((W, X) => {
        set(U, W.trim(), k[X]);
      }), !0;
    }
  }
}
function tryDeconstructObject(e, k, U) {
  const K = /^\{(.+)\}$/;
  if (K.test(e)) {
    const G = e.match(K);
    if (G && G[1]) {
      const H = G[1].split(",");
      return k = isObject$1(k) ? k : {}, H.forEach((W) => {
        set(U, W.trim(), k[W.trim()]);
      }), !0;
    }
  }
}
function useFormValues({
  defaultValueRef: e,
  getSchema: k,
  getProps: U,
  formModel: K
}) {
  function G(X) {
    var ee, te;
    if (!isObject$1(X))
      return {};
    const Z = {};
    for (const oe of Object.entries(X)) {
      let [, Q] = oe;
      const [ae] = oe;
      if (!ae || isArray(Q) && Q.length === 0 || isFunction(Q))
        continue;
      const ne = unref(U).transformDateFunc;
      isObject$1(Q) && (Q = ne == null ? void 0 : ne(Q)), isArray(Q) && ((ee = Q[0]) == null ? void 0 : ee.format) && ((te = Q[1]) == null ? void 0 : te.format) && (Q = Q.map((re) => ne == null ? void 0 : ne(re))), isString(Q) && (Q = Q.trim()), !tryDeconstructArray(ae, Q, Z) && !tryDeconstructObject(ae, Q, Z) && set(Z, ae, Q);
    }
    return H(Z);
  }
  function H(X) {
    const Z = unref(U).fieldMapToTime;
    if (!Z || !Array.isArray(Z))
      return X;
    for (const [
      ee,
      [te, oe],
      Q = "YYYY-MM-DD"
    ] of Z) {
      if (!ee || !te || !oe || !X[ee])
        continue;
      const [ae, ne] = X[ee];
      X[te] = dateUtil(ae).format(Q), X[oe] = dateUtil(ne).format(Q), Reflect.deleteProperty(X, ee);
    }
    return X;
  }
  function W() {
    const X = unref(k), Z = {};
    X.forEach((ee) => {
      const { defaultValue: te } = ee;
      isNullOrUnDef(te) || (Z[ee.field] = te, K[ee.field] = te, K[ee.field] === void 0 && (K[ee.field] = te));
    }), e.value = cloneDeep(Z);
  }
  return { handleFormValues: G, initDefault: W };
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
    e && isFunction(e) && await e(), unref(formElRef) && (Object.keys(formModel).forEach((K) => {
      const G = unref(getSchema).find((X) => X.field === K), H = (G == null ? void 0 : G.component) && defaultValueComponents.includes(G.component), W = cloneDeep(defaultValueRef.value[K]);
      formModel[K] = H ? W || "" : W;
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
    let U = isString(e) ? [e] : e;
    isString(e) && (U = [e]);
    for (const K of U)
      _removeSchemaByFiled(K, k);
    schemaRef.value = k;
  }
  function _removeSchemaByFiled(e, k) {
    if (isString(e)) {
      const U = k.findIndex((K) => K.field === e);
      U !== -1 && (delete formModel[e], k.splice(U, 1));
    }
  }
  async function appendSchemaByField(e, k, U = !1) {
    const K = cloneDeep(unref(getSchema)), G = K.findIndex((H) => H.field === k);
    if (!k || G === -1 || U) {
      U ? K.unshift(e) : K.push(e), schemaRef.value = K, _setDefaultValue(e);
      return;
    }
    G !== -1 && K.splice(G + 1, 0, e), _setDefaultValue(e), schemaRef.value = K;
  }
  async function resetSchema(e) {
    let k = [];
    if (isObject$1(e) && k.push(e), isArray(e) && (k = [...e]), !k.every(
      (K) => K.component === "Divider" || Reflect.has(K, "field") && K.field
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
    if (isObject$1(e) && k.push(e), isArray(e) && (k = [...e]), !k.every(
      (G) => G.component === "Divider" || Reflect.has(G, "field") && G.field
    )) {
      error(
        "All children of the form Schema array that need to be updated must contain the `field` field"
      );
      return;
    }
    const K = [];
    k.forEach((G) => {
      unref(getSchema).forEach((H) => {
        if (H.field === G.field) {
          const W = deepMerge(H, G);
          K.push(W);
        } else
          K.push(H);
      });
    }), _setDefaultValue(K), schemaRef.value = uniqBy(K, "field");
  }
  function _setDefaultValue(e) {
    let k = [];
    isObject$1(e) && k.push(e), isArray(e) && (k = [...e]);
    const U = {}, K = getFieldsValue();
    k.forEach((G) => {
      G.component != "Divider" && Reflect.has(G, "field") && G.field && !isNullOrUnDef(G.defaultValue) && !(G.field in K) && (U[G.field] = G.defaultValue);
    }), setFieldsValue(U);
  }
  function getFieldsValue() {
    return unref(formElRef) ? handleFormValues(toRaw(unref(formModel))) : {};
  }
  function itemIsDateType(e) {
    return unref(getSchema).some((k) => k.field === e ? dateItemType.includes(k.component) : !1);
  }
  async function validateFields(e, k) {
    var U;
    return (U = unref(formElRef)) == null ? void 0 : U.validateFields(e, k);
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
    var U;
    await ((U = unref(formElRef)) == null ? void 0 : U.scrollToField(e, k));
  }
  async function handleSubmit(e) {
    e && e.preventDefault();
    const { submitFunc: k } = unref(getProps);
    if (k && isFunction(k)) {
      await k();
      return;
    }
    !unref(formElRef) || await validate(function(K, G) {
      if (K) {
        console.log("submit!");
        const H = handleFormValues(toRaw(unref(formModel)));
        emit("submit", H);
      } else
        console.error("error submit!", G);
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
  formElRef: U,
  isInitedDefault: K
}) {
  watchEffect(async () => {
    if (unref(K) || !unref(k).autoFocusFirstItem)
      return;
    await nextTick();
    const G = unref(e), H = unref(U), W = H == null ? void 0 : H.$el;
    if (!H || !W || !G || G.length === 0 || !G[0].component.includes("Input"))
      return;
    const Z = W.querySelector(
      ".ant-row:first-child input"
    );
    !Z || Z == null || Z.focus();
  });
}
var _a;
const isClient = typeof window < "u";
isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function resolveUnref(e) {
  return typeof e == "function" ? e() : unref(e);
}
function createFilterWrapper(e, k) {
  function U(...K) {
    e(() => k.apply(this, K), { fn: k, thisArg: this, args: K });
  }
  return U;
}
function debounceFilter(e, k = {}) {
  let U, K;
  return (H) => {
    const W = resolveUnref(e), X = resolveUnref(k.maxWait);
    if (U && clearTimeout(U), W <= 0 || X !== void 0 && X <= 0)
      return K && (clearTimeout(K), K = null), H();
    X && !K && (K = setTimeout(() => {
      U && clearTimeout(U), K = null, H();
    }, X)), U = setTimeout(() => {
      K && clearTimeout(K), K = null, H();
    }, W);
  };
}
function useDebounceFn(e, k = 200, U = {}) {
  return createFilterWrapper(debounceFilter(k, U), e);
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
      var k, U;
      return (U = (k = e == null ? void 0 : e.format) == null ? void 0 : k.call(e, "YYYY-MM-DD HH:mm:ss")) != null ? U : e;
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
  getProps: U,
  getSchema: K,
  formModel: G,
  defaultValueRef: H
}) {
  const W = getCurrentInstance(), { realWidthRef: X, screenEnum: Z, screenRef: ee } = useBreakpoint(), te = computed(() => {
    if (!e.isAdvanced)
      return 0;
    const re = unref(U).emptySpan || 0;
    if (isNumber(re))
      return re;
    if (isObject$1(re)) {
      const { span: se = 0 } = re, ce = unref(ee);
      return re[ce.toLowerCase()] || se || 0;
    }
    return 0;
  }), oe = useDebounceFn(ae, 30);
  watch(
    [
      () => unref(K),
      () => e.isAdvanced,
      () => unref(X)
    ],
    () => {
      const { showAdvancedButton: re } = unref(U);
      re && oe();
    },
    { immediate: !0 }
  );
  function Q(re, se = 0, ce = !1) {
    const de = unref(X), ue = parseInt(re.md) || parseInt(re.xs) || parseInt(re.sm) || re.span || BASIC_COL_LEN, ie = parseInt(re.lg) || ue, fe = parseInt(re.xl) || ie, pe = parseInt(re.xxl) || fe;
    return de <= Z.MD ? se += ue : de < Z.LG ? se += ie : de < Z.XL ? se += fe : se += pe, ce ? (e.hideAdvanceBtn = !1, se <= BASIC_COL_LEN * 2 ? (e.hideAdvanceBtn = !0, e.isAdvanced = !0) : se > BASIC_COL_LEN * 2 && se <= BASIC_COL_LEN * (unref(U).autoAdvancedLine || 3) ? e.hideAdvanceBtn = !1 : e.isLoad || (e.isLoad = !0, e.isAdvanced = !e.isAdvanced), { isAdvanced: e.isAdvanced, itemColSum: se }) : se > BASIC_COL_LEN * (unref(U).alwaysShowLines || 1) ? { isAdvanced: e.isAdvanced, itemColSum: se } : { isAdvanced: !0, itemColSum: se };
  }
  function ae() {
    var de;
    let re = 0, se = 0;
    const { baseColProps: ce = {} } = unref(U);
    for (const ue of unref(K)) {
      const { show: ie, colProps: fe } = ue;
      let pe = !0;
      if (isBoolean(ie) && (pe = ie), isFunction(ie) && (pe = ie({
        schema: ue,
        model: G,
        field: ue.field,
        values: {
          ...unref(H),
          ...G
        }
      })), pe && (fe || ce)) {
        const { itemColSum: ve, isAdvanced: ge } = Q(
          { ...ce, ...fe },
          re
        );
        re = ve || 0, ge && (se = re), ue.isAdvanced = ge;
      }
    }
    (de = W == null ? void 0 : W.proxy) == null || de.$forceUpdate(), e.actionSpan = se % BASIC_COL_LEN + unref(te), Q(
      unref(U).actionColOptions || { span: BASIC_COL_LEN },
      re,
      !0
    ), k("advanced-change");
  }
  function ne() {
    e.isAdvanced = !e.isAdvanced;
  }
  return { handleToggleAdvanced: ne };
}
const [name] = createNamespace("Form"), _sfc_main$1 = defineComponent({
  name,
  inheritAttrs: !1,
  props: FormBasicProps,
  components: {
    ElForm,
    ElRow,
    FormItem: _sfc_main$4,
    FormAction
  },
  emits: ["advanced-change", "reset", "submit", "register", "field-value-change"],
  setup(e, { emit: k, attrs: U }) {
    const K = reactive({}), G = ref({}), H = ref({}), W = ref(null), X = ref(null), Z = ref(!1), ee = reactive({
      isAdvanced: !0,
      hideAdvanceBtn: !1,
      isLoad: !1,
      actionSpan: 6
    }), te = computed(
      () => ({
        ...e,
        ...unref(G)
      })
    ), oe = computed(() => {
      const { baseRowStyle: le = {}, rowProps: he } = unref(te);
      return {
        style: le,
        ...he
      };
    }), Q = computed(() => {
      const { rules: le = {} } = unref(te);
      return le;
    }), ae = computed(
      () => ({ ...U, ...e, ...unref(te) })
    ), ne = computed(() => {
      const le = unref(W) || e.schemas;
      for (const he of le) {
        const { defaultValue: ye, component: Pe } = he;
        if (ye && dateItemType.includes(Pe))
          if (!Array.isArray(ye))
            he.defaultValue = dateUtil(ye);
          else {
            const Ee = [];
            ye.forEach((Ne) => {
              Ee.push(dateUtil(Ne));
            }), he.defaultValue = Ee;
          }
      }
      return unref(te).showAdvancedButton ? cloneDeep(
        le.filter((he) => he.component !== "Divider")
      ) : cloneDeep(le);
    }), { initDefault: re, handleFormValues: se } = useFormValues({
      getProps: te,
      defaultValueRef: H,
      getSchema: ne,
      formModel: K
    }), {
      handleSubmit: ce,
      setFieldsValue: de,
      clearValidate: ue,
      validate: ie,
      validateFields: fe,
      getFieldsValue: pe,
      updateSchema: ve,
      resetSchema: ge,
      appendSchemaByField: Se,
      removeSchemaByFiled: Ae,
      resetFields: _e,
      scrollToField: me
    } = useFormEvents({
      emit: k,
      getProps: te,
      formModel: K,
      getSchema: ne,
      defaultValueRef: H,
      formElRef: X,
      schemaRef: W,
      handleFormValues: se
    });
    createFormContext({
      resetAction: _e,
      submitAction: ce
    }), watch(
      () => unref(te).model,
      () => {
        const { model: le } = unref(te);
        !le || de(le);
      },
      {
        immediate: !0
      }
    ), watch(
      () => unref(te).schemas,
      (le) => {
        ge(le != null ? le : []);
      }
    ), watch(
      () => ne.value,
      (le) => {
        unref(Z) || le != null && le.length && (re(), Z.value = !0);
      }
    ), watch(
      () => K,
      useDebounceFn(() => {
        unref(te).submitOnChange && ce();
      }, 300),
      { deep: !0 }
    );
    async function be(le) {
      G.value = deepMerge(unref(G) || {}, le);
    }
    function Ce(le, he) {
      K[le] = he;
      const { validateTrigger: ye } = unref(ae);
      (!ye || ye === "change") && fe([le]).catch(() => {
      }), k("field-value-change", le, he);
    }
    function we(le) {
      const { autoSubmitOnEnter: he } = unref(te);
      if (!!he && le.key === "Enter" && le.target && le.target instanceof HTMLElement) {
        const ye = le.target;
        ye && ye.tagName && ye.tagName.toUpperCase() == "INPUT" && ce();
      }
    }
    const Fe = {
      getFieldsValue: pe,
      setFieldsValue: de,
      resetFields: _e,
      updateSchema: ve,
      resetSchema: ge,
      setProps: be,
      removeSchemaByFiled: Ae,
      appendSchemaByField: Se,
      clearValidate: ue,
      validateFields: fe,
      validate: ie,
      submit: ce,
      scrollToField: me
    };
    useAutoFocus({
      getSchema: ne,
      getProps: te,
      isInitedDefault: Z,
      formElRef: X
    }), onMounted(() => {
      re(), k("register", Fe);
    });
    const { handleToggleAdvanced: Te } = useAdvanced({
      advanceState: ee,
      emit: k,
      getProps: te,
      getSchema: ne,
      formModel: K,
      defaultValueRef: H
    });
    return {
      getBindValue: ae,
      handleToggleAdvanced: Te,
      handleEnterPress: we,
      formModel: K,
      defaultValueRef: H,
      advanceState: ee,
      getRow: oe,
      getProps: te,
      getRules: Q,
      formRef: X,
      getSchema: ne,
      formActionType: Fe,
      setFormModel: Ce,
      getFormActionBindProps: computed(
        () => ({ ...te.value, ...ee })
      ),
      ...Fe
    };
  }
}), index_vue_vue_type_style_index_0_lang$1 = "", _hoisted_1$1 = { class: "vpandora-form" };
function _sfc_render$1(e, k, U, K, G, H) {
  const W = resolveComponent("FormItem"), X = resolveComponent("FormAction"), Z = resolveComponent("el-row"), ee = resolveComponent("el-Form");
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    createVNode(ee, mergeProps(e.getBindValue, {
      rules: e.getRules,
      ref: "formRef",
      model: e.formModel,
      onKeypress: withKeys(e.handleEnterPress, ["enter"])
    }), {
      default: withCtx(() => [
        createVNode(Z, normalizeProps(guardReactiveProps(e.getRow)), {
          default: withCtx(() => [
            renderSlot(e.$slots, "formHeader"),
            (openBlock(!0), createElementBlock(Fragment, null, renderList(e.getSchema, (te) => (openBlock(), createBlock(W, {
              key: te.field,
              tableAction: e.tableAction,
              formActionType: e.formActionType,
              schema: te,
              formProps: e.getProps,
              allDefaultValues: e.defaultValueRef,
              formModel: e.formModel,
              setFormModel: e.setFormModel
            }, createSlots({ _: 2 }, [
              renderList(Object.keys(e.$slots), (oe) => ({
                name: oe,
                fn: withCtx((Q) => [
                  renderSlot(e.$slots, oe, normalizeProps(guardReactiveProps(Q || {})))
                ])
              }))
            ]), 1032, ["tableAction", "formActionType", "schema", "formProps", "allDefaultValues", "formModel", "setFormModel"]))), 128)),
            createVNode(X, mergeProps(e.getFormActionBindProps, { onToggleAdvanced: e.handleToggleAdvanced }), createSlots({ _: 2 }, [
              renderList(["resetBefore", "submitBefore", "advanceBefore", "advanceAfter"], (te) => ({
                name: te,
                fn: withCtx((oe) => [
                  renderSlot(e.$slots, te, normalizeProps(guardReactiveProps(oe || {})))
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
const Form = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
function isProdMode() {
  return !0;
}
function useForm(e) {
  const k = ref(null), U = ref(!1);
  async function K() {
    const W = unref(k);
    return W || error(
      "The form instance has not been obtained, please make sure that the form has been rendered when performing the form operation!"
    ), await nextTick(), W;
  }
  return [(W) => {
    onUnmounted(() => {
      k.value = null, U.value = null;
    }), !(unref(U) && isProdMode() && W === unref(k)) && (k.value = W, U.value = !0, watch(
      () => e,
      () => {
        e && W.setProps(getDynamicProps(e));
      },
      {
        immediate: !0,
        deep: !0
      }
    ));
  }, {
    setProps: async (W) => {
      (await K()).setProps(W);
    },
    updateSchema: async (W) => {
      (await K()).updateSchema(W);
    },
    resetSchema: async (W) => {
      (await K()).resetSchema(W);
    },
    clearValidate: async (W) => {
      (await K()).clearValidate(W);
    },
    resetFields: async () => {
      K().then(async (W) => {
        await W.resetFields();
      });
    },
    removeSchemaByFiled: async (W) => {
      var X;
      (X = unref(k)) == null || X.removeSchemaByFiled(W);
    },
    getFieldsValue: () => {
      var W;
      return (W = unref(k)) == null ? void 0 : W.getFieldsValue();
    },
    setFieldsValue: async (W) => {
      (await K()).setFieldsValue(W);
    },
    appendSchemaByField: async (W, X, Z) => {
      const ee = await K();
      ee == null || ee.appendSchemaByField(W, X, Z);
    },
    submit: async () => (await K()).submit()
  }];
}
function useComponentRegister(e, k) {
  add(e, k), tryOnUnmounted(() => {
    del(e);
  });
}
const PdForm = withInstall(Form, {
  FormItem: _sfc_main$4
}), PdFormItem = withNoopInstall(_sfc_main$4), Components = [PdTable, PdForm], _sfc_main = {
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
}, index_vue_vue_type_style_index_0_lang = "", index_vue_vue_type_style_index_1_scope_true_lang = "", _hoisted_1 = { class: "title" }, _hoisted_2 = /* @__PURE__ */ createElementVNode("span", { class: "border" }, null, -1);
function _sfc_render(e, k, U, K, G, H) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(G.isPC ? "PandoraContainer" : "PandoraContainer-m")
  }, [
    createElementVNode("div", _hoisted_1, [
      createElementVNode("span", null, [
        createTextVNode(toDisplayString(U.title), 1),
        _hoisted_2
      ]),
      renderSlot(e.$slots, "rightBox")
    ]),
    createElementVNode("div", {
      class: normalizeClass(U.md ? "context_d" : "context")
    }, [
      renderSlot(e.$slots, "default")
    ], 2)
  ], 2);
}
const PandoraContainer = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]), PdContainer = withInstall(PandoraContainer), Plugins = [PdContainer], installer = makeInstaller([...Components, ...Plugins]), install = installer.install, version = installer.version;
export {
  PdContainer,
  PdForm,
  PdFormItem,
  PdTable,
  installer as default,
  install,
  makeInstaller,
  useComponentRegister,
  useForm,
  version
};
