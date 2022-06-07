import { promiseToAsyncResult } from "./util";

export const loadFile = (file: File) => {
	return promiseToAsyncResult(
		new Promise<string>((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.onerror = reject;
			fileReader.readAsDataURL(file);
			fileReader.onload = () => {
				const data = fileReader.result;
				if (data) {
					resolve(data as string);
				} else {
					reject();
				}
			};
		})
	);
};
