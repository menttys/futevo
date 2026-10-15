export type NewPlayerFormProps = {
  onSubmit: (params: {
    name: string
    photoUri?: string
    birthCountry?: string
    residencyCountry?: string
  }) => void
}
