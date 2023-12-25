export default class Weather {
  constructor(dateTime, icon, label, temperature, rainProb) {
    this.dateTime = dateTime;
    this.icon = icon;
    this.label = label;
    this.temperature = temperature;
    this.rainProb = rainProb;
  }
}