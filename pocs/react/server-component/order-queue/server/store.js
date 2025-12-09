// Simple in-memory store and ETA logic

export const MENU = [
  { id: "pizza", name: "Margherita Pizza", minutes: 7 },
  { id: "pasta", name: "Pasta Carbonara", minutes: 5 },
  { id: "salad", name: "Caesar Salad", minutes: 3 },
  { id: "burger", name: "Cheeseburger", minutes: 8 },
  { id: "soup", name: "Tomato Soup", minutes: 4 }
];

const menuById = new Map(MENU.map((m) => [m.id, m]));

let nextOrderId = 1;
/** @type {{ id: number; dishId: string; submittedAt: number }[]} */
let ORDERS = [];

export function getMenu() {
  return MENU;
}

export function addOrder(dishId) {
  if (!menuById.has(dishId)) {
    throw new Error(`Unknown dish: ${dishId}`);
  }
  const order = { id: nextOrderId++, dishId, submittedAt: Date.now() };
  ORDERS.push(order);
  return order;
}

export function clearAll() {
  ORDERS = [];
  nextOrderId = 1;
}

export function getOrders() {
  return [...ORDERS];
}

export function getQueueWithETAs(now = Date.now()) {
  // Flatten each order as a single preparation task (one dish per order)
  // The ETA is cumulative prep time of all tasks before it + its own time.
  let cumulative = 0;
  const tasks = ORDERS.map((order, index) => {
    const dish = menuById.get(order.dishId);
    const startOffset = cumulative; // minutes before this task starts
    cumulative += dish.minutes;
    const readyOffset = startOffset + dish.minutes; // minutes until ready from now
    return {
      position: index + 1,
      orderId: order.id,
      dishId: dish.id,
      dishName: dish.name,
      prepMinutes: dish.minutes,
      readyInMinutes: readyOffset,
      submittedAt: order.submittedAt,
    };
  });
  const totalBacklogMinutes = tasks.reduce((acc, t) => acc + t.prepMinutes, 0);
  return {
    now,
    tasks,
    totalBacklogMinutes,
  };
}

