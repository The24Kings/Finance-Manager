import React, { useEffect, useState } from "react";
import { IonButton } from "@ionic/react";

import { Category, DataValidation, EntryCategories, parseJSON } from "../utilities/Categories";
import useFirestoreStore from "../utilities/Firebase";

import "./Container.css";
import jsonData from "../categories.json";

interface ContainerProps {
	name: string;
}

const DebugContainer: React.FC<ContainerProps> = () => {
	const { addDocument } = useFirestoreStore();
	let [data, setData] = useState<Category[]>([]);
	
	// Button click handler
	const handleButtonClick = async () => {
		console.log("Sending Data to Firebase...");

		await addDocument("testCollection", {
			testField: "Hello Firebase!",
			timestamp: new Date().toISOString()
		}); //FIXME: Sending data to Firebase throws a 400 error: Bad Request
	};

	// Load the JSON data
	useEffect(() => {
		const interval = setInterval(() => {
			setData(parseJSON(jsonData));
		}, 100);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="container">
			{/* Button with a click handler */}
			<IonButton className="database-test" size="large" color="danger" onClick={handleButtonClick}>
				Send Data
			</IonButton>

			{/* Display the data validation */}
			<DataValidation categories={data} />

			{/* Display the categories */}
			<EntryCategories categories={data} json={jsonData} />
		</div>
	);
};

export default DebugContainer;
