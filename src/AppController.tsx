import { Redirect, Route, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import {
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs,
} from "@ionic/react";

import {
	cogOutline,
	libraryOutline,
	newspaperOutline,
	personOutline,
} from "ionicons/icons";

import TodayPage from "./pages/today/TodayPage";
import ProfilePage from "./pages/profile/ProfilePage";
import TimeTablePage from "./pages/timetable/TimeTablePage";
import SettingsPage from "./pages/settings/SettingsPage";
import LoginPage from "./pages/login/LoginPage";
import GradePage from "./pages/profile/GradePage";
import SplashPage from "./pages/splash/SplashPage";

import { Storage } from "@ionic/storage";
import { useClient } from "./provider/clientProvider";
import { UserModelFullOfInfo } from "./types";
import { calcolaMinutiMancanti } from "./utils/utils";

const AppController: React.FC = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const history = useHistory();
	const client = useClient();

	const handleLogin = () => {
		setIsAuthenticated(true);
		history.replace("/TodayPage");
	};

	useEffect(() => {
		const checkAuth = async () => {
			const store = new Storage();
			await store.create();
			const storedUser: UserModelFullOfInfo = await store.get(
				"storedUser"
			);

			if (storedUser) {
				const timeLeft = calcolaMinutiMancanti(storedUser.user.expire);
				if (timeLeft > 5) {
					client.setUserModel(storedUser);
					setIsAuthenticated(true);
				}
			}
		};

		checkAuth();
	}, [client]);

	useEffect(() => {
		// Mostro splash per 2 secondi, poi redirigo dove serve
		const timer = setTimeout(() => {
			setIsLoading(false);
			if (isAuthenticated) {
				history.replace("/TodayPage");
			} else {
				history.replace("/LoginPage");
			}
		}, 1000);
		return () => clearTimeout(timer);
	}, [isAuthenticated, history]);

	if (isLoading) {
		return <SplashPage />;
	}

	if (!isAuthenticated) {
		return (
			<IonRouterOutlet>
				<Route exact path="/LoginPage">
					<LoginPage onLogin={handleLogin} />
				</Route>
				<Route exact path="/">
					<Redirect to="/LoginPage" />
				</Route>
			</IonRouterOutlet>
		);
	}

	return (
		<IonTabs>
			<IonRouterOutlet>
				<Route exact path="/TodayPage">
					<TodayPage />
				</Route>
				<Route exact path="/ProfilePage">
					<ProfilePage />
				</Route>
				<Route exact path="/TimeTablePage">
					<TimeTablePage />
				</Route>
				<Route exact path="/SettingsPage">
					<SettingsPage />
				</Route>
				<Route exact path="/GradePage">
					<GradePage />
				</Route>
				<Route exact path="/">
					<Redirect to="/TodayPage" />
				</Route>
			</IonRouterOutlet>

			<IonTabBar className="floating-tab-bar" slot="bottom">
				<IonTabButton tab="today" href="/TodayPage">
					<IonIcon ios={newspaperOutline} aria-hidden="true" />
					<IonLabel>Today</IonLabel>
				</IonTabButton>
				<IonTabButton tab="profile" href="/ProfilePage">
					<IonIcon ios={personOutline} aria-hidden="true" />
					<IonLabel>Profile</IonLabel>
				</IonTabButton>
				<IonTabButton tab="timetable" href="/TimeTablePage">
					<IonIcon ios={libraryOutline} aria-hidden="true" />
					<IonLabel>TimeTable</IonLabel>
				</IonTabButton>
				<IonTabButton tab="settings" href="/SettingsPage">
					<IonIcon ios={cogOutline} aria-hidden="true" />
					<IonLabel>Settings</IonLabel>
				</IonTabButton>
			</IonTabBar>
		</IonTabs>
	);
};

export default AppController;
