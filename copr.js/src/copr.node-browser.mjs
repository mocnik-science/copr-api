import COPR from './copr.mjs'
import * as jmespath from  'jmespath'
import scheme from 'copr.common/scheme.json' assert {type: 'json'}

/** INITIALIZE **/

COPR._scheme = scheme
COPR._jmespath = jmespath
COPR._jsonFromURL = async url => {
  const request = new XMLHttpRequest()
  request.open('GET', url, false)
  request.send(null)
  return (request.status === 200) ? JSON.parse(request.responseText) : null
}

/** EXPORT **/

export default COPR
