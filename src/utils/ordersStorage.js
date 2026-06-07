const ORDERS_STORAGE_KEY = "style-store-orders";

export function getStoredOrders() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedOrders = window.localStorage.getItem(ORDERS_STORAGE_KEY);
    return storedOrders ? JSON.parse(storedOrders) : [];
  } catch {
    return [];
  }
}

export function saveStoredOrder(order) {
  const currentOrders = getStoredOrders();
  const nextOrders = [order, ...currentOrders];

  window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(nextOrders));

  return nextOrders;
}

export function getStoredOrderById(orderId) {
  return getStoredOrders().find((order) => order.id === orderId) || null;
}
