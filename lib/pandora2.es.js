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
    for (const K of [e, ...Object.values(k ?? {})])
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
    label: H,
    name: G,
    sortable: W,
    render: X,
    ...Q
  } = e, ee = {
    prop: U || K,
    label: H || G,
    ...Q
  };
  let Z;
  return W && (Z = {
    header: (te) => {
      const ne = te.column;
      return createVNode("div", {
        relId: ne.property
      }, [ne.label, createVNode("span", {
        class: "caret-wrapper"
      }, [createVNode("i", {
        class: "sort-caret ascending",
        "on-click": (oe) => k.sortIconClick(oe, ne, "ascending")
      }, null), createVNode("i", {
        class: "sort-caret descending",
        "on-click": (oe) => k.sortIconClick(oe, ne, "descending")
      }, null)])]);
    }
  }), X && isFunction(X) && (Z = {
    default: (te) => X(toRaw(te.row), te.column, te.$index)
  }), {
    columnProps: ee,
    slots: Z
  };
}
function getColumnVNode(e, k, U = null) {
  const {
    columnProps: K,
    slots: H
  } = renderColumnProp(e, k);
  if (U)
    return createVNode(ElTableColumn, K, _isSlot$2(U) ? U : {
      default: () => [U]
    });
  const G = H && (H.default || H.header) ? H : "";
  return createVNode(ElTableColumn, {
    ...K
  }, G);
}
function useColumnRender(e, k) {
  return e.map((K) => {
    let H;
    return K?.columns && K?.columns.length ? (H = K?.columns.map((G) => getColumnVNode(G, k)), getColumnVNode(K, k, H)) : getColumnVNode(K, k);
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
      handleSizeChange: (H) => {
        k("handleSizeChange", H);
      },
      handleCurrentChange: (H) => {
        k("handleCurrentChange", H);
      }
    };
  }
}), index_vue_vue_type_style_index_0_lang$3 = "", _export_sfc = (e, k) => {
  const U = e.__vccOpts || e;
  for (const [K, H] of k)
    U[K] = H;
  return U;
}, _hoisted_1$3 = { class: "vpandora-pagination" };
function _sfc_render$4(e, k, U, K, H, G) {
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
  const G = {
    ref: ref(null),
    option: e,
    onHandleSizeChange: k,
    onHandleCurrentChange: U
  };
  return K = createVNode(Pagination, G, null), K;
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
  activeSort = {};
  defaultSortObj = {};
  _oldActiveSort = {};
  option = {
    sortMode: SINGLE
  };
  constructor(k) {
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
    return (this.option.tableInstance?.value).$el.querySelectorAll(`div[relid=${k}]`);
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
    for (let H = 0; H < k.length; H++)
      new RegExp(K).test(k[H]) && (U = trim(k[H]));
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
    const H = this.getTargetNode(k);
    this._isSingleModel(this.option.sortMode) && this._clearSortOrderService(), this.changeSortOrderClass(H, K), this.sortOrderService(U.property, K), this.sortChange(), k.stopPropagation(), k.preventDefault();
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
    const H = this.getTargetNode(U), G = this.getCurrentSortKey(H.classList);
    let W = "";
    this._isSingleModel(this.option.sortMode) && this._clearSortOrderService(), G !== "" ? W = this.getTargetSortKey(G) : W = this._getDefaultOrder(K), this.changeSortOrderClass(H, W), this.sortOrderService(K, W), this.sortChange();
  }
}
function useSortService(e, k, U) {
  const K = () => {
    const G = Object.create([]);
    return k.map((W) => {
      W.sortable && W.sortable !== void 0 && (G[W.value] = "");
    }), G;
  };
  return e.userColumnOrder = K(), e.tableInstance = U, new SortService(e);
}
const useTableProps = (e) => {
  const k = ref(), U = ref(e.data), K = e.tableConfig, H = ref(e.columns), { sortConfig: G, columns: W } = e, X = useSortService(
    G,
    W,
    k
  ), Q = (ee, Z) => {
    X.executeHeaderClick(ee, Z);
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
    columnsProps: H,
    $sortService: X,
    handleHeaderClick: Q
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
      currentData: H,
      columnsProps: G,
      $sortService: W,
      handleHeaderClick: X
    } = useTableProps(e), {
      pagination: Q,
      pageOpt: ee,
      ...Z
    } = K, te = computed(() => {
      let oe = {};
      const re = Object.keys(Z);
      for (let ae in re)
        oe[ae] = unref(re[ae]);
      return oe;
    });
    onMounted(() => {
      W.init();
    });
    const ne = (oe) => {
      k("handleSizePageChange", oe);
    }, se = (oe) => {
      k("handleCurrentPageChange", oe);
    };
    return () => {
      const oe = Object.assign({
        ref: U,
        onHeaderClick: X,
        data: H.value
      }, te.value), re = useColumnRender(G.value, W);
      let ae = null;
      return unref(Q) && (ae = usePagerRender(ee, ne, se)), createVNode("div", {
        class: "vpandora-table"
      }, [createVNode(ElTable, oe, _isSlot$1(re) ? re : {
        default: () => [re]
      }), ae]);
    };
  }
}), index_vue_vue_type_style_index_0_lang$2 = "", PdTable = withInstall(_sfc_main$7);
function useRuleFormItem(e, k = "value", U = "change", K) {
  const G = getCurrentInstance()?.emit, W = reactive({
    value: e[k]
  }), X = readonly(W), Q = (Z) => {
    W.value = Z;
  };
  return watchEffect(() => {
    W.value = e[k];
  }), [computed({
    get() {
      return W.value;
    },
    set(Z) {
      isEqual(Z, X.value) || (W.value = Z, nextTick(() => {
        G?.(U, Z, ...toRaw(unref(K)) || []);
      }));
    }
  }), Q, X];
}
const DEFAULT_EXCLUDE_KEYS = ["class", "style"], LISTENER_PREFIX = /^on[A-Z]/;
function entries(e) {
  return Object.keys(e).map((k) => [k, e[k]]);
}
function useAttrs(e = {}) {
  const k = getCurrentInstance();
  if (!k)
    return {};
  const { excludeListeners: U = !1, excludeKeys: K = [], excludeDefaultKeys: H = !0 } = e, G = shallowRef({}), W = K.concat(H ? DEFAULT_EXCLUDE_KEYS : []);
  return k.attrs = reactive(k.attrs), watchEffect(() => {
    const X = entries(k.attrs).reduce((Q, [ee, Z]) => (!W.includes(ee) && !(U && LISTENER_PREFIX.test(ee)) && (Q[ee] = Z), Q), {});
    G.value = X;
  }), G;
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
  var U, K, H = {}, G = Object.keys(e);
  for (K = 0; K < G.length; K++)
    k.indexOf(U = G[K]) >= 0 || (H[U] = e[U]);
  return H;
}
const n = { silent: !1, logLevel: "warn" }, i = ["validator"], o = Object.prototype, a = o.toString, s = o.hasOwnProperty, u = /^\s*function (\w+)/;
function l(e) {
  var k;
  const U = (k = e?.type) !== null && k !== void 0 ? k : e;
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
  let K, H = !0, G = "";
  K = c(e) ? e : { type: e };
  const W = b(K) ? K._vueTypes_name + " - " : "";
  if (g(K) && K.type !== null) {
    if (K.type === void 0 || K.type === !0 || !K.required && k === void 0)
      return H;
    v(K.type) ? (H = K.type.some((X) => m(X, k, !0) === !0), G = K.type.map((X) => l(X)).join(" or ")) : (G = l(K), H = G === "Array" ? v(k) : G === "Object" ? c(k) : G === "String" || G === "Number" || G === "Boolean" || G === "Function" ? function(X) {
      if (X == null)
        return "";
      const Q = X.constructor.toString().match(u);
      return Q ? Q[1] : "";
    }(k) === G : k instanceof K.type);
  }
  if (!H) {
    const X = `${W}value "${k}" should be of type "${G}"`;
    return U === !1 ? (d(X), !1) : X;
  }
  if (p(K, "validator") && h(K.validator)) {
    const X = d, Q = [];
    if (d = (ee) => {
      Q.push(ee);
    }, H = K.validator(k), d = X, !H) {
      const ee = (Q.length > 1 ? "* " : "") + Q.join(`
* `);
      return Q.length = 0, U === !1 ? (d(ee), H) : ee;
    }
  }
  return H;
}
function j(e, k) {
  const U = Object.defineProperties(k, { _vueTypes_name: { value: e, writable: !0 }, isRequired: { get() {
    return this.required = !0, this;
  } }, def: { value(H) {
    return H === void 0 ? (p(this, "default") && delete this.default, this) : h(H) || m(this, H, !0) === !0 ? (this.default = v(H) ? () => [...H] : c(H) ? () => Object.assign({}, H) : H, this) : (d(`${this._vueTypes_name} - invalid default value: "${H}"`), this);
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
  const K = function(Q) {
    const ee = {};
    return Object.getOwnPropertyNames(Q).forEach((Z) => {
      ee[Z] = Object.getOwnPropertyDescriptor(Q, Z);
    }), Object.defineProperties({}, ee);
  }(k);
  if (K._vueTypes_name = e, !c(U))
    return K;
  const { validator: H } = U, G = r(U, i);
  if (h(H)) {
    let { validator: Q } = K;
    Q && (Q = (X = (W = Q).__original) !== null && X !== void 0 ? X : W), K.validator = O(Q ? function(ee) {
      return Q.call(this, ee) && H.call(this, ee);
    } : H, K);
  }
  var W, X;
  return Object.assign(K, G);
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
  const k = `oneOf - value should be one of "${e.join('", "')}".`, U = e.reduce((K, H) => {
    if (H != null) {
      const G = H.constructor;
      K.indexOf(G) === -1 && K.push(G);
    }
    return K;
  }, []);
  return j("oneOf", { type: U.length > 0 ? U : void 0, validator(K) {
    const H = e.indexOf(K) !== -1;
    return H || d(k), H;
  } });
}
function F(e) {
  if (!v(e))
    throw new TypeError("[VueTypes error]: You must provide an array as argument");
  let k = !1, U = [];
  for (let H = 0; H < e.length; H += 1) {
    const G = e[H];
    if (g(G)) {
      if (b(G) && G._vueTypes_name === "oneOf" && G.type) {
        U = U.concat(G.type);
        continue;
      }
      if (h(G.validator) && (k = !0), G.type === !0 || !G.type) {
        d('oneOfType - invalid usage of "true" or "null" as types.');
        continue;
      }
      U = U.concat(G.type);
    } else
      U.push(G);
  }
  U = U.filter((H, G) => U.indexOf(H) === G);
  const K = U.length > 0 ? U : null;
  return j("oneOfType", k ? { type: K, validator(H) {
    const G = [], W = e.some((X) => {
      const Q = m(b(X) && X._vueTypes_name === "oneOf" ? X.type || null : X, H, !0);
      return typeof Q == "string" && G.push(Q), Q === !0;
    });
    return W || d(`oneOfType - provided value does not match any of the ${G.length} passed-in validators:
${$(G.join(`
`))}`), W;
  } } : { type: K });
}
function Y(e) {
  return j("arrayOf", { type: Array, validator(k) {
    let U = "";
    const K = k.every((H) => (U = m(e, H, !0), U === !0));
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
    const K = Object.keys(k).every((H) => (U = m(e, k[H], !0), U === !0));
    return K || d(`objectOf - value validation error:
${$(U)}`), K;
  } });
}
function J(e) {
  const k = Object.keys(e), U = k.filter((H) => {
    var G;
    return !((G = e[H]) === null || G === void 0 || !G.required);
  }), K = j("shape", { type: Object, validator(H) {
    if (!c(H))
      return !1;
    const G = Object.keys(H);
    if (U.length > 0 && U.some((W) => G.indexOf(W) === -1)) {
      const W = U.filter((X) => G.indexOf(X) === -1);
      return d(W.length === 1 ? `shape - required property "${W[0]}" is not defined.` : `shape - required properties "${W.join('", "')}" are not defined.`), !1;
    }
    return G.every((W) => {
      if (k.indexOf(W) === -1)
        return this._vueTypes_isLoose === !0 || (d(`shape - shape definition does not include a "${W}" property. Allowed keys: "${k.join('", "')}".`), !1);
      const X = m(e[W], H[W], !0);
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
        return k.forEach((Q) => this.extend(Q)), this;
      const { name: U, validate: K = !1, getter: H = !1 } = k, G = r(k, M);
      if (p(this, U))
        throw new TypeError(`[VueTypes error]: Type "${U}" already defined`);
      const { type: W } = G;
      if (b(W))
        return delete G.type, Object.defineProperty(this, U, H ? { get: () => T(U, W, G) } : { value(...Q) {
          const ee = T(U, W, G);
          return ee.validator && (ee.validator = ee.validator.bind(ee, ...Q)), ee;
        } });
      let X;
      return X = H ? { get() {
        const Q = Object.assign({}, G);
        return K ? _(U, Q) : j(U, Q);
      }, enumerable: !0 } : { value(...Q) {
        const ee = Object.assign({}, G);
        let Z;
        return Z = K ? _(U, ee) : j(U, ee), ee.validator && (Z.validator = ee.validator.bind(Z, ...Q)), Z;
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
    const U = ref([]), K = ref(!1), H = ref(!0), G = ref([]), W = useAttrs(), [X] = useRuleFormItem(e, "value", "change", G), Q = computed(() => {
      const { labelField: se, valueField: oe, numberToString: re } = e;
      return unref(U).reduce((ae, ce) => {
        if (ce) {
          const de = ce[oe];
          ae.push({
            ...omit(ce, [se, oe]),
            label: ce[se],
            value: re ? `${de}` : de
          });
        }
        return ae;
      }, []);
    });
    watchEffect(() => {
      e.immediate && !e.alwaysLoad && ee();
    }), watch(
      () => e.params,
      () => {
        !unref(H) && ee();
      },
      { deep: !0 }
    );
    async function ee() {
      const se = e.api;
      if (!(!se || !isFunction(se))) {
        U.value = [];
        try {
          K.value = !0;
          const oe = await se(e.params);
          if (Array.isArray(oe)) {
            U.value = oe, te();
            return;
          }
          e.resultField && (U.value = get(oe, e.resultField) || []), te();
        } catch (oe) {
          console.warn(oe);
        } finally {
          K.value = !1;
        }
      }
    }
    async function Z(se) {
      se && (e.alwaysLoad ? await ee() : !e.immediate && unref(H) && (await ee(), H.value = !1));
    }
    function te() {
      k("options-change", unref(Q));
    }
    function ne(se, ...oe) {
      G.value = oe;
    }
    return { state: X, attrs: W, getOptions: Q, loading: K, handleFetch: Z, handleChange: ne };
  }
}), _hoisted_1$2 = /* @__PURE__ */ createTextVNode(" \u6CA1\u6709\u53D1\u73B0\u6570\u636E ");
function _sfc_render$3(e, k, U, K, H, G) {
  const W = resolveComponent("el-option"), X = resolveComponent("Loading"), Q = resolveComponent("el-select");
  return openBlock(), createBlock(Q, mergeProps({ onVisibleChange: e.handleFetch }, e.$attrs, {
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
      const {
        schema: te,
        tableAction: ne,
        formModel: se,
        formActionType: oe
      } = e, {
        componentProps: re = {}
      } = te;
      return isFunction(re) ? re({
        schema: te,
        tableAction: ne,
        formModel: se,
        formActionType: oe
      }) ?? {} : re;
    }), H = computed(() => {
      const {
        allDefaultValues: te,
        formModel: ne,
        schema: se
      } = e, {
        mergeDynamicData: oe
      } = e.formProps;
      return {
        field: se.field,
        model: ne,
        values: {
          ...oe,
          ...te,
          ...ne
        },
        schema: se
      };
    }), G = computed(() => {
      const {
        disabled: te
      } = e.formProps, {
        dynamicDisabled: ne
      } = e.schema, {
        disabled: se = !1
      } = unref(K);
      let oe = !!te || se;
      return isBoolean(ne) && (oe = ne), isFunction(ne) && (oe = ne(unref(H))), oe;
    });
    function W() {
      const {
        show: te,
        ifShow: ne
      } = e.schema, {
        showAdvancedButton: se
      } = e.formProps, oe = se && isBoolean(e.schema.isAdvanced) ? e.schema.isAdvanced : !0;
      let re = !0, ae = !0;
      return isBoolean(te) && (re = te), isBoolean(ne) && (ae = ne), isFunction(te) && (re = te(unref(H))), isFunction(ne) && (ae = ne(unref(H))), re = re && oe, {
        isShow: re,
        isIfShow: ae
      };
    }
    const X = (te) => {
      let ne;
      const {
        schema: se,
        tableAction: oe,
        formModel: re,
        formActionType: ae
      } = e;
      let {
        componentProps: ce = {}
      } = unref(se);
      isFunction(ce) && (ce = ce({
        schema: se,
        tableAction: oe,
        formModel: re,
        formActionType: ae
      }) ?? {});
      const de = ce.options;
      return te === "CheckboxGroup" ? (ne = de.map(({
        label: ie,
        value: le
      }) => {
        const fe = componentMap.get("Checkbox");
        return createVNode(fe, {
          label: le,
          key: le
        }, _isSlot(ie) ? ie : {
          default: () => [ie]
        });
      }), ne) : (te === "Select" ? ne = de.map(({
        label: ie,
        value: le
      }) => {
        const fe = componentMap.get("SelectOption");
        return createVNode(fe, {
          label: ie,
          value: le,
          key: le
        }, _isSlot(ie) ? ie : {
          default: () => [ie]
        });
      }) : te === "RadioGroup" && (ne = de.map(({
        label: ie,
        value: le
      }) => {
        const fe = componentMap.get("Radio");
        return createVNode(fe, {
          label: le,
          key: le
        }, _isSlot(ie) ? ie : {
          default: () => [ie]
        });
      })), ne);
    }, Q = () => {
      const {
        renderComponentContent: te,
        component: ne,
        field: se,
        changeEvent: oe = "change",
        valueField: re
      } = e.schema, ae = ne && ["Switch", "Checkbox"].includes(ne), ce = `on${upperFirst(oe)}`, de = {
        [ce]: (...pe) => {
          const [ve] = pe;
          le[ce] && le[ce](...pe);
          const _e = ve ? ve.target : null, Ce = _e ? ae ? _e.checked : _e.value : ve;
          e.setFormModel(se, Ce);
        }
      }, ie = componentMap.get(ne), le = {
        getPopupContainer: (pe) => pe.parentNode,
        ...unref(K),
        disabled: unref(G)
      }, {
        autoSetPlaceHolder: fe
      } = e.formProps;
      !le.disabled && fe && ne && (le.placeholder = unref(K)?.placeholder || createPlaceholderMessage(ne)), le.placeholder = unref(K)?.placeholder, le.codeField = se, le.formValues = unref(H);
      const ge = {
        [re || (ae ? "checked" : "value")]: e.formModel[se]
      }, be = {
        ...le,
        ...de,
        ...ge
      };
      if (!te) {
        let pe;
        return createVNode(ie, mergeProps(be, {
          modelValue: e.formModel[se],
          "onUpdate:modelValue": (ve) => e.formModel[se] = ve
        }), _isSlot(pe = X(ne)) ? pe : {
          default: () => [pe]
        });
      }
      const Se = isFunction(te) ? {
        ...te(unref(H))
      } : {
        default: () => te
      };
      return createVNode(ie, mergeProps(be, {
        modelValue: e.formModel[se],
        "onUpdate:modelValue": (pe) => e.formModel[se] = pe
      }), _isSlot(Se) ? Se : {
        default: () => [Se]
      });
    }, ee = () => {
      const {
        label: te,
        helpMessage: ne,
        helpComponentProps: se,
        subLabel: oe
      } = e.schema, re = oe ? createVNode("span", null, [te, createTextVNode(" "), createVNode("span", {
        class: "text-secondary"
      }, [oe])]) : te, ae = isFunction(ne) ? ne(unref(H)) : ne;
      return ae !== void 0 || Array.isArray(ae) && ae?.length > 0 ? createVNode("span", null, [re, createVNode(_sfc_main$5, mergeProps({
        placement: "top",
        content: ae
      }, se), null)]) : createVNode("span", null, [re]);
    }, Z = () => {
      const {
        label: te,
        slot: ne,
        rules: se,
        render: oe,
        field: re,
        suffix: ae,
        itemProps: ce,
        component: de
      } = e.schema;
      if (de === "Divider") {
        let ie;
        const le = deepMerge({
          contentPosition: "left"
        }, {
          ...unref(K)
        });
        return createVNode(ElCol, {
          span: 24
        }, {
          default: () => [createVNode(ElDivider, le, _isSlot(ie = ee()) ? ie : {
            default: () => [ie]
          })]
        });
      } else {
        const ie = unref(H), le = () => ne ? getSlot(k, ne, ie) : oe ? oe(ie) : Q(), fe = !!ae, ye = isFunction(ae) ? ae(unref(H)) : ae, ge = {
          default: () => createVNode("div", {
            style: "display:flex;width:100%;"
          }, [createVNode("div", {
            style: "flex:1;"
          }, [le()]), fe && createVNode("span", {
            class: "suffix"
          }, [ye])]),
          label: () => ee()
        };
        return createVNode(ElFormItem, mergeProps({
          prop: re,
          label: te,
          rules: se
        }, ce), {
          default: () => [createTextVNode(" ")],
          ...ge
        });
      }
    };
    return onMounted(() => {
      const {
        field: te,
        defaultValue: ne = ""
      } = unref(U);
      e.setFormModel(te, ne);
    }), () => {
      let te;
      const {
        colProps: ne = {},
        colSlot: se,
        renderColContent: oe,
        component: re
      } = e.schema;
      if (!componentMap.has(re))
        return console.error(`FormItem component:${re} is an unregistered component Key`), null;
      const {
        baseColProps: ae = {}
      } = e.formProps, ce = {
        ...ae,
        ...ne
      }, {
        isShow: de
      } = W(), ie = unref(H);
      return withDirectives(createVNode(ElCol, ce, _isSlot(te = (() => se ? getSlot(k, se, ie) : oe ? oe(ie) : Z())()) ? te : {
        default: () => [te]
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
      const { expand: H, up: G, down: W, inset: X } = k;
      return [
        U,
        {
          [`${U}--active`]: H,
          up: G,
          inset: X,
          down: W
        }
      ];
    });
    return (H, G) => {
      const W = resolveComponent("ArrowDown");
      return openBlock(), createElementBlock("span", {
        class: normalizeClass(unref(K))
      }, [
        createVNode(W, {
          style: normalizeStyle(H.$attrs.iconStyle)
        }, null, 8, ["style"])
      ], 2);
    };
  }
}), BasicArrow_vue_vue_type_style_index_0_scoped_b5173730_lang = "", BasicArrow = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-b5173730"]]);
function createContext(e, k = Symbol(), U = {}) {
  const { readonly: K = !0, createProvider: H = !1, native: G = !1 } = U, W = reactive(e), X = K ? readonly(W) : W;
  return !H && provide(k, G ? e : X), {
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
      const { showAdvancedButton: X, actionSpan: Q, actionColOptions: ee } = e, Z = 24 - Q, te = X ? { span: Z < 6 ? 24 : Z } : {};
      return {
        span: X ? 6 : 4,
        ...te,
        ...ee
      };
    }), K = computed(() => {
      const { actionColStyle: X } = e;
      return {
        width: "100%",
        "text-align": X.textAlign ? X.textAlign : "right"
      };
    }), H = computed(() => Object.assign(
      {
        label: "\u91CD\u7F6E"
      },
      e.resetButtonOptions
    )), G = computed(() => Object.assign(
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
      getResetBtnOptions: H,
      getSubmitBtnOptions: G,
      toggleAdvanced: W,
      getActionStyle: K,
      ...useFormContext()
    };
  }
});
function _sfc_render$2(e, k, U, K, H, G) {
  const W = resolveComponent("el-button"), X = resolveComponent("BasicArrow"), Q = resolveComponent("el-col");
  return e.showActionButtonGroup ? (openBlock(), createBlock(Q, normalizeProps(mergeProps({ key: 0 }, e.actionColOpt)), {
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
    const H = e.match(K);
    if (H && H[1]) {
      const G = H[1].split(",");
      return k = Array.isArray(k) ? k : [k], G.forEach((W, X) => {
        set(U, W.trim(), k[X]);
      }), !0;
    }
  }
}
function tryDeconstructObject(e, k, U) {
  const K = /^\{(.+)\}$/;
  if (K.test(e)) {
    const H = e.match(K);
    if (H && H[1]) {
      const G = H[1].split(",");
      return k = isObject$1(k) ? k : {}, G.forEach((W) => {
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
  function H(X) {
    if (!isObject$1(X))
      return {};
    const Q = {};
    for (const ee of Object.entries(X)) {
      let [, Z] = ee;
      const [te] = ee;
      if (!te || isArray(Z) && Z.length === 0 || isFunction(Z))
        continue;
      const ne = unref(U).transformDateFunc;
      isObject$1(Z) && (Z = ne?.(Z)), isArray(Z) && Z[0]?.format && Z[1]?.format && (Z = Z.map((se) => ne?.(se))), isString(Z) && (Z = Z.trim()), !tryDeconstructArray(te, Z, Q) && !tryDeconstructObject(te, Z, Q) && set(Q, te, Z);
    }
    return G(Q);
  }
  function G(X) {
    const Q = unref(U).fieldMapToTime;
    if (!Q || !Array.isArray(Q))
      return X;
    for (const [
      ee,
      [Z, te],
      ne = "YYYY-MM-DD"
    ] of Q) {
      if (!ee || !Z || !te || !X[ee])
        continue;
      const [se, oe] = X[ee];
      X[Z] = dateUtil(se).format(ne), X[te] = dateUtil(oe).format(ne), Reflect.deleteProperty(X, ee);
    }
    return X;
  }
  function W() {
    const X = unref(k), Q = {};
    X.forEach((ee) => {
      const { defaultValue: Z } = ee;
      isNullOrUnDef(Z) || (Q[ee.field] = Z, K[ee.field] = Z, K[ee.field] === void 0 && (K[ee.field] = Z));
    }), e.value = cloneDeep(Q);
  }
  return { handleFormValues: H, initDefault: W };
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
      const H = unref(getSchema).find((X) => X.field === K), G = H?.component && defaultValueComponents.includes(H.component), W = cloneDeep(defaultValueRef.value[K]);
      formModel[K] = G ? W || "" : W;
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
      if (value = handleInputNumberValue(schema?.component, value), hasKey && fields.includes(key)) {
        if (itemIsDateType(key))
          if (Array.isArray(value)) {
            const e = [];
            for (const k of value)
              e.push(k ? dateUtil(k) : null);
            formModel[key] = e;
          } else {
            const { componentProps: e } = schema || {};
            let k = e;
            typeof e == "function" && (k = k({ formModel })), formModel[key] = value ? k?.valueFormat ? value : dateUtil(value) : null;
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
    const K = cloneDeep(unref(getSchema)), H = K.findIndex((G) => G.field === k);
    if (!k || H === -1 || U) {
      U ? K.unshift(e) : K.push(e), schemaRef.value = K, _setDefaultValue(e);
      return;
    }
    H !== -1 && K.splice(H + 1, 0, e), _setDefaultValue(e), schemaRef.value = K;
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
      (H) => H.component === "Divider" || Reflect.has(H, "field") && H.field
    )) {
      error(
        "All children of the form Schema array that need to be updated must contain the `field` field"
      );
      return;
    }
    const K = [];
    k.forEach((H) => {
      unref(getSchema).forEach((G) => {
        if (G.field === H.field) {
          const W = deepMerge(G, H);
          K.push(W);
        } else
          K.push(G);
      });
    }), _setDefaultValue(K), schemaRef.value = uniqBy(K, "field");
  }
  function _setDefaultValue(e) {
    let k = [];
    isObject$1(e) && k.push(e), isArray(e) && (k = [...e]);
    const U = {}, K = getFieldsValue();
    k.forEach((H) => {
      H.component != "Divider" && Reflect.has(H, "field") && H.field && !isNullOrUnDef(H.defaultValue) && !(H.field in K) && (U[H.field] = H.defaultValue);
    }), setFieldsValue(U);
  }
  function getFieldsValue() {
    return unref(formElRef) ? handleFormValues(toRaw(unref(formModel))) : {};
  }
  function itemIsDateType(e) {
    return unref(getSchema).some((k) => k.field === e ? dateItemType.includes(k.component) : !1);
  }
  async function validateFields(e, k) {
    return unref(formElRef)?.validateFields(e, k);
  }
  async function validate(e) {
    return await unref(formElRef)?.validate(e);
  }
  async function clearValidate(e) {
    await unref(formElRef)?.clearValidate(e);
  }
  async function scrollToField(e, k) {
    await unref(formElRef)?.scrollToField(e, k);
  }
  async function handleSubmit(e) {
    e && e.preventDefault();
    const { submitFunc: k } = unref(getProps);
    if (k && isFunction(k)) {
      await k();
      return;
    }
    !unref(formElRef) || await validate(function(K, H) {
      if (K) {
        console.log("submit!");
        const G = handleFormValues(toRaw(unref(formModel)));
        emit("submit", G);
      } else
        console.error("error submit!", H);
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
    const H = unref(e), G = unref(U), W = G?.$el;
    if (!G || !W || !H || H.length === 0 || !H[0].component.includes("Input"))
      return;
    const Q = W.querySelector(
      ".ant-row:first-child input"
    );
    !Q || Q?.focus();
  });
}
var _a;
const isClient = typeof window < "u";
isClient && ((_a = window?.navigator) == null ? void 0 : _a.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
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
  return (G) => {
    const W = resolveUnref(e), X = resolveUnref(k.maxWait);
    if (U && clearTimeout(U), W <= 0 || X !== void 0 && X <= 0)
      return K && (clearTimeout(K), K = null), G();
    X && !K && (K = setTimeout(() => {
      U && clearTimeout(U), K = null, G();
    }, X)), U = setTimeout(() => {
      K && clearTimeout(K), K = null, G();
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
    default: (e) => e?.format?.("YYYY-MM-DD HH:mm:ss") ?? e
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
  formModel: H,
  defaultValueRef: G
}) {
  const W = getCurrentInstance(), { realWidthRef: X, screenEnum: Q, screenRef: ee } = useBreakpoint(), Z = computed(() => {
    if (!e.isAdvanced)
      return 0;
    const re = unref(U).emptySpan || 0;
    if (isNumber(re))
      return re;
    if (isObject$1(re)) {
      const { span: ae = 0 } = re, ce = unref(ee);
      return re[ce.toLowerCase()] || ae || 0;
    }
    return 0;
  }), te = useDebounceFn(se, 30);
  watch(
    [
      () => unref(K),
      () => e.isAdvanced,
      () => unref(X)
    ],
    () => {
      const { showAdvancedButton: re } = unref(U);
      re && te();
    },
    { immediate: !0 }
  );
  function ne(re, ae = 0, ce = !1) {
    const de = unref(X), ie = parseInt(re.md) || parseInt(re.xs) || parseInt(re.sm) || re.span || BASIC_COL_LEN, le = parseInt(re.lg) || ie, fe = parseInt(re.xl) || le, ye = parseInt(re.xxl) || fe;
    return de <= Q.MD ? ae += ie : de < Q.LG ? ae += le : de < Q.XL ? ae += fe : ae += ye, ce ? (e.hideAdvanceBtn = !1, ae <= BASIC_COL_LEN * 2 ? (e.hideAdvanceBtn = !0, e.isAdvanced = !0) : ae > BASIC_COL_LEN * 2 && ae <= BASIC_COL_LEN * (unref(U).autoAdvancedLine || 3) ? e.hideAdvanceBtn = !1 : e.isLoad || (e.isLoad = !0, e.isAdvanced = !e.isAdvanced), { isAdvanced: e.isAdvanced, itemColSum: ae }) : ae > BASIC_COL_LEN * (unref(U).alwaysShowLines || 1) ? { isAdvanced: e.isAdvanced, itemColSum: ae } : { isAdvanced: !0, itemColSum: ae };
  }
  function se() {
    let re = 0, ae = 0;
    const { baseColProps: ce = {} } = unref(U);
    for (const de of unref(K)) {
      const { show: ie, colProps: le } = de;
      let fe = !0;
      if (isBoolean(ie) && (fe = ie), isFunction(ie) && (fe = ie({
        schema: de,
        model: H,
        field: de.field,
        values: {
          ...unref(G),
          ...H
        }
      })), fe && (le || ce)) {
        const { itemColSum: ye, isAdvanced: ge } = ne(
          { ...ce, ...le },
          re
        );
        re = ye || 0, ge && (ae = re), de.isAdvanced = ge;
      }
    }
    W?.proxy?.$forceUpdate(), e.actionSpan = ae % BASIC_COL_LEN + unref(Z), ne(
      unref(U).actionColOptions || { span: BASIC_COL_LEN },
      re,
      !0
    ), k("advanced-change");
  }
  function oe() {
    e.isAdvanced = !e.isAdvanced;
  }
  return { handleToggleAdvanced: oe };
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
    const K = reactive({}), H = ref({}), G = ref({}), W = ref(null), X = ref(null), Q = ref(!1), ee = reactive({
      isAdvanced: !0,
      hideAdvanceBtn: !1,
      isLoad: !1,
      actionSpan: 6
    }), Z = computed(
      () => ({
        ...e,
        ...unref(H)
      })
    ), te = computed(() => {
      const { baseRowStyle: ue = {}, rowProps: me } = unref(Z);
      return {
        style: ue,
        ...me
      };
    }), ne = computed(() => {
      const { rules: ue = {} } = unref(Z);
      return ue;
    }), se = computed(
      () => ({ ...U, ...e, ...unref(Z) })
    ), oe = computed(() => {
      const ue = unref(W) || e.schemas;
      for (const me of ue) {
        const { defaultValue: he, component: Te } = me;
        if (he && dateItemType.includes(Te))
          if (!Array.isArray(he))
            me.defaultValue = dateUtil(he);
          else {
            const Ae = [];
            he.forEach((Pe) => {
              Ae.push(dateUtil(Pe));
            }), me.defaultValue = Ae;
          }
      }
      return unref(Z).showAdvancedButton ? cloneDeep(
        ue.filter((me) => me.component !== "Divider")
      ) : cloneDeep(ue);
    }), { initDefault: re, handleFormValues: ae } = useFormValues({
      getProps: Z,
      defaultValueRef: G,
      getSchema: oe,
      formModel: K
    }), {
      handleSubmit: ce,
      setFieldsValue: de,
      clearValidate: ie,
      validate: le,
      validateFields: fe,
      getFieldsValue: ye,
      updateSchema: ge,
      resetSchema: be,
      appendSchemaByField: Se,
      removeSchemaByFiled: pe,
      resetFields: ve,
      scrollToField: _e
    } = useFormEvents({
      emit: k,
      getProps: Z,
      formModel: K,
      getSchema: oe,
      defaultValueRef: G,
      formElRef: X,
      schemaRef: W,
      handleFormValues: ae
    });
    createFormContext({
      resetAction: ve,
      submitAction: ce
    }), watch(
      () => unref(Z).model,
      () => {
        const { model: ue } = unref(Z);
        !ue || de(ue);
      },
      {
        immediate: !0
      }
    ), watch(
      () => unref(Z).schemas,
      (ue) => {
        be(ue ?? []);
      }
    ), watch(
      () => oe.value,
      (ue) => {
        unref(Q) || ue?.length && (re(), Q.value = !0);
      }
    ), watch(
      () => K,
      useDebounceFn(() => {
        unref(Z).submitOnChange && ce();
      }, 300),
      { deep: !0 }
    );
    async function Ce(ue) {
      H.value = deepMerge(unref(H) || {}, ue);
    }
    function Fe(ue, me) {
      K[ue] = me;
      const { validateTrigger: he } = unref(se);
      (!he || he === "change") && fe([ue]).catch(() => {
      }), k("field-value-change", ue, me);
    }
    function we(ue) {
      const { autoSubmitOnEnter: me } = unref(Z);
      if (!!me && ue.key === "Enter" && ue.target && ue.target instanceof HTMLElement) {
        const he = ue.target;
        he && he.tagName && he.tagName.toUpperCase() == "INPUT" && ce();
      }
    }
    const Oe = {
      getFieldsValue: ye,
      setFieldsValue: de,
      resetFields: ve,
      updateSchema: ge,
      resetSchema: be,
      setProps: Ce,
      removeSchemaByFiled: pe,
      appendSchemaByField: Se,
      clearValidate: ie,
      validateFields: fe,
      validate: le,
      submit: ce,
      scrollToField: _e
    };
    useAutoFocus({
      getSchema: oe,
      getProps: Z,
      isInitedDefault: Q,
      formElRef: X
    }), onMounted(() => {
      re(), k("register", Oe);
    });
    const { handleToggleAdvanced: Ee } = useAdvanced({
      advanceState: ee,
      emit: k,
      getProps: Z,
      getSchema: oe,
      formModel: K,
      defaultValueRef: G
    });
    return {
      getBindValue: se,
      handleToggleAdvanced: Ee,
      handleEnterPress: we,
      formModel: K,
      defaultValueRef: G,
      advanceState: ee,
      getRow: te,
      getProps: Z,
      getRules: ne,
      formRef: X,
      getSchema: oe,
      formActionType: Oe,
      setFormModel: Fe,
      getFormActionBindProps: computed(
        () => ({ ...Z.value, ...ee })
      ),
      ...Oe
    };
  }
}), index_vue_vue_type_style_index_0_lang$1 = "", _hoisted_1$1 = { class: "vpandora-form" };
function _sfc_render$1(e, k, U, K, H, G) {
  const W = resolveComponent("FormItem"), X = resolveComponent("FormAction"), Q = resolveComponent("el-row"), ee = resolveComponent("el-Form");
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    createVNode(ee, mergeProps(e.getBindValue, {
      rules: e.getRules,
      ref: "formRef",
      model: e.formModel,
      onKeypress: withKeys(e.handleEnterPress, ["enter"])
    }), {
      default: withCtx(() => [
        createVNode(Q, normalizeProps(guardReactiveProps(e.getRow)), {
          default: withCtx(() => [
            renderSlot(e.$slots, "formHeader"),
            (openBlock(!0), createElementBlock(Fragment, null, renderList(e.getSchema, (Z) => (openBlock(), createBlock(W, {
              key: Z.field,
              tableAction: e.tableAction,
              formActionType: e.formActionType,
              schema: Z,
              formProps: e.getProps,
              allDefaultValues: e.defaultValueRef,
              formModel: e.formModel,
              setFormModel: e.setFormModel
            }, createSlots({ _: 2 }, [
              renderList(Object.keys(e.$slots), (te) => ({
                name: te,
                fn: withCtx((ne) => [
                  renderSlot(e.$slots, te, normalizeProps(guardReactiveProps(ne || {})))
                ])
              }))
            ]), 1032, ["tableAction", "formActionType", "schema", "formProps", "allDefaultValues", "formModel", "setFormModel"]))), 128)),
            createVNode(X, mergeProps(e.getFormActionBindProps, { onToggleAdvanced: e.handleToggleAdvanced }), createSlots({ _: 2 }, [
              renderList(["resetBefore", "submitBefore", "advanceBefore", "advanceAfter"], (Z) => ({
                name: Z,
                fn: withCtx((te) => [
                  renderSlot(e.$slots, Z, normalizeProps(guardReactiveProps(te || {})))
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
      unref(k)?.removeSchemaByFiled(W);
    },
    getFieldsValue: () => unref(k)?.getFieldsValue(),
    setFieldsValue: async (W) => {
      (await K()).setFieldsValue(W);
    },
    appendSchemaByField: async (W, X, Q) => {
      (await K())?.appendSchemaByField(W, X, Q);
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
function _sfc_render(e, k, U, K, H, G) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(H.isPC ? "PandoraContainer" : "PandoraContainer-m")
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
