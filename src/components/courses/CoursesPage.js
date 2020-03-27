import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import * as authorActions from '../../redux/actions/authorActions';
import * as courseActions from '../../redux/actions/courseActions';
import Spinner from '../common/Spinner';
import CourseList from './CourseList';

class CoursesPage extends Component {
    state = {
        redirectToAddCoursePage: false,
    };

    componentDidMount() {
        const { courses, authors, actions } = this.props;
        if (!courses.length) {
            actions.loadCourses().catch(error => {
                alert(`Loading courses failed! ${error.message}`);
            });
        }

        if (!authors.length) {
            actions.loadAuthors().catch(error => {
                alert(`Loading authors failed! ${error.message}`);
            });
        }
    }

    handleDeleteCourse = async course => {
        toast.success('Course deleted');
        try {
            await this.props.actions.deleteCourse(course);
        } catch ({ message }) {
            toast.error(`Delete failed. ${message} `, {
                autoClose: false,
            });
        }
    };

    render() {
        return (
            <>
                {this.state.redirectToAddCoursePage && (
                    <Redirect to="/course" />
                )}
                <h2>Courses</h2>
                {this.props.loading ? (
                    <Spinner />
                ) : (
                    <>
                        <button
                            style={{ marginBottom: 20 }}
                            className="btn btn-primary add-course"
                            onClick={() =>
                                this.setState({ redirectToAddCoursePage: true })
                            }>
                            Add Course
                        </button>

                        <CourseList
                            onDeleteClick={this.handleDeleteCourse}
                            courses={this.props.courses}
                        />
                    </>
                )}
            </>
        );
    }
}

CoursesPage.propTypes = {
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        courses: !state.authors.length
            ? []
            : state.courses.map(course => {
                  return {
                      ...course,
                      authorName: state.authors.find(
                          author => author.id === course.authorId
                      ).name,
                  };
              }),
        authors: state.authors,
        loading: !!state.apiCallsInProgress,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadCourses: bindActionCreators(
                courseActions.loadCourses,
                dispatch
            ),
            loadAuthors: bindActionCreators(
                authorActions.loadAuthors,
                dispatch
            ),
            deleteCourse: bindActionCreators(
                courseActions.deleteCourse,
                dispatch
            ),
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
