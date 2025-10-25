import { IonCard, IonCardContent, IonCol, IonGrid, IonRow } from "@ionic/react";

import "./panoramicCard.css";

const PanoramicCard: React.FC = () => {
	return (
		<IonCard button={true} className="card">
			<IonCardContent className="card-content">
				<IonGrid>
					<IonRow className="row">
						<IonCol className="col">
							<span>assenze</span>
							<div className="bar">
								<div
									style={{ width: "40%", background: "red" }}
									className="indicator--bar"></div>
							</div>
						</IonCol>
						<IonCol className="col">
							<span>Ritardi</span>
							<div className="bar">
								<div
									style={{
										width: "60%",
										background: "orangered",
									}}
									className="indicator--bar"></div>
							</div>
						</IonCol>
					</IonRow>
					<IonRow className="row">
						<IonCol className="col">
							<span>assenze parziali</span>
							<div className="bar">
								<div
									style={{
										width: "10%",
										background: "rgb(31, 126, 194)",
									}}
									className="indicator--bar"></div>
							</div>
						</IonCol>
						<IonCol className="col">
							<span>uscite</span>
							<div className="bar">
								<div
									style={{
										width: "20%",
										background: "orange",
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
