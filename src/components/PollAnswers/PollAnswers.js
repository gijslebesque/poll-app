import React, { Component } from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend
} from "recharts";
class PollAnswers extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const data = this.props.userAnswers;

		return (
			<section>
				<BarChart
					width={500}
					height={300}
					data={data}
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
			</section>
		);
	}
}

export default PollAnswers;
