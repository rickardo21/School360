import { useRef, useState } from "react";
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
	IonPopover,
} from "@ionic/react";
import { useClient } from "../../provider/clientProvider";
import { Grade } from "../../types";
import GradeCard from "../../components/profile/gradeCard";
import { calcolaMedia, markColor } from "../../utils/utils";

const GradePage: React.FC = () => {
	const [segment, setSegment] = useState("tutti");

	// Esempio dati
	const client = useClient();
	const voti = client.UserModel!.grades.grades;

	const materie = [...new Set(voti.map((voto) => voto.subjectDesc))];

	const [selectedSub, setSelectedSub] = useState(0);
	const [popoverOpen, setPopoverOpen] = useState(false);

	return (
		<IonPage>
			<IonHeader collapse="condense">
				<IonToolbar>
					<IonButtons slot="start">
						<IonButton
							color={"dark"}
							onClick={() => history.back()}>
							Back
						</IonButton>
					</IonButtons>

					<IonTitle
						id="popover-trigger"
						onClick={() => {
							if (segment === "materia") {
								setPopoverOpen(!popoverOpen);
							}
						}}>
						{segment === "materia" ? materie[selectedSub] : "Voti"}
					</IonTitle>
				</IonToolbar>
				<div className="segment">
					<IonSegment
						value={segment}
						onIonChange={(e: any) => setSegment(e.detail.value!)}>
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
							return <GradeCard item={item} index={index} />;
						})
					) : (
						<>
							<IonPopover
								arrow={false}
								animated={true}
								translucent={true}
								showBackdrop={true}
								backdropDismiss={true}
								isOpen={popoverOpen}
								onDidDismiss={() => setPopoverOpen(false)}
								trigger={"popover-trigger"}
								size="auto"
								side="bottom" // Per posizionarlo sotto il bottone
								alignment="center" // Centra rispetto al bottone
							>
								<IonList>
									{materie.map((m: string, index) => (
										<IonItem
											className="listItem"
											onClick={() => {
												setPopoverOpen(false);
												setSelectedSub(index);
											}}>
											<div
												style={{
													padding: "10px",
												}}>
												{m}
											</div>
										</IonItem>
									))}
								</IonList>
							</IonPopover>
							<div className="materia--container">
								<div className="materia--votiSection">
									<div className="media--inner-row ">
										<span className="media-voti">
											{calcolaMedia({
												grades: voti.filter(
													(voto) =>
														voto.subjectDesc ===
														materie[selectedSub]
												),
											})}
										</span>
										<span className="tot-voti">/ 10</span>
									</div>
									<span className="materia--votiSection--title">
										Voti
									</span>
									{voti
										.filter(
											(voto) =>
												voto.subjectDesc ===
												materie[selectedSub]
										)
										.map((v, index) => {
											return (
												<div
													key={index}
													className="materia-grade">
													<div
														style={{
															color: v.canceled
																? "#18b2ff"
																: markColor(
																		v.decimalValue
																  ),
														}}
														className="materia-grade--left">
														{v.displayValue}
													</div>
													<div className="materia-grade--right">
														<span className="type">
															{v.componentDesc}
														</span>
														<div className="materia-grade--bottom">
															<div className="status">
																<span>
																	{v.evtDate}
																</span>
																<span>-</span>
																<span>
																	{
																		v.periodLabel
																	}
																</span>
															</div>
														</div>
													</div>
												</div>
											);
										})}
								</div>
							</div>
						</>
					)}
				</div>
			</IonContent>
		</IonPage>
	);
};

export default GradePage;
