import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import "./TodayPage.css";
import { useClient } from "../../provider/clientProvider";
import { isWeekend } from "../../utils/utils";
import LessonSection from "../../components/today/lessonSection";
import HeaderTitle from "../../components/HeaderTitle";

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
			<HeaderTitle title="Today" hasModal />
			<IonContent fullscreen>
				{statusText && (
					<div className={`user-status `}>
						<span className={`badge badge-${statusText}`}>
							{statusText}
						</span>
					</div>
				)}

				<LessonSection />
			</IonContent>
		</IonPage>
	);
};

export default TodayPage;
