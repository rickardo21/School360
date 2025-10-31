import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../../components/ExploreContainer";
import "./TimeTablePage.css";

const TimeTablePage: React.FC = () => {
	return (
		<IonPage>
			<IonContent fullscreen>
				<ExploreContainer name="Tab 3 page" />
				<p>tab 4 content change</p>
			</IonContent>
		</IonPage>
	);
};

export default TimeTablePage;
