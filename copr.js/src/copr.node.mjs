import COPR from './copr.mjs'
import http from 'http'
import * as jmespath from  'jmespath'
import scheme from 'copr.common/scheme.json' assert {type: 'json'}

/** INITIALIZE **/

COPR._scheme = scheme
COPR._jmespath = jmespath
COPR._jsonFromURL = async url => new Promise(resolve => {
  http.get(url, res => {
    if (res.statusCode != 200) return
    let data = ''
    res.on('data', chunk => { data += chunk })
    res.on('end', () => resolve(JSON.parse(data)))
  })
})
await COPR._initialize()

/** EXPORT **/

export default COPR
