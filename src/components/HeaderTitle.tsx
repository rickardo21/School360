import {
	IonButton,
	IonButtons,
	IonHeader,
	IonIcon,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { calendarOutline } from "ionicons/icons";

interface HeaderTitleProps {
	title: string;
	calendar?: boolean | false;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({ title, calendar }) => {
	return (
		<IonHeader collapse="condense">
			<IonToolbar>
				<IonTitle
					style={{ fontSize: "3rem" }}
					size="large"
					color={"medium"}>
					{title}
				</IonTitle>
				{calendar && (
					<IonButtons class="" slot="end">
						<IonButton>
							<IonIcon
								slot="icon-only"
								size="medium"
								icon={calendarOutline}
								aria-hidden={true}
							/>
						</IonButton>
					</IonButtons>
				)}
			</IonToolbar>
		</IonHeader>
	);
};

export default HeaderTitle;
