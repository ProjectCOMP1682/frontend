import moment from 'moment';
class CommonUtils {

    // return time form time to now
    static formatDate(time) {
        let a = moment.unix(new Date().getTime() / 1000).format('DD/MM/YYYY')
        let b = moment.unix(time / 1000).format('DD/MM/YYYY')

        var start = moment(b, "DD/MM/YYYY");
        var end = moment(a, "DD/MM/YYYY");

        //Difference in number of days

        return (moment.duration(start.diff(end)).asDays())
    }
    static removeSpace(str) {
        str = str.trim()
        return str = str.replace(/\s+/g, ' ').trim()
    }


}

export default CommonUtils;