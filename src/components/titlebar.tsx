export const TitleBar = () => {
	return (
		<div
			data-tauri-drag-region
			className="fixed top-0 select-none left-0 right-0 flex h-10 bg-amber-50 items-center"
		>
			<div className="flex flex-1 items-center pl-32 font-medium">Planwise</div>
		</div>
	);
};
