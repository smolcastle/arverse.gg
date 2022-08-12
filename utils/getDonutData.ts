export function circumference(radius: number) {
  return 2 * Math.PI * radius
}

export default function getDonutData(circumference: number, fraction: number) {
  const consumed = circumference * fraction
  const left = circumference - consumed
  return `${consumed} ${left}`
}
