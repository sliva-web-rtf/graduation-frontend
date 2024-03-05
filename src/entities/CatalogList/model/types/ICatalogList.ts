import { ICatalogCard } from 'entities/CatalogCard/model/types/ICatalogCard';

export interface ICatalogList {
  readonly items: ICatalogCard[],
}
