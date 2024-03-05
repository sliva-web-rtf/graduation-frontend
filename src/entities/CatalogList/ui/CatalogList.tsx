import React, { FC } from 'react';
import { ICatalogCard } from 'entities/CatalogCard/model/types/ICatalogCard';
import { BaseList } from 'shared/ui/List/List';
import { ICatalogList } from '../model/types/ICatalogList';
import CatalogCard from '../../../entities/CatalogCard/ui/CatalogCard';

const CatalogList: FC<ICatalogList> = ({ items }) => (
  <BaseList
    className="catalog__list"
    items={items}
    render={(item: ICatalogCard) => <CatalogCard key={item.title} {...item} />}
  />
);

export default CatalogList;
