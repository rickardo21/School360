import React, { createContext, useContext, useMemo, ReactNode } from "react";
import { Absences, Grades, Lessons, User, UserModelFullOfInfo } from "../types";

interface ApiResponse<T> {
	data: T;
	status: number;
}

interface LoginData {
	username: string;
	password: string;
}

class Client {
	// private MAIN_URL = "http://192.168.1.104:8080/";
	private MAIN_URL = "https://backendschool360.fly.dev/";
	public UserModel: UserModelFullOfInfo | null = null;

	constructor() {
		this.UserModel = null;
	}

	public async login(data: LoginData) {
		const body = {
			ident: data.username,
			pass: data.password,
			app_code: "CVVS",
		};

		const response = await this.sendRequest<
			ApiResponse<UserModelFullOfInfo>
		>("getAll", "POST", body);

		this.UserModel = response.data;

		console.log("user model = " + this.UserModel);

		return response;
	}

	public async getGrades() {
		const grade = await this.sendRequest<Grades>(
			`grades?ident=${this.UserModel?.user.ident.substring(1)}`,
			"GET"
		);

		this.UserModel!.grades = grade;
	}

	public async getAbsence(date?: string) {
		const absence = await this.sendRequest<Absences>(
			`assenze?ident=${this.UserModel?.user.ident.substring(1)}${
				date ? `&date=${date}/` : ""
			}`,
			"GET"
		);

		this.UserModel!.absence = absence;
	}

	public async getLessons(date: string) {
		const lessons = await this.sendRequest<Lessons>(
			`lessons?ident=${this.UserModel?.user.ident.substring(
				1
			)}&date=${date}/`,
			"GET"
		);

		this.UserModel!.lessons = lessons;
	}

	private async sendRequest<T>(
		endpoint: string,
		method: string,
		body?: any
	): Promise<T> {
		const token = this.UserModel?.user.token || null;

		const headers: HeadersInit = {
			"Content-Type": "application/json",
			"auth-user-token": token || "",
		};

		if (method === "POST") {
			return await this.post<T>(endpoint, body, headers);
		} else {
			return await this.get<T>(endpoint, headers);
		}
	}

	private async post<T>(
		endpoint: string,
		body: any,
		headers: HeadersInit
	): Promise<T> {
		try {
			const response = await fetch(this.MAIN_URL + endpoint, {
				method: "POST",
				headers: headers,
				body: JSON.stringify(body),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			return {
				data: await response.json(),
				status: response.status,
			} as T;
		} catch (error) {
			console.error(`POST request to ${endpoint} failed:`, error);
			throw error;
		}
	}

	private async get<T>(endpoint: string, headers: HeadersInit): Promise<T> {
		try {
			const response = await fetch(this.MAIN_URL + endpoint, {
				method: "GET",
				headers: headers,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			return {
				data: await response.json(),
				status: response.status,
			} as T;
		} catch (error) {
			console.error(`GET request to ${endpoint} failed:`, error);
			throw error;
		}
	}
}

interface ClientContextProps {
	client: Client;
}

export const ClientContext = createContext<ClientContextProps | undefined>(
	undefined
);

interface ClientProviderProps {
	children: ReactNode;
}

export const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
	const client = useMemo(() => {
		return new Client();
	}, []);

	return (
		<ClientContext.Provider value={{ client }}>
			{children}
		</ClientContext.Provider>
	);
};

export const useClient = () => {
	const context = useContext(ClientContext);
	if (context === undefined) {
		throw new Error("useClient deve essere usato dentro ClientProvider");
	}
	return context.client;
};
