package Stack;

public class  Stack<T> {
    private Node<T> node;
  
    public Stack() {
        this.node = null;               
    }        

   public void push(T value) {        
        Node<T> newNode = new Node<T>(value);
        newNode.setNext(this.node);
        this.node=newNode;                      
   }

   public T pop() {
    Node<T> deletedNode=moveTo(0);
    Node<T> afterNode=moveTo(1);
    this.node=afterNode;                  
    return deletedNode.getValue();                        
   }
    
   public T peek(){
    return node.getValue();
   }

   public boolean isEmpty(){
    return this.node == null;
   }


   public String toString() {
    String toString="";    
    for(int i=0;i<length();i++) {
        toString=toString+","+moveTo(i).getValue().toString();
    }              
    return toString;

   }

   public boolean equals(Stack<T> stack) {

    boolean equals = true;
    for(int i=0;i<length();i++) {
            if(moveTo(i).getValue() != stack.moveTo(i).getValue()) {
                equals = false;
                break;
            }
        }     
    return equals;

   }

   public Stack<T> clone() {
    Stack<T> stack = new Stack<T>();
    for(int i=length()-1;i>=0;i--) {
        stack.push(this.moveTo(i).getValue());
    }
    return stack;    
   }

    private Node<T> moveTo(int position) { 
       Node<T> node = this.node;
       for(int i=0;i<position;i++) {
         node =node.getNext();
       }                          
       return node;
    }

    public int length() { 
        int lenght=0;   
        Node<T> node = this.node;    
        while (node !=null) {                                  
            node = node.getNext();   
            lenght++;                        
        }              
        return lenght;
    }
 


}
