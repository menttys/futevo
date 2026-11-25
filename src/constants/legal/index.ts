import type { LegalDocument, LegalKind } from "@/@types/futevo"

import type { LanguageCode } from "@/i18n/i18n"

import { PRIVACY } from "./privacy"
import { TERMS } from "./terms"

export function getLegalDocument(kind: LegalKind, language: LanguageCode): LegalDocument {
  return (kind === "terms" ? TERMS : PRIVACY)[language]
}
