from copr import *

def test_assetSelection():
  assert len(COPR.assets(label='Tower Bridge', unique=False, hasFiles=True)) > 0

def test_assetClass():
  for asset in COPR.assets():
    assert isinstance(asset, COPRAsset)

def test_assetGeneral():
  for asset in COPR.assets():
    assert asset.howToCite()

def test_assetParameters():
  for asset in COPR.assets():
    assert asset.id()
    assert asset.label()
    assert asset.description() != None
    assert asset.manifestationKind()
    assert asset.unique() != None

def test_assetFiles():
  for asset in COPR.assets():
    for file in asset.files():
      assert file.filename()
      assert file.isTheFile() != None

def test_assetSelections():
  for asset in COPR.assets():
    for selection in asset.selections():
      assert selection.x()
      assert selection.file().filename()
      assert selection.file().isTheFile() != None
