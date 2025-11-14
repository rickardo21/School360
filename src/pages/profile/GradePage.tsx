import { useState } from "react";
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonSegment,
	IonSegmentButton,
	IonLabel,
	IonList,
	IonItem,
	IonButton,
	IonButtons,
	IonCard,
	IonCardContent,
} from "@ionic/react";
import { useClient } from "../../provider/clientProvider";
import { Grade } from "../../types";
import { markColor } from "../../utils/utils";

const GradePage: React.FC = () => {
	const [segment, setSegment] = useState("tutti");

	// Esempio dati
	const client = useClient();
	const voti = client.UserModel!.grades.grades;

	return (
		<IonPage>
			<IonHeader translucent>
				<IonToolbar>
					<IonButtons slot="start">
						<IonButton
							color={"dark"}
							onClick={() => history.back()}>
							Back
						</IonButton>
					</IonButtons>
					<IonTitle>Voti</IonTitle>
				</IonToolbar>
				<div className="segment">
					<IonSegment
						value={segment}
						onIonChange={(e: any) => setSegment(e.detail.value!)}
						mode="ios">
						<IonSegmentButton value="tutti" mode="ios">
							<IonLabel>Tutti i voti</IonLabel>
						</IonSegmentButton>
						<IonSegmentButton value="materia" mode="ios">
							<IonLabel>Per materia</IonLabel>
						</IonSegmentButton>
					</IonSegment>
				</div>
			</IonHeader>
			<IonContent>
				<div className="grade-container">
					{segment == "tutti" ? (
						voti.map((item: Grade, index) => {
							return (
								<div key={index} className="grade-card">
									<div className="left-grade">
										<div className="grade-sub">
											{item.subjectDesc}
										</div>
										<div className="info-grade">
											{item.componentDesc} -{" "}
											{item.periodLabel}
										</div>
									</div>
									<div
										style={{
											color: item.canceled
												? "#18b2ff"
												: markColor(item.decimalValue),
										}}
										className="right-grade">
										{item.displayValue}
									</div>
								</div>
							);
						})
					) : (
						<div></div>
					)}
				</div>
			</IonContent>
		</IonPage>
	);
};

export default GradePage;
