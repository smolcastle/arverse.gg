const getSearchResults = (result: string, query: string) => {
  return result.replace(
    new RegExp(query, 'gi'),
    (match: string) => `<span class="text-accent">${match}</span>`
  )
}

export default getSearchResults
