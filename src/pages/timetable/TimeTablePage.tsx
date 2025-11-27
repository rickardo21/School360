import React, { useEffect, useState, useRef } from "react";
import { IonPage, IonContent } from "@ionic/react";

// Importa i componenti Swiper, gli stili e i moduli necessari
import type { Swiper as SwiperCore } from "swiper";
import "swiper/css";
import "./TimeTablePage.css"; // Assicurati che questo file esista
import { Storage } from "@ionic/storage";

import { TimetableGroupedByDay } from "../../types";

import HeaderTitle from "../../components/HeaderTitle";
import SwiperComp from "../../components/timeTable/SwiperComp";
import TimeTableIntroPage from "../../components/timeTable/TimeTableIntroPage";

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

	const storageRef = useRef<Storage | null>(null);

	const [activeDay, setActiveDay] = useState(days[0]);
	const [showIntro, setShowIntro] = useState(false);
	const [table, setTable] = useState<TimetableGroupedByDay | null>(null);

	const handleSlideChange = (swiper: SwiperCore) => {
		const currentIndex = swiper.activeIndex;
		setActiveDay(days[currentIndex]);
	};

	const initStorage = async () => {
		const store = new Storage();
		storageRef.current = await store.create();

		const intro = await storageRef.current.get("showTimeTableIntro");

		if (intro === undefined) {
			setShowIntro(true);
			storageRef.current.set("showTimeTableIntro", true);
		} else {
			setShowIntro(intro);
			storageRef.current.set("showTimeTableIntro", intro);
		}

		if (intro === false) {
			setTable(await storageRef.current.get("TimeTable"));
		}
	};
	useEffect(() => {
		initStorage();
	}, []);

	return (
		<IonPage>
			<HeaderTitle title={showIntro ? "TimeTable" : activeDay} />
			<IonContent fullscreen scrollY={false}>
				{!showIntro ? (
					<SwiperComp
						days={days}
						table={table}
						onChange={() => handleSlideChange} // review
					/>
				) : (
					<TimeTableIntroPage
						ref={storageRef}
						setIntro={() => setShowIntro(false)}
						setTable={() => initStorage()}
					/>
				)}
			</IonContent>
		</IonPage>
	);
};

export default FullscreenSwiperPage;
