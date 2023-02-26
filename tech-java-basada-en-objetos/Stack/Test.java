package Stack;

public class Test {
    public static void main(String[] args){
        Stack stack = new Stack();                  
      
        stack.push(1);
        stack.push(2);
        stack.push(3);
        stack.push(4);
        
        System.out.println("Total de coordenadas "+stack.length());     
        System.out.println("Stack "+stack.toString());
        stack.pop();
        
        System.out.println("Valor en la cima luego de ejecutar pop:"+stack.peek().toString());
        System.out.println("Clonando "+stack.clone().toString());        

    }
}
