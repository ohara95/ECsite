import { createSelector } from "reselect";
import memoize from "lodash.memoize";

// 初期入力セレクタ宣言
const selectShop = (state) => state.shop;

// 選択したshopアイテムを取得
export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

// オブジェクトを配列に変換
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) => Object.keys(collections).map((key) => collections[key])
);

// コレクションを選択し、新しいselectCollectinセレクターに渡すことで
// コレクションを上書き
// 別の関数を返す関数(カリー関数)
// memoize?!
export const selectCollection = memoize((collectionUrlParam) =>
  createSelector(
    [selectCollections],
    (collections) => collections[collectionUrlParam]
  )
);
