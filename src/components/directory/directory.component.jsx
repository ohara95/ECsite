import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import MenuItem from "../menu-item/menu-item.component";
import { selectDirectorySections } from "../../redux/directory/directory.selector";

import "./directory.styles.scss";

const Directory = ({ sections }) => {
  return (
    <div className="directory-menu">
      {/* こういう書き方できるんですね */}
      {sections.map(({ id, ...other }) => (
        <MenuItem key={id} {...other} />
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
});

export default connect(mapStateToProps)(Directory);
