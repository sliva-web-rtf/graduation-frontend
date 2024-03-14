export interface ICatalogCard {
  readonly title: string,
  readonly chips: string[],
  readonly image?: any,
  readonly subtitle?: string,
  readonly status?: boolean,
  readonly limit?: {
    current: number,
    max: number
  },
}
