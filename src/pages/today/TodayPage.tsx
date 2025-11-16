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
import { isWeekend } from "../../utils/utils";
import LessonSection from "../../components/today/lessonSection";

const TodayPage: React.FC = () => {
	const client = useClient();

	const statusCode = client.UserModel?.todaystatus.evtCode;
	let statusText = "";

	if (!statusCode) {
		if (!isWeekend(new Date(client.UserModel!.user.release))) {
			statusText = "Presente";
		}
	} else {
		statusText =
			statusCode === "ABA0"
				? "Assente"
				: statusCode === "ABR0"
				? "Ritardo"
				: statusCode === "ABU0"
				? "Uscita"
				: "Uscita Parziale";
	}

	return (
		<IonPage>
			<HeaderTitle title="Today" />
			<IonContent fullscreen>
				{statusText && (
					<div className={`user-status `}>
						<span className={`badge badge-${statusText}`}>
							{statusText}
						</span>
					</div>
				)}
				<LessonSection />;
			</IonContent>
		</IonPage>
	);
};

export default TodayPage;
