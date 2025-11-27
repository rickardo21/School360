import { IonContent, IonPage, IonSpinner } from "@ionic/react";
import "./SplashPage.css";

const SplashPage: React.FC = () => {
	return (
		<IonPage>
			<IonContent fullscreen>
				<div className="splash-container">
					<span className="splash-title">School360</span>
					<IonSpinner name="crescent" />
				</div>
			</IonContent>
		</IonPage>
	);
};

export default SplashPage;
