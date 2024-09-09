import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

const randomAlphaNumeric = (length: number) => {
	const chars =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";

	Array.from({ length }).forEach(() => {
		result += chars[Math.floor(Math.random() * chars.length)];
	});

	return result;
};

export { cn, randomAlphaNumeric };
