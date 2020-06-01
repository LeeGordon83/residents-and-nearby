process.env.NODE_ENV = 'test'

const expect = require('chai').expect

describe('The Default Route (Feature)', () => {
  it('expects the page to have the correct title', () => {
    // Arrange
    browser.url('/')

    // Act
    const element = browser.getTitle()
    const text = 'Residents of London or Currently Nearby'

    // Assert
    expect(element).to.equal(text)
  })

  it('expects the page to have the correct heading', () => {
    // Act
    const element = $('h1').getText()
    const text = 'Residents of London or Currently Nearby'

    // Assert
    expect(element).to.equal(text)
  })

  it('expects the page to have the correct subheading', () => {
    // Act
    const element = $('h2').getText()
    const text = 'This is an application to display users who are living in London, and users who are currently within 50 miles of London.'

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
    const element = $$('.card')

    // Assert
    expect(element.length).to.equal(9)
  })

  it('expects the page to have \'nearby\' elements', () => {
    // Act
    const element = $$('.card .nearby')

    // Assert
    expect(element.length).to.equal(3)
  })

  it('expects the page to have \'resident\' elements', () => {
    // Act
    const element = $$('.card .resident')

    // Assert
    expect(element.length).to.equal(6)
  })
})
