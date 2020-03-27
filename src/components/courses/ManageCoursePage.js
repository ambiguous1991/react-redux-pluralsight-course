import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadAuthors } from '../../redux/actions/authorActions';
import { loadCourses } from '../../redux/actions/courseActions';

class ManageCoursePage extends Component {
    componentDidMount() {
        const { courses, authors, loadAuthors, loadCourses } = this.props;
        if (!courses.length) {
            loadCourses().catch(error => {
                alert(`Loading courses failed! ${error.message}`);
            });
        }

        if (!authors.length) {
            loadAuthors().catch(error => {
                alert(`Loading authors failed! ${error.message}`);
            });
        }
    }

    render() {
        return (
            <>
                <h2>Manage Course</h2>
            </>
        );
    }
}

ManageCoursePage.propTypes = {
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        courses: state.authors,
        authors: state.authors,
    };
}

const mapDispatchToProps = {
    loadCourses,
    loadAuthors,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
