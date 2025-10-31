import { IonHeader, IonTitle, IonToolbar } from "@ionic/react";

interface HeaderTitleProps {
	title: string;
	calendar?: boolean | false;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({ title, calendar }) => {
	return (
		<IonHeader collapse="condense">
			<IonToolbar>
				<IonTitle
					style={{ fontSize: "3rem" }}
					size="large"
					color={"medium"}>
					{title}
				</IonTitle>
			</IonToolbar>
		</IonHeader>
	);
};

export default HeaderTitle;
