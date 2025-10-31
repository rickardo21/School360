import { IonCard, IonCardContent, IonIcon } from "@ionic/react";
import { chevronForwardOutline } from "ionicons/icons";

interface WidgetCardProps {
	text: string;
}

import "../../pages/profile/ProfilePage.css";

const WidgetCard: React.FC<WidgetCardProps> = ({ text }) => {
	return (
		<div className="card--container">
			<IonCard button={true} className="card card--widget">
				<IonCardContent>
					<div className="content--card-widget">
						<span>{text}</span>
						<IonIcon
							ios={chevronForwardOutline}
							aria-hidden={true}
						/>
					</div>
				</IonCardContent>
			</IonCard>
		</div>
	);
};

export default WidgetCard;
