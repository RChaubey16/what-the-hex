import { useState } from 'react'
import { ColorResult } from './components/ColorResult'
import { HexInput } from './components/HexInput'
import { useColorLookup } from './hooks/useColorLookup'

function App() {
  const [input, setInput] = useState('')
  const { data, loading, error } = useColorLookup(input)

  return (
    <div className="flex min-h-svh flex-col items-center bg-neutral-950 px-4 py-16 text-white">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          what the <span className="text-emerald-400">hex</span>
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Paste a hex code. Get color info &amp; ready-to-use variables.
        </p>
      </header>

      <HexInput value={input} onChange={setInput} />

      <div className="mt-8 flex w-full max-w-md flex-col items-center">
        {loading && (
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Looking up color…
          </div>
        )}

        {error && (
          <p
            className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
            role="alert"
          >
            {error}
          </p>
        )}

        {data && !loading && <ColorResult data={data} />}
      </div>
    </div>
  )
}

export default App
