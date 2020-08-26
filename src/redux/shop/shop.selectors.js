import { createSelector } from "reselect";
import memoize from "lodash.memoize";

const COLLECTION_ID_MAP = {
  hats: 1,
  sneakers: 2,
  jackets: 3,
  womens: 4,
  mens: 5,
};

// 初期入力セレクタ宣言
const selectShop = (state) => state.shop;

// 選択したshopアイテムを取得
export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

// コレクションを選択し、新しいselectCollectinセレクターに渡すことで
// コレクションを上書き
// 別の関数を返す関数(カリー関数？)
export const selectCollection = memoize((collectionUrlParam) =>
  createSelector(
    [selectCollections],
    (collections) => collections[collectionUrlParam]
  )
);
