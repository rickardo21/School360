import React, { useState, useRef } from "react";
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
	useIonViewWillLeave,
} from "@ionic/react";

import "./LoginPage.css";

interface LoginPageProps {
	onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
	const [showPassInput, setShowPassInput] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const contentRef = useRef<HTMLIonContentElement>(null);

	// Resetta tutto quando lasci la pagina
	useIonViewWillLeave(() => {
		// Blur tutti gli input per chiudere la tastiera
		const inputs = document.querySelectorAll("input, textarea");
		inputs.forEach((input) => (input as HTMLElement).blur());

		// Resetta lo scroll
		if (contentRef.current) {
			contentRef.current.scrollToTop(0);
		}

		window.scrollTo(0, 0);
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	});

	function handleSubmit() {
		// Chiudi la tastiera prima di procedere
		const activeElement = document.activeElement as HTMLElement;
		if (activeElement) {
			activeElement.blur();
		}

		console.log("Username:", username);
		console.log("Password:", password);

		// Piccolo delay per permettere alla tastiera di chiudersi completamente
		setTimeout(() => {
			onLogin();
		}, 100);
	}

	return (
		<IonPage>
			<IonContent
				ref={contentRef}
				className="login-content"
				fullscreen={true}
				scrollY={false}>
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
