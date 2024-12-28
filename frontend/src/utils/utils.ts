export function formatTime(isoString: string): string {
  try {
    const date = new Date(isoString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid ISO string");
    }

    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format, with 12 for midnight/noon

    // Format hours and minutes
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");

    // Return time in "06:17 AM" or "06:17 PM" format
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  } catch (error: any) {
    console.error(`Error formatting time: ${error.message}`);
    return "Invalid time";
  }
}

export const fileToBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
