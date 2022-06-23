import { useSearch } from '@faststore/sdk'
import { memo } from 'react'

import ProductGrid from 'src/components/product/ProductGrid'
import Sentinel from 'src/sdk/search/Sentinel'

import { useProducts } from './usePageProducts'

interface Props {
  page: number
  title: string
}

function GalleryPage({ page, title }: Props) {
  const products = useProducts(page) ?? []
  const { itemsPerPage } = useSearch()

  return (
    <>
      <Sentinel
        products={products}
        page={page}
        pageSize={itemsPerPage}
        title={title}
      />

      <ProductGrid
        key="product-grid"
        products={products}
        page={page}
        pageSize={itemsPerPage}
      />
    </>
  )
}

export default memo(GalleryPage)
