addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
    const url = new URL(request.url)
    const city = url.searchParams.get('city')
  
    if (request.method === 'GET' && url.pathname === '/api/weather' && city) {
      const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  
      try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        return new Response(JSON.stringify(data), {
          headers: { 'Content-Type': 'application/json' }
        })
      } catch (error) {
        return new Response('Error fetching weather data', { status: 500 })
      }
    }
  
    return fetch(request)
  }