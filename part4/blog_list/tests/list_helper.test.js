const listHelper = require('../utils/list_helper')
const blogs = [
  { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 },
  { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0 },
  { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0 },
  { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0 },
  { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0 },
  { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0 }]
const emptyBlogs = []
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

describe('dummy', () => {
  test('dummy returns one', () => {
    const result = listHelper.dummy(emptyBlogs)
    expect(result).toBe(1)
  })
})

describe('total likes', () => {
  test('when list has only one blog, likes should equal the likes of that blog', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('Multiple blogs should be calculated correctly', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })

  test('an empty list should return 0', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })
})

describe ('Favorite Blog', () => {
  const sameLikes = [
    { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 },
    { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 10, __v: 0 },
    { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 9, __v: 0 },
    { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0 }
  ]

  test('It should return 0 if there is no blog', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(0)
  })

  test('It should return the correct blog when one has the most votes', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(
      { title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', likes: 12 },
    )
  })

  test('It should return a blog with the most likes if more than one has the most votes', () => {
    const result = listHelper.favoriteBlog(sameLikes)
    expect(result).toEqual({ title: 'First class tests', author: 'Robert C. Martin', likes: 10 } || { title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', likes: 10 }
    )
  })

  test('It should return the same blog if only one blog is given', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual({ title: listWithOneBlog[0].title, author: listWithOneBlog[0].author, likes: listWithOneBlog[0].likes })
  })
})