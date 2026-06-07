import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const CART_STORAGE_KEY = 'style-store-cart'

function getStoredCartItems() {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const storedItems = window.localStorage.getItem(CART_STORAGE_KEY)
    return storedItems ? JSON.parse(storedItems) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getStoredCartItems)

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  function addToCart(product, selectedColor, selectedSize, selectedImage) {
    const cartItemId = `${product.id}-${selectedColor}-${selectedSize}`

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.cartItemId === cartItemId
      )

      if (existingItem) {
        return currentItems.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      const newItem = {
        cartItemId,
        productId: product.id,
        title: product.title,
        brand: product.brand,
        price: product.price,
        discount: product.discount,
        image: selectedImage || product.image,
        color: selectedColor,
        size: selectedSize,
        quantity: 1,
      }

      return [...currentItems, newItem]
    })
  }

  function removeFromCart(cartItemId) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.cartItemId !== cartItemId)
    )
  }

  function increaseQuantity(cartItemId) {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  function decreaseQuantity(cartItemId) {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  function clearCart() {
    setCartItems([])
  }

  function getFinalPrice(item) {
    if (item.discount > 0) {
      return item.price - (item.price * item.discount) / 100
    }

    return item.price
  }

  const cartCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }, [cartItems])

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return total + getFinalPrice(item) * item.quantity
    }, 0)
  }, [cartItems])

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart باید داخل CartProvider استفاده شود.')
  }

  return context
}
