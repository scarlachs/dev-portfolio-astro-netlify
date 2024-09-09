import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

function ModeToggle() {
	const [theme, setThemeState] = React.useState<"light" | "dark" | "system">(
		"light",
	);

	React.useEffect(() => {
		const isDarkMode = document.documentElement.classList.contains("dark");
		setThemeState(isDarkMode ? "dark" : "light");
	}, []);

	React.useEffect(() => {
		const isDark =
			theme === "dark" ||
			(theme === "system" &&
				window.matchMedia("(prefers-color-scheme: dark)").matches);
		document.documentElement.classList[isDark ? "add" : "remove"]("dark");
	}, [theme]);

	const [menu, setMenuState] = React.useState<"open" | "closed">("closed");
	const ref = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		const body = document.body;
		const width = body.offsetWidth;
		const windowWidth = window.innerWidth;

		if (menu === "open") {
			body.style.setProperty("padding-right", `${windowWidth - width}px`);
			body.classList.add("overflow-y-hidden");

			const handleDocumentClick = (event: MouseEvent) => {
				const target = event.target as HTMLElement;

				if (!target) return;

				if (ref.current && !ref.current.contains(target)) {
					setMenuState("closed");
				}
			};

			const handleEscPress = (event: KeyboardEvent) => {
				if (event.key === "Escape" || event.key === "Esc") {
					setMenuState("closed");
				}
			};

			document.addEventListener("click", handleDocumentClick, true);
			document.addEventListener("keydown", handleEscPress, true);

			return () => {
				document.removeEventListener(
					"click",
					handleDocumentClick,
					true,
				);
				document.removeEventListener("keydown", handleEscPress, true);
			};
		}

		body.classList.remove("overflow-y-hidden");
		body.style.removeProperty("padding-right");
	});

	return (
		<div className="relative" ref={ref}>
			<Button
				variant="ghost"
				size="icon"
				aria-controls="themeList"
				aria-expanded={menu === "open"}
				onClick={() => {
					setMenuState((menu) =>
						menu === "open" ? "closed" : "open",
					);
				}}
			>
				<SunIcon className="size-5 scale-100 motion-safe:transition-all dark:scale-0" />
				<MoonIcon className="absolute size-5 scale-0 motion-safe:transition-all dark:scale-100" />
				<span className="sr-only">Farbmodus umschalten</span>
			</Button>
			{menu === "open" && (
				<ul
					className="absolute right-0 top-full z-50 mt-1 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state]:slide-in-from-top-2"
					data-state={menu}
					id="themeList"
					aria-label="Farbmodus umschalten"
				>
					<li>
						<Button
							variant={"ghost"}
							className="h-auto w-full justify-start px-2 py-1.5 font-normal"
							onClick={() => {
								setThemeState("light"), setMenuState("closed");
							}}
							tabIndex={menu === "open" ? 0 : -1}
						>
							Hell
						</Button>
					</li>
					<li>
						<Button
							variant={"ghost"}
							className="h-auto w-full justify-start px-2 py-1.5 font-normal"
							onClick={() => {
								setThemeState("dark"), setMenuState("closed");
							}}
							tabIndex={menu === "open" ? 0 : -1}
						>
							Dunkel
						</Button>
					</li>
					<li>
						<Button
							variant={"ghost"}
							className="h-auto w-full justify-start px-2 py-1.5 font-normal"
							onClick={() => {
								setThemeState("system"), setMenuState("closed");
							}}
							tabIndex={menu === "open" ? 0 : -1}
						>
							System
						</Button>
					</li>
				</ul>
			)}
		</div>
	);
}

export { ModeToggle };
