import React, { useEffect, useState } from "react";

function Carousel(props) {
	// const [active, setActive] = React.useState(0);
	// let scrollInterval = null;
	const style = {
		carousel: {
			position: "relative"
		},
		carouselItem: {
			position: "absolute",
			visibility: "hidden"
		},
		visible: {
			visibility: "visible"
		}
	};
	const { children, active, ...rest } = props;

	// useEffect(() => {
	// 	const scrollInterval = setTimeout(() => {
	// 		const { children } = props;
	// 		setActive((active + 1) % children.length);
	// 	}, 2000);
	// });
	// const { carouselItems, ...rest } = props;
	return (
		<div style={style.carousel}>
			{children.map((item, index) => {
				const activeStyle = active === index ? style.visible : {};
				return React.cloneElement(item, {
					...rest,
					style: {
						...style.carouselItem,
						...activeStyle
					}
				});
			})}
		</div>
	);
}

export default Carousel;
