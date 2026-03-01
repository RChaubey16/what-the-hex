import type { ColorData } from '../hooks/useColorLookup'
import { normalizeColorName } from '../utils/color'
import { CopyButton } from './CopyButton'

interface ColorResultProps {
  data: ColorData
}

function ValueRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3">
      <div className="min-w-0">
        <span className="mb-1 block text-xs font-medium tracking-wide text-neutral-500 uppercase">
          {label}
        </span>
        <code className="block truncate text-sm text-neutral-200">{value}</code>
      </div>
      <CopyButton text={value} />
    </div>
  )
}

export function ColorResult({ data }: ColorResultProps) {
  const normalizedName = normalizeColorName(data.name)
  const cssVar = `--color-${normalizedName}: ${data.hex};`
  const scssVar = `$color-${normalizedName}: ${data.hex};`

  return (
    <div className="animate-fade-in w-full max-w-md space-y-4">
      {/* Color swatch & name */}
      <div className="overflow-hidden rounded-xl border border-neutral-800">
        <div
          className="h-32 w-full transition-colors"
          style={{ backgroundColor: data.hex }}
          aria-label={`Color preview: ${data.name}`}
        />
        <div className="flex items-center justify-between gap-3 bg-neutral-900 px-4 py-3">
          <div>
            <h2 className="text-lg font-semibold text-white">{data.name}</h2>
            <p className="font-mono text-sm text-neutral-400">{data.hex}</p>
          </div>
          <CopyButton text={data.hex} label="Hex" />
        </div>
      </div>

      {/* Additional color values */}
      {data.rgb && <ValueRow label="RGB" value={data.rgb} />}
      {data.hsl && <ValueRow label="HSL" value={data.hsl} />}

      {/* CSS / SCSS variables */}
      <ValueRow label="CSS Variable" value={cssVar} />
      <ValueRow label="SCSS Variable" value={scssVar} />
    </div>
  )
}
