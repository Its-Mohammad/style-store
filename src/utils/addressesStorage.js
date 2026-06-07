const ADDRESSES_STORAGE_KEY = "style-store-addresses";

export function getStoredAddresses() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedAddresses = window.localStorage.getItem(ADDRESSES_STORAGE_KEY);
    return storedAddresses ? JSON.parse(storedAddresses) : [];
  } catch {
    return [];
  }
}

export function saveStoredAddresses(addresses) {
  window.localStorage.setItem(
    ADDRESSES_STORAGE_KEY,
    JSON.stringify(addresses),
  );
}
