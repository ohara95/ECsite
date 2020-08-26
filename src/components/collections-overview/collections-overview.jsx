import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CollectionPreview from "../collection-preview/collection-preview.component";
import { selectCollectionsForPreview } from "../../redux/shop/shop.selectors";

import "./collections-overview.styles.scss";

// {history: {…}, location: {…}, match: {…}, staticContext: undefined, collections: Array(5), …}
const CollectionsOverview = ({ collections }) => (
  <div className="collections-overview">
    {collections.map(({ id, ...other }) => (
      <CollectionPreview key={id} {...other} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  // 変数名が入る
  collections: selectCollectionsForPreview,
});

export default connect(mapStateToProps)(CollectionsOverview);
