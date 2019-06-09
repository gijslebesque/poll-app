import React, { memo } from "react";
import PropTypes from "prop-types";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend
} from "recharts";
const PollAnswers = memo(({ userAnswers }) => {
	let voted = 0;
	if (userAnswers.length > 0) {
		voted = userAnswers.reduce((a, b) => a.voted + b.voted);
	}
	return (
		<section>
			<BarChart
				width={500}
				height={300}
				data={userAnswers}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="voted" fill="#b0e0e6" />
			</BarChart>
			<p>Total votes: {voted}</p>
		</section>
	);
});

PollAnswers.prototype = {
	userAnswers: PropTypes.array.isRequired
};

export default PollAnswers;
