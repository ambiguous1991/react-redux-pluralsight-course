import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authorActions from '../../redux/actions/authorActions';
import * as courseActions from '../../redux/actions/courseActions';
import CourseList from './CourseList';

class CoursesPage extends Component {
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

	render() {
		return (
			<>
				<h2>Courses</h2>
				<CourseList courses={this.props.courses} />
			</>
		);
	}
}

CoursesPage.propTypes = {
	authors: PropTypes.array.isRequired,
	courses: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired,
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
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
			loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
