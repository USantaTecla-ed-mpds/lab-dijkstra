package es.usantatecla.java;

public class Ejercicio01 {
    public static void main(String[] args){
        Line line = new Line();
        line.enqueue(new Coordinate(1,1));
        line.enqueue(new Coordinate(5,1));
        line.enqueue(new Coordinate(10,1));
        line.enqueue(new Coordinate(15,1));
        line.push(new Coordinate(77,1));
        System.out.println("Total de coordenadas "+line.lenght());
        for(int i=0;i<line.lenght();i++) {
            System.out.println("Coordenada "+String.valueOf(i)+" "+line.getCoordinate(i));
        }     
    }
}
