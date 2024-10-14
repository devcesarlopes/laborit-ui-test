export const millisecondsToExtendedTime = (ms: number) => {
  // Validate input
  if (typeof ms !== 'number' || ms < 0) {
    return 'Invalid input';
  }

  const msInHour = 60 * 60 * 1000;     // 3,600,000 ms
  const msInMinute = 60 * 1000;        // 60,000 ms
  const msInSecond = 1000;             // 1,000 ms

  // Calculate each time component
  const hours = Math.floor(ms / msInHour);
  ms %= msInHour;

  const minutes = Math.floor(ms / msInMinute);
  ms %= msInMinute;

  const seconds = Math.floor(ms / msInSecond);
  ms %= msInSecond;

  const milliseconds = ms;

  // Build the time components array
  const parts = [];

  if (hours > 0) {
    parts.push(`${hours} ${hours === 1 ? 'hour' : 'hours'}`);
  }

  if (minutes > 0) {
    parts.push(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`);
  }

  if (seconds > 0) {
    parts.push(`${seconds} ${seconds === 1 ? 'second' : 'seconds'}`);
  }

  if (milliseconds > 0) {
    parts.push(`${milliseconds} ${milliseconds === 1 ? 'millisecond' : 'milliseconds'}`);
  }

  // Handle the case when all components are zero
  if (parts.length === 0) {
    return '0 milliseconds';
  }

  // Format the final string
  if (parts.length === 1) {
    return parts[0];
  } else {
    const lastPart = parts.pop();
    return `${parts.join(', ')} and ${lastPart}`;
  }
}