import React, {Component} from "react";

import {connect} from "react-redux";
import * as filesActions from "../../../store/actions/index";

import MaterialTable from "material-table";

class Table extends Component {
  state = {
    columns: [
      {title: "Título", field: "titulo"},
      {title: "Link archivo", field: "descripcion"},
      {title: "Link video", field: "contenido"}
    ]
  };

  componentDidMount() {
    this.props.onInitFiles(this.props.data.data.id);
    console.log("los links son:", this.props.files);
  }

  render() {
    console.log("la id es", this.props.data.data.id);
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
            newData.id_usuario = this.props.data.data.id;
            this.props.onFilesCreated(newData);
          },
          onRowUpdate: (newData, oldData) => {
            this.props.onFilesUpdated(newData, oldData);
          },
          onRowDelete: oldData => {
            this.props.onFilesDelete(oldData);
          }
        }}
        localization={{
          toolbar: {
            searchTooltip: "Buscar",
            searchPlaceholder: "Buscar..."
          },
          header: {
            actions: "Acciones"
          },
          body: {
            emptyDataSourceMessage: "No hay datos disponibles",
            filterRow: {
              filterTooltip: "Filtrar"
            }
          },
          pagination: {
            labelRowsSelect: "Filas",
            labelDisplayedRows: " {from}-{to} de {count}",
            firstTooltip: "Ir al inicio",
            previousTooltip: "Página anterior",
            nextTooltip: "Página siguiente",
            lastTooltip: "Ir al final"
          }
        }}
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
