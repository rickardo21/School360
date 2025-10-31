import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../../components/ExploreContainer";
import "./SettingsPage.css";

const SettingsPage: React.FC = () => {
	return (
		<IonPage>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Tab 5</IonTitle>
					</IonToolbar>
				</IonHeader>
				<ExploreContainer name="Tab 3 page" />
			</IonContent>
		</IonPage>
	);
};

export default SettingsPage;
