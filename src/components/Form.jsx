import React from "react";
import PropTypes from "prop-types";

const Form = ({ children, name, icons }) => {
	return (
		<div className="field">
			<label className="label">{name}</label>
			<div className={`control ${icons}`}>{children}</div>
		</div>
	);
};

Form.prototype = {
	children: PropTypes.element.isRequired,
	name: PropTypes.string.isRequired,
	icons: PropTypes.string
};

export default Form;
