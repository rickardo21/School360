import {
	IonContent,
	IonFab,
	IonFabButton,
	IonIcon,
	IonPage,
} from "@ionic/react";
import "./Tab1.css";
import HeaderTitle from "../../components/HeaderTitle";

const Tab1: React.FC = () => {
	return (
		<IonPage>
			<IonContent fullscreen>
				<HeaderTitle title="Today" calendar={true} />
			</IonContent>
		</IonPage>
	);
};

export default Tab1;
