interface Tree {
  id: string;
  label: string;
  children?: Tree[] | null;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  tags?: string[];
  thumbnail?: string;
  tag_id?: string[];
  category_id?: number | null;
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

interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface ProductSavePayload {
  id: number | null;
  title: string;
  description: string;
  price: number;
  thumbnail: string | null;
  category_id: number | null;
  tagIds: number[];
  newTagNames: string[];
}

interface CategorySavePayload {
  id: number | null;
  name: string;
  description: string;
  category_id: number | null;
}
