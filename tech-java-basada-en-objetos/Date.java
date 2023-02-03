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

    public Date clone() {}
    public String toString() {}
    public double getUnixTime() {}
    public int getDay() {}
    public int getMonth() {}
    public int getYear() {}
    public int getWeek() {}
    public bool isLapYear() {}

   
    public void setFormatDate(String template)
    public void setUnixTime(double unixtime) {}

    public bool equals(Date date) {}
    private bool checkDate(Date date) {}
    }
