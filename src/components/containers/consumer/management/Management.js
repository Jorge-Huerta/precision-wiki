import React, {Component} from "react";

import {connect} from "react-redux";
import * as userCoursesActions from "../../../store/actions/index";

import MaterialTable from "material-table";

class Management extends Component {
  state = {
    columns: [
      {title: "Nombre", field: "nombre"},
      {title: "Descripción", field: "descripcion"}
    ]
  };

  componentDidMount() {
    this.props.onInitCourses();
  }

  render() {
    return (
      <MaterialTable
        title="Inscripción de Cursos"
        columns={this.state.columns}
        data={this.props.crs}
        actions={[
          {
            icon: "library_add",
            tooltip: "Inscribir Curso",
            onClick: (event, rowData) => {
              this.props.onTakeCourses(this.props.token.id, rowData.id);
            }
          }
        ]}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.decodedToken,
    crs: state.userCourses.courses
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitCourses: () => dispatch(userCoursesActions.initUserCourses()),
    onTakeCourses: (userId, courseId) =>
      dispatch(userCoursesActions.addUserCourses(userId, courseId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Management);
