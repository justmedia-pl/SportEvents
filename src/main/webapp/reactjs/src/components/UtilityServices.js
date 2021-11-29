export function convertTextToDateTime(dateTimeText) {
    return new Intl.DateTimeFormat("pl-PL", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric"
    }).format(new Date(dateTimeText))
}


export function convertTextToDate(dateText) {
        return new Intl.DateTimeFormat("pl-PL", {
            year: "numeric",
            month: "long",
            day: "2-digit",
        }).format(new Date(dateText))
    }