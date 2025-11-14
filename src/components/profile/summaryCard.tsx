import {
	IonCard,
	IonCardContent,
	IonIcon,
	IonImg,
	IonRouterLink,
} from "@ionic/react";

import { chevronForwardOutline } from "ionicons/icons";

import avatar from "/avatar.png";

import "../../pages/profile/ProfilePage.css";
import { useClient } from "../../provider/clientProvider";
import { calcolaMedia, markBgColor } from "../../utils/utils";

const SummaryCard: React.FC = () => {
	// const data = userDummyData;

	const client = useClient();
	const data = client.UserModel?.user;

	const mediaVoti = calcolaMedia(client.UserModel!.grades);
	const lastMarks = {
		value: client.UserModel!.grades.grades[0].displayValue,
		subject: client.UserModel!.grades.grades[0].subjectDesc,
		floatValue: client.UserModel!.grades.grades[0].decimalValue,
	};

	console.log(data);

	return (
		<IonRouterLink routerLink="/GradePage" routerDirection="forward">
			<IonCard button={true} className="card">
				<IonCardContent className="content--card" color="danger">
					<div
						style={{ height: "55%" }}
						className="row--content-card">
						<div className="column--row-content-card">
							<IonImg
								className="img-avatar--row-car"
								src={avatar}
							/>
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
								<span className="media-voti">{mediaVoti}</span>
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
									background: markBgColor(
										lastMarks.floatValue
									),
								}}
								className="last-mark--inner-row">
								<span className="marks">{lastMarks.value}</span>
								<span className="subject">
									{lastMarks.subject.split(" ").length > 1
										? lastMarks.subject.split(" ")[0]
										: lastMarks.subject}
								</span>
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
			</IonCard>
		</IonRouterLink>

		// <p>{data?.firstName}</p>
	);
};

export default SummaryCard;
