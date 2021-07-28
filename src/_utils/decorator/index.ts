import 'reflect-metadata'
import { ICPD } from '@/table/meta-programming/type'

export function CreateProperDecorator<T>(): ICPD<T> {
  const metaKey = Symbol()

  function properDecoratorF(config: T): PropertyDecorator {
    return function (target, propertyKey) {
      Reflect.defineMetadata(metaKey, config, target, propertyKey)
    }
  }

  return { metaKey, properDecoratorF }
}

export function getConfigMap<T>(
  target: any,
  cacheKey: symbol,
  metaKey: symbol
): Map<string, T> {
  if (target[cacheKey]) return target[cacheKey]
  const instance = new target({})
  // 获取到实例的所有属性
  const keys = Object.keys(instance)

  target[cacheKey] = keys.reduce((map, key) => {
    const config = Reflect.getMetadata(metaKey, instance, key)
    if (config) {
      map.set(key, config)
    }
    return map
  }, new Map<string, T>())
  return target[cacheKey]
}
