package es.usantatecla.java;

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
        return template;
    }
    public double getUnixTime() {
        return unixTime;
    }
    public int getDay() {
        return day;
    }
    public int getMonth() {
        return month;
    }
    public int getYear() {
        return year;
    }
    public int getWeek() {
        return 0;
    }
  
   
    public void setFormatDate(String template) {}
    public void setUnixTime(double unixtime) {}

    public boolean equals(Date date) {
        return false;}
    
    }
