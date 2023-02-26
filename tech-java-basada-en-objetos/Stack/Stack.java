package Stack;

public class  Stack {
    private Node node;
  
    public Stack() {
        this.node = null;               
    }        

   public void push(Integer value) {        
     Node newNode = new Node(value);
     newNode.setNext(this.node);
     this.node=newNode;                      
   }

   public Integer pop() {
    assert !isEmpty();

    Node deletedNode=moveTo(0);
    Node afterNode=moveTo(1);
    this.node=afterNode;                  
    return deletedNode.getValue();                        
   }
    
   public Integer peek(){
    assert !isEmpty();

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

   public boolean equals(Stack stack) {
    assert stack!=null;
    boolean equals = true;
    for(int i=0;i<length();i++) {
            if(moveTo(i).getValue() != stack.moveTo(i).getValue()) {
                equals = false;
                break;
            }
        }     
    return equals;
   }

   public Stack clone() {
    Stack stack = new Stack();
    for(int i=length()-1;i>=0;i--) {
        stack.push(this.moveTo(i).getValue());
    }
    return stack;    
   }

    private Node moveTo(int position) { 
       Node node = this.node;
       for(int i=0;i<position;i++) {
         node =node.getNext();
       }                          
       return node;
    }

    public int length() { 
        int lenght=0;   
        Node node = this.node;    
        while (node !=null) {                                  
            node = node.getNext();   
            lenght++;                        
        }              
        return lenght;
    }

}
