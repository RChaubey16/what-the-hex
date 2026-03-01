const HEX_REGEX = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/

// check if the input is a valid hex code
export function isValidHex(input: string): boolean {
  return HEX_REGEX.test(input.trim())
}

// normalize the hex code
export function normalizeHex(input: string): string {
  let hex = input.trim().replace(/^#/, '').toUpperCase()
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('')
  }
  return `#${hex}`
}

// strip the hash from the hex code
export function stripHash(hex: string): string {
  return hex.replace(/^#/, '')
}

// normalize the color name
export function normalizeColorName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}
