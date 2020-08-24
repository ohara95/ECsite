// メモ化
import { createSelector } from "reselect";

const selectCart = (state) => {
  return state.cart;
};

// 第一引数がstateのどのプロパティに依存するかを決める関数を取る
// 第二以降の引数ではその依存するプロパティから計算した値を返す関数を取る

// カートオブジェクトを取得
export const selectCartItems = createSelector(
  // 何故配列？
  [selectCart],
  // 戻り値を取得
  (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

// 最終的なカートアイテムの数を取得
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity,
      0
    )
);

// 合計金額
export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accumalatedQuantity, cartItem) =>
      accumalatedQuantity + cartItem.quantity * cartItem.price,
    0
  )
);
