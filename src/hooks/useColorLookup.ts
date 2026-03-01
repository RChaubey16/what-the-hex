import { useCallback, useEffect, useRef, useState } from 'react'
import { isValidHex, normalizeHex, stripHash } from '../utils/color'

export interface ColorData {
  name: string
  hex: string
  rgb: string
  hsl: string
}

interface State {
  data: ColorData | null
  loading: boolean
  error: string | null
}

export function useColorLookup(input: string, debounceMs = 400) {
  const [state, setState] = useState<State>({
    data: null,
    loading: false,
    error: null,
  })
  const abortRef = useRef<AbortController | null>(null)

  const fetchColor = useCallback(async (hex: string) => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const normalized = normalizeHex(hex)
      const res = await fetch(
        `https://www.thecolorapi.com/id?hex=${stripHash(normalized)}`,
        { signal: controller.signal }
      )

      if (!res.ok) throw new Error('Failed to fetch color data')

      const json = await res.json()
      setState({
        data: {
          name: json.name?.value ?? 'Unknown',
          hex: normalized,
          rgb: json.rgb?.value ?? '',
          hsl: json.hsl?.value ?? '',
        },
        loading: false,
        error: null,
      })
    } catch (err) {
      if ((err as Error).name === 'AbortError') return
      setState({
        data: null,
        loading: false,
        error: 'Could not fetch color information. Please try again.',
      })
    }
  }, [])

  useEffect(() => {
    const trimmed = input.trim()
    if (!trimmed || !isValidHex(trimmed)) {
      setState({ data: null, loading: false, error: null })
      return
    }

    const timeout = setTimeout(() => fetchColor(trimmed), debounceMs)
    return () => clearTimeout(timeout)
  }, [input, debounceMs, fetchColor])

  useEffect(() => {
    return () => abortRef.current?.abort()
  }, [])

  return state
}
