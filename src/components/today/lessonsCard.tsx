import { timeOutline } from "ionicons/icons";
import { Lesson } from "../../types";
import { IonIcon } from "@ionic/react";

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
		<div className="timeLineCard--container">
			<div className="line">
				<span>{hasHour ? (hour ? `${hour}:00` : ``) : ""}</span>
			</div>
			<div className="timeLineCard" key={index}>
				<div className="title">
					<div className="type">
						<div
							style={{
								background:
									item.lessonType == "Lezione"
										? "#1982c4"
										: "#ff595e",
							}}
							className="circle--type"></div>
						<span className="sub">
							{item.subjectDesc.trim().split(" ").length >= 1
								? item.subjectDesc.trim().split(" ")[0] + "..."
								: item.subjectDesc}
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
			</div>
		</div>
	);
};
