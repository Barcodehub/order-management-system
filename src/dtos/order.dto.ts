export interface OrderItemDto {
  productId: string;
  quantity: number;
}

export interface CreateOrderDto {
  items: OrderItemDto[];
}

export interface OrderResponseDto {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  items: {
    product: {
      id: string;
      name: string;
      price: number;
      description?: string;
    };
    quantity: number;
    price: number;
  }[];
  total: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}