import React, {Component} from "react";

import {connect} from "react-redux";
import * as filesActions from "../../../store/actions/index";

import MaterialTable from "material-table";
import localization from "../config/localization"

class Table extends Component {
  state = {
    columns: [
      {title: "Título", field: "nombre"},
      {title: "Link archivo", field: "link_archivo"},
      {title: "Link video", field: "link_video"}
    ]
  };

  componentDidMount() {
    this.props.onInitFiles(this.props.data.data.id);
  }

  render() {
    return (
      <MaterialTable
        title={`Asociar link: ${this.props.data.data.nombre}`}
        columns={this.state.columns}
        data={this.props.files}
        parentChildData={(row, rows) =>
          rows.find(topics => topics.id === row.parentId)
        }
        editable={{
          onRowAdd: newData => {
            newData.id_curso = this.props.data.data.id;
            return this.props.onFilesCreated(newData);
          },
          onRowUpdate: (newData, oldData) => {
            return this.props.onFilesUpdated(newData, oldData);
          },
          onRowDelete: oldData => {
            return this.props.onFilesDelete(oldData);
          }
        }}
        localization={localization}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    files: state.files.files,
    token: state.auth.decodedToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitFiles: userId => dispatch(filesActions.initFiles(userId)),
    onFilesCreated: newData => dispatch(filesActions.addFiles(newData)),
    onFilesUpdated: (oldData, newData) =>
      dispatch(filesActions.putFiles(oldData, newData)),
    onFilesDelete: oldData => dispatch(filesActions.removeFiles(oldData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
