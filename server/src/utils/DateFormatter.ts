function formatDate(dateString:Date) {
    const options:object = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric',
        second: 'numeric',
        hour12: true // This will format the time in 12-hour format with AM/PM
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}


export default formatDate