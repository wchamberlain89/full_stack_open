const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, blog) => {
    return acc + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  const result = blogs.reduce( (prev, curr) => {
    return prev.likes > curr.likes ? { title: prev.title, author: prev.author, likes: prev.likes } : { title: curr.title, author: curr.author, likes: curr.likes }
  }, { title: blogs[0].title, author: blogs[0].author, likes: blogs[0].likes })
  console.log('result is ', result)
  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}

