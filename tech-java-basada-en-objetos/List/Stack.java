package List;

public class Stack<T> {
    private List<T> list;

    public Stack(){
        this.list= new List<T>();

    }        

   public void push(T value) {     
    this.list.addAtBegin(value);                              
   }

   public T pop() {
    return this.list.delete(0);
                            
   }
    
   public T peek(){
    return this.list.getValue(0);
   }

   public boolean isEmpty(){
    return this.list.isEmpty();
   }


   public String toString() {
    return this.list.toString();    
   }
    
}
