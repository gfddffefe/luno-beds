import { supabase } from '../supabase';
import { CartItem } from '../types';

export async function getCart(userId: string): Promise<CartItem[]> {
  const { data, error } = await supabase
    .from('cart_items')
    .select('*, product:products(*)')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching cart:', error);
    return [];
  }
  return data as CartItem[];
}

export async function addToCart(userId: string, productId: string, quantity: number = 1): Promise<CartItem | null> {
  // Try to find existing item first
  const { data: existing } = await supabase
    .from('cart_items')
    .select('*')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .single();

  if (existing) {
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity: existing.quantity + quantity })
      .eq('id', existing.id)
      .select('*, product:products(*)').single();
      
    if (error) {
      console.error('Error updating cart:', error);
      return null;
    }
    return data as CartItem;
  } else {
    const { data, error } = await supabase
      .from('cart_items')
      .insert({ user_id: userId, product_id: productId, quantity })
      .select('*, product:products(*)').single();

    if (error) {
      console.error('Error adding to cart:', error);
      return null;
    }
    return data as CartItem;
  }
}

export async function updateCartQuantity(cartItemId: string, quantity: number): Promise<boolean> {
  if (quantity <= 0) {
    return removeFromCart(cartItemId);
  }

  const { error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('id', cartItemId);

  if (error) {
    console.error('Error updating quantity:', error);
    return false;
  }
  return true;
}

export async function removeFromCart(cartItemId: string): Promise<boolean> {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', cartItemId);

  if (error) {
    console.error('Error removing from cart:', error);
    return false;
  }
  return true;
}

export async function clearCartFromDb(userId: string): Promise<boolean> {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', userId);

  if (error) {
    console.error('Error clearing cart:', error);
    return false;
  }
  return true;
}
