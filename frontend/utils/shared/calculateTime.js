export const  calculateTimeAgo=(timestamp) =>{
    // Parse the timestamp
    var postedDate = new Date(timestamp);

    // Get the current time
    var currentTime = new Date();

    // Calculate the time difference in milliseconds
    var timeDifference = currentTime - postedDate;
   // alert(timeDifference)
   console.log(timeDifference)
    // Calculate the time components
    var seconds = Math.floor(timeDifference / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);
    var years = Math.floor(days / 365);

    // Format the result
    var timeAgo = '';

    if (years > 0) {
        timeAgo = years + ' year' + (years !== 1 ? 's' : '') + ' ago';
    } else if (days > 0) {
        timeAgo = days + ' day' + (days !== 1 ? 's' : '') + ' ago';
    } else if (hours > 0) {
        timeAgo = hours + ' hour' + (hours !== 1 ? 's' : '') + ' ago';
    } else return 'few times ago'

    return timeAgo;
}
