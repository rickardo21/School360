import {
	IonCard,
	IonContent,
	IonHeader,
	IonIcon,
	IonItem,
	IonLabel,
	IonModal,
	IonPage,
	IonRefresher,
	IonRefresherContent,
	IonTitle,
	IonToolbar,
	useIonViewWillEnter,
} from "@ionic/react";
import "./TodayPage.css";
import HeaderTitle from "../../components/HeaderTitle";
import { Lesson, Lessons } from "../../types";
import { useEffect, useRef, useState } from "react";
import { LessonCard } from "../../components/today/lessonsCard";
import { useClient } from "../../provider/clientProvider";
import { timeOutline } from "ionicons/icons";

const TodayPage: React.FC = () => {
	const client = useClient();

	const [data, setData] = useState<Lessons | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const getData = async () => {
		try {
			setLoading(true);
			setError(null);

			const today = new Date();
			const dateString = today
				.toISOString()
				.split("T")[0]
				.replace(/-/g, "");

			const res = await client.lessons({ date: dateString });

			if (res.status === 200) setData(res.data);
		} catch (err: any) {
			setError(
				err.message || "Errore durante il caricamento delle lezioni"
			);
		} finally {
			setLoading(false);
		}
	};

	useIonViewWillEnter(() => {
		getData();
	});

	const modal = useRef<HTMLIonModalElement>(null);
	const page = useRef(null);

	const [presentingElement, setPresentingElement] =
		useState<HTMLElement | null>(null);

	useEffect(() => {
		setPresentingElement(page.current);
	}, []);

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("it-IT", {
			day: "numeric",
			month: "long",
			year: "numeric",
		});
	};

	const handleRefresh = async (event: CustomEvent) => {
		await getData();
		event.detail.complete();
	};

	if (loading) {
		return (
			<IonPage>
				<HeaderTitle title="Today" hasModal={true} />
				<IonContent fullscreen>
					<div className="ion-padding ion-text-center">
						<p>Caricamento lezioni...</p>
					</div>
				</IonContent>
			</IonPage>
		);
	}

	if (error) {
		return (
			<IonPage>
				<HeaderTitle title="Today" />
				<IonContent fullscreen>
					<IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
						<IonRefresherContent></IonRefresherContent>
					</IonRefresher>
					<div className="ion-padding ion-text-center">
						<p style={{ color: "var(--ion-color-danger)" }}>
							{error}
						</p>
						<button onClick={getData}>Riprova</button>
					</div>
				</IonContent>
			</IonPage>
		);
	}

	let ore = 7;
	let lastOurPos = 0;

	return (
		<IonPage ref={page}>
			<HeaderTitle title="Today" />
			<IonContent fullscreen>
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
			</IonContent>
		</IonPage>
	);
};

export default TodayPage;
