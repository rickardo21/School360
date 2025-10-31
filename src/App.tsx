import { Redirect, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import {
	IonApp,
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs,
	setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Page Import */
import TodayPage from "./pages/today/TodayPage";
import ProfilePage from "./pages/profile/ProfilePage";
import TimeTablePage from "./pages/timetable/TimeTablePage";
import SettingsPage from "./pages/settings/SettingsPage";

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

/* Icons import */
import { cogOutline, libraryOutline, newspaperOutline } from "ionicons/icons";
import { personOutline } from "ionicons/icons";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import IntroPage from "./pages/intro/IntroPage";
import LoginPage from "./pages/login/LoginPage";

setupIonicReact();

const App: React.FC = () => {
	const [showIntro, setShowIntro] = useState(false);

	useEffect(() => {
		const token = "";

		if (token) {
			setShowIntro(false);
		}
	}, []);

	useEffect(() => {
		const color = window.matchMedia("(prefers-color-scheme: dark)").matches
			? "#1a1a1a"
			: "#f0f0f0";
		const metaThemeColor = document.querySelector(
			'meta[name="theme-color"]'
		);
		if (metaThemeColor) {
			metaThemeColor.setAttribute("content", color);
		}
	}, []);

	// if (showIntro) {
	// 	return (
	// 		<IntroPage
	// 			onFinishIntro={() => {
	// 				setShowIntro(false);
	// 			}}
	// 		/>
	// 	);
	// }

	return (
		<IonApp>
			<IonReactRouter>
				<IonTabs>
					<IonRouterOutlet>
						<Route exact path="/TodayPage">
							<TodayPage />
						</Route>
						<Route exact path="/ProfilePage">
							<ProfilePage />
						</Route>
						<Route path="/TimeTablePage">
							<TimeTablePage />
						</Route>
						<Route path="/SettingsPage">
							<SettingsPage />
						</Route>
						<Route exact path="/">
							<Redirect to="/LoginPage" />
						</Route>
					</IonRouterOutlet>

					{showIntro ? (
						<Tabs />
					) : (
						<LoginPage
							onLogin={() => {
								setShowIntro(true);
							}}
						/>
					)}
				</IonTabs>
			</IonReactRouter>
		</IonApp>
	);
};

export default App;

const Tabs: React.FC = () => (
	<IonTabBar className="floating-tab-bar" slot="bottom">
		<IonTabButton
			className="tab-bar-item"
			tab="TodayPage"
			href="/TodayPage">
			<IonIcon ios={newspaperOutline} aria-hidden="true" />
			<IonLabel>Today</IonLabel>
		</IonTabButton>
		<IonTabButton tab="ProfilePage" href="/ProfilePage">
			<IonIcon ios={personOutline} aria-hidden="true" />
			<IonLabel>Profile</IonLabel>
		</IonTabButton>
		<IonTabButton tab="TimeTablePage" href="/TimeTablePage">
			<IonIcon ios={libraryOutline} aria-hidden="true" />
			<IonLabel>TimeTable</IonLabel>
		</IonTabButton>
		<IonTabButton tab="SettingsPage" href="/SettingsPage">
			<IonIcon ios={cogOutline} aria-hidden="true" />
			<IonLabel>Setting</IonLabel>
		</IonTabButton>
	</IonTabBar>
);
