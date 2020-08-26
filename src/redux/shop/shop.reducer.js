import SHOP_DATA from "./shop.data";

const INITIAL_STATE = {
  collections: SHOP_DATA,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  // 変更がない為defaultのみ使用
  switch (action.type) {
    default:
      return state;
  }
};

export default shopReducer;
