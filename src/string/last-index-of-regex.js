import isDefined from '../type-checking/is-defined'

export default function lastIndexOfRegex(str, regex, start) {
    if (!regex.global) {
        const regexpFlags = regex.flags.split('')
        regexpFlags.push('g')
        regex = new RegExp(regex.source, regexpFlags.join(''))
    }

    if (isDefined(start)) {
        start = Math.max(start, 0)
    } else {
        start = str.length
    }

    str = str.substring(0, start + 1)
    let lastIndexOf = -1
    let nextStop = 0
    let result
    while((result = regex.exec(str)) != null) {
        lastIndexOf = result.index
        regex.lastIndex = ++nextStop
    }
    
    return lastIndexOf
}
  