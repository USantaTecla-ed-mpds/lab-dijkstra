package es.usantatecla.coordinate;

public class Coordinate {   
    private float x;
    private float y;
    private Polar polar;

    public Coordinate() {}
    public Coordinate(float x,float y) {}
    public Coordinate(Polar polar) {}


    public Coordinate clone() {}
    public float getX() {}
    public float getY() {}
    public Polar getPolar() {}

    public bool equals(Coordinate cordinate) {}

}

public class Polar {
    private float unit;
    private float angle;
    
    public Polar() {}
    public Polar(float unitPolar,float angle)
    public Polar(Coordinate cordinate)
    public Polar getPolar() {}

    private Polar cartesianToPolar(Coordinate coordinate) {}
    public bool isEqual(Polar polar) {}
}