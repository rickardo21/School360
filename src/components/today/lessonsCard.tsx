import { Lesson } from "../../types";

interface LessonCardProps {
	index: number;
	item: Lesson;
}

export const LessonCard: React.FC<LessonCardProps> = ({ index, item }) => {
	return (
		<>
			<div id={`open-modal-${index}`} className="timeLineCard--container">
				<div className="timeLineCard" key={index}>
					<div className="title">
						<div className="type">
							<span className="sub">{item.subjectDesc}</span>
						</div>
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
