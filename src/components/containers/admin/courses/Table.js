import React, {Component} from "react";
import {connect} from "react-redux";
import * as coursesActions from "../../../store/actions/index";

import MaterialTable from "material-table";
import localization from "../config/localization";

class Table extends Component {
  state = {
    columns: [
      {title: "Nombre", field: "nombre"},
      {title: "Descripción", field: "descripcion"}
    ]
  };

  render() {
    console.log(this.props.crs);
    return (
      <MaterialTable
        title="Gestión de Cursos"
        columns={this.state.columns}
        data={this.props.crs}
        editable={{
          onRowAdd: newData => {
            newData.ruta = `/${newData.nombre
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")}`;
            return this.props.onCourseCreated(newData);
          },
          onRowUpdate: (newData, oldData) => {
            return this.props.onCourseUpdated(oldData, newData);
          },
          onRowDelete: oldData => {
            return this.props.onCourseDelete(oldData);
          }
        }}
        localization={localization}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    crs: state.courses.courses
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCourseCreated: newData => dispatch(coursesActions.addCourses(newData)),
    onCourseUpdated: (oldData, newData) =>
      dispatch(coursesActions.putCourses(oldData, newData)),
    onCourseDelete: oldData => dispatch(coursesActions.removeCourses(oldData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
