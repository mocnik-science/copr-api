import COPR from './copr.mjs'
import scheme from 'copr.common/scheme.json'

/** INITIALIZE **/

COPR._scheme = scheme
COPR._jmespath = jmespath
COPR._jsonFromURL = async url => {
  const request = new XMLHttpRequest()
  request.open('GET', url, false)
  request.send(null)
  return (request.status === 200) ? JSON.parse(request.responseText) : null
}
COPR._initialize()

/** MAKE GLOBALS **/

const globalObject = typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {}

globalObject.COPR = COPR
