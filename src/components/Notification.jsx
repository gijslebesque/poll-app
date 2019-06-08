import React from "react";

const Notification = ({ type }) => {
	return (
		<div className={`notification ${type}`}>
			<button className="delete" />
			Primar lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum
			dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut,
			porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam
			gravida purus diam, et dictumefficitur. Sit amet, consectetur adipiscing
			elit
		</div>
	);
};

export default Notification;
