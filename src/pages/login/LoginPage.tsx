import React, { useState } from "react";
import {
	IonPage,
	IonContent,
	IonInput,
	IonItem,
	IonButton,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonBackButton,
} from "@ionic/react";

import "./LoginPage.css";

interface LoginPageProps {
	onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
	const [showPassInput, setShowPassInput] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	function handleSubmit() {
		if (!username || !password) {
			return;
		}

		console.log("Username:", username);
		console.log("Password:", password);

		onLogin();
	}

	return (
		<IonPage>
			<IonContent fullscreen={true}>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton
							color={"dark"}
							defaultHref="#"></IonBackButton>
					</IonButtons>
				</IonToolbar>

				<div className="content">
					<div className="container-top">
						<span className="title">School360</span>
					</div>
					<div className="input-group">
						<IonInput
							onIonChange={(e: any) => {
								console.log(e.detail.value);
								setUsername(e.detail.value);
							}}
							className="input"
							value={username}
							type="text"
							placeholder="Username"
							id="username"></IonInput>

						<IonInput
							onIonChange={(e: any) => {
								setPassword(e.detail.value);
							}}
							className="input"
							type="password"
							placeholder="Password"
							id="password"></IonInput>
					</div>

					<IonButton
						onClick={() => {
							handleSubmit();
						}}
						color={"dark"}
						className="button"
						expand="block"
						id="submitBtn">
						Accedi
					</IonButton>

					<div className="divider"></div>

					<span className="desc">
						Si ricorda che l'app ufficiale rimane{" "}
						<span className="desc-sp">spaggiari</span>
					</span>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default LoginPage;
