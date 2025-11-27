import {
	IonButton,
	IonButtons,
	IonModal,
	IonPicker,
	IonPickerColumn,
	IonPickerColumnOption,
	IonSpinner,
	IonToolbar,
} from "@ionic/react";
import { useRef, useState } from "react";
import { useClient } from "../../provider/clientProvider";
import { Storage } from "@ionic/storage";

interface TimeTableIntroPageProps {
	setIntro: () => void;
	setTable: () => void;
	ref: any;
}

const TimeTableIntroPage: React.FC<TimeTableIntroPageProps> = ({
	setIntro,
	setTable,
	ref,
}) => {
	const [isLoading, setIsLoading] = useState(false);

	const modal = useRef<HTMLIonModalElement>(null);
	const [value, setValue] = useState<string>("--");
	const [canDismiss, setCanDismiss] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const client = useClient();
	const storageRef = ref;

	const handleClick = () => {
		setIsOpen(true);
	};

	const generaOrario = async () => {
		setIsOpen(false);
		setIsLoading(true);

		if (!storageRef.current) {
			console.log("no storage");
			return;
		}

		await client.getTimeTable(value);

		storageRef.current.set("userClass", value);

		await storageRef.current.set("showTimeTableIntro", false);

		setIsLoading(false);

		console.log("calling function");
		setTable();
		setIntro();
	};

	return (
		<>
			<div className="timeTable-container">
				{isLoading ? (
					<div
						style={{
							width: "100%",
							height: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}>
						{" "}
						<IonSpinner
							name="crescent"
							style={{ marginRight: "8px" }}
						/>
					</div>
				) : (
					<div className="timeTable-content">
						<span>sei uno studente del fermi ?</span>
						<IonButton
							onClick={handleClick}
							color={"dark"}
							expand="block"
							className="btn-timeTable">
							genera orario
						</IonButton>
						<div className="divider--hour-timeTable">
							<div className="divider--hour-line-timeTable"></div>
							<p>oppure</p>
							<div className="divider--hour-line-timeTable"></div>
						</div>
						<span className="no-fermi">
							Clicca sul più in alto e inzia a creare <br></br> il
							Tuo Orario Scolastico
						</span>
					</div>
				)}
			</div>
			<IonModal
				className="timeTable-modal"
				canDismiss={canDismiss}
				ref={modal}
				isOpen={isOpen}
				onDidDismiss={({ detail }) =>
					console.log("didDismiss", JSON.stringify(detail))
				}>
				<IonToolbar>
					<IonButtons slot="end">
						<IonButton
							onClick={() => {
								modal.current!.dismiss(value, "confirm");
								if (canDismiss) {
									console.log(canDismiss);
									generaOrario();
								}
							}}>
							Done
						</IonButton>
					</IonButtons>
				</IonToolbar>
				<IonPicker>
					<IonPickerColumn
						value={value}
						onIonChange={({ detail }) => {
							setValue(detail.value!.toString());
							console.log(value);
							setCanDismiss(detail.value != "" ? true : false);
						}}>
						<IonPickerColumnOption disabled value="">
							--
						</IonPickerColumnOption>
						<IonPickerColumnOption value="5Ai in">
							5Ai in
						</IonPickerColumnOption>
						<IonPickerColumnOption value="5E">
							5E
						</IonPickerColumnOption>
						<IonPickerColumnOption value="1D">
							1D
						</IonPickerColumnOption>
						<IonPickerColumnOption value="1Bin">
							1Bin
						</IonPickerColumnOption>
					</IonPickerColumn>
				</IonPicker>
			</IonModal>
		</>
	);
};

export default TimeTableIntroPage;
