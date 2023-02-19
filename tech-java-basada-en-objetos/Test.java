

public class Test {
    public static void main(String[] args){
        Stack<Coordinate> stack = new Stack<Coordinate>();                  
      
        stack.push(new Coordinate(1,1));
        stack.push(new Coordinate(2,2));
        stack.push(new Coordinate(3,3));
        stack.push(new Coordinate(4,4));
        
        System.out.println("Total de coordenadas "+stack.length());
      
        for(int i=0;i<=stack.length()-1;i++) {
           System.out.println("Coordenada "+String.valueOf(i)+" "+stack.getValue(i));
        }     
      
        stack.pop();

        System.out.println("Total de coordenadas "+stack.length());
        System.out.println("Valor en la cima:"+stack.pick().toString());
        for(int i=0;i<=stack.length()-1;i++) {
           System.out.println("Coordenada "+String.valueOf(i)+" "+stack.getValue(i));
        }  
      
                
        

    }
}
