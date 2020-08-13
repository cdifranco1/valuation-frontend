export default class CachedSearch {
  constructor(searchFunction, resultsHandler){
    this.searchFunction = searchFunction
    this.resultsHandler = resultsHandler

    this.query = ""
    this.queryCount = 0
    this.cache = {}
    this.cacheHits = 0
    this.cacheHitsHistory = []
  }

  changeQuery(query){
    const casedQuery = query.toLowerCase()
    if (casedQuery.length < 3){
      this.resultsHandler([])
      return
    }
    if (this.cache[casedQuery]){
      this.cacheHits = this.cacheHits + 1
      this.queryCount = this.queryCount + 1
      this.cacheHitsHistory = [...this.cacheHitsHistory, casedQuery]
      console.log(this.cacheHitsHistory)
      console.log("query retrieved from cache:", casedQuery)
      this.resultsHandler(this.cache[casedQuery])
    } else {
      this.searchFunction(casedQuery)
        .then(results => {
          console.log(results)
          this.cache[casedQuery] = results.data
          this.queryCount = this.queryCount + 1
          console.log("query added to cache:", casedQuery)
          this.resultsHandler(results.data)
        })
    }
  }
}