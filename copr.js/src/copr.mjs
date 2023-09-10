/** COMMON: JAVASCRIPT SPECIFIC **/

String.prototype._lstrip = function(str) { return this.startsWith(str) ? this.slice(str.length) : this }
String.prototype._rstrip = function(str) { return this.endsWith(str) ? this.slice(0, this.length - str.length) : this }
String.prototype._capitalizeFirst = function() { return this.length > 0 ? this.charAt(0).toUpperCase() + this.slice(1) : '' }
String.prototype._lowerFirst = function() { return this.length > 0 ? this.charAt(0).toLowerCase() + this.slice(1) : '' }

Object._hasKey = (o, key) => Object.keys(o).includes(key)
Object._mapValues = (o, fn) => Object.fromEntries(Object.entries(o).map(([k, v], i) => [k, fn(v, k, i)]))

Array.prototype._first = function() { return this.find(x => x !== undefined) }

/** COPR CLASS **/

const COPR = {
  _scheme: null,
  __initialized: false,

  /** JAVASCRIPT SPECIFIC **/

  _jsonFromURL: async () => {},

  /** INITIALIZE **/

  _initialize: async () => {
    // only initialize if this has not yet been done
    if (COPR.__initialized) return
    COPR.__initialized = true
    // load scheme: is done in copr.*.mjs
    // load files
    for (const [key, url] of Object.entries(COPR._scheme.urls.files)) COPR[key] = await COPR._jsonFromURL(COPR._scheme.urls.endpoint + '/' + url)
    // init info functions
    for (const [key, value] of Object.entries(COPR._info)) COPR[key] = () => value
    // init base function
    for (const [key, value] of Object.entries(COPR._scheme.functions)) COPR[key] = () => COPR.__baseFunction(value)
    // init elements
    for (const elementType of COPR._scheme.elementTypes) {
      // init element functions
      if (Object._hasKey(elementType, 'query')) COPR[Object._hasKey(elementType, 'functionName') ? elementType.functionName : elementType.name + 's'] = kwargs => COPR.__elements(elementType, kwargs)
      // init element classes
      const classname = COPR._classnameForElement(elementType)
      let baseclassname = Object._hasKey(elementType, 'baseclass') ? elementType.baseclass : 'element'
      COPR[classname] = {[classname]: class extends COPR._classForName(baseclassname) {
        // JAVASCRIPT SPECIFIC: instead of COPR.Element.constructor(d, info)
        constructor(d, info) {
          super()
          this._d = d
          this._info = info
        }
      }}[classname]
      // save parameters to the element classes
      const currentClass = COPR._classForElement(elementType)
      currentClass._parameters = elementType.parameters
      while (baseclassname != 'element') {
        const ets = COPR._scheme.elementTypes.filter(et => et.name == baseclassname)
        if (ets.length == 0) break
        const et = ets._first()
        baseclassname = Object._hasKey(et, 'baseclass') ? et.baseclass : 'element'
        if (Object._hasKey(et, 'parameters')) currentClass._parameters = {...currentClass._parameters, ...et.parameters}
      }
      // JAVASCRIPT SPECIFIC: instead of COPR.Element.__getattr__(name)
      for (const [parameter, query] of Object.entries(currentClass._parameters)) currentClass.prototype[parameter] = function() { return COPR._query(query, this._d) }
    }
  },

  /** CLASS HANDLING **/

  _classForElement: elementType => COPR[COPR._classnameForElement(elementType)],
  _classForName: name => COPR[COPR._classnameForName(name)],
  _classnameForElement: elementType => COPR._classnameForName(elementType.name),
  _classnameForName: name => name._capitalizeFirst(),

  /** QUERYING **/

  _query(query, _d=null, kwargs={}) {
    // normalize list of queries
    query = COPR.__normalizeQuery(query)
    const queries = Object._hasKey(query, 'queries') ? [...query.queries].reverse() : [query]
    // loop through the queries
    let last = null
    let results = null
    while (queries.length) {
      const q = queries.pop()
      // build the query
      const compiledQuery = COPR.__buildSingleQuery(q, {__last: last}, kwargs)
      // execute the query
      results = COPR._jmespath.search(_d && (!Object._hasKey(q, 'global') || !q.global) ? _d : COPR._data, compiledQuery)
      last = results
    }
    // create corresponding objects if requested
    const packIntoObject = x => {
      if (!(query instanceof Object && !(query instanceof String)) || !Object._hasKey(query, 'class')) return x
      let name = query.class
      if (Object._hasKey(COPR._scheme.macros.classes, name)) name = COPR._scheme.macros.classes[name]
      if (name instanceof Object && !(name instanceof String)) {
        if (!Object._hasKey(name, x.class)) return x
        name = name[x.class]
      }
      return new (COPR._classForName(name))(x, COPR._info)
    }
    return (results instanceof Array) ? results.map(packIntoObject) : packIntoObject(results)
  },
  __validParametersForQuery(query) {
    const parameters = []
    // collect all valid parameters for the query
    if (Object._hasKey(query, 'parameter')) parameters.push(query.parameter)
    else if (Object._hasKey(query, 'query')) {
      if (query.query instanceof Array) for (const q of query.query) parameters.push(...COPR.__validParametersForQuery(q))
      else parameters.push(...COPR.__validParametersForQuery(query.query))
    } else if (Object._hasKey(query, 'queries')) for (const q of query.queries) parameters.push(...COPR.__validParametersForQuery(q))
    return parameters
  },
  __normalizeQuery(query, extend={}) {
    // make a dict if query is a string or a list
    if (typeof query === 'string' || query instanceof String || query instanceof Array) query = {query: query}
    return {...query, ...extend}
  },
  __buildSingleQuery(qs, meta={}, kwargs={}) {
    // test for unused parameters
    const validParameters = COPR.__validParametersForQuery(qs)
    const invalidParameters = Object.keys(kwargs).filter(key => !validParameters.includes(key))
    if (invalidParameters.length > 0) console.log(`WARNING: Some parameters have not been used ({invalidParameters.join(', ')})`)
    // return the query
    let query = COPR.__buildSingleQueryArray(qs, kwargs).join('')
    for (const [k, v] of Object.entries(meta)) query = query.replaceAll(`{${k}}`, JSON.stringify(v))
    return query
  },
  __buildSingleQueryArray(qs, kwargs={}) {
    const query = []
    // append string
    if (typeof qs === 'string' || qs instanceof String) return [qs]
    // expand list
    if (qs instanceof Array) {
      for (const q of qs) query.push(...COPR.__buildSingleQueryArray(q, kwargs))
      return query
    }
    // use macros in object
    if (Object._hasKey(qs,'macro') && Object._hasKey(COPR._scheme.macros.queries, qs.macro))
      qs = {...COPR._scheme.macros.queries[qs.macro], ...qs}
    // append object
    if (Object._hasKey(qs, 'concat') && Object._hasKey(qs, 'query')) {
      const qs2 = COPR.__buildSingleQueryArray(qs.query, kwargs)
      if (qs2.length > 0) query.push((Object._hasKey(qs, 'prefix') ? qs.prefix : '') + qs2.join(' ' + qs.concat + ' ') + (Object._hasKey(qs, 'suffix') ? qs.suffix : ''))
      return query
    }
    // use parameter if it is also provided as a keyword
    if (Object._hasKey(qs, 'parameter') && Object._hasKey(kwargs, qs.parameter)) {
      let parameter = qs.parameter
      if (Object._hasKey(qs, 'removeParameterPrefix')) parameter = parameter._lstrip(qs.removeParameterPrefix)
      if (Object._hasKey(qs, 'removeParameterPostfix')) parameter = parameter._rstrip(qs.removeParameterPostfix)
      if (Object._hasKey(qs, 'startParameterLower') && qs.startParameterLower == true) parameter = parameter._lowerFirst()
      const key = Object._hasKey(qs, 'key') ? qs.key : qs.parameter
      const value = JSON.stringify(kwargs[key])
      const not_value = kwargs[key] ? '' : '!'
      query.push(qs.query.replaceAll('{parameter}', parameter).replaceAll('{value}', value).replaceAll('{not_value}', not_value))
    }
    // use query if no parameter is included
    else if (Object._hasKey(qs, 'query') && !Object._hasKey(qs, 'parameter')) query.push(...COPR.__buildSingleQueryArray(qs.query, kwargs))
    return query
  },

  /** FUNCTIONS **/

  __elements(elementType, kwargs={}) {
    return COPR._query(COPR.__normalizeQuery(elementType.query, {class: elementType.name}), null, kwargs)
  },
  __baseFunction(resultDescription) {
    if (resultDescription.resultType == 'dict') return Object._mapValues(resultDescription.query, query => COPR._query(query))
    else if (resultDescription.resultType == 'string') return COPR._query(resultDescription.query)
  },
}
export default COPR

/** BASE CLASS **/

COPR.Element = {['Element']: class {
  howToCite() {
    return this._info.howToCite
  }
  // JAVASCRIPT SPECIFIC: __getattr__(name) cannot be defined, and __getParameter(name) is defined above
}}['Element']

/** INITIALIZE **/

// the initialization will be done in copr.*.mjs
// COPR._initialize()
