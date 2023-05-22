import moment from "moment";
export default function calculateTimeAgo(timestamp){
    //time stamp must be in this format => 2023-05-19T09:39:17.513314Z
    const now = moment(); // Current time
    const createdAt = moment(timestamp); // Timestamp to convert

    const duration = moment.duration(now.diff(createdAt));

    // Get the years, months, days, hours, minutes, and seconds from the duration
    const years = duration.years();
    const months = duration.months();
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    // Format the output based on the duration components
    let output = '';
    if (years > 0) {
    output = `${years} ${years > 1 ? 'Jh.' : 'Jh.'}`;
    } else if (months > 0) {
    output = `${months} ${months > 1 ? 'Mo.' : 'Mo.'}`;
    } else if (days > 0) {
    output = `${days} ${days > 1 ? 'Tage' : 'Tag'}`;
    } else if (hours > 0) {
    output = `${hours} ${hours > 1 ? 'Std.' : 'Std.'}`;
    } else if (minutes > 0) {
    output = `${minutes} ${minutes > 1 ? 'Min.' : 'Min.'}`;
    } else {
    output = `${seconds} ${seconds > 1 ? 'Sek.' : 'Sek.'}`;
    }
    return output
}