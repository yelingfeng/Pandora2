export const trim = function(string: string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

export function hasClass(elements: any, cls: string) {
  return !!elements.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

export function addClass(elements: any, cls: string) {
  if (!hasClass(elements, cls)) {
    elements.className = trim(elements.className) + ' ' + cls
  }
}
export function removeClass(elements: any, cls: string) {
  if (hasClass(elements, cls)) {
    elements.className = elements.className.replace(new RegExp('(\\s|^)' + cls + '(\\s|$)'), ' ')
  }
}
