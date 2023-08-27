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
try {
  await COPR._initialize()
} catch {
  console.log('Warning: COPR could not be initialized.  Run `await COPR._initialize()` before using COPR.')
}

/** EXPORT **/

export default COPR
