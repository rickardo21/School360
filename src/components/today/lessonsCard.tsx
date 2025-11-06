import { Lesson } from "../../types";

interface LessonCardProps {
	index: number;
	item: Lesson;
	hasHour: boolean;
	hour?: number;
}

export const LessonCard: React.FC<LessonCardProps> = ({
	index,
	item,
	hasHour,
	hour,
}) => {
	return (
		<>
			<div id={`open-modal-${index}`} className="timeLineCard--container">
				<div className="timeLineCard" key={index}>
					<div className="title">
						<div className="type">
							{/* <div
							style={{
								background:
								item.lessonType == "Lezione"
								? "#1982c4"
								: "#ff595e",
								}}
								className="circle--type"></div> */}
							<span className="sub">
								{/* {item.subjectDesc.trim().split(" ").length >= 1
								? item.subjectDesc.trim().split(" ")[0] + "..."
								: item.subjectDesc} */}
								{item.subjectDesc}
							</span>
						</div>
						{/* <div className="duration">
						<IonIcon ios={timeOutline} aria-hidden={true} />
						<span>{item.evtHPos} ora</span>
						</div> */}
					</div>
					<div className="timeLineCard--content">
						<span>{item.lessonArg}</span>
					</div>
					<div className="timeLineCard--content --author">
						<span>-- {item.authorName}</span>
					</div>
				</div>
			</div>
		</>
	);
};
