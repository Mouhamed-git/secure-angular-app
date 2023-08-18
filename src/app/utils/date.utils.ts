import {Timestamp} from "firebase/firestore";

export class DateUtils {

  static convertToDate(dateTime: Timestamp) {
      let date = dateTime.toDate();
      return `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`;
  }
}
