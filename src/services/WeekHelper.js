import moment from 'moment';

export default class WeekHelper {

  static isCurrentWeek(date) {
    return date ? WeekHelper.getWeekStart().subtract(1, 'second').isBefore(date, 'day') : false;
  }

  static getWeekStart() {
    return moment().startOf('day').subtract(0, 'week').day('Monday');
  }

  static getWeekRange(date) {
    var startDate = moment(date).format('D MMMM');
    var endDate = moment(date).add(7, 'days').format('D MMMM YYYY');
    return startDate + ' - ' + endDate;
  }

}
