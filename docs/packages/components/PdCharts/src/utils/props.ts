/**
 * 检查op里是否有指定属性 没有返回一个默认键值
 * @param op
 * @param checkName
 * @returns {}
 */
function propsCheck(op, checkName) {
  let obj = Object.create(null)
  if (op === undefined) {
    obj[checkName] = {}
    op = obj
  }
  if (!op[checkName]) {
    obj[checkName] = {}
  } else {
    obj = op
  }
  return obj
}

/**
 * 获取属性
 * @param op 属性对象
 * @param modal 模块名
 * @param key  属性名
 * @returns {*}
 */
function getProps(op, modal, key) {
  const mark = (prop, m, k) => {
    const opt = propsCheck(prop, m)
    const v = opt[m][k] !== undefined ? opt[m][k] : ''
    return v
  }
  if (Array.isArray(key)) {
    const obj = {}
    for (const k of key) {
      obj[k] = mark(op, modal, k)
    }
    return obj
  }
  const v = mark(op, modal, key)
  return v
}

/**
 * 获取Special属性
 * @param op
 * @param key 属性名
 */
export function getSpecialProps(op, key) {
  const prop = getProps(op, 'specialProp', key)
  return prop
}

/**
 * AXIS
 * @param op
 * @param key 属性名
 */
export function getAxisProps(op, key) {
  const prop = getProps(op, 'axisProps', key)
  return prop
}

/**
 * [getAxisProps 获取一组]
 * @param  {[type]}  prop [description]
 * @param  {[type]}  keys [description]
 * @return {Boolean}      [description]
 */
export function getAxisPropsGroup(prop, keys) {
  const obj = {}
  keys.forEach((key) => {
    obj[key] = getProps(prop, 'axisProps', key)
  })
  return obj
}

/**
 * 获取通用属性
 * @param op
 * @param key 属性名
 */
export function getCommonProps(op, key) {
  const prop = getProps(op, 'commonProp', key)
  return prop
}

/**
 * 获得图例属性
 * @param prop
 * @param {Array} keys
 */
export function getLegendProps(prop, keys) {
  const k = 'commonProp'
  return getProps(prop, k, keys)
}

/**
 * 获得地图属性
 * @param props
 * @param keys
 * @returns {*}
 */
export function getMapProps(props, keys) {
  const k = 'mapOption'
  return getProps(props, k, keys)
}

/**
 * getCompSpecialProps 获得组件特殊属性中的某个子类型的属性
 * @param  {Object} props 属性大对象
 * @param  {String} compkey 特殊属性中的二级类型 例如 bar line map等
 * @param  {Array|String} keys 支持字符串或者数组 取里面的键值 例如取 bar里面的['width','hoverColor'] 或者 'width'
 * @return {Object|String}  数组返回对象键值 字符串返回值
 */
export function getCompSpecialProps(props, compkey, keys) {
  const k = 'specialProp'
  const attr = props[k]
  return getProps(attr, compkey, keys)
}
