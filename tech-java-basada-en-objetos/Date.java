package es.usantatecla.date;

public class Date {
    private int day;
    private int month;
    private int year;
    private String template;
    private double unixTime;

    public Date() {}
    public Date(int day,int month,int year) {} 
    public Date(double unixTime) {} 

    public Date clone() {
        return null;}
    public String toString() {
        return template;}
    public double getUnixTime() {
        return null;}
    public int getDay() {
        return null;}
    public int getMonth() {
        return null;}
    public int getYear() {
        return null;}
    public int getWeek() {
        return 0;}
    public bool isLapYear() {}

   
    public void setFormatDate(String template) {}
    public void setUnixTime(double unixtime) {}

    public boolean equals(Date date) {
        return false;}
    
    }
