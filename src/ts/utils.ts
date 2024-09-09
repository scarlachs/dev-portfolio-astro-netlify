import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

const randomAlphaNumeric = (length: number) => {
	// let s = "";
	// Array.from({ length }).some(() => {
	// 	s += Math.random().toString(36).slice(2);
	// 	return s.length >= length;
	// });
	// return s.slice(0, length);

	const chars =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";

	Array.from({ length }).forEach(() => {
		result += chars[Math.floor(Math.random() * chars.length)];
	});

	return result;
};

export { cn, randomAlphaNumeric };
