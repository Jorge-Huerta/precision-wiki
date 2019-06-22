import React, {Component} from "react";
import Table from "./Table";

// import {connect} from "react-redux";
// import * as coursesActions from "../../../store/actions/index";

class FileManagement extends Component {
  render() {
    console.log("FileManagement", this.props);
    return <Table data={this.props} />;
  }
}

export default FileManagement;
