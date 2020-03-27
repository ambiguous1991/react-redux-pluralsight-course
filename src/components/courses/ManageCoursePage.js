import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { newCourse } from '../../../tools/mockData';
import { loadAuthors } from '../../redux/actions/authorActions';
import { loadCourses, saveCourse } from '../../redux/actions/courseActions';
import CourseForm from './CourseForm';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

function ManageCoursePage({
    courses,
    authors,
    loadAuthors,
    loadCourses,
    saveCourse,
    history,
    ...props
}) {
    const [course, setCourse] = useState({ ...props.course });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!courses.length) {
            loadCourses().catch(error => {
                alert(`Loading courses failed! ${error.message}`);
            });
        } else {
            setCourse({ ...props.course });
        }

        if (!authors.length) {
            loadAuthors().catch(error => {
                alert(`Loading authors failed! ${error.message}`);
            });
        }
    }, [props.course]);

    const handleChange = event => {
        const { name, value } = event.target;
        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: name === 'authorId' ? parseInt(value, 10) : value,
        }));
    };

    const handleSave = event => {
        event.preventDefault();
        setSaving(true);
        saveCourse(course)
            .then(() => {
                toast.success('Course saved!');
                history.push('/courses');
            })
            .catch(error => {
                setSaving(false);
                setErrors({ onSave: error.message });
            });
    };

    return authors.length === 0 || courses.length === 0 ? (
        <Spinner />
    ) : (
        <CourseForm
            course={course}
            errors={errors}
            authors={authors}
            onChange={handleChange}
            onSave={handleSave}
            saving={saving}
        />
    );
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    saveCourse: PropTypes.func.isRequired,
};

function getCourseBySlug(courses, slug) {
    return courses.find(course => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
    const slug = ownProps.match.params.slug;
    const course =
        slug && state.courses.length
            ? getCourseBySlug(state.courses, slug)
            : newCourse;
    return {
        course,
        courses: state.courses,
        authors: state.authors,
    };
}

const mapDispatchToProps = {
    loadCourses,
    loadAuthors,
    saveCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
