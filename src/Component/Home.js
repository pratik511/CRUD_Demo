import React from 'react'

const Home = () => {
  const data = JSON.parse(localStorage.getItem('user'))
  return (
    <div className='App'>
      <h1>{data && data.name && `Hello ${data.name}`}</h1>
      <h2>{data && data.email && data.email}</h2>
    </div>
  )
}

export default Home