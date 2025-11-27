interface TimeTableCardProps {
	h: any;
}

const TimeTableCard: React.FC<TimeTableCardProps> = ({ h }) => {
	return (
		<div className="timeTableCard">
			<div className="left--timeTableCard">
				<span className="sub--timeTableCard">{h.subject}</span>
				<div className="bottom">
					<span>{h.classroom}</span>
				</div>
			</div>
			<div className="right--timeTableCard">
				<span>{h.time} </span>
			</div>
		</div>
	);
};

export default TimeTableCard;
