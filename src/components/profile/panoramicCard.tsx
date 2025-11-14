import { IonCard, IonCardContent, IonCol, IonGrid, IonRow } from "@ionic/react";

import "../../pages/profile/ProfilePage.css";
import { useClient } from "../../provider/clientProvider";
import { absence } from "../../types";

const PanoramicCard: React.FC = () => {
	const client = useClient();
	const data = client.UserModel?.absence.events;

	var assenze = 0;
	var ritardi = 0;
	var uscite = 0;
	var parziali = 0;

	data?.forEach((item: absence) => {
		if (item.evtCode === "ABA0") assenze++;
		if (item.evtCode === "ABR0") ritardi++;
		if (item.evtCode === "ABU0") uscite++;
		if (item.evtCode === "ABP0") parziali++;
	});

	return (
		<IonCard button={true} className="card">
			<IonCardContent className="card-content">
				<IonGrid>
					<IonRow className="row">
						<IonCol className="col">
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									width: "100%",
								}}>
								<span>assenze</span>
								<span style={{ opacity: "0.4" }}>
									{assenze}
								</span>
							</div>
							<div className="bar">
								<div
									style={{
										width: `${(assenze / 45) * 100}%`,
										background: "red",
									}}
									className="indicator--bar"></div>
							</div>
						</IonCol>
						<IonCol className="col">
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									width: "100%",
								}}>
								<span>ritardi</span>
								<span style={{ opacity: "0.4" }}>
									{ritardi}
								</span>
							</div>
							<div className="bar">
								<div
									style={{
										width: `${(ritardi / 10) * 100}%`,
										background: "orange",
									}}
									className="indicator--bar"></div>
							</div>
						</IonCol>
					</IonRow>
					<IonRow className="row">
						<IonCol className="col">
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									width: "100%",
								}}>
								<span>uscite parziali</span>
								<span style={{ opacity: "0.4" }}>
									{parziali}
								</span>
							</div>
							<div className="bar">
								<div
									style={{
										width: `${(parziali / 10) * 100}%`,
										background: "rgb(31, 126, 194)",
									}}
									className="indicator--bar"></div>
							</div>
						</IonCol>
						<IonCol className="col">
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									width: "100%",
								}}>
								<span>uscite</span>
								<span style={{ opacity: "0.4" }}>{uscite}</span>
							</div>
							<div className="bar">
								<div
									style={{
										width: `${(uscite / 10) * 100}%`,
										background: "#FFDB58",
									}}
									className="indicator--bar"></div>
							</div>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonCardContent>
		</IonCard>
	);
};

export default PanoramicCard;
