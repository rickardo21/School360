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
							"b4a78482a3bf7f602af4385b80e092e0AOGL5FeU5ghXCd4wTEH8jrjo7dcs/zpznF0qUaXgXuy2MmFG0hSa2DLiaReSWOfEzVH+/1/ZRxJUIczCvdAuOuNqV89mJkhqjdxj/Wmr8fgetKzLdsFlVuVEn9w8gEG7f7FTqIeS4ZmbBvbkjlq74uizmOhgJ8KFNYws08AV2ywoBHy+r+qtKZiuYSsZBHGQpv13Kl/c0/RgUoYnIRYh3mYvSsqAuFbqFLmlQiFYWO2p+9WhBZuZL0kSENExbwUahmzcK2lvmW5o/cBRkyMXWYcPwA9bTzmoeVMlNUALBGkCR8SC92BgUlf/CbvuzfN7364yK4iullQzW0tpJJiHmJdAu6qFYdQqD3iGVBxHUOMaN+iKxfaFxzGVYSnTkYmp/9/g",
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
