import {
	IonContent,
	IonHeader,
	IonIcon,
	IonModal,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { Lesson } from "../../types";
import { LessonCard } from "./lessonsCard";
import { timeOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { useClient } from "../../provider/clientProvider";
import { formatDate } from "../../utils/utils";

const LessonSection: React.FC = () => {
	const client = useClient();
	const data = client.UserModel?.lessons;

	const modal = useRef<HTMLIonModalElement>(null);

	const page = useRef(null);

	const [presentingElement, setPresentingElement] =
		useState<HTMLElement | null>(null);

	useEffect(() => {
		setPresentingElement(page.current);
	}, []);

	let ore = 7;
	let lastOurPos = 0;

	return (
		<div>
			<div
				style={{
					padding: "0px 20px",
					fontSize: "1.5rem",
					fontWeight: "600",
				}}>
				Lezioni
			</div>
			{data!.lessons.length > 0 ? (
				<div className="timeLine">
					{data?.lessons?.map((item: Lesson, index) => {
						let hasHour = false;

						if (item.evtHPos != lastOurPos) {
							lastOurPos = item.evtHPos;
							ore += item.evtDuration;
							hasHour = true;
						}

						return (
							<div style={{ width: "100%" }} key={index}>
								{hasHour && (
									<div className="divider--hour">
										<span>{ore}:00</span>
										<div className="divider--hour-line"></div>
									</div>
								)}
								<LessonCard
									index={index}
									item={item}
									hasHour={hasHour}
									hour={ore}
								/>
								<IonModal
									ref={modal}
									trigger={`open-modal-${index}`}
									presentingElement={presentingElement!}
									// initialBreakpoint={0.95}
									// breakpoints={[0.95]}
									handleBehavior="cycle">
									<IonHeader>
										<IonToolbar>
											<IonTitle>
												Dettagli Lezione
											</IonTitle>
										</IonToolbar>
									</IonHeader>

									<IonContent className="ion-padding">
										<div className="info-card">
											<div className="info-row">
												<span className="info-label">
													Materia
												</span>
												<span className="info-value">
													{item.subjectDesc}
												</span>
											</div>
											<div className="info-row">
												<span className="info-label">
													Classe
												</span>
												<span className="info-value">
													<span className="badge badge-indigo">
														{item.classDesc}
													</span>
												</span>
											</div>
											<div className="info-row">
												<span className="info-label">
													Docente
												</span>
												<span className="info-value">
													Prof. {item.authorName}
												</span>
											</div>
										</div>
										<div className="info-card">
											<div className="info-row">
												<span className="info-label">
													Data
												</span>
												<span className="info-value">
													{formatDate(item.evtDate)}
												</span>
											</div>
											<div className="info-row">
												<span className="info-label">
													Ora
												</span>
												<span className="info-value time-badge">
													<IonIcon
														ios={timeOutline}
													/>
													{item.evtHPos}ª ora
												</span>
											</div>
											<div className="info-row">
												<span className="info-label">
													Durata
												</span>
												<span className="info-value">
													{item.evtDuration} ora
												</span>
											</div>
											<div className="info-row">
												<span className="info-label">
													Tipo
												</span>
												<span className="info-value">
													<span className="badge badge-success">
														{item.lessonType}
													</span>
												</span>
											</div>
										</div>

										<p className="section-title">
											Argomento della lezione
										</p>
										<div className="lesson-description">
											<p className="lesson-description-text">
												{item.lessonArg}
											</p>
										</div>
									</IonContent>
								</IonModal>
							</div>
						);
					})}
				</div>
			) : (
				<div className="no-lesson">
					<div>non sono presenti lezioni</div>
				</div>
			)}
		</div>
	);
};

export default LessonSection;
