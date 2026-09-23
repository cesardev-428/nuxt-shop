interface Tree {
  id: string;
  label: string;
  children?: Tree[] | null;
}

interface Product {
  id: Number;
  title: string;
  description: string;
  price: Number;
  tags: string[];
  thumbnail?: string;
  tag_id?: string[];
  created_at: string;
}
interface CartItem {
  product: Product;
  quantity: number;
}
interface cookieCart {
  id: Number;
}

interface Categorie {
  id: string;
  name: string;
  description: string;
  created_at: string;
  category_id: string;
}
interface Tag {
  id: string;
  name: string;
  created_at: string;
}
