import { IonCard, IonCardContent, IonIcon, IonImg } from "@ionic/react";

import { arrowUpOutline } from "ionicons/icons";
import { chevronForwardOutline } from "ionicons/icons";

import avatar from "/avatar.png";

import "./summaryCard.css";
import { userDummyData } from "../../data";

const SummaryCard: React.FC = () => {
	const data = userDummyData;

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
							<span className="name">{data!.firstName}</span>{" "}
							{/* api call */}
						</div>
						<div className="text-container--column-dx">
							<span className="label">classe</span>
							<span className="name class">
								{data!.class}
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
							<span className="media-voti">8</span>{" "}
							{/* api call */}
							<span className="tot-voti">/ 10</span>
						</div>
						<div className="percentage--inner-row">
							<div className="icon-percentage">
								<IonIcon
									ios={arrowUpOutline}
									aria-hidden="true"
								/>
							</div>
							<span className="percentage-value">8.21%</span>
						</div>
					</div>
					<div
						style={{ height: "45%" }}
						className="inner--row--content-card">
						<div className="last-mark--inner-row">
							<span className="marks">4½</span>
							<span className="subject">matematica</span>
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
