const arrayKeySegmentRegex = /\[(\d+)\]/

function parseStringPath(path) {
  const parts = []
  for (let i = 0; i < path.length; i++) {
    const char = path.charAt(i)
    const firstIndexOfArray
  }
}

export default function safeGet(object, path, defaultValue = undefined) {
  if (typeof object !== 'object') {
    return defaultValue
  }

  if (typeof path === 'string') {
    path = path.split()
  }

  for (let i=0; i<path.length; i++) {
    
  }
}
