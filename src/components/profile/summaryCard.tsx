import { IonCard, IonCardContent, IonIcon, IonImg } from "@ionic/react";

import { chevronForwardOutline } from "ionicons/icons";

import avatar from "/avatar.png";

import "../../pages/profile/ProfilePage.css";
import { useState, useEffect } from "react";
import { User } from "../../types";

const SummaryCard: React.FC = () => {
	// const data = userDummyData;

	const [data, setData] = useState<User | null>(null);

	const getData = async () => {
		try {
			const response = await fetch(
				"https://dirty-alyce-school360-90b98c54.koyeb.app/auth/login/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						// "x-api-key": "roTIJIO0bf0VU5Z6LGJSWbPjlClW4eHg",
					},
					body: JSON.stringify({
						ident: "S9477262T",
						pass: "Rickardo@07",
						app_code: "CVVS",
					}),
				}
			);

			const json = await response.json();

			setData(json);
		} catch (error) {
			console.log("errore", error);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<IonCard button={true} className="card">
			<IonCardContent className="content--card" color="danger">
				<div style={{ height: "55%" }} className="row--content-card">
					<div className="column--row-content-card">
						<IonImg className="img-avatar--row-car" src={avatar} />
					</div>
					<div className="column--row-content-card column-dx--content-card">
						<div className="text-container--column-dx">
							<span className="label">bentornato</span>
							<span className="name">
								{data?.firstName.toLowerCase() ?? ""}
							</span>{" "}
							{/* api call */}
						</div>
						<div className="text-container--column-dx">
							<span className="label">classe</span>
							<span className="name class">
								{data?.class ?? ""}
							</span>{" "}
							{/* api call */}
						</div>
					</div>
				</div>
				<div className="divider--card"></div>
				<div
					style={{ height: "45%" }}
					className="row--content-card bottom--content-card">
					<div
						style={{ height: "55%" }}
						className="inner--row--content-card">
						<div className="media--inner-row">
							<span className="media-voti">
								{data?.mediaVoti.toString()}
							</span>
							<span className="tot-voti">/ 10</span>
						</div>
						{/* <div className="percentage--inner-row">
								<div className="icon-percentage">
								<IonIcon
								ios={arrowUpOutline}
								aria-hidden="true"
								/>
								</div>
							<span className="percentage-value">8.21%</span>
						</div> */}
					</div>
					<div
						style={{ height: "45%" }}
						className="inner--row--content-card">
						<div
							style={{
								background: data?.marksColor,
							}}
							className="last-mark--inner-row">
							<span className="marks">{data?.lastMarks}</span>
							<span className="subject">{data?.lastSubject}</span>
						</div>
						<div className="inner-row-view-all">
							<span>view all</span>
							<IonIcon
								ios={chevronForwardOutline}
								aria-hidden="true"
							/>
						</div>
					</div>
				</div>
			</IonCardContent>
			{/* <p>{data}</p> */}
		</IonCard>
	);
};

export default SummaryCard;
