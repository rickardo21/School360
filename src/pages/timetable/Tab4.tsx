import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../../components/ExploreContainer";
import "./Tab4.css";

const Tab4: React.FC = () => {
	return (
		<IonPage>
			<IonContent fullscreen>
				<ExploreContainer name="Tab 3 page" />
				<p>tab 4 content change</p>
			</IonContent>
		</IonPage>
	);
};

export default Tab4;
