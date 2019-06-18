import React, { useState, memo, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
const appRoot = document.getElementById("root");

const Notification = memo(({ type, text }) => {
	const notificationEl = useRef(null);
	const [showNotification, toggleNotification] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			if (notificationEl.current) {
				notificationEl.current.style = "transform: translateX(120%)";
			}
		}, 2000);
	});

	return createPortal(
		<>
			{showNotification && (
				<div
					style={{ transform: "translateX(0%)" }}
					ref={notificationEl}
					className={`notification ${type}`}
				>
					<button
						className="delete"
						onClick={() => toggleNotification(false)}
					/>
					{text}
				</div>
			)}
		</>,
		appRoot
	);
});

Notification.propTypes = {
	type: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired
};

Notification.defaultProps = {
	type: "",
	text: ""
};

export default Notification;
