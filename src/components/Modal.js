import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ showModal, toggleModal, setUserName }) => {
	const [name, setName] = useState("");
	const isActive = showModal ? "is-active" : "";
	return (
		<div className={`modal ${isActive}`}>
			<div className="modal-background" />
			<div className="modal-content">
				<div className="field">
					<label className="label">Username</label>
					<div className="control has-icons-left">
						<input
							className="input is-success"
							type="text"
							name="userName"
							placeholder="Text input"
							value={name}
							onChange={e => setName(e.target.value)}
						/>
						<span className="icon is-small is-left">
							<FontAwesomeIcon icon={faUser} />
						</span>
					</div>
				</div>
				<button
					onClick={e => setUserName("userName", name)}
					className="button is-link"
				>
					Submit
				</button>
			</div>
			<button
				onClick={toggleModal}
				className="modal-close is-large"
				aria-label="close"
			/>
		</div>
	);
};

export default Modal;
