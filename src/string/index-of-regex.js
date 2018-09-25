// https://stackoverflow.com/a/274094/538711
export default function indexOfRegex(str, regex, start) {
  const indexOf = str.substring(start || 0).search(regex)
  return (indexOf >= 0) ? (indexOf + (start || 0)) : indexOf
}
