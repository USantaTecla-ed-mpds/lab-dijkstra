

public class Test {
    public static void main(String[] args){
        List<Coordinate> list = new List<Coordinate>();                  
      
        list.add(new Coordinate(1,1));
        list.add(new Coordinate(2,2));
        list.add(new Coordinate(3,3));
        list.add(new Coordinate(4,4));
        list.add(new Coordinate("5,5"));
        list.addAtBegin(new Coordinate(6,6));    
      
        System.out.println("Total de coordenadas "+list.length());
      
        for(int i=0;i<=list.length()-1;i++) {
           System.out.println("Coordenada "+String.valueOf(i)+" "+list.getValue(i));
        }     
      
        list.delete(0);
      
        System.out.println("Total de coordenadas "+list.length());
        for(int i=0;i<=list.length()-1;i++) {
           System.out.println("Coordenada "+String.valueOf(i)+" "+list.getValue(i));
        }  
      
        System.out.println("Distancia entre 1,1 y 1,10 es "+
        String.valueOf(
            Coordinate.distanceBetween(
                new Coordinate("1,1"),
                new Coordinate(1,10))));
                
        System.out.println(Coordinate.toPolar(list.getValue(3)));

    }
}
