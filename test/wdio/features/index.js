const expect = require('chai').expect

describe('The Default Route (Feature)', () => {
  it('expects the page to have the correct title', () => {
    // Arrange
    browser.url('/')

    // Act
    const element = browser.getTitle()
    const text = 'Residents and Nearby'

    // Assert
    expect(element).to.equal(text)
  })

  it('expects the page to have the correct heading', () => {
    // Act
    const element = $('h1').getText()
    const text = 'Residents and Nearby'

    // Assert
    expect(element).to.equal(text)
  })

  it('expects the page to have the correct description paragraph', () => {
    // Act
    const element = $('#description').getText()
    const text = 'This is an application to display users who live in, or who are currently within distance of a city.'

    // Assert
    expect(element).to.equal(text)
  })

  it('expects the page to have a \'nearby\' container', () => {
    // Act
    const element = $('#nearby').isExisting()

    // Assert
    expect(element).to.equal(true)
  })

  it('expects the page to have a \'residents\' container', () => {
    // Act
    const element = $('#residents').isExisting()

    // Assert
    expect(element).to.equal(true)
  })

  it('expects the page to have \'card\' elements', () => {
    // Act
    const elements = $$('.card')

    // Assert
    expect(elements.length).to.equal(8)
  })

  it('expects the page to have \'nearby\' elements', () => {
    // Act
    const elements = $$('.card .nearby')

    // Assert
    expect(elements.length).to.equal(4)
  })

  it('expects the page to have \'resident\' elements', () => {
    // Act
    const elements = $$('.card .resident')

    // Assert
    expect(elements.length).to.equal(4)
  })

  it('expects cards to be unsorted on load', () => {
    // Act
    const element = $$('.card')

    // Assert
    expect(element[0].getText()).to.include('Ben Smith')
    expect(element[1].getText()).to.include('Adam Smith')
    expect(element[2].getText()).to.include('Ben Jones')
    expect(element[3].getText()).to.include('Adam Jones')
    expect(element[4].getText()).to.include('Carl Jones')
    expect(element[5].getText()).to.include('David Smith')
    expect(element[6].getText()).to.include('Carl Smith')
    expect(element[7].getText()).to.include('David Jones')
  })

  it('expects cards to be sorted A-Z (First Name) after selecting that option', () => {
    // Act
    const select = $('#sort select')
    const button = $('#sort button')

    select.selectByVisibleText('A-Z (First Name)')
    button.click()

    const element = $$('.card')

    // Assert
    expect(element[0].getText()).to.include('Adam Jones')
    expect(element[1].getText()).to.include('Adam Smith')
    expect(element[2].getText()).to.include('Ben Jones')
    expect(element[3].getText()).to.include('Ben Smith')
    expect(element[4].getText()).to.include('Carl Jones')
    expect(element[5].getText()).to.include('Carl Smith')
    expect(element[6].getText()).to.include('David Jones')
    expect(element[7].getText()).to.include('David Smith')
  })

  it('expects cards to be sorted A-Z (Last Name) after selecting that option', () => {
    // Act
    const select = $('#sort select')
    const button = $('#sort button')

    select.selectByVisibleText('A-Z (Last Name)')
    button.click()

    const element = $$('.card')

    // Assert
    expect(element[0].getText()).to.include('Adam Jones')
    expect(element[1].getText()).to.include('Ben Jones')
    expect(element[2].getText()).to.include('Adam Smith')
    expect(element[3].getText()).to.include('Ben Smith')
    expect(element[4].getText()).to.include('Carl Jones')
    expect(element[5].getText()).to.include('David Jones')
    expect(element[6].getText()).to.include('Carl Smith')
    expect(element[7].getText()).to.include('David Smith')
  })

  it('expects cards to be sorted Distance (Ascending) after selecting that option', () => {
    // Act
    const select = $('#sort select')
    const button = $('#sort button')

    select.selectByVisibleText('Distance (Ascending)')
    button.click()

    const element = $$('.card')

    // Assert
    expect(element[0].getText()).to.include('Ben Smith')
    expect(element[1].getText()).to.include('Adam Smith')
    expect(element[2].getText()).to.include('Ben Jones')
    expect(element[3].getText()).to.include('Adam Jones')
    expect(element[4].getText()).to.include('David Smith')
    expect(element[5].getText()).to.include('David Jones')
    expect(element[6].getText()).to.include('Carl Smith')
    expect(element[7].getText()).to.include('Carl Jones')
  })

  it('expects cards to be sorted Distance (Descending) after selecting that option', () => {
    // Act
    const select = $('#sort select')
    const button = $('#sort button')

    select.selectByVisibleText('Distance (Descending)')
    button.click()

    const element = $$('.card')

    // Assert
    expect(element[0].getText()).to.include('Ben Smith')
    expect(element[1].getText()).to.include('Adam Smith')
    expect(element[2].getText()).to.include('Ben Jones')
    expect(element[3].getText()).to.include('Adam Jones')
    expect(element[4].getText()).to.include('Carl Jones')
    expect(element[5].getText()).to.include('Carl Smith')
    expect(element[6].getText()).to.include('David Jones')
    expect(element[7].getText()).to.include('David Smith')
  })

  it('expects cards to be unsorted after selecting the Clear option', () => {
    // Act
    const select = $('#sort select')
    const button = $('#sort button')

    select.selectByVisibleText('Clear')
    button.click()

    const element = $$('.card')

    // Assert
    expect(element[0].getText()).to.include('Ben Smith')
    expect(element[1].getText()).to.include('Adam Smith')
    expect(element[2].getText()).to.include('Ben Jones')
    expect(element[3].getText()).to.include('Adam Jones')
    expect(element[4].getText()).to.include('Carl Jones')
    expect(element[5].getText()).to.include('David Smith')
    expect(element[6].getText()).to.include('Carl Smith')
    expect(element[7].getText()).to.include('David Jones')
  })
})
