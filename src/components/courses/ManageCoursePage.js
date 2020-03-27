import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { newCourse } from '../../../tools/mockData';
import { loadAuthors } from '../../redux/actions/authorActions';
import { loadCourses, saveCourse } from '../../redux/actions/courseActions';
import CourseForm from './CourseForm';

function ManageCoursePage({
    courses,
    authors,
    loadAuthors,
    loadCourses,
    saveCourse,
    ...props
}) {
    const [course, setCourse] = useState({ ...props.course });
    const [errors, setErrors] = useState({});

    useEffect(() => {
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
    }, []);

    const handleChange = event => {
        const { name, value } = event.target;
        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: name === 'authorId' ? parseInt(value, 10) : value,
        }));
    };

    const handleSave = event => {
        event.preventDefault();
        saveCourse(course);
    };

    return (
        <CourseForm
            course={course}
            errors={errors}
            authors={authors}
            onChange={handleChange}
            onSave={handleSave}
        />
    );
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    saveCourse: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        course: newCourse,
        courses: state.authors,
        authors: state.authors,
    };
}

const mapDispatchToProps = {
    loadCourses,
    loadAuthors,
    saveCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
