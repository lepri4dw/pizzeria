export interface Dish {
  id: string;
  name: string;
  image: string;
  price: number;
}

export type ApiDish = Omit<Dish, 'id'>;

export interface ApiDishesList {
  [id: string]: ApiDish;
}

export interface DishMutation {
  name: string;
  image: string;
  price: string;
}

export interface CartDish {
  dish: Dish;
  amount: number;
}

export interface ApiOrder {
  [id: string]: number
}

export interface OrderMutation {
  dishes: ApiOrder,
  orderId: string;
}

export interface ApiOrdersList {
  [id: string]: ApiOrder;
}

export interface OrderDish {
  id: string;
  name: string;
  price: number;
  amount: number;
}

export interface Order {
  dishes: OrderDish[],
  orderId: string,
}
