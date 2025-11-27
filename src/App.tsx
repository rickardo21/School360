import { useEffect } from "react";
import { IonApp, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Ionic Dark Mode */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";

import { ClientProvider } from "./provider/clientProvider";
import AppController from "./AppController";

setupIonicReact();

export const applyTheme = (isDark: boolean) => {
	const metaThemeColor = document.querySelector('meta[name="theme-color"]');
	const metaStatusBarStyle = document.querySelector(
		'meta[name="apple-mobile-web-app-status-bar-style"]'
	);

	if (!metaThemeColor || !metaStatusBarStyle) return;

	if (isDark) {
		metaThemeColor.setAttribute("content", "#1C1C1E");
		metaStatusBarStyle.setAttribute("content", "black");
	} else {
		metaThemeColor.setAttribute("content", "#F2F2F7");
		metaStatusBarStyle.setAttribute("content", "white");
	}
};

const App: React.FC = () => {
	useEffect(() => {
		// Usiamo matchMedia per sapere qual è il tema attuale e per ascoltare i cambiamenti
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

		// 1. Applica il tema corretto al caricamento dell'app
		applyTheme(mediaQuery.matches);

		// 2. Aggiungi un "ascoltatore" che riesegue la funzione quando il tema cambia
		const themeChangeHandler = (e: MediaQueryListEvent) =>
			applyTheme(e.matches);
		mediaQuery.addEventListener("change", themeChangeHandler);

		// 3. Pulisci l'ascoltatore quando il componente viene smontato (importante!)
		return () => {
			mediaQuery.removeEventListener("change", themeChangeHandler);
		};
	}, []);
	return (
		<IonApp>
			<ClientProvider>
				<IonReactRouter>
					<AppController />
				</IonReactRouter>
			</ClientProvider>
		</IonApp>
	);
};

export default App;
