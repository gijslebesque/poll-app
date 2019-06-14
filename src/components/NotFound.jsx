import React from "react";
import Section from "./Section";
import history from "../history";
const NotFound = () => {
	return (
		<Section title="404 Not found" subtitle="Sorry there's nothing here">
			<button className="button is-primary" onClick={() => history.push("/")}>
				Back home
			</button>
		</Section>
	);
};

export default NotFound;
