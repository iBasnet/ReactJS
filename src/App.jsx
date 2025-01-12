import React, { useEffect } from 'react'
import { useState } from 'react';

const fetchFromGitHub = async (username) => {

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error("Response ain't okay")
    }

    const data = await response.json();
    console.log(data);

    const { name, login, location, avatar_url } = data;

    return { name, login, location, avatar_url };

  }
  catch (error) {
    console.log(error)
  }
}

export default function App() {

  const [username, setUsername] = useState();
  const [count, setCount] = useState(0);
  const [userData, setUserData] = useState(null);
  const [degree, setDegree] = useState(0);

  useEffect(() => {

    async function fetchSetter() {

      if (username) {
        const data = await fetchFromGitHub(username);
        // You need to await the resolved value of fetchFromGitHub and then pass the actual data to setUserData.
        // Otherwise the promise will be unfilled if don't await from the changes
        setUserData(data)
      }
    }

    fetchSetter();
  }, [username]);

  useEffect(() => {
    if (!username) {
      const ask = prompt("Search for a username on GitHub:", "iBasnet");
      setUsername(ask);
    }
  }, [username]);

  return (
    !username
      ? (
        <p>Search for a username on GitHub.</p>
      )
      : (
        <main>
          <Counter count={count} setCount={setCount} setDegree={setDegree} />
          <Profile userData={userData} degree={degree} />
        </main >
      )
  )
}

function Counter({ count, setCount, setDegree }) {
  return (
    <section className="counter">
      <h1>Caching in JavaScript</h1>
      <h2>Current Count: {count}</h2>
      <button
        title='just click me'
        onClick={() => {
          setCount(prev => prev + 1);
          setDegree(prev => prev + 36);
        }
        }>Click Me</button>
    </section >
  )
}

function Profile({ userData, degree }) {
  return (
    userData && (
      <section className='profile'>
        <div>
          <img src={userData.avatar_url} alt="Profile Picture"
            style={{ rotate: `${degree}deg` }}
          />
        </div>
        <div>
          <h1>{userData.name}</h1>
          <p>@{userData.login}</p>
          <p>{userData.location}</p>
        </div>
      </section>
    )
  )
}