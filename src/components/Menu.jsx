import React, { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Menu = memo(({ polls }) => {
	return (
		<aside className="menu">
			<ul className="menu-list">
				<p className="menu-label">Polls</p>
				{polls.map((poll, i) => {
					return (
						<li key={i}>
							<Link className="menu-label" to={`/poll/${i}`}>
								{`${i + 1}. ${poll.question} by ${poll.owner}`}
							</Link>
						</li>
					);
				})}
			</ul>
		</aside>
	);
});

Menu.propTypes = {
	polls: PropTypes.array.isRequired
};

Menu.defaultProps = {
	polls: []
};

export default Menu;
