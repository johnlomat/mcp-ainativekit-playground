import React from 'react'
import { SummaryCard, Carousel } from '@ainativekit/ui'
import { Product, ProductsWidgetProps } from './types'
import { formatPrice, stripHtml } from '@/lib/utils'

const productToCard = (product: Product) => {
  const price = formatPrice(product.prices.price, product.prices)
  const subtitle = product.on_sale
    ? `${price} (Sale)`
    : price

  const metadata = []
  if (product.average_rating !== '0') {
    metadata.push({ label: `${product.average_rating} (${product.review_count})` })
  }
  if (product.categories[0]) {
    metadata.push({ label: stripHtml(product.categories[0].name) })
  }

  return (
    <SummaryCard
      key={product.id}
      images={product.images[0] ? { src: product.images[0].src, alt: product.images[0].alt || product.name } : undefined}
      title={stripHtml(product.name)}
      subtitle={subtitle}
      badge={product.on_sale ? 'Sale' : undefined}
      badgeColor="success"
      description={stripHtml(product.short_description).slice(0, 120)}
      descriptionLines={2}
      metadata={metadata.length > 0 ? metadata : undefined}
      imageAspectRatio="4/3"
      size="compact"
    />
  )
}

export const ProductsWidget: React.FC<ProductsWidgetProps> = ({ products }) => {
  if (!products || products.length === 0) {
    return <Carousel emptyTitle="No Products Found" emptyMessage="Try a different search term or category." />
  }

  if (products.length === 1) {
    return productToCard(products[0])
  }

  return (
    <Carousel showNavigation showEdgeGradients>
      {products.map(productToCard)}
    </Carousel>
  )
}

export * from './types'
