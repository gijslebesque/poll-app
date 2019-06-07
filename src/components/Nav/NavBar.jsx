import React from "react";
import { Link } from "react-router-dom";

const NavBar = props => {
	return (
		<nav>
			<div className="navbar-menu">
				<div className="navbar-start">
					<Link className="navbar-item" to="/">
						Home
					</Link>

					<Link className="navbar-item" to="/all-polls">
						All polls
					</Link>

					<Link className="navbar-item" to="create-poll">
						Create poll
					</Link>
				</div>

				<div class="navbar-end">
					<div className="navbar-item">
						<div className="buttons">
							<p className="button is-light">Log in</p>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
