from copr import *

def test_aspectSelection():
  assert len(COPR.aspects(qualityKind='colour')) > 0

def test_aspectClass():
  for asset in COPR.aspects():
    assert isinstance(asset, COPRAspect)
