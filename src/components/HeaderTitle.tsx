import {
	IonButton,
	IonButtons,
	IonContent,
	IonDatetime,
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
	const [value, setValue] = useState<string | number | undefined>(
		"javascript"
	);

	return (
		<>
			<IonHeader collapse="condense">
				<IonToolbar>
					<IonTitle
						id={hasModal ? "modalOpener" : undefined}
						style={{
							fontSize: "3rem",
							textTransform: "Capitalize",
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
			<IonModal ref={modal} trigger="modalOpener" initialBreakpoint={0.4}>
				<IonContent>
					<IonDatetime
						presentation="date"
						preferWheel={true}></IonDatetime>
				</IonContent>
			</IonModal>
		</>
	);
};

export default HeaderTitle;
