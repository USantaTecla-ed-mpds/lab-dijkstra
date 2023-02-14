
public class Coordinate {   
    final private double x;
    final private double y;

    public Coordinate() {
        this(0,0);
        
    }
    public Coordinate(double x,double y) {
        this.x = x;
        this.y = y;
    }
    public Coordinate(String coordinate){       
        int positionPeriod= coordinate.indexOf(',');
        int x=Integer.valueOf(coordinate.substring(0, positionPeriod)) ;
        int y=Integer.valueOf(coordinate.substring(positionPeriod+1));
        this.x=x; // this(x,y) Error 'Construct call bust bet in first statment' 
        this.y=y;       
       
    }

    public double getX() {
        return x;
    }
    public double getY() {
        return y;
    }

    public Coordinate clone() {
        return new Coordinate(this.x,this.y);
    }

    public String toString() {
        return "("+String.valueOf(getX())+","+String.valueOf(getY())+")";
    } 

    public boolean equals(Coordinate coordinate) {
        return this.x == coordinate.x && this.y == coordinate.y;
    }

    static public double distanceBetween(Coordinate begin,Coordinate end) {   
        return Math.sqrt(
            Math.pow(end.getX()-begin.getX(), 2)+
             Math.pow(end.getY()-begin.getY(), 2));
    }

   

}
