import { Grade } from "../../types";
import { markColor } from "../../utils/utils";

interface GradeCardProps {
	item: Grade;
	index: number;
}

const GradeCard: React.FC<GradeCardProps> = ({ item, index }) => {
	return (
		<div key={index} className="grade-card">
			<div className="left-grade">
				<div className="grade-sub">{item.subjectDesc}</div>
				<div className="info-grade">
					{item.componentDesc} - {item.periodLabel}
				</div>
			</div>
			<div
				style={{
					color: item.canceled
						? "#18b2ff"
						: markColor(item.decimalValue),
				}}
				className="right-grade">
				{item.displayValue}
			</div>
		</div>
	);
};

export default GradeCard;
