import React from "react";
import PropTypes from "prop-types";

const Section = ({ title, subtitle, children, style }) => {
	return (
		<section className="section" style={style}>
			<div className="container">
				<h2 className="title">{title}</h2>
				<h3 className="subtitle">{subtitle}</h3>
				{children}
			</div>
		</section>
	);
};

Section.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
	style: PropTypes.object,
	children: PropTypes.any
};

export default Section;
