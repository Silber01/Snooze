

export function dateToUnix(timestamp)
{
    if (!timestamp)
        return 0;
    let times = timestamp.split("-")
    let date = new Date(times[0], times[1], times[2])
    return date.getTime()
}