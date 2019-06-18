import React, { memo } from "react";
import PropTypes from "prop-types";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer
} from "recharts";

//Reducer to count votes
const reducer = (a, b = 0) => {
	if (typeof a === "object") {
		return a.vote + b.vote;
	}
	return a + b.vote;
};

const PollAnswers = memo(({ userAnswers }) => {
	const votes = userAnswers.length > 0 ? userAnswers.reduce(reducer) : 0;

	return (
		<div className="chart-container">
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
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
					<Bar dataKey="vote" fill="#b0e0e6" />
				</BarChart>
			</ResponsiveContainer>
			<p>Total votes: {votes}</p>
		</div>
	);
});

PollAnswers.prototype = {
	userAnswers: PropTypes.array.isRequired
};

export default PollAnswers;
