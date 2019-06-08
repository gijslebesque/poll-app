import React, { useState } from "react";

const Notification = ({ type, text }) => {
	const [showNotification, toggleNotification] = useState(true);
	const [style, unMountStyle] = useState({});
	setTimeout(() => unMountStyle({ transform: "translateX(110%)" }), 2000);

	return (
		<>
			{showNotification && (
				<div style={style} className={`notification ${type}`}>
					<button
						className="delete"
						onClick={() => toggleNotification(false)}
					/>
					{text}
				</div>
			)}
		</>
	);
};

export default Notification;
