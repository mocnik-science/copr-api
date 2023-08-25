let COPR = typeof window !== 'undefined' ? window.COPR : (await import('../src/copr.node.mjs')).default
let chai = typeof window !== 'undefined' ? window.chai : (await import('chai')).default

chai.should()

describe('general', () => {
  it('apiVersion', () => COPR.apiVersion().should.not.be.null)
  it('dataset', () => COPR.dataset().should.not.be.null)
  it('stats', () => COPR.stats().should.be.an.instanceOf(Object))
})

describe('aspect', () => {
  it('selection', () => COPR.aspects({qualityKind: 'colour'}).should.have.lengthOf.above(0))
  it('class', () => {
    for (const aspect of COPR.aspects()) aspect.should.be.an.instanceOf(COPR.Aspect)
  })
})

describe('asset', () => {
  it('selection', () => COPR.assets({label: 'Tower Bridge', unique: false, hasFiles: true}).should.have.lengthOf.above(0))
  it('class', () => {
    for (const asset of COPR.assets()) asset.should.be.an.instanceof(COPR.Asset)
  })
  it('general', () => {
    for (const asset of COPR.assets()) asset.howToCite().should.not.be.null
  })
  it('parameters', () => {
    for (const asset of COPR.assets()) {
      asset.id().should.not.be.null
      asset.label().should.not.be.null
      asset.description().should.not.be.null
      asset.manifestationKind().should.not.be.null
      asset.unique().should.not.be.null
    }
  })
  it('files', () => {
    for (const asset of COPR.assets()) {
      for (const file of asset.files()) {
        file.filename().should.not.be.null
        file.isTheFile().should.not.be.null
      }
    }
  })
  it('selections', () => {
    for (const asset of COPR.assets()) {
      for (const selection of asset.selections()) {
        selection.x().should.not.be.null
        selection.file().filename().should.not.be.null
        selection.file().isTheFile().should.not.be.null
      }
    }
  })
})

describe('literature', () => {
  it('selection', () => COPR.literature({author: 'Mocnik'}).should.have.lengthOf.above(0))
  it('class', () => {
    for (const literature of COPR.literature()) literature.should.be.an.instanceof(COPR.Literature)
  })
  it('parameters', () => {
    for (const literature of COPR.literature()) {
      (literature.author() || literature.editor() || literature.institution()).should.not.be.null
      literature.title().should.not.be.null
    }
  })
})

describe('representation', () => {
  it('selection1', () => COPR.representations().should.have.lengthOf.at.least(COPR.representations({label: 'London'}).length))
  it('selection2', () => {
    COPR.representations({label: 'London'}).should.have.lengthOf.above(0)
    COPR.representations({label_: 'London'}).should.have.lengthOf(0)
    COPR.representations({label: 'London'}).should.have.lengthOf.at.least(COPR.representations({label_: 'London'}).length)
  })
  it('class', () => {
    for (const representation of COPR.representations()) representation.should.be.an.instanceof(COPR.Representation)
  })
  it('general', () => {
    for (const representation of COPR.representations()) representation.howToCite().should.not.be.null
  })
  it('parameters', () => {
    for (const representation of COPR.representations()) {
      representation.label().should.not.be.null
      representation.natural().should.not.be.null
      representation.description().should.not.be.null
      representation.assets().should.not.be.null
      representation.places().should.not.be.null
    }
  })
  it('class', () => {
    for (const representation of COPR.representations()) representation.should.be.an.instanceof(COPR.Representation)
  })
  it('details', () => {
    for (const representation of COPR.representations()) {
      for (const reference of representation.references()) {
        reference.representamen().should.not.be.null
        reference.representamen().label().should.not.be.null
        reference.aspectOfRepresentamen().should.not.be.null
        reference.aspectOfRepresentamen().id().should.not.be.null
        reference.aspectOfRepresentamen().qualities().should.not.be.null
        for (const quality of reference.aspectOfRepresentamen().qualities()) {
          quality.should.be.an.instanceof(COPR.Quality)
          quality.kind().should.not.be.null
          quality.canBeDescribedAs().should.not.be.null
        }
        for (const comparator of reference.aspectOfRepresentamen().comparators()) {
          comparator.should.be.an.instanceof(COPR.Comparator)
          if (comparator instanceof COPR.IndividualComparator) comparator.selection().x().should.not.be.null
          if (comparator instanceof COPR.CollectionComparator) {
            comparator.includesSelections().should.have.lengthOf.above(0)
            comparator.id().should.not.be.null
            comparator.hasRelevantArrangementOfComparators().should.not.be.null
            comparator.object().should.not.be.null
            comparator.object().label().should.not.be.null
          }
        }
        reference.typeOfReference().should.not.be.null
        reference.representantum().should.not.be.null
        reference.representantum().label().should.not.be.null
        reference.aspectOfRepresentantum().should.not.be.null
        reference.aspectOfRepresentantum().id().should.not.be.null
      }
      representation.literature().should.not.be.null
    }
  })
})
