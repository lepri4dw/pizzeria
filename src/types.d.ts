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

// export interface Customer {
//   name: string;
//   address: string;
//   phone: string;
// }
//
  export interface ApiOrder {
    [id: string]: number;
  }
//
// export interface ApiOrdersList {
//   [id: string]: ApiOrder;
// }
//
// export interface Order extends ApiOrder {
//   id: string;
//   totalPrice: number;
// }
