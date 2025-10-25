import {
	IonContent,
	IonFab,
	IonFabButton,
	IonIcon,
	IonPage,
} from "@ionic/react";
import HeaderTitle from "../../components/HeaderTitle";
import SummaryCard from "../../components/profile/summaryCard";
import PanoramicCard from "../../components/profile/panoramicCard";
import WidgetCard from "../../components/profile/widgetCard";
import { cogOutline } from "ionicons/icons";

const ProfilePage: React.FC = () => {
	return (
		<IonPage>
			<HeaderTitle title="Profile" />
			<IonContent fullscreen>
				<SummaryCard />
				<PanoramicCard />
				<div
					style={{ paddingBottom: "20px" }}
					className="card--container">
					<WidgetCard text="colloqui" />
					<WidgetCard text="Agenda" />
					<WidgetCard text="scrutini" />
					<WidgetCard text="note" />
					<WidgetCard text="classeviva web" />
				</div>
			</IonContent>
		</IonPage>
	);
};

export default ProfilePage;
