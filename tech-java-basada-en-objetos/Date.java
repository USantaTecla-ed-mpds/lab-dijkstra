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
        return day;}
    public int getDay() {
        return day;}
    public int getMonth() {
        return day;}
    public int getYear() {
        return day;}
    public int getWeek() {
        return day;}
    public bool isLapYear() {}

   
    public void setFormatDate(String template) {}
    public void setUnixTime(double unixtime) {}

    public boolean equals(Date date) {
        return false;}
    
    }
