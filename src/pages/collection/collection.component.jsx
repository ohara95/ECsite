import React from "react";
import { connect } from "react-redux";
import CollectionItem from "../../components/collection-item/collection-item.component";
import { selectCollection } from "../../redux/shop/shop.selectors";

import "./collection.styles.scss";

// state > shop > collections
const CollectionPage = ({ collection }) => {
  const { title, items } = collection;
  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

// 第二引数:ラップしているコンポーネントのprops
// このコンポーネントで取得している全てのpropsが得られる
const mapStateToProps = (state, ownProps) => {
  return {
    // URLパラメーターに応じてstateの一部を必要とする為
    // selectコレクションを呼び出した後にstateを渡す
    collection: selectCollection(ownProps.match.params.collectionId)(state),
  };
};

export default connect(mapStateToProps)(CollectionPage);
