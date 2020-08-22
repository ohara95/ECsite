import React from "react";
import "./collection-preview.styles.scss";
import CollectionItem from "../collection-item/collectin-item.component";

const CollectionPreview = ({ title, items }) => {
  return (
    <div className="collection-preview">
      <h1 className="title">{title.toUpperCase()}</h1>
      <div className="preview">
        {items
          // 4つだけ表示する
          .filter((item, i) => i < 4)
          .map(({ id, ...other }) => (
            <CollectionItem key={id} {...other} />
          ))}
      </div>
    </div>
  );
};

export default CollectionPreview;
