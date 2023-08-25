from copr import *

def test_representationSelection1():
  assert len(COPR.representations()) >= len(COPR.representations(label='London'))

def test_representationSelection2():
  assert len(COPR.representations(label='London')) > 0
  assert len(COPR.representations(label_='London')) == 0
  assert len(COPR.representations(label='London')) >= len(COPR.representations(label_='London'))

def test_representationClass():
  for representation in COPR.representations():
    assert isinstance(representation, COPRRepresentation)

def test_representationGeneral():
  for representation in COPR.representations():
    assert representation.howToCite()

def test_representationParameters():
  for representation in COPR.representations():
    assert representation.label()
    assert representation.natural() != None
    assert representation.description()
    assert representation.assets()
    assert representation.places()

def test_representationReferencesClass():
  for representation in COPR.representations():
    for reference in representation.references():
      assert isinstance(reference, COPRReference)

def test_representationReferencesDetails():
  for representation in COPR.representations():
    for reference in representation.references():
      assert reference.representamen()
      assert reference.representamen().label()
      assert reference.aspectOfRepresentamen()
      assert reference.aspectOfRepresentamen().id()
      assert reference.aspectOfRepresentamen().qualities()
      for quality in reference.aspectOfRepresentamen().qualities():
        assert isinstance(quality, COPRQuality)
        assert quality.kind()
        assert quality.canBeDescribedAs()
      for comparator in reference.aspectOfRepresentamen().comparators():
        assert isinstance(comparator, COPRComparator)
        if isinstance(comparator, COPRIndividualComparator):
          assert comparator.selection().x()
        if isinstance(comparator, COPRCollectionComparator):
          assert len(comparator.includesSelections()) > 0
          assert comparator.id()
          assert comparator.hasRelevantArrangementOfComparators() != None
        assert comparator.object()
        assert comparator.object().label()
      assert reference.typeOfReference()
      assert reference.representantum()
      assert reference.representantum().label()
      assert reference.aspectOfRepresentantum()
      assert reference.aspectOfRepresentantum().id()
    assert representation.literature()
