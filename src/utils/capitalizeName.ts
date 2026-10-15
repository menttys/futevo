// Title-cases every word ("joão silva" / "JOÃO SILVA" → "João Silva"). Whitespace
// is preserved so it is safe to run on every keystroke in a text input.
export function capitalizeName(value: string): string {
  return value
    .toLowerCase()
    .replace(/(^|\s)(\S)/gu, (_, space: string, char: string) => space + char.toUpperCase())
}
