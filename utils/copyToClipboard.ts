export default function handleCopy(setCopy: any) {
  setCopy('Copied!')
  setTimeout(() => {
    setCopy('Copy')
  }, 2000)
}
