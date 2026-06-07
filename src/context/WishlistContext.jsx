import { createContext, useContext, useEffect, useMemo, useState } from "react";

const WishlistContext = createContext(null);
const WISHLIST_STORAGE_KEY = "style-store-wishlist";

function getStoredWishlistItems() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedItems = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
    return storedItems ? JSON.parse(storedItems) : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(getStoredWishlistItems);
  useEffect(() => {
    window.localStorage.setItem(
      WISHLIST_STORAGE_KEY,
      JSON.stringify(wishlistItems),
    );
  }, [wishlistItems]);

  function addToWishlist(productId) {
    setWishlistItems((currentItems) => {
      const isAlreadyInWishlist = currentItems.includes(productId);

      if (isAlreadyInWishlist) {
        return currentItems;
      }

      return [...currentItems, productId];
    });
  }

  function removeFromWishlist(productId) {
    setWishlistItems((currentItems) =>
      currentItems.filter((id) => id !== productId),
    );
  }

  function toggleWishlist(productId) {
    setWishlistItems((currentItems) => {
      const isAlreadyInWishlist = currentItems.includes(productId);

      if (isAlreadyInWishlist) {
        return currentItems.filter((id) => id !== productId);
      }

      return [...currentItems, productId];
    });
  }

  function isInWishlist(productId) {
    return wishlistItems.includes(productId);
  }

  const wishlistCount = useMemo(() => {
    return wishlistItems.length;
  }, [wishlistItems]);

  const value = {
    wishlistItems,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist باید داخل WishlistProvider استفاده شود.");
  }

  return context;
}
