import { IonContent, IonPage } from "@ionic/react";
import "./TodayPage.css";
import HeaderTitle from "../../components/HeaderTitle";
import { Lesson, Lessons } from "../../types";
import { useEffect, useState } from "react";
import { LessonCard } from "../../components/today/lessonsCard";

const TodayPage: React.FC = () => {
	const [data, setData] = useState<Lessons | null>(null);

	const getData = async () => {
		try {
			const response = await fetch(
				"https://dirty-alyce-school360-90b98c54.koyeb.app/lessons/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"auth-user-token":
							"098d7260ed4f232f2f9e08ac517195c0YeIpJjYitkygQ4Mex+LngWa8ilE45boZAR/HQA5HsZmCKWgxTvt8AbGtY7i8T8zyymnQ7/KEiZBTHy9zrCR1pnj62gKJaUW+hmkcIRWv/H0rzn04prcKMJDDNkNiv1rVsGpDX+sr2dcEJXY+GHl1rKKIr7p9nNx61MdhX4QR3V+H6sHHl3zkbOr50PVdM8QnzEaRceX57Ea/TDLfISL/5IsMTMCbHLDLC2BMc/Pli5Dh4TmqsKuIBFM0202GGBB1iy1jQf2zJL+xk2Jt298wXu+eRdhzxLx74vMN7O/EfHWuJjUzcVg1VUvT3CPcc0SHvisS/n1GrWay1MCaGYmmlg/FJjXzAKNDMhIIK9afAf9EgL0PIlXHQH4eDdkUdVHdpVM2",
					},
					body: JSON.stringify({
						ident: "S9477262T",
						date: "20251031",
					}),
				}
			);

			if (!response.ok)
				throw new Error(`HTTP error! Status: ${response.status}`);

			const json = await response.json();
			setData(json);
		} catch (error) {
			console.error("Errore nel fetch dati:", error);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	var ore = 7;
	var lastOurPos = 0;

	return (
		<IonPage>
			<HeaderTitle title="Today" calendar={true} />
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
							<LessonCard
								index={index}
								item={item}
								hasHour={hasHour}
								hour={ore}
							/>
						);
					})}
				</div>
			</IonContent>
		</IonPage>
	);
};

export default TodayPage;
