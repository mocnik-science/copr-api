import setuptools
import json

with open('../package.json') as file:
  pkg = json.load(file)

pkgName=pkg['name']
pkgVersion=pkg['version']
pkgUrl='https://github.com/mocnik-science/copr-api'

with open('./copr/__info__.py', 'w') as f:
  f.write('pkgName = \'%s\'\n' % pkgName)
  f.write('pkgVersion = \'%s\'\n' % pkgVersion)
  f.write('pkgUrl = \'%s\'\n' % pkgUrl)

# see setup.cfg for metadata
setuptools.setup(
  name=pkgName,
  packages=setuptools.find_packages(),
  install_requires=[
    'jmespath',
  ],
  extras_require={
    'test': [
      'pytest',
      'pytest-sugar',
    ],
  },
  version=pkgVersion,
  author='Franz-Benjamin Mocnik',
  author_email='mail@mocnik-science.net',
  license='CC-BY-NC-ND-4.0',
  url=pkgUrl,
  download_url='',
  keywords=['place', 'representation', 'corpus'],
)
