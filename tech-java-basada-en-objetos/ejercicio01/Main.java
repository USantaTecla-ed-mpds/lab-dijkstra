

public class Main {
    public static void main(String[] args){
        List list = new List();
           
        list.addLast(new Coordinate(1,1));
        list.addLast(new Coordinate(5,1));
        list.addLast(new Coordinate(10,1));
        list.addLast(new Coordinate(15,1));
        list.addFirst(new Coordinate(77,1));

        System.out.println("Total de coordenadas "+list.lenght());
        for(int i=0;i<list.lenght();i++) {
            System.out.println("Coordenada "+String.valueOf(i)+" "+list.getCoordinate(i));
        }     
    }
}
