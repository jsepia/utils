export default function isBrowser() {
  return (
    typeof window === 'object' &&
    window instanceof Window &&
    typeof document === 'object' &&
    document instanceof Document
  )
}
