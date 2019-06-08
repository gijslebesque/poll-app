import React, { memo } from "react";
import { Link } from "react-router-dom";

const NavBar = memo(({ toggleModal, userName, logout }) => {
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
							{userName && (
								<p className="button is-light" onClick={logout}>
									Logout
								</p>
							)}
							{!userName && (
								<p className="button is-light" onClick={toggleModal}>
									Log in
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
});

export default NavBar;
