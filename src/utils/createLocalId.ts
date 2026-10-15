// A short random id for objects nested inside a Firestore document (e.g. a
// point inside a match) that don't need Firestore's own doc-id allocator.
export function createLocalId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}
