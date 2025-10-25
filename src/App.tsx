import { Redirect, Route } from "react-router-dom";
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
import Tab1 from "./pages/today/Tab1";
import ProfilePage from "./pages/profile/ProfilePage";
import Tab3 from "./pages/Tab3";
import Tab4 from "./pages/timetable/Tab4";
import Tab5 from "./pages/settings/Tab5";

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
import { ScreenOrientation } from "@capacitor/screen-orientation";
import { useEffect } from "react";

ScreenOrientation.lock({ orientation: "portrait" });

setupIonicReact();

const App: React.FC = () => {
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

	return (
		<IonApp>
			<IonReactRouter>
				<IonTabs>
					<IonRouterOutlet>
						<Route exact path="/tab1">
							<Tab1 />
						</Route>
						<Route exact path="/ProfilePage">
							<ProfilePage />
						</Route>
						{/* <Route path="/Tab3">
						<Tab3 />
					</Route> */}
						<Route path="/Tab4">
							<Tab4 />
						</Route>
						<Route path="/Tab5">
							<Tab5 />
						</Route>
						<Route exact path="/">
							<Redirect to="/tab1" />
						</Route>
					</IonRouterOutlet>
					<IonTabBar className="floating-tab-bar" slot="bottom">
						<IonTabButton
							className="tab-bar-item"
							tab="tab1"
							href="/tab1">
							<IonIcon
								ios={newspaperOutline}
								aria-hidden="true"
							/>
							<IonLabel>Today</IonLabel>
						</IonTabButton>
						<IonTabButton tab="ProfilePage" href="/ProfilePage">
							<IonIcon ios={personOutline} aria-hidden="true" />
							<IonLabel>Profile</IonLabel>
						</IonTabButton>
						{/* <IonTabButton tab="tab3" href="/tab3">
						<IonIcon ios={peopleOutline} aria-hidden="true" />
						<IonLabel>Group</IonLabel>
					</IonTabButton> */}
						<IonTabButton tab="tab4" href="/tab4">
							<IonIcon ios={libraryOutline} aria-hidden="true" />
							<IonLabel>TimeTable</IonLabel>
						</IonTabButton>
						<IonTabButton tab="tab5" href="/tab5">
							<IonIcon ios={cogOutline} aria-hidden="true" />
							<IonLabel>Setting</IonLabel>
						</IonTabButton>
					</IonTabBar>
				</IonTabs>
			</IonReactRouter>
		</IonApp>
	);
};

export default App;
