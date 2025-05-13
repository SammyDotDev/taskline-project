export const formatDate = (dateString: string) => {
	const date = new Date(dateString);

	const day = date.getDate();
	const year = date.getFullYear();
	const month = date.toLocaleString("default", { month: "long" });

	// Function to get ordinal suffix
	function getOrdinalSuffix(n) {
		if (n >= 11 && n <= 13) return "th";
		switch (n % 10) {
			case 1:
				return "st";
			case 2:
				return "nd";
			case 3:
				return "rd";
			default:
				return "th";
		}
	}

	return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
};
