interface Tree {
  id: Number;
  label: string;
  children?: Tree[];
}

interface Product {
  id: Number;
  title: string;
  description: string;
  price: Number;
  tags: string[];
  thumbnail?: string;
}
interface CartItem {
  product: Product;
  quantity: number;
}
interface cookieCart {
  id: Number;
}
