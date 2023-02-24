package List;


public class Test {
    public static void main(String[] args){
        List<Coordinate> list = new List<Coordinate>();    
        Stack<Integer> stack = new Stack<Integer>();              
      
        list.add(new Coordinate(1,1));
        list.add(new Coordinate(2,2));
        list.add(new Coordinate(3,3));
        
        stack.push(1);
        stack.push(2);
        stack.push(3);
        stack.pop();

        
        System.out.println("List Total de coordenadas "+list.length());    
        System.out.println("List Coordenadas "+list.toString());
        
        System.out.println("stack "+stack.toString());
     
      
        
      
                
        

    }
}
