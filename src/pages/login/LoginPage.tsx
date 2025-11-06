import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import {
	IonPage,
	IonContent,
	IonInput,
	IonButton,
	useIonViewWillLeave,
	IonToast,
	IonSpinner,
} from "@ionic/react";

import "./LoginPage.css";
import { useClient } from "../../provider/clientProvider";

interface LoginPageProps {
	onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const contentRef = useRef<HTMLIonContentElement>(null);

	const [toastMessage, setToastMessage] = useState("");
	const [isOpen, setIsOpen] = useState(false);

	const client = useClient();
	const history = useHistory();

	// Resetta tutto quando lasci la pagina
	useIonViewWillLeave(() => {
		const inputs = document.querySelectorAll("input, textarea");
		inputs.forEach((input) => (input as HTMLElement).blur());

		if (contentRef.current) {
			contentRef.current.scrollToTop(0);
		}

		window.scrollTo(0, 0);
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	});

	const handleSubmit = async () => {
		// Chiudi la tastiera
		const activeElement = document.activeElement as HTMLElement;
		if (activeElement) {
			activeElement.blur();
		}

		// Validazione
		if (!username || !password) {
			setToastMessage("Compila tutti i campi!");
			setIsOpen(true);
			return;
		}

		try {
			setLoading(true);

			const res = await client.login({
				username: username,
				password: password,
			});

			// Login riuscito
			setToastMessage(
				"Account " +
					client.UserModel?.firstName +
					" " +
					client.UserModel?.lastName
			);
			setIsOpen(true);

			setTimeout(() => {
				onLogin();
				history.replace("/TodayPage"); // ✅ Forza il redirect
			}, 500);
		} catch (error: any) {
			// Mostra il messaggio di errore dal server
			setToastMessage("Errore durante il login");
			setIsOpen(true);
		} finally {
			setLoading(false);
		}
	};

	return (
		<IonPage>
			<IonContent
				ref={contentRef}
				className="login-content"
				fullscreen={true}
				scrollY={false}>
				<div className="content">
					<div className="container-top">
						<span className="title">School360</span>
					</div>
					<div className="input-group">
						<IonInput
							onIonChange={(e: any) => {
								setUsername(e.detail.value);
							}}
							className="input"
							value={username}
							type="text"
							placeholder="Username"
							disabled={loading}
							id="username"
						/>

						<IonInput
							onIonChange={(e: any) => {
								setPassword(e.detail.value);
							}}
							className="input"
							type="password"
							placeholder="Password"
							disabled={loading}
							id="password"
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									handleSubmit();
								}
							}}
						/>
					</div>

					<IonButton
						onClick={handleSubmit}
						color={"dark"}
						className="button"
						expand="full"
						disabled={loading}
						id="submitBtn">
						{loading ? (
							<>
								<IonSpinner
									name="crescent"
									style={{ marginRight: "8px" }}
								/>
								Accesso in corso...
							</>
						) : (
							"Accedi"
						)}
					</IonButton>

					<div className="divider"></div>

					<span className="desc">
						Si ricorda che l'app ufficiale rimane{" "}
						<span className="desc-sp">spaggiari</span>
					</span>
				</div>
				<IonToast
					isOpen={isOpen}
					message={toastMessage}
					onDidDismiss={() => setIsOpen(false)}
					duration={3000}
					className={
						toastMessage.includes("Account")
							? "toast-success"
							: "toast-error"
					}
				/>
			</IonContent>
		</IonPage>
	);
};

export default LoginPage;
