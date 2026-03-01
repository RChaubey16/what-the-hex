import { isValidHex } from '../utils/color'

interface HexInputProps {
  value: string
  onChange: (value: string) => void
}

export function HexInput({ value, onChange }: HexInputProps) {
  const trimmed = value.trim()
  const showError = trimmed.length > 0 && !isValidHex(trimmed)

  return (
    <div className="w-full max-w-md">
      <label
        htmlFor="hex-input"
        className="mb-2 block text-sm font-medium text-neutral-400"
      >
        Enter a hex color code
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-lg font-semibold text-neutral-500">
          #
        </span>
        <input
          id="hex-input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="00FFA6"
          maxLength={7}
          spellCheck={false}
          autoComplete="off"
          className={`w-full rounded-xl border bg-neutral-900 py-3 pr-4 pl-9 font-mono text-lg tracking-wider text-white placeholder-neutral-600 transition-colors outline-none ${
            showError
              ? 'border-red-500/60 focus:border-red-400'
              : 'border-neutral-700 focus:border-neutral-500'
          }`}
        />
      </div>
      {showError && (
        <p className="mt-2 text-sm text-red-400" role="alert">
          Enter a valid hex code (e.g. 00FFA6 or #FFF)
        </p>
      )}
    </div>
  )
}
