// Deep Merge by Michael Diarmid <https://github.com/salakar>
// https://stackoverflow.com/a/34749873/538711

function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item))
}

export default function deepExtend(target, ...sources) {
  if (!sources.length) {
    return target
  }

  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, {
            [key]: {}
          })
        }
        deepExtend(target[key], source[key])
      } else {
        Object.assign(target, {
          [key]: source[key]
        })
      }
    }
  }

  return deepExtend(target, ...sources)
}