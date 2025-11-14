import { IonContent, IonPage } from "@ionic/react";
import HeaderTitle from "../../components/HeaderTitle";
import SummaryCard from "../../components/profile/summaryCard";
import PanoramicCard from "../../components/profile/panoramicCard";
import WidgetCard from "../../components/profile/widgetCard";

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
					<WidgetCard text="Compiti" />
					<WidgetCard text="Bacheca" />
					<WidgetCard text="Note" />
					<WidgetCard text="Colloqui" />
					<WidgetCard text="Scrutini" />
				</div>
			</IonContent>
		</IonPage>
	);
};

export default ProfilePage;
