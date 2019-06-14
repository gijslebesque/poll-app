import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NavBar = memo(({ toggleModal, userName, logout }) => {
	const [isActive, toggleBurger] = useState("");
	return (
		<nav>
			<span
				onClick={() => toggleBurger(!isActive ? "is-active" : "")}
				role="button"
				className={`navbar-burger burger ${isActive}`}
				aria-label="menu"
				aria-expanded="false"
			>
				<span aria-hidden="true" />
				<span aria-hidden="true" />
				<span aria-hidden="true" />
			</span>

			<div className={`navbar-menu ${isActive}`}>
				<div className="navbar-start">
					<Link className="navbar-item" to="/">
						Home
					</Link>

					<Link className="navbar-item" to="/create-poll">
						Create poll
					</Link>
				</div>

				<div className="navbar-end">
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

NavBar.propTypes = {
	toggleModal: PropTypes.func.isRequired,
	userName: PropTypes.string.isRequired,
	logout: PropTypes.func.isRequired
};

export default NavBar;
