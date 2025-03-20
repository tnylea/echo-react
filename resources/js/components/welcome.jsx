import { useState, useEffect } from 'react'
import axios from 'axios';
import laravelLogo from '../../../public/laravel.svg'
import reactLogo from '../../../public/react.svg'
import echoLogo from '../../../public/echo.svg'
import Counter from './counter';

// Hooks
import { useEcho } from '@/hooks';

function Welcome() {
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(true)

    // Fetch the initial count from the server when component mounts
    useEffect(() => {
      axios.get('/get-count')
        .then(response => {
          setCount(response.data.count);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching count:', error);
          setLoading(false);
        });
    }, []);

    useEcho('count-channel', '.count.changed', (payload) => {
      setCount(payload.count);
    }, [], 'public');
  
    return (
      <div className="flex flex-col space-y-5 lg:p-0 p-10 items-center justify-center text-center">
        <div className="flex items-center space-x-10">
          <a href="https://laravel.com" target="_blank" className="w-32 hover:scale-[1.02] ease-out duration-300 h-auto">
            <img src={laravelLogo} className="w-full h-full" alt="Laravel logo" />
          </a>
          <a href="https://react.dev" target="_blank" className="w-32 hover:scale-[1.02] ease-out duration-300 h-auto">
            <img src={reactLogo} className="w-full h-full logo" alt="React logo" />
          </a>
          <a href="https://github.com/laravel/echo" target="_blank" className="w-32 hover:scale-[1.02] ease-out duration-300 h-auto">
            <img src={echoLogo} className="w-full h-full logo" alt="Echo logo" />
          </a>
        </div>
        <h1 className="font-bold text-3xl">Laravel + React + Echo</h1>
        <div className="mt-3 flex flex-col items-center justify-center">
        <div className="rounded-xl mb-7 bg-black w-auto overflow-hidden">
          <Counter
            value={count}
            places={[100, 10, 1]}
            fontSize={80}
            padding={5}
            gap={10}
            textColor="white"
  fontWeight={900}
/>
</div>
          <div className="flex items-center justify-center space-x-3">
            <button 
              className="bg-gray-100 border hover:border-blue-400 border-transparent ring-2 ring-transparent focus:ring-blue-700 rounded-lg px-5 py-3 text-lg cursor-pointer"
              onClick={(e) => {
                setCount(count + 1);
                axios.get('/update-count');
              }}
              disabled={loading}>
              {
                loading ? (
                  <svg className="mx-5 size-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : (
                  `Increment`
                )
              }
            </button>
            <button 
              className="bg-gray-100 border hover:border-blue-400 border-transparent ring-2 ring-transparent focus:ring-blue-700 rounded-lg px-5 py-3 text-lg cursor-pointer"
              onClick={(e) => {
                setCount(0);
                axios.get('/reset-count');
              }}
              disabled={loading}>
              {
                loading ? (
                  <svg className="mx-5 size-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : (
                  `reset count`
                )
              }
            </button>
          </div>
          <p className="mt-5">
            Edit <code className="text-gray-500 font-mono px-2 text-sm">resources/js/components/welcome.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="text-xs">
          Click on the Laravel React, or Echo logo to learn more
        </p>
      </div>
    )
  }
  
  export default Welcome
  