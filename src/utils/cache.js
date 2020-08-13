
export const isCached = (query) => {
  const lowerQuery = query.toLowerCase()
  if (!localStorage.getItem(lowerQuery)){
    return false
  }

  return true
}

export const getCached = (query) => {
  const lowerQuery = query.toLowerCase()
  const cached = localStorage.getItem(lowerQuery)
  return JSON.parse(cached)
}

export const setCache = (query, data) => {
  const lowerQuery = query.toLowerCase()
  localStorage.setItem(lowerQuery, JSON.stringify(data))
}