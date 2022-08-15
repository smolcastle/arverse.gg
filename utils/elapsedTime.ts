const getSecondsElapsed = (start: Date, end: Date) => {
  const diff = (end.getTime() - start.getTime()) / 1000
  return Math.round(diff)
}

const getMinutesElapsed = (start: Date, end: Date) => {
  const diff = (end.getTime() - start.getTime()) / 1000 / 60
  return Math.round(diff)
}

export { getSecondsElapsed, getMinutesElapsed }
