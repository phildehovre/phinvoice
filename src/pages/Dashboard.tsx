import React from 'react'
import { useBusinesses } from '../util/db'
import { getAuth } from 'firebase/auth'
import { Outlet } from 'react-router'

function Dashboard() {

  const auth = getAuth()

  console.log(auth.currentUser?.uid)

// const {data, isLoading, error} = useBusinesses(auth.currentUser?.uid)

// console.log(data? data: '')


  return (
    <>
    <h1>Dashboard</h1>
    <div>
      <div>
        <h2>Upcoming</h2>
        <ul>
          <li>Item 1</li>
          <li>Item 1</li>
          <li>Item 1</li>
          <li>Item 1</li>
          <li>Item 1</li>
        </ul>
      </div>
      <div>
        <h2>Past</h2>
        <ul>
          <li>Item 1</li>
          <li>Item 1</li>
          <li>Item 1</li>
          <li>Item 1</li>
          <li>Item 1</li>
        </ul>
      </div>
    </div>
    </>
  )
}

export default Dashboard