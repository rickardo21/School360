import {
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonModal,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { calendar, calendarOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";

interface HeaderProps {
	title: string;
	hasModal?: boolean | false;
}

const HeaderTitle: React.FC<HeaderProps> = ({ title, hasModal }) => {
	const modal = useRef<HTMLIonModalElement>(null);
	const page = useRef(null);

	const [presentingElement, setPresentingElement] =
		useState<HTMLElement | null>(null);

	useEffect(() => {
		setPresentingElement(page.current);
	}, []);

	return (
		<>
			<IonHeader collapse="condense">
				<IonToolbar>
					<IonTitle
						id={hasModal ? "modalOpener" : undefined}
						style={{
							fontSize: "3rem",
							lineHeight: "1.2",
							cursor: "pointer",
							userSelect: "none",
							WebkitTapHighlightColor: "transparent",
						}}
						size="large"
						color="medium">
						{title}
					</IonTitle>
				</IonToolbar>
			</IonHeader>
			{/* modal da rivedere */}
			<IonModal
				ref={modal}
				trigger={`modalOpener`}
				presentingElement={presentingElement!}
				handleBehavior="cycle">
				<IonHeader>
					<IonToolbar>
						<IonTitle>Dettagli Lezione</IonTitle>
					</IonToolbar>
				</IonHeader>

				<IonContent className="ion-padding"></IonContent>
			</IonModal>
		</>
	);
};

export default HeaderTitle;
