package List;


public class Test {
    public static void main(String[] args){
        List<Coordinate> stack = new List<Coordinate>();                  
      
        stack.add(new Coordinate(1,1));
        stack.add(new Coordinate(2,2));
        stack.add(new Coordinate(3,3));
        stack.add(new Coordinate(4,4));
        
        System.out.println("Total de coordenadas "+stack.length());
    
           System.out.println("Coordenadas "+stack.toString());
           
      
        
      
                
        

    }
}
