import { Button } from '@faststore/ui'
import { useState, useEffect, useCallback } from 'react'

import Icon from 'src/components/ui/Icon'

interface Props {
  sku: string
}

const WishlistButton = ({ sku }: Props) => {
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const storageWishlist = window.localStorage.getItem('wishlist')

    if (storageWishlist) {
      return JSON.parse(storageWishlist)
    }

    return []
  })

  const isSkuOnWishlist = useCallback(
    () => wishlist.some((wishlistItem: string) => sku === wishlistItem),
    [wishlist, sku]
  )

  useEffect(() => {
    window.localStorage.setItem('wishlist', JSON.stringify(wishlist))

    return () => clearInterval()
  }, [wishlist])

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    event.stopPropagation()

    if (isSkuOnWishlist()) {
      setWishlist((oldState) =>
        oldState.filter((listItem: string) => listItem !== sku)
      )

      return
    }

    setWishlist([...wishlist, sku])
  }

  return (
    <Button data-fs-product-card-wishlist onClick={handleClick}>
      <Icon
        name={isSkuOnWishlist() ? 'FilledHearth' : 'Hearth'}
        width={20}
        height={20}
        weight="bold"
        fill="red"
      />
    </Button>
  )
}

export default WishlistButton
