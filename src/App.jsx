import { useState } from 'react'
import './App.css'
import CustomerList from './CustomerList.jsx'
import ReloadPrompt from './ReloadPrompt.jsx'

function App() {
  const [customers, setCustomers] = useState([])
  const [message, setMessage] = useState('Load the sample API data to try offline caching.')
  const [loading, setLoading] = useState(false)

  async function loadCustomers() {
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/customers')

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      const data = await response.json()
      setCustomers(data)
      setMessage('Sample API data loaded. It is now available in the API cache.')
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : 'Could not load the sample data.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="app">
      <header className="hero">
        <span className="eyebrow">MOBILE APPLICATION DEVELOPMENT · ITE101</span>
        <h1>React Vite PWA</h1>
        <p>
          This demo can be installed and its app files and sample API response
          are cached for offline use.
        </p>
      </header>

      <section className="demo-card" aria-labelledby="api-heading">
        <h2 id="api-heading">Try the sample API</h2>
        <p>
          Load the customer list while online. Then switch DevTools to Offline
          and load it again to see the runtime-cached response.
        </p>
        <button type="button" onClick={loadCustomers} disabled={loading}>
          {loading ? 'Loading…' : 'Load customers'}
        </button>
        <p className="status" role="status">{message}</p>
        {customers.length > 0 && (
          <>
            <CustomerList
              customers={customers}
              onRemoveCustomer={(customerId) =>
                setCustomers((current) =>
                  current.filter((customer) => customer.id !== customerId),
                )
              }
            />
            <p className="learning-note">
              <strong>Props:</strong> App passes the customer list and remove
              handler to CustomerList. <strong>State:</strong> App keeps the
              changing list and updates it when you remove a customer.
            </p>
          </>
        )}
      </section>

      <section className="steps-card" aria-labelledby="steps-heading">
        <h2 id="steps-heading">How to test offline</h2>
        <ol>
          <li>Build and preview the app using the commands in the terminal.</li>
          <li>Open the preview address in Chrome and load the customer list.</li>
          <li>In DevTools, choose Application → Service Workers.</li>
          <li>Turn on Offline, then press “Load customers” again.</li>
        </ol>
      </section>

      <ReloadPrompt />
    </main>
  )
}

export default App
