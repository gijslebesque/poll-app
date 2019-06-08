import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Form from "./Form";

const Modal = ({ toggleModal, setUserName }) => {
	const [name, setName] = useState("");

	return (
		<div className={`modal is-active`}>
			<div className="modal-background" />
			<div className="modal-content">
				<Form label="Username" icons="has-icons-left">
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
				</Form>
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
