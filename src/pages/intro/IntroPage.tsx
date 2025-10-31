import React from "react";
import {
	IonPage,
	IonContent,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonButton,
} from "@ionic/react";

interface IntroPageProps {
	onFinishIntro: () => void;
}

const IntroPage: React.FC<IntroPageProps> = ({ onFinishIntro }) => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Benvenuto!</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding" fullscreen>
				<h2>Introduzione alla nostra app</h2>
				<p>
					Qui puoi inserire una breve descrizione della tua app o un
					tutorial introduttivo, qualche slide o informazioni utili
					per l’utente.
				</p>
				<IonButton expand="block" onClick={onFinishIntro}>
					Inizia
				</IonButton>
			</IonContent>
		</IonPage>
	);
};

export default IntroPage;
