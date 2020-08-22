import React from "react";
import SHOT_DATA from "./shop.data";
import CollectionPreview from "../../components/collection-preview/collection-preview.component";

class ShopPage extends React.Component {
  constructor() {
    super();

    this.state = {
      collections: SHOT_DATA,
    };
  }

  render() {
    const { collections } = this.state;
    return (
      <div>
        {collections.map(({ id, ...other }) => (
          <CollectionPreview key={id} {...other} />
        ))}
      </div>
    );
  }
}

export default ShopPage;
