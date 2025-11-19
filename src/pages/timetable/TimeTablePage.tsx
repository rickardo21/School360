import React, { useEffect, useState, useRef } from "react";
import {
	IonPage,
	IonContent,
	IonToolbar,
	IonButton,
	IonModal,
	IonButtons,
	IonPicker,
	IonPickerColumn,
	IonPickerColumnOption,
	IonSpinner,
} from "@ionic/react";

// Importa i componenti Swiper, gli stili e i moduli necessari
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperCore } from "swiper";
import "swiper/css";
import "./TimeTablePage.css"; // Assicurati che questo file esista
import HeaderTitle from "../../components/HeaderTitle";
import { useClient } from "../../provider/clientProvider";
import { Storage } from "@ionic/storage";
import { TimetableGroupedByDay } from "../../types";
import { storefront, timeOutline } from "ionicons/icons";

const FullscreenSwiperPage: React.FC = () => {
	const days = [
		"lunedì",
		"martedì",
		"mercoledì",
		"giovedì",
		"venerdì",
		"sabato",
		"domenica",
	];

	const client = useClient();
	const storageRef = useRef<Storage | null>(null);

	const [activeDay, setActiveDay] = useState(days[0]);
	const [showIntro, setShowIntro] = useState(true);
	const [table, setTable] = useState<TimetableGroupedByDay | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleSlideChange = (swiper: SwiperCore) => {
		const currentIndex = swiper.activeIndex;
		setActiveDay(days[currentIndex]);
	};

	useEffect(() => {
		const initStorage = async () => {
			const store = new Storage();
			storageRef.current = await store.create();

			const intro = await storageRef.current.get("showTimeTableIntro");

			if (intro === undefined) {
				setShowIntro(true);
				storageRef.current.set("showTimeTableIntro", true);
			} else {
				setShowIntro(true);
				storageRef.current.set("showTimeTableIntro", true);
			}

			if (intro === false) {
				setTable(await storageRef.current.get("TimeTable"));
			}
		};

		initStorage();
	}, []);

	const handleClick = () => {
		setIsOpen(true);
	};

	const generaOrario = async () => {
		setIsOpen(false);
		setIsLoading(true);

		if (!storageRef.current) return;

		await client.getTimeTable(value);

		storageRef.current.set("userClass", value);

		setTable(await storageRef.current.get("TimeTable"));

		await storageRef.current.set("showTimeTableIntro", false);

		setIsLoading(false);

		setShowIntro(false);
	};

	const modal = useRef<HTMLIonModalElement>(null);
	const [value, setValue] = useState<string>("--");
	const [canDismiss, setCanDismiss] = useState(false);

	return (
		<IonPage>
			<HeaderTitle title={showIntro ? "TimeTable" : activeDay} />
			<IonContent fullscreen scrollY={false}>
				{!showIntro ? (
					<Swiper
						className="my-swiper"
						spaceBetween={0}
						slidesPerView={1}
						onSlideChange={handleSlideChange}>
						{days.map((item: string, index) => (
							<SwiperSlide key={index} className="my-slide">
								{table &&
								table[item] &&
								table[item].length > 0 ? (
									table?.[item]?.map((h, indexTable) => (
										<div
											key={indexTable}
											// style={{
											// 	background: `rgba(64, 156, 255, ${
											// 		1 - 0.2 * indexTable
											// 	})`,
											// }}
											className="timeTableCard">
											<div className="left--timeTableCard">
												<span className="sub--timeTableCard">
													{h.subject}
												</span>
												<div className="bottom">
													<span>{h.classroom}</span>
													{/* <span>-</span>
												<span className="duration">
													{h.duration}
													<IonIcon
														ios={timeOutline}
														aria-hidden={true}
													/>
												</span> */}
												</div>
											</div>
											<div className="right--timeTableCard">
												<span>{h.time} </span>
											</div>
										</div>
									))
								) : (
									<div className="no-lesson">
										<div>non sono presenti lezioni</div>
									</div>
								)}
							</SwiperSlide>
						))}
					</Swiper>
				) : (
					<>
						<div className="timeTable-container">
							{isLoading ? (
								<div
									style={{
										width: "100%",
										height: "100%",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}>
									{" "}
									<IonSpinner
										name="crescent"
										style={{ marginRight: "8px" }}
									/>
								</div>
							) : (
								<div className="timeTable-content">
									<span>sei uno studente del fermi ?</span>
									<IonButton
										onClick={handleClick}
										color={"dark"}
										expand="block"
										className="btn-timeTable">
										genera orario
									</IonButton>
									<div className="divider--hour-timeTable">
										<div className="divider--hour-line-timeTable"></div>
										<p>oppure</p>
										<div className="divider--hour-line-timeTable"></div>
									</div>
									<span className="no-fermi">
										Clicca sul più in alto e inzia a creare{" "}
										<br></br> il Tuo Orario Scolastico
									</span>
								</div>
							)}
						</div>
						<IonModal
							className="timeTable-modal"
							canDismiss={canDismiss}
							ref={modal}
							isOpen={isOpen}
							onDidDismiss={({ detail }) =>
								console.log(
									"didDismiss",
									JSON.stringify(detail)
								)
							}>
							<IonToolbar>
								<IonButtons slot="end">
									<IonButton
										onClick={() => {
											modal.current!.dismiss(
												value,
												"confirm"
											);
											if (canDismiss) {
												generaOrario();
											}
										}}>
										Done
									</IonButton>
								</IonButtons>
							</IonToolbar>
							<IonPicker>
								<IonPickerColumn
									value={value}
									onIonChange={({ detail }) => {
										setValue(detail.value!.toString());
										console.log(value);
										setCanDismiss(
											detail.value != "" ? true : false
										);
									}}>
									<IonPickerColumnOption value="">
										--
									</IonPickerColumnOption>
									<IonPickerColumnOption value="5Ai in">
										5Ai in
									</IonPickerColumnOption>
									<IonPickerColumnOption value="5E">
										5E
									</IonPickerColumnOption>
									<IonPickerColumnOption value="1D">
										1D
									</IonPickerColumnOption>
									<IonPickerColumnOption value="1Bin">
										1Bin
									</IonPickerColumnOption>
								</IonPickerColumn>
							</IonPicker>
						</IonModal>
					</>
				)}
			</IonContent>
		</IonPage>
	);
};

export default FullscreenSwiperPage;
