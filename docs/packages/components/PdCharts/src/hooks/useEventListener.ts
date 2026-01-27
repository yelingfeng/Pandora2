
/**
 * 监听事件
 * @param instance  实例
 * @param attrs 属性
 * @param listeners 监听
 */
export function useEventListener(
  instance: any,
  attrs: any,
  listeners: any
) {
  let realListeners = listeners
  if (!realListeners) {
    realListeners = {}

    Object.keys(attrs)
      .filter(
        (key) => key.indexOf('on') === 0 && key.length > 2
      )
      .forEach((key) => {
        // onClick    -> c + lick
        // onZr:click -> z + r:click
        let event =
          key.charAt(2).toLowerCase() + key.slice(3)

        // clickOnce    -> ~click
        // zr:clickOnce -> ~zr:click
        if (event.substring(event.length - 4) === 'Once') {
          event = `~${event.substring(0, event.length - 4)}`
        }

        realListeners[event] = attrs[key]
      })
  }
  Object.keys(realListeners).forEach((key) => {
    let handler = realListeners[key]

    if (!handler) {
      return
    }

    let event = key.toLowerCase()
    if (event.charAt(0) === '~') {
      event = event.substring(1)
      handler.__once__ = true
    }
    let target: any = instance
    if (event.indexOf('zr:') === 0) {
      target = instance.getZr()
      event = event.substring(3)
    }

    if (handler.__once__) {
      delete handler.__once__
      const raw = handler
      handler = (...args: any[]) => {
        raw(...args)
        target.off(event, handler)
      }
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore EChartsType["on"] is not compatible with ZRenderType["on"]
    // but it's okay here
    target.on(event, handler)
  })
}
