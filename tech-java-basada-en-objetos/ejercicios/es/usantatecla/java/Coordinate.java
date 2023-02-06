package es.usantatecla.java;

public class Coordinate {   
    private float x;
    private float y;

    public Coordinate() {
        this.x = 0;
        this.y = 0;
    }
    public Coordinate(float x,float y) {
        this.x = x;
        this.y = y;
     }

    public Coordinate get() {
        return this;
    }
    public float getX() {
        return x;
    }
    public float getY() {
        return y;
    }

    public String toString() {
        return "("
        .concat(String.valueOf(getX()))
        .concat(",")
        .concat(String.valueOf(getY()))
        .concat(")");
    }
  

    public boolean equals(Coordinate coordinate) {
        return this.x == coordinate.x && this.y == coordinate.y;}

}
